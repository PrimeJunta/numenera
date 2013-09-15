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
        setupOptionals : function()
        {
            this._mutationControls = [];
            topic.subscribe( "CharGen/MutationTypeSelected", lang.hitch( this, this._mutationTypeSelected ) );
        },
        getNextMutationControl : function( ctrl )
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
        _mutationTypeSelected : function( select )
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
        _makeMutations : function( mHash )
        {
            this._clearMutations();
            this._makeMutationControls( mHash.harmful, "harmful" );
            this._makeMutationControls( mHash.distinctive, "distinctive" );
            this._makeMutationControls( mHash.beneficial, "beneficial" );
            this._makeMutationControls( mHash.powerful, "powerful" );

            // push into this._lists.special_list and this._mutationControls
        },
        _makeMutationControls : function( n, type )
        {
            for( var i = 0; i < n; i++ )
            {
                var ctrl = this._getMutationControl( type ).placeAt( this.bonus_list );
                // This does leak some mutants, but both arrays will get cleared relatively
                // frequently, so I'm not babying them here.
                // Will be cleared if the user picks some other mutation
                this._mutationControls.push( ctrl );
                // Will be cleared if the user picks some other descriptor, type, or focus
                this._lists.bonus_list.push( ctrl );
            }
        },
        _getMutationControl : function( type )
        {
            switch( type )
            {
                case "beneficial" :
                    return new _BeneficialMutationControl({ manager : this });
                case "harmful" :
                    return new _HarmfulMutationControl({ manager : this });
                case "powerful" :
                    return new _PowerfulMutationControl({ manager : this });
                case "distinctive" :
                    return new _DistinctiveMutationControl({ manager : this });
            }
        },
        _clearMutations : function()
        {
            while( this._mutationControls.length > 0 )
            {
                this._mutationControls.pop().destroy();
            }
        }
    });
});