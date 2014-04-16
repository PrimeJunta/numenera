define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-construct",
         "dojo/dom-class",
         "./_FieldControl",
         "./_TextControl",
         "./_StatPane",
         "./_ListControl",
         "./_AdvancementControl",
         "dijit/layout/ContentPane" ],
function( declare,
          lang,
          on,
          domConstruct,
          domClass,
          _FieldControl,
          _TextControl,
          _StatPane,
          _ListControl,
          _AdvancementControl,
          ContentPane )
{
    return declare([ ContentPane ],
    {
        parent : {},
        instance : {},
        oid : "",
        is_homebrew : false,
        feature_properties : {
            stat_constraints : {},
            has_advancement : false,
            has_stats : true,
            has_special_list : false
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
            recovery_roll : {
                label : "Recovery bonus"
            },
            armor_bonus : {
                label : "Armor bonus"
            }
        },
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
            stats_list : "_stats",
            list_list : {
                ability_list : {
                    label : "Skills",
                    label_s : "a skill"
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
                    condition : "has_special_list",
                    label : "Cyphers",
                    label_s : "a cypher"
                }
            },
            advancement : {
                stats : {
                    type : "stats"
                },
                bonus_perks : {
                    label : "Bonus abilities",
                    type : "list"
                },
                perk_list : {
                    label : "Perks",
                    type : "choice",
                    condition : "has_special_list"
                }
            }
        },
        postMixInProperties : function()
        {
            this.feature_structure.stats_list = this.stats_list;
            this.feature_structure.advancement.stats.stats_list = this.stats_list;
        },
        populate : function()
        {
            if( this._populated )
            {
                return;
            }
            this._populated = true;
            domConstruct.create( "h1", { "innerHTML" : this.title }, this.containerNode );
            this.baseFieldContainer = new ContentPane({ "class" : "cg-baseFieldContainer" } ).placeAt( this.containerNode );
            this.field_list = new ContentPane({} ).placeAt( this.baseFieldContainer );
            this.text_list = new ContentPane({} ).placeAt( this.baseFieldContainer );
            this._feature_structure = lang.clone( this.feature_structure );
            if( this.feature_properties.has_stats )
            {
                this._statsPane = new _StatPane({
                    feature_properties : this.feature_properties,
                    feature_structure : this._feature_structure,
                    parent : this.parent,
                    instance : this.instance
                }).placeAt( this.containerNode );
            }
            this.list_list = new ContentPane({} ).placeAt( this.containerNode );
            if( this.feature_properties.has_advancement )
            {
                this.advancement = new ContentPane({ content : "<h2>Advancement</h2>" } ).placeAt( this.containerNode );
            }
            this._renderControls();
        },
        getData : function()
        {
            this.instance.is_homebrew = true;
            return this.instance;
        },
        save : function()
        {
            this.parent.save( this );
        },
        onClose : function()
        {
            var cf = confirm( "Are you sure you want to delete " + this.title + "?" );
            if( cf )
            {
                this.parent.delete( this );
                return true;
            }
        },
        _renderControls : function()
        {
            for( var o in this._feature_structure.field_list )
            {
                if( this._isRendered( o, "field_list" ) )
                {
                    this._feature_structure.field_list[ o ]._control = new _FieldControl({
                        parent : this,
                        field_id : o,
                        definition : this._feature_structure.field_list[ o ],
                        instance : this.instance }).placeAt( this.field_list );
                }
            }
            for( var o in this._feature_structure.text_list )
            {
                this._feature_structure.text_list[ o ]._control = new _TextControl({
                    parent : this,
                    field_id : o,
                    definition : this._feature_structure.text_list[ o ],
                    instance : this.instance }).placeAt( this.text_list );
            }
            for( var o in this._feature_structure.list_list )
            {
                if( this._isRendered( o, "list_list" ) )
                {
                    this._feature_structure.list_list[ o ]._control = new _ListControl( {
                        path : "lists",
                        parent : this,
                        field_id : o,
                        definition : this._feature_structure.list_list[ o ],
                        instance : this.instance } ).placeAt( this.list_list );
                }
            }
            if( this.feature_properties.has_advancement )
            {
                this._feature_structure.advancement._control = new _AdvancementControl({
                    parent : this,
                    field_id : "advancement",
                    definition : this._feature_structure.advancement,
                    feature_properties : this.feature_properties,
                    instance : this.instance } ).placeAt( this.advancement );
            }
        },
        _isRendered : function( fld, nde )
        {
            if( this._feature_structure[ nde ][ fld ].internal )
            {
                return false;
            }
            if( this._feature_structure[ nde ][ fld ].condition && !this.feature_properties[ this._feature_structure[ nde ][ fld ].condition ] )
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