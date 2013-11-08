/**
 * Splash pane displayed when loading a blank character. Mostly because it looks cool.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/touch",
         "primejunta/cypher/chargen/_SplashCharacterPaneBase",
         "dojo/text!./templates/_SplashCharacterPane.html" ],
function( declare,
          lang,
          on,
          touch,
          _SplashCharacterPaneBase,
          template )
{
    return declare([ _SplashCharacterPaneBase ], {
        /**
         * Template.
         */
        templateString : template,
        postCreate : function()
        {
            this.inherited( arguments );
            this.own( on( this.helpLink, touch.press, lang.hitch( this.manager, this.manager.showHelp ) ) );
            this.own( on( this.cypherGeneratorLink, touch.press, lang.hitch( this, this.showCypherGenerator ) ) );
        },
        showCypherGenerator : function()
        {
            this.manager.showCypherGenerator();
        }
    });
});