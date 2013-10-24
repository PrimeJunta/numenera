/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 * 
 * See also _data, _lists, and _stats. Some of the logic has been parceled out there.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/_base/fx",
         "dojo/Deferred",
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
         "primejunta/_StartupMixin",
         "./_CharacterStore",
         "./_CharacterValidator",
         "./_AdvancementControl",
         "./_UtilityMixin",
         "./_data",
         "./_lists",
         "./_transitions",
         "./optional/_OptionalRulesMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin" ],
function( declare,
          lang,
          array,
          fx,
          Deferred,
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
          _StartupMixin,
          _CharacterStore,
          _CharacterValidator,
          _AdvancementControl,
          _UtilityMixin,
          _data,
          _lists,
          _transitions,
          _OptionalRulesMixin,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin )
{
    return declare( "primejunta/numenera/chargen/_CharacterGeneratorBase", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _StartupMixin, _UtilityMixin, _data, _lists, _transitions, _OptionalRulesMixin ], {
        /**
         * Filename for character backups.
         */
        dataFileName : "Ninth-World-Heroes",
        /**
         * Default title.
         */
        DEFAULT_DOCUMENT_TITLE : "9 Heroes",
        /**
         * Default character name.
         */
        DEFAULT_CHARACTER_NAME : "a Hero of the Ninth World",
        /**
         * Stub. Put the "about" doc here.
         */
        about : "",
        /**
         * Stub. Put the changelog here.
         */
        changelog : "",
        /**
         * Set when a character is first advanced past creation.
         */
        finalized : false,
        /**
         * Sets document body style, adds a listener for application cache and
         * alerts users of inferior browsers.
         */
        postMixInProperties : function()
        {
            this.inherited( arguments );
            this.setup(); // from _StartupMixin
        },
        /**
         * Initialize internal arrays, initialize selects from data, and connect various event handlers to the UI buttons.
         */
        postCreate : function()
        {
            this._buffer = [];
            this._populating = [];
            this._controls = [];
            this.setupOptionals(); // from optionals
            this.statsControl.manager = this;
            this.writePhraseSelects();
            this._characterStore = new _CharacterStore({ manager : this });
            this._splashPane = this.createSplashCharacterPane({ manager : this }).placeAt( document.body );
            this._currentNodes = [ this._splashPane.domNode ];
            on( this.characterNameInput, "keydown", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.autoSave ) );
            on( this.characterNameInput, "focus", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "blur", lang.hitch( this, this.onCharNameBlur, this.characterNameInput ) );
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) );
            topic.subscribe( "CharGen/pleaseShowUnlock", lang.hitch( this, this.setFinalizedClass, false ) );
            topic.subscribe( "CharGen/pleaseHideUnlock", lang.hitch( this, this.setFinalizedClass, true ) );
            this.views = {
                "startup" : {
                    "nodes" : [ domQuery( "div.num-noJavaScript" )[ 0 ] ],
                    "selected" : true
                },
                "splash" : {
                    "nodes" : [ this._splashPane.domNode ]
                },
                "main" : { 
                    "nodes" : [ this.domNode ]
                }
            }
            this.inherited( arguments );
            this.checkForStartupQuery();
        },
        writePhraseSelects : function()
        {
            this.initializeSelect( "descriptorSelect", this.descriptors );
            this.initializeSelect( "typeSelect", this.types );
            this.initializeSelect( "focusSelect", this.foci );
        },
        /**
         * Stub. Create and return a SplashCharacterPane of the appropriate type.
         */
        createSplashCharacterPane : function( props )
        {
        },
        /**
         * Stub. Return a character record of the right type.
         */
        createPrintView : function( props )
        {
        },
        /**
         * Stub. Return a play view of the right type.
         */
        createPlayView : function( props )
        {
        },
        /**
         * Stub. Return a character record of the right type.
         */
        createAdvancementControl : function( props )
        {
            return new _AdvancementControl( props );
        },
        /**
         * Stub. Create and provide a character validator of the appropriate type.
         */
        createCharacterValidator : function( props )
        {
            return new _CharacterValidator( props );
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
            sel.options.length = 1;
            for( var o in data )
            {
                var opt = new Option( data[ o ].label, o );
                sel.options[ sel.options.length ] = opt;
            }
        },
        /**
         * Triggered when user picks a descriptor from the list. Sets the article on the page to "a" or "an",
         * depending, and continues with updateValues and autoSave. We use a stack to keep track of programmatic
         * changes to the data so we don't spam the Ctrl-Z queue.
         */
        selectDescriptor : function()
        {
            this._populating.push( 1 );
            var label = this.selectValue( this.descriptorSelect ).label;
            var _art = "an";
            if( "AEIOUYaeiouy".indexOf( label.charAt( 0 ) ) == -1 )
            {
                _art = "a";
            }
            this._splashPane.articleNode.innerHTML = _art;
            this.updateItems( "desc", this.getDescriptor() );
            this.updateStats();
            this._printLists();
            this._populating.pop();
            this.autoSave();
            this.checkSwitchToMain();
        },
        /**
         * Triggered when the user selects a type. Does updateValues and completes with autoSave.
         */
        selectType : function()
        {
            this._populating.push( 4 );
            var type = this.getType();
            this.updateItems( "type", type );
            this.updateStats();
            if( type )
            {
                this.special_list_label.innerHTML = type.special_list_label;
                this._writeSpecialList( type );
            }
            this._printLists();
            this._populating.pop();
            this.autoSave();
            this.checkSwitchToMain();
        },
        updateStats : function()
        {
            this.statsControl.resetStats();
            this.statsControl.applyAdjustments( this.getType() );
            this.statsControl.moveCaps();
            this.statsControl.applyAdjustments( this.getFocus() );
            this.statsControl.applyAdjustments( this.getDescriptor() );
        },
        /**
         * Triggered when the user selects a focus. Does updateValues and completes with autoSave.
         */
        selectFocus : function()
        {
            var focus = this.getFocus();
            this.updateFocus( focus );
            this.autoSave();
            this.checkSwitchToMain();
        },
        updateFocus : function( focus )
        {
            this._populating.push( 5 );
            this.preUpdateFocus(); // from _OptionalRulesMixin
            this.updateItems( "focus", focus );
            if( this._advancementControl )
            {
                this._advancementControl.changeFocus( focus );
            }
            if( focus )
            {
                this._writeBonusList( focus );
            }
            this._printLists();
            this.postUpdateFocus( arguments ); // from _OptionalRulesMixin
            this._populating.pop();
        },
        updateItems : function( from, data )
        {
            if( !( from == "focus" && this.customized ) )
            {
                this.statsControl.undoAdjustments( this[ "current_" + from ] );
            }
            this.clearItems( from ); // in list
            if( !data )
            {
                delete this[ "current_" + from ];
                return;
            }
            this.statsControl.applyAdjustments( data );
            this[ "current_" + from ] = data;
            this._appendToLists( data.lists, from );
            var idx = array.indexOf([ "type", "focus", "desc" ], from );
            this._writeLine( "description_text", data.description_text, idx );
            this._writeLine( "notes_text", data.notes_text, idx );
        },
        checkSwitchToMain : function()
        {
            if( this._populating.length > 0 )
            {
                return;
            }
            if( this.getType() && this.getDescriptor() && this.getFocus() )
            {
                this.transitionTo( "main" );
            }
            else
            {
                this._splashPane.reset( true );
                this.transitionTo( "splash" );
            }
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
            tier = !isNaN( parseInt( tier ) ) ? parseInt( tier ) : parseInt( this.statsControl.character_tier.value );
            if( !this.finalized )
            {
                this._clearAdvancementControl();
                this._advancementControl = this.createAdvancementControl({
                    manager : this,
                    typeData : type.advancement,
                    focusData : focus.advancement
                });
                this.mainTabContainer.addChild( this._advancementControl );
                this._advancementControl.advanceTier( tier );
            }
            this.statsControl.moveCaps();
            if( this.statsControl.free_edge.value == "0" && this.statsControl.free_pool.value == "0" )
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
                this._validator = this.createCharacterValidator({ manager : this });
            }
            return this._validator.validateCharacter();
        },
        /**
         * Locks selects and updates link. Done on finalize and when customizations have been applied.
         */
        lockControls : function()
        {
            this.descriptorSelect.disabled = true;
            this.typeSelect.disabled = true;
            this.focusSelect.disabled = true;
            this.updatePhrase();
            this.phraseSelectorNode.style.display = "none";
            this.phraseDisplayNode.style.display = "block";
            this.autoSave();
        },
        /**
         * When customizations have been un-applied.
         */
        unlockControls : function()
        {
            if( this.finalized )
            {
                // Finalized controls can never be unlocked.
                return;
            }
            this.descriptorSelect.disabled = false;
            this.typeSelect.disabled = false;
            this.focusSelect.disabled = false;
            this.updatePhrase();
            this.phraseSelectorNode.style.display = "block";
            this.phraseDisplayNode.style.display = "none";
            this.autoSave();
        },
        updatePhrase : function()
        {
            if( !this.getDescriptor() || !this.getType() || !this.getFocus() )
            {
                return;
            }
            this.phraseDisplayNode.innerHTML = "the " + this.getDescriptor().label + " " + this.getType().label + " who " + this.getFocus().label;
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
            this.autoSave();
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
            return this.types[ this.selectValue( this.typeSelect ).value ];
        },
        /**
         * Returns currently selected descriptor (or undefined if not set).
         */
        getDescriptor : function()
        {
            return this.descriptors[ this.selectValue( this.descriptorSelect ).value ];
        },
        /**
         * Returns currently selected focus (or undefined if not set).
         */
        getFocus : function()
        {
            return this.foci[  this.selectValue( this.focusSelect ).value ];
        },
        /**
         * (Re)creates a _PrintView for the record, places it, hides this widget and shows it.
         */
        showPrintView : function()
        {
            try // the try-catch block is here to make debugging easier, as for some reason the exceptions disappear otherwise.
            {
                this._printWidget = this.createPrintView({ manager : this });
                this._openSecondaryWidget( "print", this._printWidget );
            }
            catch( e )
            {
                console.log( e );
            }
        },
        closePrintView : function()
        {
            this._closeSecondaryWidget( this._printWidget );
        },
        showPlayView : function()
        {
            try // the try-catch block is here to make debugging easier, as for some reason the exceptions disappear otherwise.
            {
                this._playViewWidget = this.createPlayView({ manager : this });
                this._openSecondaryWidget( "play", this._playViewWidget );
            }
            catch( e )
            {
                console.log( e );
            }
        },
        closePlayView : function()
        {
            this._closeSecondaryWidget( this._playViewWidget );
        },
        setCharacterData : function( data )
        {
            if( this._advancementControl )
            {
                this._advancementControl.character_xp.value = data.character_xp;
            }
            this.autoSave();
        },
        _openSecondaryWidget : function( viewName, widg )
        {
            this.views[ viewName ] = { nodes : widg.domNode };
            this.transitionOut().then( lang.hitch( this, function() {
                widg.placeAt( document.body, "first" );
                widg.startup();
                this.transitionIn( viewName );
            }));
        },
        _closeSecondaryWidget : function( widg )
        {
            this.transitionOut().then( lang.hitch( this, function() {
                widg.destroy();
                this.transitionIn( "main" );
            }));
        },
        /**
         * Calls _clear, resets the descriptor, type, and focus selects, character name input, and link,
         * and disables the save and print buttons.
         */
        clearAll : function()
        {
            var deferred = new Deferred();
            this._splashPane.reset();
            this.transitionTo( "splash" ).then( lang.hitch( this, this.doClearAll, deferred ) );
            return deferred;
        },
        doClearAll : function( deferred )
        {
            this._clear();
            this._splashPane.reset();
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.phraseDisplayNode.innerHTML = "";
            this.phraseSelectorNode.style.display = "block";
            this.phraseDisplayNode.style.display = "none";
            this.characterNameInput.value = this.DEFAULT_CHARACTER_NAME;
            this.normalizeClass( this.characterNameInput );
            this.mainTabContainer.selectChild( this.descriptionPane );
            topic.publish( "CharGen/pleaseReset" );
            if( deferred )
            {
                deferred.resolve();
            }
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
            this._showHelp( this.about );
        },
        /**
         * Calls _showHelp with changelog (that's an included text module).
         */
        showChangeLog : function()
        {
            this._showHelp( this.changelog );
        },
        /**
         * Replaces line idx in textarea where with what, or adds it if not present.
         */
        _writeLine : function( /* Textarea */ where, /* String */ what, /* int */ idx )
        {
            var txt = this[ where ].get( "value" );
            var ta = txt.split( "\n" );
            while( ta.length < idx + 1 )
            {
                ta.push( "" );
            }
            ta[ idx ] = what;
            this[ where ].set( "value", ta.join( "\n" ) );
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
            this.characterGeneratorPane.resize();
        },
        /**
         * Resets the control to its pristine state, except for the fields at top. We do this every time the user selects a
         * new descriptor/type/focus is selected, so we don't want to clear those. They're with clearAll.
         */
        _clear : function()
        {
            this.inherited( arguments );
            for( var o in this._lists )
            {
                this[ o + "_label" ].style.display = "none";
                while( this._lists[ o ].length > 0 )
                {
                    this._lists[ o ].pop().destroy();
                }
            }
            delete this.current_type;
            delete this.current_desc;
            delete this.current_focus;
            this._controls = [];
            this._clearAdvancementControl();
            this.unlockFinalize();
            this.finalized = false;
            this.customized = false;
            delete this._listdata;
            this.description_text.set( "value", "" );
            this.notes_text.set( "value", "" );
            this.character_xp = 0;
            this.extra_equipment_text.set( "value", "" );
            this.setDisabled([ "descriptorSelect", "typeSelect", "focusSelect" ], false );
            this.statsControl.setValues([ "character_tier", "character_effort", "might_pool", "speed_pool", "intellect_pool", "might_edge", "speed_edge", "intellect_edge", "free_pool", "free_edge", "shin_count", "cypher_count", "armor_bonus" ], "" );
            var lists = [ "ability_list", "inability_list", "special_list", "equipment_list", "bonus_list" ];
            this.autoSave();
            this.setDisabled([ "saveButton" ], true );
            this.statsControl.setDisabled([ "increment_might_pool", "decrement_might_pool", "increment_speed_pool", "decrement_speed_pool", "increment_intellect_pool", "decrement_intellect_pool","increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
        }
    });
});