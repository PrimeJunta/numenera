/**
 * Extends stack controller with buttonWidget which supports closing, and handles custom iconClass for a nicer icon.
 *
 * @public Widget
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-style",
         "dojo/dom-construct",
         "dijit/form/ToggleButton",
         "dijit/form/Button",
         "dijit/layout/StackController" ],
function( declare,
          lang,
          on,
          domStyle,
          domConstruct,
          ToggleButton,
          Button,
          StackController )
{
    return declare([ StackController ], {
        onAddButtonClick : function()
        {
            // stub
        },
        buttonWidget : declare( [ ToggleButton ], {
            tabIndex: "-1",
            closeButton: false,
            addButton : false,
            _aria_attr: "aria-selected",
            buildRendering : function( /*Event*/ evt )
            {
                this.inherited( arguments );
                this.containerNode.setAttribute( "role" , "tab" );
                domStyle.set( this.domNode, { "position" : "relative" });
                if( this.closeButton )
                {
                    this.closeNode = domConstruct.create( "div", { "class" : "num-tabButton num-activeControl", "innerHTML" : '<i class="num-redIcon fa fa-times-circle"></i>' }, this.titleNode );
                    on( this.closeNode, "click", lang.hitch( this, this.closeTab ) );
                }
                else if( this.iconClass == "num-addButton" )
                {
                    this.addNode = domConstruct.create( "div", { "class" : "num-tabButton num-activeControl", "innerHTML" : '<i class="num-blueIcon fa fa-plus-circle"></i>' }, this.titleNode );
                }
            },
            closeTab : function()
            {
                this.getParent().onCloseButtonClick( this.page );
            }
        })
    });
});