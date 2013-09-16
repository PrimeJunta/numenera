define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "dojo/topic",
         "dojo/on",
         "dojo/query",
         "dijit/registry",
         "dijit/form/Button",
         "dijit/form/TextBox",
         "dijit/form/CheckBox",
         "dijit/Dialog",
         "dojo/text!./templates/dialogContent.html"],
function( declare,
          lang,
          array,
          string,
          topic,
          on,
          domQuery,
          registry,
          Button,
          TextBox,
          CheckBox,
          Dialog,
          dialogContent )
{
    return declare([ Button ], {
        label : "<i class=\"icon-gears\"></i>",
        _customizations : {
            pool : false,
            edge : false,
            skill_for_cypher : false,
            cypher_for_skill : false,
            ability_for_skill : false,
            inability_for_skill : false,
            focus_customizations : false
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
        },
        onClick : function()
        {
            if( !this._dlog )
            {
                this._dlog = new Dialog({ title : "Customize character", style : "z-index:9999" }).placeAt( document.body );
                this._dlog.applyChanges = lang.hitch( this, this.applyChanges );
                this._dlog.showAbilitySelect = lang.hitch( this, this.showAbilitySelect );
                this._dlog.checkState = lang.hitch( this, this.checkState );
            }
            this._dlog.set( "content", string.substitute( dialogContent, this._customizations ) );
            var state = this._dlog.get( "value" );
            if( array.indexOf( state.customizations, "ability_for_skill" ) != -1 )
            {
                this.showAbilitySelect( true, this._swappedAbility );
            }
            this._dlog.show();
        },
        applyChanges : function()
        {
            var custs = this._toCustomizations( this._dlog.get( "value" ).customizations );
            this.applyCustomizations( custs, this._getAbilityToSwap() );
            this._dlog.hide();
        },
        _toCustomizations : function( formData )
        {
            console.log( "TOC",formData );
            var out = {
                pool : false,
                edge : false,
                skill_for_cypher : false,
                cypher_for_skill : false,
                ability_for_skill : false,
                inability_for_skill : false,
                focus_customizations : false
            };
            for( var o in out )
            {
                if( array.indexOf( formData, o ) != -1 )
                {
                    out[ o ] = true;
                }
            }
            console.log( out );
            return out;
        },
        applyCustomizations : function( custs, abi )
        {
            console.log( "APPLY!", custs, abi );
            try{ // TODO: remove this block
                for( var o in this._customizations )
                {
                    if( custs[ o ] )
                    {
                        if( !this._customizations[ o ] )
                        {
                            this._setCustomization( o, true, abi );
                        }
                        this._customizations[ o ] = true;
                    }
                    else
                    {
                        if( this._customizations[ o ] )
                        {
                            this._setCustomization( o, false, abi );
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
                }catch(e){console.log( "?", e )}


        },
        checkState : function()
        {
            var state = this._dlog.get( "value" );
            var type = this.manager.getType().label;
            var sel = registry.byId( type + "Ability" );
            if( array.indexOf( state.customizations, "skill_for_cypher" ) != -1 && type == "nano" )
            {
                sel.options[ 0 ].disabled = true;
                sel.startup();
                sel.set( "value", "wt" );
            }
            else
            {
                sel.options[ 0 ].disabled = false;
                sel.startup();
            }
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
            /* pool, edge, skill_for_cypher, cypher_for_skill, ability_for_skill, inability_for_skill, focus_customizations */
            var found = false;
            for( var o in this._customizations )
            {
                if( this._customizations[ o ] )
                {
                    found = true;
                    break;
                }
            }
            if( !found )
            {
                return "";
            }
            var out = "&cust=";
            out += this._customizations.pool ? "1" : "0";
            out += this._customizations.edge ? "1" : "0";
            out += this._customizations.skill_for_cypher ? "1" : "0";
            out += this._customizations.cypher_for_skill ? "1" : "0";
            out += this._customizations.ability_for_skill ? "1" : "0";
            out += this._customizations.inability_for_skill ? "1" : "0";
            out += this._customizations.focus_customizations ? "1" : "0";
            out += "-";
            if( this._customizations.ability_for_skill )
            {
                out += this._getAbilityToSwap();
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
                    focus_customizations : data.charAt( 6 ) == "1"
                }
                if( _customizations.ability_for_skill )
                {
                    var abi = data.substring( 8 );
                }
                this.applyCustomizations( _customizations, abi )
            }
        },
        clear : function()
        {
            for( var o in this._customizations )
            {
                this._customizations[ o ] = false;
            }
        },
        _setCustomization : function( cust, state, abi )
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
                        this.manager.createListItem( "inability_list", "Ⓘ ${input:enter description}", "cust" );
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
                        //var abi = this._getAbilityToSwap();
                        this._toggleSwapAbility( type, abi );
                        this.manager._lists.ability_list.pop().destroy();
                        break;
                    case "inability_for_skill" :
                        this.manager._lists.ability_list.pop().destroy();
                        this.manager._lists.inability_list.pop().destroy();
                }
            }
        },
        _getAbilityToSwap : function()
        {
            var type = this.manager.getType().label;
            var mySel = registry.byId( type + "Ability" );
            return mySel ? mySel.get( "value" ) : false;
        },
        _toggleSwapAbility : function( type, abi )
        {
            if( type == "glaive" || type == "jack" )
            {
                if( abi == "cs" )
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
                if( abi == "cs" )
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