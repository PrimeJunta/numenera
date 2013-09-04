/**
 * Widget for managing a stored character.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterManager.html" ],
function( declare,
          lang,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * Key for stored character data.
         */
        key : "",
        /**
         * Creator of the widget.
         */
        manager : {},
        /**
         * Data for the character.
         */
        character : {},
        /**
         * Template.
         */
        templateString : template,
        /**
         * Calls manager.deleteCharacter (from _data).
         */
        deleteMe : function()
        {
            this.manager.deleteCharacter( this.key );
        },
        /**
         * Calls manager.loadCharacter (from _data).
         */
        loadMe : function()
        {
            this.manager.loadCharacter( this.key );
        }
    });
});