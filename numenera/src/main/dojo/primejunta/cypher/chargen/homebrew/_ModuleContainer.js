define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/json",
         "dojo/topic",
         "dojo/dom-construct",
         "dojo/dom-geometry",
         "./_WordWidget",
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
          _WidgetBase,
          LayoutContainer,
          StackContainer,
          StackController,
          ContentPane )
{
    return declare([ ContentPane ], {
        data : {},
        tabPosition : "left",
        "class" : "num-moduleContainer",
        featureLabel : "",
        stat_constraints : {},
        /**
         * We're using an extended StackController plus StackContainer because we want buttons with close nodes, but
         * we want the container for the controller to scroll independently of the container for the content, and to
         * include an add button.
         *
         * @public void
         */
        buildRendering : function()
        {
            console.log( "DERP", this );
            this.inherited( arguments );
            this._wrn = domConstruct.create( "div", { "class" : "num-centerLayout" }, this.containerNode );
            this._loc = new LayoutContainer({ "style" : "width:100%;height:100%;" }).placeAt( this._wrn );
            var _coc = new ContentPane({ region : 'left', "class" : "num-moduleControls" } ).placeAt( this._loc );
            var _soc = new ContentPane({ region : 'center' } ).placeAt( this._loc );
            var _hider = domConstruct.create( "div", { "class" : "num-scrollBarHider" }, this._loc.domNode );
            this._stackContainer = new StackContainer({ style : "overflow:auto;"} ).placeAt( _soc );
            this._stackController = new StackController({ containerId : this._stackContainer.id, hasAddButton : true, addButtonLabel : "Add " + this.featureLabel, onAddButtonClick : lang.hitch( this, this.pleaseAddItem ) } ).placeAt( _coc );
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
        pleaseAddItem : function()
        {
            console.log( "Whoopee doo, must add something." );
        },
        populate : function()
        {
            this._controls = {};
            var _fip = false;
            for( var o in this.data.payload_data )
            {
                this._controls[ o ] = new _WordWidget({ closable : true, "class" : "num-wordWidget", open : false, instance : this.data.payload_data[ o ], oid : o, has_stats : this.has_stats, stat_constraints : this.stat_constraints } );
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