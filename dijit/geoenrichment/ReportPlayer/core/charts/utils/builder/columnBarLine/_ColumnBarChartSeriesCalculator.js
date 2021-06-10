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

define(["dojo/_base/lang","../../ChartTypes","../../ChartSorting","../../ChartLineStyles","../../ThemeCalculator","../../../../supportClasses/conditionalStyling/ConditionalStyleUtil","../utils/TooltipInfoBuilder","./_ComparisonUtil","./_AxisBuilder","./_PointLabelUtil","./_StatsBuilder","esri/dijit/geoenrichment/utils/ColorUtil"],(function(e,i,t,a,n,r,s,o,l,u,c,h){var S=function(e,i){return{color:h.getColorWithAlpha(i.outlineColor||e,i.outlineOpacity),width:i.outlineThickness,style:a.toGFXValue(i.outlineStyle||a.SOLID)}};return{calcSeriesColumnBar:function(a){var d=a.chart,m=a.visualProperties,p=a.seriesItems,I=1===p.length,g=a.seriesItemsWithComparison||p,C=a.chartType,f=a.comparisonInfo,v=a.themeSettings,y=a.viewModel,x=1===g.length&&a.sorting,b=g.length>1&&m.renderColumnBarsInOppositeDirections,V=[],k=new c({visualProperties:m,seriesItems:g,viewModel:y,currentFeatureIndex:a.currentFeatureIndex,isMultiFeatureChart:a.isMultiFeatureChart,excludedSeriesHash:a.excludedSeriesHash,comparisonFeatureAttributes:a.comparisonFeatureAttributes,chartType:C});u.createPointToLabelMap(d);var A={};g.forEach((function(e,l){if(e.points.length){var c={name:e.label,data:[],isComparisonSeries:e.isComparisonSeries,params:{plot:e.isComparisonSeries&&o.getComparisonPlotName(C,f)||void 0}},p=k.getStatisticsForSeriesAt(l);n.provideMissingIconsForPoints(e.points,C);var F=[];e.points.forEach((function(t,o){var d,x=p.values[o],V=x.value,k=V||0;if(m.conditionalStyling){var P=r.getConditionalStyle(x.isBenchmarked?x.ownValue:k,m.conditionalStyling);d=P&&P.backgroundColor}d=d||n.calcColorForPoint({point:t,seriesItem:e,pointIndex:o,seriesIndex:l,numSeries:I?1:g.length,chartType:C,themeSettings:v,isComparisonSeries:e.isComparisonSeries,comparisonInfo:f,isMultiFeature:a.isMultiFeatureChart});var w,M,T=S(d,m),B=d;d=m.columnBarOpacity<1?h.getColorWithAlpha(d,m.columnBarOpacity):d,t.hidden&&(w=d,d=B="transparent"),t.hidden&&(M=T.color,T.color="transparent");var L=o+1,N={x:L,y:k*function(){if(b){var e=!a.isMultiFeatureChart&&i.isBarLike(C);return l>=g.length/2?e?1:-1:e?-1:1}return 1}(),originalValue:V,isUnavailableData:isNaN(V),valueProp:"y",unsortedIndex:o,originalIndex:t.originalIndex||o,seriesIndex:l,name:u.getPointLabel(t,y),valuesSumsInSeries:p.absSumInSeries,point:t,fill:d,icon:n.calcIconForPoint(t,B,C),bgIcon:n.calcBackgroundIconForPoint(t,C,v,m),stroke:{color:T.color,width:T.width,style:T.style},unhiddenFillColor:w,unhiddenLineColor:M,isBenchmarked:x.isBenchmarked,unbenchmarkedValue:x.ownValue};if(m.isStacked){var W=m.showValuesAsWeightInStack?p.stackValuesAsWeighedPercents:p.stackValues;N.stackValues=W&&W[o]}m.showValuesAsWeightInStack?N.y=p.weightsInStack?100*p.weightsInStack[o]:0:m.yAxis.showValuesAsWeightsInSeries&&(N.y/=p.absSumInSeries/100);var Y=u.getPointLabel(g[0].points[o]||t,y),D=s.getTooltipInfo({yValue:V,pointLabel:Y,seriesLabel:e.label,isSinglePointInSeries:1===e.points.length,minInSeriesValue:p.minInSeries,maxInSeriesValue:p.maxInSeries,sumInSeriesValue:p.sumInSeries,absSumInSeriesValue:p.absSumInSeries,avgInSeriesValue:p.avgInSeries,weightInStack:p.weightsInStack&&p.weightsInStack[o],minInAreasValue:p.minInSeries,maxInAreasValue:p.maxInSeries,sumInAreasValue:p.sumInSeries,absSumInAreasValue:p.absSumInSeries,avgInAreasValue:p.avgInSeries,visualProperties:m,chartType:C,isMultiFeature:a.isMultiFeatureChart,conditionalStyling:m.conditionalStyling,fieldInfo:t.fieldInfo,isThisAreaSpecific:f&&!a.isMultiFeatureChart?!e.isComparisonSeries:void 0,isThisAreaSingleSeries:I,decimals:t.value&&t.value.decimals,fill:N.fill,stroke:N.stroke.width>0?N.stroke.color:void 0,isBenchmarked:x.isBenchmarked,unbenchmarkedValue:x.ownValue,chartContainer:a.chartContainer,viewModel:y,theme:a.theme,themeSettings:v,dataDrillingPanelInfo:a.dataDrillingPanelInfo,pointName:a.isMultiFeatureChart?e.label:Y,seriesName:t.originalSeriesName||e.label,areaName:t.areaName,featureIndex:x.featureIndex,isComparisonPoint:t.isComparisonPoint,comparisonFeatureAttribute:t.comparisonFeatureAttribute}),E=A[L]=A[L]||[];a.excludedSeriesHash[e.label]||(E.push(D),F.push(D)),D.getGroup=function(){return a.isMultiFeatureChart?F:E},N.tooltip=D,c.data.push(N)})),x&&x!==t.NONE&&(c.data.sort((function(e,i){return(e.y-i.y)*(x===t.DESC?-1:1)})),c.data.forEach((function(e,i){var t=i+1;e.x=t}))),c.data.forEach((function(e){u.updatePointIndexToLabelMap(d,e.x,l,e.point,y)})),V.push(c)}}),this);var F=k.getTotalStats();return l.prettifyYAxis(F.minYValue,F.maxYValue,d,m,C,v,y,V),a.plotStats&&(e.mixin(a.plotStats,F),a.plotStats.pointIndexToTooltipsHash=A),V},prettifyColumnBarYAxis:function(e){l.prettifyYAxis(e.totalStat.minYValue,e.totalStat.maxYValue,e.chart,e.visualProperties,e.chartType,e.themeSettings,e.viewModel,e.chartSeries,!0,e.chartSize),e.chart.dirty=!0}}}));