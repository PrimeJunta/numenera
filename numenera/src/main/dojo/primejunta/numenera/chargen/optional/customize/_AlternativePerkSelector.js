/**
 * UI control for selecting an alternative perk when you swap out your normal focus-derived one. Behaves
 * similarly to a _ListItem in most respects.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/topic",
         "primejunta/cypher/chargen/_UtilityMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/_AlternativePerkSelector.html" ],
function( declare,
          lang,
          domClass,
          topic,
          _UtilityMixin,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _UtilityMixin ], {
        /**
         * Owner CharacterGenerator.
         */
        manager : {},
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
        /**
         * Subscribes to pleaseCheckState and lockSheetControls with checkState and
         * lockControls, respectively.
         */
        postMixInProperties : function()
        {
            this._subs = [];
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) ) );
        },
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
            var sel = this._selVal( this.selectNode ).value;
            this._deselect( this._selection );
            if( sel == "Ⓔ Self-Improvement" )
            {
                this.manager.statsWidget.augmentStats({ free_pool : 6 });
                this.manager.statsWidget.checkCaps();
            }
            this.checkState();
            this._selection = sel;
        },
        /**
         * If the user has selected More Training, shows the input. Else clears and hides it.
         */
        checkState : function()
        {
            if( this._selVal( this.selectNode ).value == "Ⓔ More Training" )
            {
                this.inputWrapper.style.display = "block";
                this.onBlurInput();
            }
            else
            {
                this.inputNode.value = "";
                this.inputWrapper.style.display = "none";
            }
        },
        /**
         * Disables input and select node.
         */
        lockControls : function()
        {
            this.inputNode.disabled = true;
            this.selectNode.disabled = true;
        },
        /**
         * Removes subscriptions, and inherited.
         */
        destroy : function()
        {
            while( this._subs.length > 0 )
            {
                this._subs.pop().remove();
            }
            this.inherited( arguments );
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
                this.manager.statsWidget.augmentStats({ free_pool : -6 });
                this.manager.statsWidget.checkCaps();
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
            else if( this._selVal( this.selectNode ).value == "Ⓔ More Training")
            {
                return( "Ⓣ " + this.inputNode.value );
            }
            else
            {
                return this._selVal( this.selectNode ).value;
            }
        }
    });
});