define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "./_ListItem" ],
function( declare,
          lang,
          topic,
          _ListItem )
{
    return declare([], {
        listAsText : function( list )
        {
            if( !this._lists || !this._lists[ list ] )
            {
                return [];
            }
            var _list = this._lists[ list ];
            var out = [];
            for( var i = 0; i < _list.length; i++ )
            {
                out.push( _list[ i ].getText() );
            }
            if( list == "special_list"  )
            {
                out = out.concat( this.listAsText( "bonus_list" ) );
                if( this._advancementControl )
                {
                    var alist = this._advancementControl.listAsText();
                    for( var i = 0; i < alist.length; i++ )
                    {
                        if( alist[ i ].charAt( 0 ) != "Ⓣ" )
                        {
                            out.push( alist[ i ] );
                        }
                    }
                }
            }
            else if( list == "ability_list" && this._advancementControl )
            {
                var alist = this._advancementControl.listAsText();
                for( var i = 0; i < alist.length; i++ )
                {
                    if( alist[ i ].charAt( 0 ) == "Ⓣ" )
                    {
                        out.push( alist[ i ] );
                    }
                }
            }
            out.sort();
            return out;
        },
        createListItem : function( listName, itemText, from, selIdx )
        {
            this._lists[ listName ].push( new _ListItem({
                manager : this,
                content : itemText,
                from : from,
                selectedIndex : selIdx,
                isUnlockable : listName == "special_list" ? true : false,
                remainsOpen : ( listName == "equipment_list" || listName == "cypher_list" ) ? true : false
            }).placeAt( this[ listName ] ) );
        },
        _writeSpecialList : function( /* Object */ type )
        {
            this.special_list_label.style.display = "block";
            var item = "${select:2:" + type.advancement[ 0 ].perk_list + "}";
            this._writeItem( "special_list", item, "type" );
        },
        _writeBonusList : function( /* Object */ focus )
        {
            this.bonus_list_label.style.display = "block";
            if( focus.advancement[ 0 ].bonus_perks )
            {
                this._writeItems( "bonus_list", focus.advancement[ 0 ].bonus_perks, "focus" );
            }
        },
        /**
         * Reads list items from from and writes them into each list in lists. The from property ends up in the
         * CSS class name for the list item; it's one of "desc", "type", "focus".
         */
        _appendToLists : function( /* Object */ lists, /* String */ from )
        {
            for( var o in lists )
            {
                this._appendToList( lists, o, from );
            }
        },
        /**
         * Shows list label and writes contents of lists[ list] into it.
         */
        _appendToList : function( /* Object */ lists, /* String */ list, /* String */ from )
        {
            if( !lists || !list || !lists[ list ] )
            {
                return;
            }
            this[ list + "_label" ].style.display = "block";
            var lst = lists[ list ];
            this._writeItems( list, lst, from );
        },
        _writeItems : function( listName, list, from )
        {
            for( var i = 0; i < list.length; i++ )
            {
                this._writeItem( listName, list[ i ], from );
            }
        },
        /**
         * Writes a list item from what, appends it to list matching where, and tags it with a CSS class
         * derived from from.
         */
        _writeItem : function( /* String */ where, /* String */ what, /* String */ from )
        {
            if( !this._listdata )
            {
                this._listdata = {};
            }
            if( !this._listdata[ where ] )
            {
                this._listdata[ where ] = [];
            }
            var found = false;
            if( what.indexOf( "Ⓣ" ) != -1 && what.indexOf( "${" ) == -1 )
            {
                for( var i = 0; i < this._listdata[ where ].length; i++ )
                {
                    if( what.toLowerCase() == this._listdata[ where ][ i ].text.toLowerCase() )
                    {
                        this._listdata[ where ][ i ].text = "Ⓢ" + what.substring( what.indexOf( "Ⓣ" ) + 1 );
                        this._listdata[ where ][ i ].from = from;
                        found = true;
                    }
                }
            }
            else if( what.indexOf( "${select:") != -1 )
            {
                var count = parseInt( what.substring( what.indexOf( "${select:" ) + 9, what.lastIndexOf( ":" ) ) );
                while( count > 0 )
                {
                    this._listdata[ where ].push({
                        from : from,
                        text : what
                    });
                    count--;
                }
                found = true;
            }
            if( !found )
            {
                this._listdata[ where ].push({
                    from : from,
                    text : what
                });
            }
        },
        _printLists : function()
        {
            topic.publish( "CharGen/destroyListItems" ); 
            this._lists = {};
            for( var o in this._listdata )
            {
                this._lists[ o ] = [];
                for( var i = 0; i < this._listdata[ o ].length; i++ )
                {
                    this.createListItem( o, this._listdata[ o ][ i ].text, this._listdata[ o ][ i ].from );
                }
            }
        }
    });
});