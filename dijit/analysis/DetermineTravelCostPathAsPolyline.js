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

define(["../../kernel","./AnalysisRegistry","./RasterAnalysisMixin","./utils","./ItemTypes","dijit/_FocusMixin","dijit/_OnDijitClickMixin","dijit/_TemplatedMixin","dijit/_WidgetBase","dijit/_WidgetsInTemplateMixin","dojo/_base/array","dojo/_base/declare","dojo/_base/json","dojo/_base/lang","dojo/has","dojo/i18n!./nls/DetermineTravelCostPathAsPolyline","dojo/text!./templates/DetermineTravelCostPathAsPolyline.html"],(function(t,e,i,s,n,a,r,o,h,u,l,p,d,c,y,_,L){var m=p([h,o,u,r,a,i],{declaredClass:"esri.dijit.analysis.DetermineTravelCostPathAsPolyline",templateString:L,widgetsInTemplate:!0,analysisType:"feature",browseType:[n.IS,n.FS],checkGeometries:[e.GeometryTypes.Point,e.GeometryTypes.MultiPoint,e.GeometryTypes.Line],tags:["point","line"],map:null,drawDestinationPointLayerName:"",drawSourcePointLayerName:"",toolName:"DetermineTravelCostPathAsPolyline",helpFileName:"DetermineTravelCostPathAsPolyline",toolNlsName:_,rasterGPToolName:"DetermineTravelCostPathAsPolyline",outputName:"outputPolylineName",resultParameter:"outputPolylineFeatures",constructor:function(t,e){this._pbConnects=[],t.containerNode&&(this.container=t.containerNode)},_removePointLayer:function(){this.sourcePointLayer&&this._removeLayer(this.sourcePointLayer,this.inputLayers,this._analysisSelect),this.destinationPointLayer&&this._removeLayer(this.destinationPointLayer,this.inputLayers,this._destinationSelect),this._sourceDrawBtn.deactivate(),this._destinationDrawBtn.deactivate()},_getJobParameters:function(){var t=s.constructAnalysisInputLyrObj(this.get("inputLayer"));this.inputLayer.drawnLayer&&(t.drawnLayer=this.inputLayer.drawnLayer);var e=d.toJson(s.constructAnalysisInputLyrObj(this.get("inputCostRaster"))),i=s.constructAnalysisInputLyrObj(this.get("inputDestinationRasterOrFeatures"));return this.get("inputDestinationRasterOrFeatures").drawnLayer&&(i.drawnLayer=this.get("inputDestinationRasterOrFeatures").drawnLayer),{inputSourceRasterOrFeatures:d.toJson(t),inputCostRaster:e,inputDestinationRasterOrFeatures:d.toJson(i),destinationField:this.destinationField,pathType:this._pathTypeSelect.get("value")}},_setDefaultInputs:function(){this.inputCostRaster&&this.inputCostRasters&&!s.isLayerInLayers(this.inputCostRaster,this.inputCostRasters)&&this.inputCostRasters.push(this.inputCostRaster),this._addInputCostRasterLayerOptions(),this._setDefaultInputCostRaster(),this._addDestinationLayerOptions(),this._pathTypeSelect.set("value",this.pathType),this._outputLayerInput.set("value",this.outputPolylineName&&this.outputPolylineName.serviceProperties.name),this.drawDestinationPointLayerName||(this.drawDestinationPointLayerName=this.i18n.drawDestinationPointLayerName),this.drawSourcePointLayerName||(this.drawSourcePointLayerName=this.i18n.drawSourcePointLayerName),this.inputLayer&&this.inputLayer.drawnLayer&&(this._sourceDrawBtn.set("pointFeatureLayer",this.inputLayer),this.sourcePointLayer=this.inputLayer),this.inputDestinationRasterOrFeatures&&this.inputDestinationRasterOrFeatures.drawnLayer&&(this.inputLayers.push(this.inputDestinationRasterOrFeatures),this._destinationDrawBtn.set("pointFeatureLayer",this.inputDestinationRasterOrFeatures),this.destinationPointLayer=this.inputDestinationRasterOrFeatures),this._destinationDrawBtn.set("map",this.map),this._sourceDrawBtn.set("map",this.map),this._destinationDrawBtn.on("change",c.hitch(this,this._handleDestinationDrawLayer)),this._sourceDrawBtn.on("change",c.hitch(this,this._handleSourceDrawLayer)),this._destinationSelect.set("isValid",c.hitch(this,this._isValid))},_setDefaultInputCostRaster:function(){this.inputCostRaster||(this.inputCostRaster=this.inputCostRasters[0])},_handleSourceDrawLayer:function(t){this._clearSelectedPointSelectLayer(!0),this.inputLayers&&0!==this.inputLayers.length&&-1!==this.inputLayers.indexOf(t)||(this.sourcePointLayer=t,this.inputLayers.push(t),this.inputLayer=t,this._analysisSelect.removeOption(this._analysisSelect.getOptions()),s.populateAnalysisLayers(this,"inputLayer","inputLayers"),this._addDestinationLayerOptions())},_handleDestinationDrawLayer:function(t){if(this._clearSelectedPointSelectLayer(!1),!this.inputLayers||0===this.inputLayers.length||-1===this.inputLayers.indexOf(t)){this.destinationPointLayer=t;var e=this._updateSelectOptionsForDrawLayer(!1,t);this._handleDestinationAnalysisLayerChange(e)}},_clearSelectedPointSelectLayer:function(t){t&&this.destinationPointLayer&&this._destinationDrawBtn.reset(),!t&&this.sourcePointLayer&&this._sourceDrawBtn.reset()},_isValid:function(){return"placeholder"===this._destinationSelect.value?(this._destinationSelect._missingMsg=this.toolNlsName.missingMessage,!1):(this._destinationSelect._missingMsg=this.toolNlsName.noValueMessage,!this._destinationSelect.required||0===this._destinationSelect.value||!/^\s*$/.test(this._destinationSelect.value||""))},_updateSelectOptionsForDrawLayer:function(t,e){var i=this.inputLayers.length,s=this._destinationSelect.getOptions();return this._destinationSelect.removeOption(s),(s=l.map(s,(function(t){return t.selected=!1,t}))).push({value:i.toString(),label:e.name,selected:!0}),this.inputLayers.push(e),this._destinationSelect.addOption(s),i},_addInputCostRasterLayerOptions:function(){var t=[];this._inputCostRasterSelect.removeOption(this._inputCostRasterSelect.getOptions()),l.forEach(this.inputCostRasters,c.hitch(this,(function(e,i){this._isSelected(this.inputCostRaster,this.inputLayer)||t.push({label:e.name,value:i.toString(),selected:this._isSelected(e,this.inputCostRaster)})}))),this._inputCostRasterSelect.addOption(t),this._handleInputCostRasterChange(this._inputCostRasterSelect.get("value"))},_addDestinationLayerOptions:function(){var t=this._destinationSelect.getOptions(),e=[];l.some(t,(function(t){return"separator"===t.type}))&&(e=t.splice(t.length-2,2)),this._destinationSelect.removeOption(this._destinationSelect.getOptions()),this._destinationSelect.addOption(this._getDestinationLayerOptions()),this._destinationSelect.addOption(e),this._handleDestinationAnalysisLayerChange(this._destinationSelect.get("value"))},_addDestinationFields:function(){this._destinationFieldSelect.removeOption(this._destinationFieldSelect.getOptions()),this._destinationFieldSelect._setDisplay("");var t=!1;this.inputDestinationRasterOrFeatures&&this.inputDestinationRasterOrFeatures.fields.forEach(c.hitch(this,(function(i){if(i.type===e.FieldTypes.Integer||i.type===e.FieldTypes.Short){var s=i.name===this.destinationField;t=t||s,this._destinationFieldSelect.addOption({label:i.alias||i.name,value:i.name,selected:s})}}))),t||(this.destinationField=this._destinationFieldSelect.getOptions()[0]&&this._destinationFieldSelect.getOptions()[0].value)},_getDestinationLayerOptions:function(){var t=[];return l.forEach(this.destinationRasters,c.hitch(this,(function(e,i){this._isSelected(e,this.inputLayer)||this._isSelected(e,this.inputDestinationRasterOrFeatures)?this._isSelected(e,this.inputDestinationRasterOrFeatures)&&(this._isSelected(e,this.inputLayer)?t.push({label:this.toolNlsName.placeHolder,value:"placeholder",selected:!0,disabled:!0}):t.push({label:e.name,value:i.toString(),selected:!0})):t.push({label:e.name,value:i.toString(),selected:!1})}))),t},_handleInputCostRasterChange:function(t){"browselayers"===t||"browse"===t?(this._isAnalysisSelect=!1,this._isCostRasterSelect=!0,this.defaultItemTypes=[],this.set("allowedItemTypes",[n.IS]),this._createBrowseItems({browseValue:t,disableLAAL:!0,disableBoundary:!0,disabledSubResources:[this.inputCostRaster]},{},this._inputCostRasterSelect)):t>=0&&this.set("inputCostRaster",this.inputCostRasters[t])},_handleDestinationAnalysisLayerChange:function(t){"browselayers"===t||"browse"===t?(this._isAnalysisSelect=!1,this._isCostRasterSelect=!1,this.defaultItemTypes=[],this.set("allowedItemTypes",this.browseType),this._createBrowseItems({browseValue:t,disabledSubResources:[this.inputLayer,this.inputDestinationRasterOrFeatures]},{geometryTypes:this.checkGeometries,tags:this.tags,customCheck:{customCheckHandler:c.hitch(this,(function(t){return!s.isSameLayer(t,this.inputLayer)}))}},this._destinationSelect)):"placeholder"===t?(this.set("inputDestinationRasterOrFeatures",void 0),this._destinationSelect.validate(!0)):t>=0&&(this.set("inputDestinationRasterOrFeatures",this.destinationRasters[t]),this._addDestinationFields())},_handleDestinationFieldChange:function(t){this.set("destinationField",t)},_handleBrowseItemsSelect:function(t,e){t&&t.selection&&s.addAnalysisReadyLayer({item:t.selection,layers:this._isAnalysisSelect?this.inputLayers:this._isCostRasterSelect?this.inputCostRasters:this.destinationRasters,layersSelect:this._isAnalysisSelect?this._analysisSelect:this._isCostRasterSelect?this._inputCostRasterSelect:this._destinationSelect,browseDialog:this._browseLyrsdlg||this._browsedlg,widget:this},e).always(c.hitch(this,(function(){this._isAnalysisSelect?this._handleAnalysisLayerChange(this._analysisSelect.get("value")):this._isCostRasterSelect?this._handleInputCostRasterChange(this._inputCostRasterSelect.get("value")):this._handleDestinationAnalysisLayerChange(this._destinationSelect.get("value"))})))},_handleSourceAnalysisLayerChange:function(t){t>=0&&this.set("inputLayer",this.inputLayers[t]),this._addDestinationLayerOptions()},_resetUI:function(){this._addDestinationLayerOptions()},addBrowseOption:function(){s.addReadyToUseLayerOption(this,[{disableLAAL:!0,select:this._inputCostRasterSelect},this._destinationSelect])},_isSelected:function(t,e){return e&&t&&e.url===t.url&&e.id===t.id},_setInputLayerAttr:function(t){this.inputLayer=t},_getInputLayerAttr:function(){return this.inputLayer},_setInputDestinationRasterOrFeaturesAttr:function(t){this.inputDestinationRasterOrFeatures=t,this._isSelected(t,this.inputLayer)&&this._resetUI()},_getInputDestinationRasterOrFeaturesAttr:function(){return this.inputDestinationRasterOrFeatures},_setInputLayersAttr:function(t){this.inputLayers=l.filter(t,(function(t){return t.geometryType===e.GeometryTypes.Point||t.geometryType===e.GeometryTypes.Line||t.geometryType===e.GeometryTypes.Polygon||this.isImageServiceLayer(t)}),this),this.set("inputCostRasters",t),this.set("destinationRasters",t)},_getInputLayersAttr:function(t){return this.inputLayers},_getInputCostRasterAttr:function(){return this.inputCostRaster},_setInputCostRasterAttr:function(t){this.isImageServiceLayer(t)&&(this.inputCostRaster=t)},_getInputCostRastersAttr:function(){return this.inputCostRasters},_setInputCostRastersAttr:function(t){this.inputCostRasters=l.filter(t,(function(t){return this.isImageServiceLayer(t)}),this)},_getDestinationRastersAttr:function(){return this.destinationRasters},setDestinationRastersAttr:function(t){this.destinationRasters=t},_setOutputPolylineNameAttr:function(t){this.outputOptimumNetworkName=t},_getOutputPolylineNameAttr:function(){return this._outputLayerInput.get("value")},_setPathTypeAttr:function(t){this.pathType=t},_getPathTypeAttr:function(){return this.pathType},_setDrawSourcePointLayerNameAttr:function(t){this.drawSourcePointLayerName=t},_getDrawSourcePointLayerNameAttr:function(){return this.drawSourcePointLayerName},_setDrawDestinationPointLayerNameAttr:function(t){this.drawDestinationPointLayerName=t},_getDrawDestinationPointLayerNameAttr:function(){return this.drawDestinationPointLayerName},_setDestinationFieldAttr:function(t){this.destinationField=t},_getDestinationFieldAttr:function(t){return this.destinationField}});return y("extend-esri")&&c.setObject("dijit.analysis.DetermineTravelCostPathAsPolyline",m,t),m}));