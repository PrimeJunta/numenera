define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dijit/form/TextBox",
         "dijit/layout/ContentPane",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_NewFeatureWidget.html" ],
function( declare,
          lang,
          Button,
          TextBox,
          ContentPane,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        featureLabel : "",
        templateString : template,
        parent : {},
        postCreate : function()
        {
            this.populateSelect();
        },
        createItem : function()
        {
            var lbl = this.labelField.get( "value" );
            var inst = lang.clone( this.data.base_payload_data[ this.templateSelect.value ] || {});
            inst.label = lbl;
            this.labelField.set( "value", "" );
            this.checkCreate();
            this.parent.createControl({
                oid : this.parent.getOID(),
                instance : inst,
                title : lbl,
                is_homebrew : true
            }, true );
        },
        checkCreate : function()
        {
            if( this._checkLabel() )
            {
                this.createButton.set( "disabled", false );
            }
            else
            {
                this.createButton.set( "disabled", true );
            }
        },
        populateSelect : function()
        {
            for( var o in this.data.base_payload_data )
            {
                this.templateSelect.options[ this.templateSelect.options.length ] = new Option( this.data.base_payload_data[ o ].label, o );
            }
        },
        populate : function()
        {
            return;
        },
        _checkLabel : function()
        {
            var val = this.labelField.get( "value" );
            if( val )
            {
                for( var o in this.data.base_payload_data )
                {
                    if( this.data.base_payload_data[ o ].label.toLowerCase() == val.toLowerCase() )
                    {
                        return false;
                    }
                }
                for( var o in this.data.payload_data )
                {
                    if( this.data.payload_data[ o ].label.toLowerCase() == val.toLowerCase() )
                    {
                        return false;
                    }
                }
                return true;
            }
            else
            {
                return false;
            }
        }
    });
});