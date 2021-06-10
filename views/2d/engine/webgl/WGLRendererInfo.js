/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../Color","../../../../core/screenUtils","../../../../core/unitUtils","../../../../renderers/support/lengthUtils","./definitions","../../../webgl/capabilities","./Utils"],(function(e,t,i,s,a,o,n,l,r,u){"use strict";function v(e,t){const i=t.length;if(e<t[0].value||1===i)return t[0].size;for(let s=1;s<i;s++)if(e<t[s].value){const i=(e-t[s-1].value)/(t[s].value-t[s-1].value);return t[s-1].size+i*(t[s].size-t[s-1].size)}return t[i-1].size}function d(e,t,s=0){if(i.isNone(t))return e[s+0]=0,e[s+1]=0,e[s+2]=0,void(e[s+3]=0);const{r:a,g:o,b:n,a:l}=t;e[s+0]=a*l/255,e[s+1]=o*l/255,e[s+2]=n*l/255,e[s+3]=l}let c=function(){function e(){this.symbolLevels=[],this.vvColorValues=new Float32Array(8),this.vvColors=new Float32Array(32),this.vvOpacityValues=new Float32Array(8),this.vvOpacities=new Float32Array(8),this.vvSizeMinMaxValue=new Float32Array(4),this.ddColors=new Float32Array(32),this.ddBackgroundColor=new Float32Array(4),this.ddActiveDots=new Float32Array(8),this._vvMaterialParameters={vvSizeEnabled:!1,vvColorEnabled:!1,vvRotationEnabled:!1,vvRotationType:"geographic",vvOpacityEnabled:!1}}var c=e.prototype;return c.getSizeVVFieldStops=function(e){const t=this._vvSizeFieldStops;switch(t.type){case"static":return t;case"level-dependent":return i.unwrapOr(t.levels[e],(()=>{let s=1/0,a=0;for(const i in t.levels){const t=parseFloat(i),o=Math.abs(e-t);o<s&&(s=o,a=t)}if(s===1/0)return{sizes:new Float32Array([0,0,0,0,0,0]),values:new Float32Array([0,0,0,0,0,0])};const o=2**((e-a)/2),n=i.unwrap(t.levels[a]),l=new Float32Array(n.values);return l[2]*=o,l[3]*=o,{sizes:i.unwrap(n.sizes),values:l}}))}},c.update=function(e){i.isSome(this._vvInfo)&&this._updateVisualVariables(this._vvInfo.vvRanges,e)},c.setInfo=function(e,t,s){switch(i.isSome(s)&&s.forEach((e=>this._updateEffects(e))),this._vvInfo=t,e.type){case"dot-density":this._updateDotDensityInfo(e)}},c.getVariation=function(){return{ddDotBlending:this.ddDotBlending,outsideLabelsVisible:this.outsideLabelsVisible,oesTextureFloat:r().supportsTextureFloat}},c.getVariationHash=function(){return(this.ddDotBlending?1:0)|(this.outsideLabelsVisible?1:0)<<1},c._updateEffects=function(e){i.isSome(e)&&e.filter&&e.filter.enabled&&(this.outsideLabelsVisible=e.excludedLabelsVisible)},c._updateVisualVariables=function(e,t){const i=this._vvMaterialParameters;if(i.vvOpacityEnabled=!1,i.vvSizeEnabled=!1,i.vvColorEnabled=!1,i.vvRotationEnabled=!1,!e)return;const s=e.size;if(s){if(i.vvSizeEnabled=!0,s.minMaxValue){const e=s.minMaxValue;let i,o;if(u.isDefined(e.minSize)&&u.isDefined(e.maxSize))if(u.isNumber(e.minSize)&&u.isNumber(e.maxSize))i=a.pt2px(e.minSize),o=a.pt2px(e.maxSize);else{const s=t.scale;i=a.pt2px(v(s,e.minSize.stops)),o=a.pt2px(v(s,e.maxSize.stops))}this.vvSizeMinMaxValue.set([e.minDataValue,e.maxDataValue,i,o])}if(s.scaleStops&&(this.vvSizeScaleStopsValue=a.pt2px(v(t.scale,s.scaleStops.stops))),s.unitValue){const e=o.getMetersPerUnitForSR(t.spatialReference)/n.meterIn[s.unitValue.unit];this.vvSizeUnitValueToPixelsRatio=e/t.resolution}s.fieldStops&&(this._vvSizeFieldStops=s.fieldStops)}const l=e.color;l&&(i.vvColorEnabled=!0,this.vvColorValues.set(l.values),this.vvColors.set(l.colors));const r=e.opacity;r&&(i.vvOpacityEnabled=!0,this.vvOpacityValues.set(r.values),this.vvOpacities.set(r.opacities));const d=e.rotation;d&&(i.vvRotationEnabled=!0,i.vvRotationType=d.type)},c._updateDotDensityInfo=function(e){const t=e.attributes;this.ddDotValue=e.dotValue,this.ddDotScale=e.referenceScale,this.ddDotSize=e.dotSize,this.ddDotBlending=e.dotBlendingEnabled,this.ddSeed=e.seed;for(let i=0;i<l.DOT_DENSITY_MAX_FIELDS;i++){const e=i>=t.length?new s([0,0,0,0]):t[i].color;d(this.ddColors,e,4*i)}for(let i=0;i<8;i++)this.ddActiveDots[i]=i<e.attributes.length?1:0;d(this.ddBackgroundColor,e.backgroundColor)},t._createClass(e,[{key:"vvMaterialParameters",get:function(){return this._vvMaterialParameters}}]),e}();e.WGLRendererInfo=c,Object.defineProperty(e,"__esModule",{value:!0})}));
