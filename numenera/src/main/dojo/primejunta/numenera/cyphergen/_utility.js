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
            var template = "When ${action}, ${effect} for ${duration}.";
            var effect = this._fromObject( cypher_type.effect_types );
            this._cypher.effect = effect.name;
            var durMod = effect.duration_modifier ? -effect.duration_modifier : 0;
            this._cypher.duration = this._fromArray( cypher_type.durations, cypher_type.duration_probs.slice( durMod ) ).name;
            var rangeMod = effect.range_modifier ? -effect.range_modifier : 0;
            this._cypher.range = this._fromArray( cypher_type.ranges, cypher_type.range_probs.slice( rangeMod ) ).name;
            try
            {
                this._cypher.description = string.substitute( template, this._cypher );
                this._cypher.description = string.substitute( this._cypher.description, this._cypher ); // gets range data in
            }
            catch( e )
            {
                console.log( "PROBLEM!", template, this._cypher, e );
            }
        }
    });
});