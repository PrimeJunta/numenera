define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
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
          template,
          templateSelect,
          templateInput,
          templateSelectInput )
{
    return declare([ _WidgetBase, _TemplatedMixin ], {
        templateString : template,
        content : "",
        from : "",
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
        },
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.baseText == "" && !this._hasSelect && this._hasInput )
            {
                this.baseTextNode.style.display = "none";
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
            return this.baseText + ( this._hasSelect ? this.selectNode.options[ this.selectNode.selectedIndex ].text + this.midText : "" ) + ( this._hasInput ? this.inputNode.value : "" );
        },
        getSelectOptions : function()
        {
            var item = this.content.substring( this.content.indexOf( "${select:" ) + 11, this.content.indexOf( "}" ) );
            var items = item.split( "|" );
            var out = "";
            for( var i = 0; i < items.length; i++ )
            {
                out +="<option>" + items[ i ] + "</options>";
            }
            return out;

        },
        normalizeClass : function()
        {
            domClass.remove( this.inputNode, "cg-valueNotSet" );
        },
        selectContent : function()
        {
            this.inputNode.select();
        },
        dataChanged : function()
        {
            topic.publish( "CharGen/dataChanged" );
        }
    });
});