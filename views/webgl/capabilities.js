/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["./context-util"],(function(e){"use strict";let t;function r(){return t||(t=n()),t}function n(){const t={available:!1,version:0,majorPerformanceCaveat:!1,maxTextureSize:0,supportsHighPrecisionFragment:!1,supportsVertexShaderSamplers:!1,supportsElementIndexUint:!1,supportsStandardDerivatives:!1,supportsInstancedArrays:!1,supportsTextureFloat:!1,supportsColorBufferFloat:!1};if(void 0===typeof WebGLRenderingContext)return t;const r=document.createElement("canvas");if(!r)return t;let n=e.createContext(r,{failIfMajorPerformanceCaveat:!0},"webgl");if(n||(n=e.createContext(r,{},"webgl"),n&&(t.majorPerformanceCaveat=!0)),!n)return t;const o=n.getParameter(n.VERSION);if(!o)return t;const s=o.match(/^WebGL\s+([\d.]*)/);if(s){const e=parseFloat(s[1]);t.available=e>=.94;const r=n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT);r&&(t.supportsHighPrecisionFragment=r.precision>0),t.supportsVertexShaderSamplers=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS)>0,t.supportsElementIndexUint=null!==n.getExtension("OES_element_index_uint"),t.supportsStandardDerivatives=null!==n.getExtension("OES_standard_derivatives"),t.supportsInstancedArrays=null!==n.getExtension("ANGLE_instanced_arrays"),t.supportsTextureFloat=null!==n.getExtension("OES_texture_float"),t.supportsColorBufferFloat=null!==n.getExtension("WEBGL_color_buffer_float")&&null!==n.getExtension("EXT_float_blend")}return t.maxTextureSize=n.getParameter(n.MAX_TEXTURE_SIZE),t.version=a()?2:1,t}function a(){if(void 0===typeof WebGL2RenderingContext)return!1;const t=document.createElement("canvas");if(!t)return!1;return!!e.createContext(t,{},"webgl2")}return r}));
