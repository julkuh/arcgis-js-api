/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./coordsUtils","../../core/libs/earcut/earcut","./meshUtils/deduplicate"],(function(n,t,e,o){"use strict";function r(n){const t=i(n.rings,n.hasZ,1),r=[];let s=0,c=0;for(const o of t.polygons){const n=o.count,l=o.index,i=new Float64Array(t.position.buffer,3*l*t.position.BYTES_PER_ELEMENT,3*n),a=o.holeIndices.map((n=>n-l)),h=new Uint32Array(e.earcut(i,a,3));r.push({position:i,faces:h}),s+=i.length,c+=h.length}const a=l(r,s,c),h=o.deduplicate(a.position.buffer,6,{originalIndices:a.faces});return a.position=new Float64Array(h.buffer),a.faces=h.indices,a}function l(n,t,e){if(1===n.length)return n[0];const o=new Float64Array(t),r=new Uint32Array(e);let l=0,i=0,s=0;for(const c of n){for(let n=0;n<c.position.length;n++)o[l++]=c.position[n];for(let n=0;n<c.faces.length;n++)r[i++]=c.faces[n]+s;s=l/3}return{position:o,faces:r}}function i(n,t,e){const o=n.length,r=new Array(o),l=new Array(o),i=new Array(o);let a=0,h=0,f=0,g=0;for(let s=0;s<o;++s)g+=n[s].length;const u=new Float64Array(3*g);let p=0;for(let d=o-1;d>=0;d--){const g=n[d],y=1===e&&c(g);if(y&&1!==o)r[a++]=g;else{let n=g.length;for(let t=0;t<a;++t)n+=r[t].length;const e={index:p,pathLengths:new Array(a+1),count:n,holeIndices:new Array(a)};e.pathLengths[0]=g.length,g.length>0&&(i[f++]={index:p,count:g.length}),p=y?s(g,g.length-1,-1,u,p,g.length,t):s(g,0,1,u,p,g.length,t);for(let o=0;o<a;++o){const n=r[o];e.holeIndices[o]=p,e.pathLengths[o+1]=n.length,n.length>0&&(i[f++]={index:p,count:n.length}),p=s(n,0,1,u,p,n.length,t)}a=0,e.count>0&&(l[h++]=e)}}for(let c=0;c<a;++c){const n=r[c];n.length>0&&(i[f++]={index:p,count:n.length}),p=s(n,0,1,u,p,n.length,t)}return h<o&&(l.length=h),f<o&&(i.length=f),{position:u,polygons:l,outlines:i}}function s(n,t,e,o,r,l,i){r*=3;for(let s=0;s<l;++s){const l=n[t];o[r++]=l[0],o[r++]=l[1],o[r++]=i?l[2]:0,t+=e}return r/3}function c(n){return!t.isClockwise(n,!1,!1)}n.pathsToTriangulationInfo=i,n.triangulate=r,Object.defineProperty(n,"__esModule",{value:!0})}));
