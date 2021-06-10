/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../core/Error","../../../../core/promiseUtils"],(function(e,t,s,i,o){"use strict";const r=14;let n=function(){function e(e,t,s=r){this._version=s,this._db=null,this._quotaReductionPromise=null,this._gcCounter=0,this._hit=0,this._miss=0,this._destroyed=!1,this.gcFrequency=50,this.maxByteSize=1073741824,this.quotaReductionFactor=.2,this._dbName=e,this._storeName=t}var n=e.prototype;return n.init=function(){return Promise.resolve().then((()=>{const e=indexedDB.open(this._dbName,this._version);return e.onupgradeneeded=t=>{const s=e.result,i=e.transaction,o=s.objectStoreNames.contains(this._storeName)?i.objectStore(this._storeName):s.createObjectStore(this._storeName),r=s.objectStoreNames.contains("last_access")?i.objectStore("last_access"):s.createObjectStore("last_access");r.indexNames.contains("date")||r.createIndex("date","date",{unique:!1}),r.indexNames.contains("byteSize")||r.createIndex("byteSize","byteSize",{unique:!1}),t.oldVersion<this._version&&(o.clear(),r.clear())},a(e)})).then((e=>{this._destroyed?e.close():this._db=e}))},n.destroy=function(){this._db&&(this._db.close(),this._db=null),this._destroyed=!0},n.getHitRate=function(){return this._hit/(this._hit+this._miss)},n.put=function(e,t){if(null==this._db)return Promise.reject(new i("indexedb:not-initialized","IndexedDB Cache is not initialized"));return(null!=this._quotaReductionPromise?this._quotaReductionPromise:Promise.resolve()).then((()=>this._put(e,t))).catch((s=>{if(s&&"QuotaExceededError"===s.name)return null==this._quotaReductionPromise&&(this._quotaReductionPromise=this._getCacheSize().then((e=>this._removeLeastRecentlyAccessed(t.byteSize+Math.ceil(e*this.quotaReductionFactor)))),this._quotaReductionPromise.then((()=>this._quotaReductionPromise=null),(()=>this._quotaReductionPromise=null))),this._quotaReductionPromise.then((()=>this._put(e,t)));throw s})).then((()=>{this._gcCounter--,this._gcCounter<0&&null!=this._db&&(this._gcCounter=this.gcFrequency,this._getCacheSize().then((e=>this._removeLeastRecentlyAccessed(e-this.maxByteSize))))}))},n.get=function(e,t){if(null==this._db)return Promise.resolve(null);let i=null;return Promise.resolve().then((()=>{const s=this._db.transaction(this._storeName,"readonly");i=o.onAbort(t,(()=>{s.abort()}));return a(s.objectStore(this._storeName).get(e))})).then((t=>{if(null==t)++this._miss;else if(this._db){++this._hit;this._db.transaction("last_access","readwrite").objectStore("last_access").put({date:Date.now(),byteSize:t.byteSize},e)}return s.isSome(i)&&i.remove(),t})).catch((()=>(++this._miss,o.throwIfAborted(t),s.isSome(i)&&i.remove(),null)))},n.remove=function(e){return null==this._db?Promise.resolve():Promise.resolve().then((async()=>{const t=this._db.transaction([this._storeName,"last_access"],"readwrite"),s=t.objectStore(this._storeName),i=t.objectStore("last_access"),o=s.delete(e),r=i.delete(e);await Promise.all([a(o),a(r),c(t)])}))},n._put=function(e,t){const s=this._db.transaction([this._storeName,"last_access"],"readwrite"),i=s.objectStore(this._storeName),o=s.objectStore("last_access"),r=i.put(t,e),n=o.put({date:Date.now(),byteSize:t.byteSize},e);return Promise.all([a(r),a(n),c(s)])},n._removeLeastRecentlyAccessed=function(e){if(e<=0)return;const t=this._db.transaction([this._storeName,"last_access"],"readwrite"),s=t.objectStore(this._storeName),i=t.objectStore("last_access");let o=0;const r=i.index("date").openCursor(null,"next");return r.onsuccess=()=>{const t=r.result;null!=t&&(null!=t.value.byteSize&&(o+=t.value.byteSize),s.delete(t.primaryKey),i.delete(t.primaryKey),o<e&&t.continue())},c(t)},n._getCacheSize=function(){const e=this._db.transaction("last_access"),t=e.objectStore("last_access");let s=0;const i=t.index("byteSize").openKeyCursor();return i.onsuccess=()=>{const e=i.result;if(!e)return;const t=e.key;null!=t&&(s+=t),e.continue()},c(e).then((()=>s))},t._createClass(e,[{key:"initialized",get:function(){return null!=this._db}}]),e}();function c(e){return new Promise(((t,s)=>{e.oncomplete=()=>t(),e.onerror=()=>s(e.error),e.onabort=()=>s(e.error)}))}function a(e){return new Promise(((t,s)=>{"done"===e.readyState?null!=e.error?s(e.error):t(e.result):(e.onsuccess=()=>t(e.result),e.onerror=()=>s(e.error))}))}e.IDBCache=n,e.whenRequest=a,e.whenTransaction=c,Object.defineProperty(e,"__esModule",{value:!0})}));
