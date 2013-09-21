define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/query",
         "../_startup",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/CypherGenerator.html" ],
function( declare,
          lang,
          domQuery,
          _startup,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template ) 
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _startup ], {
        templateString : template,
        postMixInProperties : function()
        {
            this.inherited( arguments );
            this.setup(); // from _startup
        },
        postCreate : function()
        {
            this.start(); // from startup
        }
    });
});