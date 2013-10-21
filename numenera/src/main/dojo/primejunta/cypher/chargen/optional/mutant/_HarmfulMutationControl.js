/**
 * Harmful mutation control. Extends _MutationControlBase.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_MutationControlBase",
         "dojo/text!./templates/_HarmfulMutationControl.html" ],
function( declare,
          lang,
          _MutationControlBase,
          template )
{
    return declare([ _MutationControlBase ], {
        /**
         * Type.
         */
        type : "harmful",
        /**
         * Base text. They're all inabilities.
         */
        baseText : "Ⓘ",
        /**
         * Template.
         */
        templateString : template
    });
});