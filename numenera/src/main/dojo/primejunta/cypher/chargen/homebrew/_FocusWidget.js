define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FeatureBase",
         "primejunta/numenera/chargen/data/recursions/ninth_world/foci",
         "primejunta/numenera/chargen/data/recursions/ardeyn/foci",
         "primejunta/numenera/chargen/data/recursions/earth/foci",
         "primejunta/numenera/chargen/data/recursions/ruk/foci" ],
       function( declare,
                 lang,
                 _FeatureBase,
                 ninthWorldFoci,
           ardeynFoci,
           earthFoci,
           rukFoci )
       {
           return declare([ _FeatureBase ], {
               feature_properties : {
                   has_stats : false,
                   has_advancement : true,
                   has_special_list : false,
                   stat_constraints : {
                       min : -9,
                       max : 9,
                       pattern : "+0;-0"
                   }
               },
               featureLabel : "Focus",
               data : {
                   "ninth_world" : {
                       origin : "numenera",
                       recursion : "ninth_world",
                       payload_data : ninthWorldFoci

                   },
                   "ardeyn" : {
                       origin : "strange",
                       recursion : "ardeyn",
                       payload_data : ardeynFoci

                   },
                   "earth" : {
                       origin : "strange",
                       recursion : "earth",
                       payload_data : earthFoci

                   },
                   "ruk" : {
                       origin : "strange",
                       recursion : "ruk",
                       payload_data : rukFoci
                   }
               }
           });
       });