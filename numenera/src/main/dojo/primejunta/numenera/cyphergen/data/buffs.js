define({
    buff : {
        prob : 20,
        "name" : "buff",
        // cures one or more debuffs or "all", one or more status effects or "all" 
        item_types : {
            "consumable" : {
                prob : 80,
                actions : [ "ingested", "injected" ]
            },
            "handheld" : {
                prob : 30,
                actions : [ "activated", "injected" ]
            },
            "worn" : {
                prob : 30,
                actions : [ "activated" ]
            },
            "placed" : {
                prob : 10,
                actions : [ "activated" ],
                range : [ "#none/200", "immediate/80", "short/10", "long/5", "extreme/1" ]
            }
        },
        durations : [ "one round/10", "ten minutes/30", "one hour/30", "one day/10" ]
        // buffs one or more buff_types, or protects against one or more damage_types
    }
});