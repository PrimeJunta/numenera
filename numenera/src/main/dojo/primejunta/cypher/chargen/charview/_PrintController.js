define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/cookie",
         "dojo/json",
         "./_roster",
         "dijit/popup",
         "dijit/TooltipDialog",
         "dijit/form/CheckBox",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "dojo/text!./templates/_PrintController.html" ],
function( declare,
          lang,
          cookie,
          json,
          _roster,
          popup,
          TooltipDialog,
          CheckBox,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _roster ], {
        manager : {},
        controller : {},
        templateString : template,
        postCreate : function()
        {
            this.initializeCharacter();
            this.initRoster();
            this.updatePrints();
        },
        initializeCharacter : function()
        {
            this._widgets = {};
            this._characters = {};
            var vtor = this.manager.createCharacterValidator({ manager : this.manager });
            this.character = vtor.analyzeCharacter(); // the original character is here
            this._characters[ this.character.character_name ] = this.character;
        },
        /**
         * You can control a few print settings. They're stored in a cookie.
         */
        printSettingsChanged : function()
        {
            cookie( "printSettings", json.stringify({
                showShins : this.showShinsCheckbox.get( "checked" ),
                showXP : this.showXPCheckbox.get( "checked" ),
                showCyphers : this.showCyphersCheckbox.get( "checked" ),
                compactView : this.setCompactViewCheckbox.get( "checked" )
            }), { expires : 30 });
            this.updatePrints();
        },
        popupDialog : function()
        {
            popup.open({
                popup : this.party_list,
                around : this.partyNode
            });
        },
        addCharacter : function( charName )
        {
            if( this._widgets[ charName ] )
            {
                return;
            }
            var character = this.getCharacter( charName );
            var widg = this.manager.createPrintView({ manager : this.manager, controller : this.controller, character : character }).placeAt( this.printsNode );
            this._widgets[ charName ] = widg;
            this.own( widg );
            this.updateCount();
        },
        removeCharacter : function( charName )
        {
            this._widgets[ charName ].destroy();
            delete this._widgets[ charName ];
            this.updateCount();
        },
        updateCount : function()
        {
            this.countNode.innerHTML = Object.keys( this._widgets ).length;
        },
        closeDialog : function()
        {
            popup.close( this.party_list );
        },
        updatePrints : function()
        {
            var settings = cookie( "printSettings" );
            if( !settings )
            {
                return;
            }
            try
            {
                settings = json.parse( settings );
            }
            catch( e )
            {
                cookie( "printSettings", null, { expires : -1 });
                return;
            }
            if( !settings.showShins )
            {
                this.showShinsCheckbox.set( "checked", false );
            }
            if( !settings.showXP )
            {
                this.showXPCheckbox.set( "checked", false );
            }
            if( !settings.showCyphers )
            {
                this.showCyphersCheckbox.set( "checked", false );
            }
            if( settings.compactView )
            {
                this.setCompactViewCheckbox.set( "checked", true );
            }
            for( var o in this._widgets )
            {
                this._widgets[ o ].updatePrint();
            }
        },
        getCharacter : function( charName )
        {
            var data = this._storedCharacters[ charName ].data;
            this.manager.populateFromStoredData( data );
            return this.manager.createCharacterValidator({ manager : this.manager }).analyzeCharacter();
        }
    });
});