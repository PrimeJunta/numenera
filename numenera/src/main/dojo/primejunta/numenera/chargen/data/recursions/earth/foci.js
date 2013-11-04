/**
 * Data for foci.
 */
define({
    "F1" : {
        "label" : "Shoots from the Hip",
        "notes_text" : "Shoots from the Hip: Corebook, page 54",
        "description_text" : "Connection: One PC is true friend.\nConnection: One PC is always hit on fumble.",
        "lists" : {
            "equipment_list" : [ "Well-Made Handgun",
                                 "6 bullets" ],
            "ability_list" : [ "Ⓣ Bulletmaker" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Gunslinger" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Covering Fire (1 speed)",
                              "Ⓣ Gunsmith" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Marksman",
                              "Ⓣ Bulletmaker" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Quick Shot",
                              "Ⓣ Gunsmith" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Marksman" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Precise Shot (2 speed)" ]
        }]
    },
    "F3" : {
        "label" : "Controls Beasts",
        "notes_text" : "Controls Beasts: Corebook, page 55",
        "description_text" : "Connection: One PC disturbs your creatures.",
        "lists" : {
            "equipment_list" : [ "3 days food for beast companion" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Beast Companion" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Soothe the Savage (2 intellect)",
                              "Ⓐ Communication (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Mount" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Beast Eyes (3 intellect)",
                              "Ⓔ Improved Companion 1" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Beast Call (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Control the Savage (6 intellect)",
                              "Ⓔ Improved Companion 2" ]
        }]
    },
    "F5" : {
        "label" : "Surfs in Cyberspace",
        "notes_text" : "Surfs in Cyberspace: Corebook, page 57",
        "description_text" : "Connection: One PC knows your master password.",
        "lists" : {
            "equipment_list" : [ "Oddity (sphere that shows pictures)" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Cybernetic Esoteries",
                              "Ⓐ Crack the Code (1 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Bring Down the System (2+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Major Intrusion (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Take Control (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Remote Operator (6 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ We Are Anonymous (8 intellect)" ]
        }]
    },
    "F6" : {
        "label" : "Crafts Unique Objects",
        "notes_text" : "Crafts Unique Objects: Corebook, page 58",
        "description_text" : "Connection: One PC has an extra level 1/2 item made by you.",
        "lists" : {
            "equipment_list" : [ "Bag of Light Tools",
                                 "Self-made level 1/2 item: ${input:choose}",
                                 "Oddity: ${input:GM chooses}" ],
            "ability_list" : [ "Ⓣ Craft item type: ${input:choose}",
                               "Ⓣ Craft item type: ${input:choose}",
                               "Ⓣ Identifying function of device" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Crafter",
                              "Ⓔ Master Identifier" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Tinkerer",
                              "Ⓐ Quick Work (3+ intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Craft item type: ${input:choose}",
                              "Ⓣ Craft item type: ${input:choose}" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Cyphersmith" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Innovator" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Inventor" ]
        }]
    },
    "F8" : {
        "label" : "Entertains",
        "notes_text" : "Entertains: Corebook, page 60",
        "description_text" : "Connection: One PC is your worst critic; your abilities don't work for him/her.",
        "lists" : {
            "equipment_list" : [ "Musical instrument: ${input:choose}" ],
            "ability_list" : [ "Ⓣ All social interactions except coercion, intimidation" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Levity" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Inspiration" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Knowledge area: ${input:choose}",
                              "Ⓣ Knowledge area: ${input:choose}" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Calm (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Able Assistance" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Master Entertainer" ]
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
    "F11" : {
        "label" : "Fights With Panache",
        "notes_text" : "Fights With Panache: Corebook, page 62",
        "description_text" : "Connection: You are always trying to impress one PC.",
        "lists" : {
            "equipment_list" : [ "Extremely stylish clothes",
                                 "Jeweled ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Attack Flourish" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Quick Block" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Acrobatic Attack (3 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Mobile Fighter (3 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Block for Another" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Agile Wit" ]
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
    "F15" : {
        "label" : "Hunts With Great Skill",
        "notes_text" : "Hunts With Great Skill: Corebook, page 65",
        "description_text" : "Connection: One PC once saw you let prey go.",
        "lists" : {
            "equipment_list" : [ "Silent Boots (+1 to Stealth)" ],
            "ability_list" : [ "Ⓣ Tracking",
                               "Ⓣ Climbing",
                               "Ⓣ Swimming",
                               "Ⓣ Jumping",
                               "Ⓣ Balancing",
                               "Ⓣ Running" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Tracker", "Ⓔ Stalker" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Stealth",
                              "Ⓣ Initiative",
                              "Ⓐ Sprint and Grab (2 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Quarry (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Surprise Attack" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Hunter's Drive (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Multiple Quarry (2 intellect)" ]
        }]
    },
    "F16" : {
        "label" : "Leads",
        "notes_text" : "Leads: Corebook, page 66",
        "description_text" : "Connection: One PC is a former follower, current equal.",
        "lists" : {
            "equipment_list" : [ "Artifact (tag Followers)" ],
            "ability_list" : [ "Ⓣ All social interactions" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Natural Charisma", "Ⓐ Good Advice (1 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Follower" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Command (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Capable Follower",
                              "Ⓐ Captivate or Inspire (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Band of Followers" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Mind of a Leader (6 intellect)",
                              "Ⓔ Capable Followers" ]
        }]
    },
    "F17" : {
        "label" : "Lives in the Wilderness",
        "notes_text" : "Lives in the Wilderness: Corebook, page 67",
        "description_text" : "Connection: You dislike one PC for his/her \"civilized\" ways.",
        "lists" : {
            "equipment_list" : [ "Compass" ],
            "ability_list" : [ "Ⓣ Climbing",
                               "Ⓣ Swimming",
                               "Ⓣ Wilderness Navigation",
                               "Ⓣ Identifying plants",
                               "Ⓣ Identifying animals" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Wilderness Life", "Ⓔ Wilderness Lore" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Immune to natural diseases",
                              "Ⓔ Resist natural poisons",
                              "Ⓔ Living off the Land" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Spotting",
                              "Ⓣ Listening",
                              "Ⓔ Trap Sense",
                              "Ⓔ Wilderness Explorer" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Wilderness Awareness (4 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ The Wild Is On Your Side (5 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ One With the Wild (6 intellect)",
                              "Ⓔ Master of the Wild" ]
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
    "F25" : {
        "label" : "Wields Power with Precision",
        "notes_text" : "Wields Power with Precision: Corebook, page 74",
        "description_text" : "Connection: One PC is immune to your esoteries, unless s/he allows them.",
        "lists" : {
            "equipment_list" : [ "Book (numenera)" ]
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
    "F26" : {
        "label" : "Wields Two Weapons at Once",
        "notes_text" : "Wields Two Weapons at Once: Corebook, page 75",
        "description_text" : "Connection: One PC is your training companion; both get +1 to Speed Defense if fighting back to back.",
        "lists" : {
            "equipment_list" : [ "${select:1:Light Bashing|Light Bladed} Weapon: ${input:choose}" ]
        },
        "advancement" : [{
            "bonus_perks" : [ "Ⓔ Dual Light Wield" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Double Strike (3 might)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Dual Medium Wield" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Speed Defense (when dual wielding)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Dual Distraction (4 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Whirling Dervish" ]
        }]
    },
    "F27" : {
        "label" : "Works Miracles",
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
    },
    "F28" : {
        "label" : "Works the Back Alleys",
        "notes_text" : "Works the Back Alleys: Corebook, page 76",
        "description_text" : "Connection: One PC knew you before, and convinced you to quit crime.",
        "lists" : {
            "equipment_list" : [ "Bag of Light Tools" ],
            "ability_list" : [ "Ⓣ Stealth",
                               "Ⓣ Pickpocketing",
                               "Ⓣ Lockpicking" ]
        },
        "advancement" : [{
        },
        {
            "bonus_perks" : [ "Ⓔ Underworld Contacts" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Pull a Fast One (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Climbing",
                              "Ⓣ Escape Artist" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Dirty Fighter (2 speed)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Alley Rat (4 intellect)" ]
        }]
    },
    "F28" : {
        "label" : "Works the System",
        "notes_text" : "Works the System: Corebook, page 76",
        "description_text" : "Connection: You owe one PC a big favor.",
        "lists" : {
            "equipment_list" : [ "Bag of Light Tools" ],
            "ability_list" : [ "Ⓣ Bureaucracy",
                               "Ⓣ Law",
                               "Ⓣ Persuasion" ]
        },
        "advancement" : [{
        },
        {
            "bonus_perks" : [ "Ⓔ Corporate Contacts" ]
        },
        {
            "bonus_perks" : [ "Ⓔ Pull a Fast One (3 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓣ Social Climbing",
                              "Ⓣ Escape Artist" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Dirty Schemer (2 intellect)" ]
        },
        {
            "bonus_perks" : [ "Ⓐ Suit (4 intellect)" ]
        }]
    }
});