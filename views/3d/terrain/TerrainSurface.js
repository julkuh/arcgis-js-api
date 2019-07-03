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

define(["require","exports","../../../core/tsSupport/assignHelper","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../Color","../../../core/Accessor","../../../core/arrayUtils","../../../core/asyncUtils","../../../core/CollectionFlattener","../../../core/Evented","../../../core/Handles","../../../core/Logger","../../../core/mathUtils","../../../core/ObjectPool","../../../core/PooledArray","../../../core/promiseUtils","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../../../core/libs/gl-matrix-2/vec4f64","../../../geometry/support/aaBoundingRect","../../../layers/support/LercWorker","../../2d/engine/vectorTiles/VectorTileDisplayObject3D","../support/geometryUtils","../support/index","../support/projectionUtils","./ElevationData","./ElevationTileAgent","./MapTileAgent","./OverlayManager","./PlanarPatch","./SphericalPatch","./SurfaceExtentHelper","./SurfaceTilingSchemeLogic","./TerrainConst","./TerrainRenderer","./terrainUtils","./TilemapOnlyTile","./tileUtils","./tileUtils","./UpsampleInfo","../../webgl/Texture","../../webgl/Util"],function(e,t,i,r,a,n,s,o,l,p,d,h,u,c,_,y,g,f,v,m,T,L,P,w,E,S,b,x,U,I,O,R,V,C,M,A,D,j,k,q,B,N,H,F,W,G,X,z){function Y(e,t){return e[0]===t[0]&&e[1]===t[1]&&e[2]===t[2]}function Z(e,t){var i=!1;t=t||e;for(var r=0,a=e.children;r<a.length;r++){var n=a[r];if(n){for(var s in n.layerInfo)for(var o in n.layerInfo[s]){var l=n.layerInfo[s][o].upsampleFromTile;if(l&&l.tile===t)return!0}i=i||Z(n,t)}}return i}function K(e){return null!=e.refreshInterval}var J=u.getLogger("esri.views.3d.terrain.TerrainSurface"),Q=function(e){function t(t,i){var r=e.call(this)||this;r.defaultTileBackground=q.DEFAULT_TILE_BACKGROUND,r.hideSkirtsDistanceFromExtentMargin=$,r.hideSkirtsMinimumCameraTilt=ee,r.hideSkirtsMaximumCameraTilt=te,r._clippingExtent=null,r._dataExtent=null,r._elevationBounds=[0,0],r._rootExtent=S.create(),r._iteratorPool=new _(W.IteratorPreorder),r._postorderIterator=new W.IteratorPostorder,r.visible=!1,r.suspended=!1,r._pendingUpdates=!1,r._asyncWorkItems=0,r._lvPendingUpdates=!1,r._updateNextFrame=0,r._memoryUsed=0,r._overlayOpacity=1,r._eyePosRenderSR=w.vec3f64.create(),r._eyePosSurfaceSR=w.vec3f64.create(),r._splitLimits=[0,0,0,0,0,0],r._frustum=U.frustum.create(),r._viewProjectionMatrix=L.mat4f64.create(),r._layerViews=[[],[]],r._layerIndexByLayerViewId=[{},{}],r._basemapLayerViewHandles={},r._handles=new h,r._lowPrioUpdates=new y,r._topLevelTilemapOnlyTiles=new Array(q.TILEMAP_SIZE_EXP+1),r._upsampleInfoPool=new _(G),r._getElevationData={spatialReference:null,rootTiles:null},r.loaded=!1,r.maxTextureScale=1.2,r.rootTiles=null,r.backgroundImage=q.DEFAULT_TILE_BACKGROUND,r.backgroundColor=null,r._lercWorker=b.acquireInstance(t.resourceController.scheduler);for(var a=0;a<r._topLevelTilemapOnlyTiles.length;a++)r._topLevelTilemapOnlyTiles[a]=new H([a-q.TILEMAP_SIZE_EXP,0,0],r._upsampleInfoPool);return r}return r(t,e),t.prototype.normalizeCtorArgs=function(e,t){return this._view=e,this._stage=e._stage,this._set("manifold",t),{}},t.prototype.initialize=function(){var e=this;this._tilePool=new _("planar"===this.manifold?A:D),this._memCache=this._view.resourceController.memoryController.getMemCache("esri.views.3d.terrain",function(t){return e._renderer.releaseTileGeometry(t.renderData)}),this._renderer=new B(this.manifold,this._memCache),this._renderer.loaded=this._setLoaded.bind(this),this._renderer.install(this._view._stage),v.init(this,"_background",function(){e._renderer.setTileBackground(e._background)}),this._handles.add(this._view.watch("pointsOfInterest",function(t){e._renderer.pointsOfInterest=t})),this._set("overlayManager",new M.OverlayManager({terrainSurface:this,view:this._view})),this._handles.add(this.watch("overlayManager.hasHighlights",this._handleHasHighlights.bind(this)),"overlayManager");var t={layers:this._view.map.allLayers,layerViews:this._view.allLayerViews,spatialReference:this._view.spatialReference};this.extentHelper="spherical"===this.manifold?new j.SurfaceExtentHelperGlobal(t):new j.SurfaceExtentHelperLocal(t),this._handles.add(v.init(this.extentHelper,"stencilEnabledExtents",function(t){e._renderer.setStencilEnabledLayerExtents(t)}),"extentHelper");var i=this._view.defaultsFromMap?new p({root:this._view.map,rootCollectionNames:this._view.defaultsFromMap.mapCollectionPaths,getChildrenFunction:function(e){return e.layers}}):this._view.map.allLayers,r=new k({layers:i,extentHelper:this.extentHelper,manifold:this.manifold,viewSpatialReference:this._view.spatialReference});this._set("tilingSchemeLogic",r),this._handles.add([this.tilingSchemeLogic.watch("tilingScheme",this._updateTilingSchemeAndExtent.bind(this),!0),this.tilingSchemeLogic.watch("extent",this._updateTilingSchemeAndExtent.bind(this),!0)],"tilingSchemeLogic"),this._updateTilingSchemeAndExtent(),this._streamDataRequester=this._view.resourceController.createStreamDataRequester(I.ClientType.TERRAIN);var a=this._view.resourceController.scheduler;this._handles.add(a.registerTask(1,function(t){return e._frame(t)},function(){return e.ready&&(e._pendingUpdates||e._lvPendingUpdates)})),this._viewChangeUpdate=this._viewChangeUpdate.bind(this),this._view.resourceController.memoryController.events.on("quality-changed",function(){return e._viewChangeUpdate()}),this._handles.add([this._view.on("resize",this._viewChangeUpdate),this._view.watch("state.camera",this._viewChangeUpdate,!0),this._view.watch("qualitySettings.tiledSurface.lodBias",this._viewChangeUpdate),this._view.watch("clippingArea",this._clippingChanged.bind(this))],"view"),this._handles.add(this._view.allLayerViews.on("change",this._handleLayerViewChanges.bind(this)),"allLayerViews"),this._handleLayerViewChanges({added:this._view.allLayerViews.toArray(),removed:[],moved:[],target:this._view.allLayerViews}),this._updateClippingExtent(),this.notifyChange("extent")},t.prototype.destroy=function(){this._handles.destroy(),b.releaseInstance(this._lercWorker),this._lercWorker=null,this._removeAllTiles(),this._memCache.destroy(),this._memCache=null,this.tilingSchemeLogic.destroy(),this._set("tilingSchemeLogic",null),this.extentHelper.destroy(),this.extentHelper=null;for(var e in this._basemapLayerViewHandles)this._unregisterTiledLayerView(e);this._streamDataRequester=null,this.overlayManager&&(this.overlayManager.destroy(),this._set("overlayManager",null)),this._tilePool.destroy(),this._tilePool=null,V.Pool.prune(0),C.Pool.prune(0),this._renderer.destroy(this._stage),this._renderer=null,this._iteratorPool.destroy(),this._iteratorPool=null,this._view=null,this._stage=null,this._upsampleInfoPool.destroy(),this._upsampleInfoPool=null},Object.defineProperty(t.prototype,"renderer",{get:function(){return this._renderer},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"frustum",{get:function(){return this._frustum},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"upsampleInfoPool",{get:function(){return this._upsampleInfoPool},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"cullBackFaces",{set:function(e){this._renderer.cullBackFaces=e,this._set("cullBackFaces",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"extent",{get:function(){return this._clippingExtent||this._rootExtent},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"baseOpacity",{set:function(e){this._renderer.opaque=e>=1,this._set("baseOpacity",e),this._updateTileTextures(!0)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"ready",{get:function(){return!!this.rootTiles},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"renderOrder",{set:function(e){this._renderer.renderOrder=e,this._set("renderOrder",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"skirtScale",{set:function(e){this._renderer.skirtScale=e,this._set("skirtScale",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"spatialReference",{get:function(){var e=this.tilingScheme&&this.tilingScheme.spatialReference||null;return this._getElevationData.spatialReference=e,e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_background",{get:function(){return null!=this.backgroundColor?this.backgroundColor:this.backgroundImage},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"slicePlaneEnabled",{set:function(e){this._renderer.slicePlaneEnabled=e,this._set("slicePlaneEnabled",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"velvetOverground",{set:function(e){e!==this.velvetOverground&&(this._renderer.velvetOvergroundEnabled=e),this._set("velvetOverground",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"wireframe",{set:function(e){this._renderer.setWireframe(e),this._set("wireframe",e)},enumerable:!0,configurable:!0}),t.prototype.setVisibility=function(e){e!==this.visible&&(this.visible=e,this._renderer.setVisibility(e),this.setUpdatesDisabled(!e),e&&this._viewChangeUpdate())},t.prototype.isVisible=function(){return this.visible&&this.ready},t.prototype.isOpaque=function(){return this._renderer.isOpaque()},t.prototype.setUpdatesDisabled=function(e){this.suspended=e,e||this._viewChangeUpdate()},t.prototype.intersect=function(e,t,i,r){this._renderer.intersect(e,t,i,r,null)},t.prototype.getElevation=function(e){var t=this._getElevationData.rootTiles;if(!t||!t.length)return null;var i=q.LayerClass.ELEVATION;if(0===t[0].layerInfo[i].length)return null;var r=ie;if(Array.isArray(e))r=e;else{var a=e;if("point"===a.type&&!O.pointToVector(a,r,this._getElevationData.spatialReference))return J.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null}for(var n=0;n<t.length;n++){var s=t[n];if(F.isPosWithinTile(s,r)){for(;s&&!s.renderData;){var o=0;r[0]>.5*(s.extent[0]+s.extent[2])&&(o+=1),r[1]<.5*(s.extent[1]+s.extent[3])&&(o+=2),s=s.children[o]}var l=s.renderData,p=l&&l.geometryState?l.geometryState.samplerData:null;return p?R.sample(r[0],r[1],p):null}}return null},t.prototype.getElevationBounds=function(){return this._elevationBounds},t.prototype.getScale=function(e){if(this.tilingScheme){if(!O.pointToVector(e,ie,this.spatialReference))return J.error("TerrainSurface.getElevation(): could not project given point to tiling scheme coordinate system"),null;var t=this.rootTiles;if(t)for(var i=0;i<t.length;i++){var r=t[i];if(F.isPosWithinTile(r,ie)){for(;null!=r.children[0];){var a=0;ie[0]>r.children[0].extent[2]&&(a+=1),ie[1]<r.children[0].extent[1]&&(a+=2),r=r.children[a]}return this._getLodBiasCorrectedScale(r.lij[0])}}}return 1e100},t.prototype.queryVisibleScaleRange=function(e,t,i,r){var a=t?this.tilingScheme.levelAtScale(t):0,n=i?this.tilingScheme.levelAtScale(i):1/0,s=this._getLodBias();this._renderer.queryVisibleLevelRange(e,a+s,n+s,r)},t.prototype._setLoaded=function(){this.loaded||this._set("loaded",!0)},t.prototype._updateTilingSchemeAndExtent=function(){var e=this.tilingSchemeLogic.extent,t=e&&!S.equals(e,this._dataExtent);t&&(this._dataExtent?S.set(this._dataExtent,e):this._dataExtent=S.create(e));var i=this.tilingSchemeLogic.tilingScheme,r=i!==this.tilingScheme;r&&(N.weakAssert(!!i,"tiling scheme cannot be reset to undefined"),this.tilingScheme&&this._removeAllTiles(),this._set("tilingScheme",i),this._updateClippingExtent(),i&&(this._updateTiledLayers(),this._renderer.setTileSize(i.pixelSize[0]),this.overlayManager.setSpatialReference(i.spatialReference,"spherical"===this.manifold))),(t||r)&&this._updateRootTiles()},t.prototype._acquireTile=function(e,t,i,r){var a=this._tilePool.acquire();return ae[0]=e,ae[1]=t,ae[2]=i,a.init(ae,r,this),a},t.prototype._updateRootTiles=function(){var e=this,t=this._clippingExtent||this._dataExtent,i=this.tilingScheme;if(t&&i){this._memCache.clear();var r=re,a=i.rootTilesInExtent(t,r,1/0),n=function(t){var i=e._acquireTile(0,t[1],t[2],null);return i.shouldSplit(e._splitLimits,e._eyePosRenderSR)===q.TileUpdate.SPLIT&&i.setPendingUpdate(q.TileUpdate.SPLIT),e._loadTile(i),i};if(this.rootTiles){if(a.length>q.MAX_ROOT_TILES)return void J.warn(q.TOO_MANY_ROOT_TILES_AFTER_CHANGE_ERROR);var s=this.rootTiles.map(function(e){return e.lij}),l=o.difference(s,a,Y);if(l.removed.length>0||l.added.length>0){var p=this.rootTiles.filter(function(t){return!(o.findIndex(l.removed,Y.bind(null,t.lij))>-1&&(e._purgeTile(t),1))});l.added.forEach(function(e){return p.push(n(e))}),this._setRootTiles(p)}}else a.length>q.MAX_ROOT_TILES&&(J.warn(q.TOO_MANY_ROOT_TILES_FOR_LAYER_ERROR),a=i.rootTilesInExtent(t,r,q.MAX_ROOT_TILES)),this._setRootTiles(a.map(function(e){return n(e)}));S.equals(r,this._rootExtent)||(this._rootExtent=S.create(r),this._hasFixedExtent()||this.notifyChange("extent")),this.setVisibility(!0),this._viewChangeUpdate(),this.overlayManager.setOverlayPlacementDirty(),this.notifyChange("ready")}},t.prototype._setRootTiles=function(e){this._set("rootTiles",e),this._getElevationData.rootTiles=e,this._renderer.setRootTiles(this.rootTiles)},t.prototype._viewChangeUpdate=function(){this._stage&&!this.suspended&&this.tilingScheme&&this.visible&&(this._updateViewDependentParameters(),this._updateSkirts(),this._updateOverlayOpacity(this._eyePosSurfaceSR[2]),this._updateTiles())},t.prototype._updateClippingStatus=function(e){e.updateClippingStatus(this._clippingExtent)&&e.resetPendingUpdate(q.TileUpdate.GEOMETRY)&&this._updateTileGeometry(e)},t.prototype._updateTiles=function(e){if(void 0===e&&(e=this.rootTiles),e){var t=this._iteratorPool.acquire();t.reset(e);var i,r,a=this._splitLimits;for(F.hasVisibleSiblings(e)?(i=this._elevationBounds[0],r=this._elevationBounds[1]):(i=1/0,r=-1/0);!t.done;){var n=t.next();if(this._updateClippingStatus(n),n.updateVisibility(),n.visible){n.updateScreenDepth(this._viewProjectionMatrix),n.renderData&&(i=Math.min(n.elevationBounds[0],i),r=Math.max(n.elevationBounds[1],r));var s=n.shouldSplit(a,this._eyePosRenderSR);if(s===q.TileUpdate.SPLIT){n.resetPendingUpdate(q.TileUpdate.MERGE),n.isLeaf&&(n.setPendingUpdate(q.TileUpdate.SPLIT),t.skipSubtree()),this._pendingUpdates=this._pendingUpdates||n.hasPendingUpdates;continue}n.resetPendingUpdate(q.TileUpdate.SPLIT)&&n.updateAgentSuspension(),s===q.TileUpdate.VSPLITMERGE&&n.updateAgents(q.LayerClass.ELEVATION)}if(t.skipSubtree(),!n.renderData){n.setPendingUpdate(q.TileUpdate.MERGE),n.resetPendingUpdate(q.TileUpdate.SPLIT);var o=this._iteratorPool.acquire();for(o.resetOne(n);!o.done;){var l=o.next();this._updateClippingStatus(l),l.updateVisibility(),l.visible&&l.updateScreenDepth(this._viewProjectionMatrix)}this._iteratorPool.release(o)}this._pendingUpdates=this._pendingUpdates||n.hasPendingUpdates}this._iteratorPool.release(t),isFinite(i)&&isFinite(r)&&(this._elevationBounds[0]===i&&this._elevationBounds[1]===r||(this._elevationBounds[0]=i,this._elevationBounds[1]=r,this.emit("elevation-bounds-change",null)))}},t.prototype._updateViewDependentParameters=function(){var e=this._view.state.camera,t=Math.tan(.5*e.fovX),i=Math.tan(.5*e.fovY),r=this.tilingScheme.pixelSize,a=Math.pow(2,-this._getLodBias())*e.pixelRatio;this._splitLimits[0]=t,this._splitLimits[1]=r[0]/e.width*this.maxTextureScale*a,this._splitLimits[2]=i,this._splitLimits[3]=r[1]/e.height*this.maxTextureScale*a,this._splitLimits[4]=this.tilingScheme.getMaxLod(),this._splitLimits[5]=this._view.qualitySettings.tiledSurface.angledSplitBias,U.frustum.copy(e.frustum,this._frustum),T.mat4.multiply(this._viewProjectionMatrix,e.projectionMatrix,e.viewMatrix),P.vec3.copy(this._eyePosRenderSR,e.eye),O.vectorToVector(this._eyePosRenderSR,this._view.renderSpatialReference,this._eyePosSurfaceSR,this.spatialReference)},t.prototype._updateSkirts=function(){var e=this._view.state.camera;N.autoUpdateSkirtsVisibility(this,this._eyePosSurfaceSR,e.near)},t.prototype._setLayerViewsUpdating=function(){for(var e=0;e<q.LayerClass.COUNT;e++)for(var t=0,i=this._layerViews[e];t<i.length;t++){var r=i[t];r.updatingChanged(this._pendingUpdates)}},t.prototype._updateTileGeometry=function(e){e.updateVisibility(),this._renderer.updateTileGeometry(e),this._elevationUpdate(e),this._memoryUsed=0},t.prototype._elevationUpdate=function(e){ne.spatialReference=this.spatialReference,ne.tile=e,ne.extent=e.extent,this.emit("elevation-change",ne),S.containsPoint(e.extent,this._eyePosSurfaceSR)&&this._updateSkirts()},t.prototype._frame=function(e){var t=this;this._frameTraversal(e),e.run(function(){return F.sortTiles(t._renderer.renderOrder,t._lowPrioUpdates),!1}),this._processElevation(e)&&this._processTextures(e)&&!this._view.resourceController.hasPendingDownloads&&0===this._asyncWorkItems||(this._pendingUpdates=!0),this.isVisible()&&this.overlayManager&&this.overlayManager.needsUpdate()&&(e.done?this._pendingUpdates=!0:(this.overlayManager.updateOverlays(),this._updateOverlayOpacity(this._eyePosSurfaceSR[2]))),this._lowPrioUpdates.clear(),(this._pendingUpdates||20==++this._updateNextFrame)&&this._updatedThrottledPendingUpdates()},t.prototype._updatedThrottledPendingUpdates=function(){this._lvPendingUpdates!==this._pendingUpdates&&(this._setLayerViewsUpdating(),this._lvPendingUpdates=this._pendingUpdates,this._updateNextFrame=0)},t.prototype._frameTraversal=function(e){if(!this.suspended&&this._pendingUpdates){this._lowPrioUpdates.clear(),this._pendingUpdates=!1;var t=this._iteratorPool.acquire();t.reset(this.rootTiles);for(var i=0,r=!1,a=new Array;!t.done&&!e.done;){var n=t.next();i+=n.memoryUsed,n.resetPendingUpdate(q.TileUpdate.MERGE)?(this._mergeTile(n),e.madeProgress(),t.skipSubtree()):n.resetPendingUpdate(q.TileUpdate.SPLIT)?(this._splitTile(n)&&(this._pendingUpdates=!0,r=!0,a.push(n)),e.madeProgress(),t.skipSubtree()):n.hasPendingUpdates&&this._lowPrioUpdates.push(n),this._pendingUpdates=this._pendingUpdates||n.hasPendingUpdates,t.done&&(t.reset(a),a.length=0)}this._pendingUpdates=this._pendingUpdates||!t.done,!r&&t.done&&(this._memoryUsed=i),this._iteratorPool.release(t)}},t.prototype._processElevation=function(e){for(var t=this,i=this,r=0;r<this._lowPrioUpdates.length;++r){var a=function(r){var a=i._lowPrioUpdates.data[r];if(!e.run(function(){if(a.resetPendingUpdate(q.TileUpdate.GEOMETRY))return t._updateTileGeometry(a),!0}))return{value:!1}}(r);if("object"==typeof a)return a.value}return!0},t.prototype._processTextures=function(e){for(var t=this,i=this,r=0;r<this._lowPrioUpdates.length;++r){var a=function(r){var a=i._lowPrioUpdates.data[r];if(!e.run(function(){return!!a.resetPendingUpdate(q.TileUpdate.TEXTURE)&&(t._renderer.updateTileTexture(a),t._memoryUsed=0,!0)}))return{value:!1}}(r);if("object"==typeof a)return a.value}return!0},t.prototype._updateClippingExtent=function(){if(!this.spatialReference)return!1;var e=S.create(),t=null;return O.extentToBoundingRect(this._view.clippingArea,e,this.spatialReference)&&(t=e),!S.equals(t,this._clippingExtent)&&(this._memCache.clear(),this._clippingExtent=t,this._renderer.clippingExtent=t,this.notifyChange("extent"),this.updateTileOverlayParams(),this.overlayManager.setOverlayPlacementDirty(),!0)},t.prototype._clippingChanged=function(){this._updateClippingExtent()&&this._updateRootTiles()},t.prototype._getLodBias=function(){var e=this._view.resourceController.memoryController.memoryFactor;return this._view.qualitySettings.tiledSurface.lodBias-(1-e)*q.MAX_MEMORY_LOD_BIAS},t.prototype._getLodBiasCorrectedScale=function(e){var t=this.tilingScheme.levels,i=c.clamp(e-this._getLodBias(),0,t.length-1),r=Math.floor(i),a=i-r;return t[Math.floor(i)].scale*(1-a)+t[Math.ceil(i)].scale*a},t.prototype._cancelTilemapRequests=function(e){for(var t=0,i=e.layerInfo;t<i.length;t++){var r=i[t];if(r)for(var a=0,n=r;a<n.length;a++){var s=n[a];s.abortTilemapRequest()}}},t.prototype._removeAllTiles=function(){var e=this;this.rootTiles&&(this.rootTiles.forEach(function(t){return e._purgeTile(t)}),this._setRootTiles(null),this.notifyChange("ready"));for(var t=0;t<this._topLevelTilemapOnlyTiles.length;t++){var i=this._topLevelTilemapOnlyTiles[t];this._cancelTilemapRequests(i)}this.setVisibility(!1)},t.prototype._purgeChildTiles=function(e){for(var t in e.children){var i=e.children[t];null!=i&&(e.children[t]=null,this._purgeTile(i))}},t.prototype._purgeTile=function(e){this._purgeChildTiles(e),e.unload(this._renderer),this._cancelTilemapRequests(e),e.dispose(),this._tilePool.release(e)},t.prototype._splitTile=function(e){var t=e.lij[0]+1,i=2*e.lij[1],r=2*e.lij[2];return e.children[0]=this._createTile(t,i,r,e),e.children[1]=this._createTile(t,i,r+1,e),e.children[2]=this._createTile(t,i+1,r,e),e.children[3]=this._createTile(t,i+1,r+1,e),e.unload(this._renderer),se.spatialReference=this.spatialReference,se.extent=e.extent,se.scale=this._getLodBiasCorrectedScale(t),this.emit("scale-change",se),e.children[0].hasPendingUpdate(q.TileUpdate.SPLIT)||e.children[1].hasPendingUpdate(q.TileUpdate.SPLIT)||e.children[2].hasPendingUpdate(q.TileUpdate.SPLIT)||e.children[3].hasPendingUpdate(q.TileUpdate.SPLIT)},t.prototype._createTile=function(e,t,i,r){N.weakAssert(!!r,"_createTile sanity check");var a=this._acquireTile(e,t,i,r);return a.updateClippingStatus(this._clippingExtent),a.visible&&(a.updateScreenDepth(this._viewProjectionMatrix),a.shouldSplit(this._splitLimits,this._eyePosRenderSR)===q.TileUpdate.SPLIT&&a.setPendingUpdate(q.TileUpdate.SPLIT)),this._loadTile(a),a},t.prototype._mergeTile=function(e){N.weakAssert(!e.renderData,"_mergeTile sanity check"),N.weakAssert(!e.hasPendingUpdate(q.TileUpdate.SPLIT),"_mergeTile sanity check"),this._loadTile(e),this._purgeChildTiles(e),se.spatialReference=this.spatialReference,se.extent=e.extent,se.scale=this._getLodBiasCorrectedScale(e.lij[0]),this.emit("scale-change",se)},t.prototype._loadTile=function(e){e.load(this._renderer),this.overlayManager&&this.overlayManager.hasOverlays()&&this.overlayManager.setOverlayParamsOfTile(e,e.renderData,this._overlayOpacity),this._elevationUpdate(e)},t.prototype._handleHasHighlights=function(e){this._renderer.setNeedsHighlight(e)},t.prototype._elevationDataUpdated=function(e,t){var i=e.layerInfo[q.LayerClass.ELEVATION][t],r=[e],a=e.lij[0],n=this._iteratorPool.acquire();for(n.reset(r);!n.done;){var s=n.next();s.findElevationBoundsForLayer(t,a),s.computeElevationBounds()}this._iteratorPool.release(n),e.dataArrived(t,q.LayerClass.ELEVATION,i.data),this._updateTiles(r)},t.prototype._handleLayerViewChanges=function(e){var t=this,i=!1;e.added.forEach(function(e){var r=e.layer;N.isTiledLayerView(e)?(t._registerTiledLayer(e),r.loaded&&(i=!0),e.updatingChanged(t._pendingUpdates)):e.supportsDraping&&t.overlayManager&&t.overlayManager.registerLayerView(e)}),e.removed.forEach(function(e){N.isTiledLayerView(e)?(i=!0,t._unregisterTiledLayerView(e.uid)):e.supportsDraping&&t.overlayManager&&t.overlayManager.unregisterLayerView(e)}),(i=i||e.moved.filter(N.isTiledLayerView).length>0)&&this._updateTiledLayers()},t.prototype._registerTiledLayer=function(e){var t=this,i=[];i.push(e.watch("suspended",function(){return t._updateTiledLayers()})),i.push(e.watch("fullOpacity",function(){return t._updateTileTextures(!1)})),e.on("data-changed",function(){var i=N.isElevationLayerView(e)?q.LayerClass.ELEVATION:q.LayerClass.MAP,r=t._layerIndexByLayerViewId[i][e.uid];null!=r&&t._invalidateLayerData(r,i)}),this._basemapLayerViewHandles[e.uid]=i},t.prototype._unregisterTiledLayerView=function(e){var t=this._basemapLayerViewHandles[e];if(t){for(var i=0;i<t.length;i++)t[i].remove();delete this._basemapLayerViewHandles[e]}},t.prototype._updateTiledLayers=function(){var e=this;if(this.tilingScheme&&!this._view.suspended){var t=this._view.allLayerViews,i=[[],[]],r=null,a=S.empty(),n=function(t){var n=t.layer;if(n&&!t.suspended&&N.isTiledLayerView(t)){var s=t.fullExtent;if(!s)return void J.warn("Terrain: Map or elevation layer does not have fullExtent: "+n.id);if(!e.tilingScheme.compatibleWith(t.tileInfo))return void J.warn("Terrain: tiling scheme of layer "+n.id+" is incompatible with other tiled layers, will not be drawn");if(S.expand(a,s),N.isElevationLayerView(t))i[q.LayerClass.ELEVATION].push(t);else{var o=t.displayLevelRange;o.maxLevel!==1/0&&(null===r||o.maxLevel>r)&&(r=o.maxLevel),i[q.LayerClass.MAP].push(t)}}};t.forEach(n,this);for(var s=this,o=0;o<q.LayerClass.COUNT;o++)!function(e){var t=s._layerViews[e],r=i[e];r.reverse();var a=r.length,n=t.length!==a,o=new Array(a),l=new Array(t.length);s._layerIndexByLayerViewId[e]={};for(var p=0;p<a;p++){var d=r[p].uid;s._layerIndexByLayerViewId[e][d]=p;var h=t.indexOf(r[p]);o[p]=h,p!==h&&(n=!0),h>-1&&(l[h]=p)}if(n){s._topLevelTilemapOnlyTiles.forEach(function(t){return t.modifyLayers(l,o,e)});var u=s._postorderIterator;for(u.reset(s.rootTiles);!u.done;)u.next().modifyLayers(l,o,e);for(s._layerViews[e]=r,e===q.LayerClass.ELEVATION&&s._memCache.clear(),u.reset(s.rootTiles);!u.done;){var c=u.next();c.restartAgents(e),e===q.LayerClass.ELEVATION&&c.computeElevationBounds()}s._updateTiles()}}(o);this.tilingScheme.ensureMaxLod(r)&&this._viewChangeUpdate()}},t.prototype._hasFixedExtent=function(){return!!this._clippingExtent},t.prototype.layerViewByIndex=function(e,t){return this._layerViews[t][e]},t.prototype.numLayers=function(e){return this._layerViews[e].length},t.prototype._updateTileTextures=function(e){var t=this._iteratorPool.acquire();for(t.reset(this.rootTiles);!t.done;){var i=t.next();i.updateAgents(q.LayerClass.MAP),e&&this.renderer.updateTileTexture(i)}this._iteratorPool.release(t)},t.prototype._invalidateLayerData=function(e,t){var i=this._iteratorPool.acquire();for(i.reset(this.rootTiles);!i.done;)i.next().removeLayerAgent(e,t);for(i.reset(this.rootTiles);!i.done;)i.next().invalidateLayerData(e,t);this._iteratorPool.release(i),t===q.LayerClass.ELEVATION&&this._memCache.clear()},t.prototype.setPendingUpdates=function(){this._pendingUpdates=!0,this._updatedThrottledPendingUpdates()},t.prototype.requestTileData=function(e,t,i,r){var a=this,n=this.layerViewByIndex(t,i),s=n.layer;if(s.tilemapCache&&!N.isVectorTileLayerView(n)){var o=this.getTilemapTile(e),l=o.layerInfo[i][t];if(!l.tilemap)return l.tilemapRequestPromise||(l.tilemapRequestAbort=f.createAbortController(),l.tilemapRequestPromise=this.requestTilemap(o,t,i,n,s,{signal:l.tilemapRequestAbort.signal})),++this._asyncWorkItems,l.tilemapRequestPromise.catch(function(){}).then(function(){--a._asyncWorkItems,l.tilemapRequestPromise=null,l.tilemapRequestAbort=null,f.throwIfAborted(r);var t=a._layerIndexByLayerViewId[i][n.uid];if(null!=t)return o.hasDataAvailable(e,t,i)?a._requestTileData(e,t,i,n,r):(a._dispatchDataEvent(e,"dataMissing",i,n,{notInTilemap:!0}),f.reject())});if(!o.hasDataAvailable(e,t,i))return this._dispatchDataEvent(e,"dataMissing",i,n,{notInTilemap:!0}),f.reject()}return this._requestTileData(e,t,i,n,r)},t.prototype._requestTileData=function(e,t,i,r,a){return i===q.LayerClass.ELEVATION?this._requestElevationTileData(e,t,i,r,a):this._requestMapTileData(e,t,i,r,a)},t.prototype._requestElevationTileData=function(e,t,i,r,a){var n=this;if(!N.isElevationLayerView(r))return void N.weakAssert(!1,"_requestElevationTileData can only be called for elevation layer views");var s=function(a){n._asyncWorkItems--;var s=n._layerIndexByLayerViewId[i][r.uid];if(null==s)return void J.warn("TerrainSurface: received data from unknown layer %d %s",i,e.lij.toString());var o=e.layerInfo[i][s];n._memoryUsed=0,o.data=R.create(e.lij,e.extent,a),n._elevationDataUpdated(e,t),n._pendingUpdates=!0},o=function(t){n._asyncWorkItems--,f.isAbortError(t)||n._dispatchDataEvent(e,"dataMissing",i,r,t)};if(this._asyncWorkItems++,N.useFetchTileForLayer(r.layer))return r.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2],{noDataValue:q.ELEVATION_NODATA_VALUE,signal:a.signal}).then(function(e){return s(e)},o);var l=r.getTileUrl(e.lij[0],e.lij[1],e.lij[2]);return this._streamDataRequester(l,"binary",a).then(function(e){return n._lercWorker.decode(e,{noDataValue:q.ELEVATION_NODATA_VALUE},a.signal)}).then(function(e){s({values:e.pixelData,width:e.width,height:e.height,noDataValue:e.noDataValue,minValue:e.minValue,maxValue:e.maxValue})}).catch(function(e){return o(e)})},t.prototype._requestMapTileData=function(e,t,i,r,a){var n=this;++this._asyncWorkItems;var s=function(t){--n._asyncWorkItems,n._dispatchDataEvent(e,"dataArrived",i,r,t)},o=function(t){--n._asyncWorkItems,f.isAbortError(t)||n._dispatchDataEvent(e,"dataMissing",i,r,t)};if(N.isVectorTileLayerView(r)){var p=r.tileHandler,d=r.schemaHelper.getLevelRowColumn(e.lij);return l.safeCast(p.getVectorTile3D(d[0],d[1],d[2],0)).then(function(e){g.isAborted(a)?--n._asyncWorkItems:s(e)},o)}if(N.useFetchTileForLayer(r.layer)&&N.isTileLayerView(r)){return r.layer.fetchTile(e.lij[0],e.lij[1],e.lij[2],a).then(s,o)}var h=r.getTileUrl(e.lij[0],e.lij[1],e.lij[2]);return K(r)&&r.refreshTimestamp&&(h+=(h.indexOf("?")>-1?"&":"?")+"_ts="+r.refreshTimestamp),this._streamDataRequester(h,"image",a).then(s,o)},t.prototype.requestTilemap=function(e,t,r,a,n,s){var o=this,l=e.lij[0]+q.TILEMAP_SIZE_EXP,p=e.lij[1]<<q.TILEMAP_SIZE_EXP,d=e.lij[2]<<q.TILEMAP_SIZE_EXP;return n.tilemapCache.fetchTilemap(l,p,d,i({},s,{timeout:6e3})).then(function(i){null!=(t=o._layerIndexByLayerViewId[r][a.uid])&&(e.layerInfo[r][t].tilemap=i)}).catch(function(e){})},t.prototype.getTilemapTile=function(e){var t=e.lij[0];return t>q.TILEMAP_SIZE_EXP?F.getTileNLevelsUp(e,q.TILEMAP_SIZE_EXP):this._topLevelTilemapOnlyTiles[t]},t.prototype._dispatchDataEvent=function(e,t,i,r,a){var n=this._layerIndexByLayerViewId[i][r.uid];null!=n?e[t](n,i,a):J.warn("TerrainSurface: received data from unknown layer")},t.prototype.updateTileOverlayParams=function(){if(this.rootTiles){var e=this._iteratorPool.acquire();for(e.reset(this.rootTiles);!e.done;){var t=e.next();t.renderData&&this.overlayManager&&this.overlayManager.setOverlayParamsOfTile(t,t.renderData,this._overlayOpacity)}this._iteratorPool.release(e),this._renderer.setNeedsRender()}},t.prototype._updateOverlayOpacity=function(e){if(this.overlayManager){var t=this.overlayManager.updateOpacity(e);if(!isNaN(t)&&t!==this._overlayOpacity){var i=this._iteratorPool.acquire();for(i.reset(this.rootTiles);!i.done;){var r=i.next();r.renderData&&(r.renderData.overlayOpacity=t)}this._iteratorPool.release(i),this._overlayOpacity=t,this._renderer.setNeedsRender()}}},t.prototype.getStats=function(){var e={numNodes:0,numLeaves:0,numVisible:0,numVisiblePerLevel:new Array},t=this._iteratorPool.acquire();for(t.reset(this.rootTiles);!t.done;){var i=t.next();if(e.numNodes++,i.renderData&&(e.numLeaves++,i.visible)){e.numVisible++;var r=i.lij[0];e.numVisiblePerLevel[r]=null==e.numVisiblePerLevel[r]?1:e.numVisiblePerLevel[r]+1}}return this._iteratorPool.release(t),e},t.prototype.getUsedMemory=function(){if(!this.tilingScheme)return 0;if(this._memoryUsed>0)return this._memoryUsed;var e=this._iteratorPool.acquire();for(e.reset(this.rootTiles);!e.done;){var t=e.next();this._memoryUsed+=t.memoryUsed}return this._iteratorPool.release(e),this._memoryUsed},t.prototype.getMemoryUsage=function(){if(!this.tilingScheme)return{};var e=0,t=0,i=0,r=0,a=0,n=0,s=this._iteratorPool.acquire();s.reset(this.rootTiles);for(var o=this.tilingScheme.pixelSize,l=o[0]*o[1]*4;!s.done;){for(var p=s.next(),d=Z(p),h=0,u=p.layerInfo[q.LayerClass.MAP];h<u.length;h++){var c=u[h],_=c.data,y=0,g=0;_ instanceof X?y+=z.getGpuMemoryUsage(_):_ instanceof HTMLImageElement?g+=l:_ instanceof x&&(n+=_.getGpuMemoryUsage(),i+=_.getCpuMemoryUsage()),p.renderData||d?(e+=g,r+=y):(t+=g,a+=y)}for(var f=0,v=p.layerInfo[q.LayerClass.ELEVATION];f<v.length;f++){var c=v[f],_=c.data;e+=_?l:0}if(p.renderData){var m=p.renderData.textureDescriptor;r+=m?z.getGpuMemoryUsage(m):0;var T=p.renderData.estimatedGeometryMemoryUsage;n+=T,i+=T}}return this._iteratorPool.release(s),{cpuVisibleImageData:e,cpuInvisibleImageData:t,cpuGeometryData:i,gpuVisibleImageData:r,gpuInvisibleImageData:a,gpuGeometryData:n}},
t.prototype.getTile=function(e){var t=e.split("/").map(function(e){return+e});if(0===t[0])return this.rootTiles.forEach(function(e){if(e.lij[1]===t[1]&&e.lij[2]===t[2])return e}),null;var i,r=Math.pow(2,t[0]),a=Math.floor(t[1]/r),n=Math.floor(t[2]/r);if(this.rootTiles.some(function(e){return e.lij[1]===a&&e.lij[2]===n&&(i=e,!0)}),i){for(var s=1<<t[0]-1;i.lij[0]<t[0];){var o=t[1]&s?2:0;if((t[2]&s)>0&&o++,!i.children[o])return console.log("Tile "+e+" doesn't exist, smallest ancestor is "+F.tile2str(i)),null;i=i.children[o],s>>=1}return N.weakAssert(i.lij[0]===t[0]&&i.lij[1]===t[1]&&i.lij[2]===t[2],"not the right tile?"),i}return null},t.prototype.setBorders=function(e){this._renderer.renderPatchBorders=e},t.prototype.setDisableRendering=function(e){this._renderer.renderingDisabled=e},Object.defineProperty(t.prototype,"test",{get:function(){var e=this;return{renderer:this._renderer,lercWorker:this._lercWorker,mergeTile:function(t){return e._mergeTile(t)},updateTiles:function(t){return e._updateTiles(t)}}},enumerable:!0,configurable:!0}),a([m.property({value:!1})],t.prototype,"cullBackFaces",null),a([m.property({readOnly:!0})],t.prototype,"extent",null),a([m.property({readOnly:!0})],t.prototype,"loaded",void 0),a([m.property({value:1})],t.prototype,"baseOpacity",null),a([m.property({readOnly:!0})],t.prototype,"overlayManager",void 0),a([m.property({readOnly:!0})],t.prototype,"manifold",void 0),a([m.property()],t.prototype,"maxTextureScale",void 0),a([m.property({readOnly:!0})],t.prototype,"ready",null),a([m.property({value:1})],t.prototype,"renderOrder",null),a([m.property({readOnly:!0})],t.prototype,"rootTiles",void 0),a([m.property({value:!0})],t.prototype,"skirtScale",null),a([m.property({readOnly:!0,dependsOn:["tilingScheme.spatialReference"]})],t.prototype,"spatialReference",null),a([m.property({})],t.prototype,"backgroundImage",void 0),a([m.property({type:n})],t.prototype,"backgroundColor",void 0),a([m.property({dependsOn:["backgroundColor","backgroundImage"]})],t.prototype,"_background",null),a([m.property({value:!1})],t.prototype,"slicePlaneEnabled",null),a([m.property({readOnly:!0})],t.prototype,"tilingScheme",void 0),a([m.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeLocked"})],t.prototype,"tilingSchemeLocked",void 0),a([m.property({readOnly:!0,aliasOf:"tilingSchemeLogic.tilingSchemeDone"})],t.prototype,"tilingSchemeDone",void 0),a([m.property({readOnly:!0})],t.prototype,"tilingSchemeLogic",void 0),a([m.property({value:!0})],t.prototype,"velvetOverground",null),a([m.property({value:!1})],t.prototype,"wireframe",null),t=a([m.subclass("esri.views.3d.terrain.TerrainSurface")],t)}(m.declared(s,d)),$=1.2,ee=80/180*Math.PI,te=110/180*Math.PI,ie=E.vec4f64.create(),re=S.create(),ae=[0,0,0],ne={spatialReference:null,tile:null,extent:null},se={spatialReference:null,extent:null,scale:0};return Q});