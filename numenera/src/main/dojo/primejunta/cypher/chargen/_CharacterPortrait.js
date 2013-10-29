define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/request/xhr",
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
          xhr,
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
        postCreate : function()
        {
            topic.subscribe( "CharGen/pleaseReset", lang.hitch( this, this.clear ) );
            this.countPortraits();
        },
        /**
         * Requests directory from server, extracts images from it, calls _populateGallery on it. We don't want
         * any server components other than a regular web server, so we're looking directly at the HTML returned
         * by it.
         */
        countPortraits : function()
        {
            xhr.get( this.portraitHome + "/", { handleAs : "text" }).then( lang.hitch( this, function( resp ) {
                var imgs = resp.match( /\"(\w+\.jpg)\"/gm );
                for( var i = 0; i < imgs.length; i++ )
                {
                    imgs[ i ] = imgs[ i ].replace( /\"/g, "" );
                }
                this._populateGallery( imgs );
            }));
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
                topic.publish( "CharGen/dataChanged", this.inputNode );
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
            this.dataChanged();
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
            if( href.indexOf( "/p" ) != -1 && href.indexOf( ".png" ) != -1 )
            {
                href = href.substring( 0, href.indexOf( ".png" ) ) + ".jpg";
            }
            if( href.indexOf( "primejunta" ) == 0 && href.indexOf( "portraits" ) != -1 )
            {
                href = this.portraitHome + href.substring( href.lastIndexOf( "/" ) );
            }
            return href;
        },
        _populateGallery : function( imgs )
        {
            var iw = new _PortraitSelector({ manager : this, src : this.portraitHome + "/" + imgs.pop() }).placeAt( this.imageList );
            if( imgs.length > 0 )
            {
                setTimeout( lang.hitch( this, this._populateGallery, imgs ), 100 )
            }
        }
    });
});
