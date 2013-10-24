define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/json",
         "dojo/on",
         "dojo/dom-construct",
         "dojo/Deferred",
         "dojox/storage",
         "./_CharacterManager",
         "./_UtilityMixin",
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
          json,
          on,
          domConstruct,
          Deferred,
          storage,
          _CharacterManager,
          _UtilityMixin,
          LinkButton,
          Dialog,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        manager : {},
        templateString : template,
        _cwa : [],
        postCreate : function()
        {
            domConstruct.place( this.characterManagerDialog.domNode, document.body );
            this.characterManagerDialog.startup();
        },
        show : function( restored )
        {
            if( !this._storage )
            {
                this._initStorage().then( lang.hitch( this, this.show ) );
                return;
            }
            while( this._cwa.length > 0 )
            {
                this._cwa.pop().destroy();
            }
            if( !restored )
            {
                restored = [];
            }
            var chars = this._storage.getKeys().sort();
            var _data = {};
            this.clearMessages();
            domConstruct.empty( this.characterManagerContentNode );
            var nde = domConstruct.create( "div", { style : "width:100%;margin-bottom:30px;" }, this.characterManagerContentNode );
            for( var i = 0; i < chars.length; i++ )
            {
                var _char = this._storage.get( chars[ i ] );
                if( this._characterIsValid( _char ) )
                {
                    _data[ chars[ i ] ] = _char;
                    var props = { key : chars[ i ], character : _char, manager : this };
                    if( array.indexOf( restored, _char.name ) != -1 )
                    {
                        props.restored = true;
                    }
                    this._cwa.push( new _CharacterManager( props ).placeAt( nde ) );
                }
            }
            if( this._cwa.length == 0 )
            {
                nde.innerHTML = "No saved characters.";
            }
            this.characterManagerDialog.show();
            this.updateDownloadLink( _data );
        },
        clearMessages : function()
        {
            this.invalidFileMessageNode.style.display = "none";
        },
        updateDownloadLink : function( _data )
        {
            _data = json.stringify( _data ); 
            var href = "data:text/plain;,(" + encodeURIComponent( _data ) + ")";
            this.downloadButton.set( "href", href );
            this.downloadButton.set( "download", this.manager.dataFileName + ".txt" );
        },
        /**
         * Calls _initStorage if necessary to start up our local storage manager; then stores the character
         * under a key derived from the character name with _getKey.
         */
        storeCharacter : function( data, tempStore )
        {
            if( !this._storage )
            {
                this._initStorage().then( lang.hitch( this, this.storeCharacter, data, tempStore ) );
                return;
            }
            var key = this._getKey( this.manager.characterNameInput.value, tempStore );
            var val = {
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
        loadCharacter : function( key )
        {
            var val = this._storage.get( key ).data;
            this.close();
            this.manager.loadCharacter( val );
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
            try
            {
                // Eval is evil, but our JSON is too complex to go through Dojo's secure json parser.
                // TODO: Plug this hole if I ever add server components.
                this._objectToUpload = eval( fileData );
                this.uploadButton.set( "disabled", false );
                this.invalidFileMessageNode.style.display = "none";
            }
            catch( e )
            {
                console.log( e );
                this.invalidFileMessageNode.style.display = "block";
                this.uploadControl.value = "";
                this.uploadButton.set( "disabled", true );
            }
        },
        uploadBackup : function()
        {
            if( !this._storage )
            {
                this._initStorage.then( lang.hitch( this, this.uploadBackup ) );
                return;
            }
            this.uploadControl.value = "";
            var obj = this._objectToUpload;
            var keys = this._storage.getKeys().sort();
            var restored = [];
            for( var o in obj )
            {
                if( array.indexOf( keys, o ) == -1 )
                {
                    restored.push( o );
                    this._storage.put( o, obj[ o ] );
                }
            }
            this.uploadButton.set( "disabled", true );
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
                characterList += "<li><a href=\"" + loc + "?" + this._cwa[ i ].character.data + "\">" + this._cwa[ i ].character.name + "</a></li>\n";
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