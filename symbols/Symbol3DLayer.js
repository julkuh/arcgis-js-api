/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/accessorSupport/decorators/writer","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/JSONSupport"],(function(e,r,o,t,s,c,p,n,a,l,u,i){"use strict";let d=function(r){function o(e){var o;return(o=r.call(this,e)||this).enabled=!0,o.type=null,o}return e._inheritsLoose(o,r),o.prototype.writeEnabled=function(e,r,o){e||(r[o]=e)},o}(i.JSONSupport);return r.__decorate([c.property({type:Boolean,json:{read:{source:"enable"},write:{target:"enable"}}})],d.prototype,"enabled",void 0),r.__decorate([n.writer("enabled")],d.prototype,"writeEnabled",null),r.__decorate([c.property({type:["icon","object","line","path","fill","water","extrude","text"],readOnly:!0})],d.prototype,"type",void 0),d=r.__decorate([p.subclass("esri.symbols.Symbol3DLayer")],d),d}));
