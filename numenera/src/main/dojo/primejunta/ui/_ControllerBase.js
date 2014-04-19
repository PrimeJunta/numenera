define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/has",
         "dojo/Deferred",
         "dojo/dom-style",
         "dojo/dom-construct",
         "dojo/cookie",
         "dojo/on",
         "dojo/touch",
         "dojo/query",
         "./View",
         "dijit/_WidgetBase" ],
function( declare,
          lang,
          has,
          Deferred,
          domStyle,
          domConstruct,
          cookie,
          on,
          touch,
          domQuery,
          View,
          _WidgetBase )
{
    return declare([ _WidgetBase ], {
        /**
         * Modules are started up on startup. They may control one or more views, and must implement the .show method.
         * To bring up a module (and let it control which view it shows), use this.showModule.
         */
        modules : {},
        /**
         * Views contains a named map of View objects, including those created by modules. Only one is shown at a time.
         * To bring it up, use this.showView.
         */
        views : {},
        copyright : "",
        STARTUP_PANE_COOKIE : "_pj_startup_pane_cookie",
        postMixInProperties : function()
        {
            window._pjTimeouts = [];
            if( has( "chrome" ) && !has( "mac" ) && !has( "ios" ) )
            {
                domStyle.set( document.body, "-webkit-text-stroke", "0.4px" );
            }
            window.applicationCache.addEventListener( "updateready", lang.hitch( this, function()
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
        postCreate : function()
        {
            document.body.className = "tundra";
            var startMsg = domQuery( ".num-noJavaScript" );
            var start = this.getView( "startup", true );
            start.set( "content", startMsg[ 0 ] );
            this.checkForFeatures();
        },
        startup : function()
        {
            var initialModule;
            for( var o in this.modules )
            {
                var view = new View({ name : o, controller : this }).placeAt( this.domNode );
                this.views[ o ] = view;
                this.modules[ o ].view = view;
                if( this.modules[ o ].initial )
                {
                    initialModule = o;
                }
                view.startup();
            }
            if( cookie( this.STARTUP_PANE_COOKIE ) )
            {
                this.showModule( cookie( this.STARTUP_PANE_COOKIE ) )
            }
            else if( initialModule )
            {
                this.showModule( initialModule );
            }
        },
        getView : function( name, shown )
        {
            if( !this.views[ name ])
            {
                this.views[ name ] = new View({ name : name, shown : shown, controller : this }).placeAt( this.domNode );
            }
            return this.views[ name ];
        },
        /**
         * Transitions from the showing view to the view matching name. There is no .hideView method because transitions
         * are always between views.
         *
         * @param name
         */
        showView : function( name )
        {
            var prom = new Deferred();
            var view = this.views[ name ];
            if( !view )
            {
                prom.resolve();
                return prom;
            }
            else if( view == this.showingView ) // already shown, so do nothing
            {
                prom.resolve();
                return prom;
            }
            else if( this.showingView ) // hide the showing view first
            {
                return this.showingView.hide().then( lang.hitch( view, view.show ) );
            }
            else // no showing view, so just show
            {
                return view.show();
            }
        },
        showModule : function( name, opts )
        {
            if( !this.modules[ name ].instance )
            {
                this.modules[ name ].instance = new this.modules[ name ].constructor({ controller : this, view : this.modules[ name ].view }).placeAt( this.modules[ name ].view );
            }
            var prom = this.modules[ name ].instance.show( this.currentModule, opts ); // delegated to widget, because it might want to show other views than its main one.
            this.currentModule = name;
            if( this.modules[ name ].persists )
            {
                cookie( this.STARTUP_PANE_COOKIE, name, { expires : 365 } );
            }
            return prom;
        },
        checkForFeatures : function()
        {
            // TODO: Make it check for required features like HTML5 local storage
        },
        getModuleLinks : function( mod, as )
        {
            var links = domConstruct.create( "div", {} );
            var i = 0;
            for( var o in this.modules )
            {
                if( this.modules[ o ].linked )
                {
                    if( i > 0 )
                    {
                        domConstruct.create( "span", { innerHTML : " | " }, links );
                    }
                    if( o == mod )
                    {
                        domConstruct.create( "span", { innerHTML : this.modules[ o ].label }, links );
                    }
                    else
                    {
                        var lnk = domConstruct.create( "a", { innerHTML : this.modules[ o ].label }, links );
                        on( lnk, touch.release, lang.hitch( this, this.showModule, o ) );
                    }
                    i++;
                }
            }
            if( as == "tooltip" )
            {
                // do stuff
            }
            else
            {
                return links;
            }
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