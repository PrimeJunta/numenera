define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/Evented",
         "dojo/dom-class",
         "dijit/form/TextBox",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_ItemControl.html" ],
function( declare,
          lang,
          on,
          Evented,
          domClass,
          TextBox,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented ], {
        value : "",
        templateString : template,
        addControl : false,
        specialCharsIn : "TSEAIa",
        specialCharsOut : "ⓉⓈⒺⒶⒾⓐ",
        parent : {},
        postCreate : function()
        {
            if( this._hasSelect() || this._hasInput() )
            {
                this.toggleContent();
                this._populateInputSettings();
                this._populateSelectOptionList();
                this._checkMidText();
                this._checkStartText();
            }
            this.own( on( this.controlWidget, "keyup", lang.hitch( this, this.checkState )));
            this.own( on( this.controlWidget, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            })));
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
            // TODO: block forbidden characters ${}
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
        toggleContent : function()
        {
            domClass.toggle( this.domNode, "cg-collapsed" );
            domClass.toggle( this.domNode, "cg-expanded" );
        },
        addMe : function()
        {
            this.parent.addItem( this );
        },
        deleteMe : function()
        {
            this.parent.deleteItem( this );
        },
        _hasSelect : function()
        {
            if( this.value.indexOf( "${select" ) != -1 )
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        _hasInput : function()
        {
            if( this.value.indexOf( "${input" ) != -1 )
            {
                return true;
            }
        },
        _populateSelectOptionList : function()
        {
            if( !this._hasSelect() )
            {
                return;
            }
            this._opts = [];
            var _sel = /\$\{select:(\d):([^}]+)\}/.exec( this.value );
            this.numberOfItemsInput.set( "value", _sel[ 1 ] );
            var opts = _sel[ 2 ].split( "|" );
            for( var i = 0; i < opts.length; i++ )
            {
                this._opts.push( new TextBox({ "class" : "cg-optionItem", value : opts[ i ] }).placeAt( this.selectItemsNode ) ); // TODO: make this a destroyable item
            }
        },
        _populateInputSettings : function()
        {
            if( !this._hasInput() )
            {
                return;
            }
            var _inp = /\$\{input:([^}]+)\}/.exec( this.value );
            console.log( "INP IS", _inp[ 1 ] );
            this.inputDefaultInput.set( "value", _inp[ 1 ] );
            if( !this._hasSelect() )
            {
                this.selectHeader.style.display = "none";
                this.midTextHeader.style.display = "none";
                this.midTextInput.domNode.style.display = "none";
            }
        },
        _checkStartText : function()
        {
            this.controlWidget.set( "value", this.value.substring( 0, this.value.indexOf( "$" ) ) );
        },
        _checkMidText : function()
        {
            var _mt = /\}(.+)\$\{/.exec( this.value );
            if( _mt && _mt[ 1 ] )
            {
                this.midTextInput.set( "value", _mt[ 1 ] );
            }
        }
    });
});