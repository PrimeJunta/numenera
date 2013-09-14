define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dijit/_WidgetBase",
         "../_util" ],
function( declare,
          lang,
          topic,
          _WidgetBase,
          _util )
{
    return declare([ _WidgetBase, _util ], {
        type : "",
        from : "mutation",
        inputValue : "enter description",
        baseText : "Ⓜ",
        postMixInProperties : function()
        {
            this._subs = [];
            this._subs.push( topic.subscribe( "CharGen/pleaseCheckState", lang.hitch( this, this.checkState ) ) );
            this._subs.push( topic.subscribe( "CharGen/lockSheetControls", lang.hitch( this, this.lockInputs ) ) );
        },
        getText : function()
        {
            if( this._destroyed || this.inputNode.value == this.inputValue )
            {
                return false;
            }
            var out = this.baseText;
            if( this.abilityTypeSelect )
            {
                out += this._selVal( this.abilityTypeSelect ).value;
            }
            out += " " + this.inputNode.value;
            return out;
        },
        checkState : function()
        {
            this.normalizeClass( this.inputNode );
            this._validateInt( this.mightAdjustmentNode );
            this._validateInt( this.speedAdjustmentNode );
            this._validateInt( this.intellectAdjustmentNode );
            this._validateInt( this.armorAdjustmentNode );
            this._validateInt( this.recoveryAdjustmentNode );
            this.dataChanged();
        },
        lockInputs : function()
        {
            this._lock( this.inputNode );
            this._lock( this.mightAdjustmentNode );
            this._lock( this.speedAdjustmentNode );
            this._lock( this.intellectAdjustmentNode );
            this._lock( this.armorAdjustmentNode );
            this._lock( this.recoveryAdjustmentNode );
            this._lock( this.abilityTypeSelect );
        },
        _lock : function( what )
        {
            if( what )
            {
                what.disabled = true;
            }
        },
        _validateInt : function( inputNode )
        {
            if( !inputNode )
            {
                return;
            }
            else if( isNaN( parseInt( inputNode.value ) ) || parseInt( inputNode.value ) != parseFloat( inputNode.value ) )
            {
                inputNode.value = "";
            }
        }
    });
});