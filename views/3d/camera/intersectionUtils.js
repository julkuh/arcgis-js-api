/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","../../../chunks/vec3f64","../../../chunks/vec3","../../../geometry/projectionEllipsoid","../../../geometry/support/aaBoundingRect","../webgl-engine/lib/Intersector"],(function(e,t,n,r,i,o,a){"use strict";function c(e,n,r,i){return t.isSome(e.renderCoordsHelper.fromRenderCoords(n.eye,p,i))&&o.containsPoint(r,p)}function s(e,n){return e.elevationProvider?t.unwrapOr(e.elevationProvider.getElevation(n[0],n[1],n[2],e.renderCoordsHelper.spatialReference,"ground"),0):0}function l(e,t,n,i){const o=e.state.camera.clone();t&&(o.eye=t),n&&(o.center=n),i&&(o.up=i),u(e,o.ray,y)||r.copy(y,o.center);const a=e.state.constraints,c=a.minimumPoiDistance;if(r.squaredDistance(o.eye,y)<c){const t=a.collision.enabled;r.copy(v,o.viewForward),r.scale(v,v,c),t?r.subtract(o.eye,y,v):r.add(y,o.eye,v);const n=e.renderCoordsHelper,i=n.getAltitude(o.eye),s=a.collision.elevationMargin;t&&i<s&&(r.subtract(v,y,o.eye),n.setAltitude(s,o.eye),r.add(y,o.eye,v))}return o.center=y,o}function d(e,t,n){if(!e.state.isGlobal)return!1;const i=s(e,t),o=e.stateManager.constraintsManager.nearFarHeuristic,{far:a}=o.compute(t,n,e.dataExtent,i,b),c=a*a;return r.squaredDistance(t,n)>c}function u(e,t,r=n.create()){let o=g[e.viewingMode];o||(o=new a.Intersector(e.state.mode),o.options.backfacesTerrain=!e.state.isGlobal,o.options.invisibleTerrain=!0,g[e.viewingMode]=o);const{isGlobal:c}=e.state;return!(!e.sceneIntersectionHelper.intersectRay(t,o,r)||d(e,t.origin,r))||(!(!e.renderCoordsHelper.intersectManifold(t,0,r)||d(e,t.origin,r))||!!c&&f(t,r,i.getReferenceEllipsoid(e.spatialReference).radius))}function f(e,t,n){const i=r.dot(e.origin,e.origin)-n*n,o=i>0?Math.sqrt(i)/3:1;return r.scale(t,e.direction,o/r.length(e.direction)),r.add(t,t,e.origin),!0}const g={},p=n.create(),y=n.create(),v=n.create(),b={near:0,far:0};e.cameraOnContentAlongViewDirection=l,e.eyeWithinExtent=c,e.surfaceElevationBelowRenderLocation=s,Object.defineProperty(e,"__esModule",{value:!0})}));
