define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json",
         "dojo/on",
         "dijit/form/Button",
         "dijit/form/TextBox",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_FieldControlBase.html" ],
function( declare,
          lang,
          json,
          on,
          Button,
          TextBox,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ],
    {
        NOT_DEFINED_STRING : "",
        templateString : template,
        field_id : "",
        definition : {},
        instance : {},
        label : "",
        value : "",
        path : false,
        parent : {},
        "class" : "cg-fieldControl",
        field_class : "num-itemInput num-homebrewInput",
        postMixInProperties : function()
        {
            this.value = this.readValue();
        },
        postCreate : function()
        {
            this.createControl();
            if( this._control )
            {
                this.own( on( this._control, "change", lang.hitch( this.parent, this.parent.save ) ) );
            }
            else
            {
                console.log( this, "has no control!" );
            }
        },
        createControl : function()
        {
            this._control = new TextBox({ "class" : this.field_class, value : this.value }).placeAt( this.controlNode );
        },
        readValue : function()
        {
            if( this.path && this.instance[ this.path ] )
            {
                return ( this.instance[ this.path ][ this.field_id ] || this.NOT_DEFINED_STRING );
            }
            else
            {
                return ( this.instance[ this.field_id ] || this.NOT_DEFINED_STRING );
            }
        }
    });
});