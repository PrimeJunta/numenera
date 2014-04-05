define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/Evented",
         "dojo/Deferred",
         "dojo/_base/fx",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          domClass,
          Evented,
          Deferred,
          fx,
          ContentPane )
{
    return declare([ ContentPane, Evented ], {
        style : "position:absolute;top:0;left:0;bottom:0;right:0;",
        shown : false,
        controller : {},
        name : "",
        postMixInProperties : function()
        {
            if( this.shown )
            {
                this.style += "z-index:1;opacity:100;";
            }
            else
            {
                this.style += "z-index:-9999;opacity:0;";
            }
        },
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.shown )
            {
                domClass.add( this.domNode, "pjViewVisible" );
                this.controller.showingView = this;
            }
            else
            {
                domClass.add( this.domNode, "pjViewHidden" );
            }
        },
        show : function()
        {
            this.controller.showingView = this;
            domClass.add( this.domNode, "pjViewVisible" );
            domClass.remove( this.domNode, "pjViewHidden" );
            this.resize();
            return this._transition( fx.fadeIn, 1, "show" );
        },
        hide : function()
        {
            if( this.controller.showingView == this )
            {
                delete this.controller.showingView;
            }
            domClass.remove( this.domNode, "pjViewVisible" );
            domClass.add( this.domNode, "pjViewHidden" );
            return this._transition( fx.fadeOut, -9999, "hide" );
        },
        _transition : function( func, zIndex, evt )
        {
            var def = new Deferred();
            this.controller.transitionInProgress = true;
            this.domNode.style.zIndex = zIndex;
            func({
                node : this.domNode,
                onEnd : lang.hitch( this, function() {
                    this.emit( evt, { bubbles : true, cancelable : true });
                    this.controller.transitionInProgress = false;
                    def.resolve();
                })
            }).play();
            return def;
        }
    });
});