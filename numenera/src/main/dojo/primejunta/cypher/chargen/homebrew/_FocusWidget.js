define([ "dojo/_base/declare",
        "dojo/_base/lang",
        "dijit/_WidgetBase" ],
    function( declare,
              lang,
              _WidgetBase )
    {
        return declare([ _WidgetBase ], {
            postCreate : function()
            {
                this.domNode.innerHTML = "Hello, world.";
            }
        });
    });