define({
    enhancement : {
        // When <action>, <target> <verb> <enhancement> for <duration>.
        prob : 30,
        name : "enhancement",
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
                radius : [ "#none/1", "people within a small area/200", "people within a medium area/10", "people within a large area/5", "people within a huge area/1" ]
            }
        },
        effect_types : {
            "training in social interactions" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "social enhancer" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in medicine and healing" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "medical enhancer" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in melee attacks" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "melee enhancer" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in ranged attacks" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "ranged enhancer" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in numenera lore" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in repair" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in persuasion" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in speed defense" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in intellect defense" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "defense enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in swimming" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "swimming enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in riding" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "riding enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in sneaking" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "stealth enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in repair" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "training in crafting (usually a specific item)" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "knowledge enhancement" ],
                prob : 3,
                duration_modifier : 2
            },
            "able to speak and understand any language" : {
                verb_s : "is",
                verb_p : "are",
                cypher_name : [ "universal lexicon" ],
                prob : 5
            },
            "able to speak and understand a language keyed to the cypher even if he/she/it would not normally be able to speak" : {
                verb_s : "is",
                verb_p : "are",
                cypher_name : [ "comprehension graft" ],
                prob : 5
            },
            "an immediate distance when struck, modifying defense actions by one step in his/her favor" : {
                verb_s : "teleports",
                verb_p : "teleport",
                cypher_name : [ "blink cypher" ],
                prob : 10
            },
            "invisible" : {
                verb_s : "becomes",
                verb_p : "become",
                cypher_name : [ "invisibility cypher" ],
                prob : 10
            },
            "an immediate distance to a location of his/her choosing when struck, modifying defense actions by one step in his/her favor" : {
                verb_s : "teleports",
                verb_p : "teleport",
                cypher_name : [ "controlled blink cypher" ],
                prob : 10
            },
            "can climb any surface automatically" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "adhesion cypher", "adhesion clamps" ],
                prob : 10
            },
            "out of phase" : {
                verb_s : "goes",
                verb_p : "go",
                cypher_name : [ "phase switcher" ],
                prob : 10
            },
            "can levitate" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "gravity nullifier" ],
                prob : 10
            },
            "can see in the dark" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "catseye" ],
                prob : 10,
                duration_modifier : 2
            },
            "can see ten times as far as normal" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "eagleseye" ],
                prob : 10,
                duration_modifier : 2
            },
            "can fly" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "powered gravity nullifier" ],
                prob : 10
            },
            "immune to poisons of the same level or lower, and ends any such effect if present" : {
                verb_s : "becomes",
                verb_p : "become",
                cypher_name : [ "antivenom" ],
                prob : 10
            },
            "surrounded by a field which will sustain a human safely, but does not protect against sudden changes of temperature" : {
                verb_s : "is",
                verb_p : "are",
                cypher_name : [ "environment field" ],
                prob : 10
            },
            "to a known location within a ${level}00 miles, safely with all possessions" : {
                verb_s : "teleports",
                verb_p : "teleport",
                cypher_name : [ "teleporter (traveler)" ],
                prob : 10,
                cypher_class : [ "occultic" ]
            },
            "to a visible location within a ${level}00 feet, safely with all possessions" : {
                verb_s : "teleports",
                verb_p : "teleport",
                cypher_name : [ "teleporter (bounder)" ],
                prob : 10
            },
            "may breathe underwater" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "water breather" ],
                prob : 10,
                duration_modifier : 2
            }
        },
        durations : [ "one round", "ten rounds", "ten minutes", "one hour", "one day" ],
        duration_probs : [ 1, 2, 4, 2, 1 ],
        radius_types : [ "people within a small area", "people within a medium area", "people within a large area", "people within a huge area" ]
    }
});