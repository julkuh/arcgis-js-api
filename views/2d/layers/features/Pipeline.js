/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../core/HandleOwner","../../../../layers/support/TileInfo","../../tiling/TileInfoView","./support/TileStore","./processors","./support/UpdateToken","./controllers/FeatureController2D"],(function(e,t,r,o,s,n,i,l,c,a,p,u,h,d,f,y,_,S){"use strict";const g=new Set;function v(){return g}let w=function(e){function r(){var t;return(t=e.apply(this,arguments)||this).controller=null,t.processor=null,t.remoteClient=null,t.tileStore=null,t.service=null,t.viewState=null,t}t._inheritsLoose(r,e);var o=r.prototype;return o.initialize=function(){this.handles.add(this.watch("updating",(e=>{this.remoteClient.invoke("setUpdating",e).catch((e=>{}))})))},o.destroy=function(){var e,t,r;null==(e=this.controller)||e.destroy(),null==(t=this.processor)||t.destroy(),null==(r=this.tileStore)||r.destroy(),this.controller=this.processor=this.tileStore=this.remoteClient=null},o.startup=async function({service:e,config:t,tileInfo:r,tiles:o}){if(this.service=e,!this.tileStore){const e=new d(h.fromJSON(r));this.tileStore=new f(e)}this.tileStore.clear(),await this._createProcessorAndController(t),await this.update({config:t},!0),this.tileStore.updateTiles(o)},o.updateTiles=async function(e){this.tileStore.updateTiles(e)},o.update=async function({config:e},t=!1){const r=_.UpdateToken.empty();return t||this.controller.pause(),await Promise.all([this.processor.update(r,e),this.controller.update(r,e)]),r.toJSON()},o.applyUpdate=async function(e){return this.controller.applyUpdate(_.UpdateToken.create(e))},o._createProcessorAndController=async function(e){await Promise.all([this._handleControllerConfig(e),this._handleProcessorConfig(e)]),this.controller.processor=this.processor},o._handleControllerConfig=async function(e){const t=await this._createController(this.service,e);return await t.startup(),t},o._handleProcessorConfig=async function(e){return this._createProcessor(this.service,e)},o._createController=async function(e,t){this.controller&&this.controller.destroy();const{tileStore:r,remoteClient:o}=this,s=new S({service:e,config:t,tileStore:r,remoteClient:o});return this.controller=s,s},o._createProcessor=async function(e,t){const r=t.schema.processors[0].type,o=(await y.loadProcessorModule(r)).default,{remoteClient:s,tileStore:n}=this,i=new o({service:e,config:t,tileStore:n,remoteClient:s});return this.processor&&this.processor.destroy(),this.processor=i,i},t._createClass(r,[{key:"updating",get:function(){return!this.controller||this.controller.updating}}]),r}(u.HandleOwner);r.__decorate([i.property()],w.prototype,"controller",void 0),r.__decorate([i.property()],w.prototype,"processor",void 0),r.__decorate([i.property()],w.prototype,"updating",null),r.__decorate([i.property()],w.prototype,"viewState",void 0),w=r.__decorate([l.subclass("esri.views.2d.layers.features.Pipeline")],w);var C=w;e.default=C,e.getInstances=v,Object.defineProperty(e,"__esModule",{value:!0})}));
