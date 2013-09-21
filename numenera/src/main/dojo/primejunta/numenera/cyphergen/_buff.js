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
        _getBuff : function( cypher_type, item_type, action, level )
        {
            var template = "When ${action}, adds ${points} points to ${damage_type} for ${duration}";
            this._cypher.duration = this._fromArray( cypher_type.durations ).name;
            this._cypher.damage_type = this._fromObject( bricks.types.buff_types ).name;
            this._cypher.points = this._cypher.damage_type.indexOf( "pool" ) == -1 ? Math.ceil( level / 2 ) : level * 3;
            this._cypher.cypher_name = "enhancer";
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