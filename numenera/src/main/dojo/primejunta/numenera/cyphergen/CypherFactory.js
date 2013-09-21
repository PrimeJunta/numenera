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
        getRandomCypher : function()
        {
            var cypher_type = this._fromObject( bricks.cypher_types );
            var item_type = this._fromObject( cypher_type.item_types );
            var action = this._fromArray( item_type.actions );
            var level = Math.round( Math.random() * 5 + 2 );
            var imo = {
                cypher_type : cypher_type.name,
                item_type : item_type.name,
                action : action.name,
                verb : cypher_type.verb,
                level : level
            }
            var template = "When ${action}, ${verb}";
            switch( cypher_type.name )
            {
                case "cure" :
                    template = "When ${action}, ";
                    var eType = this._fromArray( cypher_type.damage_types ).name; // FIXME: better name.
                    if( eType == "physical" )
                    {
                        template += "restores ${points} points of ${damage_type}.";
                        imo.damage_type = this._fromObject( lang.mixin({ "any pool" : { "prob" : 50 } }, bricks.types.buff_types ) ).name;
                        imo.points = imo.damage_type.indexOf( "pool" ) == -1 ? Math.ceil( level ) : level * 3;
                    }
                    else
                    {
                        template += "cures ${status_effect}.";
                        imo.status_effect = this._fromObject( bricks.types.status_types ).name;
                    }
                    // TODO: status types
                    break;
                case "buff" :
                    template = "When ${action}, adds ${points} points to ${damage_type} for ${duration}.";
                    imo.duration = this._fromArray( cypher_type.durations ).name;
                    imo.damage_type = this._fromObject( bricks.types.buff_types ).name;
                    imo.points = imo.damage_type.indexOf( "pool" ) == -1 ? Math.ceil( level / 2 ) : level * 3;
                    break;
                case "weapon" :
                    if( cypher_type.action_types[ imo.action ].effect_types )
                    {
                        imo.effect = this._fromArray( cypher_type.action_types[ imo.action ].effect_types ).name;
                    }
                    else
                    {
                        imo.effect = this._fromObject( cypher_type.effect_types ).name;
                    }
                    imo.range = this._fromArray( cypher_type.effect_types[ imo.effect ].range ).name;
                    var areaMod = cypher_type.effect_types[ imo.effect ].area;
                    areaMod = array.indexOf( cypher_type.range_types, imo.range ) + areaMod;
                    areaMod = areaMod > 0 ? areaMod : 1;
                    var rArr = cypher_type.radius_types.slice( 0, areaMod );
                    console.log( areaMod, rArr );
                    imo.radius = this._fromArray( rArr ).name;
                    var eType = this._fromArray( cypher_type.damage_types ).name; // FIXME: better name.
                    template = "When ${action}, ${effect} at ${range} range on a ${radius}, causing ";
                    var duration = false;
                    if( eType == "physical" )
                    {
                        imo.damage_type = this._fromObject( bricks.types.damage_types ).name;
                        imo.points = level * 3;
                        template += "${points} points of ${damage_type} damage";
                    }
                    else if( eType == "status" )
                    {
                        imo.status_type = this._fromObject( bricks.types.status_types ).name;
                        duration = true;
                        template += "${status_type}";
                    }
                    if( duration )
                    {
                        imo.duration = this._fromArray( cypher_type.durations ).name;
                        template += " for ${duration}"
                    }
                    template += ".";
                    break;
            }
            console.log( imo );
            return {
                "name" : string.substitute( "Level ${level} ${cypher_type}: ${item_type}", imo ),
                "description" : string.substitute( template, imo )
            };
        },
        _getEffectType : function()
        {
            return this._fromArray( )
        },
        _fromArray : function( fromArr )
        {
            var out = [];
            if( fromArr.length == 1 )
            {
                return {
                    name : fromArr[ 0 ]
                };
            }
            var lim = 0;
            for( var i = 0; i < fromArr.length; i++ )
            {
                var cur = fromArr[ i ];
                if( cur.indexOf( "/" ) != -1 )
                {
                    cur = fromArr[ i ].split( "/" );
                }
                else
                {
                    cur = [ fromArr[ i ], 1 ];
                }
                out.push({
                    "name" : cur[ 0 ],
                    "roll" : lim + parseInt( cur[ 1 ] ),
                    "index" : i
                });
                lim += parseInt( cur[ 1 ] );
            }
            console.log( out );
            return this._randomize( out, lim );
        },
        _fromObject : function( fromMap )
        {
            console.log( fromMap );
            var lim = 0;
            var out = [];
            for( var o in fromMap )
            {
                var obj = fromMap[ o ];
                obj.roll = fromMap[ o ].prob + lim;
                obj.name = o;
                out.push( obj );
                lim += fromMap[ o ].prob;
            }
            return this._randomize( out, lim );
        },
        _randomize : function( arr, lim )
        {
            var rn = Math.random() * lim;
            for( var i = 0; i < arr.length; i++ )
            {
                if( arr[ i ].roll >= rn )
                {
                    return arr[ i ];
                }
            }

        }
    });
});