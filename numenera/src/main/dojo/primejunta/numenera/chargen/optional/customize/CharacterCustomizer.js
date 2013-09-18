define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "dojo/topic",
         "dojo/on",
         "dojo/query",
         "dojo/dom-class",
         "../../_util",
         "./_AlternativePerkSelector",
         "./data/advancement",
         "dijit/registry",
         "dijit/form/Button",
         "dijit/form/TextBox",
         "dijit/form/CheckBox",
         "dijit/form/Select",
         "dijit/Dialog",
         "dojo/text!./templates/dialogContent.html"],
function( declare,
          lang,
          array,
          string,
          topic,
          on,
          domQuery,
          domClass,
          _util,
          _AlternativePerkSelector,
          advancement,
          registry,
          Button,
          TextBox,
          CheckBox,
          Select,
          Dialog,
          dialogContent )
{
    return declare([ Button, _util ], {
        label : "<i class=\"icon-gears\"></i>",
        _customizations : {
            pool : false,
            edge : false,
            skill_for_cypher : false,
            cypher_for_skill : false,
            ability_for_skill : false,
            inability_for_skill : false,
            weakness_for_skill : false,
            customize_focus : false
        },
        _poolfloors : {},
        _pools : {},
        _edgefloors : {},
        _edges : {},
        postMixInProperties : function()
        {
            this.inherited( arguments );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, function() {
                this.domNode.style.display = "none";
            }));
            topic.subscribe( "CharGen/valuesUpdated", lang.hitch( this, function() {
                this.domNode.style.display = "inline-block";
            }));
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) );
        },
        postCreate : function()
        {
            this.inherited( arguments );
            this._dlog = new Dialog({ title : "Customize character", style : "z-index:9999;width:600px;" }).placeAt( document.body );
            this._dlog.applyChanges = lang.hitch( this, this.applyChanges );
            this._dlog.showAbilitySelect = lang.hitch( this, this.showAbilitySelect );
            this._dlog.checkState = lang.hitch( this, this.checkState );
            this._dlog.set( "content", string.substitute( dialogContent, this._customizations ) );
            this._dlog.startup();
        },
        onClick : function()
        {
            this._dlog.set( "content", string.substitute( dialogContent, this._customizations ) );
            var state = this._dlog.get( "value" );
            if( this._customizations.ability_for_skill )
            {
                this.showAbilitySelect( true, this._swappedAbility );
            }
            if( this._customizations.weakness_for_skill )
            {
                registry.byId( "weaknessSelect" ).set( "disabled", true );
                if( this._swappedStat )
                {
                    registry.byId( "weaknessSelect" ).set( "value", this._swappedStat );
                }
            }
            this._dlog.show();
        },
        applyChanges : function()
        {
            var custs = this._toCustomizations( this._dlog.get( "value" ).customizations );
            this.applyCustomizations( custs, this._getAbilityToSwap(), this._getWeaknessToSwap() );
            this._dlog.hide();
        },
        _toCustomizations : function( formData )
        {
            var out = {
                pool : false,
                edge : false,
                skill_for_cypher : false,
                cypher_for_skill : false,
                ability_for_skill : false,
                inability_for_skill : false,
                weakness_for_skill : false,
                customize_focus : false
            };
            for( var o in out )
            {
                if( array.indexOf( formData, o ) != -1 )
                {
                    out[ o ] = true;
                }
            }
            return out;
        },
        applyCustomizations : function( custs, abi, stat )
        {
            var _has = false;
            for( var o in this._customizations )
            {
                if( custs[ o ] )
                {
                    _has = true;
                    if( !this._customizations[ o ] )
                    {
                        this._setCustomization( o, true, abi, stat );
                    }
                    this._customizations[ o ] = true;
                }
                else
                {
                    if( this._customizations[ o ] )
                    {
                        this._setCustomization( o, false, abi, stat );
                    }
                    this._customizations[ o ] = false;
                }
            }
            if( custs.ability_for_skill )
            {
                if( this._swappedAbility != abi )
                {
                    this._toggleSwapAbility( this.manager.getType().label, this._swappedAbility );
                    this._swappedAbility = abi;
                    this._toggleSwapAbility( this.manager.getType().label, this._swappedAbility );
                }
            }
            if( custs.weakness_for_skill )
            {
                this._swappedStat = stat;
            }
            this.checkState();
         },
        checkState : function()
        {
            var state = this._dlog.get( "value" );
            var type = this.manager.getType();
            if( !type )
            {
                domClass.remove( this.domNode, "cg-selectedButton" );
                return;
            }
            else
            {
                type = type.label;
            }
            var sel = registry.byId( type + "Ability" );
            if( array.indexOf( state.customizations, "skill_for_cypher" ) != -1 && type == "nano" )
            {
                sel.options[ 0 ].disabled = true;
                sel.startup();
                sel.set( "value", "w" );
            }
            else
            {
                sel.options[ 0 ].disabled = false;
                sel.startup();
            }
            if( this._hasCustomizations() )
            {
                domClass.add( this.domNode, "cg-selectedButton" );
            }
            else
            {
                domClass.remove( this.domNode, "cg-selectedButton" );
            }
        },
        _hasCustomizations : function()
        {
            for( var o in this._customizations )
            {
                if( this._customizations[ o ] == true )
                {
                    return true;
                }
            }
            return false;
        },
        showAbilitySelect : function( checked, val )
        {
            var nSel = registry.byId( "nanoAbility" );
            var gSel = registry.byId( "glaiveAbility" );
            var jSel = registry.byId( "jackAbility" );
            nSel.domNode.style.display = "none";
            gSel.domNode.style.display = "none";
            jSel.domNode.style.display = "none";
            if( !checked )
            {
                return;
            }
            switch( this.manager.getType().label )
            {
                case "nano" :
                    nSel.domNode.style.display = "inline-block";
                    if( val )
                    {
                        nSel.set( "value", val );
                    }
                    break;
                case "glaive" :
                    gSel.domNode.style.display = "inline-block";
                    if( val )
                    {
                        gSel.set( "value", val );
                    }
                    break;
                case "jack" :
                    jSel.domNode.style.display = "inline-block";
                    if( val )
                    {
                        jSel.set( "value", val );
                    }
            }
        },
        getData : function()
        {
            /* pool, edge, skill_for_cypher, cypher_for_skill, ability_for_skill, inability_for_skill, customize_focus */
            var found = false;
            var out = "&cust=";
            out += this._customizations.pool ? "1" : "0";
            out += this._customizations.edge ? "1" : "0";
            out += this._customizations.skill_for_cypher ? "1" : "0";
            out += this._customizations.cypher_for_skill ? "1" : "0";
            out += this._customizations.ability_for_skill ? "1" : "0";
            out += this._customizations.inability_for_skill ? "1" : "0";
            out += this._customizations.weakness_for_skill ? "1" : "0";
            out += this._customizations.customize_focus ? "1" : "0";
            out += this._getAbilityToSwap();
            out += this._swappedStat ? this._swappedStat.charAt( 0 ) : "m";
            if( this.manager._advancementControl )
            {
                // loop through tier widgets, read their "customized" status
                for( var i = 0; i < this.manager._advancementControl._controls.length; i++ )
                {
                    out += this.manager._advancementControl._controls[ i ].customize ? "1" : "0"; 
                }
            }
            return out;
        },
        populateFromData : function( data )
        {
            if( data )
            {
                var _customizations = {
                    pool : data.charAt( 0 ) == "1",
                    edge : data.charAt( 1 ) == "1",
                    skill_for_cypher : data.charAt( 2 ) == "1",
                    cypher_for_skill : data.charAt( 3 ) == "1",
                    ability_for_skill : data.charAt( 4 ) == "1",
                    inability_for_skill : data.charAt( 5 ) == "1",
                    weakness_for_skill : data.charAt( 6 ) == "1",
                    customize_focus : data.charAt( 7 ) == "1"
                }
                if( _customizations.ability_for_skill )
                {
                    var abi = data.charAt( 8 );
                }
                if( _customizations.weakness_for_skill )
                {
                    var stat = data.charAt( 9 );
                    stat = stat == "m" ? "might" : stat == "s" ? "speed" : stat == "i" ? "intellect" : false;
                    this._swappedStat = stat;
                }
                this.applyCustomizations( _customizations, abi, stat );
                if( this.manager._advancementControl )
                {
                    // loop through tier widgets, set their "customized" status
                    for( var i = 0; i < this.manager._advancementControl._controls.length; i++ )
                    {
                        this.manager._advancementControl._controls[ i ].customize = data.charAt( 10 + i ) == "1" ? true : false; 
                        this.manager._advancementControl._controls[ i ].checkState();
                    }
                }
            }
        },
        clear : function()
        {
            for( var o in this._customizations )
            {
                this._customizations[ o ] = false;
            }
            this.checkState();
        },
        _setCustomization : function( cust, state, abi, stat )
        {
            if( state )
            {
                switch( cust )
                {
                    case "pool" :
                        this._poolfloors = {
                            might_pool_floor : this.manager.might_pool_floor,
                            intellect_pool_floor : this.manager.intellect_pool_floor,
                            speed_pool_floor : this.manager.speed_pool_floor
                        };
                        this._pools = {
                            might_pool : parseInt( this.manager.might_pool.value ),
                            intellect_pool : parseInt( this.manager.intellect_pool.value ),
                            speed_pool : parseInt( this.manager.speed_pool.value ),
                            free_pool : parseInt( this.manager.free_pool.value )
                        };
                        this.manager.might_pool_floor = 1;
                        this.manager.intellect_pool_floor = 1;
                        this.manager.speed_pool_floor = 1;
                        this.manager.pool_cap = 20;
                        this._checkCap( "might_pool" );
                        this._checkCap( "speed_pool" );
                        this._checkCap( "intellect_pool" );
                        this.manager.checkCaps();
                        break;
                    case "edge" :
                        this._edgefloors = lang.mixin( this._floors, {
                            might_edge_floor : this.manager.might_edge_floor,
                            intellect_edge_floor : this.manager.intellect_edge_floor,
                            speed_edge_floor : this.manager.speed_edge_floor
                        });
                        this._edges = {
                            might_edge : parseInt( this.manager.might_edge.value ),
                            intellect_edge : parseInt( this.manager.intellect_edge.value ),
                            speed_edge : parseInt( this.manager.speed_edge.value ),
                            free_edge : parseInt( this.manager.free_edge.value )
                        }
                        this.manager.might_edge_floor = 0;
                        this.manager.intellect_edge_floor = 0;
                        this.manager.speed_edge_floor = 0;
                        this.manager.edge_cap = 1;
                        this.manager.checkCaps();
                        break;
                    case "skill_for_cypher" :
                        this.manager.cypher_count.value = parseInt( this.manager.cypher_count.value ) + 1;
                        this.manager._lists.ability_list[ 0 ].deleteMe();
                        this.manager.updateCypherList();
                        break;
                    case "cypher_for_skill" : 
                        this.manager.cypher_count.value = parseInt( this.manager.cypher_count.value ) - 1;
                        this.manager.createListItem( "ability_list", "Ⓣ ${input:choose any non-combat}", "cust" );
                        this.manager.updateCypherList();
                        break;
                    case "ability_for_skill" :
                        var type = this.manager.getType().label;
                        this._toggleSwapAbility( type, abi );
                        this._swappedAbility = abi;
                        this.manager.createListItem( "ability_list", "Ⓣ ${input:choose any non-combat}", "cust" );
                        break;
                    case "inability_for_skill" :
                        this.manager.createListItem( "ability_list", "Ⓣ ${input:choose any non-combat}", "cust" );
                        this._inabilityWidget = this.manager.createListItem( "inability_list", "Ⓘ ${input:enter description}", "cust" );
                        break;
                    case "weakness_for_skill" :
                        this.manager.createListItem( "ability_list", "Ⓣ ${input:choose any non-combat}", "cust" );
                        this._weaknessWidget = this.manager.createListItem( "inability_list", "Ⓘ Weakness in " + stat, "cust" );
                        this._swappedStat = stat;
                        break;
                    case "customize_focus" :
                        this._toggleDeletedAbilities( this.manager._lists.ability_list, "focus" );
                        this._toggleDeletedAbilities( this.manager._lists.special_list, "focus" );
                        this._toggleDeletedAbilities( this.manager._lists.bonus_list, "focus" );
                        this._perkSelector = new _AlternativePerkSelector({
                            manager : this.manager,
                            from : "cust",
                            tier : 1,
                            advancement : advancement
                        }).placeAt( this.manager.bonus_list );
                        this.manager._lists.bonus_list.push( this._perkSelector );
                        this.manager._augment( this._invert( this.manager.getFocus().advancement[ 0 ].stats ) );
                        break;
                }
            }
            else
            {
                switch( cust )
                {
                    case "pool" :
                        lang.mixin( this.manager, this._poolfloors );
                        for( var o in this._pools )
                        {
                            this.manager[ o ].value = this._pools[ o ];
                        }
                        break;
                        this.manager.checkCaps();
                    case "edge" :
                        lang.mixin( this.manager, this._edgefloors );
                        for( var o in this._edges )
                        {
                            this.manager[ o ].value = this._edges[ o ];
                        }
                        this.manager.checkCaps();
                        break;
                    case "skill_for_cypher" :
                        this.manager.cypher_count.value = parseInt( this.manager.cypher_count.value ) - 1;
                        this.manager._lists.ability_list[ 0 ].deleteMe();
                        this.manager.updateCypherList();
                        break;
                    case "cypher_for_skill" :
                        this.manager.cypher_count.value = parseInt( this.manager.cypher_count.value ) + 1;
                        this.manager._lists.ability_list.pop().destroy();
                        this.manager.updateCypherList();
                        break;
                    case "ability_for_skill" :
                        var type = this.manager.getType().label;
                        this._toggleSwapAbility( type, abi );
                        this.manager._lists.ability_list.pop().destroy();
                        break;
                    case "inability_for_skill" :
                        this.manager._lists.ability_list.pop().destroy();
                        this._inabilityWidget.destroy(); // FIXME: remove also from manager lists
                        break;
                    case "weakness_for_skill" :
                        this.manager._lists.ability_list.pop().destroy();
                        this._weaknessWidget.destroy(); // FIXME: remove also from manager lists
                        this._swappedStat = false;
                        break;
                    case "customize_focus" :
                        this._toggleDeletedAbilities( this.manager._lists.ability_list, "focus" );
                        this._toggleDeletedAbilities( this.manager._lists.special_list, "focus" );
                        this._toggleDeletedAbilities( this.manager._lists.bonus_list, "focus" );
                        this.manager._augment( this.manager.getFocus().advancement[ 0 ].stats );
                        this._perkSelector.destroy();
                        break;
                }
            }
        },
        _getAbilityToSwap : function()
        {
            var type = this.manager.getType().label;
            var mySel = registry.byId( type + "Ability" );
            return mySel ? mySel.get( "value" ) : "c";
        },
        _getWeaknessToSwap : function()
        {
            return registry.byId( "weaknessSelect" ).get( "value" );
        },
        _toggleSwapAbility : function( type, abi )
        {
            if( type == "glaive" || type == "jack" )
            {
                if( abi == "c" )
                {
                    this.manager._lists.bonus_list[ 0 ].deleteMe();
                }
                else
                {
                    this.manager._lists.bonus_list[ 1 ].deleteMe();
                }
            }
            else
            {
                if( abi == "c" )
                {
                    this.manager._lists.ability_list[ 0 ].deleteMe();
                }
                else
                {
                    this.manager._lists.bonus_list[ 0 ].deleteMe();
                }
            }
        },
        _checkCap : function( prop )
        {
            var diff = this._pools[ prop ] - this.manager.pool_cap;
            if( diff > 0 )
            {
                this.manager[ prop ].value = this.manager.pool_cap;
                this.manager.free_pool.value = parseInt( this.manager.free_pool.value ) + diff;
            }
        }
    });
});