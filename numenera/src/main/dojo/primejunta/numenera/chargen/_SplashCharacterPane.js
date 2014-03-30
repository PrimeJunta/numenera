/**
 * Splash pane displayed when loading a blank character. Mostly because it looks cool.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/cookie",
         "dojo/on",
         "dojo/touch",
         "primejunta/cypher/chargen/_SplashCharacterPaneBase",
         "dojo/text!./templates/_SplashCharacterPane.html" ],
function( declare,
          lang,
          cookie,
          on,
          touch,
          _SplashCharacterPaneBase,
          template )
{
    return declare([ _SplashCharacterPaneBase ], {
        /**
         * Template.
         */
        templateString : template
    });
});