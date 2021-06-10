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

define(["dojo/_base/declare","dojo/_base/lang","dojo/Deferred","dojo/when","dojo/promise/all","../geometry/jsonUtils","./core/messageHandler","./core/errorMessages","./core/ExtensionBase","./FeatureActionFeatures"],(function(t,e,i,a,r,o,n,s,u,c){return t([u],{hasFeatureActions:!1,hasDefaultFeatureAction:!1,featureActionFeatures:null,dataSourceConfigs:null,dataSourceProxies:null,_initializeResponseReceived:function(t){return t&&"object"==typeof t||(new i).reject(new Error(s.invalidArguments)),this.inherited(arguments).then(e.hitch(this,(function(){this.hasFeatureActions=t.supportFeatureActions,this.hasDefaultFeatureAction=t.supportDefaultFeatureAction;var e=a(this._setupMapWidgetProxy()),i=a(this._setupDataSourceProxies()),o=a(this._setupFeatureActionFeatures());return r([e,i,o])})))},_setupDataSourceProxies:function(){if(this.dataSourceConfigs||(this.dataSourceConfigs=[]),0!==this.dataSourceConfigs.length){var t=[];return this.dataSourceConfigs.forEach(e.hitch(this,(function(e){t.push(this.getDataSourceProxy(e.dataSourceId))}))),r(t).then(e.hitch(this,(function(t){this.dataSourceProxies=t})))}},_setupMapWidgetProxy:function(){if(this.mapWidgetId)return this.getMapWidgetProxy(this.mapWidgetId).then(e.hitch(this,(function(t){this.mapWidgetProxy=t})))},_setupFeatureActionFeatures:function(){if(this.hasFeatureActions&&0!==this.dataSourceConfigs.length){var t=this.dataSourceConfigs[0].dataSourceId;if(!this.featureActionFeatures)return this.getDataSourceProxy(t).then(e.hitch(this,(function(t){this.featureActionFeatures=new c(t)})));this.featureActionFeatures.dataSourceProxy.id!==t&&(this.featureActionFeatures=null)}else this.featureActionFeatures=null},_messageReceived:function(t){switch(t.functionName.toLowerCase()){case"datasourceexpired":case"datasourceupdated":return void this._dataSourceExpired(t.args.dataSourceId);case"drawcomplete":return void this._drawComplete(t.args)}},_dataSourceExpired:function(t){this.getDataSourceProxy(t).then(e.hitch(this,(function(t){var e=this.getDataSourceConfig(t);this.dataSourceExpired(t,e),this.emit("data-source-expired",{dataSourceProxy:t,dataSourceConfig:e})})))},dataSourceExpired:function(t,e){},getDataSourceConfig:function(t){if(!this._isHostInitialized())throw new Error(s.hostNotReady);var e=t;"object"==typeof t&&(e=t.id);for(var i=0;i<this.dataSourceConfigs.length;i++)if(this.dataSourceConfigs[i].dataSourceId===e)return this.dataSourceConfigs[i];return null},_dataSourceRemoved:function(t){if(this.inherited(arguments),this.dataSourceConfigs){for(var e=!1,i=0;i<this.dataSourceConfigs.length&&!e;i++)this.dataSourceConfigs[i].dataSourceId===t&&(this.dataSourceConfigs.splice(i,1),e=!0);e&&this._setupFeatureActionFeatures()}},_mapWidgetRemoved:function(t){this.inherited(arguments),this.mapWidgetProxy&&this.mapWidgetProxy.id===t&&(this.mapWidgetProxy=null,this.mapWidgetId=null)},activateDrawingToolbar:function(t,a){if(!this._isHostInitialized())return(new i).reject(new Error(s.hostNotReady));if(a||(a=this.mapWidgetProxy),!a)return(new i).reject(new Error(s.invalidArguments));var r=a;return"object"==typeof a&&(r=a.id),n._sendMessageWithReply({functionName:"activateDrawingToolbar",args:e.mixin({mapWidgetId:r},t)}).then((function(){return!0}),(function(){return!1}))},deactivateDrawingToolbar:function(t){if(!this._isHostInitialized())throw new Error(s.hostNotReady);if(t||(t=this.mapWidgetProxy),!t)throw new Error(s.invalidArguments);var e=t;"object"==typeof t&&(e=t.id),n._sendMessage({functionName:"deactivateDrawingToolbar",args:{mapWidgetId:e}})},_drawComplete:function(t){if(t.cancelled)return this.drawingToolbarDeactivated(),void this.emit("drawing-toolbar-deactivated");var e=o.fromJson(t.geometry);this.toolbarDrawComplete(e),this.emit("toolbar-draw-complete",{geometry:e})},toolbarDrawComplete:function(t){},drawingToolbarDeactivated:function(){},executeDefaultFeatureAction:function(t){if(!this._isHostInitialized())throw new Error(s.hostNotReady);if(this.hasDefaultFeatureAction&&Array.isArray(t)&&0!==t.length&&Array.isArray(this.dataSourceProxies)&&0!==this.dataSourceProxies.length){var e=this.dataSourceProxies[0],i=[];t.forEach((function(t){var a=t;if("object"==typeof t){if(!t.attributes||!t.attributes[e.objectIdFieldName])return;a=t.attributes[e.objectIdFieldName]}i.push(a)})),0!==i.length&&n._sendMessage({functionName:"executeDefaultFeatureAction",args:{dataSourceId:e.id,objectIds:i}})}}})}));