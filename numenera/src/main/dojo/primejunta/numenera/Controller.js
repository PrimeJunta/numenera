define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./chargen/CharacterGenerator",
         "../cypher/chargen/homebrew/_HomebrewTools",
         "./cyphergen/CypherGenerator",
         "./help/HelpViewer",
         "../ui/_ControllerBase",
         "dojo/text!primejunta/cypher/doc/copyright.txt"],
function( declare,
          lang,
          CharacterGenerator,
          _HomebrewTools,
          CypherGenerator,
          HelpViewer,
          _ControllerBase,
          copyright )
{
    return declare([ _ControllerBase ],
    {
        version : "3.0.1",
        copyright : copyright,
        modules : {
            chargen : {
                constructor : CharacterGenerator,
                label : "Character Creator",
                initial : true,
                linked : true,
                persists : true,
                properties : {}
            },
            /*

            homebrew : {
                constructor: _HomebrewTools,
                label : "Homebrew Tools",
                linked : true,
                persists : true,
                properties: {}
            },
             */
            cyphergen : {
                constructor : CypherGenerator,
                label : "Cypher Generator",
                linked : true,
                persists : true,
                properties : {}
            },
            help : {
                constructor : HelpViewer,
                label : '<i class="fa fa-question-circle"></i>',
                linked : true,
                properties : {}
            }
        },
        showLicenses : function()
        {
            this.showModule( "help", "licenses" );
        }
    });
});