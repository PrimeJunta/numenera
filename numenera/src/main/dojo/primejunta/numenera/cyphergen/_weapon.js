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
        _getWeapon : function( cypher_type, item_type, action, level )
        {
            if( cypher_type.action_types[ this._cypher.action ].effect_types )
            {
                this._cypher.effect = this._fromArray( cypher_type.action_types[ this._cypher.action ].effect_types ).name;
            }
            else
            {
                this._cypher.effect = this._fromObject( cypher_type.effect_types ).name;
            }
            if( !this._cypher.cypher_name )
            {
                this._cypher.cypher_name = cypher_type.effect_types[ this._cypher.effect ].cypher_name;
            }
            this._cypher.range = this._fromArray( cypher_type.effect_types[ this._cypher.effect ].range ).name;
            var areaMod = cypher_type.effect_types[ this._cypher.effect ].area[ 0 ];
            var areaLow = cypher_type.effect_types[ this._cypher.effect ].area[ 1 ];
            areaMod = array.indexOf( cypher_type.range_types, this._cypher.range ) + areaMod;
            areaMod = areaMod > 0 ? areaMod : 1;
            areaLow = areaLow < areaMod ? areaLow : areaMod - 1;
            var rArr = cypher_type.radius_types.slice( areaLow, areaMod );
            this._cypher.radius = this._fromArray( rArr ).name;
            var eType = this._fromArray( cypher_type.damage_types ).name; // FIXME: better name.
            var template = "When ${action}, ${effect} ";
            if( this._cypher.effect == "strikes" )
            {
                template += "causing ";
            }
            else
            {
                template += "at ${range} range on a ${radius}, causing ";
            }
            var duration = false;
            if( eType == "physical" )
            {
                this._cypher.damage_type = this._fromObject( bricks.types.damage_types ).name;
                this._cypher.points = level * 3;
                template += "${points} points of ${damage_type} damage";
            }
            else if( eType == "status" )
            {
                this._cypher.status_type = this._fromObject( bricks.types.status_types ).name;
                if( bricks.types.status_types[ this._cypher.status_type ].duration )
                {
                    this._cypher.duration = this._fromArray( bricks.types.status_types[ this._cypher.status_type ].duration ).name;
                }
                else
                {
                    this._cypher.duration = this._fromArray( cypher_type.durations ).name
                }
                template += "${status_type} ${duration}";
            }
            if( duration )
            {
                this._cypher.duration = this._fromArray( cypher_type.durations ).name;
                template += " for ${duration}"
            }
            template += ".";
            try
            {
                this._cypher.description = string.substitute( template, this._cypher );
            }
            catch( e )
            {
                console.log( "ERROR", template, this._cypher );
            }
        }
    });
});