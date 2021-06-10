/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/jsonMap","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/Accessor","../../geometry/support/jsonUtils","../../geometry"],(function(e,t,o,r,s,i,n,c,p,y,a,g,u,l){"use strict";const d=new n.JSONMap({9001:"meters",9002:"feet",9036:"kilometers",9093:"miles",109012:"nautical-miles",109001:"yards"});let m=function(t){function o(e){var o;return(o=t.call(this,e)||this).geometry1=null,o.geometry2=null,o.distanceUnit=null,o.geodesic=null,o}return e._inheritsLoose(o,t),o.prototype.toJSON=function(){const e={},t=this.geometry1;t&&(e.geometry1=JSON.stringify({geometryType:u.getJsonType(t),geometry:t}),e.sr=JSON.stringify(this.geometry1.spatialReference.toJSON()));const o=this.geometry2;return o&&(e.geometry2=JSON.stringify({geometryType:u.getJsonType(o),geometry:o})),this.distanceUnit&&(e.distanceUnit=d.toJSON(this.distanceUnit)),this.geodesic&&(e.geodesic=this.geodesic),e},o}(g);return t.__decorate([i.property({types:l.geometryTypes,json:{write:!0}})],m.prototype,"geometry1",void 0),t.__decorate([i.property({types:l.geometryTypes,json:{write:!0}})],m.prototype,"geometry2",void 0),t.__decorate([i.property({type:String,json:{write:!0}})],m.prototype,"distanceUnit",void 0),t.__decorate([i.property({type:Boolean,json:{write:!0}})],m.prototype,"geodesic",void 0),m=t.__decorate([c.subclass("esri.tasks.support.DistanceParameters")],m),m}));
