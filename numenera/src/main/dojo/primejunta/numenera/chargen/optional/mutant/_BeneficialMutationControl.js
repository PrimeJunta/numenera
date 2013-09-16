define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_BeneficialMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _MutationControlBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        type : "beneficial",
        baseText : "Ⓔ",
        templateString : template,
        setBonuses : function( mutation )
        {
            this._setBonus( mutation, "mightAdjustment" );
            this._setBonus( mutation, "speedAdjustment" );
            this._setBonus( mutation, "intellectAdjustment" );
            this._setBonus( mutation, "armorAdjustment" );
            this._setBonus( mutation, "recoveryAdjustment" );
        },
        _setBonus : function( mutation, adjustment )
        {
            if( mutation.adjustments && mutation.adjustments[ adjustment ] )
            {
                this[ adjustment + "Node" ].value = mutation.adjustments[ adjustment ];
                this[ adjustment + "Container" ].style.display = "inline-block";
            }
            else
            {
                this[ adjustment + "Node" ].value = "";
                this[ adjustment + "Container" ].style.display = "none";
            }
        }
    });
});