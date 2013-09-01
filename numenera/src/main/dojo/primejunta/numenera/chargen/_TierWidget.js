define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
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
            this._typeData = this.typeData[ this.tier - 1 ];
            this._focusData = this.focusData[ this.tier - 1 ];
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
        applyBonusPerks : function()
        {
            if( this.tier == 1 )
            {
                return;
            }
            var bps = [];
            if( this._typeData.bonus_perks )
            {
                bps = bps.concat( this._typeData.bonus_perks );
            }
            if( this._focusData.bonus_perks )
            {
                bps = bps.concat( this._focusData.bonus_perks );
            }
            if( bps.length == 0 )
            {
                this.bonusPerksNode.innerHTML = "No bonus perks for this tier.";
            }
            else
            {
                this.bonusPerksTitle.style.display = "block";
                for( var i = 0; i < bps.length; i++ )
                {
                    this._controls.push( new _ListItem({
                        manager : this,
                        content : bps[ i ],
                        from : "advancement",
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
            try {
            if( !this.skillTypeSelector.disabled ) switch( this.skillTypeSelector.selectedIndex )
            {
                case 0 : 
                    break;
                case 1 : 
                    if( this.skillInput.value == this.DEFAULT_SKILL_NAME )
                    {
                        this._tell( "Please select any non-combat skill." );
                        return;
                    }
                    else
                    {
                        this.skillInput.disabled = true;
                        this.skillTypeSelector.disabled = true;
                    }
                    break;
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
            }catch(e){console.log("owie",e)}
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
            this.manager._augment( this.standardBenefits.stats );
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
            for( var i = 0; i < perks.length; i++ )
            {
                if( perk == perks[ i ] && ( !stack || ( stack && perk.charAt( 0 ) == 'Ⓣ' ) ) )
                {
                    if( found )
                    {
                        this._tell( "You cannot take " + perk + " a second time at this tier." );
                        return false;
                    }
                    else
                    {
                        found = true;
                    }
                }
            }
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
        },
        _tell : function( msg )
        {
            alert( msg );
        }
    });
});