/**
 * Logic for the "stats" section of the CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/_StatsPaneBase",
         "dojo/text!./templates/_StatsPane.html" ],
function( declare,
          _StatsPaneBase,
          template )
{
    return declare([ _StatsPaneBase ], {
        templateString : template,
        portraitHome : require.toUrl( "primejunta/numenera/chargen/portraits" )
    });
});