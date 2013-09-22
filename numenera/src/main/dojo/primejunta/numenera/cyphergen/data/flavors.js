define({
    // <size?> <adjective?> <weight?> <material> <object> <qualifier2?>
    // "A small circular ceramic disc, with glowing symbols which shift."
    // "an enormous self-propelled synth device with tractor treads
    materials : {
        "metal" : {
            prob : 4
        },
        "synth" : {
            prob : 4
        },
        "biological" : {
            prob : 4,
            cypher_class : "occultic"
        },
        "ceramic" : {
            prob : 4
        },
        "radiant energy" : {
            prob : 1,
            cypher_class : "occultic"
        }
    },
    weights : [ "almost weightless/1", "very light/2", "light/4", "#false/8", "heavy/4", "very heavy/2", "extremely heavy/1" ],
    adjectives : [ "#false/4", "pulsating/1", "glowing/1", "corroded/1", "eroded/1", "shiny/1", "shining/1", "damaged/1" ],
    sizes : [ "minuscule/1", "tiny/2", "small/4", "#false/8", "large/4", "huge/2", "enormous/1" ],
    qualifiers : [ "with glowing symbols/1", "with etched markings/1", "with engraved symbols/1", "which speaks in an unknown language/1", "with colored markings/2", "#false/10"],
    object_types : {
        "consumable" : {
            object_names : {
                "capsule" : {
                    prob : 10,
                    max_size : 5
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5
                },
                "organism" : {
                    prob : 10,
                    max_size : 5
                },
                "fungus" : {
                    prob : 10,
                    max_size : 5
                },
                "slime" : {
                    prob : 10,
                    max_size : 5
                },
                "powder" : {
                    prob : 10,
                    max_size : 5
                }
            }
        },
        "handheld" : {
            object_names : {
                "disc" : {
                    prob : 10,
                    max_size : 5
                },
                "rod" : {
                    prob : 10,
                    max_size : 5
                },
                "polyhedron" : {
                    prob : 10,
                    max_size : 5
                },
                "trapezohedron" : {
                    prob : 1,
                    max_size : 5
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5
                },
                "blade" : {
                    prob : 10
                },
                "device" : {
                    prob : 10,
                    max_size : 5
                },
                "blade" : {
                    prob : 10,
                    max_size : 5
                },
                "lump" : {
                    prob : 10,
                    max_size : 5
                },
                "spheroid" : {
                    prob : 10,
                    max_size : 5
                },
                "ovoid" : {
                    prob : 10,
                    max_size : 5
                }
            }
        },
        "worn" : {
            object_names : {
                "helmet" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "hat" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "glove" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "vest" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "boot" : {
                    prob : 2,
                    max_size : 5,
                    min_size : 2
                },
                "dress" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "robe" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "cloak" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                },
                "wrap" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2
                }
            }
        },
        "placed" : {
            qualifiers : {
                object_size : {
                    match : [ "large", "huge", "enormous" ],
                    adjective : [ "#false", "self-propelled" ],
                    qualifier : [ "with tractor treads", "with wheels", "with crab-like legs", "with spider-like legs", "with legs", "which levitates" ]
                }
            },
            object_names : {
                "device" : {
                    prob : 10
                },
                "disc" : {
                    prob : 10
                },
                "cube" : {
                    prob : 10
                },
                "polyhedron" : {
                    prob : 5
                },
                "rod" : {
                    prob : 10
                },
                "device" : {
                    prob : 10
                },
                "mechanism" : {
                    prob : 10
                },
                "lump" : {
                    prob : 10
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5
                },
                "spheroid" : {
                    prob : 10
                },
                "ovoid" : {
                    prob : 10
                }
            }
        }
    }
});