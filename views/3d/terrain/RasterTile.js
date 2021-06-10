/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../webgl/rasterUtils"],(function(t,e,r){"use strict";const s={bandCount:3,outMin:0,outMax:1,minCutOff:[0,0,0],maxCutOff:[255,255,255],factor:[1/255,1/255,1/255],useGamma:!1,gamma:[1,1,1],gammaCorrection:[1,1,1],colormap:null,colormapOffset:null,type:"stretch"};return function(){function i(t,e,r=null,s=null){this._memoryUsed=null,this._source=null,this._symbolizerParameters=null,this._bandIds=null,this._interpolation=null,this._dirty=!1,this._transformGrid=null,this.symbolizerRenderer=null,this.rawPixelData=null,this.lij=null,this.scale=1,this.offset=[0,0],this.opacity=1,this.lij=t,this.source=e,this.width=r||e.width,this.height=s||e.height}var o=i.prototype;return o.bind=function(t){return!!(this.source&&this.source.pixels&&this.source.pixels.length>0)&&(this._rasterTexture&&!this._dirty||this._updateRasterTexture(t,this.bandIds),this._rasterTexture&&(this._updateColormapTexture(t),this.transformGrid&&!this._transformGridTexture&&(this._transformGridTexture=r.createTransformTexture(t,this.transformGrid))),!0)},o.getUniforms=function(){const t=r.getBasicGridUniforms(this.scale,this.offset),{symbolizerParameters:e,transformGrid:s,width:i,height:o,opacity:n}=this;return{basic:t,common:r.getCommonUniforms(s,[i,o],[this.source.width,this.source.height],n),colormap:e.colormap?r.getColormapUniforms(e.colormap,e.colormapOffset):null,stretch:"stretch"===this.symbolizerParameters.type?r.getStretchUniforms(this.symbolizerParameters):null,hillshade:"hillshade"===this.symbolizerParameters.type?r.getShadedReliefUniforms(this.symbolizerParameters):null}},o.getTextures=function(){if(!this._rasterTexture)return null;const t=[],e=[];return this._transformGridTexture&&(e.push(this._transformGridTexture),t.push("u_transformGrid")),this._rasterTexture&&(e.push(this._rasterTexture),t.push("u_image")),this._colormapTexture&&(e.push(this._colormapTexture),t.push("u_colormap")),{names:t,textures:e}},o.getMemoryUsage=function(){if(e.isNone(this._memoryUsed)){const t=this.getTextures();if(null==t)return 0;this._memoryUsed=t.textures.map((t=>t.descriptor.width*t.descriptor.height*4)).reduce(((t,e)=>t+e))}return this._memoryUsed},o.release=function(){return this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null),this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null),this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),this.source=null,this.transformGrid=null,this.rawPixelData=null,!0},o._updateRasterTexture=function(t,s){const i=this.source?this.source.extractBands(s):null;if(!(i&&i.pixels&&i.pixels.length>0))return void(this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null));const o=e.isNone(s)&&e.isNone(this.bandIds)||e.isSome(s)&&e.isSome(this.bandIds)&&s.join("")===this.bandIds.join("");if(this._rasterTexture){if(o)return;this._rasterTexture.dispose(),this._rasterTexture=null}this._rasterTexture=r.createRasterTexture(t,i,this.interpolation||"nearest")},o._updateColormapTexture=function(t){const e=this._colormap,s=this.symbolizerParameters.colormap;return s?e?s.length!==e.length||s.some(((t,r)=>t!==e[r]))?(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),this._colormapTexture=r.createColormapTexture(t,s),void(this._colormap=s)):void 0:(this._colormapTexture=r.createColormapTexture(t,s),void(this._colormap=s)):(this._colormapTexture&&(this._colormapTexture.dispose(),this._colormapTexture=null),void(this._colormap=null))},t._createClass(i,[{key:"source",get:function(){return this._source},set:function(t){this._source=t,this._rasterTexture&&(this._rasterTexture.dispose(),this._rasterTexture=null,this._memoryUsed=null)}},{key:"symbolizerParameters",get:function(){return this._symbolizerParameters||s},set:function(t){this._symbolizerParameters=t}},{key:"bandIds",get:function(){return this._bandIds},set:function(t){if(e.isSome(t)&&t.length>0){this._bandIds&&t.every(((t,e)=>!!this._bandIds[e]&&t===this._bandIds[e]))||(this._bandIds=t,this._dirty=!0)}else this._bandIds=null}},{key:"interpolation",get:function(){return this._interpolation},set:function(t){this._interpolation=t,this._rasterTexture&&this._rasterTexture.setSamplingMode("bilinear"===t?9729:9728)}},{key:"transformGrid",get:function(){return this._transformGrid},set:function(t){this._transformGrid=t,this._transformGridTexture&&(this._transformGridTexture.dispose(),this._transformGridTexture=null,this._memoryUsed=null)}}]),i}()}));
