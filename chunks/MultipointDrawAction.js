/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./_rollupPluginBabelHelpers","./tslib.es6","../core/has","../core/maybe","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../geometry/Point","../geometry","../core/Handles","../views/input/InputManager","../views/support/screenUtils","../views/draw/DrawAction","../views/draw/input/DrawEvents","../views/draw/input/Keys"],(function(e,t,i,n,o,s,r,a,d,p,h,c,u,_,v,l,w,g,m,P){"use strict";function y(e){return"mouse"!==e.pointerType||0===e.button}e.MultipointDrawAction=function(e){function i(t){var i;return(i=e.call(this,t)||this)._cursorScreenPoint=null,i._popVertexOnPointerMove=!1,i._addVertexOnPointerUp=!1,i._activePointerId=null,i._viewHandles=new v,i._undoRedoHandles=new v,i}t._inheritsLoose(i,e);var n=i.prototype;return n.initialize=function(){this._addViewHandles(),this._addUndoRedoHandles()},n.destroy=function(){this._removeViewHandles(),this._viewHandles.destroy(),this._removeUndoRedoHandles(),this._undoRedoHandles.destroy(),this.emit("destroy")},n.undo=function(){e.prototype.undo.call(this),this.notifyChange("vertices")},n.redo=function(){e.prototype.redo.call(this),this.notifyChange("vertices")},n.complete=function(){this._completeDrawing()},n._addViewHandles=function(){this._removeViewHandles(),this._viewHandles.add([this.view.on("click",(e=>{e.stopPropagation()}),l.ViewEventPriorities.TOOL),this.view.on("pointer-down",(e=>{this._shouldHandlePointerEvent(e)&&(this._snappingTask=o.abortMaybe(this._snappingTask),this._activePointerId=e.pointerId,this._addVertexOnPointerUp=!0,this._cursorScreenPoint=w.createScreenPointFromEvent(e),"touch"===e.pointerType&&this._updateCursor(e.native))}),l.ViewEventPriorities.TOOL),this.view.on("pointer-move",(e=>{this._popVertexOnPointerMove&&(this.undo(),this._popVertexOnPointerMove=!1),this._snappingTask=o.abortMaybe(this._snappingTask),this._cursorScreenPoint=w.createScreenPointFromEvent(e),"touch"!==e.pointerType&&this._updateCursor(e.native)}),l.ViewEventPriorities.TOOL),this.view.on("pointer-drag",(e=>{this._shouldHandlePointerEvent(e)&&(this._snappingTask=o.abortMaybe(this._snappingTask),this._addVertexOnPointerUp=!1)}),l.ViewEventPriorities.TOOL),this.view.on("pointer-up",(e=>{if(this._shouldHandlePointerEvent(e))if(this._snappingTask=o.abortMaybe(this._snappingTask),this._activePointerId=null,this._addVertexOnPointerUp)this._vertexAddHandler(e);else{const t="touch"===e.pointerType;this._updateCursor(e.native,t)}}),l.ViewEventPriorities.TOOL),this.view.on("drag",["Shift"],(e=>{e.stopPropagation()}),l.ViewEventPriorities.TOOL),this.view.on("double-click",(e=>{e.stopPropagation(),this._drawCompleteHandler(e)}),l.ViewEventPriorities.TOOL),this.view.on("double-click",["Control"],(e=>{e.stopPropagation(),this._drawCompleteHandler(e)}),l.ViewEventPriorities.TOOL),this.view.on("key-down",(e=>{const{key:t,repeat:i}=e;t===P.KEYS.vertexAddKey&&!i&&this._cursorScreenPoint?(e.stopPropagation(),this._snappingTask=o.abortMaybe(this._snappingTask),this._vertexAddHandler(e)):t===P.KEYS.drawCompleteKey&&!i&&this._cursorScreenPoint&&this.vertices.length>2?(e.stopPropagation(),this._snappingTask=o.abortMaybe(this._snappingTask),this._vertexAddHandler(e),this._drawCompleteHandler(e)):t!==P.KEYS.undoKey||this.interactiveUndoDisabled||i?t!==P.KEYS.redoKey||this.interactiveUndoDisabled||i?t!==P.KEYS.panKey||i||e.stopPropagation():(e.stopPropagation(),this.redo()):(e.stopPropagation(),this.undo())}),l.ViewEventPriorities.TOOL),this.view.on("key-up",(e=>{e.key===P.KEYS.panKey&&e.stopPropagation()}),l.ViewEventPriorities.TOOL)])},n._addUndoRedoHandles=function(){this._removeUndoRedoHandles(),this._undoRedoHandles.add([this._editGeometry.on("vertex-remove",(e=>{if(this.notifyChange("vertices"),"undo"===e.operation){const t=this._nativeEventHistory.undoStack.pop();this._nativeEventHistory.redoStack.push(t);const i=[...this._committedVertices];o.isSome(this._stagedVertex)&&i.push(this._coordinateHelper.pointToArray(this._stagedVertex)),this.emit("undo",new m.VertexRemoveEvent(this.view,t,e.vertices[0].index,i))}})),this._editGeometry.on("vertex-add",(e=>{if(this.notifyChange("vertices"),"apply"===e.operation){const e=this._nativeEventHistory.undoStack[this._nativeEventHistory.undoStack.length],t=this._committedVertices.length-1,i=new m.VertexAddEvent(this.view,e,t,this.vertices);this.emit("vertex-add",i),i.defaultPrevented&&(this._popVertexOnPointerMove=!0)}else if("redo"===e.operation){const t=this._nativeEventHistory.redoStack.pop();this._nativeEventHistory.undoStack.push(t);const i=[...this._committedVertices];o.isSome(this._stagedVertex)&&i.push(this._coordinateHelper.pointToArray(this._stagedVertex)),this.emit("redo",new m.VertexAddEvent(this.view,t,e.vertices[0].index,i))}}))])},n._removeViewHandles=function(){this._viewHandles.removeAll()},n._removeUndoRedoHandles=function(){this._undoRedoHandles.removeAll()},n._addVertex=function(e,t){const i=this._coordinateHelper.fromArray(e);if(this._isDuplicateOfLastVertex(i))return;this._lastVertexUnsnapped=this._stagedVertexUnsnapped,this._popCursorVertex(),this._editGeometry.appendVertex(i);const n=t||new Event("placeholder");this._nativeEventHistory.undoStack.push(n)},n._updateCursor=function(e,t=!1){if(this._popCursorVertex(),!this._cursorScreenPoint)return;const i=this.getCoordsAndPointFromScreenPoint(this._cursorScreenPoint);if(o.isSome(i)&&!t){this._pushCursorVertex(i.vertex);const t=()=>new m.CursorUpdateEvent(this.view,e,this._activeComponent.vertices.length,this.vertices,o.isSome(this._stagedVertex)?new u(this._stagedVertex):null);this.emit("cursor-update",t()),o.isSome(this._snappingTask)&&this._snappingTask.promise.then((e=>{e.valid&&this.emit("cursor-update",t())}),(()=>{}))}},n._completeDrawing=function(e){if(this._activePointerId=null,this._popCursorVertex(),this._snappingTask=o.abortMaybe(this._snappingTask),o.isSome(this._snappingManager)&&this._snappingManager.doneSnapping(),this.vertices.length<2)return;const t=new m.DrawCompleteEvent(e,this.vertices);this.emit("draw-complete",t),t.defaultPrevented||this._removeViewHandles()},n._shouldHandlePointerEvent=function(e){return y(e)&&(o.isNone(this._activePointerId)||this._activePointerId===e.pointerId)},n._vertexAddHandler=function(e){const t=o.isSome(this._stagedVertex)?this._coordinateHelper.pointToArray(this._stagedVertex):this.getCoordsFromScreenPoint(this._cursorScreenPoint);o.isSome(t)&&this._addVertex(t,e.native)},n._drawCompleteHandler=function(e){this._completeDrawing(e.native)},i}(g),e.MultipointDrawAction=i.__decorate([d.subclass("esri.views.draw.MultipointDrawAction")],e.MultipointDrawAction);var V=Object.freeze({__proto__:null,get MultipointDrawAction(){return e.MultipointDrawAction}});e.MultipointDrawAction$1=V}));
