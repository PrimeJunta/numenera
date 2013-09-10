/**
 * Widget representing individual list item, which may have select and/or input controls
 * associated with it. The properties are largely determined by the data read into it when
 * it is created, and cannot be set later.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/event",
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
         "dojo/text!./templates/_ListItemSelectInput.html" ],
function( declare,
          lang,
          event,
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
        /**
         * Template
         */
        templateString : template,
        /**
         * Content string, which may contain patterns for inputs or selects or both.
         */
        content : "",
        /**
         * Source: type, descriptor, or focus.
         */
        from : "",
        /**
         * Creator.
         */
        manager : {},
        /**
         * If true, will show unlock control when suitable event is caught.
         */
        isUnlockable : false,
        /**
         * If true, will not lock.
         */
        remainsOpen : false,
        /**
         * If true, will provide delete control that sets .deleted flag and changes CSS class.
         */
        isDeletable : false,
        /**
         * Picks a suitable template depending on content, reads midText, baseText, inputValue,
         * and selectOptions, and subscribes to topics prompting to change state.
         */
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
        },
        /**
         * Inherited, then populates selectNode with selectOptions and adjusts other styles
         * and classes based on properties.
         */
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this._hasSelect )
            {
                this.selectNode.innerHTML = this.selectOptions;
            }
            if( this.baseText == "" && !this._hasSelect && this._hasInput )
            {
                this.baseTextNode.style.display = "none";
            }
            if( this.isUnlockable )
            {
                this.initializeUnlockControls();
            }
            if( this.isDeletable )
            {
                domClass.add( this.domNode, "cg-hoverControls" );
            }
        },
        /**
         * Toggles deleted property and corresponding CSS class. Deleted items will not show up 
         * on the character sheet, but you can always un-delete them.
         */
        deleteMe : function()
        {
            if( this.deleted )
            {
                this.deleted = false;
                domClass.remove( this.domNode, "cg-deletedItem" );
            }
            else
            {
                this.deleted = true;
                domClass.add( this.domNode, "cg-deletedItem" );
            }
            this.deleteControl.checked = this.deleted ? false : true;
        },
        /**
         * Disables inputNode unless remainsOpen is set.
         */
        lockInput : function()
        {
            if( this.remainsOpen )
            {
                return;
            }
            this.inputNode.disabled = true;
        },
        /**
         * Disables selectNode unless remainsOpen is set.
         */
        lockSelect : function()
        {
            if( this.remainsOpen )
            {
                return;
            }
            this.selectNode.disabled = true;
        },
        /**
         * Stores selectedIndex and inputValue for use in rollBack (see).
         */
        getPrevVal : function()
        {
            return {
                selectedIndex : this.selectNode ? this.selectNode.selectedIndex : false,
                inputValue : this.inputNode ? this.inputNode.value : false
            };
        },
        /**
         * Resets state to values from _prevVal.
         */
        rollBack : function( /* Object */ _prevVal )
        {
            this._hasInput ? this.inputNode.value = _prevVal.inputValue : false;
            this._hasSelect ? this.selectNode.selectedIndex = _prevVal.selectedIndex : false;
        },
        /**
         * Disables select and input nodes.
         */
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
        /**
         * Enables select and input nodes.
         */
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
        getText : function()
        {
            return this.deleted ? false : this.baseText + ( this._hasSelect ? this.selectNode.options[ this.selectNode.selectedIndex ].text + this.midText : "" ) + ( this._hasInput ? ( this.manager.DEFAULT_VALUES[ this.inputNode.value ] ? "" : this.inputNode.value ) : "" );
        },
        /**
         * Checks if any select or input are present, and if so, if they're disabled.
         */
        controlsAreLocked : function()
        {
            if( this._hasSelect && this.selectNode.disabled || this._hasInput && this.inputNode.disabled )
            {
                return true;
            }
            else
            {
                return false;
            }
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
                    out +="<option>" + items[ i ] + "</options>";
                }
            }
            return out;
        },
        /**
         * Connects to manager.normalizeClass.
         * TODO: maybe move it to a shared utility library?
         */
        normalizeClass : function()
        {
            this.manager.normalizeClass( this.inputNode );
        },
        /**
         * Clears inputNode.value if it's one of the defaults defined in .manager.
         */
        selectContent : function()
        {
            if( this.manager.DEFAULT_VALUES[ this.inputNode.value ] )
            {
                this.inputNode.value = "";
            }
        },
        /**
         * If no inputValue has been provided, sets it back to the original, and .normalizeClass.
         */
        onBlurInput : function()
        {
            if( this.inputNode.value == "" )
            {
                this.inputNode.value = this.inputValue;
            }
            this.manager.normalizeClass( this.inputNode );
        },
        /**
         * Publish event dataChanged, which will be picked up by _data.
         */
        dataChanged : function()
        {
            topic.publish( "CharGen/dataChanged" );
        },
        /**
         * Removes all listeners plus inherited.
         */
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