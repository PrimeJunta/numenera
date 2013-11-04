/**
 * Methods for handling secondary widgets in CharacterGenerator.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/_base/array",
         "dojo/topic",
         "dojo/query",
         "dojo/dom-construct",
         "../_CharacterValidator",
         "../_AdvancementControl",
         "../_HelpViewer" ],
function( declare,
          lang,
          array,
          topic,
          domQuery,
          domConstruct,
          _CharacterValidator,
          _AdvancementControl,
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
         * Closes _printWidget.
         */
        closePrintView : function()
        {
            this._closeSecondaryWidget( this._printWidget );
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
            this._closeSecondaryWidget( this._playViewWidget );
            this.autoSave();
        },
        /**
         * Calls _showHelp with about (that's an included text module). Different from playView and printView
         * because it can transition back to either "splash" or "main".
         */
        showHelp : function()
        {
            if( this._spv )
            {
                return;
            }
            this._spv = true;
            this._helpViewer = new _HelpViewer({ manager : this, title : "About the Character Creation Utility", helpData : this.helpData });
            this._prevView = this.getShowingView(); // _transitions
            this._openSecondaryWidget( "help", this._helpViewer );
        },
        /**
         * Calls _showHelp with changelog (that's an included text module).
         */
        showChangeLog : function()
        {
            this._showHelp( this.changelog );
        },
        /**
         * Creates a secondary widget in this[ attachPoint ] with this[ creatorMethod ], and registers its domNode in views as viewName.
         */
        _createSecondaryWidget : function( /* String */ viewName, /* String */ creatorMethod, /* String */ attachPoint )
        {
            if( this._spv )
            {
                return;
            }
            this._spv = true;
            try // the try-catch block is here to make debugging easier, as for some reason the exceptions disappear otherwise.
            {
                this[ attachPoint ] = this[ creatorMethod ]({ manager : this });
                this._openSecondaryWidget( "play", this[ attachPoint ] );
            }
            catch( e )
            {
                console.log( e );
            }
        },
        /**
         * Opens widget widg in viewName.
         */
        _openSecondaryWidget : function( /* String */ viewName, /* Widget */ widg )
        {
            this.views[ viewName ] = { nodes : [ widg.domNode ]};
            this.transitionOut().then( lang.hitch( this, function() {
                widg.placeAt( document.body, "first" );
                widg.startup();
                this.transitionIn( viewName ).then( lang.hitch( this, function() {
                    this._spv = false;
                }));
            }));
        },
        /**
         * Closes widget widg and transitions to view.
         */
        _closeSecondaryWidget : function( /* Widget */ widg, /* String */ view )
        {
            this.transitionOut().then( lang.hitch( this, function() {
                widg.destroy();
                this.transitionIn( view ? view : "main" );
            }));
        },

    });
});