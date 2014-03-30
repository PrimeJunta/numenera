define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dojo/cookie",
         "dojo/on",
         "dojo/touch",
         "dojo/query",
         "./View",
         "dijit/_WidgetBase" ],
function( declare,
          lang,
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
        postCreate : function()
        {
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
                var view = new View({ name : o, controller : this }).placeAt( document.body );
                this.views[ o ] = view;
                var widg = new this.modules[ o ].constructor({ controller : this, view : view }).placeAt( view );
                this.modules[ o ].instance = widg;
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
                this.views[ name ] = new View({ name : name, shown : shown, controller : this }).placeAt( document.body );
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
            var view = this.views[ name ];
            if( !view )
            {
                console.log( "No view matching", name );
                return;
            }
            else if( view == this.showingView ) // already shown, so do nothing
            {
                return;
            }
            else if( this.showingView ) // hide the showing view first
            {
                this.showingView.hide().then( lang.hitch( view, view.show ) );
            }
            else // no showing view, so just show
            {
                view.show();
            }
        },
        showModule : function( name, opts )
        {
            this.modules[ name ].instance.show( this.currentModule, opts ); // delegated to widget, because it might want to show other views than its main one.
            this.currentModule = name;
            if( this.modules[ name ].persists )
            {
                cookie( this.STARTUP_PANE_COOKIE, name, { expires : 365 } );
            }
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
                        on( lnk, touch.press, lang.hitch( this, this.showModule, o ) );
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
        }
    });
});