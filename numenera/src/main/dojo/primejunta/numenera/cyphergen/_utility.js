define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "./data/bricks" ],
function( declare,
          lang,
          array,
          string,
          bricks )
{
    return declare([], {
        _getUtility : function( cypher_type, item_type, action, level )
        {
            var template = "When @{action}, ${effect}.";
            var effect = this._fromObject( cypher_type.effect_types );
            this._cypher.effect = effect.name;
            this._cypher.duration = this._getModifiedProperty( cypher_type.durations, cypher_type.duration_probs, effect.duration_modifier );
            this._cypher.range = this._getModifiedProperty( cypher_type.ranges, cypher_type.range_probs, effect.range_modifier );
            this._cypher.area = this._getModifiedProperty( cypher_type.areas, cypher_type.area_probs, effect.area_modifier );
            try
            {
                this._cypher.description = string.substitute( template, this._cypher );
                this._cypher.description = string.substitute( this._cypher.description, this._cypher ); // gets range data in
            }
            catch( e )
            {
                console.log( "Error populating template:", template, this._cypher, e );
            }
        }
    });
});