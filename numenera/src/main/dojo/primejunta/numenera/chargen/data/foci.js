define([
        {
            "label" : "Bears a Halo of Fire",
            "lists" : {
                "equipment_list" : [ "Artifact (Fireproofer)" ],
                "bonus_list" : [ "Fire esoteries", "Shroud of Flame (1 intellect)" ],
                "connection_list" : [ "Fire abilities cannot harm one PC" ]
            }
        },
        {
            "label" : "Carries a Quiver",
            "lists" : {
                "equipment_list" : [ "Well-made bow", "24 arrows" ],
                "ability_list" : [ "Archer (spend Speed or intellect Effort to increase damage)", "Trained: Fletcher" ],
                "connection_list" : [ "One PC is true friend", "One PC always hit on fumble" ]
            }
        },
        {
            "label" : "Commands Mental Powers",
            "lists" : {
                "equipment_list" : [ "Intellect Crystal (+1 intellect Pool, -5 if lost)" ],
                "ability_list" : [ "Trained: Mind Control (if has it)", "Trained: Mind Reading (if has it)" ],
                "bonus_list" : [ "Telepathic (1+ intellect)" ],
                "connection_list" : [ "Telepathic connection to one PC" ]
            }
        },
        {
            "label" : "Controls Beasts",
            "lists" : {
                "equipment_list" : [ "3 days food for beast companion" ],
                "ability_list" : [ "Beast Companion (Level 2, your size or smaller)" ],
                "connection_list" : [ "One PC disturbs your creatures" ]
            }
        },
        {
            "label" : "Controls Gravity",
            "lists" : {
                "equipment_list" : [ "Oddity (point to read weight of object)" ],
                "bonus_list" : [ "Hover (1 intellect)" ],
                "connection_list" : [ "One PC was hurt by use of powers" ]
            }
        },
        {
            "label" : "Crafts Illusions",
            "lists" : {
                "equipment_list" : [ "Oddity (sphere that shows pictures)" ],
                "bonus_list" : [ "Psychedelic esoteries", "Minor Illusion (1 intellect)" ],
                "connection_list" : [ "One PC never fooled by illusions" ]
            }
        },
        {
            "label" : "Crafts Unique Objects",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools", "Any self-made level 1/2 item", "Oddity" ],
                "ability_list" : [ "Trained: Craft item type (choose 2)", "Trained: Identify function of device" ],
                "connection_list" : [ "One PC has extra self-made level 1/2 item" ]
            }
        },
        {
            "label" : "Employs Magnetism",
            "lists" : {
                "bonus_list" : [ "Move Metal (1 intellect)" ],
                "connection_list" : [ "Makes one PC's metallic items rattle" ]
            }
        },
        {
            "label" : "Entertains",
            "lists" : {
                "equipment_list" : [ "Musical instrument (or whatever is applicable)" ],
                "ability_list" : [ "Trained: All social interactions except coercion, intimidation", "+1 to comrades' Recovery Rolls" ],
                "connection_list" : [ "One PC is worst critic; abilities don't work for him/her" ]
            }
        },
        {
            "label" : "Exists Partially Out of Phase",
            "lists" : {
                "bonus_list" : [ "Walk through walls (2 intellect)" ],
                "connection_list" : [ "One PC is old friend who helped get control of abilities" ]
            }
        },
        {
            "label" : "Explores Dark Places",
            "lists" : {
                "equipment_list" : [ "Explorer's Pack (trade for something applicable if already have one)" ],
                "ability_list" : [ "Trained: Searching", "Trained: Listening", "Trained: Climbing", "Trained: Balancing", "Trained: Jumping" ],
                "bonus_list" : [ "Dark esoteries" ],
                "connection_list" : [ "One PC is old companion, always gets +1 on rolls when working with you" ]
            }
        },
        {
            "label" : "Fights With Panache",
            "lists" : {
                "equipment_list" : [ "Extremely stylish clothes", "Jeweled weapon" ],
                "ability_list" : [ "Attack Flourish (+1 to next die roll to selected creatures)" ],
                "connection_list" : [ "Always trying to impress one PC" ]
            }
        },
        {
            "label" : "Focuses Mind over Matter",
            "lists" : {
                "bonus_list" : [ "Mental esoteries", "Deflect Attacks (1 intellect)" ],
                "connection_list" : [ "One PC causes mental powers to act strangely" ]
            }
        },
        {
            "label" : "Fuses Flesh and Steel",
            "stats" : {
                "might_pool" : 3,
                "speed_pool" : 3,
                "armor_bonus" : 1
            },
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools", "Spare parts (for self)" ],
                "inability_list" : [ "Special Healing (first 5 points need to be repaired)" ],
                "connection_list" : [ "One PC knows your nature or a command to temporarily disable your mechanical parts" ]
            }
        },
        {
            "label" : "Howls at the Moon",
            "lists" : {
                "equipment_list" : [ "Chronometer artifact" ],
                "bonus_list" : [ "Beast Form (see p. 65)" ],
                "connection_list" : [ "One PC knows how to calm you" ]
            }
        },
        {
            "label" : "Hunts With Great Skill",
            "lists" : {
                "equipment_list" : [ "Silent Boots (+1 to sneaking)" ],
                "ability_list" : [ "Trained: Tracking", "Trained: Climbing", "Trained: Swimming", "Trained: Jumping", "Trained: Balancing", "Trained: Running" ],
                "connection_list" : [ "One PC saw you let prey go" ]
            }
        },
        {
            "label" : "Leads",
            "lists" : {
                "equipment_list" : [ "Artifact (Tag Followers)" ],
                "ability_list" : [ "Trained: All social interactions" ],
                "bonus_list" : [ "Good Advice: Subject is Trained in task for 1 round (1 intellect)" ],
                "connection_list" : [ "One PC is former follower, current equal" ]
            }
        },
        {
            "label" : "Lives in the Wilderness",
            "lists" : {
                "equipment_list" : [ "Compass" ],
                "ability_list" : [ "Trained: Climbing", "Trained: Swimming", "Trained: Wilderness Navigation", "Trained: Identify plants", "Trained: Identify animals" ],
                "connection_list" : [ "Dislike one \"civilized\" PC" ]
            }
        },
        {
            "label" : "Masters Defense",
            "lists" : {
                "equipment_list" : [ "Shield" ],
                "ability_list" : [ "Trained: Speed Defense (when using shield)" ],
                "inability_list" : [ "Attack when using shield (+1 level)" ],
                "connection_list" : [ "Another PC saved your life" ]
            }
        },
        {
            "label" : "Masters Weaponry",
            "lists" : {
                "equipment_list" : [ "High-quality weapon" ],
                "ability_list" : [ "Weapon Master (+1 damage with chosen weapon)" ],
                "bonus_list" : [ "Weaponry esoteries" ],
                "connection_list" : [ "One PC shows promise in use of chosen weapon" ]
            }
        },
        {
            "label" : "Murders",
            "lists" : {
                "equipment_list" : [ "Disguise kit", "Level 2/5 DAM blade poison, (3 doses)" ],
                "ability_list" : [ "Trained: Stealth", "Trained: Disguise", "Surprise Attack (-1 difficulty, +2 damage)" ],
                "connection_list" : [ "One PC knows your secret past" ]
            }
        },
        {
            "label" : "Rages",
            "lists" : {
                "bonus_list" : [ "Frenzy (1 intellect): +1 to Might and Speed Edge, intellect use disabled" ],
                "connection_list" : [ "Feel protective about one PC" ]
            }
        },
        {
            "label" : "Rides the Lightning",
            "lists" : {
                "equipment_list" : [ "Bag of miscellaneous batteries and power cells" ],
                "bonus_list" : [ "Electrical esoteries", "Shock (1 intellect)", "Charge (1+ intellect)" ],
                "connection_list" : [ "One PC is old friend, can come along with Bolt Rider or Electrical Flight" ]
            }
        },
        {
            "label" : "Talks to Machines",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Trained: All tasks involving electrical machines" ],
                "bonus_list" : [ "Distant Activation (1 intellect)" ],
                "connection_list" : [ "One PC is terrible with machines" ]
            }
        },
        {
            "label" : "Wears a Sheen of Ice",
            "lists" : {
                "equipment_list" : [ "Stronglass Bladed Weapon" ],
                "bonus_list" : [ "Ice esoteries", "Ice Armor (1 intellect): +1 armor for 10 minutes" ],
                "connection_list" : [ "One PC gets benefit of Ice Armor, if standing nearby" ]
            }
        },
        {
            "label" : "Wields Power with Precision",
            "stats" : {
                "intellect_pool" : 5
            },
            "lists" : {
                "equipment_list" : [ "Book (numenera)" ],
                "ability_list" : [ "Trained: All Esoteries" ],
                "connection_list" : [ "One PC immune to your esoteries, unless s/he allows them" ]
            }
        },
        {
            "label" : "Wields Two Weapons at Once",
            "lists" : {
                "equipment_list" : [ "Light melee weapon" ],
                "ability_list" : [ "Dual Light Wield (2 attacks on your turn with light weapons)" ],
                "connection_list" : [ "One PC training companion; both get +1 to Speed Defense if fighting back to back" ]
            }
        },
        {
            "label" : "Works Miracles",
            "lists" : {
                "bonus_list" : [ "Healing Touch (1 intellect)" ],
                "connection_list" : [ "One PC thinks you're a messiah or supernatural being" ]
            }
        },
        {
            "label" : "Works the Back Alleys",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Trained: Sneaking", "Trained: Pickpocketing", "Trained: Lockpicking" ],
                "connection_list" : [ "One PC knew you before, convinced you to quit crime" ]
            }
        }
]);