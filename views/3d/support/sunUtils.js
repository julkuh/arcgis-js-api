/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/mathUtils","../../../chunks/vec3f64","../../../chunks/vec3","../../../chunks/mat4","../../../chunks/mat4f64","../../../chunks/SunCalc"],(function(t,e,i,n,a,o,l){"use strict";const u={local:{altitude:1500,ambientAtNight:.1,ambientAtNoon:.45,ambientAtTwilight:.2,diffuseAtNoon:.65,diffuseAtTwilight:.7},global:{altitude:8e5,ambient:.015,diffuse:.75},planarDirection:{localAltitude:1e4,globalAltitude:1e6,globalAngles:{azimuth:1.3*Math.PI,altitude:.6*Math.PI}}};function s(t,i){const a=i[2],o=m;n.set(o.ambient.color,1,1,1),o.ambient.intensity=u.global.ambient,n.set(o.diffuse.color,1,1,1),o.diffuse.intensity=u.global.diffuse;let s=(Math.abs(a)-u.local.altitude)/(u.global.altitude-u.local.altitude);s=e.clamp(s,0,1),o.globalFactor=s;const c=l.SunCalc.getTimes(t,i[1],i[0]);if(s<1){const i=g(t,c);n.lerp(o.ambient.color,i.ambient.color,o.ambient.color,s),o.ambient.intensity=e.lerp(i.ambient.intensity,o.ambient.intensity,s),n.lerp(o.diffuse.color,i.diffuse.color,o.diffuse.color,s),o.diffuse.intensity=e.lerp(i.diffuse.intensity,o.diffuse.intensity,s)}return o.noonFactor=b(t,c),o}function c(t,o,s,c){c||(c=i.create());const r=d,m=a.identity(f);if("global"===s)l.SunCalc.getPosition(t,0,0,r),n.set(c,0,0,-1),a.rotateX(m,m,-r.azimuth),a.rotateY(m,m,-r.altitude),n.transformMat4(c,c,m);else{const i=u.planarDirection,s=i.globalAngles,f=o[2];let d=(Math.abs(f)-i.localAltitude)/(i.globalAltitude-i.localAltitude);d=e.clamp(d,0,1),d<1?(l.SunCalc.getPosition(t,o[1],o[0],r),r.azimuth=(1-d)*r.azimuth+d*s.azimuth,r.altitude=(1-d)*r.altitude+d*s.altitude):(r.azimuth=s.azimuth,r.altitude=s.altitude),n.set(c,0,-1,0),a.rotateZ(m,m,-r.azimuth),a.rotateX(m,m,-r.altitude),n.transformMat4(c,c,m)}return c}function r(t,e){if("global"===e)return!0;{const e=u.planarDirection,i=t[2];return Math.abs(i)<e.localAltitude}}const f=o.create(),d={azimuth:0,altitude:0},m={ambient:{color:i.create(),intensity:0},diffuse:{color:i.create(),intensity:0,direction:i.create()},globalFactor:0,noonFactor:0};function b(t,i){const n=t.valueOf();let a,o;i.polarException===l.SunCalc.POLAR_EXCEPTION.MIDNIGHT_SUN?(a=n-60*(t.getHours()+48)*60*1e3-60*t.getMinutes()*1e3,o=a+432e6):i.polarException===l.SunCalc.POLAR_EXCEPTION.POLAR_NIGHT?(a=n-2,o=n-1):(a=i.sunrise.valueOf(),o=i.sunset.valueOf());const u=a+(o-a)/2;return 1-e.clamp(Math.abs(n-u)/432e5,0,1)}function g(t,e){const n=t.valueOf();let a,o;e.polarException===l.SunCalc.POLAR_EXCEPTION.MIDNIGHT_SUN?(a=n-60*(t.getHours()+48)*60*1e3-60*t.getMinutes()*1e3,o=a+432e6):e.polarException===l.SunCalc.POLAR_EXCEPTION.POLAR_NIGHT?(a=n-2,o=n-1):(a=e.sunrise.valueOf(),o=e.sunset.valueOf());const s=o-a,c=a+s/2,r=s/4,f=c-r,d=c+r,m=.06*s,b=a-m/2,g=a+m/2,A=o-m/2,p=o+m/2,y=u.local,N=[.01,y.ambientAtNight],O=[.8,.8,1],P=[.01,.01,.01],C=[y.diffuseAtTwilight,y.ambientAtTwilight],E=[1,.75,.75],I=[.8,.8,1],M=[.9*y.diffuseAtNoon,y.ambientAtNoon],T=[1,.98,.98],S=[.98,.98,1],_=[y.diffuseAtNoon,y.ambientAtNoon],v=[1,1,1],z=[1,1,1],D=M,H=T,L=S,R=C,X=E,k=I;let w,x,F=[0,0],G=[0,0,0],U=[0,0,0];return n<b||n>p?(F=N,G=P,U=O,x="night"):n<g?(w=g-b,F=h(n-b,w,N,C),G=h(n-b,w,P,E),U=h(n-b,w,O,I),x="sun rising"):n<f?(w=f-g,F=h(n-g,w,C,M),G=h(n-g,w,E,T),U=h(n-g,w,I,S),x="early morning"):n<c?(w=c-f,F=h(n-f,w,M,_),G=h(n-f,w,T,v),U=h(n-f,w,S,z),x="late morning"):n<d?(w=d-c,F=h(n-c,w,_,D),G=h(n-c,w,v,H),U=h(n-c,w,z,L),x="early afternoon"):n<A?(w=A-d,F=h(n-d,w,D,R),G=h(n-d,w,H,X),U=h(n-d,w,L,k),x="late afternoon"):n<p&&(w=p-A,F=h(n-A,w,R,N),G=h(n-A,w,X,P),U=h(n-A,w,k,O),x="sun setting"),{diffuse:{intensity:F[0],color:i.fromValues(G[0],G[1],G[2])},ambient:{intensity:F[1],color:i.fromValues(U[0],U[1],U[2])},timeOfDay:x}}function h(t,e,i,n){const a=[];for(let o=0;o<i.length;o++)a[o]=(n[o]-i[o])*t/e+i[o];return a}t.computeColorAndIntensity=s,t.computeDirection=c,t.computeShadowsEnabled=r,t.settings=u,Object.defineProperty(t,"__esModule",{value:!0})}));
