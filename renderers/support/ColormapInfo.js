/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../Color"],(function(r,e,o,t,p,s,c,u,l,n,i,a){"use strict";let y=function(e){function o(){var r;return(r=e.apply(this,arguments)||this).value=null,r.label=null,r.color=null,r}return r._inheritsLoose(o,e),o}(i.JSONSupport);return e.__decorate([s.property({type:Number,json:{write:!0}})],y.prototype,"value",void 0),e.__decorate([s.property({type:String,json:{write:!0}})],y.prototype,"label",void 0),e.__decorate([s.property({type:a,json:{type:[p.Integer],write:!0}})],y.prototype,"color",void 0),y=e.__decorate([c.subclass("esri.renderers.support.ColormapInfo")],y),y}));
