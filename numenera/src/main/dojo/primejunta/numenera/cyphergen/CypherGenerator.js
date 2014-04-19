define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/cookie",
         "dojo/_base/event",
         "dojo/string",
         "dojo/query",
         "dojo/on",
         "dojo/io-query",
         "dojo/touch",
         "dojo/dom-class",
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
          on,
          ioQuery,
          touch,
          domClass,
          CypherFactory,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          cypher,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        manager : {},
        version : "1.0.8",
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
        templateString : template,
        cypher_type : false,
        postMixInProperties : function()
        {
            this.inherited( arguments );
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
            this._cf = new CypherFactory();
        },
        showCypher : function()
        {
            this._shown = true;
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
                this._flip();
            }
            catch( e )
            {
                console.log( "Display error:", cyph );
            }
        },
        hideCypher : function()
        {
            this._shown = false;
            this._flip();
        },
        toggleCypher : function()
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
        showLicenses : function()
        {
            this.controller.showModule( "help", "Licenses" );
        },
        _flip : function()
        {
            domClass.toggle( this.cypherCard, "hover" );
        },
        show : function()
        {
            return this.controller.showView( "cyphergen" );
        }
    });
});