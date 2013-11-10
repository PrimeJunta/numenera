/**
 * Manager for _TierWidgets. Controls character advancement.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_UtilityMixin",
         "./_TierWidget",
         "dijit/form/Button",
         "dijit/layout/BorderContainer",
         "dijit/layout/ContentPane",
         "dojo/text!./templates/_AdvancementControl.html" ],
function( declare,
          lang,
          on,
          topic,
          domClass,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          _UtilityMixin,
          _TierWidget,
          Button,
          BorderContainer,
          ContentPane,
          template )
{
    return declare([ ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        /**
         * Inherits ContentPane which is inside a BorderContainer, so set gutters to false.
         */
        gutters : false,
        /**
         * Also a ContentPane property.
         */
        title : "Advancement",
        /**
         * The instantiating _PrintView.
         */
        manager : {},
        /**
         * Current tier.
         */
        tier : 1,
        /**
         * Advancement data from type.
         */
        typeData : {},
        /**
         * Advancement data from focus.
         */
        focusData : {},
        /**
         * Template
         */
        templateString : template,
        /**
         * Initialize _controls.
         */
        postMixInProperties : function()
        {
            this._controls = [];
        },
        /**
         * Connects manage.character_xp to this, for convenience.
         */
        postCreate : function()
        {
            on( this.character_xp, "blur", lang.hitch( this, this.intInputChanged, this.character_xp ) );
        },
        /**
         * If tier is provided, sets this.tier to it. Then publishes lockSheetControls and creates enough _TierWidgets
         * for tier, populates manager.character_tier value from it, and manager.statsControl.moveCaps() to reset the floors. Triggered
         * when populating data programmatically or through a user Advancing a character eligible to the next tier.
         */
        advanceTier : function( tier )
        {
            if( !isNaN( parseInt( tier ) ) )
            {
                this.tier = tier;
            }
            while( this._controls.length < this.tier )
            {
                this._controls.push( this.createTierWidget({
                    manager : this.manager,
                    parent : this,
                    typeData : this.typeData,
                    focusData : this.focusData,
                    tier : this._controls.length + 1
                }).placeAt( this.tierContainerNode ) );
                domClass.add( this._controls[ this._controls.length - 1 ].domNode, this._controls.length % 2 == 0 ? "num-evenBackground" : "num-oddBackground" );
            }
            this.manager.statsControl.set( "character_tier", this.tier );
            this.manager.statsControl.moveCaps();
        },
        /**
         * Parses int from character_xp and returns it or 0 if NaN.
         */
        getXP : function()
        {
            var xp = parseInt( this.character_xp.value );
            return isNaN( xp ) ? 0 : xp;
        },
        /**
         * Calls changeFocus on each _TierWidget in _controls.
         */
        changeFocus : function( focus )
        {
            for( var i = 0; i < this._controls.length; i++ )
            {
                this._controls[ i ].changeFocus( focus.advancement );
            }
        },
        /**
         * Stub. Return TierWidget of the appropriate type.
         */
        createTierWidget : function( props )
        {
            return new _TierWidget( props );
        },
        /**
         * Checks if the previous tier is complete, and applies a new one.
         */
        checkAdvancement : function()
        {
            topic.publish( "CharGen/showPurchasedBenefits" );
            if( this._controls.length > 0 )
            {
                if( this._controls[ this._controls.length - 1 ].canAdvance() )
                {
                    this.advanceTier( this._controls.length + 1 );
                    this._controls[ this._controls.length - 1 ].applyNewTier();
                }
            }
        },
        /**
         * Concats contents of all _TierWidgets into one String[], and returns it.
         */
        listAsText : function()
        {
            var out = [];
            for( var i = 0; i < this._controls.length; i++ )
            {
                out = out.concat( this._controls[ i ].listAsText() );
            }
            return out;
        },
        /**
         * Pops and destroys any contained _controls, and inherited.
         */
        destroy : function()
        {
            while( this._controls.length > 0 )
            {
                this._controls.pop().destroy();
            }
            this.inherited( arguments );
        }
    });
});