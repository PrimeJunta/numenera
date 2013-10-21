/**
 * Methods for handling lists in CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/topic",
         "dojo/query",
         "dojo/dom-construct",
         "./_ListItem" ],
function( declare,
          lang,
          array,
          topic,
          domQuery,
          domConstruct,
          _ListItem )
{
    return declare([], {
        /**
         * Collects list data from the form. Merges in data from _AdvancementControl if present.
         * 
         * TODO: maybe move some or all of this logic to _CharacterValidator instead.
         */
        listAsText : function( /* String */  listName )
        {
            if( !this._lists || !this._lists[ listName ] )
            {
                return [];
            }
            var _list = this._lists[ listName ];
            var out = [];
            for( var i = 0; i < _list.length; i++ )
            {
                if( _list[ i ].getText() )
                {
                    out.push( _list[ i ].getText() );
                }
            }
            if( listName == "special_list"  )
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
            else if( listName == "ability_list" && this._advancementControl )
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
        /**
         * Creates a _ListItem from itemText and from, and puts it in this[ listName ]. The from value ends
         * up in a CSS class in it.
         */
        createListItem : function( /* String */ listName, /* Object */ itemData )
        {
            if( !this._controls )
            {
                this._controls = [];
            }
            if( !this._lists[ listName ] )
            {
                this[ listName + "_label" ].style.display = "block";
                this._lists[ listName ] = [];
            }
            var itm =  new _ListItem({
                manager : this,
                listName : listName,
                item : itemData,
                isUnlockable : listName == "special_list" ? true : false,
                isDeletable : listName == "equipment_list" ? true : false,
                remainsOpen : ( listName == "equipment_list" || listName == "cypher_list" ) ? true : false
            });
            var refNode = this[ listName ];
            var pos = "last";
            switch( itemData.from[ 0 ] )
            {
                case "type" :
                    var ndes = domQuery( "li.cg-desc", this[ listName ] );
                    if( ndes.length == 0 )
                    {
                        ndes = domQuery( "li.cg-focus", this[ listName ] );
                    }
                    if( ndes.length > 0 )
                    {
                        refNode = ndes[ 0 ];
                        pos = "before";
                    }
                    break;
                case "desc" :
                    var ndes = domQuery( "li.cg-focus", this[ listName ] );
                    if( ndes.length > 0 )
                    {
                        refNode = ndes[ 0 ];
                        pos = "before";
                    }
                    break;
                case "focus" :
                    break;
                default :
                    refNode = this[ listName ];
                    pos = "last";
            }
            
            domConstruct.place( itm.domNode, refNode, pos );
            this._lists[ listName ].push( itm );
            this._controls.push( itm );
            this[ listName + "_label" ].style.display = "block";
            return itm;
        },
        removeListItem : function( li )
        {
            this.removeMember( this._controls, li );
            this.removeMember( this._lists[ li.listName ], li );
            if( this._lists[ li.listName ] && this._lists[ li.listName ].length == 0 )
            {
                this[ li.listName + "_label" ].style.display = "none";
            }
        },
        updateCypherList : function()
        {
            var n = parseInt( this.statsWidget.cypher_count.value );
            while( this._lists.cypher_list.length > n )
            {
                this._lists.cypher_list.pop().destroy();
            }
            this.augmentCypherList( n );
        },
        /**
         * Special case: a starting character gets two special abilities, so we read the first-tier perk list
         * and write in two selectors for that.
         */
        _writeSpecialList : function( /* Object */ type )
        {
            this.special_list_label.style.display = "block";
            var item = "${select:2:" + type.advancement[ 0 ].perk_list + "}";
            this._writeItem( "special_list", item, "type" );
        },
        /**
         * Read bonus_perks from focus and write them into bonus_list. We keep the lists separate on the character
         * creation screen to make it easier to see what comes from where; on the sheet they'll all be in the same
         * place since it doesn't really matter anymore.
         */
        _writeBonusList : function( /* Object */ focus )
        {
            this.bonus_list_label.style.display = "block";
            if( focus.advancement[ 0 ].bonus_perks )
            {
                this._writeItems( "bonus_list", focus.advancement[ 0 ].bonus_perks, "focus" );
            }
        },
        /**
         * Adds enough new rows in the cypher list to match count.
         */
        augmentCypherList : function( /* String|int */ count )
        {
            if( !this._lists || !this._lists.cypher_list )
            {
                return;
            }
            var count = parseInt( count );
            while( this._lists.cypher_list.length < count )
            {
                this.createListItem( "cypher_list", { text : "${input:GM chooses}", from : [ "type" ]});
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
        /**
         * Writes items from list into this[ listName ], flagged with from. 
         */
        _writeItems : function( listName, list, from )
        {
            for( var i = 0; i < list.length; i++ )
            {
                this._writeItem( listName, list[ i ], from );
            }
        },
        /**
         * Writes a list item from what, appends it to list matching where, and tags it with a CSS class
         * derived from from. Also merges two identical Ⓣraineds into one Ⓢpecialized. Note that we will
         * do further such merges when validating a character; however it's nice to see this "live" as it
         * were when you pick your type, selector, and focus.
         */
        _writeItem : function( /* String */ where, /* String */ what, /* String */ from )
        {
            if( !this._listdata )
            {
                this._listdata = {};
            }
            if( !this._listdata[ where ] )
            {
                this._listdata[ where ] = [];
            }
            var found = false;
            if( what.indexOf( "Ⓣ" ) != -1 && what.indexOf( "${" ) == -1 )
            {
                for( var i = 0; i < this._listdata[ where ].length; i++ )
                {
                    if( this._listdata[ where ][ i ] && what.toLowerCase() == this._listdata[ where ][ i ].text.toLowerCase() )
                    {
                        this._listdata[ where ][ i ].text = "Ⓢ" + what.substring( what.indexOf( "Ⓣ" ) + 1 );
                        this._listdata[ where ][ i ].from.push( from );
                        if( this._listdata[ where ][ i ].widget )
                        {
                            this._listdata[ where ][ i ].widget.updateRendering();
                        }
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
                        from : [ from ],
                        text : what
                    });
                    count--;
                }
                found = true;
            }
            if( !found )
            {
                this._listdata[ where ].push({
                    from : [ from ],
                    text : what
                });
            }
        },
        clearItems : function( from )
        {
            for( var o in this._listdata )
            {
                for( var i = 0; i < this._listdata[ o ].length; i++ )
                {
                    var cur = this._listdata[ o ][ i ];
                    if( cur && array.indexOf( cur.from, from ) != -1 )
                    {
                        if( cur.from.length == 1 )
                        {
                            if( cur.widget )
                            {
                                cur.widget.destroy();
                            }
                            this._listdata[ o ].splice( i, 1 );
                            i--;
                        }
                        else
                        {
                            cur.from.splice( array.indexOf( cur.from, from ), 1 );
                            cur.text = "Ⓣ" + cur.text.substring( cur.text.indexOf( "Ⓢ" ) + 1 );
                            cur.widget.updateRendering();
                        }
                    }
                }
                if( this._listdata[ o ].length == 0 )
                {
                    this[ o + "_label" ].style.display = "none";
                }
            }
        },
        /**
         * Emits an event that nukes any existing list items and recreates the lists.
         */
        _printLists : function()
        {
            //topic.publish( "CharGen/destroyListItems" ); 
            if( !this._lists )
            {
                this._lists = {};
            }
            for( var o in this._listdata )
            {
                if( !this._lists[ o ] )
                {
                    this._lists[ o ] = [];
                }
                for( var i = 0; i < this._listdata[ o ].length; i++ )
                {
                    if( this._listdata[ o ][ i ] && !this._listdata[ o ][ i ].widget )
                    {
                        this._listdata[ o ][ i ].widget = this.createListItem( o, this._listdata[ o ][ i ] );
                    }
                }
            }
        }
    });
});