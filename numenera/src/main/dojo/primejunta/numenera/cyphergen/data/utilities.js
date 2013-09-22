define({
    utility : {
        // When <action>, <effect> for <duration>.
        prob : 20,
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
            "allows the user to manipulate a single metal object within ${range} range for ${duration}" : {
                prob : 10,
                cypher_name : [ "magnetic master" ],
                duration_modifier : -1
            },
            "causes a targeted object at ${range} range to go out of phase for ${duration}" : {
                prob : 10,
                cypher_name : [ "phase disruptor" ],
                cypher_class : [ "occultic/4", "anoetic/1" ],
                duration_modifier : 1
            },
            "displays the position of any moving objects larger than a small animal within ${range} range for ${duration}" : {
                prob : 10,
                cypher_name : [ "motion detector" ],
                cypher_class : [ "occultic/4", "anoetic/1" ],
                duration_modifier : 1
            },
            "allows the user to tap into the datasphere, to learn the answer to a single question" : {
                prob : 10,
                cypher_name : [ "datasphere siphon" ],
                cypher_class : [ "occultic/1", "anoetic/5" ],
                duration_modifier : 1
            },
            "creates an immobile cube of force, which conforms to the space available and lasts ${duration}" : {
                prob : 10,
                cypher_name : [ "force cube projector" ],
                cypher_class : [ "occultic/5", "anoetic/1" ],
                duration_modifier : 2
            },
            "creates an immobile plane of force, which conforms to the space available. It lasts ${duration}" : {
                prob : 10,
                cypher_name : [ "force screen projector" ],
                cypher_class : [ "occultic/1", "anoetic/5" ],
                duration_modifier : 2
            },
            "makes a small area extremely slippery, augmenting the difficulty of movement tasks by 1 step for ${duration}" : {
                prob : 10,
                cypher_name : [ "friction-reducing gel" ],
                duration_modifier : 1
            },
            "makes a nonliving object of medium size or smaller levitate for ${duration}" : {
                prob : 10,
                cypher_name : [ "gravity-nullifying spray" ],
                duration_modifier : 2
            },
            "projects an image of a terrifying creature of an unknown species, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of a terrifying creature of an unknown species, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of a huge machine that obscures sight, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of a beautiful pastoral scene, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of food that looks delicious but may be unfamiliar, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of solid color that obscures sight for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "projects an image of an incomprehensible scene that is disorienting and strange, with movement, sound, and smell for ${duration}" : {
                prob : 5,
                cypher_name : [ "image projector" ],
                duration_modifier : 1
            },
            "creates a tiny probe which moves ${range} distance and maps and scans ${area} area. It identifies basic layout, creatures, and energy source, and may not pass physical or energy barriers" : {
                prob : 10,
                cypher_name : [ "infiltrator" ],
                duration_modifier : 2
            },
            "expands into an automaton which understands and obeys the commands of whoever activated it. It can make attacks or perform actions but cannot speak. It may have knowledge about numenera in the area. It lasts  ${duration} before deactivating" : {
                prob : 10,
                cypher_name : [ "instant servant" ],
                duration_modifier : 2
            },
            "expands into a permanent one-room structure made of shapestone" : {
                prob : 10,
                cypher_name : [ "instant shelter" ],
                duration_modifier : 2
            },
            "produces a slime which dissolves 1 cubic foot of material per round. It dissipates after ${level} rounds" : {
                prob : 10,
                cypher_name : [ "living solvent" ]
            },
            "splits into two pieces. When one piece is affixed to a machine, the user may control it through the other over ${range} range. The control lasts for ${duration}" : {
                prob : 10,
                cypher_name : [ "machine control implant" ],
                duration_modifier : 2
            }, 
            "repels metal objects over ${range} range. The effect lasts for ${duration}" : {
                prob : 10,
                cypher_name : [ "magnetic shield" ],
                duration_modifier : 2
            },
            "produces foam which transforms metal in ${area} area into a substance as brittle as thin glass. It affects metal to a depth of ${level} inches" : {
                prob : 10,
                cypher_name : [ "metal death" ],
                duration_modifier : 2
            },
            "produces a small blade which cuts through any material lower than level ${level}. It lasts for ${duration}" : {
                prob : 10,
                cypher_name : [ "monoblade" ],
                duration_modifier : 1
            },
            "repairs any damaged but not destroyed numenera device of level ${level} or lower, unless it requires parts that are too rare or specialized. The repair takes ${duration}" : {
                prob : 10,
                cypher_name : [ "repair unit" ],
                cypher_class : [ "occultic/9", "anoetic/1" ]
            },
            "displays moving images with sound during ${level}0 minutes, depicting past events at the current location, up to ${level} years prior. The time period can be specified by the user" : {
                prob : 10,
                cypher_name : [ "temporal viewer" ],
                cypher_class : [ "occultic/9", "anoetic/1" ]
            },
            "fires a microscopic tracer that attaches to a target within ${range} range. For ${duration}, the launcher shows the distance and direction to the tracer, as long as it remains within the same dimension" : {
                prob : 10,
                cypher_name : [ "tracer" ],
                range_modifier : -1,
                duration_modifier : 2
            },
            "allows the user to see through up to ${level} feet of solid material lower than level ${level}. The effect lasts for ${duration}" : {
                prob : 10,
                cypher_name : [ "x-ray viewer" ],
                duration_modifier : -1
            }
            
        },
        durations : [ "one round", "ten rounds", "ten minutes", "one hour", "one day", "five days", "an indefinite period" ],
        duration_probs : [ 1, 2, 4, 2, 1, 0, 0 ],
        ranges : [ "an immediate", "a short", "a medium", "a long", "an extreme" ],
        range_probs : [ 1, 2, 4, 2, 1 ],
        areas : [ "a small", "a medium", "a large", "a huge" ],
        area_probs : [ 1, 2, 2, 1 ]
    }
});