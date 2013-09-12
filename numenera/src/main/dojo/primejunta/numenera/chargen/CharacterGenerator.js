/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 * 
 * See also _data, _lists, and _stats. Some of the logic has been parceled out there.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/_base/event",
         "dojo/io-query",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/query",
         "dojo/has",
         "dojo/cookie",
         "dijit/layout/BorderContainer",
         "dijit/layout/TabContainer",
         "dijit/layout/ContentPane",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/form/Textarea",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_SplashCharacterPane",
         "./_data",
         "./_stats",
         "./_lists",
         "./_AdvancementControl",
         "./_CharacterRecord",
         "./_CharacterValidator",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "dojo/text!./templates/CharacterGenerator.html",
         "dojo/text!./doc/about.html",
         "dojo/text!./doc/changelog.html" ],
function( declare,
          lang,
          array,
          event,
          ioQuery,
          on,
          topic,
          domClass,
          domConstruct,
          domQuery,
          has,
          cookie,
          BorderContainer,
          TabContainer,
          ContentPane,
          Dialog,
          Button,
          Textarea,
          _WidgetBase,
          _TemplatedMixin, 
          _WidgetsInTemplateMixin,
          _SplashCharacterPane,
          _data,
          _stats,
          _lists,
          _AdvancementControl,
          _CharacterRecord,
          _CharacterValidator,
          descriptors,
          types,
          foci,
          template,
          about,
          changelog )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _data, _stats, _lists ], {
        /**
         * Default title.
         */
        DEFAULT_DOCUMENT_TITLE : "9 Heroes",
        /**
         * Default field values. Will be cleared on focus.
         */
        DEFAULT_VALUES : {
            "a Hero of the Ninth World" : true,
            "choose" : true,
            "GM chooses" : true,
            "choose topic" : true,
            "choose any non-combat" : true
        },
        /**
         * Default character name.
         */
        DEFAULT_CHARACTER_NAME : "a Hero of the Ninth World",
        /**
         * Public version number.
         */
        version : "1.1.3",
        /**
         * Set when a character is first advanced past creation.
         */
        finalized : false,
        /**
         * Descriptor data.
         */
        descriptors : descriptors,
        /**
         * Type data.
         */
        types : types,
        /**
         * Focus data.
         */
        foci : foci,
        /**
         * Template.
         */
        templateString : template,
        /**
         * Path to icons and other graphic goodies.
         */
        iconSrc : require.toUrl( "primejunta/numenera/chargen/themes/images" ),
        /**
         * Sets document body style, adds a listener for application cache and
         * alerts users of inferior browsers.
         */
        postMixInProperties : function()
        {
            this.inherited( arguments );
            document.body.className = "tundra";
            if( !has( "ff" ) && !has( "webkit" ) && !cookie( "browserCheckAlert" ) )
            {
                alert( "This webapp has only been tested on Firefox, Google Chrome, and Apple Safari. Use at your own risk." );
                cookie( "browserCheckAlert", "1", { expires : 30 });
            }
            window.applicationCache.addEventListener( "updateready", lang.hitch( this, function( event )
            {
                console.log( "Updating application cache. Status is ", window.applicationCache.status );
                if( has( "ff" ) )
                {
                    this._reload();
                }
                else if( window.applicationCache.status == 4 ) try
                {
                    setTimeout( lang.hitch( this, this._reload ), 500 );
                    window.applicationCache.swapCache();
                    console.log( "Application cache successfully updated." );
                }
                catch( e )
                {
                    console.log( "Failed to swap cache." );
                    setTimeout( lang.hitch( this, this._reload ), 500 );
                }
            }), false );
        },
        /**
         * Initialize internal arrays, initialize selects from data, and connect various event handlers to the UI buttons.
         */
        postCreate : function()
        {
            this._buffer = [];
            this._populating = [];
            this._controls = [];
            this.initializeSelect( "descriptorSelect", descriptors, true );
            this.initializeSelect( "typeSelect", types );
            this.initializeSelect( "focusSelect", foci );
            this._splashPane = new _SplashCharacterPane({ manager : this }).placeAt( this.domNode );
            on( this.characterNameInput, "keydown", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.updateLink ) );
            on( this.characterNameInput, "focus", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "blur", lang.hitch( this, this.onCharNameBlur, this.characterNameInput ) );
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) );
            topic.subscribe( "CharGen/pleaseShowUnlock", lang.hitch( this, this.setFinalizedClass, false ) );
            topic.subscribe( "CharGen/pleaseHideUnlock", lang.hitch( this, this.setFinalizedClass, true ) );
            this.inherited( arguments );
            this.checkForStartupQuery();
            var loaderNode = domQuery( "div.cg-noJavaScript" )[ 0 ];
            loaderNode.style.display = "none";
            this.domNode.style.display = "block";
            this.waitForLayout();
        },
        /**
         * Workaround for minor rendering glitch on iPad Chrome and Safari: the main tab container's content pane is not 
         * correctly lined up if shown immediately after postCreate.
         */
        waitForLayout : function()
        {
            if( this.mainTabContainer._started )
            {
                this.mainTabContainer.resize();
            }
            else
            {
                setTimeout( lang.hitch( this, this.waitForLayout ), 200 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 400 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 600 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 800 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 1000 );
            }
        },
        /**
         * If the char name has not been set, clear the field and normalizeClass.
         */
        onCharNameFocus : function( fld )
        {
            if( fld.value == this.DEFAULT_CHARACTER_NAME )
            {
                fld.value = "";
                this.normalizeClass( fld );
            }
        },
        /**
         * If no char name has been set, puts back the default name, and normalizeClass.
         */
        onCharNameBlur : function( fld )
        {
            if( fld.value == "" )
            {
                fld.value = this.DEFAULT_CHARACTER_NAME;
            }
            if( fld.value == this.DEFAULT_CHARACTER_NAME )
            {
                document.title = this.DEFAULT_DOCUMENT_TITLE;
            }
            else
            {
                document.title = fld.value;
            }
            this.normalizeClass( fld );
        },
        /**
         * Iterate through data and write an option into select at attach point, with text = member.label and 
         * value = position in array, for each member.
         */
        initializeSelect : function( /* String */ select, /* Object[] */ data )
        {
            var sel = this[ select ];
            for( var o in data )
            {
                var opt = new Option( data[ o ].label, o );
                sel.options[ sel.options.length ] = opt;
            }
        },
        /**
         * Triggered when user picks a descriptor from the list. Sets the article on the page to "a" or "an",
         * depending, and continues with updateValues and updateLink. We use a stack to keep track of programmatic
         * changes to the data so we don't spam the Ctrl-Z queue.
         */
        selectDescriptor : function()
        {
            this._populating.push( 1 );
            var label = this._selVal( this.descriptorSelect ).label;
            var _art = "an";
            if( "AEIOUYaeiouy".indexOf( label.charAt( 0 ) ) == -1 )
            {
                _art = "a";
            }
            this._splashPane.articleNode.innerHTML = _art;
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        /**
         * Triggered when the user selects a type. Does updateValues and completes with updateLink.
         */
        selectType : function()
        {
            this._populating.push( 4 );
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        /**
         * Triggered when the user selects a focus. Does updateValues and completes with updateLink.
         */
        selectFocus : function()
        {
            this._populating.push( 5 );
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        /**
         * Clears the UI, finds the data for the descriptor, type, and focus the user has picked, enables
         * edge assignment if the type has free edge to assign, and populates fields and lists from the selected
         * values. Finally checkCaps to disable increment/decrement controls if they hit ceilings/floors.
         */
        updateValues : function()
        {
            this._populating.push( 2 );
            this._clear();
            var type = this.getType();
            var desc = this.getDescriptor();
            var focus = this.getFocus();
            if( !type || !desc || !focus )
            {
                this._populating.pop();
                return;
            }
            else
            {
                this._showCharacterData();
                this._assign( type.stats );
                this._appendToLists( type.lists, "type" );
                this._writeSpecialList( type );
                this.special_list_label.innerHTML = type.special_list_label;
                this._appendToText( "description_text", type.description_text );
                this._appendToText( "notes_text", type.notes_text );
            }
            if( desc )
            {
                this._augment( desc.stats );
                this._appendToLists( desc.lists, "desc" );
                this._appendToText( "description_text", desc.description_text );
                this._appendToText( "notes_text", desc.notes_text );
            }
            if( focus )
            {
                this._augment( focus.stats );
                this._appendToLists( focus.lists, "focus" );
                this._writeBonusList( focus );
                this._appendToText( "description_text", focus.description_text );
                this._appendToText( "notes_text", focus.notes_text );
            }
            this.checkCaps();
            this._printLists();
            this._populating.pop();
            this.updateLink();
        },
        /**
         * If the character passes validation with .validateCharacter, marks it as ready for advacement.
         * This locks the character's basic data and creates an _AdvancementControl. If tier is set (which
         * happens when populating from a saved character, advances the controls to that tier in preparation
         * for filling in the fields. Also disables the finalize button, and finishes with
         * _advancementControl.checkAdvancement, which will unlock a new tier if appropriate.
         */
        finalize : function( /* String|int */ tier )
        {
            if( !this.validateCharacter() )
            {
                return;
            }
            var type = this.getType();
            var focus = this.getFocus();
            tier = !isNaN( parseInt( tier ) ) ? parseInt( tier ) : parseInt( this.character_tier.value );
            if( !this.finalized )
            {
                this._clearAdvancementControl();
                this._advancementControl = new _AdvancementControl({
                    manager : this,
                    typeData : type.advancement,
                    focusData : focus.advancement
                });
                this.mainTabContainer.addChild( this._advancementControl );
                this._advancementControl.advanceTier( tier );
            }
            this.moveCaps();
            if( this.free_edge.value == "0" && this.free_pool.value == "0" )
            {
                this.finalizeButton.set( "disabled", true );
            }
            this.finalized = true;
            this._advancementControl.checkAdvancement();
            if( this._populating.length == 0 )
            {
                this.mainTabContainer.selectChild( this._advancementControl )
            }
        },
        /**
         * Checks that we're not in the middle of programmatic population; if not, validates the character
         * with a new (if necessary) _CharacterValidator, returning the result.
         */
        validateCharacter : function()
        {
            if( this._populating.length != 0 )
            {
                return true;
            }
            if( !this._validator )
            {
                this._validator = new _CharacterValidator({ manager : this });
            }
            return this._validator.validateCharacter();
        },
        /**
         * Locks selects and updates link. Done on finalize.
         */
        lockControls : function()
        {
            this.descriptorSelect.disabled = true;
            this.typeSelect.disabled = true;
            this.focusSelect.disabled = true;
            this.phraseDisplayNode.innerHTML = "the " + this.getDescriptor().label + " " + this.getType().label + " who " + this.getFocus().label;
            this.phraseSelectorNode.style.display = "none";
            this.phraseDisplayNode.style.display = "block";
            this.updateLink();
        },
        /**
         * Adds or removes finalized CSS class, which affects display of contained things.
         */
        setFinalizedClass : function( state )
        {
            state ? domClass.add( this.domNode, "cg-finalized" ) : domClass.remove( this.domNode, "cg-finalized" );
        },
        /**
         * Unlocks the finalize (=Advance) button and updates link.
         */
        unlockFinalize : function()
        {
            this.finalizeButton.set( "disabled", false );
            this.updateLink();
        },
        /**
         * We're using dijit/form/Textareas for textareas. They have the annoying characteristic of emitting
         * events after timeouts. This means they'll slip out from under our normal "populating programmatically"
         * flag, and spam the Ctrl-Z timeline. We get around this with a _taConnected flag we unset onChange, and
         * set onKeyDown. This means the actual dataChanged event will only fire if the user has typed in the field
         * since the last change.
         */
        descriptionUpdated : function()
        {
            if( this._taConnected )
            {
                topic.publish( "CharGen/dataChanged" );
                this._taConnected = false;
            }
        },
        /**
         * Connected to textarea's onKeyUp event. Makes subsequent onChange events fire; the onChange event will
         * unset it again. This way we ensure that only user-entered changes are logged. See also descriptionUpdated.
         */
        connectTextareaListener : function()
        {
            this._taConnected = true;
        },
        /**
         * Returns currently selected type (or undefined if not set).
         */
        getType : function()
        {
            return types[ this._selVal( this.typeSelect ).value ];
        },
        /**
         * Returns currently selected descriptor (or undefined if not set).
         */
        getDescriptor : function()
        {
            return descriptors[  this._selVal( this.descriptorSelect ).value ];
        },
        /**
         * Returns currently selected focus (or undefined if not set).
         */
        getFocus : function()
        {
            return foci[  this._selVal( this.focusSelect ).value ];
        },
        /**
         * If inputNode.value is one of the defaults, adds valueNotSet class to it; else removes it.
         */
        normalizeClass : function( inputNode )
        {
            if( this.DEFAULT_VALUES[ inputNode.value ] )
            {
                domClass.add( inputNode, "cg-valueNotSet" );
            }
            else
            {
                domClass.remove( inputNode, "cg-valueNotSet" );
            }
        },
        /**
         * (Re)creates a _CharacterRecord for the record, places it, hides this widget and shows it.
         */
        makePrint : function()
        {
            if( this._printWidget )
            {
                this._printWidget.destroy();
            }
            try // the try-catch block is here to make debugging easier, as for some reason the exceptions disappear otherwise.
            {
                this.domNode.style.display = "none";
                this._printWidget = new _CharacterRecord({ manager : this }).placeAt( document.body );
            }
            catch( e )
            {
                console.log( e );
            }
        },
        /**
         * Calls _clear, resets the descriptor, type, and focus selects, character name input, and link,
         * and disables the save and print buttons.
         */
        clearAll : function()
        {
            this._clear();
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.phraseDisplayNode.innerHTML = "";
            this.phraseSelectorNode.style.display = "block";
            this.phraseDisplayNode.style.display = "none";
            this.characterNameInput.value = this.DEFAULT_CHARACTER_NAME;
            this.normalizeClass( this.characterNameInput );
            this._setDisabled([ "saveButton", "printButton" ], true );
            this._hideCharacterData();
        },
        /**
         * Kinder, gentler alert.
         */
        tell : function( /* String */ msg )
        {
            this.messageContentNode.innerHTML = msg;
            this.messageDialog.show();
        },
        /**
         * Hides messageDialog.
         */
        hideMessage : function()
        {
            this.messageDialog.hide();
        },
        /**
         * Calls _showHelp with about (that's an included text module).
         */
        showHelp : function()
        {
            this._showHelp( about );
        },
        /**
         * Calls _showHelp with changelog (that's an included text module).
         */
        showChangeLog : function()
        {
            this._showHelp( changelog );
        },
        /**
         * Hides _helpNode and shows this.domNode.
         */
        hideHelp : function()
        {
            this._helpNode.style.display = "none";
            this.domNode.style.display = "blocK";
        },
        /**
         * Displays content in _helpNode, hides this.domNode and shows it.
         */
        _showHelp : function( /* HTMLString */ content )
        {
            if( !this._helpNode )
            {
                this._helpNode = domConstruct.create( "div", { style : "display:none;" }, document.body );
                on( this._helpNode, "click", lang.hitch( this, this.hideHelp ) );
            }
            this._helpNode.innerHTML = content;
            this.domNode.style.display = "none";
            this._helpNode.style.display = "block";
        },
        /**
         * Appends what to Textarea where on a new line.
         */
        _appendToText : function( /* Textarea */ where, /* String */ what )
        {
            if( what )
            {
                this[ where ].set( "value", this[ where ].get( "value" ) + what + "\n" );
            }
        },
        /**
         * Sets disabled of all controls matching controls to state.
         */
        _setDisabled : function( /* String[] */ controls, /* boolean */ state )
        {
            for( var i = 0; i < controls.length; i++ )
            {
                if( this[ controls[ i ] ].set )
                {
                    this[ controls[ i ] ].set( "disabled", state );
                }
                else
                {
                    this[ controls[ i ] ].disabled = state;
                }
            }
        },
        /**
         * Sets value of all inputs matching fields to value.
         */
        _setValues : function( /* String[] */ fields, /* String */ value )
        {
            for( var i = 0; i < fields.length; i++ )
            {
                this[ fields[ i ] ].value = value;
            }
        },
        /**
         * Returns value of selected item in sel as object with label and value properties.
         */
        _selVal : function( sel, /* String? */ val )
        {
            if( val )
            {
                for( var i = 0; i < sel.options.length; i++ )
                {
                    if( sel.options[ i ].value == val )
                    {
                        sel.options[ i ].selected = true;
                        break;
                    }
                }
            }
            return {
                "label" : sel.options[ sel.selectedIndex ].text,
                "value" : sel.options[ sel.selectedIndex ].value
            }
        },
        /**
         * Hides the splash pane and shows the character generator pane and its main buttons node.
         */
        _showCharacterData : function()
        {
            this._kick();
            this.mainTabContainer.selectChild( this.abilityPane );
            this._splashPane.domNode.style.display = "none";
            this.characterGeneratorPane.domNode.style.visibility = "visible";
            this.mainButtonsNode.style.visibility = "visible";
        },
        /**
         * Hides the character generator pane and its main buttons node and resets and shows the splash pane.
         */
        _hideCharacterData : function()
        {
            this.characterGeneratorPane.domNode.style.visibility = "hidden";
            this.mainButtonsNode.style.visibility = "hidden";
            this._splashPane.reset();
            this._splashPane.domNode.style.display = "block";
        },
        /**
         * Removes _advancementControl from mainTabContainer, destroys it, and clears pointer to it.
         */
        _clearAdvancementControl : function()
        {
            if( this._advancementControl )
            {
                this.mainTabContainer.removeChild( this._advancementControl );
                this._advancementControl.destroy();
                delete this._advancementControl;
            }
        },
        /**
         * Kicks the layout.
         */
        _kick : function()
        {
            this.characterGeneratorPane.layout();
        },
        /**
         * Reloads the window. Used with cache invalidation.
         */
        _reload : function()
        {
            window.location.reload();
        },
        /**
         * Resets the control to its pristine state, except for the fields at top. We do this every time the user selects a
         * new descriptor/type/focus is selected, so we don't want to clear those. They're with clearAll.
         */
        _clear : function()
        {
            for( var o in this._lists )
            {
                this[ o + "_label" ].style.display = "none";
                while( this._lists[ o ].length > 0 )
                {
                    this._lists[ o ].pop().destroy();
                }
            }
            this._controls = [];
            this._clearAdvancementControl();
            this.unlockFinalize();
            this.finalized = false;
            delete this._listdata;
            this.description_text.set( "value", "" );
            this.notes_text.set( "value", "" );
            this.extra_equipment_text.set( "value", "" );
            this._setDisabled([ "descriptorSelect", "typeSelect", "focusSelect" ], false );
            this._setValues([ "character_tier", "character_effort", "might_pool", "speed_pool", "intellect_pool", "might_edge", "speed_edge", "intellect_edge", "free_pool", "free_edge", "shin_count", "cypher_count", "armor_bonus" ], "" );
            var lists = [ "ability_list", "inability_list", "special_list", "equipment_list", "bonus_list" ];
            this.updateLink();
            this._setDisabled([ "saveButton", "printButton", "increment_might_pool", "decrement_might_pool", "increment_speed_pool", "decrement_speed_pool", "increment_intellect_pool", "decrement_intellect_pool","increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
        }
    });
});