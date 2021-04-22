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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/query","dojo/dom-class","dojo/fx/easing","dojo/NodeList","dojo/NodeList-dom","dojo/on","dojox/lang/functional/object","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/DateTextBox","dijit/form/NumberTextBox","dijit/form/TimeTextBox","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./utils","./AnalysisRegistry","./components/AddSummaryFields","dojo/i18n!../../nls/jsapi","dojo/text!./templates/SummarizeWithin.html"],(function(e,t,s,i,a,n,r,h,o,u,l,y,m,c,p,d,_,L,g,S,b,f,v,T,w,W,P,C,j,N,U,A,M,I,x,k,B,F,G,O,z,H,D,q,R,E,J){var K=t([b,f,v,T,w,z,O],{declaredClass:"esri.dijit.analysis.SummarizeWithin",templateString:J,widgetsInTemplate:!0,sumWithinLayer:null,summaryLayers:null,summaryFields:null,outputLayerName:null,summarizeMetric:!0,summaryLayer:null,groupByField:null,minorityMajority:!1,percentPoints:!1,i18n:null,showBinsUIForStandard:!0,toolName:"SummarizeWithin",helpFileName:"SummarizeWithin",resultParameter:"resultLayer",removeJobParamKeys:["summaryExpressionObject"],constructor:function(e){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode),G.isDefined(e.percentShape)&&(this.percentPoints=e.percentShape),e.showGeoAnalyticsParams&&e.rerun&&(e.sumWithinLayer=e.summaryPolygons,e.summaryLayer=e.summarizedLayer),e.standardSummaryFields&&(e.summaryFields=e.standardSummaryFields)},destroy:function(){this.inherited(arguments),i.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),s.mixin(this.i18n,E.summarizeWithinTool)},postCreate:function(){this.inherited(arguments),this.filterObjects=[{layer:"summaryPolygons",layers:this.sumWithinLayers,select:this._analysisSelect,expressionObj:"attributeExprObj"},{layer:"summarizedLayer",layers:this.summaryLayers,select:this._layersSelect,expressionObj:"summaryExpressionObject"}],this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.showGeoAnalyticsParams&&(this._hasPCSWarnShown=!1),this.emit("close",{save:e})},_handleShowCreditsClick:function(e){if(e.preventDefault(),this._form.validate()){var t=this._buildJobParams();t.binType&&this._pauseCreditLinkClick(this._onCreditsClickHandle,!0),this.getCreditsEstimate(this.toolName,t).then(s.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show(),t.binType&&this._pauseCreditLinkClick(this._onCreditsClickHandle,!1)})))}},_buildJobParams:function(){var e,t,s,a={};if(s=!!(e=this.summaryLayers[this._layersSelect.get("value")])&&-1===i.indexOf([q.GeometryTypes.Point,q.GeometryTypes.MultiPoint],e.geometryType),this.showGeoAnalyticsParams?(this.resultParameter="output",a.summarizedLayer=n.toJson(this.constructAnalysisInputLyrObj(e,this.showGeoAnalyticsParams)),"polygon"===this.binType?a.summaryPolygons=n.toJson(this.constructAnalysisInputLyrObj(this.sumWithinLayer),this.showGeoAnalyticsParams):(a.binType=this.binType.toUpperCase(),a.binSize=this._binsInput.get("value"),a.binSizeUnit=this._binUnits.get("value")),a.sumShape=this._sumMetricCheck.get("checked"),a.sumShape&&s&&(a.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(a.groupByField=this._groupBySelect.get("value"),this.resultParameter=["output","groupBySummary"],a.minorityMajority=this.get("minorityMajority"),a.percentShape=this.get("percentPoints")),a.standardSummaryFields=n.toJson(this._summaryWidget.get("summaryFields"))):(a.summaryLayer=n.toJson(this.constructAnalysisInputLyrObj(e,this.showGeoAnalyticsParams)),this.showBinsUIForStandard?"polygon"===this.binType?a.sumWithinLayer=n.toJson(this.constructAnalysisInputLyrObj(this.sumWithinLayer)):(a.binType=this.binType.toUpperCase(),a.binSize=this._binsInput.get("value"),a.binSizeUnit=this._binUnits.get("value")):a.sumWithinLayer=n.toJson(this.constructAnalysisInputLyrObj(this.sumWithinLayer)),a.sumShape=this._sumMetricCheck.get("checked"),s&&(a.shapeUnits=this.get("shapeUnits")),"0"!==this._groupBySelect.get("value")&&(a.groupByField=this._groupBySelect.get("value"),this.resultParameter=["resultLayer","groupBySummary"],a.minorityMajority=this.get("minorityMajority"),a.percentShape=this.get("percentPoints")),a.summaryFields=n.toJson(this._summaryWidget.get("summaryFields"))),this.returnFeatureCollection||(a.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=n.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(t={outSR:this.map.spatialReference},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),a.context=n.toJson(t)),this.showGeoAnalyticsParams&&(t={},this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),a.context=n.toJson(t)),!this.showGeoAnalyticsParams||!a.binType||D.checkPCSforAnalysis({widget:this,jobParams:a,hasPCSWarnShown:this._hasPCSWarnShown})||this._hasPCSWarnShown)return this._updateJobFilterAndSelection(a);this._hasPCSWarnShown=!0},_handleSaveBtnClick:function(){if(this._form.validate())if(this.showGeoAnalyticsParams||this._sumMetricCheck.get("checked")||0!==this._summaryWidget.get("summaryFields").length){this._saveBtn.set("disabled",!0);var e,t={};e=this.summaryLayers[this._layersSelect.get("value")],t.jobParams=this._buildJobParams();var s=this.sumWithinLayer?this.sumWithinLayer.name:"";t.itemParams={description:u.substitute(this.i18n.itemDescription,{sumWithinLayerName:s,summaryLayerName:e.name}),tags:u.substitute(this.i18n.itemTags,{sumWithinLayerName:s,summaryLayerName:e.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(t.isSpatioTemporalDataStore=!0),this.execute(t)}else this._showMessages(this.i18n.statsRequiredMsg)},_initializeShapeUnits:function(e,t){this._prevGeometryType&&this._prevGeometryType===e||(this._shapeUnitsSelect.removeOption(this._shapeUnitsSelect.getOptions()),l.set(this._shapeUnitsSelect.domNode,"display",e===q.GeometryTypes.Point||e===q.GeometryTypes.MultiPoint?"none":""),e===q.GeometryTypes.Polygon?(l.set(this._shapeUnitsSelect.domNode,"width","49%"),this._shapeUnitsSelect.addOption([{value:"SquareMiles",label:this.i18n.sqMiles},{value:"SquareKilometers",label:this.i18n.sqKm},{value:"SquareMeters",label:this.i18n.sqMeters},{value:"Hectares",label:this.i18n.hectares},{value:"Acres",label:this.i18n.acres}]),"Kilometers"===this.get("shapeUnits")&&this.set("shapeUnits","SquareKilometers")):e===q.GeometryTypes.Line&&(l.set(this._shapeUnitsSelect.domNode,"width","39%"),this._shapeUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Feet",label:this.i18n.feet},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters},{value:"Yards",label:this.i18n.yards}]),"SquareKilometers"===this.get("shapeUnits")&&this.set("shapeUnits","Kilometers")),this.shapeUnits&&t?this._shapeUnitsSelect.set("value",this.shapeUnits||this._shapeUnitsSelect.get("value")):this._shapeUnitsSelect.set("value",this.get("shapeUnits")),this._prevGeometryType=e)},_handleShapeUnitsChange:function(e){this.set("shapeUnits",e)},_handleLayerChange:function(e,t,s){var i;this._isAnalysisSelect=!1,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e,disabledSubResources:[this.summaryLayer,this.sumWithinLayer]},{geometryTypes:S.values(q.GeometryTypes)},this._layersSelect):(i=this.summaryLayers[e],this.set("summaryLayer",i),i&&this._curLayerInitIndex!==e&&(this._initializeShapeUnits(i.geometryType,t),this._setSumLyrLabels(i,s),this.set("groupBySelect",this.groupByField),t&&this.summaryFields&&(this._summaryWidget.set("layer",this.summaryLayer),this._summaryWidget.set("summaryFields",this.summaryFields)),(!t||t&&!this.summaryFields)&&this._summaryWidget.set("layer",this.summaryLayer),this._curLayerInitIndex=e,t||!this.showGeoAnalyticsParams&&!this.showBinsUIForStandard||("polygon"===this.binType&&this.sumWithinLayer?(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{summaryLayerName:i?i.name:"",sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)):"square"===this.binType?(this.outputLayerName=u.substitute(this.i18n.outputSquareType,{summaryLayerName:i?i.name:""}),this._outputLayerInput.set("value",this.outputLayerName)):"hexagon"===this.binType&&(this.outputLayerName=u.substitute(this.i18n.outputHexType,{summaryLayerName:i?i.name:""}),this._outputLayerInput.set("value",this.outputLayerName)))))},_handleGroupBySelectChange:function(e){var t="0"===e;p.toggle(this._minmajorityLabel,"esriAnalysisTextDisabled",t),p.toggle(this._percentPointsLabel,"esriAnalysisTextDisabled",t),this._percentPointsCheck.set("disabled",t),this._minmajorityCheck.set("disabled",t)},_handleRefTimeChange:function(e){this._timeRefDay.set("required",e&&!this._timeRefDay.get("value"))},_save:function(){},_setValidators:function(){this._outputLayerInput.set("validator",s.hitch(this,this.validateServiceName)),this.get("showGeoAnalyticsParams")&&(this._binsInput.set("isInRange",s.hitch(this._binsInput,D.isGreaterThanZero)),this._binsInput.set("rangeMessage",this.i18n.greaterThanZeroMsg))},_buildUI:function(){var e=!0;p.add(this._form.domNode,"esriSimpleForm"),this._setValidators(),this._bigdataUX=[this._selectDataStore,this._datastoreLabelRow],this.showBinsUIForStandard||this._bigdataUX.concat([this._sumGeomTypeRow,this._chooseBinSizeLblRow,this._binsTypeRow,this._choosePolyLblRow]),this._standardUX=[],D.updateDisplay(this._standardUX,!this.get("showGeoAnalyticsParams"),"table-row"),D.updateDisplay(this._bigdataUX,this.get("showGeoAnalyticsParams"),"table-row"),D.updateDisplay([this._datastoreLabelRow,this._selectDataStore],!1,"table-row"),D.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&(this.sumWithinLayers&&this.sumWithinLayer&&!D.isLayerInLayers(this.sumWithinLayer,this.sumWithinLayers)&&this.sumWithinLayers.push(this.sumWithinLayer),this.get("sumWithinLayer")||!this.get("sumWithinLayers")||this.rerun||this.set("sumWithinLayer",this.sumWithinLayers[0]),D.populateAnalysisLayers(this,"sumWithinLayer","sumWithinLayers")),this.summaryLayers&&this.summaryLayer&&!D.isLayerInLayers(this.summaryLayer,this.summaryLayers)&&this.summaryLayers.push(this.summaryLayer),(this.showGeoAnalyticsParams||this.showBinsUIForStandard)&&this.distanceDefaultUnits&&this._binUnits.set("value",this.distanceDefaultUnits),this.showGeoAnalyticsParams?(y.set(this._outputLbl,"innerHTML",this.i18n.fiveLabel),y.set(this._addStatsLabel,"innerHTML",this.i18n.addStatsLabel)):(y.set(this._statsLblNo,"innerHTML",this.i18n.threeLabel),y.set(this._groupByLabelNo,"innerHTML",this.i18n.fourLabel),y.set(this._outputLbl,"innerHTML",this.i18n.fiveLabel)),this.sumWithinLayer&&y.set(this._aggregateToolDescription,"innerHTML",u.substitute(this.i18n.summarizeDefine,{sumWithinLayerName:this.sumWithinLayer.name})),D.addReadyToUseLayerOption(this,[this._analysisSelect,this._layersSelect]),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),e=!1),this._sumMetricCheck.set("checked",G.isDefined(this.sumShape)?this.sumShape:this.summarizeMetric),this._sumMetricCheck.set("disabled",G.isDefined(this.sumShape)?this.sumShape:this.summarizeMetric),this.shapeUnits&&this._shapeUnitsSelect.set("value",this.shapeUnits||this._shapeUnitsSelect.get("value")),l.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(s.hitch(this,(function(e){this.folderStore=e,D.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),l.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),this.set("groupBySelect",this.groupByField),this.minorityMajority&&this._minmajorityCheck.set("checked",this.minorityMajority),this.set("percentPoints",this.percentShape),this._percentPointsCheck.set("checked",this.percentPoints),l.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._loadConnections(),(this.showGeoAnalyticsParams||this.showBinsUIForStandard)&&("HEXAGON"===this.binType||"SQUARE"===this.binType?(this.binSize&&this._binsInput.set("value",this.binSize),this.binSizeUnit&&this._binUnits.set("value",this.binSizeUnit),this._handleSumGeomTypeChange(this.binType.toLowerCase(),e)):this._handleSumGeomTypeChange("polygon",e),this.showGeoAnalyticsParams&&(y.set(this._sumLabelHelp,"esriHelpTopic","summaryLayer"),y.set(this._outputHelp,"esriHelpTopic","outputName"),y.set(this._addStatsHelpLink,"esriHelpTopic","summaryFields"))),this._updateAnalysisLayerUI(e,!0),this._createFilterAndSelections()},_setSumLyrLabels:function(e,t){e&&(this.sumWithinLayer&&t&&(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{summaryLayerName:e.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.showGeoAnalyticsParams||y.set(this._addStatsLabel,"innerHTML",u.substitute(this.i18n.addStats,{summaryLayerName:e.name})),this._initializeShapeUnits(e.geometryType),e.geometryType===q.GeometryTypes.Polygon&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoly),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPolygon")),-1!==i.indexOf([q.GeometryTypes.Point,q.GeometryTypes.MultiPoint],e.geometryType)&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricPoint),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsPoint")),e.geometryType===q.GeometryTypes.Line&&(y.set(this._sumMetricLabel,"innerHTML",this.i18n.summarizeMetricLine),y.set(this._addStatsHelpLink,"esriHelpTopic","StatisticsLine")),this.showGeoAnalyticsParams&&y.set(this._addStatsHelpLink,"esriHelpTopic","summaryFields"))},_loadConnections:function(){this.on("start",s.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",s.hitch(this,"_onClose",!1)),(this.showGeoAnalyticsParams||this.showBinsUIForStandard)&&(this._connect(this._polygon,"onclick",s.hitch(this,"_handleSumGeomTypeChange","polygon")),this._connect(this._square,"onclick",s.hitch(this,"_handleSumGeomTypeChange","square")),this._connect(this._hexagon,"onclick",s.hitch(this,"_handleSumGeomTypeChange","hexagon"))),this.own(this._summaryWidget.on("disable-tool-checkbox",s.hitch(this,(function(e){this._sumMetricCheck.set("disabled",e.disable),e.disable&&this._sumMetricCheck.set("checked",!0)}))),this._summaryWidget.on("summary-fields-loaded",s.hitch(this,(function(e){this._sumMetricCheck.set("checked",G.isDefined(this.sumShape)?this.sumShape:this.summarizeMetric)}))))},_handleAnalysisLayerChange:function(e){this._isAnalysisSelect=!0,"browse"===e||"browselayers"===e?this._createBrowseItems({browseValue:e,disabledSubResources:[this.sumWithinLayer]},{tags:["polygon"],geometryTypes:[q.GeometryTypes.Polygon]},this._analysisSelect):(this.sumWithinLayer=this.sumWithinLayers[e],this.sumWithinLayer&&this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(e,t){var s,a,n,r=this.summaryLayers[this._layersSelect.get("value")],h=this._layersSelect.get("value");e&&this.get("sumWithinLayer")&&r&&(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{summaryLayerName:r.name,sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)),this.summaryLayers&&(s=i.some(this._layersSelect.getOptions(),(function(e){return"browse"===e.value}),this),a=i.some(this._layersSelect.getOptions(),(function(e){return"browselayers"===e.value}),this),this._layersSelect.removeOption(this._layersSelect.getOptions()),this.rerun&&!this.summaryLayer&&D.addBlankOption(this._layersSelect),i.forEach(this.summaryLayers,(function(e,s){var i=!0;this.sumWithinLayer?this.sumWithinLayer&&e.url&&this.sumWithinLayer.url&&e.url!==this.sumWithinLayer.url?i=!1:this.sumWithinLayer===e||e.analysisReady&&this.sumWithinLayer.analysisReady||(i=!1):i=!1,i||(this._layersSelect.addOption({value:s,label:e.name}),t&&this.summaryLayer&&(this.summaryLayer.name===e.name||e.url&&this.summaryLayer.url&&e.url===this.summaryLayer.url)&&this._layersSelect.set("value",""+s),h===""+s&&this._layersSelect.set("value",h))}),this),!t&&(this.get("showReadyToUseLayers")||this.get("showBrowseLayers")||s||a)&&this._layersSelect.addOption({type:"separator",value:""}),!t&&D.addBrowseOptionForTool({select:this._layersSelect,disableLAAL:!1},this),this._handleLayerChange(this._layersSelect.get("value"),t,e),(this.showGeoAnalyticsParams||this.showBinsUIForStandard)&&e&&(this.summaryLayers&&this.summaryLayers.length>0&&(n=this.summaryLayers[this._layersSelect.get("value")]),"polygon"===this.binType&&this.sumWithinLayer?(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{summaryLayerName:n?n.name:"",sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)):"square"===this.binType?(this.outputLayerName=u.substitute(this.i18n.outputSquareType,{summaryLayerName:n?n.name:""}),this._outputLayerInput.set("value",this.outputLayerName)):"hexagon"===this.binType&&(this.outputLayerName=u.substitute(this.i18n.outputHexType,{summaryLayerName:n?n.name:""}),this._outputLayerInput.set("value",this.outputLayerName))))},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&D.addAnalysisReadyLayer({item:e.selection,layers:this._isAnalysisSelect?this.sumWithinLayers:this.summaryLayers,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._layersSelect,browseDialog:e.dialog||this._browsedlg,widget:this},t).always(s.hitch(this,(function(){this._isAnalysisSelect&&(this.sumWithinLayer=this.sumWithinLayers[this._analysisSelect.get("value")]),this._updateAnalysisLayerUI(!0)})))},_handleSumGeomTypeChange:function(e,t){var s,a,n,r,h="polygon"===e,o="square"===e?this.i18n.selectSqBinSizeLbl:"hexagon"===e?this.i18n.selectHexBinSizeLbl:"";p.toggle(this._polygon,"selected",h),p.toggle(this._square,"selected","square"===e),p.toggle(this._hexagon,"selected","hexagon"===e),l.set(this._selectAnalysisRow,"display",h?"table-row":"none"),l.set(this._choosePolyLblRow,"display",h?"table-row":"none"),l.set(this._chooseBinSizeLblRow,"display",h?"none":"table-row"),l.set(this._binsTypeRow,"display",h?"none":"table-row"),this._analysisSelect.set("required",h),this._binsInput.set("required",!h),this._binUnits.set("required",!h),this.binType=e,h||y.set(this._binSizeLabel,"innerHTML",o),s=this.summaryLayer||this.summaryLayers[this._layersSelect.get("value")],t&&("polygon"===this.binType&&this.sumWithinLayer?(this.outputLayerName=u.substitute(this.i18n.outputLayerName,{summaryLayerName:s?s.name:"",sumWithinLayerName:this.sumWithinLayer.name}),this._outputLayerInput.set("value",this.outputLayerName)):"square"===this.binType?(this.outputLayerName=u.substitute(this.i18n.outputSquareType,{summaryLayerName:s?s.name:""}),this._outputLayerInput.set("value",this.outputLayerName)):"hexagon"===this.binType&&(this.outputLayerName=u.substitute(this.i18n.outputHexType,{summaryLayerName:s?s.name:""}),this._outputLayerInput.set("value",this.outputLayerName)),this.sumWithinLayer&&(a=this._layersSelect.getOptions(),n=i.map(a,(function(e){return e.name=e.label,e})),r=-1,i.forEach(this.summaryLayers,(function(e,t){(e.name===this.sumWithinLayer.name||e.url&&this.sumWithinLayer.url&&e.url===this.sumWithinLayer.url)&&(r=t)}),this),-1===r&&(r=this.summaryLayers.push(this.sumWithinLayer)-1),"polygon"!==this.binType?D.isLayerInLayers(this.sumWithinLayer,n)||(a.splice(this.summaryLayers.length-1,0,{value:r,label:this.sumWithinLayer.name}),this._layersSelect.removeOption(this._layersSelect.getOptions()),this._layersSelect.addOption(a),this._layersSelect.get("value")||this._layersSelect.set("value",r)):(D.isLayerInLayers(this.sumWithinLayer,n)&&this._layersSelect.removeOption({value:r,label:this.sumWithinLayer.name}),this._layersSelect.getOptions().length>0&&this._layersSelect.set("value",this._layersSelect.getOptions()[0].value)),this._summaryWidget.set("layer",this.summaryLayers[this._layersSelect.get("value")])))},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setSumWithinLayersAttr:function(e){G.isDefined(e)&&(e=i.filter(e,(function(e,t){return e.geometryType===q.GeometryTypes.Polygon})),this.sumWithinLayers=e)},_setSumWithinLayerAttr:function(e){G.isDefined(e)&&(e.geometryType===q.GeometryTypes.Polygon?this.sumWithinLayer=e:this.sumWithinLayer=null)},_setSummaryLayersAttr:function(e){this.summaryLayers=e||[]},_setSummaryLayerAttr:function(e){this.summaryLayer=e},_setGroupBySelectAttr:function(e){var t=this.summaryLayers[this._layersSelect.get("value")],s=G.isDefined(t)?t.fields:[];this._groupBySelect.getOptions().length>0&&this._groupBySelect.removeOption(this._groupBySelect.getOptions()),this._groupBySelect.addOption({value:"0",label:this.i18n.attribute}),i.forEach(s,(function(e,s){-1!==i.indexOf(["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeString","esriFieldTypeDate"],e.type)&&e.name!==t.objectIdField&&this._groupBySelect.addOption({value:e.name,label:G.isDefined(e.alias)&&""!==e.alias?e.alias:e.name})}),this),e&&this._groupBySelect.set("value",e),this._handleGroupBySelectChange(this._groupBySelect.get("value"))},_setMinorityMajorityAttr:function(e){this.minorityMajority=e},_getMinorityMajorityAttr:function(e){return this._minmajorityCheck&&(this.minorityMajority=this._minmajorityCheck.get("checked")),this.minorityMajority},_setPercentPointsAttr:function(e){this.percentPoints=e},_getPercentPointsAttr:function(e){return this._percentPointsCheck&&(this.percentPoints=this._percentPointsCheck.get("checked")),this.percentPoints},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_setShapeUnitsAttr:function(e){this.shapeUnits=e},_getShapeUnitsAttr:function(){return this.shapeUnits},validateServiceName:function(e){return D.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_connect:function(e,t,s){this._pbConnects.push(a.connect(e,t,s))},_showMessages:function(e){y.set(this._bodyNode,"innerHTML",e),r.fadeIn({node:this._errorMessagePane,easing:d.quadIn,onEnd:s.hitch(this,(function(){l.set(this._errorMessagePane,{display:""})}))}).play()},_handleCloseMsg:function(e){e&&e.preventDefault(),r.fadeOut({node:this._errorMessagePane,easing:d.quadOut,onEnd:s.hitch(this,(function(){l.set(this._errorMessagePane,{display:"none"})}))}).play()}});return h("extend-esri")&&s.setObject("dijit.analysis.SummarizeWithin",K,F),K}));