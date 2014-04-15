define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/on",
         "dojo/dom-construct",
         "./_FieldControlBase",
         "./_StatPane",
         "./_ListControl",
         "./_OptionListControl",
         "dojo/text!./templates/_TierControl.html"],
function( declare,
          lang,
          on,
          domConstruct,
          _FieldControlBase,
          _StatPane,
          _ListControl,
          _OptionListControl,
          template )
{
    return declare([ _FieldControlBase ], {
        templateString : template,
        feature_properties : {},
        tier : 0,
        postMixInProperties : function()
        {
            this.definition = this.parent.definition;
            this.feature_properties.stat_constraints = {
                min : -9,
                max : 9,
                pattern : "+0;-0"
            }
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
                            this._statsPane = new _StatPane({
                                feature_properties : this.feature_properties,
                                feature_structure : this.definition[ o ],
                                parent : this.parent,
                                instance : this.value[ o ] || {}
                            }).placeAt( this.containerNode );
                            break;
                        case "list" :
                            var val = this.value[ o ];
                            this._listControl = new _ListControl({
                                feature_properties : this.feature_properties,
                                definition : this.definition[ o ],
                                parent : this.parent,
                                instance : val || [],
                                readValue : function()
                                {
                                    return this.instance;
                                }
                            } ).placeAt( this.containerNode );
                            break;
                        case "choice" :
                            this._choiceControl = new _OptionListControl({
                                title : "Type Abilities",
                                parent : this.parent, value : this.value[ o ]
                            } ).placeAt( this.containerNode );
                            break;
                    }
                }
            }
        }
    });
});