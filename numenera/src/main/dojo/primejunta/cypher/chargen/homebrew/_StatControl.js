define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dijit/form/NumberTextBox",
         "./_FieldControlBase",
         "dojo/text!./templates/_StatControl.html" ],
function( declare,
          lang,
          on,
          NumberTextBox,
          _FieldControlBase,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        path : "stats",
        "class" : "cg-statControl cg-showWhenExpanded",
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
        postCreate : function()
        {
            this.inherited( arguments );
            this.checkClass();
        },
        createControl : function()
        {
            this._control = new NumberTextBox({
                "class" : this.field_class,
                value : this.value,
                constraints : this.stat_constraints
            } ).placeAt( this.controlNode );
            on( this._control, "change", lang.hitch( this, this.checkClass ) );
        },
        checkClass : function()
        {
            if( this._control.get( "value" ) )
            {
                this.domNode.className = "cg-statControl cg-showWhenCollapsed cg-showWhenExpanded";
            }
            else
            {
                this.domNode.className = "cg-statControl cg-showWhenExpanded";
                this._control.set( "value", "" );
            }
        }
    });
});