define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json",
         "dijit/_WidgetBase" ],
function( declare, lang, json, _WidgetBase ) {
    return declare([ _WidgetBase ], {
        definition : {},
        instance : {},
        postCreate : function()
        {
            this.domNode.innerHTML = json.stringify( this.instance );
        }
    });
});