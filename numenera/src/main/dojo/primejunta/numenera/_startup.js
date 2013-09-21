define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/query",
         "dojo/has" ],
function( declare, lang, domQuery, has)
{
    return declare([], {
        setup : function()
        {
            document.body.className = "tundra";
            if( !has( "ff" ) && !has( "webkit" ) && !cookie( "browserCheckAlert" ) )
            {
                alert( "This webapp has only been tested on Firefox, Google Chrome, and Apple Safari. Use at your own risk." );
                cookie( "browserCheckAlert", "1", { expires : 30 });
            }
            window.applicationCache.addEventListener( "updateready", lang.hitch( this, function( event )
            {
                console.log( "Updating application cache. Status is ", window.applicationCache.status );
                if( has( "ff" ) )
                {
                    this._reload();
                }
                else if( window.applicationCache.status == 4 ) try
                {
                    setTimeout( lang.hitch( this, this._reload ), 500 );
                    window.applicationCache.swapCache();
                    console.log( "Application cache successfully updated." );
                }
                catch( e )
                {
                    console.log( "Failed to swap cache." );
                    setTimeout( lang.hitch( this, this._reload ), 500 );
                }
            }), false );
        },
        start : function()
        {
            var loaderNode = domQuery( "div.num-noJavaScript" )[ 0 ];
            loaderNode.style.display = "none";
            this.domNode.style.display = "block";
            this.waitForLayout();
        },
        /**
         * Workaround for minor rendering glitch on iPad Chrome and Safari: the main tab container's content pane is not 
         * correctly lined up if shown immediately after postCreate.
         */
        waitForLayout : function()
        {
            if( !this.mainTabContainer )
            {
                return;
            }
            if( this.mainTabContainer._started )
            {
                this.mainTabContainer.resize();
            }
            else
            {
                setTimeout( lang.hitch( this, this.waitForLayout ), 200 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 400 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 600 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 800 );
                setTimeout( lang.hitch( this, this.waitForLayout ), 1000 );
            }
        }
    });
});