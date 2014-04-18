/**
 * Connector to Homebrew Tools widget. Brings in homebrewed features through the local storage.
 *
 * @private Mixin
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/storage/Store" ],
function( declare, lang, Store ) {
    return declare([], {
        HOMEBREW_STORE_NAME : "_CG_HOMEBREW_STORE",
        getHomebrewData : function()
        {
            if( !this._hbstore )
            {
                this._hbstore = new Store( this.HOMEBREW_STORE_NAME );
            }
            for( var o in this.origins )
            {
                for( var d in this.origins[ o ] )
                {
                    var _d = ( d == "types" ? "type" : d == "descriptors" ? "descriptor" : d );
                    this._cloneFeature( this.origins[ o ], d );
                    this._augmentWithHomebrew( this.origins[ o ][ d ], o, _d );
                }
            }
            for( var r in this.recursions )
            {
                for( var f in this.recursions[ r ] )
                {
                    this._cloneFeature( this.recursions, r );
                    this._augmentWithHomebrew( this.recursions[ r ], r, "focus" );
                }
            }
        },
        _augmentWithHomebrew : function( obj, contxt, ftype )
        {
            var _stored = this._hbstore.getItems( ftype.toUpperCase() + "/" + contxt + "/" );
            for( var o in _stored )
            {
                var _keys = o.split( "/" );
                // {word},{context},{oid}, can ignore {word} because we requested filtering by it
                obj[ _keys[ 2 ] ] = _stored[ o ];
            }
        },
        _cloneFeature : function( obj, fld )
        {
            if( !obj[ "_" + fld ] )
            {
                obj[ "_" + fld ] = lang.clone( obj[ fld ] );
            }
            obj[ fld ] = lang.clone( obj[ "_" + fld ] );
        }
    });
});