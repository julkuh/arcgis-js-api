/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport"],(function(e,r,o,t,s,p,i,a,u,n,c){"use strict";var l;let d=l=function(r){function o(){var e;return(e=r.apply(this,arguments)||this).age=null,e.ageReceived=null,e.displayCount=null,e.maxObservations=1,e}return e._inheritsLoose(o,r),o.prototype.clone=function(){return new l({age:this.age,ageReceived:this.ageReceived,displayCount:this.displayCount,maxObservations:this.maxObservations})},o}(c.JSONSupport);return r.__decorate([p.property({type:Number,json:{write:!0}})],d.prototype,"age",void 0),r.__decorate([p.property({type:Number,json:{write:!0}})],d.prototype,"ageReceived",void 0),r.__decorate([p.property({type:Number,json:{write:!0}})],d.prototype,"displayCount",void 0),r.__decorate([p.property({type:Number,json:{write:!0}})],d.prototype,"maxObservations",void 0),d=l=r.__decorate([i.subclass("esri.layers.support.PurgeOptions")],d),d}));
