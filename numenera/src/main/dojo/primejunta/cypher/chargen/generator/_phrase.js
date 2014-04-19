/**
 * Methods for handling the character phrase (adjective noun who verbs).
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array" ],
function( declare,
          lang,
          array )
{
    return declare([], {
        /**
         * Initializes phrase selectors from data.
         */
        writePhraseSelects : function()
        {
            var state = {
                descriptor : this.selectValue( this.descriptorSelect ).value,
                type : this.selectValue( this.typeSelect ).value,
                focus : this.selectValue( this.focusSelect ).value
            };
            this.getHomebrewData(); // from _homebrew
            this.updatePhraseData(); // from _recursions
            this.initializeSelect( "descriptorSelect", this.descriptors );
            this.initializeSelect( "typeSelect", this.types );
            this.initializeSelect( "focusSelect", this.foci );
            if( this._splashPane )
            {
                this._splashPane.writePhraseSelects();
            }
            this.selectValue( this.descriptorSelect, state.descriptor );
            this.selectValue( this.typeSelect, state.type );
            this.selectValue( this.focusSelect, state.focus );
        },
        /**
         * Iterate through data and write an option into select at attach point, with text = member.label and 
         * value = position in array, for each member.
         */
        initializeSelect : function( /* String */ select, /* Object[] */ data )
        {
            var sel = this[ select ];
            sel.options.length = 1;
            var opts = [];
            for( var o in data )
            {
                var opt = new Option( data[ o ].label, o );
                opts.push( opt );
            }
            opts.sort( function( a, b ) {
                return a.text < b.text ? 1 : 0;
            });
            while( opts.length > 0 )
            {
                sel.options[ sel.options.length ] = opts.pop();
            }

        },
        /**
         * Triggered when user picks a descriptor from the list. Sets the article on the page to "a" or "an",
         * depending, and continues with updateValues and autoSave. We use a stack to keep track of programmatic
         * changes to the data so we don't spam the Ctrl-Z queue.
         */
        selectDescriptor : function()
        {
            this._populating.push( 1 );
            var label = this.selectValue( this.descriptorSelect ).label;
            var _art = "an";
            if( "AEIOUYaeiouy".indexOf( label.charAt( 0 ) ) == -1 )
            {
                _art = "a";
            }
            this._splashPane.articleNode.innerHTML = _art;
            this.updateItems( "desc", this.getDescriptor() );
            this._printLists(); // from _lists
            this._populating.pop();
            this.autoSave(); // from _data
            this.checkSwitchToMain();
        },
        /**
         * Triggered when the user selects a type. Does updateValues and completes with autoSave.
         */
        selectType : function()
        {
            this._populating.push( 4 );
            var type = this.getType();
            this.updateItems( "type", type );
            this.setBaseStats();
            if( type )
            {
                this.special_list_label.innerHTML = type.special_list_label;
                this._writeSpecialList( type );
            }
            this._printLists();
            this.updateCypherList();
            this._populating.pop();
            this.autoSave();
            this.checkSwitchToMain();
        },
        /**
         * Triggered when the user selects a focus. Does updateValues and completes with autoSave.
         */
        selectFocus : function()
        {
            var focus = this.getFocus();
            this.updateFocus( focus );
            this.autoSave();
            this.checkSwitchToMain();
        },
        /**
         * Sets stats in statsControl from type, focus, and descriptor, after resetting them. Used
         * when selecting type, which determines the base stats.
         */
        setBaseStats : function()
        {
            this.statsControl.resetStats();
            this.statsControl.applyAdjustments( this.getType() );
            this.statsControl.moveCaps();
            this.statsControl.applyAdjustments( this.getFocus() );
            this.statsControl.applyAdjustments( this.getDescriptor() );
        },
        /**
         * Updates focus in main pane and advancement control.
         */
        updateFocus : function( /* Object */ focus )
        {
            this._populating.push( 5 );
            this.preUpdateFocus(); // from _OptionalRulesMixin
            this.updateItems( "focus", focus );
            if( this._advancementControl )
            {
                this._advancementControl.changeFocus( focus );
            }
            if( focus )
            {
                this._writeBonusList( focus );
            }
            this._printLists();
            this.postUpdateFocus( arguments ); // from _OptionalRulesMixin
            this._populating.pop();
        },
        /**
         * Undoes adjustments from current value of the property being changed, applies them from the new one,
         * and rewrites the appropriate lines in the description.
         */
        updateItems : function( from, data )
        {
            if( !( from == "focus" && this.customized ) )
            {
                this.statsControl.undoAdjustments( this[ "current_" + from ] );
            }
            this.clearItems( from ); // in list
            if( !data )
            {
                delete this[ "current_" + from ];
                return;
            }
            this.statsControl.applyAdjustments( data );
            this[ "current_" + from ] = data;
            this._appendToLists( data.lists, from );
            var idx = array.indexOf([ "type", "focus", "desc" ], from );
            this._writeLine( "description_text", data.description_text, idx );
            this._writeLine( "notes_text", data.notes_text, idx );
        },
        /**
         * Updates the readonly phrase to match selections.
         */
        updatePhrase : function()
        {
            if( !this.getDescriptor() || !this.getType() || !this.getFocus() )
            {
                return;
            }
            this.phraseDisplayNode.innerHTML = "the " + this.getDescriptor().label + " " + this.getType().label + " who " + this.getFocus().label;
        },
        /**
         * Transitions to splash or main pane depending on state of phrase.
         */
        checkSwitchToMain : function()
        {
            if( this._populating.length > 0 )
            {
                return;
            }
            if( this.getType() && this.getDescriptor() && this.getFocus() )
            {
                this.transitionTo( "chargen" );
            }
            else
            {
                this._splashPane.reset( true );
                this.transitionTo( "splash" );
            }
        },
        /**
         * Returns currently selected type (or undefined if not set).
         */
        getType : function()
        {
            return this.types[ this.selectValue( this.typeSelect ).value ];
        },
        /**
         * Returns currently selected descriptor (or undefined if not set).
         */
        getDescriptor : function()
        {
            return this.descriptors[ this.selectValue( this.descriptorSelect ).value ];
        },
        /**
         * Returns currently selected focus (or undefined if not set).
         */
        getFocus : function()
        {
            return this.foci[  this.selectValue( this.focusSelect ).value ];
        }
    });
});