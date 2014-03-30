var profile = {
    packages : [
        "dojo",
        "dijit",
        "dojox",
        "primejunta"
    ],
    resourceTags : {
        amd: function (filename, mid) {
            return /\.js$/.test(filename);
        }
    },
    basePath : ".",
    action : "release",
    cssOptimize : "comments",
    mini : true,
    optimize : "closure",
    layerOptimize : "closure",
    selectorEngine : "acme",
    localeList : "en",
    layers : {
        "dojo/dojo" : {
            include : [ "dojo/dojo", "dojo/_base/declare", "dojo/i18n", "dojo/domReady", "dojo/parser" ],
            boot : true,
            customBase : true
        },
        "dijit/dijit" : {
            include : [ "dijit/dijit-all" ]
        },
        "primejunta/numenera" : {
            include : [ "primejunta/numenera/chargen/CharacterGenerator" ]
        }
    },
    staticHasFeatures : {
        "dojo-sync-loader" : 1,
        "dojo-xhr-factory" : 1,
        "dojo-test-sniff" : 0
    }
};