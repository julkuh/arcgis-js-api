/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../core/mathUtils","../../chunks/vec2f64","../../chunks/vec2"],(function(t,e,n,r){"use strict";function c(t,e){return t[0]*e[1]-t[1]*e[0]}function s(t,e,n){const c=(e[0]-t[0])*(n[1]-t[1])-(e[1]-t[1])*(n[0]-t[0]);return Math.abs(c)/r.distance(e,n)}function o(t,e,n){const c=r.dot(n,e)/r.squaredLength(n);return r.scale(t,n,c)}function a(t,e,n,c,s=n){return r.subtract(p,c,n),r.subtract(y,e,s),o(L,y,p),r.add(t,s,L)}function u(t,e,n,c){r.subtract(p,c,n),r.subtract(y,e,n);const s=r.dot(p,y)/r.squaredLength(p);return s>0?r.scaleAndAdd(t,n,p,s):r.copy(t,n)}function i(t,e,n,c){r.subtract(p,e,n);const s=c/r.length(p);return r.scaleAndAdd(t,n,p,s)}function d(t,r){return a(y,r,t.start,t.end),e.floatEqualAbsolute(y[0],r[0])&&e.floatEqualAbsolute(y[1],r[1])?[n.clone(r)]:[]}function l(t,r,c){return i(y,c,t,r),e.floatEqualAbsolute(y[0],c[0])&&e.floatEqualAbsolute(y[1],c[1])?[n.clone(c)]:[]}function f(t,e){const n=t.start,s=t.end,o=e.start,a=e.end,u=r.subtract(p,s,n),i=r.subtract(h,a,o),d=c(u,i);if(Math.abs(d)<=b)return[];const l=r.subtract(y,n,o),f=c(i,l)/d,A=c(u,l)/d;if(f>=0){if(A>=0||1===e.type)return[r.scaleAndAdd(L,n,u,f)]}else if(1===t.type&&(A>=0||1===e.type))return[r.scaleAndAdd(L,n,u,f)];return[]}function A(t,e,n){const c=[],s=r.subtract(p,t.end,t.start),o=r.subtract(h,t.start,e),a=r.squaredLength(s),u=2*r.dot(s,o),i=u*u-4*a*(r.squaredLength(o)-n*n);if(0===i){const e=-u/(2*a);(1===t.type||e>=0)&&c.push(r.scaleAndAdd(L,t.start,s,e))}else if(i>0){const e=Math.sqrt(i),n=(-u+e)/(2*a);(1===t.type||n>=0)&&c.push(r.scaleAndAdd(L,t.start,s,n));const o=(-u-e)/(2*a);(1===t.type||o>=0)&&c.push(r.scaleAndAdd(y,t.start,s,o))}return c}const b=1e-6,p=n.create(),h=n.create(),y=n.create(),L=n.create();t.cross=c,t.intersectCircleAndPoint=l,t.intersectLineAndPoint=d,t.intersectLineAndRay=f,t.intersectLineLikeAndCircle=A,t.pointToLineDistance=s,t.projectPoint=o,t.projectPointToCircle=i,t.projectPointToLine=a,t.projectPointToRay=u,Object.defineProperty(t,"__esModule",{value:!0})}));
