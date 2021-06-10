/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/promiseUtils","../../../../../geometry/Point","../../../../../geometry/support/typeUtils","../../../../../core/HandleOwner","../../../../../core/workers/WorkerHandle"],(function(e,t,r,i,n,o,a,d,s,l,u,c,p,h,f,g,y){"use strict";e.FeatureServiceSnappingSourceWorkerHandle=function(e){function r(t){var r;return(r=e.call(this,t)||this).availability=0,r.workerHandleUpdating=!0,r.editId=0,r}t._inheritsLoose(r,e);var i=r.prototype;return i.destroy=function(){this.workerHandle.destroy()},i.initialize=function(){this.workerHandle=new k(this.scheduler),this.handles.add([this.workerHandle.on("notify-updating",(({updating:e})=>this.workerHandleUpdating=e)),this.workerHandle.on("notify-availability",(({availability:e})=>this._set("availability",e)))])},i.setup=async function(e,t){const r=this.serviceInfoFromLayer(e.layer);if(n.isNone(r))return;const i={configuration:this.convertConfiguration(e.configuration),serviceInfo:r,spatialReference:e.spatialReference.toJSON()};await this.updatingHandles.addPromise(this.workerHandle.invokeMethod("setup",i,t)),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},t))},i.configure=async function(e,t){const r=this.convertConfiguration(e);await this.updatingHandles.addPromise(this.workerHandle.invokeMethod("configure",r,t)),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},t))},i.refresh=async function(e){await this.updatingHandles.addPromise(this.workerHandle.invokeMethod("refresh",{},e)),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},e))},i.fetchCandidates=async function(e,t){const r={distance:e.distance,point:e.coordinateHelper.toPoint(e.point,new h).toJSON(),types:e.types,filter:n.isSome(e.filter)?e.filter.createQuery().toJSON():null};return this.workerHandle.invoke(r,t)},i.updateTiles=async function(e,t){const r={tiles:e.tiles,tileInfo:n.isSome(e.tileInfo)?e.tileInfo.toJSON():null,tileSize:e.tileSize};await this.workerHandle.invokeMethod("updateTiles",r,t),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},t))},i.applyEdits=async function(e,t){var r,i,n,o,a,d;const s=this.editId++,l={id:s};await this.workerHandle.invokeMethod("beginApplyEdits",l,t),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},t));const u=await p.whenOrAbort(e.result,t),c={id:s,edits:{addedFeatures:null!=(r=null==(i=u.addedFeatures)?void 0:i.map((({objectId:e})=>e)))?r:[],deletedFeatures:null!=(n=null==(o=u.deletedFeatures)?void 0:o.map((({objectId:e})=>e)))?n:[],updatedFeatures:null!=(a=null==(d=u.updatedFeatures)?void 0:d.map((({objectId:e})=>e)))?a:[]}};await this.workerHandle.invokeMethod("endApplyEdits",c,t),this.updatingHandles.addPromise(this.workerHandle.invokeMethod("whenNotUpdating",{},t))},i.getDebugInfo=function(e){return this.workerHandle.invokeMethod("getDebugInfo",{},e)},i.convertConfiguration=function(e){return{filter:n.isSome(e.filter)?e.filter.toJSON():null,customParameters:e.customParameters}},i.serviceInfoFromLayer=function(e){var t;return"multipatch"===e.geometryType||"mesh"===e.geometryType?null:{url:e.parsedUrl.path,fields:e.fields.map((e=>e.toJSON())),geometryType:f.featureGeometryTypeKebabDictionary.toJSON(e.geometryType),capabilities:e.capabilities,objectIdField:e.objectIdField,spatialReference:e.spatialReference.toJSON(),timeInfo:null==(t=e.timeInfo)?void 0:t.toJSON()}},t._createClass(r,[{key:"updating",get:function(){return this.updatingHandles.updating||this.workerHandleUpdating}}]),r}(g.HandleOwner),r.__decorate([d.property({constructOnly:!0})],e.FeatureServiceSnappingSourceWorkerHandle.prototype,"scheduler",void 0),r.__decorate([d.property({readOnly:!0})],e.FeatureServiceSnappingSourceWorkerHandle.prototype,"updating",null),r.__decorate([d.property({readOnly:!0})],e.FeatureServiceSnappingSourceWorkerHandle.prototype,"availability",void 0),r.__decorate([d.property()],e.FeatureServiceSnappingSourceWorkerHandle.prototype,"workerHandleUpdating",void 0),e.FeatureServiceSnappingSourceWorkerHandle=r.__decorate([s.subclass("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceSnappingSourceWorkerHandle")],e.FeatureServiceSnappingSourceWorkerHandle);let k=function(e){function r(t){return e.call(this,"FeatureServiceSnappingSourceWorker","fetchCandidates",t,{strategy:"dedicated"})||this}return t._inheritsLoose(r,e),r.prototype.getTransferList=function(){return[]},r}(y.WorkerHandle);Object.defineProperty(e,"__esModule",{value:!0})}));
