define([
    {
        "label" : "glaive",
        "description_text" : "Glaives are warriors: soldiers, mercenaries, bodyguards, and other masters of the martial arts.",
        "special_list_label" : "Fighting Moves",
        "stats" : {
            "character_tier" : 1,
            "character_effort" : 1,
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
                "Clothing", 
                "${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}", 
                "${select:1:Shield|Light Bashing Weapon|Light Bladed Weapon|Light Ranged Weapon|Medium Bashing Weapon|Medium Bladed Weapon|Medium Ranged Weapon|Heavy Bashing Weapon|Heavy Bladed Weapon|Heavy Ranged}: ${input:choose}", 
                "${select:1:Light armor|Medium armor}: ${input:choose}", 
                "Explorer's pack", 
                "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ ${select:1:Balancing|Climbing|Jumping|Swimming}" ],
            "reference_list" : [ "Glaive: Corebook, page 26" ],
            "bonus_list" : [ "Ⓔ Practiced in Armor", "Ⓔ Practiced With All Weapons" ]
        },
        "advancement" : [
         {
             "perk_list" : "Ⓐ Bash (1 might)|Ⓔ No Need for Weapons|Ⓐ Pierce (1 speed)|Ⓐ Thrust (1 might)|Ⓣ Speed Defense (when not wearing armor)"
         },
         {
            "bonus_perks" : [ "Ⓣ ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged}" ], // no stack,
            "perk_list" : "Ⓐ Chop (2 might)|Ⓐ Crush (2 might)|Ⓔ Reload (1 speed)|Ⓔ Successive Attack (2 speed)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense" // no stack
        },
        {
            "stats" : {  "cypher_count" : 1 },
            "bonus_perks" : [ "Ⓣ ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged}" ], // no stack,
            "perk_list" : "Ⓔ Experienced With Armor|Ⓐ Lunge (2 might)|Ⓐ Slice (2 speed)|Ⓐ Spray (2 speed)|Ⓐ Trick shot (2 speed)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense" // no stack
        },
        {
            "bonus_perks" : [ "Ⓣ ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged}" ], // no stack,
            "perk_list" : "Ⓔ Capable Warrior (+1 damage)|Ⓔ Experienced Defender (+1 armor)|Ⓐ Feint (2 speed)|Ⓔ Minor to Major|Snipe (2 speed)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense" // no stack
        },
        {
            "skills_stack" : true,
            "stats" : { "cypher_count" : 1 },
            "bonus_perks" : [ "Ⓣ ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged}" ], //stacks,
            "perk_list" : "Ⓐ Arc Spray (3 speed)|Ⓐ Jump Attack (5 might)|Ⓔ Mastery with Armor|Ⓔ Parry (5 speed)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense" // stacks
        },
        {
            "skills_stack" : true,
            "bonus_perks" : [ "Ⓣ ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged}" ], //stacks,
            "perk_list" : "Ⓔ Finishing Blow (5 might)|Ⓔ Slayer (3 might)|Ⓐ Spin Attack (5 speed)|Ⓐ Weapon and Body (5 speed)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense" // stacks
        }]
    },
    {
        "label" : "nano",
        "description_text" : "Nanos are the 'wizards' of the Ninth World, performing miracles through the numenera.",
        "special_list_label" : "Esoteries",
        "stats" : {
            "character_tier" : 1,
            "character_effort" : 1,
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
                "Clothing", "${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}", "Book (numenera)", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ Identifying/understanding the numenera" ],
            "reference_list" : [ "Nano: Corebook, page 32" ],
            "bonus_list" : [ "Ⓔ Practiced With Light Weapons" ]
        },
        "advancement" : [{
                 "perk_list" : "Ⓐ Hedge Magic (1 intellect)|Ⓐ Onslaught (1 intellect)|Ⓐ Push (2 intellect)|Ⓐ Scan (2 intellect)|Ⓔ Ward"
             },
             {
                "perk_list" : "Ⓐ Adaptation (2 intellect)|Ⓐ Flash (4 intellect)|Ⓐ Hover (2 intellect)|Ⓐ Mind Reading (4 intellect)|Ⓐ Stasis (3 intellect)"
            },
            {
                "stats" : { "cypher_count" : 1 },
                "perk_list" : "Ⓐ Barrier (3+ intellect)|Ⓐ Countermeasures (4 intellect)|Ⓐ Energy Protection (3+ intellect)|Ⓐ Sensor (4 intellect)|Ⓣ Targeting Eye"
            },
            {
                "perk_list" : "Ⓐ Invisibility (4 intellect)|Ⓐ Mind Control (6+ intellect)|Ⓐ Regeneration (6 intellect)|Ⓐ Reshape (5 intellect)|Ⓐ Slay (6 intellect)"
            },
            {
                "stats" : { "cypher_count" : 1 },
                "perk_list" : "Ⓐ Absorb Energy (7 intellect)|Ⓐ Dust to Dust (7 intellect)|Ⓐ Knowing the Unknown (6 intellect)|Ⓐ Teleportation (6+ intellect)|Ⓔ True Senses"
            },
            {
                "perk_list" : "Ⓐ Control Weather (10 intellect)|Ⓐ Move Mountains (9 intellect)|Ⓐ Traverse the Worlds (8+ intellect)|Ⓐ Usurp Cypher"
            }]
    },
    {
        "label" : "jack",
        "description_text" : "The Jack-of-all trades, master of those of his choosing, is the most flexible of the character types.",
        "special_list_label" : "Tricks of the Trade",
        "stats" : {
            "character_tier" : 1,
            "character_effort" : 1,
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
                "Clothing", "${select:2:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}", "Light Armor: ${input:choose}", "Explorer's pack", "Bag of Light Tools", "Oddity: ${input:GM chooses}"
            ],
            "ability_list" : [ "Ⓣ ${input:choose any non-combat}" ],
            "reference_list" : [ "Jack: Corebook, page 40" ],
            "bonus_list" : [ "Flex Skill", "Practiced With Light/Medium Weapons" ]
        },
        "advancement" : [{
            "perk_list" : "Ⓐ Bash (1 might)|Ⓐ Hedge Magic (1 intellect)|Ⓐ Pierce (1 speed)|Ⓐ Thrust (1 might)|Ⓔ Practiced in Armor|Ⓣ Speed Defense (when not wearing armor)|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense"
        },
        {
           "bonus_perks" : [ "Ⓣ ${input:choose any non-combat}" ],
           "perk_list" : "Ⓔ Brute Finesse|Ⓔ Experienced Adventurer|Ⓔ No Need for Weapons|Ⓐ Push (2 intellect)|Ⓔ Reload (1 speed)|Ⓔ Ward"
       },
       {
           "stats" : { "cypher_count" : 1 },
           "bonus_perks" : [ "Ⓣ ${input:choose any non-combat}" ],
           "perk_list" : "Ⓐ Enhancement (4 intellect)|Ⓐ Hover (3 intellect)|Ⓐ Mind Reading (4 intellect)|Ⓐ Onslaught (2 intellect)|Ⓣ Light Bashing|Ⓣ Light Bladed|Ⓣ Light Ranged|Ⓣ Medium Bashing|Ⓣ Medium Bladed|Ⓣ Medium Ranged|Ⓣ Heavy Bashing|Ⓣ Heavy Bladed|Ⓣ Heavy Ranged"
       },
       {
           "bonus_perks" : [ "Ⓣ ${input:choose any non-combat}" ],
           "perk_list" : "Ⓔ Analytical Combat|Ⓐ Lunge (2 might)|Ⓐ Slice (2 speed)|Ⓐ Spray (2 speed)|Ⓐ Transdimensional Weapon (3 intellect)"
       },
       {
           "skills_stack" : true,
           "stats" : { "cypher_count" : 1 },
           "bonus_perks" : [ "Ⓣ ${input:choose any non-combat}" ],
           "perk_list" : "Ⓐ Feint (3 speed)|Ⓐ Snipe (3 speed)|Ⓔ Successive Attack (2 speed)|Ⓣ Targeting Eye|Ⓣ Might Defense|Ⓣ Speed Defense|Ⓣ Intellect Defense"
       },
       {
           "skills_stack" : true,
           "bonus_perks" : [ "Ⓣ ${input:choose any non-combat}" ],
           "perk_list" : "Ⓐ Energy Protection (4+ intellect)|Ⓐ Invisibility (4 intellect)|Ⓔ Parry (6 speed)|Ⓐ Spin Attack (6 speed)|Ⓔ True Senses"
       }]
    }
]);