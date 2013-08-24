define([
        { 
            "label" : "Charming",
            "stats" : {
                "intellect_pool" : 2,
                "shin_count" : 10
            },
            "lists" : {
                "ability_list" : [ "Trained: Pleasant Social Interaction", "Trained: Mind-Affecting Esoteries/Special Abilities" ],
                "inability_list" : [ "Poor at Studying (+1 difficulty in knowledge tasks)", "Weak Will (+1 difficulty in mental defense)" ],
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
                "ability_list" : [ "Trained: Lies and trickery", "Trained: Mental defense", "Trained: Assess danger, lies, quality, importance, function, or power" ],
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
                "ability_list" : [ "Trained: Balancing", "Trained: Careful movement", "Trained: Speed defense" ],
                "reference_list" : [ "Graceful: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Intelligent",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Knowledge area: ${input:choose}", "Trained: Memory of direct experiences" ],
                "reference_list" : [ "Intelligent: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Lattimor*",
            "stats" : {
                "might_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Trained: Perceiving (fugue)", "Trained: Attacks with chosen weapon (bursk)", "Trained: Breaking things (bursk)", "Trained: Perceiving (bursk)", "Trained: All interactions (neem)", "Trained: Study, contemplation, concentration, including esoteries (neem)" ],
                "inability_list" : [ "Lore, knowledge, understanding (+1 step, bursk)", "Pleasant interactions (+1 step, bursk)", "Contemplation, study, concentration, including esoteries (+1 step, bursk)", "All combat tasks (+1 step, neem)", "Perceiving anything unexpected (+1 step, neem)" ],
                "bonus_list" : [ "Change State (fugue/bursk/neem)" ],
                "reference_list" : [ "Lattimor: Corebook, page 124" ]
            }
        },
        { 
            "label" : "Learned",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Knowledge area: ${input:choose}", "Trained: Knowledge area: ${input:choose}", "Trained: Knowledge area: ${input:choose}" ],
                "inability_list" : [ "Poor at charm, persuasion, etiquette (1 step)" ],
                "equipment_list" : [ "Book: ${input:choose topic}", "Book: ${input:choose topic}" ],
                "reference_list" : [ "Learned: Corebook, page 48" ]
            }
        },
        { 
            "label" : "Mutant*",
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
                "ability_list" : [ "Trained: Identifying/understanding the numenera", "Trained: Sense Magic" ],
                "inability_list" : [ "Unnerving aura (Charm, persuasion, deception tasks +1 step)" ],
                "bonus_list" : [ "Hedge Magic (1 intellect)" ],
                "reference_list" : [ "Mystical/Mechanical: Corebook, page 49" ]
            }
        },
        { 
            "label" : "Rugged",
            "lists" : {
                "ability_list" : [ "Trained: Climbing", "Trained: Jumping", "Trained: Running", "Trained: Swimming", "Trained: Training animals", "Trained: Riding animals", "Trained: Placating animals", "Trained: Identifying plants", "Trained: Using plants" ],
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
                "ability_list" : [ "Trained: Stealthy tasks", "Trained: Lies and trickery" ],
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
                "ability_list" : [ "Trained: Breaking things", "Trained: Jumping" ],
                "equipment_list" : [ "${select:1:Medium weapon|Heavy weapon}: ${input:choose}" ],
                "reference_list" : [ "Strong: Corebook, page 50" ]
            }
        },
        { 
            "label" : "Strong-willed",
            "stats" : {
                "intellect_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Trained: Resist mental effects", "Trained: Concentration or focus" ],
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
                "ability_list" : [ "Trained: Initiative", "Trained: Running" ],
                "inability_list" : [ "Poor balance (+1 step in balance tasks)" ],
                "reference_list" : [ "Swift: Corebook, page 51" ]
            }
        },
        {
            "label" : "Tough",
            "stats" : {
                "armor_bonus" : 1,
            },
            "lists" : {
                "ability_list" : [ "Trained: Might defense" ],
                "equipment_list" : [ "Light Weapon: ${input:choose}" ],
                "reference_list" : [ "Tough: Corebook, page 51" ],
                "bonus_list" : [ "Healthy (+1 to Recovery Roll points)" ]
            }
        },
        {
            "label" : "Varjellen*",
            "stats" : {
                "free_pool" : -3,
            },
            "lists" : {
                "ability_list" : [ "Trained: Identifying/understanding the numenera", "Trained: Visually perceiving" ],
                "inability_list" : [ "-1 to Recovery Roll", "History (+1 step)", "Poetry and oratory (+1 step)", "Hearing (+1 step)" ],
                "bonus_list" : [ "Reforging (rearrange Pools freely once every day)" ],
                "equipment_list" : [ "Light Weapon: ${input:choose}" ],
                "reference_list" : [ "Varjellen: Corebook, page 123" ]
            }
        }
]);