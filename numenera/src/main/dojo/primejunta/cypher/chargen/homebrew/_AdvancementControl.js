define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FieldControlBase",
         "dojo/text!./templates/_AdvancementControl.html" ],
function( declare,
          lang,
          _FieldControlBase,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        createControl : function()
        {
            console.log( "DEF", this.definition, "INST", this.instance, "PATH", this.path );
            var vals = this.readValue();
            console.log( "ADVANCEMENT IS", vals, this.instance.advancement );
        },
        readValue : function()
        {
            console.log( "FURRLD", this.field_id );
            return this.inherited( arguments );
        }
    });
});