define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
         "./_TierWidget",
         "dojo/text!./templates/_AdvancementControl.html" ],
function( declare,
          lang,
          topic,
          domClass,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          Button,
          _TierWidget,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        manager : {},
        tier : 1,
        typeData : {},
        focusData : {},
        templateString : template,
        postMixInProperties : function()
        {
            this._controls = [];
        },
        advanceTier : function( tier )
        {
            if( !isNaN( tier ) )
            {
                this.tier = tier;
            }
            topic.publish( "CharGen/lockSheetControls" );
            while( this._controls.length < this.tier )
            {
                this._controls.push( new _TierWidget({ manager : this.manager, parent : this, typeData : this.typeData, focusData : this.focusData, tier : this._controls.length + 1 }).placeAt( this.tierContainerNode ) );
                domClass.add( this._controls[ this._controls.length - 1 ].domNode, this._controls.length % 2 == 0 ? "cg-paleBackground" : "cg-warmBackground" );
            }
            this.manager.character_tier.value = this.tier;
            this.manager.moveCaps();
            topic.publish( "CharGen/unlockSpecialButtons" );
        },
        checkAdvancement : function()
        {
            if( this._controls.length > 0 )
            {
                if( this._controls[ this._controls.length - 1 ].canAdvance() )
                {
                    this.advanceTier( this._controls.length + 1 );
                    this._controls[ this._controls.length - 1 ].applyStatBonuses();
                }
            }
        },
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