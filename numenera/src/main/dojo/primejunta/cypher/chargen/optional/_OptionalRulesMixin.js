/**
 * Mixin for adding optional character development features to CharacterGenerator. The base class
 * and other mixins only contain calls to these methods at the appropriate points.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./customize/CharacterCustomizer" ],
function( declare,
          lang,
          CharacterCustomizer )
{
    return declare([], {
        /**
         * Called in postCreate. Sets up handler for mutants and a CharacterCustomizer in its node.
         */
        setupOptionals : function()
        {
            this._characterCustomizer = new CharacterCustomizer({ manager : this }, this.customizeButtonNode );
        },
        /**
         * Called in _data._getCharacterData. Returns _chararacterCustomizer.getData; will get appended
         * to data string.
         */
        getOptionalData : function()
        {
            return this._characterCustomizer.getData();
        },
        /**
         * Inverse of getOptionalData: called in _data._populateFromStoredData. Passes it to
         * _characterCustomizer for processing.
         */
        populateOptionalData : function( kwObj )
        {
            this._characterCustomizer.populateFromData( kwObj.cust );
        },
        /**
         * Clears _characterCustomizer.
         */
        _clear : function()
        {
            this.inherited( arguments );
            this._characterCustomizer.clear();
        }
    });
});