/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/lang","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","../../Color","./materialUtils"],(function(o,r,e,t,s,l,c,p,a,n,u,i,y,S,b){"use strict";var d;o.Symbol3DHalo=d=function(o){function e(){var r;return(r=o.apply(this,arguments)||this).color=new S([0,0,0,1]),r.size=0,r}return r._inheritsLoose(e,o),e.prototype.clone=function(){return new d({color:s.clone(this.color),size:this.size})},e}(y.JSONSupport),e.__decorate([p.property(b.colorAndTransparencyProperty)],o.Symbol3DHalo.prototype,"color",void 0),e.__decorate([p.property(b.screenSizeProperty)],o.Symbol3DHalo.prototype,"size",void 0),o.Symbol3DHalo=d=e.__decorate([a.subclass("esri.symbols.support.Symbol3DHalo")],o.Symbol3DHalo);var _=o.Symbol3DHalo;o.default=_,Object.defineProperty(o,"__esModule",{value:!0})}));
