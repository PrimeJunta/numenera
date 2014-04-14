define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json" ],
function( declare, lang, json ) {
    return declare([], {
        HOMEBREW_STORE_NAME : "_CG_HOMEBREW_STORE",
        migrateOldStores : function()
        {
            for( var o in window.localStorage )
            {
                if( !this._isNewStyleEntry( o ) )
                {
                    var val = this._parseStoredItem( o );
                    if( o.indexOf( "_CCG_" ) == 0 )
                    {
                        // it's a cloud setting
                        this._migrateItem( this._settingsStore, val, o, o );
                    }
                    else
                    {
                        if( val.name ) // it's a readable character
                        {
                            var oName = val.name;
                            var n = 1;
                            while( this._characterStore.get( val.name ) )
                            {
                                val.name = oName + "-" + n;
                                n++;
                            }
                            this._migrateItem( this._characterStore, val, val.name, o );
                        }
                        else
                        {
                            // it's garbage
                            delete window.localStorage[ o ];
                        }
                    }
                }
            }
            //console.log( "NOW STORE IS", window.localStorage );
        },
        _migrateItem : function( store, value, newKey, oldKey )
        {
            if( value )
            {
                store.put( newKey, value );
            }
            delete window.localStorage[ oldKey ];
        },
        _isNewStyleEntry : function( key )
        {
            return (( key.indexOf( this.CHARACTER_STORE_NAME ) == 0 || key.indexOf( this.SETTINGS_STORE_NAME ) == 0 || key.indexOf( this.HOMEBREW_STORE_NAME ) == 0 ) && window.localStorage[ key ] != "[object Object]" );
        },
        _parseStoredItem : function( key )
        {
            var rawVal = window.localStorage[ key ];
            try
            {
                return json.parse( rawVal );
            }
            catch( e )
            {
                //console.log( "Couldn't parse, returning raw value" );
                if( rawVal == "[object Object]" )
                {
                    // Clean up garbage
                    delete window.localStorage[ key ];
                    return false;
                }
                else
                {
                    return rawVal;
                }
            }
        }
    });
});