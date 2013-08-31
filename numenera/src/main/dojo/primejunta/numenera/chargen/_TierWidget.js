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
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        tier : 1,
        typeData : [],
        focusData : [],
        manager : {},
        parent : {},
        templateString : template,
        DEFAULT_SKILL_NAME : "choose any non-combat",
        postMixInProperties : function()
        {
            this._subs = [];
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/destroyListItems", lang.hitch( this, this.destroy ) ) );
            this._typeData = this.typeData[ this.tier - 1 ];
            this._focusData = this.focusData[ this.tier - 1 ];
        },
        postCreate : function()
        {
            for( var i = this.tier; i > 0; i-- )
            {
                var opts = this.typeData[ i - 1 ].perk_list.split( "|" );
                var grp = domConstruct.create( "optgroup", { label : "Tier " + i }, this.perkSelector );
                for( var o = 0; o < opts.length; o++ )
                {
                    domConstruct.create( "option", { innerHTML : opts[ o ] }, grp );
                }
            }
            this.applyBonusPerks();
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
                for( var i = 0; i < bps.length; i++ )
                {
                    var widg = new _ListItem({
                        manager : this,
                        content : bps[ i ],
                        from : "advancement",
                        selectedIndex : 0,
                    }).placeAt( this.bonusPerksNode );
                }
            }
        },
        checkSkillType : function()
        {
            switch( this.skillTypeSelector.selectedIndex )
            {
                case 1 :
                    this._show( this.skillInput );
                    this._hide( this.perkSelector );
                    break;
                case 4 : 
                    this._hide( this.skillInput );
                    this._show( this.perkSelector );
                    break;
                default :
                    this._hide( this.skillInput );
                    this._hide( this.perkSelector );
                    break;
            }
        },
        applyAdvancement : function()
        {
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
        destroy : function()
        {
            while( this._subs.length > 0 )
            {
                this._subs.pop().remove();
            }
            this.inherited( arguments );
        },
        applyStatBonuses : function()
        {
            if( this._typeData.stats )
            {
                this.manager._augment( this._typeData.stats );
                this.manager._augment( this._focusData.stats );
            }
        },
        _applyPerk : function()
        {
            var perk = this.perkSelector.options[ this.perkSelector.selectedIndex ].text;
            var perks = this.manager.listAsText( "special_list" );
            var stack = this._typeData.skills_stack;
            for( var i = 0; i < perks.length; i++ )
            {
                if( perk == perks[ i ] && ( !stack || ( stack && perk.charAt( 0 ) == 'Ⓣ' ) ) )
                {
                    this._tell( "You cannot take " + perk + " a second time at this tier." );
                    return false;
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
            what.style.display = "inline-block";
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