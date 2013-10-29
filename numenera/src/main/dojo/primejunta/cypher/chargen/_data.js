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
         "dojo/Deferred",
         "dijit/Dialog",
         "dijit/registry",
         "dojo/on",
         "dojo/topic",
         "dijit/form/Button" ],
function( declare,
          lang,
          domConstruct,
          ioQuery,
          domQuery,
          Deferred,
          Dialog,
          registry,
          on,
          topic, 
          Button )
{
    return declare([], {
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
            topic.subscribe( "CharGen/dataChanged", lang.hitch( this, this.autoSave ) );
            on( document, "keyup", lang.hitch( this, this.handleKeyUp ) );
            if( window.location.search != "" )
            {
                this.populateFromQueryString();
                if( window.location.hash.indexOf( "view=print" ) != -1 )
                {
                    this.showPrintView();
                }
                else if( window.location.hash.indexOf( "view=play" ) != -1 )
                {
                    this.showPlayView();
                }
                else
                {
                    this.transitionTo( "main") ;
                }
            }
            else
            {
                this.transitionTo( "splash" );
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
         * Calls populateFromStoredData on the query string, and autoSave.
         */
        populateFromQueryString : function()
        {
            this._doPopulateFromQueryString();
        },
        pleaseStoreCharacter : function()
        {
            this._characterStore.storeCharacter();
        },
        /**
         * @public Deferred
         */
        getStoredCharacters : function()
        {
            return this._characterStore.getStoredCharacters();
        },
        /**
         * Call _initStorage if necessary; then getKeys and display the stored characters in a manage dialog
         * that lets you delete or load them.
         */
        openCharacterStore : function()
        {
            this.setDataRefreshedReminder( false );
            this._characterStore.show();
        },
        /**
         * Loads character matching key from local store and hides dialog.
         */
        loadCharacter : function( data )
        {
            this.populateFromStoredData( data );
            this.autoSave();
            this.saveButton.set( "disabled", true );
            this.transitionTo( "main" );
        },
        /**
         * Checks that we're not in the middle of something and that a type, focus, and descriptor are set;
         * then enables the save and print buttons and updates the link with the character data. Also pushes
         * the same data into the undo buffer.
         */
        autoSave : function()
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
            setTimeout( lang.hitch( this, this._doAutoSave, 100 ) ); // async to stop the UI from stuttering in case things take time
        },
        _doAutoSave : function()
        {
            var qString = this._getCharacterData();
            var href = window.location.origin + window.location.pathname + "?" + qString; 
            this._buffer.push( qString );
            this._characterStore.storeCharacter( qString, true );
        },
        /**
         * Wraps _popualteFromStoredData in a try-catch block and displays a polite alert if something bad happened, e.g. because
         * the data was corrupted.
         */
        populateFromStoredData : function( /* String */ qString )
        {
            this._populating.push( 7 );
            try
            {
                this._populateFromStoredData( qString );
            }
            catch( e )
            {
                console.log( e );
                this._populating = [];
                this.clearAll();
                this.tell( "An error occurred loading the character. Perhaps the link was corrupted.<br/><br/>Sorry about that." );
                return;
            }
            this.onCharNameBlur( this.characterNameInput );
            this._populating.pop();
        },
        _getCharacterData : function()
        {
            var dataObj = this.getCharacterDataObj();
            return ioQuery.objectToQuery( dataObj ) + this.getOptionalData();
        },
        /**
         * Okay, the beef. Or one of them. We generate the character data with this method. Since we transfer the
         * data in a URL, we want to keep it as short as possible. This unfortunately means that it's not all that
         * robust to changes in the underlying framework. The idea is that we read the current selected indexes/values
         * and disabled states of all our selects/inputs and the deleted states of all controls that can be deleted into
         * terse parameters. The type, descriptor, and focus selectors and textareas are treated separately. To load
         * the data back, we reset the controls that affect the content of the page first, then restore the data in
         * the same order. The big advantage is that we don't have to have attribute names for each input. The downside
         * is that if we change something about the UI or data that adds or removes inputs or selects or changes their
         * order, the data won't load correctly.
         * 
         * See _populateFromStoredData for details on how this goes the other way.
         */
        getCharacterDataObj : function()
        {
            var sels = domQuery( "select.cg-storeMe", this.domNode );
            var inps = domQuery( "input.cg-storeMe", this.domNode );
            var idxs = [];
            var vals = [];
            var disb = [];
            var dels = [];
            for( var i = 0; i < sels.length; i++ )
            {
                idxs.push( sels[ i ].selectedIndex );
                disb.push( sels[ i ].disabled ? 1 : 0 );
            }
            for( var i = 0; i < inps.length; i++ )
            {
                if( inps[ i ].type == "checkbox" )
                {
                    vals.push( inps[ i ].checked ? "1" : "0" );
                }
                else
                {
                    vals.push( this._preprocessInput( inps[ i ] ) );
                }
                disb.push( inps[ i ].disabled ? 1 : 0 );
            }
            for( var i = 0; i < this._controls.length; i++ )
            {
                if( this._controls[ i ].isDeletable )
                {
                    if( this._controls[ i ].deleted )
                    {
                        dels.push( 1 );
                    }
                    else
                    {
                        dels.push( 0 );
                    }
                }
            }
            return {
                version : this.DATA_VERSION,
                descriptor : this.selectValue( this.descriptorSelect ).value,
                type : this.selectValue( this.typeSelect ).value,
                focus : this.selectValue( this.focusSelect ).value,
                finalized : this.finalized,
                tier : this.statsControl.character_tier.value,
                cyphers : this.statsControl.cypher_count.value,
                selects : idxs.join( this._listDelimiter ),
                inputs : vals.join( this._listDelimiter ),
                extra_equipment_text : this.extra_equipment_text.value,
                notes_text : this.notes_text.value,
                description_text : this.description_text.value,
                img : this.portraitWidget.getHref(),
                disabled : disb.join( "" ),
                deleted : dels.join( "" )
            }
        },
        /**
         * Pushes something into the _populating stack, clearAll, parse out the
         * data from qString, sets type, descriptor, and focus selectors and augmentCypherList, and finalize to tier from
         * kwObj.tier, if the character is finalized. At this point we have all the selects and inputs ready to be populated.
         * Then zips through selects, inputs, disabled, and deleted, and sets the states of the controls accordingly. Then
         * populates textareas and raises the character's stat floor if s/he is finalized. (If you saved in the middle of
         * tiering up, too bad, you can't bump the stats back down.) Completes by emitting a pleaseCheckState topic, which
         * will get any controls on the page to do just that.
         */
        _populateFromData : function( /* String */ qString )
        {
            var kwObj = ioQuery.queryToObject( qString );
            if( kwObj.img )
            {
                this.portraitWidget.setHref( kwObj.img );
            }
            var idxs = kwObj.selects.split( this._listDelimiter );
            var vals = kwObj.inputs.split( this._listDelimiter );
            var disb = kwObj.disabled ? kwObj.disabled : "";
            var dels = kwObj.deleted ? kwObj.deleted : "";
            this.selectValue( this.descriptorSelect, kwObj.descriptor );
            this.selectValue( this.typeSelect, kwObj.type );
            this.selectValue( this.focusSelect, kwObj.focus );
            this.selectType();
            this.selectDescriptor();
            this.selectFocus();
            this.augmentCypherList( kwObj.cyphers );
            if( kwObj.finalized == "true" )
            {
                this.finalize( kwObj.tier );
            }
            this.populateOptionalData( kwObj );
            var sels = domQuery( "select.cg-storeMe", this.domNode );
            var inps = domQuery( "input.cg-storeMe", this.domNode );
            for( var i = 0; i < idxs.length; i++ )
            {
                if( sels[ i ] )
                {
                    sels[ i ].selectedIndex = idxs[ i ];
                    sels[ i ].disabled = ( disb[ i ] == "1" );
                    if( sels[ i ].getAttribute( "data-parent-widget-id" ) )
                    {
                        registry.byId( sels[ i ].getAttribute( "data-parent-widget-id" ) ).selectChanged();
                        sels = domQuery( "select.cg-storeMe", this.domNode );
                        inps = domQuery( "input.cg-storeMe", this.domNode );
                    }
                }
                else
                {
                    break;
                }
            }
            for( var i = 0; i < vals.length; i++ )
            {
                if( inps[ i ] )
                {
                    if( inps[ i ].type == "checkbox" )
                    {
                        inps[ i ].checked = vals[ i ] == "1" ? true : false;
                    }
                    else
                    {
                        inps[ i ].value = this._unescapeDelimiter( vals[ i ] );
                    }
                    inps[ i ].disabled = ( disb[ sels.length + i ] == "1" )
                }
            }
            if( this.finalized )
            {
                this.statsControl.moveCaps();
            }
            this.statsControl.checkCaps();
            var d = 0;
            for( var i = 0; i < this._controls.length; i++ )
            {
                if( this._controls[ i ].isDeletable )
                {
                    if( dels[ d ] == "1" )
                    {
                        this._controls[ i ].toggleDeleted();
                    }
                    d++;
                }
            }
            this.description_text.set( "value", kwObj.description_text );
            this.notes_text.set( "value", kwObj.notes_text );
            this.extra_equipment_text.set( "value", kwObj.extra_equipment_text );
        },
        /**
         * Gets populate method for qString with _getPopulateMethod, then runs it if provided.
         */
        _populateFromStoredData : function( /* String */ qString )
        {
            this._populating.push( 3 );
            this.doClearAll();
            var populateMethod = this._getPopulateMethod( qString );
            if( populateMethod )
            {
                this._prepareCharacterLoad( qString );
                lang.hitch( this, populateMethod )( qString );
            }
            this._populating.pop();
            topic.publish( "CharGen/pleaseCheckState" );
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
                return this._validateFields( kwObj ) ? this._populateFromData : false;
            }
            else if( kwObj.version == "1.1.0" )
            {
                return this._validateFields( kwObj ) ? this._populateFromData : false;
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
                    return this._validateFields( kwObj ) ? this._populateFromData : false;
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
        _prepareCharacterLoad : function( qString )
        {
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
            this.populateFromStoredData( window.location.search.substring( 1 ) );
            this.autoSave();
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