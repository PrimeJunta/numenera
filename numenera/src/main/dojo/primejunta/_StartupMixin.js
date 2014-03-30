define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dojo/query",
         "dojo/has",
         "dojo/on",
         "dojo/dom-style",
         "dojo/cookie",
         "dojo/_base/fx",
         "dojo/text!./cypher/doc/licenses.html" ],
function( declare,
          lang,
          domConstruct,
          domQuery,
          has,
          on,
          domStyle,
          cookie,
          fx,
          licenses )
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
            if( has( "chrome" ) && !has( "mac" ) && !has( "ios" ) )
            {
                domStyle.set( document.body, "-webkit-text-stroke", "0.4px" );
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
            this._loaderNode = domQuery( "div.num-noJavaScript" )[ 0 ];
            fx.fadeOut({
                node : this._loaderNode,
                onEnd : lang.hitch( this, this.doStart )
            }).play();
        },
        doStart : function()
        {
            this._loaderNode.style.display = "none";
            fx.fadeIn({ node : this.domNode }).play();
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
        },
        showLicenses : function()
        {
            this.controller.showModule( "help", "Licenses" );
        },
        /**
         * Hides _helpNode and shows this.domNode.
         */
        hideHelp : function()
        {
            fx.fadeOut({ node : this._helpNode, onEnd : lang.hitch( this, function() { this._helpNode.style.display = "none"; }) }).play();
        },
        /**
         * Reloads the window. Used with cache invalidation.
         */
        _reload : function()
        {
            window.location.reload();
        }
    });
});