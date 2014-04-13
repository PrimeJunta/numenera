define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "./_FieldControlBase",
         "./_ItemControl",
         "dojo/text!./templates/_ListControl.html" ],
function( declare,
          lang,
          on,
          _FieldControlBase,
          _ItemControl,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        createControl : function()
        {
            this._items = [];
            var vals = this.readValue();
            for( var i = 0; i < vals.length; i++ )
            {
                var ctrl = new _ItemControl({ parent : this, value : vals[ i ] } ).placeAt( this.controlNode );
                this._items.push( ctrl );
                this.own( on( ctrl, "change", lang.hitch( this, this.writeValue ) ) );
            }
            this._newItemControl = new _ItemControl({ parent : this, addControl : true, value : "" } ).placeAt( this.controlNode );
            this.own( on( this._newItemControl, "change", lang.hitch( this, this.writeValue ) ) );
        },
        getValue : function()
        {
            var out = [];
            for( var i = 0; i < this._items.length; i++ )
            {
                var val = this._items[ i ].get( "value" );
                if( val )
                {
                    out.push( val );
                }
            }
            if( this._newItemControl.get( "value" ) )
            {
                out.push( this._newItemControl.get( "value" ) );
            }
            return out;
        },
        addItem : function( from )
        {
            this._items.push( new _ItemControl({ parent : this, value : from.get( "value" )} ).placeAt( this._newItemControl.domNode, "before" ) );
            from.set( "value", "" );
            this._newItemControl.focus();
        },
        deleteItem : function( item )
        {
            item.destroy();
            this._items.splice( this._items.indexOf( item ), 1 );
            this.writeValue();
        }
    });
});