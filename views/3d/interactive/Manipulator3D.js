/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/compilerUtils","../../../core/maybe","../../../core/accessorSupport/utils","../../../geometry/Point","../../../geometry","../../../core/Evented","../../../core/mathUtils","../../../core/screenUtils","../../../chunks/vec3f64","../../../chunks/vec3","../../../geometry/projectionEllipsoid","../../../chunks/mat4","../../../geometry/support/aaBoundingRect","../../../geometry/projection","../../../chunks/mat3f64","../../../chunks/mat4f64","../../../chunks/mat3","../../../chunks/vec2","../support/ElevationProvider","../support/stack","../support/geometryUtils","../webgl-engine/lib/Object3D","../webgl-engine/lib/Camera","../../../layers/graphics/hydratedFeatures","../webgl-engine/lib/WebGLLayer"],(function(e,t,i,n,s,o,r,a,c,l,h,u,d,_,f,g,m,y,p,v,b,L,S,R,j,w,O){"use strict";let E=function(){function e(e){this.idHint=0,this.camera=new j,this._elevation={offset:0,override:null},this.collisionType={type:"point"},this.collisionPriority=0,this._renderObjects=[],this.autoScaleRenderObjects=!0,this._available=!0,this._noDisplayCount=0,this._radius=10,this._worldSized=!1,this.focusMultiplier=2,this.touchMultiplier=2.5,this.worldOriented=!1,this._modelTransform=y.create(),this._worldFrame=null,this._renderLocation=h.create(),this._renderLocationDirty=!0,this._location=new o({x:0,y:0,z:0}),this._elevationAlignedLocation=new o,this._elevationAlignedLocationDirty=!0,this.interactive=!0,this.selectable=!1,this.grabbable=!0,this.cursor=null,this._grabbing=!1,this.dragging=!1,this._hovering=!1,this._selected=!1,this._state=0,this._focused=!1,this.events=new a.EventEmitter,this._screenLocation={screenPointArray:l.createScreenPointArray(),renderScreenPointArray:l.createRenderScreenPointArray3(),pixelSize:0},this._screenLocationDirty=!0,this._applyObjectTransform=null,this._engineResourcesAddedToStage=!1,this._engineResources=null,this._attached=!1,this._engineLayer=null,this._materialIdReferences=null,this._location.spatialReference=e.view.spatialReference;for(const t in e)this[t]=e[t];this.view.state&&this.view.state.camera&&this.camera.copyFrom(this.view.state.camera)}var r=e.prototype;return r.destroy=function(){this._removeResourcesFromStage(),this._engineResources=null,this.view=null,this.camera=null},r.disableDisplay=function(){return this._noDisplayCount++,1===this._noDisplayCount&&this._updateEngineObject(),{remove:s.once((()=>{this._noDisplayCount--,0===this._noDisplayCount&&this._updateEngineObject()}))}},r._updateElevationAlignedLocation=function(){this._elevationAlignedLocation.x=this.location.x,this._elevationAlignedLocation.y=this.location.y;const e=n.isSome(this._elevation.override)?this._elevation.override:this.location.z||0;this._elevationAlignedLocation.z=e+this._elevation.offset,this._elevationAlignedLocation.spatialReference=this.location.spatialReference,this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!1},r.grabbableForEvent=function(){return!0},r.updateStateEnabled=function(e,t){t?this.state|=e:this.state&=~e},r._setFocused=function(e){e!==this._focused&&(this._focused=e,this.events.emit("focus-changed",{action:!0===e?"focus":"unfocus"}))},r.ensureScreenLocation=function(){if(!this._screenLocationDirty)return;this._screenLocation.pixelSize=this.camera.computeScreenPixelSizeAt(this.renderLocation),this._screenLocationDirty=!1;let e;if(A(this._modelTransform)){const t=this._calculateModelTransformOffset(V);e=u.add(t,t,this.renderLocation)}else e=this.renderLocation;this.camera.projectToRenderScreen(e,this._screenLocation.renderScreenPointArray),this.camera.renderToScreen(this._screenLocation.renderScreenPointArray,this._screenLocation.screenPointArray)},r.intersectionDistance=function(e,t){if(!this.available)return null;const s=l.screenPointObjectToArray(e,P),o=this._getCollisionRadius(t),r=-1*this.collisionPriority;switch(this.collisionType.type){case"point":if(v.squaredDistance(this.screenLocation.screenPointArray,s)<o*o)return this.screenLocation.renderScreenPointArray[2]+r;break;case"line":{const e=this.collisionType.paths,t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,z),a=o*this.screenLocation.pixelSize,c=S.ray.fromScreen(this.camera,s,D);if(n.isNone(c))return null;for(const n of e){if(0===n.length)continue;const e=u.transformMat4(C,n[0],i);for(let t=1;t<n.length;t++){const s=u.transformMat4(x,n[t],i),o=S.lineSegment.closestRayDistance2(S.lineSegment.fromPoints(e,s,k),c);if(null!=o&&o<a*a){const t=u.add(L.sv3d.get(),e,s);u.scale(t,t,.5);const i=l.castRenderScreenPointArray(L.sv3d.get());return this.camera.projectToRenderScreen(t,i),i[2]+r}u.copy(e,s)}}break}case"disc":{var a;const e=this.collisionType.direction,t=null!=(a=this.collisionType.offset)?a:h.ZEROS,i=this._getWorldToScreenObjectScale(),c=this._calculateObjectTransform(i,z),l=o*this.screenLocation.pixelSize,d=S.ray.fromScreen(this.camera,s,D);if(n.isNone(d))return null;const _=p.fromMat4(M,c),f=u.transformMat3(W,e,_),g=u.transformMat4(B,t,c);S.plane.fromPositionAndNormal(g,f,I);const m=N;if(S.plane.intersectRay(I,d,m)&&u.squaredDistance(m,g)<l*l)return this.screenLocation.renderScreenPointArray[2]+r;break}case"ribbon":{const{paths:e,direction:t}=this.collisionType,i=this._getWorldToScreenObjectScale(),a=this._calculateObjectTransform(i,z),c=o*this.camera.computeScreenPixelSizeAt(this.renderLocation),h=S.ray.fromScreen(this.camera,s,D);if(n.isNone(h))return null;const d=p.fromMat4(M,a),_=u.transformMat3(W,t,d),f=this._calculateModelTransformPosition(B);S.plane.fromPositionAndNormal(f,_,I);const g=N;if(!S.plane.intersectRay(I,h,g))break;for(const n of e){if(0===n.length)continue;const e=u.transformMat4(C,n[0],a);for(let t=1;t<n.length;t++){const i=u.transformMat4(x,n[t],a),s=S.lineSegment.distance2(S.lineSegment.fromPoints(e,i,k),g);if(null!=s&&s<c*c){const t=u.add(L.sv3d.get(),e,i);u.scale(t,t,.5);const n=l.castRenderScreenPointArray(L.sv3d.get());return this.camera.projectToRenderScreen(t,n),n[2]+r}u.copy(e,i)}}break}default:i.neverReached(this.collisionType)}return null},r.attach=function(e={manipulator3D:{}}){var t;if(!this.view._stage)return;const i=e.manipulator3D;if(n.isNone(i.engineLayerId)){const e=new O.WebGLLayer({isPickable:!1});this.view._stage.add(e),i.engineLayerId=e.id,this._engineLayer=e}else null!=(t=this.view._stage)&&t.getObject&&(this._engineLayer=this.view._stage.getObject(i.engineLayerId));i.engineLayerReferences=(i.engineLayerReferences||0)+1,this._materialIdReferences=i.materialIdReferences,n.isNone(this._materialIdReferences)&&(this._materialIdReferences=new Map,i.materialIdReferences=this._materialIdReferences),this.camera.copyFrom(this.view.state.camera),this._attached=!0,this._updateEngineObject(),g.canProjectWithoutEngine(this._location.spatialReference,this.view.spatialReference)||(this.location=new o({x:0,y:0,z:0,spatialReference:this.view.spatialReference}))},r.detach=function(e={manipulator3D:{}}){const t=e.manipulator3D;t.engineLayerReferences--;const i=0===t.engineLayerReferences;i&&(t.engineLayerId=null),this._removeResourcesFromStage(i),this._engineResources=null,this._engineLayer=null,this._materialIdReferences=null,this._attached=!1},r.onViewChange=function(){this.camera.copyFrom(this.view.state.camera),this._screenLocationDirty=!0,this._updateEngineObject()},r.onElevationChange=function(e){g.projectPoint(this.location,H,e.spatialReference),f.containsPointObject(e.extent,H)&&(this.location=this._location)},r._evaluateElevationAlignment=function(e=this.location){if(n.isNone(this.elevationInfo))return!1;let t=null,i=0;const s=n.unwrapOr(this.elevationInfo.offset,0);switch(this.elevationInfo.mode){case"on-the-ground":t=n.unwrapOr(b.getElevationAtPoint(this.view.elevationProvider,e,"ground"),0);break;case"relative-to-ground":i=n.unwrapOr(b.getElevationAtPoint(this.view.elevationProvider,e,"ground"),0)+s;break;case"relative-to-scene":i=n.unwrapOr(b.getElevationAtPoint(this.view.elevationProvider,e,"scene"),0)+s;break;case"absolute-height":i=s}return(i!==this._elevation.offset||t!==this._elevation.override)&&(this._elevation.offset=i,this._elevation.override=t,!0)},r._updateEngineObject=function(){if(!this._attached)return;if(!this.available)return void this._removeResourcesFromStage();const e=this._getWorldToScreenObjectScale(),t=z;if(!0===this.autoScaleRenderObjects){const i=this._getFocusedSize(this._radius,this.focused)*e;this._calculateObjectTransform(i,t)}else this._calculateObjectTransform(e,t);const{objectsByState:i}=this._ensureEngineResources(),s=(this.focused?2:1)|(this.selected?8:4),o=this._noDisplayCount>0;for(const{stateMask:n,objects:r}of i){if(o){for(const e of r)e.setVisible(!1);continue}const e=!(0!=(15&n))||(s&n)==(15&n),i=!(0!=(65520&n))||(this.state&n)==(65520&n);if(e&&i)for(const n of r)n.setVisible(!0),n.transformation=t;else for(const t of r)t.setVisible(!1)}n.isSome(this._engineLayer)&&this._engineLayer.commit()},r._ensureEngineResources=function(){if(n.isNone(this._engineResources)){const e=n.unwrap(this._engineLayer),t=[],i=new Set;this.renderObjects.forEach((({material:e})=>{i.has(e)||(t.push(e),i.add(e))}));const s=(e,t)=>{const{geometry:i,material:n,transform:s}=t;Array.isArray(i)?i.forEach((t=>e.addGeometry(t,n,s))):e.addGeometry(i,n,s)},o=new Map;this._renderObjects.forEach((e=>{const t=new R.Object3D({castShadow:!1});s(t,e);const i=e.stateMask||0,n=o.get(i)||[];n.push(t),o.set(i,n)}));const r=[];o.forEach(((e,t)=>r.push({stateMask:t,objects:e}))),this._engineResources={objectsByState:r,layer:e,materials:t}}return this._addResourcesToStage(),this._engineResources},r._addResourcesToStage=function(){if(this._engineResourcesAddedToStage||n.isNone(this._engineResources))return;const{objectsByState:e,layer:t,materials:i}=this._engineResources;i.forEach((e=>{const t=n.unwrap(this._materialIdReferences),i=t.get(e.id)||0;0===i&&this.view._stage.add(e),t.set(e.id,i+1)})),e.forEach((({objects:e})=>e.forEach((e=>{t.add(e),this.view._stage.add(e)})))),this._engineResourcesAddedToStage=!0},r._removeResourcesFromStage=function(e=!1){if(!this._engineResourcesAddedToStage||n.isNone(this._engineResources))return;const{objectsByState:t,layer:i,materials:s}=this._engineResources;t.forEach((({objects:e})=>{i.removeMany(e),this.view._stage.removeMany(e)})),s.forEach((e=>{const t=n.unwrap(this._materialIdReferences),i=t.get(e.id);1===i?(this.view._stage.remove(e),t.delete(e.id)):t.set(e.id,i-1)})),e&&this.view._stage.remove(i),this._engineResourcesAddedToStage=!1},r._getCollisionRadius=function(e){return this._getFocusedSize(this.radius,!0)*("touch"===e?this.touchMultiplier:1)},r._getFocusedSize=function(e,t){return e*(t?this.focusMultiplier:1)},r._getWorldToScreenObjectScale=function(){return this._worldSized?1:this.screenLocation.pixelSize},r._calculateModelTransformPosition=function(e){const t=this._getWorldToScreenObjectScale(),i=this._calculateObjectTransform(t,F);return u.set(e,i[12],i[13],i[14])},r._calculateModelTransformOffset=function(e){const t=this._calculateModelTransformPosition(e);return u.subtract(e,t,this.renderLocation)},r._calculateObjectTransform=function(e,t){return _.set(t,e,0,0,0,0,e,0,0,0,0,e,0,0,0,0,1),this._worldFrame&&_.multiply(t,t,this._worldFrame),_.multiply(t,t,this._modelTransform),t[12]+=this.renderLocation[0],t[13]+=this.renderLocation[1],t[14]+=this.renderLocation[2],t[15]=1,n.isSome(this._applyObjectTransform)&&this._applyObjectTransform(t),t},t._createClass(e,[{key:"elevationInfo",get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this._elevationAlignedLocationDirty=!0,this._renderLocationDirty=!0,this._updateEngineObject()}},{key:"renderObjects",get:function(){return this._renderObjects},set:function(e){this._removeResourcesFromStage(),this._engineResources=null,this._renderObjects=e.slice(),this._updateEngineObject()}},{key:"available",get:function(){return this._available},set:function(e){e!==this._available&&(this._available=e,this._updateEngineObject())}},{key:"radius",get:function(){return this._radius},set:function(e){e!==this._radius&&(this._radius=e,this._updateEngineObject())}},{key:"worldSized",get:function(){return this._worldSized},set:function(e){e!==this._worldSized&&(this._worldSized=e,this._updateEngineObject())}},{key:"modelTransform",get:function(){return this._modelTransform},set:function(e){A(e)&&(this._screenLocationDirty=!0),_.copy(this._modelTransform,e),this._updateEngineObject()}},{key:"renderLocation",get:function(){return this._renderLocationDirty&&(this._renderLocationDirty=!1,this.view.renderCoordsHelper.toRenderCoords(this.elevationAlignedLocation,this._renderLocation),this.worldOriented?(this._worldFrame||(this._worldFrame=y.create()),T(this.view,this._renderLocation,this._worldFrame)):this._worldFrame&&(this._worldFrame=null)),this._renderLocation},set:function(e){this.view.renderCoordsHelper.fromRenderCoords(e,this._location),this.elevationAlignedLocation=this._location}},{key:"location",get:function(){return this._location},set:function(e){w.clonePoint(e,this._location),this._renderLocationDirty=!0,this._screenLocationDirty=!0,this._elevationAlignedLocationDirty=!0,this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}},{key:"elevationAlignedLocation",get:function(){return this._elevationAlignedLocationDirty?(this._evaluateElevationAlignment(),this._updateElevationAlignedLocation(),this._elevationAlignedLocation):this._elevationAlignedLocation},set:function(e){w.clonePoint(e,this._location),this._evaluateElevationAlignment(),this._location.z-=this._elevation.offset,this._updateElevationAlignedLocation(),this._updateEngineObject(),this.events.emit("location-update",{location:this._location})}},{key:"grabbing",get:function(){return this._grabbing},set:function(e){e!==this._grabbing&&(this._grabbing=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}},{key:"hovering",get:function(){return this._hovering},set:function(e){e!==this._hovering&&(this._hovering=e,this._setFocused(this._hovering||this._grabbing),this._updateEngineObject())}},{key:"selected",get:function(){return this._selected},set:function(e){e!==this._selected&&(this._selected=e,this._updateEngineObject(),this.events.emit("select-changed",{action:e?"select":"deselect"}))}},{key:"state",get:function(){return this._state},set:function(e){e!==this._state&&(this._state=e,this._updateEngineObject())}},{key:"focused",get:function(){return this._focused}},{key:"screenLocation",get:function(){return this.ensureScreenLocation(),this._screenLocation}},{key:"applyObjectTransform",get:function(){return this._applyObjectTransform},set:function(e){this._applyObjectTransform=e,this._screenLocationDirty=!0,this._updateEngineObject()}},{key:"test",get:function(){let e=!1;if(n.isSome(this._engineResources))for(const t in this._engineResources.objectsByState){const i=this._engineResources.objectsByState[t];for(const t of i.objects)if(t.isVisible){e=!0;break}if(e)break}return{areAnyResourcesVisible:e}}}]),e}();function A(e){return 0!==e[12]||0!==e[13]||0!==e[14]}function T(e,t,i){switch(e.viewingMode){case"local":return _.identity(i),!0;case"global":{const n=d.getReferenceEllipsoid(e.renderCoordsHelper.spatialReference);return g.sphericalPCPFtoLonLatElevation(t,0,C,0,n.radius),g.computeLatLonToENURotation(c.deg2rad(C[1]),c.deg2rad(C[0]),i),!0}}}const P=l.createScreenPointArray(),k=S.lineSegment.create(),D=S.ray.create(),M=m.create(),F=y.create(),z=y.create(),I=S.plane.create(),C=h.create(),x=h.create(),N=h.create(),W=h.create(),B=h.create(),V=h.create(),H=new o({x:0,y:0,z:0,spatialReference:null});e.Manipulator3D=E,Object.defineProperty(e,"__esModule",{value:!0})}));
