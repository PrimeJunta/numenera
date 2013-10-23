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
        transitionTo : function( viewName )
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
        transitionOut : function( deferred )
        {
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
        transitionIn : function( viewName, deferred )
        {
            return this._transition( viewName, true, deferred );
        },
        _transition : function( viewName, want, deferred )
        {
            if( !deferred )
            {
                deferred = new Deferred();
            }
            var view = this.views[ viewName ];
            if( view.selected == want ) // we're already there
            {
                deferred.resolve();
                return deferred;
            }
            else
            {
                view.selected = want;
                if( want )
                {
                    for( var i = 0; i < view.nodes.length; i++ )
                    {
                        view.nodes[ i ].style.display = "block";
                    }
                    this._kick();
                }
                return this._performTransition( want ? fx.fadeIn : fx.fadeOut, view, deferred );
            }
        },
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
                    }
                    deferred.resolve();
                })
            }).play();
            return deferred;
        }
    });
});