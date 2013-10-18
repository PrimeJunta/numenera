/**
 * Mixin for adding optional character development features to CharacterGenerator. The base class
 * and other mixins only contain calls to these methods at the appropriate points.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./mutant/Mutant",
         "primejunta/cypher/chargen/optional/_OptionalRulesMixin" ],
function( declare,
          lang,
          Mutant,
          _OptionalRulesMixin )
{
    return declare([ _OptionalRulesMixin ], {
        /**
         * Called in postCreate. Sets up handler for mutants and a CharacterCustomizer in its node.
         */
        setupOptionals : function()
        {
            var mutant = new Mutant({ manager : this });
            this.inherited( arguments );
        }
    });
});