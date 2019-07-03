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

define(["require","exports","./core/tsSupport/assignHelper","./core/tsSupport/declareExtendsHelper","./core/tsSupport/decorateHelper","./core/tsSupport/generatorHelper","./core/tsSupport/awaiterHelper","./kernel","./Map","./Viewpoint","./core/asyncUtils","./core/Collection","./core/Error","./core/JSONSupport","./core/Loadable","./core/loadAll","./core/Logger","./core/promiseUtils","./core/accessorSupport/decorators","./geometry/SpatialReference","./geometry/support/webMercatorUtils","./portal/Portal","./portal/PortalItem","./tasks/support/ProjectParameters","./webdoc/RangeInfo","./webdoc/Widgets","./webmap/ApplicationProperties","./webmap/Bookmark","./webmap/InitialViewProperties","./webmap/Version","./webmap/background/ColorBackground","@dojo/framework/shim/Promise"],function(e,r,t,o,i,n,a,p,l,s,u,c,d,f,w,y,h,m,g,b,v,I,S,V,P,A,N,R,O,k,J){var j=new k.default(2,13),_=c.ofType(R),F=h.getLogger("esri.WebMap");return function(r){function l(e){var t=r.call(this)||this;return t.applicationProperties=null,t.authoringApp=null,t.authoringAppVersion=null,t.bookmarks=new _,t.initialViewProperties=new O,t.portalItem=null,t.presentation=null,t.sourceVersion=null,t.tables=null,t.widgets=null,t}return o(l,r),l.prototype.initialize=function(){if(this.when().catch(function(e){F.error("#load()","Failed to load web map",e)}),this.resourceInfo){var e=void 0;try{e=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(m.reject(e))}this.read(e)}},l.prototype.writeAuthoringApp=function(e,r){r.authoringApp=e||"ArcGIS API for JavaScript"},l.prototype.writeAuthoringAppVersion=function(e,r){r.authoringAppVersion=e||p.version},l.prototype.readInitialViewProperties=function(e,r){var t=new O;return r.background&&(t.background=J.fromJSON(r.background)),r.mapRangeInfo&&(t.rangeInfo=P.fromJSON(r.mapRangeInfo)),r.spatialReference&&(t.spatialReference=b.fromJSON(r.spatialReference)),t},l.prototype.writeInitialViewProperties=function(e,r,t,o){if(e){var i=e.background;i&&i.color&&(r.background=i.write(null,o)),e.rangeInfo&&(r.mapRangeInfo=e.rangeInfo.toJSON(o)),e.spatialReference&&(r.spatialReference=e.spatialReference.write(null,o))}},l.prototype.readSourceVersion=function(e,r){var t=r.version.split("."),o=t[0],i=t[1];return new k.default(parseInt(o,10),parseInt(i,10))},l.prototype.writeSourceVersion=function(e,r,t){r[t]=j.major+"."+j.minor},l.prototype.load=function(e){return this.addResolvingPromise(this._loadFromSource()),this.when()},l.prototype.loadAll=function(){var e=this;return u.safeCast(y.loadAll(this,function(r){r(e.ground,e.basemap,e.layers)}))},l.prototype.write=function(e,r){if("loaded"!==this.loadStatus){var o=new d("webmap:not-loaded","Web map must be loaded before it can be serialized");throw F.error("#toJSON()","Web map must be loaded before it can be serialized",this.loadError||this.loadStatus),o}return r=t({},r,{origin:"web-map"}),this.inherited(arguments,[e,r])},l.prototype._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-map"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):m.resolve(null)},l.prototype._loadFromItem=function(e){var r=this;return e.load().catch(function(e){throw new d("webmap:load-portal-item","Failed to load portal item",{error:e})}).then(function(){if("Web Map"!==e.type)throw new d("webmap:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Map'",{type:e.type})}).then(function(){return e.fetchData()}).then(function(t){return r.resourceInfo=t,r._readAndLoadFromJSON(t,{origin:"web-map",portal:e.portal||I.getDefault()})}).then(function(){return u.safeCast(r._getInitialExtent())}).then(function(e){if(e){var t=r.initialViewProperties?r.initialViewProperties.clone():new O;t.viewpoint=new s,t.viewpoint.targetGeometry=e,r.initialViewProperties=t}})},l.prototype._readAndLoadFromJSON=function(e,r){var t=this._validateJSON(e);return this.read(t,r),this._loadFromJSON(t,r)},l.prototype._validateJSON=function(e){var r=k.default.parse(e.version||"","webmap");return j.validate(r),e.version=r.major+"."+r.minor,e},l.prototype._loadFromJSON=function(r,o){var i=this,n={context:t({},o,{layerContainerType:"operational-layers"})};return this.portalItem&&(n.context.portal=this.portalItem.portal||I.getDefault()),m.create(function(r){return e(["./portal/support/layersCreator"],r)}).then(function(e){var t=[],o=r.operationalLayers;return o&&o.length&&t.push(u.safeCast(e.populateOperationalLayers(i.layers,o,n))),m.eachAlways(t).then(function(){})})},l.prototype._getInitialExtent=function(){return a(this,void 0,void 0,function(){var r,t,o;return n(this,function(i){switch(i.label){case 0:return r=this.initialViewProperties&&this.initialViewProperties.spatialReference,t=this.portalItem&&this.portalItem.extent,r&&t?r.isWGS84?[2,t.clone()]:r.isWebMercator?[2,v.geographicToWebMercator(t)]:[4,new Promise(function(r,t){e(["./portal/support/geometryServiceUtils"],r,t)})]:[3,2];case 1:return o=i.sent(),[2,u.safeCast(o.create(this.portalItem)).then(function(e){var o=new V;return o.geometries=[t],o.outSpatialReference=r,e.project(o)}).then(function(e){return e[0]}).catch(function(e){return F.error("Error projecting item's extent:",e),null})];case 2:return[2,null]}})})},l.fromJSON=function(e){var r=e;if(!r)throw new d("webmap:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:r})},l.VERSION=j,i([g.property({type:N,json:{write:!0}})],l.prototype,"applicationProperties",void 0),i([g.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringApp",void 0),i([g.writer("authoringApp")],l.prototype,"writeAuthoringApp",null),i([g.property({type:String,json:{write:{allowNull:!0}}})],l.prototype,"authoringAppVersion",void 0),i([g.writer("authoringAppVersion")],l.prototype,"writeAuthoringAppVersion",null),i([g.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],l.prototype,"basemap",void 0),i([g.property({type:_,json:{write:{overridePolicy:function(e){return{enabled:!!(e&&e.length>0)}}}}})],l.prototype,"bookmarks",void 0),i([g.property({type:O,nonNullable:!0,json:{read:{source:["background","mapRangeInfo","spatialReference"]},write:{target:{background:{type:J},mapRangeInfo:{type:P},spatialReference:{type:b}}}}})],l.prototype,"initialViewProperties",void 0),i([g.reader("initialViewProperties")],l.prototype,"readInitialViewProperties",null),i([g.writer("initialViewProperties")],l.prototype,"writeInitialViewProperties",null),i([g.property({type:S})],l.prototype,"portalItem",void 0),i([g.property({json:{write:!0}})],l.prototype,"presentation",void 0),i([g.property()],l.prototype,"resourceInfo",void 0),i([g.property({readOnly:!0,type:k.default,json:{read:{source:"version"},write:{allowNull:!0,target:"version",isRequired:!0}}})],l.prototype,"sourceVersion",void 0),i([g.reader("sourceVersion")],l.prototype,"readSourceVersion",null),i([g.writer("sourceVersion")],l.prototype,"writeSourceVersion",null),i([g.property()],l.prototype,"tables",void 0),i([g.property({type:A,json:{write:!0}})],l.prototype,"widgets",void 0),l=i([g.subclass("esri.WebMap")],l)}(g.declared(l,w,f))});