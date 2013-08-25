define([
    {
        "label" : "glaive",
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
            "equipment_list" : [
                "Clothing", "Weapon: ${input:choose}", "${select:1:Shield|Weapon}: ${input:choose}", "${select:1:Light armor|Medium armor}: ${input:choose}", "Explorer's pack", "Cypher: ${input:GM chooses}", "Cypher: ${input:GM chooses}", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Trained: ${select:1:Balancing|Climbing|Jumping|Swimming}" ],
            "special_list" : [ "${select:2:Bash (1 might)|No Need for Weapons|Pierce (1 speed)|Thrust (1 might)|Trained Without Armor}" ],
            "reference_list" : [ "Glaive: Corebook, page 26" ],
            "bonus_list" : [ "Practiced in Armor", "Practiced With All Weapons" ]
        }
    },
    {
        "label" : "nano",
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
            "equipment_list" : [
                "Clothing", "Weapon: ${input:choose}", "Book (numenera)", "Cypher: ${input:GM chooses}", "Cypher: ${input:GM chooses}", "Cypher: ${input:GM chooses}", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Trained: Identifying/understanding the numenera" ],
            "special_list" : [ "${select:2:Hedge Magic (1 intellect)|Onslaught (1 intellect)|Push (2 intellect)|Scan (2 intellect)|Ward (+1 Armor)}" ],
            "reference_list" : [ "Nano: Corebook, page 32" ],
            "bonus_list" : [ "Practiced With Light Weapons" ]
        }
    },
    {
        "label" : "jack",
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
            "equipment_list" : [
                "Clothing", "Weapon: ${input:choose}", "Weapon: ${input:choose}", "Light Armor: ${input:choose}", "Explorer's pack", "Bag of Light Tools", "Cypher: ${input:GM chooses}", "Cypher: ${input:GM chooses}", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Trained: ${input:choose any non-combat}" ],
            "special_list" : [ "${select:2:Bash (1 might)|Hedge Magic (1 intellect)|Pierce (1 speed)|Thrust (1 might)|Practiced in Armor|Skill With Defense|Trained Without Armor}" ],
            "reference_list" : [ "Jack: Corebook, page 40" ],
            "bonus_list" : [ "Flex Skill", "Practiced With Light/Medium Weapons" ]
        }
    }
]);