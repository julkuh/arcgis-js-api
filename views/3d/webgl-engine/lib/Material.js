/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","./DefaultVertexAttributeLocations","./ContentObject","../materials/internal/MaterialUtil"],(function(e,t,r,i,s,a){"use strict";let n=function(e){function s(t,r){var s;return(s=e.call(this)||this).type=3,s.supportsEdges=!1,s._visible=!0,s._renderPriority=0,s._insertOrder=0,s._vertexAttributeLocations=i.Default3D,s._params=a.copyParameters(t,r),s.validateParameterValues(s._params),s}t._inheritsLoose(s,e);var n=s.prototype;return n.dispose=function(){},n.update=function(e){return!1},n.setParameterValues=function(e){a.updateParameters(this._params,e)&&(this.validateParameterValues(this._params),this.parametersChanged())},n.validateParameterValues=function(e){},n.isVisibleInPass=function(e){return!0},n.isVisible=function(){return this._visible},n.parametersChanged=function(){r.isSome(this.materialRepository)&&this.materialRepository.materialChanged(this)},t._createClass(s,[{key:"params",get:function(){return this._params}},{key:"visible",get:function(){return this._visible},set:function(e){e!==this._visible&&(this._visible=e,this.parametersChanged())}},{key:"renderOccluded",get:function(){return this.params.renderOccluded}},{key:"renderPriority",get:function(){return this._renderPriority},set:function(e){e!==this._renderPriority&&(this._renderPriority=e,this.parametersChanged())}},{key:"insertOrder",get:function(){return this._insertOrder},set:function(e){e!==this._insertOrder&&(this._insertOrder=e,this.parametersChanged())}},{key:"vertexAttributeLocations",get:function(){return this._vertexAttributeLocations}}]),s}(s.ContentObject);function u(e,t){return e.isVisible()&&e.isVisibleInPass(t.pass)&&0!=(e.renderOccluded&t.renderOccludedMask)}const o={renderOccluded:1};e.Material=n,e.materialParametersDefaults=o,e.materialPredicate=u,Object.defineProperty(e,"__esModule",{value:!0})}));
