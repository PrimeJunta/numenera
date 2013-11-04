/**
 * Methods for handling strange recursions in CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/query",
         "dojo/Deferred",
         "dijit/registry",
         "../_RecursionInitializer" ],
function( declare,
          lang,
          domClass,
          domQuery,
          Deferred,
          registry,
          _RecursionInitializer )
{
    return declare([], {
        /**
         * Where recursion data will be.
         */
        _recursionData : {},
        initializeRecursions : function()
        {
            for( var o in this.recursions )
            {
                var label = this.toTitleCase( o.replace( /_/g, " " ) );
                this.recursionSelect.options[ this.recursionSelect.options.length ] = new Option( label, o );
            }
            this._doSetOrigin( this.DEFAULT_ORIGIN );
        },
        setOrigin : function( originId )
        {
            var deferred = new Deferred();
            this.transitionOut().then( lang.hitch( this, function() {
                this._doSetOrigin( originId );
                this.transitionIn( "splash", deferred );
            }));
            return deferred;
        },
        changeRecursion : function()
        {
            var rec = this.selectValue( this.recursionSelect ).value;
            var label = this.selectValue( this.recursionSelect ).label;
            if( this.recursion == rec )
            {
                return;
            }
            // check if I have any recursion data
            if( this._recursionData[ rec ] )
            {
                //     store current focus data for this.recursion
                //     destroy focus data and recreate from it
                this.storeRecursionData( this.recursion );
                this.putRecursionData( this._recursionData[ rec ] );
                this.autoSave();
            }
            else
            {
                //     open dialog that lets me pick focus, then
                //     store current focus data for this.recursion
                //     destroy focus data and recreate from choice
                var dlog = new _RecursionInitializer({ manager : this });
                dlog.initializeRecursion( rec, label ).then( lang.hitch( this, function( focusId )
                {
                    this.storeRecursionData( this.recursion );
                    this.setRecursion( rec, focusId );
                    this.updateFocus( this.getFocus() );
                    this.autoSave();
                }));
            }
        },
        setRecursion : function( rec, focusId )
        {
            this.recursion = rec;
            this.focusSelect.options.length = 1;
            this.foci = this.recursions[ rec ];
            this.initializeSelect( "focusSelect", this.recursions[ rec ] );
            if( focusId )
            {
                this.selectValue( this.focusSelect, focusId );
            }
            this.selectValue( this.recursionSelect, rec );
            this.updatePhrase();
        },
        storeRecursionData : function( recursion )
        {
            this._recursionData[ recursion ] = this.getFocusData();
        },
        putRecursionData : function( data )
        {
            this.setRecursion( data.recursion_id, data.focus_id );
            this.updateFocus( this.recursions[ data.recursion_id ][data.focus_id ] );
            var sels = data.focus_selects.split( this._listDelimiter );
            var inps = data.focus_inputs.split( this._listDelimiter );
            var disb = data.focus_disabled;
            var dels = data.focus_deleted;
            var itms = domQuery( ".cg-focus", this.domNode );
            for( var i = 0; i < itms.length; i++ )
            {
                var widg = registry.byId( itms[ i ].getAttribute( "widgetid" ) );
                var _sels = domQuery( "select.cg-storeMe", itms[ i ] );
                for( var s = 0; s < _sels.length; s++ )
                {
                    _sels[ s ].selectedIndex = parseInt( sels.shift() );
                    _sels[ s ].disabled = disb.charAt( 0 ) == "1" ? true : false;
                    disb = disb.substring( 1 );
                }
                var _inps = domQuery( "input.cg-storeMe", itms[ i ] );
                for( var s = 0; s < _inps.length; s++ )
                {
                    _inps[ s ].value = inps.shift();
                    _inps[ s ].disabled = disb.charAt( 0 ) == "1" ? true : false;
                    disb = disb.substring( 1 );
                }
                if( dels.charAt( 0 ) == "1" )
                {
                    widg.deleteMe();
                }
                dels = dels.substring( 1 );
                if( widg )
                {
                    widg.checkState();
                }
            }
        },
        getFocusData : function()
        {
            // extract all focus-related user-input data from main + advancement, return it as kwObj
            var itms = domQuery( ".cg-focus", this.domNode );
            var sels = [], inps = [], disb = [], dels = [];
            for( var i = 0; i < itms.length; i++ )
            {
                var _sels = domQuery( "select.cg-storeMe", itms[ i ] );
                for( var s = 0; s < _sels.length; s++ )
                {
                    sels.push( _sels[ s ].selectedIndex );
                    disb.push( _sels[ s ].disabled ? 1 : 0 );
                }
                var _inps = domQuery( "input.cg-storeMe", itms[ i ] );
                for( var s = 0; s < _inps.length; s++ )
                {
                    inps.push( _inps[ s ].value );
                    disb.push( _inps[ s ].disabled ? 1 : 0 );
                }
                if( domClass.contains( itms[ i ], "num-deletedItem" ) )
                {
                    dels.push( 1 );
                }
                else
                {
                    dels.push( 0 );
                }
            }
            return {
                recursion_id : this.recursion,
                focus_id : this.selectValue( this.focusSelect ).value,
                focus_selects : sels.join( this._listDelimiter ),
                focus_inputs : inps.join( this._listDelimiter ),
                focus_disabled : disb.join( "" ),
                focus_deleted : dels.join( "" )
            }
        },
        getFlatRecursionData : function()
        {
            var out = {
                recursions : []
            };
            for( var o in this._recursionData )
            {
                out.recursions.push( o );
                for( var r in this._recursionData[ o ] )
                {
                    out[ o + "_" + r ] = this._recursionData[ o ][ r ];
                }
            }
            out.recursions = out.recursions.join( "," );
            return out;
        },
        readRecursionData : function( kwObj )
        {
            var recs = kwObj.recursions.split( "," );
            for( var i = 0; i < recs.length; i++ )
            {
                this._recursionData[ recs[ i ] ] = {
                    recursion_id : recs[ i ],
                    focus_id : kwObj[ recs[ i ] + "_focus_id" ],
                    focus_selects : kwObj[ recs[ i ] + "_focus_selects" ],
                    focus_inputs : kwObj[ recs[ i ] + "_focus_inputs" ],
                    focus_disabled : kwObj[ recs[ i ] + "_focus_disabled" ],
                    focus_deleted : kwObj[ recs[ i ] + "_focus_deleted" ]
                };
            }
        },
        _doSetOrigin : function( originId )
        {
            domClass.remove( document.body, "cg-origin-" + this.origin );
            domClass.add( document.body, "cg-origin-" + originId );
            this.origin = originId;
            this.types = this.origins[ originId ].types;
            this.descriptors = this.origins[ originId ].descriptors;
            this.featAdjustments = this.origins[ originId ].featAdjustments;
            this.featStackingExceptions = this.origins[ originId ].featStackingExceptions;
            this.optionalData = this.origins[ originId ].optionalData;
            this.setRecursion( this.origins[ originId ].defaultRecursion );
            this.writePhraseSelects();
        }
    });
});