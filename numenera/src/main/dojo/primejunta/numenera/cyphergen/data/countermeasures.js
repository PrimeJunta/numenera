define({
    countermeasure : {
        prob : 20,
        "name" : "countermeasure",
        cypher_name : [ "countermeasure", "force shield projector" ],
        // cures one or more debuffs or "all", one or more status effects or "all" 
        item_types : {
            "consumable" : {
                prob : 20,
                actions : [ "ingested" ]
            },
            "handheld" : {
                prob : 80,
                actions : [ "activated", "injected" ]
            },
            "worn" : {
                prob : 100,
                actions : [ "activated" ]
            },
            "placed" : {
                prob : 30,
                actions : [ "activated" ],
                range : [ "#none/200", "immediate/80", "short/10", "long/5", "extreme/1" ]
            }
        },
        durations : [ "one round", "ten rounds", "ten minutes", "one hour", "one day" ],
        duration_probs : [ 1, 2, 4, 2, 1 ]
        // buffs one or more buff_types, or protects against one or more damage_types
    }
});