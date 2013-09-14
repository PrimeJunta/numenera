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
                this._mutationControls.push( ctrl );
                this._lists.bonus_list.push( ctrl );
            }
        },
        _getMutationControl : function( type )
        {
            switch( type )
            {
                case "beneficial" :
                    return new _BeneficialMutationControl();
                case "harmful" :
                    return new _HarmfulMutationControl();
                case "powerful" :
                    return new _PowerfulMutationControl();
                case "distinctive" :
                    return new _DistinctiveMutationControl();
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