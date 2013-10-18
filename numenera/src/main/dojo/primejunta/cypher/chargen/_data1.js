define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dojo/io-query",
         "dojo/query" ],
function( declare,
          lang,
          topic,
          ioQuery,
          domQuery )
{
    return declare([], {
        _getCharacterDataV1 : function()
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
                tier : this.statsWidget.character_tier.value,
                cyphers : this.statsWidget.cypher_count.value,
                selects : idxs.join( this._listDelimiter ),
                inputs : vals.join( this._listDelimiter ),
                extra_equipment_text : this.extra_equipment_text.value,
                notes_text : this.notes_text.value,
                description_text : this.description_text.value,
                img : this.statsWidget.portraitWidget.getHref(),
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
        _populateFromDataV1 : function( /* String */ qString )
        {
            this._populating.push( 3 );
            this.clearAll();
            var kwObj = ioQuery.queryToObject( qString );
            if( kwObj.img )
            {
                this.statsWidget.portraitWidget.setHref( kwObj.img );
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
                this.statsWidget.moveCaps();
            }
            this.statsWidget.checkCaps();
            var d = 0;
            for( var i = 0; i < this._controls.length; i++ )
            {
                if( this._controls[ i ].isDeletable )
                {
                    if( dels[ d ] == "1" )
                    {
                        this._controls[ i ].deleteMe();
                    }
                    d++;
                }
            }
            this.description_text.set( "value", kwObj.description_text );
            this.notes_text.set( "value", kwObj.notes_text );
            this.extra_equipment_text.set( "value", kwObj.extra_equipment_text );
            this._populating.pop();
            topic.publish( "CharGen/pleaseCheckState" );
        }
    });
});