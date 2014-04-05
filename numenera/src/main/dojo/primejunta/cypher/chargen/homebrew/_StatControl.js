define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/NumberTextBox",
         "./_FieldControlBase",
         "dojo/text!./templates/_StatControl.html" ],
function( declare,
          lang,
          NumberTextBox,
          _FieldControlBase,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        path : "stats",
        "class" : "cg-statControl",
        field_class : "cg-statInput",
        stat_constraints : {},
        postMixInProperties : function()
        {
            this.inherited( arguments );
            if( !this.stat_constraints.fixed && this.definition.stat_constraints )
            {
                this.stat_constraints = lang.mixin( lang.clone( this.stat_constraints ), this.definition.stat_constraints );
            }
        },
        createControl : function()
        {
            this._control = new NumberTextBox({
                "class" : this.field_class,
                value : this.value,
                constraints : this.stat_constraints
            } ).placeAt( this.controlNode );
        }
    });
});