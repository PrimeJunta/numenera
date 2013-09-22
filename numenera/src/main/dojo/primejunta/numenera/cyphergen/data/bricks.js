define({
    cypher_types : {
        // will be mixed in here
    },
    common_data : {
        damage_types : {
            "crushing" : {
                prob : 100
            },
            "piercing" : {
                prob : 100,
                cypher_name_qualifier : "fragmenting"
            },
            "slashing" : {
                prob : 100,
                cypher_name_qualifier : "fragmenting"
            },
            "blast" : {
                prob : 100,
                cypher_name_qualifier : "explosive"
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
            "desiccating" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ]
            },
            "matter disruption" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ],
                damage_modifier : 3
            },
            "pressure" : {
                prob : 15
            },
            "singularity" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ],
                damage_modifier : 5
            },
            "gravity" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ],
                damage_modifier : 2
            },
            "disintegration" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ],
                damage_modifier : 3
            },
            "mental" : {
                prob : 15,
                cypher_class : [ "occultic/4", "anoetic/1" ]
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
                prob : 50,
                cypher_name_qualifier : "concussive"
            },
            "hallucination" : {
                prob : 50
            },
            "sleep" : {
                prob : 50
            },
            "paralysis" : {
                prob : 50,
                cypher_name_qualifier : "paralytic"
            },
            "unconsciousness" : {
                prob : 50,
                cypher_name_qualifier : "subduing"
            },
            "poisoning" : {
                prob : 50,
                cypher_name_qualifier : "poison",
                duration : [ "for one hour", "for one day", "until healed" ]
            },
            "disease" : {
                prob : 50,
                cypher_name_qualifier : "infecting",
                duration : [ "until healed" ]
            },
            "blindness" : {
                prob : 50,
                cypher_name_qualifier : "flash"
            },
            "deafness" : {
                prob: 50,
                cypher_name_qualifier : "sonic"
            }
        },
        special_types : {
            "teleport in a random direction at immediate range, modifying its actions by one step to its detriment for the next round" : {
                prob: 10,
                cypher_name_qualifier : "banishing"
            },
            "take 2 points of extra damage due to a sudden increase in density of the weapon they were struck with" : {
                prob: 10,
                cypher_name_qualifier : "density"
            }
        },
        special_effects : {
            "#false" : {
                prob : 9
            }, 
            " the user will start to secrete a liquid, which, when consumed within a week, " : {
                prob : 1,
                cypher_class : [ "occultic/4", "anoetic/2" ]
            }
        }
    }
});