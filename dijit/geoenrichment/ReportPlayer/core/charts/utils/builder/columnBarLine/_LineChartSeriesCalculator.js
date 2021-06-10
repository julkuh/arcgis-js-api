// COPYRIGHT © 2021 Esri
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
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define(["dojo/_base/lang","../../ThemeCalculator","../../ChartTypes","../../ChartLineStyles","../../ChartLineMarkers","../../AxisUtil","../utils/TooltipInfoBuilder","../ChartPlots","esri/dijit/geoenrichment/utils/ColorUtil","./_AxisBuilder","./_PointLabelUtil","./_StatsBuilder"],(function(e,r,i,a,t,n,l,o,s,u,m,p){var c=function(e,n,l,o){var u=o.comparisonInfo,m=o.themeSettings,p=o.visualProperties,c=e.lineThickness||p.lineThickness||1,S=1,h=1,d=1;p.fillLineArea?(S="number"==typeof p.lineOpacity?p.lineOpacity:p.lineAreaOpacity,h=p.lineAreaOpacity):"number"==typeof p.lineOpacity&&(S=p.lineOpacity);var k=r.calcColorForPoint({point:null,seriesItem:e,pointIndex:0,seriesIndex:n,numSeries:l.length,chartType:i.LINE,themeSettings:m,isComparisonSeries:e.isComparisonSeries,comparisonInfo:u,isMultiFeature:o.isMultiFeatureChart});S<1&&k&&((k=s.toColor(k)).a=S);var I,y,C,f,g=e.lineStyle||a.SOLID,M=e.lineMarkerSize,x=s.toColor(e.fillColor||k);return x.a=h,(C=s.toColor(e.lineMarkerColor||k)).a=S,d="number"==typeof p.lineMarkersFillOpacity?p.lineMarkersFillOpacity:h,(f=s.toColor(e.lineMarkerFillColor||x)).a=d,e.isComparisonSeries&&u?(u.lineThickness&&(c=u.lineThickness),u.lineStyle&&(g=u.lineStyle),u.lineMarkerSize&&(M=u.lineMarkerSize),u.lineMarker?(y=t.getMarkerPath(u.lineMarker),I=t.getMarkerPath(u.lineMarker,M)):(y=r.getComparisonSymbol(),I=r.getComparisonSymbol(M)),u.lineMarkerColor&&((C=s.toColor(u.lineMarkerColor)).a=S),u.lineMarkerFillColor&&((f=s.toColor(u.lineMarkerFillColor)).a=h)):o.viewModel.isGraphicStyle&&(y=e.lineMarker&&t.getMarkerPath(e.lineMarker)||t.getMarkerPathAt(n),I=e.lineMarker&&t.getMarkerPath(e.lineMarker,M)||t.getMarkerPathAt(n,M)),{lineColor:k,width:c,style:a.toGFXValue(g),marker:I,unscaledMarker:y,markerColor:C,markerFillColor:f,fillColor:x}};return{calcSeriesLine:function(r){var t=r.chart,s=r.chartType,S=r.visualProperties,h=r.seriesItems,d=1===h.length,k=r.seriesItemsWithComparison||h,I=r.isSecondaryPlot,y=r.reverseXY||s===i.VERTICAL_LINE,C=r.comparisonInfo,f=r.themeSettings,g=r.viewModel,M=[],x=new p({visualProperties:S,seriesItems:k,viewModel:g,currentFeatureIndex:r.currentFeatureIndex,isMultiFeatureChart:r.isMultiFeatureChart,comparisonFeatureAttributes:r.comparisonFeatureAttributes,chartType:s,isSecondaryPlot:I,oppositeDirections:r.oppositeDirections,excludedSeriesHash:r.excludedSeriesHash}),v=r.primaryPlotStat&&r.primaryPlotStat.pointIndexToTooltipsHash||{};var P=x.getTotalStats();if(k.forEach((function(e,i){if(e.points.length){var n=c(e,i,k,r),u={name:e.label,data:[],isComparisonSeries:e.isComparisonSeries,params:{plot:I?o.SECONDARY:void 0,fill:S.fillLineArea?n.fillColor:"transparent",stroke:{color:n.lineColor,width:n.width,style:n.style},marker:n.marker,unscaledMarker:n.unscaledMarker,markerStroke:{color:n.markerColor,width:n.width,style:a.toGFXValue(a.SOLID)},markerFill:S.fillLineMarkers?n.markerFillColor:"transparent",outline:!1}},p=x.getStatisticsForSeriesAt(i);e.points.forEach((function(a,n){if(!a.hidden){var o=p.values[n],c=o.value,h=c||0,M=n+1;I||m.updatePointIndexToLabelMap(t,M,i,a,g);var x=r.isMultiFeatureChart&&P.crossSeriesStats[n],V={originalValue:c,isUnavailableData:isNaN(c),unsortedIndex:n,originalIndex:a.originalIndex||n,name:m.getPointLabel(a,g),valuesSumsInSeries:p.absSumInSeries,seriesItem:e,seriesIndex:i,point:a,isBenchmarked:o.isBenchmarked,unbenchmarkedValue:o.ownValue};y?(V.x=h*T(),V.y=M+w(),V.valueProp="x"):(V.x=M+w(),V.y=h*T(),V.valueProp="y"),S.showValuesAsWeightInStack?V[y?"x":"y"]=p.weightsInStack?100*p.weightsInStack[n]:0:S.yAxis.showValuesAsWeightsInSeries&&(V[y?"x":"y"]/=p.absSumInSeries/100);var b=m.getPointLabel(k[0].points[n]||a,g),A=l.getTooltipInfo({yValue:c,pointLabel:b,seriesLabel:e.label,minInSeriesValue:p.minInSeries,maxInSeriesValue:p.maxInSeries,sumInSeriesValue:p.sumInSeries,absSumInSeriesValue:p.absSumInSeries,avgInSeriesValue:p.avgInSeries,weightInStack:p.weightsInStack&&p.weightsInStack[n],minInAreasValue:x&&x.min,maxInAreasValue:x&&x.max,sumInAreasValue:x&&x.sum,absSumInAreasValue:x&&x.absSum,avgInAreasValue:x&&x.avg,visualProperties:S,chartType:s,isMultiFeature:r.isMultiFeatureChart,conditionalStyling:null,fieldInfo:a.fieldInfo,isThisAreaSpecific:C&&!r.isMultiFeatureChart?!e.isComparisonSeries:void 0,isThisAreaSingleSeries:d,decimals:a.value&&a.value.decimals,fill:u.params.markerFill,stroke:u.params.markerStroke.color,marker:u.params.unscaledMarker||u.params.marker,isBenchmarked:o.isBenchmarked,unbenchmarkedValue:o.ownValue,chartContainer:r.chartContainer,viewModel:g,theme:r.theme,themeSettings:f,dataDrillingPanelInfo:r.dataDrillingPanelInfo,pointName:b,seriesName:a.originalSeriesName||e.label,areaName:a.areaName,featureIndex:o.featureIndex,isComparisonPoint:a.isComparisonPoint,comparisonFeatureAttribute:a.comparisonFeatureAttribute}),F=v[M]=v[M]||[];F.push(A),A.getGroup=function(){return F},V.tooltip=A,u.data.push(V)}function T(){return I&&r.oppositeDirections?1===i?r.reverseOrder?1:-1:r.reverseOrder?-1:1:1}function w(){return I&&!r.oppositeDirections&&2===r.primarySeries.length?0===i?-.15:.15:0}})),M.push(u)}}),this),I){if(r.primaryPlotStat){r.primaryPlotStat.minYValue=Math.min(P.minYValue,r.primaryPlotStat.minYValue),r.primaryPlotStat.maxYValue=Math.max(P.maxYValue,r.primaryPlotStat.maxYValue);var V=n.getPrettifyYAxisParameters(r.primaryPlotStat.minYValue,r.primaryPlotStat.maxYValue,{baseLineValue:S.yAxis.baseLineValue,renderColumnBarsInOppositeDirections:r.oppositeDirections,previewBelowZero:!g.dynamicReportInfo,nonZeroInclusive:S.yAxis.nonZeroInclusive});e.mixin(t.axes.y.opt,{majorTickStep:V.majorTickStep,minorTickStep:V.minorTickStep,min:V.min,max:V.max})}if(1===r.primarySeries.length){var b=y?"y":"x",A=[];r.primarySeries[0].data.forEach((function(e){var r=M[0].data[e.unsortedIndex];r[b]=e.x,A.push(r)})),M[0].data=A}}else u.prettifyYAxis(P.minYValue,P.maxYValue,t,S,s,f,g);return M}}}));