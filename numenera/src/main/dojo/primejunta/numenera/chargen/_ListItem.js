define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
         "./_unlockable",
         "dojo/text!./templates/_ListItem.html",
         "dojo/text!./templates/_ListItemSelect.html",
         "dojo/text!./templates/_ListItemInput.html",
         "dojo/text!./templates/_ListItemSelectInput.html",],
function( declare,
          lang,
          on,
          topic,
          domClass,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          Button,
          _unlockable,
          template,
          templateSelect,
          templateInput,
          templateSelectInput )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _unlockable ], {
        templateString : template,
        content : "",
        from : "",
        selectedIndex : -1,
        manager : {},
        hasUnlockControls : false,
        remainsOpen : false,
        postMixInProperties : function()
        {
            if( this.content.indexOf( "${input" ) != -1 && this.content.indexOf( "${select" ) != -1 )
            {
                this._hasSelect = true;
                this._hasInput = true;
                this.templateString = templateSelectInput;
            }
            else if( this.content.indexOf( "${input" ) != -1 )
            {
                this._hasInput = true;
                this.templateString = templateInput;
            }
            else if( this.content.indexOf( "${select" ) != -1 )
            {
                this._hasSelect = true;
                this.templateString = templateSelect;
            }
            this.midText = this.getMidText();
            this.baseText = this.getBaseText();
            this.inputValue = this.getInputValue();
            this.selectOptions = this.getSelectOptions();
            this._subs = [ topic.subscribe( "CharGen/destroyListItems", lang.hitch( this, this.destroy ) ) ];
            if( this._hasInput )
            {
                this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.normalizeClass ) ) );
                this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockInput ) ) );
            }
            if( this._hasSelect )
            {
                this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockSelect ) ) );
            }
            if( this.hasUnlockControls )
            {
                this.initializeUnlockControls();
            }
        },
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this._hasSelect )
            {
                this.selectNode.innerHTML = this.selectOptions;
                if( this.selectedIndex > 0 )
                {
                    this.selectNode.selectedIndex = this.selectedIndex;
                }
            }
            if( this.baseText == "" && !this._hasSelect && this._hasInput )
            {
                this.baseTextNode.style.display = "none";
            }
        },
        lockInput : function()
        {
            if( this.remainsOpen )
            {
                return;
            }
            this.inputNode.disabled = true;
        },
        lockSelect : function()
        {
            if( this.remainsOpen )
            {
                return;
            }
            this.selectNode.disabled = true;
        },
        getPrevVal : function()
        {
            return {
                selectedIndex : this.selectNode ? this.selectNode.selectedIndex : false,
                inputValue : this.inputNode ? this.inputNode.value : false
            }
        },
        rollBack : function( _prevVal )
        {
            _prevVal.inputValue ? this.inputNode.value = _prevVal.inputValue : false;
            _prevVal.selectedIndex ? this.selectNode.selectedIndex = _prevVal.selectedIndex : false;
        },
        lockControls : function()
        {
            if( this.selectNode )
            {
                this.selectNode.disabled = true;
            }
            if( this.inputNode )
            {
                this.inputNode.disabled = true;
            }
        },
        unlockControls : function()
        {
            if( this.selectNode )
            {
                this.selectNode.disabled = false;
            }
            if( this.inputNode )
            {
                this.inputNode.disabled = false;
            }
        },
        getBaseText : function()
        {
            return this.content.indexOf( "${" ) != -1 ? this.content.substring( 0, this.content.indexOf( "${" ) ) : this.content;
        },
        getMidText : function()
        {
            return ( this.content.indexOf( "${input" ) != -1 && this.content.indexOf( "${select" ) != -1 ) ? this.content.substring( this.content.indexOf( "}" ) + 1, this.content.indexOf( "${input" ) ) : "";
        },
        getInputValue : function()
        {
            return this.content.indexOf( "${input" ) != -1 ? this.content.substring( this.content.indexOf( "${input:" ) + 8, this.content.lastIndexOf( "}" ) ) : "";
        },
        getText : function()
        {
            return this.baseText + ( this._hasSelect ? this.selectNode.options[ this.selectNode.selectedIndex ].text + this.midText : "" ) + ( this._hasInput ? ( this.manager.DEFAULT_VALUES[ this.inputNode.value ] ? "" : this.inputNode.value ) : "" );
        },
        getSelectOptions : function()
        {
            var item = this.content.substring( this.content.indexOf( "${select:" ) + 11, this.content.indexOf( "}" ) );
            if( item.indexOf( "@" ) == 0 )
            {
                console.log( this.manager[ item.substring( 1 ) ].innerHTML );
                return this.manager[ item.substring( 1 ) ].innerHTML;
            }
            else
            {
                var items = item.split( "|" );
                var out = "";
                for( var i = 0; i < items.length; i++ )
                {
                    out +="<option>" + items[ i ] + "</options>";
                }
            }
            return out;
        },
        normalizeClass : function()
        {
            this.manager.normalizeClass( this.inputNode );
        },
        selectContent : function()
        {
            if( this.manager.DEFAULT_VALUES[ this.inputNode.value ] )
            {
                this.inputNode.select();
            }
        },
        dataChanged : function()
        {
            topic.publish( "CharGen/dataChanged" );
        },
        destroy : function()
        {
            while( this._subs.length > 0 )
            {
                this._subs.pop().remove();
            }
            this.inherited( arguments );
        }
    });
});