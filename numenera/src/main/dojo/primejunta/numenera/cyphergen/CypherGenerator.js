define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/query",
         "../_startup",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/CypherGenerator.html",
         "dojo/text!./doc/changelog.html",
         "dojo/text!./doc/about.html" ],
function( declare,
          lang,
          domQuery,
          _startup,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
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
            this.start(); // from startup
        },
        /**
         * Calls _showHelp with about (that's an included text module).
         */
        showHelp : function()
        {
            this._showHelp( about );
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