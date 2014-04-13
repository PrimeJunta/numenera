define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/Evented",
         "dojo/dom-class",
         "./_OptionTextBox",
         "dijit/form/TextBox",
         "dijit/form/CheckBox",
         "dijit/form/Button",
         "dijit/form/ToggleButton",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_ItemControl.html" ],
function( declare,
          lang,
          on,
          Evented,
          domClass,
          _OptionTextBox,
          TextBox,
          CheckBox,
          Button,
          ToggleButton,
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
        quickOptions : {
            Weapons : [ "Light Bashing Weapon", "Light Bladed Weapon", "Light Ranged Weapon", "Medium Bashing Weapon", "Medium Bladed Weapon", "Medium Ranged Weapon", "Heavy Bashing Weapon", "Heavy Bladed Weapon", "Heavy Ranged Weapon" ],
            Attacks : [ "Ⓣ Light Bashing", "Ⓣ Light Bladed", "Ⓣ Light Ranged", "Ⓣ Medium Bashing", "Ⓣ Medium Bladed", "Ⓣ Medium Ranged", "Ⓣ Heavy Bashing", "Ⓣ Heavy Bladed", "Ⓣ Heavy Ranged" ],
            Defenses : [ "Ⓣ Might Defense", "Ⓣ Speed Defense", "Ⓣ Intellect Defense"]
        },
        postCreate : function()
        {
            this._populateSelectOptionList();
            if( this._hasSelect() || this._hasInput() )
            {
                this.toggleContent();
                this._populateInputSettings();
                this._checkMidText();
                this._checkStartText();
            }
            if( this._hasSelect() )
            {
                this.showSelect();
            }
            else
            {
                this.hideSelect();
            }
            this.own( on( this.controlWidget, "keyup", lang.hitch( this, this.checkState )));
            this.own( on( this.controlWidget, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            })));
            if( !this.addControl )
            {
                this.deleteButton.style.display = "inline-block";
                this.own( on( this.deleteButton, "click", lang.hitch( this, this.deleteMe ) ) );
            }
            else
            {
                this.addButton.style.display = "inline-block";
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
                var val = this.controlWidget.get( "value" );
                if( this.selectToggle.get( "checked" ) && this.numberOfItemsInput.get( "value" ) > 0 && this._opts.length > 0 )
                {
                    val += "${select:";
                    val += this.numberOfItemsInput.get( "value" );
                    val += ":";
                    var opts = [];
                    for( var i = 0; i < this._opts.length; i++ )
                    {
                        var _o = this._opts[ i ].get( "value" );
                        if( _o )
                        {
                            opts.push( _o )
                        }
                    }
                    if( this._newOpt.get( "value" ) )
                    {
                        opts.push( this._newOpt.get( "value" ) );
                    }
                    val += opts.join( "|" ) + "}";
                    val += this.midTextInput.get( "value" );
                }
                if( this.inputDefaultInput.get( "value" ) )
                {
                    val += "${input:" + this.inputDefaultInput.get( "value" ) + "}";
                }
                return val;
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
            this.contentToggle.set( "checked", !domClass.contains( this.domNode, "cg-collapsed" ) );
        },
        addMe : function()
        {
            this.parent.addItem( this );
        },
        deleteMe : function()
        {
            this.parent.deleteItem( this );
        },
        toggleSelect : function()
        {
            this._selectHidden = !this._selectHidden;
            if( this._selectHidden )
            {
                this.hideSelect();
            }
            else
            {
                this.showSelect();
            }
        },
        hideSelect : function()
        {
            this.selectHeader.style.display = "none";
            this.midTextHeader.style.display = "none";
            this.midTextInput.domNode.style.display = "none";
            this.selectItemsNode.style.display = "none";
            this.newOptNode.style.display = "none";
            this.selectToggle.set( "checked", false );
            this._selectHidden = true;
        },
        showSelect : function()
        {
            this.selectHeader.style.display = "inline";
            this.midTextHeader.style.display = "inline";
            this.midTextInput.domNode.style.display = "inline-block";
            this.selectItemsNode.style.display = "block";
            this.newOptNode.style.display = "block";
            this.selectToggle.set( "checked", true );
            this._selectHidden = false;
        },
        plzAddItem : function( widg )
        {
            var val = widg.get( "value" );
            if( val )
            {
                this.addItem( val );
                widg.set( "value", "" );
            }
        },
        destroyItem : function( widg )
        {
            this._opts.splice( this._opts.indexOf( widg ), 1 );
            widg.destroy();
            this.emit( "change", { bubbles : true, cancelable : true });
        },
        addItem : function( val )
        {
            var opt = new _OptionTextBox({ parent : this, value : val }).placeAt( this.selectItemsNode );
            opt.own( on( opt, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            })));
            this._opts.push( opt );
            this.emit( "change", { bubbles : true, cancelable : true });
        },
        populateSelect : function()
        {
            if( this.quickPopulateSelect.value && this.quickOptions[ this.quickPopulateSelect.value ])
            {
                while( this._opts.length > 0 )
                {
                    this._opts.pop().destroy();
                }
                this.createOptions( this.quickOptions[ this.quickPopulateSelect.value ] );
            }
        },
        createOptions : function( opts )
        {
            for( var i = 0; i < opts.length; i++ )
            {
                this.addItem( opts[ i ] );
            }
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
            this._opts = [];
            if( this._hasSelect() )
            {
                var _sel = /\$\{select:(\d):([^}]+)\}/.exec( this.value );
                this.numberOfItemsInput.set( "value", _sel[ 1 ] );
                var opts = _sel[ 2 ].split( "|" );
                this.createOptions( opts );
            }
            this._newOpt = new _OptionTextBox({ parent : this, value : "", add : true }).placeAt( this.newOptNode );
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
                this.hideSelect();
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