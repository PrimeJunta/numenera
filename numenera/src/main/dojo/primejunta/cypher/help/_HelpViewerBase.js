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
         "dojo/text!./templates/HelpViewer.html",
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
        controller : {},
        templateString : template,
        helpData : {},
        postCreate : function()
        {
            this._tabs = {};
            for( var o in this.helpData )
            {
                var _tab = new ContentPane({ title : o, content : this.helpData[ o ] });
                this._tabs[ o ] = _tab;
                this.mainTabContainer.addChild( _tab );
            }
        },
        hide : function()
        {
            this.controller.showModule( this.previousModule );
        },
        show : function( module, tab )
        {
            this.previousModule = module;
            this.controller.showView( "help" );
            if( this._tabs[ tab ] )
            {
                this.mainTabContainer.selectChild( this._tabs[ tab ] );
            }
            this.grid.resize();
        }
    });
});