/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../views/3d/support/buffer/math/common"],(function(e,t){"use strict";function r(e,r,f){if(e.count!==r.count)return void t.logger.error("source and destination buffers need to have the same number of elements");const n=e.count,o=f[0],u=f[1],d=f[2],c=f[3],s=f[4],i=f[5],a=f[6],p=f[7],y=f[8],B=f[9],m=f[10],l=f[11],h=f[12],S=f[13],v=f[14],b=f[15],g=e.typedBuffer,M=e.typedBufferStride,_=r.typedBuffer,R=r.typedBufferStride;for(let t=0;t<n;t++){const e=t*M,r=t*R,f=_[r],n=_[r+1],j=_[r+2],w=_[r+3];g[e]=o*f+s*n+y*j+h*w,g[e+1]=u*f+i*n+B*j+S*w,g[e+2]=d*f+a*n+m*j+v*w,g[e+3]=c*f+p*n+l*j+b*w}}function f(e,r,f){if(e.count!==r.count)return void t.logger.error("source and destination buffers need to have the same number of elements");const n=e.count,o=f[0],u=f[1],d=f[2],c=f[3],s=f[4],i=f[5],a=f[6],p=f[7],y=f[8],B=e.typedBuffer,m=e.typedBufferStride,l=r.typedBuffer,h=r.typedBufferStride;for(let t=0;t<n;t++){const e=t*m,r=t*h,f=l[r],n=l[r+1],S=l[r+2],v=l[r+3];B[e]=o*f+c*n+a*S,B[e+1]=u*f+s*n+p*S,B[e+2]=d*f+i*n+y*S,B[e+3]=v}}function n(e,t,r){const f=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,u=t.typedBuffer,d=t.typedBufferStride;for(let c=0;c<f;c++){const e=c*o,t=c*d;n[e]=r*u[t],n[e+1]=r*u[t+1],n[e+2]=r*u[t+2],n[e+3]=r*u[t+3]}}function o(e,t,r){const f=Math.min(e.count,t.count),n=e.typedBuffer,o=e.typedBufferStride,u=t.typedBuffer,d=t.typedBufferStride;for(let c=0;c<f;c++){const e=c*o,t=c*d;n[e]=u[t]>>r,n[e+1]=u[t+1]>>r,n[e+2]=u[t+2]>>r,n[e+3]=u[t+3]>>r}}var u=Object.freeze({__proto__:null,transformMat4:r,transformMat3:f,scale:n,shiftRight:o});e.scale=n,e.shiftRight=o,e.transformMat3=f,e.transformMat4=r,e.vec4=u}));
