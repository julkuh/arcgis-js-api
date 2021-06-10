/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers"],(function(i,t){"use strict";let o=function(){function i(i,t){t&&(this._config=t.snapshot()),this._program=this.initializeProgram(i),i.commonUniformStore&&(this._commonUniformStore=i.commonUniformStore,this._commonUniformStore.subscribeProgram(this._program)),this._pipeline=this.initializePipeline(i)}var o=i.prototype;return o.dispose=function(){this._program&&(this._commonUniformStore&&this._commonUniformStore.unsubscribeProgram(this._program),this._program.dispose(),this._program=null)},o.reload=function(i){this._program&&(this._commonUniformStore&&this._commonUniformStore.unsubscribeProgram(this._program),this._program.dispose()),this._program=this.initializeProgram(i),this._commonUniformStore&&this._commonUniformStore.subscribeProgram(this._program)},o.bindPass=function(i,t,o){},o.bindMaterial=function(i,t,o){},o.bindDraw=function(i,t,o){},o.bindPipelineState=function(i){i.setPipelineState(this.pipeline)},o.ensureAttributeLocations=function(i){this.program.assertCompatibleVertexAttributeLocations(i)},t._createClass(i,[{key:"program",get:function(){return this._program}},{key:"pipeline",get:function(){return this._pipeline}},{key:"key",get:function(){return this._config.key}},{key:"configuration",get:function(){return this._config}},{key:"primitiveType",get:function(){return 4}}]),i}();i.ShaderTechnique=o,Object.defineProperty(i,"__esModule",{value:!0})}));
