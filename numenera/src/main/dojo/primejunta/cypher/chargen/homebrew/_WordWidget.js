define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FieldControl",
         "./_TextControl",
         "./_StatControl",
         "./_ListControl",
         "./_AdvancementControl",
         "primejunta/ui/util",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          _FieldControl,
          _TextControl,
          _StatControl,
          _ListControl,
          _AdvancementControl,
          util,
          ContentPane )
{
    return declare([ ContentPane ],
    {
        instance : {},
        oid : "",
        has_advancement : false,
        has_special_list : false,
        feature_structure : {
            field_list : {
                id : {
                    label : "ID",
                    type : "id",
                    internal : true
                },
                label : {
                    label : "Name"
                },
                special_list_label : {
                    label : "Special ability name",
                    condition : "has_special_list"
                }
            },
            text_list : {
                description_text : {
                    label : "Description"
                },
                notes_text : {
                    label : "Notes"
                }
            },
            stats_list : {
                free_pool : {
                    label : "Free pool"
                },
                might_pool : {
                    label : "Might pool"
                },
                intellect_pool : {
                    label : "Intellect pool"
                },
                speed_pool : {
                    label : "Speed pool"
                },
                free_edge : {
                    label : "Free edge"
                },
                might_edge : {
                    label : "Might edge"
                },
                intellect_edge : {
                    label : "Intellect edge"
                },
                speed_edge : {
                    label : "Speed edge"
                },
                cypher_count : {
                    label : "Cypher limit"
                },
                shin_count : {
                    label : "Shins"
                },
                recovery_roll : {
                    label : "Recovery bonus"
                },
                armor_bonus : {
                    label : "Armor bonus"
                }
            },
            list_list : {
                ability_list : {
                    label : "Skills",
                    label_s : "a skill"
                },
                special_list : {
                    label : "Special abilities",
                    label_s : "a special ability"
                },
                bonus_list : {
                    label : "Bonus abilities",
                    label_s : "a bonus ability"
                },
                inability_list : {
                    label : "Inabilities",
                    label_s : "an inability"
                },
                equipment_list : {
                    label : "Equipment",
                    label_s : "equipment"
                },
                cypher_list : {
                    label : "Cyphers",
                    label_s : "a cypher"
                }
            },
            advancement : {
                stats : this.stats_list,
                bonus_perks : "list",
                perk_list : "choice"
            }
        },
        postMixInProperties : function()
        {
            this.inherited( arguments );
            this.title = util.prettify( this.instance.label );
        },
        postCreate : function()
        {
            this.inherited( arguments );
            this.field_list = new ContentPane({ content : "<h2>Names</h2>" } ).placeAt( this.containerNode );
            this.text_list = new ContentPane({ content : "<h2>Descriptions</h2>" } ).placeAt( this.containerNode );
            this.stats_list = new ContentPane({ content : "<h2>Stat Adjustments</h2>" } ).placeAt( this.containerNode );
            this.list_list = new ContentPane({ content : "<h2>Features</h2>" } ).placeAt( this.containerNode );
            if( this.has_advancement )
            {
                this.advancement = new ContentPane({ content : "<h2>Advancement</h2>" } ).placeAt( this.containerNode );
            }
            this._renderControls();
        },
        _renderControls : function()
        {
            this._feature_structure = lang.clone( this.feature_structure );
            for( var o in this._feature_structure.field_list )
            {
                this._feature_structure.field_list[ o ].control = new _FieldControl({ definition : this._feature_structure.field_list[ o ], instance : this.instance }).placeAt( this.field_list );
            }
            for( var o in this._feature_structure.text_list )
            {
                this._feature_structure.text_list[ o ].control = new _TextControl({ definition : this._feature_structure.text_list[ o ], instance : this.instance }).placeAt( this.text_list );
            }
            for( var o in this._feature_structure.stats_list )
            {
                this._feature_structure.stats_list[ o ].control = new _StatControl({ definition : this._feature_structure.stats_list[ o ], instance : this.instance }).placeAt( this.stats_list );
            }
            for( var o in this._feature_structure.list_list )
            {
                this._feature_structure.list_list[ o ].control = new _ListControl({ definition : this._feature_structure.list_list[ o ], instance : this.instance }).placeAt( this.list_list );
            }
            if( this.has_advancement )
            {
                this._feature_structure.advancement.control = new _AdvancementControl({ definition : this._feature_structure.advancement, instance : this.instance } ).placeAt( this.advancement );
            }
        }
    });
});