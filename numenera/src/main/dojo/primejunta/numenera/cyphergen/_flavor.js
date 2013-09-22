define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "./data/flavors" ],
function( declare,
          lang,
          array,
          string,
          flavors )
{
    return declare([], {
        getFlavor : function( cypherData )
        {
            var flavor = {};
            var type = cypherData.item_type;
            var objectClass = flavors.object_types[ type ];
            var objectName = this._fromObject( objectClass.object_names );
            flavor.object_name = objectName.name;
            var minSize = objectName.min_size ? objectName.min_size : 0;
            var maxSize = objectName.max_size ? objectName.max_size : flavors.sizes.length;
            if( cypherData.effect == "strikes" )
            {
                flavor.object_name = cypherData.cypher_name;
            }
            flavor.object_size = this._fromArray( flavors.sizes.slice( minSize, maxSize ) ).name;
            flavor.object_weight = this._fromArray( flavors.weights ).name;
            flavor.adjective = this._fromArray( flavors.adjectives ).name;
            flavor.material = this._fromObject( flavors.materials ).name;
            flavor.qualifier = this._fromArray( flavors.qualifiers ).name;
            if( objectClass.qualifiers )
            {
                var q = objectClass.qualifiers;
                for( var o in q )
                {
                    if( array.indexOf( q[ o ].match, flavor[ o ] ) != -1 )
                    {
                        flavor.adjective = this._fromArray( q[ o ].adjective ).name;
                        flavor.qualifier = this._fromArray( q[ o ].qualifier ).name;
                    }
                }
            }
            for( var o in flavor )
            {
                if( flavor[ o ] == "#false" )
                {
                    flavor[ o ] = "";
                }
            }
            if( flavor.object_size != "" && ( flavor.object_weight != "" || flavor.adjective != ""  || flavor.material != "" ) )
            {
                flavor.object_size += ",";
            }
            if( flavor.object_weight != "" && ( flavor.adjective != "" ) )
            {
                flavor.object_weight += ",";
            }
            if( flavor.adjective == "shining" && flavor.object_name == "trapezohedron" )
            {
                this._cypher.description = "When the user looks deep into it in darkness, summons the Crawling Chaos which will bring about the end of the Ninth World.";
            }
            var template = "${object_size} ${object_weight} ${adjective} ${material} ${object_name} ${qualifier}";
            var out = string.substitute( template, flavor );
            out = string.trim( out );
            out = ( "aeiou".indexOf( out.charAt( 0 ) ) != -1 ? "An " : "A " ) + out;
            out += ".";
            return out;
        }
    });
});