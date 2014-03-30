define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/touch",
         "dojo/cookie",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/layout/BorderContainer",
         "dijit/layout/TabContainer",
         "dijit/layout/ContentPane",
         "dojox/mobile/ToolBarButton",
         "./_DescriptorWidget",
         "./_TypeWidget",
         "./_FocusWidget",
         "./_EnablerWidget",
         "dojo/text!./templates/_HomebrewTools.html" ],
function( declare,
          lang,
          on,
          touch,
          cookie,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          BorderContainer,
          TabContainer,
          ContentPane,
          Button,
          _DescriptorWidget,
          _TypeWidget,
          _FocusWidget,
          _EnablerWidget,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        title : "Homebrew Tools",
        controller : {},
        templateString : template,
        _hbTemplates : {
            "Descriptors" : {
                "widgetType" : _DescriptorWidget
            },
            "Types" : {
                "widgetType" : _TypeWidget
            },
            "Foci" : {
                "widgetType" : _FocusWidget
            },
            "Enablers" : {
                "widgetType" : _EnablerWidget
            }
        },
        postCreate : function()
        {
            this.moduleControlsNode.appendChild( this.controller.getModuleLinks( "homebrew" ) );
            for( var o in this._hbTemplates )
            {
                if( this._hbTemplates[ o ].widgetType )
                {
                    this._hbTemplates[ o ].widget = new this._hbTemplates[ o ].widgetType;
                }
            }
            for( var o in this._hbTemplates )
            {
                this.mainTabContainer.addChild( new ContentPane({ title : o, content : this._hbTemplates[ o ].widget.domNode }) );
            }
        },
        showLicenses : function()
        {
            return this.controller.showModule( "help", "Licenses" );
        },
        show : function()
        {
            return this.controller.showView( "homebrew" );
        }
    });
});