define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/fx",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/layout/BorderContainer",
         "dijit/layout/TabContainer",
         "dijit/layout/ContentPane",
         "dojox/mobile/ToolBarButton",
         "dojo/text!./templates/_HelpViewer.html",
         "dojo/text!../../cypher/doc/copyright.txt" ],
function( declare,
          lang,
          fx,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          BorderContainer,
          TabContainer,
          ContentPane,
          Button,
          template,
          copyright )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        title : "",
        copyright : copyright,
        manager : {},
        templateString : template,
        helpData : {},
        postCreate : function()
        {
            for( var o in this.helpData )
            {
                this.mainTabContainer.addChild( new ContentPane({ title : o, content : this.helpData[ o ] }) );
            }
        },
        hide : function()
        {
            this.manager.transitionTo( "main" );
        }
    });
});