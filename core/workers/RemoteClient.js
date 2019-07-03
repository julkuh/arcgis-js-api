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

define(["require","exports","../Error","../promiseUtils","./utils"],function(e,t,o,s,n){function r(e,t){e.delete(t)}var i=n.MessageType.CLOSE,a=n.MessageType.ABORT,h=n.MessageType.INVOKE,c=n.MessageType.RESPONSE,p=n.MessageType.OPEN_PORT,u=function(){function e(e){this._timer=null,this._cancelledJobIds=new Set,this._invokeMessages=[],this._invoke=e,this._timer=null,this._process=this._process.bind(this)}return e.prototype.push=function(e){e.type===n.MessageType.ABORT?this._cancelledJobIds.add(e.jobId):(this._invokeMessages.push(e),null===this._timer&&(this._timer=setTimeout(this._process,0)))},e.prototype.clear=function(){this._invokeMessages.length=0,this._cancelledJobIds.clear(),this._timer=null},e.prototype._process=function(){this._timer=null;for(var e=0,t=this._invokeMessages;e<t.length;e++){var o=t[e];this._cancelledJobIds.has(o.jobId)||this._invoke(o)}this._cancelledJobIds.clear(),this._invokeMessages.length=0},e}();return function(){function e(e,t,o){var s=this;this._port=e,this._client=t,this._outJobs=new Map,this._inJobs=new Map,this._queue=new u(function(e){return s._onInvoke(e)}),this._responseQueue=[],this._onMessage=this._onMessage.bind(this),this._port.addEventListener("message",this._onMessage),this._port.start(),this._channel=o.channel,o.scheduler&&(this._frameTask=o.scheduler.registerTask(1,function(e){return s._update(e)},function(){return s._responseQueue.length>0}))}return e.connect=function(t){var o,s=new MessageChannel;return o="function"==typeof t?new t:"default"in t&&"function"==typeof t.default?new t.default:t,o.remoteClient=new e(s.port1,o,{channel:s}),s.port2},e.prototype.close=function(){this._post({type:i}),this._close()},e.prototype.isBusy=function(){return this._outJobs.size>0},e.prototype.invoke=function(e,t,i){var c=this,p=i&&i.signal,u=i&&i.transferList;if(!this._port)return s.reject(new o("remote-client:port-closed","Can't invoke(), port is closed"));var l=n.newJobId(),_=function(){var e=c._outJobs.get(l);e&&(r(c._outJobs,l),c._post({type:a,jobId:l}),e.reject(s.createAbortError()))};return s.create(function(o,n){s.onAbortOrThrow(p,function(){_(),n(s.createAbortError())});var r={resolve:o,reject:n};c._outJobs.set(l,r),c._post({type:h,jobId:l,methodName:e,abortable:!0},t,u)},_)},e.prototype.openPort=function(){var e=this,t=n.newJobId(),o=function(){r(e._outJobs,t),e._post({type:a,jobId:t})};return s.create(function(s,n){var r={resolve:s,reject:n,signal:o};e._outJobs.set(t,r),e._post({type:p,jobId:t})},o)},e.prototype._close=function(){this._channel&&(this._channel=null),this._port.removeEventListener("message",this._onMessage),this._port.close(),this._outJobs.forEach(function(e){return e.reject(s.createAbortError("Abort job: worker closing"))}),this._inJobs.clear(),this._outJobs.clear(),this._queue.clear(),this._port=this._client=null,this._frameTask&&this._frameTask.remove(),this._frameTask=null,this._responseQueue=null},e.prototype._onMessage=function(e){var t=n.receiveMessage(e);if(t)switch(t.type){case c:this._onResponse(t);break;case h:this._queue.push(t);break;case a:this._onAbort(t);break;case i:this._onClose();break;case p:this._onOpenPort(t)}},e.prototype._onAbort=function(e){var t=this._inJobs,o=e.jobId,s=t.get(o);this._queue.push(e),s&&(s.controller&&s.controller.abort(),r(t,o))},e.prototype._onClose=function(){var e=this._client;this._close(),e&&e.remoteClient===this&&"destroy"in e&&e.destroy(),e.remoteClient=null},e.prototype._onInvoke=function(e){var t,o=this,i=e.methodName,a=e.jobId,h=e.data,p=e.abortable,u=p?s.createAbortController():null,l=this._inJobs,_=this._client,f=_[i];try{if(!f&&i&&-1!==i.indexOf("."))for(var b=i.split("."),d=0;d<b.length-1;d++)_=_[b[d]],f=_[b[d+1]];if("function"!=typeof f)throw new TypeError(i+" is not a function");t=f.call(_,h,{client:this,signal:u?u.signal:null})}catch(e){return void this._post({type:c,jobId:a,error:n.toInvokeError(e)})}s.isThenable(t)?(l.set(a,{controller:u,promise:t}),u&&"cancel"in t&&s.onAbort(u.signal,function(){return t.cancel()}),t.then(function(e){l.has(a)&&(r(l,a),o._post({type:c,jobId:a},e))}).catch(function(e){l.has(a)&&(r(l,a),s.isAbortError(e)||o._post({type:c,jobId:a,error:n.toInvokeError(e||{message:"Error encountered at method "+i})}))})):this._post({type:c,jobId:a},t)},e.prototype._onOpenPort=function(t){var o=new MessageChannel;new e(o.port1,this._client,{}),this._post({type:c,jobId:t.jobId},o.port2,[o.port2])},e.prototype._onResponse=function(e){this._frameTask?this._responseQueue.push(e):this._handleResponse(e)},e.prototype._update=function(e){for(;!e.done&&this._responseQueue.length>0;)this._handleResponse(this._responseQueue.shift()),e.madeProgress()},e.prototype._handleResponse=function(e){var t=e.jobId,s=e.error,n=e.data,i=this._outJobs;if(i.has(t)){var a=i.get(t);r(i,t),s?a.reject(o.fromJSON(JSON.parse(s))):a.resolve(n)}},e.prototype._post=function(e,t,o){return n.postMessage(this._port,e,t,o)},e}()});