/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../geometry/SpatialReference","../geometry/support/webMercatorUtils","../geometry/Extent","../core/mathUtils","./vec3f64","./vec3","../views/3d/support/mathUtils","../geometry/projectionEllipsoid","./mat4","./mat4f64","../views/3d/support/earthUtils","../views/3d/support/cameraUtilsInternal"],(function(e,t,a,n,i,r,o,s,c,l,d,h,u){"use strict";const p=r.fromValues(0,0,1),y=o.normalize(r.create(),r.fromValues(1,1,1)),f=new s.Cyclical(-180,180),g=d.create(),M=r.create(),m=r.create();function T(e,t,a,n=u.createDirectionUp()){o.cross(M,e,p),0===o.dot(M,M)&&o.cross(M,e,y),l.identity(g),l.rotate(g,g,-i.deg2rad(t),e),l.rotate(g,g,-i.deg2rad(a),M);const{up:r,direction:s}=n;return o.cross(r,M,e),o.normalize(r,r),o.transformMat4(r,r,g),o.normalize(s,e),o.negate(s,s),o.transformMat4(s,s,g),n}function R(e,t,a,n){const i=M,r=m;return o.normalize(i,e),o.cross(m,i,p),0===o.dot(m,m)&&o.cross(m,i,y),o.cross(r,m,i),u.directionToHeadingTilt(t,a,n,i,r)}function x(e,t,a,n){const s={eye:r.create(),up:null,tilt:n,heading:a},c=M;c[0]=e[0],c[1]=e[2],c[2]=-e[1];const l=t,d=i.deg2rad(a),h=i.deg2rad(n),u=Math.sin(d),p=Math.cos(d),y=Math.sin(h),f=Math.cos(h),g=o.length(c);let m;if(Math.abs(h)<1e-8)m=l+g;else{const e=g/y,t=i.asinClamped(l/e),a=Math.PI-h-t;m=e*Math.sin(a)}const T=f*l,R=l*l*(y*y),x=p*p*R,b=m-T,I=b*b,v=x*(x+I-c[1]*c[1]);if(v<0)return o.scale(s.eye,c,m/g),s.tilt=0,s;const w=Math.sqrt(v),z=c[1]*b,C=x+I;let P;if(P=p>0?-w+z:w+z,Math.abs(C)<1e-8)return g<1e-8?(s.eye[0]=0,s.eye[1]=0,s.eye[2]=l):o.scale(s.eye,c,m/g),s.tilt=0,U(s.eye),E(s,e);s.eye[1]=P/C;const D=u*u*R,H=y*l,W=p*H*s.eye[1],k=s.eye[1]*s.eye[1],q=1-k,A=Math.sqrt(q),_=x*k+D-2*W*A*b+q*I;return Math.abs(_)<1e-8?(o.scale(s.eye,c,m/g),s.tilt=0,U(s.eye),E(s,e)):(s.eye[0]=(q*(m*c[0]-T*c[0])-H*A*(c[0]*s.eye[1]*p+c[2]*u))/_,s.eye[2]=(q*(m*c[2]-T*c[2])-H*A*(c[2]*s.eye[1]*p-c[0]*u))/_,o.scale(s.eye,s.eye,m),U(s.eye),E(s,e))}function U(e){const t=e[1];e[1]=-e[2],e[2]=t}function E(e,t){const a=T(t,e.heading,e.tilt);return e.up=a.up,e}function b(e,t,a){const n=o.length(t),r=Math.sqrt(a*a+n*n-2*a*n*Math.cos(Math.PI-e)),s=i.asinClamped(a/(r/Math.sin(e)));return i.rad2deg(e-s)}function I(e,t,a){const n=i.deg2rad(e),r=o.length(t);return i.asinClamped(a/(r/Math.sin(n)))+n}function v(e,r,o,l,d){let u,p,y,g;const M=r.latitude,m=r.longitude,T=h.getLonDeltaForDistance(M,o,c.getReferenceEllipsoid(e.spatialReference).radius)/2;u=m-T,p=m+T;const R=i.deg2rad(M),x=c.getReferenceEllipsoid(e.spatialReference).radius,U=(1+Math.sin(R))/(1-Math.sin(R)),E=(U+1)*Math.tan(l/x/2),b=E*E;function I(e){const t=Math.PI/2;return(e=s.cyclical2PI.normalize(e,-t))>t&&(e=Math.PI-e),e}if(y=1.5*Math.PI-2*Math.atan(.5*(E+Math.sqrt(4*U+b))),g=y+l/x,y=I(y),g=I(g),g<y){const e=g;g=y,y=e}if(y=Math.max(i.rad2deg(y),-90),g=Math.min(i.rad2deg(g),90),p=f.monotonic(u,p),p-u>180){const e=(p-u-180)/2;u+=e,p-=e}const v=e.spatialReference&&e.spatialReference.isGeographic?e.spatialReference:t.WGS84;return d?(d.xmin=u,d.ymin=y,d.xmax=p,d.ymax=g,d.spatialReference=v):d=new n(u,y,p,g,v),e.spatialReference&&e.spatialReference.isWebMercator&&a.geographicToWebMercator(d,!1,d),d}var w=Object.freeze({__proto__:null,headingTiltToDirectionUp:T,directionToHeadingTilt:R,eyeForCenterWithHeadingTilt:x,lookAtTiltToEyeTilt:b,eyeTiltToLookAtTilt:I,toExtent:v});e.cameraUtilsSpherical=w,e.directionToHeadingTilt=R,e.eyeForCenterWithHeadingTilt=x,e.eyeTiltToLookAtTilt=I,e.headingTiltToDirectionUp=T,e.lookAtTiltToEyeTilt=b,e.toExtent=v}));
