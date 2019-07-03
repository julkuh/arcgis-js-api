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

define(["require","exports","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/mathUtils","../../../core/promiseUtils","../../../core/watchUtils","../../../core/libs/gl-matrix-2/mat4","../../../core/libs/gl-matrix-2/mat4f64","../../../core/libs/gl-matrix-2/vec2","../../../core/libs/gl-matrix-2/vec2f64","../../../core/libs/gl-matrix-2/vec3","../../../core/libs/gl-matrix-2/vec3f64","./atmosphereUtils","./resources/SimpleAtmosphereTexture","../support/earthUtils","../support/imageUtils","../support/mathUtils","../support/buffer/glUtil","../support/buffer/InterleavedLayout","../webgl-engine/lib/glUtil3D","../webgl-engine/lib/Util","../webgl-engine/shaders/SimpleAtmospherePrograms","../../webgl/BufferObject","../../webgl/programUtils","../../webgl/renderState","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,a,i,n,s,o,l,c,d,h,u,f,p,v,m,g,_,C,x,y,b,w,V,U,D,R,A){function P(e,t,r,a,i){var n=h.vec3.length(e),s=Math.sqrt(n*n-a*a),o=a*s/n,l=Math.sqrt(a*a-o*o),c=i.silCircleV1,d=i.silCircleV2;return h.vec3.scale(i.silCircleCenter,e,l/n),h.vec3.cross(c,e,t),h.vec3.squaredLength(c)<1&&h.vec3.cross(c,e,r),h.vec3.scale(c,c,o/h.vec3.length(c)),h.vec3.cross(d,c,e),h.vec3.scale(d,d,o/h.vec3.length(d)),o}function F(e,t,r,a){return h.vec3.add(I,a.silCircleCenter,a.silCircleV2),h.vec3.scale(k,I,q),o.mat4.lookAt(E,t,I,r),y.project(I,E,e.projectionMatrix,e.viewport),y.project(k,E,e.projectionMatrix,e.viewport),h.vec3.distance(I,k)/e.height}function M(e,t,r){return e*e/(Math.sqrt(e*e-t*t)*Math.sqrt(e*e-r*r)+t*r)}var S=-f.INNER_ATMOSPHERE_DEPTH,j=(v.earthRadius+S)/v.earthRadius,H=(v.earthRadius+0)/v.earthRadius,q=(v.earthRadius+3e5)/v.earthRadius,T=function(e){return 1-511/512},O=g.makePiecewiseLinearFunction([[50,.1015625],[500,.21875],[5e3,.51171875],[5e4,.4140625]]),L=function(){function e(e){this.needsRender=!1,this.didRender=!0,this.slot=13,this._renderData={texV:d.vec2f64.create(),silCircleCenter:u.vec3f64.create(),silCircleV1:u.vec3f64.create(),silCircleV2:u.vec3f64.create(),altitudeFade:0,innerScale:0,undergroundFadeAlpha:0},this._fadeVaoCount=0,this._readyResolver=n.createResolver(),this._readyController=n.createAbortController(),this.view=e}return e.prototype.when=function(e){return a(this,void 0,void 0,function(){return r(this,function(t){switch(t.label){case 0:return[4,this._readyResolver.promise];case 1:return t.sent(),e(),[2]}})})},e.prototype.initializeRenderContext=function(e){var t=this,r=e.rctx;this._cameraChangeHandle=s.init(this.view,"state.camera",function(){return t.needsRender=!0},!0),this._program=V.createProgram(r,b.colorPass),this._fadeProgram=V.createProgram(r,b.fadePass),this._vao=this._createRibbon(r),this._vaoCount=R.vertexCount(this._vao,"geometry"),this._fadeVao=x.createQuadVAO(r),this._fadeVaoCount=R.vertexCount(this._fadeVao,"geometry"),m.requestImage(p,this._readyController).then(function(e){t._texture=new D(r,{pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9729,flipped:!0},e),t.needsRender=!0,t._readyController=null,t._readyResolver.resolve()}),this._pipelineState=U.makePipelineState({blending:U.separateBlendingParams(770,1,771,771),depthTest:{func:515},colorWrite:U.defaultColorWriteParams})},e.prototype.uninitializeRenderContext=function(e){this.destroy()},e.prototype.destroy=function(){this._readyResolver.reject(),this._cameraChangeHandle&&(this._cameraChangeHandle.remove(),this._cameraChangeHandle=null),this._texture&&(this._texture.dispose(),this._texture=null),this._program&&(this._program.dispose(),this._program=null),this._fadeProgram&&(this._fadeProgram.dispose(),this._fadeProgram=null),this._fadeVao&&(this._fadeVao.dispose(),this._fadeVao=null),this._readyController&&(this._readyController.abort(),this._readyController=null)},e.prototype.render=function(e){if(e.slot!==this.slot||0!==e.pass)return!1;if(null==this._texture)return!1;this._update(e.camera);var t=e.rctx;if(t.setPipelineState(this._pipelineState),this._renderData.undergroundFadeAlpha<1){var r=this._program;t.bindProgram(r),r.setUniformMatrix4fv("proj",e.camera.projectionMatrix),r.setUniformMatrix4fv("view",e.camera.viewMatrix),r.setUniform3fv("silCircleCenter",this._renderData.silCircleCenter),r.setUniform3fv("silCircleV1",this._renderData.silCircleV1),r.setUniform3fv("silCircleV2",this._renderData.silCircleV2),r.setUniform2fv("texV",this._renderData.texV),t.bindTexture(this._texture,0),r.setUniform1i("tex",0),r.setUniform3fv("lightDirection",e.lightingData.direction),r.setUniform1f("altitudeFade",this._renderData.altitudeFade),r.setUniform1f("innerScale",this._renderData.innerScale),t.bindVAO(this._vao),t.drawArrays(4,0,this._vaoCount)}if(this._renderData.undergroundFadeAlpha>0){var r=this._fadeProgram;t.bindProgram(r),r.setUniform1f("undergroundFadeAlpha",this._renderData.undergroundFadeAlpha),r.setUniform3fv("lightDirection",e.lightingData.direction),r.setUniform3fv("cameraPosition",e.camera.eye),t.bindVAO(this._fadeVao),t.drawArrays(5,0,this._fadeVaoCount)}return this.needsRender=!1,!0},e.prototype._update=function(e){var t=u.vec3f64.create(),r=v.earthRadius,a=h.vec3.length(e.eye),n=a-r;if(n<0){var s=Math.min(-n/5e3,1);this._renderData.undergroundFadeAlpha=s}else this._renderData.undergroundFadeAlpha=0;var o=Math.max(50,n),l=r+S;this._renderData.innerScale=M(r+o,r,l)-1,this._renderData.altitudeFade=f.computeInnerAltitudeFade(n),h.vec3.scale(t,e.eye,(r+50)/a),P(t,e.center,e.up,r,this._renderData);var d=F(e,t,e.up,this._renderData),p=T(),m=O(n),_=0+1*p,C=0+d*m*1;if(n>50){P(e.eye,e.center,e.up,r,this._renderData);var x=F(e,e.eye,e.up,this._renderData),y=i.clamp((x-1.5)/(d-1.5),0,1);_=0+y*p*1,C=0+1*g.lerp(1,d*m,y)}c.vec2.set(this._renderData.texV,_,C)},e.prototype._createRibbon=function(e){var t=new Float32Array(1155),r=new Uint32Array(1920);t[0]=0,t[1]=0,t[2]=-1;for(var a=0;a<128;a++){var i=9*a+3;t[i+0]=a,t[i+1]=j,t[i+2]=-1,t[i+3]=a,t[i+4]=H,t[i+5]=0,t[i+6]=a,t[i+7]=q,t[i+8]=1;var n=3*a+1,s=127===a?1:n+3,o=15*a;r[o+0]=n,r[o+1]=n+1,r[o+2]=s+1,r[o+3]=s+1,r[o+4]=s,r[o+5]=n,r[o+6]=n+1,r[o+7]=n+2,r[o+8]=s+2,r[o+9]=s+2,r[o+10]=s+1,r[o+11]=n+1,r[o+12]=n,r[o+13]=s,r[o+14]=0}for(var l=B.createBuffer(r.length),c=l.position,a=0;a<r.length;++a){var d=3*r[a];c.set(a,0,t[d]),c.set(a,1,t[d+1]),c.set(a,2,t[d+2])}return new A(e,b.colorPass.attributes,{geometry:_.glLayout(B)},{geometry:w.createVertex(e,35044,l.buffer)})},e}(),E=l.mat4f64.create(),I=u.vec3f64.create(),k=u.vec3f64.create(),B=C.newLayout().vec3f("position");return L});