define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json",
         "dojo/topic",
         "dojo/dom-construct",
         "dojo/dom-geometry",
         "./_WordWidget",
         "./_NewFeatureWidget",
         "primejunta/ui/util",
         "dijit/_WidgetBase",
         "dijit/layout/LayoutContainer",
         "dijit/layout/StackContainer",
         "./../../../ui/StackController",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          json,
          topic,
          domConstruct,
          domGeometry,
          _WordWidget,
          _NewFeatureWidget,
          util,
          _WidgetBase,
          LayoutContainer,
          StackContainer,
          StackController,
          ContentPane )
{
    return declare([ ContentPane ], {
        oidPrefix : "",
        data : {},
        tabPosition : "left",
        "class" : "num-moduleContainer",
        context : "", // recursion or origin
        featureLabel : "",
        stat_constraints : {},
        storage : {},
        postMixInProperties : function()
        {
            this.oidPrefix = "HB_" + this.featureLabel.charAt( 0 ).toUpperCase() + "_";
        },
        /**
         * We're using an extended StackController plus StackContainer because we want buttons with close nodes, but
         * we want the container for the controller to scroll independently of the container for the content, and to
         * include an add button.
         *
         * @public void
         */
        buildRendering : function()
        {
            this.inherited( arguments );
            this._wrn = domConstruct.create( "div", { "class" : "num-centerLayout" }, this.containerNode );
            this._loc = new LayoutContainer({ "style" : "width:100%;height:100%;" }).placeAt( this._wrn );
            var _coc = new ContentPane({ region : 'left', "class" : "num-moduleControls" } ).placeAt( this._loc );
            var _soc = new ContentPane({ region : 'center' } ).placeAt( this._loc );
            var _hider = domConstruct.create( "div", { "class" : "num-scrollBarHider" }, this._loc.domNode );
            this._stackContainer = new StackContainer({ style : "overflow:auto;"} ).placeAt( _soc );
            this._stackController = new StackController({ containerId : this._stackContainer.id } ).placeAt( _coc );
            topic.subscribe( this._stackContainer.id + "-selectChild", lang.hitch( this, this.handleSelectChild ) ); // What's the event? Couldn't find it in the docs...
        },
        postCreate : function()
        {
            this.populate();
        },
        startup : function()
        {
            this._stackContainer.startup();
            this._stackController.startup();
        },
        handleSelectChild : function( nChld )
        {
            nChld.populate();
        },
        resize : function()
        {
            this.inherited( arguments );
            this._loc.resize();
        },
        addChild : function( chld )
        {
            if( this._stackContainer )
            {
                this._stackContainer.addChild( chld );
            }
            else
            {
                this.inherited( arguments );
            }
        },
        populate : function()
        {
            this.oids = {};
            this._controls = {};
            var _fip = false;
            this.addChild( new _NewFeatureWidget({
                parent : this,
                featureLabel : this.featureLabel,
                data : this.data,
                title : "<i>Add " + this.featureLabel + "</i>",
                iconClass : "num-addButton"
            }));
            for( var o in this.data.payload_data )
            {
                this.oids[ o ] = this.data.payload_data[ o ];
                if( this.data.payload_data[ o ].is_homebrew )
                {
                    this.createControl({
                         oid : o,
                         instance : this.data.payload_data[ o ],
                         title : util.prettify( this.data.payload_data[ o ].label
                    )});
                }
            }
        },
        createControl : function( kwObj, switchTo )
        {
            this.oids[ kwObj.oid ] = kwObj.instance;
            this._controls[ kwObj.oid ] = new _WordWidget({
                closable : true,
                parent : this,
                "class" : "num-wordWidget",
                open : false, // TODO: figure out if this is needed
                instance : kwObj.instance,
                oid : kwObj.oid,
                title : kwObj.title,
                has_stats : this.has_stats,
                stat_constraints : this.stat_constraints,
                is_homebrew : kwObj.is_homebrew
            });
            this.addChild( this._controls[ kwObj.oid ] );
            if( switchTo )
            {
                this._stackContainer.selectChild( this._controls[ kwObj.oid ] );
            }
        },
        save : function( wordWidget )
        {
            this.storage.put( this._getId( wordWidget ), wordWidget.getData() );
        },
        delete : function( wordWidget )
        {
            delete this.data.payload_data[ wordWidget.oid ];
            this.storage.remove( this._getId( wordWidget ) );
        },
        _getId : function( wordWidget )
        {
            return this.featureLabel.toUpperCase() + "/" + this.context + "/" + wordWidget.oid;
        },
        getOID : function()
        {
            var pf = this.oidPrefix;
            var i = 0;
            var oid = pf + i;
            while( this.oids[ oid ] )
            {
                i++;
                oid = pf + i;
            }
            return oid;
        }
    });
});