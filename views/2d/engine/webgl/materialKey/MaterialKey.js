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

define(["require","exports","../../../../../core/tsSupport/extendsHelper","../../../../../core/tsSupport/assignHelper","../../../../../renderers","../../../../../core/Error","../../../../../core/maybe","../enums","../mesh/templates/WGLLabelTemplate","../util/vvFlagUtils"],function(t,e,o,r,n,i,a,s,u,p){Object.defineProperty(e,"__esModule",{value:!0});e.createMaterialKey=function(t,e,r,n){if(a.isSome(e))return function(t,e,r,n){if("heatmap"===r.type)throw new Error("Symbol processor does not support heatmap renderer");switch(t){case s.WGLGeometryType.FILL:return V.from(r);case s.WGLGeometryType.LINE:return m.from(r,e);case s.WGLGeometryType.MARKER:if("dot-density"===r.type)throw new Error("Dot Density renderer does not support Marker GeometryTypes");return d.from(r);case s.WGLGeometryType.TEXT:if("dot-density"===r.type)throw new Error("Dot Density renderer does not support Text GeometryTypes");return g.from(r);case s.WGLGeometryType.LABEL:if("dot-density"===r.type)throw new Error("Dot Density renderer does not support Label GeometryTypes");return b.from(r,n);default:throw new Error("Unable to createMaterialKey for unknown geometryType "+t)}}(t,r,e,n);switch(t){case s.WGLGeometryType.FILL:return V.from(null);case s.WGLGeometryType.LINE:return m.from(null,r);case s.WGLGeometryType.MARKER:return d.from(null);case s.WGLGeometryType.TEXT:return g.from(null);case s.WGLGeometryType.LABEL:return b.from(null,n);default:throw new Error("Unable to createMaterialKey for unknown geometryType "+t)}};var l=function(){function t(t){this._data=0,this._data=t}return t.load=function(t){var e=this.shared;return e.data=t,e},Object.defineProperty(t.prototype,"data",{get:function(){return this._data},set:function(t){this._data=t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"geometryType",{get:function(){return this.bits(5,8)},set:function(t){this.setBits(t,5,8)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mapAligned",{get:function(){return!!this.bit(17)},set:function(t){this.setBit(17,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"sdf",{get:function(){return!!this.bit(8)},set:function(t){this.setBit(8,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"pattern",{get:function(){return!!this.bit(9)},set:function(t){this.setBit(9,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"textureBinding",{get:function(){return this.bits(0,5)},set:function(t){this.setBits(t,0,5)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"geometryTypeString",{get:function(){switch(this.geometryType){case s.WGLGeometryType.FILL:return"fill";case s.WGLGeometryType.MARKER:return"marker";case s.WGLGeometryType.LINE:return"line";case s.WGLGeometryType.TEXT:return"text";case s.WGLGeometryType.LABEL:return"label";default:throw new i("Unable to handle unknown geometryType: "+this.geometryType)}},enumerable:!0,configurable:!0}),t.prototype.setBit=function(t,e){var r=1<<t;e?this._data|=r:this._data&=~r},t.prototype.bit=function(t){return(this._data&1<<t)>>t},t.prototype.setBits=function(t,e,r){for(var n=e,o=0;n<r;n++,o++)this.setBit(n,0!=(t&1<<o))},t.prototype.bits=function(t,e){for(var r=0,n=t,o=0;n<e;n++,o++)r|=this.bit(n)<<o;return r},t.prototype.hasVV=function(){return!1},t.prototype.setVV=function(t,e){},t.prototype.getVariation=function(){var t={};for(var e in this)"boolean"==typeof this[e]&&(t[e]=this[e]);return t},t.prototype.getVariationHash=function(){return this._data&~(4&this.textureBinding)},t.shared=new t(0),t}(),y=function(t){return function(n){function t(){return null!==n&&n.apply(this,arguments)||this}return o(t,n),Object.defineProperty(t.prototype,"vvSizeMinMaxValue",{get:function(){return 0!==this.bit(13)},set:function(t){this.setBit(13,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"vvSizeScaleStops",{get:function(){return 0!==this.bit(14)},set:function(t){this.setBit(14,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"vvSizeFieldStops",{get:function(){return 0!==this.bit(15)},set:function(t){this.setBit(15,t)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"vvSizeUnitValue",{get:function(){return 0!==this.bit(16)},set:function(t){this.setBit(16,t)},enumerable:!0,configurable:!0}),t.prototype.hasVV=function(){return n.prototype.hasVV.call(this)||this.vvSizeMinMaxValue||this.vvSizeScaleStops||this.vvSizeFieldStops||this.vvSizeUnitValue},t.prototype.setVV=function(t,e){n.prototype.setVV.call(this,t,e);var r=p.getSizeFlagsMask(t,e)&t;this.vvSizeMinMaxValue=!!(r&s.WGLVVFlag.SIZE_MINMAX_VALUE),this.vvSizeFieldStops=!!(r&s.WGLVVFlag.SIZE_FIELD_STOPS),this.vvSizeUnitValue=!!(r&s.WGLVVFlag.SIZE_UNIT_VALUE),this.vvSizeScaleStops=!!(r&s.WGLVVFlag.SIZE_SCALE_STOPS)},t}(t)},c=function(t){return function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return o(t,r),Object.defineProperty(t.prototype,"vvRotation",{get:function(){return 0!==this.bit(12)},set:function(t){this.setBit(12,t)},enumerable:!0,configurable:!0}),t.prototype.hasVV=function(){return r.prototype.hasVV.call(this)||this.vvRotation},t.prototype.setVV=function(t,e){r.prototype.setVV.call(this,t,e),this.vvRotation=!e&&!!(t&s.WGLVVFlag.ROTATION)},t}(t)},f=function(t){return function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return o(t,r),Object.defineProperty(t.prototype,"vvColor",{get:function(){return 0!==this.bit(10)},set:function(t){this.setBit(10,t)},enumerable:!0,configurable:!0}),t.prototype.hasVV=function(){return r.prototype.hasVV.call(this)||this.vvColor},t.prototype.setVV=function(t,e){r.prototype.setVV.call(this,t,e),this.vvColor=!e&&!!(t&s.WGLVVFlag.COLOR)},t}(t)},h=function(t){return function(r){function t(){return null!==r&&r.apply(this,arguments)||this}return o(t,r),Object.defineProperty(t.prototype,"vvOpacity",{get:function(){return 0!==this.bit(11)},set:function(t){this.setBit(11,t)},enumerable:!0,configurable:!0}),t.prototype.hasVV=function(){return r.prototype.hasVV.call(this)||this.vvOpacity},t.prototype.setVV=function(t,e){r.prototype.setVV.call(this,t,e),this.vvOpacity=!e&&!!(t&s.WGLVVFlag.OPACITY)},t}(t)},V=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t){var e=this.load(0);if(e.geometryType=s.WGLGeometryType.FILL,a.isSome(t))if(t instanceof n.DotDensityRenderer)e.dotDensity=!0;else{var r=p.getVVFlags(t.visualVariables);e.setVV(r,!1)}return e.data},e.prototype.getVariation=function(){return t.prototype.getVariation.call(this)},Object.defineProperty(e.prototype,"dotDensity",{get:function(){return!!this.bit(12)},set:function(t){this.setBit(12,t)},enumerable:!0,configurable:!0}),e.shared=new e(0),e}(f(h(e.MaterialKeyBase=l)));e.FillMaterialKey=V;var d=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t){var e=this.load(0);if(e.geometryType=s.WGLGeometryType.MARKER,a.isSome(t)){var r=p.getVVFlags(t.visualVariables);e.setVV(r,!1)}return e.data},e.prototype.getVariation=function(){return t.prototype.getVariation.call(this)},e.shared=new e(0),e}(f(h(c(y(l)))));e.MarkerMaterialKey=d;var m=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t,e){var r=this.load(0);if(r.geometryType=s.WGLGeometryType.LINE,a.isSome(t)){var n=p.getVVFlags(t.visualVariables);r.setVV(n,e)}return r.data},e.prototype.getVariation=function(){return t.prototype.getVariation.call(this)},e.shared=new e(0),e}(f(h(y(l))));e.LineMaterialKey=m;var g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t){var e=this.load(0);if(e.geometryType=s.WGLGeometryType.TEXT,a.isSome(t)){var r=p.getVVFlags(t.visualVariables);e.setVV(r,!1)}return e.data},e.prototype.getVariation=function(){return t.prototype.getVariation.call(this)},e.shared=new e(0),e}(f(h(c(y(l)))));e.TextMaterialKey=g;var b=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return o(e,t),e.load=function(t){var e=this.shared;return e.data=t,e},e.from=function(t,e){var r=this.load(0);if(r.geometryType=s.WGLGeometryType.LABEL,a.isSome(t)){var n=p.getVVFlags(t.visualVariables);r.setVV(n,!1)}return r.mapAligned=!!u.isMapAligned(e.labelPlacement),r.data},e.prototype.getVariation=function(){return t.prototype.getVariation.call(this)},e.shared=new e(0),e}(y(l));e.LabelMaterialKey=b});