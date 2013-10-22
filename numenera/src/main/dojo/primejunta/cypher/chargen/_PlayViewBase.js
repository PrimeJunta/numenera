/**
 * Play view base. Builds on _PrintViewBase by adding some dynamic functionality.
 */
define([ "dojo/_base/declare",
         "dojo/_base/array",
         "dojox/mobile/Container",
         "dojox/mobile/View",
         "dojox/mobile/ScrollableView",
         "dojox/mobile/TabBar",
         "dojox/mobile/TabBarButton",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_CharacterViewBase" ],
function( declare,
          array,
          Container,
          View,
          ScrollableView,
          TabBar,
          TabBarButton,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          _CharacterViewBase )
{
    return declare([ _CharacterViewBase ], {
        postCreate : function()
        {
            this._viewOrder = [ this.descriptionView, this.statsView, this.abilitiesView, this.possessionsView ];
            this.inherited( arguments );
        },
        closeMe : function()
        {
            this.manager.closePlayView();
        },
        toDescriptionView : function()
        {
            this._moveTo( this.descriptionView );
        },
        toStatsView : function()
        {
            this._moveTo( this.statsView );
        },
        toAbilitiesView : function()
        {
            this._moveTo( this.abilitiesView );
        },
        toPossessionsView : function()
        {
            this._moveTo( this.possessionsView );
        },
        _moveTo : function( view )
        {
            var curView = view.getShowingView();
            if( curView == view )
            {
                return;
            }
            var dir = array.indexOf( this._viewOrder, view ) - array.indexOf( this._viewOrder, curView ) < 0 ? -1 : 1;
            curView.performTransition( view.id, dir, "slide" );
        }
    });
});