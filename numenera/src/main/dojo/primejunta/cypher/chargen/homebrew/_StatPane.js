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
                this.stats_title = domConstruct.create( "h3", { "class" : "num-activeControl", "innerHTML" : 'Stats' }, this.containerNode );
                this.stats_node = domConstruct.create( "table", { "width" : "100%" }, this.containerNode );
                domClass.add( this.domNode, "cg-expanded" );
            }
            else
            {
                this.stats_title = domConstruct.create( "h3", { "class" : "num-activeControl", "innerHTML" : 'Stats <i class="fa fa-chevron-circle-right num-blueIcon cg-hideWhenExpanded"></i><i class="fa fa-chevron-circle-down num-blueIcon cg-hideWhenCollapsed"></i>' }, this.containerNode );
                this.stats_node = domConstruct.create( "table", { "width" : "100%" }, this.containerNode );
                domClass.add( this.domNode, "cg-collapsed" );
                on( this.stats_title, "click", lang.hitch( this, this._toggleCollapse ) );
            }
            var tb = domConstruct.create( "tbody", {}, this.stats_node );
            var r1 = domConstruct.create( "tr", {}, tb );
            this.stats_list_1 = domConstruct.create( "td", {}, r1 );
            this.stats_list_2 = domConstruct.create( "td", {}, r1 );
            this.stats_list_3 = domConstruct.create( "td", {}, r1 );
            domClass.add( this.stats_node, "cg-complexItemInput" );
        },
        postCreate : function()
        {
            var s = 0;
            this._ctrls = [];
            for( var o in this.feature_structure.stats_list )
            {
                var nref = ( s < 4 ? "1" : s < 8 ? "2" : 3 );
                this.feature_structure.stats_list[ o ]._control = new _StatControl({
                    parent : this.parent,
                    field_id : o,
                    definition : this.feature_structure.stats_list[ o ],
                    instance : this.instance,
                    feature_properties : this.feature_properties }).placeAt( this[ "stats_list" + "_" + nref ] );
                s++;
                this._ctrls.push( this.feature_structure.stats_list[ o ]._control );
            }
            this._checkBodyVisibility();
        },
        _toggleCollapse : function()
        {
            domClass.toggle( this.domNode, "cg-collapsed" );
            domClass.toggle( this.domNode, "cg-expanded" );
            this._checkBodyVisibility();
        },
        _checkBodyVisibility : function()
        {
            if( domClass.contains( this.domNode, "cg-expanded" ) )
            {
                this.stats_node.style.display = "table";
                return;
            }
            for( var i = 0; i < this._ctrls.length; i++ )
            {
                if( this._ctrls[ i ].get( "value" ) )
                {
                    this.stats_node.style.display = "table";
                    return;
                }
            }
            this.stats_node.style.display = "none";
        }
    });
});