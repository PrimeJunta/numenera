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
        transitionTo : function( nodes )
        {
            var deferred = new Deferred();
            if( this._currentNodes.length == nodes.length && this._currentNodes[ 0 ] == nodes[ 0 ] ) // we're already there
            {
                deferred.resolve();
            }
            else
            {
                this.transitionOut( this._currentNodes ).then( lang.hitch( this, this.transitionIn, nodes, deferred ) );
            }
            return deferred;
        },
        transitionOut : function( nodes, deferred )
        {
            return this._transition( "out", nodes, deferred );
        },
        transitionIn : function( nodes, deferred )
        {
            return this._transition( "in", nodes, deferred );
        },
        _transition : function( transition, nodes, deferred, disp )
        {
            if( !deferred )
            {
                deferred = new Deferred();
            }
            var func = transition == "out" ? fx.fadeOut : fx.fadeIn;
            if( transition == "in" )
            {
                for( var i = 0; i < nodes.length; i++ )
                {
                    nodes[ i ].style.display = "block";
                    this._kick();
                }
            }
            for( var i = 0; i < nodes.length - 1; i++ )
            {
                func({ node : nodes[ i ] }).play();
            }
            func({
                node : nodes[ nodes.length - 1 ],
                onEnd : lang.hitch( this, function() {
                    if( transition == "out" )
                    {
                        for( var i = 0; i < nodes.length; i++ )
                        {
                            nodes[ i ].style.display = "none";
                        }
                    }
                    else
                    {
                        this._currentNodes = nodes;
                    }
                    deferred.resolve();
                })
            }).play();
            return deferred;
        },
        /**
         * Hides the splash pane and shows the character generator pane and its main buttons node.
         */
        _showCharacterData : function()
        {
            return this.transitionTo( this.mainNodes );
        },
        /**
         * Hides the character generator pane and its main buttons node and resets and shows the splash pane.
         */
        _hideCharacterData : function( /* boolean */ withCurrentSelection )
        {
            this._splashPane.reset( withCurrentSelection );
            return this.transitionTo([ this._splashPane.domNode ]);
        },
    });
});