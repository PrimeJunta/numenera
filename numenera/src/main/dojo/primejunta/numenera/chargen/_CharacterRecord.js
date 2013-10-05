/**
 * Printable character record. Connected to CharacterGenerator, and uses _CharacterValidator to
 * process and validate the data. Much of the beef is actually in the template.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/cookie",
         "dojo/json",
         "dijit/form/Button",
         "./_util",
         "./_CharacterValidator",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterRecord.html" ],
function( declare,
          lang,
          cookie,
          json,
          Button,
          _util,
          _CharacterValidator,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _util ], {
        /**
         * If a string starts with this, it means a skill in which you're trained.
         */
        TRAINED_STR : "Ⓣ",
        /**
         * If a string starts with this, it means a skill in which you're specialized.
         */
        SPECIALIZED_STR: "Ⓢ",
        /**
         * Image source.
         */
        iconSource : require.toUrl( "primejunta/numenera/themes/images" ),
        /**
         * CharacterGenerator which contains the data to be displayed.
         */
        manager : {},
        /**
         * Template. A lot of the beef is here.
         */
        templateString : template,
        /**
         * A boring method which mostly just gets data from CharacterGenerator and puts it in fields here,
         * using utility methods.
         */
        postCreate : function()
        {
            window.scroll( 0, 0 );
            var vtor = new _CharacterValidator({ manager : this.manager });
            this.character = vtor.analyzeCharacter();
            this._sv( "name_field", "character_name" );
            this._sv( "descriptor_field", "character_descriptor" );
            this._sv( "type_field", "character_type" );
            this._sv( "focus_field", "character_focus" );
            this._sv( "character_tier", "character_tier" );
            this._sv( "character_effort", "character_effort" );
            this._sv( "might_pool", "might_pool" );
            this._sv( "might_edge", "might_edge" );
            this._sv( "speed_pool", "speed_pool" );
            this._sv( "speed_edge", "speed_edge" );
            this._sv( "intellect_pool", "intellect_pool" );
            this._sv( "intellect_edge", "intellect_edge" );
            this._sv( "recovery_roll", "recovery_roll" );
            this._sv( "cypher_count", "cypher_count" );
            this._sv( "shin_count", "shin_count" );
            this._sv( "character_xp", "character_xp" );
            this._sv( "armor_value_none", "armor_value_none" );
            this._sv( "armor_value_light", "armor_value_light" );
            this._sv( "armor_value_medium", "armor_value_medium" );
            this._sv( "armor_value_heavy", "armor_value_heavy" );
            this._sv( "armor_speed_cost_heavy", "armor_speed_cost_heavy" );
            this._sv( "armor_might_cost_heavy", "armor_might_cost_heavy" );
            this._sv( "armor_speed_cost_medium", "armor_speed_cost_medium" );
            this._sv( "armor_might_cost_medium", "armor_might_cost_medium" );
            this._sv( "armor_speed_cost_light", "armor_speed_cost_light" );
            this._sv( "armor_might_cost_light", "armor_might_cost_light" );
            this._wl( "attack_list", "attack_list" );
            this._wl( "ability_list", "ability_list" );
            this._wl( "inability_list", "inability_list" );
            this._wl( "special_list", "special_list" );
            this._wl( "cypher_list", "cypher_list" );
            this._wl( "equipment_list", "equipment_list" );
            this._wl( "description_text", "description_text" );
            this._wl( "notes_list", "notes_list" );
            this.portrait_src = this.manager.portraitWidget.getHref();
            if( this.portrait_src )
            {
                console.log( "PSRC", this.portrait_src, this.manager.portraitWidget.isTM() );
                this.portraitImage.setAttribute( "src", this.portrait_src );
                this.portraitImage.style.visibility = "visible";
                if( this.manager.portraitWidget.isTM() )
                {
                    console.log( "BLOCK" );
                    this.portraitTMNode.style.display = "block";
                }
                else
                {
                    console.log( "NONE" )
                    this.portraitTMNode.style.display = "none";
                }
            }
            else
            {
                this.portraitImage.style.visibility = "hidden";
            }
            if( this.character.inability_list.length > 0 )
            {
                this.inabilityContainer.style.display = "block";
            }
            this._updatePrint();
        },
        /**
         * Self-destructs and shows manager.domNode.
         */
        closeMe : function()
        {
            this.destroy();
            this.manager.domNode.style.display = "block";
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
        },
        /**
         * Utility method. Writes contents of this.character[ ln ] into field matching to.
         */
        _wl : function( /* String */ fieldName, /* String */ listName )
        {
            var out = "";
            var list = this.character[ listName ];
            if( !list )
            {
                return;
            }
            var count = 1;
            for( var i = 0; i < list.length; i++ )
            {
                if( i > 0 )
                {
                    if( list[ i ] == list[ i - 1 ] )
                    {
                        count++;
                    }
                    else if( count > 1 )
                    {
                        out += " (× " + count + ")<br/>" + this._sanitize( list[ i ] );
                        count = 0;
                    }
                    else
                    {
                        out += "<br/>" + this._sanitize( list[ i ] );
                    }
                }
                else
                {
                    out += this._sanitize( list[ i ] );
                }
            }
            this[ fieldName ].innerHTML = out;
        },
        /**
         * Writes data from character[ from ] into this[ fieldName ].
         */
        _sv : function( /* String */ fieldName, /* String */ from )
        {
            this[ fieldName ].innerHTML = this._sanitize( this.character[ from ] );
        }
    });
});