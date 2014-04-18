/**
 * Wrapper for browser localStorage, emulating dojox.storage API. Automatically parses/stringifies JSON values.
 * The difference is that it takes control of one field in localStorage, rather than the whole shebang.
 */
define([ "dojo/_base/declare",
         "dojo/json" ],
function( declare,
          json )
{
    return declare([], {
        constructor : function( storeName )
        {
            if( !storeName )
            {
                throw( new Error( "Must create a name for the local store." ) );
            }
            this.storeName = storeName;
            this._store = window.localStorage;
        },
        put : function( key, val )
        {
            this._store[ this.storeName + "_" + key ] = json.stringify( val );
        },
        get : function( key )
        {
            var rawVal = this._store[ this.storeName + "_" + key ];
            try
            {
                return json.parse( rawVal );
            }
            catch( e )
            {
                //console.log( "Error parsing value:", key, rawVal );
                return rawVal;
            }
        },
        remove : function( key )
        {
            delete this._store[ this.storeName + "_" + key ];
        },
        clear : function()
        {
            var keys = this.getKeys();
            for( var i = 0; i < keys.length; i++ )
            {
                this.remove( keys[ i ] );
            }
        },
        getItems : function( keyPf )
        {
            var keys = this.getKeys( keyPf );
            var out = {};
            for( var i = 0; i < keys.length; i++ )
            {
                var _key = keys[ i ].substring( keys[ i ].indexOf( this.storeName.length + "_" + keyPf  ));
                out[ _key ] = this.get( keys[ i ] );
            }
            return out;
        },
        getKeys : function( keyPf )
        {
            keyPf = keyPf ? keyPf : "";
            var keys = Object.keys( this._store );
            var out = [];
            for( var i = 0; i < keys.length; i++ )
            {
                if( keys[ i ].indexOf( this.storeName + "_" + keyPf ) == 0 )
                {
                    out.push( keys[ i ].substring( this.storeName.length + 1 ));
                }
            }
            return out;
        }
    });
});