/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/maybe","../../../core/accessorSupport/trackingUtils","../../../core/Handles","./constants","./HoveredPoints","./InputRepresentation2D"],(function(e,t,n,i,o,s,r){"use strict";let a=function(){function e(e,t){this._handles=new i,this._inputRepresentation=new r.InputRepresentation2D({view:e}),this._hoveredPoints=new s.HoveredPoints({view:e}),this._handles.add([n.reactionInit((()=>t.viewModel.hoveredPoints),(e=>this._hoveredPoints.update(e))),n.reactionInit((()=>({input:t.viewModel.input,state:t.state})),(({input:e,state:t})=>this._updateInputRepresentation(e,t)))])}var a=e.prototype;return a.destroy=function(){this._handles=t.destroyMaybe(this._handles),this._inputRepresentation=t.destroyMaybe(this._inputRepresentation),this._hoveredPoints=t.destroyMaybe(this._hoveredPoints)},a._updateInputRepresentation=function(e,t){t===o.ElevationProfileState.Selected?this._inputRepresentation.update(e):this._inputRepresentation.remove()},e}();e.ElevationProfileView2D=a,Object.defineProperty(e,"__esModule",{value:!0})}));
