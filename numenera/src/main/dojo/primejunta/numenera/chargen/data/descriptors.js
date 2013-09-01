define([
        { 
            "label" : "Charming",
            "stats" : {
                "intellect_pool" : 2,
                "shin_count" : 10
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Pleasant Social Interaction", "Ⓣ Mind-Affecting Esoteries/Special Abilities" ],
                "inability_list" : [ "Poor at Studying (+1 difficulty in knowledge tasks)", "Weak Will (+1 difficulty in Mental Defense)" ],
                "reference_list" : [ "Charming: Corebook, page 47" ]
            }
        },
        { 
            "label" : "Clever",
            "stats" : {
                "intellect_pool" : 2,
                "shin_count" : 10
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Lies and trickery", "Ⓣ Mental Defense", "Ⓣ Assess danger, lies, quality, importance, function, or power" ],
                "inability_list" : [ "Poor at Studying (+1 step in knowledge tasks)" ],
                "reference_list" : [ "Clever: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Graceful",
            "stats" : {
                "speed_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Balancing", "Ⓣ Careful movement", "Ⓣ Speed Defense" ],
                "reference_list" : [ "Graceful: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Intelligent",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Memory of direct experiences" ],
                "reference_list" : [ "Intelligent: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Lattimor*",
            "description_text" : "Lattimors are ultraterrestrials. Ask your GM if lattimor PC's are allowed in your game, and how they behave.",
            "stats" : {
                "might_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Perceiving (fugue)", "Ⓣ Attacks with chosen weapon (bursk)", "Ⓣ Breaking things (bursk)", "Ⓣ Perceiving (bursk)", "Ⓣ All interactions (neem)", "Ⓣ Study, contemplation, concentration, including esoteries (neem)" ],
                "inability_list" : [ "Lore, knowledge, understanding (+1 step, bursk)", "Pleasant interactions (+1 step, bursk)", "Contemplation, study, concentration, including esoteries (+1 step, bursk)", "All combat tasks (+1 step, neem)", "Perceiving anything unexpected (+1 step, neem)" ],
                "bonus_list" : [ "Ⓐ Change State (fugue/bursk/neem)" ],
                "reference_list" : [ "Lattimor: Corebook, page 124" ]
            }
        },
        { 
            "label" : "Learned",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Knowledge area: ${input:choose}" ],
                "inability_list" : [ "Poor at charm, persuasion, etiquette (1 step)" ],
                "equipment_list" : [ "Book: ${input:choose topic}", "Book: ${input:choose topic}" ],
                "reference_list" : [ "Learned: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Mutant*",
            "description_text" : "Mutant is an optional descriptor. Ask your GM if they're allowed in your game, and work with him/her to decide on your mutations.",
            "lists" : {
                "bonus_list" : [ "${select:1:2 beneficial mutations|1 harmful + 3 beneficial mutations|1 harmful + 1 powerful mutation|1 harmful + 1 distinctive mutation}", "0-4 cosmetic mutations" ],
                "reference_list" : [ "Mutant: Corebook, page 125" ]
            }
        },
        { 
            "label" : "Mystical/Mechanical",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "equipment_list" : [ "Oddity: ${input:GM chooses}" ],
                "ability_list" : [ "Ⓣ Identifying/understanding the numenera", "Ⓣ Sense Magic" ],
                "inability_list" : [ "Unnerving aura (Charm, persuasion, deception tasks +1 step)" ],
                "bonus_list" : [ "Ⓐ Hedge Magic (1 intellect)" ],
                "reference_list" : [ "Mystical/Mechanical: Corebook, page 49" ]
            }
        },
        { 
            "label" : "Rugged",
            "lists" : {
                "ability_list" : [ "Ⓣ Climbing", "Ⓣ Jumping", "Ⓣ Running", "Ⓣ Swimming", "Ⓣ Training animals", "Ⓣ Riding animals", "Ⓣ Placating animals", "Ⓣ Identifying plants", "Ⓣ Using plants" ],
                "inability_list" : [ "No social graces (Charm, persuasion, deception tasks +1 step)" ],
                "equipment_list" : [ "Explorer's pack" ],
                "reference_list" : [ "Rugged: Corebook, page 49" ]
            }
        },
        { 
            "label" : "Stealthy",
            "stats" : {
                "speed_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Stealthy tasks", "Ⓣ Lies and trickery" ],
                "inability_list" : [ "Slow (+1 step in movement tasks)" ],
                "reference_list" : [ "Stealthy: Corebook, page 50" ]
            }
        },
        {
            "label" : "Strong",
            "stats" : {
                "might_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Breaking things", "Ⓣ Jumping" ],
                "equipment_list" : [ "${select:1:Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ],
                "reference_list" : [ "Strong: Corebook, page 50" ]
            }
        },
        { 
            "label" : "Strong-willed",
            "stats" : {
                "intellect_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Resist mental effects", "Ⓣ Concentration or focus" ],
                "inability_list" : [ "Not very bright (figure out puzzles, solve problems, memorization, lore tasks +1 step)" ],
                "reference_list" : [ "Strong-willed: Corebook, page 50" ]
            }
        },
        {
            "label" : "Swift",
            "stats" : {
                "speed_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Initiative", "Ⓣ Running" ],
                "inability_list" : [ "Poor balance (+1 step in balance tasks)" ],
                "reference_list" : [ "Swift: Corebook, page 51" ]
            }
        },
        {
            "label" : "Tough",
            "stats" : {
                "armor_bonus" : 1,
                "recovery_roll" : 1,
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Might Defense" ],
                "equipment_list" : [ "${select:1:Light Bashing|Light Bladed|Light Ranged} Weapon: ${input:choose}" ],
                "reference_list" : [ "Tough: Corebook, page 51" ],
                "bonus_list" : [ "Ⓔ Resilient", "Ⓔ Healthy" ]
            }
        },
        {
            "label" : "Varjellen*",
            "description_text" : "Varjellen are ultraterrestrials. Ask your GM if varjellen PC's are allowed in your game, and how they behave.",
            "stats" : {
                "free_pool" : -3,
                "recovery_roll" : -1
            },
            "lists" : {
                "ability_list" : [ "Ⓣ Identifying/understanding the numenera", "Ⓣ Visually perceiving" ],
                "inability_list" : [ "History (+1 step)", "Poetry and oratory (+1 step)", "Hearing (+1 step)" ],
                "bonus_list" : [ "Ⓐ Reforging (rearrange Pools freely once every day)" ],
                "reference_list" : [ "Varjellen: Corebook, page 123" ]
            }
        }
]);