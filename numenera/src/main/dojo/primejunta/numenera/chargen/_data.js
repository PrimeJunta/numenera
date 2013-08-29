define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/io-query",
         "dojo/query",
         "dojo/on",
         "dojo/topic" ],
function( declare,
          lang,
          ioQuery,
          domQuery,
          on,
          topic )
{
    return declare([], {
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
            var sels = domQuery( "select", this.domNode );
            var inps = domQuery( "input[type=text]", this.domNode );
            var idxs = [];
            var vals = [];
            for( var i = 0; i < sels.length; i++ )
            {
                idxs.push( sels[ i ].selectedIndex );
            }
            for( var i = 0; i < inps.length; i++ )
            {
                vals.push( this._escape( inps[ i ].value ) );
            }
            var qString = "selects=" + escape( idxs.join( "," ) ) + "&inputs=" + escape( vals.join( "," ) ) + "&description=" + escape( this.description_text.value );
            var href = window.location.origin + window.location.pathname + "?" + qString; 
            this._buffer.push( qString );
            this.linkNode.href = href;
            this.linkNode.innerHTML = "Share " + this.characterNameInput.value;
        },
        _escape : function( str )
        {
            str = str.split( "," );
            str = str.join( "////" );
            return str;
        },
        _unescape : function( str )
        {
            str = str.split( "////" );
            str = str.join( "," );
            return str;
        },
        _populateFromStoredData : function( qString )
        {
            this._populating.push( 3 );
            this.clearAll();
            var kwObj = ioQuery.queryToObject( qString );
            var idxs = kwObj.selects.split( "," );
            var vals = kwObj.inputs.split( "," );
            this.descriptorSelect.selectedIndex = idxs[ 0 ];
            this.typeSelect.selectedIndex = idxs[ 1 ];
            this.focusSelect.selectedIndex = idxs[ 2 ];
            this.selectDescriptor();
            var sels = domQuery( "select", this.domNode );
            var inps = domQuery( "input[type=text]", this.domNode );
            console.log( "INPS", inps );
            for( var i = 3; i < idxs.length; i++ )
            {
                if( sels[ i ] )
                {
                    sels[ i ].selectedIndex = idxs[ i ];
                }
            }
            for( var i = 0; i < vals.length; i++ )
            {
                if( inps[ i ] )
                {
                    inps[ i ].value = this._unescape( vals[ i ] );
                    this.normalizeClass( inps[ i ] );
                }
            }
            this._checkCaps( "pool" );
            this._checkCaps( "edge" );
            this.description_text.set( "value", kwObj.description );
            this._populating.pop();
        }
    });
});