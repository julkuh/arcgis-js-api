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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./AreaMeasurement2D/nls/AreaMeasurement2D","../core/accessorSupport/decorators","./Widget","./AreaMeasurement2D/AreaMeasurement2DViewModel","./support/widget"],function(e,t,s,i,a,n,r,l,o){var u={button:"esri-button esri-button--secondary",buttonDisabled:"esri-button--disabled",widgetIcon:"esri-icon-description",base:"esri-area-measurement-3d esri-widget esri-widget--panel",container:"esri-area-measurement-3d__container",hint:"esri-area-measurement-3d__hint",hintText:"esri-area-measurement-3d__hint-text",panelError:"esri-area-measurement-3d__panel--error",measurement:"esri-area-measurement-3d__measurement",measurementItem:"esri-area-measurement-3d__measurement-item",measurementItemDisabled:"esri-area-measurement-3d__measurement-item--disabled",measurementItemTitle:"esri-area-measurement-3d__measurement-item-title",measurementItemValue:"esri-area-measurement-3d__measurement-item-value",settings:"esri-area-measurement-3d__settings",units:"esri-area-measurement-3d__units",unitsLabel:"esri-area-measurement-3d__units-label",unitsSelect:"esri-area-measurement-3d__units-select esri-select",unitsSelectWrapper:"esri-area-measurement-3d__units-select-wrapper",actionSection:"esri-area-measurement-3d__actions",clearButton:"esri-area-measurement-3d__clear-button"};return function(e){function t(t){var s=e.call(this)||this;return s.active=null,s.iconClass=u.widgetIcon,s.label=a.title,s.unit=null,s.unitOptions=null,s.view=null,s.viewModel=new l,s}return s(t,e),t.prototype.render=function(){var e=this,t=this.viewModel.isSupported,s=this.viewModel.active,i="disabled"===this.viewModel.state,n="ready"===this.viewModel.state,r="measuring"===this.viewModel.state||"measured"===this.viewModel.state,l=this.viewModel.measurementLabel,d=s&&n?o.tsx("section",{key:"hint",class:u.hint},o.tsx("p",{class:u.hintText},a.hint)):null,m=t?null:o.tsx("section",{key:"unsupported",class:u.panelError},o.tsx("p",null,a.unsupported)),c=function(t,s,i){return s?o.tsx("div",{key:i+"-enabled",class:u.measurementItem},o.tsx("span",{class:u.measurementItemTitle},t),o.tsx("span",{class:u.measurementItemValue},s)):o.tsx("div",{key:i+"-disabled",class:e.classes(u.measurementItem,u.measurementItemDisabled),"aria-disabled":"true"},o.tsx("span",{class:u.measurementItemTitle},t))},p=r?o.tsx("section",{key:"measurement",class:u.measurement},c(a.area,l.area,"area"),c(a.perimeter,l.perimeter,"perimeter")):null,v=this.id+"__units",b=o.tsx("section",{key:"units",class:u.units},o.tsx("label",{class:u.unitsLabel,for:v},a.unit),o.tsx("div",{class:u.unitsSelectWrapper},o.tsx("select",{class:u.unitsSelect,id:v,onchange:this._changeUnit,bind:this,value:this.viewModel.unit},this.viewModel.unitOptions.map(function(e){return o.tsx("option",{key:e,value:e},a.units[e])})))),_=this.id+"__modes",w=o.tsx("section",{key:"modes",class:u.units},o.tsx("label",{class:u.unitsLabel,for:_},a.mode),o.tsx("div",{class:u.unitsSelectWrapper},o.tsx("select",{class:u.unitsSelect,id:_,onchange:this._changeMode,bind:this,value:this.viewModel.mode},this.viewModel.modes.map(function(e){return o.tsx("option",{key:e,value:e},a.modes[e])})))),h=r?o.tsx("div",{key:"settings",class:u.settings},b,w):null,M=!t||s&&!r?null:o.tsx("div",{class:u.actionSection},o.tsx("button",{disabled:i,class:this.classes(u.button,u.clearButton,i&&u.buttonDisabled),bind:this,onclick:this._newMeasurement,title:a.newMeasurement,"aria-label":a.newMeasurement},a.newMeasurement)),x=this.visible?o.tsx("div",{class:u.container},m,d,h,p,M):null;return o.tsx("div",{class:u.base},x)},t.prototype._newMeasurement=function(){this.viewModel.newMeasurement()},t.prototype._changeUnit=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.viewModel.unit=s.value)},t.prototype._changeMode=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.viewModel.mode=s.value)},i([n.aliasOf("viewModel.active"),o.renderable()],t.prototype,"active",void 0),i([n.property()],t.prototype,"iconClass",void 0),i([n.property()],t.prototype,"label",void 0),i([n.aliasOf("viewModel.unit")],t.prototype,"unit",void 0),i([n.aliasOf("viewModel.unitOptions")],t.prototype,"unitOptions",void 0),i([n.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([n.property({type:l}),o.renderable(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurementLabel"])],t.prototype,"viewModel",void 0),i([n.aliasOf("viewModel.visible"),o.renderable()],t.prototype,"visible",void 0),i([o.accessibleHandler()],t.prototype,"_newMeasurement",null),i([o.accessibleHandler()],t.prototype,"_changeUnit",null),i([o.accessibleHandler()],t.prototype,"_changeMode",null),t=i([n.subclass("esri.widgets.AreaMeasurement2D")],t)}(n.declared(r))});