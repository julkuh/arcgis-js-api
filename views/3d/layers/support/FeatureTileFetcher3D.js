/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/maybe","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../core/promiseUtils","../../../../core/scheduling","../../../../core/Accessor","../../../../core/Handles","../../../../core/watchUtils","../../../../geometry/support/aaBoundingRect","../../../support/Scheduler","../../../../tasks/support/QuantizationParameters","../../../../tasks/support/Query","../../../../core/MapUtils","../../../../layers/graphics/dehydratedFeatures","../../terrain/tileUtils","./featureReference","./FeatureTile"],(function(e,t,s,i,r,n,a,o,u,c,l,h,d,p,f,m,F,y,g,T,x,_,R,C,E,b){"use strict";const v=n.getLogger("esri.views.3d.layers.support.FeatureTileFetcher3D");function D(e){return"dummy-tile-full-extent"===e.id}function M(e){let t=0;for(const s of e)s.features&&s.features.length>0&&s.alive&&(t=Math.max(t,s.descriptor.lij[0]));return t}function w(e){const t=e.capabilities.query;return{supportsMultipleResolutions:O(e),supportsPagination:!(!t||!t.supportsPagination),supportsResultType:!(!t||!t.supportsResultType),supportsCacheHint:!(!t||!t.supportsCacheHint),supportsQuantization:!(!t||!t.supportsQuantization),supportsQuantizationEditMode:!(!t||!t.supportsQuantizationEditMode),supportsMaxRecordCountFactor:!(!t||!t.supportsMaxRecordCountFactor),supportsFormatPBF:!(!t||!t.supportsFormatPBF)}}function O(e){switch(e.geometryType){case"polyline":return!0;case"polygon":return e.capabilities&&e.capabilities.query&&e.capabilities.query.supportsQuantization;default:return!1}}function S(e){return e.setFeatures([],0,null),e.featuresMissing=!1,4}function P(e){return r.isNone(e)?new Set:new Set(e.map((e=>e.name)))}function N(e,t){if(r.isNone(e)||r.isNone(t))return P(t);const s=new Set;for(const{name:i}of t)e.has(i)&&s.add(i);return s}e.FeatureTileFetcher3D=function(e){function s(t){var s;return(s=e.call(this,t)||this)._useTileCount=!1,s.updating=!1,s.updatingTotal=0,s.updatingRemaining=0,s.expectedFeatureDiff=0,s.maximumNumberOfFeaturesExceeded=!1,s.maximumNumberOfFeaturesExceededThrottle=1e3,s._fullRatio=1,s._farRatio=1,s.changes={updates:{adds:new Array,removes:new Array},adds:new Array,removes:new Array},s.handles=new m,s._frameTask=g.ImmediateTask,s._dirty=!1,s.featureTiles=new Map,s.displayingFeatureReferences=new Map,s.numDisplayingFeatureReferences=0,s.suspended=!0,s.pendingEdits=null,s}t._inheritsLoose(s,e);var i=s.prototype;return i.initialize=function(){this.handles.add(F.on(this,"tileDescriptors","change",(()=>this.setDirty()),(()=>this.setDirty()))),this.objectIdField=this.context.objectIdField,this.FeatureReferenceClass=this.context.capabilities.supportsMultipleResolutions?E.MultiFeatureReference:E.SingleFeatureReference;const e=this.context.scheduler;r.isSome(e)&&(this._frameTask=e.registerTask(g.Task.FEATURE_TILE_FETCHER,(e=>this._process(e)),(()=>this.updating))),this.setDirty()},i.destroy=function(){this._frameTask.remove(),this.handles=r.destroyMaybe(this.handles),this.featureTiles.forEach((e=>{this.cancelFetchTile(e),this.removeTile(e)})),this.featureTiles.clear(),this.displayingFeatureReferences.clear(),this.pendingEdits&&(this.pendingEdits.controller.abort(),this.pendingEdits=null)},i.restart=function(){this.featureTiles.forEach((e=>{this.cancelFetchTile(e),this.clearTile(e),this.resetFetchTile(e)})),r.isSome(this.context.memoryCache)&&this.context.memoryCache.clear(),this.setDirty()},i.refetch=function(){this.featureTiles.forEach((e=>{this.cancelFetchTile(e),this.resetFetchTile(e)})),r.isSome(this.context.memoryCache)&&this.context.memoryCache.clear(),this.setDirty()},i.suspend=function(){this.suspended||(this.suspended=!0,this.pause(),this.setDirty())},i.resume=function(){this.suspended&&(this.suspended=!1,this.unpause())},i.pause=function(){this.paused&&(this.featureTiles.forEach((e=>this.cancelFetchTile(e))),this.updated())},i.unpause=function(){this.paused||(this.setDirty(),this.updated())},i.applyEdits=function(e){this.pendingEdits||(this.pendingEdits={edits:Promise.resolve(),count:0,controller:d.createAbortController()},this.pause());const t=this.pendingEdits;t.count++;const s=t.edits.then((()=>e.result.catch((e=>{if(d.isAbortError(e))throw e;return null})).then((e=>e?(this.applyEditsDeleteFeatures(e.deletedFeatures),this.applyEditsAddUpdateFeatures(e.addedFeatures,e.updatedFeatures,t.controller.signal).then((()=>e))):e)).then((e=>(0==--t.count&&(this.pendingEdits===t&&(this.pendingEdits=null),r.isSome(this.context.memoryCache)&&this.context.memoryCache.clear(),this.unpause(),this.updated()),e)))));return t.edits=s,this.updated(),s},i.applyEditsDeleteFeatures=function(e){if(0===e.length)return;const t=new Set;e.forEach((e=>t.add(e.objectId))),this.featureTiles.forEach((e=>{if(!e.features)return;const s=e.features.filter((e=>!t.has(R.getObjectId(e,this.objectIdField))));s.length!==e.features.length&&(e.setFeatures(s,0,e.availableFields),this.invalidateCounts())}))},i.applyEditsAddUpdateFeatures=async function(e,t,s){const i=[],r=new Set;if(e.forEach((e=>i.push(e.objectId))),t.forEach((e=>{i.push(e.objectId),r.add(e.objectId)})),0===i.length)return;const n=[];this.featureTiles.forEach((e=>{const t=this.applyEditsAddUpdateTile(e,i,r,s);t&&n.push(t)})),await d.eachAlways(n)},i.applyEditsAddUpdateTile=async function(e,t,s,i){if(!e.features)return;const r=this.createQuery(e);r.resultType=void 0,r.cacheHint=!1,r.objectIds=t;const n=await this.queryFeatures(r,i);let a=null;if(s.size>0){const t=e.features.filter((e=>!s.has(R.getObjectId(e,this.objectIdField))));t.length!==e.features.length&&(a=t)}if(n.features.length>0){a||(a=e.features.slice());for(const e of n.features)a.push(e)}a&&(e.hasPreciseFeatureCount&&(e.numFeatures=Math.max(e.numFeatures,a.length)),e.setFeatures(a,0,N(e.availableFields,n.fields)),this.invalidateCounts())},i.queryFeatures=function(e,t){return this.context.query.queryFeaturesDehydrated(e,{signal:t,timeout:U})},i.setDirty=function(){this._dirty=!0,this.updated()},i._process=function(e){if(this._frameTask.processQueue(e),!this._dirty||!this.constructed)return;this._dirty=!1;const t=this.getListOfTiles();if(this.markTilesNotAlive(t),!e.run((()=>this.addTiles(t,e)))||!e.run((()=>this.filterExtentTiles(t,e)))||!e.run((()=>this.removeTiles(t,e)))||e.done)return void this.setDirty();const s=this.sortTiles(t);e.run((()=>this.displayTiles(s,e)))&&e.run((()=>this.fetchTiles(s,e)))&&e.run((()=>this.updateMemoryEstimates(s,e)))||this.setDirty(),this.updated(),this.updating||this.updateMaximumNumberOfFeaturesExceeded()},i.markTilesNotAlive=function(e){for(const t of e)t.alive=!1},i.addTiles=function(e,t){return!this.suspended&&(this.tileDescriptors.forEach((s=>{const i=this.featureTiles.get(s.id);i?i.alive=!0:t.done||(e.push(this.addTile(s)),t.madeProgress())})),t.hasProgressed)},i.filterExtentTiles=function(e,t){for(const s of e){if(t.done)break;s.alive&&(s.filtered=!s.intersects(this.filterExtent),s.filtered&&(this.clearTile(s),t.madeProgress()))}return t.hasProgressed},i.removeTiles=function(e,t){for(let s=e.length-1;s>=0&&!t.done;s--){const i=e[s];i.alive||(this.removeTile(i),s!==e.length-1&&(e[s]=e[e.length-1]),e.pop(),t.madeProgress())}return t.hasProgressed},i.sortTiles=function(e){return e.sort(((e,t)=>e.descriptor.loadPriority-t.descriptor.loadPriority)),e},i.displayTiles=function(e,t){const s=this.updateRatio(e),i=e=>{const t=this._fullRatio<1?s(e)*this._farRatio:1;return e.reduceFeatures(t,this.memoryFactor,this.objectIdField)&&this.setDirty(),this.showTile(e)};for(const r of e)if(!t.run((()=>i(r)))){this.setDirty();break}return t.hasProgressed},i.fetchTiles=function(e,t){if(this.paused)return!1;let s=!1;for(const i of e){if(!i.needsFetching)continue;const e=r.isSome(this.context.memoryCache)?this.context.memoryCache.pop(i.id):null;if(r.isSome(e))i.cache=e,this.setDirty(),this.scheduleUpdated(),t.madeProgress();else{if(this.needsNumFeatures(i)){const e=d.createAbortController(),r=this.fetchTileCount(i,e.signal);this._handleRequest(i,r,e,(()=>i.numFeatures=b.FAILED_FEATURE_COUNT)),s=!0,t.madeProgress()}if(t.done)return!0}}if(s)return t.hasProgressed;for(const i of e)if(i.needsFetching){const e=d.createAbortController(),s=this.fetchTile(i,e.signal);if(this._handleRequest(i,s,e,(e=>{i.setFeatures([],0,null),this.invalidateCounts(),i.featuresMissing=!1,this.context.logFetchError(v,e)})),t.madeProgress(),t.done)return!0}return t.hasProgressed},i.updateMemoryEstimates=function(e,t){return e.some((e=>!t.run((()=>e.updateMemoryEstimates()))&&(this.setDirty(),!0))),t.hasProgressed},i.reclip=function(e,t){if(!this.constructed)return;const s=new Array;this.featureTiles.forEach((i=>{r.isNone(i.displayingFeatures)||0===i.displayingFeatures.length||(i.intersectionIncludingBorrowed(t,k),i.intersectionIncludingBorrowed(e,I),y.equals(k,I)||s.push(i))})),this.refreshDisplayingFeatures(s),this.updated()},i.refreshDisplayingFeatures=function(e){const t=new Set,s=this.changes.updates;for(const i of e)if(!r.isNone(i.displayingFeatures))for(const e of i.displayingFeatures){const i=R.getObjectId(e,this.objectIdField);if(t.has(i))continue;t.add(i);const{feature:r}=this.displayingFeatureReferences.get(i);s.removes.push(r),s.adds.push(r)}this.applyChanges()},i.updated=function(){let e=0;this.paused||this.featureTiles.forEach((t=>t.isFetching?++e:0));const t=this._dirty||e>0||!!this.pendingEdits;if(this._set("updating",t),t){let t=0,s=0,i=0,n=0,a=0,o=0;const u=this.displayingFeatureReferences.size/this.numDisplayingFeatureReferences;this.featureTiles.forEach((e=>{if(++i,e.isFetching&&e.hasPreciseFeatureCount){const t=this.maximumFeaturesForTile(e)*(1-e.emptyFeatureRatio),s=r.isSome(e.displayingFeatures)?e.displayingFeatures.length*u:0;o+=t-s}e.needsFetching?++a:e.numFeatures>0&&(++n,s+=e.numFeatures)})),a+=e;let c=0;s?(t=s,c=Math.min(a*s/n,s)):(t=i,c=a),o=Math.min(this.maximumNumberOfFeatures-this.features.length,o),this._set("updatingTotal",t),this._set("updatingRemaining",c),this._set("expectedFeatureDiff",o)}else this._set("updatingTotal",0),this._set("updatingRemaining",0),this._set("expectedFeatureDiff",0);this.debugger&&this.debugger.update()},i.updateMaximumNumberOfFeaturesExceeded=function(){const e=_.someMap(this.featureTiles,(e=>e.perTileMaximumNumberOfFeaturesExceeded));this._set("maximumNumberOfFeaturesExceeded",e)},i.updateRatio=function(e){const t=M(e),s=e=>1/(1<<Math.max(0,t-e.descriptor.lij[0]));let i=0,r=0;for(const n of e){const e=n.numFeatures;i+=e,r+=e*s(n)}return this._fullRatio=Math.min(1,this.maximumNumberOfFeatures/i),this._farRatio=this.maximumNumberOfFeatures/r,this.scheduleUpdated(),s},i.maximumFeaturesUpdated=function(e,t){e!==t&&(t>e&&this.featureTiles.forEach((e=>{if(!e.featuresMissing)return;const t=this.maximumFeaturesForTile(e);e.features&&(e.features.length>=t||5===e.fetchStatus)||(this.cancelFetchTile(e),this.resetFetchTile(e))})),this.setDirty())},i.addTile=function(e){const t=new b.FeatureTile(e);return this.featureTiles.set(t.id,t),this.resetFetchTile(t),this.referenceDisplayingFeaturesFromRelatedTiles(t),t},i.referenceDisplayingFeaturesFromRelatedTiles=function(e){const t=e.descriptor.resolution;this.featureTiles.forEach((s=>{if(!(r.isNone(s.displayingFeatures)||e===s||e.descriptor.lij&&s.descriptor.lij&&!C.tilesAreRelated(e.descriptor.lij,s.descriptor.lij))){r.isNone(e.displayingFeatures)&&(e.displayingFeatures=[]),e.descriptor.extent&&s.descriptor.extent&&(r.isNone(e.extentIncludingBorrowedFeatures)&&(e.extentIncludingBorrowedFeatures=y.clone(e.descriptor.extent)),y.expand(e.extentIncludingBorrowedFeatures,s.descriptor.extent,e.extentIncludingBorrowedFeatures));for(const i of s.displayingFeatures){e.displayingFeatures.push(i);const s=this.displayingFeatureReferences.get(R.getObjectId(i,this.objectIdField));s.ref(s.feature,t),this.numDisplayingFeatureReferences++}}})),e.featureLimit=r.isSome(e.displayingFeatures)?e.displayingFeatures.length:0},i.removeTile=function(e){this.clearTile(e),this.featureTiles.delete(e.id)},i.resetFetchTile=function(e){e.filtered=!e.intersects(this.filterExtent),e.filtered?e.needsFetching&&(e.fetchStatus=4):e.fetchStatus=0},i.cancelFetchTile=function(e){const t=e.requestController;r.isSome(t)&&(e.requestController=null,e.resetFetching(),t.abort())},i.fetchTileCount=async function(e,t){return e.numFeatures=await this.fetchCount(e,t),this.updateRatio(this.getListOfTiles()),3===e.fetchStatus?1:0},i.fetchTile=async function(e,t){const s=this.maximumFeaturesForTile(e);if(s<=0)return S(e);const i=this.getMaxRecordCount(e),r=Math.ceil(s/i);if(D(e)||!this.context.capabilities.supportsMaxRecordCountFactor||e.numFeatures<=s&&r>x.MAX_MAX_RECORD_COUNT_FACTOR)return this.fetchPagedTile(e,t);const n=this.createQuery(e);if(n.maxRecordCountFactor=Math.ceil(s/i),e.isRefetching&&e.features&&e.features.length>0){const t=Math.ceil(e.features.length/(1-e.emptyFeatureRatio)/i);n.maxRecordCountFactor=Math.max(t+1,n.maxRecordCountFactor)}const{features:a,exceededTransferLimit:o,fields:u}=await this.queryFeatures(n,t),c=o?n.maxRecordCountFactor>=x.MAX_MAX_RECORD_COUNT_FACTOR?5:4:5;return await this._frameTask.schedule((()=>{e.featuresMissing=a.length<e.numFeatures||o;const t=this._removeEmptyFeatures(a);e.setFeatures(a,t,P(u))}),t),this.invalidateCounts(),c},i.fetchCount=async function(e,t){return this.context.query.queryFeatureCount(this.createFeatureCountQuery(e),{signal:t})},i.fetchPagedTile=async function(e,t){let s,i=0,n=0,a=0,o=this.maximumFeaturesForTile(e)-a;const u=this.getMaxRecordCount(e);let c=null;for(;;){const l=this.createQuery(e),h=this.setPagingParameters(l,i,o,u),{features:d,exceededTransferLimit:p,fields:f}=await this.queryFeatures(l,t);if(await this._frameTask.schedule((()=>{h&&(i+=r.unwrap(l.num)),a+=d.length,n+=this._removeEmptyFeatures(d),e.featuresMissing=i<e.numFeatures||p,s=s?s.concat(d):d,c=N(c,f),e.setFeatures(s,n,c)}),t),this.invalidateCounts(),this.setDirty(),o=this.maximumFeaturesForTile(e)-a,!h||!p||o<=0)return p?4:5}},i.createFeatureCountQuery=function(e){const t=this.createQuery(e);return this.context.capabilities.supportsCacheHint&&(t.resultType=void 0,t.cacheHint=!0),t},i.createQuery=function(e){const t=this.context.createQuery(),s=e.descriptor.extent;if(s){const e=this.context.tilingScheme.spatialReference;t.geometry=y.toExtent(s,e)}return this.setResolutionParams(t,e),this.useTileQuery(e)?t.resultType="tile":this.context.capabilities.supportsCacheHint&&(t.cacheHint=!0),t},i.setPagingParameters=function(e,t,s,i){return!!this.context.capabilities.supportsPagination&&(e.start=t,s>0&&this.context.capabilities.supportsMaxRecordCountFactor?(e.maxRecordCountFactor=Math.ceil(s/i),e.num=Math.min(e.maxRecordCountFactor*i,s)):e.num=Math.min(i),!0)},i.getEffectiveTileResolution=function(e){if(null==e.descriptor.resolution)return null;const t=1===this.context.viewingMode?this.context.tilingScheme.resolutionAtLevel(3):1/0;return Math.min(e.descriptor.resolution,t)/this.lodFactor},i.setResolutionParams=function(e,t){if(!this.supportsResolution)return;const s=this.getEffectiveTileResolution(t);null!=s&&(this.context.capabilities.supportsQuantization?e.quantizationParameters=new T({mode:"view",originPosition:"upper-left",tolerance:s,extent:this.context.fullExtent}):"polyline"===this.context.geometryType&&(e.maxAllowableOffset=s))},i._removeEmptyFeatures=function(e){const t=e.length;for(let s=0;s<e.length;){const t=e[s];R.hasVertices(t.geometry)?++s:(e[s]=e[e.length-1],--e.length)}return t-e.length},i.needsNumFeatures=function(e){return this.useTileCount&&e.needsFeatureCount&&!D(e)},i.getMaxRecordCount=function(e){const{tileMaxRecordCount:t,maxRecordCount:s}=this.context;return this.useTileQuery(e)&&r.isSome(t)&&t>0&&this.context.capabilities.supportsResultType?t:r.isSome(s)&&s>0?s:A},i.useTileQuery=function(e){return(!D(e)||!this.context.capabilities.supportsCacheHint)&&this.context.capabilities.supportsResultType},i._handleRequest=function(e,t,s,i){e.fetchStatus=e.needsRefetching?3:2,e.requestController=s;let r=!1;t.then((t=>{e.requestController=null,e.fetchStatus=t})).catch((t=>{e.requestController===s&&(e.requestController=null,e.fetchStatus=4),d.isAbortError(t)?r=!0:i(t)})).then((()=>{r||this.setDirty(),this.scheduleUpdated()}))},i.scheduleUpdated=function(){this.handles&&!this.handles.has("scheduleUpdated")&&this.handles.add(p.schedule((()=>{this.handles.remove("scheduleUpdated"),this.updated()})),"scheduleUpdated")},i.showTile=function(e){if(r.isSome(e.displayingFeatures)&&!e.needsDisplayUpdate)return!1;const t=e.features;if(0===e.featureLimit||!t){const t=r.isSome(e.displayingFeatures)&&e.displayingFeatures.length>0;return this.hideTileFeatures(e),e.displayingFeatures=[],t}const s=e.descriptor.resolution,i=this.changes.updates,n=this.changes.adds,a=Math.min(e.featureLimit,t.length);e.featureLimit=a;for(let r=0;r<a;++r){const e=t[r],a=R.getObjectId(e,this.objectIdField),o=this.displayingFeatureReferences.get(a);if(o){const t=o.ref(e,s);t.oldVersion!==t.newVersion&&(i.removes.push(t.oldVersion),i.adds.push(t.newVersion))}else this.displayingFeatureReferences.set(a,new this.FeatureReferenceClass(e,s)),n.push(e);this.numDisplayingFeatureReferences++}return this.hideTileFeatures(e),this.applyChanges(),e.displayingFeatures=t.slice(0,a),!0},i.hideTile=function(e){this.cancelFetchTile(e),this.hideTileFeatures(e)},i.hideTileFeatures=function(e){if(r.isNone(e.displayingFeatures))return;const t=this.changes.updates,s=this.changes.removes;for(const i of e.displayingFeatures){const r=R.getObjectId(i,this.objectIdField),n=this.displayingFeatureReferences.get(r);if(!n)continue;const a=n.unref(e.descriptor.resolution);this.numDisplayingFeatureReferences--,a?a.oldVersion!==a.newVersion&&(null==a.newVersion?(this.displayingFeatureReferences.delete(r),s.push(a.oldVersion)):(t.adds.push(a.newVersion),t.removes.push(a.oldVersion))):console.error("Hiding unreferenced feature")}this.applyChanges(),e.displayingFeatures=null},i.applyChanges=function(){const e=this.changes.updates;e.removes.length>0&&(this.features.removeMany(e.removes),e.removes.length=0),e.adds.length>0&&(this.features.addMany(e.adds),e.adds.length=0);const t=this.changes.adds,s=this.changes.removes,i=Math.min(t.length,s.length);let r=0;for(;r<i;){const e=Math.min(r+j,i);this.features.addMany(t.slice(r,e)),this.features.removeMany(s.slice(r,e)),r=e}t.length>i&&this.features.addMany(0===r?t:t.slice(r)),s.length>i&&this.features.removeMany(0===r?s:s.slice(r)),t.length=0,s.length=0},i.clearTile=function(e){if(this.hideTile(e),e.features&&r.isSome(this.context.memoryCache)){const t=16+e.estimatedSize;this.context.memoryCache.put(e.id,e.cache,t)}e.setFeatures(null,0,null),this.invalidateCounts()},i.invalidateCounts=function(){this.notifyChange("totalVertices"),this.notifyChange("totalFeatures"),this.notifyChange("memoryForUnusedFeatures")},i.getListOfTiles=function(){return Array.from(this.featureTiles.values())},i.maximumFeaturesForTile=function(e){const t=e.hasPreciseFeatureCount?e.numFeatures:1/0,s=e.hasPreciseFeatureCount?t:this.maximumNumberOfFeatures,i=this._fullRatio<1?this._farRatio:1;return Math.min(Math.ceil(s*i/(1-e.emptyFeatureRatio)),t)},t._createClass(s,[{key:"maximumNumberOfFeatures",set:function(e){e=e||1/0;const t=this._get("maximumNumberOfFeatures");e===t||e<1||(this._set("maximumNumberOfFeatures",e),this.maximumFeaturesUpdated(t,e))}},{key:"memoryFactor",set:function(e){this.memoryFactor!==e&&(this._set("memoryFactor",e),this.setDirty())}},{key:"lodFactor",set:function(e){this.lodFactor!==e&&(this._set("lodFactor",e),this.supportsResolution&&this.refetch())}},{key:"useTileCount",get:function(){return this._useTileCount&&r.isSome(this.context.query.queryFeatureCount)},set:function(e){this._useTileCount=e,this.notifyChange("useTileCount")}},{key:"memoryForUnusedFeatures",get:function(){let e=0;return this.featureTiles.forEach((t=>e+=t.estimatedUnusedSize)),e}},{key:"totalVertices",get:function(){let e=0;return this.featureTiles.forEach((t=>e+=t.numVertices)),e}},{key:"totalFeatures",get:function(){let e=0;return this.featureTiles.forEach((t=>e+=t.numFeatures)),e}},{key:"filterExtent",set:function(e){if(e&&this.context.tilingScheme&&!e.spatialReference.equals(this.context.tilingScheme.spatialReference))return void v.error("#filterExtent=","extent needs to be in the same spatial reference as the tiling scheme");const t=this._get("filterExtent");if(t===e||t&&e&&t.equals(e))return;const s=e?e.clone():null;this._set("filterExtent",s),this.reclip(s,t)}},{key:"paused",get:function(){return this.suspended||!!this.pendingEdits}},{key:"availableFields",get:function(){let e=null;return this.featureTiles.forEach((t=>{r.isNone(t.displayingFeatures)||0===t.displayingFeatures.length||(r.isNone(e)?e=new Set(t.availableFields):e.forEach((s=>{t.availableFields.has(s)||r.unwrap(e).delete(s)})))})),r.isSome(e)?e:new Set}},{key:"supportsResolution",get:function(){return this.context.capabilities.supportsMultipleResolutions&&"point"!==this.context.geometryType}},{key:"storedFeatures",get:function(){return this.getListOfTiles().reduce(((e,t)=>e+(t.features?t.features.length:0)),0)}},{key:"test",get:function(){return{process:e=>this._process(e),getFeatureTileById:e=>this.featureTiles.get(e),forEachFeatureTile:e=>this.featureTiles.forEach(e)}}}]),s}(f),s.__decorate([o.property({constructOnly:!0})],e.FeatureTileFetcher3D.prototype,"features",void 0),s.__decorate([o.property()],e.FeatureTileFetcher3D.prototype,"tileDescriptors",void 0),s.__decorate([o.property({value:1/0})],e.FeatureTileFetcher3D.prototype,"maximumNumberOfFeatures",null),s.__decorate([o.property({value:1})],e.FeatureTileFetcher3D.prototype,"memoryFactor",null),s.__decorate([o.property({value:1})],e.FeatureTileFetcher3D.prototype,"lodFactor",null),s.__decorate([o.property()],e.FeatureTileFetcher3D.prototype,"useTileCount",null),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"updating",void 0),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"updatingTotal",void 0),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"updatingRemaining",void 0),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"expectedFeatureDiff",void 0),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"memoryForUnusedFeatures",null),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"maximumNumberOfFeaturesExceeded",void 0),s.__decorate([o.property({constructOnly:!0})],e.FeatureTileFetcher3D.prototype,"maximumNumberOfFeaturesExceededThrottle",void 0),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"totalVertices",null),s.__decorate([o.property({readOnly:!0})],e.FeatureTileFetcher3D.prototype,"totalFeatures",null),s.__decorate([o.property()],e.FeatureTileFetcher3D.prototype,"filterExtent",null),s.__decorate([o.property({constructOnly:!0})],e.FeatureTileFetcher3D.prototype,"context",void 0),e.FeatureTileFetcher3D=s.__decorate([u.subclass("esri.views.3d.layers.support.FeatureTileFetcher3D")],e.FeatureTileFetcher3D);const A=2e3,k=y.create(),I=y.create(),U=6e5,j=200;var q=e.FeatureTileFetcher3D;e.contextCapabilitiesFromLayer=w,e.default=q,Object.defineProperty(e,"__esModule",{value:!0})}));
