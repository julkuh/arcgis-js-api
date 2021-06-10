/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./spatialReferenceUtils","./intersects","./boundsUtils","./jsonUtils","./aaBoundingRect","./normalizeUtilsCommon"],(function(n,t,e,i,s,m,x){"use strict";function a(n){if(!n)return null;if("mesh"===n.type)return n.toJSON();let m=null;const a=n.spatialReference,u=t.getInfo(a);if(!u)return n.toJSON();const c=a.isWebMercator?102100:4326,l=x.cutParams[c].maxX,y=x.cutParams[c].minX,p=x.cutParams[c].plus180Line,g=x.cutParams[c].minus180Line;let P;const I=n.toJSON();if(s.isPoint(I))P=f(I,l,y);else if(s.isMultipoint(I))I.points=I.points.map((n=>f(n,l,y))),P=I;else if(s.isExtent(I))P=r(I,u);else if(s.isPolygon(I)||s.isPolyline(I)){const n=h;i.getBoundsXY(n,I);const t={xmin:n[0],ymin:n[1],xmax:n[2],ymax:n[3]},s=x.offsetMagnitude(t.xmin,y)*(2*l),a=0===s?I:o(I,s);t.xmin+=s,t.xmax+=s,e.extentIntersectsPolyline(t,p)&&t.xmax!==l||e.extentIntersectsPolyline(t,g)&&t.xmin!==y?m=a:P=a}else P=n.toJSON();if(null!==m){return(new d).cut(m,l)}return P}function o(n,t){const e=x.getGeometryParts(n);for(const i of e)for(const n of i)n[0]+=t;return n}function r(n,t){if(!t)return n;const e=u(n,t).map((n=>n.extent));return e.length<2?e[0]||n:e.length>2?(n.xmin=t.valid[0],n.xmax=t.valid[1],n):{rings:e.map((n=>[[n.xmin,n.ymin],[n.xmin,n.ymax],[n.xmax,n.ymax],[n.xmax,n.ymin],[n.xmin,n.ymin]]))}}function f(n,t,e){if(Array.isArray(n)){const i=n[0];if(i>t){const e=x.offsetMagnitude(i,t);n[0]=i+e*(-2*t)}else if(i<e){const t=x.offsetMagnitude(i,e);n[0]=i+t*(-2*e)}}else{const i=n.x;if(i>t){const e=x.offsetMagnitude(i,t);n.x+=e*(-2*t)}else if(i<e){const t=x.offsetMagnitude(i,e);n.x+=t*(-2*e)}}return n}function u(n,t){const e=[],{ymin:i,ymax:s}=n,m=n.xmax-n.xmin,x=n.xmin,a=n.xmax;let o;const[r,f]=t.valid;o=c(n.xmin,t);const u=o.x,y=o.frameId;o=c(n.xmax,t);const d=o.x,h=o.frameId,p=u===d&&m>0;if(m>2*f){const n={xmin:x<a?u:d,ymin:i,xmax:f,ymax:s},t={xmin:r,ymin:i,xmax:x<a?d:u,ymax:s},m={xmin:0,ymin:i,xmax:f,ymax:s},o={xmin:r,ymin:i,xmax:0,ymax:s},c=[],p=[];l(n,m)&&c.push(y),l(n,o)&&p.push(y),l(t,m)&&c.push(h),l(t,o)&&p.push(h);for(let e=y+1;e<h;e++)c.push(e),p.push(e);e.push({extent:n,frameIds:[y]},{extent:t,frameIds:[h]},{extent:m,frameIds:c},{extent:o,frameIds:p})}else u>d||p?e.push({extent:{xmin:u,ymin:i,xmax:f,ymax:s},frameIds:[y]},{extent:{xmin:r,ymin:i,xmax:d,ymax:s},frameIds:[h]}):e.push({extent:{xmin:u,ymin:i,xmax:d,ymax:s},frameIds:[y]});return e}function c(n,t){const[e,i]=t.valid,s=2*i;let m,x=0;return n>i?(m=Math.ceil(Math.abs(n-i)/s),n-=m*s,x=m):n<e&&(m=Math.ceil(Math.abs(n-e)/s),n+=m*s,x=-m),{x:n,frameId:x}}function l(n,t){const{xmin:e,ymin:i,xmax:s,ymax:m}=t;return y(n,e,i)&&y(n,e,m)&&y(n,s,m)&&y(n,s,i)}function y(n,t,e){return t>=n.xmin&&t<=n.xmax&&e>=n.ymin&&e<=n.ymax}let d=function(){function n(){}return n.prototype.cut=function(n,t){let e;if(n.rings)this.closed=!0,e=n.rings,this.minPts=4;else{if(!n.paths)return null;this.closed=!1,e=n.paths,this.minPts=2}const i=e.length,s=-2*t;for(let m=0;m<i;m++){const n=e[m];if(n&&n.length>=this.minPts){const t=[];for(const e of n)t.push([e[0]+s,e[1]]);e.push(t)}}return this.closed?n.rings=e:n.paths=e,n},n}();const h=m.create();n.normalizeCentralMeridianSync=a,Object.defineProperty(n,"__esModule",{value:!0})}));
