/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/io-query",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/query",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/form/Textarea",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_data",
         "./_stats",
         "./_lists",
         "./_AdvancementControl",
         "./_CharacterRecord",
         "./_CharacterValidator",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "dojo/text!./templates/CharacterGenerator.html" ],
function( declare,
          lang,
          array,
          ioQuery,
          on,
          topic,
          domClass,
          domQuery,
          Dialog,
          Button,
          Textarea,
          _WidgetBase,
          _TemplatedMixin, 
          _WidgetsInTemplateMixin,
          _data,
          _stats,
          _lists,
          _AdvancementControl,
          _CharacterRecord,
          _CharacterValidator,
          descriptors,
          types,
          foci,
          template )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _data, _stats, _lists ], {
        DEFAULT_VALUES : {
            "a Hero of the Ninth World" : true,
            "choose" : true,
            "GM chooses" : true,
            "choose topic" : true,
            "choose any non-combat" : true
        },
        DEFAULT_CHARACTER_NAME : "a Hero of the Ninth World",
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
        postMixInProperties : function()
        {
            this.inherited( arguments );
            document.body.className = "tundra";
        },
        /**
         * Initialize selects from data, and connect onclick handlers to all of the UI buttons.
         */
        postCreate : function()
        {
            this._buffer = [];
            this._populating = [];
            this.initializeSelect( "descriptorSelect", descriptors, true );
            this.initializeSelect( "typeSelect", types );
            this.initializeSelect( "focusSelect", foci );
            on( this.characterNameInput, "keydown", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this, this.onCharNameFocus ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.updateLink ) );
            on( this.characterNameInput, "focus", lang.hitch( this, this.onCharNameFocus ) );
            on( this.characterNameInput, "blur", lang.hitch( this, this.onCharNameBlur ) );
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) );
            topic.subscribe( "CharGen/unlockSpecialButtons", lang.hitch( this, this.unlockSpecialButtons ) );
            this.inherited( arguments );
            var loaderNode = domQuery( "div.cg-noJavaScript" )[ 0 ];
            loaderNode.style.display = "none";
            this.domNode.style.display = "block";
        },
        onCharNameFocus : function()
        {
            if( this.characterNameInput.value == this.DEFAULT_CHARACTER_NAME )
            {
                this.characterNameInput.value = "";
                this.normalizeClass( this.characterNameInput );
            }
        },
        onCharNameBlur : function()
        {
            if( this.characterNameInput.value == "" )
            {
                this.characterNameInput.value = this.DEFAULT_CHARACTER_NAME;
            }
            this.normalizeClass( this.characterNameInput );
        },
        lockControls : function()
        {
            this.descriptorSelect.disabled = true;
            this.typeSelect.disabled = true;
            this.focusSelect.disabled = true;
            this.updateLink();
        },
        unlockSpecialButtons : function()
        {
        },
        unlockFinalize : function()
        {
            this.finalizeButton.set( "disabled", false );
        },
        descriptionUpdated : function()
        {
            if( this._taConnected )
            {
                topic.publish( "CharGen/dataChanged" );
                this._taConnected = false;
            }
        },
        connectTextareaListener : function()
        {
            this._taConnected = true;
        },
        /**
         * Iterate through data and write an option into select at attach point, with text = member.label and 
         * value = position in array, for each member.
         */
        initializeSelect : function( /* String */ select, /* Object[] */ data )
        {
            var sel = this[ select ];
            for( var i = 0; i < data.length; i++ )
            {
                var cur = data[ i ];
                var label = data[ i ].label;
                var opt = new Option( label, i );
                sel.options[ sel.options.length ] = opt;
            }
        },
        /**
         * Triggered when user picks a selector from the list. Sets the article on the page to "a" or "an",
         * depending, and continues with updateValues.
         */
        selectDescriptor : function()
        {
            this._populating.push( 1 );
            var label = this._selVal( this.descriptorSelect ).label;
            var _art = "an"
            if( "AEIOUYaeiouy".indexOf( label.charAt( 0 ) ) == -1 )
            {
                _art = "a";
            }
            this.articleNode.innerHTML = _art;
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        selectType : function()
        {
            this._populating.push( 4 );
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
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
         * values. Finally _checkCaps to disable increment controls for pools >= 20.
         */
        updateValues : function()
        {
            this._populating.push( 2 );
            this._clear();
            var di = this.descriptorSelect.selectedIndex - 1;
            var ti = this.typeSelect.selectedIndex - 1;
            var fi = this.focusSelect.selectedIndex - 1;
            var type = ti >= 0 ? types[ ti ] : false;
            var desc = di >= 0 ? descriptors[ di ] : false;
            var focus = fi >= 0 ? foci[ fi ] : false;
            if( !type )
            {
                this._populating.pop();
                return;
            }
            else
            {
                if( type.stats.free_edge > 0 )
                {
                    this._setDisabled([ "increment_might_edge", "increment_speed_edge", "increment_intellect_edge" ], false );
                }
                else
                {
                    this._setDisabled([ "increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
                }
                this._assign( type.stats );
                this._appendToLists( type.lists, "type" );
                this._writeSpecialList( type );
                this.special_list_label.innerHTML = type.special_list_label;
                this.result_pane.style.display = "block";
                this._setDescription( type );
            }
            if( desc )
            {
                this._augment( desc.stats );
                this._appendToLists( desc.lists, "desc" );
                this._setDescription( desc );
            }
            if( focus )
            {
                this._augment( focus.stats );
                this._appendToLists( focus.lists, "focus" );
                this._writeBonusList( focus );
                this._setDescription( focus );
            }
            this.checkCaps();
            this._printLists();
            this._populating.pop();
            this.updateLink();
        },
        getType : function()
        {
            return types[ this.typeSelect.selectedIndex - 1 ];
        },
        finalize : function( tier )
        {
            try{
            if( !this.validateCharacter() )
            {
                console.log( "owie!" );
                return;
            }
            var type = types[ this.typeSelect.selectedIndex - 1 ];
            var focus = foci[ this.focusSelect.selectedIndex - 1 ];
            tier = !isNaN( parseInt( tier ) ) ? parseInt( tier ) : parseInt( this.character_tier.value );
            if( !this.finalized )
            {
                this._advancementControl = new _AdvancementControl({
                    manager : this,
                    typeData : type.advancement,
                    focusData : focus.advancement
                }).placeAt( this.advancementControlNode );
                this._advancementControl.advanceTier( tier );
            }
            this.moveCaps();
            if( this.free_edge.value == "0" && this.free_pool.value == "0" )
            {
                this.finalizeButton.set( "disabled", true );
            }
            this.finalized = true;
            this._advancementControl.checkAdvancement();
            }catch(e){console.log("OOHG",e)}
        },
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
        normalizeClass : function( node )
        {
            if( this.DEFAULT_VALUES[ node.value ] )
            {
                domClass.add( node, "cg-valueNotSet" );
            }
            else
            {
                domClass.remove( node, "cg-valueNotSet" );
            }
        },
        makePrint : function()
        {
            if( this._printWidget )
            {
                this._printWidget.destroy();
            }
            this.domNode.style.display = "none";
            try{
            this._printWidget = new _CharacterRecord({ manager : this }).placeAt( document.body );
            }catch(e){console.log(e)}
        },
        clearAll : function()
        {
            this._clear();
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.characterNameInput.value = "a hero of the Ninth World";
            domClass.add( this.characterNameInput, "cg-valueNotSet" );
            this.linkNode.innerHTML = "";
            this._setDisabled([ "saveButton", "printButton" ], true );
        },
        showHelp : function()
        {
            this.helpDialog.show();
        },
        hideHelp : function()
        {
            this.helpDialog.hide();
        },
        _setDescription : function( from )
        {
            if( from.description_text )
            {
                this.description_text.set( "value", this.description_text.focusNode.value + from.description_text + "\n" );
            }
        },
        /**
         * Sets disabled of all controls matching controls to state.
         */
        _setDisabled : function( /* String[] */ controls, /* boolean */ state )
        {
            for( var i = 0; i < controls.length; i++ )
            {
                if( this[ controls[ i ].set ] )
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
        _selVal : function( sel )
        {
            return {
                "label" : sel.options[ sel.selectedIndex ].text,
                "value" : sel.options[ sel.selectedIndex ].value
            }
        },
        /**
         * Resets the control to its pristine state.
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
            if( this._advancementControl )
            {
                this._advancementControl.destroy();
            }
            this.finalizeButton.set( "disabled", false );
            this.finalized = false;
            delete this._listdata;
            this.description_text.set( "value", "" );
            this.result_pane.style.display = "none";
            this._setDisabled([ "descriptorSelect", "typeSelect", "focusSelect" ], false );
            this._setDisabled([ "increment_might_pool", "decrement_might_pool", "increment_speed_pool", "decrement_speed_pool", "increment_intellect_pool", "decrement_intellect_pool","increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
            this._setValues([ "character_tier", "character_effort", "might_pool", "speed_pool", "intellect_pool", "might_edge", "speed_edge", "intellect_edge", "free_pool", "free_edge", "shin_count", "cypher_count", "armor_bonus" ], "" );
            var lists = [ "ability_list", "inability_list", "special_list", "equipment_list", "bonus_list", "connection_list", "reference_list" ];
            this.updateLink();
        }
    });
});