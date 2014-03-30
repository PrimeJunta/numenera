/**
 * Wrapper for browser localStorage, emulating dojox.storage API. Automatically parses/stringifies JSON values.
 */
define([ "dojo/_base/declare",
         "dojo/json" ],
function( declare,
          json )
{
    return declare([], {
        put : function( key, val )
        {
            window.localStorage[ key ] = json.stringify( val );
        },
        get : function( key )
        {
            var rawVal = window.localStorage[ key ];
            try
            {
                return json.parse( rawVal );
            }
            catch( e )
            {
                console.log( "Error parsing value:", key, rawVal );
                if( rawVal == "[object Object]" ) // TODO: Remove when no longer necessary. Hack to get rid of broken values.
                {
                    this.remove( key );
                    return false;
                }
                else
                {
                    return window.localStorage[ key ];
                }
            }
        },
        remove : function( key )
        {
            delete window.localStorage[ key ];
        },
        getKeys : function()
        {
            return Object.keys( window.localStorage );
        }
    });
});