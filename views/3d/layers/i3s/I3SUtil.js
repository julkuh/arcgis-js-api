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

define(["require","exports","../../../../request","../../../../core/arrayUtils","../../../../core/Error","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/typedArrayUtil","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/vec4f64","../../../../geometry/SpatialReference","../../../../geometry/support/aaBoundingBox","../../../../geometry/support/webMercatorUtils","../../../../tasks/QueryTask","../../../../tasks/support/Query","./I3SBinaryReader","../../support/projectionUtils","../../support/stack"],function(e,r,t,n,a,o,i,l,u,s,c,f,h,d,p,g,m,v){function y(e){return e&&parseInt(e.substring(e.lastIndexOf("/")+1,e.length),10)}function b(e,t){if(t)for(var n=0;n<e.length;n++)if(e[n].encoding===r.DDS_ENCODING_STRING)return e[n];for(var n=0;n<e.length;n++)if(r.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS.indexOf(e[n].encoding)>-1)return e[n];return null}function w(e,r,t,n,a,o){a.traverse(t,function(t){var a=t.mbs;r!==n&&(a=Z,m.mbsToMbs(t.mbs,n,a,r));var i=R(e,a);if(0!==i)return o(t,i),!0})}function S(e,r,t){for(var n=0,a=0,o=0;o<r.length&&n<e.length;o++)e[n]===r[o]&&(t(o)&&(e[a]=e[n],a++),n++);e.length=a}function x(e,r){var t=u.mat4.copy(v.sm4d.get(),r.objectTransformation),n=r.getGeometryRecords()[0].getShaderTransformation();if(u.mat4.multiply(t,t,n),0===t[1]&&0===t[2]&&0===t[3]&&0===t[4]&&0===t[6]&&0===t[7]&&0===t[8]&&0===t[9]&&0===t[11]&&1===t[15])return Y[0]=(e[0]-t[12])/t[0],Y[1]=(e[1]-t[13])/t[5],Y[2]=(e[2]-t[14])/t[10],Y[3]=(e[3]-t[12])/t[0],Y[4]=(e[4]-t[13])/t[5],Y[5]=(e[5]-t[14])/t[10],Y}function R(e,r){var t=r[0],n=r[1],a=r[2],o=r[3],i=e[0]-t,l=t-e[3],u=e[1]-n,s=n-e[4],c=e[2]-a,f=a-e[5],h=Math.max(i,l,0),d=Math.max(u,s,0),p=Math.max(c,f,0),g=h*h+d*d+p*p;return g>o*o?0:g>0?1:-Math.max(i,l,u,s,c,f)>o?3:2}function I(e,r,t){for(var n=[],a=t&&t.missingFields,o=t&&t.originalFields,i=0,l=e;i<l.length;i++){for(var u=l[i],s=u.toLowerCase(),c=!1,f=0,h=r;f<h.length;f++){var d=h[f];if(s===d.name.toLowerCase()){n.push(d.name),c=!0,o&&o.push(u);break}}!c&&a&&a.push(u)}return n}function C(e,r,t,o,l,u){var s=!0===(u&&u.populateObjectId),c=u.ignoreUnavailableFields?void 0:[],f=1===o.length&&"*"===o[0];!f&&s&&(o=M(o,t));var h=f?o:I(o,e.fields,{missingFields:c});if(c&&0!==c.length)return i.reject(new a("scenelayer:unknown-fields","This scene layer does not have the requested fields",{unknownFields:c}));if(0===r.length)return i.resolve(r);var d=e.associatedLayer,p=e.attributeStorageInfo,g=f?e.fields.map(function(e){return e.name}):h;if(d)return T(d,r,t,g);var m=A(g,r[0]);if(0===m.length)return i.resolve(r);if(p){var v=l(r);if(!v)return i.reject(new a("scenelayer:features-not-loaded","Tried to query attributes for unloaded features"));var y=e.parsedUrl.path;return i.all(v.map(function(e){return G(y,p,e.node,e.indices,m,u).then(function(r){for(var t=0;t<e.graphics.length;t++){for(var n=0,a=g;n<a.length;n++){var o=a[n];o in r[t]||(r[t][o]=e.graphics[t].attributes[o])}e.graphics[t].attributes=r[t]}return e.graphics})})).then(n.flatten)}return i.reject(new a("scenelayer:no-attribute-source","This scene layer does not have a source for attributes available"))}function M(e,r){return e.filter(function(e){return e.toLowerCase()!==r.toLowerCase()}).concat([r])}function T(e,r,t,n){r.sort(function(e,r){return e.attributes[t]-r.attributes[t]});var a=r.map(function(e){return e.attributes[t]}),o=[],i=I(n,e.fields,{originalFields:o});return k(e,a,i).then(function(e){for(var t=0;t<r.length;t++){var n=r[t],a=e[t];n.attributes={};for(var l=0;l<o.length;l++)n.attributes[o[l]]=a[i[l]]}return r})}function A(e,r){for(var t=[],n=0,a=e;n<a.length;n++){var o=a[n];o in r.attributes||t.push(o)}return t}function k(e,r,t){if(null!=e.maxRecordCount&&r.length>e.maxRecordCount){var n=F(r,e.maxRecordCount);return i.all(n.map(function(r){return k(e,r,t)})).then(N)}var o=new p({objectIds:r,outFields:t,orderByFields:[e.objectIdField]});return new d(e.parsedUrl.path).execute(o).then(function(e){return e&&e.features&&e.features.length===r.length?e.features.map(function(e){return e.attributes}):i.reject(new a("scenelayer:feature-not-in-associated-layer","Feature not found in associated feature layer"))})}function G(e,r,n,o,l,u){for(var s=[],c=0,f=r;c<f.length;c++){var h=f[c];if(h&&-1!==l.indexOf(h.name)){var d=e+"/nodes/"+n.resources.attributes+"/attributes/"+h.key+"/0";s.push({url:d,storageInfo:h})}}return i.eachAlways(s.map(function(e){return t(e.url,{responseType:"array-buffer"}).then(function(r){return g.readBinaryAttribute(e.storageInfo,r.data)})})).then(function(e){var r=[];if(!u.ignoreUnavailableFields&&e.some(function(e){return null==e.value})){for(var t=[],n=0;n<e.length;n++)null==e[n].value&&t.push({name:s[n].storageInfo.name,error:e[n].error});return i.reject(new a("scenelayer:attribute-request-failed","Request for scene layer attributes failed",{failedAttributes:t}))}for(var l=0,c=o;l<c.length;l++){for(var f=c[l],h={},n=0;n<e.length;n++)null!=e[n].value&&(h[s[n].storageInfo.name]=E(e[n].value,f));r.push(h)}return r})}function E(e,r){if(!e)return null;var t=e[r];return l.isInt16Array(e)?t===$?null:t:l.isInt32Array(e)?t===ee?null:t:t!==t?null:t}function F(e,r){for(var t=e.length,n=Math.ceil(t/r),a=[],o=0;o<n;o++){var i=Math.floor(t*o/n),l=Math.floor(t*(o+1)/n);a.push(e.slice(i,l))}return a}function N(e){for(var r=[],t=0,n=e;t<n.length;t++){var a=n[t];r=r.concat(a)}return r}function j(e,r,t){for(var n=null!=r?r:e.length/t,o=new Uint32Array(n+1),i=0;i<n;i++){var l=e[i*t],u=3*l;o[i]=u;var s=(i-1)*t+1;if(s>=0&&l-1!==e[s])throw new a("Face ranges are not continuous")}var c=e[(n-1)*t+1],f=3*(c+1);return o[o.length-1]=f,o}function O(e){var r=new c(y(e.store.indexCRS||e.store.geographicCRS));return r.equals(e.spatialReference)?e.spatialReference:r}function _(e){var r=new c(y(e.store.vertexCRS||e.store.projectedCRS));return r.equals(e.spatialReference)?e.spatialReference:r}function L(e,r){return r===m.SphericalECEFSpatialReference?"@ECEF":e.equals(r)?"":null!=r.wkid?"@"+r.wkid:null}function U(e,r,t){if(!h.canProject(e,r))throw new a("layerview:spatial-reference-incompatible","The spatial reference of this scene layer is incompatible with the spatial reference of the view",{});if("local"===t&&e.isGeographic)throw new a("layerview:local-gcs-not-supported","Geographic coordinate systems are not supported in local scenes",{})}function q(e,r,t){var n=O(e),a=_(e);U(n,r,t),U(a,r,t)}function B(e){return(null==e.geometryType||"triangles"===e.geometryType)&&((null==e.topology||"PerAttributeArray"===e.topology)&&(null!=e.vertexAttributes&&null!=e.vertexAttributes.position))}function P(e){if(null==e.store||null==e.store.defaultGeometrySchema||!B(e.store.defaultGeometrySchema))throw new a("scenelayer:unsupported-geometry-schema","The geometry schema of this scene layer is not supported.",{})}function D(e,r){q(e,r.spatialReference,r.viewingMode)}function W(e){return null!=e.geometryType&&"points"===e.geometryType&&((null==e.topology||"PerAttributeArray"===e.topology)&&((null==e.encoding||""===e.encoding||"lepcc-xyz"===e.encoding)&&(null!=e.vertexAttributes&&null!=e.vertexAttributes.position)))}function V(e){if(null==e.store||null==e.store.defaultGeometrySchema||!W(e.store.defaultGeometrySchema))throw new a("pointcloud:unsupported-geometry-schema","The geometry schema of this point cloud scene layer is not supported.",{})}function Q(e,r){U(e.spatialReference,r.spatialReference,r.viewingMode)}function z(e){return"simple"===e.type||"class-breaks"===e.type||"unique-value"===e.type}function K(e){return"mesh-3d"===e.type}function H(e){if(null==e||!z(e))return!0;if(("unique-value"===e.type||"class-breaks"===e.type)&&null==e.defaultSymbol)return!0;var r=e.getSymbols();if(0===r.length)return!0;for(var t=0,n=r;t<n.length;t++){var a=n[t];if(!K(a)||0===a.symbolLayers.length)return!0;for(var i=0,l=a.symbolLayers.items;i<l.length;i++){var u=l[i];if("fill"!==u.type||o.isNone(u.material)||o.isNone(u.material.color)||"replace"!==u.material.colorMixMode)return!0}}return!1}function J(e){for(var r=new re,t=!1,n=!1,a=0,i=e.symbolLayers.items;a<i.length;a++){var l=i[a];if("fill"===l.type&&l.enabled){var u=l.material,s=l.edges;if(o.isSome(u)&&!t){var c=u.color,f=u.colorMixMode;o.isSome(c)?r.material={color:[c.r/255,c.g/255,c.b/255],alpha:c.a,colorMixMode:f}:r.material={color:[1,1,1],alpha:1,colorMixMode:"multiply"},r.castShadows=l.castShadows,t=!0}o.isSome(s)&&!n&&(r.edges=s,n=!0)}}return r.material||(r.material={color:[1,1,1],alpha:1,colorMixMode:"multiply"}),r}function X(e,r){return(0|e)+(0|r)|0}Object.defineProperty(r,"__esModule",{value:!0}),r.DDS_ENCODING_STRING="image/vnd-ms.dds",r.BROWSER_SUPPORTED_IMAGE_ENCODING_STRINGS=["image/jpeg","image/png"],r.extractWkid=y,r.selectEncoding=b,r.findIntersectingNodes=w,r.filterInPlace=S;var Y=f.create();r.getClipAABB=x;var Z=s.vec4f64.create();r.intersectBoundingBoxWithMbs=R,r.findFieldsCaseInsensitive=I,r.whenGraphicAttributes=C;var $=-Math.pow(2,15),ee=-Math.pow(2,31);r.getCachedAttributeValue=E,r.convertFlatRangesToOffsets=j,r.getIndexCrs=O,r.getVertexCrs=_,r.getCacheKeySuffix=L,r.checkSpatialReference=U,r.checkSpatialReferences=q,r.checkSceneLayerValid=P,r.checkSceneLayerCompatibleWithView=D,r.checkPointCloudLayerValid=V,r.checkPointCloudLayerCompatibleWithView=Q,r.rendererNeedsTextures=H;var re=function(){function e(){this.edges=null,this.material=null,this.castShadows=!0}return e}();r.SymbolInfo=re,r.getSymbolInfo=J,r.addWraparound=X});