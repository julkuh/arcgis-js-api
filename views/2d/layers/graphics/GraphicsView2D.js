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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/tsSupport/assignHelper","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","../../../../core/asyncUtils","../../../../core/HandleOwner","../../../../core/Identifiable","../../../../core/MapPool","../../../../core/maybe","../../../../core/promiseUtils","../../../../core/promiseUtils","../../../../core/screenUtils","../../../../core/accessorSupport/decorators","../../../../geometry/Polygon","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/jsonUtils","../../../../geometry/support/spatialReferenceUtils","../../../../layers/graphics/data/projectionSupport","../../../../symbols/support/cimSymbolUtils","../../../../symbols/support/defaults","../../engine","../features/support/AttributeStore","../features/support/TileStore","./GraphicContainer","./GraphicProcessingQueue","./GraphicStore","./graphicsUtils","../../../layers/GraphicsView"],function(e,t,r,i,a,o,n,s,h,p,c,d,l,u,g,f,_,v,y,m,S,b,w,U,G,T,I,P,C,A,O){function M(e,t,r){if(r.has(e))return r.get(e);var i={tile:t,addedOrModified:[],removed:[]};return r.set(e,i),i}Object.defineProperty(t,"__esModule",{value:!0});var R=function(e){function t(){for(var t=[],r=0;r<arguments.length;r++)t[r]=arguments[r];var i=e.apply(this,t)||this;return i._tiles=new Map,i._graphicStoreUpdate=!1,i._graphicsSet=new Set,i._matcher=l.resolve(null),i._tileUpdateSet=new Set,i._tilesToUpdate=new Map,i._graphicIdToAbortController=new Map,i._pendingUpdates=0,i._attached=!1,i.lastUpdateId=-1,i.updateRequested=!1,i.graphicUpdateHandler=i.graphicUpdateHandler.bind(i),i.addOrUpdateGraphic=i.addOrUpdateGraphic.bind(i),i._processAnalyzedGraphics=i._processAnalyzedGraphics.bind(i),i._graphicsChangeHandler=i._graphicsChangeHandler.bind(i),i}return r(t,e),t.prototype.initialize=function(){var e=this;this._tileStore=new T.default(this.view.featuresTilingScheme),this.container=new I.default({tileInfoView:this.view.featuresTilingScheme,localToGlobalId:function(t){return e._attributeStore.getFeatureId(t)}}),this._attributeStore=new G.default({type:"local",initialize:function(t){return l.resolve(e.container.attributeView.initialize(t))},update:function(t){return s.safeCast(e.container.attributeView.requestUpdate(t))},render:function(){return e.container.requestRender()}});var t=function(t){var r=e._attributeStore.createLocalId(t.uid);e._attributeStore.setData(r,0,0,t.visible?1:0)},r=function(t){e._attributeStore.freeLocalId(t.uid)};this._graphicStore=new C.default(this.view.featuresTilingScheme,this.view.state.scale,this.uid,this.graphics,t,r),this._graphicProcessingQueue=new P.default({process:this.addOrUpdateGraphic});var i=new U.WGLTemplateStore(this.container.getMaterialItems),a=this._tileStore.tileScheme.tileInfo;this.renderer&&(this._matcher=U.createMatcher(this.renderer,i,null)),this._meshFactory=new U.WGLMeshFactory(null,this.uid,null,i,null,a),this.watch("renderer",function(t){t&&(e._matcher=U.createMatcher(e.renderer,i,null))}),this._tileStore.on("update",this._onTileUpdate.bind(this)),this.container.on("attach",function(){e.graphics.items.length>0&&e._graphicsChangeHandler({target:e.graphics,added:e.graphics.items,removed:[],moved:[]}),e.handles.add(e.graphics.on("change",e._graphicsChangeHandler),"graphics"),e._attached=!0,e.notifyChange("updating")}),this.container.on("detach",function(){e._graphicProcessingQueue&&e._graphicProcessingQueue.clear()})},t.prototype.destroy=function(){this.container.dispose(),this._set("graphics",null),this._graphicProcessingQueue&&(this._graphicProcessingQueue.destroy(),this._graphicProcessingQueue=null),this._graphicStore.clear(),this._tileStore.destroy(),this._attributeStore=null},Object.defineProperty(t.prototype,"updating",{get:function(){return!this._attached||0!==this._pendingUpdates||this._graphicProcessingQueue.updating||this._tileUpdateSet.size>0||this._tilesToUpdate.size>0},enumerable:!0,configurable:!0}),t.prototype.install=function(e){e.addChild(this.container)},t.prototype.uninstall=function(e){e.removeChild(this.container)},t.prototype.hitTest=function(e,t){if(!this.view||!this.view.position)return l.resolve();var r=this.view.toMap(g.createScreenPoint(e,t));return this.searchFeatures(r).then(function(e){return e&&e.length?e[0]:null})},t.prototype.searchFeatures=function(e,t){var r=this;return void 0===t&&(t=2),l.create(function(i){i(r._graphicStore.hitTest(e.x,e.y,t,r.view.state.resolution,r.view.state.rotation))})},t.prototype.update=function(e){var t=e.state,r=this.view.featuresTilingScheme.getClosestInfoForScale(t.scale).level;this._graphicStore.updateLevel(r),this._tileStore.setViewState(t),this._graphicStoreUpdate=!0,this.updateRequested=!1},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.requestUpdate=function(){this.updateRequested||(this.updateRequested=!0,this.view.requestUpdate(this))},t.prototype.processUpdate=function(e){this.updateRequested&&(this.updateRequested=!1,this.update(e))},t.prototype.graphicUpdateHandler=function(e){var t=e.graphic,r=e.property,i=e.newValue,a=t;switch(r){case"attributes":break;case"geometry":case"symbol":this._graphicProcessingQueue.push(a,"update");break;case"visible":this._setVisible(a.uid,i),this._attributeStore.sendUpdates()}},t.prototype.highlight=function(e){return this.container.highlight(e)},t.prototype._getIntersectingTiles=function(e){var t=this._graphicStore.getBounds(e);return t&&0!==v.width(t)&&0!==v.height(t)?this._tileStore.boundsIntersections(t):[]},t.prototype._updateTile=function(e){var t=this,r=e.tile,i=this._getGraphicsData(r,e.addedOrModified);return s.safeCast(this._processGraphics(r.key,i)).then(function(i){return t._patchTile(r.key,{addOrUpdate:i,remove:e.removed}),i})},t.prototype._graphicsChangeHandler=function(e){var t=this;if(this._pendingUpdates++,this.notifyChange("updating"),!this._graphicStoreUpdate){var r=this.view.state,i=this.view.featuresTilingScheme.getClosestInfoForScale(r.scale).level;this._graphicStore.updateLevel(i),this._tileStore.setViewState(r)}for(var a,o=e.added,n=e.removed,s=e.moved,h=this._tilesToUpdate,p=[],c=new Array(o.length),d=0;d<o.length;d++){var u=o[d];c[d]=u,this._graphicsSet.add(u),p.push(this.addGraphic(u))}for(var g=0,f=n;g<f.length;g++){var _=f[g];this._abortProcessingGraphic(_.uid);for(var v=this._getIntersectingTiles(_),y=0,m=v;y<m.length;y++){var S=m[y];a=S.key.id;var b=M(a,S,h);b.removed.push(this._attributeStore.getLocalId(_.uid))}this._graphicsSet.delete(_),this._graphicStore.remove(_)}for(var w=0,U=s;w<U.length;w++)for(var G=U[w],v=this._getIntersectingTiles(G),T=0,I=v;T<I.length;T++){var S=I[T];a=S.key.id;var b=M(a,S,h);b.addedOrModified.push(G)}l.all(p).then(function(){for(var e,r=0;r<c.length;r++){e=c[r];for(var i=t._getIntersectingTiles(e),o=0,n=i;o<n.length;o++){var s=n[o];a=s.key.id;M(a,s,h).addedOrModified.push(e)}}t._graphicStore.updateZ();var p=[];return h.forEach(function(e){return p.push(t._updateTile(e))}),l.all(p).then(function(){h.clear(),t._pendingUpdates--,t.notifyChange("updating")})}).catch(function(){h.clear(),t._pendingUpdates--,t.notifyChange("updating")})},t.prototype._getSymbolResources=function(e,t){return n(this,void 0,void 0,function(){var r,i,a,n,s,h,p,c;return o(this,function(o){switch(o.label){case 0:return this.container.attached?(r=d.isSome(e.symbol)?e.symbol:null,r?[3,3]:this.renderer?[4,this.renderer.getSymbolAsync(e,{scale:this.view.scale})]:[3,2]):[2,l.resolve(null)];case 1:return r=o.sent(),[3,3];case 2:r=this._getNullSymbol(e),o.label=3;case 3:return[4,b.expandSymbol(r,b.constructUrlFn,t)];case 4:if(r=o.sent(),i=[],"text"===r.type){for(a=new Set,n=r,s=n.text,h=0;h<s.length;h++)a.add(s.charCodeAt(h));p=[],a.forEach(function(e){return p.push(e)}),i.push({symbol:n.toJSON(),id:0,glyphIds:p})}else i.push({symbol:r.toJSON(),id:e.uid,glyphIds:null});return[4,this.container.getMaterialItems(i,t).then(function(e){return e&&e.length>0?e[0].mosaicItem:null})];case 5:return c=o.sent(),[2,{symbol:r,mosaicItem:c}]}})})},t.prototype._projectAndNormalizeGeometry=function(e){return n(this,void 0,void 0,function(){var t,r,i,a=this;return o(this,function(o){return d.isNone(e.geometry)?[2,l.resolve(null)]:(t=e.geometry,y.isPolygon(t)?(r=t.rings,t.rings=r):y.isPolyline(t)?(i=t.paths,t.paths=i):y.isExtent(t)&&(t=_.fromExtent(t)),[2,S.checkProjectionSupport(t.spatialReference,this.view.spatialReference).then(function(){var e=A.normalizeCentralMeridian(t),r=S.project(e,t.spatialReference,a.view.spatialReference);return A.ensureClosedRings(r),r})])})})},t.prototype._onTileUpdate=function(e){var t=m.getInfo(this.view.spatialReference);if(e.added&&e.added.length>0)for(var r=0,i=e.added;r<i.length;r++){var a=i[r];this._addNewTile(a,t)}if(e.removed&&e.removed.length>0)for(var o=0,n=e.removed;o<n.length;o++){var s=n[o];this._removeTile(s.key)}},t.prototype.addOrUpdateGraphic=function(e,t,r){return this._addOrUpdateGraphic(e,t,r)},t.prototype.addGraphic=function(e){var t=this;this._abortProcessingGraphic(e.uid);var r=u.createAbortController();this._graphicIdToAbortController.set(e.uid,r);var i={signal:r.signal};return this._addOrUpdateGraphic(e,"add",i).then(function(){t._graphicIdToAbortController.delete(e.uid)}).catch(function(r){if(t._graphicIdToAbortController.delete(e.uid),!l.isAbortError(r))throw r})},t.prototype._addOrUpdateGraphic=function(e,t,r){var i=this,a=this._projectAndNormalizeGeometry(e),o=this._getSymbolResources(e,r);return l.all([a,o]).then(function(a){var o=a[0],n=a[1];return"add"===t?i._addProjectedGraphic(e,n,o):i._updateGraphic(e,n,o,r)})},t.prototype._addProjectedGraphic=function(e,t,r){this._graphicsSet.has(e)&&this._graphicStore.add(e,t,r)},t.prototype._updateGraphic=function(e,t,r,i){var a=this;if(!this._graphicStore.has(e)||l.isAborted(i))return l.resolve();for(var o=this._graphicStore.update(e,t,r),n=o.oldBounds,h=o.newBounds,p=0===v.width(n)&&0===v.height(n),d=0===v.width(h)&&0===v.height(h),u=p?[]:this._tileStore.boundsIntersections(n),g=d?[]:this._tileStore.boundsIntersections(h),f=c.acquire(),_=0,y=u;_<y.length;_++){var m=y[_];f.set(m.key,{addOrUpdate:null,remove:[this._attributeStore.getLocalId(e.uid)]})}for(var S=0,b=g;S<b.length;S++){var m=b[S],w=this._getGraphicData(m,e);if(f.has(m.key)){var U=f.get(m.key);U.remove.length=0,U.addOrUpdate=w}else f.set(m.key,{addOrUpdate:w,remove:null})}var G=[];return f.forEach(function(e,t){var r=s.safeCast(a._processGraphics(t,e.addOrUpdate,i)).then(function(r){a._patchTile(t,{addOrUpdate:r,remove:e.remove})});G.push(r)}),c.release(f),l.all(G).then(function(){})},t.prototype._addTile=function(e,t){var r=v.create();this.view.featuresTilingScheme.getTileBounds(r,e);var i=new U.WGLTile(e,r,!0),a={clear:!0,addOrUpdate:t,remove:[]};this._tiles.set(e,i),this.container.addChild(i),i.setData(a,!1,!1)},t.prototype._addNewTile=function(e,t){var r=this,i=this._graphicStore.queryTileData(e);if(t)for(var a=Math.round((t.valid[1]-t.valid[0])/e.resolution),o=0,n=i;o<n.length;o++){var s=n[o];s.geometry&&y.isPoint(s.geometry)&&this._wrapPoints(s,a)}var h=e.key;this._tileUpdateSet.add(e.key),this.notifyChange("updating"),this._processGraphics(h,i).then(function(e){r._addTile(h,e),r._tileUpdateSet.delete(h),r.notifyChange("updating")}).catch(function(e){if(r._tileUpdateSet.delete(h),r.notifyChange("updating"),!l.isAbortError(e))throw e})},t.prototype._removeTile=function(e){if(this._tiles.has(e)){var t=this._tiles.get(e);this.container.removeChild(t)}},t.prototype._patchTile=function(e,t){if(this._tiles.has(e)){this._tiles.get(e).setData(t,!1,!1),this.container.requestRender()}},t.prototype._setVisible=function(e,t){var r=this._attributeStore.getLocalId(e);this._attributeStore.setData(r,0,0,t?1:0)},t.prototype._getGraphicsData=function(e,t){var r=m.getInfo(this.view.spatialReference),i=this._graphicStore.getGraphicsData(e,t);if(r)for(var a=Math.round((r.valid[1]-r.valid[0])/e.resolution),o=0,n=i;o<n.length;o++){var s=n[o];s.geometry&&y.isPoint(s.geometry)&&this._wrapPoints(s,a)}return i.sort(function(e,t){return e.insertAfter-t.insertAfter}),i},t.prototype._getGraphicData=function(e,t){var r=this._graphicStore.getGraphicData(e,t),i=[r],a=m.getInfo(this.view.spatialReference);if(a){var o=Math.round((a.valid[1]-a.valid[0])/e.resolution);r.geometry&&y.isPoint(r.geometry)&&this._wrapPoints(r,o)}return i},t.prototype._wrapPoints=function(e,t){var r=e.geometry;512===t?r.x<20?e.geometry={points:[[r.x,r.y],[t,0]]}:r.x>492&&(e.geometry={points:[[r.x,r.y],[-t,0]]}):r.x<-20?e.geometry={points:[[r.x,r.y],[t,0]]}:r.x>532&&(e.geometry={points:[[r.x,r.y],[-t,0]]})},t.prototype._processGraphics=function(e,t,r){return n(this,void 0,void 0,function(){var i,a,n;return o(this,function(o){switch(o.label){case 0:return(i=t&&t.length)&&this._meshFactory?(a=this._meshFactory,[4,s.safeCast(this._matcher.then(function(e){return a.analyze(t,e,null,null,r)}))]):[2,null];case 1:return n=o.sent(),this._attributeStore.sendUpdates(),[2,this._processAnalyzedGraphics(e,n)]}})})},t.prototype._processAnalyzedGraphics=function(e,t){for(var r=this._meshFactory,i=r.createMeshData(t.length),a=this._attributeStore,o=0,n=t;o<n.length;o++){var s=n[o];s.insertAfter=-1===s.insertAfter?-1:a.getLocalId(s.insertAfter),s.localId=a.getLocalId(s.attributes[this.uid]),r.write(i,s,null,null,e.level)}return U.TileData.fromMeshData(i)},t.prototype._abortProcessingGraphic=function(e){if(this._graphicIdToAbortController.has(e)){this._graphicIdToAbortController.get(e).abort()}},t.prototype._getNullSymbol=function(e){var t=e.geometry;return y.isPolyline(t)?w.errorPolylineSymbol2D:y.isPolygon(t)||y.isExtent(t)?w.errorPolygonSymbol2D:w.errorPointSymbol2D},i([f.property()],t.prototype,"_graphicProcessingQueue",void 0),i([f.property({constructOnly:!0})],t.prototype,"graphics",void 0),i([f.property({dependsOn:["_graphicProcessingQueue.updating"]})],t.prototype,"updating",null),i([f.property()],t.prototype,"view",void 0),i([f.property()],t.prototype,"updateRequested",void 0),t=i([f.subclass("esri.views.2d.layers.support.GraphicsView2D")],t)}(f.declared(O,h,p.Identifiable));t.default=R});