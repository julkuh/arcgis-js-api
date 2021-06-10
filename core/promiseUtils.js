/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./maybe","./Logger","./Error","./clock","./events"],(function(e,r,t,n,o,i){"use strict";function u(e){return Promise.all(e)}function s(e,r){const t=e.slice();return Promise.all(e.map(((e,t)=>r(e,t)))).then((e=>t.filter(((r,t)=>e[t]))))}function c(e){return new Promise(((r,t)=>{try{e(r,t)}catch(n){Promise.resolve().then((()=>t(n)))}}))}function l(e="Aborted"){return new n("AbortError",e)}function f(){return new AbortController}function a(e){if(h(e))throw l()}function m(e){return r.isSome(e)?"aborted"in e?e:e.signal:e}function h(e){const t=m(e);return r.isSome(t)&&t.aborted}function b(e){if(v(e))throw e}function w(e){if(!v(e))throw e}function p(e,t){const n=m(e);if(!r.isNone(n)){if(!n.aborted)return i.once(n,"abort",(()=>t()));t()}}function d(e,t){const n=m(e);if(!r.isNone(n))return a(n),i.once(n,"abort",(()=>t(l())))}function A(e,t){const n=m(t);return r.isNone(n)?e:new Promise(((n,o)=>{let i=p(t,(()=>o(l())));const u=()=>i=r.removeMaybe(i);e.then(u,u),e.then(n,o)}))}function v(e){return e&&"AbortError"===e.name}function P(e){return e.catch((e=>{if(!v(e))throw e}))}function y(e,r=t.getLogger("esri")){return e.catch((e=>{v(e)||r.error(e)}))}function E(){let e=null;const r=new Promise(((r,t)=>{e={promise:void 0,resolve:r,reject:t}}));return e.promise=r,e}function g(e){if(!e)return;if("function"!=typeof e.forEach){const r=Object.keys(e);return g(r.map((r=>e[r]))).then((e=>{const t={};return r.forEach(((r,n)=>t[r]=e[n])),t}))}const r=e;return Promise.allSettled(r).then((e=>Array.from(r,((r,t)=>{const n=e[t];return"fulfilled"===n.status?{promise:r,value:n.value}:{promise:r,error:n.reason}}))))}function j(e){return g(e).then((e=>e.filter((e=>!!e.value)).map((e=>e.value))))}function T(e){return Promise.reject(e)}function N(e){return Promise.resolve(e)}function O(e,r,t){const n=f();return p(t,(()=>n.abort())),new Promise(((t,o)=>{let i=setTimeout((()=>{i=0,t(r)}),e);p(n,(()=>{i&&(clearTimeout(i),o(l()))}))}))}function k(e,r,t,o){const i=t&&"abort"in t?t:null;null!=o||i||(o=t);let u=setTimeout((()=>{u=0,i&&i.abort()}),r);const s=()=>{throw o||new n("promiseUtils:timeout","The wrapped promise did not resolve within "+r+" ms")};return e.then((e=>{if(0===u)throw s();return clearTimeout(u),e}),(e=>{throw clearTimeout(u),0===u?s():e}))}function I(e){return e&&"function"==typeof e.then}function L(e){return e&&"object"==typeof e&&"then"in e&&"function"==typeof e.then?e:Promise.resolve(e)}function S(e,t=-1){let n,o,i,u,s=null;const c=(...a)=>{if(n){o=a,u&&u.reject(l()),u=E();const e=r.assumeNonNull(u.promise);if(s){const e=s;s=null,e.abort()}return e}if(i=u||E(),u=null,t>0){const r=f();n=L(e(...a,r.signal));const o=n;O(t).then((()=>{n===o&&(u?r.abort():s=r)}))}else n=1,n=L(e(...a));const m=()=>{const e=o;o=i=n=s=null,null!=e&&c(...e)},h=n,b=i;return h.then(m,m),h.then(b.resolve,b.reject),r.assumeNonNull(b.promise)};return c}function C(){let e,r;const t=new Promise(((t,n)=>{e=t,r=n})),n=r=>{e(r)};return n.resolve=r=>e(r),n.reject=e=>r(e),n.timeout=(e,r)=>o.default.setTimeout((()=>n.reject(r)),e),n.promise=t,n}function M(e,r){return e.then(r,r)}function _(e){let r=f();const t=e(r.signal);let n={promise:t,finished:!1,abort:()=>{r&&(r.abort(),r=null)}};const o=()=>{n&&(n.finished=!0,n=null),r=null};return t.then(o,o),n}e.after=O,e.all=u,e.always=M,e.create=c,e.createAbortController=f,e.createAbortError=l,e.createDeferred=E,e.createResolver=C,e.createTask=_,e.debounce=S,e.eachAlways=g,e.eachAlwaysValues=j,e.filter=s,e.ignoreAbortErrors=P,e.isAbortError=v,e.isAborted=h,e.isPromiseLike=I,e.logOnError=y,e.onAbort=p,e.onAbortOrThrow=d,e.reject=T,e.resolve=N,e.throwIfAbortError=b,e.throwIfAborted=a,e.throwIfNotAbortError=w,e.timeout=k,e.when=L,e.whenOrAbort=A,Object.defineProperty(e,"__esModule",{value:!0})}));
