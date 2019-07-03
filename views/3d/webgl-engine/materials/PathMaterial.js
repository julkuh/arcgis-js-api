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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/extendsHelper","../../../../core/mathUtils","../../../../geometry/support/aaBoundingBox","../../support/buffer/BufferView","../../support/buffer/InterleavedLayout","../lib/GLMaterial","../lib/Material","../lib/Util","./VisualVariableMaterialParameters","./internal/bufferWriters","./internal/MaterialUtil","./internal/MaterialUtil","./renderers/MergedRenderer","../shaders/PathPrograms","../../../webgl/renderState"],function(e,t,r,i,a,n,o,s,l,p,c,f,v,m,u,d,h,b){function P(e){return e?7:5}function g(e,t){t.vvSizeEnabled&&(e.setUniform3fv("vvSizeMinSize",t.vvSizeMinSize),e.setUniform3fv("vvSizeMaxSize",t.vvSizeMaxSize),e.setUniform3fv("vvSizeOffset",t.vvSizeOffset),e.setUniform3fv("vvSizeFactor",t.vvSizeFactor)),t.vvColorEnabled&&(e.setUniform1fv("vvColorValues",t.vvColorValues),e.setUniform4fv("vvColorColors",t.vvColorColors)),t.vvOpacityEnabled&&(e.setUniform1fv("vvOpacityValues",t.vvOpacityValues),e.setUniform1fv("vvOpacityOpacities",t.vvOpacityOpacities))}function y(e){return!e.slicePlaneEnabled&&(e.cullFace?"none"!==e.cullFace:!e.transparent&&!e.doubleSided)}var S=c.assert,O=function(e){function t(r,i){var a=e.call(this,i)||this;return a.supportsEdges=!0,a.params=u.copyParameters(r,x),a.vertexBufferLayout=t.getVertexBufferLayout(a.params),a}return i(t,e),t.prototype.isVisibleInPass=function(e){return 3!==e||this.params.castShadows},t.prototype.isVisible=function(){var t=this.params;if(!e.prototype.isVisible.call(this)||0===t.layerOpacity)return!1;var r=t.symbolColors,i=t.vvColorEnabled,a="replace"===t.colorMixMode,n=t.opacity>0,o=t.externalColor&&t.externalColor[3]>0;return i||r?!!a||n:a?o:n},t.prototype.setParameterValues=function(e){var t=this.params;for(var r in e)t[r]=e[r];this.notifyDirty("matChanged")},t.prototype.getParameters=function(){return this.params},t.prototype.intersect=function(e,t,r,i,o,s,l,p){var c=e;if(c.metadata){var f=c.metadata.pathGeometry,v=[this.params.size[0],this.params.size[1]];if(this.params.vvSizeEnabled){var m=this.params.vvSizeOffset,d=this.params.vvSizeFactor,h=this.params.vvSizeMinSize,b=this.params.vvSizeMaxSize,P=f.sizeAttributeValue;v[0]*=a.clamp(m[0]+P*d[0],h[0],b[0]),v[1]*=a.clamp(m[1]+P*d[1],h[1],b[1])}var g=Math.max(v[0],v[1]),y=n.fromValues(e.boundingInfo.bbMin[0]-g,e.boundingInfo.bbMin[1]-g,e.boundingInfo.bbMin[2]-g,e.boundingInfo.bbMax[0]+g,e.boundingInfo.bbMax[1]+g,e.boundingInfo.bbMax[2]+g),S=[s[0]-o[0],s[1]-o[1],s[2]-o[2]],O=Math.sqrt(S[0]*S[0]+S[1]*S[1]+S[2]*S[2]),E=[O/S[0],O/S[1],O/S[2]];u.intersectAabbInvDir(y,o,E,i.tolerance)&&(f.baked.size&&f.baked.size[0]===v[0]&&f.baked.size[1]===v[1]||f.baked.bakeVertexPositions(v),f.baked.intersect(o,s,l))}},t.prototype.createBufferWriter=function(){return new C(this.vertexBufferLayout)},t.prototype.createRenderer=function(e,t){return new d(e,t,this,h.vertexAttributeLocations)},t.prototype.getGLMaterials=function(){return{color:E,depth:z,depthShadowMap:this.params.castShadows?V:null,normal:M,highlight:w}},t.getVertexBufferLayout=function(e){var t=s.newLayout().vec3f(h.VertexAttrConstants.POSITION).vec3f(h.VertexAttrConstants.NORMAL);return t=t.mat3f(h.VertexAttrConstants.PATHGEOMETRYINFO),(e.vvColorEnabled||e.vvSizeEnabled||e.vvOpacityEnabled)&&(t=t.vec4f(h.VertexAttrConstants.FEATUREVALUE)),e.symbolColors&&(t=t.vec4u8(h.VertexAttrConstants.SYMBOLCOLOR)),t},t}(p),E=function(e){function t(t,r,i){var a=this,n=t.getParameters();a=e.call(this,t,r)||this,a.params=u.copyParameters(n);var o=a.params;return a.slot=P(o.transparent),a._createPrograms(),a.selectPipeline(),a}return i(t,e),t.prototype._createPrograms=function(){var e=this;this.programs=m.BindParametersMap.create(this.params,function(t){return e._createProgram(t)})},t.prototype._createProgram=function(e){var t=this.params;return this.programRep.getProgram(h.colorPass,{symbolColors:t.symbolColors,flipV:t.flipV,doubleSided:t.doubleSided&&"normal"===t.doubleSidedType,windowOrderDoubleSided:t.doubleSided&&"winding-order"===t.doubleSidedType,receiveShadows:e.receiveShadows,receiveSSAO:e.receiveSSAO,vvSize:t.vvSizeEnabled,vvColor:t.vvColorEnabled,vvOpacity:t.vvOpacityEnabled,verticalOffset:null!==t.verticalOffset,screenSizePerspective:null!==t.screenSizePerspective,slice:t.slicePlaneEnabled,compressedNormals:t.compressedNormals,transparencyDiscard:t.transparent,wireframe:t.wireframe})},t.prototype.selectPipeline=function(){var e=this.params;this.pipelineState=b.makePipelineState({blending:A(e),culling:T(e),polygonOffset:e.polygonOffset&&U,depthTest:{func:513},depthWrite:b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams})},t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program||this.getPrograms()[0]},t.prototype.getPrograms=function(){return m.BindParametersMap.programs(this.programs)},t.prototype.updateParameters=function(){this.params=u.copyParameters(this.material.getParameters()),this.slot=P(this.params.transparent),this._createPrograms(),this.selectPipeline()},t.prototype.bind=function(e,t){var r=this.params,i=this.program=m.BindParametersMap.lookup(this.programs,t);e.bindProgram(i),e.setPipelineState(this.pipelineState),i.setUniform3fv("size",r.size),i.setUniform3fv("ambient",r.ambient),i.setUniform3fv("diffuse",r.diffuse),i.setUniform3fv("specular",r.specular),i.setUniform4fv("externalColor",r.externalColor),i.setUniform1i("colorMixMode",u.colorMixModes[r.colorMixMode]),i.setUniform1f("opacity",r.opacity),i.setUniform1f("layerOpacity",r.layerOpacity),u.bindVerticalOffset(r.verticalOffset,t,i),u.bindScreenSizePerspective(r.screenSizePerspective,i),g(i,r)},t.prototype.release=function(e,t){},t.prototype.bindView=function(e,t){var r=this.program=m.BindParametersMap.lookup(this.programs,t),i=this.params,a=t.origin;u.bindView(a,t.view,r),u.bindCamPos(a,t.viewInvTransp,r),i.slicePlaneEnabled&&u.bindSlicePlane(a,t.slicePlane,r),t.shadowMappingEnabled&&t.shadowMap.bindView(r,a)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),z=function(e){function t(t,r,i,a){void 0===a&&(a=!1);var n=e.call(this,t,r)||this;return n.biased=a,n.updateParameters(),n}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(h.depthPass,{flipV:e.flipV,shadowMap:this.biased,vvSize:e.vvSizeEnabled,vvColor:e.vvColorEnabled,vvOpacity:e.vvOpacityEnabled,verticalOffset:null!==e.verticalOffset,screenSizePerspective:null!==e.screenSizePerspective,slice:e.slicePlaneEnabled,transparencyDiscard:e.transparent}),this.pipelineState=b.makePipelineState({culling:T(e),polygonOffset:e.polygonOffset&&U,depthTest:{func:513},depthWrite:b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent)},t.prototype.updateParameters=function(){this.params=u.copyParameters(this.material.getParameters()),this.selectProgram(),this.selectSlot()},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),e.setPipelineState(this.pipelineState),r.setUniform3fv("size",i.size),r.setUniform2fv("nearFar",t.nearFar),u.bindVerticalOffset(i.verticalOffset,t,r),u.bindScreenSizePerspective(i.screenSizePerspective,r),g(r,i)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=t.origin;u.bindView(a,t.view,r),i.slicePlaneEnabled&&u.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&u.bindCamPos(a,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){this.program.setUniformMatrix4fv("model",t.transformation)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),V=function(e){function t(t,r,i){return e.call(this,t,r,i,!0)||this}return i(t,e),t}(z),M=function(e){function t(t,r,i){var a=e.call(this,t,r)||this;return a.updateParameters(),a}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(h.normalPass,{flipV:e.flipV,vvSize:e.vvSizeEnabled,vvColor:e.vvColorEnabled,vvOpacity:e.vvOpacityEnabled,verticalOffset:null!==e.verticalOffset,screenSizePerspective:null!==e.screenSizePerspective,slice:e.slicePlaneEnabled,compressedNormals:e.compressedNormals,transparencyDiscard:e.transparent}),this.pipelineState=b.makePipelineState({polygonOffset:e.polygonOffset&&U,culling:T(e),depthTest:{func:513},depthWrite:b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent)},t.prototype.updateParameters=function(){this.params=u.copyParameters(this.material.getParameters()),this.selectProgram(),this.selectSlot()},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),e.setPipelineState(this.pipelineState),r.setUniform3fv("size",i.size),u.bindVerticalOffset(i.verticalOffset,t,r),u.bindScreenSizePerspective(i.screenSizePerspective,r),g(r,i)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=t.origin;u.bindView(a,t.view,r),r.setUniformMatrix4fv("viewNormal",t.viewInvTransp),i.slicePlaneEnabled&&u.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&u.bindCamPos(a,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),w=function(e){function t(t,r,i){var a=e.call(this,t,r)||this;return a.updateParameters(),a}return i(t,e),t.prototype.beginSlot=function(e){return e===this.slot},t.prototype.getProgram=function(){return this.program},t.prototype.selectProgram=function(){var e=this.params;this.program=this.programRep.getProgram(h.highlightPass,{flipV:e.flipV,vvSize:e.vvSizeEnabled,vvColor:e.vvColorEnabled,vvOpacity:e.vvOpacityEnabled,verticalOffset:null!==e.verticalOffset,screenSizePerspective:null!==e.screenSizePerspective,slice:e.slicePlaneEnabled,transparencyDiscard:e.transparent}),this.pipelineState=b.makePipelineState({polygonOffset:e.polygonOffset&&U,culling:T(e),depthTest:{func:513},depthWrite:b.defaultDepthWriteParams,colorWrite:b.defaultColorWriteParams})},t.prototype.selectSlot=function(){this.slot=P(this.params.transparent)},t.prototype.updateParameters=function(){this.params=u.copyParameters(this.material.getParameters()),this.selectProgram(),this.selectSlot()},t.prototype.bind=function(e,t){var r=this.program,i=this.params;e.bindProgram(r),e.setPipelineState(this.pipelineState),r.setUniform3fv("size",i.size),u.bindVerticalOffset(i.verticalOffset,t,r),u.bindScreenSizePerspective(i.screenSizePerspective,r),g(r,i)},t.prototype.release=function(e){},t.prototype.bindView=function(e,t){var r=this.program,i=this.params,a=t.origin;u.bindView(a,t.view,r),i.slicePlaneEnabled&&u.bindSlicePlane(t.origin,t.slicePlane,r),i.screenSizePerspective&&u.bindCamPos(a,t.viewInvTransp,r)},t.prototype.bindInstance=function(e,t){var r=this.program;r.setUniformMatrix4fv("model",t.transformation),r.setUniformMatrix4fv("modelNormal",t.transformationNormal)},t.prototype.getDrawMode=function(){return this.params.wireframe?1:4},t}(l),x=r({size:[1,1,1],wireframe:!1,ambient:[.2,.2,.2],diffuse:[.8,.8,.8],specular:[0,0,0],externalColor:[1,1,1,1],colorMixMode:"multiply",opacity:1,layerOpacity:1,symbolColors:!1,flipV:!1,doubleSided:!1,doubleSidedType:"normal",cullFace:void 0,compressedNormals:!1,receiveSSAO:!0,castShadows:!0,verticalOffset:null,screenSizePerspective:null,slicePlaneEnabled:!1,transparent:!1,polygonOffset:!1},f.Default),C=function(){function e(e){this.vertexBufferLayout=e}return e.prototype.allocate=function(e){return this.vertexBufferLayout.createBuffer(e)},e.prototype.elementCount=function(e){return e.indices[h.VertexAttrConstants.POSITION].length},e.prototype.write=function(e,t,r,i){if(h.VertexAttrConstants.PATHGEOMETRYINFO in t.vertexAttr){var a=t.vertexAttr[h.VertexAttrConstants.PATHGEOMETRYINFO],n=t.indices[h.VertexAttrConstants.PATHGEOMETRYINFO];S(9===a.size);var s=r.getField(h.VertexAttrConstants.PATHGEOMETRYINFO,o.BufferViewMat3f);if(!s)throw new Error("unable to acquire view for "+h.VertexAttrConstants.PATHGEOMETRYINFO);v.writeBufferMat3f(n,a.data,s,i)}if(this.vertexBufferLayout.hasField(h.VertexAttrConstants.FEATUREVALUE)&&h.VertexAttrConstants.FEATUREVALUE in t.vertexAttr){var a=t.vertexAttr[h.VertexAttrConstants.FEATUREVALUE],n=t.indices[h.VertexAttrConstants.FEATUREVALUE];S(4===a.size);var s=r.getField(h.VertexAttrConstants.FEATUREVALUE,o.BufferViewVec4f);if(!s)throw new Error("unable to acquire view for "+h.VertexAttrConstants.FEATUREVALUE);v.writeBufferVec4(n,a.data,s,i)}v.writeDefaultAttributes(t,this.vertexBufferLayout,e.transformation,e.invTranspTransformation,r,i)},e}(),A=function(e){return e.transparent&&b.separateBlendingParams(770,1,771,771)},U={factor:2,units:2},T=function(e){return y(e)&&{face:"front"===e.cullFace?1028:1029,mode:2305}};return O});