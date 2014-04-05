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
               FEATURE_TYPE : "FOCUS",
               data : [{
                           origin : "ninth_world",
                           recursion : false,
                           payload_data : ninthWorldFoci
                       },
                       {
                           origin : "ardeyn",
                           recursion : false,
                           payload_data : ardeynFoci

                       },
                       {
                           origin : "earth",
                           recursion : false,
                           payload_data : earthFoci

                       },
                       {
                           origin : "ruk",
                           recursion : false,
                           payload_data : rukFoci

                       }]
           });
       });