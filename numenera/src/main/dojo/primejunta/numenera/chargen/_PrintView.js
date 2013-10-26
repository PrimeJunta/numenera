/**
 * Printable character record. Connected to CharacterGenerator, and uses _CharacterValidator to
 * process and validate the data. Much of the beef is actually in the template.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/charview/_PrintViewBase",
         "dojo/text!./templates/_PrintView.html" ],
function( declare,
          _PrintViewBase,
          template )
{
    return declare([ _PrintViewBase ], {
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