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
            var template = "When ${action}, ";
            var eType = this._fromArray( cypher_type.damage_types ).name; // FIXME: better name.
            if( eType == "physical" )
            {
                template += "restores ${points} points to ${damage_type}";
                this._cypher.damage_type = this._fromObject( lang.mixin({ "any pool" : { "prob" : 50 } }, bricks.types.buff_types ) ).name;
                this._cypher.points = this._cypher.damage_type.indexOf( "pool" ) == -1 ? Math.ceil( level ) : level * 3;
            }
            else
            {
                template += "cures ${status_effect}";
                this._cypher.status_effect = this._fromObject( bricks.types.status_types ).name;
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