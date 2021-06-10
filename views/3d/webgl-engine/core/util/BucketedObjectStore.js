/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../lib/AutoDisposable"],(function(t,e,n){"use strict";let u=function(t){function n(){var e;return(e=t.apply(this,arguments)||this)._bucket=null,e._bucketIndex=0,e}return e._inheritsLoose(n,t),e._createClass(n,[{key:"bucketKey",get:function(){return this._bucket.key}}]),n}(n.AutoDisposable),c=function(){function t(){this._buckets=new Map}var n=t.prototype;return n.add=function(t,e){const n=this._getBucket(t);e._bucket=n,e._bucketIndex=n.count,n.data.push(e),++n.statistics.added},n.remove=function(t){++t._bucket.statistics.removed;const e=t._bucket.data,n=e[e.length-1];e[t._bucketIndex]=n,n._bucketIndex=t._bucketIndex,e.pop(),t._bucket=null,t._bucketIndex=0},n.updateKey=function(t,e){this.remove(t),this.add(e,t)},n.getBucket=function(t){return this._getBucket(t).data},n.getPerformanceInfo=function(t){return this._getBucket(t).statistics},n.forEach=function(t){this._buckets.forEach((e=>t(e.data,e.key)))},n._getBucket=function(t){const e=this._buckets.get(t);if(e)return e;const n=new s(t);return this._buckets.set(t,n),n},e._createClass(t,[{key:"count",get:function(){let t=0;return this._buckets.forEach((e=>t+=e.count)),t}}]),t}(),s=function(){function t(t){this.key=t,this.data=new Array,this.statistics={added:0,removed:0}}return e._createClass(t,[{key:"count",get:function(){return this.data.length}}]),t}();t.BucketStorable=u,t.BucketedObjectStore=c,Object.defineProperty(t,"__esModule",{value:!0})}));
