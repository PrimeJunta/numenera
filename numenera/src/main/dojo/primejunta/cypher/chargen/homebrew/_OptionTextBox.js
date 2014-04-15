define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dijit/form/TextBox",
         "./_SpecialCharParserMixin",
         "dojo/Evented",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_OptionTextBox.html" ],
function( declare,
          lang,
          on,
          TextBox,
          _SpecialCharParserMixin,
          Evented,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented, _SpecialCharParserMixin ], {
        templateString : template,
        parent : {},
        add : false,
        postCreate : function()
        {
            if( this.add )
            {
                this.destroyNode.style.display = "none";
                this.addNode.style.display = "block";
            }
            this.setSpecialCharListener( this.control );
            on( this.control, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            }));
        },
        pleaseDestroyMe : function()
        {
            this.parent.destroyItem( this );
        },
        pleaseAddMe : function()
        {
            this.parent.plzAddItem( this );
        },
        set : function( prop, to )
        {
            if( prop == "value" )
            {
                this.control.set( prop, to );
            }
        },
        get : function( prop )
        {
            if( prop == "value" )
            {
                return this.control.get( "value" );
            }
        }
    });
});