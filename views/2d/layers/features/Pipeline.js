// COPYRIGHT © 2018 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/assignHelper","../../../../core/Accessor","../../../../core/asyncUtils","../../../../core/Error","../../../../core/has","../../../../core/Logger","../../../../core/promiseUtils","../../../../core/accessorSupport/decorators","../../../../layers/support/TileInfo","../../ViewState","./controllers","./processors","./support/TileStore","../../tiling/TileInfoView"],function(e,t,r,o,i,n,s,l,c,a,u,p,d,h,f,v,y,g,w,S){function C(){return _}Object.defineProperty(t,"__esModule",{value:!0});var m=p.getLogger("esri.views.2d.layers.features.Pipeline"),_=new Set;t.getInstances=C;var b=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.controller=null,t.processor=null,t.remoteClient=null,t.tileStore=null,t.service=null,t.viewState=null,t}return r(t,e),t.prototype.initialize=function(){var e=this;this.watch("updating",function(t){e.remoteClient.invoke("setUpdating",t)}),u("esri-performance-tests")&&!u("esri-workers")&&_.add(this)},t.prototype.destroy=function(){u("esri-performance-tests")&&!u("esri-workers")&&_.delete(this),this.controller&&this.controller.destroy(),this.processor&&this.processor.destroy()},Object.defineProperty(t.prototype,"updating",{get:function(){var e=this,t=e.controller,r=e.processor;return!t||!r||t.updating||r.updating||!1},enumerable:!0,configurable:!0}),t.prototype.startup=function(e){var t=e.service,r=e.config,o=e.tileInfo;return i(this,void 0,void 0,function(){var e;return n(this,function(i){return e=new S(f.fromJSON(o)),this.service=t,this.tileStore=new w.default(e),[2,this._configure(r)]})})},t.prototype.update=function(e){var t=e.config,r=e.options;return i(this,void 0,void 0,function(){return n(this,function(e){switch(e.label){case 0:return this.processor&&this.controller?r.layerFilterChanged||r.invalidateFeatureData||r.invalidateMesh?[4,this.controller.update(t,r.layerFilterChanged)]:[3,2]:(m.error(new a("mapview-pipeline","Tried to update an unconfigured pipeline.")),[2]);case 1:e.sent(),e.label=2;case 2:return r.invalidateMesh?[4,this.processor.update(t)]:[3,4];case 3:e.sent(),this.controller.invalidate(),e.label=4;case 4:return[4,this.remoteClient.invoke("setUpdating",this.updating)];case 5:return e.sent(),[2]}})})},t.prototype.setViewState=function(e){var t=v.fromJSON(e);this._set("viewState",t),this.tileStore&&this.tileStore.setViewState(t),this.controller&&this.controller.setViewState(t)},t.prototype._configure=function(e){return i(this,void 0,void 0,function(){return n(this,function(t){switch(t.label){case 0:return[4,d.all([c.safeCast(this._handleControllerConfig(e)),c.safeCast(this._handleProcessorConfig(e))])];case 1:return t.sent(),this.controller.processor=this.processor,this.viewState&&this.controller.setViewState(this.viewState),[2]}})})},t.prototype._handleControllerConfig=function(e){return i(this,void 0,void 0,function(){var t;return n(this,function(r){switch(r.label){case 0:return[4,this._createController(this.service,e)];case 1:return t=r.sent(),[4,t.startup()];case 2:return r.sent(),[2,t]}})})},t.prototype._handleProcessorConfig=function(e){return i(this,void 0,void 0,function(){return n(this,function(t){return[2,this._createProcessor(this.service,e)]})})},t.prototype._createController=function(e,t){return i(this,void 0,void 0,function(){var r,o,i,s,l;return n(this,function(n){switch(n.label){case 0:return[4,y.loadControllerModule(e.type)];case 1:return r=n.sent().default,o=this,i=o.tileStore,s=o.remoteClient,l=new r({service:e,config:t,tileStore:i,remoteClient:s}),this.controller&&this.controller.destroy(),this.controller=l,[2,l]}})})},t.prototype._createProcessor=function(e,t){return i(this,void 0,void 0,function(){var r,o,i,s,l;return n(this,function(n){switch(n.label){case 0:return[4,g.loadProcessorModule(t.renderer.type)];case 1:return r=n.sent().default,o=this,i=o.remoteClient,s=o.tileStore,l=new r({service:e,config:t,tileStore:s,remoteClient:i}),this.processor&&this.processor.destroy(),this.processor=l,[2,l]}})})},o([h.property()],t.prototype,"controller",void 0),o([h.property()],t.prototype,"processor",void 0),o([h.property({dependsOn:["controller.updating","processor.updating"]})],t.prototype,"updating",null),o([h.property()],t.prototype,"viewState",void 0),t=o([h.subclass("esri.views.2d.layers.features.Pipeline")],t)}(h.declared(l));t.default=b});