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

define(["require","exports","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../request","../../../../core/asyncUtils","../../../../core/has","../../../../core/ItemCache","../../../../core/promiseUtils","../../../../core/promiseUtils","../../../../core/requireUtils","../../../../core/workers","./GeometryUtils","./GlyphMosaic","./GlyphSource","./SpriteMosaic","./TileIndex","./VectorTileDisplayObject","../../tiling/TileKey","module","@dojo/framework/shim/Promise"],function(e,t,o,r,i,n,s,a,l,u,c,h,p,f,d,y,g,_,v,T,b){var R=new l(10),M=new Map;return function(){function t(e,t,o,r){this.devicePixelRatio=t,this.allowUpdates=o,this._spriteMosaic=null,this._glyphMosaic=null,this._connection=null,this._updateToAbortController=new Map,this._ongoingTileRequests=new Map,this._ongoingRequestToController=new Map,this._vectorTileLayer=e,this._container=r}return t.prototype.destroy=function(){this._updateToAbortController&&this._updateToAbortController.forEach(function(e){return e.abort()}),this._ongoingTileRequests&&this.abortAll(),this._connection&&(this._connection.close(),this._connection=null),this._vectorTileLayer=null,this._spriteMosaic&&(this._spriteMosaic.dispose(),this._spriteMosaic=null),this._glyphMosaic&&(this._glyphMosaic.dispose(),this._glyphMosaic=null)},Object.defineProperty(t.prototype,"spriteMosaic",{get:function(){var e=this;return this._spriteSourcePromise.then(function(){return e._spriteMosaic})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"glyphMosaic",{get:function(){return this._glyphMosaic},enumerable:!0,configurable:!0}),t.prototype.start=function(t){return i(this,void 0,void 0,function(){var i,n,l,c,f,_=this;return r(this,function(r){i=this._vectorTileLayer.sourceNameToSource,n=[];for(l in i)n.push(this._fetchTileMap(i[l],t));return this._spriteSourcePromise=this._vectorTileLayer.loadSpriteSource(this.devicePixelRatio,t),this._spriteSourcePromise.then(function(e){_._spriteMosaic=new g(1024,1024,250),_._spriteMosaic.setSpriteSource(e),a("stable-symbol-rendering")&&_._spriteMosaic.preloadSpriteItems()}),c=this._vectorTileLayer.styleRepository,f=new y(c.glyphs),this._glyphMosaic=new d(1024,1024,f),this._broadcastPromise=s.safeCast(p.open(h.getAbsMid("./WorkerTileHandler",e,b),{client:this,signal:t&&t.signal})).then(function(e){return _._connection=e,u.all(_._connection.broadcast("setLayers",c.styleJSON,o({},t)))}),[2,u.all(n)]})})},t.prototype.updateStyle=function(){return i(this,void 0,void 0,function(){var e,t=this;return r(this,function(o){switch(o.label){case 0:return[4,this._broadcastPromise];case 1:return o.sent(),this._updateToAbortController.forEach(function(e){return e.abort()}),this._updateToAbortController.clear(),e=this._vectorTileLayer.styleRepository,this._broadcastPromise=u.create(function(o,r){u.all(t._connection.broadcast("updateStyle",e.styleJSON)).then(o,r)}),[2,this._broadcastPromise]}})})},t.prototype.updateTile=function(e,t){return i(this,void 0,void 0,function(){var o,i,n,s,a=this;return r(this,function(r){switch(r.label){case 0:return this.allowUpdates?[4,this._broadcastPromise]:[2,null];case 1:return r.sent(),(o=Math.round(f.degToByte(t.state.rotation)),e.rotation===o)?[2,null]:(n=e.key,this._updateToAbortController.has(n.id)&&(i=this._updateToAbortController.get(n.id),i.abort(),this._updateToAbortController.delete(n.id)),i=u.createAbortController(),e.rotation=o,s=e.client.invoke("updateSymbols",{key:e.id,rotation:o},{signal:i.signal}).then(function(t){return a._updateToAbortController.delete(n.id),e.updateSymbolData(t),t}).catch(function(e){u.isAbortError(e)||a._updateToAbortController.delete(n.id)}),this._updateToAbortController.set(e.id,i),[2,s])}})})},t.prototype.updateTileData=function(e){for(var t,o=e.tileId,r=this._container.children,i=0;i<r.length;i++)if(t=r[i],t.id===o){t.updateTileData(e.tileData);break}},t.prototype.getVectorTile=function(e,t,o,n){return void 0===n&&(n=0),i(this,void 0,void 0,function(){var i,s,a;return r(this,function(r){switch(r.label){case 0:return i=new T(e,t,o,0),s=new v(i,this._vectorTileLayer.tileInfo,this._vectorTileLayer.styleRepository,0),[4,this._getVectorTileData(i,n,null)];case 1:return a=r.sent(),a?s.setData(a.tileData,a.client):s.setData(null,null),[2,s]}})})},t.prototype.getVectorTile3D=function(t,o,n,s){return void 0===s&&(s=0),i(this,void 0,void 0,function(){var i,a,l,u;return r(this,function(r){switch(r.label){case 0:return[4,new Promise(function(t,o){e(["./VectorTileDisplayObject3D"],t,o)})];case 1:return i=r.sent(),a=new T(t,o,n,0),l=new i(a,this._vectorTileLayer.tileInfo,this._vectorTileLayer.styleRepository,0),[4,this._getVectorTileData(a,s,null)];case 2:return u=r.sent(),u?l.setData(u.tileData,u.client):l.setData(null,null),[2,l]}})})},t.prototype.fetchTileData=function(e,t){return i(this,void 0,void 0,function(){var o,i,n,s;return r(this,function(r){switch(r.label){case 0:return[4,this._getRefKeys(e,t)];case 1:o=r.sent(),i=this._vectorTileLayer.sourceNameToSource,n=[];for(s in i)n.push(s);return[2,this._getSourcesData(e,n,o,t)]}})})},t.prototype.parseTileData=function(e,t,n){return i(this,void 0,void 0,function(){var i,s,l,u,c,h,p,d;return r(this,function(r){switch(r.label){case 0:return(i=e&&e.data)?(s=i.sourceName2DataAndRefKey,l=i.transferList,0===Object.keys(s).length?[2,{tileData:null,client:null}]:[4,this._broadcastPromise]):[2,{tileData:null,client:null}];case 1:return r.sent(),u=Math.round(f.degToByte(t)),c=this._connection.getAvailableClient(),[4,c.invoke("createTileAndParse",{key:e.key.id,rotation:u,cacheTile:this.allowUpdates,sourceName2DataAndRefKey:s},o({},n,{transferList:l}))];case 2:if(h=r.sent(),a("esri-vector-tiles-debug")){p={};for(d in s)p[d]=s[d].refKey;return[2,{tileData:h,client:c,refKeys:p}]}return[2,{tileData:h,client:c}]}})})},Object.defineProperty(t.prototype,"updating",{get:function(){return this._ongoingTileRequests.size>0},enumerable:!0,configurable:!0}),t.prototype.abortAll=function(){this._ongoingRequestToController.forEach(function(e){return e.abort()}),this._ongoingRequestToController.clear(),this._ongoingTileRequests.clear()},t.prototype.getSprites=function(e){var t=this;return this._spriteSourcePromise.then(function(){return t._spriteMosaic.getSpriteItems(e)})},t.prototype.getGlyphs=function(e){return this._glyphMosaic.getGlyphItems(e.tileID,e.font,e.codePoints)},t.prototype.getStyleRepository=function(){return this._vectorTileLayer.styleRepository},t.prototype._getTilePayload=function(e,t,s,a){return i(this,void 0,void 0,function(){var e,i,l,u,c;return r(this,function(r){switch(r.label){case 0:return e=T.pool.acquire(t.id),i=this._vectorTileLayer.sourceNameToSource,l=i[s],u=l.getSourceTileUrl(e.level,e.row,e.col),T.pool.release(e),[4,n(u,o({responseType:"array-buffer"},a))];case 1:return c=r.sent(),[2,{protobuff:c.data,sourceName:s}]}})})},t.prototype._fetchTileMap=function(e,t){if(e.capabilities.operations.supportsTileMap&&e.tileIndex)return u.resolve();if(!e.tileMapURL)return u.resolve();var o=R.get(e.tileMapURL);if(o)return e.tileIndex=o,u.resolve();if(M.has(e.tileMapURL))return M.get(e.tileMapURL).then(function(t){e.tileIndex=new _(t.data)});var r=n(e.tileMapURL,t);return r.then(function(t){e.tileIndex=new _(t.data),M.delete(e.tileMapURL),R.put(e.tileMapURL,e.tileIndex)}),M.set(e.tileMapURL,r),r},t.prototype._getRefKeys=function(e,t){return i(this,void 0,void 0,function(){var o,i,n,s,a;return r(this,function(r){o=this._vectorTileLayer.sourceNameToSource,i=[];for(n in o)s=o[n],a=s.getRefKey(e,t),i.push(a);return[2,u.eachAlways(i)]})})},t.prototype._getSourcesData=function(e,t,o,n){return i(this,void 0,void 0,function(){var i,s,a,l,c,h,s,p;return r(this,function(r){switch(r.label){case 0:for(i=[],s=0;s<o.length;s++)null==o[s].value||null==t[s]?i.push(null):(a=this._getTilePayload(e,o[s].value,t[s],n),i.push(a));return[4,u.eachAlways(i)];case 1:for(l=r.sent(),c={},h=[],s=0;s<l.length;s++)l[s].value&&l[s].value&&l[s].value.protobuff&&l[s].value.protobuff.byteLength>0&&(p=o[s].value.id,c[l[s].value.sourceName]={refKey:p,protobuff:l[s].value.protobuff},h.push(l[s].value.protobuff));return[2,{sourceName2DataAndRefKey:c,transferList:h}]}})})},t.prototype._getVectorTileData=function(e,t,o){return i(this,void 0,void 0,function(){var i,n,s,a,l,u=this;return r(this,function(r){return i=e.id,this._ongoingTileRequests.has(i)?[2,this._ongoingTileRequests.get(i)]:(n=new AbortController,s={signal:n.signal},a=o&&o.signal,l=this._getParsedVectorTileData(e,t,s).then(function(e){return u._ongoingTileRequests.delete(i),u._ongoingRequestToController.delete(i),e}).catch(function(e){return u._ongoingTileRequests.delete(i),u._ongoingRequestToController.delete(i),null}),this._ongoingTileRequests.set(i,l),this._ongoingRequestToController.set(i,n),a&&c.onAbort(a,function(){n.abort(),u._ongoingTileRequests.delete(i),u._ongoingRequestToController.delete(i)}),[2,l])})})},t.prototype._getParsedVectorTileData=function(e,t,o){return i(this,void 0,void 0,function(){var i;return r(this,function(r){switch(r.label){case 0:return[4,this.fetchTileData(e,o)];case 1:return i=r.sent(),[2,this.parseTileData({key:e,data:i},t,o)]}})})},t}()});