define({
    // <size?> <adjective?> <weight?> <material> <object> <qualifier2?>
    // "A small circular ceramic disc, with glowing symbols which shift."
    // "an enormous self-propelled synth device with tractor treads
    materials : {
        "#false" : {
            prob : 20
        },
        "metal" : {
            prob : 4
        },
        "synth" : {
            prob : 4
        },
        "biological" : {
            prob : 4,
            cypher_class : [ "occultic/2", "anoetic/2" ]
        },
        "ceramic" : {
            prob : 4
        },
        "radiant energy" : {
            prob : 1,
            cypher_class : [ "occultic/4", "anoetic/1" ]
        }
    },
    weights : [ "almost weightless/1", "very light/2", "light/4", "#false/8", "heavy/4", "very heavy/2", "extremely heavy/1" ],
    adjectives : [ "#false/8", "pulsating/1", "glowing/1", "corroded/1", "eroded/1", "shiny/1", "shining/1", "damaged/1" ],
    sizes : [ "minuscule/1", "tiny/2", "small/4", "#false/8", "large/4", "huge/2", "enormous/1" ],
    qualifiers : [ "with glowing symbols/1", "with etched markings/1", "with engraved symbols/1", "which speaks in an unknown language/1", "with colored markings/2", "#false/10"],
    object_types : {
        "consumable" : {
            object_names : {
                "capsule" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "implanted" ]
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed" ]
                },
                "organism" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "implanted", "eaten" ]
                },
                "fungus" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "implanted", "eaten" ]
                },
                "slime" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "implanted", "eaten" ]
                },
                "box of powder" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "eaten", "inhaled", "rubbed into skin" ]
                },
                "vial of liquid" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "drunk", "rubbed into skin" ]
                },
                "pill" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed" ]
                },
                "tube of paste" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "eaten", "rubbed into skin" ]
                },
                "flask of oil" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "drunk", "rubbed into skin" ]
                },
                "jar of grease" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "ingested", "swallowed", "eaten", "rubbed into skin" ]
                },
                "patch" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "applied onto skin" ]
                },
                "contact lens" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "inserted into eye" ]
                },
                "subdermal implant" : {
                    prob : 5,
                    max_size : 5,
                    actions : [ "implanted" ]
                },
                "temporary tattoo" : {
                    prob : 5,
                    max_size : 5,
                    actions : [ "applied onto skin" ]
                }
            }
        },
        "handheld" : {
            object_names : {
                "disc" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "rod" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken" ]
                },
                "polyhedron" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "squeezed", "attached and activated" ]
                },
                "trapezohedron" : {
                    prob : 1,
                    max_size : 5,
                    actions : [ "activated", "broken", "squeezed", "attached and activated" ]
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken" ]
                },
                "blade" : {
                    prob : 10,
                    actions : [   "broken" ]
                },
                "device" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated" ]
                },
                "lump" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "squeezed", "attached and activated" ]
                },
                "spheroid" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "ovoid" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "jar" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "opened", "activated", "broken", "attached and activated" ]
                },
                "mechanism" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "box" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "opened", "activated", "broken", "attached and activated" ]
                },
                "canister" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "opened", "activated", "broken", "attached and activated" ]
                },
                "panel" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "opened", "activated", "broken", "attached and activated" ]
                },
                "nodule" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "pipe" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "tube" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "plate" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "pyramid" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "cone" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "spike" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "ring" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "lens" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                },
                "mirror" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "activated", "broken", "attached and activated" ]
                }
            }
        },
        "worn" : {
            object_names : {
                "helmet" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "hat" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "glove" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "vest" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "boot" : {
                    prob : 2,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "armor piece" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "robe" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "fabric" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "pauldron" : {
                    prob : 10,
                    max_size : 5,
                    min_size : 2,
                    actions : [ "worn and activated" ]
                },
                "monocle" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "inserted into eye", "worn and activated" ]
                },
                "pair of goggles" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "bracelet" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "necklace" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "ring" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "bodysuit" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "headband" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "belt" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
                },
                "patch" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "worn and activated" ]
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
                "canister" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "disc" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "cube" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "polyhedron" : {
                    prob : 5,
                    actions : [ "placed and activated" ]
                },
                "rod" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "device" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "mechanism" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "lump" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "tablet" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "spheroid" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "ovoid" : {
                    prob : 10,
                    actions : [ "placed and activated" ]
                },
                "pyramid" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "tripod" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "pipe" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "wheel" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "automaton" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "torus" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "tangle of conduits" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "teardrop" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "tower" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "stick" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "staff" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                },
                "box" : {
                    prob : 10,
                    max_size : 5,
                    actions : [ "placed and activated" ]
                }
            }
        }
    }
});