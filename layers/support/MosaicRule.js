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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/jsonMap","../../core/JSONSupport","../../core/lang","../../core/accessorSupport/decorators","../../geometry/Point","./DimensionalDefinition","./RasterFunction"],function(e,t,r,o,i,n,s,a,p,c,l){function d(e){var t;switch(e?e.toLowerCase().replace("esrimosaic",""):""){case"byattribute":t="esriMosaicAttribute";break;case"lockraster":t="esriMosaicLockRaster";break;case"center":t="esriMosaicCenter";break;case"northwest":t="esriMosaicNorthwest";break;case"nadir":t="esriMosaicNadir";break;case"viewpoint":t="esriMosaicViewpoint";break;case"seamline":t="esriMosaicSeamline";break;case"none":default:t="esriMosaicNone"}return y.fromJSON(t)}var u=i.strict()({MT_FIRST:"first",MT_LAST:"last",MT_MIN:"min",MT_MAX:"max",MT_MEAN:"mean",MT_BLEND:"blend",MT_SUM:"sum"}),y=i.strict()({esriMosaicNone:"none",esriMosaicCenter:"center",esriMosaicNadir:"nadir",esriMosaicViewpoint:"viewpoint",esriMosaicAttribute:"attribute",esriMosaicLockRaster:"lock-raster",esriMosaicNorthwest:"northwest",esriMosaicSeamline:"seamline"});return function(e){function t(t){var r=e.call(this)||this;return r.ascending=!0,r.itemRenderingRule=null,r.lockRasterIds=null,r.method=null,r.multidimensionalDefinition=null,r.objectIds=null,r.operation=null,r.sortField=null,r.sortValue=null,r.viewpoint=null,r.where=null,r}r(t,e),i=t,t.prototype.readMethod=function(e,t){return d(t.mosaicMethod||t.defaultMosaicMethod)},t.prototype.readOperation=function(e,t){var r=t.mosaicOperation,o=t.mosaicOperator&&t.mosaicOperator.toLowerCase(),i=r||(o?u.toJSON(o):null);return u.fromJSON(i)||"first"},t.prototype.castSortValue=function(e){return null==e||"string"==typeof e||"number"==typeof e?e:""+e},t.prototype.clone=function(){return new i({ascending:this.ascending,itemRenderingRule:s.clone(this.itemRenderingRule),lockRasterIds:s.clone(this.lockRasterIds),method:this.method,multidimensionalDefinition:s.clone(this.multidimensionalDefinition),objectIds:s.clone(this.objectIds),operation:this.operation,sortField:this.sortField,sortValue:this.sortValue,viewpoint:s.clone(this.viewpoint),where:this.where})};var i;return o([a.property({type:Boolean,json:{write:!0}})],t.prototype,"ascending",void 0),o([a.property({type:l,json:{write:!0}})],t.prototype,"itemRenderingRule",void 0),o([a.property({type:[Number],json:{write:{overridePolicy:function(){return{enabled:"lock-raster"===this.method}}}}})],t.prototype,"lockRasterIds",void 0),o([a.property({type:String,json:{type:y.jsonValues,write:{target:"mosaicMethod",writer:y.write}}})],t.prototype,"method",void 0),o([a.reader("method",["mosaicMethod","defaultMosaicMethod"])],t.prototype,"readMethod",null),o([a.property({type:[c],json:{write:!0}})],t.prototype,"multidimensionalDefinition",void 0),o([a.property({type:[Number],json:{read:{source:"fids"},write:{target:"fids"}}})],t.prototype,"objectIds",void 0),o([a.property({json:{type:u.jsonValues,read:{reader:u.read},write:{target:"mosaicOperation",writer:u.write}}})],t.prototype,"operation",void 0),o([a.reader("operation",["mosaicOperation","mosaicOperator"])],t.prototype,"readOperation",null),o([a.property({type:String,json:{write:{overridePolicy:function(){return{enabled:"attribute"===this.method}}}}})],t.prototype,"sortField",void 0),o([a.property({type:[String,Number],json:{write:{overridePolicy:function(){return{enabled:"attribute"===this.method}}}}})],t.prototype,"sortValue",void 0),o([a.cast("sortValue")],t.prototype,"castSortValue",null),o([a.property({type:p,json:{write:!0}})],t.prototype,"viewpoint",void 0),o([a.property({type:String,json:{write:!0}})],t.prototype,"where",void 0),t=i=o([a.subclass("esri.layers.support.MosaicRule")],t)}(a.declared(n))});