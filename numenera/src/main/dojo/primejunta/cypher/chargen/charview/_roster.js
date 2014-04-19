define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/json",
         "dojo/cookie",
         "./_CharacterPicker" ],
function( declare,
          lang,
          array,
          json,
          cookie,
          _CharacterPicker )
{
    return declare([], {
        includeCharacter : function( character, picked )
        {
            if( picked )
            {
                this.addCharacter( character.name );
            }
            else
            {
                this.removeCharacter( character.name );
            }
            this.updateStoredRoster();
        },
        initRoster : function()
        {
            var chars = this.manager.getStoredCharacters();
            this._storedCharacters = {};
            this._pickers = [];
            for( var o in chars )
            {
                this._storedCharacters[ chars[ o ].name ] = chars[ o ];
                var picked = false;
                if( chars[ o ].name == this.character.character_name )
                {
                    picked = true;
                    this.addCharacter( chars[ o ].name );
                }
                if( this.manager._currentRoster && array.indexOf( this.manager._currentRoster, chars[ o ].name ) != -1 )
                {
                    picked = true;
                    this.addCharacter( chars[ o ].name );
                }
                var picker = new _CharacterPicker({ manager : this, character : chars[ o ], picked : picked }).placeAt( this.party_list );
                this._pickers.push( picker );
                this.own( picker );
            }
        },
        disablePicker : function( character )
        {
            if( !this.pickers )
            {
                return;
            }
            for( var i = 0; i < this._pickers.length; i++ )
            {
                if( this._pickers[ i ].character.name == character )
                {
                    this._pickers[ i ].set( "disabled", true );
                }
                else
                {
                    this._pickers[ i ].set( "disabled", false );
                }
            }
        },
        addCharacter : function( characterName )
        {
        },
        removeCharacter : function( characterName )
        {
        },
        switchToCharacter : function( characterName )
        {
        },
        updateStoredRoster : function()
        {
            var arr = [];
            for( var i = 0; i < this._pickers.length; i++ )
            {
                if( this._pickers[ i ].picked )
                {
                    arr.push( this._pickers[ i ].character.name );
                }
            }
            this.manager._currentRoster = arr;
            cookie( "CG_STORED_ROSTER", json.stringify( arr ), { expires : 90 });
        }
    });
});