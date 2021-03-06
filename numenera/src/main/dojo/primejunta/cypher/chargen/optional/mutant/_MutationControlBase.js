/**
 * Control for defining a mutation for a Mutant hero. This class contains the logic; each mutation
 * type extends it with a suitable template.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "primejunta/cypher/chargen/_ListItemBase" ],
function( declare,
          lang,
          topic,
          _ListItemBase )
{
    return declare([ _ListItemBase ], {
        /**
         * Type, e.g. "beneficial", "harmful", "distinctive", or "powerful."
         */
        type : "",
        /**
         * Ends up in CSS style.
         */
        from : "description",
        /**
         * Standard input value.
         */
        inputValue : "enter description",
        /**
         * Base text, if any; set by extending class.
         */
        baseText : "",
        /**
         * If not destroyed or empty, returns state as String.
         */
        getText : function()
        {
            if( this._destroyed || this.inputNode.value == this.inputValue )
            {
                return false;
            }
            var out = this.baseText;
            if( this.abilityTypeSelect )
            {
                out += this.selectValue( this.abilityTypeSelect ).value;
            }
            out += " " + this.inputNode.value;
            return out;
        },
        /**
         * Normalizes inputNode, validates any adjustmentNodes that may be present, and hides domNode if
         * both disabled and empty.
         */
        checkState : function()
        {
            this.onBlurInput( this.inputNode );
            this.intInputChanged( this.mightAdjustmentNode, true );
            this.intInputChanged( this.speedAdjustmentNode, true );
            this.intInputChanged( this.intellectAdjustmentNode, true );
            this.intInputChanged( this.armorAdjustmentNode, true );
            this.intInputChanged( this.recoveryAdjustmentNode, true );
            if( this.inputNode.disabled && !this.getText() )
            {
                this.domNode.style.display = "none";
            }
            if( this.inputNode.disabled )
            {
                this.randomizeButton.domNode.style.display = "none";
            }
            if( this.abilityTypeSelect && this.abilityTypeSelect.disabled )
            {
                this._disableSelect( "abilityTypeSelect" );
            }
            this.dataChanged();
        },
        /**
         * Locks inputNode, all adjustmentNodes, and abilityTypeSelect, if present.
         */
        lockControls : function()
        {
            this._lock( this.inputNode );
            this._lock( this.mightAdjustmentNode );
            this._lock( this.speedAdjustmentNode );
            this._lock( this.intellectAdjustmentNode );
            this._lock( this.armorAdjustmentNode );
            this._lock( this.recoveryAdjustmentNode );
            this._disableSelect( "abilityTypeSelect" );
            this.checkState();
        },
        /**
         * Picks a random mutation of the right type from mutations, and calls setMutation on it.
         */
        randomizeMutation : function()
        {
            var n = Math.floor( Math.random() * 100 ) + 1;
            var itms = this.manager.optionalData.mutations[ this.type ];
            var mutation;
            for( var i = 0; i < itms.length; i++ )
            {
                if( itms[ i ].roll >= n )
                {
                    mutation = itms[ i ];
                    break;
                }
            }
            this.setMutation( mutation );
        },
        /**
         * Extracts the mutation prefix and text description from mutation.description, sets them with
         * their appropriate setters, setBonuses, and checkState.
         */
        setMutation : function( mutation )
        {
            var pf = mutation.description.substring( 0, mutation.description.indexOf( " " ) );
            var txt = mutation.description.substring( mutation.description.indexOf( " " ) + 1 );
            this.setPrefix( pf );
            this.setBonuses( mutation );
            this.inputNode.value = txt;
            this.checkState();
        },
        /**
         * If there is an abilityTypeSelect, sets its value to match pf; else does nothing.
         */
        setPrefix : function( pf )
        {
            if( this.abilityTypeSelect )
            {
                for( var i = 0; i < this.abilityTypeSelect.options.length; i++ )
                {
                    if( this.abilityTypeSelect.options[ i ].value == pf )
                    {
                        this.abilityTypeSelect.options[ i ].selected = true;
                        return;
                    }
                }
            }
        },
        /**
         * Stub. Up to the implementing _MutationControl to do something with this.
         */
        setBonuses : function( mutation )
        {
        },
        /**
         * If what exists, set it.disabled to true.
         */
        _lock : function( /* Input|Select? */ what )
        {
            if( what )
            {
                what.disabled = true;
            }
        },
        /**
         * If present, checks that inputNode.value is an int, and clears it if not.
         */
        intInputChanged : function( /* Input? */ inputNode, /* boolean */ hideIfEmpty )
        {
            if( !inputNode )
            {
                return;
            }
            else if( isNaN( parseInt( inputNode.value ) ) || parseInt( inputNode.value ) != parseFloat( inputNode.value ) )
            {
                inputNode.value = "";
                if( hideIfEmpty && inputNode.disabled )
                {
                    inputNode.parentNode.style.display = "none";
                }
            }
        }
    });
});