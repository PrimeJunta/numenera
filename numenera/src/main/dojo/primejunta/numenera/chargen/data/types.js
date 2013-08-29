define([
    {
        "label" : "glaive",
        "description_text" : "Glaives are warriors: soldiers, mercenaries, bodyguards, and other masters of the martial arts.",
        "special_list_label" : "Fighting Moves",
        "stats" : {
            "armor_bonus" : 0,
            "free_pool" : 6,
            "might_pool" : 11,
            "speed_pool" : 10,
            "intellect_pool" : 7,
            "free_edge" : 0,
            "might_edge" : 1,
            "speed_edge" : 1,
            "intellect_edge" : 0,
            "cypher_count" : 2,
            "shin_count" : 5,
            "recovery_roll" : 1
        },
        "lists" : {
            "cypher_list" : [ "${input:GM chooses}", "${input:GM chooses}" ],
            "equipment_list" : [
                "Clothing", "${select:1:Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}", "${select:1:Shield|Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}", "${select:1:Light armor|Medium armor}: ${input:choose}", "Explorer's pack", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ ${select:1:Balancing|Climbing|Jumping|Swimming}" ],
            "special_list" : [ "${select:2:Bash (1 might)|No Need for Weapons|Pierce (1 speed)|Thrust (1 might)|Trained Without Armor}" ],
            "reference_list" : [ "Glaive: Corebook, page 26" ],
            "bonus_list" : [ "Practiced in Armor", "Practiced With All Weapons" ]
        }
    },
    {
        "label" : "nano",
        "description_text" : "Nanos are the 'wizards' of the Ninth World, performing miracles through the numenera.",
        "special_list_label" : "Esoteries",
        "stats" : {
            "armor_bonus" : 0,
            "free_pool" : 6,
            "might_pool" : 7,
            "speed_pool" : 9,
            "intellect_pool" : 12,
            "free_edge" : 0,
            "might_edge" : 0,
            "speed_edge" : 0,
            "intellect_edge" : 1,
            "cypher_count" : 3,
            "shin_count" : 4,
            "recovery_roll" : 1
        },
        "lists" : {
            "cypher_list" : [ "${input:GM chooses}", "${input:GM chooses}", "${input:GM chooses}" ],
            "equipment_list" : [
                "Clothing", "${select:1:Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}", "Book (numenera)", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ Identifying/understanding the numenera" ],
            "special_list" : [ "${select:2:Hedge Magic (1 intellect)|Onslaught (1 intellect)|Push (2 intellect)|Scan (2 intellect)|Ward (+1 Armor)}" ],
            "reference_list" : [ "Nano: Corebook, page 32" ],
            "bonus_list" : [ "Practiced With Light Weapons" ]
        }
    },
    {
        "label" : "jack",
        "description_text" : "The Jack-of-all trades, master of those of his choosing, is the most flexible of the character types.",
        "special_list_label" : "Tricks of the Trade",
        "stats" : {
            "armor_bonus" : 0,
            "free_pool" : 6,
            "might_pool" : 10,
            "speed_pool" : 10,
            "intellect_pool" : 10,
            "free_edge" : 1,
            "might_edge" : 0,
            "speed_edge" : 0,
            "intellect_edge" : 0,
            "cypher_count" : 2,
            "shin_count" : 8,
            "recovery_roll" : 1
        },
        "lists" : {
            "cypher_list" : [ "${input:GM chooses}", "${input:GM chooses}" ],
            "equipment_list" : [
                "Clothing", "${select:2:Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}", "Light Armor: ${input:choose}", "Explorer's pack", "Bag of Light Tools", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ ${input:choose any non-combat}" ],
            "special_list" : [ "${select:2:Bash (1 might)|Hedge Magic (1 intellect)|Pierce (1 speed)|Thrust (1 might)|Practiced in Armor|Skill With Defense|Trained Without Armor}" ],
            "reference_list" : [ "Jack: Corebook, page 40" ],
            "bonus_list" : [ "Flex Skill", "Practiced With Light/Medium Weapons" ]
        }
    }
]);