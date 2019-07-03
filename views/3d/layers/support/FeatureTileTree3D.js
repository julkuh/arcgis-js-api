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

define(["require","exports","../../../../core/tsSupport/declareExtendsHelper","../../../../core/tsSupport/decorateHelper","../../../../core/Accessor","../../../../core/Collection","../../../../core/Handles","../../../../core/Logger","../../../../core/PooledArray","../../../../core/watchUtils","../../../../core/accessorSupport/decorators","../../../../geometry/support/aaBoundingRect","./FeatureTileDescriptor3D","./FeatureTileMeasurements3D","../../support/projectionUtils","../../../support/index"],function(e,t,i,r,n,s,o,l,a,p,u,c,h,d,f,y){function g(){return T++}Object.defineProperty(t,"__esModule",{value:!0});var m=l.getLogger("esri.views.3d.layers.support.FeatureTileFetcher3D"),_=function(e){function t(t){var i=e.call(this,t)||this;return i.tiles=new s,i.tileSize=512,i.idToTile=new Map,i.handles=new o,i.clients=new Set,i._dirty=!1,i._newTiles=new a,i}return i(t,e),Object.defineProperty(t.prototype,"tilingScheme",{get:function(){var e=this.tilingSchemeOwner.tilingScheme;return e?e.clone():null},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtent",{set:function(e){if(e&&!e.spatialReference.equals(this.viewState.spatialReference))return void m.error("#extent","extent spatial reference needs to be in the same spatial reference as the view");var t=this._get("filterExtent");if(!(t===e||t&&e&&t.equals(e))){var i=e?e.clone():null;this._set("filterExtent",i),this._setDirty()}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"filterExtentRect",{get:function(){if(!this.filterExtent||!this.tilingScheme)return null;var e=c.create();return f.extentToBoundingRect(this.filterExtent,e,this.tilingScheme.spatialReference),e},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"rootTileIds",{get:function(){return this.filterExtentRect?this.tilingScheme.rootTilesInExtent(this.filterExtentRect):[[0,0,0]]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"suspended",{set:function(e){e!==this._get("suspended")&&(this._set("suspended",e),this._setDirty())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"updating",{get:function(){return this._dirty||!!this._pendingTiles},enumerable:!0,configurable:!0}),t.prototype.initialize=function(){var e=this;this.handles.add(this.watch(["tilingScheme","tileSize"],function(){return e._reset()},!0)),this.handles.add(p.init(this,["tileSize","cameraOnSurface.location","tilingScheme","viewState.camera","focus.locationOnSurface"],function(){return e._setDirty()})),this.scheduler&&(this._frameWorker=this.scheduler.registerTask(12,function(t){return e._update(t)},function(){return e.updating}))},t.prototype.destroy=function(){this._frameWorker&&(this._frameWorker.remove(),this._frameWorker=null),this.handles&&(this.handles.destroy(),this.handles=null)},t.prototype.addClient=function(){var e=this,t=g();return this.clients.add(t),1===this.clients.size&&this._setDirty(),{remove:function(){return e._removeClient(t)}}},t.prototype._removeClient=function(e){this.clients.delete(e),this._hasClients||this._clear()},Object.defineProperty(t.prototype,"_hasClients",{get:function(){return this.clients.size>0},enumerable:!0,configurable:!0}),t.prototype._setDirty=function(){!this._hasClients||this.suspended||this._dirty||(this._frameWorker?(this._dirty=!0,this.notifyChange("updating")):this._update(y.noBudget))},t.prototype._clear=function(){this.tiles.removeAll(),this.idToTile.clear(),this._reset(),this._dirty=!1,this.notifyChange("updating")},t.prototype._update=function(e){this._dirty=!1,this._pendingTiles||(this._startUpdate(e),this._frameWorker&&(this._frameWorker.priority=1)),this._subdivideTilesForView(e),!this._pendingTiles&&this._frameWorker&&(this._frameWorker.priority=12),this.notifyChange("updating")},t.prototype._startUpdate=function(e){if(!this.suspended){if(!this.tilingScheme)return void this._clear();this._tileMeasurements||(this._tileMeasurements=new d.FeatureTileMeasurements3D({renderCoordsHelper:this.renderCoordsHelper,tilingScheme:this.tilingScheme,tileSize:this.tileSize,maxVerticalScreenSize:S}));var t=this.viewState.camera,i=this.cameraOnSurface.location;this._tileMeasurements.begin(t,this.focus?this.focus.locationOnSurface:i,i.z),this._pendingTiles=this._getRootTiles()}},t.prototype._reset=function(){this._newTiles.clear(),this._tileMeasurements=null,this._pendingTiles=null,this._setDirty()},t.prototype._getRootTiles=function(){var e=this;return this.rootTileIds.map(function(t){return new h.FeatureTileDescriptor3D(t[0],t[1],t[2],e.tilingScheme)})},t.prototype._purgeHorizonTiles=function(e){e.sort(function(e,t){var i=e.measures.screen.rect,r=t.measures.screen.rect;return i[1]+i[3]-(r[1]+r[3])}),c.empty(v);for(var t=0;t<e.length;t++)if(c.expand(v,e.data[t].measures.screen.rect),c.height(v)>S)return e.data.slice(t,e.length);return[]},t.prototype._subdivideTilesForView=function(e){var t;if(this._pendingTiles){for(;this._pendingTiles.length>0&&!e.done;){var i=this._pendingTiles.pop();e.madeProgress(),this.filterExtentRect&&!c.intersects(this.filterExtentRect,i.extent)||(this._tileMeasurements.updateTile(i),0!==i.measures.visibility&&(i.measures.shouldSplit?(this.tilingScheme.ensureMaxLod(i.lij[0]+1),(t=this._pendingTiles).push.apply(t,i.getChildren())):this._newTiles.push(i)))}0===this._pendingTiles.length&&(this._updateTiles(this._purgeHorizonTiles(this._newTiles)),this._newTiles.clear(),this._tileMeasurements.end(),this._pendingTiles=null)}},t.prototype._updateTiles=function(e){for(var t=this,i=0,r=this.tiles.items;i<r.length;i++){r[i].used=!1}var n=e.filter(function(e){var i=t.idToTile.get(e.id);return i?(i.copyMeasurementsFrom(e),i.used=!0):t.idToTile.set(e.id,e),!i}),s=this.tiles.items.filter(function(e){return!e.used&&(t.idToTile.delete(e.id),!0)});this.tiles.removeMany(s),this.tiles.addMany(n),this.sortTiles()},t.prototype.sortTiles=function(){this.tiles.sort(function(e,t){return e.measures.visibility!==t.measures.visibility?2===e.measures.visibility?-1:1:e.measures.distance-t.measures.distance}),this.tiles.forEach(function(e,t){return e.loadPriority=t})},r([u.property({constructOnly:!0})],t.prototype,"scheduler",void 0),r([u.property({constructOnly:!0})],t.prototype,"renderCoordsHelper",void 0),r([u.property({constructOnly:!0})],t.prototype,"tilingSchemeOwner",void 0),r([u.property({constructOnly:!0})],t.prototype,"cameraOnSurface",void 0),r([u.property({constructOnly:!0})],t.prototype,"focus",void 0),r([u.property({constructOnly:!0})],t.prototype,"viewState",void 0),r([u.property()],t.prototype,"tiles",void 0),r([u.property()],t.prototype,"tileSize",void 0),r([u.property({readOnly:!0,dependsOn:["tilingSchemeOwner.tilingScheme"]})],t.prototype,"tilingScheme",null),r([u.property()],t.prototype,"filterExtent",null),r([u.property({readOnly:!0,dependsOn:["filterExtent","tilingScheme"]})],t.prototype,"filterExtentRect",null),r([u.property({readOnly:!0,dependsOn:["filterExtentRect"]})],t.prototype,"rootTileIds",null),r([u.property({value:!1})],t.prototype,"suspended",null),r([u.property({readOnly:!0})],t.prototype,"updating",null),t=r([u.subclass("esri.views.3d.layers.support.FeatureTileTree3D")],t)}(u.declared(n));t.FeatureTileTree3D=_;var T=0,v=c.create(),S=10;t.default=_});