/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../core/maybe","../../../../core/Logger","./Util","../core/shaderLibrary/ShaderOutputOptions"],(function(t,e,i,r){"use strict";const a=e.getLogger("esri.views.3d.webgl-engine.lib.GLMaterialRep");let n=function(){function t(t){this.refCnt=0,this.glMaterial=t}var e=t.prototype;return e.incRefCnt=function(){++this.refCnt},e.decRefCnt=function(){--this.refCnt,i.assert(this.refCnt>=0)},e.getRefCnt=function(){return this.refCnt},e.getGLMaterial=function(){return this.glMaterial},t}();return function(){function e(t,e,i){this._textureRep=t,this._techniqueRep=e,this.onMaterialChanged=i,this._id2glMaterialRef=new Map}var i=e.prototype;return i.dispose=function(){this._textureRep.dispose()},i.acquire=function(t,e){this.ownMaterial(t);const i=r.getShaderOutputID(t.id,e);let a=this._id2glMaterialRef.get(i);if(null==a){const r=t.getGLMaterial({material:t,techniqueRep:this._techniqueRep,textureRep:this._textureRep,output:e});return a=new n(r),a.incRefCnt(),this._id2glMaterialRef.set(i,a),r}return a.incRefCnt(),a.getGLMaterial()},i.release=function(t,e){const i=r.getShaderOutputID(t.id,e),a=this._id2glMaterialRef.get(i);if(a.decRefCnt(),0===a.getRefCnt()){const t=a.getGLMaterial();t&&t.dispose(),this._id2glMaterialRef.delete(i)}},i.materialChanged=function(t){for(const e of r.ShaderOutputTypes)if(5!==e.output&&6!==e.output){const i=this._id2glMaterialRef.get(r.getShaderOutputID(t.id,e.output));if(i&&i.getGLMaterial()){const t=i.getGLMaterial();t.updateParameters&&t.updateParameters()}}this.onMaterialChanged&&this.onMaterialChanged(t)},i.ownMaterial=function(e){t.isSome(e.materialRepository)&&e.materialRepository!==this&&a.error("Material is already owned by a different material repository"),e.materialRepository=this},e}()}));
