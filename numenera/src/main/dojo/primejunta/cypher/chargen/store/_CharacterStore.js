define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "dojo/has",
         "dojo/json",
         "dojo/dom-construct",
         "dojo/Deferred",
         "dojo/io-query",
         "dojo/cookie",
         "primejunta/storage/Storage",
         "./_cloud",
         "./_file",
         "./_legacy",
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
          ioQuery,
          cookie,
          Storage,
          _cloud,
          _file,
          _legacy,
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
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin, _cloud, _file, _legacy ], {
        INTERNAL_PREFIX : "_CCG_",
        CHARACTER_STORE_NAME : "_CG_CHARACTER_STORE",
        /**
         * Local storage property which contains the settings for cloud storage.
         */
        SETTINGS_STORE_NAME : "_CG_SETTINGS",
        manager : {},
        templateString : template,
        _tempStoreToken : "_CCG_TMP_",
        _cwa : [],
        postCreate : function()
        {
            this._characterStore = new Storage( this.CHARACTER_STORE_NAME );
            this._settingsStore = new Storage( this.SETTINGS_STORE_NAME );
            this.migrateOldStores();
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
            var deferred = new Deferred();
            if( !restored )
            {
                restored = [];
            }
            var chars = this._filterKeys( this._characterStore.getKeys() ).sort();
            var _data = {};
            for( var i = 0; i < chars.length; i++ )
            {
                var _char = this._characterStore.get( chars[ i ] );
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
         * Stores the character under the character name.
         */
        storeCharacter : function( data, tempStore )
        {
            if( tempStore )
            {
                return; // we're not doing anything with the tempStore yet so let's not pollute it
            }
            var key = this.manager.characterNameInput.value;
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
            this._characterStore.put( key, val );
            this.setSyncState( "DIRTY" ); // from _cloud.
            if( !tempStore )
            {
                this.manager.saveButton.set( "disabled", true ); 
            }
        },
        loadCharacter : function( data, name )
        {
            cookie( this.manager.CURRENT_CHARACTER_COOKIE, name, { expires : 90 });
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
                characterList += "<li><a href=\"" + loc + "?" + this._preprocessLinkData( this._cwa[ i ].data ) + "\">" + this._cwa[ i ].name + "</a></li>\n";
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
                    this._characterStore.remove( this._cwa[ i ].key );
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
            var keys = this._filterKeys( this._characterStore.getKeys() ).sort();
            var restored = [];
            var unrestored = [];
            if( sync )
            {
                while( keys.length > 0 )
                {
                    this._characterStore.remove( keys.pop() );
                }
            }
            for( var o in obj )
            {
                if( sync || array.indexOf( keys, o ) == -1 )
                {
                    restored.push( o );
                    this._characterStore.put( o, obj[ o ] );
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
        _preprocessLinkData : function( data )
        {
            var obj = ioQuery.queryToObject( data );
            if( obj.img_data )
            {
                delete obj.img_data;
            }
            return ioQuery.objectToQuery( obj );
        }
    });
});