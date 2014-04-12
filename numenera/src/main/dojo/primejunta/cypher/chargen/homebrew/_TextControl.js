define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/Textarea",
         "./_FieldControlBase" ],
function( declare,
          lang,
          Textarea,
          _FieldControlBase ) {
    return declare([ _FieldControlBase ], {
        createControl : function()
        {
            this._control = new Textarea({ "class" : "num-inputTextArea num-homebrewInput" }).placeAt( this.controlNode );
            this._control.set( "value", this.value );
            this._control.startup();
        }
    });
});