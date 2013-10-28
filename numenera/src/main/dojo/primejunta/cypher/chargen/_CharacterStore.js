define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/has",
         "dojo/cookie",
         "dojo/json",
         "dojo/on",
         "dojo/dom-class",
         "dojo/dom-construct",
         "dojo/Deferred",
         "dojox/storage",
         "./_CharacterManager",
         "./_UtilityMixin",
         "dojo/store/Memory",
         "dijit/form/ComboBox",
         "primejunta/gapi/Drive",
         "primejunta/cypher/widget/LinkButton",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterStore.html" ],
function( declare,
          lang,
          array,
          has,
          cookie,
          json,
          on,
          domClass,
          domConstruct,
          Deferred,
          storage,
          _CharacterManager,
          _UtilityMixin,
          Memory,
          ComboBox,
          Drive,
          LinkButton,
          Dialog,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        BACKUP_DESCRIPTION : "Cypher System Character Backup",
        BACKUP_MIME_TYPE : "application/cypher-character-backup",
        manager : {},
        templateString : template,
        _tempStoreToken : "_CCG_TMP_",
        _driveProperties : {
            clientId : "338654774169.apps.googleusercontent.com",
            apiKey : "AIzaSyAKGiPFw6URbWZaCuCquzgd6zKDWY3Hwgs"
        },
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
            console.log( this.cloudBackupFileName );
        },
        show : function( restored )
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
                this.characterManagerDialog.show();
                this.updateDownloadLink( _data );
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
            var chars = this._storage.getKeys().sort();
            var _data = {};
            for( var i = 0; i < chars.length; i++ )
            {
                var _char = this._storage.get( chars[ i ] );
                if( this._characterIsValid( _char ) )
                {
                    var props = _char;
                    if( array.indexOf( restored, _char.name ) != -1 )
                    {
                        props.restored = true;
                    }
                    _data[ chars[ i ] ] = props;
                }
            }
            deferred.resolve( _data );
            return deferred;
        },
        clearMessages : function()
        {
            this.invalidFileMessageNode.style.display = "none";
        },
        startupCloudStorage : function()
        {
            if( this.drive )
            {
                return;
            }
            this.drive = new Drive( this._driveProperties );
            this._setCBDisabled( true );
            this.drive.startup().then( lang.hitch( this, this.setupCloudUI ) );
            this._initCloudUI();
            this._initStorage();
        },
        authorizeCloudStorage : function()
        {
            this.drive.checkAuthorization().then( lang.hitch( this, this.setupCloudUI ));
        },
        _initCloudUI : function()
        {
            this._backupListStore = new Memory({ data : [] });
            this.cloudBackupFileName = new ComboBox({
                store : this._backupListStore,
                searchAttr : "title",
                onChange : lang.hitch( this, this._checkRestoreEnabled ),
                value : "My Characters" }).placeAt( this.cloudBackupFileNameNode, "replace" );
        },
        setupCloudUI : function( authResult )
        {
            if( authResult && !authResult.error )
            {
                // set cookie so we'll start cloud storage automatically the next time
                // Access token has been successfully retrieved, requests can be sent to the API.
                this.uploadControls.style.display = "block";
                this.authorizeControls.style.display = "none";
                this.getCloudBackups();
            }
            else
            {
                // No access token could be retrieved, show the button to start the authorization flow.
                if( !has( "ios" ) )
                {
                    this.localBackupNode.style.display = "block";
                }
                this.uploadControls.style.display = "none";
                this.authorizeControls.style.display = "block";
                this.authorizeDriveButton.set( "disabled", false );
                this._setCBDisabled( false );
            }
        },
        getCloudBackups : function( clear )
        {
            if( clear )
            {
                var itms = this._backupListStore.query();
                for( var i = 0; i < itms.length; i++ )
                {
                    this._backupListStore.remove( itms[ i ].id );
                }
            }
            this.drive.listFiles({
                q : this.drive.queryFromProps({ mimeType : this.BACKUP_MIME_TYPE })
            }).then( lang.hitch( this, function( resp ) {
                if( resp[ 0 ] )
                {
                    for( var i = 0; i < resp.length; i++ )
                    {
                        this._backupListStore.put({ "title" : resp[ i ].title }, { "id" : resp[ i ].title, overwrite : true });
                    }
                    this.cloudBackupFileName.set( "value", resp[ 0 ].title );
                    this._setCBDisabled( false );
                }
                else
                {
                    this._setCBDisabled( false );
                    this.restoreFromCloudButton.set( "disabled", true );
                }
            }));
        },
        backupToCloud : function()
        {
            this._setCBDisabled( true );
            this.getStoredCharacters().then( lang.hitch( this, function( characterData ) {
                var fileData = {
                        title : this.cloudBackupFileName.value,
                        description : this.BACKUP_DESCRIPTION,
                        mimeType : this.BACKUP_MIME_TYPE
                };
                this.drive.updateFileByProperties( fileData, this.characterDataToBackupData( characterData ) ).then( lang.hitch( this, function( resp ) {
                    this.getCloudBackups( false );
                }));
            }));
        },
        restoreFromCloud : function()
        {
            this._setCBDisabled( true );
            this.drive.downloadFileByProperties({
                mimeType : this.BACKUP_MIME_TYPE,
                title : this.cloudBackupFileName.get( "value" )
            }).then( lang.hitch( this, function( fileData ) {
                this._setCBDisabled( false );
                console.log( "okay, gotta restore from", fileData );
                var obj = this.backupDataToCharacterData( fileData );
                if( obj )
                {
                    this._restoreFromBackupData( obj );
                }
                else
                {
                    // should never happen normally
                    alert( "The file didn't contain a backup. Imagine that!" );
                }
            }), lang.hitch( this, function( err ) {
                // should never happen normally
                alert( "No matching file. Perhaps someone deleted it from your Drive while you were mucking around here." );
                this._setCBDisabled( true );
                this.getCloudBackups( true );
            }));
        },
        _checkRestoreEnabled : function()
        {
            var itm = this.cloudBackupFileName.get( "value" );
            if( this._backupListStore.get( itm ) )
            {
                this.restoreFromCloudButton.set( "disabled", false );
            }
            else
            {
                this.restoreFromCloudButton.set( "disabled", true );
            }
        },
        _setCBDisabled : function( to )
        {
            if( to )
            {
                domClass.add( this.cloudWorkingIcon, "fa-spin" );
                this.cloudWorkingIcon.style.visibility = "visible";
            }
            else
            {
                domClass.remove( this.cloudWorkingIcon, "fa-spin" );
                this.cloudWorkingIcon.style.visibility = "hidden";
            }
            this.restoreFromCloudButton.set( "disabled", to );
            this.backupToCloudButton.set( "disabled", to );
        },
        updateDownloadLink : function( _data )
        {
            _data = this.characterDataToBackupData( _data ); 
            var href = "data:text/plain;," + encodeURIComponent( _data ) + "";
            this.downloadButton.set( "href", href );
            this.downloadButton.set( "download", this.manager.dataFileName + ".txt" );
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
        fileAttached : function()
        {
            this._objectToStore = false;
            this.invalidFileMessageNode.style.display = "none";
            var files = this.uploadControl.files;
            if( files.length == 1 )
            {
                var inp = this.uploadControl;
                var reader = new FileReader();
                reader.onload = lang.hitch( this, function( theFile )
                {
                    return lang.hitch( this, function( fileData )
                    {
                        this.validateFile( fileData.target.result );
                    });
                })( this.uploadControl );
                reader.readAsText( inp.files[ 0 ] );
            }
        },
        validateFile : function( fileData )
        {
            var fData = this.backupDataToCharacterData( fileData );
            if( fData )
            {
                this._objectToUpload = fData;
                this.uploadButton.set( "disabled", false );
                this.invalidFileMessageNode.style.display = "none";
            }
            else
            {
                console.log( e );
                this.invalidFileMessageNode.style.display = "block";
                this.uploadControl.value = "";
                this.uploadButton.set( "disabled", true );
            }
        },
        characterDataToBackupData : function( characterData )
        {
            return json.stringify( characterData );
        },
        backupDataToCharacterData : function( fileData )
        {
            try
            {
                return json.parse( fileData );
            }
            catch( e )
            {
                console.log( "ERROR PARSING FILE DATA", e );
                return false;
            }
        },
        uploadBackup : function()
        {
            this.uploadControl.value = "";
            var obj = this._objectToUpload;
            this._restoreFromBackupData( obj );
            this.uploadButton.set( "disabled", true );
        },
        _restoreFromBackupData : function( obj )
        {
            if( !this._storage )
            {
                this._initStorage.then( lang.hitch( this, this._restoreFromBackupData, obj ) );
                return;
            }
            var keys = this._storage.getKeys().sort();
            var restored = [];
            for( var o in obj )
            {
                if( true || array.indexOf( keys, o ) == -1 )
                {
                    restored.push( o );
                    this._storage.put( o, obj[ o ] );
                }
            }
            setTimeout( lang.hitch( this, this.show, restored ), 300 );
        },
        /**
         * Clears character manager widgets and closes character manager dialog.
         */
        close : function()
        {
            this.characterManagerDialog.hide();
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
                }
            }
            this.show();
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