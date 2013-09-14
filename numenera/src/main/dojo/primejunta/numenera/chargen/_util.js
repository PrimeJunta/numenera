define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class",
         "dojo/dom-style",
         "dojo/topic" ],
function( declare,
          lang,
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
            "enter description" : true
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