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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/tsSupport/generatorHelper","../../../core/tsSupport/awaiterHelper","../../../core/maybe","../../../core/promiseUtils","../../../core/watchUtils","../../../core/accessorSupport/decorators","../../../symbols/support/defaults3D","./LayerView3D","./graphics/Graphics3DFrustumVisibility","./graphics/Graphics3DGraphicLikeLayerView","./graphics/graphicUtils","./support/projectExtentUtils"],function(t,e,i,r,s,p,n,a,o,u,h,d,c,l,y,g){return function(t){function e(){var e=null!==t&&t.apply(this,arguments)||this;return e.frustumVisibility=new c,e.slicePlaneEnabled=!1,e.supportsDraping=!0,e.overlayUpdating=!1,e.suspendResumeExtent=null,e.fullExtentInLocalViewSpatialReference=null,e}return i(e,t),e.prototype.initialize=function(){var t=this;this._set("graphics3d",new l({owner:this,layer:this.layer,scaleVisibilityEnabled:!0})),this.graphics3d.setup(),this.frustumVisibility.setup(this),this.setupSuspendResumeExtent(),this.handles.add(this.watch("fullOpacity",function(){return t.graphics3d.graphicsCore.opacityChange()})),this.handles.add(this.layer.on("graphic-update",function(e){return t.graphics3d.graphicsCore.graphicUpdateHandler(e)}));var e=g.toViewIfLocal(this).then(function(e){t.fullExtentInLocalViewSpatialReference=e});e&&this.addResolvingPromise(e),this.drawingOrder=this.view.getDrawingOrder(this.layer.uid),this.handles.add(o.whenTrueOnce(this.view,"basemapTerrain.ready",function(){return t.notifyChange("updating")}))},e.prototype.destroy=function(){this.frustumVisibility&&(this.frustumVisibility.destroy(),this._set("frustumVisibility",null)),this.graphics3d&&(this.graphics3d.destroy(),this._set("graphics3d",null))},Object.defineProperty(e.prototype,"drawingOrder",{set:function(t){this.graphics3d.graphicsCore.setDrawingOrder(t),this._set("drawingOrder",t)},enumerable:!0,configurable:!0}),e.prototype.fetchPopupFeatures=function(t,e){return p(this,void 0,void 0,function(){return s(this,function(t){return[2,n.isSome(e)?e.clientGraphics:null]})})},Object.defineProperty(e.prototype,"graphics3DGraphics",{get:function(){return this.graphics3d.graphicsCore.graphics3DGraphics},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"graphics3DGraphicsByObjectID",{get:function(){return this.graphics3d?this.graphics3d.graphicsCore.graphics3DGraphicsByObjectID:null},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"symbolUpdateType",{get:function(){return this.graphics3d.graphicsCore.symbolUpdateType},enumerable:!0,configurable:!0}),e.prototype.getRenderingInfo=function(t){return{symbol:t.symbol||h.getDefaultSymbol3D(t.geometry)}},e.prototype.getGraphicFromGraphicUid=function(t){return this.graphics3d.getGraphicFromGraphicUid(t)},e.prototype.whenGraphicBounds=function(t,e){return this.graphics3d.whenGraphicBounds(t,e)},e.prototype.whenSymbolLayerSize=function(t,e){return this.graphics3d.whenSymbolLayerSize(t,e)},e.prototype.queryGraphics=function(){return a.resolve(this.loadedGraphics)},e.prototype.highlight=function(t,e){return void 0===e&&(e={}),this.graphics3d.highlight(t,e)},e.prototype.getStats=function(){return{features:this.loadedGraphics.length,updating:this.updating,elevationUpdating:this.graphics3d.elevationAlignment.updating,visibilityFrustum:!this.frustumVisibility.suspended}},e.prototype.canResume=function(){return!(!this.inherited(arguments)||this.frustumVisibility&&this.frustumVisibility.suspended||this.graphics3d&&this.graphics3d.suspended)},e.prototype.isUpdating=function(){return!(!(this.overlayUpdating||this.graphics3d&&this.graphics3d.updating||this.frustumVisibility&&this.frustumVisibility.updating)&&this.view.basemapTerrain&&this.view.basemapTerrain.ready)},e.prototype.setupSuspendResumeExtent=function(){var t=this;o.init(this.graphics3d.graphicsCore,"computedExtent",function(e){t.suspendResumeExtent=y.enlargeExtent(e,t.suspendResumeExtent,1.2),t.frustumVisibility.setExtent(t.suspendResumeExtent)},!0)},r([u.property({aliasOf:"layer.graphics"})],e.prototype,"loadedGraphics",void 0),r([u.property({dependsOn:["frustumVisibility.suspended","graphics3d.suspended"]})],e.prototype,"suspended",void 0),r([u.property({dependsOn:["frustumVisibility.updating","graphics3d.updating","overlayUpdating"]})],e.prototype,"updating",void 0),r([u.property()],e.prototype,"layer",void 0),r([u.property({readOnly:!0})],e.prototype,"frustumVisibility",void 0),r([u.property({readOnly:!0})],e.prototype,"graphics3d",void 0),r([u.property({type:Boolean})],e.prototype,"slicePlaneEnabled",void 0),r([u.property({aliasOf:"graphics3d.graphicsCore.hasDraped"})],e.prototype,"hasDraped",void 0),r([u.property({type:Boolean})],e.prototype,"supportsDraping",void 0),r([u.property({type:Boolean})],e.prototype,"overlayUpdating",void 0),r([u.property()],e.prototype,"drawingOrder",null),e=r([u.subclass("esri.views.3d.layers.GraphicsLayerView3D")],e)}(u.declared(d))});