/**
 * Printable character record. Connected to CharacterGenerator, and uses _CharacterValidator to
 * process and validate the data. Much of the beef is actually in the template.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/charview/_PlayViewBase",
         "dojo/text!./templates/_PlayView.html" ],
function( declare,
          _PlayViewBase,
          template )
{
    return declare([ _PlayViewBase ], {
        /**
         * Image source.
         */
        iconSource : require.toUrl( "primejunta/cypher/themes/images" ),
        /**
         * Template. A lot of the beef is here.
         */
        templateString : template
    });
});