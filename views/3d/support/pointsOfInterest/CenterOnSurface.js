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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/mathUtils","../../../../core/accessorSupport/decorators","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../geometry/Point","../debugFlags","../earthUtils","../PropertiesPool","./PointOfInterest"],function(e,t,r,i,a,o,n,c,s,u,l,d,p){Object.defineProperty(t,"__esModule",{value:!0});var f=Array,h=function(e){function t(t){var r=e.call(this,t)||this;return r.propertiesPool=new d.default({location:s,renderLocation:f},r),r.currentSurfaceAltitude=0,r.latestSurfaceAltitude=0,r.distance=0,r.renderLocation=c.vec3f64.create(),r.updating=!1,r}return r(t,e),t.prototype.initialize=function(){var e=this;this._frameWorker=this.scheduler.registerTask(this.priority,function(){return e._measureSurfaceAltitude()},function(){return e.updating}),this._measureSurfaceAltitude()},t.prototype.destroy=function(){this._frameWorker&&(this._frameWorker.remove(),this._frameWorker=null),this.propertiesPool.destroy(),this.propertiesPool=null},Object.defineProperty(t.prototype,"location",{get:function(){var e=this.propertiesPool.get("location");return this.renderCoordsHelper.fromRenderCoords(this.renderLocation,e,this.state.spatialReference),e},enumerable:!0,configurable:!0}),t.prototype.updateRenderLocation=function(){this._set("updating",!0),this._updateRenderLocation()},t.prototype.update=function(){this._measureSurfaceAltitude(),this._updateRenderLocation()},Object.defineProperty(t.prototype,"estimatedSurfaceAltitude",{get:function(){return this.latestSurfaceAltitude},enumerable:!0,configurable:!0}),t.prototype._measureSurfaceAltitude=function(){this.latestSurfaceAltitude=this.estimateSurfaceAltitudeAtCenter(),this._updateRenderLocation(),this._set("updating",!1)},t.prototype._updateRenderLocation=function(){var e=v,t=this.calculateSurfaceIntersection(this.currentSurfaceAltitude,e),r=this.currentSurfaceAltitude!==this.latestSurfaceAltitude;!t&&r&&(t=this.calculateSurfaceIntersection(this.latestSurfaceAltitude,e))&&(this.currentSurfaceAltitude=this.latestSurfaceAltitude);var i=S;if(t&&this.latestSurfaceAltitudeChangesDistanceSignificantly(e,i)&&(n.vec3.copy(e,i),this.currentSurfaceAltitude=this.latestSurfaceAltitude),t){var a=n.vec3.distance(this.state.camera.eye,e);a!==this._get("distance")&&this._set("distance",a)}else{var o=this.state.camera;n.vec3.scale(e,o.viewForward,this._get("distance")),n.vec3.add(e,e,o.eye)}n.vec3.equals(this._get("renderLocation"),e)||this._set("renderLocation",n.vec3.copy(this.propertiesPool.get("renderLocation"),e))},t.prototype.calculateSurfaceIntersection=function(e,t){var r=this.state.camera;if(!this.renderCoordsHelper.intersectManifold(r.ray,e,t))return!1;if(this.state.isGlobal){var i=l.earthRadius+e,o=n.vec3.squaredLength(r.eye),c=o<i*i,s=n.vec3.distance(r.eye,t);if(c&&s>l.earthRadius/4){var u=i-Math.sqrt(o);return n.vec3.scale(t,r.viewForward,u),n.vec3.add(t,t,r.eye),!0}}else{var d=this.surface.ready&&this.surface.extent;d&&(t[0]=a.clamp(t[0],d[0],d[2]),t[1]=a.clamp(t[1],d[1],d[3]))}return!0},t.prototype.latestSurfaceAltitudeChangesDistanceSignificantly=function(e,t){if(this.latestSurfaceAltitude===this.currentSurfaceAltitude||null==e)return!1;if(this.calculateSurfaceIntersection(this.latestSurfaceAltitude,t)){var r=this.state.camera.eye,i=n.vec3.distance(r,e),a=n.vec3.distance(r,t),o=Math.abs(a-i);if(u.TESTS_DISABLE_UPDATE_THROTTLE_THRESHOLDS)return!0;if(o/i>y)return!0}return!1},i([o.property({constructOnly:!0})],t.prototype,"scheduler",void 0),i([o.property({constructOnly:!0})],t.prototype,"priority",void 0),i([o.property({readOnly:!0})],t.prototype,"distance",void 0),i([o.property({constructOnly:!0})],t.prototype,"estimateSurfaceAltitudeAtCenter",void 0),i([o.property({readOnly:!0,dependsOn:["renderLocation"]})],t.prototype,"location",null),i([o.property({readOnly:!0})],t.prototype,"renderLocation",void 0),i([o.property({readOnly:!0})],t.prototype,"updating",void 0),t=i([o.subclass("esri.views.3d.support.CenterOnSurface")],t)}(o.declared(p.PointOfInterest));t.CenterOnSurface=h;var y=.05,v=c.vec3f64.create(),S=c.vec3f64.create();t.default=h});