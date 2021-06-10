/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","exports","../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../webgl-engine/core/shaderTechnique/ReloadableShaderModule","../webgl-engine/core/shaderTechnique/ShaderTechnique","../webgl-engine/core/shaderTechnique/ShaderTechniqueConfiguration","../webgl-engine/lib/DefaultVertexAttributeLocations","../../webgl/Program","../../webgl/renderState","../../../chunks/RealisticAtmosphere.glsl"],(function(e,i,r,t,n,a,o,l,u,s,h){"use strict";let c=function(e){function i(){return e.apply(this,arguments)||this}r._inheritsLoose(i,e);var t=i.prototype;return t.initializeProgram=function(e){const r=i.shader.get(),t=this.configuration,n=r.build({haze:t.haze});return new u(e.rctx,n.generateSource("vertex"),n.generateSource("fragment"),l.Default3D)},t.initializePipeline=function(){return this.configuration.haze?s.makePipelineState({blending:s.separateBlendingParams(1,0,769,1),colorWrite:s.defaultColorWriteParams}):s.makePipelineState({blending:s.separateBlendingParams(770,1,771,771),depthTest:{func:515},colorWrite:s.defaultColorWriteParams})},i}(a.ShaderTechnique);c.shader=new n.ReloadableShaderModule(h.RealisticAtmosphereShader,(()=>new Promise((function(i,r){e(["./RealisticAtmosphere.glsl"],i,r)}))));let d=function(e){function i(){var i;return(i=e.apply(this,arguments)||this).haze=!1,i}return r._inheritsLoose(i,e),i}(o.ShaderTechniqueConfiguration);t.__decorate([o.parameter()],d.prototype,"haze",void 0),i.RealisticAtmosphereTechnique=c,i.RealisticAtmosphereTechniqueConfiguration=d,Object.defineProperty(i,"__esModule",{value:!0})}));
