define({
    cypher_types : {
        cure : {
            "prob" : 50,
            "verb" : "restores",
            "description" : "cure",
            "damage_types" : [ "physical/80", "status/60" ],
            // cures one or more debuffs or "all", one or more status effects or "all" 
            item_types : {
                "consumable" : {
                    "prob" : 80,
                    "actions" : [ "ingested/60", "injected/40" ]
                },
                "handheld" : {
                    "prob" : 30,
                    "actions" : [ "activated/30", "injected/70" ]
                },
                "worn" : {
                    "prob" : 30,
                    "actions" : [ "activated" ]
                },
                "large device" : {
                    "prob" : 10,
                    "actions" : [ "activated" ]
                }
            }
        },
        buff : {
            "prob" : 20,
            "verb" : "boosts",
            "description" : "buff",
            // cures one or more debuffs or "all", one or more status effects or "all" 
            item_types : {
                "consumable" : {
                    "prob" : 80,
                    "actions" : [ "ingested", "injected" ]
                },
                "handheld" : {
                    "prob" : 30,
                    "actions" : [ "activated", "injected" ]
                },
                "worn" : {
                    "prob" : 30,
                    "actions" : [ "activated" ]
                },
                "large device" : {
                    "prob" : 10,
                    "actions" : [ "activated" ]
                }
            },
            durations : [ "one round/10", "ten minutes/30", "one hour/30", "one day/10" ]
            // buffs one or more buff_types, or protects against one or more damage_types
        },
        weapon : {
            "prob" : 50,
            "verb" : "produces",
            "description" : "weapon",
            "damage_types" : [ "physical/80", "status/60" ],
            // produces one or more damage_types, buff_types, or status_types with an effect_type and action_type
            item_types : {
                "handheld" : {
                    "prob" : 50,
                    "actions" : [ "aimed and fired", "used in melee", "thrown" ],
                },
                "worn" : {
                    "prob" : 30,
                    "actions" : [ "aimed and fired", "used in melee" ],
                },
                "placed" : {
                    "prob" : 20,
                    "actions" : [ "aimed and fired", "set and triggered" ],
                }
            },
            action_types : {
                "thrown" : {
                    "range" : [ "immediate/10", "short/50", "long/10" ],
                    "effect_types" : [ "causes a blast", "covers a zone" ]
                },
                "aimed and fired" : {
                    "range" : [ "short/30", "long/50", "extreme/10" ]
                },
                "set and triggered" : {
                    "range" : [ "immediate/30", "short/30", "long/50", "extreme/10" ]
                },
                "used in melee" : {
                    "range" : [ "immediate" ],
                    "effect_types" : [ "strikes" ]
                }
            },
            effect_types : {
                "shoots a beam" : {
                    "prob" : 50,
                    "range" : [ "short/10", "medium/30", "long/50", "extreme/10" ],
                    "area" : -2
                },
                "shoots a slug" : {
                    "prob" : 50,
                    "range" : [ "short/10", "medium/50", "long/50" ],
                    "area" : -2
                },
                "causes a blast" : {
                    "prob" : 50,
                    "range" : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                    "area" : -1
                },
                "sprays an arc" : {
                    "prob" : 20,
                    "range" : [ "short/50", "medium/50", "long/20", "extreme/10" ],
                    "area" : 0
                },
                "covers a zone" : {
                    "prob" : 20,
                    "range" : [ "immediate/50", "short/50", "medium/20", "long/10", "extreme/10" ],
                    "area" : 0
                },
                "strikes" : {
                    "prob" : 0,
                    "range" : [ "immediate" ],
                    "area" : 0
                }
            },
            durations : [ "one round/10", "ten minutes/30", "one hour/10" ],
            range_types : [ "immediate", "short", "medium", "long", "extreme" ],
            radius_types : [ "single target", "small area", "medium area", "large area", "huge area" ]
        }
    },
    types : {
        damage_types : {
            "blast" : {
                "prob" : 100
            },
            "fire" : {
                "prob" : 50
            },
            "acid" : {
                "prob" : 25
            },
            "cold" : {
                "prob" : 15
            },
            "electrical" : {
                "prob" : 20
            },
            "gravity" : {
                "prob" : 15
            },
            "disintegration" : {
                "prob" : 15
            }
        },
        buff_types : {
            "might pool" : {
                "prob" : 50
            },
            "speed pool" : {
                "prob" : 10
            },
            "intellect pool" : {
                "prob" : 10
            },
            "might edge" : {
                "prob" : 5
            },
            "speed edge" : {
                "prob" : 5
            },
            "intellect edge" : {
                "prob" : 5
            }
        },
        status_types : {
            "daze" : {
                "prob" : 50
            },
            "stun" : {
                "prob" : 50
            },
            "hallucinations" : {
                "prob" : 50
            },
            "sleep" : {
                "prob" : 50
            },
            "paralysis" : {
                "prob" : 50
            },
            "unconsciousness" : {
                "prob" : 50
            },
            "poisoning" : {
                "prob" : 50
            },
            "disease" : {
                "prob" : 50
            }
        }
    }
})

// An <item_type> <class>. When <action_type>, <verb> a <effect_type> causing <damage_type|status_type|buff_type> at <range_type> and <area_type>.