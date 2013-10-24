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
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dijit/form/Button",
         "./_UnlockableMixin",
         "./_UtilityMixin" ],
function( declare,
          lang,
          array,
          on,
          topic,
          domClass,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          Button,
          _UnlockableMixin,
          _UtilityMixin )
{
    return declare( "primejunta/cypher/chargen/_ListItem", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin, _UnlockableMixin ], {
        /**
         * Name of list to which the item belongs.
         */
        listName : "",
        /**
         * Source: type, descriptor, or focus.
         */
        from : "",
        /**
         * Creator.
         */
        manager : {},
        /**
         * Contains a select.
         */
        hasSelect : false,
        /**
         * Contains an input.
         */
        hasInput : false,
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
            this._subs = [];
            this._subs.push( topic.subscribe( "CharGen/destroyListItems", lang.hitch( this, this.destroy ) ) );
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) ) );
        },
        /**
         * Inherited, then populates selectNode with selectOptions and adjusts other styles
         * and classes based on properties.
         */
        buildRendering : function()
        {
            this.inherited( arguments );
            if( this.isUnlockable )
            {
                this.initializeUnlockControls();
            }
            if( this.isDeletable )
            {
                domClass.add( this.domNode, "num-hoverControls" );
            }
        },
        /**
         * Trigger onBlurInput if present, _disableSelect if present.
         */
        checkState : function()
        {
            if( this.hasInput )
            {
                this.onBlurInput();
            }
            if( this.hasSelect )
            {
                if( this.selectNode.disabled )
                {
                    this._disableSelect( "selectNode" );
                }
                else
                {
                    this._enableSelect( "selectNode" );
                }
            }
        },
        /**
         * Lock input and select if present.
         */
        lockControls : function()
        {
            if( this.hasInput )
            {
                this.lockInput();
            }
            if( this.hasSelect )
            {
                this.lockSelect();
            }
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
            this._disableSelect( "selectNode", true );
        },
        /**
         * Enables select and input nodes.
         */
        unlockControls : function()
        {
            if( this.selectNode )
            {
                this._enableSelect( "selectNode" );
            }
            if( this.inputNode )
            {
                this.inputNode.disabled = false;
            }
        },
        /**
         * Toggles deleted property and corresponding CSS class. Deleted items will not show up 
         * on the character sheet, but you can always un-delete them.
         */
        toggleDeleted : function()
        {
            if( this.deleted )
            {
                this.unDeleteMe();
            }
            else
            {
                this.deleteMe();
            }
        },
        /**
         * Mark this as deleted.
         */
        deleteMe : function()
        {
            this.deleted = true;
            domClass.add( this.domNode, "num-deletedItem" );
            this.deleteControl.checked = false;
            topic.publish( "CharGen/dataChanged" );
        },
        /**
         * Mark this as not deleted.
         */
        unDeleteMe : function()
        {
            this.deleted = false;
            domClass.remove( this.domNode, "num-deletedItem" );
            this.deleteControl.checked = true;
            topic.publish( "CharGen/dataChanged" );
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
            this.hasInput ? this.inputNode.value = _prevVal.inputValue : false;
            this.hasSelect ? this.selectNode.selectedIndex = _prevVal.selectedIndex : false;
            topic.publish( "CharGen/dataChanged" );
        },
        /**
         * Stub. Return value of item as text.
         */
        getText : function()
        {
        },
        /**
         * Checks if any select or input are present, and if so, if they're disabled.
         */
        controlsAreLocked : function()
        {
            if( this.hasSelect && this.selectNode.disabled || this.hasInput && this.inputNode.disabled )
            {
                return true;
            }
            else
            {
                return false;
            }
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
            this.manager.removeListItem( this );
            this.inherited( arguments );
        }
    });
});