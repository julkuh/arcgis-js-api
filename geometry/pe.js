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

define(["require","exports","../core/tsSupport/extendsHelper","dojo/Deferred","../core/sniff"],(function(e,t,_,r,o){var n,p,P,i,a,E;function u(e){function r(e,t,_){e[t]=_(e[t])}t._pe=e,p.init(),P.init(),i.init(),a.init(),E.init(),t.PeGCSExtent=function(e){function r(){return null!==e&&e.apply(this,arguments)||this}return _(r,e),r.prototype.destroy=function(){t._pe.destroy(this)},r}(t._pe.PeGCSExtent);for(var o=0,n=[t._pe.PeDatum,t._pe.PeGeogcs,t._pe.PeGeogtran,t._pe.PeObject,t._pe.PeParameter,t._pe.PePrimem,t._pe.PeProjcs,t._pe.PeSpheroid,t._pe.PeUnit];o<n.length;o++){r(n[o].prototype,"getName",(function(e){return function(){return e.call(this,new Array(p.PE_NAME_MAX))}}))}for(var u=0,s=[t._pe.PeGeogtran,t._pe.PeProjcs];u<s.length;u++){r(s[u].prototype,"getParameters",(function(e){return function(){for(var _=new Array(p.PE_PARM_MAX),r=e.call(this),o=0;o<_.length;o++){var n=t._pe.getValue(r,"*");_[o]=n?t._pe.wrapPointer(n,t._pe.PeParameter):null,r+=Int32Array.BYTES_PER_ELEMENT}return _}}))}r(t._pe.PeHorizon.prototype,"getCoord",(function(e){return function(){var t=this.getSize();if(!t)return null;var _=[];return g(_,t,e.call(this)),_}})),r(t._pe.PeGTlistExtendedEntry.prototype,"getEntries",(function(e){var _=t._pe._pe_getPeGTlistExtendedGTsSize();return function(){var r=null,o=e.call(this);if(!t._pe.compare(o,t._pe.NULL)){r=[o];var n=this.getSteps();if(n>1)for(var p=t._pe.getPointer(o),P=1;P<n;P++)r.push(t._pe.wrapPointer(p+_*P,t._pe.PeGTlistExtendedGTs))}return r}}));var f=t._pe._pe_getPeHorizonSize(),c=function(e){return function(){var _=this._cache;if(_||(_=new Map,this._cache=_),_.has(e))return _.get(e);var r=null,o=e.call(this);if(!t._pe.compare(o,t._pe.NULL)){r=[o];var n=o.getNump();if(n>1)for(var p=t._pe.getPointer(o),P=1;P<n;P++)r.push(t._pe.wrapPointer(p+f*P,t._pe.PeHorizon))}return _.set(e,r),r}};r(t._pe.PeProjcs.prototype,"horizonGcsGenerate",c),r(t._pe.PeProjcs.prototype,"horizonPcsGenerate",c),t._pe.PeObject.prototype.toString=function(e){void 0===e&&(e=p.PE_STR_OPTS_NONE),t._pe.ensureCache.prepare();var _=t._pe.getPointer(this),r=t._pe.ensureInt8(new Array(p.PE_BUFFER_MAX));return t._pe.UTF8ToString(t._pe._pe_object_to_string_ext(_,e,r))}}function s(e){if(e){var _=t._pe.getClass(e);if(_){var r=t._pe.getCache(_);if(r){var o=t._pe.getPointer(e);o&&delete r[o]}}}}function f(e,_){for(var r=[],o=new Array(_),n=0;n<e;n++)r.push(t._pe.ensureInt8(o));return r}function c(e){var t;return Array.isArray(e[0])?(t=[],e.forEach((function(e){t.push(e[0],e[1])}))):t=e,t}function g(e,_,r,o){if(void 0===o&&(o=!1),o)for(var n=0;n<2*_;n++)e[n]=t._pe.getValue(r+n*Float64Array.BYTES_PER_ELEMENT,"double");else{var p=0===e.length;for(n=0;n<_;n++)p&&(e[n]=new Array(2)),e[n][0]=t._pe.getValue(r,"double"),e[n][1]=t._pe.getValue(r+Float64Array.BYTES_PER_ELEMENT,"double"),r+=2*Float64Array.BYTES_PER_ELEMENT}}Object.defineProperty(t,"__esModule",{value:!0}),t._pe=null,t.isLoaded=function(){return!!t._pe},t.isSupported=function(){return!!o("esri-wasm")},t.load=function(){return n?n.promise:(n=new r,e(["./support/pe-wasm"],(function(t){t({locateFile:function(t){return e.toUrl("./support/"+t)},onAbort:function(e){n.reject(new Error(e))}}).then((function(e){u(e),n.resolve()}))})),n.promise)},function(e){function _(e,_,r){t._pe.ensureCache.prepare();var o=c(r),n=r===o,p=t._pe.ensureFloat64(o),P=t._pe._pe_geog_to_proj(t._pe.getPointer(e),_,p);return P&&g(r,_,p,n),P}function r(e,t,_){return o(e,t,_,0)}function o(e,_,r,o){t._pe.ensureCache.prepare();var n=c(r),p=r===n,P=t._pe.ensureFloat64(n),i=t._pe._pe_proj_to_geog_center(t._pe.getPointer(e),_,P,o);return i&&g(r,_,P,p),i}e.geogToProj=_,e.projGeog=function(e,t,o,n){switch(n){case p.PE_TRANSFORM_P_TO_G:return r(e,t,o);case p.PE_TRANSFORM_G_TO_P:return _(e,t,o)}return 0},e.projToGeog=r,e.projToGeogCenter=o}(t.PeCSTransformations||(t.PeCSTransformations={})),function(e){e.init=function(){e.PE_BUFFER_MAX=t._pe.PeDefs.prototype.PE_BUFFER_MAX,e.PE_NAME_MAX=t._pe.PeDefs.prototype.PE_NAME_MAX,e.PE_MGRS_MAX=t._pe.PeDefs.prototype.PE_MGRS_MAX,e.PE_USNG_MAX=t._pe.PeDefs.prototype.PE_USNG_MAX,e.PE_DD_MAX=t._pe.PeDefs.prototype.PE_DD_MAX,e.PE_DDM_MAX=t._pe.PeDefs.prototype.PE_DDM_MAX,e.PE_DMS_MAX=t._pe.PeDefs.prototype.PE_DMS_MAX,e.PE_UTM_MAX=t._pe.PeDefs.prototype.PE_UTM_MAX,e.PE_PARM_MAX=t._pe.PeDefs.prototype.PE_PARM_MAX,e.PE_TYPE_NONE=t._pe.PeDefs.prototype.PE_TYPE_NONE,e.PE_TYPE_GEOGCS=t._pe.PeDefs.prototype.PE_TYPE_GEOGCS,e.PE_TYPE_PROJCS=t._pe.PeDefs.prototype.PE_TYPE_PROJCS,e.PE_TYPE_GEOGTRAN=t._pe.PeDefs.prototype.PE_TYPE_GEOGTRAN,e.PE_TYPE_COORDSYS=t._pe.PeDefs.prototype.PE_TYPE_COORDSYS,e.PE_TYPE_UNIT=t._pe.PeDefs.prototype.PE_TYPE_UNIT,e.PE_STR_OPTS_NONE=t._pe.PeDefs.prototype.PE_STR_OPTS_NONE,e.PE_STR_AUTH_NONE=t._pe.PeDefs.prototype.PE_STR_AUTH_NONE,e.PE_STR_AUTH_TOP=t._pe.PeDefs.prototype.PE_STR_AUTH_TOP,e.PE_STR_NAME_CANON=t._pe.PeDefs.prototype.PE_STR_NAME_CANON,e.PE_PARM_X0=t._pe.PeDefs.prototype.PE_PARM_X0,e.PE_PARM_ND=t._pe.PeDefs.prototype.PE_PARM_ND,e.PE_TRANSFORM_1_TO_2=t._pe.PeDefs.prototype.PE_TRANSFORM_1_TO_2,e.PE_TRANSFORM_2_TO_1=t._pe.PeDefs.prototype.PE_TRANSFORM_2_TO_1,e.PE_TRANSFORM_P_TO_G=t._pe.PeDefs.prototype.PE_TRANSFORM_P_TO_G,e.PE_TRANSFORM_G_TO_P=t._pe.PeDefs.prototype.PE_TRANSFORM_G_TO_P,e.PE_HORIZON_RECT=t._pe.PeDefs.prototype.PE_HORIZON_RECT,e.PE_HORIZON_POLY=t._pe.PeDefs.prototype.PE_HORIZON_POLY,e.PE_HORIZON_LINE=t._pe.PeDefs.prototype.PE_HORIZON_LINE,e.PE_HORIZON_DELTA=t._pe.PeDefs.prototype.PE_HORIZON_DELTA}}(p=t.PeDefs||(t.PeDefs={})),function(e){var _={},r={};function o(e,r){var o=null,p=_[e];if(p||(p={},_[e]=p),p.hasOwnProperty(String(r)))o=p[r];else{var P=t._pe.PeFactory.prototype.factoryByType(e,r);t._pe.compare(P,t._pe.NULL)||(o=P,p[r]=o)}return o=n(o)}function n(e){if(e){var _=e.getType();switch(_){case p.PE_TYPE_GEOGCS:e=t._pe.castObject(e,t._pe.PeGeogcs);break;case p.PE_TYPE_PROJCS:e=t._pe.castObject(e,t._pe.PeProjcs);break;case p.PE_TYPE_GEOGTRAN:e=t._pe.castObject(e,t._pe.PeGeogtran);break;default:_&p.PE_TYPE_UNIT&&(e=t._pe.castObject(e,t._pe.PeUnit))}}return e}e.initialize=function(){t._pe.PeFactory.prototype.initialize(null)},e.coordsys=function(e){return o(p.PE_TYPE_COORDSYS,e)},e.factoryByType=o,e.fromString=function(e,_){var o=null,p=r[e];if(p||(p={},r[e]=p),p.hasOwnProperty(_))o=p[_];else{var P=t._pe.PeFactory.prototype.fromString(e,_);t._pe.compare(P,t._pe.NULL)||(o=P,p[_]=o)}return o=n(o)},e.geogcs=function(e){return o(p.PE_TYPE_GEOGCS,e)},e.geogtran=function(e){return o(p.PE_TYPE_GEOGTRAN,e)},e.getCode=function(e){return t._pe.PeFactory.prototype.getCode(e)},e.projcs=function(e){return o(p.PE_TYPE_PROJCS,e)},e.unit=function(e){return o(p.PE_TYPE_UNIT,e)}}(t.PeFactory||(t.PeFactory={})),t.PeGCSExtent=null,function(e){var _;e.init=function(){e.PE_GTLIST_OPTS_COMMON=t._pe.PeGTlistExtended.prototype.PE_GTLIST_OPTS_COMMON,_=t._pe._pe_getPeGTlistExtendedEntrySize()},e.getGTlist=function(e,r,o,n,p,P){var i=null,a=new t._pe.PeInteger(P);try{var E=t._pe.PeGTlistExtended.prototype.getGTlist(e,r,o,n,p,a);if((P=a.val)&&(i=[E],P>1))for(var u=t._pe.getPointer(E),s=1;s<P;s++)i.push(t._pe.wrapPointer(u+_*s,t._pe.PeGTlistExtendedEntry))}finally{t._pe.destroy(a)}return i}}(P=t.PeGTlistExtended||(t.PeGTlistExtended={})),function(e){e.destroy=function(e){if(e&&e.length){for(var _=0,r=e;_<r.length;_++){var o=r[_];s(o),o.getEntries().forEach((function(e){s(e);var t=e.getGeogtran();s(t),t.getParameters().forEach(s),[t.getGeogcs1(),t.getGeogcs2()].forEach((function(e){s(e);var t=e.getDatum();s(t),s(t.getSpheroid()),s(e.getPrimem()),s(e.getUnit())}))}))}t._pe.PeGTlistExtendedEntry.prototype.Delete(e[0])}}}(t.PeGTlistExtendedEntry||(t.PeGTlistExtendedEntry={})),function(e){e.geogToGeog=function(e,_,r,o,n){t._pe.ensureCache.prepare();var p=c(r),P=r===p,i=t._pe.ensureFloat64(p),a=0;o&&(a=t._pe.ensureFloat64(o));var E=t._pe._pe_geog_to_geog(t._pe.getPointer(e),_,i,a,n);return E&&g(r,_,i,P),E}}(t.PeGTTransformations||(t.PeGTTransformations={})),function(e){function _(e,_,r,o,n,P){var i,a;switch(t._pe.ensureCache.prepare(),e){case"dd":i=t._pe._pe_geog_to_dd,a=p.PE_DD_MAX;break;case"ddm":i=t._pe._pe_geog_to_ddm,a=p.PE_DDM_MAX;break;case"dms":i=t._pe._pe_geog_to_dms,a=p.PE_DMS_MAX}var E=0;_&&(E=t._pe.getPointer(_));var u=c(o),s=t._pe.ensureFloat64(u),g=f(r,a),T=i(E,r,s,n,t._pe.ensureInt32(g));if(T)for(var O=0;O<r;O++)P[O]=t._pe.UTF8ToString(g[O]);return T}function r(e,_,r,o,n){var p;switch(t._pe.ensureCache.prepare(),e){case"dd":p=t._pe._pe_dd_to_geog;break;case"ddm":p=t._pe._pe_ddm_to_geog;break;case"dms":p=t._pe._pe_dms_to_geog}var P=0;_&&(P=t._pe.getPointer(_));var i=o.map((function(e){return t._pe.ensureString(e)})),a=t._pe.ensureInt32(i),E=t._pe.ensureFloat64(new Array(2*r)),u=p(P,r,a,E);return u&&g(n,r,E),u}e.geog_to_dms=function(e,t,r,o,n){return _("dms",e,t,r,o,n)},e.dms_to_geog=function(e,t,_,o){return r("dms",e,t,_,o)},e.geog_to_ddm=function(e,t,r,o,n){return _("ddm",e,t,r,o,n)},e.ddm_to_geog=function(e,t,_,o){return r("ddm",e,t,_,o)},e.geog_to_dd=function(e,t,r,o,n){return _("dd",e,t,r,o,n)},e.dd_to_geog=function(e,t,_,o){return r("dd",e,t,_,o)}}(t.PeNotationDms||(t.PeNotationDms={})),function(e){e.init=function(){e.PE_MGRS_STYLE_NEW=t._pe.PeNotationMgrs.prototype.PE_MGRS_STYLE_NEW,e.PE_MGRS_STYLE_OLD=t._pe.PeNotationMgrs.prototype.PE_MGRS_STYLE_OLD,e.PE_MGRS_STYLE_AUTO=t._pe.PeNotationMgrs.prototype.PE_MGRS_STYLE_AUTO,e.PE_MGRS_180_ZONE_1_PLUS=t._pe.PeNotationMgrs.prototype.PE_MGRS_180_ZONE_1_PLUS,e.PE_MGRS_ADD_SPACES=t._pe.PeNotationMgrs.prototype.PE_MGRS_ADD_SPACES},e.geog_to_mgrs_extended=function(e,_,r,o,n,P,i){t._pe.ensureCache.prepare();var a=0;e&&(a=t._pe.getPointer(e));var E=c(r),u=t._pe.ensureFloat64(E),s=f(_,p.PE_MGRS_MAX),g=t._pe.ensureInt32(s),T=t._pe._pe_geog_to_mgrs_extended(a,_,u,o,n,P,g);if(T)for(var O=0;O<_;O++)i[O]=t._pe.UTF8ToString(s[O]);return T},e.mgrs_to_geog_extended=function(e,_,r,o,n){t._pe.ensureCache.prepare();var p=0;e&&(p=t._pe.getPointer(e));var P=r.map((function(e){return t._pe.ensureString(e)})),i=t._pe.ensureInt32(P),a=t._pe.ensureFloat64(new Array(2*_)),E=t._pe._pe_mgrs_to_geog_extended(p,_,i,o,a);return E&&g(n,_,a),E}}(i=t.PeNotationMgrs||(t.PeNotationMgrs={})),function(e){e.geog_to_usng=function(e,_,r,o,n,P,i){t._pe.ensureCache.prepare();var a=0;e&&(a=t._pe.getPointer(e));var E=c(r),u=t._pe.ensureFloat64(E),s=f(_,p.PE_MGRS_MAX),g=t._pe.ensureInt32(s),T=t._pe._pe_geog_to_usng(a,_,u,o,n,P,g);if(T)for(var O=0;O<_;O++)i[O]=t._pe.UTF8ToString(s[O]);return T},e.usng_to_geog=function(e,_,r,o){t._pe.ensureCache.prepare();var n=0;e&&(n=t._pe.getPointer(e));var p=r.map((function(e){return t._pe.ensureString(e)})),P=t._pe.ensureInt32(p),i=t._pe.ensureFloat64(new Array(2*_)),a=t._pe._pe_usng_to_geog(n,_,P,i);return a&&g(o,_,i),a}}(t.PeNotationUsng||(t.PeNotationUsng={})),function(e){e.init=function(){e.PE_UTM_OPTS_NONE=t._pe.PeNotationUtm.prototype.PE_UTM_OPTS_NONE,e.PE_UTM_OPTS_ADD_SPACES=t._pe.PeNotationUtm.prototype.PE_UTM_OPTS_ADD_SPACES,e.PE_UTM_OPTS_NS=t._pe.PeNotationUtm.prototype.PE_UTM_OPTS_NS},e.geog_to_utm=function(e,_,r,o,n){t._pe.ensureCache.prepare();var P=0;e&&(P=t._pe.getPointer(e));var i=c(r),a=t._pe.ensureFloat64(i),E=f(_,p.PE_UTM_MAX),u=t._pe.ensureInt32(E),s=t._pe._pe_geog_to_utm(P,_,a,o,u);if(s)for(var g=0;g<_;g++)n[g]=t._pe.UTF8ToString(E[g]);return s},e.utm_to_geog=function(e,_,r,o,n){t._pe.ensureCache.prepare();var p=0;e&&(p=t._pe.getPointer(e));var P=r.map((function(e){return t._pe.ensureString(e)})),i=t._pe.ensureInt32(P),a=t._pe.ensureFloat64(new Array(2*_)),E=t._pe._pe_utm_to_geog(p,_,i,o,a);return E&&g(n,_,a),E}}(a=t.PeNotationUtm||(t.PeNotationUtm={})),function(e){var _=new Map;e.init=function(){e.PE_PCSINFO_OPTION_NONE=t._pe.PePCSInfo.prototype.PE_PCSINFO_OPTION_NONE,e.PE_PCSINFO_OPTION_DOMAIN=t._pe.PePCSInfo.prototype.PE_PCSINFO_OPTION_DOMAIN,e.PE_POLE_OUTSIDE_BOUNDARY=t._pe.PePCSInfo.prototype.PE_POLE_OUTSIDE_BOUNDARY,e.PE_POLE_POINT=t._pe.PePCSInfo.prototype.PE_POLE_POINT},e.generate=function(r,o){var n,p;return void 0===o&&(o=e.PE_PCSINFO_OPTION_DOMAIN),_.has(r)&&(p=_.get(r))[o]&&(n=p[o]),n||(n=t._pe.PePCSInfo.prototype.generate(r,o),p||(p=[],_.set(r,p)),p[o]=n),n}}(E=t.PePCSInfo||(t.PePCSInfo={})),function(e){e.version_string=function(){return t._pe.PeVersion.prototype.version_string()}}(t.PeVersion||(t.PeVersion={})),t._init=u}));