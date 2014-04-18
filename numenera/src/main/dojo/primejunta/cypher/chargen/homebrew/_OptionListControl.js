define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "./_OptionTextBox",
         "dojo/Evented",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dojo/text!./templates/_OptionListControl.html" ],
function( declare,
          lang,
          on,
          _OptionTextBox,
          Evented,
          _WidgetBase,
          _TemplatedMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, Evented ], {
        title : "",
        parent : {},
        value : "",
        templateString : template,
        buildRendering : function()
        {
            this.inherited( arguments );
            this._newOpt = new _OptionTextBox({ parent : this, value : "", add : true }).placeAt( this.newOptionNode );
            this._newOpt.own( on( this._newOpt, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            })));

            if( !this.value )
            {
                this.value = "";
            }
            this._opts = [];
        },
        postCreate : function()
        {
            this.set( "value", this.value );
        },
        createOptions : function( opts )
        {
            for( var i = 0; i < opts.length; i++ )
            {
                this.addItem( opts[ i ] );
            }
        },
        addItem : function( val )
        {
            var opt = new _OptionTextBox({ parent : this, value : val }).placeAt( this.optionsNode );
            opt.own( on( opt, "change", lang.hitch( this, function( evt ) {
                this.emit( "change", evt );
            })));
            this._opts.push( opt );
            this.emit( "change", { bubbles : true, cancelable : true });
        },
        plzAddItem : function( widg )
        {
            var val = widg.get( "value" );
            if( val )
            {
                this.addItem( val );
                widg.set( "value", "" );
            }
        },
        destroyItem : function( widg )
        {
            this._opts.splice( this._opts.indexOf( widg ), 1 );
            widg.destroy();
            this.emit( "change", { bubbles : true, cancelable : true });
        },
        set : function( prop, val )
        {
            if( prop == "value" )
            {
                this.clear();
                if( !val )
                {
                    this.value = [];
                }
                else if( lang.isString( val ) )
                {
                    this.value = val.split( "|" );
                }
                else if( val instanceof Array )
                {
                    this.value = val;
                }
                this.createOptions( this.value );
            }
            else
            {
                this.inherited( arguments );
            }
        },
        get : function( prop )
        {
            if( prop == "value" )
            {
                var opts = [];
                for( var i = 0; i < this._opts.length; i++ )
                {
                    var _o = this._opts[ i ].get( "value" );
                    if( _o )
                    {
                        opts.push( _o )
                    }
                }
                if( this._newOpt && this._newOpt.get( "value" ) )
                {
                    opts.push( this._newOpt.get( "value" ) );
                }
                return opts.join( "|" );
            }
            else if( prop == "length" )
            {
                return this._opts.length;
            }
            else
            {
                return this.inherited( arguments );
            }
        },
        clear : function()
        {
            while( this._opts.length > 0 )
            {
                this._opts.pop().destroy();
            }
            this._newOpt.set( "value", "" );
        }
    });
});