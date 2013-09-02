define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dojo/io-query",
         "dojo/query",
         "dijit/Dialog",
         "dojo/on",
         "dojo/topic",
         "dijit/form/Button",
         "dojox/storage",
         "./_CharacterManager" ],
function( declare,
          lang,
          domConstruct,
          ioQuery,
          domQuery,
          Dialog,
          on,
          topic, 
          Button,
          storage,
          _CharacterManager )
{
    return declare([], {
        dataVersion : "0.9.1",
        _listDelimiter : "-",
        postMixInProperties : function()
        {
            topic.subscribe( "CharGen/dataChanged", lang.hitch( this, this.updateLink ) );
            on( document, "keyup", lang.hitch( this, this.handleKeyUp ) );
        },
        postCreate : function()
        {
            if( window.location.search != "" )
            {
                this.populateFromQueryString();
                if( window.location.search.indexOf( "&print=true" ) != -1 )
                {
                    this.makePrint();
                }
            }
        },
        handleKeyUp : function( event )
        {
            if( event.keyCode == 90 && event.ctrlKey && this._buffer.length > 1 )
            {
                var prev = this._buffer.pop();
                this._populateFromStoredData( this._buffer[ this._buffer.length - 1 ] );
            }
        },
        populateFromQueryString : function()
        {
            this._populateFromStoredData( window.location.search.substring( 1 ) );
            this.updateLink();
        },
        storeCharacter : function()
        {
            if( !this._storage )
            {
                this._initStorage();
            }
            var keys = this._storage.getKeys();
            var key = this._getKey( this.characterNameInput.value );
            var val = {
                name : this.characterNameInput.value,
                data : this._getCharacterData()
            };
            this._storage.put( key, val, lang.hitch( this, function() {
                this.saveButton.set( "disabled", true );
            }));
        },
        openCharacter : function()
        {
            if( !this._storage )
            {
                this._initStorage();
            }
            var chars = this._storage.getKeys();
            if( !this._dlog )
            {
                this._dlog = new Dialog({ title : "Manage characters" }).placeAt( document.body );
                this._dlog.startup();
            }
            this._cwa = [];
            this._dlog.set( "content", "" );
            var nde = domConstruct.create( "div", { style : "width:400px;padding:10px;" } );
            for( var i = 0; i < chars.length; i++ )
            {
                var char = this._storage.get( chars[ i ] );
                if( char.name && char.data )
                {
                    this._cwa.push( new _CharacterManager({ key : chars[ i ], character : char, manager : this }).placeAt( nde ) );
                }
            }
            if( this._cwa.length == 0 )
            {
                nde.innerHTML = "No stored characters.";
            }
            var btn = new Button({ "style" : "display:block;text-align:center;", "label" : "Close", onClick : lang.hitch( this._dlog, this._dlog.hide ) }).placeAt( nde );
            this._dlog.set( "content", nde );
            this._dlog.show();
        },
        loadCharacter : function( key )
        {
            var val = this._storage.get( key ).data;
            this._populateFromStoredData( val );
            this.updateLink();
            this._dlog.hide();
        },
        deleteCharacter : function( key )
        {
            this._storage.remove( key );
            this.openCharacter();
        },
        updateLink : function()
        {
            if( !this._populating )
            {
                this._populating = [];
            }
            if( this._populating.length > 0 )
            {
                return;
            }
            this.saveButton.set( "disabled", false );
            this.printButton.set( "disabled", false );
            var qString = this._getCharacterData();
            var href = window.location.origin + window.location.pathname + "?" + qString; 
            this._buffer.push( qString );
            this.linkNode.href = href;
            this.linkNode.innerHTML = "Share " + this.characterNameInput.value;
        },
        _getKey : function( nameStr )
        {
            return nameStr.replace( /[^a-z|A-Z]+/g, "_" );
        },
        _initStorage : function()
        {
            dojox.storage.manager.initialize(); // it's not ported to AMD, so...
            this._storage = dojox.storage.manager.getProvider();
            this._storage.initialize();
        },
        _getCharacterData : function()
        {
            var sels = domQuery( "select.cg-storeMe", this.domNode );
            var inps = domQuery( "input.cg-storeMe", this.domNode );
            var idxs = [];
            var vals = [];
            var disb = [];
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
                    vals.push( this._escapeDelimiter( inps[ i ].value ) );
                }
                disb.push( inps[ i ].disabled ? 1 : 0 );
            }
            return "version=" + escape( this.dataVersion ) + "&finalized=" + this.finalized + "&tier=" + this.character_tier.value + "&selects=" + encodeURIComponent( idxs.join( this._listDelimiter ) ) + "&inputs=" + encodeURIComponent( vals.join( this._listDelimiter ) ) + "&description=" + encodeURIComponent( this.description_text.value ) + "&disabled=" + disb.join( "" );
        },
        _escapeDelimiter : function( str )
        {
            return str.replace( /\-/g, "///" );
        },
        _unescapeDelimiter : function( str )
        {
            return str.replace( /\/\/\//g, this._listDelimiter );
        },
        _populateFromStoredData : function( qString )
        {
            this._populating.push( 3 );
            this.clearAll();
            var kwObj = ioQuery.queryToObject( qString );
            if( kwObj.version != this.dataVersion )
            {
                this.tell( "The character was created with an incompatible version of this utility, and cannot be loaded. We apologize for the inconvenience." );
                this._populating.pop();
                return;
            }
            var idxs = kwObj.selects.split( this._listDelimiter );
            var vals = kwObj.inputs.split( this._listDelimiter );
            var disb = kwObj.disabled ? kwObj.disabled : "";
            this.descriptorSelect.selectedIndex = idxs[ 0 ];
            this.typeSelect.selectedIndex = idxs[ 1 ];
            this.focusSelect.selectedIndex = idxs[ 2 ];
            this.selectDescriptor();
            if( kwObj.finalized == "true" )
            {
                this.finalize( kwObj.tier );
            }
            var sels = domQuery( "select.cg-storeMe", this.domNode );
            var inps = domQuery( "input.cg-storeMe", this.domNode );
            for( var i = 3; i < idxs.length; i++ )
            {
                if( sels[ i ] )
                {
                    sels[ i ].selectedIndex = idxs[ i ];
                    sels[ i ].disabled = ( disb[ i ] == "1" )
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
                this.moveCaps();
            }
            this.checkCaps();
            this.description_text.set( "value", kwObj.description );
            this._populating.pop();
            topic.publish( "CharGen/pleaseCheckState" );
        }
    });
});