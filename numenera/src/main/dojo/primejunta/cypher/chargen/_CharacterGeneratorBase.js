/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 * 
 * See also the mixins under generator. This has a lot of logic and some of it has been parceled out there.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/Deferred",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/query",
         "dijit/layout/BorderContainer",
         "dijit/layout/TabContainer",
         "dijit/layout/ContentPane",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/form/Textarea",
         "dojox/mobile/ToolBarButton",
         "dojox/mobile/Heading",
         "primejunta/_StartupMixin",
         "./store/_CharacterStore",
         "./_UtilityMixin",
         "./generator/_data",
         "./generator/_finalize",
         "./generator/_gm",
         "./generator/_lists",
         "./generator/_phrase",
         "./generator/_recursions",
         "./generator/_textarea",
         "./generator/_widgets",
         "./optional/_OptionalRulesMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin" ],
function( declare,
          lang,
          array,
          Deferred,
          on,
          topic,
          domClass,
          domQuery,
          BorderContainer,
          TabContainer,
          ContentPane,
          Dialog,
          Button,
          Textarea,
          ToolBarButton,
          Heading,
          _StartupMixin,
          _CharacterStore,
          _UtilityMixin,
          _data,
          _finalize,
          _gm,
          _lists,
          _phrase,
          _recursions,
          _textarea,
          _widgets,
          _OptionalRulesMixin,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin )
{
    return declare( "primejunta/numenera/chargen/_CharacterGeneratorBase", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _StartupMixin, _UtilityMixin, _data, _lists, _phrase, _widgets, _recursions, _gm, _textarea, _finalize, _OptionalRulesMixin ], {
        /**
         * The view controller.
         */
        controller : {},
        /**
         * Map of views created by this class.
         */
        views : {},
        /**
         * Current view for this class.
         */
        currentView : "splash",
        /**
         * Filename for character backups.
         */
        dataFileName : "Ninth-World-Heroes",
        /**
         * Cookie for sticky startup pane.
         */
        STARTUP_PANE_COOKIE : "_cypherCharGen_startupPane",
        /**
         * Default title.
         */
        DEFAULT_DOCUMENT_TITLE : "9 Heroes",
        /**
         * Default character name.
         */
        DEFAULT_CHARACTER_NAME : "a Hero of the Ninth World",
        /**
         * Default origin.
         */
        DEFAULT_ORIGIN : "numenera",
        /**
         * Default recursion.
         */
        DEFAULT_RECURSION : "ninth_world",
        /**
         * Stub. Put help content here.
         */
        helpData : "",
        /**
         * Stub. Put the changelog here.
         */
        changelog : "",
        /**
         * Set when a character is first advanced past creation.
         */
        finalized : false,
        /**
         * Google API properties.
         */
        gapiProperties : {},
        /**
         * Sets document body style, adds a listener for application cache and
         * alerts users of inferior browsers.
         */
        postMixInProperties : function()
        {
            this.inherited( arguments );
            window._allowSwitchOrigin = ( window.location.hash && window.location.hash.indexOf( "morrison=hotel" ) != -1 );
            this.recursionSelectDisplay = window._allowSwitchOrigin ? "inline-block" : "none";
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
            this.initializeRecursions();
            this.setupOptionals(); // from optionals
            this.statsControl.manager = this;
            this.writePhraseSelects();
            this._characterStore = new _CharacterStore({ manager : this, gapiProperties : this.gapiProperties });
            this.views.splash = this.controller.getView( "splash" );
            this._splashPane = this.createSplashCharacterPane({ manager : this, controller : this.controller }).placeAt( this.views.splash );
            this.portraitWidget.manager = this;
            on( this.characterNameInput, "keydown", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.autoSave ) );
            on( this.characterNameInput, "focus", lang.hitch( this, this.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "blur", lang.hitch( this, this.onCharNameBlur, this.characterNameInput ) );
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) );
            topic.subscribe( "CharGen/pleaseShowUnlock", lang.hitch( this, this.setFinalizedClass, false ) );
            topic.subscribe( "CharGen/pleaseHideUnlock", lang.hitch( this, this.setFinalizedClass, true ) );
            topic.subscribe( "/CharacterStore/DataRefreshed", lang.hitch( this, this.setDataRefreshedReminder, true ))
            this.inherited( arguments );
            this.checkForStartupQuery();
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
         * If the character has an _advancementControl, retrieves XP from it, else returns false.
         */
        getXP : function()
        {
            if( this._advancementControl )
            {
                return this._advancementControl.getXP();
            }
            else
            {
                return false;
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
         * Marks characterStoreButton as refreshed (or not).
         */
        setDataRefreshedReminder : function( /* boolean */ to )
        {
            if( to )
            {
                domClass.add( this.characterStoreButton.domNode, "cg-dataRefreshed" );
            }
            else
            {
                domClass.remove( this.characterStoreButton.domNode, "cg-dataRefreshed" );
            }
        },
        /**
         * Resets splash pane, transitions to it, then doClearAll.
         */
        clearAll : function()
        {
            var deferred = new Deferred();
            this._splashPane.reset();
            this.transitionTo( "splash" ).then( lang.hitch( this, this.doClearAll, deferred ) );
            return deferred;
        },
        /**
         * Restores widget state to factory-fresh and resolves deferred, if provided.
         */
        doClearAll : function( deferred )
        {
            this._doSetOrigin( this.DEFAULT_ORIGIN );
            this.setRecursion( this.DEFAULT_RECURSION );
            this._recursionData = {};
            this._clear();
            this._splashPane.reset();
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.phraseDisplayNode.innerHTML = "";
            domClass.remove( this.domNode, "cg-controlsLocked" );
            this.characterNameInput.value = this.DEFAULT_CHARACTER_NAME;
            this.normalizeClass( this.characterNameInput );
            this.mainTabContainer.selectChild( this.descriptionPane );
            topic.publish( "CharGen/pleaseReset" );
            if( deferred )
            {
                deferred.resolve();
            }
        },
        show : function()
        {
            return this.controller.showView( this.currentView );
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