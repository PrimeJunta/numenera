define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/text!../doc/overview.html",
         "dojo/text!../doc/rules.html",
         "dojo/text!../doc/technical.html",
         "dojo/text!../../cypher/doc/privacy.html",
         "dojo/text!../../cypher/doc/licenses.html",
         "dojo/text!../doc/changelog.html",
         "../../cypher/help/_HelpViewerBase" ],
function( declare,
          lang,
          overview,
          rules,
          technical,
          privacy,
          licenses,
          changelog,
          _HelpViewerBase )
{
    return declare([ _HelpViewerBase ], {
        title : "Character Creation Utilities",
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
        }
    });
});