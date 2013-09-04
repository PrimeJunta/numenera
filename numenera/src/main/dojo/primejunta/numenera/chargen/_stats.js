define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/on" ],
function( declare,
          lang,
          domClass,
          on )
{
    return declare([], {
        /**
         * Cap for pools
         */
        pool_cap : 99,
        /**
         * Cap for edge.
         */
        edge_cap : 1,
        postCreate : function()
        {
            this.inherited( arguments );
            on( this.increment_might_pool, "click", lang.hitch( this, this._adjust, "might", "pool", 1 ) );
            on( this.increment_might_edge, "click", lang.hitch( this, this._adjust, "might", "edge", 1 ) );
            on( this.increment_speed_pool, "click", lang.hitch( this, this._adjust, "speed", "pool", 1 ) );
            on( this.increment_speed_edge, "click", lang.hitch( this, this._adjust, "speed", "edge", 1 ) );
            on( this.increment_intellect_pool, "click", lang.hitch( this, this._adjust, "intellect", "pool", 1 ) );
            on( this.increment_intellect_edge, "click", lang.hitch( this, this._adjust, "intellect", "edge", 1 ) );
            on( this.decrement_might_pool, "click", lang.hitch( this, this._adjust, "might", "pool", -1 ) );
            on( this.decrement_might_edge, "click", lang.hitch( this, this._adjust, "might", "edge", -1 ) );
            on( this.decrement_speed_pool, "click", lang.hitch( this, this._adjust, "speed", "pool", -1 ) );
            on( this.decrement_speed_edge, "click", lang.hitch( this, this._adjust, "speed", "edge", -1 ) );
            on( this.decrement_intellect_pool, "click", lang.hitch( this, this._adjust, "intellect", "pool", -1 ) );
            on( this.decrement_intellect_edge, "click", lang.hitch( this, this._adjust, "intellect", "edge", -1 ) );
        },
        /**
         * Adjust value of field:
         * * stat = "might"|"speed"|"intellect"
         * * prop = "pool" | "edge"
         * * by = integer, normally 1 or -1.
         * Disables decrement control if the new value hits the floor defined in type, and checkCpas..
         */
        _adjust : function( /* String */ stat, /* String */ prop, /* int */ by )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            var _to = parseInt( this[ stat + "_" + prop ].value );
            _from += -by;
            _to += by;
            this[ "free_" + prop ].value = _from;
            this[ stat + "_" + prop ].value = _to;
            // Check control states
            this._checkCaps( prop );
            this.updateLink();
        },
        checkCaps : function()
        {
            this._checkCaps( "pool" );
            this._checkCaps( "edge" );
        },
        moveCaps : function()
        {
            this._resetFloor( "might_pool" );
            this._resetFloor( "might_edge" );
            this._resetFloor( "speed_pool" );
            this._resetFloor( "speed_edge" );
            this._resetFloor( "intellect_pool" );
            this._resetFloor( "intellect_edge" );
            this.pool_cap = 999;
            this.edge_cap = 99;
            this.checkCaps();
        },
        /**
         * If there's no free pool to assign, disable increment pool controls. Else enable them if they're below
         * 20.
         */
        _checkCaps : function( prop )
        {
            this._checkLimits( "might", prop );
            this._checkLimits( "speed", prop );
            this._checkLimits( "intellect", prop );
        },
        _checkLimits : function( stat, prop )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            var ddis = ( parseInt( this[ stat + "_" + prop ].value ) == this[ stat + "_" + prop + "_floor" ] );
            var edis = ( ( parseInt( this[ stat + "_" + prop ].value ) >= this[ prop + "_cap" ] || _from == 0 ) );
            this._setDisabled([ "decrement_" + stat + "_" + prop ], ddis );
            this._setDisabled([ "increment_" + stat + "_" + prop ], edis );
        },
        /**
         * Iterates through stats and writes each item's value into the matching input in template.
         */
        _assign : function( /* Object */ stats )
        {
            for( var o in stats )
            {
                this._setStat( o, stats[ o ] );
            }
        },
        /**
         * Iterates through stats and adds each item's value to value of matching input in template (as int).
         */
        _augment : function( /* Object */ stats )
        {
            if( !stats )
            {
                return;
            }
            for( var o in stats )
            {
                this._setStat( o, stats[ o ] + parseInt( this[ o ].value ) );
            }
        },
        /**
         * Writes val into field matching stat, and stores it as floor for adjustments.
         */
        _setStat : function( stat, val )
        {
            this[ stat ].value = val;
            this[ stat + "_floor" ] = val;
            if( stat == "cypher_count" )
            {
                this._augmentCypherList( val );
            }
        },
        _resetFloor : function( stat )
        {
            this[ stat + "_floor" ] = parseInt( this[ stat ].value );
        }
    });
});