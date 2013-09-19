/**
 * Base logic for handling Mutant characters. Creates and destroys various types of _MutationControls
 * based on a topic published when the player selects a mutation type. No UI components of its own,
 * those are all in the various _MutationControls.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "./_BeneficialMutationControl",
         "./_HarmfulMutationControl",
         "./_PowerfulMutationControl",
         "./_DistinctiveMutationControl" ],
function( declare,
          lang,
          topic,
          _BeneficialMutationControl,
          _HarmfulMutationControl,
          _PowerfulMutationControl,
          _DistinctiveMutationControl )
{
    return declare([], {
        /**
         * Mixes in kwObj, sets up array for mutation controls, and subscribes to topic published when
         * the user selects a mutation.
         */
        constructor : function( kwObj )
        {
            lang.mixin( this, kwObj );
            this._mutationControls = [];
            topic.subscribe( "CharGen/MutationTypeSelected", lang.hitch( this, this._mutationTypeSelected ) );
        },
        /**
         * Called by _DistinctiveMutationControl, when it needs to find the _BeneficialMutationControl
         * associated with it. Returns the MutationControl following ctrl, or false if there isn't one
         * (there always should be though).
         */
        getNextMutationControl : function( /* MutationControl */ ctrl )
        {
            for( var i = 0; i < this._mutationControls.length; i++ )
            {
                if( this._mutationControls[ i ] == ctrl )
                {
                    if( this._mutationControls[ i + 1 ] )
                    {
                        return this._mutationControls[ i + 1 ];
                    }
                }
            }
            return false;
        },
        /**
         * Handler for MutationTypeSelected event. This is the choice that determines how many mutations
         * and of which type(s) the character will have. Reads these values from select and sets up 
         * mutations with _makeMutations accordingly.
         */
        _mutationTypeSelected : function( /* SelectElement */ select )
        {
            var mHash = {
                    harmful : 0,
                    beneficial : 0,
                    powerful : 0,
                    distinctive : 0
            };
            switch( select.selectedIndex )
            {
                case 0 :
                    break;
                case 1 :
                    mHash.beneficial = 2;
                    break;
                case 2 : 
                    mHash.harmful = 1;
                    mHash.beneficial = 3;
                    break;
                case 3 :
                    mHash.harmful = 1;
                    mHash.powerful = 1;
                    break;
                case 4 :
                    mHash.harmful = 1;
                    mHash.distinctive = 1;
                    mHash.beneficial = 1;
            }
            this._makeMutations( mHash );
        },
        /**
         * Calls _clearMutations, then _makeMutationControls of each type in mHash.
         */
        _makeMutations : function( /* Object */ mHash )
        {
            this._clearMutations();
            this._makeMutationControls( mHash.harmful, "harmful" );
            this._makeMutationControls( mHash.distinctive, "distinctive" );
            this._makeMutationControls( mHash.beneficial, "beneficial" );
            this._makeMutationControls( mHash.powerful, "powerful" );
        },
        /**
         * Requests n mutations of type passed to _getMutationControl, and puts them into _mutationControls and
         * manager._lists.bonus_list.
         */
        _makeMutationControls : function( n, type )
        {
            for( var i = 0; i < n; i++ )
            {
                var ctrl = this._getMutationControl( type ).placeAt( this.manager.bonus_list );
                // This does leak some mutants, but both arrays will get cleared relatively
                // frequently, so I'm not babying them here.
                // Will be cleared if the user picks some other mutation
                this._mutationControls.push( ctrl );
                // Will be cleared if the user picks some other descriptor, type, or focus
                this.manager._lists.bonus_list.push( ctrl );
            }
        },
        /**
         * Creates and returns a _MutationControl matching type (one of beneficial, harmful, powerful, distinctive).
         */
        _getMutationControl : function( /* String */ type )
        {
            switch( type )
            {
                case "beneficial" :
                    return new _BeneficialMutationControl({ manager : this.manager });
                case "harmful" :
                    return new _HarmfulMutationControl({ manager : this.manager });
                case "powerful" :
                    return new _PowerfulMutationControl({ manager : this.manager });
                case "distinctive" :
                    return new _DistinctiveMutationControl({ manager : this.manager, parent : this });
            }
        },
        /**
         * Pops everything from _mutationControls and calls destroy on them. Note: the pointers in
         * manager._lists.bonus_list aren't cleared; this is a leak but since reloading a character or changing
         * descriptor, type, or focus clears that list it would only become a problem if the user stays switching
         * between mutations, like, a thousand times or so, so I figure we can live with it.
         */
        _clearMutations : function()
        {
            while( this._mutationControls.length > 0 )
            {
                this._mutationControls.pop().destroy();
            }
        }
    });
});