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

var __extends=this&&this.__extends||function(){var e=function(t,n){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n])})(t,n)};return function(t,n){function r(){this.constructor=t}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r)}}();define(["require","exports","../support/FeatureSet","../support/IdSet","../support/shared","../support/sqlUtils","../../polyfill/promiseUtils","../../polyfill/sql/WhereClause"],(function(e,t,n,r,i,a,o,s){"use strict";return function(e){function t(t){var n=e.call(this,t)||this;return n.declaredClass="esri.arcade.featureset.actions.fieldin",n.isOneToOne=!1,n._inLayer=null,n._parent=t.parentfeatureset,n.isOneToOne=t.isOneToOne,n._inLayer=t.infeatures,n.sourceField=t.sourceField,n.destinationField=t.destinationField,n}return __extends(t,e),t.prototype._getSet=function(e){var t=this;return null===this._wset?this._getFilteredSet("",null,null,null,e).then((function(e){return t._wset=e,t._wset})):o.resolve(this._wset)},t.prototype._getFeatures=function(e,t,n,r){var i=this;-1!==t&&void 0===this._featureCache[t]&&[].push(t);var a=this._maxQuery;return!0===this._checkIfNeedToExpandKnownPage(e,a)?this._expandPagedSet(e,a,0,0,r).then((function(a){return i._getFeatures(e,t,n,r)})):o.resolve("success")},t.prototype._isInFeatureSet=function(){return i.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e){return o.resolve(e)},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(){},t.prototype._getFilteredSet=function(e,t,n,i,a){var o=this;return this._ensureLoaded().then((function(){return o._parent.isTable()&&t&&null!==e&&""!==e?new r([],[],!0,null):new r([],["GETPAGES"],!1,{relation:e,resultRecordCount:o._maxQueryRate(),resultOffset:0,geometry:null===t?null:t,where:n,internal:{set:[],lastRetrieved:0,iterator:o._inLayer.iterator(a),fullyResolved:!1}})}))},t.prototype._getPhysicalPage=function(e,t,n){var r=this;try{var i=e.pagesDefinition.internal.lastRetrieved,u=i;return e.pagesDefinition.internal.iterator.nextBatch(e.pagesDefinition.resultRecordCount).then((function(t){for(var o=[],l=0,p=t;l<p.length;l++){var c=p[l];o.push(c.attributes[r.destinationField])}if(0===t.length)return e.pagesDefinition.internal.fullyResolved=!0,"done";t.length<e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0);var f=s.WhereClause.create(r.sourceField+" IN @ids",r._parent.getFieldsIndex());f.parameters={ids:o},e.pagesDefinition.where&&(f=a.combine(f,e.pagesDefinition.where,"AND"));var d=r._parent.filter(f);return(d=r._applySpatialFilter(e.pagesDefinition.relation,e.pagesDefinition.relationshape,d)).iterator(n).nextBatch(e.pagesDefinition.resultRecordCount).then((function(t){for(var n=0;n<t.length;n++)e.pagesDefinition.internal.set[u+n]=t[n].attributes[r._parent.objectIdField],r._featureCache[t[n].attributes[r._parent.objectIdField]]=t[n];return e.pagesDefinition.internal.lastRetrieved=i+t.length,"done"}))}))}catch(e){return o.reject(e)}},t.prototype._expandPagedSet=function(e,t,n,r,i){return this._expandPagedSetFeatureSet(e,t,n,r,i)},t.prototype._applySpatialFilter=function(e,t,n){if(null==e||""===e)return n;if(e.indexOf("esriSpatialRelRelation")>=0)return n.relate(t,e.split(":")[1]);switch(e){case"esriSpatialRelIntersects":return n.intersects(t);case"esriSpatialRelContains":return n.contains(t);case"esriSpatialRelOverlaps":return n.overlaps(t);case"esriSpatialRelWithin":return n.within(t);case"esriSpatialRelTouches":return n.touches(t);case"esriSpatialRelCrosses":return n.crosses(t);case"esriSpatialRelEnvelopeIntersects":return n.envelopeIntersects(t)}return n},t.prototype._clonePageDefinition=function(e){return null===e?null:{groupbypage:!1,relation:e.relation,resultRecordCount:e.resultRecordCount,resultOffset:0,geometry:e.geometry,where:e.where,internal:e.internal}},t.prototype._countstat=function(e,t,n,r,o){var s=this;return this._ensureLoaded().then((function(){return s.isTable()&&n&&null!==t&&""!==t?{calculated:!0,result:0}:!0!==s.isOneToOne||null!==n||null!==r&&"1=1"!==a.toWhereClause(r,i.FeatureServiceDatabaseType.Standardised)?{calculated:!1}:{calculated:!0,result:s._inLayer.count(o)}}))},t.prototype._stats=function(e,t,n,r,i,a,o){var s=this;return this._ensureLoaded().then((function(){return"count"===e?s._countstat(e,n,r,i,o):{calculated:!1}}))},t.prototype._stat=function(e,t,n,r,i,a,o){return this._stats(e,t,n,r,i,a,o)},t.prototype._canDoAggregates=function(e,t,n,r,i){return this._ensureLoaded().then((function(){return!1}))},t}(n)}));