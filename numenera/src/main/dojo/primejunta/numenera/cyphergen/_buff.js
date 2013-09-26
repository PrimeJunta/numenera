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
            var template = "When ${action},";
            var special = this._fromObject( bricks.common_data.special_effects ).name;
            if( special != "#false" )
            {
                template += special;
            }
            template += " adds ${points} points to ${damage_type} for ${duration}";
            this._cypher.duration = this._fromArray( cypher_type.durations ).name;
            this._cypher.damage_type = this._fromObject( bricks.common_data.buff_types, true ).name;
            this._cypher.points = this._cypher.damage_type.indexOf( "edge" ) == -1 ? level : Math.ceil( level / 3 );
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