define([ "dojo/_base/declare",
         "dojo/_base/lang" ],
function( declare,
          lang ) {
    return declare([], {
        has_advancement : false,
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
        text_list : {
            description_text : {
                label : "Description"
            },
            notes_text : {
                label : "Notes"
            }
        },
        field_list : {
            id : {
                label : "ID",
                internal : true // type only
            },
            label : {
                label : "Name"
            },
            special_list_label : {
                label : "Special ability list title" // type only
            },
            special_list_label : {
                label : "Special ability name" // type only
            }
        },
        advancement : {
            stats : this.stats_list,
            bonus_perks : "list",
            perk_list : "choice"
        }
    });
});