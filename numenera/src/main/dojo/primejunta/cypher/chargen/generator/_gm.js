/**
 * Mixin with methods for handling GM controls.
 * 
 * @private Mixin
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/dom-class" ],
function( declare,
          lang,
          domClass )
{
    return declare([], {
        /**
         * Toggles GM controls by setting/unsetting a CSS class on root and disabling/enabling stat floor check.
         */
        toggleGMControls : function()
        {
            if( this._gmControlsOn )
            {
                domClass.remove( this.domNode, "gm-controls-enabled" );
                this.statsControl.setFloorCheck( true );
                this.updatePhrase();
                this._gmControlsOn = false;
            }
            else
            {
                domClass.add( this.domNode, "gm-controls-enabled" );
                this.statsControl.setFloorCheck( false );
                this._gmControlsOn = true;
            }
        },
        /**
         * GM control: adds an ability with one of the circle prefixes.
         */
        addExtraAbility : function()
        {
            var phrase = this.selectValue( this.extraAbilityTypeSelect ).value + " " + this.toTitleCase( this.extraAbilityDescription.value );
            var _cur = this.extra_abilities_text.get( "value" );
            if( _cur != "" && _cur.charAt( _cur.length - 1 ) != '\n' )
            {
                _cur += "\n";
            }
            this.extra_abilities_text.set( "value", _cur + phrase );
            this.extraAbilityDescription.value = "";
            this.autoSave();
        }
    });
});