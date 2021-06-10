/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../chunks/vec4","../../webgl-engine/lib/GeometryUtil","../../layers/graphics/ElevationContext","../../layers/graphics/pointUtils","./Object3DVisualElement","../../webgl-engine/materials/ShadedColorMaterial","../editingTools/settings"],(function(e,t,r,i,n,s,a,o,l,u,c,h){"use strict";let d=function(e){function i(t){var r;return(r=e.call(this,t)||this).view=null,r._renderOccluded=4,r._vertices=null,r._spatialReference=null,r._color=h.settings.colorToVec4(h.settings.reshapeManipulators.vertex.color),r._size=h.settings.reshapeManipulators.vertex.size,r._outlineColor=h.settings.colorToVec4(h.settings.reshapeManipulators.vertex.outlineColor),r._outlineSize=h.settings.reshapeManipulators.vertex.outlineSize,r._elevationInfo=null,r.applyProps(t),r}t._inheritsLoose(i,e);var a=i.prototype;return a.updateMaterial=function(){this.attached&&this.vertexMaterial.setParameterValues(this.vertexMaterialParameters)},a.updateOutlineMaterial=function(){this.attached&&this.vertexOutlineMaterial.setParameterValues(this.vertexOutlineMaterialParameters)},a.createRenderGeometries=function(){const e=this.vertices;if(r.isNone(e)||0===e.length)return[];const t=.5,i=.5,s=l.geometryToRenderInfo(e,this.spatialReference,this.view.elevationProvider,this.view.renderCoordsHelper,o.ElevationContext.fromElevationInfo(this.elevationInfo)),a=[],u=s.numVertices,c=s.position;for(let r=0;r<u;++r){const e=n.set(f,c[3*r+0],c[3*r+1],c[3*r+2]),s=v(t,e),o=v(i,e);a.push({vertexGeometry:s,vertexOutlineGeometry:o})}return a},a.createGeometries=function(e){const t=this.createRenderGeometries();for(const{vertexGeometry:r,vertexOutlineGeometry:i}of t)e.addGeometry(r,this.vertexMaterial),e.addGeometry(i,this.vertexOutlineMaterial)},a.createExternalResources=function(){this.vertexMaterial=new c.ShadedColorMaterial({...this.vertexMaterialParameters,writeDepth:!0,cullFace:2,screenSizeEnabled:!0}),this.vertexOutlineMaterial=new c.ShadedColorMaterial({...this.vertexOutlineMaterialParameters,transparent:!0,writeDepth:!0,cullFace:1,screenSizeEnabled:!0,shadingEnabled:!1})},a.destroyExternalResources=function(){this.vertexMaterial=null,this.vertexOutlineMaterial=null},a.forEachExternalMaterial=function(e){e(this.vertexMaterial),e(this.vertexOutlineMaterial)},t._createClass(i,[{key:"renderOccluded",get:function(){return this._renderOccluded},set:function(e){e!==this._renderOccluded&&(this._renderOccluded=e,this.updateMaterial(),this.updateOutlineMaterial())}},{key:"vertices",get:function(){return this._vertices},set:function(e){this._vertices=e,this.recreateGeometry()}},{key:"spatialReference",get:function(){return this._spatialReference},set:function(e){this._spatialReference=e,this.recreateGeometry()}},{key:"color",get:function(){return this._color},set:function(e){s.exactEquals(e,this._color)||(s.copy(this._color,e),this.updateMaterial())}},{key:"size",get:function(){return this._size},set:function(e){e!==this._size&&(this._size=e,this.updateMaterial())}},{key:"outlineColor",get:function(){return this._outlineColor},set:function(e){s.exactEquals(e,this._outlineColor)||(s.copy(this._outlineColor,e),this.updateOutlineMaterial())}},{key:"outlineSize",get:function(){return this._outlineSize},set:function(e){e!==this._outlineSize&&(this._outlineSize=e,this.updateOutlineMaterial())}},{key:"elevationInfo",get:function(){return this._elevationInfo},set:function(e){this._elevationInfo=e,this.recreateGeometry()}},{key:"vertexMaterialParameters",get:function(){return{color:this._color,transparent:this._color[3]<1,screenSize:this.size,renderOccluded:this._renderOccluded}}},{key:"vertexOutlineMaterialParameters",get:function(){return{color:this._outlineColor,transparent:this._outlineColor[3]<1,screenSize:this.size+2*this.outlineSize,renderOccluded:this._renderOccluded}}}]),i}(u.Object3DVisualElement);const f=i.create();function v(e,t){return a.createSphereGeometry(e,16,16,{offset:t})}e.VerticesVisualElement=d,Object.defineProperty(e,"__esModule",{value:!0})}));
