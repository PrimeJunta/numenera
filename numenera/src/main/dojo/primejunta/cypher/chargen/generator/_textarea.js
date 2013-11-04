/**
 * Methods for handling dijit/form/Textarea-related features in character generator..
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic" ],
function( declare,
          lang,
          topic )
{
    return declare([], {
        /**
         * We're using dijit/form/Textareas for textareas. They have the annoying characteristic of emitting
         * events after timeouts. This means they'll slip out from under our normal "populating programmatically"
         * flag, and spam the Ctrl-Z timeline. We get around this with a _taConnected flag we unset onChange, and
         * set onKeyDown. This means the actual dataChanged event will only fire if the user has typed in the field
         * since the last change.
         */
        descriptionUpdated : function()
        {
            if( this._taConnected )
            {
                topic.publish( "CharGen/dataChanged" );
                this._taConnected = false;
            }
        },
        /**
         * Connected to textarea's onKeyUp event. Makes subsequent onChange events fire; the onChange event will
         * unset it again. This way we ensure that only user-entered changes are logged. See also descriptionUpdated.
         */
        connectTextareaListener : function()
        {
            this._taConnected = true;
        },
        /**
         * Replaces line idx in textarea where with what, or adds it if not present.
         */
        _writeLine : function( /* Textarea */ where, /* String */ what, /* int */ idx )
        {
            var txt = this[ where ].get( "value" );
            var ta = txt.split( "\n" );
            while( ta.length < idx + 1 )
            {
                ta.push( "" );
            }
            ta[ idx ] = what;
            this[ where ].set( "value", ta.join( "\n" ) );
        },
        /**
         * Appends what to Textarea where on a new line.
         */
        _appendToText : function( /* Textarea */ where, /* String */ what )
        {
            if( what )
            {
                this[ where ].set( "value", this[ where ].get( "value" ) + what + "\n" );
            }
        }
    });
});