/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/aaBoundingBox","./graphicUtils"],(function(e,t,i,r,n,o){"use strict";let s=function(){function r(e,t,i){this.graphics3DSymbolLayer=e,this.renderGeometries=t,this.boundingBox=i,this.type="draped",this.stage=null,this._visible=!1,this._addedToStage=!1,this._layerView=null,this.isElevationSource=!1}var s=r.prototype;return s.initialize=function(e,t,i){this.stage=e,this._layerView=i,this._overlayRenderer=this._layerView.view.basemapTerrain.overlayManager.renderer},s.setVisibility=function(e){if(null!=this.stage&&this._visible!==e){if(this._visible=e,e&&!this._addedToStage)return this._addedToStage=!0,void this._overlayRenderer.addGeometries(this.renderGeometries,this._layerView,1);if(e||this._addedToStage){for(const e of this.renderGeometries)e.instanceParameters.visible=this._visible;this._overlayRenderer.updateGeometries(this.renderGeometries,this._layerView,1)}}},s.destroy=function(){this.stage&&this._addedToStage&&this._overlayRenderer.removeGeometries(this.renderGeometries,this._layerView,4),this._addedToStage=!1,this._visible=!1,this.stage=null},s.getBSRadius=function(){return this.renderGeometries.reduce(((e,t)=>Math.max(e,t.boundingSphere[3])),0)},s.getCenterObjectSpace=function(e=t.create()){return i.set(e,0,0,0)},s.getBoundingBoxObjectSpace=function(e=n.create()){return n.empty(e)},s.addObjectState=function(e,t){0===e&&(this.renderGeometries.forEach((e=>{const i=e.addHighlight();t.addRenderGeometry(e,i,this)})),this._addedToStage&&this._overlayRenderer.updateHighlights(this.renderGeometries,this._layerView))},s.removeObjectState=function(e){this.renderGeometries.forEach((t=>{e.removeRenderGeometry(t)}))},s.removeRenderGeometryObjectState=function(e,t){e.removeHighlight(t),this._addedToStage&&this._overlayRenderer.updateHighlights(this.renderGeometries,this._layerView)},s.computeAttachmentOrigin=function(e){for(const t of this.renderGeometries)t.computeAttachmentOrigin(h)&&(e.draped.origin[0]+=h[0],e.draped.origin[1]+=h[1],e.draped.num++)},s.getProjectedBoundingBox=async function(t,i,r,s,d){n.empty(d);for(let e=0;e<this.renderGeometries.length;e++){const i=this.renderGeometries[e];this._getRenderGeometryProjectedBoundingRect(i,t,a,r),n.expandWithRect(d,a)}if(i){let t;n.center(d,h);const r=o.demResolutionForBoundingBox(d,i);try{t=await i.service.queryElevation(h[0],h[1],s,r,"ground")}catch(c){}e.isSome(t)&&(d[2]=Math.min(d[2],t),d[5]=Math.max(d[5],t))}return d},s._getRenderGeometryProjectedBoundingRect=function(e,t,i,r){if(this.boundingBox)n.set(d,this.boundingBox);else{const t=e.boundingSphere,i=t[3];d[0]=t[0]-i,d[1]=t[1]-i,d[2]=t[2]-i,d[3]=t[0]+i,d[4]=t[1]+i,d[5]=t[2]+i}return t(d,0,2),this.calculateRelativeScreenBounds&&r.push({location:n.center(d),screenSpaceBoundingRect:this.calculateRelativeScreenBounds()}),n.toRect(d,i)},r}();const a=r.create(),d=n.create(),h=t.create();return s}));
