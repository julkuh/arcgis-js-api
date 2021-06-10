/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/vec2"],(function(e,t,r){"use strict";let f=function(){function e(e,t,r=0,f,i){this.TypedArrayConstructor=e,this.elementCount=2;const u=this.TypedArrayConstructor;void 0===f&&(f=2*u.BYTES_PER_ELEMENT);const s=0===t.byteLength?0:r;this.typedBuffer=null==i?new u(t,s):new u(t,s,(i-r)/u.BYTES_PER_ELEMENT),this.typedBufferStride=f/u.BYTES_PER_ELEMENT,this.count=Math.ceil(this.typedBuffer.length/this.typedBufferStride),this.stride=this.typedBufferStride*this.TypedArrayConstructor.BYTES_PER_ELEMENT}var f=e.prototype;return f.getVec=function(e,t){return r.set(t,this.typedBuffer[e*this.typedBufferStride],this.typedBuffer[e*this.typedBufferStride+1])},f.setVec=function(e,t){this.typedBuffer[e*this.typedBufferStride]=t[0],this.typedBuffer[e*this.typedBufferStride+1]=t[1]},f.get=function(e,t){return this.typedBuffer[e*this.typedBufferStride+t]},f.set=function(e,t,r){this.typedBuffer[e*this.typedBufferStride+t]=r},f.setValues=function(e,t,r){this.typedBuffer[e*this.typedBufferStride]=t,this.typedBuffer[e*this.typedBufferStride+1]=r},f.copyFrom=function(e,t,r){const f=this.typedBuffer,i=t.typedBuffer,u=e*this.typedBufferStride,s=r*t.typedBufferStride;f[u]=i[s],f[u+1]=i[s+1]},t._createClass(e,[{key:"buffer",get:function(){return this.typedBuffer.buffer}}]),e}();f.ElementCount=2,e.BufferViewVec2Impl=f,Object.defineProperty(e,"__esModule",{value:!0})}));
