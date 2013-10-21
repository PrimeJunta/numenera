/**
 * Powerful mutation control. Extends _MutationControlBase.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dojo/text!./templates/_PowerfulMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          template )
{
    return declare([ _MutationControlBase ], {
        /**
         * Type.
         */
        type : "powerful",
        /**
         * Template.
         */
        templateString : template
    });
});