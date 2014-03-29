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
         "dojo/text!./templates/_HomebrewTools.html",
         "dojo/text!../../../cypher/doc/copyright.txt" ],
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
          template,
          copyright )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        title : "Homebrew Tools",
        copyright : copyright,
        manager : {},
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
            this.own( on( this.helpLink, touch.press, lang.hitch( this.manager, this.manager.showHelp ) ) );
            this.own( on( this.cypherGeneratorLink, touch.press, lang.hitch( this, this.showCypherGenerator ) ) );
            this.own( on( this.characterGeneratorLink, touch.press, lang.hitch( this, this.showCharacterPane ) ) );
        },
        showCharacterPane : function()
        {
            cookie( this.manager.STARTUP_PANE_COOKIE, "splash", { expires : 365 });
            this.manager._closeSecondaryWidget( this, "splash" );
        },
        showCypherGenerator : function()
        {
            this.manager.transitionOut().then( lang.hitch( this, function() {
                this.manager.showCypherGenerator();
            }) );
        },
        showLicenses : function()
        {
            this.manager.showLicenses();
        },
        showChangeLog : function()
        {
            this.manager.showChangeLog();
        }
    });
});