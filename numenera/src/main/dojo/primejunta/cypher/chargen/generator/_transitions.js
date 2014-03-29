/**
 * Methods handling transitions between views in character generator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/fx",
         "dojo/Deferred" ],
function( declare,
          lang,
          fx,
          Deferred )
{
    return declare([], {
        /**
         * Transitions from currently selected view to viewName.
         * 
         * @public Deferred
         */
        transitionTo : function( /* String */ viewName )
        {
            var view = this.views[ viewName ];
            var deferred = new Deferred();
            if( view.selected )
            {
                deferred.resolve();
            }
            else
            {
                this.transitionOut().then( lang.hitch( this, this.transitionIn, viewName, deferred ) );
            }
            return deferred;
        },
        /**
         * Transitions out of the current pane. Returns deferred if provided, else a new one.
         * 
         * @public Deferred
         */
        transitionOut : function( /* Deferred */ deferred )
        {
            if( this._toip )
            {
                return;
            }
            this._toip = true;
            if( !deferred )
            {
                deferred = new Deferred();
            }
            for( var o in this.views )
            {
                if( this.views[ o ].selected )
                {
                    return this._transition( o, false, deferred );
                }
            }
            deferred.resolve();
            return deferred;
        },
        /**
         * Transitions into the pane indicated with viewName.
         * 
         * @public Deferred
         */
        transitionIn : function( /* String */ viewName, /* Deferred? */ deferred )
        {
            if( this._tiip )
            {
                return;
            }
            this._tiip = true;
            return this._transition( viewName, true, deferred );
        },
        /**
         * Returns ID of currently showing view.
         * 
         * @public String
         */
        getShowingView : function()
        {
            for( var o in this.views )
            {
                if( this.views[ o ].selected )
                {
                    return o;
                }
            }
        },
        /**
         * Performs transition to or from viewName, depending on _in (true is in, false is out).
         * 
         * @public Deferred
         */
        _transition : function( viewName, _in, deferred )
        {
            if( !deferred )
            {
                deferred = new Deferred();
            }
            var view = this.views[ viewName ];
            if( view.selected == _in ) // we're already there
            {
                deferred.resolve();
                return deferred;
            }
            else
            {
                view.selected = _in;
                if( _in )
                {
                    for( var i = 0; i < view.nodes.length; i++ )
                    {
                        view.nodes[ i ].style.display = "block";
                    }
                    this._kick();
                }
                return this._performTransition( _in ? fx.fadeIn : fx.fadeOut, view, deferred );
            }
        },
        /**
         * Performs transition specified by func, on view, resolves and returns deferred.
         * 
         * @private Deferred
         */
        _performTransition : function( func, view, deferred )
        {
            func({
                node : document.body,
                onEnd : lang.hitch( this, function() {
                    if( !view.selected )
                    {
                        for( var i = 0; i < view.nodes.length; i++ )
                        {
                            view.nodes[ i ].style.display = "none";
                        }
                        this._toip = false;
                    }
                    else
                    {
                        this._toip = false;
                        this._tiip = false;
                    }
                    deferred.resolve();
                })
            }).play();
            return deferred;
        }
    });
});