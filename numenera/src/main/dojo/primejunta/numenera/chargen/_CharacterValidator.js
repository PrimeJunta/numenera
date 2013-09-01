define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./data/descriptors",
         "./data/types",
         "./data/foci" ],
function( declare,
          lang,
          descriptors,
          types,
          foci )
{
    return declare([], {
        manager : {},
        validateCharacter : function()
        {
            var errs = [];
            if( !descriptors[ this.manager.descriptorSelect.selectedIndex - 1 ] || !types[ this.manager.typeSelect.selectedIndex - 1 ] || !foci[ this.manager.focusSelect.selectedIndex - 1 ])
            {
                errs.push( "Select a descriptor, type, and focus." );
            }
            if( this.manager.free_pool.value != "0" || this.manager.free_edge.value != "0" )
            {
                errs.push( "Assign all of your character points.")
            }
            if( errs.length == 0 )
            {
                return true;
            }
            else
            {
                alert( errs.join( "<br/>" ) );
                return false;
            }
        }
    });
});