/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","./mixins/ChartMediaInfo","./support/chartMediaInfoUtils"],(function(e,t,r,o,s,c,i,n,a,p,l,u){"use strict";var h;let d=h=function(t){function r(e){var r;return(r=t.call(this,e)||this).type="line-chart",r}return e._inheritsLoose(r,t),r.prototype.clone=function(){return new h({altText:this.altText,title:this.title,caption:this.caption,value:this.value?this.value.clone():null})},r}(l);return t.__decorate([c.property({type:["line-chart"],readOnly:!0,json:{type:["linechart"],read:!1,write:u.chartTypeKebabDict.write}})],d.prototype,"type",void 0),d=h=t.__decorate([i.subclass("esri.popup.content.LineChartMediaInfo")],d),d}));
