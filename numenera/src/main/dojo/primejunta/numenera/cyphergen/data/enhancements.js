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
                prob : 10
            },
            "training in medicine and healing" : {
                verb_s : "has",
                verb_p : "have",
                cypher_name : [ "medical enhancer" ],
                prob : 10
            },
            "able to speak and understand any language" : {
                verb_s : "is",
                verb_p : "are",
                cypher_name : [ "universal lexicon" ],
                prob : 10
            },
            "an immediate distance when struck" : {
                verb_s : "teleports",
                verb_p : "teleport",
                cypher_name : [ "blink cypher" ],
                prob : 10
            },
            "can climb any surface automatically" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "adhesion cypher" ],
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
            "can fly" : {
                verb_s : " ",
                verb_p : " ",
                cypher_name : [ "powered gravity nullifier" ],
                prob : 10
            }
        },
        durations : [ "one round/5", "ten minutes/30", "one hour/30", "one day/10" ],
        radius_types : [ "people within a small area", "people within a medium area", "people within a large area", "people within a huge area" ]
    }
});