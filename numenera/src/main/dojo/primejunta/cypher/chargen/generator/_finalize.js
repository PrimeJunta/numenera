/**
 * Methods for handling lists in CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class" ],
function( declare,
          lang,
          domClass )
{
    return declare([], {
        /**
         * If the character passes validation with .validateCharacter, marks it as ready for advacement.
         * This locks the character's basic data and creates an _AdvancementControl. If tier is set (which
         * happens when populating from a saved character, advances the controls to that tier in preparation
         * for filling in the fields. Also disables the finalize button, and finishes with
         * _advancementControl.checkAdvancement, which will unlock a new tier if appropriate.
         */
        finalize : function( /* String|int */ tier )
        {
            if( !this.validateCharacter() )
            {
                return;
            }
            var type = this.getType();
            var focus = this.getFocus();
            tier = !isNaN( parseInt( tier ) ) ? parseInt( tier ) : parseInt( this.statsControl.character_tier.value );
            if( !this.finalized )
            {
                this._clearAdvancementControl();
                this._advancementControl = this.createAdvancementControl({
                    manager : this,
                    typeData : type.advancement,
                    focusData : focus.advancement
                });
                this.mainTabContainer.addChild( this._advancementControl );
                this._advancementControl.advanceTier( tier );
            }
            this.statsControl.moveCaps();
            if( this.statsControl.free_edge.value == "0" && this.statsControl.free_pool.value == "0" )
            {
                this.finalizeButton.set( "disabled", true );
            }
            this.finalized = true;
            this._advancementControl.checkAdvancement();
            if( this._populating.length == 0 )
            {
                this.mainTabContainer.selectChild( this._advancementControl )
            }
        },
        /**
         * Adds or removes finalized CSS class, which affects display of contained things.
         */
        setFinalizedClass : function( state )
        {
            state ? domClass.add( this.domNode, "cg-finalized" ) : domClass.remove( this.domNode, "cg-finalized" );
        },
        /**
         * Unlocks the finalize (=Advance) button and updates link.
         */
        unlockFinalize : function()
        {
            this.finalizeButton.set( "disabled", false );
            this.autoSave();
        },
        /**
         * Locks selects and updates link. Done on finalize and when customizations have been applied.
         */
        lockControls : function()
        {
            this.typeSelect.disabled = true;
            this.updatePhrase(); // from _phrase
            domClass.add( this.domNode, "cg-controlsLocked" );
            this.autoSave(); // from _data
        },
        /**
         * When customizations have been un-applied.
         */
        unlockControls : function()
        {
            if( this.finalized )
            {
                // Finalized controls can never be unlocked.
                return;
            }
            this.descriptorSelect.disabled = false;
            this.typeSelect.disabled = false;
            this.focusSelect.disabled = false;
            this.updatePhrase();
            domClass.remove( this.domNode, "cg-controlsLocked" );
            this.autoSave();
        }
    });
});