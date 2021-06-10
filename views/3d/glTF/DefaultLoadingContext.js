/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","../../../core/Error","../../../core/urlUtils","../../../core/promiseUtils","../../../request","../../../core/asyncUtils"],(function(e,r,t,o,a,n,s){"use strict";let i=function(){function e(e){this.streamDataRequester=e}var i=e.prototype;return i.loadJSON=async function(e,r){return this.load("json",e,r)},i.loadBinary=async function(e,r){return o.isDataProtocol(e)?(a.throwIfAborted(r),o.dataToArrayBuffer(e)):this.load("binary",e,r)},i.loadImage=async function(e,r){return this.load("image",e,r)},i.load=async function(e,o,i){if(r.isNone(this.streamDataRequester))return(await n(o,{responseType:u[e]})).data;const c=await s.result(this.streamDataRequester.request(o,e,i));if(!0===c.ok)return c.value;throw a.throwIfAbortError(c.error),new t("",`Request for resource failed: ${c.error}`)},e}();const u={image:"image",binary:"array-buffer",json:"json"};e.DefaultLoadingContext=i,Object.defineProperty(e,"__esModule",{value:!0})}));
