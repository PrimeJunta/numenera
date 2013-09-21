define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/string",
         "dojo/query",
         "../_startup",
         "dojo/_base/fx",
         "dojox/fx/flip",
         "dojo/on",
         "./CypherFactory",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_Cypher.html",
         "dojo/text!./templates/CypherGenerator.html",
         "dojo/text!./doc/changelog.html",
         "dojo/text!./doc/about.html" ],
function( declare,
          lang,
          string,
          domQuery,
          _startup,
          baseFx,
          flip,
          on,
          CypherFactory,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          cypher,
          template,
          changelog,
          about ) 
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _startup ], {
        version : "0.0.1",
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
        templateString : template,
        postMixInProperties : function()
        {
            this.inherited( arguments );
            this.setup(); // from _startup
        },
        postCreate : function()
        {
            this._cf = new CypherFactory();
            this.start(); // from startup
        },
        showCypher : function()
        {
            this._flip( this.cypherCardBack, this.cypherCardFront, "#f4f4f0" );
            this.cypherCardFront.innerHTML = string.substitute( cypher, this._cf.getRandomCypher() );
        },
        hideCypher : function()
        {
            this._flip( this.cypherCardFront, this.cypherCardBack, "#f4f4f0" );
        },
        /**
         * Calls _showHelp with about (that's an included text module).
         */
        showHelp : function()
        {
            this._showHelp( about );
        },
        _flip : function( from, to, endColor )
        {
            var anim = flip.flip({ 
                node: from,
                dir: "right",
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
        /**
         * Calls _showHelp with changelog (that's an included text module).
         */
        showChangeLog : function()
        {
            this._showHelp( changelog );
        }
    });
});