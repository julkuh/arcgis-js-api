/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../geometry/SpatialReference","../../../chunks/vec3","../../../core/unitUtils","../../../chunks/mat4","../../../geometry/projection","../../../layers/graphics/dehydratedFeatures","./stack","./geometryUtils","./geometryUtils/coordinateSystem"],(function(t,e,o,i,n,s,r,c,a,l,d,u){"use strict";let h=function(){function t(t,e,o,i){this.viewingMode=t,this.spatialReference=e,this.unitInMeters=o,this.coordinateSystem=i,this._coordinateSystem=u.create(i)}var h=t.prototype;return h.getAltitude=function(t){return u.altitudeAt(this.coordinateSystem,t)},h.setAltitude=function(t,e){u.setAltitudeAt(this.coordinateSystem,e,t,e)},h.setAltitudeOfTransformation=function(t,e){u.setAltitudeOfTransformation(this.coordinateSystem,e,t,e)},h.worldUpAtPosition=function(t,e){return u.normalAt(this.coordinateSystem,t,e)},h.worldBasisAtPosition=function(t,e,o){return u.axisAt(this.coordinateSystem,t,e,o)},h.basisMatrixAtPosition=function(t,e){const o=this.worldBasisAtPosition(t,0,l.sv3d.get()),i=this.worldBasisAtPosition(t,1,l.sv3d.get()),n=this.worldBasisAtPosition(t,2,l.sv3d.get());return r.set(e,o[0],o[1],o[2],0,i[0],i[1],i[2],0,n[0],n[1],n[2],0,0,0,0,1),e},h.intersectManifoldClosestSilhouette=function(t,e,o){return u.elevate(this.coordinateSystem,e,this._coordinateSystem),u.intersectRayClosestSilhouette(this._coordinateSystem,t,o),o},h.intersectManifold=function(t,e,o){u.elevate(this.coordinateSystem,e,this._coordinateSystem);const i=l.sv3d.get();return!!u.intersectRay(this._coordinateSystem,t,i)&&(n.copy(o,i),!0)},h.intersectInfiniteManifold=function(t,e,o){if(1===this.viewingMode)return this.intersectManifold(t,e,o);u.elevate(this.coordinateSystem,e,this._coordinateSystem);const i=this._coordinateSystem.value,s=l.sv3d.get();return!!d.plane.intersectRay(i.plane,t,s)&&(n.copy(o,s),!0)},h.toRenderCoords=function(t,e,o){return a.isDehydratedPoint(t)?c.projectPointToVector(t,e,this.spatialReference):c.projectVectorToVector(t,e,o,this.spatialReference)},h.fromRenderCoords=function(t,e,n=null){return a.isDehydratedPoint(e)?(o.isSome(n)&&(e.spatialReference=n),c.projectVectorToDehydratedPoint(t,this.spatialReference,e)):e instanceof i?c.projectVectorToPoint(t,this.spatialReference,e):c.projectVectorToVector(t,this.spatialReference,e,n)?e:null},t.createGlobal=function(e){return new t(1,e,1,u.createGlobal(e))},t.createLocal=function(e){return new t(2,e,s.getMetersPerUnitForSR(e),u.createLocal())},t.createMode=function(e,o){switch(e){case 2:return t.createLocal(o);case 1:return t.createGlobal(o)}},e._createClass(t,[{key:"extent",set:function(t){t&&u.setExtent(this.coordinateSystem,t,this.coordinateSystem)}}]),t}();t.RenderCoordsHelper=h,Object.defineProperty(t,"__esModule",{value:!0})}));
