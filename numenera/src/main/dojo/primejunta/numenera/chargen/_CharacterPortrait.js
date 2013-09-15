define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_util",
         "dojo/text!./templates/_CharacterPortrait.html" ],
function( declare,
          lang,
          topic,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          _util,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _util ], {
        templateString : template,
        inputValue : "enter the URL of your image",
        height : 350,
        dataChanged : function()
        {
            if( !this.isValid( this.inputNode.value ) )
            {
                this.inputNode.value = "";
                this.onBlurInput( this.inputNode );
            }
            else
            {
                this.inherited( arguments );
            }
        },
        isValid : function( val )
        {
            var re = /^(http(?:s)?\:\/\/[a-zA-Z0-9\-]+(?:\.[a-zA-Z0-9\-]+)*\.[a-zA-Z]{2,6}(?:\/?|(?:\/[\w\-\.]+)*)(?:\/?|\/\w+\.[a-zA-Z]{2,4}(?:\?[\w]+\=[\w\-\.]+)?)?(?:\&[\w\-\.]+\=[\w\.\-]+)*)$/;
            return re.test( val );
        },
        setImage : function()
        {
            this.setHref( this.inputNode.value );
        },
        changeImage : function()
        {
            this.inputContainer.style.display = "block";
            this.imageContainer.style.display = "none";
        },
        getHref : function()
        {
            return this.imageNode.getAttribute( "src" );
        },
        setHref : function( href )
        {
            if( !this.isValid( href ) )
            {
                this.imageNode.setAttribute( "src", "" );
                return;
            }
            this.imageNode.setAttribute( "src", href );
            this.inputContainer.style.display = "none";
            this.imageContainer.style.display = "block";
        }
    });
});
