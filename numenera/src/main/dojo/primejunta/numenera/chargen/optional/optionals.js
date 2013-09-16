define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./mutant/Mutant",
         "./customize/CharacterCustomizer" ],
function( declare,
          lang,
          Mutant,
          CharacterCustomizer )
{
    return declare([], {
        setupOptionals : function()
        {
            var mutant = new Mutant({ manager : this });
            this._characterCustomizer = new CharacterCustomizer({ manager : this }, this.customizeButtonNode );
        },
        getOptionalData : function()
        {
            return this._characterCustomizer.getData();
        },
        populateOptionalData : function( kwObj )
        {
            this._characterCustomizer.populateFromData( kwObj.cust );
        },
        _clear : function()
        {
            this._characterCustomizer.clear();
        }
    });
});