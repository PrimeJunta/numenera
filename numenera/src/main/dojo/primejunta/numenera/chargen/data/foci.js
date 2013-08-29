define([
        {
            "label" : "Bears a Halo of Fire",
            "lists" : {
                "equipment_list" : [ "Artifact (Fireproofer)" ],
                "bonus_list" : [ "Fire esoteries", "Shroud of Flame (1 intellect)" ],
                "connection_list" : [ "Fire abilities cannot harm one PC" ],
                "reference_list" : [ "Bears a Halo of Fire: Corebook, page 52" ]
            }
        },
        {
            "label" : "Carries a Quiver",
            "lists" : {
                "equipment_list" : [ "Well-made bow", "24 arrows" ],
                "ability_list" : [ "Ⓣ Fletcher" ],
                "connection_list" : [ "One PC is true friend", "One PC always hit on fumble" ],
                "bonus_list" : [ "Archer (spend Speed or intellect Effort to increase bow damage)" ],
                "reference_list" : [ "Carries a Quiver: Corebook, page 54" ]
            }
        },
        {
            "label" : "Commands Mental Powers",
            "lists" : {
                "equipment_list" : [ "Intellect Crystal (+1 intellect Pool, -5 if lost)" ],
                "ability_list" : [ "Ⓣ Mind Control (if has it)", "Ⓣ Mind Reading (if has it)" ],
                "bonus_list" : [ "Telepathic (1+ intellect)" ],
                "connection_list" : [ "Telepathic connection to one PC" ],
                "reference_list" : [ "Commands Mental Powers: Corebook, page 54" ]
            }
        },
        {
            "label" : "Controls Beasts",
            "lists" : {
                "equipment_list" : [ "3 days food for beast companion" ],
                "bonus_list" : [ "Beast Companion (Level 2, your size or smaller)" ],
                "connection_list" : [ "One PC disturbs your creatures" ],
                "reference_list" : [ "Controls Beasts: Corebook, page 55" ]
            }
        },
        {
            "label" : "Controls Gravity",
            "lists" : {
                "equipment_list" : [ "Oddity (point to read weight of object)" ],
                "bonus_list" : [ "Hover (1 intellect)" ],
                "connection_list" : [ "One PC was hurt by use of powers" ],
                "reference_list" : [ "Controls Gravity: Corebook, page 56" ]
            }
        },
        {
            "label" : "Crafts Illusions",
            "lists" : {
                "equipment_list" : [ "Oddity (sphere that shows pictures)" ],
                "bonus_list" : [ "Psychedelic esoteries", "Minor Illusion (1 intellect)" ],
                "connection_list" : [ "One PC never fooled by illusions" ],
                "reference_list" : [ "Crafts Illusions: Corebook, page 57" ]
            }
        },
        {
            "label" : "Crafts Unique Objects",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools", "Self-made level 1/2 item: ${input:choose}", "Oddity: ${input:GM chooses}" ],
                "ability_list" : [ "Ⓣ Craft item type: ${input:choose}", "Ⓣ Craft item type: ${input:choose}", "Ⓣ Identifying function of device" ],
                "connection_list" : [ "One PC has extra self-made level 1/2 item" ],
                "reference_list" : [ "Crafts Unique Objects: Corebook, page 58" ]
            }
        },
        {
            "label" : "Employs Magnetism",
            "lists" : {
                "bonus_list" : [ "Move Metal (1 intellect)" ],
                "connection_list" : [ "Makes one PC's metallic items rattle" ],
                "reference_list" : [ "Employs Magnetism: Corebook, page 59" ]
            }
        },
        {
            "label" : "Entertains",
            "lists" : {
                "equipment_list" : [ "Musical instrument: ${input:choose}" ],
                "ability_list" : [ "Ⓣ All social interactions except coercion, intimidation" ],
                "bonus_list" : [ "Levity: +1 to comrades' Recovery Rolls" ],
                "connection_list" : [ "One PC is worst critic; abilities don't work for him/her" ],
                "reference_list" : [ "Entertains: Corebook, page 60" ]
            }
        },
        {
            "label" : "Exists Partially Out of Phase",
            "lists" : {
                "bonus_list" : [ "Walk through walls (2 intellect)" ],
                "connection_list" : [ "One PC is old friend who helped get control of abilities" ],
                "reference_list" : [ "Exists Partially Out of Phase: Corebook, page 60" ]
            }
        },
        {
            "label" : "Explores Dark Places",
            "lists" : {
                "equipment_list" : [ "Explorer's Pack" ],
                "ability_list" : [ "Ⓣ Searching", "Ⓣ Listening", "Ⓣ Climbing", "Ⓣ Balancing", "Ⓣ Jumping" ],
                "bonus_list" : [ "Dark esoteries" ],
                "connection_list" : [ "One PC is old companion, always gets +1 on rolls when working with you" ],
                "reference_list" : [ "Explores Dark Places: Corebook, page 61" ]
            }
        },
        {
            "label" : "Fights With Panache",
            "lists" : {
                "equipment_list" : [ "Extremely stylish clothes", "Jeweled ${select:1:Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}" ],
                "bonus_list" : [ "Attack Flourish (+1 to next die roll to selected creatures)" ],
                "connection_list" : [ "Always trying to impress one PC" ],
                "reference_list" : [ "Fights With Panache: Corebook, page 62" ]
            }
        },
        {
            "label" : "Focuses Mind over Matter",
            "lists" : {
                "bonus_list" : [ "Mental esoteries", "Deflect Attacks (1 intellect)" ],
                "connection_list" : [ "One PC causes mental powers to act strangely" ],
                "reference_list" : [ "Focuses Mind over Matter: Corebook, page 63" ]
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
                "connection_list" : [ "One PC knows your nature or a command to temporarily disable your mechanical parts" ],
                "reference_list" : [ "Fuses Flesh and Steel: Corebook, page 64" ]
            }
        },
        {
            "label" : "Howls at the Moon",
            "lists" : {
                "equipment_list" : [ "Artifact (chronometer)" ],
                "bonus_list" : [ "Beast Form (see p. 65)" ],
                "connection_list" : [ "One PC knows how to calm you" ],
                "reference_list" : [ "Howls at the Moon: Corebook, page 64" ]
            }
        },
        {
            "label" : "Hunts With Great Skill",
            "lists" : {
                "equipment_list" : [ "Silent Boots (+1 to sneaking)" ],
                "ability_list" : [ "Ⓣ Tracking", "Ⓣ Climbing", "Ⓣ Swimming", "Ⓣ Jumping", "Ⓣ Balancing", "Ⓣ Running" ],
                "connection_list" : [ "One PC saw you let prey go" ],
                "reference_list" : [ "Hunts With Great Skill: Corebook, page 65" ]
            }
        },
        {
            "label" : "Leads",
            "lists" : {
                "equipment_list" : [ "Artifact (tag Followers)" ],
                "ability_list" : [ "Ⓣ All social interactions" ],
                "bonus_list" : [ "Good Advice: Subject is Trained in task for 1 round (1 intellect)" ],
                "connection_list" : [ "One PC is former follower, current equal" ],
                "reference_list" : [ "Leads: Corebook, page 66" ]
            }
        },
        {
            "label" : "Lives in the Wilderness",
            "lists" : {
                "equipment_list" : [ "Compass" ],
                "ability_list" : [ "Ⓣ Climbing", "Ⓣ Swimming", "Ⓣ Wilderness Navigation", "Ⓣ Identifying plants", "Ⓣ Identifying animals" ],
                "connection_list" : [ "Dislike one \"civilized\" PC" ],
                "reference_list" : [ "Lives in the Wilderness: Corebook, page 67" ]
            }
        },
        {
            "label" : "Masters Defense",
            "lists" : {
                "equipment_list" : [ "Shield" ],
                "ability_list" : [ "Ⓣ Speed defense" ],
                "inability_list" : [ "Attack when using shield (+1 level)", "Defend when not using shield (+1 level)" ],
                "connection_list" : [ "Another PC saved your life" ],
                "reference_list" : [ "Masters Defense: Corebook, page 68" ]
            }
        },
        {
            "label" : "Masters Weaponry",
            "lists" : {
                "equipment_list" : [ "High-quality ${select:1:Light Weapon|Medium Weapon|Heavy Weapon}: ${input:choose}" ],
                "bonus_list" : [ "Weapon Master (+1 damage with chosen weapon)", "Weaponry esoteries" ],
                "connection_list" : [ "One PC shows promise in use of chosen weapon" ],
                "reference_list" : [ "Masters Weaponry: Corebook, page 69" ]
            }
        },
        {
            "label" : "Murders",
            "lists" : {
                "equipment_list" : [ "Disguise kit", "Level 2/5 DAM blade poison, (3 doses)" ],
                "ability_list" : [ "Ⓣ Stealth", "Ⓣ Disguise" ],
                "bonus_list" : [ "Surprise Attack (-1 difficulty, +2 damage)" ],
                "connection_list" : [ "One PC knows your secret past" ],
                "reference_list" : [ "Murders: Corebook, page 70" ]
            }
        },
        {
            "label" : "Rages",
            "lists" : {
                "bonus_list" : [ "Frenzy (1 intellect): +1 to Might and Speed Edge, intellect use disabled" ],
                "connection_list" : [ "Feel protective about one PC" ],
                "reference_list" : [ "Rages: Corebook, page 71" ]
            }
        },
        {
            "label" : "Rides the Lightning",
            "lists" : {
                "equipment_list" : [ "Bag of miscellaneous batteries and power cells" ],
                "bonus_list" : [ "Electrical esoteries", "Shock (1 intellect)", "Charge (1+ intellect)" ],
                "connection_list" : [ "One PC is old friend, can come along with Bolt Rider or Electrical Flight" ],
                "reference_list" : [ "Rides the Lightning: Corebook, page 71" ]
            }
        },
        {
            "label" : "Talks to Machines",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Ⓣ All tasks involving electrical machines" ],
                "bonus_list" : [ "Distant Activation (1 intellect)" ],
                "connection_list" : [ "One PC is terrible with machines" ],
                "reference_list" : [ "Talks to Machines: Corebook, page 72" ]
            }
        },
        {
            "label" : "Wears a Sheen of Ice",
            "lists" : {
                "equipment_list" : [ "Stronglass Bladed Weapon: ${input:choose}" ],
                "bonus_list" : [ "Ice esoteries", "Ice Armor (1 intellect): +1 armor for 10 minutes" ],
                "connection_list" : [ "One PC gets benefit of Ice Armor, if standing nearby" ],
                "reference_list" : [ "Wears a Sheen of Ice: Corebook, page 73" ]
            }
        },
        {
            "label" : "Wields Power with Precision",
            "stats" : {
                "intellect_pool" : 5
            },
            "lists" : {
                "equipment_list" : [ "Book (numenera)" ],
                "ability_list" : [ "Ⓣ All Esoteries" ],
                "connection_list" : [ "One PC immune to your esoteries, unless s/he allows them" ],
                "reference_list" : [ "Wields Power with Precision: Corebook, page 74" ]
            }
        },
        {
            "label" : "Wields Two Weapons at Once",
            "lists" : {
                "equipment_list" : [ "Light Weapon (melee): ${input:choose}" ],
                "bonus_list" : [ "Dual Light Wield (2 attacks on your turn with light weapons)" ],
                "connection_list" : [ "One PC training companion; both get +1 to Speed Defense if fighting back to back" ],
                "reference_list" : [ "Wields Two Weapons at Once: Corebook, page 75" ]
            }
        },
        {
            "label" : "Works Miracles",
            "lists" : {
                "bonus_list" : [ "Healing Touch (1 intellect)" ],
                "connection_list" : [ "One PC thinks you're a messiah or supernatural being" ],
                "reference_list" : [ "Works Miracles: Corebook, page 75" ]
            }
        },
        {
            "label" : "Works the Back Alleys",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Ⓣ Sneaking", "Ⓣ Pickpocketing", "Ⓣ Lockpicking" ],
                "connection_list" : [ "One PC knew you before, convinced you to quit crime" ],
                "reference_list" : [ "Works the Back Alleys: Corebook, page 76" ]
            }
        }
]);