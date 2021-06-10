/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./vec3f64","./vec3","./mat4","../core/ObjectStack","./vec4f64","./vec4","../views/3d/support/stack","./plane","./clipRay"],(function(e,t,r,n,c,i,o,s,a,f){"use strict";function u(e){return e?[a.create(e[0]),a.create(e[1]),a.create(e[2]),a.create(e[3]),a.create(e[4]),a.create(e[5])]:[a.create(),a.create(),a.create(),a.create(),a.create(),a.create()]}function l(){return[t.create(),t.create(),t.create(),t.create(),t.create(),t.create(),t.create(),t.create()]}function m(e,t=u()){for(let r=0;r<6;r++)a.copy(e[r],t[r])}function p(e,t,c,i=b){const a=n.multiply(s.sm4d.get(),t,e);n.invert(a,a);for(let n=0;n<8;++n){const e=o.transformMat4(s.sv4d.get(),R[n],a);r.set(i[n],e[0]/e[3],e[1]/e[3],e[2]/e[3])}P(c,i)}function P(e,t){a.fromPoints(t[4],t[0],t[3],e[0]),a.fromPoints(t[1],t[5],t[6],e[1]),a.fromPoints(t[4],t[5],t[1],e[2]),a.fromPoints(t[3],t[2],t[6],e[3]),a.fromPoints(t[0],t[1],t[2],e[4]),a.fromPoints(t[5],t[4],t[7],e[5])}function y(e,t){for(let r=0;r<6;r++)if(a.isSphereFullyInside(e[r],t))return!1;return!0}function d(e,t){return A(e,f.fromRay(t,I.get()))}function g(e,t){for(let r=0;r<6;r++){const n=e[r];if(!a.clipInfinite(n,t))return!1}return!0}function v(e,t,r){return A(e,f.fromLineSegmentAndDirection(t,r,I.get()))}function S(e,t){for(let r=0;r<6;r++){if(a.signedDistance(e[r],t)>0)return!1}return!0}function V(e,t){for(let r=0;r<6;r++)if(a.isAABBFullyInside(e[r],t))return!1;return!0}function A(e,t){for(let r=0;r<6;r++)if(!a.clip(e[r],t))return!1;return!0}const B={bottom:[5,1,0,4],near:[0,1,2,3],far:[5,4,7,6],right:[1,5,6,2],left:[4,0,3,7],top:[7,3,2,6]},R=[i.fromValues(-1,-1,-1,1),i.fromValues(1,-1,-1,1),i.fromValues(1,1,-1,1),i.fromValues(-1,1,-1,1),i.fromValues(-1,-1,1,1),i.fromValues(1,-1,1,1),i.fromValues(1,1,1,1),i.fromValues(-1,1,1,1)],I=new c.ObjectStack(f.create),b=l();var h=Object.freeze({__proto__:null,create:u,createPoints:l,copy:m,fromMatrix:p,computePlanes:P,intersectsSphere:y,intersectsRay:d,intersectClipRay:g,intersectsLineSegment:v,intersectsPoint:S,intersectsAABB:V,planePointIndices:B});e.computePlanes=P,e.copy=m,e.create=u,e.createPoints=l,e.fromMatrix=p,e.frustumModule=h,e.intersectClipRay=g,e.intersectsAABB=V,e.intersectsLineSegment=v,e.intersectsPoint=S,e.intersectsRay=d,e.intersectsSphere=y,e.planePointIndices=B}));
