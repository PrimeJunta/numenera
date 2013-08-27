/**
 * Character generation utility for Monte Cook's Numenera RPG system. Numenera is (c) Monte Cook Games LLC, 2013.
 * This utility is an unofficial project by Petteri Sulonen. No rights reserved -- feel free to reuse as you wish.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/io-query",
         "dojo/on",
         "dojo/topic",
         "dojo/dom-class",
         "dojo/query",
         "dijit/form/Textarea",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_ListItem",
         "./_CharacterRecord",
         "./data/descriptors",
         "./data/types",
         "./data/foci",
         "dojo/text!./templates/CharacterGenerator.html" ],
function( declare,
          lang,
          array,
          ioQuery,
          on,
          topic,
          domClass,
          domQuery,
          Textarea,
          _WidgetBase,
          _TemplatedMixin, 
          _WidgetsInTemplateMixin,
          _ListItem,
          _CharacterRecord,
          descriptors,
          types,
          foci,
          template )
{
    return declare( "primejunta/numenera/chargen/CharacterGenerator", [ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        /**
         * Cap for pools
         */
        pool_cap : 20,
        /**
         * Cap for edge.
         */
        edge_cap : 1,
        /**
         * Descriptor data.
         */
        descriptors : descriptors,
        /**
         * Type data.
         */
        types : types,
        /**
         * Focus data.
         */
        foci : foci,
        /**
         * Template.
         */
        templateString : template,
        /**
         * Path to icons and other graphic goodies.
         */
        iconSrc : require.toUrl( "primejunta/numenera/chargen/themes/images" ),
        /**
         * Initialize selects from data, and connect onclick handlers to all of the UI buttons.
         */
        postCreate : function()
        {
            var loaderNode = domQuery( "div.cg-noJavaScript" )[ 0 ];
            loaderNode.style.display = "none";
            this._buffer = [];
            this._populating = [];
            this.initializeSelect( "descriptorSelect", descriptors, true );
            this.initializeSelect( "typeSelect", types );
            this.initializeSelect( "focusSelect", foci );
            topic.subscribe( "CharGen/dataChanged", lang.hitch( this, this.updateLink ) );
            on( document, "keyup", lang.hitch( this, this.handleKeyUp ) );
            on( this.characterNameInput, "keydown", lang.hitch( this, this.normalizeClass, this.characterNameInput ) );
            on( this.characterNameInput, "click", lang.hitch( this.characterNameInput, this.characterNameInput.select ) );
            on( this.characterNameInput, "focus", lang.hitch( this.characterNameInput, this.characterNameInput.select ) );
            on( this.characterNameInput, "change", lang.hitch( this, this.updateLink ) );
            on( this.increment_might_pool, "click", lang.hitch( this, this._adjust, "might", "pool", 1 ) );
            on( this.increment_might_edge, "click", lang.hitch( this, this._adjust, "might", "edge", 1 ) );
            on( this.increment_speed_pool, "click", lang.hitch( this, this._adjust, "speed", "pool", 1 ) );
            on( this.increment_speed_edge, "click", lang.hitch( this, this._adjust, "speed", "edge", 1 ) );
            on( this.increment_intellect_pool, "click", lang.hitch( this, this._adjust, "intellect", "pool", 1 ) );
            on( this.increment_intellect_edge, "click", lang.hitch( this, this._adjust, "intellect", "edge", 1 ) );
            on( this.decrement_might_pool, "click", lang.hitch( this, this._adjust, "might", "pool", -1 ) );
            on( this.decrement_might_edge, "click", lang.hitch( this, this._adjust, "might", "edge", -1 ) );
            on( this.decrement_speed_pool, "click", lang.hitch( this, this._adjust, "speed", "pool", -1 ) );
            on( this.decrement_speed_edge, "click", lang.hitch( this, this._adjust, "speed", "edge", -1 ) );
            on( this.decrement_intellect_pool, "click", lang.hitch( this, this._adjust, "intellect", "pool", -1 ) );
            on( this.decrement_intellect_edge, "click", lang.hitch( this, this._adjust, "intellect", "edge", -1 ) );
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
        descriptionUpdated : function()
        {
            if( this._taConnected )
            {
                this.updateLink();
                this._taConnected = false;
            }
        },
        connectTextareaListener : function()
        {
            this._taConnected = true;
        },
        populateFromQueryString : function()
        {
            this._populateFromStoredData( window.location.search.substring( 1 ) );
            this.updateLink();
        },
        /**
         * Iterate through data and write an option into select at attach point, with text = member.label and 
         * value = position in array, for each member.
         */
        initializeSelect : function( /* String */ select, /* Object[] */ data )
        {
            var sel = this[ select ];
            for( var i = 0; i < data.length; i++ )
            {
                var cur = data[ i ];
                var label = data[ i ].label;
                var opt = new Option( label, i );
                sel.options[ sel.options.length ] = opt;
            }
        },
        /**
         * Triggered when user picks a selector from the list. Sets the article on the page to "a" or "an",
         * depending, and continues with updateValues.
         */
        selectDescriptor : function()
        {
            this._populating.push( 1 );
            var label = this._selVal( this.descriptorSelect ).label;
            var _art = "an"
            if( "AEIOUYaeiouy".indexOf( label.charAt( 0 ) ) == -1 )
            {
                _art = "a";
            }
            this.articleNode.innerHTML = _art;
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        selectType : function()
        {
            this._populating.push( 4 );
            this.updateValues();
            this._populating.pop();

            this.updateLink();
        },
        selectFocus : function()
        {
            this._populating.push( 5 );
            this.updateValues();
            this._populating.pop();
            this.updateLink();
        },
        /**
         * Clears the UI, finds the data for the descriptor, type, and focus the user has picked, enables
         * edge assignment if the type has free edge to assign, and populates fields and lists from the selected
         * values. Finally _checkCaps to disable increment controls for pools >= 20.
         */
        updateValues : function()
        {
            this._populating.push( 2 );
            this._clear();
            var di = this.descriptorSelect.selectedIndex - 1;
            var ti = this.typeSelect.selectedIndex - 1;
            var fi = this.focusSelect.selectedIndex - 1;
            var type = ti >= 0 ? types[ ti ] : false;
            var desc = di >= 0 ? descriptors[ di ] : false;
            var focus = fi >= 0 ? foci[ fi ] : false;
            if( !type )
            {
                this._populating.pop();
                return;
            }
            else
            {
                if( type.stats.free_edge > 0 )
                {
                    this._setDisabled([ "increment_might_edge", "increment_speed_edge", "increment_intellect_edge" ], false );
                }
                else
                {
                    this._setDisabled([ "increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
                }
                this._assign( type.stats );
                this._appendToLists( type.lists, "type" );
                this.special_list_label.innerHTML = type.special_list_label;
                this.result_pane.style.display = "block";
                this._setDescription( type );
            }
            if( desc )
            {
                this._augment( desc.stats );
                this._appendToLists( desc.lists, "desc" );
                this._setDescription( desc );
            }
            if( focus )
            {
                this._augment( focus.stats );
                this._appendToLists( focus.lists, "focus" );
                this._setDescription( focus );
            }
            this._checkCaps( "pool" );
            this._printLists();
            this._populating.pop();
            this.updateLink();
        },
        normalizeClass : function( node )
        {
            domClass.remove( node, "cg-valueNotSet" );
        },
        makePrint : function()
        {
            if( this._printWidget )
            {
                this._printWidget.destroy();
            }
            this.domNode.style.display = "none";
            this._printWidget = new _CharacterRecord({ manager : this }).placeAt( document.body );
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
            var inps = domQuery( "input", this.domNode );
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
        clearAll : function()
        {
            this._clear();
            this.descriptorSelect.selectedIndex = 0;
            this.typeSelect.selectedIndex = 0;
            this.focusSelect.selectedIndex = 0;
            this.characterNameInput.value = "a hero of the Ninth World";
            domClass.add( this.characterNameInput, "cg-valueNotSet" );
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
            var inps = domQuery( "input", this.domNode );
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
        },
        _setDescription : function( from )
        {
            if( from.description_text )
            {
                this.description_text.set( "value", this.description_text.focusNode.value + from.description_text + "\n" );
            }
        },
        /**
         * Adjust value of field:
         * * stat = "might"|"speed"|"intellect"
         * * prop = "pool" | "edge"
         * * by = integer, normally 1 or -1.
         * Disables decrement control if the new value hits the floor defined in type, and checkCpas..
         */
        _adjust : function( /* String */ stat, /* String */ prop, /* int */ by )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            var _to = parseInt( this[ stat + "_" + prop ].value );
            _from += -by;
            _to += by;
            this[ "free_" + prop ].value = _from;
            this[ stat + "_" + prop ].value = _to;
            // Check control states
            this._checkCaps( prop );
            this.updateLink();
        },
        /**
         * If there's no free pool to assign, disable increment pool controls. Else enable them if they're below
         * 20.
         */
        _checkCaps : function( prop )
        {
            var _from = parseInt( this[ "free_" + prop ].value );
            this[ "decrement_might_" + prop ].disabled = ( parseInt( this[ "might_" + prop ].value ) == this[ "might_" + prop + "_floor" ] );
            this[ "decrement_speed_" + prop ].disabled = ( parseInt( this[ "speed_" + prop ].value ) == this[ "speed_" + prop + "_floor" ] );
            this[ "decrement_intellect_" + prop ].disabled = ( parseInt( this[ "intellect_" + prop ].value ) == this[ "intellect_" + prop + "_floor" ] );
            this[ "increment_might_" + prop ].disabled = ( parseInt( this[ "might_" + prop ].value ) >= this[ prop + "_cap" ] || _from == 0 );
            this[ "increment_speed_" + prop ].disabled = ( parseInt( this[ "speed_" + prop ].value ) >= this[ prop + "_cap" ] || _from == 0  );
            this[ "increment_intellect_" + prop ].disabled = ( parseInt( this[ "intellect_" + prop ].value ) >= this[ prop + "_cap" ] || _from == 0  );
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
            for( var i = 0; i < lst.length; i++ )
            {
                this._writeItem( list, lst[ i ], from );
            }
        },
        /**
         * Writes a list item from what, appends it to list matching where, and tags it with a CSS class
         * derived from from.
         */
        _writeItem : function( /* String */ where, /* String */ what, /* String */ from )
        {
            if( !this._lists )
            {
                this._lists = {};
            }
            if( !this._lists[ where ] )
            {
                this._lists[ where ] = [];
            }
            var found = false;
            if( what.indexOf( "Trained:" ) != -1 && what.indexOf( "${" ) == -1 )
            {
                for( var i = 0; i < this._lists[ where ].length; i++ )
                {
                    if( what == this._lists[ where ][ i ].text )
                    {
                        this._lists[ where ][ i ].text = "<span class=\"cg-specialized\">Specialized:" + what.substring( what.indexOf( "Trained:" ) + 8 ) + "</span>";
                        this._lists[ where ][ i ].from = from;
                        found = true;
                    }
                }
            }
            else if( what.indexOf( "${select:") != -1 )
            {
                var count = parseInt( what.substring( what.indexOf( "${select:" ) + 9, what.lastIndexOf( ":" ) ) );
                while( count > 0 )
                {
                    this._lists[ where ].push({
                        from : from,
                        text : what
                    });
                    count--;
                }
                found = true;
            }
            if( !found )
            {
                this._lists[ where ].push({
                    from : from,
                    text : what
                });
            }
        },
        _printLists : function()
        {
            for( var o in this._lists )
            {
                for( var i = 0; i < this._lists[ o ].length; i++ )
                {
                    this._lists[ o ][ i ] = new _ListItem({ content : this._lists[ o ][ i ].text, from : this._lists[ o ][ i ].from }).placeAt( this[ o ] );
                }
            }
        },
        /**
         * Iterates through stats and writes each item's value into the matching input in template.
         */
        _assign : function( /* Object */ stats )
        {
            for( var o in stats )
            {
                this._setStat( o, stats[ o ] );
            }
        },
        /**
         * Iterates through stats and adds each item's value to value of matching input in template (as int).
         */
        _augment : function( /* Object */ stats )
        {
            if( !stats )
            {
                return;
            }
            for( var o in stats )
            {
                this._setStat( o, stats[ o ] + parseInt( this[ o ].value ) );
            }
        },
        /**
         * Writes val into field matching stat, and stores it as floor for adjustments.
         */
        _setStat : function( stat, val )
        {
            this[ stat ].value = val;
            this[ stat + "_floor" ] = val;
        },
        /**
         * Sets disabled of all controls matching controls to state.
         */
        _setDisabled : function( /* String[] */ controls, /* boolean */ state )
        {
            for( var i = 0; i < controls.length; i++ )
            {
                this[ controls[ i ] ].disabled = state;
            }
        },
        /**
         * Sets value of all inputs matching fields to value.
         */
        _setValues : function( /* String[] */ fields, /* String */ value )
        {
            for( var i = 0; i < fields.length; i++ )
            {
                this[ fields[ i ] ].value = value;
            }
        },
        /**
         * Returns value of selected item in sel as object with label and value properties.
         */
        _selVal : function( sel )
        {
            return {
                "label" : sel.options[ sel.selectedIndex ].text,
                "value" : sel.options[ sel.selectedIndex ].value
            }
        },
        /**
         * Resets the control to its pristine state.
         */
        _clear : function()
        {
            for( var o in this._lists )
            {
                this[ o + "_label" ].style.display = "none";
                while( this._lists[ o ].length > 0 )
                {
                    this._lists[ o ].pop().destroy();
                }
            }
            this.description_text.set( "value", "" );
            this.result_pane.style.display = "none";
            this._setDisabled([ "increment_might_pool", "decrement_might_pool", "increment_speed_pool", "decrement_speed_pool", "increment_intellect_pool", "decrement_intellect_pool","increment_might_edge", "decrement_might_edge", "increment_speed_edge", "decrement_speed_edge", "increment_intellect_edge", "decrement_intellect_edge" ], true );
            this._setValues([ "might_pool", "speed_pool", "intellect_pool", "might_edge", "speed_edge", "intellect_edge", "free_pool", "free_edge", "shin_count", "cypher_count", "armor_bonus" ], "" );
            var lists = [ "ability_list", "inability_list", "special_list", "equipment_list", "bonus_list", "connection_list", "reference_list" ];
            this.updateLink();
        }
    });
});