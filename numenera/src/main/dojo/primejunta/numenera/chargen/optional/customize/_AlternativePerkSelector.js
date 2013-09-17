define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/topic",
         "../../_util",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/_AlternativePerkSelector.html" ],
function( declare,
          lang,
          domClass,
          topic,
          _util,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _util ], {
        manager : {},
        inputValue : "choose any non-combat",
        templateString : template,
        advancement : [],
        tier : 1,
        postMixInProperties : function()
        {
            this._subs = [];
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockControls ) ) );
        },
        postCreate : function()
        {
            this.populatePerkSelector( this.advancement, this.tier, this.selectNode );
        },
        selectionMade : function()
        {
            var sel = this._selVal( this.selectNode ).value;
            this._deselect( this._selection );
            if( sel == "Ⓔ Self-Improvement" )
            {
                this.manager._augment({ free_pool : 6 });
            }
            this.checkState();
            this._selection = sel;
        },
        checkState : function()
        {
            if( this._selVal( this.selectNode ).value == "Ⓔ More Training" )
            {
                this.inputWrapper.style.display = "block";
                this.onBlurInput();
            }
            else
            {
                this.inputNode.value = "";
                this.inputWrapper.style.display = "none";
            }
        },
        lockControls : function()
        {
            this.inputNode.disabled = true;
            this.selectNode.disabled = true;
        },
        destroy : function()
        {
            while( this._subs.length > 0 )
            {
                this._subs.pop().remove();
            }
            this.inherited( arguments );
        },
        _deselect : function( selection )
        {
            if( selection == "Ⓔ Self-Improvement" )
            {
                this.manager._augment({ free_pool : -6 });
            }
            this.checkState();
            return;
        },
        getText : function()
        {
            return "";
        }
    });
});