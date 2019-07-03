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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/i18n!./ScaleBar/nls/ScaleBar","../core/screenUtils","../core/watchUtils","../core/accessorSupport/decorators","./Widget","./ScaleBar/ScaleBarViewModel","./support/widget"],function(e,r,t,a,i,l,n,s,o,c,d){function u(e){return 2*e}var b={base:"esri-scale-bar esri-widget",labelContainer:"esri-scale-bar__label-container",rulerLabelContainer:"esri-scale-bar__label-container--ruler",lineLabelContainer:"esri-scale-bar__label-container--line",topLabelContainer:"esri-scale-bar__label-container--top",bottomLabelContainer:"esri-scale-bar__label-container--bottom",label:"esri-scale-bar__label",line:"esri-scale-bar__line",topLine:"esri-scale-bar__line--top",bottomLine:"esri-scale-bar__line--bottom",ruler:"esri-scale-bar__ruler",rulerBlock:"esri-scale-bar__ruler-block",barContainer:"esri-scale-bar__bar-container",rulerBarContainer:"esri-scale-bar__bar-container--ruler",lineBarContainer:"esri-scale-bar__bar-container--line",disabled:"esri-disabled"};return function(e){function r(r){var t=e.call(this)||this;return t.unit="non-metric",t.view=null,t.viewModel=new c,t}return t(r,e),r.prototype.postInitialize=function(){var e=this;this.own([n.whenTrue(this,"view.stationary",function(){return e.scheduleRender()})])},Object.defineProperty(r.prototype,"style",{set:function(e){var r="dual"===this.unit?"line":e;this._set("style",r)},enumerable:!0,configurable:!0}),r.prototype.castStyle=function(e){return"line"===e?e:"ruler"},r.prototype.castUnit=function(e){return"metric"===e||"dual"===e?e:"non-metric"},r.prototype.render=function(){var e,r,t,a="disabled"===this.get("viewModel.state"),i=(e={},e[b.disabled]=a,e);if(!a){var l=this,n=l.unit,s=l.style,o="non-metric"===n||"dual"===n,c="metric"===n||"dual"===n;if(o){var u=this.viewModel.getScaleBarProperties(50,"non-metric");u&&(t="ruler"===s?this._renderRuler(u):this._renderLine(u,"bottom"))}if(c){var p=this.viewModel.getScaleBarProperties(50,"metric");p&&(r="ruler"===s?this._renderRuler(p):this._renderLine(p,"top"))}}return d.tsx("div",{afterCreate:this._handleRootCreateOrUpdate,afterUpdate:this._handleRootCreateOrUpdate,bind:this,class:this.classes(b.base,i)},r,t)},r.prototype._renderRuler=function(e){var r=u(Math.round(e.length)),t=i[e.unit]||i.unknownUnit,a=u(e.value)+" "+t;return d.tsx("div",{class:this.classes(b.barContainer,b.rulerBarContainer),key:"esri-scale-bar__ruler"},d.tsx("div",{class:b.ruler,styles:{width:r+"px"}},d.tsx("div",{class:b.rulerBlock}),d.tsx("div",{class:b.rulerBlock}),d.tsx("div",{class:b.rulerBlock}),d.tsx("div",{class:b.rulerBlock})),d.tsx("div",{class:this.classes(b.labelContainer,b.rulerLabelContainer)},d.tsx("div",{class:b.label},"0"),d.tsx("div",{class:b.label},a)))},r.prototype._renderLine=function(e,r){var t,a,l=i[e.unit]||i.unknownUnit,n=u(e.value)+" "+l,s=(t={},t[b.topLabelContainer]="top"===r,t[b.bottomLabelContainer]="bottom"===r,t),o=d.tsx("div",{class:this.classes(b.labelContainer,b.lineLabelContainer,s),key:"esri-scale-bar__label"},d.tsx("div",{class:b.label},n)),c=(a={},a[b.topLine]="top"===r,a[b.bottomLine]="bottom"===r,a),p=u(Math.round(e.length)),_=d.tsx("div",{class:this.classes(b.line,c),key:"esri-scale-bar__line",styles:{width:p+"px"}});return d.tsx("div",{class:this.classes(b.barContainer,b.lineBarContainer),key:"esri-scale-bar__line-container"},[_,o])},r.prototype._handleRootCreateOrUpdate=function(e){var r=this.viewModel;if(r){var t=e.getBoundingClientRect(),a=t.left+window.pageXOffset,i=t.top+window.pageYOffset;r.scaleComputedFrom=l.createScreenPoint(a,i)}},a([s.property({dependsOn:["unit"]}),d.renderable()],r.prototype,"style",null),a([s.cast("style")],r.prototype,"castStyle",null),a([s.property(),d.renderable()],r.prototype,"unit",void 0),a([s.cast("unit")],r.prototype,"castUnit",null),a([s.aliasOf("viewModel.view"),d.renderable()],r.prototype,"view",void 0),a([s.property(),d.renderable(["viewModel.state"])],r.prototype,"viewModel",void 0),r=a([s.subclass("esri.widgets.ScaleBar")],r)}(s.declared(o))});