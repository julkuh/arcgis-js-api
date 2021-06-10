/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../geometry/projectionEllipsoid","../../../../geometry/projection","../../../../chunks/mat4f64","../../../../chunks/vec2f64","../../../../chunks/vec2","../../support/buffer/BufferView","../../../../chunks/plane"],(function(e,t,c,o,r,a,s,n,u,f,i){"use strict";function l(e,t,c,o=1){if(c.isGeographic){const e=new Float64Array(t.typedBuffer.length),o=3*t.count;for(let s=0;s<o;s+=3)a.lonLatToWebMercatorComparable(t.typedBuffer,s,e,s,r.getReferenceEllipsoid(c));t=f.BufferViewVec3f64.fromTypedArray(e)}u.set(b,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY);for(let r=0;r<t.count;r++)t.getVec(r,m),b[0]=Math.min(b[0],m[0]),b[1]=Math.min(b[1],m[1]);const s=b[0]%o,n=b[1]%o;T[0]=b[0]-s,T[1]=b[1]-n;for(let r=0;r<t.count;r++)t.getVec(r,m),e.setValues(r,(m[0]-T[0])/o,(m[1]-T[1])/o,T[0]/o,T[1]/o)}function d(e,t,c,r,a=1){o.set(N,1,0,0),o.set(h,0,1,0),o.set(V,0,0,1),Y(I,t),E(t,p)&&S(p,N,h,V,c,I),u.set(b,Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY),u.set(M,Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY);for(let u=0;u<t.count;u++){t.getVec(u,m);const e=o.dot(N,m),c=o.dot(h,m);b[0]=Math.min(b[0],e),b[1]=Math.min(b[1],c),M[0]=Math.max(M[0],e),M[1]=Math.max(M[1],c)}const s=o.dot(V,I);O(y,b[0],b[1],s,N,h,V),O(g,M[0],b[1],s,N,h,V),O(A,b[0],M[1],s,N,h,V),o.subtract(g,g,y),o.scale(g,g,.5),o.subtract(A,A,y),o.scale(A,A,.5),o.add(y,y,g),o.add(y,y,A);const n=b[0]%a,f=b[1]%a;T[0]=b[0]-n,T[1]=b[1]-f;for(let u=0;u<t.count;u++){t.getVec(u,m),e.setValues(u,(o.dot(N,m)-T[0])/a,(o.dot(h,m)-T[1])/a,T[0]/a,T[1]/a);for(let e=0;e<3;e++)r.set(u,e,y[e]),r.set(u,e+3,g[e]),r.set(u,e+6,A[e])}}const I=c.create(),m=c.create(),p=i.create(),N=c.create(),h=c.create(),V=c.create(),b=n.create(),M=n.create(),T=n.create(),y=c.create(),g=c.create(),A=c.create();function E(e,t){const c=e.count-1;return i.fromManyPointsSampleAt(e,t,0,Math.floor(c/3),Math.floor(c*(2/3)))}function S(e,c,r,a,s,n){t.isSome(s)?(s.basisMatrixAtPosition(n,_),o.set(F,_[0],_[1],_[2]),o.set(P,_[4],_[5],_[6]),o.set(k,_[8],_[9],_[10])):(o.set(F,1,0,0),o.set(P,0,1,0),o.set(k,0,0,1));const u=i.normal(e);o.dot(u,k)<0&&o.scale(u,u,-1),o.copy(a,u);const f=o.dot(u,P),l=o.dot(u,F);Math.abs(f)<Math.abs(l)?(o.scaleAndAdd(c,F,u,-l),o.normalize(c,c),o.cross(r,c,u),o.normalize(r,r),o.scale(r,r,-1)):(o.scaleAndAdd(r,P,u,-f),o.normalize(r,r),o.cross(c,r,u),o.normalize(c,c))}const _=s.create(),F=c.create(),P=c.create(),k=c.create();function Y(e,t){o.set(v,0,0,0);for(let c=0;c<t.count-1;c++)t.getVec(c,m),o.add(v,v,m);o.scale(e,v,1/(t.count-1))}const v=c.create();function O(e,t,c,r,a,s,n){o.set(e,t*a[0]+c*s[0]+r*n[0],t*a[1]+c*s[1]+r*n[1],t*a[2]+c*s[2]+r*n[2])}e.createMapSpaceUVCoords=d,e.createMapSpaceUVCoordsDraped=l,Object.defineProperty(e,"__esModule",{value:!0})}));
