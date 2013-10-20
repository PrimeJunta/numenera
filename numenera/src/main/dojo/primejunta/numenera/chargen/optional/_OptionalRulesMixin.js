/**
 * Mixin for adding optional character development features to CharacterGenerator. The base class
 * and other mixins only contain calls to these methods at the appropriate points.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./mutant/data/mutations",
         "primejunta/cypher/chargen/optional/_OptionalRulesMixin" ],
function( declare,
          lang,
          mutations,
          _OptionalRulesMixin )
{
    return declare([ _OptionalRulesMixin ], {
        mutationData : mutations
    });
});