/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../core/has","../../../../../core/maybe","../../../../../core/mathUtils","../../../../../chunks/builtins","../../../../webgl/BufferObject","../../../../webgl/FramebufferObject","./FreeList"],(function(t,i,e,r,s,n,h,d,u){"use strict";const a=32767,f=a<<16|a;let c=function(){function t(t,i,e){const r=new Uint32Array(i*e);this.strideInt=e,this.bufferType=t,this.dirty={start:1/0,end:0},this.cpu=r,this.gpu=null,this.clear()}var e=t.prototype;return e.destroy=function(){r.andThen(this.gpu,(t=>t.dispose()))},e.clear=function(){this.dirty.start=1/0,this.dirty.end=0,this.freeList=new u.FreeList({start:0,end:this.cpu.length/this.strideInt}),this.fillPointer=0},e.maxAvailableSpace=function(){return this.freeList.maxAvailableSpace()},e.insert=function(t,i,e,s){const n=e*this.strideInt,h=i*this.strideInt*Uint32Array.BYTES_PER_ELEMENT,d=new Uint32Array(t,h,n),u=r.unwrapOrThrow(this.freeList.firstFit(e),"First fit region must be defined"),a=u*this.strideInt,f=n*this.strideInt,c=u-i;if(0!==s)for(let r=0;r<d.length;r++)d[r]+=s;return this.cpu.set(d,a),this.dirty.start=Math.min(this.dirty.start,a),this.dirty.end=Math.max(this.dirty.end,a+f),this.fillPointer=Math.max(this.fillPointer,a+f),c},e.free=function(t,i,e){const r=t*this.strideInt,s=(t+i)*this.strideInt;if(!0===e)for(let n=t;n!==t+i;n++)this.cpu[n*this.strideInt]=f;this.dirty.start=Math.min(this.dirty.start,r),this.dirty.end=Math.max(this.dirty.end,s),this.freeList.free(t,i)},e.upload=function(t){if(this.dirty.end){if(r.isNone(this.gpu))return this.gpu=this._createBuffer(t),this.dirty.start=1/0,void(this.dirty.end=0);this.gpu.setSubData(this.cpu,this.dirty.start,this.dirty.start,this.dirty.end),this.dirty.start=1/0,this.dirty.end=0}},e._createBuffer=function(t){const i=35048;return"index"===this.bufferType?h.createIndex(t,i,this.cpu):h.createVertex(t,i,this.cpu)},i._createClass(t,[{key:"bufferSize",get:function(){return this.cpu.length/this.strideInt}}]),t}();t.Buffer=c,Object.defineProperty(t,"__esModule",{value:!0})}));
