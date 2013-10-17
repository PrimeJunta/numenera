/**
 * Manager for _TierWidgets. Controls character advancement.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/_AdvancementControlBase",
         "./_TierWidget",
         "dojo/text!./templates/_AdvancementControl.html" ],
function( declare,
          _AdvancementControlBase,
          _TierWidget,
          template )
{
    return declare([ _AdvancementControlBase ], {
        /**
         * Template.
         */
        templateString : template,
        /**
         * Create and return _TierWidget.
         */
        createTierWidget : function( props )
        {
            return new _TierWidget( props );
        }
    });
});