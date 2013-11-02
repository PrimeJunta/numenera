define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/CheckBox",
         "dojo/text!./templates/_CharacterPicker.html" ],
function( declare,
          lang,
          on,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          CheckBox,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        manager : {},
        character : {},
        templateString : template,
        picked : false,
        postCreate : function()
        {
            this.chooserNode.set( "checked", this.picked );
            this.own( on( this.domNode, "click", lang.hitch( this, this.togglePicked ) ) );
        },
        togglePicked : function()
        {
            if( this.disabled )
            {
                return;
            }
            this.picked = !this.picked;
            this.chooserNode.set( "checked", this.picked );
            this.manager.includeCharacter( this.character, this.picked );
        },
        set : function( what, to )
        {
            if( what == "disabled" )
            {
                this.chooserNode.set( "disabled", to );
                this.disabled = to;
            }
            else
            {
                this.inherited( arguments );
            }
        }
    });
});