/**
 * Extends stack controller with buttonWidget which supports closing, and addButton for adding stuff to the stack.
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
        hasAddButton : false,
        addButtonLabel : "Add item",
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.hasAddButton )
            {
                this.containerNode = domConstruct.create( "span", {}, this.domNode );
                this.addButtonNode = domConstruct.create( "span", { "class" : "num-addButtonNode"}, this.domNode );
                this.addButton = new Button({ label : this.addButtonLabel, "style" : "position:relative;" } ).placeAt( this.addButtonNode );
                domConstruct.create( "div", { "class" : "num-tabCloseButton num-activeControl", "innerHTML" : '<i class="num-blueIcon fa fa-plus-circle"></i>' }, this.addButton.titleNode );
                on( this.addButton, "click", lang.hitch( this, this.onAddButtonClick ));
            }
        },
        onAddButtonClick : function()
        {
            // stub
        },
        buttonWidget : declare( [ ToggleButton ], {
            tabIndex: "-1",
            closeButton: false,
            _aria_attr: "aria-selected",
            buildRendering : function( /*Event*/ evt )
            {
                this.inherited( arguments );
                this.containerNode.setAttribute( "role" , "tab" );
                domStyle.set( this.domNode, { "position" : "relative" });
                if( this.closeButton )
                {
                    this.closeNode = domConstruct.create( "div", { "class" : "num-tabCloseButton num-activeControl", "innerHTML" : '<i class="num-redIcon fa fa-times-circle"></i>' }, this.titleNode );
                    on( this.closeNode, "click", lang.hitch( this, this.closeTab ) );
                }
            },
            closeTab : function()
            {
                this.getParent().onCloseButtonClick( this.page );
            }
        })
    });
});