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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","../core/Error","../core/HandleOwner","../core/Logger","../core/promiseUtils","../core/scheduling","../core/watchUtils","../core/accessorSupport/decorators"],function(e,r,t,a,i,o,n,s,l,y,h,c,d){function p(e){return e&&"importLayerViewModule"in e}Object.defineProperty(r,"__esModule",{value:!0});var w=l.getLogger("esri.views.LayerViewManager"),u=new Map;u.set("view.map.basemap.baseLayers","view.basemapView.baseLayerViews"),u.set("view.map.ground.layers","view.groundView.layerViews"),u.set("view.map.layers","view.layerViews"),u.set("view.map.basemap.referenceLayers","view.basemapView.referenceLayerViews");var f=function(){function e(e,r){var t=this;this.layer=e,this.view=r,this._controller=y.createAbortController(),this._deferred=y.createDeferred(),this._started=!1,this.done=!1,y.onAbort(this._controller.signal,function(){var r=new n("cancelled:layerview-create","layerview creation cancelled",{layer:e});t._deferred.reject(r)})}return Object.defineProperty(e.prototype,"promise",{get:function(){return this._deferred.promise},enumerable:!0,configurable:!0}),e.prototype.destroy=function(){this._controller.abort();var e=this.layerView;if(e){var r=this,t=r.layer,a=r.view;t.destroyLayerView(e),t.emit("layerview-destroy",{view:a,layerView:e}),a.emit("layerview-destroy",{layer:t,layerView:e}),this.done=!0,this.layer=null,this.layerView=null,this.view=null,e.layer=null,e.parent=null,e.view=null}},e.prototype.start=function(){return o(this,void 0,void 0,function(){var e,r,t,a,o,s,l;return i(this,function(i){switch(i.label){case 0:if(this._started)return[2];this._started=!0,e=this,r=e._controller.signal,t=e.layer,a=e.view,this._map=a.map,i.label=1;case 1:return i.trys.push([1,5,,6]),[4,t.load({signal:r})];case 2:return i.sent(),[4,t.createLayerView(a,{signal:r})];case 3:return o=i.sent(),[4,o.when()];case 4:return i.sent(),!(s=this._map&&this._map.allLayers.includes(t))||r.aborted?(o.layer.destroyLayerView(o),o.layer=o.parent=o.view=null,this.done=!0,s?[2]:[2,this._deferred.reject(new n("view:no-layerview-for-layer","The layer has been removed from the map",{layer:t}))]):(this.layerView=o,t.emit("layerview-create",{view:a,layerView:o}),a.emit("layerview-create",{layer:t,layerView:o}),this.done=!0,this._deferred.resolve(o),[3,6]);case 5:return l=i.sent(),t.emit("layerview-create-error",{view:a,error:l}),a.emit("layerview-create-error",{layer:t,error:l}),this.done=!0,this._deferred.reject(new n("layerview:create-error","layerview creation failed",{layer:t,error:l})),[3,6];case 6:return[2]}})})},e}(),v=function(e){function r(r){var t=e.call(this)||this;return t._layerLayerViewInfoMap=new Map,t.view=null,t._importLayerViewModules=function(){var e=t.view,r=t.get("view.map.allLayers");e&&r&&r.forEach(function(r){p(r)&&r.importLayerViewModule(e)})},t._doWork=t._doWork.bind(t),t._reschedule=t._reschedule.bind(t),t.handles.add([c.on(t,"view.allLayerViews","change",t._importLayerViewModules,t._importLayerViewModules),t.watch(["view.map.basemap","view.map.ground","view.map.layers","view.internallyReady"],t._reschedule)]),t}return t(r,e),r.prototype.destroy=function(){this.clear(),this.view=null,this._map=null},Object.defineProperty(r.prototype,"updating",{get:function(){if(this.handles.has("reschedule"))return!0;var e=!0;return this._layerLayerViewInfoMap.forEach(function(r){e=e&&r.done}),!e},enumerable:!0,configurable:!0}),r.prototype.clear=function(){this.destroyed||(this._layerLayerViewInfoMap.forEach(function(e,r){e.destroy()}),this._layerLayerViewInfoMap.clear(),this._refreshCollections())},r.prototype.whenLayerView=function(e){return this._reschedule(),this._doWork(),this._layerLayerViewInfoMap.has(e)?this._layerLayerViewInfoMap.get(e).promise:y.reject(new n("view:no-layerview-for-layer","No layerview has been found for the layer",{layer:e}))},r.prototype._reschedule=function(){this.handles.remove("reschedule"),this.handles.add(h.schedule(this._doWork),"reschedule"),this.notifyChange("updating")},r.prototype._doWork=function(){var e=this.get("view.map");if(this._map!==e&&(this.clear(),this._map=e),this.handles.has("reschedule")){this.handles.remove("reschedule"),this.handles.remove("collection-change");var r=e&&e.allLayers;if(r){r.forEach(this._createLayerView,this),this._refreshCollections();var t=[];this._layerLayerViewInfoMap.forEach(function(e,a){r.includes(a)||t.push(e)});for(var a=0,i=t;a<i.length;a++){var o=i[a];this._layerLayerViewInfoMap.delete(o.layer),o.destroy()}this.handles.add(r.on("change",this._reschedule),"collection-change"),this.notifyChange("updating")}}},r.prototype._refreshCollections=function(){var e=this;u.forEach(function(r,t){e._populateLayerViewsOwners(e.get(t),e.get(r),e.view)})},r.prototype._populateLayerViewsOwners=function(e,r,t){var a=this;if(!e||!r)return void(r&&r.removeAll());var i=0;e.forEach(function(e){var o=a._layerLayerViewInfoMap.get(e);if(o&&o.layerView){var n=o.layerView;n.layer=e,n.parent=t,r.getItemAt(i)!==n&&r.splice(i,0,n),e.layers&&a._populateLayerViewsOwners(e.layers,n.layerViews,n),i+=1}}),i<r.length&&r.splice(i,r.length)},r.prototype._createLayerView=function(e){var r=this,t=this.view;if(this._layerLayerViewInfoMap.has(e))return this.get("view.internallyReady")&&this._layerLayerViewInfoMap.get(e).start(),void this.notifyChange("updating");e.load(),p(e)&&e.importLayerViewModule(t);var a=new f(e,this.view);a.promise.then(function(){r._refreshCollections(),r.notifyChange("updating")},function(t){t&&(y.isAbortError(t)||"cancelled:layerview-create"===t.name)||w.error("Failed to create view for layer '"+e.title+", id:"+e.id+"' of type '"+e.type+"'.",{error:t}),r._refreshCollections(),r.notifyChange("updating")}),this._layerLayerViewInfoMap.set(e,a),this.get("view.internallyReady")&&a.start(),this.notifyChange("updating")},a([d.property({readOnly:!0})],r.prototype,"updating",null),a([d.property()],r.prototype,"view",void 0),r=a([d.subclass("esri.views.LayerViewManager")],r)}(d.declared(s));r.default=v});