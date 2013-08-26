define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/_CharacterRecord.html" ],
function( declare,
          lang,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin ], {
        manager : {},
        templateString : template
    });
});