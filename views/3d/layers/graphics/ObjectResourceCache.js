/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../core/handleUtils","../../../../core/promiseUtils","../../../../core/Handles","../../glTF/DefaultLoadingContext","../../glTF/loader","./wosrLoader"],(function(e,t,o,r,n,s,i,a,l){"use strict";let c=function(){function e(){this.gltfCache=new Map,this.wosrCache=new Map,this.evictHandles=new s}var c=e.prototype;return c.loadGLTF=function(e,t,o){const r=o?`gltfPBR:${e}`:`gltf:${e}`;return this.fromCache(this.gltfCache,r,(t=>a.load(new i.DefaultLoadingContext(t.streamDataRequester),e,t,o)),t)},c.loadWOSR=function(e,t){const o=`wosr:${e}:${t.disableTextures}`;return this.fromCache(this.wosrCache,o,(t=>l.load(e,t)),t)},c.destroy=function(){this.evictHandles.destroy(),this.gltfCache.clear(),this.wosrCache.clear()},c.fromCache=function(e,t,r,s){return new Promise(((i,a)=>{if(n.isAborted(s))return void a(n.createAbortError());const l=n.onAbort(s,(()=>{this.remove(e,t),a(n.createAbortError())})),c=e.get(t);if(c)return this.evictHandles.remove(t),c.refCount++,void c.item.then(i,a);const h=n.createAbortController(),u={...s,signal:h.signal},d={refCount:1,abortController:h,item:r(u).then((o=>(d.abortController=null,o.remove=()=>this.remove(e,t),o)))};e.set(t,d),d.item.then((e=>{o.isSome(l)&&l.remove(),i(e)}),(e=>{o.isSome(l)&&l.remove(),a(e)}))}))},c.remove=function(e,t){const n=e.get(t);n&&(n.refCount--,0===n.refCount&&this.evictHandles.add(r.timeoutHandle((()=>{e.delete(t),o.isSome(n.abortController)&&n.abortController.abort()}),u),t))},t._createClass(e,[{key:"size",get:function(){return this.wosrCache.size+this.gltfCache.size}}]),e}();const h=1e4;let u=h;const d={overrideEvictDelay:e=>(u=e,{remove(){u=h}})};e.ObjectResourceCache=c,e.test=d,Object.defineProperty(e,"__esModule",{value:!0})}));
