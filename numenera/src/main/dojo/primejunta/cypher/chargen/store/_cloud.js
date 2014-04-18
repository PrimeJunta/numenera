/**
 * Cloud sync and backup features using Google Drive. Mixed into _CharacterStore. References
 * some of its methods and properties, so you might want to check that out too.
 * 
 * @private Mixin
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/store/Memory",
         "dijit/form/ComboBox",
         "primejunta/gapi/Drive" ],
function( declare,
          lang,
          topic,
          domClass,
          Memory,
          ComboBox,
          Drive )
{
    return declare([], {
        /**
         * Ends up in fileData.description of created backup file.
         * 
         * @public final String
         */
        BACKUP_DESCRIPTION : "Cypher System Character Backup",
        /**
         * MIME type used for backup files. All queries will be filtered by this.
         * 
         * @public final String
         */
        BACKUP_MIME_TYPE : "application/cypher-character-backup",
        /**
         * Local store key for sync time.
         * 
         * @public final String
         */
        SYNC_TIME_KEY : "_CCG_SYNC_TIME",
        /**
         * Local store key for sync state. Sync state is one of DIRTY|CLEAN|PENDING|CONFLICT|FAILED.
         * 
         * @public final String
         */
        SYNC_STATE_KEY : "_CCG_SYNC_STATE",
        /**
         * Ends up in fileData.title of created sync file. We use this (in combination
         * with BACKUP_MIME_TYPE) as the foreign key to access the sync file.
         */
        BACKUP_FILE_TITLE : "My Characters",
        /**
         * Ends up in fileData.title of created sync file. We use this (in combination
         * with BACKUP_MIME_TYPE) as the foreign key to access the sync file.
         */
        SYNC_FILE_TITLE : "Cypher System Sync File",
        /**
         * Interval between syncs, in millis.
         * 
         * @public final int
         */
        SYNC_INTERVAL : 120000,
        /**
         * Google API properties: clientId and apiKey. These are set on the Google Cloud Console,
         * which then restricts access to origins specified there by me. So you can't use these
         * on any other domain than the one I've specified. If you've forked this repository and
         * want to host your own Character Generator, you must roll up your own keys and have them
         * end up here.
         * 
         * @private final Object
         */
        gapiProperties : {},
        /**
         * Initializes cloud backup controls, calls _initCloudUI and _initStorage (from _CharacterStore),
         * and then creates a Drive instance in this.drive, and calls .startup() on it, followed by
         * .setupCloudUI. This is called as part of _CharacterStore's construction sequence.
         * 
         * @public void
         */
        startupCloudStorage : function()
        {
            if( this.drive )
            {
                return;
            }
            this._setCBDisabled( true );
            this._initCloudUI();
            this.drive = new Drive( this.gapiProperties );
            this.drive.startup().then( lang.hitch( this, this.setupCloudUI ) );
        },
        /**
         * Sets up UI for cloud storage after authorization has been checked; the authorization result
         * is the argument. If authorization was successful, show the upload controls and hide the
         * authorize controls, fetch cloud backups with .getCloudBackups, and setSyncTimer on the
         * syncCheckbox.checked. This will start up syncing if the the checkbox is checked.
         * 
         * This method is called on startup, and as continuation when the user calls
         * authorizeCloudStorage.
         * 
         * @public void
         */
        setupCloudUI : function( /* Object */ authResult )
        {
            if( this._settingsStore.get( "_CCG_SYNC_CHARACTERS" ) == true )
            {
                this.syncCheckbox.set( "checked", true );
            }
            if( authResult && !authResult.error )
            {
                // Access token has been successfully retrieved, requests can be sent to the API.
                this.uploadControls.style.display = "block";
                this.authorizeControls.style.display = "none";
                this.logoutControls.style.display = "block";
                this.authorizeDriveButton.set( "disabled", false );
                this.getCloudBackups();
                this.setSyncTimer( this.syncCheckbox.checked );
            }
            else
            {
                // No access token could be retrieved, show the button to start the authorization flow.
                this.uploadControls.style.display = "none";
                this.authorizeControls.style.display = "block";
                this.logoutControls.style.display = "none";
                this.authorizeDriveButton.set( "disabled", false );
                this._setCBDisabled( false );
            }
        },
        /**
         * Triggered when user clicks on authorizeDriveButton. Calls drive.checkAuthorization and
         * continues with .setupCloudUI, just like on startup.
         * 
         * @public void
         */
        authorizeCloudStorage : function()
        {
            this.authorizeDriveButton.set( "disabled", true );
            this.drive.checkAuthorization().then( lang.hitch( this, this.setupCloudUI ) );
        },
        /**
         *
         */
        deAuthorizeCloudStorage : function()
        {
            this.drive.logout().then( lang.hitch( this, this.setupCloudUI ) );
        },
        /**
         * Fetches cloud backups by calling drive.listFiles with a query that filters them by
         * BACKUP_MIME_TYPE and excludes SYNC_FILE_TITLE. Then populates the ComboBox used to 
         * select or create them with the result, and enables backup and restore controls.
         * If clear is set, clears the store first. This only becomes necessary if you nuke
         * the backup files yourself from your Google Drive user interface, since we never 
         * delete any files.
         * 
         * @public void
         */
        getCloudBackups : function( /* boolean */ clear )
        {
            this.drive.listFiles({
                q : this.drive.queryFromProps({ mimeType : this.BACKUP_MIME_TYPE })
            }).then( lang.hitch( this, function( resp ) {
                if( resp[ 0 ] )
                {
                    if( clear )
                    {
                        var itms = this._backupListStore.query();
                        for( var i = 0; i < itms.length; i++ )
                        {
                            this._backupListStore.remove( itms[ i ].id );
                        }
                    }
                    for( var i = 0; i < resp.length; i++ )
                    {
                        this._backupListStore.put({ "title" : resp[ i ].title }, { "id" : resp[ i ].title, overwrite : true });
                    }
                    this.cloudSyncFileName.set( "value", this.getSyncFileTitle() );
                    this.cloudBackupFileName.set( "value", this.getBackupFileTitle() );
                    this._setCBDisabled( false );
                }
                else
                {
                    this._setCBDisabled( false );
                    this.restoreFromCloudButton.set( "disabled", true );
                }
            }));
        },
        /**
         * Returns current sync file title.
         * 
         * @public String
         */
        getSyncFileTitle : function()
        {
            var syncFileTitle = this._settingsStore.get( "_CCG_SYNC_FILE_TITLE" );
            if( !syncFileTitle )
            {
                return this.SYNC_FILE_TITLE;
            }
            else
            {
                return syncFileTitle;
            }
        },
        /**
         * Returns current backup file title.
         * 
         * @public String
         */
        getBackupFileTitle : function()
        {
            var backupFileTitle = this._settingsStore.get( "_CCG_BACKUP_FILE_TITLE" );
            if( !backupFileTitle )
            {
                return this.BACKUP_FILE_TITLE;
            }
            else
            {
                return backupFileTitle;
            }
        },
        /**
         * Stores sync preference to match syncCheckbox.checked, and calls setSyncTimer on it.
         * 
         * @public void
         */
        setSyncSwitch : function()
        {
            var to = this.syncCheckbox.checked;
            this._settingsStore.put( "_CCG_SYNC_CHARACTERS", to ? true : false );
            this.setSyncTimer( to );
        },
        /**
         * If to is false, clears sync timer timeout. Else calls performSync.
         * 
         * @public void
         */
        setSyncTimer : function( to )
        {
            if( this._syncTimer )
            {
                clearTimeout( this._syncTimer );
            }
            if( to )
            {
                this.performSync();
            }
        },
        /**
         * If _CCG_SYNC_CHARACTERS pref is unset, does nothing. Else sets a timer to start self in SYNC_INTERVAL,
         * reads sync state and time from _storage with SYNC_STATE_KEY and SYNC_TIME_KEY. If everything is cool,
         * calls drive.syncFile on data read from getStoredCharacterData. If the result is PLEASE_UPDATE, performs
         * a "hard" sync with the data: i.e., it overwrites the stored character data with the result from the
         * server. I.e., you will lose any un-synced local changes, except to your currently open character: the
         * next time you save it, it will be marked as ready for sync, and will end up on the server. This sounds
         * a bit harsh but since you only ever have one character open at a time and are unlikely to be messing
         * with the characters concurrently on two devices, this is unlikely to cause problems in practice. There
         * are finer-grained ways of doing this, but I feel they would add unnecessary complexity in this case.
         * 
         * If sync fails, it does nothing. This may happen e.g. if the server times out. It's kind of normal so
         * we don't raise any alarms.
         * 
         * @public void
         */
        performSync : function()
        {
            if( this._settingsStore.get( "_CCG_SYNC_CHARACTERS" ) !== true || this._syncInProgress )
            {
                return;
            }
            this._syncInProgress = true;
            var syncFileTitle = this.getSyncFileTitle();
            this._syncTimer = setTimeout( lang.hitch( this, this.performSync ), this.SYNC_INTERVAL );
            var syncState = this._settingsStore.get( this.SYNC_STATE_KEY );
            if( syncState == "CONFLICT" )
            {
                this._syncInProgress = false;
                return;
            }
            this._setCBSpinner( true );
            this._settingsStore.put( this.SYNC_STATE_KEY, "PENDING" ); // starting the sync
            var characterData = this.getStoredCharacterData();
            var fileData = {
                title : syncFileTitle,
                mimeType : this.BACKUP_MIME_TYPE,
                description : this.BACKUP_DESCRIPTION,
                dirty : ( syncState == "DIRTY" ),
                modifiedDate : this._settingsStore.get( this.SYNC_TIME_KEY )
            };
            this.drive.syncFile( fileData, this.characterDataToBackupData( characterData ) ).then(
                lang.hitch( this, function( reslt ) {
                    if( reslt.fileData )
                    {
                        this._settingsStore.put( this.SYNC_TIME_KEY, reslt.fileData.modifiedDate );
                    }
                    if( reslt.result == "PLEASE_UPDATE" )
                    {
                        var obj = this.backupDataToCharacterData( reslt.contentData );
                        if( obj )
                        {
                            this._restoreFromBackupData( obj, true ); // Overwrite restore.
                            topic.publish( "/CharacterStore/DataRefreshed" );
                        }
                        else
                        {
                            // should never happen normally
                            alert( "The file didn't contain a backup. Imagine that!" );
                        }
                    }

                    this.setSyncState( "CLEAN" );
                    this.getCloudBackups( false );
                    this._setCBSpinner( false );
                }),
                lang.hitch( this, function() {
                    // fail silently and try again after the timeout
                    this._setCBSpinner( false );
                    this.setSyncState( "FAILED" );
                }));
        },
        /**
         * Stores preference for sync file title for performing syncs and future reference.
         */
        setSyncFileTitle : function()
        {
            if( this.cloudSyncFileName.get( "value" ) != "" )
            {
                this._settingsStore.put( "_CCG_SYNC_FILE_TITLE", this.cloudSyncFileName.get( "value" ) );
                this.performSync();
            }
        },
        /**
         * Backup character data to cloud, then refresh list of backups. The title of the file will be read
         * from the backup input. As usual, everything is filtered by MIME type.
         * 
         * @public void
         */
        backupToCloud : function()
        {
            this._setCBDisabled( true );
            var characterData = this.getStoredCharacterData();
            var fileData = {
                    title : this.cloudBackupFileName.value,
                    description : this.BACKUP_DESCRIPTION,
                    mimeType : this.BACKUP_MIME_TYPE
            };
            this.drive.updateFileByProperties( fileData, this.characterDataToBackupData( characterData ) ).then( lang.hitch( this, function() {
                this.getCloudBackups( false );
            }));
        },
        /**
         * Restores from cloud backup, with the filename read from the ComboBox listing the backups. The restore
         * button will only be enabled if the value is one of the legit choices so we don't need to worry about
         * it here. After restore, sets sync state to "DIRTY" so the changes will be written back to the sync
         * file next time around.
         * 
         * Unusual error states that may be caused by mucking about directly with the Google Drive files are
         * handled with slightly facetious alerts continuing with getCloudBackups to recover.
         * 
         * @public void
         */
        restoreFromCloud : function()
        {
            this._setCBDisabled( true );
            this.drive.downloadFileByProperties({
                mimeType : this.BACKUP_MIME_TYPE,
                title : this.cloudBackupFileName.get( "value" )
            }).then( lang.hitch( this, function( fileData ) {
                this._setCBDisabled( false );
                var obj = this.backupDataToCharacterData( fileData );
                if( obj )
                {
                    this._restoreFromBackupData( obj );
                    this.setSyncState( "DIRTY" );
                }
                else
                {
                    // should never happen normally
                    alert( "The file didn't contain a backup. Imagine that!" );
                }
            }), lang.hitch( this, function() {
                // should never happen normally
                alert( "No matching file. Perhaps someone deleted it from your Drive while you were mucking around here." );
                this._setCBDisabled( true );
                this.getCloudBackups( true );
            }));
        },
        /**
         * Sets sync state in _storage to state, except if it's already DIRTY in which case it stays that way.
         * 
         * @param state - DIRTY | CLEAN | FAILED | PENDING | CONFLICT
         * @public void
         */
        setSyncState : function( /* String */ state )
        {
            var syncState = this._settingsStore.get( this.SYNC_STATE_KEY );
            if( syncState != "DIRTY" )
            {
                // someone might've dirtied it while we were syncing, and we don't want to flag it clean
                this._settingsStore.put( this.SYNC_STATE_KEY, state );
            }
            if( state == "DIRTY" )
            {
                // someone saved something, so we sync immediately
                this.performSync();
            }
        },
        showPrivacyPolicy : function()
        {
            this.close();
            this.manager.controller.showModule( "help", "Privacy" );
        },
        /**
         * Creates a Memory datastore and a ComboBox connected to it, and places it in the widget.
         * 
         * @private void
         */
        _initCloudUI : function()
        {
            this._backupListStore = new Memory({ data : [] });
            this.cloudBackupFileName = new ComboBox({
                store : this._backupListStore,
                searchAttr : "title",
                onChange : lang.hitch( this, this._checkRestoreEnabled ),
                value : "My Characters" }).placeAt( this.cloudBackupFileNameNode, "replace" );
            this.cloudSyncFileName = new ComboBox({
                store : this._backupListStore,
                searchAttr : "title",
                onBlur : lang.hitch( this, this.setSyncFileTitle ),
                value : "My Characters" }).placeAt( this.cloudSyncFileNameNode, "replace" );
        },
        /**
         * Connected to onChange in filename selector. Checks if the value matches an item in its data store, and
         * enables/disables the restore button accordingly.
         * 
         * @private void
         */
        _checkRestoreEnabled : function()
        {
            var itm = this.cloudBackupFileName.get( "value" );
            this._settingsStore.put( "_CCG_BACKUP_FILE_TITLE", itm );
            if( this._backupListStore.get( itm ) )
            {
                this.restoreFromCloudButton.set( "disabled", false );
            }
            else
            {
                this.restoreFromCloudButton.set( "disabled", true );
            }
        },
        /**
         * Disables/enables restore and backup buttons to match argument, and does some UI chrome to show a 
         * spinner icon to show that something's going on.
         * 
         * @private void
         */
        _setCBDisabled : function( to )
        {
            this._setCBSpinner( to );
            this.restoreFromCloudButton.set( "disabled", to );
            this.backupToCloudButton.set( "disabled", to );
        },
        /**
         * Sets state of cloud backup spinner to show something is going on.
         * 
         * @private void
         */
        _setCBSpinner : function( to )
        {
            if( to )
            {
                domClass.add( this.cloudWorkingIcon, "fa-spin" );
                this.cloudWorkingIcon.style.visibility = "visible";
            }
            else
            {
                this._syncInProgress = false;
                domClass.remove( this.cloudWorkingIcon, "fa-spin" );
                this.cloudWorkingIcon.style.visibility = "hidden";
            }
        }
    });
});