// COPYRIGHT © 2021 Esri
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
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

var __assign=this&&this.__assign||function(){return(__assign=Object.assign||function(t){for(var e,r=1,i=arguments.length;r<i;r++)for(var s in e=arguments[r])Object.prototype.hasOwnProperty.call(e,s)&&(t[s]=e[s]);return t}).apply(this,arguments)};define(["require","exports","./Dictionary","./ImmutableArray","./languageUtils","../geometry/Geometry","../geometry/Point","../geometry/jsonUtils","./featureset/support/shared"],(function(t,e,r,i,s,a,n,o,l){"use strict";return function(){function t(){this.declaredClass="esri.arcade.Feature",this._adapter=null,this._geometry=null,this.attributes=null,this._layer=null,this._datesfixed=!0,this.immutable=!0,this._datefields=null,this.immutable=!0}return t.createFromGraphic=function(e){var r=new t;return r._geometry=e.geometry?e.geometry:null,void 0===e.attributes?r.attributes={}:null===e.attributes?r.attributes={}:r.attributes=e.attributes,e._sourceLayer?(r._layer=e._sourceLayer,r._datesfixed=!1):e._layer?(r._layer=e._layer,r._datesfixed=!1):e.layer?(r._layer=e.layer,r._datesfixed=!1):e.sourceLayer&&(r._layer=e.sourceLayer,r._datesfixed=!1),r},t.createFromArcadeFeature=function(e){var r=new t;return r._datesfixed=e._datesfixed,r.attributes=e.attributes,r._geometry=e._geometry,e._layer&&(r._layer=e._layer),r},t.createFromArcadeDictionary=function(e){var i=new t;return i.attributes=e.field("attributes"),null!==i.attributes&&i.attributes instanceof r?(i.attributes=i.attributes.attributes,null===i.attributes&&(i.attributes={})):i.attributes={},i._geometry=e.field("geometry"),null!==i._geometry&&(i._geometry instanceof r?i._geometry=t.parseGeometryFromDictionary(i._geometry):i._geometry instanceof a||(i._geometry=null)),i},t.createFromGraphicLikeObject=function(e,r,i){void 0===i&&(i=null);var s=new t;return null===r&&(r={}),s.attributes=r,s._geometry=e||null,s._layer=i,s._layer&&(s._datesfixed=!1),s._adapter=null,s},t.prototype.repurposeFromGraphicLikeObject=function(t,e,r){void 0===r&&(r=null),null===e&&(e={}),this.attributes=e,this._geometry=t||null,this._layer=r,this._layer?this._datesfixed=!1:this._datesfixed=!0},t.prototype.castToText=function(){if(this._adapter)return this._adapter.castToText();var t="";for(var e in!1===this._datesfixed&&this._fixDates(),this.attributes){""!==t&&(t+=",");var r=this.attributes[e];null==r?t+=JSON.stringify(e)+":null":s.isBoolean(r)||s.isNumber(r)||s.isString(r)?t+=JSON.stringify(e)+":"+JSON.stringify(r):r instanceof a?t+=JSON.stringify(e)+":"+s.toStringExplicit(r):r instanceof i?t+=JSON.stringify(e)+":"+s.toStringExplicit(r):r instanceof Array?t+=JSON.stringify(e)+":"+s.toStringExplicit(r):r instanceof Date?t+=JSON.stringify(e)+":"+JSON.stringify(r):null!==r&&"object"==typeof r&&void 0!==r.castToText&&(t+=JSON.stringify(e)+":"+r.castToText())}return'{"geometry":'+(null===this.geometry()?"null":s.toStringExplicit(this.geometry()))+',"attributes":{'+t+"}}"},t.prototype._fixDates=function(){if(null!==this._datefields)return this._datefields.length>0&&this._fixDateFields(this._datefields),void(this._datesfixed=!0);for(var t=[],e=0;e<this._layer.fields.length;e++){var r=this._layer.fields[e];"date"!==r.type&&"esriFieldTypeDate"!==r.type||t.push(r.name)}this._datefields=t,t.length>0&&this._fixDateFields(t),this._datesfixed=!0},t.prototype._fixDateFields=function(t){this.attributes=__assign({},this.attributes);for(var e=0;e<t.length;e++){var r=this.attributes[t[e]];if(null===r);else if(void 0===r){for(var i in this.attributes)if(i.toLowerCase()===t[e].toLowerCase()){null!==(r=this.attributes[i])&&(r instanceof Date||(this.attributes[i]=new Date(r)));break}}else r instanceof Date||(this.attributes[t[e]]=new Date(r))}},t.prototype.geometry=function(){return this._adapter?this._adapter.geometry():null===this._geometry?this._geometry:this._geometry instanceof a?this._geometry:(this._geometry=o.fromJson(this._geometry),this._geometry)},t.prototype.field=function(t){if(this._adapter)return this._adapter.field(t);!1===this._datesfixed&&this._fixDates();var e=this.attributes[t];if(void 0!==e)return e;var r=t.toLowerCase();for(var i in this.attributes)if(i.toLowerCase()===r)return this.attributes[i];if(this._hasFieldDefinition(r))return null;throw new Error("Field not Found : "+t)},t.prototype._hasFieldDefinition=function(t){if(null===this._layer)return!1;for(var e=0;e<this._layer.fields.length;e++){if(this._layer.fields[e].name.toLowerCase()===t)return!0}return!1},t.prototype._field=function(t){var e;if(this._adapter)return null!==(e=this._adapter.field(t))&&void 0!==e?e:null;!1===this._datesfixed&&this._fixDates();var r=t.toLowerCase(),i=this.attributes[t];if(void 0!==i)return i;for(var s in this.attributes)if(s.toLowerCase()===r)return this.attributes[s];return null},t.prototype.setField=function(t,e){if(this.immutable)throw new Error("Feature is Immutable");if(!1===s.isSimpleType(e))throw new Error("Illegal Value Assignment to Feature");if(this._adapter)this._adapter.setField(t,e);else{var r=t.toLowerCase();if(void 0===this.attributes[t]){for(var i in this.attributes)if(i.toLowerCase()===r)return void(this.attributes[i]=e);this.attributes[t]=e}else this.attributes[t]=e}},t.prototype.hasField=function(t){if(this._adapter)return this._adapter.hasField(t);var e=t.toLowerCase();if(void 0!==this.attributes[t])return!0;for(var r in this.attributes)if(r.toLowerCase()===e)return!0;return!!this._hasFieldDefinition(e)},t.prototype.keys=function(){if(this._adapter)return this._adapter.keys();var t=[],e={};for(var r in this.attributes)t.push(r),e[r.toLowerCase()]=1;if(null!==this._layer)for(var i=0;i<this._layer.fields.length;i++){var s=this._layer.fields[i];1!==e[s.name.toLowerCase()]&&t.push(s.name)}return t=t.sort()},t.parseGeometryFromDictionary=function(e){var r=t.convertDictionaryToJson(e,!0);return void 0!==r.hasm&&(r.hasM=r.hasm,delete r.hasm),void 0!==r.hasz&&(r.hasZ=r.hasz,delete r.hasz),void 0!==r.spatialreference&&(r.spatialReference=r.spatialreference,delete r.spatialreference),void 0!==r.rings&&(r.rings=this.fixPathArrays(r.rings,!0===r.hasZ,!0===r.hasZ)),void 0!==r.paths&&(r.paths=this.fixPathArrays(r.paths,!0===r.hasZ,!0===r.hasM)),void 0!==r.points&&(r.points=this.fixPointArrays(r.points,!0===r.hasZ,!0===r.hasM)),o.fromJson(r)},t.fixPathArrays=function(t,e,r){var s=[];if(t instanceof Array)for(var a=0;a<t.length;a++)s.push(this.fixPointArrays(t[a],e,r));else if(t instanceof i)for(a=0;a<t.length();a++)s.push(this.fixPointArrays(t.get(a),e,r));return s},t.fixPointArrays=function(t,e,r){var s=[];if(t instanceof Array)for(var a=0;a<t.length;a++){(o=t[a])instanceof n?e&&r?s.push([o.x,o.y,o.z,o.m]):e?s.push([o.x,o.y,o.z]):r?s.push([o.x,o.y,o.m]):s.push([o.x,o.y]):o instanceof i?s.push(o.toArray()):s.push(o)}else if(t instanceof i)for(a=0;a<t.length();a++){var o;(o=t.get(a))instanceof n?e&&r?s.push([o.x,o.y,o.z,o.m]):e?s.push([o.x,o.y,o.z]):r?s.push([o.x,o.y,o.m]):s.push([o.x,o.y]):o instanceof i?s.push(o.toArray()):s.push(o)}return s},t.convertDictionaryToJson=function(e,i){void 0===i&&(i=!1);var s={};for(var a in e.attributes){var n=e.attributes[a];n instanceof r&&(n=t.convertDictionaryToJson(n)),i?s[a.toLowerCase()]=n:s[a]=n}return s},t.parseAttributesFromDictionary=function(t){var e={};for(var r in t.attributes){var i=t.attributes[r];if(!s.isSimpleType(i))throw new Error("Illegal Argument");e[r]=i}return e},t.fromJson=function(e){var r=null;null!==e.geometry&&void 0!==e.geometry&&(r=o.fromJson(e.geometry));var i={};if(null!==e.attributes&&void 0!==e.attributes)for(var a in e.attributes){var n=e.attributes[a];if(null===n)i[a]=n;else{if(!(s.isString(n)||s.isNumber(n)||s.isBoolean(n)||s.isDate(n)))throw new Error("Illegal Argument");i[a]=n}}return t.createFromGraphicLikeObject(r,i,null)},t.prototype.fullDomain=function(t,e){return null===this._layer?null:this._layer.fields?s.getDomain(t,this._layer,this,e):null},t.prototype.subtypes=function(){return null===this._layer?null:this._layer.fields&&this._layer.typeIdField?{subtypeField:this._layer.typeIdField,subtypes:this._layer.types?this._layer.types.map((function(t){return{name:t.name,code:t.id}})):[]}:null},t.prototype.domainValueLookup=function(t,e,r){if(null===this._layer)return null;if(!this._layer.fields)return null;var i=s.getDomain(t,this._layer,this,r);if(void 0===e)try{e=this.field(t)}catch(t){return null}return s.getDomainValue(i,e)},t.prototype.gdbVersion=function(){if(null===this._layer)return"";var t=this._layer.gdbVersion;return void 0===t?"":""===t&&this._layer.capabilities&&this._layer.capabilities.isVersioned?"SDE.DEFAULT":t},t.prototype.domainCodeLookup=function(t,e,r){if(null===this._layer)return null;if(!this._layer.fields)return null;if(void 0===e){try{e=this.field(t)}catch(t){return null}return e}var i=s.getDomain(t,this._layer,this,r);return s.getDomainCode(i,e)},t.prototype.schema=function(){if(null===this._layer)return null;if(!this._layer.fields)return null;for(var t=[],e=0,r=this._layer.fields;e<r.length;e++){var i=r[e];t.push(l.esriFieldToJson(i))}return{objectIdField:this._layer.objectIdField,globalIdField:this._layer.globalIdField,geometryType:void 0===l.layerGeometryEsriRestConstants[this._layer.geometryType]?"":l.layerGeometryEsriRestConstants[this._layer.geometryType],fields:t}},t}()}));