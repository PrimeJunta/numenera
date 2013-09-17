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
        parent : {},
        type : "distinctive",
        templateString : template,
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