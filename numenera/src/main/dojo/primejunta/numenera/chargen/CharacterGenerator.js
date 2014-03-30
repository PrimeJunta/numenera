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
         "./data/origins/numenera/descriptors",
         "./data/origins/numenera/types",
         "./data/origins/numenera/feats",
         "./data/origins/numenera/exceptions",
         "./data/origins/numenera/mutant/mutations",
         "./data/origins/strange/descriptors",
         "./data/origins/strange/types",
         "./data/origins/strange/feats",
         "./data/origins/strange/exceptions",
         "./data/recursions/earth/foci",
         "./data/recursions/ardeyn/foci",
         "./data/recursions/ruk/foci",
         "./data/recursions/ninth_world/foci",
         "./optional/customize/data/advancement",
         "primejunta/numenera/cyphergen/CypherGenerator",
         "dojo/text!./templates/CharacterGenerator.html" ],
function( declare,
          lang,
          _CharacterGeneratorBase,
          _StatsPane,
          _SplashCharacterPane,
          _PrintView,
          _PlayView,
          numeneraDescriptors,
          numeneraTypes,
          numeneraFeatAdjustments,
          numeneraFeatStackingExceptions,
          numeneraMutations,
          strangeDescriptors,
          strangeTypes,
          strangeFeatAdjustments,
          strangeFeatStackingExceptions,
          earthFoci,
          ardeynFoci,
          rukFoci,
          ninthWorldFoci,
          customAdvancement,
          CypherGenerator,
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
         * Descriptor data.
         */
        descriptors : numeneraDescriptors,
        /**
         * Type data.
         */
        types : numeneraTypes,
        /**
         * Focus data.
         */
        foci : ninthWorldFoci,
        /**
         * Current origin.
         */
        origin : "numenera",
        /**
         * Current recursion.
         */
        recursion : "ninth_world",
        /**
         * Origin map.
         */
        origins : {
            "numenera" : {
                "types" : numeneraTypes,
                "descriptors" : numeneraDescriptors,
                "featAdjustments" : numeneraFeatAdjustments,
                "featStackingExceptions" : numeneraFeatStackingExceptions,
                "defaultRecursion" : "ninth_world",
                "optionalData" : {
                    "mutations" : numeneraMutations
                }
            },
            "strange" : {
                "types" : strangeTypes,
                "descriptors" : strangeDescriptors,
                "featAdjustments" : strangeFeatAdjustments,
                "featStackingExceptions" : strangeFeatStackingExceptions,
                "defaultRecursion" : "earth",
                "optionalData" : {
                }
            }
        },
        /**
         * Recursion map.
         */
        recursions : {
            "ninth_world" : ninthWorldFoci,
            "earth" : earthFoci,
            "ardeyn" : ardeynFoci,
            "ruk" : rukFoci
        },
        /**
         * Adjustment data applied from feats.
         */
        featAdjustments : numeneraFeatAdjustments,
        /**
         * Exceptions to feat stacking restrictions.
         */
        featStackingExceptions : numeneraFeatStackingExceptions,
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
            mutations : numeneraMutations
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
        /**
         * Where the portraits are.
         */
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
        },
        createCypherGenerator : function( props )
        {
            return new CypherGenerator( props );
        }
    });
});