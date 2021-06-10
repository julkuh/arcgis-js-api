/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","./DefaultVertexAttributeLocations","../../../webgl/Program","../../../webgl/renderState","../../../../chunks/SSAO.glsl"],(function(e,r,t,i,o,n,a,u,s,l,c){"use strict";let d=function(e){function r(){return e.apply(this,arguments)||this}t._inheritsLoose(r,e);var i=r.prototype;return i.initializeProgram=function(e){const t=r.shader.get(),i=this.configuration,o=t.build({output:i.output,samples:i.samples,radius:i.radius});return new s(e.rctx,o.generateSource("vertex"),o.generateSource("fragment"),u.Default3D)},i.initializePipeline=function(){return l.makePipelineState({colorWrite:l.defaultColorWriteParams})},r}(n.ShaderTechnique);d.shader=new o.ReloadableShaderModule(c.SSAOShader,(()=>new Promise((function(r,t){e(["../shaders/SSAO.glsl"],r,t)}))));let h=function(e){function r(){var r;return(r=e.apply(this,arguments)||this).output=0,r.samples=64,r.radius=4,r}return t._inheritsLoose(r,e),r}(a.ShaderTechniqueConfiguration);i.__decorate([a.parameter({count:2})],h.prototype,"output",void 0),i.__decorate([a.parameter()],h.prototype,"samples",void 0),i.__decorate([a.parameter()],h.prototype,"radius",void 0),r.SSAOTechnique=d,r.SSAOTechniqueConfiguration=h,Object.defineProperty(r,"__esModule",{value:!0})}));
