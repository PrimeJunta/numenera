/**
 * Widget representing individual list item, which may have select and/or input controls
 * associated with it. The properties are largely determined by the data read into it when
 * it is created, and cannot be set later.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/on",
         "dojo/topic",
         "./_ListItemBase",
         "dojo/text!./templates/_ListItem.html",
         "dojo/text!./templates/_ListItemSelect.html",
         "dojo/text!./templates/_ListItemInput.html",
         "dojo/text!./templates/_ListItemSelectInput.html" ],
function( declare,
          lang,
          array,
          on,
          topic,
          _ListItemBase,
          template,
          templateSelect,
          templateInput,
          templateSelectInput )
{
    return declare( "primejunta/cypher/chargen/_ListItem", [ _ListItemBase ], {
        /**
         * Template
         */
        templateString : template,
        /**
         * Data object associated with list item.
         */
        item : false,
        /**
         * Content string, which may contain patterns for inputs or selects or both.
         */
        content : "",
        /**
         * Picks a suitable template depending on content, reads midText, baseText, inputValue,
         * and selectOptions, and subscribes to topics prompting to change state.
         */
        postMixInProperties : function()
        {
            this.inherited( arguments );
            if( this.item )
            {
                this._getPropsFromItem();
            }
            else
            {
                this.item = {
                    text : this.content,
                    from : [ this.from ]
                }
            }
            if( this.content.indexOf( "${input" ) != -1 && this.content.indexOf( "${select" ) != -1 )
            {
                this.hasSelect = true;
                this.hasInput = true;
                this.templateString = templateSelectInput;
            }
            else if( this.content.indexOf( "${input" ) != -1 )
            {
                this.hasInput = true;
                this.templateString = templateInput;
            }
            else if( this.content.indexOf( "${select" ) != -1 )
            {
                this.hasSelect = true;
                this.templateString = templateSelect;
            }
            this.midText = this.getMidText();
            this.baseText = this.getBaseText();
            this.inputValue = this.getInputValue();
        },
        /**
         * Inherited, then populates selectNode with selectOptions and adjusts other styles
         * and classes based on properties.
         */
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.hasSelect )
            {
                this.selectOptions = this.getSelectOptions();
                this.selectNode.innerHTML = this.selectOptions;
            }
            if( this.baseText == "" && !this.hasSelect && this.hasInput )
            {
                this.baseTextNode.style.display = "none";
            }
        },
        updateRendering : function()
        {
            // specific ->
            this._getPropsFromItem();
            this.baseText = this.getBaseText();
            this.baseTextNode.innerHTML = this.baseText;
            this.domNode.className = "cg-" + this.from;
        },
        /**
         * Extracts base text from content (anything before ${ if present; otherwise .content).
         */
        getBaseText : function()
        {
            return this.content.indexOf( "${" ) != -1 ? this.content.substring( 0, this.content.indexOf( "${" ) ) : this.content;
        },
        /**
         * Extracts midText from content (anything between } and ${ if both are present, or empty string if not.
         */
        getMidText : function()
        {
            return ( this.content.indexOf( "${input" ) != -1 && this.content.indexOf( "${select" ) != -1 ) ? this.content.substring( this.content.indexOf( "}" ) + 1, this.content.indexOf( "${input" ) ) : "";
        },
        /**
         * Extracts default value for input from content, "" if not defined.
         */
        getInputValue : function()
        {
            return this.content.indexOf( "${input:" ) != -1 ? this.content.substring( this.content.indexOf( "${input:" ) + 8, this.content.lastIndexOf( "}" ) ) : "";
        },
        /**
         * Returns state as string, concatenated from baseText, select value, midText, and inputValue if present.
         */
        getText : function( force )
        {
            return ( ( !force && this.deleted ) || this._destroyed ) ? false : this.baseText + ( this.hasSelect ? this.selectNode.options[ this.selectNode.selectedIndex ].text + this.midText : "" ) + ( this.hasInput ? ( this.DEFAULT_VALUES[ this.inputNode.value ] ? "" : this.inputNode.value ) : "" );
        },
        /**
         * Creates select options from pattern after ${select:. Understands bar-separated strings, or a pattern that
         * starts with @. The former is split into options; the latter copies them from .manager's select matching 
         * the name after @.
         * So ${select:1:foo|bar|baz} will produce options with texts foo, bar, and baz; ${select:1:@fooSelect} will
         * copy the options from manager.fooSelect. The number between the colons determines how many copies of the
         * select will be created in case we want a select multiple type thing.
         */
        getSelectOptions : function()
        {
            var item = this.content.substring( this.content.indexOf( "${select:" ) + 11, this.content.indexOf( "}" ) );
            if( item.indexOf( "@" ) == 0 )
            {
                return this.manager[ item.substring( 1 ) ].innerHTML;
            }
            else
            {
                var items = item.split( "|" );
                var out = "<option>-- choose --</option>";
                for( var i = 0; i < items.length; i++ )
                {
                    if( items[ i ].indexOf( "!topic:" ) == 0 )
                    {
                        this.selectNode.setAttribute( "data-parent-widget-id", this.id );
                        this._selectChangeMsg = items[ i ].substring( "!topic:".length );
                        this._subs.push( on( this.selectNode, "change", lang.hitch( this, this.selectChanged ) ) );
                    }
                    else
                    {
                        out +="<option>" + items[ i ] + "</options>";
                    }
                }
            }
            return out;
        },
        /**
         * Method connected to select if it contains an item marked with !topic.
         */
        selectChanged : function()
        {
            topic.publish( this._selectChangeMsg, this.selectNode );
        },
        _getPropsFromItem : function()
        {
            this.content = this.item.text;
            this.from = array.indexOf( this.item.from, "type" ) != -1 ? "type" : array.indexOf( this.item.from, "desc" ) != -1 ? "desc" : array.indexOf( this.item.from, "focus" ) != -1 ? "focus" : this.item.from[ 0 ];
        }
    });
});