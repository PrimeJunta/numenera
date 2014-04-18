define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FeatureBase",
         "primejunta/numenera/chargen/data/origins/numenera/types",
         "primejunta/numenera/chargen/data/origins/strange/types" ],
       function( declare,
                 lang,
                 _FeatureBase,
                 numeneraDescriptors,
                 strangeDescriptors)
       {
           return declare([ _FeatureBase ], {
               featureLabel : "Type",
               feature_properties : {
                   stat_constraints : {
                       min : -9,
                       max : 99,
                       pattern : "#0;-#0",
                       fixed : true
                   },
                   has_stats : true,
                   has_advancement : true,
                   has_special_list : true
               },
               data : {
                   "numenera" : {
                       origin : "numenera",
                       recursion : false,
                       base_payload_data : numeneraDescriptors
                   },
                   "strange" : {
                       origin : "strange",
                       recursion : false,
                       base_payload_data : strangeDescriptors

                   }
                }
           });
       });