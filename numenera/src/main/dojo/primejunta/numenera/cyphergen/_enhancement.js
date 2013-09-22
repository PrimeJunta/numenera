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
        _getEnhancement : function( cypher_type, item_type, action, level )
        {
            var template = "When ${action}, ${radius} ${verb} ${enhancement}. The effect lasts ${duration}.";
            var effect = this._fromObject( cypher_type.effect_types );
            this._cypher.cypher_name = this._fromArray( effect.cypher_name ).name;
            this._cypher.enhancement = effect.name;
            this._cypher.item_type 
            this._cypher.radius = "the user";
            this._cypher.verb = effect.verb_s;
            this._cypher.duration = this._fromArray( cypher_type.durations ).name;
            if( item_type.radius )
            {
                var radius = this._fromArray( item_type.radius ).name;
                if( radius != "#none" )
                {
                    this._cypher.cypher_class = "occultic";
                    this._cypher.radius = radius;
                    this._cypher.verb = effect.verb_p;
                }
            }
            try
            {
                this._cypher.description = string.substitute( template, this._cypher );
            }
            catch( e )
            {
                console.log( "GAH!", template, this._cypher, e );
            }
        }
    });
});