/**
 * Mix into _TierWidget for focus customization features.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "./_AlternativePerkSelector",
         "./data/advancement",
         "../../_util" ],
function( declare,
          lang,
          domClass,
          _AlternativePerkSelector,
          advancement,
          _util )
{
    return declare([ _util ], {
        customize : false,
        customizeFocus : function()
        {
            this.customize = !this.customize;
            if( this.customize )
            {
                this.customizeFocusButton.checked = true;
                domClass.add( this.customizeFocusButton.domNode, "cg-selectedButton" );
                this._toggleDeletedAbilities( this._controls, "focus" );
                this._perkSelector = new _AlternativePerkSelector({
                    manager : this.manager,
                    from : "cust",
                    tier : this.tier,
                    advancement : advancement
                }).placeAt( this.bonusPerksNode );
                this.manager._lists.bonus_list.push( this._perkSelector );
                this.manager._augment( this._invert( this.manager.getFocus().advancement[ this.tier ].stats ) );
            }
            else
            {
                this.customizeFocusButton.checked = false;
                domClass.remove( this.customizeFocusButton.domNode, "cg-selectedButton" );
                this._toggleDeletedAbilities( this._controls, "focus" );
                this._perkSelector.destroy();
                this.manager._augment( this.manager.getFocus().advancement[ this.tier ].stats );
            }
            this.checkApplyButton();
        },
        checkState : function()
        {
            if( this.customize && !this.customizeFocusButton.checked ) // can happen while a character is being loaded
            {
                this.customize = false; // will be toggled right back by the next method
                this.customizeFocus();
            }
        }
    });
});