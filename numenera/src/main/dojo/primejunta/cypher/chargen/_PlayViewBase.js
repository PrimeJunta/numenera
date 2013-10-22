/**
 * Play view base. Builds on _PrintViewBase by adding some dynamic functionality.
 */
define([ "dojo/_base/declare",
         "./_CharacterViewBase" ],
function( declare,
          _CharacterViewBase )
{
    return declare([ _CharacterViewBase ], {
        closeMe : function()
        {
            this.manager.closePlayView();
        }
    });
});