define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
         "./_CharacterValidator",
         "./_ListItem",
         "./_unlockable",
         "dojo/text!./templates/_TierWidget.html" ],
function( declare,
          lang,
          topic,
          domClass,
          domConstruct,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          Button,
          _CharacterValidator,
          _ListItem,
          _unlockable,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _unlockable ], {
        tier : 1,
        typeData : [],
        focusData : [],
        manager : {},
        parent : {},
        templateString : template,
        DEFAULT_SKILL_NAME : "choose any non-combat",
        standardBenefits : {
            recovery_roll : 1
        },
        postMixInProperties : function()
        {
            this._subs = [];
            this._controls = [];
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/destroyListItems", lang.hitch( this, this.destroy ) ) );
            this._subs.push( topic.subscribe( "CharGen/showPurchasedBenefits", lang.hitch( this, function() {
                this.purchasedBenefitsNode.style.display = "block";
            })));
            this._typeData = this.typeData[ this.tier - 1 ];
            this._focusData = this.focusData[ this.tier - 1 ];
            this.specialAbilityName = this.manager.getType().special_ability_name;
        },
        postCreate : function()
        {
            this.initializeUnlockControls();
            for( var i = this.tier; i > 0; i-- )
            {
                var opts = this.typeData[ i - 1 ].perk_list.split( "|" );
                var lbl =  "Tier " + i;
                var grp = domConstruct.create( "optgroup", { label : lbl }, this.perkSelector );
                for( var o = 0; o < opts.length; o++ )
                {
                    domConstruct.create( "option", { innerHTML : opts[ o ] }, grp );
                }
            }
            this.applyBonusPerks();
        },
        getPrevVal : function()
        {
            return {
                perkSelector : this.perkSelector.selectedIndex
            }
        },
        rollBack : function( _prevVal )
        {
            this.perkSelector.selectedIndex = _prevVal.perkSelector;
            this.checkSkillType();
        },
        lockControls : function()
        {
            this.perkSelector.disabled = true;
        },
        unlockControls : function()
        {
            this.perkSelector.disabled = false;
        },
        checkState : function()
        {
            this.checkSkillType();
            if( this.canAdvance() )
            {
                this.applyButton.domNode.style.visibility = "hidden";
            }
        },
        onFocusSkillInput : function()
        {
            if( this.skillInput.value == this.DEFAULT_SKILL_NAME )
            {
                this.skillInput.value = "";
            }
            this.manager.normalizeClass( this.skillInput );
        },
        onBlurSkillInput : function()
        {
            if( this.skillInput.value == "" )
            {
                this.skillInput.value = this.DEFAULT_SKILL_NAME;
            }
            this.manager.normalizeClass( this.skillInput );
        },
        applyBonusPerks : function()
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
                selectedIndex : 0
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
            if( this._focusData.bonus_perks )
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
        checkSkillType : function()
        {
            this.isUnlockable = false;
            switch( this.skillTypeSelector.selectedIndex )
            {
                case 1 :
                    this._show( this.skillInputContainer );
                    this._hide( this.perkSelectorContainer );
                    break;
                case 4 : 
                    this._hide( this.skillInputContainer );
                    this._show( this.perkSelectorContainer );
                    this.isUnlockable = true;
                    break;
                default :
                    this._hide( this.skillInputContainer );
                    this._hide( this.perkSelectorContainer );
                    break;
            }
        },
        applyAdvancement : function()
        {
            if( !this._checkAdvancementCost() )
            {
                return;
            }
            if( !this.skillTypeSelector.disabled ) switch( this.skillTypeSelector.selectedIndex )
            {
                case 0 : 
                    break;
                case 1 : 
                    this.skillInput.disabled = true;
                    this.skillTypeSelector.disabled = true;
                case 2 : 
                    this.skillTypeSelector.disabled = true;
                    break;
                case 3 :
                    this._adjust( "recovery_roll", 2 );
                    this.skillTypeSelector.disabled = true;
                    break;
                case 4 :
                    if( !this._applyPerk() )
                    {
                        return;
                    }
                    this.skillTypeSelector.disabled = true;
                default :
                    this.skillTypeSelector.disabled = true;
                    break;
            }
            this.manager.moveCaps();
            this._applyCheckbox( this.pool_checkbox, "free_pool", 4 );
            this._applyCheckbox( this.edge_checkbox, "free_edge", 1 );
            this._applyCheckbox( this.effort_checkbox, "character_effort", 1 );
            if( this.canAdvance() )
            {
                this.applyButton.domNode.style.visibility = "hidden";
            }
            topic.publish( "CharGen/lockSheetControls" );
            this.manager.unlockFinalize();
        },
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
        _checkAdvancementCost : function()
        {
            if( !this._validator )
            {
                this._validator = new _CharacterValidator({ manager : this.manager });
            }
            if( !this._validator.validateCharacter() )
            {
                return false;
            }
            if( !this.skillTypeSelector.disabled && this.skillTypeSelector.selectedIndex == 1 && this.skillInput.value == this.DEFAULT_SKILL_NAME )
            {
                this.manager.tell( "Please select any non-combat skill." );
                return false;
            }
            if( isNaN( parseInt( this.parent.character_xp.value ) ) )
            {
                this.manager.tell( "You need a minimum of 4 XP to advance your character." );
                return false;
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
                return false;
            }
            else
            {
                this.parent.character_xp.value = parseInt( this.parent.character_xp.value ) - cost;
                return true;
            }
        },
        canAdvance : function()
        {
            if( this.pool_checkbox.checked && this.edge_checkbox.checked && this.effort_checkbox.checked && this.skillTypeSelector.disabled )
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        applyNewTier : function()
        {
            this.manager._augment( this.standardBenefits );
            if( this._typeData.stats )
            {
                this.manager._augment( this._typeData.stats );
            }
            if( this._focusData.stats )
            {
                this.manager._augment( this._focusData.stats );
            }
            if( this.tier > 1 )
            {
                topic.publish( "CharGen/pleaseShowUnlock" );
            }
        },
        listAsText : function()
        {
            return this._perkAsText().concat( this._bonusPerksAsText() );
        },
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
        _perkAsText : function()
        {
            switch( this.skillTypeSelector.selectedIndex )
            {
                case 1 :
                    return [ "Ⓣ " + this.skillInput.value ];
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
        _bonusPerksAsText : function()
        {
            var out = [];
            for( var i = 0; i < this._controls.length; i++ )
            {
                out.push( this._controls[ i ].getText() );
            }
            return out;
        },
        _applyPerk : function()
        {
            var perk = this.perkSelector.options[ this.perkSelector.selectedIndex ].text;
            var perks = this.manager.listAsText( "special_list" );
            var stack = this._typeData.skills_stack;
            var found = false;
            this.perkSelector.disabled = true;
            return true;
        },
        _applyCheckbox : function( cb, prop, val )
        {
            if( cb.disabled )
            {
                return;
            }
            if( !cb.checked )
            {
                return;
            }
            cb.disabled = true;
            this._adjust( prop, val );
        },
        _adjust : function( prop, val )
        {
            this.manager[ prop ].value = parseInt( this.manager[ prop ].value ) + val;
            if( prop.indexOf( "free_" ) == 0 )
            {
                this.manager._checkCaps( prop.substring( 5 ) );
            }
        },
        _show : function( what )
        {
            what.style.display = "list-item";
        },
        _hide : function( what )
        {
            what.style.display = "none";
        }
    });
});