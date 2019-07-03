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

/**
 * The CSVLayer is a point layer based on a CSV file (.csv, .txt). CSV is a plain-text file format used to represent tabular data,
 * including geographic point features (latitude, longitude). Typically the latitude coordinate is the Y value, and the
 * longitude coordinate is the X value. Features from the CSV file are accessible via the API so you can query
 * features and use them as input to geometry or geoprocessing services.
 *
 * If CSV files are not on the same domain as your website, a [CORS enabled server](https://enable-cors.org/server.html) or a proxy is
 * required. The following snippet shows how to add a new CSVLayer instance to a map.
 *
 * ```js
 * var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_week.csv";
 *
 * var csvLayer = new CSVLayer({
 *  url: url,
 *  copyright: "USGS Earthquakes"
 * });
 * map.add(csvLayer);  // adds the layer to the map
 * ```
 *
 * @module esri/layers/CSVLayer
 * @since 4.1
 * @see [Sample - CSVLayer](../sample-code/layers-csv/index.html)
 * @see module:esri/Map
 */

//  copyright

/**
             * Copyright information for the layer.
             *
             * @name copyright
             * @instance
             * @memberof module:esri/layers/CSVLayer
             * @type {string}
             */

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","../core/tsSupport/paramHelper","../core/tsSupport/awaiterHelper","../core/tsSupport/generatorHelper","../geometry","../core/urlUtils","../core/accessorSupport/decorators","./FeatureLayer","./graphics/data/QueryEngineCapabilities","./graphics/sources/CSVSource","../tasks/support/Query"],function(e,t,r,o,i,n,p,a,s,l,u,d,y,c,f){return function(e){function t(t,r){var o=e.call(this)||this;return o.delimiter=null,o.fields=null,o.latitudeField=null,o.locationType="coordinates",o.longitudeField=null,o.operationalLayerType="CSV",o.outFields=["*"],o.path=null,o.portalItem=null,o.spatialReference=s.SpatialReference.WGS84,o.source=null,o.type="csv",o}return r(t,e),t.prototype.normalizeCtorArgs=function(e,t){return"string"==typeof e?i({url:e},t):e},Object.defineProperty(t.prototype,"capabilities",{get:function(){return{data:{supportsAttachment:!1,supportsM:!1,supportsZ:!1},operations:{supportsCalculate:!1,supportsTruncate:!1,supportsValidateSql:!1,supportsAdd:!1,supportsDelete:!1,supportsEditing:!1,supportsQuery:!0,supportsResizeAttachments:!1,supportsUpdate:!1},query:y.queryCapabilities,queryRelated:{supportsCount:!1,supportsOrderBy:!1,supportsPagination:!1},editing:{supportsGeometryUpdate:!1,supportsGlobalId:!1,supportsRollbackOnFailure:!1,supportsUpdateWithoutM:!1,supportsUploadWithItemId:!1,supportsDeleteByAnonymous:!1,supportsDeleteByOthers:!1,supportsUpdateByAnonymous:!1,supportsUpdateByOthers:!1}}},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"hasService",{get:function(){return!1},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"isTable",{get:function(){return this.loaded&&null==this.geometryType},enumerable:!0,configurable:!0}),t.prototype.readWebMapLabelsVisible=function(e,t){return null!=t.showLabels?t.showLabels:!!(t.layerDefinition&&t.layerDefinition.drawingInfo&&t.layerDefinition.drawingInfo.labelingInfo)},Object.defineProperty(t.prototype,"url",{set:function(e){this._set("url",e)},enumerable:!0,configurable:!0}),t.prototype.createGraphicsSource=function(e){return p(this,void 0,void 0,function(){var t;return a(this,function(r){switch(r.label){case 0:return t=new c.default({delimiter:this.delimiter,fields:this.fields,latitudeField:this.latitudeField,longitudeField:this.longitudeField,spatialReference:this.spatialReference,timeInfo:this.timeInfo,url:this.url}),this._set("source",t),[4,t.load({signal:e})];case 1:return r.sent(),this.read({locationInfo:t.locationInfo,columnDelimiter:t.columnDelimiter},{origin:"service",url:this.parsedUrl}),[2,t]}})})},t.prototype.queryFeatures=function(e,t){var r=this;return this.load().then(function(){return r.source.queryFeatures(f.from(e)||r.createQuery())}).then(function(e){if(e&&e.features)for(var t=0,o=e.features;t<o.length;t++){var i=o[t];i.layer=i.sourceLayer=r}return e})},t.prototype.queryObjectIds=function(e,t){var r=this;return this.load().then(function(){return r.source.queryObjectIds(f.from(e)||r.createQuery())})},t.prototype.queryFeatureCount=function(e,t){var r=this;return this.load().then(function(){return r.source.queryFeatureCount(f.from(e)||r.createQuery())})},t.prototype.queryExtent=function(e,t){var r=this;return this.load().then(function(){return r.source.queryExtent(f.from(e)||r.createQuery())})},t.prototype._verifyFields=function(){},t.prototype._verifySource=function(){},t.prototype._hasMemorySource=function(){return!0},o([u.property({readOnly:!0,dependsOn:["loaded"],json:{read:!1,write:!1}})],t.prototype,"capabilities",null),o([u.property({type:[","," ",";","|","\t"],json:{read:{source:"columnDelimiter"},write:{target:"columnDelimiter",ignoreOrigin:!0}}})],t.prototype,"delimiter",void 0),o([u.property({json:{read:{source:"layerDefinition.fields"},write:{target:"layerDefinition.fields"}}})],t.prototype,"fields",void 0),o([u.property({readOnly:!0})],t.prototype,"hasService",null),o([u.property({type:Boolean,readOnly:!0,dependsOn:["loaded"]})],t.prototype,"isTable",null),o([u.reader("web-map","labelsVisible",["layerDefinition.drawingInfo.labelingInfo","showLabels"])],t.prototype,"readWebMapLabelsVisible",null),o([u.property({type:String,json:{read:{source:"locationInfo.latitudeFieldName"},write:{target:"locationInfo.latitudeFieldName",ignoreOrigin:!0}}})],t.prototype,"latitudeField",void 0),o([u.property({type:["show","hide"]})],t.prototype,"listMode",void 0),o([u.property({type:String,json:{read:{source:"locationInfo.locationType"},write:{target:"locationInfo.locationType",ignoreOrigin:!0,isRequired:!0}}})],t.prototype,"locationType",void 0),o([u.property({type:String,json:{read:{source:"locationInfo.longitudeFieldName"},write:{target:"locationInfo.longitudeFieldName",ignoreOrigin:!0}}})],t.prototype,"longitudeField",void 0),o([u.property({type:["CSV"]})],t.prototype,"operationalLayerType",void 0),o([u.property()],t.prototype,"outFields",void 0),o([u.property({type:String,json:{origins:{"web-scene":{read:!1,write:!1}},read:!1,write:!1}})],t.prototype,"path",void 0),o([u.property({json:{read:!1,write:!1}})],t.prototype,"portalItem",void 0),o([u.property({json:{read:!1},cast:null,type:c.default,readOnly:!0})],t.prototype,"source",void 0),o([u.property({json:{read:!1},value:"csv",readOnly:!0})],t.prototype,"type",void 0),o([u.property({json:{read:l.read,write:l.write}})],t.prototype,"url",null),t=o([u.subclass("esri.layers.CSVLayer")],t)}(u.declared(d))});