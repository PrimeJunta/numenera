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
        postMixInProperties : function()
        {
            this._tier = 1;
            this.inherited( arguments );
        },
        createItemControl : function( props )
        {
            console.log( "CREATE TIER CTRL", this.feature_properties );
            props.feature_properties = this.feature_properties;
            props.tier = this._tier;
            this._tier++;
            return new _TierControl( props );
        },
        save : function()
        {
            this.parent.save()
        }
    });
});