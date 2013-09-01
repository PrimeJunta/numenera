define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/topic" ], 
function( declare,
          lang,
          topic ) {
    return declare([], {
        initializeUnlockControls : function()
        {
            this._subs.push( topic.subscribe( "CharGen/pleaseShowUnlock", lang.hitch( this, this.showUnlockControls ) ) );
            this._subs.push( topic.subscribe( "CharGen/pleaseHideUnlock", lang.hitch( this, this.hideUnlockControls ) ) );
            this._subs.push( topic.subscribe( "CharGen/pleaseLockUnlock", lang.hitch( this, this.lockUnlockControls ) ) );
        },
        unlock : function()
        {
            this._prevVal = this.getPrevVal();
            this.unlockButton.domNode.style.display = "none";
            this.cancelButton.domNode.style.display = "block";
            this.unlockControls();
            topic.publish( "CharGen/pleaseLockUnlock" );
        },
        cancelChange : function()
        {
            this.unlockButton.domNode.style.display = "block";
            this.cancelButton.domNode.style.display = "none";
            this.rollBack( this._prevVal );
            this.lockControls();
            topic.publish( "CharGen/pleaseShowUnlock" );
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
            if( !this.unlockControls )
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
            if( !this.unlockControls )
            {
                return;
            }
            this.unlockButton.domNode.style.display = "none";
            this.cancelButton.domNode.style.display = "none";
        },
    });
});