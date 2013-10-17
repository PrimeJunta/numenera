/**
 * Splash pane displayed when loading a blank character. Mostly because it looks cool.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/_SplashCharacterPaneBase",
         "dojo/text!./templates/_SplashCharacterPane.html" ],
function( declare,
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