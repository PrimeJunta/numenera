define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/_CharacterPicker.html" ],
function( declare,
          lang,
          on,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin ], {
        manager : {},
        character : {},
        templateString : template,
        picked : false,
        postCreate : function()
        {
            this.chooserNode.checked = this.picked;
            this.own( on( this.domNode, "click", lang.hitch( this, this.togglePicked ) ) );
        },
        togglePicked : function()
        {
            this.picked = !this.picked;
            this.chooserNode.checked = this.picked;
            this.manager.includeCharacter( this.character, this.picked );
        },
        set : function( what, to )
        {
            if( what == "disabled" )
            {
                this.chooserNode.disabled = to;
            }
            else
            {
                this.inherited( arguments );
            }
        }
    });
});