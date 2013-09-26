define({
    weapon : {
        prob : 60,
        "name" : "weapon",
        "damage_types" : [ "physical/80", "status/40", "special/1" ],
        // produces one or more damage_types, buff_types, or status_types with an effect_type and action_type
        item_types : {
            "handheld" : {
                prob : 50,
                actions : [ "aimed and fired/10", "used in melee/5", "thrown/10", "broken/10", "activated/5" ]
            },
            "attachment" : {
                prob : 50,
                actions : [ "attached to a melee weapon and activated", "attached to a projectile and activated", "attached to a ranged weapon and activated", "attached to a blunt weapon and activated", "attached to a bladed weapon and activated" ]
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
            },
            "broken" : {
                range : [ "immediate/2", "short/4", "medium/4", "long/2", "extreme/1" ],
                "effect_types" : [ "causes a blast", "covers a zone" ]
            },
            "activated" : {
                range : [ "immediate/2", "short/4", "medium/4", "long/2", "extreme/1" ]
            },
            "dropped" : {
                range : [ "immediate/2", "short/4", "medium/4",  "long/2", "extreme/1" ],
                "effect_types" : [ "causes a blast", "covers a zone" ]
            },
            "attached to a melee weapon and activated" : {
                range : [ "immediate" ],
                "effect_types" : [ " strikes" ]
            },
            "attached to a blunt weapon and activated" : {
                range : [ "immediate" ],
                "effect_types" : [ " strikes" ]
            },
            "attached to a bladed weapon and activated" : {
                range : [ "immediate" ],
                "effect_types" : [ " strikes" ]
            },
            "attached to a projectile and activated" : {
                range : [ "short/2", "medium/4",  "long/2", "extreme/1"  ]
            },
            "attached to a ranged weapon and activated" : {
                range : [ "short/2", "medium/4",  "long/2", "extreme/1"  ]
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
            "shoots a hunter-seeker missile" : {
                prob : 20,
                cypher_name : [ "Hunter-Seeker" ],
                range : [ "medium/30", "long/80", "extreme/120" ],
                area : [ 0, 0 ],
                cypher_class : [ "occultic/4", "anoetic/1" ]
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
                extra_text : ". The effect lasts ${effect_duration} and affects anything passing through it",
                range : [ "short/50", "medium/20", "long/10", "extreme/10" ],
                area : [ 0, 1 ],
                cypher_class : [ "occultic/4", "anoetic/1" ]
            },
            "creates a wall" : {
                prob : 20,
                cypher_name : [ "wall projector" ],
                extra_text : ". The effect lasts ${effect_duration} and affects anything passing through it",
                range : [ "short/50", "medium/20", "long/10" ],
                area : [ 0, 1 ],
                cypher_class : [ "occultic/1", "anoetic/4" ]
            },
            "strikes" : {
                prob : 0,
                cypher_name : [ "sword/5", "lance/2", "spear/2", "saber/3", "mace/2", "dagger/2", "magnetic attack drill/1", "whip/5", "blade/10" ],
                range : [ "immediate" ],
                extra_text : ". The effect lasts ${effect_duration}",
                area : [ 0, 0 ]
            },
            " strikes" : {
                prob : 0,
                cypher_name : [ "nodule", "pommel attachment", "pommel", "blade", "grip", "device", "jewel", "mechanism" ],
                range : [ "immediate" ],
                extra_text : ". The effect lasts ${effect_duration}",
                area : [ 0, 0 ]
            }
        },
        durations : [ "for one round/1", "for ten rounds/2", "for ten minutes/4", "for one hour/2", "for one day/1" ],
        range_types : [ "immediate", "short", "medium", "long", "extreme" ],
        radius_types : [ "single target", "small area", "medium area", "large area", "huge area" ]
    }
});