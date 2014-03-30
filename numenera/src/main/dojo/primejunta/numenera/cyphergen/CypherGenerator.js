define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/cookie",
         "dojo/_base/event",
         "dojo/string",
         "dojo/query",
         "primejunta/_StartupMixin",
         "dojo/_base/fx",
         "dojox/fx/flip",
         "dojo/on",
         "dojo/io-query",
         "dojo/touch",
         "./CypherFactory",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_Cypher.html",
         "dojo/text!./templates/CypherGenerator.html" ],
function( declare,
          lang,
          cookie,
          event,
          string,
          domQuery,
          _StartupMixin,
          baseFx,
          flip,
          on,
          ioQuery,
          touch,
          CypherFactory,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          cypher,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _StartupMixin ], {
        manager : {},
        version : "1.0.8",
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
        templateString : template,
        cypher_type : false,
        postMixInProperties : function()
        {
            this.inherited( arguments );
            this.setup(); // from _StartupMixin
            if( window.location.hash.length > 0 )
            {
                var hs = ioQuery.queryToObject( window.location.hash.substring( 1 ) );
                if( hs.cypher_type )
                {
                    this.cypher_type = hs.cypher_type;
                }
            }
        },
        postCreate : function()
        {
            this.moduleControlsNode.appendChild( this.controller.getModuleLinks( "cyphergen" ) );
            this.own( on( this.cypherCardOverlay, "dblclick", lang.hitch( this, function( evt ) {
                event.stop( evt );
            })));
            this._cf = new CypherFactory();
            this.start(); // from startup
        },
        showCypher : function()
        {
            this._shown = true;
            this._flip( this.cypherCardBack, this.cypherCardFront, "#f4f4f0" );
            // icon-fire, icon-star
            var cyph = this._cf.getRandomCypher( this.cypher_type );
            if( cyph.cypher_class == "occultic" )
            {
                cyph.icon_class = "fa fa-fire num-redIcon";
            }
            else
            {
                cyph.icon_class = "fa fa-asterisk num-blueIcon";
            }
            try
            {
                if( !cyph.data.cypher_name_qualifier )
                {
                    cyph.data.cypher_name_qualifier = "";
                }
                this.cypherCardFront.innerHTML = string.substitute( cypher, cyph );
            }
            catch( e )
            {
                console.log( "Display error:", cyph );
            }
        },
        hideCypher : function()
        {
            this._shown = false;
            this._flip( this.cypherCardFront, this.cypherCardBack, "#f4f4f0", "left" );
        },
        toggleCypher : function( evt )
        {
            this.clearSelection();
            if( this._shown )
            {
                this.hideCypher();
            }
            else
            {
                this.showCypher();
            }
        },
        clearSelection : function()
        {
            if( document.selection && document.selection.empty )
            {
                document.selection.empty();
            }
            else if( window.getSelection )
            {
                var sel = window.getSelection();
                sel.removeAllRanges();
            }
        },
        _flip : function( from, to, endColor, dir )
        {
            var anim = flip.flip({ 
                node: from,
                dir: dir ? dir : "right",
                depth: .3,
                duration:400,
                endColor : endColor
            });
            anim.onEnd = lang.hitch( this, function(){ 
                from.style.display = "none";
                to.style.display = "block";
            })
            anim.play(); 
        },
        show : function()
        {
            this.controller.showView( "cyphergen" );
        }
    });
});