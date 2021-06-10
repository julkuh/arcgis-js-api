/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../core/ObjectPool","../../../core/promiseUtils","../../../core/mathUtils","../../../chunks/vec3f64","../../../chunks/vec3","../../../geometry/projectionEllipsoid","../../../geometry/support/aaBoundingRect","../../../chunks/vec2f64","../../../chunks/vec4f64","../../../chunks/vec2","../../../chunks/vec4","./TerrainConst","../../../chunks/sphere","../../webgl/Util","../support/StreamDataLoader","../../2d/engine/vectorTiles/VectorTile","./RasterTile","./TileTexture","./terrainUtils","./ElevationBounds","./tileUtils","./TileAgent","./ElevationTileAgent","./MapTileAgent","./TilePerLayerInfo"],(function(e,t,i,n,s,a,r,o,l,h,u,d,c,f,g,p,_,y,m,A,v,L,T,M,E,I,D,C){"use strict";const U=L.weakAssert,S=r.create(),B=r.create(),b=r.create(),x=d.create(),N=.1;let k=function(){this.fovX=0,this.fovY=0,this.relativeWidthLimit=0,this.relativeHeightLimit=0,this.maxLod=0,this.angledSplitBias=0,this.aboveGround=!0},R=function(){function e(e){this._numSubdivisionAtLevel=e,this.lij=[0,0,0],this._children=[null,null,null,null],this._dirty=!0,this._previouslyRendered=!1,this.extent=h.create(),this._elevationBounds=u.create(),this.layerInfo=[[],[]],this.extentInRadians=h.create(),this.centerAtSeaLevel=r.create(),this._center=[r.create(),p.create(),r.create()],this.up=r.unitZ(),this._isWithinClippingArea=!0,this._intersectsClippingArea=!0,this._maxTesselation=0,this._usedMemory=G,this._mapTileMemory=0,this._mapDataRefCount=0,this._screenDepth=0,this.renderOrder=0,this._edgeLen=0,this._edgeLen2=0,this._curvatureHeight=0}e.prune=function(){P.prune(0),j.prune(0),C.TilePerLayerInfo.prune()};var n=e.prototype;return n.init=function(e,t,i){this.lij[0]=e[0],this.lij[1]=e[1],this.lij[2]=e[2],this.ellipsoid=l.getReferenceEllipsoid(i.tilingScheme.spatialReference),i.tilingScheme.getExtent(e[0],e[1],e[2],this.extent),i.tilingScheme.convertExtentToRadians(this.extent,this.extentInRadians),this._isWithinClippingArea=!0,this._intersectsClippingArea=!0,this._clippingArea=null,this._mapDataRefCount=0,i.upsampleMapCache.pop(M.tile2str(this)),this._edgeLen=0,this._edgeLen2=0,this._center[1][3]=0,this.vlevel=e?e[0]:0,t&&t._elevationBounds?c.copy(this._elevationBounds,t.elevationBounds):c.set(this._elevationBounds,0,0),this._pendingUpdates=0,this.renderData=null,this._screenDepth=0,this._visible=!1,this._previouslyRendered=!1,this._parent=t,this.unsetChildren(),this._surface=i,this.updateVisibility();for(const n of g.LayerClasses){const e=i.numLayers(n),t=this.layerInfo[n];for(const i of t)i.release();t.length=e;for(let i=0;i<e;i++)t[i]=C.TilePerLayerInfo.acquire(this._surface.upsampleInfoPool),0===n&&this.findElevationBoundsForLayer(i,-1)}this.computeElevationBounds(),this._maxTesselation=Math.min(i.tilingScheme.pixelSize,g.MAX_PATCH_TESSELATION)},n.release=function(){U(!this.renderData,"tile.renderData was not unloaded"),this._surface.upsampleMapCache.pop(M.tile2str(this));for(const e of g.LayerClasses){for(const t of this.layerInfo[e])t.release();this.layerInfo[e].length=0}this._parent=null,this._surface=null,this._usedMemory=G},n.refMapData=function(){++this._mapDataRefCount,this.isCached||this._surface.upsampleMapCache.pop(M.tile2str(this))},n.unrefMapData=function(){if(--this._mapDataRefCount,this.isCached){const e=this.cachedMemory;e>0&&(this._surface.upsampleMapCache.put(M.tile2str(this),this,e),this.setMemoryDirty())}},n.setMemoryDirty=function(){this._usedMemory=G},n._updateMemoryUsed=function(){this._usedMemory=0,this._mapTileMemory=0;const e=this.cpuImageMemorySize;for(const t of this.layerInfo[1]){const i=t.data;i instanceof v?this._mapTileMemory+=_.getGpuMemoryUsage(i.texture):i instanceof HTMLImageElement||i instanceof y.ImageWithType?this._mapTileMemory+=e:i instanceof A&&(this._mapTileMemory+=i.getMemoryUsage())}for(const t of this.layerInfo[0])this._usedMemory+=t.data?e:0;this.renderData&&(this._usedMemory+=this.renderData.estimatedGeometryMemoryUsage,this._mapTileMemory+=_.getGpuMemoryUsage(this.renderData.textureDescriptor)),this.isCached&&this._surface.upsampleMapCache.updateSize(M.tile2str(this),this,this.cachedMemory)},n.getUsedMemoryForLayer=function(e,t){const i=this.layerInfo[e][t];if(!i||!i.data)return 0;if(1!==e||this.isCached){if(0===e)return this.cpuImageMemorySize}else{const e=i.data;if(e instanceof v)return _.getGpuMemoryUsage(e.texture);if(e instanceof HTMLImageElement||e instanceof y.ImageWithType)return this.cpuImageMemorySize;if(e instanceof m.VectorTile||e instanceof A)return e.getMemoryUsage()}return 0},n.updateScreenDepth=function(e){o.copy(x,this._center[1]),x[3]=1,f.transformMat4(x,x,e),this._screenDepth=x[2]<0?0:x[2]/x[3]},n.shouldSplit=function(e,t,n){if(i.isSome(e.frustum)&&!this._isVisible(e.frustum))return 0;const s=this.level;o.subtract(S,this._center[1],t);let r=o.squaredLength(S),l=1;o.subtract(B,this._center[0],t);const h=o.squaredLength(B);h<r&&(r=h,l=0),o.subtract(B,this._center[2],t);const u=o.squaredLength(B);if(u<r&&(r=u,l=2),this._edgeLen2>r&&s<e.maxLod)return 2;const d=Math.sqrt(r),c=e.fovX*d*2,f=this._edgeLen/c,g=()=>{const t=s+Math.ceil(-a.log2(e.relativeWidthLimit/f));return t!==this.vlevel?(this.vlevel=t,4):1};if(1===n){if(1===this._surface.snapLevel-s)return s>=e.maxLod?g():2}const p=o.dot(this.up,S),_=this._elevationBounds[1]-this._elevationBounds[0],y=_/this.edgeLen;if(e.aboveGround&&p>0&&y<.001){if(p/d-Math.sin(this._curvatureHeight/(this.edgeLen*Math.SQRT1_2)*Math.PI)-y>0)return 0}if(f<e.relativeWidthLimit)return this.vlevel!==this.level?(this.vlevel=this.level,4):0;if(s>=e.maxLod)return g();if(s>6){o.subtract(B,this._center[l],t),o.scale(b,this.up,p),o.subtract(b,b,B);const i=o.squaredLength(b);if(i>this.radius*this.radius){o.scale(b,b,this.radius/Math.sqrt(i)),o.add(b,b,this._center[l]),o.subtract(b,t,b);const n=Math.min(1,(Math.abs(o.dot(b,this.up))+.5*_+this._curvatureHeight)/o.length(b)),s=N/e.angledSplitBias,a=e.fovY*d*2;if(n*(this._edgeLen/a)<s*e.relativeHeightLimit)return 0}}return 2},n.setChildren=function(e,t,i,n){U(!!(e&&t&&i&&n),"Null child passed"),this._children[0]=e,this._children[1]=t,this._children[2]=i,this._children[3]=n},n.unsetChildren=function(){this._children[0]=null,this._children[1]=null,this._children[2]=null,this._children[3]=null},n.load=function(e){this.refMapData();for(const t of g.LayerClasses)this._createOrUpdateAgents(0,t);e.loadTile(this)},n.unload=function(e){e.unloadTile(this);for(const t of g.LayerClasses){const e=this.layerInfo[t];for(const t of e)t.loadingAgent&&t.loadingAgent!==E.TILE_AGENT_DONE&&(O(t.loadingAgent),t.loadingAgent=null),t.pendingUpdates=0}this.resetPendingUpdate(32),this.resetPendingUpdate(64),this.unrefMapData()},n.unloadMapData=function(){const e=this.layerInfo[1];for(const t of e)t.loadingAgent&&t.loadingAgent!==E.TILE_AGENT_DONE&&(O(t.loadingAgent),t.loadingAgent=null),t.pendingUpdates=0;this.renderData&&this.renderData.releaseTexture(),this.setMemoryDirty()},n.updateClippingStatus=function(e){if(h.equals(e,this._clippingArea))return!1;const t=this._intersectsClippingArea,n=this._isWithinClippingArea;i.isSome(e)?(this._intersectsClippingArea=this.intersectsExtent(e),this._isWithinClippingArea=this.isWithinExtent(e)):(this._intersectsClippingArea=!0,this._isWithinClippingArea=!0),this._clippingArea=e,this.updateVisibility();const s=n&&this._isWithinClippingArea,a=!(n||t||this._isWithinClippingArea||this._intersectsClippingArea);return!this.renderData||s||a||this.setPendingUpdate(32),!0},n.updateVisibility=function(){this._dirty=!0,this._surface.setTileTreeDirty()},n.getLayerInfo=function(e,t){return this.layerInfo[t][e]},n.hasLayerData=function(e,t){const i=this.layerInfo[t][e];return!(!i||!i.data||i.dataInvalidated)},n.isSuspended=function(e){return!!this.hasPendingUpdate(2)||0!==e&&!this.loadable},n.hasPendingUpdate=function(e){return(this._pendingUpdates&e)===e},n.setPendingUpdate=function(e){this._pendingUpdates|=e,2===e||8===e?this._surface.setTileTreeDirty():this._surface.pendingUpdates=!0},n.resetPendingUpdate=function(e){return!!this.hasPendingUpdate(e)&&(this._pendingUpdates&=~e,!0)},n.requestLayerData=function(e,t,n){const a=this.layerInfo[t][e];if(a.waitingAgents.has(n))return console.warn("agent already requested this piece of map data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),n.tile.lij.toString(),t,e),!0;if(a.waitingAgents.push(n),a.data&&!a.dataInvalidated)return console.warn("agent requested existing data (tile %s, agent tile %s, layer: %d/%d)",this.lij.toString(),n.tile.lij.toString(),t,e),n.dataArrived(this),!0;if(a.requestPromise)return!0;i.abortMaybe(a.requestAbort),a.requestAbort=s.createAbortController();const r=this._surface.requestTileData(this,e,t,a.requestAbort);if(!r)return a.requestAbort=null,!1;const o=()=>{a.requestPromise===r&&(a.requestPromise=null,a.requestAbort=null)};return a.requestPromise=r,r.then(o,o),!0},n.hasLij=function(e){return this.lij[0]===e[0]&&this.lij[1]===e[1]&&this.lij[2]===e[2]},n.findByLij=function(e){if(this.hasLij(e))return this;if(this.isLeaf)return null;const t=this._children[0].findByLij(e)||this._children[1].findByLij(e)||this._children[2].findByLij(e)||this._children[3].findByLij(e);return t||null},n.distanceToSquared=function(e){return o.squaredLength(o.subtract(b,this._center[1],e))},n.containsPoint=function(e){const t=this.extent;return e[0]>=t[0]&&e[1]>=t[1]&&e[0]<=t[2]&&e[1]<=t[3]},n.unrequestLayerData=function(e,t,i){const n=this.layerInfo[t][e],s=n.waitingAgents,a=null!=s.removeUnordered(i);U(a,"agent has not requested this piece of map data"),s.length<1&&(n.abortRequest(),this._updateMemoryUsed())},n.dataArrived=function(e,t,i){const n=this.layerInfo[t][e];n.data=i,n.dataInvalidated=!1,n.waitingAgents.forAll((e=>e.dataArrived(this))),n.waitingAgents.clear(),this._updateMemoryUsed()},n.dataMissing=function(e,t,i){i.notInTilemap||console.error(`Tile ${this.lij.toString()} layer ${t}/${e} error ${i}`);const n=this.layerInfo[t][e];n.dataMissing=!0,n.waitingAgents.forAll((e=>e.dataMissing())),n.waitingAgents.clear(),this._updateMemoryUsed()},n.updateRenderData=function(e){switch(e){case 1:return this.updateTexture();case 0:return this.updateGeometry()}},n.updateTexture=function(){this.renderData&&this.setPendingUpdate(64)},n.updateGeometry=function(){this.setPendingUpdate(32);for(const e of this.layerInfo[0])e.pendingUpdates|=32},n.invalidateLayerData=function(e,t){this.layerInfo[t][e].invalidateSourceData(),this.restartAgents(t)},n.computeElevationBounds=function(){c.set(this._elevationBounds,Number.MAX_VALUE,-Number.MAX_VALUE);const e=this.layerInfo[0];let t=!0;for(const n of e)i.isSome(n.elevationBounds)&&(this._elevationBounds[0]=Math.min(this._elevationBounds[0],n.elevationBounds.min),this._elevationBounds[1]=Math.max(this._elevationBounds[1],n.elevationBounds.max),n.elevationBounds.hasNoDataValues||(t=!1));t&&(this._elevationBounds[0]=Math.min(this._elevationBounds[0],0),this._elevationBounds[1]=Math.max(this._elevationBounds[1],0)),this.updateRadiusAndCenter(),this._surface.setTileTreeDirty()},n._updateCenter=function(){const e=.5*(this._elevationBounds[0]+this._elevationBounds[1]);o.scale(b,this.up,e),o.add(this._center[1],this.centerAtSeaLevel,b),o.scale(b,this.up,this._elevationBounds[0]),o.add(this._center[0],this.centerAtSeaLevel,b),o.scale(b,this.up,this._elevationBounds[1]),o.add(this._center[2],this.centerAtSeaLevel,b)},n.findElevationBoundsForLayer=function(e,t){const n=this.layerInfo[0][e];if(i.isNone(n.elevationBounds)||n.elevationBounds.level<t){const t=this._surface.layerViewByIndex(e,0),s=L.getLayerWithExtentRange(t);if(M.fallsWithinLayer(this,s,!1)){const t=w;let s=!1;if(n.data){const e=n.data;t.min=e.bounds[0],t.max=e.bounds[1],t.hasNoDataValues=e.hasNoDataValues,t.level=this.lij[0],s=!0}else{let i,n,a=0;for(let t=this._parent;t&&(!n||a<g.ELEVATION_DESIRED_RESOLUTION_LEVEL)&&(a=this.vlevel-t.level,i=n||i,n=t.layerInfo[0][e].data,!(!n&&i&&a>=g.ELEVATION_DESIRED_RESOLUTION_LEVEL));t=t._parent);n=n||i,n&&(n.computeMinMaxValue(this.lij[0],this.lij[1],this.lij[2],t),t.min!==1/0&&(t.level=n.level,s=!0))}s&&(i.isNone(n.elevationBounds)&&(n.elevationBounds=new T.ElevationBounds),n.elevationBounds.copyFrom(t))}}},n.modifyLayers=function(e,t,i){const n=this.layerInfo[i];for(const r of n)r.loadingAgent&&r.loadingAgent!==E.TILE_AGENT_DONE&&(O(r.loadingAgent),r.loadingAgent=null),r.waitingAgents.clear();for(let r=0;r<n.length;++r)void 0===e[r]&&n[r].release();const s=new Array(...n),a=t.length;n.length=a;for(let r=0;r<a;r++){const e=t[r];n[r]=e>-1?s[e]:C.TilePerLayerInfo.acquire(this._surface.upsampleInfoPool)}this._updateMemoryUsed()},n.restartAgents=function(e){this.renderData&&(this._createOrUpdateAgents(0,e),this.updateRenderData(e))},n.updateAgents=function(e){if(this.renderData){const t=this.layerInfo[e];for(const e of t)e.loadingAgent===E.TILE_AGENT_DONE&&(e.loadingAgent=null);this._createOrUpdateAgents(0,e)}},n.updateAgentSuspension=function(){for(const e of g.LayerClasses){const t=this.isSuspended(e);for(const i of this.layerInfo[e])i.loadingAgent&&i.loadingAgent!==E.TILE_AGENT_DONE&&(i.loadingAgent.setSuspension(t),i.loadingAgent===E.TILE_AGENT_DONE&&this.updateRenderData(e))}},n.removeLayerAgent=function(e,t){const i=this.layerInfo[t][e];i.loadingAgent&&i.loadingAgent!==E.TILE_AGENT_DONE&&i.loadingAgent.dispose(),i.loadingAgent=null},n.agentDone=function(e,t){const i=this.layerInfo[t][e];i.loadingAgent=E.TILE_AGENT_DONE,i.data||i.upsampleInfo||this._createOrUpdateAgents(e+1,t)},n._createOrUpdateAgents=function(e,t){const i=this.isSuspended(t),n=this.layerInfo[t];for(let s=e;s<n.length;++s){const e=n[s];let a=!1;const r=this._surface.layerViewByIndex(s,t),o=L.getLayerWithExtentRange(r);if(e.loadingAgent?M.fallsWithinLayer(this,o,!1)?(e.loadingAgent!==E.TILE_AGENT_DONE&&e.loadingAgent.setSuspension(i),e.loadingAgent!==E.TILE_AGENT_DONE&&(a=e.loadingAgent.update())):e.dispose():M.fallsWithinLayer(this,o,!1)&&(e.loadingAgent=q(this,s,t,i),a=e.loadingAgent.startLoading(),a?e.loadingAgent===E.TILE_AGENT_DONE&&this.setPendingUpdate(32):(O(e.loadingAgent),e.loadingAgent=E.TILE_AGENT_DONE)),e.loadingAgent===E.TILE_AGENT_DONE&&this.updateRenderData(t),a&&r.isOpaque)return}},n.isWithinExtent=function(e){const t=this.extent;return t[0]>=e[0]&&e[2]>=t[2]&&t[1]>=e[1]&&e[3]>=t[3]},n.intersectsExtent=function(e){const t=this.extent;return t[2]>=e[0]&&e[2]>=t[0]&&t[3]>=e[1]&&e[3]>=t[1]},t._createClass(e,[{key:"usedMemory",get:function(){return this._usedMemory===G&&this._updateMemoryUsed(),this._usedMemory+(this.isCached?0:this.mapTileMemory)}},{key:"cachedMemory",get:function(){return this.isCached?this.mapTileMemory:0}},{key:"mapTileMemory",get:function(){this._usedMemory===G&&this._updateMemoryUsed();let e=this._mapTileMemory;for(const{data:t}of this.layerInfo[1])t instanceof m.VectorTile&&(e+=t.getMemoryUsage());return e}},{key:"isCached",get:function(){return!this.shouldLoad&&this._mapDataRefCount<=0}},{key:"maxTesselation",get:function(){return this._maxTesselation}},{key:"numSubdivisionsAtLevel",get:function(){return this._numSubdivisionAtLevel}},{key:"isWithinClippingArea",get:function(){return this._isWithinClippingArea}},{key:"intersectsClippingArea",get:function(){return this._intersectsClippingArea}},{key:"clippingArea",get:function(){return this._clippingArea}},{key:"parent",get:function(){return this._parent}},{key:"children",get:function(){return this._children}},{key:"surface",get:function(){return this._surface}},{key:"elevationBounds",get:function(){return this._elevationBounds}},{key:"level",get:function(){return this.lij[0]}},{key:"edgeLen",get:function(){return this._edgeLen}},{key:"radius",get:function(){return this._center[1][3]}},{key:"screenDepth",get:function(){return this._screenDepth}},{key:"visible",get:function(){if(this._dirty){this._dirty=!1;const e=this._isVisible(this.surface.frustum);e!==this._visible&&(this._visible=e,this._surface.emit("tiles-visibility-changed"),this._surface.renderer.setNeedsRender()),this.updateAgentSuspension()}return this._visible}},{key:"loadable",get:function(){return this.visible||this._surface.view.state.fixedContentCamera}},{key:"rendered",get:function(){const e=!!this.renderData;return e!==this._previouslyRendered&&(this._surface.emit("tiles-visibility-changed"),this._previouslyRendered=e,this._surface.renderer.setNeedsRender()),e}},{key:"shouldLoad",get:function(){if(!this.loadable)return!1;if(1===this._surface.lodSnapping){const e=this.level-this._surface.snapLevel;if(0===e)return!0;if(1===e)return!1}return this.isLeaf}},{key:"cpuImageMemorySize",get:function(){const e=4,t=this._surface.tilingScheme.pixelSize;return t*t*e}},{key:"updating",get:function(){if(this.hasPendingUpdates)return!0;for(const e of g.LayerClasses){const t=this.layerInfo[e];for(const e of t)if(e.loadingAgent&&e.loadingAgent!==E.TILE_AGENT_DONE&&e.loadingAgent.updating)return!0}return!1}},{key:"hasPendingUpdates",get:function(){return 0!==this._pendingUpdates}},{key:"isLeaf",get:function(){return null==this._children[0]}},{key:"test",get:function(){return{cachedMemory:this.cachedMemory}}}]),e}();function q(e,t,i,n){const s=0===i?j.acquire():P.acquire();return s.init(e,t,i,n),s}function O(e){e.dispose(),e instanceof I?j.release(e):e instanceof D&&P.release(e)}const P=new n(D),j=new n(I),w=new T.ElevationBounds,G=-1;e.SplitLimits=k,e.default=R,Object.defineProperty(e,"__esModule",{value:!0})}));
