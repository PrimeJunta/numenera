define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/string",
         "./data/descriptors",
         "./data/types",
         "./data/foci" ],
function( declare,
          lang,
          array,
          string,
          descriptors,
          types,
          foci )
{
    return declare([], {
        TRAINED_STR : "Ⓣ",
        SPECIALIZED_STR: "Ⓢ",
        manager : {},
        constructor : function( kwObj )
        {
            lang.mixin( this, kwObj );
        },
        validateCharacter : function()
        {
            var errs = [];
            if( !descriptors[ this.manager.descriptorSelect.selectedIndex - 1 ] || !types[ this.manager.typeSelect.selectedIndex - 1 ] || !foci[ this.manager.focusSelect.selectedIndex - 1 ])
            {
                errs.push( "Select a descriptor, type, and focus." );
            }
            if( this.manager.free_pool.value != "0" || this.manager.free_edge.value != "0" )
            {
                errs.push( "Assign all of your character points.")
            }
            if( errs.length == 0 )
            {
                return true;
            }
            else
            {
                alert( errs.join( "<br/>" ) );
                return false;
            }
        },
        analyzeCharacter : function()
        {
            this._cdata = {};
            this._sv( "character_name", "characterNameInput" );
            this._sv( "character_descriptor", "descriptorSelect", 1 );
            this._sv( "character_type", "typeSelect", 1 );
            this._sv( "character_focus", "focusSelect", 1 );
            this._ss( "character_tier", "character_tier" );
            this._ss( "character_effort", "character_effort" );
            this._ss( "might_pool", "might_pool" );
            this._ss( "might_edge", "might_edge" );
            this._ss( "speed_pool", "speed_pool" );
            this._ss( "speed_edge", "speed_edge" );
            this._ss( "intellect_pool", "intellect_pool" );
            this._ss( "intellect_edge", "intellect_edge" );
            this._ss( "recovery_roll", "recovery_roll" );
            this._ss( "cypher_count", "cypher_count" );
            this._ss( "shin_count", "shin_count" );
            this._st( "armor_value", this._getArmorValue() );
            this._st( "description_text", this._getDescriptionText() );
            this._wl( "ability_list", this._getSkillList() );
            this._wl( "special_list", this._listAsText( "special_list") );
            this._wl( "cypher_list", this._listAsText( "cypher_list") );
            this._wl( "equipment_list", this._listAsText( "equipment_list") );
            this._wl( "reference_list", this._listAsText( "reference_list" ) );
            this._wl( "attack_data", this._getAttacks() );
            this._processSpecialAbilities();
            this._wl( "attack_list", this._getAttackList() );
            return this._cdata;
        },
        _processSpecialAbilities : function()
        {
            var eq = this._cdata.special_list;
            var sl = this._cdata.ability_list;
            // Ward
            if( array.indexOf( eq, "Ⓔ Ward" ) != -1 )
            {
                this._cdata.armor_value += 1;
            }
            // attacks
            // collect boosts by type, category, short_name
            var boosts = {
                "light_bashing" : 0,
                "light_bladed" : 0,
                "light_ranged" : 0,
                "medium_bashing" : 0,
                "medium_bladed" : 0,
                "medium_ranged" : 0,
                "heavy_bashing" : 0,
                "heavy_bladed" : 0,
                "heavy_ranged" : 0,
                "light" : 1,
                "medium" : 0,
                "heavy" : 0,
                "chosen_weapon" : 0
            };
            // weapon mastery; since it includes a character input we have to find it this way
            for( var i = 0; i < eq.length; i++ )
            {
                var wms = "Ⓔ Weapon Master:";
                if( eq[ i ].indexOf( wms ) != -1 )
                {
                    this._cdata.chosen_weapon = string.trim( eq[ i ].substring( wms.length ) );
                    boosts.chosen_weapon = 1;
                }
            }
            if( array.indexOf( "Ⓔ Damage Dealer" ) != -1 )
            {
                boosts.chosen_weapon = 3;
            }
            // enablers
            if( array.indexOf( eq, "Ⓔ Practiced With All Weapons" ) != -1 )
            {
                boosts = lang.mixin( boosts, {
                    light : 1,
                    medium : 1,
                    heavy : 1
                });
            }
            else if( array.indexOf( eq, "Ⓔ Practiced With Light/Medium Weapons" ) != -1 )
            {
                boosts = lang.mixin( boosts, {
                    light : 1,
                    medium : 1
                })
            }
            // training
            var cats = [ "heavy", "medium", "light" ];
            var types = [ "bashing", "bladed", "ranged" ];
            for( var i = 0; i < cats.length; i++ )
            {
                for( var j = 0; j < types.length; j++ )
                {
                    var boost = cats[ i ] + "_" + types[ j ];
                    var skill = cats[ i ].charAt( 0 ).toUpperCase() + cats[ i ].substring( 1 ) + " " + types[ j ].charAt( 0 ).toUpperCase() + types[ j ].substring( 1 );
                    console.log( sl, skill );
                    if( array.indexOf( sl, "Ⓢ " + skill ) != -1 )
                    {
                        boosts[ boost ] += 2;
                    }
                    else if( array.indexOf( sl, "Ⓣ " + skill ) != -1 )
                    {
                        boosts[ boost ] += 1;
                    }
                }
            }
            for( var i = 0; i < this._cdata.attack_data.length; i++ )
            {
                var cur = this._cdata.attack_data[ i ];
                // chosen weapon
                if( cur.short_name == this._cdata.chosen_weapon )
                {
                    cur.damage += boosts.chosen_weapon;
                }
                // category
                cur.difficulty_adjustment -= boosts[ cur.category ];
                // type
                cur.difficulty_adjustment -= boosts[ cur.category + "_" + cur.type ];
            }
        },
        _getDescriptionText : function()
        {
            var dt = this.manager.description_text.get( "value" );
            dt = dt.split( "\n" );
            dt = dt.join( "<br/>" );
            return dt;
        },
        _getSkillList : function()
        {
            var list = this._listAsText( "ability_list" );
            list.sort();
            if( list.length < 2 )
            {
                return list;
            }
            var out = [];
            out.push( list[ 0 ] );
            for( var i = 1; i < list.length; i++ )
            {
                if( list[ i ].toLowerCase() == list[ i - 1 ].toLowerCase() && list[ i ].indexOf( this.TRAINED_STR ) != -1 )
                {
                    var cur = out[ out.length - 1 ];
                    out[ out.length - 1 ] = this.SPECIALIZED_STR + cur.substring( cur.indexOf( this.TRAINED_STR ) + this.TRAINED_STR.length );
                }
                else
                {
                    out.push( list[ i ] );
                }
            }
            out.sort();
            return out;
        },
        _getAttacks : function()
        {
            var eq = this._listAsText( "equipment_list" );
            var out = [];
            var wpns = [];
            var idstr = "Weapon:";
            for( var i = 0; i < eq.length; i++ )
            {
                if( eq[ i ].indexOf( "Weapon:" ) != -1 )
                {
                    wpns.push( eq[ i ] );
                }
            }
            for( var i = 0; i < wpns.length; i++ )
            {
                var wpn = {
                    description : wpns[ i ],
                    short_name : string.trim( wpns[ i ].substring( wpns[ i ].indexOf( idstr ) + idstr.length + 1 ) ),
                    damage : 0,
                    category : "",
                    type : "",
                    difficulty_adjustment : 1
                }
                var dmg = 0;
                var diff = 1;
                var type = "";
                if( wpns[ i ].indexOf( "Light" ) != -1 )
                {
                    wpn.damage = 2;
                    wpn.difficulty_adjustment = 0;
                    wpn.category = "light";
                }
                else if( wpns[ i ].indexOf( "Medium" ) != -1  )
                {
                    wpn.damage = 4;
                    wpn.category = "medium";
                }
                else if( wpns[ i ].indexOf( "Heavy" ) != -1  )
                {
                    wpn.damage = 6;
                    wpn.category = "heavy";
                }
                if( wpns[ i ].indexOf( "Bashing" ) != -1 )
                {
                    wpn.type = "bashing";
                }
                else if( wpns[ i ].indexOf( "Bladed" ) != -1 )
                {
                    wpn.type = "bladed";
                }
                else if( wpns[ i ].indexOf( "Ranged" ) != -1 )
                {
                    wpn.type = "ranged";
                }
                out.push( wpn );
            }
            return out;
        },
        _getAttackList : function()
        {
            var out = [];
            for( var i = 0; i < this._cdata.attack_data.length; i++ )
            {
                var cur = this._cdata.attack_data[ i ];
                var pf = "";
                switch( cur.category )
                {
                    case "light" :
                        pf = "Ⓛ";
                        break;
                    case "medium" : 
                        pf = "Ⓜ";
                        break;
                    case "heavy" : 
                        pf = "Ⓗ";
                        break;
                }
                switch( cur.type )
                {
                    case "bashing" :
                        pf += "Ⓑ";
                        break;
                    case "bladed" : 
                        pf += "Ⓒ";
                        break;
                    case "ranged" : 
                        pf += "Ⓡ";
                        break;
                }
                out.push( pf + " " + cur.short_name + " (" + cur.difficulty_adjustment + "/" + cur.damage + ")" );
            }
            return out.sort();
        },
        _getArmorValue : function()
        {
            var base = parseInt( this._gf( "armor_bonus" ) );
            var eq = this._listAsText( "equipment_list" ).join( "," ).toLowerCase();
            if( eq.indexOf( "heavy armor" ) != -1 )
            {
                base += 3;
            }
            else if( eq.indexOf( "medium armor" ) != -1 )
            {
                base += 2;
            }
            else if( eq.indexOf( "light armor" ) != -1 )
            {
                base += 1;
            }
            return base;
        },
        _listAsText : function( list )
        {
            return this.manager.listAsText( list );
        },
        _wl : function( to, list )
        {
            this._cdata[ to ] = lang.clone( list );
        },
        _gf : function( fld )
        {
            if( !this.manager[ fld ] )
            {
                return false;
            }
            return this.manager[ fld ].value;
        },
        _gs : function( sel )
        {
            return this.manager._selVal( this.manager[ sel ] ).label;
        },
        _sv : function( to, from, sel )
        {
            this._cdata[ to ] = sel ? this._gs( from ) : this._gf( from );
        },
        _ss : function( to, from )
        {
            this._cdata[ to ] = parseInt( this._gf( from ) );
        },
        _st : function( to, val )
        {
            this._cdata[ to ] = val;
        }
    });
});