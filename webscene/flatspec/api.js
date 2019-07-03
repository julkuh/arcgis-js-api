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

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../Basemap","../../Ground","../../WebScene","../../core/compilerUtils","../../core/JSONSupport","../../core/MultiOriginJSONSupport","../../core/accessorSupport/ensureType","../../core/accessorSupport/extensions/serializableProperty/type","../../layers/GroupLayer","../../layers/mixins/OperationalLayer","./utils"],function(e,t,r,n,a,u,s,p,i,o,y,l,c,f,d){function m(e){return n(this,void 0,void 0,function(){var t;return r(this,function(r){return t=new d.ScanContext,[2,M(null,{typeName:"json",type:e},t)]})})}function v(e,t,a){return n(this,void 0,void 0,function(){var n;return r(this,function(r){switch(r.label){case 0:switch(n=t.typeName){case"array":return[3,1];case"union":return[3,3];case"json":return[3,5];case"native":return[3,7];case"enum":return[3,9]}return[3,11];case 1:return[4,N(e,t,a)];case 2:return r.sent(),[3,12];case 3:return[4,j(e,t,a)];case 4:return r.sent(),[3,12];case 5:return[4,M(e,t,a)];case 6:return r.sent(),[3,12];case 7:return[4,h(e,t,a)];case 8:return r.sent(),[3,12];case 9:return[4,g(e,t,a)];case 10:return r.sent(),[3,12];case 11:p.neverReached(t),r.label=12;case 12:return[2]}})})}function h(e,t,a){return n(this,void 0,void 0,function(){return r(this,function(r){return a.addProperty({name:e,type:O(t),default:t.default}),[2]})})}function b(e){var t=e.slice();return t.sort(),t}function g(e,t,a){return n(this,void 0,void 0,function(){var n;return r(this,function(r){return n=t.values.slice(),t.nullable&&n.push(null),a.currentClass&&a.currentClass.typeValue&&"type"===e?a.addProperty({name:e,type:"string",enum:'"'+a.currentClass.typeValue+'"'}):a.addProperty({name:e,type:O(t),enum:b(n).map(function(e){return"string"==typeof e?'"'+e+'"':""+e}).join("|"),default:t.default}),[2]})})}function N(e,t,a){return n(this,void 0,void 0,function(){return r(this,function(r){switch(r.label){case 0:return[4,v(e+"[]",t.elementType,a)];case 1:return r.sent(),[2]}})})}function w(e,t){if("json"===e.typeName){var r=e.type.__accessorMetadata__,n=r&&r.properties&&r.properties&&r.properties.type,a=n&&R(n),u=a&&a.type,s=u||n&&n.type;if(s&&Array.isArray(s)&&1===s.length&&"string"==typeof s[0])return u?s[0]:L(n,s[0])}return t}function j(e,t,a){return n(this,void 0,void 0,function(){var n,u,s,p,i,o;return r(this,function(r){switch(r.label){case 0:n=[],u=0,s=t.types,r.label=1;case 1:return u<s.length?(p=s[u],"native"!==p.type.typeName?[3,2]:(n.push(p.type),[3,4])):[3,5];case 2:return i=e+"<"+w(p.type,p.value)+">",[4,v(i,p.type,a)];case 3:r.sent(),r.label=4;case 4:return u++,[3,1];case 5:return n.length&&(o=n.map(O),t.nullable&&o.push("null"),o.sort(),a.addProperty({type:o.join("|"),name:e,default:t.default})),[2]}})})}function T(e,t,p){return n(this,void 0,void 0,function(){return r(this,function(r){return e.type===s&&"layers"===t?[2,k("web-scene/operational-layers")]:e.type===a&&"baseLayers"===t?[2,k("web-scene/basemap")]:e.type===u&&"layers"===t?[2,k("web-scene/ground")]:e.type===c&&"layers"===t?[2,k("web-scene/operational-layers",function(e){return e!==c})]:[2,C(p)]})})}function _(e){return e.prototype.declaredClass.replace(/\./g,"/")}function M(e,t,a){return n(this,void 0,void 0,function(){var n,u,s,p,i,o,y,l,c,f,d,m,h,b,g,N;return r(this,function(r){switch(r.label){case 0:if(n=t.type.__accessorMetadata__,u=_(t.type),!(s=n&&n.properties))return e&&a.addProperty({name:e,type:"unknown"}),[2,null];if(p=u,i=null,o=e&&e.match(/<([^>]+)>$/),o&&(p+="--"+o[1],i=o[1]),(y=a.seen.get(p))&&e)return a.addProperty({name:e,type:y}),[2,y];l={type:t.type,name:u,id:p,properties:[]},e&&(a.addProperty({name:e,type:l}),l.typeValue=i),a.push(e,l),c=[];for(f in s)c.push(f);d=0,r.label=1;case 1:return d<c.length?(m=c[d],h=s[m],(b=W(h))&&b.enabled?(g=b.target,"string"!=typeof g&&null!=g?[3,4]:[4,T(t,m,h)]):[3,6]):[3,7];case 2:return N=r.sent(),N?[4,v("string"==typeof g?g:m,N,a)]:[3,6];case 3:return r.sent(),[3,6];case 4:return[4,S(g,a)];case 5:r.sent(),r.label=6;case 6:return d++,[3,1];case 7:return[2,a.pop()]}})})}function S(e,t){return n(this,void 0,void 0,function(){var n,a,u,s,p,i;return r(this,function(r){switch(r.label){case 0:n=[];for(a in e)n.push(a);u=0,r.label=1;case 1:return u<n.length?(s=n[u],p=e[s],i=void 0,i=p.types?B(p.types):G(p.type),i.default=p.default,i=x(i),[4,v(s,i,t)]):[3,4];case 2:r.sent(),r.label=3;case 3:return u++,[3,1];case 4:return[2]}})})}function k(e,t){return n(this,void 0,void 0,function(){var n,a,u,s,p,i,o,y;return r(this,function(r){switch(r.label){case 0:n=f.supportedTypes[e],a={typeName:"union",key:"layerType",types:[]},u=[];for(s in n)u.push(s);p=0,r.label=1;case 1:return p<u.length?(i=u[p],[4,f.typeModuleMap[i]()]):[3,4];case 2:if(!(o=r.sent()))return[3,3];if(t&&!t(o))return[3,3];a.types.push({type:{typeName:"json",type:o},value:i}),r.label=3;case 3:return p++,[3,1];case 4:return 0===a.types.length?[2,null]:(y={typeName:"array",elementType:1===a.types.length?a.types[0].type:a},[2,y])}})})}function O(e){switch(e.typeName){case"array":return O(e.elementType)+"[]";case"union":var t=e.types.map(function(e){return O(e.type)});return e.nullable&&t.push("null"),""+t.join(" | ");case"native":switch(e.type){case Number:return"number";case y.Integer:return"integer";case String:return"string";case Boolean:return"boolean";case Object:return"object";default:return"unknown"}case"json":return e.type.prototype.declaredClass;case"enum":return"string";default:p.neverReached(e)}}function P(e){var t=e.prototype.itemType&&e.prototype.itemType.Type;if(!t)return{typeName:"array",elementType:{typeName:"native",type:null}};if("function"==typeof t)return{typeName:"array",elementType:G(t)};if(t.typeMap){var r=[];for(var n in t.typeMap){var a=t.typeMap[n];r.push({type:G(a),value:I(a)?null:n})}return{typeName:"array",elementType:{typeName:"union",key:"string"==typeof t.key?t.key:"type",types:r}}}}function A(e){if("json"!==e.typeName)return null;var t=e.type.__accessorMetadata__,r=t&&t.properties&&t.properties.type,n=r&&R(r),a=n&&n.type,u=a||r&&r.type;return u&&Array.isArray(u)&&"string"==typeof u[0]?a||r.type.map(function(e){return L(r,e)}):null}function x(e){if("array"===e.typeName)return e.elementType=x(e.elementType),e;var t=A(e);return t?{typeName:"union",key:"type",types:t.map(function(t){return{value:t,type:e}})}:e}function C(e){var t=R(e);return t.types?B(t.types):!t.type&&e.types?B(e.types):x(V(e))}function B(e){if(Array.isArray(e))return{typeName:"array",elementType:B(e[0])};var t=[];for(var r in e.typeMap){var n=e.typeMap[r];t.push({type:G(n),value:I(n)?null:r})}return{typeName:"union",key:"string"==typeof e.key?e.key:"type",types:t}}function J(e){return null!=e&&e.name&&-1!==e.name.indexOf("JSONMapWrite")}function L(e,t){var r=W(e);if(J(r.writer)){var n={value:""};return r.writer(t,n,"value"),n.value}return t}function V(e){var t=R(e),r=W(e),n=t&&t.type,a=G(n||e.type);return t&&void 0!==t.default&&"function"!=typeof t.default&&(a.default=L(e,t.default)),r.allowNull&&(a.nullable=!0),a}function G(e){return e?Array.isArray(e)?"string"==typeof e[0]||"number"==typeof e[0]?{typeName:"enum",values:e}:e.length>1?{typeName:"union",key:null,types:e.map(function(e){return{type:G(e),value:null}})}:{typeName:"array",elementType:G(e[0])}:l.isCollection(e)?P(e):I(e)?{typeName:"native",type:e}:H(e)?{typeName:"json",type:e}:{typeName:"native",type:null}:{typeName:"native",type:null}}function H(e){var t=e._meta&&e._meta.bases;return!!t&&(-1!==t.indexOf(i)||-1!==t.indexOf(o))}function I(e){return e===String||e===Boolean||e===Number||e===y.Integer||e===Object}function R(e){if(!e.json)return null;var t=e.json.origins,r=e.json,n=t&&t["web-scene"],a=t&&t["web-document"];return n||a||r||null}function W(e){if(!e.json)return null;var t=e.json.origins,r=e.json.write,n=t&&t["web-scene"]&&t["web-scene"].write,a=t&&t["web-document"]&&t["web-document"].write;return n||a||r||null}Object.defineProperty(t,"__esModule",{value:!0}),t.scan=m});