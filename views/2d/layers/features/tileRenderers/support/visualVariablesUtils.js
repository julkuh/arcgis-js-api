/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../../core/maybe","../../../../../../core/screenUtils","../../../../engine/webgl/definitions","../../../../engine/webgl/enums","../../../../engine/webgl/color","../../../../engine/webgl/visualVariablesUtils"],(function(e,t,s,n,l,i,o){"use strict";function a(e,t){if(!e||!t)return e;switch(t){case"radius":case"distance":return 2*e;case"diameter":case"width":return e;case"area":return Math.sqrt(e)}return e}function r(e){return{value:e.value,size:s.toPt(e.size)}}function u(e){return e.map((e=>r(e)))}function c(e){if("string"==typeof e||"number"==typeof e)return s.toPt(e);const t=e;return{type:"size",expression:t.expression,stops:u(t.stops)}}function p(e){const t=e&&e.length>0?{}:null;return t&&e.forEach((e=>{const s=e.type;e.field&&(t[s]=e.field)})),t}const f=e=>{const t=[],l=[],i=u(e),o=i.length;for(let a=0;a<6;a++){const e=i[Math.min(a,o-1)];t.push(e.value),l.push(null==e.size?n.NAN_MAGIC_NUMBER:s.pt2px(e.size))}return{values:new Float32Array(t),sizes:new Float32Array(l)}};function g(e){const t=e&&e.length>0?{}:null,s=t?{}:null;if(!t)return{vvFields:t,vvRanges:s};for(const n of e)if(n.field&&(t[n.type]=n.field),"size"===n.type){s.size||(s.size={});const e=n;switch(o.getTypeOfSizeVisualVariable(e)){case l.WGLVVFlag.SIZE_MINMAX_VALUE:s.size.minMaxValue={minDataValue:e.minDataValue,maxDataValue:e.maxDataValue,minSize:c(e.minSize),maxSize:c(e.maxSize)};break;case l.WGLVVFlag.SIZE_SCALE_STOPS:s.size.scaleStops={stops:u(e.stops)};break;case l.WGLVVFlag.SIZE_FIELD_STOPS:if(e.levels){const t={};for(const s in e.levels)t[s]=f(e.levels[s]);s.size.fieldStops={type:"level-dependent",levels:t}}else s.size.fieldStops={type:"static",...f(e.stops)};break;case l.WGLVVFlag.SIZE_UNIT_VALUE:s.size.unitValue={unit:e.valueUnit,valueRepresentation:e.valueRepresentation}}}else if("color"===n.type)s.color=z(n);else if("opacity"===n.type)s.opacity=v(n);else if("rotation"===n.type){const e=n;s.rotation={type:e.rotationType}}return{vvFields:t,vvRanges:s}}function v(e){const t={values:[0,0,0,0,0,0,0,0],opacities:[0,0,0,0,0,0,0,0]};if("string"==typeof e.field){if(!e.stops)return null;{if(e.stops.length>8)return null;const s=e.stops;for(let e=0;e<8;++e){const n=s[Math.min(e,s.length-1)];t.values[e]=n.value,t.opacities[e]=n.opacity}}}else{if(!(e.stops&&e.stops.length>=0))return null;{const s=e.stops&&e.stops.length>=0&&e.stops[0].opacity;for(let e=0;e<8;e++)t.values[e]=1/0,t.opacities[e]=s}}return t}function V(e,t,s){e[4*t+0]=s.r/255,e[4*t+1]=s.g/255,e[4*t+2]=s.b/255,e[4*t+3]=s.a}function z(e){if(t.isNone(e))return null;if(e.normalizationField)return null;const s={field:null,values:[0,0,0,0,0,0,0,0],colors:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]};if("string"==typeof e.field){if(!e.stops)return null;{if(e.stops.length>8)return null;s.field=e.field;const t=e.stops;for(let e=0;e<8;++e){const n=t[Math.min(e,t.length-1)];s.values[e]=n.value,V(s.colors,e,n.color)}}}else{if(!(e.stops&&e.stops.length>=0))return null;{const t=e.stops&&e.stops.length>=0&&e.stops[0].color;for(let e=0;e<8;e++)s.values[e]=1/0,V(s.colors,e,t)}}for(let t=0;t<32;t+=4)i.premultiplyAlpha(s.colors,t,!0);return s}e.convertColorVariable=z,e.convertVisualVariables=g,e.getVisualVariableSizeValueRepresentationRatio=a,e.getVisualVariablesFields=p,e.normalizeSizeElement=c,e.normalizeSizeStops=u,e.stopToSizeStop=r,Object.defineProperty(e,"__esModule",{value:!0})}));
