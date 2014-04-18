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
            this._control = new Textarea({ "class" : "num-inputTextArea num-homebrewInput", value : this.value }).placeAt( this.controlNode );
        }
    });
});