/**
 * Mix into _TierWidget for focus customization features.
 * Note to self: why didn't I extend Button rather than linking to it like this?
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
        /**
         * If the tier is customized, set to true.
         */
        customize : false,
        /**
         * Toggles this.customize. If it was applied, sets the appropriate style on the customizeFocusButton,
         * creates, registers, and places a _perkSelector, and un-augments stats by any gains normally made
         * at this tier.
         */
        customizeFocus : function()
        {
            this.customize = !this.customize;
            if( this.customize )
            {
                this.customizeFocusButton.checked = true;
                domClass.add( this.customizeFocusButton.domNode, "num-selectedButton" );
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
                domClass.remove( this.customizeFocusButton.domNode, "num-selectedButton" );
                this._toggleDeletedAbilities( this._controls, "focus" );
                this._perkSelector.destroy();
                this.manager._augment( this.manager.getFocus().advancement[ this.tier ].stats );
            }
            this.checkApplyButton();
        },
        /**
         * Handles situation where the tier is customized but the button isn't flagged with the corresponding
         * CSS class, which can happen when loading a character.
         */
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