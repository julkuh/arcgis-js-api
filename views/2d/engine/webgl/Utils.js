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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/Error","../../../../core/Logger","../../../../core/screenUtils","../../../../symbols/cim/enums","../../../webgl","./color","./enums","./SymbolProperties","../../support/mathUtils"],function(e,t,i,n,r,a,s,o,u,c,l,p){var _;Object.defineProperty(t,"__esModule",{value:!0});o.enums.Usage,o.enums.DataType,o.enums.TextureType,o.enums.PixelFormat,o.enums.PixelType,o.enums.TextureWrapMode,o.enums.TextureSamplingMode;var E=r.getLogger("esri.views.2d.engine.webgl.Utils");function f(e){for(var r={},t=0,n=e;t<n.length;t++){var a=n[t];r[a.name]=a.strideInBytes}return r}t.C_HITTEST_SEARCH_SIZE=4,t.C_VBO_GEOMETRY="geometry",t.C_VBO_PERINSTANCE="per_instance",t.C_VBO_PERINSTANCE_VV="per_instance_vv",t.C_ICON_VERTEX_DEF=[{name:t.C_VBO_GEOMETRY,strideInBytes:28,divisor:0}],t.C_FILL_VERTEX_DEF=[{name:t.C_VBO_GEOMETRY,strideInBytes:32,divisor:0}],t.C_FILL_VERTEX_DEF_DD=[{name:t.C_VBO_GEOMETRY,strideInBytes:12,divisor:0}],t.C_LINE_VERTEX_DEF=[{name:t.C_VBO_GEOMETRY,strideInBytes:36,divisor:0}],t.C_TEXT_VERTEX_DEF=[{name:t.C_VBO_GEOMETRY,strideInBytes:24,divisor:0}],t.C_LABEL_VERTEX_DEF=[{name:t.C_VBO_GEOMETRY,strideInBytes:28,divisor:0}],t.C_ICON_STRIDE_SPEC=f(t.C_ICON_VERTEX_DEF),t.C_FILL_STRIDE_SPEC=f(t.C_FILL_VERTEX_DEF),t.C_FILL_STRIDE_SPEC_DD=f(t.C_FILL_VERTEX_DEF_DD),t.C_LINE_STRIDE_SPEC=f(t.C_LINE_VERTEX_DEF),t.C_TEXT_STRIDE_SPEC=f(t.C_TEXT_VERTEX_DEF),t.C_LABEL_STRIDE_SPEC=f(t.C_LABEL_VERTEX_DEF),t.getStrides=function(e,r){switch(e){case c.WGLGeometryType.MARKER:return t.C_ICON_STRIDE_SPEC;case c.WGLGeometryType.FILL:return r?t.C_FILL_STRIDE_SPEC_DD:t.C_FILL_STRIDE_SPEC;case c.WGLGeometryType.LINE:return t.C_LINE_STRIDE_SPEC;case c.WGLGeometryType.TEXT:return t.C_TEXT_STRIDE_SPEC;case c.WGLGeometryType.LABEL:return t.C_LABEL_STRIDE_SPEC}return null};var T=[t.C_VBO_GEOMETRY],y=[t.C_VBO_GEOMETRY],m=[t.C_VBO_GEOMETRY],C=[t.C_VBO_GEOMETRY],h=[t.C_VBO_GEOMETRY];function d(e){switch(e){case c.WGLGeometryType.MARKER:return T;case c.WGLGeometryType.FILL:return y;case c.WGLGeometryType.LINE:return m;case c.WGLGeometryType.TEXT:return C;case c.WGLGeometryType.LABEL:return h}return null}function v(e){switch(e%4){case 0:case 2:return 4;case 1:case 3:return 1}}function S(e){switch(e){case"esriSMS":return"simple-marker";case"esriPMS":return"picture-marker";case"esriSLS":return"simple-line";case"esriPLS":return"picture-line";case"esriSFS":return"simple-fill";case"esriPFS":return"picture-fill";case"esriTS":return"text"}return e}function I(e){return"string"==typeof e}t.getNamedBuffers=d,t.strideToPackingFactor=v,t.allocateTypedArrayBuffer=function(e,r){switch(r%4){case 0:case 2:return new Uint32Array(Math.floor(e*r/4));case 1:case 3:return new Uint8Array(e*r)}},t.allocateTypedArrayBufferwithData=function(e,r){switch(r%4){case 0:case 2:return new Uint32Array(e);case 1:case 3:return new Uint8Array(e)}},t.normalizeSymbolType=S,t.isMarkerSymbol=function(e){var r=S(e.type);if(r){switch(r){case"simple-marker":case"picture-marker":case"CIMPointSymbol":return!0;case"CIMVectorMarker":case"CIMPictureMarker":case"CIMCharacterMarker":return!0}return!1}},t.isFillSymbol=function(e){var r=S(e.type);if(r){switch(r){case"simple-fill":case"picture-fill":case"CIMPolygonSymbol":return!0}return!1}},t.isLineSymbol=function(e){var r=S(e.type);if(r){switch(r){case"simple-line":case"picture-line":case"CIMLineSymbol":return!0}return!1}},t.isPictureSymbol=function(e){var r=S(e.type);if(r){switch(r){case"picture-marker":case"picture-line":case"picture-fill":case"CIMPictureMarker":return!0}return!1}return!1},t.isTextSymbol=function(e){var r=S(e.type);if(r){switch(r){case"text":case"CIMTextSymbol":return!0}return!1}},t.getTextProperties=function(e){return l.TextProperties.pool.acquire(e.color?u.copyAndPremultiply(e.color):[255,255,255,255],e.haloColor?u.copyAndPremultiply(e.haloColor):[255,255,255,255],a.pt2px(e.haloSize),a.pt2px(e.font.size),e.angle*Math.PI/180,e.xoffset/e.font.size,e.yoffset/e.font.size,"left"===e.horizontalAlignment?0:"right"===e.horizontalAlignment?1:.5,"top"===e.verticalAlignment?0:"bottom"===e.verticalAlignment?1:.5)},t.isDefined=function(e){return null!=e},t.isNumber=function(e){return"number"==typeof e},t.isString=I,t.isStringOrNull=function(e){return null==e||I(e)},t.lerp=function(e,r,t){return e+(r-e)*t};var L=function(){function e(){this._arr=[],this._push=this._push.bind(this)}return e.prototype._push=function(e,r){this._arr.push(r)},e.prototype.getKeys=function(e){return this._arr.length=0,e&&e.forEach(this._push),this._arr},e}();t.KeysGetter=L;var R=function(){function e(){this._arr=[],this._push=this._push.bind(this)}return e.prototype._push=function(e,r){this._arr.push(e)},e.prototype.getValues=function(e){return this._arr.length=0,e&&e.forEach(this._push),this._arr},e}();function g(e){switch(e){case 5120:case 5121:return 1;case 5122:case 5123:return 2;case 5126:case 5124:case 5125:return 4}}t.ValuesGetter=R,t.getCapType=function(e,r){switch(e){case"butt":return s.CapType.BUTT;case"round":return r?s.CapType.SQUARE:s.CapType.ROUND;case"square":return s.CapType.SQUARE;default:return E.error(new n("mapview-invalid-type","Cap type "+e+" is not a valid option. Defaulting to round")),s.CapType.ROUND}},t.getJoinType=function(e){switch(e){case"miter":return s.JoinType.MITER;case"bevel":return s.JoinType.BEVEL;case"round":return s.JoinType.ROUND;default:return E.error(new n("mapview-invalid-type","Join type "+e+" is not a valid option. Defaulting to round")),s.JoinType.ROUND}},t.getVVType=function(e){switch(e){case"opacity":return c.VVType.OPACITY;case"color":return c.VVType.COLOR;case"rotation":return c.VVType.ROTATION;case"size":return c.VVType.SIZE;default:return E.error("Cannot interpret unknown vv: "+e),null}},t.getTransformParams=function(e){return{transform:e.transform,hasZ:e.hasZ,hasM:e.hasM}},t.copyMeshData=function(e,r,t,n,a,i,s){for(var o in i)for(var u=i[o].stride,c=v(u),l=i[o].data,p=t[o].data,_=u*a.vertexCount/c,E=u*e/c,f=u*a.vertexFrom/c,T=0;T<_;++T)p[T+E]=l[T+f];var y=a.indexCount;for(T=0;T<y;++T)n[T+r]=s[T+a.indexFrom]-a.vertexFrom+e},t.C_VBO_INFO=((_={})[t.C_VBO_GEOMETRY]=35044,_),t.createGeometryData=function(e,r){for(var t=[],n=0;n<5;++n){for(var a={},i=0,s=d(n);i<s.length;i++){var o=s[i];a[o]={data:r(n,o)}}t.push({data:e(n),buffers:a})}return t},t.resampleHermite=function(e,r,t,n,a,i,s){void 0===s&&(s=!0);for(var o=r/a,u=t/i,c=Math.ceil(o/2),l=Math.ceil(u/2),p=0;p<i;p++)for(var _=0;_<a;_++){for(var E=4*(_+(s?i-p-1:p)*a),f=0,T=0,y=0,m=0,C=0,h=0,d=0,v=(p+.5)*u,S=Math.floor(p*u);S<(p+1)*u;S++)for(var I=Math.abs(v-(S+.5))/l,L=(_+.5)*o,R=I*I,g=Math.floor(_*o);g<(_+1)*o;g++){var M=Math.abs(L-(g+.5))/c,O=Math.sqrt(R+M*M);-1<=O&&O<=1&&0<(f=2*O*O*O-3*O*O+1)&&(d+=f*e[3+(M=4*(g+S*r))],y+=f,e[M+3]<255&&(f=f*e[M+3]/250),m+=f*e[M],C+=f*e[M+1],h+=f*e[M+2],T+=f)}n[E]=m/T,n[E+1]=C/T,n[E+2]=h/T,n[E+3]=d/y}},t.createTextureFromTexelData=function(e,r){var t,n;return n=p.isPowerOfTwo(r.width)&&p.isPowerOfTwo(r.height)?(t=!0,9987):(t=!1,9729),new o.Texture(e,{target:3553,pixelFormat:6408,internalFormat:6408,dataType:5121,hasMipmap:t,samplingMode:n,wrapMode:33071,flipped:!0},r)},t.geometryToMappedGeometry=function(e){return{vertexFrom:void 0,vertexTo:void 0,geometry:e}},t.getBytes=g,t.getPixelBytes=function(e){switch(e){case 5121:return 1;case 32819:return 2;case 5126:return 4;default:E.error(new n("webgl-utils","Unable to handle type "+e))}},t.getPixelArrayCtor=function(e){switch(e){case 5121:return Uint8Array;case 32819:return Uint16Array;case 5126:return Float32Array;default:E.error(new n("webgl-utils","Unable to handle type "+e))}};var M=new Map;t.createProgramDescriptor=function(e,r){if(!M.has(e)){var t=function(n){var a={},e=function(e){var r=n[e],t=0;a[e]=r.map(function(e){var r=i({},e,{normalized:e.normalized||!1,divisor:e.divisor||0,offset:t,stride:0});return t+=e.count*g(e.type),r}),a[e].forEach(function(e){return e.stride=t})};for(var r in n)e(r);return a}(r),n={strides:function(e){var r={};for(var t in e){var n=e[t];r[t]=n.length?n[0].stride:0}return r}(t),bufferLayouts:t,attributes:function(e){var r={};for(var t in e)for(var n=0,a=e[t];n<a.length;n++){var i=a[n];r[i.name]=i.location}return r}(r)};M.set(e,n)}return M.get(e)}});