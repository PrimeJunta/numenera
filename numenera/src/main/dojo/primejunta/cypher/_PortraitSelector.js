define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin" ],
function( declare,
          lang,
          _WidgetBase,
          _TemplatedMixin )
{
    return declare([ _WidgetBase, _TemplatedMixin ], {
        manager : {},
        width : "100px",
        src : "",
        templateString : '<img src="${src}" width="${width}" height="auto" alt="" data-dojo-attach-event="onClick:selectMe" class="cg-thumbnail"/>',
        selectMe : function()
        {
            this.manager.portraitSelected( this.src );
        }
    });
});