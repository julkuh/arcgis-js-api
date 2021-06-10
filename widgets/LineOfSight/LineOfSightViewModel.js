/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../support/InteractiveToolViewModel","../../views/3d/interactive/analysisTools/lineOfSight/LineOfSightTool","../../views/3d/interactive/graphics/LineOfSight"],(function(e,t,o,r,i,s,n,l,c,a,p,u,d){"use strict";const g=r.getLogger("esri.widgets.LineOfSight.LineOfSightViewModel");let h=function(t){function o(e){var o;return(o=t.call(this,e)||this).supportedViewType="3d",o.model=new d.LineOfSight,o.observer=null,o.targets=new u.LineOfSightTargetCollection,o}e._inheritsLoose(o,t);var r=o.prototype;return r.start=function(){return this.createTool()},r.clear=function(){this.removeTool(),this.observer=null,this.targets.removeAll()},r.continue=function(){this.tool&&this.tool.continue()},r.stop=function(){this.tool&&this.tool.stop()},r.createToolParams=function(){return{toolConstructor:u.LineOfSightTool,constructorArguments:()=>({model:this.model})}},r.logUnsupportedError=function(){this.logError("LineOfSight widget is not implemented for MapView")},r.logError=function(...e){g.error(...e)},e._createClass(o,[{key:"state",get:function(){return this.isDisabled?"disabled":this.tool?this.tool.state:"ready"}}]),o}(p.InteractiveToolViewModel);return t.__decorate([s.property({readOnly:!0})],h.prototype,"state",null),t.__decorate([s.property()],h.prototype,"model",void 0),t.__decorate([s.property()],h.prototype,"tool",void 0),t.__decorate([s.property({aliasOf:"model.observer"})],h.prototype,"observer",void 0),t.__decorate([s.property({aliasOf:"model.targets"})],h.prototype,"targets",void 0),h=t.__decorate([n.subclass("esri.widgets.lineOfSight.LineOfSightViewModel")],h),h}));
