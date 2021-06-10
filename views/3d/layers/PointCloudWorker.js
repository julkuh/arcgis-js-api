/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../core/typedArrayUtil","../../../core/maybe","../../../geometry/SpatialReference","../../../chunks/vec3","../../../geometry/projection","../../../chunks/quat","../../../chunks/vec3f32","../../../chunks/quatf32","./i3s/PointCloudWorkerUtil"],(function(t,e,r,a,n,o,i,u,f){"use strict";let s=function(){function u(){}var s=u.prototype;return s.transform=function(r){const a=this._transform(r),n=[a.points.buffer,a.rgb.buffer];e.isSome(a.pointIdFilterMap)&&n.push(a.pointIdFilterMap.buffer);for(const e of a.attributes)"buffer"in e.values&&t.isArrayBuffer(e.values.buffer)&&e.values.buffer!==a.rgb.buffer&&n.push(e.values.buffer);return Promise.resolve({result:a,transferList:n})},s._transform=function(t){const a=f.readGeometry(t.schema,t.geometryBuffer);let n=a.length/3,o=null;const i=[],u=f.getAttributeValues(t.primaryAttributeData,a,n);e.isSome(t.primaryAttributeData)&&u&&i.push({attributeInfo:t.primaryAttributeData.attributeInfo,values:u});const s=f.getAttributeValues(t.modulationAttributeData,a,n);e.isSome(t.modulationAttributeData)&&s&&i.push({attributeInfo:t.modulationAttributeData.attributeInfo,values:s});let l=f.evaluateRenderer(t.rendererInfo,u,s,n);if(t.filterInfo&&t.filterInfo.length>0&&e.isSome(t.filterAttributesData)){const e=t.filterAttributesData.map((t=>{const e=f.getAttributeValues(t,a,n),r={attributeInfo:t.attributeInfo,values:e};return i.push(r),r}));o=new Uint32Array(n),n=f.filterInPlace(a,l,o,t.filterInfo,e)}for(const e of t.userAttributesData){const t=f.getAttributeValues(e,a,n);i.push({attributeInfo:e.attributeInfo,values:t})}3*n<l.length&&(l=new Uint8Array(l.buffer.slice(0,3*n))),this._applyElevationOffsetInPlace(a,n,t.elevationOffset);const c=this._transformCoordinates(a,n,t.obb,r.fromJSON(t.inSR),r.fromJSON(t.outSR));return{obb:t.obb,points:c,rgb:l,attributes:i,pointIdFilterMap:o}},s._transformCoordinates=function(t,e,r,u,f){if(!n.projectBuffer(t,u,0,t,f,0,e))throw Error("Can't reproject");const s=i.fromValues(r.center[0],r.center[1],r.center[2]),c=i.create(),b=i.create();o.conjugate(l,r.quaternion);const h=new Float32Array(3*e);for(let n=0;n<e;n++)c[0]=t[3*n]-s[0],c[1]=t[3*n+1]-s[1],c[2]=t[3*n+2]-s[2],a.transformQuat(b,c,l),r.halfSize[0]=Math.max(r.halfSize[0],Math.abs(b[0])),r.halfSize[1]=Math.max(r.halfSize[1],Math.abs(b[1])),r.halfSize[2]=Math.max(r.halfSize[2],Math.abs(b[2])),h[3*n]=c[0],h[3*n+1]=c[1],h[3*n+2]=c[2];return h},s._applyElevationOffsetInPlace=function(t,e,r){if(0!==r)for(let a=0;a<e;a++)t[3*a+2]+=r},u}();const l=u.create();function c(){return new s}return c}));
