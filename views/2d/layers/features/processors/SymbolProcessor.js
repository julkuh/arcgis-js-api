/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/Error","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/promiseUtils","../../../../../geometry/SpatialReference","../../../../../core/accessorSupport/diffUtils","../../../engine/webgl/definitions","../../../engine/webgl/util/BidiText","../../../engine/webgl/collisions/CollisionGrid","../../../engine/webgl/Utils","../../../engine/webgl/cpuMapped/DisplayRecordReader","../support/AttributeStore","../../../engine/webgl/mesh/MeshData","../../../engine/webgl/mesh/factories/matcherUtils","../textUtils","../../../engine/webgl/mesh/templates/WGLTemplateStore","../../../engine/webgl/mesh/factories/WGLMeshFactory","./BaseProcessor"],(function(e,t,r,s,i,a,n,o,c,l,d,u,h,f,g,m,y,p,_,b,w,T,S,v,D,k,C){"use strict";i.getLogger("esri.views.2d.layers.features.processors.SymbolProcessor");function I(e,t){return(!e.minScale||e.minScale>=t)&&(!e.maxScale||e.maxScale<=t)}function x(e){const t=e.message,r={message:{data:{},tileKey:t.tileKey},transferList:new Array};for(const i in t.data){const e=t.data[i];if(r.message.data[i]=null,s.isSome(e)){const t=e.stride,a=e.indices.slice(0),n=e.vertices.slice(0),o=e.records.slice(0),c={stride:t,indices:a,vertices:n,records:o,metrics:s.andThen(e.metrics,(e=>e.slice(0)))};r.transferList.push(a,n,o),r.message.data[i]=c}}return r}let L=function(t){function i(){var e;return(e=t.apply(this,arguments)||this).type="symbol",e._matchers={feature:null,aggregate:null},e._bufferData=new Map,e}e._inheritsLoose(i,t);var a=i.prototype;return a.initialize=function(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))])},a.destroy=function(){},a.update=async function(e,t){const s=t.schema.processors[0];if("symbol"!==s.type)return;const i=g.diff(this._schema,s);g.hasDiff(i,"mesh")&&(r("esri-2d-update-debug")&&console.debug("Applying Update - Processor:",i),e.mesh=!0,e.why.mesh.push("Symbology changed"),this._schema=s,this._factory=this._createFactory(s),this._factory.update(s,this.tileStore.tileScheme.tileInfo))},a.onTileMessage=function(e,t,r,s){return h.throwIfAborted(s),this._onTileData(e,t,r,s)},a.onTileClear=function(e){const t={clear:!0};return this._bufferData.delete(e.key.id),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:e.id,data:t})},a.onTileError=function(e,t,r){const s=r.signal,i={tileKey:e.id,error:t};return this.remoteClient.invoke("tileRenderer.onTileError",i,{signal:s})},a.onTileUpdate=function(e){for(const t of e.removed){if(!this._bufferData.has(t.key.id))continue;this._bufferData.get(t.key.id).forEach((e=>{const t=new Set;_.forEachGeometryType((r=>{const i=e.message.data[r];if(s.isSome(i)){const e=b.DisplayRecordReader.from(i.records).getCursor();for(;e.next();)t.add(e.id)}}));const r=e.message.tileKey,i={type:"update",addOrUpdate:null};return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:r,data:i})})),this._bufferData.delete(t.key.id)}for(const t of e.added)this._bufferData.forEach((e=>{for(const r of e)r.message.tileKey===t.id&&this._updateTileMesh("append",t,x(r),[],!1,!1,null)}))},a._addBufferData=function(e,t){this._bufferData.has(e)||this._bufferData.set(e,[]),this._bufferData.get(e).push(x(t))},a._createFactory=function(e){const{geometryType:t,objectIdField:r,fields:i}=this.service,a=(e,t)=>this.remoteClient.invoke("tileRenderer.getMaterialItems",e,t),n={geometryType:t,fields:i,spatialReference:f.fromJSON(this.spatialReference)},o=new D.WGLTemplateStore(a,!1),{matcher:c,aggregateMatcher:l}=e.mesh;return this._store=o,this._matchers.feature=S.createMatcher(c,o,n),this._matchers.aggregate=s.andThen(l,(e=>S.createMatcher(e,o,n))),new k.WGLMeshFactory(t,r,o)},a._onTileData=async function(e,t,r,i){const{type:a,addOrUpdate:n,remove:o}=t,c=t.end;if(!n){const t={type:a,addOrUpdate:null,remove:o,clear:!1,end:c};return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:e.id,data:t},i)}const l=this._processFeatures(e,n,r,i);try{const r=await l;if(s.isNone(r)){const t={type:a,addOrUpdate:null,remove:o,clear:!1,end:c};return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:e.id,data:t},i)}for(const t of r)e.key.id!==t.message.tileKey&&this._addBufferData(e.key.id,t);await h.all(r.map((r=>{const s=e.key.id===r.message.tileKey,n=s?t.remove:[],o=s&&t.end;return this._updateTileMesh(a,e,r,n,o,t.clear,i.signal)})))}catch(d){this._handleError(e,d,i)}},a._updateTileMesh=async function(e,t,r,i,a,n,o){const c=e,l=r.message.tileKey;l!==t.key.id&&(a=!1);const d=s.andThen(r,(e=>e.message)),u=s.andThen(r,(e=>e.transferList))||[],f={type:c,addOrUpdate:d,remove:i,clear:!1,end:a},g={transferList:s.unwrap(u)||[],signal:o};return h.throwIfAborted(g),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:l,data:f},g)},a._processFeatures=async function(e,t,r,i){if(s.isNone(t)||!t.hasFeatures)return null;const a={transform:e.transform,hasZ:!1,hasM:!1},n=this._factory,o={viewingMode:"",scale:e.scale},c=await this._matchers.feature,l=await this._matchers.aggregate;h.throwIfAborted(i);const d=this._getLabelInfos(e,t);return await n.analyze(t.getCursor(),c,l,a,o),h.throwIfAborted(i),this._writeFeatureSet(e,t,a,d,n,r)},a._writeFeatureSet=function(e,t,r,i,a,n){const o=t.getApproximateSize(),c="simple"===this._schema.mesh.matcher.type&&this._schema.mesh.matcher.isDotDensity,l=new T.MeshData(e.key.id,{features:o,records:o,metrics:0},c,n,!0),d={viewingMode:"",scale:e.scale},u=t.getCursor();for(;u.next();)try{const t=u.getDisplayId(),n=s.isSome(i)?i.get(t):null;a.writeCursor(l,u,r,d,e.level,n)}catch(f){}const h=e.tileInfoView.tileInfo.isWrappable;return l.serialize(h)},a._handleError=function(e,t,r){if(!h.isAbortError(t)){const s={tileKey:e.id,error:t.message};return this.remoteClient.invoke("tileRenderer.onTileError",s,{signal:r.signal})}},a._getLabelInfos=function(e,t){const r=this._schema.mesh.labels,i=s.andThen(r,(t=>t.filter((t=>I(t,e.scale)))));if(s.isNone(i)||0===i.length)return null;const a=new Map,n=(new p.CollisionGrid(m.COLLISION_EARLY_REJECT_BUCKET_SIZE),t.getCursor());for(;n.next();){const e=n.getDisplayId(),t=[],r=w.isAggregateId(e),s=r&&1!==n.readAttribute("cluster_count")?"aggregate":"feature";for(const a of i){if(a.target!==s)continue;const i=n.getStorage(),o=r&&"feature"===s?i.getComputedStringAtIndex(n.readAttribute("referenceId"),a.fieldIndex):i.getComputedStringAtIndex(e,a.fieldIndex);if(!o)continue;const c=y.bidiText(o.toString()),l=c[0],d=c[1];this._store.getMosaicItem(a.symbol,v.codepoints(l)).then((e=>{t[a.index]={glyphs:e.glyphMosaicItems,rtl:d,index:a.index}}))}a.set(e,t)}return a},a._shouldDiscard=function(e,t){switch(this.service.geometryType){case"esriGeometryPoint":{const r=t.readLegacyPointGeometry();return!r||e.checkOverlap(r.x,r.y)}case"esriGeometryPolygon":{const r=t.readLegacyCentroid();return!r||e.checkOverlap(r.x,r.y)}default:return!1}},a._markUsed=function(e,t){switch(this.service.geometryType){case"esriGeometryPoint":{const{x:r,y:s}=t.readLegacyPointGeometry();return e.markUsed(r,s)}case"esriGeometryPolygon":{const{x:r,y:s}=t.readLegacyCentroid();return e.markUsed(r,s)}}},e._createClass(i,[{key:"supportsTileUpdates",get:function(){return!0}}]),i}(C);return L=t.__decorate([o.subclass("esri.views.2d.layers.features.processors.SymbolProcessor")],L),L}));
