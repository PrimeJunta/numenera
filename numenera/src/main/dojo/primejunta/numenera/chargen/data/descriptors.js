define([
        { 
            "label" : "Charming",
            "stats" : {
                "intellect_pool" : 2,
                "shin_count" : 10
            },
            "lists" : {
                "ability_list" : [ "Trained: Pleasant Social Interaction", "Trained: Mind-Affecting Esoteries/Special Abilities" ],
                "inability_list" : [ "Poor at Studying (+1 difficulty in knowledge tasks)", "Weak Will (+1 difficulty in mental defense)" ]
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
                "inability_list" : [ "Poor at Studying (+1 step in knowledge tasks)" ]
            }
        },
        { 
            "label" : "Graceful",
            "stats" : {
                "speed_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Balance and careful movement", "Trained: Speed defense" ]
            }
        },
        { 
            "label" : "Intelligent",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Knowledge area (pick 1)", "Trained: Memory of direct experiences" ]
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
                "bonus_list" : [ "Change State (fugue/bursk/neem)" ]
            }
        },
        { 
            "label" : "Learned",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Knowledge area (pick 1)" ],
                "inability_list" : [ "Poor at charm, persuasion, etiquette (1 step)" ],
                "equipment_list" : [ "Book (pick topic)", "Book (pick topic)" ]
            }
        },
        { 
            "label" : "Mutant*",
            "lists" : {
                "bonus_list" : [ "Two beneficial mutations/Two beneficial + 1 harmful mutation/One powerful or distinctive + 1 harmful mutation (pick set, roll for mutations)", "Cosmetic mutations (0-4, pick number, roll for mutations)" ]
            }
        },
        { 
            "label" : "Mystical/Mechanical",
            "stats" : {
                "intellect_pool" : 2
            },
            "lists" : {
                "equipment_list" : [ "Oddity" ],
                "ability_list" : [ "Trained: Identify/understand the numenera", "Trained: Sense Magic" ],
                "inability_list" : [ "Unnerving aura (Charm, persuasion, deception tasks +1 step)" ],
                "bonus_list" : [ "Hedge Magic (1 intellect)" ]
            }
        },
        { 
            "label" : "Rugged",
            "lists" : {
                "ability_list" : [ "Trained: Climbing", "Trained: Jumping", "Trained: Running", "Trained: Swimming", "Trained: Training, riding, or placating natural animals", "Trained: Identify/use natural plants" ],
                "inability_list" : [ "No social graces (Charm, persuasion, deception tasks +1 step)" ],
                "equipment_list" : [ "Explorer's pack" ]
            }
        },
        { 
            "label" : "Stealthy",
            "stats" : {
                "speed_pool" : 2
            },
            "lists" : {
                "ability_list" : [ "Trained: Stealthy tasks", "Trained: Lies and trickery" ],
                "inability_list" : [ "Slow (+1 step in movement tasks)" ]
            }
        },
        {
            "label" : "Strong",
            "stats" : {
                "might_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Trained: Breaking things", "Trained: Jumping" ],
                "equipment_list" : [ "Medium/Heavy Weapon" ]
            }
        },
        { 
            "label" : "Strong-willed",
            "stats" : {
                "intellect_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Trained: Resist mental effects", "Trained: Concentration or focus" ],
                "inability_list" : [ "Not very bright (figure out puzzles, solve problems, memorization, lore tasks +1 step)" ]
            }
        },
        {
            "label" : "Swift",
            "stats" : {
                "speed_pool" : 4
            },
            "lists" : {
                "ability_list" : [ "Trained: Initiative", "Trained: Running" ],
                "inability_list" : [ "Poor balance (+1 step in balance tasks)" ]
            }
        },
        {
            "label" : "Tough",
            "stats" : {
                "armor_bonus" : 1,
            },
            "lists" : {
                "ability_list" : [ "Healthy (+1 to Recovery Roll points)", "Trained: Might Defense" ],
                "equipment_list" : [ "Light Weapon" ]
            }
        },
        {
            "label" : "Varjellen*",
            "stats" : {
                "free_pool" : -3,
            },
            "lists" : {
                "ability_list" : [ "Trained: Numenera", "Trained: Visually perceiving" ],
                "inability_list" : [ "-1 to Recovery Roll", "History (+1 step)", "Poetry and oratory (+1 step)", "Hearing (+1 step)" ],
                "bonus_list" : [ "Reforging (rearrange Pools freely once every day)" ],
                "equipment_list" : [ "Light Weapon" ]
            }
        }
]);