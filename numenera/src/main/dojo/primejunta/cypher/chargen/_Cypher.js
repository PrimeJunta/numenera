/**
 * Widget representing individual list item, which may have select and/or input controls
 * associated with it. The properties are largely determined by the data read into it when
 * it is created, and cannot be set later.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_ListItemBase",
         "dijit/form/Textarea",
         "dijit/form/Button",
         "primejunta/numenera/cyphergen/CypherFactory",
         "dojo/text!./templates/_Cypher.html"],
function( declare,
          lang,
          _ListItemBase,
          Textarea,
          Button,
          CypherFactory,
          template )
{
    return declare( "primejunta/cypher/chargen/_ListItem", [ _ListItemBase ], {
        /**
         * Template
         */
        templateString : template,
        /**
         * Data object associated with list item.
         */
        item : false,
        /**
         * Gets a random cypher from randomizer.
         */
        getRandomCypher : function()
        {
            if( !this.manager._cypherFactory )
            {
                this.manager._cypherFactory = new CypherFactory();
            }
            var cyph = this.manager._cypherFactory.getRandomCypher();
            var cypherText = "(" + this.toTitleCase( cyph.cypher_class ) + ") " + this.toTitleCase( cyph.name ) + "\n" + cyph.flavor + " " + cyph.description;
            this.inputTextarea.set( "value", cypherText );
        },
        /**
         * Returns state as string.
         */
        getText : function( force )
        {
            return this.inputTextarea.get( "value" );
        },
        clearCypher : function()
        {
            this.inputTextarea.set( "value", "" );
        }
    });
});