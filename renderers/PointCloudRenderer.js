/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/lang","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/jsonMap","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/JSONSupport","./support/pointCloud/ColorModulation","./support/pointCloud/pointSizeAlgorithmTypeUtils"],(function(o,e,r,t,n,i,l,p,s,u,c,a,d,h,y){"use strict";const b=p.strict()({pointCloudClassBreaksRenderer:"point-cloud-class-breaks",pointCloudRGBRenderer:"point-cloud-rgb",pointCloudStretchRenderer:"point-cloud-stretch",pointCloudUniqueValueRenderer:"point-cloud-unique-value"});let S=function(e){function r(o){var r;return(r=e.call(this,o)||this).type=void 0,r.pointSizeAlgorithm=null,r.colorModulation=null,r.pointsPerInch=10,r}o._inheritsLoose(r,e);var n=r.prototype;return n.clone=function(){return console.warn(".clone() is not implemented for "+this.declaredClass),null},n.cloneProperties=function(){return{pointSizeAlgorithm:t.clone(this.pointSizeAlgorithm),colorModulation:t.clone(this.colorModulation),pointsPerInch:t.clone(this.pointsPerInch)}},r}(d.JSONSupport);return e.__decorate([l.property({type:b.apiValues,readOnly:!0,nonNullable:!0,json:{type:b.jsonValues,read:!1,write:b.write}})],S.prototype,"type",void 0),e.__decorate([l.property({types:y.pointSizeAlgorithmTypes,json:{write:!0}})],S.prototype,"pointSizeAlgorithm",void 0),e.__decorate([l.property({type:h.default,json:{write:!0}})],S.prototype,"colorModulation",void 0),e.__decorate([l.property({json:{write:!0},nonNullable:!0,type:Number})],S.prototype,"pointsPerInch",void 0),S=e.__decorate([s.subclass("esri.renderers.PointCloudRenderer")],S),function(o){o.fieldTransformTypeKebabDict=new p.JSONMap({none:"none",lowFourBit:"low-four-bit",highFourBit:"high-four-bit",absoluteValue:"absolute-value",moduloTen:"modulo-ten"})}(S||(S={})),S}));
