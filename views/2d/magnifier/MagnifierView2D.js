/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../core/has","../../../core/maybe","../../../core/urlUtils","../../../core/promiseUtils","../../../core/mathUtils","../../../request","../../../core/Handles","../../../core/watchUtils","../../../chunks/builtins","../../webgl/BufferObject","../../webgl/Texture","../../webgl/VertexArrayObject","../../webgl/FramebufferObject","../engine/DisplayObject","../../magnifier/resources","../engine/webgl/enums","../engine/webgl/shaders/MagnifierPrograms"],(function(e,s,t,i,r,a,o,n,l,h,u,c,d,m,_,p,g,f){"use strict";return function(s){function h(){var e;return(e=s.call(this)||this)._handles=new n,e._resourcePixelRatio=1,e.visible=!1,e}e._inheritsLoose(h,s);var m=h.prototype;return m.destroy=function(){this._handles.destroy(),this._handles=null,this._disposeRenderResources(),this._resourcesTask&&(this._resourcesTask.abort(),this._resourcesTask=null)},m.doRender=function(e){var s;const i=e.context;if(!this._resourcesTask)return void this._reloadResources();if(e.drawPhase!==g.WGLDrawPhase.MAP||!this._canRender())return;this._updateResources(e);const r=this._magnifier;if(t.isNone(r.position))return;const o=e.pixelRatio,n=r.size*o,l=1/r.factor,h=Math.ceil(l*n);this._readbackTexture.resize(h,h);const{size:u}=e.state,c=o*u[0],d=o*u[1],m=.5*h,_=.5*h,p=a.clamp(o*r.position.x,m,c-m-1),f=a.clamp(d-o*r.position.y,_,d-_-1);i.setBlendingEnabled(!0);const b=p-m,y=f-_,x=this._readbackTexture;i.bindTexture(x,0),i.gl.copyTexImage2D(x.descriptor.target,0,x.descriptor.pixelFormat,b,y,h,h,0);const k=null==(s=this.background)?void 0:s.color,T=k?[k.a*k.r/255,k.a*k.g/255,k.a*k.b/255,k.a]:[1,1,1,1],v=(p+r.offset.x*o)/c*2-1,R=(f-r.offset.y*o)/d*2-1,w=n/c*2,M=n/d*2,A=this._program;i.bindVAO(this._vertexArrayObject),i.bindTexture(this._overlayTexture,6),i.bindTexture(this._maskTexture,7),i.bindProgram(A),A.setUniform4fv("u_background",T),A.setUniform1i("u_readbackTexture",0),A.setUniform1i("u_overlayTexture",6),A.setUniform1i("u_maskTexture",7),A.setUniform4f("u_drawPos",v,R,w,M),A.setUniform1i("u_maskEnabled",r.maskEnabled?1:0),A.setUniform1i("u_overlayEnabled",r.overlayEnabled?1:0),i.setStencilTestEnabled(!1),i.setColorMask(!0,!0,!0,!0),i.drawArrays(5,0,4),i.bindVAO()},m._canRender=function(){return this.mask&&this.overlay&&null!=this._magnifier},m._reloadResources=function(){this._resourcesTask&&this._resourcesTask.abort();const e=t.isSome(this._magnifier)?this._magnifier.maskUrl:null,s=t.isSome(this._magnifier)?this._magnifier.overlayUrl:null;this._resourcesTask=r.createTask((async i=>{const r=t.isNone(e)||t.isNone(s)?p.loadMagnifierResources(i):null,a=t.isSome(e)?o(e,{responseType:"image",signal:i}).then((e=>e.data)):r.then((e=>e.mask)),n=t.isSome(s)?o(s,{responseType:"image",signal:i}).then((e=>e.data)):r.then((e=>e.overlay)),[l,h]=await Promise.all([a,n]);this.mask=l,this.overlay=h,this._disposeRenderResources(),this.requestRender()}))},m._disposeRenderResources=function(){this._readbackTexture=t.disposeMaybe(this._readbackTexture),this._overlayTexture=t.disposeMaybe(this._overlayTexture),this._maskTexture=t.disposeMaybe(this._maskTexture),this._vertexArrayObject=t.disposeMaybe(this._vertexArrayObject),this._program=t.disposeMaybe(this._program)},m._updateResources=function(e){if(e.pixelRatio!==this._resourcePixelRatio&&this._disposeRenderResources(),this._readbackTexture)return;const s=e.context;this._resourcePixelRatio=e.pixelRatio;const t=Math.ceil(this._magnifier.size*e.pixelRatio);this._program=f.createMagnifierProgram(s);const r={geometry:[{name:"a_pos",count:2,type:5123,offset:0,stride:4,normalized:!1,divisor:0}]},a=new Uint16Array([0,1,0,0,1,1,1,0]),o=f.magnifierProgramTemplate.attributes;this._vertexArrayObject=new d(s,o,r,{geometry:u.createVertex(s,35044,a)}),this.overlay.width=t,this.overlay.height=t,this._overlayTexture=new c(s,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9728,flipped:!0,preMultiplyAlpha:!i.isSVG(this.overlay.src)||!e.driverTestResult.svgAlwaysPremultipliesAlpha},this.overlay),this.mask.width=t,this.mask.height=t,this._maskTexture=new c(s,{target:3553,pixelFormat:6406,internalFormat:6406,dataType:5121,wrapMode:33071,samplingMode:9728,flipped:!0},this.mask);const n=1/this._magnifier.factor;this._readbackTexture=new c(s,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!1,width:Math.ceil(n*t),height:Math.ceil(n*t)})},e._createClass(h,[{key:"background",get:function(){return this._background},set:function(e){this._background=e,this.requestRender()}},{key:"magnifier",get:function(){return this._magnifier},set:function(e){this._magnifier=e,this._handles.removeAll(),this._handles.add([l.init(e,"version",(()=>{this.visible=e.visible&&t.isSome(e.position)&&e.size>0,this.requestRender()})),e.watch(["mask","overlay"],(()=>this._reloadResources())),e.watch("size",(()=>{this._disposeRenderResources(),this.requestRender()}))])}}]),h}(_.DisplayObject)}));
