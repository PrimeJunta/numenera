define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-class",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/LinkButton.html" ],
function( declare,
          lang,
          on,
          domClass,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare( [ _WidgetBase, _TemplatedMixin ], {
        link : "",
        iconClass : "",
        download : "",
        label : "",
        templateString : template,
        postMixInProperties : function()
        {
            if( this.srcNodeRef )
            {
                if( this.srcNodeRef.innerHTML != "" )
                {
                    this.label = this.srcNodeRef.innerHTML;
                }
                if( this.srcNodeRef.getAttribute( "href" ) )
                {
                    this.href = this.srcNodeRef.getAttribute( "href" );
                }
                if( this.srcNodeRef.getAttribute( "download" ) )
                {
                    this.download = this.srcNodeRef.getAttribute( "download" );
                }
            }
            this.inherited( arguments );
        },
        postCreate : function()
        {
            this.own( on( this.domNode, "mouseover", lang.hitch( this, this._style, "mouseover" ) ) );
            this.own( on( this.domNode, "mouseout", lang.hitch( this, this._style, "mouseout" ) ) );
            this.own( on( this.domNode, "mousedown", lang.hitch( this, this._style, "mousedown" ) ) );
            this.own( on( this.domNode, "mouseup", lang.hitch( this, this._style, "mouseup" ) ) );
        },
        _style : function( mouseEvent )
        {
            switch( mouseEvent )
            {
                case "mouseover" :
                    domClass.add( this.domNode, "dijitButtonHover" );
                    break;
                case "mouseout" :
                    domClass.remove( this.domNode, "dijitButtonHover" );
                    domClass.remove( this.domNode, "dijitButtonActive" );
                    break;
                case "mousedown" :
                    domClass.add( this.domNode, "dijitButtonActive" );
                    break;
                case "mouseup" :
                    domClass.remove( this.domNode, "dijitButtonActive" );
            }
        }
    });
});