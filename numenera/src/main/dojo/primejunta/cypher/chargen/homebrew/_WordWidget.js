define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-construct",
         "./_FieldControl",
         "./_TextControl",
         "./_StatControl",
         "./_ListControl",
         "./_AdvancementControl",
         "primejunta/ui/util",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          domConstruct,
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
        stat_constraints : {},
        has_advancement : false,
        has_stats : true,
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
                    label : "Shins",
                    stat_constraints : {
                        max : 99,
                        pattern : "+#0;-#0"
                    }
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
        populate : function()
        {
            if( this._populated )
            {
                return;
            }
            this._populated = true;
            this.field_list = new ContentPane({ "innerHTML" : "<h1>" + this.title + "</h1>" } ).placeAt( this.containerNode );
            this.text_list = new ContentPane({ } ).placeAt( this.containerNode );
            if( this.has_stats )
            {
                var st = domConstruct.create( "table", { "width" : "100%" } );
                domConstruct.create( "caption", { "innerHTML" : "<h2>Stats</h2>" }, st );
                var tb = domConstruct.create( "tbody", {}, st );
                var r1 = domConstruct.create( "tr", {}, tb );
                var r2 = domConstruct.create( "tr", {}, tb );
                this.stats_list_1 = domConstruct.create( "td", {}, r1 );
                this.stats_list_2 = domConstruct.create( "td", {}, r1 );
                this.stats_list_3 = domConstruct.create( "td", {}, r2 );
                this.stats_list_4 = domConstruct.create( "td", {}, r2 );
                var cp = new ContentPane().placeAt( this.containerNode );
                cp.set( "content", st );
            }
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
                if( this._isRendered( o ) )
                {
                    this._feature_structure.field_list[ o ].control = new _FieldControl({
                        field_id : o,
                        definition : this._feature_structure.field_list[ o ],
                        instance : this.instance }).placeAt( this.field_list );
                }
            }
            for( var o in this._feature_structure.text_list )
            {
                this._feature_structure.text_list[ o ].control = new _TextControl({ field_id : o,
                    definition : this._feature_structure.text_list[ o ],
                    instance : this.instance }).placeAt( this.text_list );
            }
            if( this.has_stats )
            {
                var s = 0;
                for( var o in this._feature_structure.stats_list )
                {
                    var nref = ( s < 4 ? "1" : s < 8 ? "2" : s < 10 ? "3" : 4 );
                    this._feature_structure.stats_list[ o ].control = new _StatControl({ field_id : o,
                         definition : this._feature_structure.stats_list[ o ],
                         instance : this.instance,
                         stat_constraints : this.stat_constraints }).placeAt( this[ "stats_list" + "_" + nref ] );
                    s++;
                }
            }
            for( var o in this._feature_structure.list_list )
            {
                this._feature_structure.list_list[ o ].control = new _ListControl({ path : "lists",
                     field_id : o,
                     definition : this._feature_structure.list_list[ o ],
                     instance : this.instance }).placeAt( this.list_list );
            }
            if( this.has_advancement )
            {
                this._feature_structure.advancement.control = new _AdvancementControl({ path : "advancement",
                    field_id : o,
                    definition : this._feature_structure.advancement,
                    instance : this.instance } ).placeAt( this.advancement );
            }
        },
        _isRendered : function( fld )
        {
            if( this._feature_structure.field_list[ fld ].internal )
            {
                return false;
            }
            if( this._feature_structure.field_list[ fld ].condition && !this[ this._feature_structure.field_list[ fld ].condition ] )
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    });
});