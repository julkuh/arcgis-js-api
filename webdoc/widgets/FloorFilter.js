/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/lang","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport"],(function(e,t,r,o,i,s,n,l,p,a,c,d){"use strict";var u;let y=u=function(t){function r(e){var r;return(r=t.call(this,e)||this).enabled=!1,r.longNames=!1,r.minimized=!1,r.pinnedLevels=!1,r.site=null,r.facility=null,r.level=null,r}return e._inheritsLoose(r,t),r.prototype.clone=function(){return new u(o.clone({enabled:this.enabled,longNames:this.longNames,minimized:this.minimized,pinnedLevels:this.pinnedLevels,site:this.site,facility:this.facility,level:this.level}))},r}(d.JSONSupport);return t.__decorate([n.property({type:Boolean,json:{read:{source:"enabled"},write:{target:"enabled"}}})],y.prototype,"enabled",void 0),t.__decorate([n.property({type:Boolean,json:{read:{source:"longNames"},write:{target:"longNames"}}})],y.prototype,"longNames",void 0),t.__decorate([n.property({type:Boolean,json:{read:{source:"minimized"},write:{target:"minimized"}}})],y.prototype,"minimized",void 0),t.__decorate([n.property({type:Boolean,json:{read:{source:"pinnedLevels"},write:{target:"pinnedLevels"}}})],y.prototype,"pinnedLevels",void 0),t.__decorate([n.property({type:String,json:{read:{source:"site"},write:{target:"site"}}})],y.prototype,"site",void 0),t.__decorate([n.property({type:String,json:{read:{source:"facility"},write:{target:"facility"}}})],y.prototype,"facility",void 0),t.__decorate([n.property({type:String,json:{read:{source:"level"},write:{target:"level"}}})],y.prototype,"level",void 0),y=u=t.__decorate([l.subclass("esri.webdoc.widgets.FloorFilter")],y),y}));