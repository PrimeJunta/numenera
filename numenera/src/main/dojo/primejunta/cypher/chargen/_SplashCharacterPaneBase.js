/**
 * Splash pane displayed when loading a blank character. Mostly because it looks cool.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/cookie",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin" ],
function( declare,
          lang,
          on,
          cookie,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * Creator of the widget.
         */
        manager : {},
        /**
         * App controller of the widget.
         */
        controller : {},
        /**
         * Populates selects from manager.
         */
        postCreate : function()
        {
            this.moduleControlsNode.appendChild( this.controller.getModuleLinks( "chargen" ) );
            on( this.characterNameInput, "keydown", lang.hitch( this.manager, this.manager.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this.manager, this.manager.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.updateCharName ) );
            on( this.characterNameInput, "focus", lang.hitch( this.manager, this.manager.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "blur", lang.hitch( this.manager, this.manager.onCharNameBlur, this.characterNameInput ) );
            this.writePhraseSelects();

        },
        writePhraseSelects : function()
        {
            this.descriptorSelect.innerHTML = this.manager.descriptorSelect.innerHTML;
            this.typeSelect.innerHTML = this.manager.typeSelect.innerHTML;
            this.focusSelect.innerHTML = this.manager.focusSelect.innerHTML;
        },
        /**
         * Updates character name on manager.
         */
        updateCharName : function()
        {
            this.manager.characterNameInput.value = this.characterNameInput.value;
            this.manager.onCharNameBlur( this.manager.characterNameInput );
        },
        /**
         * Sets manager's matching select's selectedIndex and calls the same method there.
         */
        selectDescriptor : function()
        {
            this.manager.descriptorSelect.selectedIndex = this.descriptorSelect.selectedIndex;
            this.manager.selectDescriptor( true );
        },
        /**
         * Sets manager's matching select's selectedIndex and calls the same method there.
         */
        selectType : function()
        {
            this.manager.typeSelect.selectedIndex = this.typeSelect.selectedIndex;
            this.manager.selectType( true );
        },
        /**
         * Sets manager's matching select's selectedIndex and calls the same method there.
         */
        selectFocus : function()
        {
            this.manager.focusSelect.selectedIndex = this.focusSelect.selectedIndex;
            this.manager.selectFocus( true );
        },
        switchOrigin : function()
        {
            if( !window._allowSwitchOrigin )
            {
                return;
            }
            var found = false, first = false;
            for( var o in this.manager.origins )
            {
                if( !first )
                {
                    first = o;
                }
                if( found )
                {
                    this.setOrigin( o );
                    return;
                }
                if( this.manager.origin == o )
                {
                    found = true;
                }
            }
            this.setOrigin( first );
        },
        setOrigin : function( origin )
        {
            this.manager.setOrigin( origin ).then( lang.hitch( this, this.writePhraseSelects ) );
        },
        /**
         * Calls manager.openCharacter.
         */
        openCharacterStore : function()
        {
            this.manager.openCharacterStore();
        },
        showLicenses : function()
        {
            this.controller.showModule( "help", "Licenses" );
        },
        /**
         * Resets selectedIndices to 0.
         */
        reset : function( /* boolean */ withCurrentSelection )
        {
            if( withCurrentSelection )
            {
                this.descriptorSelect.selectedIndex = this.manager.descriptorSelect.selectedIndex;
                this.typeSelect.selectedIndex = this.manager.typeSelect.selectedIndex;
                this.focusSelect.selectedIndex = this.manager.focusSelect.selectedIndex;
                this.characterNameInput.value = this.manager.characterNameInput.value;
            }
            else
            {
                this.writePhraseSelects();
                this.descriptorSelect.selectedIndex = 0;
                this.typeSelect.selectedIndex = 0;
                this.focusSelect.selectedIndex = 0;
                this.characterNameInput.value = "";
            }
            this.manager.onCharNameBlur( this.characterNameInput );
        }
    });
});