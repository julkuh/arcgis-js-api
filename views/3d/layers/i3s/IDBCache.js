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

define(["require","exports","../../../../core/Error","../../../../core/promiseUtils"],function(e,t,n,r){function o(e){return r.create(function(t,n){e.oncomplete=function(){return t()},e.onerror=function(){return n(e.error)},e.onabort=function(){return n(e.error)}})}function i(e){return r.create(function(t,n){"done"===e.readyState?null!=e.error?n(e.error):t(e.result):(e.onsuccess=function(){return t(e.result)},e.onerror=function(){return n(e.error)})})}Object.defineProperty(t,"__esModule",{value:!0});var s=14,c=function(){function e(e,t,n){void 0===n&&(n=s),this._version=n,this._db=null,this._quotaReductionPromise=null,this._gcCounter=0,this._hit=0,this._miss=0,this._destroyed=!1,this.gcFrequency=50,this.maxByteSize=1073741824,this.quotaReductionFactor=.2,this._dbName=e,this._storeName=t}return e.prototype.init=function(){var e=this;return r.resolve().then(function(){var t=indexedDB.open(e._dbName,e._version);return t.onupgradeneeded=function(n){var r=t.result,o=t.transaction,i=r.objectStoreNames.contains(e._storeName)?o.objectStore(e._storeName):r.createObjectStore(e._storeName),s=r.objectStoreNames.contains("last_access")?o.objectStore("last_access"):r.createObjectStore("last_access");s.indexNames.contains("date")||s.createIndex("date","date",{unique:!1}),s.indexNames.contains("byteSize")||s.createIndex("byteSize","byteSize",{unique:!1}),n.oldVersion<e._version&&(i.clear(),s.clear())},i(t)}).then(function(t){e._destroyed?t.close():e._db=t})},e.prototype.destroy=function(){this._db&&(this._db.close(),this._db=null),this._destroyed=!0},Object.defineProperty(e.prototype,"initialized",{get:function(){return null!=this._db},enumerable:!0,configurable:!0}),e.prototype.getHitRate=function(){return this._hit/(this._hit+this._miss)},e.prototype.put=function(e,t){var o=this;return null==this._db?r.reject(new n("indexedb:not-initialized","IndexedDB Cache is not initialized")):(null!=this._quotaReductionPromise?this._quotaReductionPromise:r.resolve()).then(function(){return o._put(e,t)}).catch(function(n){if(n&&"QuotaExceededError"===n.name)return null==o._quotaReductionPromise&&(o._quotaReductionPromise=o._getCacheSize().then(function(e){return o._removeLeastRecentlyAccessed(t.byteSize+Math.ceil(e*o.quotaReductionFactor))}),o._quotaReductionPromise.then(function(){return o._quotaReductionPromise=null},function(){return o._quotaReductionPromise=null})),o._quotaReductionPromise.then(function(){return o._put(e,t)});throw n}).then(function(){--o._gcCounter<0&&null!=o._db&&(o._gcCounter=o.gcFrequency,o._getCacheSize().then(function(e){return o._removeLeastRecentlyAccessed(e-o.maxByteSize)}))})},e.prototype.get=function(e){var t=this;return null==this._db?r.resolve(null):r.resolve().then(function(){return i(t._db.transaction(t._storeName,"readonly").objectStore(t._storeName).get(e))}).then(function(n){if(null==n)++t._miss;else if(t._db){++t._hit;var r=t._db.transaction("last_access","readwrite"),o=r.objectStore("last_access");o.put({date:Date.now(),byteSize:n.byteSize},e)}return n}).catch(function(e){return++t._miss,null})},e.prototype.remove=function(e){var t=this;return null==this._db?r.resolve():r.resolve().then(function(){var n=t._db.transaction([t._storeName,"last_access"],"readwrite"),s=n.objectStore(t._storeName),c=n.objectStore("last_access"),u=s.delete(e),a=c.delete(e);return r.all([i(u),i(a),o(n)])})},e.prototype._put=function(e,t){var n=this._db.transaction([this._storeName,"last_access"],"readwrite"),s=n.objectStore(this._storeName),c=n.objectStore("last_access"),u=s.put(t,e),a=c.put({date:Date.now(),byteSize:t.byteSize},e);return r.all([i(u),i(a),o(n)])},e.prototype._removeLeastRecentlyAccessed=function(e){if(!(e<=0)){var t=this._db.transaction([this._storeName,"last_access"],"readwrite"),n=t.objectStore(this._storeName),r=t.objectStore("last_access"),i=0,s=r.index("date").openCursor(null,"next");return s.onsuccess=function(t){var o=s.result;null!=o&&(null!=o.value.byteSize&&(i+=o.value.byteSize),n.delete(o.primaryKey),r.delete(o.primaryKey),i<e&&o.continue())},o(t)}},e.prototype._getCacheSize=function(){var e=this._db.transaction("last_access"),t=e.objectStore("last_access"),n=0,r=t.index("byteSize").openKeyCursor();return r.onsuccess=function(e){var t=r.result;if(t){var o=t.key;null!=o&&(n+=o),t.continue()}},o(e).then(function(){return n})},e}();t.IDBCache=c,t.whenTransaction=o,t.whenRequest=i});