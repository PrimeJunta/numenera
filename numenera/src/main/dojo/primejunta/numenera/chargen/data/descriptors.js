define({
    "D0" : {
        "label" : "Charming",
        "notes_text" : "Charming: Corebook, page 47",
        "stats" : {
            "intellect_pool" : 2,
            "shin_count" : 10
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Pleasant Social Interaction", "Ⓣ Mind-Affecting Esoteries/Special Abilities" ],
            "inability_list" : [ "Poor at Studying (Knowledge tasks +1 step)", "Weak Will (Intellect Defense +1 step)" ]
        }
    },
    "D1" : {
        "label" : "Clever",
        "notes_text" : "Clever: Corebook, page 48",
        "stats" : {
            "intellect_pool" : 2,
            "shin_count" : 10
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Lies and trickery", "Ⓣ Intellect Defense", "Ⓣ Assessing danger, lies, quality, importance, function, or power" ],
            "inability_list" : [ "Poor at Studying (Knowledge tasks +1 step)" ]
        }
    },
    "D2" : {
        "label" : "Graceful",
        "notes_text" : "Graceful: Corebook, page 48",
        "stats" : {
            "speed_pool" : 2
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Balancing", "Ⓣ Careful movement", "Ⓣ Speed Defense" ]
        }
    },
    "D3" : {
        "label" : "Intelligent",
        "notes_text" : "Intelligent: Corebook, page 48",
        "stats" : {
            "intellect_pool" : 2
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Memory of direct experiences" ]
        }
    },
    "D4" : {
        "label" : "Lattimor*",
        "description_text" : "Lattimors are ultraterrestrials. Ask your GM if lattimor PC's are allowed in your game, and how they behave.",
        "notes_text" : "Lattimor: Corebook, page 124",
        "stats" : {
            "might_pool" : 4
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Perceiving (fugue)", "Ⓣ Attacks with chosen weapon (bursk)", "Ⓣ Breaking things (bursk)", "Ⓣ Perceiving (bursk)", "Ⓣ All interactions (neem)", "Ⓣ Study, contemplation, concentration, including esoteries (neem)" ],
            "inability_list" : [ "Lore, knowledge, understanding (+1 step/bursk)", "Pleasant interactions (+1 step/bursk)", "Contemplation, study, concentration, including esoteries (+1 step/bursk)", "All combat tasks (+1 step/neem)", "Perceiving anything unexpected (+1 step/neem)" ],
            "bonus_list" : [ "Ⓐ Change State (fugue/bursk/neem)" ]
        }
    },
    "D5" : {
        "label" : "Learned",
        "notes_text" : "Learned: Corebook, page 48",
        "stats" : {
            "intellect_pool" : 2
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Knowledge area: ${input:choose}" ],
            "inability_list" : [ "Poor at charm, persuasion, etiquette (+1 step)" ],
            "equipment_list" : [ "Book: ${input:choose topic}", "Book: ${input:choose topic}" ]
        }
    },
    "D6" : {
        "label" : "Mutant*",
        "notes_text" : "Mutant: Corebook, page 125",
        "description_text" : "Mutant is an optional descriptor. Ask your GM if they're allowed in your game, and work with him/her to decide on your mutations.",
        "lists" : {
            "bonus_list" : [ "${select:1:2 beneficial mutations|1 harmful + 3 beneficial mutations|1 harmful + 1 powerful mutation|1 harmful + 1 distinctive mutation}", "0-4 cosmetic mutations" ]
        }
    },
    "D7" : {
        "label" : "Mystical/Mechanical",
        "notes_text" : "Mystical/Mechanical: Corebook, page 49",
        "stats" : {
            "intellect_pool" : 2
        },
        "lists" : {
            "equipment_list" : [ "Oddity: ${input:GM chooses}" ],
            "ability_list" : [ "Ⓣ Identifying/Understanding the Numenera", "Ⓣ Sense Magic" ],
            "inability_list" : [ "Unnerving aura (Charm, persuasion, deception tasks +1 step)" ],
            "bonus_list" : [ "Ⓐ Hedge Magic (1 intellect)" ]
        }
    },
    "D8" : {
        "label" : "Rugged",
        "notes_text" : "Rugged: Corebook, page 49",
        "lists" : {
            "ability_list" : [ "Ⓣ Climbing", "Ⓣ Jumping", "Ⓣ Running", "Ⓣ Swimming", "Ⓣ Training animals", "Ⓣ Riding animals", "Ⓣ Placating animals", "Ⓣ Identifying plants", "Ⓣ Using plants" ],
            "inability_list" : [ "No social graces (Charm, persuasion, deception tasks +1 step)" ],
            "equipment_list" : [ "Explorer's pack" ]
        }
    },
    "D9" : {
        "label" : "Stealthy",
        "notes_text" : "Stealthy: Corebook, page 50",
        "stats" : {
            "speed_pool" : 2
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Stealth", "Ⓣ Lies and trickery" ],
            "inability_list" : [ "Slow (Movement tasks +1 step)" ]
        }
    },
    "D10" : {
        "label" : "Strong",
        "notes_text" : "Strong: Corebook, page 50",
        "stats" : {
            "might_pool" : 4
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Breaking things", "Ⓣ Jumping" ],
            "equipment_list" : [ "${select:1:Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ]
        }
    },
    "D11" : {
        "label" : "Strong-willed",
        "notes_text" : "Strong-willed: Corebook, page 50",
        "stats" : {
            "intellect_pool" : 4
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Resist mental effects", "Ⓣ Concentration or focus" ],
            "inability_list" : [ "Not very bright (puzzles, problems, memorization, lore tasks +1 step)" ]
        }
    },
    "D12" : {
        "label" : "Swift",
        "notes_text" : "Swift: Corebook, page 51",
        "stats" : {
            "speed_pool" : 4
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Initiative", "Ⓣ Running" ],
            "inability_list" : [ "Poor balance (Balancing +1 step)" ]
        }
    },
    "D13" : {
        "label" : "Tough",
        "notes_text" : "Tough: Corebook, page 51",
        "stats" : {
            "armor_bonus" : 1,
            "recovery_roll" : 1
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Might Defense" ],
            "equipment_list" : [ "${select:1:Light Bashing|Light Bladed|Light Ranged} Weapon: ${input:choose}" ],
            "bonus_list" : [ "Ⓔ Resilient", "Ⓔ Healthy" ]
        }
    },
    "D14" : {
        "label" : "Varjellen*",
        "description_text" : "Varjellen are ultraterrestrials. Ask your GM if varjellen PC's are allowed in your game, and how they behave.",
        "notes_text" : "Varjellen: Corebook, page 123",
        "stats" : {
            "free_pool" : -3,
            "recovery_roll" : -1
        },
        "lists" : {
            "ability_list" : [ "Ⓣ Identifying/Understanding the Numenera", "Ⓣ Visually perceiving" ],
            "inability_list" : [ "History (+1 step)", "Poetry and oratory (+1 step)", "Hearing (+1 step)" ],
            "bonus_list" : [ "Ⓐ Reforging (rearrange Pools freely once every day)" ]
        }
    }
});