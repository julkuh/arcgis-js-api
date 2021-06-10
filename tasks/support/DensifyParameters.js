/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/jsonMap","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../geometry/support/jsonUtils","../../geometry"],(function(e,t,o,r,s,i,n,p,c,g,u,l,a,m){"use strict";const h=new n.JSONMap({9001:"meters",9002:"feet",9036:"kilometers",9093:"miles",109012:"nautical-miles",109001:"yards"});let y=function(t){function o(e){var o;return(o=t.call(this,e)||this).geometries=null,o.geodesic=null,o.lengthUnit=null,o.maxSegmentLength=null,o}return e._inheritsLoose(o,t),o.prototype.toJSON=function(){const e={};if(this.geometries&&this.geometries.length>0){const t=this.geometries.map((function(e){return e.toJSON()}));e.geometries=JSON.stringify({geometryType:a.getJsonType(this.geometries[0]),geometries:t}),e.sr=JSON.stringify(this.geometries[0].spatialReference.toJSON())}return this.geodesic&&(e.geodesic=this.geodesic),this.lengthUnit&&(e.lengthUnit=h.toJSON(this.lengthUnit)),this.maxSegmentLength&&(e.maxSegmentLength=this.maxSegmentLength),e},o}(l.JSONSupport);return t.__decorate([i.property({types:[m.geometryTypes],json:{write:!0}})],y.prototype,"geometries",void 0),t.__decorate([i.property({type:Boolean,json:{write:!0}})],y.prototype,"geodesic",void 0),t.__decorate([i.property({type:String,json:{write:!0}})],y.prototype,"lengthUnit",void 0),t.__decorate([i.property({type:Number,json:{write:!0}})],y.prototype,"maxSegmentLength",void 0),y=t.__decorate([p.subclass("esri.tasks.support.DensifyParameters")],y),y}));
