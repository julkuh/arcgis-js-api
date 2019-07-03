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

define(["require","exports","../../../core/mathUtils","../../../core/libs/gl-matrix-2/vec2","../../../core/libs/gl-matrix-2/vec2f64","../../../core/libs/gl-matrix-2/vec4","../../2d/engine/vectorTiles/tileRendererHelper3D","../../2d/engine/vectorTiles/VectorTileDisplayObject3D","./TerrainConst","./terrainUtils","../webgl-engine/lib/DefaultVertexAttributeLocations","../webgl-engine/lib/DefaultVertexBufferLayouts","../webgl-engine/lib/glUtil3D","../webgl-engine/shaders/MiscPrograms","../../webgl/BufferObject","../../webgl/FramebufferObject","../../webgl/renderState","../../webgl/Texture","../../webgl/Util","../../webgl/VertexArrayObject"],function(e,t,r,a,i,s,o,n,l,c,u,d,f,p,h,y,x,b,_,g){function T(e){var t=e&&e.sourceLayerInfo&&e.sourceLayerInfo.data;return t instanceof HTMLImageElement||t instanceof HTMLCanvasElement}function m(e){return e&&e.sourceLayerInfo&&e.sourceLayerInfo.data instanceof n}function v(e){return e&&e.sourceLayerInfo&&e.sourceLayerInfo.data instanceof b}function L(e){var t=r.nextHighestPowerOfTwo(e),a=t*t,i=e*e;if(a===i)return e;var s=t/2;return a-i<i-s*s?t:s}var w=new Array(20),I=function(){function e(e,t,r,a){this._backgroundTex=null,this._blackTex=null,this.tileSize=256,this._context=e,this.tileSize=t,this._setNeedsRender=a,e.capabilities.textureFilterAnisotropic&&(this._maxAnisotropy=Math.min(8,e.parameters.maxMaxAnisotropy));var i=new Float32Array(20);i[0]=-1,i[1]=-1,i[2]=0,i[3]=0,i[4]=0,i[5]=1,i[6]=-1,i[7]=0,i[8]=1,i[9]=0,i[10]=-1,i[11]=1,i[12]=0,i[13]=0,i[14]=1,i[15]=1,i[16]=1,i[17]=0,i[18]=1,i[19]=1,this._vaoQuad=new g(e,u.Default3D,{geometry:d.Pos3Tex},{geometry:h.createVertex(e,35044,i)}),this._blendLayersProgram=r.getProgram(p.blendLayers),this._blendLayersPipelineState=x.makePipelineState({blending:x.simpleBlendingParams(1,771),colorWrite:x.defaultColorWriteParams}),this._applyOpacityPipelineState=x.makePipelineState({blending:x.simpleBlendingParams(0,770),colorWrite:x.defaultColorWriteParams}),this._blackTex=f.createColorTexture(this._context,[0,0,0,1])}return e.prototype.dispose=function(){this._fbo&&(this._fbo.dispose(),this._fbo=null),this._vtFBO&&(this._vtFBO.dispose(),this._vtFBO=null),this._vaoQuad&&(this._vaoQuad.dispose(),this._vaoQuad=null),this._backgroundTex&&(this._backgroundTex.dispose(),this._backgroundTex=null),this._blackTex&&(this._blackTex.dispose(),this._blackTex=null),this._blendLayersProgram&&(this._blendLayersProgram.dispose(),this._blendLayersProgram=null),this._context=null},e.prototype.updateTileTexture=function(e){for(var t=e.layerInfo[l.LayerClass.MAP],r=0,a=t;r<a.length;r++){a[r].pendingUpdates&=~l.TileUpdate.TEXTURE}if(e.renderData){var i,o=e.renderData,n=e.surface,u=n.baseOpacity,d=0,f=this.tileSize,p=!1,h=t.length;for(i=0;i<t.length&&!p;i++){var y=n.layerViewByIndex(i,l.LayerClass.MAP),x=y.fullOpacity;if(w[i]=x,this._isBaseLayer(y.layer)&&h>=t.length&&(h=i),0!==x){var b=this._getTileRenderInfo(e,i,P);b&&(c.isVectorTileLayerView(y)&&(f=Math.max(f,this.tileSize*y.view.pixelRatio)),d++,y.isOpaque&&1===u&&1===x&&(p=!0))}}f=L(f);var _=f/this.tileSize,g=i-1;if(0===d&&this._backgroundTex)o.opacity=u,o.textureReference=this._backgroundTex,s.vec4.set(o.texOffsetAndScale,0,0,1,1);else if(1===d&&p){o.opacity=u;var b=this._getTileRenderInfo(e,g,P);this._dataToTexture(this._context,b,f,_)&&(o.textureReference=b.sourceLayerInfo.data,s.vec4.set(o.texOffsetAndScale,b.offset[0],b.offset[1],b.scale,b.scale))}else this._composeMapLayers(e,g,h,p,w,f,_),s.vec4.set(o.texOffsetAndScale,0,0,1,1);this._setNeedsRender()}},e.prototype.setBackground=function(e){e instanceof HTMLImageElement?this._backgroundTex=this._buildTexture(e):this._backgroundTex=f.createColorTexture(this._context,e)},e.prototype._buildTexture=function(e){var t,r={target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9987,maxAnisotropy:this._maxAnisotropy,flipped:!0,hasMipmap:!0},a=this._context;if("number"==typeof e)r.width=r.height=e,t=new b(a,r);else try{t=new b(a,r,e)}catch(e){t=f.createEmptyTexture(a),console.warn("TileRenderer: failed to execute 'texImage2D', cross-origin image may not be loaded.")}return a.bindTexture(t),t.generateMipmap(),t},e.prototype._bindFBO=function(e,t,r,a){return e&&e.width===t&&e.height===r||(e&&e.dispose(),e=y.create(this._context,{colorTarget:0,depthStencilTarget:a?1:0,width:t,height:r})),this._context.bindFramebuffer(e),e},e.prototype._drawRasterData=function(e,t,r,a){void 0===a&&(a=1);var i=this._context,s=this._blendLayersProgram,o=this._vaoQuad;i.bindProgram(s),i.bindVAO(o),_.assertCompatibleVertexAttributeLocations(o,s),i.bindTexture(e,0),s.setUniform1i("tex",0),s.setUniform1f("scale",t),s.setUniform2f("offset",r[0],r[1]),s.setUniform1f("opacity",a),i.drawArrays(5,0,_.vertexCount(o,"geometry"))},e.prototype._composeMapLayers=function(e,t,r,a,s,o,n){var l=this,c=e.renderData.ensureTexture(function(e){return l._buildTexture(e)},o),u=this._context;this._fbo=this._bindFBO(this._fbo,c.descriptor.width,c.descriptor.height,!1),u.setViewport(0,0,o,o),u.setClearColor(0,0,0,0),u.setClearDepth(1),u.clearSafe(16384),!a&&this._backgroundTex&&(u.setPipelineState(this._blendLayersPipelineState),this._drawRasterData(this._backgroundTex,1,i.vec2f64.ZEROS));for(var d=e.surface.baseOpacity,f=!1,p=t;p>=0;p--){var h=this._getTileRenderInfo(e,p,P);h&&(p<r&&d<1&&!f&&(u.setPipelineState(this._applyOpacityPipelineState),this._drawRasterData(this._blackTex,1,i.vec2f64.ZEROS,d),f=!0),0!==s[p]&&this._dataToTexture(u,h,o,n)&&(u.setPipelineState(this._blendLayersPipelineState),this._drawRasterData(h.sourceLayerInfo.data,h.scale,h.offset,s[p])))}u.bindTexture(c),u.gl.copyTexImage2D(u.gl.TEXTURE_2D,0,c.descriptor.pixelFormat,0,0,c.descriptor.width,c.descriptor.height,0),c.generateMipmap(),u.bindFramebuffer(null),e.renderData.opacity=f?1:d,e.renderData.textureReference=c},e.prototype._dataToTexture=function(e,t,r,a){return m(t)&&(this._vectorDataToTexture(e,t,r,a),t.tile.updateMemoryUsed()),T(t)&&(this._rasterDataToTexture(t),t.tile.updateMemoryUsed()),v(t)},e.prototype._rasterDataToTexture=function(e){var t=e.sourceLayerInfo;t.data=this._buildTexture(t.data)},e.prototype._vectorDataToTexture=function(e,t,r,a){var i=t.tile.surface.layerViewByIndex(t.layerIdx,l.LayerClass.MAP);this._vtFBO=this._bindFBO(this._vtFBO,r,r,!0),e.setClearColor(1,1,1,0),e.clearSafe(16640);var s=t.sourceLayerInfo,n=s.data;o.renderVectorTile(this._context,t.sourceLod,n,i.renderer,i.schemaHelper,this.tileSize,this.tileSize,a),n.dispose();var c=s;c.data=this._buildTexture(r),e.bindTexture(c.data),e.gl.copyTexImage2D(e.gl.TEXTURE_2D,0,c.data.descriptor.pixelFormat,0,0,r,r,0),c.data.generateMipmap(),e.bindFramebuffer(this._fbo)},e.prototype._getTileRenderInfo=function(e,t,r){var i=e.layerInfo[l.LayerClass.MAP][t];if(r.layerIdx=t,i.data)return a.vec2.set(r.offset,0,0),r.tile=e,r.scale=1,r.sourceLod=e.lij,r.sourceLayerInfo=i,r;if(!i.upsampleFromTile)return null;var s=i.upsampleFromTile,o=s.tile.layerInfo[l.LayerClass.MAP][t];return r.tile=s.tile,a.vec2.copy(r.offset,s.offset),r.scale=s.scale,r.sourceLod=s.tile.lij,r.sourceLayerInfo=o,r},e.prototype._isBaseLayer=function(e){return e.parent&&"esri.Basemap"===e.parent.declaredClass&&e.parent.baseLayers.indexOf(e)>-1},Object.defineProperty(e.prototype,"test",{get:function(){return{fbo:this._fbo}},enumerable:!0,configurable:!0}),e}(),P={tile:null,sourceLayerInfo:null,sourceLod:null,offset:[0,0],scale:1,layerIdx:0};return I});