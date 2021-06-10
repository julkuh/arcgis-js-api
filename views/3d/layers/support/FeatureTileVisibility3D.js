/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../core/ObjectPool","../../../../core/mathUtils","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../geometry/projectionEllipsoid","../../support/geometryUtils","./FeatureTileDescriptor3D","../../state/Frustum","../../support/FrustumExtentIntersection"],(function(e,t,i,s,r,n,u,a,o){"use strict";let l=function(){function e(e){this.renderCoordsHelper=e,this.surfaceElevation=0,this.cache=new Map,this.frustum=new a.Frustum(e),this.extendedFrustum=new a.Frustum(e),this.intersector=new o.FrustumExtentIntersection({renderCoordsHelper:e}),this.renderCoordsHelper=e}var i=e.prototype;return i.begin=function(e,t){this.surfaceElevation=t,this.aboveGround=this.renderCoordsHelper.getAltitude(e.eye)>t,this.frustum.update(e),this.shortenFrustumFarPlane(this.frustum),this.updateExtendedFrustum(e)},i.end=function(){this.cache.clear()},i.calculate=function(e){if(this.allTilesInvisible)return 0;const t=1===this.renderCoordsHelper.viewingMode&&e.lij[0]>=c&&e.lij[0]<d,i=this.getOrCalculateSingleTileVisibility(e,!t);return 0!==i&&t?this.calculateAggregatedChildrenVisibility(e):i},i.shortenFrustumFarPlane=function(e){const t=a.Frustum.nearFarLineIndices,i=e.mutablePoints;for(const r of t){const[e,t]=r,n=i[e],u=i[t];s.subtract(f,u,n),s.scale(f,f,m),s.add(i[t],n,f)}e.updatePoints(i)},i.calculateAggregatedChildrenVisibility=function(e){let t=0;const i=this.cache.get(e.id);if(null!=i)return i;const s=b.acquire();e.getChildren(s);for(const r of s){const e=this.calculate(r);if(0!==e&&(t=e,2===e))break}return b.release(s),this.cache.set(e.id,t),t},i.getOrCalculateSingleTileVisibility=function(e,t){const i=this.cache.get(e.id);if(null!=i)return i;const s=this.calculateSingleTileVisibility(e);return t&&this.cache.set(e.id,s),s},i.calculateSingleTileVisibility=function(e){if(!this.aboveGround&&1===this.renderCoordsHelper.viewingMode&&e.lij[0]<h){return 0===this.calculateSingleTileVisibilitySided(e,!1)?this.calculateSingleTileVisibilitySided(e,!0):void 0}return this.calculateSingleTileVisibilitySided(e,this.aboveGround)},i.calculateSingleTileVisibilitySided=function(e,t){this.intersector.update(e.extent,e.tilingScheme.spatialReference,this.surfaceElevation,t);const i=r.getReferenceEllipsoid(e.tilingScheme.spatialReference).radius;return this.intersector.isVisibleInFrustum(this.extendedFrustum,i)?this.intersector.isVisibleInFrustum(this.frustum,i,!0)?2:1:0},i.updateExtendedFrustum=function(e){this.extendedFrustum.update(e),this.shortenFrustumFarPlane(this.extendedFrustum);const i=this.renderCoordsHelper.worldUpAtPosition(e.eye,f);this.aboveGround||s.negate(i,i);const r=t.acosClamped(-s.dot(i,e.viewForward));if(this.allTilesInvisible=r>(Math.PI+e.fovY)/2,this.allTilesInvisible)return;if(this.hasExtendedFrustum=r>e.fovY/2,!this.hasExtendedFrustum)return;const u=this.extendedFrustumParameters(),a=this.extendedFrustum.mutablePoints;for(let t=0;t<4;t++){const e=u.pointIndices[t],i=a[e],r=this.renderCoordsHelper.getAltitude(i);if(u.needsAltitudeAdjustment(r)){switch(this.renderCoordsHelper.worldUpAtPosition(i,f),e){case 4:case 7:case 0:case 3:n.plane.projectVector(this.extendedFrustum.planes[0],f,f);break;case 5:case 6:case 1:case 2:n.plane.projectVector(this.extendedFrustum.planes[1],f,f)}s.scale(f,f,u.direction),this.renderCoordsHelper.intersectInfiniteManifold(n.ray.wrap(i,f),u.zWithMargin,i)}}if(this.extendedFrustum.updatePoints(a),n.plane.fromPoints(a[0],a[1],a[2],F),n.plane.fromPoints(a[1],a[2],a[3],g),s.dot(n.plane.normal(F),n.plane.normal(g))<0){const e=this.extendedFrustum.mutablePoints;this.aboveGround?[e[0],e[1]]=[e[1],e[0]]:[e[3],e[2]]=[e[2],e[3]],this.extendedFrustum.updatePoints(e)}},i.extendedFrustumParameters=function(){return this.aboveGround?this.extendedFrustumParametersAboveSurface():this.extendedFrustumParametersBelowSurface()},i.extendedFrustumParametersAboveSurface=function(){const e=this.surfaceElevation-p;return{zWithMargin:e,pointIndices:a.Frustum.planePointIndices.bottom,direction:-1,needsAltitudeAdjustment:t=>t>e}},i.extendedFrustumParametersBelowSurface=function(){const e=this.surfaceElevation+p;return{zWithMargin:e,pointIndices:a.Frustum.planePointIndices.top,direction:1,needsAltitudeAdjustment:t=>t<e}},e}();const c=2,d=6,h=12,m=.95,p=1,f=i.create(),F=n.plane.create(),g=n.plane.create(),b=new e(Array,(e=>{4!==e.length&&(e[0]=new u.FeatureTileDescriptor3D,e[1]=new u.FeatureTileDescriptor3D,e[2]=new u.FeatureTileDescriptor3D,e[3]=new u.FeatureTileDescriptor3D)}),(e=>{e[0].release(),e[1].release(),e[2].release(),e[3].release()}));return l}));
