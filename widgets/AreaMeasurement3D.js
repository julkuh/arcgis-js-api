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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./AreaMeasurement3D/nls/AreaMeasurement3D","../core/accessorSupport/decorators","./Widget","./AreaMeasurement3D/AreaMeasurement3DViewModel","./support/widget"],function(e,t,s,a,i,n,r,l,u){var m={button:"esri-button esri-button--secondary",buttonDisabled:"esri-button--disabled",base:"esri-area-measurement-3d esri-widget esri-widget--panel",container:"esri-area-measurement-3d__container",hint:"esri-area-measurement-3d__hint",hintText:"esri-area-measurement-3d__hint-text",panelError:"esri-area-measurement-3d__panel--error",measurement:"esri-area-measurement-3d__measurement",measurementItem:"esri-area-measurement-3d__measurement-item",measurementItemDisabled:"esri-area-measurement-3d__measurement-item--disabled",measurementItemTitle:"esri-area-measurement-3d__measurement-item-title",measurementItemValue:"esri-area-measurement-3d__measurement-item-value",settings:"esri-area-measurement-3d__settings",units:"esri-area-measurement-3d__units",unitsLabel:"esri-area-measurement-3d__units-label",unitsSelect:"esri-area-measurement-3d__units-select esri-select",unitsSelectWrapper:"esri-area-measurement-3d__units-select-wrapper",actionSection:"esri-area-measurement-3d__actions",clearButton:"esri-area-measurement-3d__clear-button"};return function(e){function t(t){var s=e.call(this)||this;return s.view=null,s.visible=null,s.viewModel=new l,s.unitOptions=null,s.unit=null,s}return s(t,e),t.prototype.render=function(){var e=this,t=this.viewModel.isSupported,s=this.viewModel.active,a="disabled"===this.viewModel.state,n="ready"===this.viewModel.state,r="measuring"===this.viewModel.state||"measured"===this.viewModel.state,l=this.viewModel.measurement,o=s&&n?u.tsx("section",{key:"esri-area-measurement-3d__hint",class:m.hint},u.tsx("p",{class:m.hintText},i.hint)):null,d=t?null:u.tsx("section",{key:"esri-area-measurement-3d__unsupported",class:m.panelError},u.tsx("p",null,i.unsupported)),c=function(t,s,a){switch(s.state){case"available":return u.tsx("div",{key:a+"-enabled",class:m.measurementItem},u.tsx("span",{class:m.measurementItemTitle},t),u.tsx("span",{class:m.measurementItemValue},s.text));case"unavailable":return u.tsx("div",{key:a+"-disabled",class:e.classes(m.measurementItem,m.measurementItemDisabled)},u.tsx("span",{class:m.measurementItemTitle},t));case"invalid":return u.tsx("div",{key:a+"-enabled",class:m.measurementItem},u.tsx("span",{class:m.measurementItemTitle},t),u.tsx("span",{class:m.measurementItemValue},i.notApplicable))}},p=r?u.tsx("section",{key:"esri-area-measurement-3d__measurement",class:m.measurement},c(i.area,l.area,"area"),c(i.perimeterLength,l.perimeterLength,"perimeter-length")):null,v=this.id+"__units",_=u.tsx("label",{class:m.unitsLabel,for:v},i.unit),b=u.tsx("div",{class:m.unitsSelectWrapper},u.tsx("select",{class:m.unitsSelect,id:v,onchange:this._changeUnit,bind:this},this.viewModel.unitOptions.map(function(t){return t===e.viewModel.unit?u.tsx("option",{key:t,value:t,selected:!0},i.units[t]):u.tsx("option",{key:t,value:t},i.units[t])}))),w=r?u.tsx("section",{key:"esri-area-measurement-3d__units",class:m.units},_,b):null,h=r?u.tsx("div",{key:"settings",class:m.settings},w):null,M=!t||s&&!r?null:u.tsx("div",{class:m.actionSection},u.tsx("button",{disabled:a,class:this.classes(m.button,m.clearButton,a&&m.buttonDisabled),bind:this,onclick:this._newMeasurement},i.newMeasurement)),x=this.visible?u.tsx("div",{class:m.container},d,o,h,p,M):null;return u.tsx("div",{key:"",class:m.base,role:"presentation"},x)},t.prototype._newMeasurement=function(){this.viewModel.newMeasurement()},t.prototype._changeUnit=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.unit=s.value)},a([n.aliasOf("viewModel.view")],t.prototype,"view",void 0),a([n.aliasOf("viewModel.visible"),u.renderable()],t.prototype,"visible",void 0),a([n.aliasOf("viewModel.active"),u.renderable()],t.prototype,"active",void 0),a([n.property({type:l}),u.renderable(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurement"])],t.prototype,"viewModel",void 0),a([n.aliasOf("viewModel.unitOptions")],t.prototype,"unitOptions",void 0),a([n.aliasOf("viewModel.unit")],t.prototype,"unit",void 0),a([u.accessibleHandler()],t.prototype,"_newMeasurement",null),a([u.accessibleHandler()],t.prototype,"_changeUnit",null),t=a([n.subclass("esri.widgets.AreaMeasurement3D")],t)}(n.declared(r))});