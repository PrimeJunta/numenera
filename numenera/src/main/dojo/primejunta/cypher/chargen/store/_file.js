define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "primejunta/cypher/widget/LinkButton" ],
function( declare,
          lang,
          LinkButton )
{
    return declare([], {
        updateDownloadLink : function()
        {
            var _data = this.characterDataToBackupData( this.getStoredCharacterData() );
            var href = "data:text/plain;," + encodeURIComponent( _data ) + "";
            this.downloadButton.set( "href", href );
            this.downloadButton.set( "download", this.manager.dataFileName + ".txt" );
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
                this.invalidFileMessageNode.style.display = "block";
                this.uploadControl.value = "";
                this.uploadButton.set( "disabled", true );
            }
        },
        uploadBackup : function()
        {
            this.uploadControl.value = "";
            var obj = this._objectToUpload;
            this._restoreFromBackupData( obj );
            this.setSyncState( "DIRTY" ); // from _cloud.
            this.uploadButton.set( "disabled", true );
        }
    });
});