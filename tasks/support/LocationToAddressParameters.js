/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../geometry/SpatialReference","../../geometry/Point","../../geometry","./commonProperties"],(function(e,o,r,t,p,s,c,n,i,a,u,l,y,d,S){"use strict";let _=function(o){function r(e){var r;return(r=o.call(this,e)||this).apiKey=null,r.location=null,r.locationType=null,r.outSpatialReference=null,r}return e._inheritsLoose(r,o),r}(u.JSONSupport);return o.__decorate([s.property(S.apiKey)],_.prototype,"apiKey",void 0),o.__decorate([s.property({type:y,json:{write:{writer:(e,o)=>{const r=e?e.clone().normalize():null,t=void 0!==r;o.location=t?r:null}}}})],_.prototype,"location",void 0),o.__decorate([s.property({type:String,json:{write:!0}})],_.prototype,"locationType",void 0),o.__decorate([s.property({type:l,json:{read:{source:"outSR"},write:{target:"outSR"}}})],_.prototype,"outSpatialReference",void 0),_=o.__decorate([c.subclass("esri.tasks.support.LocationToAddressParameters")],_),_.from=p.ensureType(_),_}));
