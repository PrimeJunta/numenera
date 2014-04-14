define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FieldControlBase",
         "dojo/text!./templates/_TierControl.html"],
function( declare,
          lang,
          _FieldControlBase,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        feature_properties : {},
        postMixInProperties : function()
        {
            this.definition = this.parent.definition;
        },
        createControl : function()
        {
            console.log( "CREATE CONTROL FOR DEF", this.definition, "VAL", this.value, "PROPS", this.feature_properties );
            for( var o in this.definition )
            {
                if( o.charAt( 0 ) == "_" )
                {
                    // internal, do nothing
                }
                else if( !this.definition[ o ].condition || this.definition[ o ].condition && this.feature_properties[ this.definition[ o ].condition ] )
                {
                    // place it
                    switch( this.definition[ o ].type )
                    {
                        case "stats" :
                            // place _StatControls
                            console.log( "STAT CTRLS", this.definition[ o ], this.value[ o ] );
                            break;
                        case "list" :
                            // create _ListControl
                            console.log( "LIST CTRL", this.definition[ o ], this.value[ o ] );
                            break;
                        case "choice" :
                            // create _ChoiceControl
                            console.log( "CHOICE CTRL", this.definition[ o ], this.value[ o ] );
                            break;
                    }
                }
            }
        }
    });
});