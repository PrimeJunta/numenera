/**
 * Logic making a control unlockable. Mixed into _TierWidget and _ListItem.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Button",
         "dojo/dom-class",
         "dojo/topic" ], 
function( declare,
          lang,
          Button,
          domClass,
          topic ) {
    return declare([], {
        /**
         * Stub. Must return value readable with rollBack.
         */
        getPrevVal : function()
        {
        },
        /**
         * Stub. Must set value of control to prevVal, created earlier with getPrevVal.
         */
        rollBack : function( /* any */ prevVal )
        {
        },
        /**
         * Stub. Must lock the applicable UI controls.
         */
        lockControls : function()
        {
        },
        /**
         * Stub. Must unlock the applicable UI controls.
         */
        unlockControls : function()
        {
        },
        /**
         * Stub. Must return true if applicable controls are locked; else must return false.
         */
        controlsAreLocked : function()
        {
            return true;
        },
        /**
         * Creates UI controls for lock/unlock in unlockControlNode and connects listeners to them.
         */
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
                label : "Cancel",
                onClick : lang.hitch( this, this.cancelChange )
            }).placeAt( this.unlockControlNode );
            this.applyChangeButton = new Button({
                style : "display:none",
                label : "Apply",
                onClick : lang.hitch( this, this.applyChange )
            }).placeAt( this.unlockControlNode );
            domClass.add( this.cancelButton.domNode, "cg-redButton" );
            domClass.add( this.applyChangeButton.domNode, "cg-blueButton" );
        },
        /**
         * Stores previous value on _prevVal and .unlockControls; also changes state of unlock controls accordingly.
         * Publishes event causing other unlockable controls to lock their unlock buttons, since we can only unlock
         * one perk per tier.
         */
        unlock : function()
        {
            this._prevVal = this.getPrevVal();
            this.unlockButton.domNode.style.display = "none";
            this.cancelButton.domNode.style.display = "inline-block";
            this.applyChangeButton.domNode.style.display = "inline-block";
            this.unlockControls();
            topic.publish( "CharGen/pleaseLockUnlock" );
        },
        /**
         * Resets state of host control to what it was before unlock was called and publishes event to unlock lock
         * buttons again.
         */
        cancelChange : function()
        {
            this.unlockButton.domNode.style.display = "inline-block";
            this.cancelButton.domNode.style.display = "none";
            this.applyChangeButton.domNode.style.display = "none";
            this.rollBack( this._prevVal );
            this.lockControls();
            topic.publish( "CharGen/pleaseShowUnlock" );
        },
        /**
         * Calls .lockControls and publishes event which hides unlock controls: the user has changed her chosen perk
         * and can't do it again.
         */
        applyChange : function()
        {
            this.lockControls();
            topic.publish( "CharGen/pleaseHideUnlock" );
        },
        /**
         * Shows unlock controls created earlier.
         */
        showUnlockControls : function()
        {
            if( !this.unlockControlNode || !this.isUnlockable || !this.controlsAreLocked() )
            {
                return;
            }
            this.unlockControlNode.style.display = "block";
            this.unlockButton.domNode.style.display = "block";
            this.cancelButton.domNode.style.display = "none";
            this.applyChangeButton.domNode.style.display = "none";
            this.unlockButton.set( "disabled", false );
        },
        /**
         * Disables unlock button.
         */
        lockUnlockControls : function()
        {
            this.unlockButton.set( "disabled", true );
        },
        /**
         * Hides unlock controls.
         */
        hideUnlockControls : function()
        {
            if( !this.unlockControlNode )
            {
                return;
            }
            this.unlockControlNode.style.display = "none";
        },
        /**
         * Disconnects listeners and destroys created controls.
         */
        destroy : function()
        {
            this.inherited( arguments );
            while( this._subs.length > 0 )
            {
                this._subs.pop().destroy();
            }
            if( this.unlockButton )
            {
                this.unlockButton.destroy();
                this.cancelButton.destroy();
                this.applyChangeButton.destroy();
            }
        }
    });
});