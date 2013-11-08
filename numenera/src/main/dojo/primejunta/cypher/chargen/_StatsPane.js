/**
 * Logic for the "stats" section of the CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/dom-class",
         "dojo/on",
         "./_CharacterPortrait",
         "./_UtilityMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_StatsPane.html" ],
function( declare,
          lang,
          array,
          domClass,
          on,
          _CharacterPortrait,
          _UtilityMixin,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        /**
         * Portrait home, set by instantiator.
         */
        portraitHome : "",
        /**
         * Cap for pools
         */
        pool_cap : 99,
        /**
         * Cap for edge.
         */
        edge_cap : 1,
        /**
         * List of stats handled by this widget.
         */
        stats : [ "free_pool",
                  "free_edge",
                  "might_pool",
                  "might_edge",
                  "speed_pool",
                  "speed_edge",
                  "intellect_pool",
                  "intellect_edge",
                  "cypher_count",
                  "shin_count",
                  "character_tier",
                  "character_effort",
                  "armor_bonus",
                  "recovery_roll" ],
        /**
         * Template.
         */
        templateString : template,
        /**
         * Check stat floor against derived value? If false, checks against 0 only.
         */
        _checkFloor : true,
        /**
         * Connects click event listeners to increment and decrement controls.
         */
        postCreate : function()
        {
            for( var i = 0; i < this.stats.length; i++ )
            {
                this._connectAdjustmentControls( this.stats[ i ] );
            }
            on( this.shin_count, "blur", lang.hitch( this, this.intInputChanged, this.shin_count ) );
        },
        /**
         * Intercepts gets for stats in this.stats. Returns them as int.
         */
        get : function( prop )
        {
            if( array.indexOf( this.stats, prop ) != -1 )
            {
                return this._getStat( prop );
            }
            else
            {
                return this.inherited( arguments );
            }
        },
        /**
         * Intercepts sets for stats in this.stats.
         */
        set : function( prop, val )
        {
            if( array.indexOf( this.stats, prop ) != -1 )
            {
                this[ prop ].value = val;
                if( val < 0 )
                {
                    domClass.add( this[ prop ], "cg-negative-stat" );
                }
                else
                {
                    domClass.remove( this[ prop ], "cg-negative-stat" );
                }
            }
            else
            {
                this.inherited( arguments );
            }
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
         * Resets everything to zero.
         */
        resetStats : function()
        {
            this.set( "might_pool", 0 );
            this.set( "speed_pool", 0 );
            this.set( "intellect_pool", 0 );
            this.set( "might_edge", 0 );
            this.set( "speed_edge", 0 );
            this.set( "intellect_edge", 0 );
            this.set( "free_pool", 0 );
            this.set( "free_edge", 0 );
            this.set( "character_tier", 0 );
            this.set( "character_effort", 0 );
            this.set( "shin_count", 0 );
            this.set( "cypher_count", 0 );
            this.set( "armor_bonus", 0 );
            this.set( "recovery_roll", 0 );
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
        /**
         * Applies adjustments from data up to tier.
         */
        applyAdjustments : function( /* Object */ data )
        {
            if( !data )
            {
                return;
            }
            this.augmentStats( data.stats );
            if( data.advancement )
            {
                var tier = this.get( "character_tier" );
                for( var i = 0; i < tier; i++ )
                {
                    this.augmentStats( data.advancement[ i ].stats );
                }
            }
            this.checkCaps();
        },
        /**
         * Undoes adjustments from data up to tier.
         */
        undoAdjustments : function( /* Object */ data )
        {
            if( !data )
            {
                return;
            }
            this.augmentStats( this.invertStats( data.stats ) );
            if( data.advancement )
            {
                var tier = this.get( "character_tier" );
                for( var i = 0; i < tier; i++ )
                {
                    this.augmentStats( this.invertStats( data.advancement[ i ].stats ) );
                }
            }
            this.checkCaps();
        },
        /**
         * Sets _checkFloor to to. This will determine if we check the stat floor for adjustments. We don't if GM controls are on.
         */
        setFloorCheck : function( to )
        {
            this._checkFloor = to;
            this.checkCaps();
        },
        /**
         * Adjust value of field:
         * * stat = "might"|"speed"|"intellect"
         * * prop = "pool" | "edge"
         * * by = integer, normally 1 or -1.
         * Disables decrement control if the new value hits the floor defined in type, checkCaps, and autoSave.
         */
        _adjust : function( /* String */ stat, /* String */ prop, /* int */ by )
        {
            var _from = this.get( "free_" + prop );
            var _to = this.get( stat + "_" + prop );
            _from += -by;
            _to += by;
            this.set(  "free_" + prop, _from );
            this.set(  stat + "_" + prop, _to );
            this[ stat + "_" + prop ].adjustment += by;
            this.checkLimits( prop );
            this.manager.autoSave();
        },
        /**
         * Connects adjustment controls for stat.
         * 
         * @param stat "might_pool"|"might_edge" ...
         */
        _connectAdjustmentControls : function( /* String */ stat )
        {
            var pair = stat.split( "_" );
            if( this[ "increment_" + stat ] )
            {
                this.own( on( this[ "increment_" + stat ], "click", lang.hitch( this, this._adjust, pair[ 0 ], pair[ 1 ], 1 ) ) );
            }
            if( this[ "decrement_" + stat ] )
            {
                this.own( on( this[ "decrement_" + stat ], "click", lang.hitch( this, this._adjust, pair[ 0 ], pair[ 1 ], -1 ) ) );
            }
        },
        /**
         * Augments stat by value in by. Calls augmentCypherList if we adjusted cypher_count.
         */
        _augmentStat : function( /* String */ stat, /* int */ by )
        {
            var val = this.get( stat );
            if( isNaN( val ) )
            {
                val = 0;
            }
            this.set( stat, val + by );
            this[ stat + "_floor" ] += by;
            this[ stat + "_adjustment" ] += by;
            if( stat == "cypher_count" )
            {
                this.manager.updateCypherList();
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
                this.manager.updateCypherList();
            }
        },
        _getStat : function( /* String */ stat )
        {
            return parseInt( this[ stat ].value );
        },
        /**
         * Checks if the field stat_prop (e.g. might_pool, speed_edge) has hit either its ceiling or _floor, and
         * disables/enables its decrement_/increment_ buttons accordingly.
         */
        _checkLimits : function( /* String */ stat, /* String */ prop )
        {
            var _from = this.get( "free_" + prop );
            var ddis = ( this.get( stat + "_" + prop ) == ( this._checkFloor ? this[ stat + "_" + prop + "_floor" ] : 0 ) );
            var edis = ( ( this.get( stat + "_" + prop ) >= this[ prop + "_cap" ] || _from <= 0 ) );
            this.setDisabled([ "decrement_" + stat + "_" + prop ], ddis );
            this.setDisabled([ "increment_" + stat + "_" + prop ], edis );
        },
        /**
         * Sets floor of stat to its current value.
         */
        _resetFloor : function( stat )
        {
            this[ stat + "_floor" ] = this.get( stat );
        }
    });
});