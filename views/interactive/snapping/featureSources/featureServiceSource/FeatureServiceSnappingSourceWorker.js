/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/promiseUtils","../../../../../geometry/SpatialReference","../../../../../core/Evented","../../../../../core/Handles","../../../../../core/watchUtils","../../../../../layers/support/TimeInfo","../../../../../tasks/support/Query","../../../../support/WatchUpdatingTracking","../../../../../layers/support/TileInfo","../../../../../layers/graphics/data/FeatureStore","../../../../../layers/graphics/data/QueryEngine","./FeatureServiceTiledFetcher","./FeatureServiceTileStore"],(function(e,t,r,i,n,s,a,o,u,c,p,d,l,h,f,g,S,y,w,m,F,v,I,b,A){"use strict";function k(){return new e.FeatureServiceSnappingSourceWorker}e.FeatureServiceSnappingSourceWorker=function(e){function r(){var t;return(t=e.apply(this,arguments)||this).isInitializing=!0,t.whenSetup=l.createDeferred(),t.handles=new g,t.updatingHandles=new m.WatchUpdatingTracking,t.pendingApplyEdits=new Map,t}t._inheritsLoose(r,e);var i=r.prototype;return i.destroy=function(){this.featureFetcher.destroy(),this.queryEngine.destroy(),this.featureStore.clear(),this.handles.destroy()},i.setup=async function(e){const{geometryType:t,objectIdField:r,timeInfo:i,fields:n}=e.serviceInfo;return this.featureStore=new v({...e.serviceInfo,hasZ:!1,hasM:!1}),this.queryEngine=new I.default({spatialReference:e.spatialReference,featureStore:this.featureStore,geometryType:t,fields:n,hasZ:!1,hasM:!1,objectIdField:r,timeInfo:i?y.fromJSON(i):null}),this.featureFetcher=new b.FeatureServiceTiledFetcher({store:new A.FeatureServiceTileStore({featureStore:this.featureStore}),url:e.serviceInfo.url,objectIdField:e.serviceInfo.objectIdField,capabilities:e.serviceInfo.capabilities,spatialReference:h.fromJSON(e.spatialReference),sourceSpatialReference:h.fromJSON(e.serviceInfo.spatialReference)}),this.handles.add([this.featureFetcher.watch("availability",(e=>this.emit("notify-availability",{availability:e})),!0),this.watch("updating",(()=>this.notifyUpdating()))]),this.whenSetup.resolve(),this.isInitializing=!1,this.configure(e.configuration)},i.configure=async function(e){return await this.updatingHandles.addPromise(this.whenSetup.promise),this.updateFeatureFetcherConfiguration(e),{result:{}}},i.fetchCandidates=async function(e,t){await this.whenSetup.promise,l.throwIfAborted(t);return{result:await this.queryEngine.executeQueryForSnapping({point:e.point,distance:e.distance,types:e.types,query:n.isSome(e.filter)?e.filter:{where:"1=1"}},n.isSome(t)?t.signal:null)}},i.updateTiles=async function(e,t){return await this.updatingHandles.addPromise(this.whenSetup.promise),l.throwIfAborted(t),this.featureFetcher.tileSize=e.tileSize,this.featureFetcher.tilesOfInterest=e.tiles,this.featureFetcher.tileInfo=n.isSome(e.tileInfo)?F.fromJSON(e.tileInfo):null,{result:{}}},i.refresh=async function(e,t){return await this.updatingHandles.addPromise(this.whenSetup.promise),l.throwIfAborted(t),this.featureFetcher.refresh(),{result:{}}},i.whenNotUpdating=async function(e,t){return await this.updatingHandles.addPromise(this.whenSetup.promise),l.throwIfAborted(t),await l.whenOrAbort(S.whenNotOnce(this,"updating"),t),{result:{}}},i.getDebugInfo=async function(e,t){return l.throwIfAborted(t),{result:this.featureFetcher.debugInfo}},i.beginApplyEdits=async function(e,t){this.updatingHandles.addPromise(this.whenSetup.promise),l.throwIfAborted(t);const r=l.createDeferred();return this.pendingApplyEdits.set(e.id,r),this.featureFetcher.applyEdits(r.promise),this.updatingHandles.addPromise(r.promise),{result:{}}},i.endApplyEdits=async function(e,t){const r=this.pendingApplyEdits.get(e.id);return r&&r.resolve(e.edits),l.throwIfAborted(t),{result:{}}},i.updateFeatureFetcherConfiguration=function(e){this.featureFetcher.filter=n.isSome(e.filter)?w.fromJSON(e.filter):null,this.featureFetcher.customParameters=e.customParameters},i.notifyUpdating=function(){this.emit("notify-updating",{updating:this.updating})},t._createClass(r,[{key:"updating",get:function(){return this.featureFetcher.updating||this.isInitializing||this.updatingHandles.updating}}]),r}(f.EventedAccessor),r.__decorate([o.property({readOnly:!0})],e.FeatureServiceSnappingSourceWorker.prototype,"updating",null),r.__decorate([o.property()],e.FeatureServiceSnappingSourceWorker.prototype,"isInitializing",void 0),e.FeatureServiceSnappingSourceWorker=r.__decorate([u.subclass("esri.views.interactive.snapping.featureSources.featureServiceSource.FeatureServiceSnappingSourceWorker")],e.FeatureServiceSnappingSourceWorker),e.default=k,Object.defineProperty(e,"__esModule",{value:!0})}));
