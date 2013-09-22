define({
    cure : {
        prob : 50,
        "name" : "cure",
        "damage_types" : [ "physical/80", "status/60" ],
        // cures one or more debuffs or "all", one or more status effects or "all" 
        item_types : {
            "consumable" : {
                prob : 80,
                actions : [ "ingested" ]
            },
            "handheld" : {
                prob : 30,
                actions : [ "activated/30", "injected/70" ]
            },
            "worn" : {
                prob : 30,
                actions : [ "activated" ]
            },
            "placed" : {
                prob : 10,
                actions : [ "activated" ],
                range : [ "#none/200", "immediate/200", "short/10", "long/5", "extreme/1" ]
            }
        }
    }
});