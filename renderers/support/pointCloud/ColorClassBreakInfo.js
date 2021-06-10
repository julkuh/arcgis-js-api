/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/lang","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/subclass","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../../../core/JSONSupport","../../../Color"],(function(e,o,r,t,s,l,a,n,p,c,i,u,d,C){"use strict";var y;e.ColorClassBreakInfo=y=function(e){function r(){var o;return(o=e.apply(this,arguments)||this).description=null,o.label=null,o.minValue=0,o.maxValue=0,o.color=null,o}return o._inheritsLoose(r,e),r.prototype.clone=function(){return new y({description:this.description,label:this.label,minValue:this.minValue,maxValue:this.maxValue,color:s.clone(this.color)})},r}(d.JSONSupport),r.__decorate([n.property({type:String,json:{write:!0}})],e.ColorClassBreakInfo.prototype,"description",void 0),r.__decorate([n.property({type:String,json:{write:!0}})],e.ColorClassBreakInfo.prototype,"label",void 0),r.__decorate([n.property({type:Number,json:{read:{source:"classMinValue"},write:{target:"classMinValue"}}})],e.ColorClassBreakInfo.prototype,"minValue",void 0),r.__decorate([n.property({type:Number,json:{read:{source:"classMaxValue"},write:{target:"classMaxValue"}}})],e.ColorClassBreakInfo.prototype,"maxValue",void 0),r.__decorate([n.property({type:C,json:{type:[a.Integer],write:!0}})],e.ColorClassBreakInfo.prototype,"color",void 0),e.ColorClassBreakInfo=y=r.__decorate([p.subclass("esri.renderers.support.pointCloud.ColorClassBreakInfo")],e.ColorClassBreakInfo);var f=e.ColorClassBreakInfo;e.default=f,Object.defineProperty(e,"__esModule",{value:!0})}));
