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
        FEATURE_LIST : [ "types", "descriptors" ],
        getHomebrewData : function( isStartup )
        {
            console.log( "GHD" );
            if( !this._hbstore )
            {
                this._hbstore = new Store( this.HOMEBREW_STORE_NAME );
            }
            if( !isStartup && !this._hbstore.get( "_HAS_CHANGED" ) )
            {
                return;
            }
            else
            {
                this._hbstore.remove( "_HAS_CHANGED" );
            }
            for( var o in this.origins )
            {
                for( var d in this.origins[ o ] )
                {
                    if( this.FEATURE_LIST.indexOf( d ) != -1 )
                    {
                        var _d = ( d == "types" ? "type" : d == "descriptors" ? "descriptor" : d );
                        this._cloneFeature( this.origins[ o ], d );
                        this._augmentWithHomebrew( this.origins[ o ][ d ], o, _d );
                    }
                }
            }
            for( var r in this.recursions )
            {
                if( r.charAt( 0 ) != "_" )
                {
                    this._cloneFeature( this.recursions, r );
                    this._augmentWithHomebrew( this.recursions[ r ], r, "focus" );
                }
            }
            console.log( "AUGMENTED IS NOW", this.origins, this.recursions );
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