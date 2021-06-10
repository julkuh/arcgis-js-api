/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/lang","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../core/Collection","./BuildingFilterAuthoringInfoType"],(function(e,r,o,t,s,c,p,n,i,u,l,a,y,f){"use strict";var d;const h=y.ofType(f);let g=d=function(r){function o(){return r.apply(this,arguments)||this}return e._inheritsLoose(o,r),o.prototype.clone=function(){return new d({filterTypes:t.clone(this.filterTypes)})},o}(a.JSONSupport);return r.__decorate([p.property({type:h,json:{write:!0}})],g.prototype,"filterTypes",void 0),g=d=r.__decorate([n.subclass("esri.layers.support.BuildingFilterAuthoringInfoBlock")],g),g}));
