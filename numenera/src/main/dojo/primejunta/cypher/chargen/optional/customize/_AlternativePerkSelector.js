/**
 * UI control for selecting an alternative perk when you swap out your normal focus-derived one. Behaves
 * similarly to a _ListItem in most respects.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/topic",
         "primejunta/cypher/chargen/_ListItemBase",
         "dojo/text!./templates/_AlternativePerkSelector.html" ],
function( declare,
          lang,
          domClass,
          topic,
          _ListItemBase,
          template )
{
    return declare( "primejunta/cypher/chargen/optional/customize/_AlternativePerkSelector", [ _ListItemBase ], {
        /**
         * Default value for (skill) input.
         */
        inputValue : "choose any non-combat",
        /**
         * Template.
         */
        templateString : template,
        /**
         * Array of advancement options.
         */
        advancement : [],
        /**
         * Tier.
         */
        tier : 1,
        hasInput : true,
        hasSelect : true,
        /**
         * It's only virtual.
         */
        deleteControl : {},
        /**
         * Calls populatePerkSelector on this.advancement, tier, and selectNode.
         */
        postCreate : function()
        {
            this.populatePerkSelector( this.advancement, this.tier, this.selectNode );
        },
        /**
         * Triggered when the user selects something. Un-applies changes from any previous selection, 
         * and augments free_pool by 6 if that's what the user wanted to do.
         */
        selectionMade : function()
        {
            var sel = this.selectValue( this.selectNode ).value;
            this._deselect( this._selection );
            if( sel == "Ⓔ Self-Improvement" )
            {
                this.manager.statsControl.augmentStats({ free_pool : 6 });
                this.manager.statsControl.checkCaps();
            }
            this.checkState();
            this._selection = sel;
        },
        /**
         * If the user has selected More Training, shows the input. Else clears and hides it.
         */
        checkState : function()
        {
            if( this.selectValue( this.selectNode ).value == "Ⓔ More Training" )
            {
                this.inputWrapper.style.display = "block";
                this.onBlurInput();
            }
            else
            {
                this.inputNode.value = "";
                this.inputWrapper.style.display = "none";
            }
            if( this.selectNode.disabled )
            {
                this._disableSelect( "selectNode", true );
            }
        },
        /**
         * If the previous selection was Self-Improvement, subtracts 6 from free_pool, checkCaps, and checkState.
         * NOTE: yeah, it is possible to "cheat" here by first selecting it, then applying the free_pool, then 
         * selecting something else, leaving your free_pool at -6. If you do this, ask your GM to give you a
         * spanking.
         */
        _deselect : function( /* String */ selection )
        {
            if( selection == "Ⓔ Self-Improvement" )
            {
                this.manager.statsControl.augmentStats({ free_pool : -6 });
                this.manager.statsControl.checkCaps();
            }
            this.checkState();
            return;
        },
        /**
         * Returns selection as text. If More Training was selected, returns the selected training instead.
         */
        getText : function()
        {
            if( this._destroyed )
            {
                return "";
            }
            else if( this.selectValue( this.selectNode ).value == "Ⓔ More Training")
            {
                return( "Ⓣ " + this.inputNode.value );
            }
            else
            {
                return this.selectValue( this.selectNode ).value;
            }
        }
    });
});