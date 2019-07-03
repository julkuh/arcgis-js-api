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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./DistanceMeasurement2D/nls/DistanceMeasurement2D","../core/accessorSupport/decorators","./Widget","./DistanceMeasurement2D/DistanceMeasurement2DViewModel","./support/widget"],function(e,t,s,i,n,r,a,l,o){var u={button:"esri-button esri-button--secondary",buttonDisabled:"esri-button--disabled",widgetIcon:"esri-icon-description",base:"esri-direct-line-measurement-3d esri-widget esri-widget--panel",container:"esri-direct-line-measurement-3d__container",hint:"esri-direct-line-measurement-3d__hint",hintText:"esri-direct-line-measurement-3d__hint-text",panelError:"esri-direct-line-measurement-3d__panel--error",measurement:"esri-direct-line-measurement-3d__measurement",measurementItem:"esri-direct-line-measurement-3d__measurement-item",measurementItemDisabled:"esri-direct-line-measurement-3d__measurement-item--disabled",measurementItemTitle:"esri-direct-line-measurement-3d__measurement-item-title",measurementItemValue:"esri-direct-line-measurement-3d__measurement-item-value",settings:"esri-direct-line-measurement-3d__settings",units:"esri-direct-line-measurement-3d__units",unitsLabel:"esri-direct-line-measurement-3d__units-label",unitsSelect:"esri-direct-line-measurement-3d__units-select esri-select",unitsSelectWrapper:"esri-direct-line-measurement-3d__units-select-wrapper",actionSection:"esri-direct-line-measurement-3d__actions",clearButton:"esri-direct-line-measurement-3d__clear-button"};return function(e){function t(t){var s=e.call(this)||this;return s.iconClass=u.widgetIcon,s.label=n.title,s.unit=null,s.unitOptions=null,s.view=null,s.viewModel=new l,s}return s(t,e),t.prototype.render=function(){var e=this,t=this.viewModel.isSupported,s=this.viewModel.active,i="disabled"===this.viewModel.state,r="ready"===this.viewModel.state,a="measuring"===this.viewModel.state||"measured"===this.viewModel.state,l=this.viewModel.measurementLabel,d=s&&r?o.tsx("section",{key:"hint",class:u.hint},o.tsx("p",{class:u.hintText},n.hint)):null,c=t?null:o.tsx("section",{key:"unsupported",class:u.panelError},o.tsx("p",null,n.unsupported)),m=a?o.tsx("section",{key:"measurement",class:u.measurement},function(t,s,i){return s?o.tsx("div",{key:i+"-enabled",class:u.measurementItem},o.tsx("span",{class:u.measurementItemTitle},t),o.tsx("span",{class:u.measurementItemValue},s)):o.tsx("div",{key:i+"-disabled",class:e.classes(u.measurementItem,u.measurementItemDisabled),"aria-disabled":"true"},o.tsx("span",{class:u.measurementItemTitle},t))}(n.distance,l,"distance")):null,p=this.id+"-units",v=a?o.tsx("section",{key:"units",class:u.units},o.tsx("label",{class:u.unitsLabel,for:p},n.unit),o.tsx("div",{class:u.unitsSelectWrapper},o.tsx("select",{class:u.unitsSelect,id:p,onchange:this._changeUnit,bind:this,value:this.viewModel.unit},this.viewModel.unitOptions.map(function(e){return o.tsx("option",{key:e,value:e},n.units[e])})))):null,b=this.id+"-modes",w=a?o.tsx("section",{key:"modes",class:u.units},o.tsx("label",{class:u.unitsLabel,for:b},n.mode),o.tsx("div",{class:u.unitsSelectWrapper},o.tsx("select",{class:u.unitsSelect,id:b,onchange:this._changeMode,bind:this,value:this.viewModel.mode},this.viewModel.modes.map(function(e){return o.tsx("option",{key:e,value:e},n.modes[e])})))):null,h=a?o.tsx("div",{key:"settings",class:u.settings},v,w):null,M=!t||s&&!a?null:o.tsx("div",{class:u.actionSection},o.tsx("button",{disabled:i,class:this.classes(u.button,u.clearButton,i&&u.buttonDisabled),bind:this,onclick:this._newMeasurement,title:n.newMeasurement,"aria-label":n.newMeasurement},n.newMeasurement)),_=this.visible?o.tsx("div",{class:u.container},c,d,h,m,M):null;return o.tsx("div",{class:u.base},_)},t.prototype._newMeasurement=function(){this.viewModel.newMeasurement()},t.prototype._changeUnit=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.viewModel.unit=s.value)},t.prototype._changeMode=function(e){var t=e.target,s=t.options[t.selectedIndex];s&&(this.viewModel.mode=s.value)},i([r.aliasOf("viewModel.active"),o.renderable()],t.prototype,"active",void 0),i([r.property()],t.prototype,"iconClass",void 0),i([r.property()],t.prototype,"label",void 0),i([r.aliasOf("viewModel.unit")],t.prototype,"unit",void 0),i([r.aliasOf("viewModel.unitOptions")],t.prototype,"unitOptions",void 0),i([r.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([r.property({type:l}),o.renderable(["viewModel.state","viewModel.unitOptions","viewModel.unit","viewModel.measurementLabel"])],t.prototype,"viewModel",void 0),i([r.aliasOf("viewModel.visible"),o.renderable()],t.prototype,"visible",void 0),i([o.accessibleHandler()],t.prototype,"_newMeasurement",null),i([o.accessibleHandler()],t.prototype,"_changeUnit",null),i([o.accessibleHandler()],t.prototype,"_changeMode",null),t=i([r.subclass("esri.widgets.DistanceMeasurement2D")],t)}(r.declared(a))});