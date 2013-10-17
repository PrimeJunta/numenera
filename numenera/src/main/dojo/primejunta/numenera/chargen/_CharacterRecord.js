/**
 * Printable character record. Connected to CharacterGenerator, and uses _CharacterValidator to
 * process and validate the data. Much of the beef is actually in the template.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/_CharacterRecordBase",
         "dojo/text!./templates/_CharacterRecord.html" ],
function( declare,
          _CharacterRecordBase,
          template )
{
    return declare([ _CharacterRecordBase ], {
        /**
         * Image source.
         */
        iconSource : require.toUrl( "primejunta/numenera/themes/images" ),
        /**
         * Template. A lot of the beef is here.
         */
        templateString : template
    });
});