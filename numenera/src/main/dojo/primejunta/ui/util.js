define({
   prettify : function( str )
   {
       var arr = str.replace( /_/g, " " ).split( " " );
       var out = [];
       while( arr.length > 0 )
       {
           var cur = arr.shift();
           cur = cur.charAt( 0 ).toUpperCase() + cur.substring( 1 );
           out.push( cur );
       }
       return out.join( " " );
   }
});