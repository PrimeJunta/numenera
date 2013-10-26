/**
 * Play view base. Builds on _PrintViewBase by adding some dynamic functionality.
 */
define([ "dojo/_base/declare",
         "dojo/cookie",
         "./_CharacterViewBase" ],
function( declare,
          cookie,
          _CharacterViewBase )
{
    return declare([ _CharacterViewBase ], {
        postCreate : function()
        {
            this.inherited( arguments );
            this._updatePrint();
        },
        /**
         * You can control a few print settings. They're stored in a cookie.
         */
        printSettingsChanged : function()
        {
            cookie( "printSettings", json.stringify({
                showShins : this.showShinsCheckbox.checked,
                showXP : this.showXPCheckbox.checked,
                showCyphers : this.showCyphersCheckbox.checked
            }), { expires : 30 });
            this._updatePrint();
        },
        closeMe : function()
        {
            this.manager.closePrintView();
        },
        /**
         * Triggered after you've changed your print settings. Shows/hides some fields according to them.
         */
        _updatePrint : function()
        {
            var settings = cookie( "printSettings" );
            if( !settings )
            {
                return;
            }
            try
            {
                settings = json.parse( settings );
            }
            catch( e )
            {
                cookie( "printSettings", null, { expires : -1 });
                return;
            }
            if( !settings.showShins )
            {
                this.shin_count.style.visibility = "hidden";
                this.showShinsCheckbox.checked = false;
            }
            else
            {
                this.shin_count.style.visibility = "visible";
            }
            if( !settings.showXP )
            {
                this.character_xp.style.visibility = "hidden";
                this.showXPCheckbox.checked = false;
            }
            else
            {
                this.character_xp.style.visibility = "visible";
            }
            if( !settings.showCyphers )
            {
                this.cypher_list.style.visibility = "hidden";
                this.showCyphersCheckbox.checked = false;
            }
            else
            {
                this.cypher_list.style.visibility = "visible";
            }
        }
    });
});