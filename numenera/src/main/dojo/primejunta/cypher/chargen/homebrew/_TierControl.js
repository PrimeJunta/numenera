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
            console.log( "DEF IS", this.definition, "VAL IS", this.value );
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
                                field_id : o,
                                instance : this.value
                            }).placeAt( this.containerNode );
                            on( this._statsPane, "change", lang.hitch( this, this._update, this._statsPane ) );
                            break;
                        case "list" :
                            var val = this.value[ o ];
                            this._listControl = new _ListControl({
                                feature_properties : this.feature_properties,
                                definition : this.definition[ o ],
                                parent : this.parent,
                                field_id : o,
                                instance : this.value
                            } ).placeAt( this.containerNode );
                            on( this._listControl, "change", lang.hitch( this, this._update, this._listControl ) );
                            break;
                        case "choice" :
                            domConstruct.create( "h3", { "class" : "cg-fieldControlLabel", "innerHTML" : "Type Abilities" }, this.containerNode );
                            this._choiceControl = new _OptionListControl({
                                "class" : "cg-complexItemInput cg-standaloneOptionList",
                                parent : this.parent,
                                field_id : o,
                                value : this.value[ o ]
                            } ).placeAt( this.containerNode );
                            on( this._choiceControl, "change", lang.hitch( this, this._update, this._choiceControl ) );
                            break;
                    }
                }
            }
        },
        _update : function( ctrl )
        {

        }
    });
});