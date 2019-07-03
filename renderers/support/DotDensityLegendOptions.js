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

define(["require","exports","../../core/tsSupport/decorateHelper","../../core/tsSupport/declareExtendsHelper","../../core/JSONSupport","../../core/accessorSupport/decorators"],function(e,r,t,n,o,p){return function(e){function r(){var r=null!==e&&e.apply(this,arguments)||this;return r.unit=null,r}n(r,e),o=r,r.prototype.clone=function(){return new o({unit:this.unit})};var o;return t([p.property({type:String,json:{write:!0}})],r.prototype,"unit",void 0),r=o=t([p.subclass("esri.renderers.support.DotDensityLegendOptions")],r)}(p.declared(o))});