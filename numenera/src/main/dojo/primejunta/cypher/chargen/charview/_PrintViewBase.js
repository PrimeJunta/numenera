/**
 * Play view base. Builds on _PrintViewBase by adding some dynamic functionality.
 */
define([ "dojo/_base/declare",
         "dojo/cookie",
         "dojo/json",
         "dojo/dom-class",
         "dijit/form/CheckBox",
         "./_CharacterViewBase" ],
function( declare,
          cookie,
          json,
          domClass,
          CheckBox,
          _CharacterViewBase )
{
    return declare([ _CharacterViewBase ], {
        initializeCharacterData : function()
        {
        },
        postCreate : function()
        {
            this.inherited( arguments );
            this.updatePrint();
        },
        populateFields : function()
        {
            this.inherited( arguments );
            this._sv( "name_field_compact", "character_name" );
            this._sv( "descriptor_field_compact", "character_descriptor" );
            this._sv( "type_field_compact", "character_type" );
            this._sv( "focus_field_compact", "character_focus" );
            this._wl( "description_text_compact", "description_text" );
            this._wl( "notes_text_compact", "notes_text" );
        },
        closeMe : function()
        {
            this.manager.closePrintView();
        },
        /**
         * Triggered after you've changed your print settings. Shows/hides some fields according to them.
         */
        updatePrint : function()
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
            }
            else
            {
                this.shin_count.style.visibility = "visible";
            }
            if( !settings.showXP )
            {
                this.character_xp.style.visibility = "hidden";
            }
            else
            {
                this.character_xp.style.visibility = "visible";
            }
            if( !settings.showCyphers )
            {
                this.cypher_list.style.visibility = "hidden";
            }
            else
            {
                this.cypher_list.style.visibility = "visible";
            }
            if( settings.compactView )
            {
                domClass.add( this.domNode, "cr-compactRecord" );
            }
            else
            {
                domClass.remove( this.domNode, "cr-compactRecord" );
            }
        }
    });
});