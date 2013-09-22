define({
    utility : {
        // When <action>, <effect> for <duration>.
        prob : 30,
        name : "utility",
        item_types : {
            "handheld" : {
                prob : 30,
                actions : [ "activated" ]
            },
            "worn" : {
                prob : 30,
                actions : [ "activated" ]
            },
            "placed" : {
                prob : 10,
                actions : [ "activated" ]
            }
        },
        effect_types : {
            "allows the user to manipulate a single metal object within ${range} range" : {
                prob : 10,
                cypher_name : [ "magnetic master" ],
                duration_modifier : -1
            },
            "causes a targeted object at ${range} range to go out of phase" : {
                prob : 10,
                cypher_name : [ "phase disruptor" ],
                cypher_class : "occultic"
            },
            "displays the position of any moving objects larger than a small animal within ${range} range" : {
                prob : 10,
                cypher_name : [ "motion detector" ],
                cypher_class : "occultic"
            }
        },
        durations : [ "one round", "ten rounds", "ten minutes", "one hour", "one day" ],
        duration_probs : [ 1, 2, 4, 2, 1 ],
        ranges : [ "immediate", "short", "medium", "long", "extreme" ],
        range_probs : [ 1, 2, 4, 2, 1 ]
    }
});