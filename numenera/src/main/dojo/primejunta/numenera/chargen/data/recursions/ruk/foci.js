/**
 * Data for foci.
 */
define({
    "F2" : {
        "label" : "Commands Mental Powers",
        "notes_text" : "Commands Mental Powers: Corebook, page 54",
        "description_text" : "Connection: You have a telepathic connection to one PC.",
        "lists" : {
            "equipment_list" : [ "Intellect Crystal (+1 intellect Pool, -5 if lost)" ],
            "ability_list" : [ "Ⓣ Mind Control",
                               "Ⓣ Mind Reading" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓐ Telepathic (1+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Mind Reading (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Psychic Burst (3+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Use Senses of Others (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Mind Control (6+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Telepathic Network (0+ intellect)" ]
        }]
    },
    "F4" : {
        "label" : "Controls Gravity",
        "notes_text" : "Controls Gravity: Corebook, page 56",
        "description_text" : "Connection: One PC was once hurt by your use of your powers.",
        "lists" : {
            "equipment_list" : [ "Oddity (point to read weight of object)" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓐ Hover (1 intellect)" ]
        },
        {
            "stats" : { "speed_edge" : 1 },
            "bonus_perks" : [ "Ⓔ Lessening Gravity's Pull" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Gravity Cleave (3 intellect)"]
        },
        {
            "bonus_perks" : [ "Ⓔ Field of Gravity (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Flight (4+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Weight of the World (6+ intellect)" ]
        }]
    },    "F9" : {
        "label" : "Exists Partially Out of Phase",
        "notes_text" : "Exists Partially Out of Phase: Corebook, page 60",
        "description_text" : "Connection: One PC is old friend who helped you get control of your abilities.",
        "lists" : {
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓐ Walk through walls (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Defensive Phasing (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Phased Attack (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Ghost (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Untouchable (6 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Enhanced Phased Attack (5 intellect)" ]
        }]
    },
    "F10" : {
        "label" : "Explores Dark Places",
        "notes_text" : "Explores Dark Places: Corebook, page 61",
        "description_text" : "Connection: One PC is an old companion, and always gets +1 on rolls when working with you.",
        "lists" : {
            "equipment_list" : [ "Explorer's Pack" ],
            "ability_list" : [ "Ⓣ Searching",
                               "Ⓣ Listening",
                               "Ⓣ Climbing",
                               "Ⓣ Balancing",
                               "Ⓣ Jumping" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Trained Explorer",
                              "Ⓔ Dark esoteries" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Lockpicking",
                              "Ⓣ Tinkering with devices",
                              "Ⓔ Eyes Adjusted" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Speed Defense (in light or no armor)",
                              "Ⓣ Escape Artist" ]
        },
        {
            "stats" : {
                "armor_bonus" : 1
            },
            "bonus_perks" : [ "Ⓔ Resilient",
                              "Ⓣ Might Defense" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Stealth (in low light or darkness)",
                              "Ⓔ Dark Explorer" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Blinding Attack (3 speed)" ]
        }]
    },
    "F12" : {
        "label" : "Focuses Mind over Matter",
        "notes_text" : "Focuses Mind over Matter: Corebook, page 63",
        "description_text" : "Connection: One PC causes your mental powers to act strangely.",
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Mental esoteries",
                              "Ⓐ Deflect Attacks (1 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Telekinesis (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Enhance Strength (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Apportation (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Psychokinetic Attack (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Reshape Matter (6 intellect)" ]
        }]
    },
    "F13" : {
        "label" : "Fuses Flesh and Steel",
        "notes_text" : "Fuses Flesh and Steel: Corebook, page 64",
        "description_text" : "Connection: One PC knows your nature or a command to temporarily disable your mechanical parts.",
        "lists" : {
            "equipment_list" : [ "Bag of Light Tools",
                                 "Spare parts (for self)" ],
            "inability_list" : [ "Ⓘ Special Healing (first 5 points need to be repaired)" ]
        },
        "advancement" : [{
            "stats" : {
                "might_pool" : 3,
                "speed_pool" : 3,
                "armor_bonus" : 1
            },
            "bonus_perks" : [ "Ⓔ Enhanced Body" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Interface" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Weaponization: ${input:choose}" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Fusion" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Deep Reserves" ]
        },
        {
            "stats" : {
                "might_pool" : 5,
                "speed_pool" : 5,
                "intellect_pool" : 5,
                "armor_bonus" : 1
            },
            "bonus_perks" : [ "Ⓔ Ultra Enhancement" ]
        }]
    },
    "F14" : {
        "label" : "Howls at the Moon",
        "notes_text" : "Howls at the Moon: Corebook, page 64",
        "description_text" : "Connection: One PC knows how to calm you in your beast state.",
        "lists" : {
            "equipment_list" : [ "Artifact (chronometer)" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Beast Form" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Controlled Change" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Greater Beast Form" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Greater Controlled Change" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Enhanced Beast Form" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Perfect Control" ]
        }]
    },
    "F18" : {
        "label" : "Masters Defense",
        "notes_text" : "Masters Defense: Corebook, page 68",
        "description_text" : "Connection: One PC once saved your life.",
        "lists" : {
            "equipment_list" : [ "Shield" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Shield Master" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Might Defense",
                              "Ⓔ Armor Expert" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Dodge and Resist (3 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Intellect Defense",
                              "Ⓔ Armor Master" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Nothing But Defend" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Defense Master" ]
        }]
    },
    "F19" : {
        "label" : "Masters Weaponry",
        "notes_text" : "Masters Weaponry: Corebook, page 69",
        "description_text" : "Connection: One PC shows promise in use of your chosen weapon.",
        "lists" : {
            "equipment_list" : [ "High-quality ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Weapon Master: ${input:choose}",
                              "Ⓔ Weaponry esoteries" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Speed Defense (with chosen weapon)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Rapid Attack (3 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Never Fumble" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Extreme Mastery (4 might)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Damage Dealer",
                              "Ⓐ Death Dealer (5 might)" ]
        }]
    },
    "F20" : {
        "label" : "Murders",
        "notes_text" : "Murders: Corebook, page 70",
        "description_text" : "Connection: One PC knows your secret past.",
        "lists" : {
            "equipment_list" : [ "Disguise kit",
                                 "Level 2/5 DAM blade poison, (3 doses)" ],
            "ability_list" : [ "Ⓣ Stealth",
                               "Ⓣ Disguise" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Surprise Attack" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Quick Death (2 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Lies, trickery",
                              "Ⓣ Craft item type: Poisons",
                              "Ⓣ Identify, Sense, Resist Poisons" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Better Surprise Attack" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Slayer (5 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Escape Plan" ]
        }]
    },
    "F21" : {
        "label" : "Rages",
        "notes_text" : "Rages: Corebook, page 71",
        "description_text" : "Connection: You feel protective about one PC.",
        "lists" : {
            "bonus_list" : [ "Frenzy (1 intellect)" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Frenzy (1 intellect)" ]
        },
        {
            "stats" : {
                "might_pool" : 5
            },
            "bonus_perks" : [ "Ⓔ Hardy",
                              "Ⓣ Climbing",
                              "Ⓣ Jumping" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Power Strike (3+ might)",
                              "Ⓔ Unarmored Fighter" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Greater Frenzy (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Attack and Attack Again" ]
        },
        {
            "stats" : {
                "might_pool" : 6,
                "speed_pool" : 6
            },
            "bonus_perks" : [ "Ⓔ Tough and Fast" ]
        }]
    },
    "F22" : {
        "label" : "Rides the Lightning",
        "notes_text" : "Rides the Lightning: Corebook, page 71",
        "description_text" : "Connection: One PC is an old friend, and can come along with Bolt Rider or Electrical Flight.",
        "lists" : {
            "equipment_list" : [ "Bag of miscellaneous batteries and power cells" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Electrical esoteries",
                              "Ⓐ Shock (1 intellect)",
                              "Ⓐ Charge (1+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Bolt Rider (4 intellect)" ]
        },
        {
            "stats" : {
                "speed_pool" : 3,
                "speed_edge" : 1
            },
            "bonus_perks" : [ "Ⓔ Lightning Swift",
                              "Ⓐ Drain Charge" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Bolts of Power (5+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Electrical Flight (5 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Wall of Lightning (6 intellect)" ]
        }]
    },
    "F23" : {
        "label" : "Talks to Machines",
        "notes_text" : "Talks to Machines: Corebook, page 72",
        "description_text" : "Connection: One PC is terrible with (your) machines.",
        "lists" : {
            "equipment_list" : [ "Bag of Light Tools" ],
            "ability_list" : [ "Ⓣ All tasks involving electrical machines" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Machine Affinity", "Ⓐ Distant Activation (1 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Coaxing Power (2 intellect)",
                              "Ⓐ Charm Machine (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Intelligent Interface (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Machine Companion",
                              "Ⓣ Attacks against automata",
                              "Ⓣ Defense against automata" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Information Gathering (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Control Machine (6 intellect)" ]
        }]
    },
    "F25" : {
        "label" : "Wields Power with Precision",
        "notes_text" : "Wields Power with Precision: Corebook, page 74",
        "description_text" : "Connection: One PC is immune to your esoteries, unless s/he allows them.",
        "lists" : {
            "equipment_list" : [ "Book (strange)" ]
        },
        "advancement" : [{
            "stats" : {
                "intellect_pool" : 5
            },
            "bonus_perks" : [ "Ⓔ Genius" ]
        },
        {
            "bonus_perks" : [ "Ⓣ All Esoteries" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Enhanced Esoteries" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Greater Repertoire",
                              "${select:1:@perkSelector}" ]
        },
        {
            "bonus_perks" : [ "Ⓣ All Esoteries" ]
        },
        {
            "stats" : {
                "intellect_pool" : 6,
                "intellect_edge" : 1
            },
            "bonus_perks" : [ "Ⓔ Supra Genius" ]
        }]
    },
    "F27" : {
        "label" : "Regenerates Flesh",
        "notes_text" : "Works Miracles: Corebook, page 75",
        "description_text" : "Connection: One PC thinks you're a messiah or supernatural being.",
        "advancement" : [{
            "bonus_perks" : [ "Ⓐ Healing Touch (1 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Alleviate (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Font of Healing" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Inspiration (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Undo (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Greater Healing Touch (4 intellect)" ]
        }]
    }
});