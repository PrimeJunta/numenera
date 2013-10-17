/**
 * Most of the "intelligence" of this utility is here. Assembles lists collected from CharacterGenerator,
 * merges duplicate (T)rained skills into (S)pecialized, applies bonuses from special abilities, checks for
 * duplicate perks and other stupidities, and so on. Writes the result into a cleaned-up object that can
 * go into the _CharacterRecord. Also used to check that a character is ready for advancement.
 */
define([ "dojo/_base/declare",
         "primejunta/cypher/chargen/_CharacterValidatorBase",
         "./data/feats",
         "./data/exceptions" ],
function( declare,
          _CharacterValidatorBase,
          feats,
          exceptions )
{
    return declare([ _CharacterValidatorBase ], {
        feats : feats,
        exceptions : exceptions
    });
});