/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/maybe","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/reader","../../core/accessorSupport/decorators/subclass","../../core/accessorSupport/decorators/writer","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../geometry/support/typeUtils","../../geometry","../../Graphic"],(function(e,r,t,o,p,a,s,u,i,c,n,y,l,d,_,m,S){"use strict";let b=function(r){function t(e){var t;return(t=r.call(this,e)||this).displayFieldName=null,t.feature=null,t.foundFieldName=null,t.layerId=null,t.layerName=null,t.value=void 0,t}e._inheritsLoose(t,r);var p=t.prototype;return p.readFeature=function(e,r){const t={attributes:{}};return r.attributes&&(t.attributes=r.attributes),r.geometry&&(t.geometry=r.geometry),S.fromJSON(t)},p.writeFeature=function(e,r){if(!e)return;const{attributes:t,geometry:p}=e;t&&(r.attributes={...t}),o.isSome(p)&&(r.geometry=p.toJSON(),r.geometryType=_.typeKebabDictionary.toJSON(p.type))},t}(d.JSONSupport);return r.__decorate([s.property({type:String,json:{write:!0}})],b.prototype,"displayFieldName",void 0),r.__decorate([s.property({type:S})],b.prototype,"feature",void 0),r.__decorate([u.reader("feature",["attributes","geometry"])],b.prototype,"readFeature",null),r.__decorate([c.writer("feature")],b.prototype,"writeFeature",null),r.__decorate([s.property({type:String,json:{write:!0}})],b.prototype,"foundFieldName",void 0),r.__decorate([s.property({type:Number,json:{write:!0}})],b.prototype,"layerId",void 0),r.__decorate([s.property({type:String,json:{write:!0}})],b.prototype,"layerName",void 0),r.__decorate([s.property({json:{write:!0}})],b.prototype,"value",void 0),b=r.__decorate([i.subclass("esri.tasks.support.FindResult")],b),b}));
