define({
    cypher_types : {
        enhancement : {
            // When <action>, <target> <verb> <enhancement> for <duration>.
            prob : 100,
            name : "enhancement",
            item_types : {
                "consumable" : {
                    prob : 80,
                    actions : [ "ingested/60", "injected/40" ]
                },
                "handheld" : {
                    prob : 30,
                    actions : [ "activated/30", "injected/70" ]
                },
                "worn" : {
                    prob : 30,
                    actions : [ "activated" ]
                },
                "large device" : {
                    prob : 10,
                    actions : [ "activated" ],
                    radius : [ "#none/1", "people within a small area/200", "people within a medium area/10", "people within a large area/5", "people within a huge area/1" ]
                }
            },
            effect_types : {
                "training in social interactions" : {
                    verb_s : "has",
                    verb_p : "have",
                    cypher_name : "social enhancer",
                    prob : 10
                },
                "training in medicine and healing" : {
                    verb_s : "has",
                    verb_p : "have",
                    cypher_name : "medical enhancer",
                    prob : 10
                },
                "able to speak and understand any language" : {
                    verb_s : "is",
                    verb_p : "are",
                    cypher_name : "universal lexicon",
                    prob : 10
                },
                "an immediate distance when struck" : {
                    verb_s : "teleports",
                    verb_p : "teleport",
                    cypher_name : "blink cypher",
                    prob : 10
                },
                "can climb any surface automatically" : {
                    verb_s : " ",
                    verb_p : " ",
                    cypher_name : "adhesion cypher",
                    prob : 10
                },
                "out of phase" : {
                    verb_s : "goes",
                    verb_p : "go",
                    cypher_name : "phase switcher",
                    prob : 10
                },
                "can levitate" : {
                    verb_s : " ",
                    verb_p : " ",
                    cypher_name : "gravity nullifier",
                    prob : 10
                },
                "can fly" : {
                    verb_s : " ",
                    verb_p : " ",
                    cypher_name : "powered gravity nullifier",
                    prob : 10
                }
            },
            durations : [ "one round/5", "ten minutes/30", "one hour/30", "one day/10" ],
            radius_types : [ "people within a small area", "people within a medium area", "people within a large area", "people within a huge area" ]
        },
        cure : {
            prob : 50,
            "name" : "cure",
            "damage_types" : [ "physical/80", "status/60" ],
            // cures one or more debuffs or "all", one or more status effects or "all" 
            item_types : {
                "consumable" : {
                    prob : 80,
                    actions : [ "ingested/60", "injected/40" ]
                },
                "handheld" : {
                    prob : 30,
                    actions : [ "activated/30", "injected/70" ]
                },
                "worn" : {
                    prob : 30,
                    actions : [ "activated" ]
                },
                "large device" : {
                    prob : 10,
                    actions : [ "activated" ],
                    range : [ "#none/200", "immediate/200", "short/10", "long/5", "extreme/1" ]
                }
            }
        },
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
                "large device" : {
                    prob : 10,
                    actions : [ "activated" ],
                    range : [ "#none/200", "immediate/80", "short/10", "long/5", "extreme/1" ]
                }
            },
            durations : [ "one round/10", "ten minutes/30", "one hour/30", "one day/10" ]
            // buffs one or more buff_types, or protects against one or more damage_types
        },
        countermeasure : {
            prob : 20,
            "name" : "countermeasure",
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
        },
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
                    prob : 20,
                    actions : [ "aimed and fired", "set and triggered" ]
                }
            },
            action_types : {
                "thrown" : {
                    range : [ "immediate/10", "short/50", "long/10" ],
                    "effect_types" : [ "causes a blast", "covers a zone" ],
                    cypher_name : "grenade"
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
                    cypher_name : "ray emitter",
                    range : [ "short/10", "medium/30", "long/50", "extreme/10" ],
                    area : [ -2, 0 ]
                },
                "shoots a slug" : {
                    prob : 50,
                    cypher_name : "slugthrower",
                    range : [ "short/10", "medium/50", "long/50" ],
                    area : [ -2, 0 ]
                },
                "shoots a hunter-killer missile" : {
                    prob : 20,
                    cypher_name : "hunter-killer",
                    range : [ "medium/30", "long/80", "extreme/120" ],
                    area : [ 0, 0 ],
                    cypher_class : "occultic"
                },
                "causes a blast" : {
                    prob : 50,
                    cypher_name : "bomb",
                    range : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                    area : [ 0, 0 ]
                },
                "sprays an arc" : {
                    prob : 20,
                    cypher_name : "fanthrower",
                    range : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                    area : [ 0, 0 ]
                },
                "covers a zone" : {
                    prob : 20,
                    cypher_name : "field",
                    range : [ "short/50", "medium/20", "long/10", "extreme/10" ],
                    area : [ 0, 1 ],
                    cypher_class : "occultic"
                },
                "strikes" : {
                    prob : 0,
                    cypher_name : "subduer",
                    range : [ "immediate" ],
                    area : [ 0, 0 ]
                }
            },
            durations : [ "for one round/10", "for ten minutes/30", "for one hour/10" ],
            range_types : [ "immediate", "short", "medium", "long", "extreme" ],
            radius_types : [ "single target", "small area", "medium area", "large area", "huge area" ]
        }
    },
    types : {
        damage_types : {
            "crushing" : {
                prob : 100
            },
            "piercing" : {
                prob : 100
            },
            "slashing" : {
                prob : 100
            },
            "blast" : {
                prob : 100
            },
            "fire" : {
                prob : 50
            },
            "acid" : {
                prob : 25
            },
            "cold" : {
                prob : 15
            },
            "electrical" : {
                prob : 20
            },
            "gravity" : {
                prob : 15
            },
            "disintegration" : {
                prob : 15,
                cypher_class : "occultic"
            },
            "mental" : {
                prob : 15,
                cypher_class : "occultic"
            }
        },
        buff_types : {
            "might pool" : {
                prob : 50
            },
            "speed pool" : {
                prob : 10
            },
            "intellect pool" : {
                prob : 10
            },
            "might edge" : {
                prob : 5
            },
            "speed edge" : {
                prob : 5
            },
            "intellect edge" : {
                prob : 5
            }
        },
        status_types : {
            "daze" : {
                prob : 50
            },
            "stun" : {
                prob : 50
            },
            "hallucinations" : {
                prob : 50
            },
            "sleep" : {
                prob : 50
            },
            "paralysis" : {
                prob : 50
            },
            "unconsciousness" : {
                prob : 50
            },
            "poisoning" : {
                prob : 50,
                duration : [ "for one hour", "for one day", "until healed" ]
            },
            "disease" : {
                prob : 50,
                duration : [ "until healed" ]
            }
        }
    }
});