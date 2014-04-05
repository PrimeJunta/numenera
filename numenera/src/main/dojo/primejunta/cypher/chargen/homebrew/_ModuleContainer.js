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
        postCreate : function()
        {
            this.populate();
        },
        populate : function()
        {
            this._controls = {};
            for( var o in this.data.payload_data )
            {
                this._controls[ o ] = new _WordWidget({ open : false, instance : this.data.payload_data[ o ], oid : o } );
                this.addChild( this._controls[ o ] );
                this._controls[ o ].startup();
            }
        }
    });
});