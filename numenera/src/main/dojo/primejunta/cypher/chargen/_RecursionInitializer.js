/**
 * Class which handles switching to a new recursion.
 */
define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "dojo/Deferred",
         "dijit/Dialog",
         "dijit/form/Button",
         "dijit/_WidgetBase",
         "dijit/_TemplatedMixin",
         "dijit/_WidgetsInTemplateMixin",
         "primejunta/cypher/chargen/_UtilityMixin",
         "dojo/text!./templates/_RecursionInitializer.html" ],
function( declare,
          lang,
          Deferred,
          Dialog,
          Button,
          _WidgetBase,
          _TemplatedMixin,
          _WidgetsInTemplateMixin,
          _UtilityMixin,
          template )
{
    return declare([ _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, _UtilityMixin ], {
        manager : {},
        templateString : template,
        initializeRecursion : function( rec, label )
        {
            this._promise = new Deferred();
            this._rec = rec;
            this.focusSelect.options.length = 0;
            for( var o in this.manager.recursions[ rec ] )
            {
                this.focusSelect.options[ this.focusSelect.options.length ] = new Option( this.manager.recursions[ rec ][ o ].label, o );
            }
            this.labelNode.innerHTML = label;
            if( !this.dlog )
            {
                this.dlog = new Dialog({ title : "Welcome to " + label, content : this.domNode });
            }
            this.dlog.show();
            return this._promise;
        },
        cancelChange : function()
        {
            this.dlog.hide();
            this.manager.selectValue( this.manager.recursionSelect, this.manager.recursion );
            this._promise.cancel();
        },
        continueChange : function()
        {
            this.dlog.hide();
            this._promise.resolve( this.selectValue( this.focusSelect ).value );
        }
    });
});