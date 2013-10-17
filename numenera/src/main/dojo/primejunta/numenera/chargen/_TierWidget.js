/**
 * Widget representing a character tier. These are created by _AdvancementControl.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/cypher/_TierWidgetBase",
         "primejunta/numenera/chargen/optional/customize/_focus",
         "dojo/text!./templates/_TierWidget.html" ],
function( declare,
          lang,
          _TierWidgetBase,
          _focus,
          template )
{
    return declare( "primejunta.numenera.chargen._TierWidget", [ _TierWidgetBase, _focus ], {
        templateString : template
    });
});