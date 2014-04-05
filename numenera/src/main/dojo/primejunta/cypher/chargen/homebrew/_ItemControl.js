define([ "dojo/_base/declare",
       "dojo/_base/lang",
       "dojo/on",
       "dijit/form/TextBox",
       "dijit/form/Button",
       "dijit/_WidgetBase",
       "dijit/_TemplatedMixin",
       "dijit/_WidgetsInTemplateMixin",
       "dojo/text!./templates/_ItemControl.html" ],
function( declare,
          lang,
          on,
          TextBox,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        value : "",
        templateString : template,
        addControl : false,
        specialCharsIn : "TSEAIa",
        specialCharsOut : "ⓉⓈⒺⒶⒾⓐ",
        parent : {},
        postCreate : function()
        {
            this.own( on( this.controlWidget, "keyup", lang.hitch( this, this.checkState )));
            if( !this.addControl )
            {
                this.deleteButton.domNode.style.display = "inline-block";
                this.own( on( this.deleteButton, "click", lang.hitch( this, this.deleteMe ) ) );
            }
            else
            {
                this.addButton.domNode.style.display = "inline-block";
                this.own( on( this.addButton, "click", lang.hitch( this, this.addMe ) ) );
            }
        },
        checkState : function()
        {
            var val = this.controlWidget.get( "value" );
            var idx = this.specialCharsIn.indexOf( val.charAt( 0 ) );
            if( val.charAt( 1 ) == " " && idx != -1 )
            {
                this.controlWidget.set( "value", this.specialCharsOut.charAt( idx ) + val.substring( 1 ) );
            }
        },
        get : function( what )
        {
            if( what == "value" )
            {
                return this.controlWidget.get( "value" );
            }
            else
            {
                return this.inherited( arguments );
            }
        },
        set : function( what, to )
        {
            if( what == "value" )
            {
                this.controlWidget.set( "value", to );
            }
            else
            {
                this.inherited( arguments );
            }
        },
        focus : function()
        {
            this.controlWidget.focus();
        },
        addMe : function()
        {
            this.parent.addItem( this );
        },
        deleteMe : function()
        {
            this.parent.deleteItem( this );
        }
    });
});