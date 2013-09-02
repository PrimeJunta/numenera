define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "./_CharacterValidator",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_CharacterRecord.html" ],
function( declare,
          lang,
          Button,
          _CharacterValidator,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin ], {
        TRAINED_STR : "Ⓣ",
        SPECIALIZED_STR: "Ⓢ",
        iconSource : require.toUrl( "primejunta/numenera/chargen/themes/images" ),
        manager : {},
        templateString : template,
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
            this._sv( "description_text", "description_text" );
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
            this._wl( "special_list", "special_list" );
            this._wl( "cypher_list", "cypher_list" );
            this._wl( "equipment_list", "equipment_list" );
            this._wl( "notes_list", "reference_list" );
        },
        closeMe : function()
        {
            this.manager.domNode.style.display = "block";
            this.destroy();
        },
        _wl : function( to, ln )
        {
            var out = "";
            var list = this.character[ ln ];
            if( !list )
            {
                console.log( "Hu?", ln );
                return;
            }
            while( list.length > 0 )
            {
                out += list.shift() + "<br/>";
            }
            this[ to ].innerHTML = out;
        },
        _sv : function( to, from )
        {
            this[ to ].innerHTML = this.character[ from ];
        }
    });
});