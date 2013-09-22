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
        _getCountermeasure : function( cypher_type, item_type, action, level )
        {
            var template = "When ${action}, adds ${points} point${plural} of Armor against ${damage_type} damage for ${duration}";
            var dType = this._fromObject( lang.mixin( { "physical" : { prob : 100, damage_modifier : 1 } }, bricks.common_data.damage_types ), true );
            this._cypher.damage_type = dType.name;
            this._cypher.points = level * ( dType.damage_modifier ? dType.damage_modifier : 2 );
            this._cypher.duration = this._getModifiedProperty( cypher_type.durations, cypher_type.duration_probs, dType.duration_modifier );
            this._cypher.plural = this._cypher.points > 1 ? "s" : "";
            this._cypher.cypher_name = this._fromArray( cypher_type.cypher_name ).name;
            if( item_type.range )
            {
                this._cypher.range = this._fromArray( item_type.range ).name;
                if( this._cypher.range != "#none" )
                {
                    this._cypher.cypher_class = "occultic";
                    template += " on everyone within ${range} range"
                }
            }
            template += ".";
            this._cypher.description = string.substitute( template, this._cypher );
        }
    });
});