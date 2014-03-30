/**
 * Methods for handling secondary widgets in CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/cookie",
         "dojo/Deferred",
         "dojo/topic",
         "dojo/query",
         "dojo/dom-construct",
         "../_CharacterValidator",
         "../_AdvancementControl",
         "../_RecursionInitializer",
         "../../help/_HelpViewerBase" ],
function( declare,
          lang,
          array,
          cookie,
          Deferred,
          topic,
          domQuery,
          domConstruct,
          _CharacterValidator,
          _AdvancementControl,
          RecursionInitializer,
          _HelpViewer )
{
    return declare([], {
        /**
         * Stub. Create and return a SplashCharacterPane of the appropriate type.
         */
        createSplashCharacterPane : function( props )
        {
        },
        /**
         * Stub. Return a character record of the right type.
         */
        createPrintView : function( props )
        {
        },
        /**
         * Stub. Return a play view of the right type.
         */
        createPlayView : function( props )
        {
        },
        /**
         * Stub. Return a character record of the right type.
         */
        createAdvancementControl : function( props )
        {
            return new _AdvancementControl( props );
        },
        /**
         * Stub. Create and provide a character validator of the appropriate type.
         */
        createCharacterValidator : function( props )
        {
            return new _CharacterValidator( props );
        },
        /**
         * (Re)creates a _PrintView for the record, places it, hides this widget and shows it.
         */
        showPrintView : function()
        {
            this._createSecondaryWidget( "print", "createPrintView", "_printWidget" );
        },
        /**
         * Yes, I do need this because I have my own help button.
         */
        showHelp : function()
        {
            this.controller.showModule( "help" );
        },
        /**
         * Closes _printWidget.
         */
        closePrintView : function()
        {
            this.transitionTo( "chargen" );
        },
        /**
         * Creates and shows a playView widget.
         */
        showPlayView : function()
        {
            this._createSecondaryWidget( "play", "createPlayView", "_playViewWidget" );
        },
        closePlayView : function()
        {
            this.transitionTo( "chargen" );
            this.autoSave();
        },
        /**
         * Transitions to viewName and sets it as this.currentView.
         *
         * @public Deferred
         */
        transitionTo : function( /* String */ viewName )
        {
            this.currentView = viewName;
            return this.controller.showView( viewName );
        },
        /**
         * Creates a secondary widget in this[ attachPoint ] with creatorMethod, destroying any widget previously at
         * that attachPoint, and puts it in view matching viewName.
         */
        _createSecondaryWidget : function( /* String */ viewName, /* String */ creatorMethod, /* String */ attachPoint )
        {
            if( this.controller.transitionInProgress ) // block double-clicks
            {
                return;
            }
            try // the try-catch block is here to make debugging easier, as for some reason the exceptions disappear otherwise.
            {
                if( this[ attachPoint ] )
                {
                    this[ attachPoint ].destroy();
                }
                this[ attachPoint ] = this[ creatorMethod ]({ manager : this, controller : this.controller }).placeAt( this.controller.getView( viewName ) );
                this.transitionTo( viewName );
                this[ attachPoint ].startup(); // ?
            }
            catch( e )
            {
                console.log( e );
            }
        }
    });
});