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
        _getCure : function( cypher_type, item_type, action, level )
        {

            var template = "When @{action}, ";
            var special = this._fromObject( bricks.common_data.special_effects ).name;
            if( special != "#false" )
            {
                template += special;
            }
            var eType = this._fromArray( cypher_type.damage_types ).name; // FIXME: better name.
            if( eType == "physical" )
            {
                template += "restores ${points} points to ${damage_type}";
                this._cypher.damage_type = this._fromObject( lang.mixin({ "any pool" : { "prob" : 50, cypher_name_qualifier : "universal" } }, bricks.common_data.buff_types ), true ).name;
                this._cypher.points = this._cypher.damage_type.indexOf( "pool" ) == -1 ? Math.ceil( level / 3 ) : level;
                this._cypher.cypher_name = "restorative";
            }
            else
            {
                template += "cures ${status_effect} of level ${level} or lower";
                this._cypher.status_effect = this._fromObject( bricks.common_data.status_types, true, true ).name;
                this._cypher.cypher_name = "cure";
            }
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