/**
 * Splash pane displayed when loading a blank character. Mostly because it looks cool.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_SplashCharacterPane.html" ],
function( declare,
          lang,
          on,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * Creator of the widget.
         */
        manager : {},
        /**
         * Template.
         */
        templateString : template,
        /**
         * Populates selects from manager.
         */
        postCreate : function()
        {
            on( this.characterNameInput, "keydown", lang.hitch( this.manager, this.manager.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this.manager, this.manager.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.updateCharName ) );
            on( this.characterNameInput, "focus", lang.hitch( this.manager, this.manager.onCharNameFocus, this.characterNameInput ) );
            on( this.characterNameInput, "blur", lang.hitch( this.manager, this.manager.onCharNameBlur, this.characterNameInput ) );
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
            this.manager.selectDescriptor();
        },
        /**
         * Sets manager's matching select's selectedIndex and calls the same method there.
         */
        selectType : function()
        {
            this.manager.typeSelect.selectedIndex = this.typeSelect.selectedIndex;
            this.manager.selectType();
        },
        /**
         * Sets manager's matching select's selectedIndex and calls the same method there.
         */
        selectFocus : function()
        {
            this.manager.focusSelect.selectedIndex = this.focusSelect.selectedIndex;
            this.manager.selectFocus();
        },
        /**
         * Calls manager.openCharacter.
         */
        openCharacter : function()
        {
            this.manager.openCharacter();
        },
        showHelp : function()
        {
            this.manager.showHelp();
        },
        showLicenses : function()
        {
            this.manager.showLicenses();
        },
        showChangeLog : function()
        {
            this.manager.showChangeLog();
        },
        /**
         * Resets selectedIndices to 0.
         */
        reset : function()
        {
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.characterNameInput.value = "";
            this.manager.onCharNameBlur( this.characterNameInput );
        }
    });
});