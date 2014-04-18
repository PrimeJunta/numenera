define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/Evented",
         "dojo/dom-class",
         "./_OptionListControl",
         "dijit/form/TextBox",
         "dijit/form/CheckBox",
         "dijit/form/Button",
         "dijit/form/ToggleButton",
         "./_SpecialCharParserMixin",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_ItemControl.html" ],
function( declare,
          lang,
          on,
          Evented,
          domClass,
          _OptionListControl,
          TextBox,
          CheckBox,
          Button,
          ToggleButton,
          _SpecialCharParserMixin,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, Evented, _SpecialCharParserMixin ], {
        value : "",
        templateString : template,
        addControl : false,
        parent : {},
        quickOptions : {
            Weapons : [ "Light Bashing Weapon", "Light Bladed Weapon", "Light Ranged Weapon", "Medium Bashing Weapon", "Medium Bladed Weapon", "Medium Ranged Weapon", "Heavy Bashing Weapon", "Heavy Bladed Weapon", "Heavy Ranged Weapon" ],
            Attacks : [ "Ⓣ Light Bashing", "Ⓣ Light Bladed", "Ⓣ Light Ranged", "Ⓣ Medium Bashing", "Ⓣ Medium Bladed", "Ⓣ Medium Ranged", "Ⓣ Heavy Bashing", "Ⓣ Heavy Bladed", "Ⓣ Heavy Ranged" ],
            Defenses : [ "Ⓣ Might Defense", "Ⓣ Speed Defense", "Ⓣ Intellect Defense"]
        },
        // TODO: clean up unnecessary change events fired during construction
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
            this.setSpecialCharListener( this.controlWidget );
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
        get : function( what )
        {
            if( what == "value" )
            {
                var val = this.controlWidget.get( "value" );
                if( this.selectToggle.get( "checked" ) && this.numberOfItemsInput.get( "value" ) > 0 && this._optionControl.get( "length" ) > 0 )
                {
                    val += "${select:";
                    val += this.numberOfItemsInput.get( "value" );
                    val += ":";
                    val += this._optionControl.get( "value" );
                    val += "}";
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
            this.selectToggle.set( "checked", false );
            this._selectHidden = true;
        },
        showSelect : function()
        {
            this.selectHeader.style.display = "inline";
            this.midTextHeader.style.display = "inline";
            this.midTextInput.domNode.style.display = "inline-block";
            this.selectItemsNode.style.display = "block";
            this.selectToggle.set( "checked", true );
            this._selectHidden = false;
        },
        populateSelect : function()
        {
            if( this.quickPopulateSelect.value && this.quickOptions[ this.quickPopulateSelect.value ])
            {
                this._optionControl.set( "value", this.quickOptions[ this.quickPopulateSelect.value ] );
            }
        },
        _hasSelect : function()
        {
            if( this.value.indexOf( "${select:" ) != -1 )
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
            var num = 1;
            var val = "";
            if( this._hasSelect() )
            {
                var _sel = /\$\{select:(\d):([^}]+)\}/.exec( this.value );
                if( _sel )
                {
                    num = _sel[ 1 ];
                    val = _sel[ 2 ];
                }
            }
            this.numberOfItemsInput.set( "value", num );
            this._optionControl = new _OptionListControl({ parent : this, value : val } ).placeAt( this.selectItemsNode );
            this.own( on( this._optionControl, "change", lang.hitch( this, this.emit, "change" ) ) );
        },
        _populateInputSettings : function()
        {
            if( !this._hasInput() )
            {
                return;
            }
            var _inp = /\$\{input:([^}]+)\}/.exec( this.value );
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