define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dijit/form/TextArea",
         "./_FieldControlBase" ],
function( declare,
          lang,
          TextArea,
          _FieldControlBase ) {
    return declare([ _FieldControlBase ], {
        createControl : function()
        {
            this._control = new TextArea({ "class" : "num-inputTextArea num-homebrewInput", value : this.value }).placeAt( this.controlNode );
        }
    });
});