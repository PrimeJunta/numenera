define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json",
         "dijit/TitlePane",
         "./_WordWidget",
         "dijit/layout/TabContainer" ],
function( declare,
          lang,
          json,
          TitlePane,
          _WordWidget,
          TabContainer )
{
    return declare([ TabContainer ], {
        data : {},
        tabPosition : "left",
        "class" : "num-moduleContainer",
        stat_constraints : {},
        postCreate : function()
        {
            this.watch( "selectedChildWidget", function( name, oval, nval )
            {
                nval.populate();
            });
            this.populate();
            console.log( "DATA", this.data );
        },
        populate : function()
        {
            this._controls = {};
            var _fip = false;
            for( var o in this.data.payload_data )
            {
                this._controls[ o ] = new _WordWidget({ open : false, instance : this.data.payload_data[ o ], oid : o, has_stats : this.has_stats, stat_constraints : this.stat_constraints } );
                this.addChild( this._controls[ o ] );
                if( !_fip )
                {
                    this._controls[ o ].populate();
                    _fip = true;
                }
            }
        }
    });
});