define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "./_cure",
         "./_buff",
         "./_countermeasure",
         "./_weapon",
         "./_enhancement",
         "./_utility",
         "./_flavor",
         "./data/bricks",
         "./data/buffs",
         "./data/countermeasures",
         "./data/cures",
         "./data/enhancements",
         "./data/utilities",
         "./data/weapons" ],
function( declare,
          lang,
          array,
          string,
          _cure,
          _buff,
          _countermeasure,
          _weapon,
          _enhancement,
          _utility,
          _flavor,
          bricks,
          buffs,
          countermeasures,
          cures,
          enhancements,
          utilities,
          weapons )
{
    return declare([ _cure, _buff, _countermeasure, _weapon, _enhancement, _utility, _flavor ], {
        startup : function()
        {
            bricks.cypher_types = lang.mixin( bricks.cypher_types, buffs, countermeasures, cures, enhancements, utilities, weapons );
            this._started = true;
        },
        getRandomCypher : function( type )
        {
            if( !this._started )
            {
                this.startup();
            }
            this._cypher = {
                cypher_class : "anoetic"
            };
            var cypher_type = type ? bricks.cypher_types[ type ] : this._fromObject( bricks.cypher_types );
            var item_type = this._fromObject( cypher_type.item_types );
            var action = this._fromArray( item_type.actions );
            var level = Math.ceil( Math.random() * 4.5 + Math.random() * 4.5 ); // make a bit of a bell curve
            this._cypher = lang.mixin( this._cypher, {
                cypher_type : cypher_type.name,
                item_type : item_type.name,
                action : action.name,
                verb : cypher_type.verb,
                level : level
            });
            switch( cypher_type.name )
            {
                case "cure" :
                    try
                    {
                        this._getCure( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "CURE!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
                case "buff" :
                    try
                    {
                        this._getBuff( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "BUFF!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
                case "countermeasure" :
                    try
                    {
                        this._getCountermeasure( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "COUNTER!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
                case "weapon" :
                    try
                    {
                        this._getWeapon( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "WEAPON!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
                case "enhancement" :
                    try
                    {
                        this._getEnhancement( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "ENHANCEMENT!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
                case "utility" :
                    try
                    {
                        this._getUtility( cypher_type, item_type, action, level );
                    }
                    catch( e )
                    {
                        //console.log( "UTILITY!", cypher_type, item_type, action, level, this._cypher, e );
                        return this.getRandomCypher( type );
                    }
                    break;
            }
            var flavor = this.getFlavor( this._cypher ).replace( /(\s+)/g, " " );
            var descr = this._cypher.description.replace( /(\s+)/g, " " );
            return {
                "name" : string.substitute( "${cypher_type}: ${item_type} (level ${level})", this._cypher ),
                "description" : descr,
                "flavor" : flavor,
                "cypher_class" : this._cypher.cypher_class,
                "data" : this._cypher
            }
        },
        _getEffectType : function()
        {
            return this._fromArray( )
        },
        _fromArray : function( fromArr, probArr )
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
                else if( probArr )
                {
                    cur = [ fromArr[ i ], probArr[ i ] ? probArr[ i ] : 0 ]
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
        _fromObject : function( fromMap, modifyName, alwaysUseBaseName )
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
            return this._randomize( out, lim, modifyName, alwaysUseBaseName );
        },
        _randomize : function( arr, lim, modifyName, alwaysUseBaseName )
        {
            var rn = Math.random() * lim;
            for( var i = 0; i < arr.length; i++ )
            {
                if( arr[ i ].roll >= rn )
                {
                    if( arr[ i ].cypher_class )
                    {
                        this._cypher.cypher_class = this._fromArray( arr[ i ].cypher_class ).name;
                    }
                    if( arr[ i ].cypher_name )
                    {
                        this._cypher.cypher_name = this._fromArray( arr[ i ].cypher_name ).name;
                    }
                    if( modifyName )
                    {
                        if( arr[ i ].cypher_name_qualifier && !alwaysUseBaseName )
                        {
                            this._cypher.cypher_name_qualifier = arr[ i ].cypher_name_qualifier;
                        }
                        else
                        {
                            this._cypher.cypher_name_qualifier = arr[ i ].name;
                        }
                    }
                    return arr[ i ];
                }
            }
        },
        _getModifiedProperty : function( sourceArray, probArray, modifier )
        {
            var probs = lang.clone( probArray );
            if( modifier )
            {
                if( modifier < 0 )
                {
                    probs = probs.slice( -modifier );
                }
                else
                {
                    for( var i = 0; i < modifier; i++ )
                    {
                        probs.unshift( 0 );
                    }
                }
            }
            return this._fromArray( sourceArray, probs ).name;
        }
    });
});