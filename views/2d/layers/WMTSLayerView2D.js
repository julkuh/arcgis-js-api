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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/Handles","../../../core/accessorSupport/decorators","../../../geometry/support/webMercatorUtils","../engine","./LayerView2D","../tiling/TileInfoView","../tiling/TileQueue","../tiling/TileStrategy","../../layers/RefreshableLayerView"],function(e,t,i,r,n,o,l,u,s,a,c,f,h,p,d){var y=[102113,102100,3857,3785,900913];return function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new l,t._tileStrategy=null,t._tileInfoView=null,t._fetchQueue=null,t._tileRequests=new Map,t.container=new a.BitmapContainer,t.layer=null,t}return i(t,e),Object.defineProperty(t.prototype,"tileMatrixSet",{get:function(){if(this.layer.activeLayer.tileMatrixSetId)return this.layer.activeLayer.tileMatrixSet;var e=this._getTileMatrixSetBySpatialReference(this.layer.activeLayer);return e?(this.layer.activeLayer.tileMatrixSetId=e.id,e):null},enumerable:!0,configurable:!0}),t.prototype.hitTest=function(e,t){return null},t.prototype.update=function(e){this._fetchQueue.pause(),this._fetchQueue.state=e.state,this._tileStrategy.update(e),this._fetchQueue.resume(),this.notifyChange("updating")},t.prototype.attach=function(){var e=this,t=this.layer.activeLayer,i=this.tileMatrixSet;if(i){var r=i.tileInfo.spatialReference,n=t.fullExtent&&t.fullExtent.clone();r.isWebMercator?n=s.geographicToWebMercator(n):r.isWGS84||(n=i.fullExtent),this._tileInfoView=new f(i.tileInfo,n),this._fetchQueue=new h({tileInfoView:this._tileInfoView,process:function(t){return e.fetchTile(t)}}),this._tileStrategy=new p({cachePolicy:"keep",acquireTile:function(t){return e.acquireTile(t)},releaseTile:function(t){return e.releaseTile(t)},tileInfoView:this._tileInfoView}),this._handles.add(this.watch("layer.activeLayer.styleId, tileMatrixSet",function(){return e._refresh()}))}},t.prototype.detach=function(){this._handles.removeAll(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),this._fetchQueue=this._tileStrategy=this._tileInfoView=null},t.prototype.moveStart=function(){this.requestUpdate()},t.prototype.viewChange=function(){this.requestUpdate()},t.prototype.moveEnd=function(){this.requestUpdate()},t.prototype.doRefresh=function(e){return o(this,void 0,void 0,function(){return n(this,function(e){return this.updateRequested||this.suspended?[2]:(this._refresh(),[2])})})},t.prototype.isUpdating=function(){var e=!0;return this._tileRequests.forEach(function(t){e=e&&t.fulfilled}),!e},t.prototype.acquireTile=function(e){var t,i=this,r=a.BitmapTile.pool.acquire();r.key.set(e),r.resolution=this._tileInfoView.getTileResolution(r.key),t=this._tileInfoView.tileInfo.size,r.width=t[0],r.height=t[1],this._tileInfoView.getTileCoords(r,r.key);var n={id:e.id,fulfilled:!1,promise:this._fetchQueue.push(r.key).then(function(e){r.source=e,r.once("attach",function(){return i.requestUpdate()}),i.container.addChild(r)}).catch(function(e){r.source=null,r.once("attach",function(){return i.requestUpdate()}),i.container.addChild(r)})};return n.promise.then(function(){return n.fulfilled=!0},function(){return n.fulfilled=!0}),this._tileRequests.set(r,n),this.requestUpdate(),r},t.prototype.releaseTile=function(e){var t=this._tileRequests.get(e);t.fulfilled||this._fetchQueue.abort(t.id),this._tileRequests.delete(e),this.container.removeChild(e),this.requestUpdate()},t.prototype.fetchTile=function(e){return o(this,void 0,void 0,function(){return n(this,function(t){return[2,this.layer.fetchTile(e.level,e.row,e.col)]})})},t.prototype.canResume=function(){var e=this.inherited(arguments);return e?null!==this.tileMatrixSet:e},t.prototype._refresh=function(){var e=this;this._fetchQueue.reset(),this._tileStrategy.tiles.forEach(function(t){if(t.source){t.source=null;var i={id:t.key.id,fulfilled:!1,promise:e._fetchQueue.push(t.key).then(function(i){t.source=i,t.requestRender(),e.notifyChange("updating")})};i.promise.then(function(){return i.fulfilled=!0},function(){return i.fulfilled=!0}),e._tileRequests.set(t,i)}}),this.notifyChange("updating")},t.prototype._getTileMatrixSetBySpatialReference=function(e){var t=this.view.spatialReference,i=e.tileMatrixSets.find(function(e){return e.tileInfo.spatialReference.wkid===t.wkid});return!i&&t.isWebMercator&&(i=e.tileMatrixSets.find(function(e){return y.indexOf(e.tileInfo.spatialReference.wkid)>-1})),i},r([u.property({dependsOn:["tileMatrixSet"]})],t.prototype,"suspended",void 0),r([u.property({readOnly:!0,dependsOn:["view.spatialReference","layer.activeLayer"]})],t.prototype,"tileMatrixSet",null),r([u.property({dependsOn:["updateRequested","attached"]})],t.prototype,"updating",void 0),t=r([u.subclass("esri.views.2d.layers.WMTSLayerView2D")],t)}(u.declared(c,d))});