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

define(["require","exports","../../../../../core/tsSupport/generatorHelper","../../../../../core/tsSupport/awaiterHelper","../../../../../core/Error","../../../../../core/has","../../../../../core/Logger","../../../../../core/mathUtils","../../../../../core/maybe","../../../../../core/promiseUtils","../../../../../layers/support/FieldsIndex","../../../../../support/arcadeOnDemand","../../../../webgl","../../../engine","../../../arcade/utils","../tileRenderers/support/visualVariablesUtils","@dojo/framework/shim/Map","@dojo/framework/shim/Promise"],function(t,e,r,i,a,n,s,o,u,l,c,h,p,d,f,_){Object.defineProperty(e,"__esModule",{value:!0});var y=(p.enums.PixelType,s.getLogger("esri.views.layers.2d.features.support.AttributeStore")),b=d.debug.createDebugLogger(d.debug.DEBUG_ATTR_UPDATES,y),g=function(t,e){return function(r,i,a){var n;try{n=e(r,i,a)}catch(t){n=NaN}return(null===n||isNaN(n)||n===1/0)&&t||n}},v={sharedArrayBuffer:n("esri-shared-array-buffer"),oesTextureFloat:n("esri-webgl-texture-float"),maxTextureSize:n("esri-webgl-max-texture-size")},m=function(){function t(t,e,r,i){this.texelSize=4,this.descriptors=[];var a=i.pixelType,n=i.layout;this.data=this._initData(a,r,t,e),this.pixelType=a,this.layout=n,this._resetRange(),this._shared=t,this._ctype=e}return Object.defineProperty(t.prototype,"buffer",{get:function(){return this.data.buffer},enumerable:!0,configurable:!0}),t.prototype.getData=function(t,e){return this.data[t*this.texelSize+e]},t.prototype.setData=function(t,e,r){var i=1<<e;if(0==(this.layout&i))return void y.error("mapview-attributes-store","Tried to set a value for a texel's readonly component");this.data[t*this.texelSize+e]=r,this.dirtyStart=Math.min(this.dirtyStart,t),this.dirtyEnd=Math.max(this.dirtyEnd,t)},t.prototype.expand=function(t){var e=this._initData(this.pixelType,t,this._shared,this._ctype);e.set(this.data),this.data=e},t.prototype.toMessage=function(){var t=this.dirtyStart,e=this.dirtyEnd,r=this.texelSize;if(t>e)return null;this._resetRange();var i=!(this._shared||"local"===this._ctype),a=this.pixelType,n=this.layout;if(!this.data.slice){if(!i)return{start:t,end:e,data:null,pixelType:a,layout:n};return{start:t,end:e,data:new(d.Utils.getPixelArrayCtor(this.pixelType))(Array.prototype.slice.call(this.data,t*r,(e+1)*r)),pixelType:a,layout:n}}return{start:t,end:e,data:i&&this.data.slice(t*r,(e+1)*r)||null,pixelType:a,layout:n}},t.prototype._initData=function(t,e,r,i){for(var a=r&&"local"!==i?SharedArrayBuffer:ArrayBuffer,n=d.Utils.getPixelArrayCtor(t),s=n.BYTES_PER_ELEMENT,o=new n(new a(e*e*4*s)),u=0;u<o.length;u+=4)o[u+1]=255;return o},t.prototype._resetRange=function(){this.dirtyStart=this.data.length/4,this.dirtyEnd=0},t}(),x=function(){function e(t){this._attributeComputeMap=new Map,this._blocks=new Array,this._idMap=new Map,this._localToObjectId=new Map,this._filters=new Array(d.definitions.MAX_FILTERS),this._freeList=[],this._abortController=l.createAbortController(),this._hasScaleExpr=!1,this._size=32,this._idCounter=0;var e=v.oesTextureFloat?5126:5121;b("Creating AttributeStore "+(v.sharedArrayBuffer?"with":"without")+" shared memory"),this._client=t,this._blockDescriptors=[{pixelType:5121,layout:7},{pixelType:e,layout:15},{pixelType:e,layout:15}],this._blocks=this._blockDescriptors.map(function(t){return null})}return e.prototype.destroy=function(){this._abortController.abort()},Object.defineProperty(e.prototype,"hasScaleExpr",{get:function(){return this._hasScaleExpr},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"_signal",{get:function(){return this._abortController.signal},enumerable:!0,configurable:!0}),e.prototype.createLocalId=function(t){if(!this._idMap.has(t)){var e=this._getFreeId();this._idMap.set(t,-1===e?0:e),this._localToObjectId.set(e,t)}return this._idMap.get(t)},e.prototype.freeLocalId=function(t){var e=this._idMap.get(t);this._idMap.delete(t),this._localToObjectId.delete(e),this._freeList.push(e)},e.prototype.getFeatureId=function(t){return this._localToObjectId.get(t)},e.prototype.getLocalId=function(t){return this._idMap.has(t)?this._idMap.get(t):null},e.prototype.updateFilters=function(t){return i(this,void 0,void 0,function(){var e,i,a,n,s,o,u=this;return r(this,function(r){switch(r.label){case 0:return e=t.config,i=t.service,a=t.spatialReference,n=e.filters,s=e.definitionExpression,o=n.map(function(e,r){return u._updateFilter(t,e,r,i,s,a)}),[4,l.all(o)];case 1:return r.sent(),[2]}})})},e.prototype.setAttributeBindings=function(t,e){return i(this,void 0,void 0,function(){return r(this,function(r){switch(this._hasScaleExpr=!1,t.type){case"simple":case"class-breaks":case"unique-value":case"dictionary":return[2,this._bindVVEvaluators(t.visualVariables,e)];case"dot-density":return[2,this._bindDDEvaluators(t.attributes,e)];case"heatmap":break;default:y.error(new a("attribute-store","Found invalid renderer type: "+t))}return[2]})})},e.prototype.setData=function(t,e,r,i){this._getBlock(e).setData(t,r,i)},e.prototype.setAttributeData=function(t,e,r,i){var a=this,n=t;this._getBlock(0).setData(n,0,this._getFilterFlags(e));var s=this._attributeComputeMap,u=v.oesTextureFloat?1:2;s.forEach(function(t,s){var l=s*u%4,c=Math.floor(s*u/4),h=a._getBlock(c+1),p=t(e,{$view:i},r);if(v.oesTextureFloat)h.setData(n,l,p);else if(p===d.definitions.NAN_MAGIC_NUMBER)h.setData(n,l,255),h.setData(n,l+1,255);else{var f=o.clamp(Math.round(p),-32767,32766)+32768,_=255&f,y=(65280&f)>>8;h.setData(n,l,_),h.setData(n,l+1,y)}})},e.prototype.sendUpdates=function(){var t=this;if(this._nextUpdate)return this._nextUpdate.promise;if(this._currUpdate)return this._nextUpdate=l.createResolver(),this._nextUpdate.promise;var e=this._blocks.map(function(t){return u.isSome(t)?t.toMessage():null}),r={blocks:e};return this._currUpdate=this._createResources().then(function(){var e=function(){if(t._currUpdate=null,t._nextUpdate){var e=t._nextUpdate;t._nextUpdate=null,t.sendUpdates().then(function(){return e.resolve()})}},i=t._client.update(r,t._signal).then(e);return t._client.render(),i}),this._currUpdate},e.prototype._createResources=function(){var t=this;if(u.isSome(this._createResourcesPromise))return this._createResourcesPromise;b("Initializing AttributeStore");var e={shared:v.sharedArrayBuffer||"local"===this._client.type,size:this._size,blocks:u.mapMany(this._blocks,function(t){return{buffer:t.buffer,pixelType:t.pixelType}})},r=this._client.initialize(e,this._signal);return this._createResourcesPromise=r,r.then(function(){if(u.isNone(t._createResourcesPromise))return t._createResources()}),r},e.prototype._getBlock=function(t){var e=this._blocks[t];if(u.isSome(e))return e;b("Initializing AttributeBlock at index "+t);var r=v.sharedArrayBuffer,i=this._client.type,a=new m(r,i,this._size,this._blockDescriptors[t]);return this._blocks[t]=a,this._createResourcesPromise=null,a},e.prototype._expand=function(){if(this._size<v.maxTextureSize){var t=this._size<<=1;return b("Expanding block size to",t,this._blocks),u.forEachSome(this._blocks,function(e){return e.expand(t)}),this._createResourcesPromise=null,this._size=t,0}return y.error(new a("mapview-limitations","Maximum number of onscreen features exceeded.")),-1},e.prototype._getFreeId=function(){return this._freeList.length?this._freeList.pop():this._idCounter>=this._size*this._size&&this._expand()?-1:this._idCounter++},e.prototype._updateFilter=function(t,e,a,n,s,o){return i(this,void 0,void 0,function(){var i,l,c,h,p,d,f,_,y,b=this;return r(this,function(r){switch(r.label){case 0:return i=this._filters[a],(l=u.isSome(i)&&i.hash)===JSON.stringify(e)?[2]:(c=1<<a,u.isNone(e)?(this._filters[a]=null,this._idMap.forEach(function(t){var e=b._getBlock(0).getData(t,0);b._getBlock(0).setData(t,0,e|c)}),[2]):[4,t.queryObjectIds(e)]);case 1:return h=r.sent(),e.hiddenIds&&e.hiddenIds.length&&(h=h.filter(function(t){return-1===e.hiddenIds.indexOf(t)})),p=h.map(function(t){return b._idMap.get(t)}),[4,this._getFilter(a,n)];case 2:for(d=r.sent(),d.update(e,s,o),this._idMap.forEach(function(t){var e=b._getBlock(0).getData(t,0);b._getBlock(0).setData(t,0,e&~c)}),f=0;f<p.length;f++)null!=(_=p[f])&&(y=this._getBlock(0).getData(_,0),this._getBlock(0).setData(_,0,y|c));return[2]}})})},e.prototype._getFilter=function(e,a){return i(this,void 0,void 0,function(){var i,n,s;return r(this,function(r){switch(r.label){case 0:return i=this._filters[e],u.isSome(i)?[2,i]:[4,new Promise(function(e,r){t(["../../../../../layers/graphics/data/FeatureFilter"],e,r)})];case 1:return n=r.sent().default,s=new n({geometryType:a.geometryType,hasM:!1,hasZ:!1,timeInfo:a.timeInfo,fieldsIndex:new c(a.fields)}),this._filters[e]=s,[2,s]}})})},e.prototype._getFilterFlags=function(t){for(var e=0,r=0;r<this._filters.length;r++){var i=this._filters[r];e|=(u.isNone(i)||i.check(t)?1:0)<<r}return e},e.prototype._bindVVEvaluators=function(t,e){return i(this,void 0,void 0,function(){var a,n=this;return r(this,function(s){switch(s.label){case 0:return this._attributeComputeMap.clear(),u.isSome(t)?(a=l.all(t.map(function(t){return i(n,void 0,void 0,function(){var i,a;return r(this,function(r){switch(r.label){case 0:return i=d.Utils.getVVType(t.type),[4,this._createGetValueFunction(t,e)];case 1:return a=r.sent(),u.isSome(a)&&this._attributeComputeMap.set(i,a),[2]}})})})),[4,a]):[3,2];case 1:s.sent(),s.label=2;case 2:return[2]}})})},e.prototype._bindDDEvaluators=function(t,e){return i(this,void 0,void 0,function(){var i,a,n,s=this;return r(this,function(r){switch(r.label){case 0:return this._attributeComputeMap.clear(),t.length>d.definitions.DOT_DENSITY_MAX_FIELDS&&y.warn("mapview-invalid-value","DotDensityRenderer supports a maximum of "+d.definitions.DOT_DENSITY_MAX_FIELDS+" attribtues, but found "+t.length),[4,l.all(t.map(function(t){return s._createNormalizedFunction(t,e)}))];case 1:for(i=r.sent().map(function(t){return g(0,t)}),a=0;a<d.definitions.DOT_DENSITY_MAX_FIELDS;a++)n=a<t.length&&i[a],n?this._attributeComputeMap.set(a,n):this._attributeComputeMap.has(a)&&this._attributeComputeMap.delete(a);return[2]}})})},e.prototype._createGetValueFunction=function(t,e){return i(this,void 0,void 0,function(){var i,a,n,s,o,u,l;return r(this,function(r){switch(r.label){case 0:return"size"!==t.type?[3,2]:(i=d.getTypeOfSizeVisualVariable(t))===d.enums.WGLVVFlag.SIZE_SCALE_STOPS?[2,null]:(a=i===d.enums.WGLVVFlag.SIZE_UNIT_VALUE,n=a&&function(e){return _.getVisualVariableSizeValueRepresentationRatio(e,t.valueRepresentation)},s=g,o=[d.definitions.NAN_MAGIC_NUMBER],[4,this._createNormalizedFunction(t,e,n)]);case 1:return[2,s.apply(void 0,o.concat([r.sent()]))];case 2:return u=g,l=[d.definitions.NAN_MAGIC_NUMBER],[4,this._createNormalizedFunction(t,e)];case 3:return[2,u.apply(void 0,l.concat([r.sent()]))]}})})},e.prototype._createNormalizedFunction=function(t,e,n){return i(this,void 0,void 0,function(){var i,s,o;return r(this,function(r){switch(r.label){case 0:return(i=t.field)?"string"==typeof i?(s=t.normalizationField,s?[2,function(t){if(t.attributes[i]&&t.attributes[s]){var e=t.attributes[i]/t.attributes[s];return n?n(e):e}}]:[2,n?function(t){return n(t.attributes[i])}:function(t){return t.attributes[i]}]):(y.error(new a("mapview-rendering:invalid-type","The field for a vv must be a string or a number, but got "+typeof i)),[2,function(t){}]):t.valueExpression?(this._hasScaleExpr=this._hasScaleExpr||-1!==t.valueExpression.indexOf("scale"),[4,h.createVVExpression(t.valueExpression,e.spatialReference,e.fields)]):[3,2];case 1:return o=r.sent(),[2,f.callWithOptimizedFeature.bind(null,o)];case 2:return y.error("Unable to create a normalized function for visual variable: "+t),[2,function(t){}]}})})},e}();e.default=x});