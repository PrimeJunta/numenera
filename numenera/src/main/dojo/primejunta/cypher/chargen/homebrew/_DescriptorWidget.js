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
        FEATURE_TYPE : "DESCRIPTOR",
        featureLabel : "Descriptor",
        has_stats : true,
        data : [{
            origin : "numenera",
            recursion : false,
            payload_data : numeneraDescriptors
        },
        {
            origin : "strange",
            recursion : false,
            payload_data : strangeDescriptors

        }]
    });
});