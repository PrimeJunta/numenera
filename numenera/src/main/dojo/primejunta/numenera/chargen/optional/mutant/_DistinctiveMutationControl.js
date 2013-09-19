/**
 * Distinctive mutation control. Extends _MutationControlBase.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_DistinctiveMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _MutationControlBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * This one has a pointer to its parent, i.e., the Mutant which created it.
         */
        parent : {},
        /**
         * Type.
         */
        type : "distinctive",
        /**
         * Template.
         */
        templateString : template,
        /**
         * Checks if mutation has adjustments or an associated beneficial. If so,
         * requests a pointer to the associated _BeneficialMutationControl from parent,
         * and either randomizes or populates its adjustments. We do it this way because
         * the _DistinctiveMutationControl has no adjustment fields; it has no adjustmen
         * fields because all of the distinctive mutations either include a random
         * beneficial mutation or have bonuses, but never both, and we wanted to keep
         * the number of fields to a minimum for users who want to fill in their own 
         * mutation data.
         */
        setBonuses : function( mutation )
        {
            var _bc = this.parent.getNextMutationControl( this );
            if( mutation.beneficial == 1 )
            {
                _bc.randomizeMutation();
                _bc.baseNode.style.display = "table-row";
                _bc.domNode.style.display = "list-item";
            }
            else if( mutation.adjustments )
            {
                _bc.inputNode.value = "";
                _bc.baseNode.style.display = "none";
                _bc.setBonuses( mutation );
                _bc.domNode.style.display = "list-item";
            }
            else
            {
                _bc.domNode.style.display = "none";
            }
        }
    });
});