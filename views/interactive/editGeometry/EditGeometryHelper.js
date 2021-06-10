/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/Evented","./EditGeometry","./operations/AppendVertex","./operations/UpdateVertices","./operations/RemoveVertices","./operations/SplitEdge","./operations/MoveVertex","./operations/RotateVertex","./operations/ScaleVertex"],(function(e,t,r,i,o,n,s,d,c,p,a){"use strict";let y=function(e){function r(t,r){var i;return(i=e.call(this)||this).editGeometry=t,i.type=r,i._geometry=null,i._dirty=!0,i._listener=i.editGeometry.on("change",(e=>{e.addedVertices&&i.emit("vertex-add",{type:"vertex-add",vertices:e.addedVertices,operation:e.operation}),e.removedVertices&&i.emit("vertex-remove",{type:"vertex-remove",vertices:e.removedVertices,operation:e.operation}),e.updatedVertices&&i.emit("vertex-update",{type:"vertex-update",vertices:e.updatedVertices,operation:e.operation}),i._dirty=!0})),i}t._inheritsLoose(r,e);var i=r.prototype;return i.destroy=function(){this._listener.remove()},i.splitEdge=function(e,t){const r=new d.SplitEdge(this.editGeometry,e,t);return this.editGeometry.apply(r),r},i.updateVertices=function(e,t,r=1){const i=new n.UpdateVertices(this.editGeometry,e,t);return this.editGeometry.apply(i,r),i},i.moveVertices=function(e,t,r,i,o=1){return this.updateVertices(e,new c.MoveVertex(this.editGeometry.coordinateHelper,t,r,i),o)},i.scaleVertices=function(e,t,r,i,o,n=1,s=0){return this.updateVertices(e,new a.ScaleVertex(this.editGeometry.coordinateHelper,t,r,i,o,s),n)},i.rotateVertices=function(e,t,r,i=1,o=0){return this.updateVertices(e,new p.RotateVertex(this.editGeometry.coordinateHelper,t,r,o),i)},i.removeVertices=function(e){let t=0;switch(this.type){case"point":t=1;break;case"polyline":t=2;break;case"polygon":t=3}const r=new s.RemoveVertices(this.editGeometry,e,t);return this.editGeometry.apply(r),r},i.appendVertex=function(e){if(0===this.editGeometry.components.length)return null;const t=new o.AppendVertex(this.editGeometry,this.editGeometry.components[0],e);return this.editGeometry.apply(t),t},i.canRemoveVertex=function(){let e=0;switch(this.type){case"point":e=1;break;case"polyline":e=2;break;case"polygon":e=3}return this.editGeometry.components[0].vertices.length>e},i.undo=function(){return this.editGeometry.undo()},i.redo=function(){return this.editGeometry.redo()},t._createClass(r,[{key:"canUndo",get:function(){return this.editGeometry.canUndo}},{key:"canRedo",get:function(){return this.editGeometry.canRedo}},{key:"geometry",get:function(){if(this._dirty){switch(this.type){case"point":this._geometry=this.editGeometry.toPoint();break;case"polyline":this._geometry=this.editGeometry.toPolyline();break;case"polygon":this._geometry=this.editGeometry.toPolygon()}this._dirty=!1}return this._geometry}}]),r}(r);e.Component=i.Component,e.Edge=i.Edge,e.EditGeometry=i.EditGeometry,e.Vertex=i.Vertex,e.EditGeometryHelper=y,Object.defineProperty(e,"__esModule",{value:!0})}));