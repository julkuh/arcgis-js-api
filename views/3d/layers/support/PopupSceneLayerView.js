/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/maybe","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/Error","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../layers/support/fieldUtils","../../../layers/support/popupUtils"],(function(e,r,t,s,o,p,a,c,i,u,n,l,h,y,d){"use strict";const f=e=>{let s=function(e){function t(){return e.apply(this,arguments)||this}r._inheritsLoose(t,e);var s=t.prototype;return s._validateFetchPopupFeatures=function(e){const{layer:r}=this,{popupEnabled:t}=r;if(!t)return new u("scenelayerview3d:fetchPopupFeatures","Popups are disabled",{layer:r});return d.getFetchPopupTemplate(r,e)?void 0:new u("scenelayerview3d:fetchPopupFeatures","Layer does not define a popup template",{layer:r})},s.prepareFetchPopupFeatures=async function(e){},s.fetchPopupFeatures=async function(e,r){const t=this._validateFetchPopupFeatures(r);if(t)return Promise.reject(t);const s=o.isSome(r)?r.clientGraphics:null;if(!s||0===s.length)return Promise.resolve([]);const p=[],a=[],c="scene"===this.layer.type&&o.isSome(this.layer.associatedLayer)?this.layer.associatedLayer:this.layer,i=y.unpackFieldNames(this.layer.fields,await d.getRequiredFields(c,d.getFetchPopupTemplate(this.layer,r)));await this.prepareFetchPopupFeatures(i);const u=new Set;for(const o of s)y.populateMissingFields(i,o,u)?a.push(o):p.push(o);return 0===a.length?Promise.resolve(p):this.whenGraphicAttributes(a,[...u]).catch((()=>a)).then((e=>p.concat(e)))},t}(e);return s=t.__decorate([i.subclass("esri.views.3d.layers.support.PopupSceneLayerView")],s),s};e.PopupSceneLayerView=f,Object.defineProperty(e,"__esModule",{value:!0})}));
