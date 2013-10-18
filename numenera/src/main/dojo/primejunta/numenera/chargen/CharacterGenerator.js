/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 * 
 * See also _data, _lists, and _stats. Some of the logic has been parceled out there.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/cypher/chargen/_CharacterGeneratorBase",
         "./_StatsPane",
         "./_SplashCharacterPane",
         "./_CharacterRecord",
         "./_AdvancementControl",
         "./_CharacterValidator",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "./optional/_OptionalRulesMixin",
         "./optional/customize/data/advancement",
         "dojo/text!./templates/CharacterGenerator.html",
         "dojo/text!./doc/about.html",
         "dojo/text!./doc/changelog.html" ],
function( declare,
          lang,
          _CharacterGeneratorBase,
          _StatsPane,
          _SplashCharacterPane,
          _CharacterRecord,
          _AdvancementControl,
          _CharacterValidator,
          descriptors,
          types,
          foci,
          _OptionalRulesMixin,
          customAdvancement,
          template,
          about,
          changelog )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _CharacterGeneratorBase, _OptionalRulesMixin ], {
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
         * Template.
         */
        templateString : template,
        /**
         * Path to icons and other graphic goodies.
         */
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
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
        },
        createAdvancementControl : function( props )
        {
            return new _AdvancementControl( props );
        },
        createCharacterValidator : function( props )
        {
            return new _CharacterValidator( props );
        }
    });
});