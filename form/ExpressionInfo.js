/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/JSONSupport"],(function(e,r,t,o,s,p,n,i,c,u,l){"use strict";var a;let y=a=function(r){function t(e){var t;return(t=r.call(this,e)||this).expression=null,t.name=null,t.returnType="boolean",t.title=null,t}return e._inheritsLoose(t,r),t.prototype.clone=function(){return new a({name:this.name,title:this.title,expression:this.expression,returnType:this.returnType})},t}(l.JSONSupport);return r.__decorate([p.property({type:String,json:{write:!0}})],y.prototype,"expression",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],y.prototype,"name",void 0),r.__decorate([p.property({type:["boolean"],json:{write:!0}})],y.prototype,"returnType",void 0),r.__decorate([p.property({type:String,json:{write:!0}})],y.prototype,"title",void 0),y=a=r.__decorate([n.subclass("esri.form.ExpressionInfo")],y),y}));
