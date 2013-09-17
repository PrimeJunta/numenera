define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "dojo/dom-class",
         "dojo/dom-style",
         "dojo/topic" ],
function( declare,
          lang,
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
        normalizeClass : function( inputNode )
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
                domClass.add( inputNode, "cg-valueNotSet" );
            }
            else
            {
                domClass.remove( inputNode, "cg-valueNotSet" );
            }
        },
        /**
         * Clears inputNode.value if it's one of the defaults defined in .manager.
         */
        selectContent : function( inputNode )
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
        onBlurInput : function( inputNode )
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
                if( !this.inputNode )
                {
                    return;
                }
                inputNode.value = this.inputValue ? this.inputValue : "";
            }
            this.normalizeClass( inputNode );
        },
        /**
         * Publish event dataChanged, which will be picked up by _data.
         */
        dataChanged : function( inputNode )
        {
            if( !inputNode || !inputNode.nodeType )
            {
                if( !this.inputNode )
                {
                    return;
                }
                inputNode = this.inputNode;
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
         * Sanitizes str before injection as innerHTML, to block script injection attacks.
         */
        _sanitize : function( str )
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
        _selVal : function( sel, /* String? */ val )
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
        }
    });
});