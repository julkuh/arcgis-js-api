/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/jsonMap","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../geometry/support/jsonUtils","../../geometry"],(function(e,r,t,o,s,a,p,i,l,n,c,u,y,d){"use strict";const S=new p.JSONMap({esriSpatialRelIntersects:"intersects",esriSpatialRelContains:"contains",esriSpatialRelCrosses:"crosses",esriSpatialRelEnvelopeIntersects:"envelope-intersects",esriSpatialRelIndexIntersects:"index-intersects",esriSpatialRelOverlaps:"overlaps",esriSpatialRelTouches:"touches",esriSpatialRelWithin:"within",esriSpatialRelRelation:"relation"});let g=function(r){function t(e){var t;return(t=r.call(this,e)||this).geometry=null,t.name=null,t.spatialRelationship=null,t.type="layer",t.where=null,t}return e._inheritsLoose(t,r),t}(u.JSONSupport);return r.__decorate([a.property({types:d.geometryTypes,json:{read:y.fromJSON,write:!0}})],g.prototype,"geometry",void 0),r.__decorate([a.property({type:String,json:{read:{source:"layerName"},write:{target:"layerName"}}})],g.prototype,"name",void 0),r.__decorate([a.property({type:String,json:{read:{source:"spatialRel",reader:S.read},write:{target:"spatialRel",writer:S.write}}})],g.prototype,"spatialRelationship",void 0),r.__decorate([a.property({type:String,json:{write:!0}})],g.prototype,"type",void 0),r.__decorate([a.property({type:String,json:{write:!0}})],g.prototype,"where",void 0),g=r.__decorate([i.subclass("esri.tasks.support.DataLayer")],g),g}));
