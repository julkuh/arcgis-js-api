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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/has","dojo/string","dojo/i18n!../../nls/jsapi","dojo/dom-style","dojo/dom-class","dojo/dom-construct","dojo/store/Memory","dojo/data/ObjectStore","dojo/json","dojo/query","../../lang","../../kernel","../../layers/RasterFunction","dojo/text!../../layers/support/rasterFunctionSchema.json","dojo/text!../../layers/support/rasterFunctionResources.json","dijit/_WidgetBase","dijit/_TemplatedMixin","dijit/form/TextBox","dijit/form/CheckBox","dijit/form/NumberTextBox","dijit/form/Select","dijit/TitlePane","dijit/Tooltip","./EditableGridMixin","./RFxAggregationDefinitionEditor","./RFxArgSlider","./RFxAttributeTable","./RFxBandCombinationEditor","./RFxBandIndexPicker","./RFxBandMatrix","./RFxBandNamePicker","./RFxCellSizeInput","./RFxClippingGeometry","./RFxColorInput","./RFxConversionGrid","./RFxDetectChangeTypePicker","./RFxFactorFunctionEditor","./RFxFeatureSelect","./RFxFieldNumberSwitchable","./RFxFieldSelect","./RFxGammaEditor","./RFxGridBase","./RFxKernelSelector","./RFxLinearUnit","./RFxMultidimensionalDefinitionEditor","./RFxNamedRasterEditor","./RFxNeighborhoodValues","./RFxPropertySet","./RFxRangedValueEditor","./RFxRasterArrayEditor","./RFxRasterDimensionSelect","./RFxRasterInfoCellSizeEditor","./RFxRasterInput","./RFxRasterInputArray","./RFxRasterVariableGrid","./RFxRemapGrid","./RFxScaleSelect","./RFxScalesInput","./RFxSRPicker","./RFxStatisticsGrid","./RFxStatisticsPixelFilter","./RFxTemplateInput","./RFxTransposeBit","./RFxUnitPicker","./RFxWeightedOverlayTableEditor","./RFxWeightedSumTableEditor","./SimpleMatrixCreator","./srUtils","./utils","../analysis/RemapGrid","../ColorPicker","../ColorRampSelector","../../renderers/colorRampUtils"],(function(e,t,r,i,a,n,s,o,u,l,c,g,d,h,f,p,m,v,y,_,A,x,R,F,b,w,T,C,S,E,I,N,k,O,j,L,V,D,W,U,P,B,M,G,z,H,q,K,J,$,Q,X,Y,Z,ee,te,re,ie,ae,ne,se,oe,ue,le,ce,ge,de,he,fe,pe,me,ve,ye,_e,Ae,xe){var Re,Fe,be,we,Te,Ce="esriRFxArgsEditor__table",Se="esriRFxArgsEditor__tr",Ee="esriRFxArgsEditor__tr--arg-name",Ie="esriRFxArgsEditor__tr--arg-widget",Ne="esriRFxArgsEditor__label--fx-desc",ke="esriRFxArgsEditor__icon--warning",Oe="esriRFxArgsEditor__titlePane",je="RasterFunctionTemplate",Le="RasterFunctionVariable",Ve=[38,39,40,41,42,43,47,54,55,58,66,67,68,69,70,71,72,73,74,75],De={name:"Elevation #1",type:"multipart",colorRamps:[{fromColor:[175,240,233],toColor:[255,255,179]},{fromColor:[255,255,179],toColor:[0,128,64]},{fromColor:[0,128,64],toColor:[252,186,3]},{fromColor:[252,186,3],toColor:[128,0,0]},{fromColor:[120,0,0],toColor:[105,48,13]},{fromColor:[105,48,13],toColor:[171,171,171]},{fromColor:[171,171,171],toColor:[255,252,255]}]},We=e([y,_],{declaredClass:"esri.dijit.RasterFunctionEditor.RFxArgsEditor",widgetsInTemplate:!0,templateString:"<div class='esriRFxArgsEditor'><div data-dojo-attach-point='_argsContainterNode'></div></div>",showVariableNames:!0,_inputWidgets:[],_supportedDataTypes:["raster","long","double","string","longarray","stringarray","doublearray","rasterarray","colorramp","boolean","rasterstatisticsarray","arrayofrasterstatistics","cellsize","featureclass","rasterinfo","table","propertyset","spatialReference","rfxtemplate"],constructor:function(r){r=r||{},e.safeMixin(this,r),this._i18n=n.widgets.rasterFunctionEditor.rfxArgsEditor,this._rfxTemplate=t.clone(this.rfxTemplate),Re=g.parse(a.substitute(m,n,t.hitch(this,this._substituteString))),Fe=g.parse(a.substitute(v,n,t.hitch(this,this._substituteString))),be=Fe&&Fe.enums,we=Fe&&Fe.dataTypes,Te=Fe&&Fe.domainTypes,this._portalMode=r.portalSelf&&r.portalSelf.portalMode},startup:function(e){this.inherited(arguments)},postCreate:function(e){this.inherited(arguments),this.rfxTemplate&&(this._honorIsPublic=this._getHonorIsPublic(this.rfxTemplate),this._populateUI())},destroy:function(){this._destroyInputWidgets(),this.inherited(arguments)},reset:function(){},getName:function(){return this._rfxTemplate&&this._rfxTemplate.name},getUpdatedRFTWithValues:function(){var e=this._getUpdatedRFTWithValues(this._rfxTemplate);return this._cloneRFT(e,["input","uxBlocks"])},_getUpdatedRFTWithValues:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach((function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}}),this)),e}},_getRFT:function(e){if(e){var t=e.arguments,r=this._getFunctionSchema(e);return t&&(this._isRFxArg(t)?e.arguments=this._getUpdatedRFxArg(t,"Raster",r):Object.keys(t).forEach((function(e){if("type"!==e){var i=t[e];i&&(t[e]=this._getUpdatedRFxArg(i,e,r))}}),this)),e}},_isRFxArg:function(e){if(e){var t=e.type;return[je,Le].indexOf(t)>=0||this._isColorRamp(e)||this._isRecordSet(e)}},_getUpdatedRFxArg:function(e,t,i){if(!e||!this._isRFxArg(e))return e;var a=ve.getArgRFT(e),n=i&&i.rasterFunctionArguments,s=this._getCaseInsensitiveArg(t,n);if(s&&(s.key=t),a)return e.type===Le?(e.value=this._getUpdatedRFTWithValues(a),e):this._getUpdatedRFTWithValues(a);if(this._hasRFTElements(e)&&!this._isShown(e)){var o=e.value&&e.value.elements?e.value.elements:e.value;return r.forEach(o,(function(e,t){e&&(ve.isReferencedObject(e)||((a=ve.getArgRFT(e))?o[t]=this._getUpdatedRFTWithValues(a):e.type===Le?e.value=this._getArgumentValue(e,s):o[t]=this._getArgumentValue(e,s)))}),this),e}return s&&s.dataType===we.rfxtemplate?e=this._getArgumentValue(e,s):e.type===Le?(e.value=this._getArgumentValue(e,s),e):this._isRecordSet(e)?e:void 0},_substituteString:function(e,t){if(void 0===e)throw new Error(" RFxArgsEditor: "+t);return null===e?"":this._escapeValue(String(e))},_getHonorIsPublic:function(e){var i=e&&e.arguments;if(!e||!i)return!1;if(e.aliases)return!0;var a=t.hitch(this,(function(e){if(!e)return!1;if(e.isPublic)return!0;if(this._hasRasterElements(e)){var t=e.value&&e.value.elements?e.value.elements:e.value;return r.some(t,(function(e){return a(e)}),this)}return this._getHonorIsPublic(ve.getArgRFT(e))}));return this._isRFxArg(i)?a(i):r.some(Object.keys(i),(function(e){var t=i[e];if(this._isRFxArg(t))return a(t)}),this)},_hasRFTElements:function(e){if(!e||!e.value)return!1;var t=e.value.elements?e.value.elements:e.value;return Array.isArray(t)?t.some((function(e){return e&&e.type===je})):void 0},_hasRasterElements:function(e){if(!e||!e.value)return!1;var t=e.value.elements?e.value.elements:e.value;return!!Array.isArray(t)&&t.some((function(e){return e&&(e.isDataset||e.type===je)}))},_isRecordSet:function(e){return e.type&&e.type.toLowerCase().indexOf("recordset")>=0},_isColorRamp:function(e){return!!e&&(!!(e.type&&e.type.toLowerCase().indexOf("colorramp")>=0)||(!!(e.value&&e.value.type&&e.value.type.toLowerCase().indexOf("colorramp")>=0)||void 0))},_cloneRFT:function(e,i){var a={};if("object"==typeof e&&null!==e&&!Array.isArray(e)){for(var n in e)e.hasOwnProperty(n)&&r.indexOf(i,n)<0&&(a[n]=this._cloneRFT(e[n],i));return a}return Array.isArray(e)?e.map(t.hitch(this,(function(e){return this._cloneRFT(e,i)}))):t.clone(e)},_populateUI:function(){if(this._destroyInputWidgets(),u.empty(this._argsContainterNode),this._buildRFxTemplateUI(this._rfxTemplate),"RasterCollectionFunctionArguments"===this._rfxTemplate.arguments.type&&!this._rfxTemplate.arguments.AggregationDefinition.input){var e=this._rfxTemplate.arguments,t=this._getFunctionSchema(this._rfxTemplate),r=t&&t.rasterFunctionArguments,i=e.AggregationDefinition,a=this._getCaseInsensitiveArg("AggregationDefinition",r),n=i.uxBlocks[2];this._createInputWidget(i,n,a,e)}},_buildRFxTemplateUI:function(e,t){var r,i=e.arguments;if(e.function&&e.name&&i&&(r=this._buildRFxUI(e,t)),i)if(this._isRFxArg(i))this._buildArgRFTUI(i);else{var a,n=this._getFunctionSchema(e),s={};n&&Object.keys(n.rasterFunctionArguments).forEach((function(e){var t=this._getCaseInsensitiveArg(e,i),r=n.rasterFunctionArguments[e];a=this._buildArgRFTUI(t,a,r)||a,s[e.toLowerCase()]=!0}),this),Object.keys(i).forEach((function(e){if(!s[e.toLowerCase()]&&"type"!==e){var t=i[e];a=this._buildArgRFTUI(t,a)||a}}),this)}return r},_buildArgRFTUI:function(e,t,i){if(this._isRFxArg(e)){var a=e.customFunction;if(!i||"rfxtemplate"!==i.dataType||a){var n=ve.getArgRFT(e);if(n)return this._buildRFxTemplateUI(n,t);if(this._hasRasterElements(e)){var s=e&&e.value.elements?e.value.elements:e.value,o=t;return r.forEach(s,(function(e){(n=ve.getArgRFT(e))&&(o=this._buildRFxTemplateUI(n,o)||o)}),this),o}}}},_getFunctionSchema:function(e){if(e&&e.function&&e.function.type){var t,r,i=e.function.type,a=ve.functionTypes;if(i.toLowerCase()===a.local.toLowerCase()){var n=e&&e.arguments&&e.arguments.Operation,s=n&&n.value;if(Ve.indexOf(s)>=0)return Re.CellStatisticsFunction}return i.toLowerCase()===a.gpAdapter.toLowerCase()?(t=(t=e&&e.arguments&&e.arguments.ToolName).value&&t.value.replace("_sa",""),this._getCaseInsensitiveArg(t,Re)):i.toLowerCase()===a.pythonAdapter.toLowerCase()?"object"==typeof(r=e&&e.arguments&&e.arguments.ClassName)?this._getCaseInsensitiveArg(r.value,Re):this._getCaseInsensitiveArg(r,Re):this._getCaseInsensitiveArg(i,Re)}},_getSchemaArgKey:function(e,t){if(e){var i,a=Object.keys(e);return void 0===t&&1===a.length?a[0]:(r.some(a,(function(e){e.toLowerCase()===(t&&t.toLowerCase())&&(i=e)})),i)}},_buildRFxArgUI:function(e){var t,i,a=[],n=(e=e||{}).rfxArg,s=e.rfxArgName,o=e.functionSchemaArgs,u=e.schemaEditorOverrides,l=e.rfxArgs,c=e.container,g=e.overriddenArgNames,d=e.triggerArgs;if(n)return o&&(t=this._getSchemaArgKey(o,s),(i=o[t])&&(i.key=t)),i&&i.categoryRefId&&(c=this._createCategoryDiv(c,i.categoryRefId)),u&&r.some(u,(function(e){r.indexOf(e.argumentNames,t)>=0&&this._isOverrideWidgetShown(e.argumentNames,l)&&r.indexOf(g,t)<0&&(g=g.concat(e.argumentNames),this._buildOverrideWidgetLayout(e,l,c,o))}),this),r.indexOf(g,t)<0&&(i&&"rfxtemplate"===i.dataType||n.type&&n.type!==je)&&this._isShown(n,i)&&(i&&r.indexOf(this._supportedDataTypes,i.dataType)<0?a.push(n.name||i.displayName):this._buildRFxArgLayout(n,c,i,l)),i&&i.editorStateTrigger&&i.editorStateTrigger.active&&d.push({rfxArg:n,schemaArgDef:i}),{overriddenArgNames:g,unsupportedDataTypeArgs:a}},_createCategoryDiv:function(e,t){if(s=d("."+t+"-table-body",e)[0])return s;var r=u.create("tr",{class:Oe+" "+t+"-category"},e),i=u.create("td",null,r),a=u.create("div",{class:t},i),n=u.create("table",{class:t+"-table"}),s=u.create("tbody",{class:t+"-table-body"},n),o=Fe.categoryReference&&Fe.categoryReference[t];new b({title:o.title,content:n,open:o.visible},a);return s},_buildRFxUI:function(e,i){i=i||this._argsContainterNode;var a=e.arguments,n=[],s=[],o=[],l=this._getFunctionSchema(e),c=l&&l.rasterFunctionArguments,g=l&&l.editorArgumentOverride&&l.editorArgumentOverride.active?l.editorArgumentOverride.overrides:null,d=u.create("table",{class:Ce}),h=u.create("tbody",null,d),f=i===this._argsContainterNode?"first":"after",p=u.create("div",null,i,f),m={functionSchema:l,functionSchemaArgs:c,schemaEditorOverrides:g,rfxArgs:a,container:h,triggerArgs:o,overriddenArgNames:n};function v(e){if(e){var t=e.overriddenArgNames,r=e.unsupportedDataTypeArgs;t&&(n=n.concat(t),m.overriddenArgNames=n),r&&(s=s.concat(r),m.unsupportedDataTypeArgs=s)}}function y(e){Object.keys(e).forEach((function(e){var r=this._getCaseInsensitiveArg(e,a);r&&this._isRFxArg(r)&&!r.uxBlocks&&v(this._buildRFxArgUI(t.mixin({rfxArg:r,rfxArgName:e},m)))}),this)}if(a&&(this._isRFxArg(a)?v(this._buildRFxArgUI(t.mixin({rfxArg:a},m))):(c&&t.hitch(this,y)(c),t.hitch(this,y)(a)),Object.keys(a).forEach((function(e){var t=a[e];t&&t.input&&t.input.declaredClass.indexOf("RFxFieldSelect")>0&&t.input.setFieldOptions(),t&&t.input&&t.input.declaredClass.indexOf("RFxRangedValueEditor")>=0&&t.input.setInputConstraints()})),r.forEach(o,(function(e){var t=e.rfxArg,r=t&&t.value;this._handleEditorStateTriggers(a,r,e.schemaArgDef,h)}),this),Object.keys(a).forEach((function(e){var t=a[e];t&&t.input&&t.input.declaredClass&&t.input.declaredClass.indexOf("RFxDetectChangeTypePicker")>=0&&t.input.onEditorStateTriggerExecuted()}))),h.childNodes&&h.childNodes.length)return this._buildTitlePane(d,p,e.function,s)},_isOverrideWidgetShown:function(e,t){var i;return r.some(e,(function(e){if(i=this._getCaseInsensitiveArg(e,t),this._isShown(i))return!0}),this)},_hasVisibleElements:function(e){if(e&&!ve.isReferencedObject(e)){var t=e.value&&e.value.elements;return t&&r.some(t,(function(e){return this._isShown(e)}),this)}},_isShown:function(e,t){return!!e&&(this._honorIsPublic?!!e.isPublic||!!this._hasVisibleElements(e):!t||!t.hidden)},_buildTitlePane:function(e,r,i,a){if(i.customFunction){var n=u.create("div",null,r);return u.place(e,n),n}var s=new b({title:i&&i.name,content:e},r);s.startup();var o=t.hitch(this,(function(e,t){this.own(new w({connectId:[e],label:"<div class='"+Ne+"'>"+t+"</div>"})),e.onclick=function(e){e.stopPropagation()}}));s.titleNode&&(o(u.create("a",{class:"esriFloatTrailing helpIcon",style:"float: right; margin-right: -6px;"},s.titleNode),i&&i.description),a&&a.length&&o(u.create("a",{class:ke},s.titleNode),this._i18n.unsupportedDataTypeWarning+"<br><br><strong>"+a.join(", ")+"</strong>"));return s.domNode},_buildRFxArgLayout:function(e,t,r,i){var a,n,s,o;return n=(r&&r.dataType)===we.boolean,s=this._useRFxArgWidget(r),o=r&&r.domain,(s||n)&&(a=u.create("tr",{class:Se},t),e.uxBlocks=[a]),s?this._buildRFxWidgetLayout(a,e,r,i):n&&!o?this._buildBooleanLayout(a,e,r,i):this._buildStdTwoRowLayout(t,e,r,i)},_useRFxArgWidget:function(e){return e&&(e.domain&&e.domain.type===Te.range||e.elementInfos&&e.dataType===we.rasterArray||e.dataType===we.table)},_createInputWidget:function(e,t,r,i){var a=this._getWidget(e,t,r,i);a&&(a.startup(),e.input=a,this._inputWidgets.push(a))},_createOverrideWidget:function(e,i,a){var n=new e(i,a),s=i&&i.inputArgs;n.startup(),this._inputWidgets.push(n);var o=i.overrideWidgetPath.indexOf("RFxStatisticsPixelFilter")>=0;if(i.overrideWidgetPath.indexOf("RFxRangedValueEditor")>=0||o){var u=i.rfxArgs,l=Object.keys(i.inputArgs)[0],c=this._getCaseInsensitiveArg(l,u),g=this._getWidgetName(u),d=i.rasterFunctions[g],h=d&&d.rasterFunctionArguments&&d.rasterFunctionArguments[l];n.on("change",function(e){e.value&&this._onArgumentValueChange(c,h,u,e.value)}.bind(this))}n.on("drawtool-activate",t.hitch(this,(function(e){this.emit("drawtool-activate",e)}))),n.on("drawtool-deactivate",t.hitch(this,(function(e){this.emit("drawtool-deactivate",e)}))),n.on("add-layer",t.hitch(this,(function(e){this.emit("add-ready-to-use-layer",e)}))),n.on("zoom-to-extent",t.hitch(this,(function(e){this.emit("zoom-to-extent",e)}))),n.domNode&&s&&r.forEach(Object.keys(s),(function(e){var t=s[e];t&&(t.uxBlocks=[n.domNode])}))},_buildOverrideWidgetLayout:function(e,i,a,n){if(e){var s,o,l={},c={},g={},d="";e.triggerAttributes&&(d=e.triggerAttributes),r.forEach(e.argumentNames,(function(e){s=this._getCaseInsensitiveArg(e,i);var t=n[e];t&&(t.key=e),s&&(s.displayName=this._getArgDisplayName(s.name,t),(!s.value||Array.isArray(s.value)&&0===s.value.length)&&t.defaultValue&&(s.value=t.defaultValue),c[e]=s)}),this),r.forEach(e.triggerArguments,(function(e){s=this._getCaseInsensitiveArg(e,i);var t=n[e];t&&(t.key=e),s&&(s.displayName=this._getArgDisplayName(s.name,t),g[e]=s)}),this),r.forEach(Object.keys(n),(function(e){(o=n[e]).dataType===we.raster&&(s=this._getCaseInsensitiveArg(e,i))&&(l[e]=s)}),this);try{require([e.widget.path],t.hitch(this,(function(r){var n,s,o=u.create("tr",{class:Se},a);n=u.create("td",null,o),s=u.create("div",null,n),this._createOverrideWidget(r,{rasterFunctionEnums:be,rasterFunctions:Re,rasterArgs:l,rfxArgs:i,inputArgs:c,triggerArgs:g,triggerAttributes:d,overrideWidgetPath:e.widget.path,inputLayers:this.inputLayers,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf},allowScalar:!1,isShownFx:t.hitch(this,this._isShown)},s)})))}catch(e){console.error(e),r.forEach(Object.keys(c),(function(e){s=c[e],o=this._getCaseInsensitiveArg(e,n),this._buildRFxArgLayout(s,a,o,i)}),this)}}},_buildBooleanLayout:function(e,t,r,i){var a,n;a=u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},e),n=u.create("div",null,a,"first"),this._createInputWidget(t,n,r,i)},_buildStdTwoRowLayout:function(e,t,r,i){var a,n,s,o;a=u.create("tr",{class:Ee},e),u.create("td",{innerHTML:this._getArgDisplayName(t.name,r)},a),n=u.create("tr",{class:Ie},e),o=u.create("td",null,n),s=u.create("div",null,o),t.uxBlocks=[a,n,s],this._createInputWidget(t,s,r,i)},_getArgDisplayName:function(e,t){if(!t||!t.displayName)return e;if(this.showVariableNames){var r=t.key;return h.isDefined(e)&&""!==e&&e.toLowerCase()!==r.toLowerCase()?e:t.displayName}return t.displayName},_buildRFxWidgetLayout:function(e,t,r,i){var a,n;a=u.create("td",null,e),n=u.create("div",null,a),this._createInputWidget(t,n,r,i)},_getDatasetOptions:function(){if(this.inputLayers)return this._inputLayerStore=new c(new l({data:this.inputLayers})),this._inputLayerStore},_destroyInputWidgets:function(){var e=this._inputWidgets;r.forEach(e,(function(e){if(e&&e.destroy)try{e.destroy()}catch(e){console.log(e)}})),this._inputWidgets=[]},_getWidget:function(e,r,i,a){if(e){var n,s=i&&i.dataType,o=h.isDefined(e.value)?e.value:i&&i.defaultValue,u=i&&i.domain,l=i&&i.dataTypeAttributes;return e.isDataset&&!n&&(n=new te({inputLayers:this.inputLayers,value:o,allowScalar:!i||i.allowScalar,selectDefault:i&&i.required,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},r)),n||(n=u?this._getDomainBasedWidget(u,e,a,r,o):this._getDataTypeBasedWidget(s,l,e,a,r,i)),n&&(n.on("change",t.partial(t.hitch(this,this._onArgumentValueChange),e,i,a)),n.on("add-layer",t.hitch(this,(function(e){this.emit("add-ready-to-use-layer",e)}))),n.on("zoom-to-extent",t.hitch(this,(function(e){this.emit("zoom-to-extent",e)})))),n}},_getDataTypeBasedWidget:function(e,r,i,a,n,s){var o,u=i.value,l=null==u?s&&s.defaultValue:u;if(r&&"bandmatrix"===r.type)return this._getDataTypeAttributeBasedWidget(e,r,i,a,n);switch(e){case we.raster:i.isDataset||(o=new R({value:u&&u.length?u[0]:void 0},n));break;case we.rasterArray:var c;s&&s.elementInfos&&(c=this._getRasterArrayInputArgs(s,a)),o=c?new re({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,schemaElementInfos:c,isShown:t.hitch(this,this._isShown),browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n):new Y({inputLayers:this.inputLayers,value:u,getRFT:t.hitch(this,this._getUpdatedRFTWithValues),allowScalar:s.allowScalar,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case we.string:o=new A({value:u},n);break;case we.double:o=new R({value:l},n);break;case we.long:o=new R({constraints:{places:0},value:l},n);break;case we.colorRamp:var d=ve.getColorRampFromArg(i);i&&!d&&"ShadedReliefFunctionArguments"===a.type&&(d=De),o=new Ae({style:"text-indent: 0; height: 2.2em;",maxHeight:200,includeDefault:!1,colorRamp:d},n);break;case we.boolean:o=new x({checked:u},n);break;case we.stringArray:case we.doubleArray:case we.longArray:u&&u.length&&(u=u.join(",")),o=new A({value:u},n);break;case we.rasterStatisticsArray:case we.arrayOfRasterStatistics:o=new ue({value:u},n);break;case we.cellSize:o=new j({value:u},n);break;case void 0:o=new A({},n);try{"string"==typeof u?o.set("value",u):o.set("value",g.stringify(u))}catch(e){o.set("value",u)}break;case we.featureClass:o=new P({inputLayers:this.featureLayers,value:u,geometryType:r?r.type:null,isRequired:s&&s.required,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;case we.propertySet:o=new Q({value:u},n);break;case we.spatialReference:o=new oe({value:u,category:1},n);break;case we.rfxtemplate:o=new ce({inputLayers:this.inputLayers,value:i,browseProperties:{map:this.map,portalUrl:this.portalUrl,portalSelf:this.portalSelf}},n);break;default:o=new A({value:String(u)},n)}return o},_getDomainBasedWidget:function(e,t,r,i,a){if(e&&t){var n,s=e&&e.type;if(s===Te.numList){var o=new c(new l({idProperty:"key",data:this._getNumListData(e)}));n=new F({store:o,labelAttr:"key"},i),h.isDefined(a)&&n.set("value",a.toString())}else if(s===Te.list){var u=ve.getEnumData(be[e.enum],e.enum,this._portalMode),g=new c(new l({idProperty:"key",data:u}));n=new F({store:g,labelAttr:"label",maxHeight:200},i),h.isDefined(a)&&n.set("value",a.toString())}else if(s===Te.range)n=new S({min:e.min,max:e.max,label:t.name,value:a},i);else if(s===Te.bandIndex){var d=this._getCaseInsensitiveArg(e.argumentName,r);n=new N({nBandsArg:d,value:a},i)}else if(s===Te.bandName){var f=this._getCaseInsensitiveArg(e.argumentName,r);n=new O({nBandsArg:f,value:a},i)}else if(s===Te.fields){var p=this._getCaseInsensitiveArg(e.argumentName,r);n=new M({layerArg:p,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Te.switchable){p=this._getCaseInsensitiveArg(e.argumentName,r);var m=this._parseSwitchableDomainArguments(e.attributes,r);n=new B({attributes:m,value:a},i)}else if(s===Te.linearUnit)u=ve.getEnumData(be[e.enum]),g=new c(new l({idProperty:"key",data:u})),n=new q({enumStore:g,value:a},i);else if(s===Te.rasterDimensions){p=this._getCaseInsensitiveArg(e.argumentName,r);n=new Z({layerArg:p,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Te.rasterVariables){p=this._getCaseInsensitiveArg(e.argumentName,r);n=new ie({layerArg:p,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Te.mdimdef){p=this._getCaseInsensitiveArg(e.argumentName,r);n=new K({layerArg:p,otherOptions:e.otherOptions,defaultValue:a},i)}else if(s===Te.aggregationdef){var v=(p=this._getCaseInsensitiveArg(e.argumentName,r)).function.customFunction;p.type&&"RasterFunctionTemplate"===p.type&&"MultidimensionalFilterFunction"===p.function.type&&((p=p.arguments.Raster).customFunction=v),t.uxBlocks&&t.uxBlocks[0]&&(t.uxBlocks[0].style.display="none"),p.input?n=new C({layerArg:p,otherOptions:e.otherOptions,defaultValue:a},i):p.uxBlocks=void 0}return n}},_parseSwitchableDomainArguments:function(e,t){return e.forEach((function(e){if("field"===e.type)e.argumentName=this._getCaseInsensitiveArg(e.argumentName,t);else if(e.type===Te.list||e.type===Te.linearUnit){var r=ve.getEnumData(be[e.enum]);e.enumStore=new c(new l({idProperty:"key",data:r}))}}),this),e},_getDataTypeAttributeBasedWidget:function(e,t,r,i,a){var n=this._getCaseInsensitiveArg(t.nBands,i);return new k({nBandsArg:n,nCols:t.cols,displayNames:t.displayNames,value:r.value},a)},_getFormattedValueFromVariable:function(e){if(e){var t=ve.getArgRFT(e);return t?"<"+(t.function&&t.function.name)+"."+this._i18n.outputRaster+">":"<"+n.widgets.rasterFunctionEditor.rfxRasterInput.rfxVariable+": "+e.name+">"}},_getRasterArrayInputArgs:function(e,t){var i,a=this._getCaseInsensitiveArg(e.nElementsArgument,t),n=a&&a.value,s=e.elementInfos;return void 0!==a&&void 0!==n||1!==s.length?(r.some(s,(function(e){var t=e.values;if(r.indexOf(t,n)>-1)return i=e.inputArgs,!0}),this),i):s[0].inputArgs},_getNumListData:function(e){if(e){for(var t=[],r=e.start,i=0;i<e.count;r+=e.inc,i++)t.push({key:r.toString()});return t}},_onArgumentValueChange:function(e,r,i,a){var n=e&&e.input;n instanceof F&&r&&r.dataType===we.long&&(a=parseInt(a,10)),n instanceof F&&r&&r.dataType===we.boolean&&(a="true"===a),n&&n.declaredClass.indexOf("RFxRasterInput")>=0&&this._handleRasterValueChange(e,i),n&&n.declaredClass.indexOf("RFxFeatureSelect")>=0&&this._handleFeatureValueChange(e,i),this._handleEditorStateTriggers(i,a,r),this._handleEditorValueTriggers(i,a,r),setTimeout(t.hitch(this,(function(){this._started=!0,this.emit("update-preview")})),1e3)},_handleRasterValueChange:function(e,t){var r=["RFxAggregationDefinitionEditor","RFxMultidimensionalDefinitionEditor","RFxRasterVariableGrid","RFxRasterDimensionSelect","RFxFieldSelect","RFxFieldNumberSwitchable"];Object.keys(t).forEach((function(i){var a,n=t[i]&&t[i].input;n&&(a=n,r.some((function(e){return a.declaredClass.indexOf(e)>-1})))&&n.layerArg&&n.layerArg.name===e.name&&n.onRasterChange()}))},_handleFeatureValueChange:function(e,t){Object.keys(t).forEach((function(r){var i=t[r]&&t[r].input;i&&i.layerArg&&i.layerArg.name===e.name&&i.onFeatureChange()}))},_getRFxNameAndCategoryRefIdRelation:function(e){var t=this._getWidgetName(e),r={};return Object.keys(e).forEach((function(e){var i=Re[t],a=i&&i.rasterFunctionArguments&&i.rasterFunctionArguments[e],n=a&&a.categoryRefId;void 0!==n&&(r[n]?r[n].push(e):r[n]=[e])}),this),r},_handleCategoryVisibility:function(e,t,i){Object.keys(e).forEach((function(a){var n=e[a],o=r.every(n,(function(e){return r.some(t,(function(t){return t.rfxArgName===e&&"inactive"===t.state}),this)}),this),u=d("."+a+"-category"),l="block";o?(u||(u=d("."+a+"-category",i)),l="none"):l="block",u&&r.forEach(u,(function(e){s.set(e,"display",l)}),this)}),this)},_getWidgetName:function(e){return e.ToolName?e.ToolName.value.replace("_sa",""):e.type.replace("Arguments","")},_getActiveStateTriggers:function(e,t,i){var a=this._getWidgetName(e),n=[];return r.forEach(Object.keys(e),(function(s){var o=Re[a],u=o&&o.rasterFunctionArguments&&o.rasterFunctionArguments[s],l=e[s].input,c=e[s].value||l&&l.value;u&&"boolean"===u.dataType&&l&&"checkbox"===l.type&&(c=l.checked),u&&u.domain&&"long"===u.dataType&&l&&"text"===l.type&&(c=l&&l.value);var g=i.key===s?t:c;("boolean"==typeof g||isNaN(g)||(g=Number(g)),u&&u.editorStateTrigger&&u.editorStateTrigger.active&&e)&&(Array.isArray(u.editorStateTrigger.triggers)&&r.forEach(u.editorStateTrigger.triggers,(function(t){var i,o,u,l,c,d,h,f=t.autoRevert||!1;((o=t.checkValuePresent?!!g:Array.isArray(t.values)&&r.indexOf(t.values,g)>=0)||f)&&r.forEach(Object.keys(e),(function(r){if(r!==s){var g=Re[a],p=g&&g.rasterFunctionArguments&&g.rasterFunctionArguments[r],m=p&&p.categoryRefId;i=e[r],c=i.uxBlocks,i.input,c&&Array.isArray(c)&&(u=this._containsArgName(t.active,r),l=this._containsArgName(t.inactive,r),d=l&&o||u&&!o&&f,(u&&o||l&&!o&&f)&&(h=c&&c[0]&&"TR"===c[0].tagName?"table-row":"block",n.push({state:"active",rfxArgName:r,display:h,category:m})),d&&(h="none",n.push({state:"inactive",rfxArgName:r,display:h,category:m})))}}),this)}),this))}),this),n},_handleEditorStateTriggers:function(e,t,i,a){if(i&&i.editorStateTrigger&&i.editorStateTrigger.active&&e){var n,o,u,l,c=this._getActiveStateTriggers(e,t,i);c=r.filter(c,(function(e,t,i){return!r.some(i,(function(r,i){return i>t&&r.rfxArgName===e.rfxArgName&&r.state===e.state}))&&(!r.some(i,(function(r,i){return i!==t&&r.rfxArgName===e.rfxArgName&&r.state!==e.state}))||"active"!==e.state)}),this),r.forEach(c,(function(t){n=t.rfxArgName,o=e[n],u=o.uxBlocks,l=o.input,"active"===t.state&&l&&l.onChange&&i.key&&i.key.toLowerCase()!==n.toLowerCase()&&l.onChange(l.value),r.forEach(u,(function(e){e&&t.display&&s.set(e,"display",t.display)}),this)}),this);var g=this._getRFxNameAndCategoryRefIdRelation(e);this._handleCategoryVisibility(g,c,a)}},_handleEditorValueTriggers:function(e,t,i){i&&i.editorValueTrigger&&i.editorValueTrigger.active&&e&&r.forEach(i.editorValueTrigger.triggers,(function(i){var a,n,s;r.indexOf(i.values,t)>=0&&Object.keys(e).forEach((function(t){a=e[t],(n=a.input)&&(s=this._getTriggerArgValue(i.changedArgs,t),h.isDefined(s)&&n.set("value",s))}),this)}),this)},_getTriggerArgValue:function(e,t){var i;return r.some(e,(function(e){for(var r in e)if(e.hasOwnProperty(r)&&r.toLowerCase()===t.toLowerCase())return i=e[r],!0})),i},_containsArgName:function(e,t){if(!e||!t)return!1;var i=t.toLowerCase();return r.some(e,(function(e){return e.toLowerCase()===i}))},_getArgumentValue:function(e,i){if(e){var a,n,s,o=[],u=e.input,l=i&&i.dataType;if(!u){if(l===we.rasterArray&&e.value){var c=e.value.elements;r.forEach(c,(function(e,r){t.mixin(c[r].value,ve.getRasterJsonFromLayer(e.value))}))}return e.value}var d=[R,F,A],h=[x],f=[S,k,Y,ue,te,N,O,P,re,j,se,B,M,Z,ie,K,C,q,Q,oe,ce];if(p([Ae]))return ve.getRFxArgColorRampValue(u.colorRamp);if(p(f))return u.get("value");if(p(d))switch(a=u.value,l&&l.indexOf("array")>=0&&a&&"string"==typeof a&&(a=a.trim(),o=a.indexOf(",")>=0?a.split(","):a.split(" ")),l&&l===we.boolean&&"string"==typeof a&&(a="true"===u.value),l){case we.raster:if(!e.isDataset)return{value:a,type:"Scalar"};break;case we.longArray:return r.forEach(o,(function(e,t){o[t]=parseInt(e,10)})),o;case we.doubleArray:return r.forEach(o,(function(e,t){o[t]=parseFloat(e)})),o;case we.stringArray:case we.rasterArray:return r.forEach(o,(function(e,t){o[t]=e.trim()})),o;case we.long:return parseInt(a,10);case we.cellSize:try{return g.parse(a)}catch(e){return a}return a;case void 0:return a=a&&a.trim(),n=/^[+-]?(\d+)?(\.\d+)?$/.test(a),s=r.indexOf(["true","false"],a)>=0,n?parseFloat(a):s?"true"===a:a;default:return a}else if(p(h))return u.checked}function p(e){return r.some(e,(function(e){if(u instanceof e)return!0}))}},_getCaseInsensitiveArg:function(e,t){if(e&&t)return r.some(Object.keys(t),(function(t){if(t.toLowerCase()===e.toLowerCase())return e=t,!0})),t[e]},_selectInputDataset:function(e,t){if(e&&e.options.length&&t){var i=t,a=null;"object"==typeof t&&(i=t.url,a=t.name);var n=h.isDefined(a);r.forEach(e.options,(function(e){e.selected=e.item.url===i&&(!n||n&&a===e.item.name)}),this)}}});return i("extend-esri")&&t.setObject("dijit.RasterFunctionEditor.RFxArgsEditor",We,f),We}));