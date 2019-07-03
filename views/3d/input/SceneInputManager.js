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

define(["require","exports","../../../core/tsSupport/declareExtendsHelper","../../../core/tsSupport/decorateHelper","../../../core/Accessor","../../../core/Handles","../../../core/accessorSupport/decorators","./handlers/DoubleClickZoom","./handlers/DragRotate","./handlers/DragZoom","./handlers/GamepadNavigation","./handlers/KeyboardNavigation","./handlers/MouseWheelZoom","./handlers/PinchAndPanNavigation","./handlers/PointerDownCancelAnimation","./handlers/SingleKeyResetHeading","./handlers/SingleKeyResetTilt","./handlers/TwoFingerTilt","../../input/BrowserEventSource","../../input/InputManager","../../input/ViewEvents","../../input/handlers/PreventContextMenu"],function(e,t,n,r,o,a,i,s,p,d,u,l,c,g,h,y,m,w,v,_,f,D){var A=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t._handles=new a,t}return n(t,e),t.prototype.initialize=function(){this.viewEvents=new f.ViewEvents(this.view)},t.prototype.destroy=function(){this._handles&&(this._handles.removeAll(),this._handles=null),this.disconnect()},Object.defineProperty(t.prototype,"primaryDragAction",{get:function(){return this._get("primaryDragAction")},set:function(e){"pan"!==e&&"rotate"!==e||e===this._get("primaryDragAction")||(this._set("primaryDragAction",e),this._updateMode())},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"mode",{get:function(){return this._get("mode")},set:function(e){"default"!==e&&"pro"!==e||e===this._get("mode")||(this._set("mode",e),this._updateMode())},enumerable:!0,configurable:!0}),t.prototype.disconnect=function(){this.viewEvents.disconnect(),this._inputManager&&(this._inputManager.destroy(),this._inputManager=null),this._source&&(this._source.destroy(),this._source=null)},t.prototype.connect=function(){var e=this.view;this._source=new v.BrowserEventSource(this.view.surface,e.input);var t=new _.InputManager(this._source);this._inputManager=t,t.installHandlers("prevent-context-menu",[new D.PreventContextMenu]),this._modeDragPan=new g.PinchAndPanNavigation(e,"primary"),this._modeDragRotate=new p.DragRotate(e,"secondary","center"),this._modeDragZoom=new d.DragZoom(e,"tertiary");var n={lookAround:"b",pan:{left:"ArrowLeft",right:"ArrowRight",forward:"ArrowUp",backward:"ArrowDown",up:"u",down:"j",headingLeft:"a",headingRight:"d",tiltUp:"w",tiltDown:"s"},resetHeading:"n",resetTilt:"p"};t.installHandlers("navigation",[new h.PointerDownCancelAnimation(e),new s.DoubleClickZoom(e),new u.GamepadNavigation(e),new l.KeyboardNavigation(e,n.pan),new c.MouseWheelZoom(e),new m.SingleKeyResetTilt(e,n.resetTilt),new y.SingleKeyResetHeading(e,n.resetHeading),new p.DragRotate(e,"primary","eye",[n.lookAround]),new p.DragRotate(e,"secondary","center",[n.lookAround]),new g.PinchAndPanNavigation(e,"tertiary",[n.lookAround]),this._modeDragRotate,this._modeDragZoom,this._modeDragPan,new w.TwoFingerTilt(e)]),this.viewEvents.connect(t),this._updateMode()},t.prototype._updateMode=function(){var e=this.mode,t=this.primaryDragAction,n=M.get(e).get(t);this._modeDragPan&&(this._modeDragPan.pointerAction=n.pan),this._modeDragRotate&&(this._modeDragRotate.pointerAction=n.rotate),this._modeDragZoom&&(this._modeDragZoom.pointerAction=n.zoom)},Object.defineProperty(t.prototype,"debug",{get:function(){return{inputManager:this._inputManager}},enumerable:!0,configurable:!0}),r([i.property()],t.prototype,"view",void 0),r([i.property({value:"pan"})],t.prototype,"primaryDragAction",null),r([i.property({value:"default"})],t.prototype,"mode",null),r([i.property({readOnly:!0,aliasOf:"_inputManager.hasPendingInputs"})],t.prototype,"hasPendingInputs",void 0),r([i.property({readOnly:!0,aliasOf:"_inputManager.latestPointerType"})],t.prototype,"latestPointerType",void 0),r([i.property()],t.prototype,"_inputManager",void 0),t=r([i.subclass("esri.views.3d.input.SceneInputManager")],t)}(i.declared(o)),M=new Map,P=new Map,b=new Map;return P.set("pan",{pan:"primary",rotate:"secondary",zoom:"tertiary"}),P.set("rotate",{pan:"secondary",rotate:"primary",zoom:"tertiary"}),b.set("pan",{pan:"primary",rotate:"tertiary",zoom:"secondary"}),b.set("rotate",{pan:"tertiary",rotate:"primary",zoom:"secondary"}),M.set("default",P),M.set("pro",b),A});