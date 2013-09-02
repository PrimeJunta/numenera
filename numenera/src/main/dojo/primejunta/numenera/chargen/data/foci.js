define([
        {
            "label" : "Bears a Halo of Fire",
            "lists" : {
                "equipment_list" : [ "Artifact (Fireproofer)" ],
                "connection_list" : [ "Fire abilities cannot harm one PC" ],
                "reference_list" : [ "Bears a Halo of Fire: Corebook, page 52" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Fire esoteries", "Shroud of Flame (1 intellect)" ],
            },
            {
                "bonus_perks" : [ "Ⓐ Hurl Flame (2 intellect)", "Ⓔ Fiery Power" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Fiery Hand of Doom (3 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Flameblade (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Fire Tendrils (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Fire Servant (6 intellect)" ]
            }]
        },
        {
            "label" : "Carries a Quiver",
            "lists" : {
                "equipment_list" : [ "Well-Made Medium Ranged Weapon: Bow", "24 arrows" ],
                "ability_list" : [ "Ⓣ Fletcher" ],
                "connection_list" : [ "One PC is true friend", "One PC always hit on fumble" ],
                "reference_list" : [ "Carries a Quiver: Corebook, page 54" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Archer (spend Speed or intellect Effort to increase bow damage)" ],
            },
            {
                "bonus_perks" : [ "Ⓐ Covering Fire (1 speed)", "Ⓣ Bowyer" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Archery", "Ⓣ Fletcher" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Quick Shot", "Ⓣ Bowyer" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Archery" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Powerful Shot (2 might)" ]
            }]
        },
        {
            "label" : "Commands Mental Powers",
            "lists" : {
                "equipment_list" : [ "Intellect Crystal (+1 intellect Pool, -5 if lost)" ],
                "ability_list" : [ "Ⓣ Mind Control (if has it)", "Ⓣ Mind Reading (if has it)" ],
                "connection_list" : [ "Telepathic connection to one PC" ],
                "reference_list" : [ "Commands Mental Powers: Corebook, page 54" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Telepathic (1+ intellect)" ],
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
        {
            "label" : "Controls Beasts",
            "lists" : {
                "equipment_list" : [ "3 days food for beast companion" ],
                "connection_list" : [ "One PC disturbs your creatures" ],
                "reference_list" : [ "Controls Beasts: Corebook, page 55" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Beast Companion" ],
            },
            {
                "bonus_perks" : [ "Ⓐ Soothe the Savage (2 intellect)", "Ⓐ Communication (2 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Mount" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Beast Eyes (3 intellect)", "Ⓔ Improved Companion 1" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Beast Call (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Control the Savage (6 intellect)", "Ⓔ Improved Companion 2" ]
            }]
        },
        {
            "label" : "Controls Gravity",
            "lists" : {
                "equipment_list" : [ "Oddity (point to read weight of object)" ],
                "connection_list" : [ "One PC was hurt by use of powers" ],
                "reference_list" : [ "Controls Gravity: Corebook, page 56" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Hover (1 intellect)" ],
            },
            {
                "stats" : { "speed_edge" : 1 },
                "bonus_perks" : [ "Ⓔ Lessening Gravity's Pull" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Gravity Cleave"]
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
        },
        {
            "label" : "Crafts Illusions",
            "lists" : {
                "equipment_list" : [ "Oddity (sphere that shows pictures)" ],
                "connection_list" : [ "One PC never fooled by illusions" ],
                "reference_list" : [ "Crafts Illusions: Corebook, page 57" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Psychedelic esoteries", "Ⓐ Minor Illusion (1 intellect)" ],
            },
            {
                "bonus_perks" : [ "Ⓐ Disguise (2+ intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Major Illusion (3 intellect)" ]
            },
            {
                "bonus_perks" : [  "Ⓐ Illusory Selves (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Terrifying Image (6 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Grandiose Illusion (8 intellect)" ]
            }]
        },
        {
            "label" : "Crafts Unique Objects",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools", "Self-made level 1/2 item: ${input:choose}", "Oddity: ${input:GM chooses}" ],
                "ability_list" : [ "Ⓣ Craft item type: ${input:choose}", "Ⓣ Craft item type: ${input:choose}", "Ⓣ Identifying function of device" ],
                "connection_list" : [ "One PC has extra self-made level 1/2 item" ],
                "reference_list" : [ "Crafts Unique Objects: Corebook, page 58" ]
            },
            "advancement" : [{
            },
            {
                "bonus_perks" : [ "Ⓔ Tinkerer", "Ⓐ Quick Work (3+ intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Craft item type: ${input:choose}", "Ⓣ Craft item type: ${input:choose}" ]
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
        {
            "label" : "Employs Magnetism",
            "lists" : {
                "connection_list" : [ "Makes one PC's metallic items rattle" ],
                "reference_list" : [ "Employs Magnetism: Corebook, page 59" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Move Metal (1 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Repel Metal" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Destroy Metal (3 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Magnetic Field (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Command Metal (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Diamagnetism" ]
            }]
        },
        {
            "label" : "Entertains",
            "lists" : {
                "equipment_list" : [ "Musical instrument: ${input:choose}" ],
                "ability_list" : [ "Ⓣ All social interactions except coercion, intimidation" ],
                "connection_list" : [ "One PC is worst critic; abilities don't work for him/her" ],
                "reference_list" : [ "Entertains: Corebook, page 60" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ +1 to comrades' Recovery Rolls" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Inspiration" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Knowledge area: ${input:choose}", "Ⓣ Knowledge area: ${input:choose}" ]
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
        {
            "label" : "Exists Partially Out of Phase",
            "lists" : {
                "connection_list" : [ "One PC is old friend who helped get control of abilities" ],
                "reference_list" : [ "Exists Partially Out of Phase: Corebook, page 60" ]
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
        {
            "label" : "Explores Dark Places",
            "lists" : {
                "equipment_list" : [ "Explorer's Pack" ],
                "ability_list" : [ "Ⓣ Searching", "Ⓣ Listening", "Ⓣ Climbing", "Ⓣ Balancing", "Ⓣ Jumping" ],
                "connection_list" : [ "One PC is old companion, always gets +1 on rolls when working with you" ],
                "reference_list" : [ "Explores Dark Places: Corebook, page 61" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Dark esoteries" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Lockpicking", "Ⓣ Tinkering with devices", "Ⓔ Eyes Adjusted" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Speed Defense (in light or no armor)", "Ⓣ Escape Artist" ]
            },
            {
                "stats" : {
                    "armor_bonus" : 1
                },
                "bonus_perks" : [ "Ⓔ Resilient", "Ⓣ Might Defense" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Sneaking (in low light or darkness)", "Ⓔ Dark Explorer" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Blinding Attack (3 speed)" ]
            }]
        },
        {
            "label" : "Fights With Panache",
            "lists" : {
                "equipment_list" : [ "Extremely stylish clothes", "Jeweled ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ],
                "connection_list" : [ "Always trying to impress one PC" ],
                "reference_list" : [ "Fights With Panache: Corebook, page 62" ]
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
        {
            "label" : "Focuses Mind over Matter",
            "lists" : {
                "bonus_list" : [ "Mental esoteries", "Deflect Attacks (1 intellect)" ],
                "connection_list" : [ "One PC causes mental powers to act strangely" ],
                "reference_list" : [ "Focuses Mind over Matter: Corebook, page 63" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Mental esoteries", "Ⓐ Deflect Attacks (1 intellect)" ]
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
            },
            "advancement" : [{
            },
            {
                "bonus_perks" : [ "Ⓔ Interface" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Weaponization: ${input}" ]
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
        {
            "label" : "Howls at the Moon",
            "lists" : {
                "equipment_list" : [ "Artifact (chronometer)" ],
                "connection_list" : [ "One PC knows how to calm you" ],
                "reference_list" : [ "Howls at the Moon: Corebook, page 64" ]
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
        {
            "label" : "Hunts With Great Skill",
            "lists" : {
                "equipment_list" : [ "Silent Boots (+1 to sneaking)" ],
                "ability_list" : [ "Ⓣ Tracking", "Ⓣ Climbing", "Ⓣ Swimming", "Ⓣ Jumping", "Ⓣ Balancing", "Ⓣ Running" ],
                "connection_list" : [ "One PC saw you let prey go" ],
                "reference_list" : [ "Hunts With Great Skill: Corebook, page 65" ]
            },
            "advancement" : [{
            },
            {
                "bonus_perks" : [ "Ⓣ Stealth", "Ⓣ Initiative", "Ⓐ Sprint and Grab (2 speed)" ]
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
        {
            "label" : "Leads",
            "lists" : {
                "equipment_list" : [ "Artifact (tag Followers)" ],
                "ability_list" : [ "Ⓣ All social interactions" ],
                "connection_list" : [ "One PC is former follower, current equal" ],
                "reference_list" : [ "Leads: Corebook, page 66" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Good Advice (1 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Follower" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Command (3 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Capable Follower", "Ⓐ Captivate or Inspire (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Band of Followers" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Mind of a Leader (6 intellect)", "Ⓔ Capable Followers" ]
            }]
        },
        {
            "label" : "Lives in the Wilderness",
            "lists" : {
                "equipment_list" : [ "Compass" ],
                "ability_list" : [ "Ⓣ Climbing", "Ⓣ Swimming", "Ⓣ Wilderness Navigation", "Ⓣ Identifying plants", "Ⓣ Identifying animals" ],
                "connection_list" : [ "Dislike one \"civilized\" PC" ],
                "reference_list" : [ "Lives in the Wilderness: Corebook, page 67" ]
            },
            "advancement" : [{
            },
            {
                "bonus_perks" : [ "Ⓔ Immune to natural diseases", "Ⓔ Resist natural poisons", "Ⓔ Living off the Land" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Spotting", "Ⓣ Listening", "Ⓔ Trap Sense", "Ⓔ Wilderness Explorer" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Wilderness Awareness (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ The Wild Is On Your Side (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ One With the Wild (6 intellect)", "Ⓔ Master of the Wild" ]
            }]
        },
        {
            "label" : "Masters Defense",
            "lists" : {
                "equipment_list" : [ "Shield" ],
                "ability_list" : [ "Ⓣ Speed Defense (with shield)" ],
                "inability_list" : [ "Attack (with shield) (+1 level)", "Defense (without shield) (+1 level)" ],
                "connection_list" : [ "Another PC saved your life" ],
                "reference_list" : [ "Masters Defense: Corebook, page 68" ]
            },
            "advancement" : [{
            },
            {
                "bonus_perks" : [ "Ⓣ Might Defense", "Ⓔ Armor Expert" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Dodge and Resist (3 speed)" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Intellect Defense", "Ⓔ Armor Master" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Nothing But Defend" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Defense Master" ]
            }]
        },
        {
            "label" : "Masters Weaponry",
            "lists" : {
                "equipment_list" : [ "High-quality ${select:1:Light Bashing|Light Bladed|Light Ranged|Medium Bashing|Medium Bladed|Medium Ranged|Heavy Bashing|Heavy Bladed|Heavy Ranged} Weapon: ${input:choose}" ],
                "connection_list" : [ "One PC shows promise in use of chosen weapon" ],
                "reference_list" : [ "Masters Weaponry: Corebook, page 69" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Weapon Master: ${input:choose}", "Ⓔ Weaponry esoteries" ]
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
                "bonus_perks" : [ "Ⓔ Damage Dealer", "Death Dealer (5 might)" ]
            }]
        },
        {
            "label" : "Murders",
            "lists" : {
                "equipment_list" : [ "Disguise kit", "Level 2/5 DAM blade poison, (3 doses)" ],
                "ability_list" : [ "Ⓣ Stealth", "Ⓣ Disguise" ],
                "connection_list" : [ "One PC knows your secret past" ],
                "reference_list" : [ "Murders: Corebook, page 70" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Surprise Attack" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Quick Death (2 speed)" ]
            },
            {
                "bonus_perks" : [ "Ⓣ Lies, trickery", "Ⓣ Craft item type: Poisons", "Ⓣ Identify, Sense, Resist Poisons" ]
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
        {
            "label" : "Rages",
            "lists" : {
                "bonus_list" : [ "Frenzy (1 intellect)" ],
                "connection_list" : [ "Feel protective about one PC" ],
                "reference_list" : [ "Rages: Corebook, page 71" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Frenzy (1 intellect)" ]
            },
            {
                "stats" : {
                    "might_pool" : 5
                },
                "bonus_perks" : [ "Ⓔ Hardy", "Ⓣ Climbing", "Ⓣ Jumping" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Power Strike (3+ might)", "Ⓣ Speed Defense (when not wearing armor)" ]
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
        {
            "label" : "Rides the Lightning",
            "lists" : {
                "equipment_list" : [ "Bag of miscellaneous batteries and power cells" ],
                "connection_list" : [ "One PC is old friend, can come along with Bolt Rider or Electrical Flight" ],
                "reference_list" : [ "Rides the Lightning: Corebook, page 71" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Electrical esoteries", "Ⓐ Shock (1 intellect)", "Ⓐ Charge (1+ intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Bolt Rider (4 intellect)" ]
            },
            {
                "stats" : {
                    "speed_pool" : 3,
                    "speed_edge" : 1
                },
                "bonus_perks" : [ "Ⓔ Lightning Swift", "Ⓐ Drain Charge" ]
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
        {
            "label" : "Talks to Machines",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Ⓣ All tasks involving electrical machines" ],
                "connection_list" : [ "One PC is terrible with machines" ],
                "reference_list" : [ "Talks to Machines: Corebook, page 72" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Distant Activation (1 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Coaxing Power (2 intellect)", "Ⓐ Charm Machine (2 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Intelligent Interface (3 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Machine Companion", "Ⓣ Attacks against automata", "Ⓣ Defense against automata" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Information Gathering (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Control Machine (6 intellect)" ]
            }]
        },
        {
            "label" : "Wears a Sheen of Ice",
            "lists" : {
                "equipment_list" : [ "Stronglass ${select:1:Light Bladed|Medium Bladed|Heavy Bladed} Weapon: ${input:choose}" ],
                "connection_list" : [ "One PC gets benefit of Ice Armor, if standing nearby" ],
                "reference_list" : [ "Wears a Sheen of Ice: Corebook, page 73" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Ice esoteries", "Ⓔ Ice Armor (1 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ/Ⓔ  Frost Touch (1 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Freezing Touch (4 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Resilient Ice Armor" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Cold Burst (5 intellect)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Ice Creation (6 intellect)" ]
            }]
        },
        {
            "label" : "Wields Power with Precision",
            "stats" : {
                "intellect_pool" : 5
            },
            "lists" : {
                "equipment_list" : [ "Book (numenera)" ],
                "connection_list" : [ "One PC immune to your esoteries, unless s/he allows them" ],
                "reference_list" : [ "Wields Power with Precision: Corebook, page 74" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Genius" ]
            },
            {
                "bonus_perks" : [ "Ⓣ All Esoteries" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Enhanced Esoteries" ]
            },
            {
                "bonus_perks" : [ "Ⓔ Greater Repertoire", "${select:1:@perkSelector}" ]
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
        {
            "label" : "Wields Two Weapons at Once",
            "lists" : {
                "equipment_list" : [ "${select:1:Light Bashing|Light Bladed} Weapon: ${input:choose}" ],
                "connection_list" : [ "One PC training companion; both get +1 to Speed Defense if fighting back to back" ],
                "reference_list" : [ "Wields Two Weapons at Once: Corebook, page 75" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓔ Dual Light Wield" ]
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
        {
            "label" : "Works Miracles",
            "lists" : {
                "connection_list" : [ "One PC thinks you're a messiah or supernatural being" ],
                "reference_list" : [ "Works Miracles: Corebook, page 75" ]
            },
            "advancement" : [{
                "bonus_perks" : [ "Ⓐ Healing Touch (1 intellect)" ]
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
        {
            "label" : "Works the Back Alleys",
            "lists" : {
                "equipment_list" : [ "Bag of Light Tools" ],
                "ability_list" : [ "Ⓣ Sneaking", "Ⓣ Pickpocketing", "Ⓣ Lockpicking" ],
                "connection_list" : [ "One PC knew you before, convinced you to quit crime" ],
                "reference_list" : [ "Works the Back Alleys: Corebook, page 76" ]
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
                "bonus_perks" : [ "Ⓣ Climbing", "Ⓣ Escape Artist" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Dirty Fighter (2 speed)" ]
            },
            {
                "bonus_perks" : [ "Ⓐ Alley Rat (4 intellect)" ]
            }]
        }
]);