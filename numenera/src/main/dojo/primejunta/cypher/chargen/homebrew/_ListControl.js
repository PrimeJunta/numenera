define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FieldControlBase",
         "./_ItemControl",
         "dojo/text!./templates/_ListControl.html" ],
function( declare,
          lang,
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
                this._items.push( new _ItemControl({ parent : this, value : vals[ i ] } ).placeAt( this.controlNode ));
            }
            this._newItemControl = new _ItemControl({ parent : this, addControl : true, value : "" } ).placeAt( this.controlNode );
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
        }
    });
});