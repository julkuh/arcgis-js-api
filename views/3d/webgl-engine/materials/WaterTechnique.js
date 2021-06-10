/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../core/shaderTechnique/ReloadableShaderModule","../core/shaderTechnique/ShaderTechnique","../core/shaderTechnique/ShaderTechniqueConfiguration","../lib/DefaultVertexAttributeLocations","../../../webgl/Program","../../../webgl/renderState","../core/shaderLibrary/util/View.glsl","../lib/DefaultTextureUnits","../core/shaderLibrary/Slice.glsl","../core/shaderLibrary/output/OutputHighlight.glsl","../lib/OrderIndependentTransparency","../core/shaderLibrary/shading/MultipassTerrainTest.glsl","../core/shaderLibrary/shading/ReadShadowMap.glsl","../core/shaderLibrary/shading/ScreenSpaceReflections.glsl","../core/shaderLibrary/shading/WaterDistortion.glsl","../../../../chunks/WaterSurface.glsl"],(function(e,r,t,i,a,o,n,s,u,p,l,c,d,h,g,f,b,m,y,T){"use strict";let S=function(e){function r(r,t){var i;return(i=e.call(this,r,t)||this).waterTextureRepository=r.waterTextureRepository,i}t._inheritsLoose(r,e);var i=r.prototype;return i.initializeProgram=function(e){const t=r.shader.get(),i=this.configuration,a=t.build({OITEnabled:0===i.transparencyPassType,output:i.output,viewingMode:e.viewingMode,slicePlaneEnabled:i.slicePlaneEnabled,sliceHighlightDisabled:!1,sliceEnabledForVertexPrograms:!1,receiveShadows:i.receiveShadows,pbrMode:3,useCustomDTRExponentForWater:!0,ssrEnabled:i.useSSR,highStepCount:!0,multipassTerrainEnabled:i.multipassTerrainEnabled,cullAboveGround:i.cullAboveGround});return new u(e.rctx,a.generateSource("vertex"),a.generateSource("fragment"),s.Default3D)},i.ensureResource=function(e){return this.waterTextureRepository.ready||this.waterTextureRepository.updating||this.waterTextureRepository.loadTextures(e),this.waterTextureRepository.ready?2:1},i.bindPass=function(e,r,t){l.View.bindProjectionMatrix(this.program,t.camera.projectionMatrix),t.multipassTerrainEnabled&&(this.program.setUniform2fv("cameraNearFar",t.camera.nearFar),this.program.setUniform2fv("inverseViewport",t.inverseViewport),f.bindMultipassTerrainUniforms(this.program,e,t)),0===this.configuration.output&&(t.lighting.setUniforms(this.program,!1),m.ScreenSpaceReflections.bindUniforms(this.program,e,t)),0!==this.configuration.output&&2!==this.configuration.output||(y.WaterDistortion.bindUniforms(this.program,r),this.waterTextureRepository.bindRepo(e)),this.program.setUniform4fv("waterColor",r.color),4===this.configuration.output&&h.OutputHighlight.bindOutputHighlight(e,this.program,t)},i.bindDraw=function(e){l.View.bindView(this.program,e),0!==this.configuration.output&&7!==this.configuration.output||l.View.bindCamPosition(this.program,e.origin,e.camera.viewInverseTransposeMatrix),0===this.configuration.output&&b.ReadShadowMap.bindUniforms(this.program,e,c.DefaultTextureUnits.SHADOW_MAP),0!==this.configuration.output&&7!==this.configuration.output&&4!==this.configuration.output||d.Slice.bindUniformsWithOrigin(this.program,this.configuration,e)},i.setPipelineState=function(e){const r=this.configuration,t=3===e,i=2===e;return p.makePipelineState({blending:2!==r.output&&4!==r.output&&r.transparent?t?g.blendingDefault:g.OITBlending(e):null,depthTest:{func:g.OITDepthTest(e)},depthWrite:t?r.writeDepth&&p.defaultDepthWriteParams:g.OITDepthWrite(e),colorWrite:p.defaultColorWriteParams,polygonOffset:t||i?null:g.getOITPolygonOffset(r.enableOffset)})},i.initializePipeline=function(){return this.setPipelineState(this.configuration.transparencyPassType)},r}(o.ShaderTechnique);S.shader=new a.ReloadableShaderModule(T.WaterSurface,(()=>new Promise((function(r,t){e(["../shaders/WaterSurface.glsl"],r,t)}))));let v=function(e){function r(){var r;return(r=e.apply(this,arguments)||this).output=0,r.receiveShadows=!1,r.slicePlaneEnabled=!1,r.transparent=!1,r.enableOffset=!0,r.writeDepth=!1,r.useSSR=!1,r.isDraped=!1,r.transparencyPassType=3,r.multipassTerrainEnabled=!1,r.cullAboveGround=!0,r}return t._inheritsLoose(r,e),r}(n.ShaderTechniqueConfiguration);i.__decorate([n.parameter({count:8})],v.prototype,"output",void 0),i.__decorate([n.parameter()],v.prototype,"receiveShadows",void 0),i.__decorate([n.parameter()],v.prototype,"slicePlaneEnabled",void 0),i.__decorate([n.parameter()],v.prototype,"transparent",void 0),i.__decorate([n.parameter()],v.prototype,"enableOffset",void 0),i.__decorate([n.parameter()],v.prototype,"writeDepth",void 0),i.__decorate([n.parameter()],v.prototype,"useSSR",void 0),i.__decorate([n.parameter()],v.prototype,"isDraped",void 0),i.__decorate([n.parameter({count:4})],v.prototype,"transparencyPassType",void 0),i.__decorate([n.parameter()],v.prototype,"multipassTerrainEnabled",void 0),i.__decorate([n.parameter()],v.prototype,"cullAboveGround",void 0),r.WaterTechnique=S,r.WaterTechniqueConfiguration=v,Object.defineProperty(r,"__esModule",{value:!0})}));
