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
        key : "",
        manager : {},
        character : {},
        templateString : template,
        deleteMe : function()
        {
            this.manager.deleteCharacter( this.key );
        },
        loadMe : function()
        {
            this.manager.loadCharacter( this.key );
        }
    });
});