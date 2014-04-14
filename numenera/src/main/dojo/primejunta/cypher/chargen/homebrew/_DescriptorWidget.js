define([ "dojo/_base/declare",
         "dojo/_base/lang",
         "./_FeatureBase",
         "primejunta/numenera/chargen/data/origins/numenera/descriptors",
         "primejunta/numenera/chargen/data/origins/strange/descriptors" ],
function( declare,
          lang,
          _FeatureBase,
          numeneraDescriptors,
          strangeDescriptors)
{
    return declare([ _FeatureBase ], {
        featureLabel : "Descriptor",
        data : {
            "numenera" : {
                origin : "numenera",
                recursion : false,
                payload_data : numeneraDescriptors
            },
            "strange" : {
                origin : "strange",
                recursion : false,
                payload_data : strangeDescriptors

            }
        }
    });
});