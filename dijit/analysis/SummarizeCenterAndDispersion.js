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

define(["../../kernel","../../lang","./_AnalysisOptions","./AnalysisBase","./AnalysisRegistry","./CreditEstimator","./ItemTypes","./utils","./components/ToggleIconButtons","dijit/Dialog","dijit/_FocusMixin","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dijit/form/Form","dijit/form/CheckBox","dijit/form/ValidationTextBox","dijit/form/FilteringSelect","dijit/form/Button","dijit/form/Select","dijit/layout/ContentPane","dojo/_base/array","dojo/_base/connect","dojo/_base/declare","dojo/_base/fx","dojo/_base/json","dojo/_base/lang","dojo/dom-attr","dojo/dom-class","dojo/dom-style","dojo/fx/easing","dojo/has","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/SummarizeCenterAndDispersion","dojo/string","dojo/text!./templates/SummarizeCenterAndDispersion.html"],(function(e,t,i,s,n,a,o,r,h,l,u,d,c,p,y,m,_,g,f,C,S,L,v,F,b,w,T,j,k,x,I,O,B,z,N,A,D){var P=b([p,c,y,d,u,i,s],{declaredClass:"esri.dijit.analysis.SummarizeCenterAndDispersion",templateString:D,widgetsInTemplate:!0,analysisLayer:void 0,inputLayers:[],summarizeType:"CentralFeature",weightField:"",groupField:"",toolName:"SummarizeCenterAndDispersion",helpFileName:"SummarizeCenterAndDispersion",resultParameter:["centralFeatureResultLayer","meanCenterResultLayer","medianCenterResultLayer","ellipseResultLayer"],constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),v.forEach(this._pbConnects,F.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),j.mixin(this.i18n,N)},postCreate:function(){this.inherited(arguments),x.add(this._form.domNode,"esriSimpleForm"),this._buildUI(),this._outputLayerInput.set("validator",j.hitch(this,this.validateServiceName))},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_buildJobParams:function(){var e={};if(e.analysisLayer=T.toJson(this.constructAnalysisInputLyrObj(this.analysisLayer)),e.summarizeType=this._getSummarizeTypeJobParam(),e.weightField=this._weightBySelect.get("value"),e.groupField=this._groupBySelect.get("value"),e.summarizeType.indexOf("Ellipse")>-1&&(e.ellipseSize=this.ellipseSize),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=T.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection){var t={outSR:this.map.spatialReference};this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),e.context=T.toJson(t)}else e.OutputName=T.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}});return e},_getSummarizeTypeJobParam:function(){var e=[];return this._centralFeatureCheck.get("checked")&&e.push("CentralFeature"),this._meanCenterCheck.get("checked")&&e.push("MeanCenter"),this._medianCenterCheck.get("checked")&&e.push("MedianCenter"),this._ellipseCheck.get("checked")&&e.push("Ellipse"),e},_handleSaveBtnClick:function(e){if(this._form.validate())if(0!==this._getSummarizeTypeJobParam().length){var t={};this._saveBtn.set("disabled",!0),t.jobParams=this._buildJobParams(),t.itemParams={description:A.substitute(this.i18n.itemDescription,{layerName:this.analysisLayer.name}),tags:A.substitute(this.i18n.itemTags,{layerName:this.analysisLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.execute(t)}else this._showMessages(this.i18n.summaryTypes+" "+this.i18n.none)},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(j.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_save:function(){},_buildUI:function(){this.signInPromise.then(j.hitch(this,r.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.analysisLayer=this.setDefaultLayer(this.analysisLayer,this.inputLayers),r.populateAnalysisLayers(this,"analysisLayer","inputLayers")),r.addReadyToUseLayerOption(this,[this._analysisSelect]),I.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),I.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._loadConnections(),this.setOutputName(),this.setColumnSelectOptions(),this.setSummary(),this.setFolder()},setFolder:function(){this.showSelectFolder&&this.getFolderStore().then(j.hitch(this,(function(e){this.folderStore=e,r.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})})))},setDefaultLayer:function(e,t){return e&&t&&!r.isLayerInLayers(e,t)&&t.push(e),e||!t||this.rerun?e:t[0]},_handleInputLayerChange:function(e){""===e||this._checkBrowseLayer(e,!0)||(this.analysisLayer=this.inputLayers[e],t.isDefined(this.analysisLayer)&&(this.set("groupField",""),this.set("weightField",""),this.setColumnSelectOptions(),this.setOutputName()))},_handleElipseCheck:function(){this._ellipseCheck.get("checked")?this._toggleButton.set("selectedButton","1 standard deviation"):(this.ellipseSize="",this._toggleButton.reset())},changeStdDev:function(e){this._ellipseCheck.set("checked",!0),this.ellipseSize=e.value},setColumnSelectOptions:function(){var e=[],i=[];if(this._weightBySelect.removeOption(this._weightBySelect.getOptions()),this._groupBySelect.removeOption(this._groupBySelect.getOptions()),i.push({label:this.i18n.none,value:"",selected:!this.weightField||""===this.weightField}),e.push({label:this.i18n.none,value:"",selected:!this.groupField||""===this.groupField}),t.isDefined(this.analysisLayer)){var s=v.filter(this.analysisLayer.fields,j.hitch(this,(function(e){return e.type!==n.FieldTypes.ObjectId})));v.forEach(s,(function(t){this.isNumberType(t.type)&&i.push(this.getOption(t,this.weightField)),this.isFloatType(t.type)||e.push(this.getOption(t,this.groupField))}),this),this._weightBySelect.addOption(i),this._groupBySelect.addOption(e)}},isFloatType:function(e){return e===n.FieldTypes.Double||e===n.FieldTypes.Float},isNumberType:function(e){return e===n.FieldTypes.Integer||e===n.FieldTypes.Short||this.isFloatType(e)},setSummary:function(){this.summarizeType?(this.summarizeType.indexOf("CentralFeature")>-1&&this._centralFeatureCheck.set("checked",!0),this.summarizeType.indexOf("MeanCenter")>-1&&this._meanCenterCheck.set("checked",!0),this.summarizeType.indexOf("MedianCenter")>-1&&this._medianCenterCheck.set("checked",!0),this.summarizeType.indexOf("Ellipse")>-1&&this._toggleButton.set("selectedButton",this.ellipseSize)):this._centralFeatureCheck.set("checked",!0)},setOutputName:function(){t.isDefined(this.analysisLayer)&&(this.outputLayerName=A.substitute(this.i18n.outputLayerName,{layerName:this.analysisLayer.name}),this._outputLayerInput.set("value",this.outputLayerName))},getOption:function(e,t){return{value:e.name,label:e.alias,selected:t===e.name}},_checkBrowseLayer:function(e){return("browse"===e||"browselayers"===e)&&(this._createBrowseItems({browseValue:e},{tags:["point","polygon","line"],geometryTypes:[n.GeometryTypes.Point,n.GeometryTypes.Line,n.GeometryTypes.Polygon]},this._analysisSelect),!0)},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&r.addAnalysisReadyLayer({item:e.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:e.dialog||this._browsedlg,posIncrement:0,widget:this},t)},_loadConnections:function(){this.on("start",j.hitch(this,"_onClose",!0)),this._toggleButton.on("change",j.hitch(this,this.changeStdDev)),this._connect(this._closeBtn,"onclick",j.hitch(this,"_onClose",!1))},_showMessages:function(e){k.set(this._bodyNode,"innerHTML",e),w.fadeIn({node:this._errorMessagePane,easing:O.quadIn,onEnd:j.hitch(this,(function(){I.set(this._errorMessagePane,{display:""})}))}).play(),window.setTimeout(j.hitch(this,this._handleCloseMsg),3e3)},_handleCloseMsg:function(e){e&&e.preventDefault(),w.fadeOut({node:this._errorMessagePane,easing:O.quadOut,onEnd:j.hitch(this,(function(){I.set(this._errorMessagePane,{display:"none"})}))}).play()},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},validateServiceName:function(e){return r.validateServiceName(e,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_setAnalysisLayerAttr:function(e){this.analysisLayer=e},_setInputLayersAttr:function(e){this.inputLayers=e},_setSummarizeTypeAttr:function(e){this.summarizeType=e},_setWeightFieldAttr:function(e){this.weightField=e},_setGroupFieldAttr:function(e){this.groupField=e},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_connect:function(e,t,i){this._pbConnects.push(F.connect(e,t,i))}});return B("extend-esri")&&j.setObject("dijit.analysis.SummarizeCenterAndDispersion",P,e),P}));