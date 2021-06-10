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

define(["require","dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/json","dojo/_base/fx","dojo/Deferred","dojo/has","dojo/json","dojo/string","dojo/dom-style","dojo/dom-attr","dojo/dom-construct","dojo/Evented","dojo/query","dojo/dom-class","dojo/fx/easing","dojo/NodeList","dojo/NodeList-dom","dojo/on","dojo/topic","dojo/when","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dijit/_OnDijitClickMixin","dijit/_FocusMixin","dijit/registry","dijit/form/Button","dijit/form/CheckBox","dijit/ConfirmDialog","dijit/Dialog","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/form/FilteringSelect","dijit/form/DateTextBox","dijit/form/NumberTextBox","dijit/form/TimeTextBox","dijit/Toolbar","dijit/Tooltip","dgrid1/OnDemandGrid","dgrid1/Editor","dgrid1/Keyboard","dgrid1/Selection","dgrid1/Selector","dgrid1/extensions/ColumnResizer","dgrid1/extensions/DijitRegistry","../../kernel","../../lang","./AnalysisBase","./_AnalysisOptions","./CreditEstimator","./BuildMultiVariablesList","./utils","./storeUtils","dojo/i18n!../../nls/jsapi","dojo/i18n!./nls/BuildMultiVariableGrid","dojo/text!./templates/BuildMultiVariableGrid.html"],(function(i,t,e,s,a,n,r,o,l,h,d,u,c,_,y,p,m,g,b,f,v,L,C,w,S,j,B,I,A,x,G,P,D,T,V,U,N,k,M,E,F,W,z,O,q,H,R,J,K,Q,X,Y,Z,$,ii,ti,ei,si,ai,ni,ri,oi){var li=t([q,R,J,K,H,Q,X]),hi=t([w,S,j,B,I,ii,$],{declaredClass:"esri.dijit.analysis.BuildMultiVariableGrid",templateString:oi,widgetsInTemplate:!0,outputLayerName:null,i18n:null,toolName:"BuildMultiVariableGrid",helpFileName:"BuildMultiVariableGrid",resultParameter:"output",binType:"square",constructor:function(i){this._pbConnects=[],i.containerNode&&(this.container=i.containerNode)},destroy:function(){this.inherited(arguments),s.forEach(this._pbConnects,a.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),e.mixin(this.i18n,ri)},postCreate:function(){this.inherited(arguments),this._buildUI()},startup:function(){},_save:function(){},_onClose:function(i){i&&(this._save(),this.emit("save",{save:!0})),this.showGeoAnalyticsParams&&(this._hasPCSWarnShown=!1),this.variableCalculations=[],this.usedLayers=[],this.inputLayers=[],this._gridEditHandle&&(this._gridEditHandle.remove(),this._gridEditHandle=null),this.emit("close",{save:i})},_handleShowCreditsClick:function(i){i.preventDefault(),this._form.validate()&&(this._layerVarGrid?this._buildJobParams().then(e.hitch(this,(function(i){var t=i&&i.jobParams;this.getCreditsEstimate(this.toolName,t).then(e.hitch(this,(function(i){this._usageForm.set("content",i),this._usageDialog.show()})))}))):m.add(this._layerListWarningIcon,"show"))},_buildJobParams:function(){var i,t,a,r,l,h={},d=new o;return this._layerVarGrid.refresh(),this.set("variableCalculations",[]),this._layerVarGrid.collection.fetch().then(e.hitch(this,(function(e){this.set("variableCalculations",e.slice()),0===this.variableCalculations.length?m.add(this._layerListWarningIcon,"show"):m.remove(this._layerListWarningIcon,"hide"),h.binType=this.binType,h.binSize=this._binsInput.get("value"),h.binSizeUnit=this._binUnits.get("value"),t=s.map(this.variableCalculations,(function(i){return i.layer})),a=s.filter(this.inputLayers,(function(i,e){return-1!==s.indexOf(t,e)})),r=s.map(a,(function(i){return i.name})),h.inputLayers=s.map(a,(function(i){return this.constructAnalysisInputLyrObj(i,this.showGeoAnalyticsParams)}),this),l=s.map(this.variableCalculations,(function(i){var t,e=s.indexOf(r,i.name);return-1!==e&&(t=e),{layer:t,variables:i.variables}})),h.variableCalculations=n.toJson(l),this.returnFeatureCollection||(h.OutputName=n.toJson({serviceProperties:{name:this._outputLayerInput.get("value")}})),i={},(this.showGeoAnalyticsParams||this.returnFeatureCollection)&&(i.outSR=this.map.spatialReference),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(i.extent=this.map.extent._normalize(!0)),h.context=n.toJson(i),!this.showGeoAnalyticsParams||!h.binType||si.checkPCSforAnalysis({widget:this,jobParams:h,hasPCSWarnShown:this._hasPCSWarnShown,inputLayers:a})||this._hasPCSWarnShown?d.resolve({jobParams:h}):this._hasPCSWarnShown=!0}))),d.promise},_handleSaveBtnClick:function(){this._form.validate()&&(this._layerVarGrid?(m.remove(this._layerListWarningIcon,"hide"),this._saveBtn.set("disabled",!0),this._buildJobParams().then(e.hitch(this,(function(i){var t={};t.jobParams=i&&i.jobParams,this._saveBtn.set("disabled",!1),t.itemParams={description:this.i18n.itemDescription,tags:this.i18n.itemTags,snippet:this.i18n.itemSnippet},this.showSelectFolder&&(t.itemParams.folder=this.get("folderId")),this.showGeoAnalyticsParams&&(t.isSpatioTemporalDataStore=!0),this.execute(t)})))):m.add(this._layerListWarningIcon,"show"))},_buildUI:function(){var i=!0;m.add(this._form.domNode,"esriSimpleForm"),this._attrDialog.set("buttonOk",this.i18n.add),p(".dijitDialogPaneActionBar",this._attrDialog.domNode).forEach((function(i,t){m.add(i,"esriFloatTrailing")}),this),p(".dijitButton",this._attrDialog.domNode).forEach((function(i,t){0===t?m.add(i,this.primaryActionButttonClass):m.add(i,"btn calcite")}),this),this.signInPromise.then(e.hitch(this,(function(i){var t,e;if(this.portalUrl?t=this.portalUrl:this.analysisGpServer&&(e=Y.id.findServerInfo(this.analysisGpServer),Z.isDefined(e)&&Z.isDefined(e.owningSystemUrl)&&(t=e.owningSystemUrl)),this.rerun&&this.usedLayers){var a=this.usedLayers.slice();s.forEach(this.inputLayers,(function(i){si.isLayerInLayers(i,a)||a.push(i)}),this),this.inputLayers=a.slice()}this._attrBuilder=new ei({map:this.map,portalUrl:t,showGeoAnalyticsParams:this.showGeoAnalyticsParams,showReadyToUseLayers:this.showReadyToUseLayers,showBrowseLayers:this.showBrowseLayers,inputLayer:this.inputLayer,inputLayers:this.inputLayers,helpFileName:this.helpFileName,isSingleTenant:this.isSingleTenant,portalthis:this.portalthis,useArcGISComponents:!0,isBrowseInDialog:!0},_.create("div",null,this._attrDialogContent)),this.variableCalculations&&this.variableCalculations.length>0&&(s.forEach(this.variableCalculations,(function(i){i.name||(i.name=this.inputLayers[i.layer]&&this.inputLayers[i.layer].name)}),this),this._createLayerGrid())}))),si.initHelpLinks(this.domNode,this.showHelp),this.get("showSelectAnalysisLayer")&&this.inputLayers&&this.inputLayer&&!si.isLayerInLayers(this.inputLayer,this.inputLayers)&&this.inputLayers.push(this.inputLayer),this.showGeoAnalyticsParams&&this.distanceDefaultUnits&&this._binUnits.set("value",this.distanceDefaultUnits),this.outputLayerName&&(this._outputLayerInput.set("value",this.outputLayerName),i=!1),u.set(this._chooseFolderRow,"display",!0===this.showSelectFolder?"block":"none"),this.showSelectFolder&&this.getFolderStore().then(e.hitch(this,(function(i){this.folderStore=i,si.setupFoldersUI({folderStore:this.folderStore,folderId:this.folderId,folderName:this.folderName,folderSelect:this._webMapFolderSelect,username:this.portalUser?this.portalUser.username:""})}))),u.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),u.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._loadConnections(),this.showGeoAnalyticsParams&&("hexagon"!==this.binType&&"square"!==this.binType||(this.binSize&&this._binsInput.set("value",this.binSize),this.binSizeUnit&&this._binUnits.set("value",this.binSizeUnit),this._handleBinTypeChange(this.binType.toLowerCase(),!0)),this.showGeoAnalyticsParams&&c.set(this._outputHelp,"esriHelpTopic","outputName")),this._updateAnalysisLayerUI(i,!0)},_loadConnections:function(){this.on("start",e.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",e.hitch(this,"_onClose",!1)),this._connect(this._square,"onclick",e.hitch(this,"_handleBinTypeChange","square")),this._connect(this._hexagon,"onclick",e.hitch(this,"_handleBinTypeChange","hexagon")),this._connect(this._addProximityAttrBtn,"onclick",e.hitch(this,this._handleAddProximityAttrBtnClick)),this.own(v(this._layerListWarningIcon,"click",e.hitch(this,(function(i){this._displayWarningMessage({display:!0,message:this.i18n.requiredValue,label:this._layerListWarningIcon})}))),v(this._layerListWarningIcon,"blur",e.hitch(this,(function(i){this._displayWarningMessage({display:!1,label:this._layerListWarningIcon})}))))},_createLayerGrid:function(){var i=t([w,y],{value:null,i18n:null,buildRendering:function(){this.inherited(arguments),this._toolbar=new z({class:"esriFloatTrailing"});var i=new x({iconClass:"esriAnalysisDeleteIcon",title:this.i18n.remove}),t=new x({iconClass:"esriAnalysisEditIcon",title:this.i18n.edit});this._toolbar.addChild(t),this._toolbar.addChild(i),t.on("click",e.hitch(this,(function(){this.grid.collection.get(this.value.id).then(e.hitch(this,(function(i){L.publish("multivariablegrid/edit",i)})))}))),i.on("click",e.hitch(this,(function(){this.grid.collection.remove(this.value.id)}))),this.domNode.appendChild(this._toolbar.domNode)},_setValueAttr:function(i){this.value=i},_getValueAttr:function(){return this.value},destroy:function(){this._toolbar.destroy(),this.inherited(arguments)}});this._layerVarGrid=new li({className:"dgrid-autoheight esriListItemGrid",collection:ai.createStore(this.variableCalculations),showHeader:!1,cellNavigation:!1,selectionMode:"single"},this._gridDiv),this._layerVarGrid.startup();var s=[{field:"name",label:"Name",className:"esriGridCellEllipses"},{label:"Operations",sortable:!1,editor:i,editorArgs:{grid:this._layerVarGrid,i18n:this.i18n}}];this._layerVarGrid.set("columns",s),this.own(this._gridEditHandle=L.subscribe("multivariablegrid/edit",e.hitch(this,this._handleEditLayerClick)))},_handleAnalysisLayerChange:function(i){this._isAnalysisSelect=!0,"browse"===i||"browselayers"===i?this._createBrowseItems({browseValue:i,isDialog:!0},{},this._analysisSelect):(this.inputLayer=this.inputLayers[i],this.inputLayer&&this._updateAnalysisLayerUI(!0))},_updateAnalysisLayerUI:function(i,t){},_validateBins:function(){return this._binsInput.validate()&&this._binUnits.validate()},_handleAddProximityAttrBtnClick:function(i){this._validateBins()&&(this._action="add",this._attrBuilder&&(this._attrBuilder.set("binSize",this._binsInput.get("value")),this._attrBuilder.set("binSizeUnit",this._binUnits.get("value")),this._attrBuilder.reset(),this._attrBuilder.set("mode",this._action)),this._attrDialog.set("buttonOk",this.i18n.add),this._attrDialog.show())},_handleEditLayerClick:function(i){this._validateBins()&&(this._action="edit",this._attrBuilder&&(this._attrBuilder.set("binSize",this._binsInput.get("value")),this._attrBuilder.set("binSizeUnit",this._binUnits.get("value")),this._attrBuilder.set("inputLayer",this.inputLayers[i.layer]),this._attrBuilder.set("layerVariables",i),this._attrBuilder.set("mode",this._action)),this._attrDialog.set("buttonOk",this.i18n.save),this._curItem=i,this._attrDialog.show())},_handleBrowseItemsSelect:function(i,t){i&&i.selection&&si.addAnalysisReadyLayer({item:i.selection,layers:this.inputLayers,layersSelect:this._analysisSelect,browseDialog:i.dialog||this._browsedlg,widget:this},t).always(e.hitch(this,(function(){this.inputLayer=this.inputLayers[this._analysisSelect.get("value")],this._updateAnalysisLayerUI(!0)})))},_handleBinTypeChange:function(i,t){var e="square"===i?this.i18n.selectSqBinSizeLbl:"hexagon"===i?this.i18n.selectHexBinSizeLbl:"";m.toggle(this._square,"selected","square"===i),m.toggle(this._hexagon,"selected","hexagon"===i),this.binType=i,c.set(this._binSizeLabel,"innerHTML",e)},_handleAddVarDlg:function(){if(!this._attrBuilder||this._attrBuilder.validate()){var i=this._attrBuilder.get("layerVariables");if(this.variableCalculations||(this.variableCalculations=[]),this.variableCalculations.push(i),this._layerVarGrid){if("add"===this._action)this._layerVarGrid.collection.filter({layer:i.layer}).forEach((function(i){})).then(e.hitch(this,(function(t){var e,s=t.totalLength>0;s&&(e=t[0]),s?(e.variables=e.variables.concat(i.variables),this._layerVarGrid.collection.put(e,{overwrite:!0,id:e.id})):this._layerVarGrid.collection.put(i)})));else this._layerVarGrid.collection.put(i,{overwrite:!0,id:this._curItem.id});this._layerVarGrid.refresh()}else this._createLayerGrid();this._attrDialog.hide()}else this._attrDialog.show()},_handleVarDlgCancel:function(){this._layerVarGrid&&this._layerVarGrid.refresh(),this._attrDialog.hide()},_setAnalysisGpServerAttr:function(i){i&&(this.analysisGpServer=i,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayersAttr:function(i){i&&i.length>0?this.inputLayers=i.slice():this.inputLayers=[]},_setInputLayerAttr:function(i){this.inputLayer=i},_setVariableCalculationsAttr:function(i){i&&i.length>0?this.variableCalculations=i.slice():this.variableCalculations=[]},_getVariableCalculationsAttr:function(i){return this.variableCalculations},_setUsedLayersAttr:function(i){i&&i.length>0?this.usedLayers=i.slice():this.usedLayers=[]},_getUsedLayersAttr:function(i){return this.variableCalculations},_setDisableRunAnalysisAttr:function(i){this._saveBtn.set("disabled",i)},validateServiceName:function(i){return si.validateServiceName(i,{textInput:this._outputLayerInput,isItem:!this.returnFeatureCollection})},_connect:function(i,t,e){this._pbConnects.push(a.connect(i,t,e))},_showMessages:function(i){c.set(this._bodyNode,"innerHTML",i),r.fadeIn({node:this._errorMessagePane,easing:g.quadIn,onEnd:e.hitch(this,(function(){u.set(this._errorMessagePane,{display:""})}))}).play()},_handleCloseMsg:function(i){i&&i.preventDefault(),r.fadeOut({node:this._errorMessagePane,easing:g.quadOut,onEnd:e.hitch(this,(function(){u.set(this._errorMessagePane,{display:"none"})}))}).play()},_displayWarningMessage:function(i){i.display?O.show(i.message,i.label):O.hide(i.label)}});return l("extend-esri")&&e.setObject("dijit.analysis.BuildMultiVariableGrid",hi,Y),hi}));