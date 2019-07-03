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

define(["require","exports","@dojo/framework/shim/Map","../../../core/maybe","./attributeSupport"],function(e,t,a,i,s){Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t,i){this._fieldDataCache=new a.default,this._returnDistinctMap=new a.default,this.returnDistinctValues=e.returnDistinctValues,this.fieldsIndex=i,this.featureAdapter=t;var r=e.outFields;if(r&&-1===r.indexOf("*")){this.outFields=r;for(var u=0,l=0,n=r;l<n.length;l++){var h=n[l],o=s.getExpressionFromFieldName(h),d=this.fieldsIndex.get(o),f=d?null:s.getWhereClause(o,i),c=d?d.name:s.getAliasFromFieldName(h)||"FIELD_EXP_"+u++;this._fieldDataCache.set(h,{alias:c,clause:f})}}}return e.prototype.getAttributes=function(e){var t=this._processAttributesForOutFields(e);return this._processAttributesForDistinctValues(t)},e.prototype.getFieldValue=function(e,t,a){var i=a?a.name:t,r=null;return this._fieldDataCache.has(i)?r=this._fieldDataCache.get(i).clause:a||(r=s.getWhereClause(t,this.fieldsIndex),this._fieldDataCache.set(i,{alias:i,clause:r})),a?this.featureAdapter.getAttribute(e,i):r.calculateValue(e,this.featureAdapter)},e.prototype.validateItem=function(e,t){return this._fieldDataCache.has(t)||this._fieldDataCache.set(t,{alias:t,clause:s.getWhereClause(t,this.fieldsIndex)}),this._fieldDataCache.get(t).clause.testFeature(e,this.featureAdapter)},e.prototype.validateItems=function(e,t){return this._fieldDataCache.has(t)||this._fieldDataCache.set(t,{alias:t,clause:s.getWhereClause(t,this.fieldsIndex)}),this._fieldDataCache.get(t).clause.testSet(e,this.featureAdapter)},e.prototype._processAttributesForOutFields=function(e){var t=this.outFields;if(!t||!t.length)return this.featureAdapter.getAttributes(e);for(var a={},i=0,s=t;i<s.length;i++){var r=s[i],u=this._fieldDataCache.get(r),l=u.alias,n=u.clause;a[l]=n?n.calculateValue(e,this.featureAdapter):this.featureAdapter.getAttribute(e,l)}return a},e.prototype._processAttributesForDistinctValues=function(e){if(i.isNone(e)||!this.returnDistinctValues)return e;var t=this.outFields,a=[];if(t)for(var s=0,r=t;s<r.length;s++){var u=r[s],l=this._fieldDataCache.get(u).alias;a.push(e[l])}else for(var l in e)a.push(e[l]);var n=(t||["*"]).join(",")+"="+a.join(","),h=this._returnDistinctMap.get(n)||0;return this._returnDistinctMap.set(n,++h),h>1?null:e},e}();t.default=r});