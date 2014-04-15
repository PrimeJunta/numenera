define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-construct",
         "dojo/dom-class",
         "./_StatControl",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          on,
          domConstruct,
          domClass,
          _StatControl,
          ContentPane ) {
    return declare([ ContentPane ], {
        feature_properties : {},
        feature_structure : {},
        parent : {},
        instance : {},
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.feature_properties.stat_constraints.fixed )
            {
                this.stats_node = domConstruct.create( "table", { "class" : "cg-expanded", "width" : "100%" } );
                this.stats_title = domConstruct.create( "caption", { "class" : "num-activeControl", "innerHTML" : '<h2>Stats</h2>' }, this.stats_node );
            }
            else
            {
                this.stats_node = domConstruct.create( "table", { "class" : "cg-collapsed", "width" : "100%" } );
                this.stats_title = domConstruct.create( "caption", { "class" : "num-activeControl", "innerHTML" : '<h2>Stats <i class="fa fa-chevron-circle-right num-blueIcon cg-hideWhenExpanded"></i><i class="fa fa-chevron-circle-down num-blueIcon cg-hideWhenCollapsed"></i></h2>' }, this.stats_node );
                on( this.stats_title, "click", lang.hitch( this, this._toggleCollapse ) );
            }
            var tb = domConstruct.create( "tbody", {}, this.stats_node );
            var r1 = domConstruct.create( "tr", {}, tb );
            var r2 = domConstruct.create( "tr", {}, tb );
            this.stats_list_1 = domConstruct.create( "td", {}, r1 );
            this.stats_list_2 = domConstruct.create( "td", {}, r1 );
            this.set( "content", this.stats_node );
        },
        postCreate : function()
        {
            var s = 0;
            for( var o in this.feature_structure.stats_list )
            {
                var nref = ( s < 6 ? "1" : "2" );
                this.feature_structure.stats_list[ o ]._control = new _StatControl({
                    parent : this.parent,
                    field_id : o,
                    definition : this.feature_structure.stats_list[ o ],
                    instance : this.instance,
                    feature_properties : this.feature_properties }).placeAt( this[ "stats_list" + "_" + nref ] );
                s++;
            }
        },
        _toggleCollapse : function()
        {
            domClass.toggle( this.stats_node, "cg-collapsed" );
            domClass.toggle( this.stats_node, "cg-expanded" );
        }
    });
});