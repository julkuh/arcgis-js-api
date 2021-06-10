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

define(["../../kernel","../../lang","../../layers/FeatureLayer","../../symbols/CartographicLineSymbol","../../symbols/SimpleFillSymbol","../../symbols/SimpleLineSymbol","../../symbols/SimpleMarkerSymbol","../../tasks/query","../CalculateField","./_AnalysisOptions","./AnalysisBase","./AnalysisRegistry","./CreditEstimator","./ItemTypes","./storeUtils","./utils","dgrid1/Editor","dgrid1/extensions/ColumnResizer","dgrid1/extensions/DijitRegistry","dgrid1/Keyboard","dgrid1/OnDemandGrid","dgrid1/Selection","dgrid1/Selector","dijit/_FocusMixin","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dijit/form/Button","dijit/form/CheckBox","dijit/form/Form","dijit/form/Select","dijit/form/TextBox","dijit/form/ValidationTextBox","dijit/layout/ContentPane","dijit/registry","dojo/_base/array","dojo/_base/Color","dojo/_base/connect","dojo/_base/declare","dojo/_base/fx","dojo/_base/json","dojo/_base/lang","dojo/aspect","dojo/data/ObjectStore","dojo/dom-attr","dojo/dom-class","dojo/dom-construct","dojo/dom-prop","dojo/dom-style","dojo/fx/easing","dojo/has","dojo/i18n!../../nls/jsapi","dojo/json","dojo/query","dojo/store/Memory","dojo/store/Observable","dojo/string","dojo/i18n!./nls/AppendData","dojo/text!./templates/AppendData.html","require"],(function(e,t,i,s,a,n,r,p,o,d,l,h,c,u,y,L,f,m,_,g,F,A,S,v,b,x,T,E,j,C,M,w,O,D,B,G,I,P,R,N,k,H,U,J,V,q,z,W,K,Q,Y,X,Z,$,ee,te,ie,se,ae,ne,re){var pe=N([F,f,g,A,S,m,_]),oe=N([T,x,E,b,v,d,l],{declaredClass:"esri.dijit.analysis.AppendData",templateString:ne,widgetsInTemplate:!0,inputLayer:void 0,appendLayer:void 0,appendLayers:[],fieldMapping:[],filter:{},inputLayers:[],isAppendToLayerSelected:!0,primaryActionButttonClass:"btn calcite primary",toolName:"AppendData",helpFileName:"AppendData",resultName:"",constructor:function(e,t){this._pbConnects=[],e.containerNode&&(this.container=e.containerNode)},destroy:function(){this.inherited(arguments),I.forEach(this._pbConnects,R.disconnect),delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments),U.mixin(this.i18n,ae),U.mixin(this.i18n,Z.expressionGrid)},postCreate:function(){this.inherited(arguments),z.add(this._form.domNode,"esriSimpleForm"),this.filterObjects=[{layer:"appendLayer",select:this._appendLayerSelect,expressionObj:"attributeExprObj"}],this._buildUI()},startup:function(){},_onClose:function(e){e&&(this._save(),this.emit("save",{save:!0})),this.emit("close",{save:e})},_buildJobParams:function(){var e={};if(e.inputLayer=H.toJson(this.constructAnalysisInputLyrObj(this.inputLayer,this.showGeoAnalyticsParams)),e.appendLayer=this.constructAnalysisInputLyrObj(this.appendLayer,this.showGeoAnalyticsParams),e.fieldMapping=H.toJson(this.getFieldMappingForRest()),e.appendLayer=H.toJson(e.appendLayer),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(e.context=H.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection){var t={outSR:this.map.spatialReference};this.showChooseExtent&&this._useExtentCheck.get("checked")&&(t.extent=this.map.extent._normalize(!0)),e.context=H.toJson(t)}return this._updateJobFilterAndSelection(e)},getFieldMappingForRest:function(){return I.map(this.inputLayer.fields,(function(e,t){var i=this.mappedFields[t];return{inputLayerField:e.name,mappingType:"Expression"===i.alias?"Expression":"AppendField",mappingValue:i.name}}),this)},_handleSaveBtnClick:function(e){if(this._form.validate()){var t={};this._saveBtn.set("disabled",!0),t.jobParams=this._buildJobParams(),this.showGeoAnalyticsParams&&(t.isSpatioTemporalDataStore=!0),this.execute(t)}},_handleShowCreditsClick:function(e){e.preventDefault(),this._form.validate()&&this.getCreditsEstimate(this.toolName,this._buildJobParams()).then(U.hitch(this,(function(e){this._usageForm.set("content",e),this._usageDialog.show()})))},_save:function(){},_buildUI:function(){this.set("showReadyToUseLayers",!1),this.signInPromise.then(U.hitch(this,L.initHelpLinks,this.domNode,this.showHelp,{analysisGpServer:this.analysisGpServer})),this.get("showSelectAnalysisLayer")&&(this.inputLayer=this.setDefaultLayer(this.inputLayer,this.inputLayers),L.populateAnalysisLayers(this,"inputLayer","inputLayers",{layerSelect:this._inputLayerSelect})),this.setAlert(),this.filterAppendLayers(this.inputLayer),this.appendLayer=this.setDefaultLayer(this.appendLayer,this.appendLayers),L.populateAnalysisLayers(this,"appendLayer","appendLayers",{layerSelect:this._appendLayerSelect,postIncrement:1}),this.appendLayer&&this.setSelectionLayer(),L.addReadyToUseLayerOption(this,[this._inputLayerSelect,this._appendLayerSelect]),Q.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"inline-block":"none"),Q.set(this._showCreditsLink,"display",!0===this.showCredits?"block":"none"),this._createFilterAndSelections(),this.setFieldMapping(),this._loadConnections()},setDefaultLayer:function(e,t){return e&&t&&!L.isLayerInLayers(e,t)&&t.push(e),e||!t||this.rerun?e:t[0]},setFieldMapping:function(e){e?this.updateMappedFieldsForRerun(e):this.getInputAndAppendFieldMatch(),this.mappedFields.length>0&&this.setDataGrid()},updateMappedFieldsForRerun:function(e){this.mappedFields=I.map(e,(function(e,t){return"AppendField"===e.appendType?I.filter(this.appendLayer.fields,(function(t){return t.name===e.appendTypeValue}),this)[0]:"Expression"===e.appendType?{name:e.appendTypeValue,alias:e.appendTypeValue}:void 0}),this)},getInputAndAppendFieldMatch:function(){if(this.mappedFields=[],t.isDefined(this.inputLayer)&&t.isDefined(this.appendLayer)){this.inputFields=this.inputLayer.fields;var e=this.appendLayer.fields;I.forEach(this.inputFields,(function(t){this.mappedFields.push(this.getMappingFieldAndTypes(t,e))}),this)}},getMappingFieldAndTypes:function(e,t){var i=I.filter(t,(function(t){return t.name.toLowerCase()===e.name.toLowerCase()&&t.type===e.type}));return i.length>0?i[0]:{name:"null",alias:"Expression"}},setAlert:function(){t.isDefined(this.inputLayer)?(z.add(this._alert,"is-active"),this.setAlertHostedLayer(!1)):z.remove(this._alert,"is-active")},setAlertHostedLayer:function(e){e?z.add(this._alertHosted,"is-active"):z.remove(this._alertHosted,"is-active")},_handleInputLayerChange:function(e){this.isAppendToLayerSelected=!0,this._checkBrowseLayer(e,!0)||(this.inputLayer=this.inputLayers[e],this.getUserProfile().then(U.hitch(this,(function(e){this.inputLayer&&this.verifyInputLayer(e),this.setAlert(),t.isDefined(this.inputLayer)&&(this.filterAppendLayers(this.inputLayer),this.updateSelectLayerOptions(this.appendLayer,this.appendFilteredLayers,this._appendLayerSelect),this.setFieldMapping())}))))},_handleAppendLayerChange:function(e){this.isAppendToLayerSelected=!1,this._checkBrowseLayer(e,!1)||(this.appendLayer=this.appendFilteredLayers[e-1],t.isDefined(this.appendLayer)&&(this.isSameLayer(this.inputLayer,this.appendLayer)&&(this.appendLayer=void 0),this.updateSelectLayerOptions(this.appendLayer,this.appendFilteredLayers,this._appendLayerSelect))),this.setFieldMapping()},verifyInputLayer:function(e){var t=this.inputLayer&&this.inputLayer.url;L.isPortalHostedService(t)&&this.isLayerEditable(this.inputLayer,e)||(this.setAlertHostedLayer(!0),this.inputLayers=I.filter(this.inputLayers,(function(e){return!this.isSameLayer(this.inputLayer,e)&&L.isPortalHostedService(e&&e.url)}),this),this.inputLayer=void 0),this.updateSelectLayerOptions(this.inputLayer,this.inputLayers,this._inputLayerSelect)},isLayerEditable:function(e,t){return!!(e&&e.capabilities.indexOf("Create")>=0||this.isAdmin(t)||this.isOwner(e,t))},updateSelectLayerOptions:function(e,t,i){var s=e&&[]||[{label:" ",value:""}];I.forEach(t,(function(t,a){var n={value:"_inputLayerSelect"===i.dojoAttachPoint?a:a+1,label:t.name};e&&(t.name===e.name||t.url&&e.url&&t.url===e.url)&&(n.selected=!0),s.push(n)})),(this.get("showReadyToUseLayers")||this.get("showBrowseLayers"))&&s.push({type:"separator",value:""}),i.removeOption(i.getOptions()),i.addOption(s),L.addBrowseOptionForTool({select:i,disableLAAL:!0},this)},isSameLayer:function(e,t){return e&&t&&e.url&&t.url&&e.url===t.url},filterAppendLayers:function(e){this.appendFilteredLayers=I.filter(this.appendLayers,U.hitch(this,(function(t){return!this.isSameLayer(e,t)&&this.isSimilarTypeAsInput(t)}))),!this.isSameLayer(e,this.appendLayer)&&this.isSimilarTypeAsInput(this.appendLayer)||(this.appendLayer=void 0)},_checkBrowseLayer:function(e,t){return"browselayers"===e&&(this._createBrowseItems({browseValue:e,disableLAAL:!0,disabledSubResources:[this.inputLayer,this.appendLayer]},this._filterLayersForGeometryType(t),t?this._inputLayerSelect:this._appendLayerSelect),!0)},_filterLayersForGeometryType:function(e){if(this.showGeoAnalyticsParams){if(this.inputLayer&&!e){var t=this.inputLayer.geometryType;return t?{geometryTypes:[t]}:{layerTypes:[u.BTABLE,u.TABLE]}}return{layerTypes:[u.TABLE,u.BTABLE,u.FLAYER,u.BDATAFEATURE],geometryTypes:[h.GeometryTypes.Polygon,h.GeometryTypes.Point,h.GeometryTypes.Line]}}},isBigDataorTable:function(){return this.appendLayer&&(this.appendLayer.type===u.BDATAFEATURE||this.appendLayer.type===u.BTABLE)},_handleBrowseItemsSelect:function(e,t){e&&e.selection&&L.addAnalysisReadyLayer({item:e.selection,layers:this.isAppendToLayerSelected?this.inputLayers:this.appendFilteredLayers,layersSelect:this.isAppendToLayerSelected?this._inputLayerSelect:this._appendLayerSelect,browseDialog:e.dialog||this._browsedlg,posIncrement:this.isAppendToLayerSelected?0:1,widget:this},t).then(U.hitch(this,(function(e){this.appendLayers.push(e)})))},setDataGrid:function(){this.dataFieldGrid?(this.dataFieldGrid.set("columns",this.getColumns()),this.dataFieldGrid.set("collection",y.createStore(this.prepareData()))):(this.dataFieldGrid=new pe({collection:y.createStore(this.prepareData()),cellNavigation:!1,columns:this.getColumns(),renderRow:this.updateGridRow,selectionMode:"single"},this._dataGridDiv),this.dataFieldGrid.startup(),this.updateSelectOptions(),this.updateMappedOnChange())},getOptionStore:function(e){var t=this.getMappedFields(),i=this.getUnmappedFields(),s={type:"separator",value:""},a=[{value:"Expression",label:this.i18n.expression},{value:"null",label:"null"}];i.length>0&&(a=a.concat(s).concat(i)),t.length>0&&(a=a.concat(s).concat(t));var n=!1;return I.forEach(a,(function(t){t.value!==e||n||"Expression"===e||(t.selected=!0,n=!0)})),a=[{label:"",value:"",selected:!n}].concat(a)},prepareData:function(){var e=this.inputLayer.fields,t=this.mappedFields,i=[];return I.forEach(e,(function(e,s){i.push({inputField:e,mappedField:t[s],inputFieldName:e.name,mappedFieldName:t[s].name})})),i},getMappedFields:function(){var e=[];this.mappedFields.forEach((function(t,i){-1===e.indexOf(t)&&e.push(t)}));var t=I.filter(e,(function(e){return e&&"null"!==e.name&&(!this.selectedField||!e.type||this.selectedField.type===e.type)}),this);return this.getOptionObject(t)},getUnmappedFields:function(){var e=I.filter(this.appendLayer.fields,(function(e){return this.mappedFields.indexOf(e)<0&&(!this.selectedField||this.selectedField.type===e.type)}),this);return this.getOptionObject(e)},getOptionObject:function(e){return I.map(e,(function(e){return{value:e.name,label:e.name}}))},getColumns:function(){return[{label:this.i18n.inputField,field:"inputFieldName"},{label:this.i18n.appendValue,field:"mappedFieldName",editor:w,editOn:"click",editorArgs:{style:"width:120px;",maxHeight:-1,sortByLabel:!1,onChange:U.hitch(this,(function(e){"Expression"===e&&(this.addExpression(),this.onExpressionSelect())}))},autoSave:!0,renderCell:U.hitch(this,(function(e,t,i,s){var a=t&&"Expression"!==t?t:"null";i.innerHTML=a}))}]},updateGridRow:function(e){var t=this.inherited(arguments);return"null"!==e.mappedFieldName&&e.mappedFieldName&&"Expression"!==e.mappedFieldName||(t.className+="dgrid-row-highlight"),t},updateSelectOptions:function(){this.dataFieldGrid.on("dgrid-editor-show",U.hitch(this,(function(e){var t=e.cell.row;this.selectedField=t.data.inputField,this.selectedIndex=t.id,e.editor.removeOption(e.editor.getOptions()),e.editor.addOption(this.getOptionStore(e.cell.row.data.mappedFieldName))})))},updateMappedOnChange:function(){this.dataFieldGrid.on("dgrid-datachange",U.hitch(this,(function(e){this.selectedIndex=e.cell.row.id,"null"===e.value&&this.updateMappedFields({name:"null",alias:"Expression"}),e.value&&"Expression"!==e.value?this.getChangedMappedField(!0,e):this.getChangedMappedField(!1,e)})))},getChangedMappedField:function(e,t){var i=I.filter(this.appendLayer.fields,(function(i){var s=e?t.value:t.oldValue;return i.name===s}));i[0]&&this.updateMappedFields(i[0])},updateMappedFields:function(e){this.mappedFields[this.selectedIndex]=e,this.dataFieldGrid.set("collection",y.createStore(this.prepareData()))},onExpressionSelect:function(){this._calcField.set("expression",""),this._calcField.reset(),this._exprDialog.show()},addExpression:function(){if(this._calcField)this._calcField&&this._calcField.layer!==this.appendLayer&&(this._calcField.reset(),this._calcField.set("layer",this.appendLayer));else{var e=L.getExprFunctions();this._calcField=new o({expressionMode:o.MODE_ARCADE,arcadeEditor:this.arcadeEditor,map:this.map,layer:this.appendLayer,field:this.i18n.bufField,baseClass:"esriBufFieldExp",helperMethods:e,showHelp:!1,css:{addButton:"btn calcite primary",closeButton:"btn calcite cancel"},helperType:"numeric",showHeader:!1,calculateLabel:this.i18n.add,expression:this.expression||null},this._expressionCtr),this._calcField.startup(),this._calcField.expressionMode===o.MODE_SQL?(Q.set(this._calcField._validateBtn.domNode,"display","none"),this._calcField._handleHelperTypeChange("value",null,{functionType:"NumType"}),this._aspectHandle=J.around(this._calcField,"_handleAddFieldButtonClick",U.hitch(this,(function(e){return U.hitch(this,(function(e,t){var i=this._calcField.get("expression")[0];this.updateMappedFields({alias:"Expression",name:i.sqlExpression}),this._exprDialog.hide()}))})))):this._calcField.expressionMode===o.MODE_ARCADE&&this._calcField.on("expression-add",U.hitch(this,(function(e){this.updateMappedFields({alias:"Expression",name:e.expression}),this._exprDialog.hide()}))),this._calcField.on("close",U.hitch(this,(function(){this._exprDialog.hide()})))}},_loadConnections:function(){this.on("start",U.hitch(this,"_onClose",!0)),this._connect(this._closeBtn,"onclick",U.hitch(this,"_onClose",!1))},_showMessages:function(e){q.set(this._bodyNode,"innerHTML",e),k.fadeIn({node:this._errorMessagePane,easing:Y.quadIn,onEnd:U.hitch(this,(function(){Q.set(this._errorMessagePane,{display:""})}))}).play(),window.setTimeout(U.hitch(this,this._handleCloseMsg),3e3)},_handleCloseMsg:function(e){e&&e.preventDefault(),k.fadeOut({node:this._errorMessagePane,easing:Y.quadOut,onEnd:U.hitch(this,(function(){Q.set(this._errorMessagePane,{display:"none"})}))}).play()},isLayerAllowed:function(e){return e&&e.type===u.TABLE||e.type===u.BTABLE||e.geometryType===h.GeometryTypes.Point||e.geometryType===h.GeometryTypes.Polygon||e.geometryType===h.GeometryTypes.Line},isSimilarTypeAsInput:function(e){return this.inputLayer&&e&&e.type===this.inputLayer.type&&e.geometryType==this.inputLayer.geometryType},_setAnalysisGpServerAttr:function(e){e&&(this.analysisGpServer=e,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(e){this.getUserProfile().then(U.hitch(this,(function(t){this.isLayerEditable(e,t)&&L.isPortalHostedService(e&&e.url)?this.inputLayer=e:this.inputLayer=void 0,this.updateSelectLayerOptions(this.inputLayer,this.inputLayers,this._inputLayerSelect)})))},_setInputLayersAttr:function(e){this.getUserProfile().then(U.hitch(this,(function(t){this.inputLayers=I.filter(e,(function(e){return L.isPortalHostedService(e&&e.url)&&this.isLayerEditable(e,t)&&this.isLayerAllowed(e)}),this),this.inputLayer=this.setDefaultLayer(this.inputLayer,this.inputLayers),this.updateSelectLayerOptions(this.inputLayer,this.inputLayers,this._inputLayerSelect),this.set("appendLayers",e)})))},_setAppendLayerAttr:function(e){this.appendLayer=!this.isSameLayer(this.inputLayer,e)&&e},_setAppendLayersAttr:function(e){this.appendLayers=e,this.filterAppendLayers(this.inputLayer),this.appendLayer=this.setDefaultLayer(this.appendLayer,this.appendFilteredLayers),this.updateSelectLayerOptions(this.appendLayer,this.appendFilteredLayers,this._appendLayerSelect),this.setFieldMapping()},_setFieldMappingAttr:function(e){this.fieldMapping=e},_setDisableRunAnalysisAttr:function(e){this._saveBtn.set("disabled",e)},_connect:function(e,t,i){this._pbConnects.push(R.connect(e,t,i))}});return X("extend-esri")&&U.setObject("dijit.analysis.AppendData",oe,e),oe}));