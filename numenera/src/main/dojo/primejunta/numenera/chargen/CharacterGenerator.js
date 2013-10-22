/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 * 
 * See also _data, _lists, and _stats. Some of the logic has been parceled out there.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/cypher/chargen/_CharacterGeneratorBase",
         "primejunta/cypher/chargen/_StatsPane",
         "./_SplashCharacterPane",
         "./_CharacterRecord",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "./data/feats",
         "./data/exceptions",
         "./optional/customize/data/advancement",
         "./optional/mutant/data/mutations",
         "dojo/text!./templates/CharacterGenerator.html",
         "dojo/text!./doc/about.html",
         "dojo/text!./doc/changelog.html" ],
function( declare,
          lang,
          _CharacterGeneratorBase,
          _StatsPane,
          _SplashCharacterPane,
          _CharacterRecord,
          descriptors,
          types,
          foci,
          featAdjustments,
          featStackingExceptions,
          customAdvancement,
          mutations,
          template,
          about,
          changelog )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _CharacterGeneratorBase ], {
        /**
         * Public version number.
         */
        version : "1.6.0",
        /**
         * Descriptor data.
         */
        descriptors : descriptors,
        /**
         * Type data.
         */
        types : types,
        /**
         * Focus data.
         */
        foci : foci,
        /**
         * Adjustment data applied from feats.
         */
        featAdjustments : featAdjustments,
        /**
         * Exceptions to feat stacking restrictions.
         */
        featStackingExceptions : featStackingExceptions,
        /**
         * General info.
         */
        about : about,
        /**
         * Changelog.
         */
        changelog : changelog,
        /**
         * Custom advancement.
         */
        customAdvancement : customAdvancement,
        /**
         * Optional data.
         */
        optionalData : {
            mutations : mutations
        },
        /**
         * Template.
         */
        templateString : template,
        /**
         * Path to icons and other graphic goodies.
         */
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
        portraitHome : require.toUrl( "primejunta/numenera/chargen/portraits" ),
        /**
         * Return a _CharacterRecord.
         */
        createCharacterRecord : function( props )
        {
            return new _CharacterRecord( props );
        },
        createSplashCharacterPane : function( props )
        {
            return new _SplashCharacterPane( props );
        }
    });
});