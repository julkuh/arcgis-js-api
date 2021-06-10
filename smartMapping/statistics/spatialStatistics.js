/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../geometry/support/coordsUtils"],(function(t){"use strict";function n(n,e=!1){let o=[];if(e){for(const t of n)if(t.geometry){const n=t.geometry;o.push.apply(o,n.points)}}else o=n.map((t=>t.geometry));const i=[],l=[];let s=1/0,c=-1/0,r=0,u=0,f=0,a=0;for(const g of o){if(!g)continue;e?(i[0]=g[0],i[1]=g[1]):(i[0]=g.x,i[1]=g.y);let n=1/0,m=-1/0;for(const r of o){if(r===g)continue;if(!r)continue;e?(l[0]=r[0],l[1]=r[1]):(l[0]=r.x,l[1]=r.y);const o=t.getLength(i,l);o>0&&(o<n&&(n=o),o<s&&(s=o),o>m&&(m=o),o>c&&(c=o))}n!==1/0&&(++f,r+=n),m!==-1/0&&(++a,u+=m)}return{minDistance:s!==1/0?s:null,maxDistance:c!==-1/0?c:null,avgMinDistance:f?r/f:null,avgMaxDistance:a?u/a:null}}function e(n){let e=0,o=0,i=1/0,l=-1/0;for(const s of n){const n=s.geometry;if(n){let s=0;for(const e of n.paths){const n=t.getPathLength(e);n>0&&(s+=n)}s>0&&(++e,o+=s,s<i&&(i=s),s>l&&(l=s))}}return{minLength:i!==1/0?i:null,maxLength:l!==-1/0?l:null,avgLength:e?o/e:null}}function o(t){let n=0,e=0,o=1/0,i=-1/0;for(const l of t){const t=l.geometry;if(t){const l=t.extent;if(l){const t=Math.sqrt(l.width*l.height);t>0&&(++n,e+=t,t<o&&(o=t),t>i&&(i=t))}}}return{minSize:o!==1/0?o:null,maxSize:i!==-1/0?i:null,avgSize:n?e/n:null}}function i(t){const{features:i}=t;let l=null;switch(t.geometryType){case"point":l=n(i);break;case"multipoint":l=n(i,!0);break;case"polyline":l=e(i);break;case"polygon":l=o(i)}return Promise.resolve(l)}return i}));
