/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../core/maybe","../../core/Error","../../geometry/support/scaleUtils","../support/adapters/support/layerUtils","../statistics/spatialStatistics"],(function(e,a,t,n,s){"use strict";const i=500,r=1e8,l=1280,o=12,c=30,u=15;async function p(t){const{view:s,sampleSize:r}=t;if(!(t&&s&&t.layer))throw new a("scale-range:missing-parameters","'view' and 'layer' parameters are required");const l=[0,2,3,1],{layer:o,...c}=t,u=n.createLayerAdapter(o,l),p={layerAdapter:u,...c};if(p.sampleSize=r||i,!u)throw new a("scale-range:invalid-parameters","'layer' must be one of these types: "+n.getLayerTypeLabels(l).join(", "));await s.when();const m=e.isSome(p.signal)?{signal:p.signal}:null;return await u.load(m),p}function m(e,a){const t=o,n=l/4,s=c,i=l/4,r=u,p=l/2;let m=null,y=null,f=null,g=null;switch(e){case"point":case"multipoint":{const e=a;m=e.avgMinDistance,y=t,f=e.minDistance,g=n;break}case"polyline":{const e=a;m=e.avgLength,y=s,f=e.minLength,g=i;break}case"polygon":{const e=a;m=e.avgSize,y=r,f=e.minSize,g=p;break}}return{resolutionForMinScale:m>0?m/y:null,resolutionForMaxScale:f>0?f/g:null}}function y(e,a,n){const s=m(e.geometryType,a);return{minScale:t.getScaleForResolution(s.resolutionForMinScale,n.spatialReference),maxScale:t.getScaleForResolution(s.resolutionForMaxScale,n.spatialReference)}}function f(e,a,t=!0){if(e.constraints&&"effectiveLODs"in e.constraints){const n=e.constraints.effectiveLODs,s=t?n:n.slice(0).reverse();let i=null;for(const e of s)if(!(t?e.scale>a:e.scale<a)){i=e;break}return i}}function g(e,t,n,s){const{view:i,snapToLOD:l,layerAdapter:o}=e;if(l){const e=f(i,t),a=f(i,n,!1);t=e?e.scale:t,n=a?a.scale:n}if(t<n)throw new a("scale-range:invalid","calculated minScale is less than maxScale.");return n>t/2&&(n=Math.floor(n/2)),t>r&&(t=0),"polygon"!==o.geometryType&&(n=0),{minScale:Math.ceil(t),maxScale:Math.floor(n),spatialStatistics:s}}async function S(e){const a=await p(e),{view:t,sampleSize:n,layerAdapter:i,signal:r}=a,l=await i.getSampleFeatures({view:t,sampleSize:n,returnGeometry:!0,signal:r}),o=await s({features:l,geometryType:i.geometryType}),{minScale:c,maxScale:u}=y(i,o,t);return g(a,c,u,o)}return S}));
