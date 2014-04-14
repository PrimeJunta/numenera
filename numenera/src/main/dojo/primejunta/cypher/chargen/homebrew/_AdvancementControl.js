define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_ListControl",
         "./_TierControl",
         "dojo/text!./templates/_AdvancementControl.html" ],
function( declare,
          lang,
          _ListControl,
          _TierControl,
          template )
{
    return declare([ _ListControl ], {
        templateString : template,
        feature_properties : {},
        createItemControl : function( props )
        {
            props.feature_properties = this.feature_properties;
            return new _TierControl( props );
        }
    });
});