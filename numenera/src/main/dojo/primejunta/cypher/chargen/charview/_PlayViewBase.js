/**
 * Play view base. Builds on _PrintViewBase by adding some dynamic functionality.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/dom-class",
         "dojo/dom-style",
         "dojox/mobile/Container",
         "dojox/mobile/View",
         "dojox/mobile/ScrollableView",
         "dojox/mobile/TabBar",
         "dojox/mobile/TabBarButton",
         "dojox/mobile/Heading",
         "dojox/mobile/ToolBarButton",
         "dijit/form/Textarea",
         "dijit/layout/ContentPane",
         "./_roster",
         "./_CharacterPicker",
         "./_CharacterViewBase",
         "dojo/text!./doc/PlayViewHelp.html"],
function( declare,
          lang,
          array,
          domClass,
          domStyle,
          Container,
          View,
          ScrollableView,
          TabBar,
          TabBarButton,
          Heading,
          ToolBarButton,
          Textarea,
          ContentPane,
          _roster,
          _CharacterPicker,
          _CharacterViewBase,
          help )
{
    return declare([ _CharacterViewBase, _roster ], {
        limitedStats : [ "might_pool", "speed_pool", "intellect_pool", "character_effort" ],
        effortStats : [ "might_pool", "speed_pool", "intellect_pool" ],
        unlimitedStats : [ "character_xp" ],
        recoveryCycle : [ "A", "10 m", "1 h", "10 h" ],
        _textAreas : [ "notes_text", "description_text" ],
        _curRecoveryRoll : 0,
        postCreate : function()
        {
            this.helpNode.innerHTML = help;
            this._characterButtons = {};
            this._viewOrder = [ this.descriptionView, this.statsView, this.abilitiesView, this.possessionsView, this.rosterView, this.helpView ];
            this.populateFields();
            this._character = lang.clone( this.character );
            this._connectStatControls();
            this._checkStatLimits();
            this.initRoster();
            if( this.manager._currentRoster )
            {
                for( var i = 0; i < this.manager._currentRoster.length; i++ )
                {
                    this.addCharacter( this.manager._currentRoster[ i ] );
                }
            }
            else
            {
                this.addCharacter( this.character.character_name );
            }
        },
        adjustFields : function()
        {
            if( this._storedCharacters && this._storedCharacters[ this.character.character_name ] && this._storedCharacters[ this.character.character_name ].adjusted )
            {
                this._character = this._storedCharacters[ this.character.character_name ].adjusted;
                this._curRecoveryRoll = this._character.current_recovery_roll;
                var stats = this.limitedStats.concat( this.unlimitedStats );
                while( stats.length > 0 )
                {
                    var stat = stats.pop();
                    this[ stat ].innerHTML = this._character[ stat ];
                }
                for( var i = 0; i < this._textAreas.length; i++ )
                {
                    this[ this._textAreas[ i ] ].set( "value", this._character[ this._textAreas[ i ] + "_content" ] );
                }
                this._checkStatLimits();
            }
            else
            {
                this._character = lang.clone( this.character );
                this._checkStatLimits();
            }
        },
        closeMe : function()
        {
            this.commitChanges();
            this.manager._currentRoster = this.getRoster();
            this.manager.closePlayView();
        },
        commitChanges : function()
        {
            if( this.manager._advancementControl )
            {
                this.manager._advancementControl.character_xp.value = this._character.character_xp;
            }
            for( var i = 0; i < this._textAreas.length; i++ )
            {
                var cur = this._textAreas[ i ];
                this.manager[ cur ].set( "value", this[ cur ].get( "value" ) );
            }
        },
        getRoster : function()
        {
            var out = [];
            for( var o in  this._characterButtons )
            {
                out.push( o );
            }
            return out;
        },
        toDescriptionView : function()
        {
            this._moveTo( this.descriptionView );
        },
        toStatsView : function()
        {
            this._moveTo( this.statsView );
        },
        toAbilitiesView : function()
        {
            this._moveTo( this.abilitiesView );
        },
        toPossessionsView : function()
        {
            this._moveTo( this.possessionsView );
        },
        toRosterView : function()
        {
            this.disablePicker( this.character.character_name );
            this._moveTo( this.rosterView );
        },
        toHelpView : function()
        {
            this._moveTo( this.helpView );
        },
        recoveryRoll : function()
        {
            this._curRecoveryRoll++;
            if( this._curRecoveryRoll >= this.recoveryCycle.length )
            {
                this._curRecoveryRoll = 0;
            }
            var roll = Math.ceil( Math.random() * 6 ) + this._character.recovery_roll;
            var stats = this._getRStats();
            while( roll > 0 && stats.length > 0 )
            {
                roll--;
                this._adjustStat( stats[ 0 ].stat, 1 );
                stats = this._getRStats();
            }
            this._checkStatLimits();
        },
        addCharacter : function( name )
        {
            if( this._characterButtons[ name ] )
            {
                return;
            }
            var btn = new TabBarButton({ "class" : "pv-characterPickerButton", label : name, onClick : lang.hitch( this, this.switchToCharacter, name )});
            this.characterTabs.addChild( btn );
            this._characterButtons[ name ] = btn;
            this._checkSelectedCharacterButton();
        },
        removeCharacter : function( name )
        {
            this._characterButtons[ name ].destroy();
            delete this._characterButtons[ name ];
            this._checkSelectedCharacterButton();
        },
        switchToCharacter : function( name )
        {
            if( this.character.character_name == name )
            {
                return;
            }
            else
            {
                for( var i = 0; i < this._textAreas.length; i++ )
                {
                    this._character[ this._textAreas[ i ] + "_content" ] = this[ this._textAreas[ i ] ].get( "value" );
                }
                this._character.current_recovery_roll = this._curRecoveryRoll;
                this.commitChanges();
                this.manager.pleaseStoreCharacter();
                this._storedCharacters[ this.character.character_name ].adjusted = lang.clone( this._character );
                this.loadCharacter( this._storedCharacters[ name ].data );
            }
        },
        loadCharacter : function( data )
        {
            this.manager.populateFromStoredData( data );
            this.initializeCharacterData();
            this.populateFields();
            this.adjustFields();
            if( this.rosterView.getShowingView() == this.rosterView )
            {
                this.toDescriptionButton._onClick(); // will also set selected on the buttons correctly
            }
        },
        destroy : function()
        {
            for( var o in this._characterButtons )
            {
                this._characterButtons[ o ].destroy();
                delete this._characterButtons[ o ];
            }
            this.inherited( arguments );
        },
        _checkSelectedCharacterButton : function()
        {
            for( var o in this._characterButtons )
            {
                var cur = this._characterButtons[ o ];
                if( o == this.character.character_name )
                {
                    cur.set( "selected", true );
                }
                else
                {
                    cur.set( "selected", false );
                }
            }
        },
        _getRStats : function()
        {
            var stats = [];
            for( var i = 0; i < this.effortStats.length; i++ )
            {
                var stat = this.effortStats[ i ];
                if( this.character[ stat ] - this._character[ stat ] > 0 )
                {
                    stats.push( { stat : stat, value : this._character[ stat ], difference : this.character[ stat ] - this._character[ stat ] } );
                }
            }
            stats.sort( function( a, b ) { return a.value - b.value } );
            return stats;
        },
        _connectStatControls : function()
        {
            var ctrls = this.limitedStats.concat( this.unlimitedStats );
            while( ctrls.length > 0 )
            {
                var ctrl = ctrls.pop();
                this[ "increment_" + ctrl ].onClick = lang.hitch( this, this._adjustStat, ctrl, 1 );
                this[ "decrement_" + ctrl ].onClick = lang.hitch( this, this._adjustStat, ctrl, -1 );
            }
            for( var i = 0; i < this.effortStats.length; i++ )
            {
                var ctrl = this.effortStats[ i ];
                this[ "apply_" + ctrl + "_effort" ].onClick = lang.hitch( this, this._applyEffort, ctrl );
            }
        },
        _applyEffort : function( stat )
        {
            this._adjustStat( stat, this._getEffort( stat ) );
        },
        _getEffort : function( stat )
        {
            var edge = stat.substring( 0, stat.indexOf( "_" ) ) + "_edge";
            var eff = -1 * ( ( 3 + ( this._character.character_effort - 1 ) * 2 ) - this._character[ edge ] );
            eff = eff > 0 ? 0 : eff;
            return eff;
        },
        _adjustStat : function( stat, by )
        {
            this._character[ stat ] += by;
            this[ stat ].innerHTML = this._character[ stat ];
            this._checkStatLimits();
        },
        _checkStatLimits : function()
        {
            for( var i = 0; i < this.limitedStats.length; i++ )
            {
                var cur = this._character[ this.limitedStats[ i ] ];
                var lim = this.character[ this.limitedStats[ i ] ];
                var llim = this.limitedStats[ i ] == "character_effort" ? 1 : 0;
                if( cur <= llim )
                {
                    this._disLow( this.limitedStats[ i ] );
                }
                else
                {
                    this._enLow( this.limitedStats[ i ] );
                }
                if( cur >= lim )
                {
                    this._disHigh( this.limitedStats[ i ] );
                }
                else
                {
                    this._enHigh( this.limitedStats[ i ] );
                }
            }
            for( var i = 0; i < this.unlimitedStats.length; i++ )
            {
                var cur = this._character[ this.unlimitedStats[ i ] ];
                if( cur === false )
                {
                    this._disLow( this.unlimitedStats[ i ] );
                    this._disHigh( this.unlimitedStats[ i ] );
                    this[ this.unlimitedStats[ i ] ].innerHTML = "–";
                    domClass.add( this[ this.unlimitedStats[ i ] ], "pv-staticStatBox" );
                }
                else
                {
                    domClass.remove( this[ this.unlimitedStats[ i ] ], "pv-staticStatBox" );
                }
                if( cur <= 0 )
                {
                    this._disLow( this.unlimitedStats[ i ] );
                }
                else
                {
                    this._enLow( this.unlimitedStats[ i ] );
                }
            }
            var recoveryPossible = false;
            for( var i = 0; i < this.effortStats.length; i++ )
            {
                var stat = this.effortStats[ i ];
                if( this._getEffort( stat ) + this._character[ stat ] >= 0 && this._character[ stat ] > 0 )
                {
                    this[ "apply_" + stat + "_effort" ].set( "disabled", false );
                }
                else
                {
                    this[ "apply_" + stat + "_effort" ].set( "disabled", true );
                }
                if( this._character[ stat ] != this.character[ stat ] )
                {
                    recoveryPossible = true;
                }
            }
            this.recovery_roll_control.innerHTML = this.recoveryCycle[ this._curRecoveryRoll ];
            if( recoveryPossible )
            {
                domClass.add( this.recovery_roll_control, "pv-activeStatBox" );
            }
            else
            {
                domClass.remove( this.recovery_roll_control, "pv-activeStatBox" );
            }
            this._checkDamageTrack();
        },
        _checkDamageTrack : function()
        {
            var trk = 0;
            for( var i = 0; i < this.effortStats.length; i++ )
            {
                if( this._character[ this.effortStats[ i ] ] <= 0 )
                {
                    trk++;
                }
            }
            for( var i = 0; i < 4; i++ )
            {
                var icn = this[ "damage_track_" + i + "_icon" ];
                if( trk == i )
                {
                    domClass.remove( icn, "num-grayIcon" );
                    domClass.remove( icn, "fa-circle-o" );
                    domClass.add( icn, "fa-circle" );
                }
                else
                {
                    domClass.add( icn, "num-grayIcon" );
                    domClass.add( icn, "fa-circle-o" );
                    domClass.remove( icn, "fa-circle" );
                }
            }
        },
        _disLow : function( stat )
        {
            this[ "decrement_" + stat ].set( "disabled", true );
        },
        _disHigh : function( stat )
        {
            this[ "increment_" + stat ].set( "disabled", true );
        },
        _enLow : function( stat )
        {
            this[ "decrement_" + stat ].set( "disabled", false );
        },
        _enHigh : function( stat )
        {
            this[ "increment_" + stat ].set( "disabled", false );
        },
        _moveTo : function( view )
        {
            var curView = view.getShowingView();
            if( curView == view )
            {
                return;
            }
            var dir = array.indexOf( this._viewOrder, view ) - array.indexOf( this._viewOrder, curView ) < 0 ? -1 : 1;
            curView.performTransition( view.id, dir, "slide" );
        },
        _wl : function( fieldName, from )
        {
            if( array.indexOf( this._textAreas, fieldName ) != -1 )
            {
                this[ fieldName ].set( "value", this.manager[ from ].get( "value" ) );
            }
            else
            {
                this.inherited( arguments );
            }
        }
    });
});