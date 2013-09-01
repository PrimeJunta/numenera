define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dojo/topic" ], 
function( declare,
          lang,
          Button,
          topic ) {
    return declare([], {
        initializeUnlockControls : function()
        {
            if( !this._subs )
            {
                this._subs = [];
            }
            this._subs.push( topic.subscribe( "CharGen/pleaseShowUnlock", lang.hitch( this, this.showUnlockControls ) ) );
            this._subs.push( topic.subscribe( "CharGen/pleaseHideUnlock", lang.hitch( this, this.hideUnlockControls ) ) );
            this._subs.push( topic.subscribe( "CharGen/pleaseLockUnlock", lang.hitch( this, this.lockUnlockControls ) ) );
            this.unlockButton = new Button({
                label : "Unlock",
                onClick : lang.hitch( this, this.unlock )
            }).placeAt( this.unlockControlNode );
            this.cancelButton = new Button({
                style : "display:none",
                className : "cg-redButton",
                label : "Cancel",
                onClick : lang.hitch( this, this.cancelChange )
            }).placeAt( this.unlockControlNode );
            this.applyChangeButton = new Button({
                style : "display:none",
                className : "cg-blueButton",
                label : "Apply",
                onClick : lang.hitch( this, this.applyChange )
            }).placeAt( this.unlockControlNode );
        },
        unlock : function()
        {
            this._prevVal = this.getPrevVal();
            this.unlockButton.domNode.style.display = "none";
            this.cancelButton.domNode.style.display = "inline-block";
            this.applyChangeButton.domNode.style.display = "inline-block";
            this.unlockControls();
            topic.publish( "CharGen/pleaseLockUnlock" );
        },
        cancelChange : function()
        {
            this.unlockButton.domNode.style.display = "inline-block";
            this.cancelButton.domNode.style.display = "none";
            this.applyChangeButton.domNode.style.display = "none";
            this.rollBack( this._prevVal );
            this.lockControls();
            topic.publish( "CharGen/pleaseShowUnlock" );
        },
        applyChange : function()
        {
            this.lockControls();
            topic.publish( "CharGen/pleaseHideUnlock" );
        },
        getPrevVal : function()
        {
        },
        rollBack : function()
        {
        },
        lockControls : function()
        {
        },
        unlockControls : function()
        {
            console.log( "should not see this!" );
        },
        showUnlockControls : function()
        {
            if( !this.unlockControlNode || !this.isUnlockable )
            {
                return;
            }
            this.unlockControlNode.style.display = "block";
            this.unlockButton.domNode.style.display = "block";
            this.cancelButton.domNode.style.display = "none";
            this.unlockButton.set( "disabled", false );
        },
        lockUnlockControls : function()
        {
            this.unlockButton.set( "disabled", true );
        },
        hideUnlockControls : function()
        {
            if( !this.unlockControlNode )
            {
                return;
            }
            this.unlockControlNode.style.display = "none";
        },
        destroy : function()
        {
            this.inherited( arguments );
            while( this._subs.length > 0 )
            {
                this._subs.pop().destroy();
            }
            this.unlockButton.destroy();
            this.cancelButton.destroy();
            this.applyChangeButton.destroy();
        }
    });
});