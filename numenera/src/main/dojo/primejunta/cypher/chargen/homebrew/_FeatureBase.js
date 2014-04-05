define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/layout/TabContainer",
         "./_ModuleContainer",
         "primejunta/storage/Store",
         "primejunta/ui/util" ],
function( declare,
          lang,
          TabContainer,
          _ModuleContainer,
          Store,
          util )
{
    return declare([ TabContainer ], {
        DATA_STORE_NAME : "_CG_HOMEBREW_STORE",
        FEATURE_TYPE : "",
        data : [],
        tabPosition : "top",
        nested : false,
        "class" : "cg-nestedTabs cg-leftTabs",
        has_stats : true,
        stat_constraints : {
            min : -9,
            max : 9,
            pattern : "+0;-0"
        },
        buildRendering : function()
        {
            this.inherited( arguments );
        },
        postCreate : function()
        {
            this.inherited( arguments );
            this.storage = new Store( this.DATA_STORE_NAME );
            this.getData();
            this.renderModules();
        },
        renderModules : function()
        {
            for( var i = 0; i < this.data.length; i++ )
            {
                var _title = this.data[ i ].origin ? this.data[ i ].origin : this.data[ i ].recursion;
                _title = util.prettify( _title );
                var mc = new _ModuleContainer({ title : _title, data : this.data[ i ], has_stats : this.has_stats, stat_constraints : this.stat_constraints });
                this.addChild( mc );
            }
        },
        getData : function()
        {
            var _stored = this.storage.get( this.FEATURE_TYPE );
            if( _stored )
            {
                this.data = this.data.concat( _stored );
            }
        }
    });
});