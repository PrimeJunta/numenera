/**
 * Shared utility methods.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-construct",
         "dojo/dom-class",
         "dojo/dom-style",
         "dojo/topic" ],
function( declare,
          lang,
          on,
          domConstruct,
          domClass,
          domStyle,
          topic )
{
    return declare([], {
        /**
         * Default field values. Will be cleared on focus.
         */
        DEFAULT_VALUES : {
            "a Hero of the Ninth World" : true,
            "a Stranger" : true,
            "choose" : true,
            "GM chooses" : true,
            "choose topic" : true,
            "choose any non-combat" : true,
            "enter description" : true,
            "enter the URL of your image" : true
        },
        /**
         * If inputNode.value is one of the defaults, adds valueNotSet class to it; else removes it.
         */
        normalizeClass : function( /* InputElement? */ inputNode )
        {
            if( !inputNode || !inputNode.nodeType )
            {
                if( !this.inputNode )
                {
                    return;
                }
                inputNode = this.inputNode;
            }
            if( this.DEFAULT_VALUES[ inputNode.value ] )
            {
                domClass.add( inputNode, "num-valueNotSet" );
            }
            else
            {
                domClass.remove( inputNode, "num-valueNotSet" );
            }
        },
        toTitleCase : function( str )
        {
            return str.replace( /\w\S*/g, function( txt ) {
                return txt.charAt( 0 ).toUpperCase() + txt.substr( 1 ).toLowerCase();
            });
        },
        intInputChanged : function( field )
        {
            var val = parseInt( field.value );
            if( isNaN( val ) )
            {
                field.value = "";
            }
            else
            {
                field.value = val;
            }
        },
        /**
         * Clears inputNode.value if it's one of the defaults defined in .manager.
         */
        selectContent : function( /* InputElement? */ inputNode )
        {
            if( !inputNode || !inputNode.nodeType )
            {
                if( !this.inputNode )
                {
                    return;
                }
                inputNode = this.inputNode;
            }
            if( this.DEFAULT_VALUES[ inputNode.value ] )
            {
                inputNode.value = "";
            }
        },
        /**
         * If no inputValue has been provided, sets it back to the original, and .normalizeClass.
         */
        onBlurInput : function( /* InputElement? */ inputNode )
        {
            if( !inputNode || !inputNode.nodeType )
            {
                if( !this.inputNode )
                {
                    return;
                }
                inputNode = this.inputNode;
            }
            if( inputNode.value == "" )
            {
                inputNode.value = this.inputValue ? this.inputValue : "";
            }
            this.dataChanged( inputNode );
            this.normalizeClass( inputNode );
        },
        /**
         * Publish event dataChanged, which will be picked up by _data.
         */
        dataChanged : function( /* InputElement? */ inputNode )
        {
            if( this.item && this.inputNode )
            {
                this.item.inputValue = this.inputNode.value;
            }
            if( this.item && this.selectNode )
            {
                this.item.selectIndex = this.selectNode.selectedIndex;
            }
            if( !inputNode || !inputNode.nodeType )
            {
                if( !this.inputNode && !this.selectNode )
                {
                    return;
                }
                inputNode = this.inputNode ? this.inputNode : this.selectNode;
            }
            topic.publish( "CharGen/dataChanged", inputNode );
        },
        /**
         * Iteratest through advancement up to tier, and creates options in selectNode from perk_lists in it.
         */
        populatePerkSelector : function( /* Object[] */ advancement, /* int */ tier, /* Element */ selectNode )
        {
            var tNode = selectNode;
            for( var i = tier; i > 0; i-- )
            {
                var opts = advancement[ i - 1 ].perk_list.split( "|" );
                var lbl =  "Tier " + i;
                if( tier > 1 )
                {
                    tNode = domConstruct.create( "optgroup", { label : lbl }, selectNode );
                }
                for( var o = 0; o < opts.length; o++ )
                {
                    domConstruct.create( "option", { innerHTML : opts[ o ] }, tNode );
                }
            }
        },
        /**
         * Sets value of all inputs matching fields to value.
         */
        setValues : function( fields, value )
        {
            for( var i = 0; i < fields.length; i++ )
            {
                this[ fields[ i ] ].value = value;
            }
        },
        /**
         * Sets disabled of all controls matching controls to state.
         */
        setDisabled : function( /* String[] */ controls, /* boolean */ state )
        {
            for( var i = 0; i < controls.length; i++ )
            {
                if( this[ controls[ i ] ].set )
                {
                    this[ controls[ i ] ].set( "disabled", state );
                }
                else
                {
                    this[ controls[ i ] ].disabled = state;
                }
            }
        },
        /**
         * Multiplies every member of stats by -1 and returns the result.
         */
        invertStats : function( /* Object */ stats )
        {
            if( !stats )
            {
                return;
            }
            var out = {};
            for( var o in stats )
            {
                out[ o ] = -stats[ o ];
            }
            return out;
        },
        removeMember : function( arr, member )
        {
            if( !arr )
            {
                return;
            }
            for( var i = 0; i < arr.length; i++ )
            {
                if( arr[ i ] == member )
                {
                    arr.splice( i, 1 );
                    return;
                }
            }
        },
        /**
         * Toggles the deleted property of every _ListItem in list whose .from property matches from.
         * So you can switch on/off e.g. everything from focus. If the relevant ability is a skill
         * upgraded to Specialized, downgrades/upgrades it to Trained instead.
         */
        _toggleDeletedAbilities : function( /* _ListItem[] */ list, /* String */ from )
        {
            for( var i = 0; i < list.length; i++ )
            {
                var cur = list[ i ];
                if( cur.from == from )
                {
                    var txt = cur.getText();
                    if( txt && cur.downgraded && txt.indexOf( "Ⓣ" ) == 0 )
                    {
                        cur.downgraded = false;
                        cur.baseText = "Ⓢ" + cur.baseText.substring( 1 );
                        cur.baseTextNode.innerHTML = cur.baseText;
                    }
                    else if( txt && txt.indexOf( "Ⓢ" ) == 0 )
                    {
                        cur.downgraded = true;
                        cur.baseText = "Ⓣ" + cur.baseText.substring( 1 );
                        cur.baseTextNode.innerHTML = cur.baseText;
                    }
                    else
                    {
                        if( cur.toggleDeleted )
                        {
                            cur.toggleDeleted();
                        }
                    }
                }
            }
        },
        /**
         * Sanitizes str before injection as innerHTML, to block script injection attacks.
         */
        _sanitize : function( /* String */ str )
        {
            str = "" + str;
            var out = str.replace( /\&/g, "&amp;" );
            var out = out.replace( /</g, "&lt;" );
            var out = out.replace( />/g, "&gt;" );
            return out;
        },
        /**
         * Returns value of selected item in sel as object with label and value properties.
         */
        selectValue : function( sel, /* String? */ val )
        {
            if( val )
            {
                for( var i = 0; i < sel.options.length; i++ )
                {
                    if( sel.options[ i ].value == val )
                    {
                        sel.options[ i ].selected = true;
                        break;
                    }
                }
            }
            return {
                "label" : sel.options[ sel.selectedIndex ].text,
                "value" : sel.options[ sel.selectedIndex ].value
            }
        },
        /**
         * Disables select matching aPoint, displays its value in matching DisabledDisplay,
         * hides the select, and shows the DisabledDisplay. We do all this for purely cosmetic
         * reasons, because we can't easily make a disabled select look like plain text through
         * CSS.
         */
        _disableSelect : function( /* String */ aPoint, /* boolean */ hideIfNull )
        {
            var sel = this[ aPoint ];
            var dd = this[ aPoint + "DisabledDisplay" ];
            if( !dd || !sel )
            {
                return;
            }
            sel.disabled = true;
            if( hideIfNull && this.selectValue( sel ).label == "-- choose --" )
            {
                this.domNode.style.display = "none";
            }
            else
            {
                this.domNode.style.display = this.domNode.tagName.toLowerCase() == "li" ? "list-item" : "tr" ? "table-row" : "block";
            }
            sel.style.display = "none";
            dd.innerHTML = this.selectValue( sel ).label;
            dd.style.display = "inline";
        },
        /**
         * Does the opposite of _disableSelect.
         */
        _enableSelect : function( /* String */ aPoint )
        {
            var sel = this[ aPoint ];
            var dd = this[ aPoint + "DisabledDisplay" ];
            if( !dd || !sel )
            {
                return;
            }
            sel.disabled = true;
            this.domNode.style.display = this.domNode.tagName.toLowerCase() == "li" ? "list-item" : "tr" ? "table-row" : "block";
            sel.disabled = false;
            sel.style.display = "inline-block";
            dd.innerHTML = "";
            dd.style.display = "none";

        }
    });
});