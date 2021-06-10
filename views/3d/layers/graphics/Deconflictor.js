/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/maybe","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../core/PooledArray","../../../../core/Accessor","../../../../core/mathUtils","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../geometry/projectionEllipsoid","../../../../chunks/mat4","../../../../geometry/support/aaBoundingRect","../../../../chunks/mat4f64","../../../../chunks/vec2f64","../../../../chunks/vec4f64","../../../../chunks/vec4","../../../../chunks/sphere","../../support/geometryUtils","../../webgl-engine/lib/Camera","../../support/debugFlags","./deconflictorDebug","../../webgl-engine/lib/screenSizePerspectiveUtils","../../webgl-engine/materials/HUDMaterial"],(function(i,t,e,s,r,n,c,o,a,h,l,u,p,f,d,g,y,b,v,m,G,S,B,w,D,_,V,N,P,C,M){"use strict";const x=g.create(),I=B.create(),A=B.create(),z=g.create(),E=G.create(),O=_.sphere.create(),F=_.ray.create(),R=g.create(),T=m.create();let k=function(){this.aabr=m.create(),this.distance=0,this.culled=!1,this.visible=!1},X=function(i,t,e={}){this.graphics3DGraphic=i,this.slicePlaneEnabled=t,this.info=e},Y=function(){function i(){this.active=new Map,this.visible=new Map}return i.prototype.clear=function(){this.active.clear(),this.visible.clear()},i}(),j=function(){},U=function(){this.sortArray=new p({allocator:i=>i||new j})},L=function(){function i(){this.camera=new V,this.slicePlane=_.boundedPlane.create(),this.slicePlaneEnabled=!1}return i.prototype.copyFrom=function(i){this.camera.copyFrom(i.camera),_.boundedPlane.copy(i.slicePlane,this.slicePlane),this.slicePlaneEnabled=i.slicePlaneEnabled},i}();function W(i,t){const e=i.graphics3DGraphic;e.destroyed||e.clearVisibilityFlag(3,t)}function*H(i){if(Map.prototype.entries){const t=i.entries();for(let i=t.next();!i.done;i=t.next())yield i.value[1]}else yield*i.values()}function*Z(i,t,e){t.clear(),i.forEach(((i,s)=>{const r=t.pushNew();r.id=s,r.prio=i.info?-i.info[e].distance:Number.MAX_VALUE})),yield;const s=t.iterableSort(((i,t)=>t.prio-i.prio));for(let r=s.next();!r.done;r=s.next())yield;t.forAll((t=>{const e=i.get(t.id);e&&(i.delete(t.id),i.set(t.id,e))})),t.clear()}i.Deconflictor=function(i){function e(){var t;return(t=i.apply(this,arguments)||this)._dirty=!1,t._runningViewState=new L,t._state=0,t.graphics=new Y,t.iterators=new U,t.accBinsNumX=15,t.accBinsNumY=20,t.accBinsSizeX=0,t.accBinsSizeY=0,t.accBins=null,t.accNumTests=0,t}t._inheritsLoose(e,i);var s=e.prototype;return s.destroy=function(){this.graphics.clear(),this.iterators=null},s.setDirty=function(){!this._dirty&&this.graphics.active.size>0&&(this._dirty=!0,this.notifyChange("updating"))},s.needsUpdate=function(){return this.view.ready&&null!=this.view.state&&this.updating},s.update=function(i){switch(this._state){case 0:this.startUpdate(),i.madeProgress();case 1:if(this._state=1,!this.processActiveGraphics(i))return;case 2:if(this._state=2,!this.sortVisibleGraphics(i))return;case 3:if(this._state=3,!this.deconflictVisibleGraphics(i))return;default:P.drawAccelerationStruct(this,this.graphics.visible),this._state=0,this.notifyChange("updating")}},s.modifyGraphics=function(i,t){t?i.forEach((i=>this.addToActiveGraphics(i))):i.forEach((i=>this.removeFromActiveGraphics(i))),this.setDirty()},s.layerSupportsDeconfliction=function(i){if(r.isNone(i)||"object3d"!==i.type)return!1;const t=i.stageObject;if(1!==(t?t.getNumGeometryRecords():0))return!1;return t.getGeometryRecord(0).material instanceof M.HUDMaterial},s.startUpdate=function(){P.prepare(this.view),this._dirty=!1,this._runningViewState.copyFrom(this.viewState);const{fullWidth:i,fullHeight:t}=this._runningViewState.camera;this.initBins(i,t),this.resetIterators()},s.addToActiveGraphics=function(i){i.info[this.visibilityGroup]=new k,this.graphics.active.set(i.graphics3DGraphic.graphic.uid,i),this.setDirty()},s.removeFromActiveGraphics=function(i){this.removeFromVisibleGraphics(i),W(i,this.visibilityGroup),delete i.info[this.visibilityGroup],this.graphics.active.delete(i.graphics3DGraphic.graphic.uid),this.setDirty()},s.addToVisibleGraphics=function(i){this.graphics.visible.set(i.graphics3DGraphic.graphic.uid,i)},s.removeFromVisibleGraphics=function(i){this.graphics.visible.delete(i.graphics3DGraphic.graphic.uid)},s.processActiveGraphics=function(i){const t=this.ensureActiveGraphicsIterator(),e=v.invert(E,this._runningViewState.camera.projectionMatrix),s="global"===this.view.viewingMode&&1===this.view.map.ground.opacity&&this._runningViewState.camera.relativeElevation>0?O:null;let n=0;for(r.isSome(s)&&(y.transformMat4(s,g.ZEROS,this._runningViewState.camera.viewMatrix),s[3]=b.getReferenceEllipsoid(this.view.spatialReference).radius,n=_.sphere.distanceToSilhouette(s,g.ZEROS));!i.done;){i.madeProgress();const r=t.next();if(r.done)return this.resetActiveGraphicsIterator(),!0;const c=r.value,o=c&&c.info[this.visibilityGroup];o&&(this.collectGraphics3DGraphics(c,e,s,n),o.culled?this.removeFromVisibleGraphics(c):this.addToVisibleGraphics(c))}return!1},s.sortVisibleGraphics=function(i){const t=this.ensureSortGraphicsIterator();for(;!i.done;){const e=t.next();if(i.madeProgress(),e.done)return this.resetSortGraphicsIterator(),!0}return!1},s.deconflictVisibleGraphics=function(i){const t=this.ensureVisibleGraphicsIterator(),e=1===this.visibilityGroup;for(;!i.done;){i.madeProgress();const s=t.next();if(s.done)return this.resetVisibleGraphicsIterator(),!0;const r=s.value,n=r.info[this.visibilityGroup];if(!n||n.culled)continue;const c=r.graphics3DGraphic,o=(!e||c.isVisible())&&!this.isConflicted(r);o&&this.addToBins(r),n.visible=o,this.setGraphicVisibility(r,o),P.drawPoly(n,o)}return!1},s.resetIterators=function(){this.iterators.active=null,this.iterators.visible=null,this.iterators.sort=null},s.ensureActiveGraphicsIterator=function(){return this.iterators.active||(this.iterators.active=H(this.graphics.active)),this.iterators.active},s.resetActiveGraphicsIterator=function(){this.iterators.active=null},s.ensureVisibleGraphicsIterator=function(){return this.iterators.visible||(this.iterators.visible=H(this.graphics.visible)),this.iterators.visible},s.resetVisibleGraphicsIterator=function(){this.iterators.visible=null},s.ensureSortGraphicsIterator=function(){return this.iterators.sort||(this.iterators.sort=Z(this.graphics.visible,this.iterators.sortArray,this.visibilityGroup)),this.iterators.sort},s.resetSortGraphicsIterator=function(){this.iterators.sort=null},s.collectGraphics3DGraphics=function(i,t,e,s){const n=i.graphics3DGraphic;if(n.destroyed)return;const c=i.info[this.visibilityGroup];if(!n.isVisible(0,3))return void(c.culled=!0);const o=this.getGraphicsLayers(n);m.empty(c.aabr);let a=null;for(const h of o){if(!this.layerSupportsDeconfliction(h))continue;const n=h.stageObject.getGeometryRecord(0).material;if(r.isNone(a)){if(a=this.getProjectionInfo(h,t,J),a.isOutsideScreen||this.isCulledBySlice(i,x)||r.isSome(e)&&this.isCulledByHorizon(a,e,s))return void(c.culled=!0);!N.DISABLE_DECONFLICTOR_VISIBILITY_OFFSET&&c.visible&&(a.distance*=.7)}this.expandBoundingRect(c,h,n,a)}r.isNone(a)?c.culled=!0:(c.distance=a.distance,c.culled=!1)},s.getProjectionInfo=function(i,t,e){const s=this._runningViewState.camera,r=i.stageObject,n=r.getGeometryRecord(0),c=n.material,o=_.sphere.getCenter(r.getBounds());y.transformMat4(x,o,s.viewMatrix);const a=n.geometry.vertexAttributes,h=a.get("normal").data,l=a.get("auxpos1").data;return c.applyShaderOffsetsView(x,h,r.transformation,l,s,e.scaleInfo,x),w.set(I,x[0],x[1],x[2],1),w.transformMat4(A,I,s.projectionMatrix),y.scale(e.positionNDC,A,1/A[3]),c.applyShaderOffsetsNDC(e.positionNDC,l,s,e.positionNDC,z),e.distanceWithoutPolygonOffset=s.depthNDCToWorld(z[2]),e.distance=z[2]===e.positionNDC[2]?e.distanceWithoutPolygonOffset:s.depthNDCToWorld(e.positionNDC[2]),w.set(A,e.positionNDC[0],e.positionNDC[1],e.positionNDC[2],1),w.transformMat4(I,A,t),w.scale(I,I,1/I[3]),y.set(e.positionView,x[0],x[1],x[2]),e},s.isCulledByHorizon=function(i,t,e){return y.copy(F.direction,i.positionView),y.set(F.origin,0,0,0),!!D.intersectRay(t,F,R)&&i.distanceWithoutPolygonOffset>e},s.isCulledBySlice=function(i,t){return i.slicePlaneEnabled&&this._runningViewState.slicePlaneEnabled&&_.boundedPlane.extrusionContainsPoint(this._runningViewState.slicePlane,t)},s.expandBoundingRect=function(i,t,e,{positionNDC:s,scaleInfo:r}){const n=this._runningViewState.camera,c=t.getScreenSize(q);C.applyPrecomputedScaleFactor(c,r.factor,c),c[0]*=n.pixelRatio,c[1]*=n.pixelRatio;const o=m.offset(e.calculateRelativeScreenBounds(c,r.factorAlignment.scale,T),d.lerp(0,n.fullWidth,.5+.5*s[0]),d.lerp(0,n.fullHeight,.5+.5*s[1])),a=this.iconMarginFactor;if(0!==a){const i=a*Math.min(m.width(o),m.height(o));o[0]-=i,o[1]-=i,o[2]+=i,o[3]+=i}m.expand(i.aabr,o)},s.isConflicted=function(i){const t=i.graphics3DGraphic.graphic.uid,e=i.info[this.visibilityGroup];for(let s=Math.floor(e.aabr[0]/this.accBinsSizeX);s<=Math.floor(e.aabr[2]/this.accBinsSizeX);s++)if(!(s<0||s>=this.accBinsNumX))for(let i=Math.floor(e.aabr[1]/this.accBinsSizeY);i<=Math.floor(e.aabr[3]/this.accBinsSizeY);i++){if(i<0||i>=this.accBinsNumY)continue;const r=this.accBins[s][i];for(let i=0;i<r.length;i++){const s=r.data[i],n=s.info[this.visibilityGroup];if(n&&n.visible&&(s.graphics3DGraphic.graphic.uid!==t&&(this.accNumTests++,m.intersects(n.aabr,e.aabr))))return!0}}return!1},s.initBins=function(i,t){if(null==this.accBins){this.accBins=[];for(let i=0;i<this.accBinsNumX;i++){this.accBins.push([]);const i=this.accBins[this.accBins.length-1];for(let t=0;t<this.accBinsNumY;t++)i.push(new p)}}else for(let e=0;e<this.accBinsNumX;e++)for(let i=0;i<this.accBinsNumY;i++)this.accBins[e][i].clear();this.accBinsSizeX=i/this.accBinsNumX,this.accBinsSizeY=t/this.accBinsNumY,this.accNumTests=0},s.addToBins=function(i){const t=i.info[this.visibilityGroup],e=Math.floor(t.aabr[0]/this.accBinsSizeX),s=Math.floor(t.aabr[2]/this.accBinsSizeX),r=Math.floor(t.aabr[1]/this.accBinsSizeY),n=Math.floor(t.aabr[3]/this.accBinsSizeY);for(let c=e;c<=s;c++)if(!(c<0||c>=this.accBinsNumX))for(let t=r;t<=n;t++)t<0||t>=this.accBinsNumY||this.accBins[c][t].push(i)},s.setGraphicVisibility=function(i,t){const e=i.graphics3DGraphic;e.destroyed||(e.setVisibilityFlag(3,t,this.visibilityGroup),1===this.visibilityGroup&&this.view.labeler.setLabelGraphicVisibility(e,t))},t._createClass(e,[{key:"dirty",get:function(){return this._dirty}},{key:"state",get:function(){return this._state}},{key:"updating",get:function(){return 0!==this._state||this._dirty}},{key:"updatingProgress",get:function(){if(!this.updating)return 1;const i=this._state/4;return this._dirty?.5*i:i}}]),e}(f),e.__decorate([o.property({constructOnly:!0})],i.Deconflictor.prototype,"view",void 0),e.__decorate([o.property({type:Boolean,readOnly:!0})],i.Deconflictor.prototype,"updating",null),i.Deconflictor=e.__decorate([a.subclass("esri.views.3d.layers.graphics.Deconflictor")],i.Deconflictor);const q=S.create();const J=new(function(){function i(){this.positionView=g.create(),this.positionNDC=g.create(),this.distance=0,this.distanceWithoutPolygonOffset=0,this.scaleInfo={factor:{scale:0,factor:0,minPixelSize:0,paddingPixels:0},factorAlignment:{scale:0,factor:0,minPixelSize:0,paddingPixels:0}}}return t._createClass(i,[{key:"isOutsideScreen",get:function(){const i=this.positionNDC;return i[0]<-1||i[1]<-1||i[2]<-1||i[0]>=1||i[1]>=1}}]),i}());i.DeconflictorGraphic=X,i.DeconflictorViewState=L,Object.defineProperty(i,"__esModule",{value:!0})}));
