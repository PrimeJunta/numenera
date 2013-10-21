/**
 * Beneficial mutation control. Extends _MutationControlBase.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dojo/text!./templates/_BeneficialMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          template )
{
    return declare([ _MutationControlBase ], {
        /**
         * Type is beneficial.
         */
        type : "beneficial",
        /**
         * They're all enablers.
         */
        baseText : "Ⓔ",
        /**
         * Template.
         */
        templateString : template,
        /**
         * Writes bonuses into their fields in the template with _setBonus.
         */
        setBonuses : function( /* Object */ mutation )
        {
            this._setBonus( mutation, "mightAdjustment" );
            this._setBonus( mutation, "speedAdjustment" );
            this._setBonus( mutation, "intellectAdjustment" );
            this._setBonus( mutation, "armorAdjustment" );
            this._setBonus( mutation, "recoveryAdjustment" );
        },
        getText : function()
        {
            if( this.baseNode.style.display == "none" )
            {
                return false;
            }
            else
            {
                return this.inherited( arguments );
            }
        },
        /**
         * Sets .value of input matching adjustment to the corresponding adjustment in mutation and shows the field
         * if present; else clears and hides the field.
         */
        _setBonus : function( /* Object */ mutation, /* String */ adjustment )
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