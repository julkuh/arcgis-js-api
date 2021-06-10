/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../core/global","../core/maybe","../core/Error","./messages","../request"],(function(e,t,n,r,o,s){"use strict";async function i(e,t,n,s){const i=t.exec(n);if(!i)throw new r("esri-intl:invalid-bundle",`Bundle id "${n}" is not compatible with the pattern "${t}"`);const c=i[1]?`${i[1]}/`:"",l=i[2],u=o.normalizeMessageBundleLocale(s),d=`${c}${l}.json`,f=u?`${c}${l}_${u}.json`:d;let h;try{h=await a(e(f))}catch(w){if(f===d)throw new r("intl:unknown-bundle",`Bundle "${n}" cannot be loaded`,{error:w});try{h=await a(e(d))}catch(w){throw new r("intl:unknown-bundle",`Bundle "${n}" cannot be loaded`,{error:w})}}return h}async function a(e){if(n.isSome(u.fetchBundleAsset))return u.fetchBundleAsset(e);const t=await s(e,{responseType:"text"});return JSON.parse(t.data)}let c=function(){function e({base:e="",pattern:n,location:r=new URL(window.location.href)}){let o;o="string"==typeof r?e=>new URL(e,new URL(r,t.location)).href:r instanceof URL?e=>new URL(e,r).href:r,this.pattern="string"==typeof n?new RegExp(`^${n}`):n,this.getAssetUrl=o,e=e?e.endsWith("/")?e:e+"/":"",this.matcher=new RegExp(`^${e}(?:(.*)/)?(.*)$`)}return e.prototype.fetchMessageBundle=function(e,t){return i(this.getAssetUrl,this.matcher,e,t)},e}();function l(e){return new c(e)}const u={};e.JSONLoader=c,e.createJSONLoader=l,e.test=u,Object.defineProperty(e,"__esModule",{value:!0})}));
