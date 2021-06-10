/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","../../projectionEllipsoid","../../../core/unitUtils","../../../chunks/mat4","../../projection","../../../chunks/mat3f64","../../../chunks/mat4f64","../../../chunks/mat3","../../../views/3d/support/buffer/BufferView","./projection","../../../chunks/vec32"],(function(e,r,n,t,o,a,i,f,c,l,u,s){"use strict";function p(e,r,n){return B(r,n)?g(e,r,n):y(e,r,n)}function m(e,r,n){return B(r,n)?w(e,r,n):A(e,r,n)}function y(e,r,n){const t=new Float64Array(e.position.length),o=e.position,a=r.x,i=r.y,f=r.z||0,{horizontal:c,vertical:l}=R(n?n.unit:null,r.spatialReference);for(let u=0;u<o.length;u+=3)t[u+0]=o[u+0]*c+a,t[u+1]=o[u+1]*c+i,t[u+2]=o[u+2]*l+f;return{position:t,normal:e.normal,tangent:e.tangent}}function g(e,r,n){const t=r.spatialReference,o=T(r,n,j),a=new Float64Array(e.position.length),i=E(e.position,o,t,a),f=c.normalFromMat4(z,o);return{position:i,normal:F(i,a,e.normal,f,t),tangent:h(i,a,e.tangent,f,t)}}function E(e,r,n,t){s.transformMat4(l.BufferViewVec3f64.fromTypedArray(t),l.BufferViewVec3f64.fromTypedArray(e),r);const o=new Float64Array(e.length);return u.projectFromECEF(t,o,n)}function F(e,r,n,t,o){if(!n)return null;const a=new Float32Array(n.length);return s.transformMat3(l.BufferViewVec3f.fromTypedArray(a),l.BufferViewVec3f.fromTypedArray(n),t),u.projectNormalFromECEF(a,e,r,o,a),a}function h(e,r,n,t,o){if(!n)return null;const a=new Float32Array(n.length);s.transformMat3(l.BufferViewVec3f.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT),l.BufferViewVec3f.fromTypedArray(n,4*Float32Array.BYTES_PER_ELEMENT),t);for(let i=3;i<a.length;i+=4)a[i]=n[i];return u.projectTangentFromECEF(a,e,r,o,a),a}function A(e,r,n){const t=new Float64Array(e.position.length),o=e.position,a=r.x,i=r.y,f=r.z||0,{horizontal:c,vertical:l}=R(n?n.unit:null,r.spatialReference);for(let u=0;u<o.length;u+=3)t[u+0]=(o[u+0]-a)/c,t[u+1]=(o[u+1]-i)/c,t[u+2]=(o[u+2]-f)/l;return{position:t,normal:e.normal,tangent:e.tangent}}function w(e,r,n){const t=r.spatialReference;T(r,n,j);const a=o.invert(v,j),i=new Float64Array(e.position.length),f=V(e.position,t,a,i),l=c.normalFromMat4(z,a);return{position:f,normal:d(e.normal,e.position,i,t,l),tangent:M(e.tangent,e.position,i,t,l)}}function T(e,r,t){a.computeLinearTransformation(e.spatialReference,[e.x,e.y,e.z||0],t,n.getSphericalPCPF(e.spatialReference));const{horizontal:i,vertical:f}=R(r?r.unit:null,e.spatialReference);return o.scale(t,t,[i,i,f]),t}function V(e,r,n,t){const o=u.projectToECEF(e,r,t),a=l.BufferViewVec3f64.fromTypedArray(o),i=new Float64Array(o.length),f=l.BufferViewVec3f64.fromTypedArray(i);return s.transformMat4(f,a,n),i}function d(e,r,n,t,o){if(!e)return null;const a=u.projectNormalToECEF(e,r,n,t,new Float32Array(e.length)),i=l.BufferViewVec3f.fromTypedArray(a);return s.transformMat3(i,i,o),a}function M(e,r,n,t,o){if(!e)return null;const a=u.projectTangentToECEF(e,r,n,t,new Float32Array(e.length)),i=l.BufferViewVec3f.fromTypedArray(a,4*Float32Array.BYTES_PER_ELEMENT);return s.transformMat3(i,i,o),a}function B(e,r){const n=e.spatialReference;return n.isWGS84||n.isWebMercator&&(!r||!1!==r.geographic)}function R(e,n){if(r.isNone(e))return P;const o=n.isWGS84?1:t.getMetersPerUnit(n),a=n.isWGS84?1:t.getMetersPerVerticalUnitForSR(n),i=t.convertUnit(1,e,"meters");return{horizontal:i*o,vertical:i*a}}const j=f.create(),v=f.create(),z=i.create(),P={horizontal:1,vertical:1};e.georeference=p,e.ungeoreference=m,Object.defineProperty(e,"__esModule",{value:!0})}));
