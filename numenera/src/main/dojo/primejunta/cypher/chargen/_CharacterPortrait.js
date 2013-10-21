define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "./_PortraitSelector",
         "./_UtilityMixin",
         "dojo/text!./templates/_CharacterPortrait.html" ],
function( declare,
          lang,
          topic,
          Dialog,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          _PortraitSelector,
          _UtilityMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        templateString : template,
        inputValue : "enter the URL of your image",
        portraitHome : "",
        height : 350,
        portraits : 0,
        postCreate : function()
        {
            topic.subscribe( "CharGen/pleaseReset", lang.hitch( this, this.clear ) );
            setTimeout( lang.hitch( this, this._populateGallery ), 1000 );
        },
        openSelector : function()
        {
            this.selectorDialog.show();
        },
        closeSelector : function()
        {
            this.selectorDialog.hide();
        },
        portraitSelected : function( src )
        {
            this.setHref( src );
            this.inputNode.value = this.inputValue;
            this.tmNode.style.display = "block";
            this.closeSelector();
        },
        dataChanged : function()
        {
            if( !this.isValid( this.inputNode.value ) )
            {
                this.inputNode.value = this.inputValue;
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
        isTM : function()
        {
            return ( this.tmNode.style.display != "none" );
        },
        setImage : function()
        {
            this.setHref( this.inputNode.value, true );
            this.tmNode.style.display = "none";
            this.closeSelector();
        },
        getHref : function()
        {
            return this.imageNode.getAttribute( "src" );
        },
        setHref : function( href, validate )
        {
            if( validate && !this.isValid( href ) )
            {
                this.clear();
                return;
            }
            else
            {
                if( !href || href == "null" )
                {
                    this.clear();
                    return;
                }
                else if( href.indexOf( "http" ) == 0 )
                {
                    this.tmNode.style.display = "none";
                }
                else
                {
                    this.tmNode.style.display = "block";
                }
            }
            href = this._normalizeHref( href );
            this.imageNode.setAttribute( "src", href );
            this.inputContainer.style.display = "none";
            this.imageContainer.style.display = "block";
        },
        clear : function()
        {
            this.imageNode.setAttribute( "src", "" );
            this.inputContainer.style.display = "block";
            this.imageContainer.style.display = "none";
        },
        /**
         * Because we changed portrait gallery from PNG to JPEG and don't want to break people's portraits
         */
        _normalizeHref : function( href )
        {
            if( href.indexOf( this.portraitHome + "/p" ) == 0 && href.indexOf( ".png" ) != -1 )
            {
                return href.substring( 0, href.indexOf( ".png" ) ) + ".jpg";
            }
            else
            {
                return href;
            }
        },
        _populateGallery : function()
        {
            for( var i = 0; i < this.portraits; i++ )
            {
                var iw = new _PortraitSelector({ manager : this, src : this.portraitHome + "/p" + i + ".jpg" }).placeAt( this.imageList );
            }
        }
    });
});
