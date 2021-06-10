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

define(["dojo/_base/array","dojo/_base/lang","dojo/_base/Deferred","dojo/has","../kernel","../config","../deferredUtils","./Extent","./Polyline","./Polygon","./webMercatorUtils","./jsonUtils"],(function(e,n,r,t,a,i,o,s,f,c,l,u){function h(e,n){return Math.ceil((e-n)/(2*n))}function p(e,n){var r,t,a,i=e.paths||e.rings,o=i.length;for(r=0;r<o;r++){for(a=i[r].length,t=0;t<a;t++){var s=e.getPoint(r,t);e.setPoint(r,t,s.offset(n,0))}}return e}function g(n,r){if(!(n instanceof f||n instanceof c)){var t="_straightLineDensify: the input geometry is neither polyline nor polygon";throw console.error(t),new Error(t)}var a,i=n instanceof f,o=i?n.paths:n.rings,s=[];return e.forEach(o,(function(e){var n,t,i,o,f,c,l,u,h,p,g,d;for(s.push(a=[]),a.push([e[0][0],e[0][1]]),f=0;f<e.length-1;f++){if(n=e[f][0],t=e[f][1],i=e[f+1][0],u=((o=e[f+1][1])-t)/(l=Math.sqrt((i-n)*(i-n)+(o-t)*(o-t))),h=(i-n)/l,(p=l/r)>1){for(c=1;c<=p-1;c++){var m=c*r;g=h*m+n,d=u*m+t,a.push([g,d])}var v=(l+Math.floor(p-1)*r)/2;g=h*v+n,d=u*v+t,a.push([g,d])}a.push([i,o])}})),i?new f({paths:s,spatialReference:n.spatialReference}):new c({rings:s,spatialReference:n.spatialReference})}function d(e,n,r){if(n){var t=g(e,1e6);e=l.webMercatorToGeographic(t,!0)}return r&&(e=p(e,r)),e}function m(e,n,r){var t,a=e.x||e[0];return a>n?(t=h(a,n),e.x?e=e.offset(t*(-2*n),0):e[0]=a+t*(-2*n)):a<r&&(t=h(a,r),e.x?e=e.offset(t*(-2*r),0):e[0]=a+t*(-2*r)),e}function v(n,r){var t=-1;return e.forEach(r.cutIndexes,(function(a,i){var o=r.geometries[i],s=o.rings||o.paths;e.forEach(s,(function(n,r){e.some(n,(function(e){if(e[0]<180)return!0;var t,a,i=0,s=n.length;for(t=0;t<s;t++)i=(a=n[t][0])>i?a:i;var f,c=-360*h(i=Number(i.toFixed(9)),180),l=n.length;for(f=0;f<l;f++){var u=o.getPoint(r,f);o.setPoint(r,f,u.offset(c,0))}return!0}))})),a===t?o.rings?e.forEach(o.rings,(function(e){n[a]=n[a].addRing(e)})):e.forEach(o.paths,(function(e){n[a]=n[a].addPath(e)})):(t=a,n[a]=o)})),n}function x(n,t,a,o){var s=new r;s.addCallbacks(a,o),t=t||i.defaults.geometryService;var g,x,y,b,_,E,w,M,k=[],O=[],j=0;e.forEach(n,(function(n){if(n)if(g||(g=n.spatialReference,x=g._getInfo(),y=g._isWebMercator(),w=new f({paths:[[[b=y?20037508.342788905:180,_=y?-20037508.342788905:-180],[b,b]]],spatialReference:{wkid:E=y?102100:4326}}),M=new f({paths:[[[_,_],[_,b]]],spatialReference:{wkid:E}})),x){var r=u.fromJson(n.toJson()),t=n.getExtent();if("point"===n.type)k.push(m(r,b,_));else if("multipoint"===n.type)r.points=e.map(r.points,(function(e){return m(e,b,_)})),k.push(r);else if("extent"===n.type){var a=t._normalize(null,null,x);k.push(a.rings?new c(a):a)}else if(t){var i=h(t.xmin,_)*(2*b);r=0===i?r:p(r,i),(t=t.offset(i,0)).intersects(w)&&t.xmax!==b?(j=t.xmax>j?t.xmax:j,r=d(r,y),O.push(r),k.push("cut")):t.intersects(M)&&t.xmin!==_?(j=t.xmax*(2*b)>j?t.xmax*(2*b):j,r=d(r,y,360),O.push(r),k.push("cut")):k.push(r)}else k.push(r)}else k.push(n);else k.push(n)}));for(var R=new f,C=h(j,b),P=-90,D=C;C>0;){var W=360*C-180;R.addPath([[W,P],[W,-1*P]]),P*=-1,C--}return O.length>0&&D>0?t?t.cut(O,R,(function(r){O=v(O,r);var a=[];e.forEach(k,(function(e,r){if("cut"===e){var t=O.shift();n[r].rings&&n[r].rings.length>1&&t.rings.length>=n[r].rings.length?(k[r]="simplify",a.push(t)):k[r]=!0===y?l.geographicToWebMercator(t):t}})),a.length>0?t.simplify(a,(function(n){e.forEach(k,(function(e,r){"simplify"===e&&(k[r]=!0===y?l.geographicToWebMercator(n.shift()):n.shift())})),s.callback(k)}),(function(e){s.errback(e)})):s.callback(k)}),(function(e){s.errback(e)})):s.errback(new Error("esri.geometry.normalizeCentralMeridian: 'geometryService' argument is missing.")):(e.forEach(k,(function(e,n){if("cut"===e){var r=O.shift();k[n]=!0===y?l.geographicToWebMercator(r):r}})),s.callback(k)),s}function y(r,t,a,i){var o,s=!1;n.isObject(r)&&r&&(n.isArray(r)?r.length&&((o=r[0]&&r[0].declaredClass)&&-1!==o.indexOf("Graphic")?s=!!(r=e.map(r,(function(e){return e.geometry}))).length:o&&-1!==o.indexOf("esri.geometry.")&&(s=!0)):(o=r.declaredClass)&&-1!==o.indexOf("FeatureSet")?s=!!(r=e.map(r.features||[],(function(e){return e.geometry}))).length:o&&-1!==o.indexOf("esri.geometry.")&&(s=!0)),s&&t.push({index:a,property:i,value:r})}function b(r,t){var a=[];return e.forEach(t,(function(t){var i,o=t.i,s=r[o],f=t.p;if(n.isObject(s)&&s)if(f)if("*"===f[0])for(i in s)s.hasOwnProperty(i)&&y(s[i],a,o,i);else e.forEach(f,(function(e){y(n.getObject(e,!1,s),a,o,e)}));else y(s,a,o)})),a}function _(r,t){var a=0,i={};return e.forEach(t,(function(e){var t=e.index,o=e.property,s=e.value,f=s.length||1,c=r.slice(a,a+f);n.isArray(s)||(c=c[0]),a+=f,delete e.value,o?(i[t]=i[t]||{},i[t][o]=c):i[t]=c})),i}function E(e){for(var n=[],r=0,t=0,a=Math.min,i=Math.max,o=0;o<e.length;o++){for(var s=e[o],f=null,c=0;c<s.length;c++)f=s[c],n.push(f),0===c?t=r=f[0]:(r=a(r,f[0]),t=i(t,f[0]));f&&n.push([(r+t)/2,0])}return n}var w={normalizeCentralMeridian:x,_foldCutResults:v,_prepareGeometryForCut:d,_offsetMagnitude:h,_pointNormalization:m,_updatePolyGeometry:p,_straightLineDensify:g,_createWrappers:function(t){var a=n.isObject(t)?t.prototype:n.getObject(t+".prototype");e.forEach(a.__msigns,(function(n){var t=a[n.n];a[n.n]=function(){var a,i=this,s=[],f=new r(o._dfdCanceller);for(n.f&&o._fixDfd(f),a=0;a<n.c;a++)s[a]=arguments[a];var c={dfd:f};s.push(c);var l,u,h=[];return i.normalization&&!i._isTable&&(l=b(s,n.a),e.forEach(l,(function(e){h=h.concat(e.value)})),h.length&&(u=x(h))),u?(f._pendingDfd=u,u.addCallbacks((function(e){f.canceled||(c.assembly=_(e,l),f._pendingDfd=t.apply(i,s))}),(function(e){var r=i.declaredClass;r&&-1!==r.indexOf("FeatureLayer")?i._resolve([e],null,s[n.e],f,!0):i._errorHandler(e,s[n.e],f)}))):f._pendingDfd=t.apply(i,s),f}}))},_disassemble:b,_addToBucket:y,_reassemble:_,getDenormalizedExtent:function(e){if(!e)return null;var n=e.getExtent();if(!n)return null;var r=e.spatialReference&&e.spatialReference._getInfo();if(!r)return n;var t,a=r.valid[0],i=r.valid[1],o=2*i,f=n.getWidth(),c=n.xmax,l=n.xmin;if("extent"===e.type||0===f||f<=i||f>o||c<a||l>i)return n;switch(e.type){case"polygon":if(!(e.rings.length>1))return n;t=E(e.rings);break;case"polyline":if(!(e.paths.length>1))return n;t=E(e.paths);break;case"multipoint":t=e.points}for(var u=Math.min,h=Math.max,p=new s(n.toJson()),g=0;g<t.length;g++){var d=t[g][0];d<0?l=h(d+=i,l):c=u(d-=i,c)}return p.xmin=c,p.xmax=l,p.getWidth()<f?(p.xmin-=i,p.xmax-=i,p):n}};return t("extend-esri")&&n.mixin(n.getObject("geometry",!0,a),w),w}));