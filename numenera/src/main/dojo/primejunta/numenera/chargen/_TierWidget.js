/**
 * Widget representing a character tier. These are created by _AdvancementControl.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/cypher/chargen/_TierWidgetBase",
         "dojo/text!./templates/_TierWidget.html" ],
function( declare,
          lang,
          _TierWidgetBase,
          template )
{
    return declare( "primejunta.numenera.chargen._TierWidget", [ _TierWidgetBase ], {
        templateString : template
    });
});