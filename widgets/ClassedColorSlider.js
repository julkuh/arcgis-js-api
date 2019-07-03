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

define(["./Widgette","./RendererSlider","./RendererSlider/sliderUtils","../core/lang","../renderers/support/numberUtils","../renderers/support/utils","dijit/_TemplatedMixin","dojo/dom-style","dojox/gfx","dojo/text!./ClassedColorSlider/templates/ClassedColorSlider.html"],function(s,t,i,e,a,h,r,o,l,n){return s.createSubclass([r],{_rampNode:null,_sliderHeight:null,_colorRampSurface:null,_histogramSurface:null,_surfaceRect:null,_barsGroup:null,_updateTimer:null,_css:null,declaredClass:"esri.widgets.ClassedColorSlider",templateString:n,properties:{breakInfos:null,histogram:null,handles:[],statistics:null,showHistogram:!0,showStatistics:!0,showLabels:!0,showTicks:!0,showHandles:!0,classificationMethod:null,normalizationType:null,histogramWidth:100,rampWidth:26},constructor:function(s,t){t&&(this.breakInfos=e.clone(s.breakInfos),this.set("values",this._getHandleInfo(this.breakInfos)),this._css={container:"esri-classed-color-slider",rampSurface:"esri-slider-ramp-surface"})},postCreate:function(){this.inherited(arguments),this._setupDataDefaults()},startup:function(){this.inherited(arguments),this._slider=new t({type:"ClassedColorSlider",values:this.values,minimum:this.minValue,maximum:this.maxValue,showLabels:this.showLabels,showTicks:this.showTicks,showHandles:this.showHandles,classificationMethod:this.classificationMethod,normalizationType:this.normalizationType},this._sliderNode),this._slider.startup(),this._rampNode=this._slider._sliderAreaRight,this._sliderHeight=o.get(this._rampNode,"height")||155,this._createSVGSurfaces(),this._slider.on("slide",function(s){this._updateBreakInfos(s.values),this._updateBreakInfoLabels(),this._fillRamp()}.bind(this)),this._slider.on("data-change",function(s){s.values&&(this.set("values",s.values),this._updateBreakInfos(s.values),this._updateBreakInfoLabels()),this._fillRamp(),this.emit("data-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:e.clone(this.breakInfos)})}.bind(this)),this._slider.on("handle-value-change",function(s){this._updateBreakInfos(s.values),this._updateBreakInfoLabels(),this._fillRamp(),this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:e.clone(this.breakInfos)})}.bind(this)),this._slider.on("data-value-change",function(s){this.set("minValue",s.min),this.breakInfos[0].minValue=s.min,this.set("maxValue",s.max),this.breakInfos[this.breakInfos.length-1].maxValue=s.max,this._updateBreakInfoLabels(),this._updateRendererSlider(),this.emit("data-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:e.clone(this.breakInfos)})}.bind(this)),this._slider.on("stop",function(s){this.emit("handle-value-change",{minValue:this.minValue,maxValue:this.maxValue,breakInfos:e.clone(this.breakInfos)})}.bind(this)),this.histogram&&this.showHistogram&&this._generateHistogram(),this.statistics&&this.showStatistics&&this._generateStatistics(),this.watch("breakInfos, handles, statistics, showHandles, showLabels, showTicks",this._updateTimeout),this.watch("histogram",this._showHistogram),this.watch("showHistogram",this._toggleHistogram)},destroy:function(){this.inherited(arguments),this._slider&&this._slider.destroy(),this._avgHandleObjs&&this._avgHandleObjs.avgHandleTooltip&&this._avgHandleObjs.avgHandleTooltip.destroy(),this.countTooltips&&this.countTooltips.forEach(function(s){s.destroy()})},_updateTimeout:function(){this._updateRendererSlider()},_updateRendererSlider:function(){this.set({minValue:this.breakInfos[0].minValue,maxValue:this.breakInfos[this.breakInfos.length-1].maxValue}),this._slider.set({minimum:this.minValue,maximum:this.maxValue,values:this._getHandleInfo(this.breakInfos),handles:this.handles}),this._slider._reset(),this._slider._updateRoundedLabels(),this._slider._generateMoveables(),this._clearRect(),this._createSVGSurfaces(),this.histogram&&this.showHistogram&&this._generateHistogram(),this.statistics&&this.showStatistics&&this._generateStatistics()},_getHandleInfo:function(s){var t=(s||[]).map(function(s,t){return s.maxValue});return t.pop(),t},_updateBreakInfos:function(s){var t=this.breakInfos;h.updateClassBreak({classBreaks:t,normalizationType:this.normalizationType,classificationMethod:this.classificationMethod,change:s}),(s||[]).forEach(function(s,i){t[i].maxValue=s,t[i+1]&&(t[i+1].minValue=s)})},_updateBreakInfoLabels:function(){h.setLabelsForClassBreaks({classBreaks:this.breakInfos,normalizationType:this.normalizationType,classificationMethod:this.classificationMethod,round:!0})},_setupDataDefaults:function(){var s=this.breakInfos;null!==s&&s.length>1?this.set({minValue:this.breakInfos[0].minValue,maxValue:this.breakInfos[this.breakInfos.length-1].maxValue}):null!==s&&1===s.length?this.set({minValue:s[0].minValue,maxValue:s[0].maxValue}):(this.set({minValue:0,maxValue:100,breakInfos:[{minValue:0,maxValue:20},{minValue:20,maxValue:80},{minValue:80,maxValue:100}]}),this.set("values",this._getHandleInfo(s)),this._updateBreakInfoLabels())},_createSVGSurfaces:function(){this._colorRampSurface=l.createSurface(this._rampNode,this.rampWidth,this._sliderHeight),this._colorRampSurface.rawNode.setAttribute("class",this._css.rampSurface),this._surfaceRect=this._colorRampSurface.createRect({width:this.rampWidth+2,height:this._sliderHeight+2}),this._histogramSurface=i.generateHistogramSurface(this._rampNode,this.histogramWidth,this._sliderHeight,this.rampWidth),this._fillRamp()},_clearRect:function(){this._colorRampSurface.destroy(),this._histogramSurface.destroy()},_fillRamp:function(){var s=this.breakInfos,t=this.maxValue,i=this.minValue,e=[];s.forEach(function(s){var a,h;t===i?a=h=0:(a=(t-s.minValue)/(t-i),h=(t-s.maxValue)/(t-i)),e.push({offset:a,color:s.symbol?s.symbol.color:"#5daddd"}),e.push({offset:h,color:s.symbol?s.symbol.color:"#5daddd"})}),e.reverse(),this._surfaceRect.setFill({type:"linear",x1:0,y1:0,x2:0,y2:this._sliderHeight,colors:e})},_showHistogram:function(){this.histogram?this._generateHistogram():this._barsGroup&&(this._barsGroup.destroy(),this._barsGroup=null)},_toggleHistogram:function(){this.showHistogram?(o.set(this._barsGroup.rawNode,"display","inline-block"),this._showHistogram()):o.set(this._barsGroup.rawNode,"display","none")},_generateHistogram:function(){this._barsGroup=i.generateHistogram(this._histogramSurface,this.histogram,this.histogramWidth,this.rampWidth,this.isLeftToRight()),this.countTooltips=i.generateCountTooltips(this.histogram,this._barsGroup)},_generateStatistics:function(){if(!(this.statistics.count<2||isNaN(this.statistics.avg))){var s,t,e,h,r=this.statistics,o=this._slider,l=i.getPrecision(this.maxValue);r.min===r.max&&r.min===r.avg?(t=0,e=2*r.avg):(t=r.min,e=r.max),t===o.minimum&&e===o.maximum||(t=o.minimum,e=o.maximum),h=this._sliderHeight*(e-r.avg)/(e-t),s=a.round([r.avg,e,t])[0],this._avgHandleObjs=i.generateAvgLine(this._histogramSurface,s,h,l,!1,this.isLeftToRight())}}})});