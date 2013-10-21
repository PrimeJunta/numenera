/**
 * Character customizer. It's a widget based on the Button, but does all kinds of stuff when
 * you click it, and otherwise too. Implements the optional character customization rules
 * from the Corebook, page 117-118.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "dojo/topic",
         "dojo/on",
         "dojo/query",
         "dojo/dom-class",
         "primejunta/cypher/chargen/_UtilityMixin",
         "./_AlternativePerkSelector",
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
          _UtilityMixin,
          _AlternativePerkSelector,
          registry,
          Button,
          TextBox,
          CheckBox,
          Select,
          Dialog,
          dialogContent )
{
    return declare([ Button, _UtilityMixin ], {
        /**
         * Button label.
         */
        label : "<i class=\"icon-gears\"></i>",
        /**
         * Map of possible customizations. Everything starts out set to false.
         */
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
        _swapAbilityMap : {
            nano : {
                c : "Ⓣ Numenera Training",
                w : "Ⓔ Practiced With Light Weapons"
            },
            glaive : {
                c : "Ⓔ Practiced in Armor",
                w : "Ⓔ Practiced With All Weapons"
            },
            jack : {
                c : "Ⓔ Flex Skill",
                w : "Ⓔ Practiced With Light/Medium Weapons"
            }
        },
        /**
         * Containers for stored floors, pools, and edges. We tuck them away in case the user changes her mind,
         * in which case we want to reset everything to what they were before she started customizing.
         */
        _poolfloors : {},
        /**
         * Pools.
         */
        _pools : {},
        /**
         * Edge floors.
         */
        _edgefloors : {},
        /**
         * Edges.
         */
        _edges : {},
        /**
         * Inherited (from Button), then subscribe to main sheet events so we hide and show the button as needed
         * and checkState when requested.
         */
        postMixInProperties : function()
        {
            this.inherited( arguments );
            topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, function() {
                this.domNode.style.display = "none";
            }));
            topic.subscribe( "CharGen/pleaseReset", lang.hitch( this, function() {
                this.domNode.style.display = "inline-block";
            }));
            topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) );
        },
        /**
         * Inherited (from button), then set up a Dialog with the actual customization UI.
         */
        postCreate : function()
        {
            this.inherited( arguments );
            this._dlog = new Dialog({ title : "Character Creation Utility", style : "z-index:9999;width:600px;" }).placeAt( document.body );
            this._dlog.applyChanges = lang.hitch( this, this.applyChanges );
            this._dlog.showAbilitySelect = lang.hitch( this, this.showAbilitySelect );
            this._dlog.checkState = lang.hitch( this, this.checkState );
            this._dlog.set( "content", string.substitute( dialogContent, this._customizations ) );
            this._dlog.startup();
        },
        /**
         * Reset the dialog content by doing a template substitution on the dialog template with
         * this._customizations; additionally show the ability select if appropriate, and set 
         * weaknessSelect to show the selected state, if any. Then show the dialog.
         */
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
        /**
         * Read values from dialog, convert it _toCustomizations, applyCustomizations, and hide dialog.
         */
        applyChanges : function()
        {
            var custs = this._toCustomizations( this._dlog.get( "value" ).customizations );
            this.applyCustomizations( custs, this._getAbilityToSwap(), this._getWeaknessToSwap() );
            this._dlog.hide();
        },
        /**
         * Populates customization map from formData. Boring.
         */
        _toCustomizations : function( /* String[] */ formData )
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
        /**
         * Goes through this._customizations and compares it to custs, then either applies or removes it
         * if it has changed. Then handles the ability_for_skill and weakness_for_skill customizations
         * separately. And checkState.
         */
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
                    this._toggleSwapAbility( this.manager.getType().id, this._swappedAbility );
                    this._swappedAbility = abi;
                    this._toggleSwapAbility( this.manager.getType().id, this._swappedAbility );
                }
            }
            if( custs.weakness_for_skill )
            {
                this._swappedStat = stat;
            }
            this.checkState();
        },
        /**
         * Sets/unsets num-selectedButton class for button if any customizations are/not present. Handles
         * some other changes to the UI such as disabling certain options if already used by some other
         * active customization.
         */
        checkState : function()
        {
            var state = this._dlog.get( "value" );
            var type = this.manager.getType();
            if( !type )
            {
                domClass.remove( this.domNode, "num-selectedButton" );
                return;
            }
            else
            {
                type = type.id;
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
                domClass.add( this.domNode, "num-selectedButton" );
                this.manager.lockControls();
            }
            else
            {
                domClass.remove( this.domNode, "num-selectedButton" );
                this.manager.unlockControls();
            }
        },
        /**
         * If this._customizations has anything set, returns true. Else returns false.
         */
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
        /**
         * Shows the abilitySelect appropriate for the selected class. If not checked,
         * hides all of 'em.
         */
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
            switch( this.manager.getType().id )
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
        /**
         * Returns string of 0's and 1's representing the un/selected customizations, plus info about which
         * ability has been swapped out, if any.
         */
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
        /**
         * Decodes values from data into _customizations object, sets swapped ability and weakness if necessary, 
         * and applyCustomizations. If there is an _advancementControl, sets .customize on each of them to true
         * or false, depending on the value read from data, and calls checkState on each of them. The idea is that
         * we create and show all the necessary controls at this point; the loop which sets their values comes 
         * next in method which originally called this (see _data).
         */
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
        /**
         * Sets all _customizations to false and checkState.
         */
        clear : function()
        {
            for( var o in this._customizations )
            {
                this._customizations[ o ] = false;
            }
            this.checkState();
        },
        /**
         * Da beef. Big method which does whatever's needed for each type of customization. The arguments are:
         * * cust - the customization, matches a member of _customizations.
         * * state - boolean, apply or un-apply.
         * * abi - String, a swapped-off ability, e.g. Numenera Training for nanos.
         * * stat - String, a stat in which the player has taken a weakness. One of might, speed, intellect. 
         */
        _setCustomization : function( /* String */ cust, /* boolean */ state, /* String */ abi, /* String */ stat )
        {
            if( state )
            {
                switch( cust )
                {
                    case "pool" :
                        this._poolfloors = {
                            might_pool_floor : this.manager.statsWidget.might_pool_floor,
                            intellect_pool_floor : this.manager.statsWidget.intellect_pool_floor,
                            speed_pool_floor : this.manager.statsWidget.speed_pool_floor
                        };
                        this._pools = {
                            might_pool : parseInt( this.manager.statsWidget.might_pool.value ),
                            intellect_pool : parseInt( this.manager.statsWidget.intellect_pool.value ),
                            speed_pool : parseInt( this.manager.statsWidget.speed_pool.value ),
                            free_pool : parseInt( this.manager.statsWidget.free_pool.value )
                        };
                        this.manager.statsWidget.might_pool_floor = 1;
                        this.manager.statsWidget.intellect_pool_floor = 1;
                        this.manager.statsWidget.speed_pool_floor = 1;
                        this.manager.pool_cap = 20;
                        this._checkCap( "might_pool" );
                        this._checkCap( "speed_pool" );
                        this._checkCap( "intellect_pool" );
                        this.manager.statsWidget.checkCaps();
                        break;
                    case "edge" :
                        this._edgefloors = lang.mixin( this._floors, {
                            might_edge_floor : this.manager.statsWidget.might_edge_floor,
                            intellect_edge_floor : this.manager.statsWidget.intellect_edge_floor,
                            speed_edge_floor : this.manager.statsWidget.speed_edge_floor
                        });
                        this._edges = {
                            might_edge : parseInt( this.manager.statsWidget.might_edge.value ),
                            intellect_edge : parseInt( this.manager.statsWidget.intellect_edge.value ),
                            speed_edge : parseInt( this.manager.statsWidget.speed_edge.value ),
                            free_edge : parseInt( this.manager.statsWidget.free_edge.value )
                        }
                        this.manager.statsWidget.might_edge_floor = 0;
                        this.manager.statsWidget.intellect_edge_floor = 0;
                        this.manager.statsWidget.speed_edge_floor = 0;
                        this.manager.statsWidget.edge_cap = 1;
                        this.manager.statsWidget.checkCaps();
                        break;
                    case "skill_for_cypher" :
                        this.manager.statsWidget.cypher_count.value = parseInt( this.manager.statsWidget.cypher_count.value ) + 1;
                        this.manager._lists.ability_list[ 0 ].toggleDeleted();
                        this.manager.updateCypherList();
                        break;
                    case "cypher_for_skill" : 
                        this.manager.statsWidget.cypher_count.value = parseInt( this.manager.statsWidget.cypher_count.value ) - 1;
                        this.manager.createListItem( "ability_list", { text : "Ⓣ ${input:choose any non-combat}", from : [ "cust" ] });
                        this.manager.updateCypherList();
                        break;
                    case "ability_for_skill" :
                        var type = this.manager.getType().id;
                        this._toggleSwapAbility( type, abi );
                        this._swappedAbility = abi;
                        this.manager.createListItem( "ability_list", { text : "Ⓣ ${input:choose any non-combat}", from : [ "cust" ] });
                        break;
                    case "inability_for_skill" :
                        this.manager.createListItem( "ability_list", { text : "Ⓣ ${input:choose any non-combat}", from : [ "cust" ] });
                        this._inabilityWidget = this.manager.createListItem( "inability_list", { text : "Ⓘ ${input:enter description}", from : [ "cust" ] });
                        break;
                    case "weakness_for_skill" :
                        this.manager.createListItem( "ability_list", { text : "Ⓣ ${input:choose any non-combat}", from : [ "cust" ] });
                        this._weaknessWidget = this.manager.createListItem( "inability_list", { text : "Ⓘ Weakness in " + stat, from : [ "cust" ] });
                        this._swappedStat = stat;
                        break;
                    case "customize_focus" :
                        this.customizeFocus();
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
                            this.manager.statsWidget[ o ].value = this._pools[ o ];
                        }
                        break;
                        this.manager.statsWidget.checkCaps();
                    case "edge" :
                        lang.mixin( this.manager, this._edgefloors );
                        for( var o in this._edges )
                        {
                            this.manager.statsWidget[ o ].value = this._edges[ o ];
                        }
                        this.manager.statsWidget.checkCaps();
                        break;
                    case "skill_for_cypher" :
                        this.manager.statsWidget.cypher_count.value = parseInt( this.manager.statsWidget.cypher_count.value ) - 1;
                        this.manager._lists.ability_list[ 0 ].toggleDeleted();
                        this.manager.updateCypherList();
                        break;
                    case "cypher_for_skill" :
                        this.manager.statsWidget.cypher_count.value = parseInt( this.manager.statsWidget.cypher_count.value ) + 1;
                        this.manager._lists.ability_list.pop().destroy();
                        this.manager.updateCypherList();
                        break;
                    case "ability_for_skill" :
                        var type = this.manager.getType().id;
                        this._toggleSwapAbility( type, abi );
                        this.manager._lists.ability_list.pop().destroy();
                        break;
                    case "inability_for_skill" :
                        this.manager._lists.ability_list.pop().destroy();
                        this._inabilityWidget.destroy();
                        break;
                    case "weakness_for_skill" :
                        this.manager._lists.ability_list.pop().destroy();
                        this._weaknessWidget.destroy();
                        this._swappedStat = false;
                        break;
                    case "customize_focus" :
                        this.unCustomizeFocus();
                }
            }
        },
        customizeFocus : function( idx )
        {
            this._toggleDeletedAbilities( this.manager._lists.ability_list, "focus" );
            this._toggleDeletedAbilities( this.manager._lists.special_list, "focus" );
            this._toggleDeletedAbilities( this.manager._lists.bonus_list, "focus" );
            this.manager.customized = true;
            if( !this._perkSelector )
            {
                this._perkSelector = new _AlternativePerkSelector({
                    manager : this.manager,
                    from : "focus",
                    tier : 1,
                    listName : "bonus_list",
                    advancement : this.manager.customAdvancement
                }).placeAt( this.manager.bonus_list );
                this.manager._lists.bonus_list.push( this._perkSelector );
            }
            if( idx != undefined )
            {
                this._perkSelector.selectNode.selectedIndex = idx;
            }
            this.manager.statsWidget.augmentStats( this.invertStats( this.manager.getFocus().advancement[ 0 ].stats ) );
        },
        unCustomizeFocus : function()
        {
            this._perkSelector.destroy();
            delete this._perkSelector;
            this._toggleDeletedAbilities( this.manager._lists.ability_list, "focus" );
            this._toggleDeletedAbilities( this.manager._lists.special_list, "focus" );
            this._toggleDeletedAbilities( this.manager._lists.bonus_list, "focus" );
            this.manager.statsWidget.augmentStats( this.manager.getFocus().advancement[ 0 ].stats );
            this.manager.customized = false;
        },
        /**
         * Extracts selected value from select matching character type.
         */
        _getAbilityToSwap : function()
        {
            var type = this.manager.getType().id;
            var mySel = registry.byId( type + "Ability" );
            return mySel ? mySel.get( "value" ) : "c";
        },
        /**
         * Returns value of weaknessSelect.
         */
        _getWeaknessToSwap : function()
        {
            return registry.byId( "weaknessSelect" ).get( "value" );
        },
        /**
         * We always know where the swapped-off stats are in the lists, because they're always populated first, but
         * they're in different places for nanos than glaives or jacks. So we check and toggle the correct ones.
         */
        _toggleSwapAbility : function( type, abi )
        {
            var _abi = this._swapAbilityMap[ type ][ abi ];
            for( var i = 0; i < this.manager._controls.length; i++ )
            {
                var cur = this.manager._controls[ i ];
                if( cur.getText( true ) == _abi )
                {
                    cur.toggleDeleted();
                }
            }
        },
        /**
         * Since the optional rule concering stat-swapping states that no character should start with a pool value
         * higher than 20, we check if this is the case to start with, and move any overflow into free_pool.
         */
        _checkCap : function( prop )
        {
            var diff = this._pools[ prop ] - this.manager.statsWidget.pool_cap;
            if( diff > 0 )
            {
                this.manager.statsWidget[ prop ].value = this.manager.statsWidget.pool_cap;
                this.manager.statsWidget.free_pool.value = parseInt( this.manager.statsWidget.free_pool.value ) + diff;
            }
        }
    });
});