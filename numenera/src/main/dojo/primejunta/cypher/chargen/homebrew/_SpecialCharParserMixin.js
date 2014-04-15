define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on" ],
function( declare, lang, on )
{
    return declare([], {
        specialCharsIn : "TSEAIa",
        specialCharsOut : "ⓉⓈⒺⒶⒾⓐ",
        setSpecialCharListener : function( textControl )
        {
            this._monitoredControl = textControl;
            this.own( on( textControl, "keyup", lang.hitch( this, this.checkSpecialChars )));
        },
        checkSpecialChars : function()
        {
            var val = this._monitoredControl.get( "value" );
            val = val.replace( /[\$\{\}]/g, "" );
            var idx = this.specialCharsIn.indexOf( val.charAt( 0 ) );
            if( val.charAt( 1 ) == " " && idx != -1 )
            {
                val = this.specialCharsOut.charAt( idx ) + val.substring( 1 );
            }
            this._monitoredControl.set( "value", val );
        }
    });
});