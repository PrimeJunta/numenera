/**
 * Logic for handling loading and generation of character data for links, local storage, undo buffer, and so on.
 * Mixed into CharacterGenerator; doesn't do anything on its own and is only in its own file to keep the classes
 * a bit shorter.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dojo/io-query",
         "dojo/query",
         "dijit/Dialog",
         "dijit/registry",
         "dojo/on",
         "dojo/topic",
         "dijit/form/Button",
         "dojox/storage",
         "./_data1",
         "./_data2",
         "./_CharacterManager" ],
function( declare,
          lang,
          domConstruct,
          ioQuery,
          domQuery,
          Dialog,
          registry,
          on,
          topic, 
          Button,
          storage,
          _data1,
          _data2,
          _CharacterManager )
{
    return declare([ _data1, _data2 ], {
        /**
         * Version of the data format understood by this implementation.
         */
        DATA_VERSION : "1.1.0",
        /**
         * Fields in the character data. There are rather a lot of these. Perhaps for a future version I'll replace
         * them with shorter ones. For now, clarity is king.
         */
        DATA_FIELDS : {
            "1.0.0" : [ "version",
                        "descriptor",
                        "type",
                        "focus",
                        "finalized",
                        "tier",
                        "cyphers",
                        "selects",
                        "inputs",
                        "extra_equipment_text",
                        "notes_text",
                        "description_text",
                        "disabled",
                        "deleted" ],
            "1.1.0" : [ "version",
                        "descriptor",
                        "type",
                        "focus",
                        "finalized",
                        "tier",
                        "cyphers",
                        "selects",
                        "inputs",
                        "extra_equipment_text",
                        "notes_text",
                        "description_text",
                        "disabled",
                        "deleted" ]
        },
        /**
         * Character used to break up lists in the data. We picked one that doesn't get escaped when we URL
         * encode it, rather than, say, a comma. This saves space.
         */
        _listDelimiter : "-",
        /**
         * Checks if we have a query string, and calls popualteFromQueryString if we do. As a little undocumented
         * feature we also allow the keyword &print=true to go directly to the character sheet.
         */
        checkForStartupQuery : function()
        {
            topic.subscribe( "CharGen/dataChanged", lang.hitch( this, this.updateLink ) );
            on( document, "keyup", lang.hitch( this, this.handleKeyUp ) );
            if( window.location.search != "" )
            {
                this.populateFromQueryString();
                if( window.location.search.indexOf( "&print=true" ) != -1 )
                {
                    this.makePrint();
                }
            }
        },
        /**
         * If event was a Ctrl-Z, pop an item from the undo buffer and populateFromStoredData.
         */
        handleKeyUp : function( event )
        {
            if( event.keyCode == 90 && event.ctrlKey && this._buffer.length > 1 )
            {
                var prev = this._buffer.pop();
                this.populateFromStoredData( this._buffer[ this._buffer.length - 1 ] );
            }
        },
        /**
         * Calls populateFromStoredData on the query string, and updateLink.
         */
        populateFromQueryString : function()
        {
            if( !this._storage )
            {
                this._initStorage( this._doPopulateFromQueryString );
            }
        },
        /**
         * Calls _initStorage if necessary to start up our local storage manager; then stores the character
         * under a key derived from the character name with _getKey.
         */
        storeCharacter : function()
        {
            if( !this._storage )
            {
                this._initStorage();
            }
            var key = this._getKey( this.characterNameInput.value );
            var val = {
                name : this._sanitize( this.characterNameInput.value ),
                data : this._getCharacterData()
            };
            this._storage.put( key, val, lang.hitch( this, function() {
                this.saveButton.set( "disabled", true );
            }));
        },
        /**
         * Call _initStorage if necessary; then getKeys and display the stored characters in a manage dialog
         * that lets you delete or load them.
         */
        openCharacter : function()
        {
            if( !this._storage )
            {
                this._initStorage();
            }
            var chars = this._storage.getKeys();
            this._cwa = [];
            domConstruct.empty( this.characterManagerContentNode );
            var nde = domConstruct.create( "div", { style : "width:100%;margin-bottom:30px;" }, this.characterManagerContentNode );
            for( var i = 0; i < chars.length; i++ )
            {
                var _char = this._storage.get( chars[ i ] );
                if( _char.name && _char.data )
                {
                    this._cwa.push( new _CharacterManager({ key : chars[ i ], character : _char, manager : this }).placeAt( nde ) );
                }
            }
            if( this._cwa.length == 0 )
            {
                nde.innerHTML = "No saved characters.";
            }
            this.characterManagerDialog.show();
        },
        /**
         * Clears character manager widgets and closes character manager dialog.
         */
        closeCharacterManager : function()
        {
            while( this._cwa.length > 0 )
            {
                this._cwa.pop().destroy();
            }
            this.characterManagerDialog.hide();
        },
        /**
         * Displays list of saved characters as links for saving or pasting into a mail or something.
         */
        displayCharacterLinks : function()
        {
            var loc = window.location.origin + window.location.pathname;
            var characterList = "<div>\n<h2>My Numenera Characters</h2>\n"
                + "<ul>\n";
            for( var i = 0; i < this._cwa.length; i++ )
            {
                characterList += "<li><a href=\"" + loc + "?" + this._cwa[ i ].character.data + "\">" + this._cwa[ i ].character.name + "</a></li>\n";
            }
            characterList += "</ul>\n</div>\n";
            characterList += "<p>Copy-paste and save this list in case something bad happens to your browser, or if you want to mail them to someone.</p>";
            this.characterManagerDialog.hide();
            this.tell( characterList );
        },
        /**
         * Loads character matching key from local store and hides dialog.
         */
        loadCharacter : function( /* String */ key )
        {
            var val = this._storage.get( key ).data;
            this.closeCharacterManager();
            this.populateFromStoredData( val );
            this.updateLink();
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
            this.openCharacter();
        },
        /**
         * Checks that we're not in the middle of something and that a type, focus, and descriptor are set;
         * then enables the save and print buttons and updates the link with the character data. Also pushes
         * the same data into the undo buffer.
         */
        updateLink : function()
        {
            if( this._populating.length > 0 )
            {
                return;
            }
            if( !this.getType() || !this.getFocus() || !this.getDescriptor() )
            {
                return;
            }
            this.saveButton.set( "disabled", false );
            this.printButton.set( "disabled", false );
            var qString = this._getCharacterData();
            var href = window.location.origin + window.location.pathname + "?" + qString; 
            this._buffer.push( qString );
            this.linkNode.setAttribute( "href", href );
        },
        /**
         * Wraps _popualteFromStoredData in a try-catch block and displays a polite alert if something bad happened, e.g. because
         * the data was corrupted.
         */
        populateFromStoredData : function( /* String */ qString )
        {
            try
            {
                this._populateFromStoredData( qString );
            }
            catch( e )
            {
                console.log( e );
                this.clearAll();
                this.tell( "An error occurred loading the character. Perhaps the link was corrupted.<br/><br/>Sorry about that." );
            }
            this.onCharNameBlur( this.characterNameInput )
        },
        _getCharacterData : function()
        {
            return this._getCharacterDataV1();
        },
        /**
         * Gets populate method for qString with _getPopulateMethod, then runs it if provided.
         */
        _populateFromStoredData : function( /* String */ qString )
        {
            var populateMethod = this._getPopulateMethod( qString );
            if( !populateMethod )
            {
                return;
            }
            else
            {
                lang.hitch( this, populateMethod )( qString );
            }
        },
        /**
         * Parses qString into a kwObject, then checks that kwObj.version matches DATA_VERSION and that all the fields in DATA_FIELDS
         * are present. Displays a polite alert about the former; throws an exception about the latter.
         */
        _getPopulateMethod : function( /* String */ qString )
        {
            var kwObj = ioQuery.queryToObject( qString );
            if( kwObj.version == this.DATA_VERSION )
            {
                return this._validateFields( kwObj ) ? this._populateFromDataV1 : false;
            }
            else if( kwObj.version == "1.1.0" )
            {
                return this._validateFields( kwObj ) ? this._populateFromDataV1 : false;
            }
            else if( kwObj.version == "1.0.0" )
            {
                if( kwObj.descriptor == "D6" ) // we're incompatible with 1.0.0 mutants
                {
                    this.tell( "Mutant characters created with this version of the utility cannot be loaded. We apologize for the inconvenience." );
                    return false;
                }
                else
                {
                    return this._validateFields( kwObj ) ? this._populateFromDataV1 : false;
                }
            }
            else
            {
                this.tell( "The character was created with an incompatible version of this utility, and cannot be loaded. We apologize for the inconvenience." );
                return false;
            }
        },
        _validateFields : function( kwObj )
        {
            var fields = this.DATA_FIELDS[ kwObj.version ];
            for( var i = 0; i < fields.length; i++ )
            {
                if( kwObj[ fields[ i ] ] === undefined )
                {
                    throw( new Error( "Invalid data: expected " + fields[ i ] ) );
                }
            }
            return true;
        },
        /**
         * Checks kwObj.version and other features in it to check if the data can be loaded, and returns true or false accordingly.
         */
        _checkDataVersion : function( kwObj )
        {
            if( kwObj.version == this.DATA_VERSION )
            {
                return true;
            }
            else if( kwObj.version == "1.0.0" )
            {
                if( kwObj.descriptor == "D6" ) // we're incompatible with 1.0.0 mutants
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
        },
        /**
         * Checks if the hero in the query string has been saved; if so, loads that version rather than the
         * one in the query string.
         */
        _doPopulateFromQueryString : function()
        {
            var kwObj = ioQuery.queryToObject( window.location.search.substring( 1 ) );
            if( kwObj.inputs )
            {
                var hName = kwObj.inputs.split( this._listDelimiter )[ 0 ];
                var hero = this._storage.get( this._getKey( hName ) );
                if( hero && hero.name == hName )
                {
                    this.populateFromStoredData( hero.data );
                    this.updateLink();
                    return;
                }
            }
            this.populateFromStoredData( window.location.search.substring( 1 ) );
            this.updateLink();
        },
        /**
         * Replaces everything that's not a letter between a and z in the character name with underscores, and
         * returns it. This is so our characters are stored by name, more or less. If you have two different
         * characters named Röbin Høød and Røbin Hööd, you're SOL though 'cuz both will be stored as R_bin_H__d.
         */
        _getKey : function( nameStr )
        {
            return nameStr.replace( /[^a-z|A-Z]+/g, "_" );
        },
        /**
         * Initializes a dojox.storage.manager and puts a provider from it in this._storage. If handler is
         * provided, continues with that.
         */
        _initStorage : function( handler )
        {
            if( !dojox || !dojox.storage || !dojox.storage.manager )
            {
                setTimeout( lang.hitch( this, this._initStorage, handler ), 500 );
                return;
            }
            else
            {
                dojox.storage.manager.initialize(); // it's not ported to AMD, so...
                this._storage = dojox.storage.manager.getProvider();
                this._storage.initialize();
                if( handler )
                {
                    lang.hitch( this, handler )();
                }
            }
        },
        /**
         * Checks if inputElem.value is a default, and if so, returns "". Else returns _escapeDelimiter on it.
         */
        _preprocessInput : function( /* Input */ inputElem )
        {
            var val = inputElem.value;
            if( this.DEFAULT_VALUES[ val ] )
            {
                return "";
            }
            else
            {
                return this._escapeDelimiter( val );
            }
        },
        /**
         * Escapes our delimiter character in our stored values with three slashes. I'm assuming users won't type three slashes in
         * much and can deal with the mental anguish of seeing them converted into a dash when the data is loaded back.
         */
        _escapeDelimiter : function( /* String */ str )
        {
            return str.replace( /\-/g, "///" );
        },
        /**
         * Unescapes our delimiter character in our stored values.
         */
        _unescapeDelimiter : function( str )
        {
            return str.replace( /\/\/\//g, this._listDelimiter );
        }
    });
});