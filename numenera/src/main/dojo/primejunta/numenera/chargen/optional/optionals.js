define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./mutant/Mutant" ],
function( declare,
          lang,
          Mutant )
{
    return declare([], {
        setupOptionals : function()
        {
            var _Mutant = new Mutant({ manager : this });
        }
    });
});