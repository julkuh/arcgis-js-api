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

define(["require","exports","../../../core/mathUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","../lib/SunCalc","./mathUtils"],function(t,e,i,a,n,l,o,r,s){function u(t,a){var n=a[2],o=A;l.vec3.set(o.ambient.color,1,1,1),o.ambient.intensity=e.settings.global.ambient,l.vec3.set(o.diffuse.color,1,1,1),o.diffuse.intensity=e.settings.global.diffuse;var u=(Math.abs(n)-e.settings.local.altitude)/(e.settings.global.altitude-e.settings.local.altitude);u=i.clamp(u,0,1),o.globalFactor=u;var c=r.getTimes(t,a[1],a[0]);if(u<1){var f=g(t,c);l.vec3.lerp(o.ambient.color,f.ambient.color,o.ambient.color,u),o.ambient.intensity=s.lerp(f.ambient.intensity,o.ambient.intensity,u),l.vec3.lerp(o.diffuse.color,f.diffuse.color,o.diffuse.color,u),o.diffuse.intensity=s.lerp(f.diffuse.intensity,o.diffuse.intensity,u)}return o.noonFactor=m(t,c),o}function c(t,n,s,u){u||(u=o.vec3f64.create());var c=v,f=a.mat4.identity(b);if("global"===s)r.getPosition(t,0,0,c),l.vec3.set(u,0,0,-1),a.mat4.rotateX(f,f,-c.azimuth),a.mat4.rotateY(f,f,-c.altitude),l.vec3.transformMat4(u,u,f);else{var m=e.settings.planarDirection,g=m.globalAngles,d=n[2],A=(Math.abs(d)-m.localAltitude)/(m.globalAltitude-m.localAltitude);A=i.clamp(A,0,1),A<1?(r.getPosition(t,n[1],n[0],c),c.azimuth=(1-A)*c.azimuth+A*g.azimuth,c.altitude=(1-A)*c.altitude+A*g.altitude):(c.azimuth=g.azimuth,c.altitude=g.altitude),l.vec3.set(u,0,-1,0),a.mat4.rotateZ(f,f,-c.azimuth),a.mat4.rotateX(f,f,-c.altitude),l.vec3.transformMat4(u,u,f)}return u}function f(t,i){if("global"===i)return!0;var a=e.settings.planarDirection,n=t[2];return Math.abs(n)<a.localAltitude}function m(t,e){var a,n,l=t.valueOf();e.polarException===r.POLAR_EXCEPTION.MIDNIGHT_SUN?(a=l-60*(t.getHours()+48)*60*1e3-60*t.getMinutes()*1e3,n=a+432e6):e.polarException===r.POLAR_EXCEPTION.POLAR_NIGHT?(a=l-2,n=l-1):(a=e.sunrise.valueOf(),n=e.sunset.valueOf());var o=n-a,s=a+o/2;return 1-i.clamp(Math.abs(l-s)/432e5,0,1)}function g(t,i){var a,n,l=t.valueOf();i.polarException===r.POLAR_EXCEPTION.MIDNIGHT_SUN?(a=l-60*(t.getHours()+48)*60*1e3-60*t.getMinutes()*1e3,n=a+432e6):i.polarException===r.POLAR_EXCEPTION.POLAR_NIGHT?(a=l-2,n=l-1):(a=i.sunrise.valueOf(),n=i.sunset.valueOf());var s,u,c=n-a,f=a+c/2,m=c/4,g=f-m,b=f+m,v=.06*c,A=v,h=a-v/2,p=a+v/2,y=n-A/2,N=n+A/2,O=e.settings.local,P=[.01,O.ambientAtNight],E=[.8,.8,1],I=[.01,.01,.01],M=[O.diffuseAtTwilight,O.ambientAtTwilight],T=[1,.75,.75],_=[.8,.8,1],x=[.9*O.diffuseAtNoon,O.ambientAtNoon],z=[1,.98,.98],D=[.98,.98,1],C=[O.diffuseAtNoon,O.ambientAtNoon],H=[1,1,1],L=[1,1,1],R=x,X=z,w=D,F=M,G=T,S=_,U=[0,0],V=[0,0,0],j=[0,0,0];return l<h||l>N?(U=P,V=I,j=E,u="night"):l<p?(s=p-h,U=d(l-h,s,P,M),V=d(l-h,s,I,T),j=d(l-h,s,E,_),u="sun rising"):l<g?(s=g-p,U=d(l-p,s,M,x),V=d(l-p,s,T,z),j=d(l-p,s,_,D),u="early morning"):l<f?(s=f-g,U=d(l-g,s,x,C),V=d(l-g,s,z,H),j=d(l-g,s,D,L),u="late morning"):l<b?(s=b-f,U=d(l-f,s,C,R),V=d(l-f,s,H,X),j=d(l-f,s,L,w),u="early afternoon"):l<y?(s=y-b,U=d(l-b,s,R,F),V=d(l-b,s,X,G),j=d(l-b,s,w,S),u="late afternoon"):l<N&&(s=N-y,U=d(l-y,s,F,P),V=d(l-y,s,G,I),j=d(l-y,s,S,E),u="sun setting"),{diffuse:{intensity:U[0],color:o.vec3f64.fromValues(V[0],V[1],V[2])},ambient:{intensity:U[1],color:o.vec3f64.fromValues(j[0],j[1],j[2])},timeOfDay:u}}function d(t,e,i,a){for(var n=[],l=0;l<i.length;l++)n[l]=(a[l]-i[l])*t/e+i[l];return n}Object.defineProperty(e,"__esModule",{value:!0}),e.settings={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8e5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1e4,globalAltitude:1e6,globalAngles:{azimuth:1.3*Math.PI,altitude:.6*Math.PI}}},e.computeColorAndIntensity=u,e.computeDirection=c,e.computeShadowsEnabled=f;var b=n.mat4f64.create(),v={azimuth:0,altitude:0},A={ambient:{color:o.vec3f64.create(),intensity:0},diffuse:{color:o.vec3f64.create(),intensity:0,direction:o.vec3f64.create()},globalFactor:0,noonFactor:0}});