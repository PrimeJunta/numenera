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
         "./_PrintView",
         "./_PlayView",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "./data/feats",
         "./data/exceptions",
         "./optional/customize/data/advancement",
         "./optional/mutant/data/mutations",
         "dojo/text!./templates/CharacterGenerator.html",
         "dojo/text!./doc/overview.html",
         "dojo/text!./doc/rules.html",
         "dojo/text!./doc/technical.html",
         "dojo/text!../../cypher/doc/privacy.html",
         "dojo/text!../../cypher/doc/licenses.html",
         "dojo/text!./doc/changelog.html" ],
function( declare,
          lang,
          _CharacterGeneratorBase,
          _StatsPane,
          _SplashCharacterPane,
          _PrintView,
          _PlayView,
          descriptors,
          types,
          foci,
          featAdjustments,
          featStackingExceptions,
          customAdvancement,
          mutations,
          template,
          overview,
          rules,
          technical,
          privacy,
          licenses,
          changelog )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _CharacterGeneratorBase ], {
        /**
         * Filename for character backups.
         */
        dataFileName : "Ninth-World-Heroes",
        /**
         * Public version number.
         */
        version : "2.4.4",
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
         * Help data.
         */
        helpData : {
            "Overview" : overview,
            "Rules" : rules,
            "Privacy" : privacy,
            "Technical" : technical,
            "Changelog" : changelog,
            "Licenses" : licenses
        },
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
         * Google API properties.
         */
        gapiProperties : {
            clientId : "338654774169-25j70ob558p04a1mdpp4ajdldrocuatt.apps.googleusercontent.com",
            apiKey : "AIzaSyCG2ym8CHx_tQlyCuakiK9HUQzLQVSV5fY"
        },
        /**
         * Template.
         */
        templateString : template,
        /**
         * Path to icons and other graphic goodies.
         */
        iconSrc : require.toUrl( "primejunta/numenera/themes/images" ),
        portraitHome : require.toUrl( "assets/numenera/portraits" ),
        /**
         * Return a _PrintView.
         */
        createPrintView : function( props )
        {
            return new _PrintView( props );
        },
        createPlayView : function( props )
        {
            return new _PlayView( props );
        },
        createSplashCharacterPane : function( props )
        {
            return new _SplashCharacterPane( props );
        }
    });
});