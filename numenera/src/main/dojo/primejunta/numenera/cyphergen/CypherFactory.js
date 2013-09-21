define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "./_cure",
         "./_buff",
         "./_countermeasure",
         "./_weapon",
         "./_enhancement",
         "./data/bricks" ],
function( declare,
          lang,
          array,
          string,
          _cure,
          _buff,
          _countermeasure,
          _weapon,
          _enhancement,
          bricks )
{
    return declare([ _cure, _buff, _countermeasure, _weapon, _enhancement ], {
        getRandomCypher : function( type )
        {
            var cypher_type = type ? bricks.cypher_types[ type ] : this._fromObject( bricks.cypher_types );
            var item_type = this._fromObject( cypher_type.item_types );
            var action = this._fromArray( item_type.actions );
            var level = Math.round( Math.random() * 5 + 2 );
            this._cypher = {
                cypher_class : "anoetic",
                cypher_type : cypher_type.name,
                item_type : item_type.name,
                action : action.name,
                verb : cypher_type.verb,
                level : level
            }
            switch( cypher_type.name )
            {
                case "cure" :
                    try {
                        this._getCure( cypher_type, item_type, action, level );
                    }catch(e){console.log( "CURE!", cypher_type, item_type, action, level, this._cypher )}
                    break;
                case "buff" :
                    try {
                        this._getBuff( cypher_type, item_type, action, level );
                    }catch(e){console.log( "BUFF!", cypher_type, item_type, action, level, this._cypher )}
                    break;
                case "countermeasure" :
                    try {
                        this._getCountermeasure( cypher_type, item_type, action, level );
                    }catch(e){console.log( "COUNTER!", cypher_type, item_type, action, level, this._cypher )}
                    break;
                case "weapon" :
                    try {
                        this._getWeapon( cypher_type, item_type, action, level );
                    }catch(e){console.log( "WEAPON!", cypher_type, item_type, action, level, this._cypher )}
                    break;
                case "enhancement" :
                    try {
                        this._getEnhancement( cypher_type, item_type, action, level );
                    }catch(e){console.log( "ENHANCEMENT!", cypher_type, item_type, action, level, this._cypher )}
                    break;
            }
            return {
                "name" : string.substitute( "${cypher_type}: ${item_type} (level ${level})", this._cypher ),
                "description" : this._cypher.description,
                "cypher_class" : this._cypher.cypher_class,
                "data" : this._cypher
            }
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
            return this._randomize( out, lim );
        },
        _fromObject : function( fromMap )
        {
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
                    if( arr[ i ].cypher_class )
                    {
                        this._cypher.cypher_class = arr[ i ].cypher_class;
                    }
                    if( arr[ i ].cypher_name )
                    {
                        this._cypher.cypher_name = arr[ i ].cypher_name;
                    }
                    return arr[ i ];
                }
            }
        }
    });
});