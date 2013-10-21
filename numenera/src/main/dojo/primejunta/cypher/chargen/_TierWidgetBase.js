/**
 * Widget representing a character tier. These are created by _AdvancementControl.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/query",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
         "dijit/form/ToggleButton",
         "./_ListItem",
         "./_UtilityMixin",
         "./optional/customize/_CustomFocusAdvancementMixin",
         "./_UnlockableMixin" ],
function( declare,
          lang,
          topic,
          domQuery,
          domClass,
          domConstruct,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          Button,
          ToggleButton,
          _ListItem,
          _UtilityMixin,
          _CustomFocusAdvancementMixin,
          _UnlockableMixin )
{
    return declare( "primejunta.numenera.chargen._TierWidget", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin, _UnlockableMixin, _CustomFocusAdvancementMixin ], {
        /**
         * Default skill name for that perk, if selected.
         */
        inputValue : "choose any non-combat",
        /**
         * Which tier is it?
         */
        tier : 1,
        /**
         * Advancement data from type.
         */
        typeData : [],
        /**
         * Advancement data from focus.
         */
        focusData : [],
        /**
         * CharacterGenerator.
         */
        manager : {},
        /**
         * _AdvancementControl.
         */
        parent : {},
        /**
         * Standard benefits for advancing a tier. Will be applied to stats.
         */
        standardBenefits : {
            recovery_roll : 1
        },
        /**
         * Initializes internal arrays, reads type and focus data and such.
         */
        postMixInProperties : function()
        {
            this._subs = [];
            this._controls = [];
            this._typeData = this.typeData[ this.tier - 1 ];
            this._focusData = this.focusData[ this.tier - 1 ];
            this.specialAbilityName = this.manager.getType().special_ability_name;
            this.DEFAULT_VALUES = this.manager.DEFAULT_VALUES;
        },
        /**
         * Connects listeners, initializes unlock controls (from _UnlockableMixin) and sets up some labels, then constructs list of available
         * perks by iterating back to previous tiers. Continues with initBonusPerks.
         */
        postCreate : function()
        {
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/destroyListItems", lang.hitch( this, this.destroy ) ) );
            this._subs.push( topic.subscribe( "CharGen/showPurchasedBenefits", lang.hitch( this, function() {
                this.purchasedBenefitsNode.style.display = "block";
            })));
            this.initializeUnlockControls();
            this.populatePerkSelector( this.typeData, this.tier, this.perkSelector );
            this.initBonusPerks();
            this.checkState();
        },
        /**
         * If tier > 1, show the automatic tier perks and add content to them from typeData and focusData.
         */
        initBonusPerks : function()
        {
            if( this.tier == 1 )
            {
                return;
            }
            this.tierPerkTitleNode.style.display = "block";
            this._controls.push( new _ListItem({
                manager : this,
                content : "${select:1:@perkSelector}",
                isUnlockable : true,
                from : "type",
                selectedIndex : 0,
                dataChanged : lang.hitch( this, this.checkApplyButton )
            }).placeAt( this.characterTierAbility ) );
            if( this._typeData.bonus_perks )
            {
                this.bonusPerksTitleNode.style.display = "block";
                var bps = this._typeData.bonus_perks;
                for( var i = 0; i < bps.length; i++ )
                {
                    this._controls.push( new _ListItem({
                        manager : this,
                        content : bps[ i ],
                        from : "type",
                        selectedIndex : 0
                    }).placeAt( this.bonusPerksNode ) );
                }
            }
            this._writeFocusPerks();
        },
        _writeFocusPerks : function()
        {
            if( this.tier > 1 && this._focusData.bonus_perks )
            {
                this.bonusPerksTitleNode.style.display = "block";
                var bps = this._focusData.bonus_perks;
                for( var i = 0; i < bps.length; i++ )
                {
                    this._controls.push( new _ListItem({
                        manager : this,
                        content : bps[ i ],
                        from : "focus",
                        selectedIndex : 0
                    }).placeAt( this.bonusPerksNode ) );
                }
            }
        },
        /**
         * First .checkSkillType. Then check .canAdvance, and show/hide the apply button accordingly.
         * Finally normalizeClass on .inputNode.
         */
        checkState : function()
        {
            this.checkSkillType();
            this.checkApplyButton();
            this.onBlurInput( this.inputNode );
            if( !this._tierChoicesMade() )
            {
                this.purchasedBenefitsNode.style.display = "none";
                this.customizeFocusButton.domNode.style.display = "inline-block";
            }
            else
            {
                this.customizeFocusButton.domNode.style.display = "none";
            }
            if( this.skillTypeSelector.disabled )
            {
                this.lockControls();
            }
            else
            {
                this.unlockControls();
            }
            this.inherited( arguments );
        },
        checkApplyButton : function()
        {
            if( this.canAdvance() )
            {
                this.applyButton.domNode.style.visibility = "hidden";
            }
            else if( this.hasChangesToApply() )
            {
                this.applyButton.set( "disabled", false );
            }
            else
            {
                this.applyButton.set( "disabled", true );
            }
        },
        hasChangesToApply : function()
        {
            var ctrls = domQuery( ".cg-storeMe", this.domNode );
            for( var i = 0; i < ctrls.length; i++ )
            {
                if( !ctrls[ i ].disabled )
                {
                    if( ctrls[ i ].type == "checkbox" )
                    {
                        if( ctrls[ i ].checked )
                        {
                            return true;
                        }
                    }
                    else if( ctrls[ i ].tagName.toUpperCase() == "SELECT" )
                    {
                        if( ctrls[ i ].selectedIndex > 0 )
                        {
                            return true;
                        }
                    }
                    else if( ctrls[ i ].className.indexOf( "num-valueNotSet" ) == -1 )
                    {
                        return true;
                    }
                }
            }
            return false;
        },
        /**
         * Shows/hides inputNodeContainer and perkSelectorContainer depending on skillTypeSelector.
         * Also incidentally unsets isUnlockable so the unlock button won't be shown for the last tier.
         */
        checkSkillType : function()
        {
            this.isUnlockable = false;
            switch( this.skillTypeSelector.selectedIndex )
            {
                case 1 :
                    this._show( this.inputNodeContainer );
                    this._hide( this.perkSelectorContainer );
                    this.perkSelector.selectedIndex = 0;
                    break;
                case 4 : 
                    this._hide( this.inputNodeContainer );
                    this._show( this.perkSelectorContainer );
                    this.inputNode.value = "";
                    this.onBlurinputNode();
                    this.isUnlockable = true;
                    break;
                default :
                    this._hide( this.inputNodeContainer );
                    this._hide( this.perkSelectorContainer );
                    this.perkSelector.selectedIndex = 0;
                    this.inputNode.value = "";
                    this.onBlurinputNode();
                    break;
            }
            this.checkApplyButton();
        },
        /**
         * Triggered from the Apply button. Checks cost and then subtracts it from the XP field, and
         * applies the bonuses to the matching stat fields; also locks sheet controls and unlocks the
         * finalize button.
         */
        applyAdvancement : function()
        {
            var cost = this._checkAdvancementCost();
            if( cost < 0 )
            {
                return;
            }
            this.parent.character_xp.value = parseInt( this.parent.character_xp.value ) - cost;
            if( !this.skillTypeSelector.disabled ) switch( this.skillTypeSelector.selectedIndex )
            {
                case 0 : 
                    break;
                case 1 : 
                    this.inputNode.disabled = true;
                    this.skillTypeSelector.disabled = true;
                case 2 : 
                    this.skillTypeSelector.disabled = true;
                    break;
                case 3 :
                    this._adjust( "recovery_roll", 2 );
                    this.skillTypeSelector.disabled = true;
                    break;
                case 4 :
                    this.skillTypeSelector.disabled = true;
                    this.perkSelector.disabled = true
                default :
                    this.skillTypeSelector.disabled = true;
                    break;
            }
            this.manager.statsWidget.moveCaps();
            var cbs = 0;
            cbs += this._applyCheckbox( this.pool_checkbox, "free_pool", 4 ) ;
            cbs += this._applyCheckbox( this.edge_checkbox, "free_edge", 1 );
            this._applyCheckbox( this.effort_checkbox, "character_effort", 1 );
            topic.publish( "CharGen/lockSheetControls" );
            this.manager.unlockFinalize();
            this.checkState();
            if( cbs > 0 )
            {
                this.manager.mainTabContainer.selectChild( this.manager.statsPane );
            }
        },
        /**
         * Do the usual field thing to inputNode.
         */
        onFocusinputNode : function()
        {
            if( this.inputNode.value == this.inputValue )
            {
                this.inputNode.value = "";
            }
            this.normalizeClass( this.inputNode );
        },
        /**
         * Do the usual field thing to inputNode.
         */
        onBlurinputNode : function()
        {
            if( this.inputNode.value == "" )
            {
                this.inputNode.value = this.inputValue;
            }
            this.normalizeClass( this.inputNode );
            this.checkApplyButton();
        },
        changeFocus : function( focusData )
        {
            var doCustomize = false, disableAltPerkSelector = false, selectedPerk = 0;
            if( this.customize )
            {
                disableAltPerkSelector = this._tierChoicesMade();
                selectedPerk = this._perkSelector.selectNode.selectedIndex;
                this.customizeFocus();
                doCustomize = true;
            }
            for( var i = 0; i < this._controls.length; i++ )
            {
                if( this._controls[ i ].from == "focus" )
                {
                    this._controls[ i ].destroy();
                    i--;
                }
            }
            this.focusData = focusData;
            this._focusData = this.focusData[ this.tier - 1 ];
            this._writeFocusPerks();
            if( doCustomize )
            {
                this.customizeFocus();
                this._perkSelector.selectNode.selectedIndex = selectedPerk;
                if( disableAltPerkSelector )
                {
                    this._perkSelector.lockControls();
                }
            }
        },
        /**
         * Have all tier benefits been bought? Returns the answer as boolean.
         */
        _tierChoicesMade : function()
        {
            var elms = domQuery( ".cg-storeMe", this.freeBenefitsNode );
            for( var i = 0; i < elms.length; i++ )
            {
                if( !elms[ i ].disabled )
                {
                    return false;
                }
            }
            return true;
        },
        /**
         * Cost for checkbox: 4 if it's checked and not disabled; 0 otherwise.
         */
        _cbCost : function( cb )
        {
            if( !this[ cb ].disabled && this[ cb ].checked )
            {
                return 4;
            }
            else
            {
                return 0;
            }
        },
        /**
         * Validates character. If it's OK, checks that you've made choices that make sense and you have
         * enough XP to buy the benefits you want. Raises an informative alert and returns -1 if not;
         * else returns the result.
         */
        _checkAdvancementCost : function()
        {
            if( !this._validator )
            {
                this._validator = this.manager.createCharacterValidator({ manager : this.manager });
            }
            if( !this._validator.validateCharacter() )
            {
                return -1;
            }
            if( !this.skillTypeSelector.disabled && this.skillTypeSelector.selectedIndex == 1 && this.inputNode.value == this.inputValue )
            {
                this.manager.tell( "Please select any non-combat skill." );
                return -1;
            }
            if( isNaN( parseInt( this.parent.character_xp.value ) ) )
            {
                this.manager.tell( "You need a minimum of 4 XP to advance your character." );
                return -1;
            }
            var cost = 0;
            if( !this.skillTypeSelector.disabled && this.skillTypeSelector.selectedIndex > 0 )
            {
                cost += 4;
            }
            cost += this._cbCost( "pool_checkbox" );
            cost += this._cbCost( "edge_checkbox" );
            cost += this._cbCost( "effort_checkbox" );
            if( parseInt( this.parent.character_xp.value ) < cost )
            {
                this.manager.tell( "You need " + cost + " XP for your choices." );
                return -1;
            }
            else
            {
                return cost;
            }
        },
        /**
         * Checks if all benefits have been bought and tier < 6; returns result as boolean.
         */
        canAdvance : function()
        {
            if( this.pool_checkbox.checked 
             && this.pool_checkbox.disabled
             && this.edge_checkbox.checked
             && this.edge_checkbox.disabled
             && this.effort_checkbox.checked
             && this.effort_checkbox.disabled
             && this.skillTypeSelector.disabled
             && this.tier < 6 )
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        /**
         * Applies benefits from _typeData and _focusData to .manager, and showUnlock. Done when the character advances a tier.
         */
        applyNewTier : function()
        {
            this.manager.statsWidget.augmentStats( this.standardBenefits );
            if( this._typeData.stats )
            {
                this.manager.statsWidget.augmentStats( this._typeData.stats );
            }
            if( this._focusData.stats )
            {
                this.manager.statsWidget.augmentStats( this._focusData.stats );
            }
            if( this.tier > 1 )
            {
                topic.publish( "CharGen/pleaseShowUnlock" );
            }
        },
        /**
         * Stores selected index of perkSelector. See _UnlockableMixin.
         */
        getPrevVal : function()
        {
            return {
                perkSelector : this.perkSelector.selectedIndex
            };
        },
        /**
         * Rolls back to _prevVal. See _UnlockableMixin.
         */
        rollBack : function( _prevVal )
        {
            this.perkSelector.selectedIndex = _prevVal.perkSelector;
            this.checkSkillType();
        },
        /**
         * Locks perkSelector. See _UnlockableMixin.
         */
        lockControls : function()
        {
            this.skillTypeSelectorContainer.style.display = "none";
            this._disableSelect( "perkSelector" );
        },
        /**
         * Unlocks perkSelector. See _UnlockableMixin.
         */
        unlockControls : function()
        {
            //this.skillTypeSelector.style.display = "inline-block";
            this._enableSelect( "perkSelector" );
        },
        /**
         * Concatenates _perkAsText() and _bonusPerksAsText() and returns the result.
         */
        listAsText : function()
        {
            return this._perkAsText().concat( this._bonusPerksAsText() );
        },
        removeListItem : function( li )
        {
            this.removeMember( this._controls, li );
        },
        /**
         * Removes listeners and destroys created _controls, then inherited.
         */
        destroy : function()
        {
            while( this._subs.length > 0 )
            {
                this._subs.pop().remove();
            }
            while( this._controls.length > 0 )
            {
                this._controls.pop().destroy();
            }
            this.inherited( arguments );
        },
        /**
         * Returns String[] representing selected (purchased) perk.
         */
        _perkAsText : function()
        {
            switch( this.skillTypeSelector.selectedIndex )
            {
                case 1 :
                    return [ "Ⓣ " + this.inputNode.value ];
                case 2 :
                    return [ "Ⓔ Reduce Armor Cost" ];
                case 3 :
                    return [ "Ⓔ Recovery Roll +2" ];
                case 4 : 
                    return [ this.perkSelector.options[ this.perkSelector.selectedIndex ].text ];
                default :
                    return [];
            }
        },
        /**
         * Returns String[] from _controls.getText(). They're created for any bonus perks.
         */
        _bonusPerksAsText : function()
        {
            var out = [];
            for( var i = 0; i < this._controls.length; i++ )
            {
                if( this._controls[ i ].getText() )
                {
                    out.push( this._controls[ i ].getText() );
                }
            }
            return out;
        },
        /**
         * Adjusts stat matching prop, val if checkbox cb is not disabled and is checked; then disables it.
         */
        _applyCheckbox : function( /* Checkbox */ cb, /* String */ prop, /* int */ val )
        {
            if( cb.disabled )
            {
                return 0;
            }
            if( !cb.checked )
            {
                return 0;
            }
            cb.disabled = true;
            this._adjust( prop, val );
            return 1;
        },
        /**
         * Adjusts stat matching prop by val and _checkCaps if we adjusted free_pool or free_edge.
         */
        _adjust : function( /* String */ prop, /* int */ val )
        {
            this.manager.statsWidget[ prop ].value = parseInt( this.manager.statsWidget[ prop ].value ) + val;
            if( prop.indexOf( "free_" ) == 0 )
            {
                this.manager.statsWidget.checkLimits( prop.substring( 5 ) );
            }
        },
        /**
         * Show or hide domNode matching what.
         */
        _show : function( /* DOMElement */ what )
        {
            what.style.display = "list-item";
        },
        _hide : function( what )
        {
            what.style.display = "none";
        }
    });
});