define({
    weapon : {
        prob : 50,
        "name" : "weapon",
        "damage_types" : [ "physical/80", "status/60" ],
        // produces one or more damage_types, buff_types, or status_types with an effect_type and action_type
        item_types : {
            "handheld" : {
                prob : 50,
                actions : [ "aimed and fired", "used in melee", "thrown" ]
            },
            "worn" : {
                prob : 30,
                actions : [ "aimed and fired", "used in melee" ]
            },
            "placed" : {
                prob : 50,
                actions : [ "aimed and fired", "set and triggered" ]
            }
        },
        action_types : {
            "thrown" : {
                range : [ "immediate/10", "short/50", "long/10" ],
                "effect_types" : [ "causes a blast", "covers a zone" ],
                cypher_name : [ "grenade" ]
            },
            "aimed and fired" : {
                range : [ "short/30", "long/50", "extreme/10" ]
            },
            "set and triggered" : {
                range : [ "immediate/30", "short/30", "long/50", "extreme/10" ]
            },
            "used in melee" : {
                range : [ "immediate" ],
                "effect_types" : [ "strikes" ]
            }
        },
        effect_types : {
            "shoots a beam" : {
                prob : 50,
                cypher_name : [ "ray emitter" ],
                range : [ "short/10", "medium/30", "long/50", "extreme/10" ],
                area : [ -2, 0 ]
            },
            "shoots a slug" : {
                prob : 50,
                cypher_name : [ "slugthrower" ],
                range : [ "short/10", "medium/50", "long/50" ],
                area : [ -2, 0 ]
            },
            "shoots a hunter-killer missile" : {
                prob : 20,
                cypher_name : [ "hunter-killer" ],
                range : [ "medium/30", "long/80", "extreme/120" ],
                area : [ 0, 0 ],
                cypher_class : "occultic"
            },
            "causes a blast" : {
                prob : 50,
                cypher_name : [ "bomb", "detonation" ],
                range : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                area : [ 0, 1 ]
            },
            "sprays an arc" : {
                prob : 20,
                cypher_name : [ "thrower" ],
                range : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                area : [ 0, 0 ]
            },
            "covers a zone" : {
                prob : 20,
                cypher_name : [ "field emitter", "gas canister" ],
                range : [ "short/50", "medium/20", "long/10", "extreme/10" ],
                area : [ 0, 1 ],
                cypher_class : "occultic"
            },
            "strikes" : {
                prob : 0,
                cypher_name : [ "sword", "lance", "spear", "saber", "mace", "dagger" ],
                range : [ "immediate" ],
                area : [ 0, 0 ]
            }
        },
        durations : [ "for one round/10", "for ten minutes/30", "for one hour/10" ],
        range_types : [ "immediate", "short", "medium", "long", "extreme" ],
        radius_types : [ "single target", "small area", "medium area", "large area", "huge area" ]
    }
});