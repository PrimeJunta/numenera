/**
 * Logic for the "stats" section of the CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/on",
         "./_CharacterPortrait",
         "./_UtilityMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin" ],
function( declare,
          lang,
          domClass,
          on,
          _CharacterPortrait,
          _UtilityMixin,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        /**
         * Cap for pools
         */
        pool_cap : 99,
        /**
         * Cap for edge.
         */
        edge_cap : 1,
        /**
         * Connects click event listeners to increment and decrement controls.
         */
        postCreate : function()
        {
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
         * Disables decrement control if the new value hits the floor defined in type, checkCaps, and updateLink.
         */
        _adjust : function( /* String */ stat, /* String */ prop, /* int */ by )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            var _to = parseInt( this[ stat + "_" + prop ].value );
            _from += -by;
            _to += by;
            this[ "free_" + prop ].value = _from;
            this[ stat + "_" + prop ].value = _to;
            this[ stat + "_" + prop ].adjustment += by;
            this.checkLimits( prop );
            this.updateLink();
        },
        /**
         * Just shorthand for checking caps on both pool and edge.
         */
        checkCaps : function()
        {
            this.checkLimits( "pool" );
            this.checkLimits( "edge" );
        },
        /**
         * Resets floors for all stats, sets caps to a ridiculously high number, and checkCaps.
         */
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
         * Shorthand for _checkLimits on might, speed, and intellect pool/edge (from prop).
         */
        checkLimits : function( /* String */ prop )
        {
            this._checkLimits( "might", prop );
            this._checkLimits( "speed", prop );
            this._checkLimits( "intellect", prop );
        },
        /**
         * Checks if the field stat_prop (e.g. might_pool, speed_edge) has hit either its ceiling or _floor, and
         * disables/enables its decrement_/increment_ buttons accordingly.
         */
        _checkLimits : function( /* String */ stat, /* String */ prop )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            var ddis = ( parseInt( this[ stat + "_" + prop ].value ) == this[ stat + "_" + prop + "_floor" ] );
            var edis = ( ( parseInt( this[ stat + "_" + prop ].value ) >= this[ prop + "_cap" ] || _from == 0 ) );
            this.setDisabled([ "decrement_" + stat + "_" + prop ], ddis );
            this.setDisabled([ "increment_" + stat + "_" + prop ], edis );
        },
        /**
         * Iterates through stats and adds each item's value to value of matching input in template (as int).
         */
        augmentStats : function( /* Object */ stats )
        {
            if( !stats )
            {
                return;
            }
            for( var o in stats )
            {
                this._augmentStat( o, stats[ o ] );
            }
        },
        applyAdjustments : function( /* Object */ data )
        {
            if( !data )
            {
                return;
            }
            this.augmentStats( data.stats );
            if( data.advancement )
            {
                var tier = parseInt( this.character_tier.value );
                for( var i = 0; i < tier; i++ )
                {
                    this.augmentStats( data.advancement[ i ].stats );
                }
            }
        },
        undoAdjustments : function( /* Object */ data )
        {
            if( !data )
            {
                return;
            }
            this.augmentStats( this.invertStats( data.stats ) );
            if( data.advancement )
            {
                var tier = parseInt( this.character_tier.value );
                for( var i = 0; i < tier; i++ )
                {
                    this.augmentStats( this.invertStats( data.advancement[ i ].stats ) );
                }
            }
        },
        _augmentStat : function( stat, by )
        {
            var val = parseInt( this[ stat ].value );
            if( isNaN( val ) )
            {
                val = 0;
            }
            this[ stat ].value = val + by;
            this[ stat + "_floor" ] += by;
            this[ stat + "_adjustment" ] += by;
            if( stat == "cypher_count" )
            {
                this.manager.augmentCypherList( parseInt( this[ stat ].value ) );
            }
        },
        /**
         * Writes val into field matching stat, and stores it as floor for adjustments. Calls augmentCypherList
         * if the stat in question was cypher_count; this way we'll get enough fields for cyphers on advancement.
         */
        _setStat : function( /* String */ stat, /* int */ val )
        {
            this[ stat ].value = val;
            this[ stat + "_floor" ] = val;
            this[ stat + "_adjustment" ] = 0;
            if( stat == "cypher_count" )
            {
                this.manager.augmentCypherList( val );
            }
        },
        /**
         * Sets floor of stat to its current value.
         */
        _resetFloor : function( stat )
        {
            this[ stat + "_floor" ] = parseInt( this[ stat ].value );
        }
    });
});