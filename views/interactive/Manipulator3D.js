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

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","../../core/Accessor","../../core/Collection","../../core/compilerUtils","../../core/maybe","../../core/screenUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/ensureType","../../core/libs/gl-matrix-2/mat3","../../core/libs/gl-matrix-2/mat3f64","../../core/libs/gl-matrix-2/mat4","../../core/libs/gl-matrix-2/mat4f64","../../core/libs/gl-matrix-2/vec2","../../core/libs/gl-matrix-2/vec2f32","../../core/libs/gl-matrix-2/vec3","../../core/libs/gl-matrix-2/vec3f64","../../geometry/support/aaBoundingRect","../../layers/graphics/dehydratedFeatures","../3d/support/geometryUtils","../3d/support/stack","../3d/webgl-engine/lib/Intersector","../3d/webgl-engine/lib/intersectorUtils","../3d/webgl-engine/lib/Layer","../3d/webgl-engine/lib/Object3D","../3d/webgl-engine/parts/Model"],function(e,t,r,i,n,o,s,a,c,l,p,u,d,h,f,_,y,g,b,m,v,P,S,O,j,R,T,A){function w(e){return 0!==e[12]||0!==e[13]||0!==e[14]}Object.defineProperty(t,"__esModule",{value:!0});var E=function(e){function t(t){var r=e.call(this)||this;return r.hideOnGrab=!1,r.moveOnDrag=!0,r.snapToPointer=!0,r.collisionType={type:"point"},r.collisionPriority=0,r.renderObjects=[],r.autoScaleRenderObjects=!0,r._radius=10,r._worldSized=!1,r._focusMultiplier=2,r._touchMultiplier=2.5,r.interactive=!0,r.selectable=!1,r.dragging=!1,r._areAnyEngineObjectsVisible=!1,r._position=b.vec3f64.create(),r._modelTransform=f.mat4f64.create(),r._dragOffset=null,r._dirtyScreenPoint=c.createScreenPoint(),r._dirtyScreenPointArray=c.createScreenPointArray(),r._dirtyRenderScreenPointArray=c.createRenderScreenPointArray3(),r._dirtyOriginScreenPointArray=c.createScreenPointArray(),r._dirtyScreenPixelSize=1,r._screenPositionDirty=!0,r._engineResourcesAddedToStage=!1,r._engineResources=null,r._attached=!1,r._engineLayerId=null,r._materialIdReferences=null,r._hitResult={onSurface:!1,surfaceType:"ground"},r._handlers=new o,r}return i(t,e),t.prototype.initialize=function(){this._intersector=new O(this.view.viewingMode),this._mapPoint=v.makeDehydratedPoint(0,0,0,this.view.spatialReference)},t.prototype.destroy=function(){this._handlers.removeAll(),this._handlers=null,this._removeResourcesFromStage(),this._engineResources=null,this._set("view",null),this._camera=null},Object.defineProperty(t.prototype,"alignment",{get:function(){return this._get("alignment")},set:function(e){this._set("alignment",e),this.constructed&&this._refreshMapPoint()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"visible",{set:function(e){e!==this._get("visible")&&(this._set("visible",e),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"radius",{get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"worldSized",{get:function(){return this._worldSized},set:function(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"focusMultiplier",{get:function(){return this._focusMultiplier},set:function(e){this._focusMultiplier=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"touchMultiplier",{get:function(){return this._touchMultiplier},set:function(e){this._touchMultiplier=e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"modelTransform",{get:function(){return this._modelTransform},set:function(e){w(e)&&(this._screenPositionDirty=!0),h.mat4.copy(this._modelTransform,e),this._updateEngineObject()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"position",{get:function(){return this._position},set:function(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._mapPoint,this._mapPoint.spatialReference),this._refreshMapPoint()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapPoint",{get:function(){return this._mapPoint},set:function(e){v.clonePoint(e,this._mapPoint),this._refreshMapPoint()},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"grabbing",{set:function(e){e!==this._get("grabbing")&&(this._set("grabbing",e),this._updateEngineObject()),e||(this._dragOffset=null)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hovering",{set:function(e){e!==this._get("hovering")&&(this._set("hovering",e),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"selected",{set:function(e){e!==this._get("selected")&&(this._set("selected",e),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{set:function(e){e!==this._get("state")&&(this._set("state",e),this._updateEngineObject())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"areAnyEngineObjectsVisible",{get:function(){return this._areAnyEngineObjectsVisible},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"surfaceType",{get:function(){return this._hitResult.onSurface?this._hitResult.surfaceType:null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"focused",{get:function(){return this._focused},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_focused",{get:function(){return this._get("hovering")||this._get("grabbing")},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"screenPoint",{get:function(){return this._updateScreenSpaceProperties(),this._dirtyScreenPoint},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_screenPointArray",{get:function(){return this._updateScreenSpaceProperties(),this._dirtyScreenPointArray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_renderScreenPointArray",{get:function(){return this._updateScreenSpaceProperties(),this._dirtyRenderScreenPointArray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_originScreenPointArray",{get:function(){return this._updateScreenSpaceProperties(),this._dirtyOriginScreenPointArray},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_screenPixelSize",{get:function(){return this._updateScreenSpaceProperties(),this._dirtyScreenPixelSize},enumerable:!0,configurable:!0}),t.prototype._updateScreenSpaceProperties=function(){if(this._screenPositionDirty){this._screenPositionDirty=!1,this._dirtyScreenPixelSize=this._camera.computeScreenPixelSizeAt(this._position);var e,t=w(this._modelTransform);if(t){var r=this._calculateModelTransformOffset(G);e=g.vec3.add(r,r,this._position)}else e=this._position;this._camera.projectPoint(e,this._dirtyRenderScreenPointArray),this._camera.renderToScreen(this._dirtyRenderScreenPointArray,this._dirtyScreenPointArray),c.screenPointArrayToObject(this._dirtyScreenPointArray,this._dirtyScreenPoint),t?(this._camera.projectPoint(this._position,C),this._camera.renderToScreen(C,this._dirtyOriginScreenPointArray)):_.vec2.copy(this._dirtyOriginScreenPointArray,this._dirtyScreenPointArray)}},t.prototype.intersectionDistance=function(e,t){if(!this._get("visible"))return null;var r=c.screenPointObjectToArray(e,I),i=this._getCollisionRadius(t),n=-1*this._get("collisionPriority");switch(this.collisionType.type){case"point":if(_.vec2.squaredDistance(this._screenPointArray,r)<i*i)return this._renderScreenPointArray[2]+n;break;case"line":for(var o=this.collisionType.paths,a=this._getWorldToScreenObjectScale(),l=this._calculateObjectTransform(a,k),p=i*this._screenPixelSize,d=P.ray.fromScreen(this._camera,r,D),h=0,f=o;h<f.length;h++){var y=f[h];if(0!==y.length)for(var b=g.vec3.transformMat4(F,y[0],l),m=1;m<y.length;m++){var v=g.vec3.transformMat4(B,y[m],l),O=P.lineSegment.closestRayDistance2(P.lineSegment.fromPoints(b,v,x),d);if(null!=O&&O<p*p){var j=g.vec3.add(S.sv3d.get(),b,v);g.vec3.scale(j,j,.5);var R=c.castRenderScreenPointArray(S.sv3d.get());return this._camera.projectPoint(j,R),R[2]+n}g.vec3.copy(b,v)}}break;case"disc":var T=this.collisionType.direction,a=this._getWorldToScreenObjectScale(),l=this._calculateObjectTransform(a,k),p=i*this._screenPixelSize,d=P.ray.fromScreen(this._camera,r,D),A=u.mat3.fromMat4(z,l),w=g.vec3.transformMat3(V,T,A),E=this._calculateModelTransformPosition(W);P.plane.fromPositionAndNormal(E,w,N);var M=H;if(P.plane.intersectRay(N,d,M)&&g.vec3.squaredDistance(M,E)<p*p)return this._renderScreenPointArray[2]+n;break;case"ribbon":var C=this.collisionType,o=C.paths,T=C.direction,a=this._getWorldToScreenObjectScale(),l=this._calculateObjectTransform(a,k),p=i*this._camera.computeScreenPixelSizeAt(this._position),d=P.ray.fromScreen(this._camera,r,D),A=u.mat3.fromMat4(z,l),w=g.vec3.transformMat3(V,T,A),E=this._calculateModelTransformPosition(W);P.plane.fromPositionAndNormal(E,w,N);var M=H;if(!P.plane.intersectRay(N,d,M))break;for(var L=0,G=o;L<G.length;L++){var y=G[L];if(0!==y.length)for(var b=g.vec3.transformMat4(F,y[0],l),m=1;m<y.length;m++){var v=g.vec3.transformMat4(B,y[m],l),O=P.lineSegment.distance2(P.lineSegment.fromPoints(b,v,x),M);if(null!=O&&O<p*p){var j=g.vec3.add(S.sv3d.get(),b,v);g.vec3.scale(j,j,.5);var R=c.castRenderScreenPointArray(S.sv3d.get());return this._camera.projectPoint(j,R),R[2]+n}g.vec3.copy(b,v)}}break;default:s.neverReached(this.collisionType)}return null},t.prototype.attemptDragTo=function(e){if(!this.moveOnDrag)return this._handlers.forEach(function(t){var r=t.type,i=t.handler;"drag"===r&&i(e)}),!1;var t=c.screenPointObjectToArray(e.screenPoint,I);a.isNone(this._dragOffset)&&this.grabbing&&!this.snapToPointer&&(this._dragOffset=_.vec2.subtract(y.vec2f32.create(),t,this._originScreenPointArray)),a.isSome(this._dragOffset)&&_.vec2.subtract(t,t,this._dragOffset);var r=this.view.sceneIntersectionHelper.intersectToolIntersectorScreen(t,this._intersector,"on-the-ground"===this.alignment?M:null),i=r.results.min,n=H;return i.getIntersectionPoint(n)?(this.position=n,this._hitResult.onSurface=!0,this._hitResult.surfaceType="TerrainRenderer"===i.intersector?"ground":"feature",this._handlers.forEach(function(t){var r=t.type,i=t.handler;"drag"===r&&i(e)})):this._hitResult.onSurface=!1,this._hitResult.onSurface},t.prototype.grab=function(e){this._handlers.forEach(function(t){var r=t.type,i=t.handler;"grab"===r&&i(e)})},t.prototype.click=function(e){this._handlers.forEach(function(t){var r=t.type,i=t.handler;"click"===r&&i(e)})},t.prototype.on=function(e,t){this._handlers.push({type:e,handler:t})},t.prototype.attach=function(e){if(void 0===e&&(e={manipulator3D:{}}),this.view._stage){var t=e.manipulator3D;if(this._engineLayerId=t.engineLayerId,a.isNone(this._engineLayerId)){var r=new R("manipulator-3d",{isPickable:!1});this.view._stage.add(A.ContentType.LAYER,r),this.view._stage.addToViewContent([r.id]),this._engineLayerId=r.id,t.engineLayerId=r.id}t.engineLayerReferences=(t.engineLayerReferences||0)+1,this._materialIdReferences=t.materialIdReferences,a.isNone(this._materialIdReferences)&&(this._materialIdReferences=new Map,t.materialIdReferences=this._materialIdReferences),this._camera=this.view.state.camera,this._attached=!0,this._updateEngineObject()}},t.prototype.detach=function(e){void 0===e&&(e={manipulator3D:{}});var t=e.manipulator3D;t.engineLayerReferences--;var r=0===t.engineLayerReferences;r&&(t.engineLayerId=null),this._removeResourcesFromStage(r),this._engineResources=null,this._engineLayerId=null,this._materialIdReferences=null,this._camera=null,this._attached=!1},t.prototype.onCameraChange=function(e){this._camera=e,this._screenPositionDirty=!0,this._updateEngineObject()},t.prototype.onElevationChange=function(e){this.view.renderCoordsHelper.fromRenderCoords(this.position,U,e.spatialReference)&&m.containsPoint(e.extent,U)&&this._refreshMapPoint(!0)},t.prototype._refreshMapPoint=function(e){switch(void 0===e&&(e=!1),this.alignment){case"none":break;case"on-the-ground":var t=this.view.elevationProvider.getElevation(this.mapPoint,"ground");if(!(t!==this._mapPoint.z||!e))return;this._mapPoint.z=t;break;default:s.neverReached(this.alignment)}this._screenPositionDirty=!0,this._hitResult.onSurface=!1,this.view.renderCoordsHelper.toRenderCoords(this._mapPoint,this._position),this._updateEngineObject()},t.prototype._updateEngineObject=function(){if(this._areAnyEngineObjectsVisible=!1,this._attached){if(!1===this._get("visible"))return void this._removeResourcesFromStage();var e=this._getWorldToScreenObjectScale(),t=k;if(!0===this._get("autoScaleRenderObjects")){var r=this._getFocusedSize(this._radius,this._focused)*e;this._calculateObjectTransform(r,t)}else this._calculateObjectTransform(e,t);for(var i=this._ensureEngineResources().objectsByState,n=(this._focused?2:1)|(this._get("selected")?8:4),o=this._get("hideOnGrab")&&this._get("grabbing"),s=0,a=i;s<a.length;s++){var c=a[s],l=c.stateMask,p=c.objects;if(o)for(var u=0,d=p;u<d.length;u++){var h=d[u];h.hideAllComponents()}else{var f=0!=(15&l),_=0!=(65520&l),y=!f||(n&l)==(15&l),g=!_||(this._get("state")&l)==(65520&l);if(y&&g)for(var b=0,m=p;b<m.length;b++){var h=m[b];h.unhideAllComponents(),h.objectTransformation=t,this._areAnyEngineObjectsVisible=!0}else for(var v=0,P=p;v<P.length;v++){var h=P[v];h.hideAllComponents()}}}}},t.prototype._ensureEngineResources=function(){if(a.isNone(this._engineResources)){var e=this.view._stage.get(A.ContentType.LAYER,a.expect(this._engineLayerId)),t=[],r=new Set;this.renderObjects.forEach(function(e){var i=e.material;r.has(i)||(t.push(i),r.add(i))});var i=function(e,t){var r=t.geometry,i=t.material,n=t.transform;Array.isArray(r)?r.forEach(function(t){return e.addGeometry(t,i,n)}):e.addGeometry(r,i,n)},n=new Map;this.renderObjects.forEach(function(e){var t=new T({idHint:"manipulator"});i(t,e);var r=e.stateMask||0,o=n.get(r)||[];o.push(t),n.set(r,o)});var o=[];n.forEach(function(e,t){o.push({stateMask:t,objects:e})}),this._engineResources={objectsByState:o,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources},t.prototype._addResourcesToStage=function(){var e=this;if(!this._engineResourcesAddedToStage&&!a.isNone(this._engineResources)){var t=this._engineResources,r=t.objectsByState,i=t.layer;t.materials.forEach(function(t){var r=a.expect(e._materialIdReferences),i=r.get(t.id)||0;0===i&&e.view._stage.add(A.ContentType.MATERIAL,t),r.set(t.id,i+1)}),r.forEach(function(t){t.objects.forEach(function(t){i.addObject(t),e.view._stage.add(A.ContentType.OBJECT,t)})}),this._engineResourcesAddedToStage=!0}},t.prototype._removeResourcesFromStage=function(e){var t=this;if(void 0===e&&(e=!1),this._engineResourcesAddedToStage&&!a.isNone(this._engineResources)){var r=this._engineResources,i=r.objectsByState,n=r.layer,o=r.materials;i.forEach(function(e){e.objects.forEach(function(e){n.removeObject(e),t.view._stage.remove(A.ContentType.OBJECT,e.id)})}),o.forEach(function(e){var r=a.expect(t._materialIdReferences),i=r.get(e.id);1===i?(t.view._stage.remove(A.ContentType.MATERIAL,e.id),r.delete(e.id)):r.set(e.id,i-1)}),e&&this.view._stage.remove(A.ContentType.LAYER,n.id),this._engineResourcesAddedToStage=!1}},t.prototype._getCollisionRadius=function(e){return this._getFocusedSize(this._radius,!0)*("touch"===e?this._touchMultiplier:1)},t.prototype._getFocusedSize=function(e,t){return e*(t?this._focusMultiplier:1)},t.prototype._getWorldToScreenObjectScale=function(){return this._worldSized?1:this._screenPixelSize},t.prototype._calculateModelTransformPosition=function(e){var t=this._getWorldToScreenObjectScale(),r=this._calculateObjectTransform(t,L);return g.vec3.set(e,r[12],r[13],r[14])},t.prototype._calculateModelTransformOffset=function(e){var t=this._calculateModelTransformPosition(e);return g.vec3.subtract(e,t,this._position)},t.prototype._calculateObjectTransform=function(e,t){return h.mat4.set(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),h.mat4.multiply(t,t,this._modelTransform),t[12]+=this._position[0],t[13]+=this._position[1],t[14]+=this._position[2],t[15]=1,t},r([l.property({constructOnly:!0,nonNullable:!0})],t.prototype,"view",void 0),r([l.property({value:"none",nonNullable:!0})],t.prototype,"alignment",null),r([l.property()],t.prototype,"hideOnGrab",void 0),r([l.property()],t.prototype,"moveOnDrag",void 0),r([l.property()],t.prototype,"snapToPointer",void 0),r([l.property()],t.prototype,"collisionType",void 0),r([l.property({type:p.Integer})],t.prototype,"collisionPriority",void 0),r([l.property({constructOnly:!0})],t.prototype,"renderObjects",void 0),r([l.property()],t.prototype,"autoScaleRenderObjects",void 0),r([l.property({value:!0})],t.prototype,"visible",null),r([l.property()],t.prototype,"radius",null),r([l.property()],t.prototype,"worldSized",null),r([l.property()],t.prototype,"focusMultiplier",null),r([l.property()],t.prototype,"touchMultiplier",null),r([l.property()],t.prototype,"interactive",void 0),r([l.property()],t.prototype,"selectable",void 0),r([l.property({value:!1})],t.prototype,"grabbing",null),r([l.property()],t.prototype,"dragging",void 0),r([l.property({value:!1})],t.prototype,"hovering",null),r([l.property({value:!1})],t.prototype,"selected",null),r([l.property({value:0})],t.prototype,"state",null),r([l.property({dependsOn:["hovering","grabbing"]})],t.prototype,"focused",null),t=r([l.subclass("esri.views.interactive.Manipulator3D")],t)}(l.declared(n));t.Manipulator3D=E;var M={include:new Set};M.include.add(j.TERRAIN_ID);var I=c.createScreenPointArray(),C=c.createRenderScreenPointArray3(),x=P.lineSegment.create(),D=P.ray.create(),z=d.mat3f64.create(),L=f.mat4f64.create(),k=f.mat4f64.create(),N=P.plane.create(),F=b.vec3f64.create(),B=b.vec3f64.create(),H=b.vec3f64.create(),V=b.vec3f64.create(),W=b.vec3f64.create(),G=b.vec3f64.create(),U=b.vec3f64.create()});