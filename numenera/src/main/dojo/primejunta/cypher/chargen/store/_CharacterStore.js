define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "dojo/has",
         "dojo/json",
         "dojo/dom-construct",
         "dojo/Deferred",
         "dojox/storage",
         "./_cloud",
         "./_file",
         "./_CharacterManager",
         "../_UtilityMixin",
         "dijit/form/CheckBox",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterStore.html" ],
function( declare,
          lang,
          array,
          string,
          has,
          json,
          domConstruct,
          Deferred,
          storage,
          _cloud,
          _file,
          _CharacterManager,
          _UtilityMixin,
          CheckBox,
          Dialog,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin, _cloud, _file ], {
        INTERNAL_PREFIX : "_CCG_",
        manager : {},
        templateString : template,
        _tempStoreToken : "_CCG_TMP_",
        _cwa : [],
        postCreate : function()
        {
            domConstruct.place( this.characterManagerDialog.domNode, document.body );
            this.characterManagerDialog.startup();
            if( !has( "ios" ) )
            {
                this.localBackupNode.style.display = "block";
            }
            this.startupCloudStorage();
        },
        show : function()
        {
            this._show();
            this.characterManagerDialog.show();
        },
        _show : function( restored )
        {
            while( this._cwa.length > 0 )
            {
                this._cwa.pop().destroy();
            }
            this.clearMessages();
            domConstruct.empty( this.characterManagerContentNode );
            var nde = domConstruct.create( "div", { style : "width:100%;margin-bottom:30px;" }, this.characterManagerContentNode );
            var _data = this.getStoredCharacters( restored ).then( lang.hitch( this, function( _data ) {
                for( var c in _data )
                {
                    // In case of corrupted data
                    if( !_data[ c ] )
                    {
                        _data[ c ] = { key : c };
                    }
                    else if( !_data[ c ].key )
                    {
                        _data[ c ].key = c;
                    }
                    var cm = new _CharacterManager( _data[ c ] ).placeAt( nde );
                    cm.manager = this;
                    this._cwa.push( cm );
                }
                if( this._cwa.length == 0 )
                {
                    nde.innerHTML = "No saved characters.";
                }
                this.updateDownloadLink( _data ); // in _file
            }));
        },
        getStoredCharacters : function( restored )
        {
            if( !this._storage )
            {
                return this._initStorage().then( lang.hitch( this, this.getStoredCharacters, restored ) );
            }
            var deferred = new Deferred();
            if( !restored )
            {
                restored = [];
            }
            var chars = this._filterKeys( this._storage.getKeys() ).sort();
            var _data = {};
            for( var i = 0; i < chars.length; i++ )
            {
                var _char = this._storage.get( chars[ i ] );
                if( this._characterIsValid( _char ) )
                {
                    var props = _char;
                    if( array.indexOf( restored, _char.key ) != -1 )
                    {
                        props.restored = true;
                    }
                    _data[ chars[ i ] ] = props;
                }
            }
            deferred.resolve( _data );
            return deferred;
        },
        /**
         * Calls _initStorage if necessary to start up our local storage manager; then stores the character
         * under a key derived from the character name with _getKey.
         */
        storeCharacter : function( data, tempStore )
        {
            if( tempStore )
            {
                return; // we're not doing anything with the tempStore yet so let's not pollute it
            }
            if( !this._storage )
            {
                this._initStorage().then( lang.hitch( this, this.storeCharacter, data, tempStore ) );
                return;
            }
            var key = this._getKey( this.manager.characterNameInput.value, tempStore );
            var val = {
                key : key,
                name : this._sanitize( this.manager.characterNameInput.value ),
                data : data ? data : this.manager._getCharacterData(),
                time : new Date().getTime()
            };
            if( tempStore )
            {
                val.temp = true;
            }
            this._storage.put( key, val );
            this.setSyncState( "DIRTY" ); // from _cloud.
            if( !tempStore )
            {
                this.manager.saveButton.set( "disabled", true ); 
            }
        },
        loadCharacter : function( data )
        {
            this.close();
            this.manager.loadCharacter( data);
        },
        characterDataToBackupData : function( characterData )
        {
            return json.stringify( characterData );
        },
        backupDataToCharacterData : function( fileData )
        {
            var _fileData = string.trim( fileData );
            if( _fileData.indexOf( "(" ) == 0 )
            {
                _fileData = _fileData.substring( 1, _fileData.length - 1 );
            }
            try
            {
                return json.parse( _fileData );
            }
            catch( e )
            {
                console.debug( "ERROR PARSING FILE DATA", e );
                return false;
            }
        },
        /**
         * Displays list of saved characters as links for saving or pasting into a mail or something.
         */
        displayCharacterLinks : function()
        {
            var loc = window.location.origin + window.location.pathname;
            var characterList = "<div>\n<h2>My Characters</h2>\n"
                + "<ul>\n";
            for( var i = 0; i < this._cwa.length; i++ )
            {
                characterList += "<li><a href=\"" + loc + "?" + this._cwa[ i ].data + "\">" + this._cwa[ i ].name + "</a></li>\n";
            }
            characterList += "</ul>\n</div>\n";
            characterList += "<p>Copy-paste and save this list in case something bad happens to your browser, or if you want to mail them to someone.</p>";
            this.close();
            this.manager.tell( characterList );
        },
        /**
         * Deletes checked characters from local store.
         */
        deleteSelectedCharacters : function()
        {
            for( var i = 0; i < this._cwa.length; i++ )
            {
                if( this._cwa[ i ].deletionCheckbox.checked )
                {
                    this._storage.remove( this._cwa[ i ].key );
                    this.setSyncState( "DIRTY" ); // from _cloud.
                }
            }
            this.show();
        },
        clearMessages : function()
        {
            this.invalidFileMessageNode.style.display = "none";
        },
        /**
         * Clears character manager widgets and closes character manager dialog.
         */
        close : function()
        {
            this.characterManagerDialog.hide();
            this.manager.setDataRefreshedReminder( false );
        },
        /**
         * Restore from backup data.
         * 
         * @param obj  - Data to sync
         * @param sync - If true, will perform a full sync: any characters not in obj will get deleted,
         *               any others overwritten.
         */
        _restoreFromBackupData : function( obj, sync )
        {
            if( !this._storage )
            {
                this._initStorage.then( lang.hitch( this, this._restoreFromBackupData, obj ) );
                return false;
            }
            var keys = this._filterKeys( this._storage.getKeys() ).sort();
            var restored = [];
            var unrestored = [];
            if( sync )
            {
                while( keys.length > 0 )
                {
                    this._storage.remove( keys.pop() );
                }
            }
            for( var o in obj )
            {
                if( sync || array.indexOf( keys, o ) == -1 )
                {
                    restored.push( o );
                    this._storage.put( o, obj[ o ] );
                }
                else
                {
                    unrestored.push( o );
                }
            }
            setTimeout( lang.hitch( this, this._show, restored ), 300 );
            return unrestored;
        },
        _characterIsValid : function( _char )
        {
            if( _char.name && _char.data && !_char.temp )
            {
                return true;
            }
            else
            {
                return false;
            }
        },
        _filterKeys : function( /* String[] */ keys )
        {
            var out = [];
            while( keys.length > 0 )
            {
                var key = keys.pop();
                if( key.indexOf( this.INTERNAL_PREFIX ) != 0 )
                {
                    out.push( key );
                }
            }
            return out;
        },
        /**
         * Replaces everything that's not a letter between a and z in the character name with underscores, and
         * returns it. This is so our characters are stored by name, more or less. If you have two different
         * characters named Röbin Høød and Røbin Hööd, you're SOL though 'cuz both will be stored as R_bin_H__d.
         */
        _getKey : function( nameStr, tempStore )
        {
            return ( tempStore ? this._tempStoreToken : "" ) + nameStr.replace( /[^a-z|A-Z]+/g, "_" );
        },
        /**
         * Initializes a dojox.storage.manager and puts a provider from it in this._storage. If handler is
         * provided, continues with that.
         */
        _initStorage : function( deferred )
        {
            if( !deferred )
            {
                deferred = new Deferred();
            }
            if( !dojox || !dojox.storage || !dojox.storage.manager )
            {
                setTimeout( lang.hitch( this, this._initStorage, deferred ), 500 );
                return deferred;
            }
            else
            {
                dojox.storage.manager.initialize(); // it's not ported to AMD, so...
                this._storage = dojox.storage.manager.getProvider();
                this._storage.initialize();
                deferred.resolve();
            }
            return deferred;
        }
    });
});