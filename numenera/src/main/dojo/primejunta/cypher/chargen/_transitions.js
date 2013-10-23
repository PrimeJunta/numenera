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
            console.log( "TRANSITION TO", viewName );
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
            console.log( "TRANSITION", viewName, want, deferred );
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
                    setTimeout( lang.hitch( this, this._kick ), 100 );
                    for( var i = 0; i < view.nodes.length; i++ )
                    {
                        view.nodes[ i ].style.display = "block";
                    }
                }
                console.log( "REQUESTING TRANSITION", want );
                return this._performTransition( want ? fx.fadeIn : fx.fadeOut, view, deferred );
            }
        },
        _performTransition : function( func, view, deferred )
        {
            console.log( "PLAYING TRANSITION" );
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
                    console.log( "TRANSITION COMPLETE" );
                })
            }).play();
            return deferred;
        },
        /**
         * Hides the splash pane and shows the character generator pane and its main buttons node.
         */
        _showCharacterData : function()
        {
            if( this._characterDataShowing )
            {
                return;
            }
            console.log( "SCD" );
            this._characterDataShowing = true;
            return this.transitionTo( "main" );
        },
        /**
         * Hides the character generator pane and its main buttons node and resets and shows the splash pane.
         */
        _hideCharacterData : function( /* boolean */ withCurrentSelection )
        {
            if( !this._characterDataShowing )
            {
                return;
            }
            console.log( "HCD" );
            this._characterDataShowing = false;
            this._splashPane.reset( withCurrentSelection );
            return this.transitionTo( "splash" );
        }
    });
});