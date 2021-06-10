/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../core/promiseUtils","../../../geometry/Geometry","../../../Graphic","../../../layers/support/Field","../support/shared","../support/IdSet","../support/sqlUtils","../support/FeatureSet","../../../layers/support/FeatureType","../../../tasks/support/Query","../../../layers/FeatureLayer"],(function(e,t,r,i,s,n,a,l,o,u,c,h){"use strict";return function(o){function f(e){var t;return(t=o.call(this,e)||this).declaredClass="esri.arcade.featureset.sources.FeatureLayerMemory",t._removeGeometry=!1,t._overrideFields=null,t._forceIsTable=!1,e.spatialReference&&(t.spatialReference=e.spatialReference),t._transparent=!0,t._maxProcessing=1e3,t._layer=e.layer,t._wset=null,!0===e.isTable&&(t._forceIsTable=!0),void 0!==e.outFields&&(t._overrideFields=e.outFields),void 0!==e.includeGeometry&&(t._removeGeometry=!1===e.includeGeometry),t}e._inheritsLoose(f,o);var d=f.prototype;return d._maxQueryRate=function(){return n.defaultMaxRecords},d.end=function(){return this._layer},d.optimisePagingFeatureQueries=function(){},d.load=function(){return null===this._loadPromise&&(this._loadPromise=t.create(((e,t)=>{if(!0===this._layer.loaded)return this._initialiseFeatureSet(),void e(this);this._layer.when().then((()=>{try{this._initialiseFeatureSet(),e(this)}catch(r){t(r)}}),t),this._layer.load()}))),this._loadPromise},d._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,this.fields=this._layer.fields.slice(0),this._layer.outFields)if(1===this._layer.outFields.length&&"*"===this._layer.outFields[0]);else{const e=[];for(const t of this.fields)if("oid"===t.type)e.push(t);else for(const r of this._layer.outFields)if(r.toLowerCase()===t.name.toLowerCase()){e.push(t);break}this.fields=e}else;if(null!==this._overrideFields)if(1===this._overrideFields.length&&"*"===this._overrideFields[0])this._overrideFields=null;else{const e=[],t=[];for(const r of this.fields)if("oid"===r.type)e.push(r),t.push(r.name);else for(const i of this._overrideFields)if(i.toLowerCase()===r.name.toLowerCase()){e.push(r),t.push(r.name);break}this.fields=e,this._overrideFields=t}this.objectIdField=this._layer.objectIdField;for(const e of this.fields)"global-id"===e.type&&(this.globalIdField=e.name);this.hasM=this._layer.supportsM,this.hasZ=this._layer.supportsZ,this._databaseType=n.FeatureServiceDatabaseType.Standardised,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},d.isTable=function(){return this._forceIsTable||this._layer.isTable||"table"===this._layer.type||!this._layer.geometryType},d._isInFeatureSet=function(){return n.IdState.InFeatureSet},d._candidateIdTransform=function(e){return e},d._getSet=function(e){return null===this._wset?this._ensureLoaded().then((()=>this._getFilteredSet("",null,null,null,e))).then((e=>(this._wset=e,e))):t.resolve(this._wset)},d._changeFeature=function(e){const t={};for(const r of this.fields)t[r.name]=e.attributes[r.name];return new i({geometry:!0===this._removeGeometry?null:e.geometry,attributes:t})},d._getFilteredSet=function(e,r,i,s,o){let u="",h=!1;if(null!==s&&(u=s.constructClause(),h=!0),this.isTable()&&r&&null!==e&&""!==e){const e=new a([],[],!0,null);return t.resolve(e)}const f=new c;return f.where=null===i?null===r?"1=1":"":l.toWhereClause(i,n.FeatureServiceDatabaseType.Standardised),f.spatialRelationship=this._makeRelationshipEnum(e),f.outSpatialReference=this.spatialReference,f.orderByFields=""!==u?u.split(","):null,f.geometry=null===r?null:r,f.returnGeometry=!0,f.relationParameter=this._makeRelationshipParam(e),this._layer.queryFeatures(f).then((e=>{if(null===e)return new a([],[],h,null);this._checkCancelled(o);const t=[];e.features.forEach((e=>{const r=e.attributes[this._layer.objectIdField];t.push(r),this._featureCache[r]=this._changeFeature(e)}));return new a([],t,h,null)}))},d._makeRelationshipEnum=function(e){if(e.indexOf("esriSpatialRelRelation")>=0)return"relation";switch(e){case"esriSpatialRelRelation":return"relation";case"esriSpatialRelIntersects":return"intersects";case"esriSpatialRelContains":return"contains";case"esriSpatialRelOverlaps":return"overlaps";case"esriSpatialRelWithin":return"within";case"esriSpatialRelTouches":return"touches";case"esriSpatialRelCrosses":return"crosses";case"esriSpatialRelEnvelopeIntersects":return"envelope-intersects"}return e},d._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},d._queryAllFeatures=function(){if(this._wset)return t.resolve(this._wset);const e=new c;return e.where="1=1",this._ensureLoaded().then((()=>{if(this._layer.source&&this._layer.source.items){const e=[];return this._layer.source.items.forEach((t=>{const r=t.attributes[this._layer.objectIdField];e.push(r),this._featureCache[r]=this._changeFeature(t)})),this._wset=new a([],e,!1,null),this._wset}return this._layer.queryFeatures(e).then((e=>{const t=[];return e.features.forEach((e=>{const r=e.attributes[this._layer.objectIdField];t.push(r),this._featureCache[r]=this._changeFeature(e)})),this._wset=new a([],t,!1,null),this._wset}))}))},d._getFeatures=function(e,r,i){const s=[];-1!==r&&void 0===this._featureCache[r]&&s.push(r);for(let t=e._lastFetchedIndex;t<e._known.length&&(e._lastFetchedIndex+=1,!(void 0===this._featureCache[e._known[t]]&&(e._known[t]!==r&&s.push(e._known[t]),s.length>i)));t++);return 0===s.length?t.resolve("success"):t.reject(new Error("Unaccounted for Features. Not in Feature Collection"))},d._refineSetBlock=function(e){return t.resolve(e)},d._stat=function(){return t.resolve({calculated:!1})},d._canDoAggregates=function(){return t.resolve(!1)},d.relationshipMetaData=function(){return[]},f._cloneAttr=function(e){const t={};for(const r in e)t[r]=e[r];return t},d.nativeCapabilities=function(){return{title:this._layer.title,canQueryRelated:!1,source:this,capabilities:this._layer.capabilities,databaseType:this._databaseType,requestStandardised:!0}},f.create=function(e,t){let i=e.layerDefinition.objectIdField;const n=e.layerDefinition.typeIdField?e.layerDefinition.typeIdField:"",a=[];if(e.layerDefinition.types)for(const r of e.layerDefinition.types)a.push(u.fromJSON(r));let l=e.layerDefinition.geometryType;void 0===l&&(l=e.featureSet.geometryType||"");let o=e.featureSet.features;const c=t.toJSON();if(""===i||void 0===i){let t=!1;for(const r of e.layerDefinition.fields)if("oid"===r.type||"esriFieldTypeOID"===r.type){i=r.name,t=!0;break}if(!1===t){let t="FID",r=!0,s=0;for(;r;){let i=!0;for(const r of e.layerDefinition.fields)if(r.name===t){i=!1;break}!0===i?r=!1:(s++,t="FID"+s.toString())}e.layerDefinition.fields.push({type:"esriFieldTypeOID",name:t,alias:t});const n=[];for(let i=0;i<o.length;i++)n.push({geometry:e.featureSet.features[i].geometry,attributes:e.featureSet.features[i].attributes?this._cloneAttr(e.featureSet.features[i].attributes):{}}),n[i].attributes[t]=i;o=n,i=t}}const d=[];for(const r of e.layerDefinition.fields)r instanceof s?d.push(r):d.push(s.fromJSON(r));let y=l;switch(y){case"esriGeometryPoint":y="point";break;case"esriGeometryPolyline":y="polyline";break;case"esriGeometryPolygon":y="polygon";break;case"esriGeometryExtent":y="extent";break;case"esriGeometryMultipoint":y="multipoint"}for(const s of o)s.geometry&&s.geometry instanceof r==!1&&(s.geometry.type=y,void 0===s.geometry.spatialReference&&(s.geometry.spatialReference=c));const p={outFields:["*"],source:o,fields:d,types:a,typeIdField:n,objectIdField:i,spatialReference:t};p.geometryType=y||"point";return new f({layer:new h(p),spatialReference:t,isTable:null===y||""===y})},d.queryAttachments=function(){return t.resolve([])},d.getFeatureByObjectId=function(e){const t=new c;return t.where=this.objectIdField+"="+e.toString(),this._layer.queryFeatures(t).then((e=>1===e.features.length?e.features[0]:null))},d.getOwningSystemUrl=function(){return t.resolve("")},d.getIdentityUser=function(){return t.resolve("")},e._createClass(f,[{key:"gdbVersion",get:function(){return""}}]),f}(o)}));
