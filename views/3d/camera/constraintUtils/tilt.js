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

define(["require","exports","../../../../core/compilerUtils","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","./common","../../state/utils/viewUtils","../../support/earthUtils","../../support/geometryUtils","../../support/mathUtils"],function(e,t,r,a,n,i,s,c,o,u,l,d,p){function m(e,t,a,i,c){void 0===a&&(a=o.defaultApplyOptions),void 0===i&&(i=t),void 0===c&&(c=!0),t!==i&&i.copyFrom(t),F.eyeCenterDistance=0,F.requiresTwoSteps=!1;var u=v(e,t,a,void 0,F);if(0===u)return!1;switch(n.mat4.identity(O),n.mat4.rotate(O,O,-u,t.viewRight),a.tiltMode){case 1:s.vec3.transformMat4(D,t.viewForward,O),s.vec3.scale(D,D,F.eyeCenterDistance),s.vec3.add(i.center,t.eye,D);break;case 0:s.vec3.subtract(D,t.center,t.eye),s.vec3.transformMat4(D,D,O),s.vec3.subtract(i.eye,t.center,D);break;default:r.neverReached(a.tiltMode)}return s.vec3.transformMat4(i.up,i.up,O),i.markViewDirty(),!F.requiresTwoSteps||!c||m(e,i,a,i,!1)}function v(e,t,r,a,n){if(void 0===r&&(r=o.defaultApplyOptions),void 0===a&&(a=o.defaultApplyOptions),!e.state.constraints.tilt)return 0;var i=t.distance,s=e.state.constraints.tilt(i,b);return x(e,r,s),2===a.interactionType&&o.hasConstraintType(a.selection,2)&&S(e,a.interactionStartCamera,s),1===r.tiltMode||1===a.tiltMode?y(e,t,s,n):f(e,t,s)}function f(e,t,r){var n=u.viewAngle(e.renderCoordsHelper,t.center,t.eye),i=a.clamp(n,r.min,r.max),s=n-i;return w(s)?s:0}function y(e,t,a,n){switch(n&&(n.requiresTwoSteps=!1),e.viewingMode){case"global":return M(e,t,a,n);case"local":return h(e,t,a,n);default:r.neverReached(e.viewingMode)}}function h(e,t,r,n){var i=u.viewAngle(e.renderCoordsHelper,t.center,t.eye),s=a.clamp(i,r.min,r.max),c=i-s;if(!w(c))return 0;if(n){var o=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,l=e.renderCoordsHelper.getAltitude(t.eye)-o,d=Math.cos(s);Math.abs(d)>1e-4?n.eyeCenterDistance=l/d:n.eyeCenterDistance=t.distance}return c}function M(e,t,r,n){var i=C(e,t,q),s=a.clamp(i.tiltAtCenter,r.min,r.max);if(!w(i.tiltAtCenter-s))return 0;var c,o;return i.centerIsOnSurface?(c=A(i),o=I(i,c)):(c=i.constraints.clampTilt(i.eyeCenterDistance,i.tiltAtCenter),n&&c<Math.PI/2&&(n.requiresTwoSteps=!0,c=Math.PI/2-1e-5),o=R(i,c)),n&&(n.eyeCenterDistance=g(i,c)),o}function C(e,t,r){var a=e.pointsOfInterest.centerOnSurfaceFrequent.estimatedSurfaceAltitude,n=a+l.earthRadius,i=e.renderCoordsHelper.intersectManifold(t.ray,a,T);return r.eyeCenterDistance=t.distance,i?(r.eyeCenterDistance=s.vec3.distance(t.eye,T),r.tiltAtCenter=u.viewAngle(e.renderCoordsHelper,T,t.eye)):e.state.isLocal?r.tiltAtCenter=u.viewAngle(e.renderCoordsHelper,t.center,t.eye):(d.sphere.closestPointOnSilhouette(d.sphere.wrap(n),t.ray,T),r.eyeCenterDistance=s.vec3.distance(t.eye,T),r.tiltAtCenter=p.acos(-s.vec3.dot(t.viewForward,s.vec3.normalize(T,T)))),r.radius=n,r.eyeRadius=s.vec3.length(t.eye),r.constraints=e.state.constraints,r.centerIsOnSurface=i,r}function w(e){return Math.abs(e)>1e-9}function A(e){var t=e.constraints,r=e.eyeCenterDistance,a=e.tiltAtCenter,n=a,i=t.clampTilt(r,a),s=g(e,i);if(t.clampTilt(s,a)===i)return i;for(var c=0;c<10&&w(i-n);){var o=(n+i)/2,u=g(e,o);w(t.clampTilt(u,o)-o)?n=o:i=o,c++}return i}function g(e,t){if(!e.centerIsOnSurface)return e.eyeCenterDistance;var r=Math.PI-a.clamp(t,0,Math.PI),n=p.asin(e.radius/e.eyeRadius*Math.sin(r)),i=Math.PI-r-n,s=Math.sin(i)/Math.sin(r);if(e.eyeRadius<e.radius&&s>1){var c=Math.PI-n,o=Math.PI-r-c;return Math.sin(o)/Math.sin(r)*e.eyeRadius}return s*e.eyeRadius}function I(e,t){var r=p.asin(e.radius/e.eyeRadius*Math.sin(e.tiltAtCenter)),a=p.asin(e.radius/e.eyeRadius*Math.sin(t));return e.eyeRadius>e.radius?r-a:a-r}function R(e,t){return e.tiltAtCenter-Math.PI/2-(t-Math.PI/2)}function x(e,t,r){if(0!==t.interactionType){var a=t.interactionStartCamera,n=t.interactionFactor,i=r.min,s=r.max,c=v(e,a,o.defaultApplyOptions,t),l=0===c?0:u.viewAngle(e.renderCoordsHelper,a.center,a.eye);r.min=i,r.max=s,2===t.interactionType?(o.hasConstraintType(t.selection,2)&&S(e,a,r),o.adjustRangeForInteraction(c,l,!0,n,P,r)):o.adjustRangeForInteraction(c,l,!1,n,P,r)}}function S(e,t,r){if(!e.state.isLocal){var a=e.state.constraints;if(a.altitude){var n=s.vec3.squaredLength(t.center),i=Math.sqrt(n),c=t.distance,o=a.altitude.min+l.earthRadius,u=a.altitude.max+l.earthRadius,d=(o*o-c*c-n)/(-2*i*c),m=(u*u-c*c-n)/(-2*i*c);r.min=Math.max(r.min,Math.min(Math.PI-p.acos(m),r.max)),r.max=Math.min(r.max,Math.PI-p.acos(d))}}}Object.defineProperty(t,"__esModule",{value:!0}),t.apply=m,t.error=v;var D=c.vec3f64.create(),O=i.mat4f64.create(),T=c.vec3f64.create(),P=p.deg2rad(5),b={min:0,max:0},q={constraints:null,radius:0,eyeRadius:0,centerIsOnSurface:!0,eyeCenterDistance:0,tiltAtCenter:0},F={eyeCenterDistance:0,requiresTwoSteps:!1}});