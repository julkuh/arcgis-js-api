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

define(["require","exports","../../../../core/tsSupport/generatorHelper","../../../../core/tsSupport/awaiterHelper","@dojo/framework/shim/Set","dojo/number","dstore/Csv","../../../../geometry","../../../../request","../../../../core/Error","../../../../core/has","../../../../core/lang","../../../../core/promiseUtils","../../../../core/urlUtils","../../../../geometry/projection","../../../../geometry/support/spatialReferenceUtils","../../../../geometry/support/webMercatorUtils","../../OptimizedFeature","../../OptimizedGeometry","../../data/FeatureStore","../../data/projectionSupport","../../data/QueryEngine","./clientSideDefaults","../../../support/FieldsIndex"],function(e,t,i,n,r,o,a,l,u,s,d,f,c,p,m,y,g,h,v,F,I,N,_,b){Object.defineProperty(t,"__esModule",{value:!0});var x=_.createDrawingInfo("esriGeometryPoint"),w=["esriFieldTypeSmallInteger","esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeLong"];t.csvLatitudeFieldNames=["lat","latitude","y","ycenter","latitude83","latdecdeg","point-y"],t.csvLongitudeFieldNames=["lon","lng","long","longitude","x","xcenter","longitude83","longdecdeg","point-x"],t.csvDetectedDelimiters=[","," ",";","|","\t"];var T=/^((jan(uary)?)|(feb(ruary)?)|(mar(ch)?)|(apr(il)?)|(may)|(jun(e)?)|(jul(y)?)|(aug(ust)?)|(sep(tember)?)|(oct(ober)?)|(nov(ember)?)|(dec(ember)?)|(am)|(pm)|(gmt)|(utc))$/i,D=[0,0],E=function(){function e(e,t){this.x=e,this.y=t}return e}(),S=function(){var e=o._parseInfo(),t=new RegExp("^"+e.regexp+"$"),i=new RegExp("["+e.group+"\\s\\xa0]","g"),n=e.factor;return function(r){var o=t.exec(r);if(e.factor=n,!o)return NaN;var a=o[1];if(!o[1]){if(!o[2])return NaN;a=o[2],e.factor*=-1}return+(a=a.replace(i,"").replace(e.decimal,"."))*e.factor}}(),j=function(){return"isInteger"in Number?Number.isInteger:function(e){return"number"==typeof e&&isFinite(e)&&Math.floor(e)===e}}(),q=function(){function e(){this._fieldsIndex=null,this._queryEngine=null}return e.prototype.destroy=function(){this._queryEngine&&this._queryEngine&&this._queryEngine.destroy(),this._queryEngine=null,this._fieldsIndex=null},e.prototype.load=function(e,t){return void 0===t&&(t={}),n(this,void 0,void 0,function(){var n,r,o,a,l;return i(this,function(i){switch(i.label){case 0:return[4,c.all([this._fetch(e.url,t),this._checkProjection(t&&e.parsing&&e.parsing.spatialReference)])];case 1:return n=i.sent()[0],r=this._parse(n,e.parsing),this._queryEngine=this._createQueryEngine(n,r),r.layerDefinition.extent=this._queryEngine.fullExtent,r.layerDefinition.timeInfo&&(o=this._queryEngine.timeExtent,a=o.start,l=o.end,r.layerDefinition.timeInfo.timeExtent=[a,l]),[2,r]}})})},e.prototype.applyEdits=function(e){return n(this,void 0,void 0,function(){return i(this,function(e){throw new s("csv-source:editing-not-supported","applyEdits() is not supported on CSVLayer")})})},e.prototype.queryFeatures=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),n(this,void 0,void 0,function(){return i(this,function(i){return[2,this._queryEngine.executeQuery(e,t.signal)]})})},e.prototype.queryFeatureCount=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),n(this,void 0,void 0,function(){return i(this,function(i){return[2,this._queryEngine.executeQueryForCount(e,t.signal)]})})},e.prototype.queryObjectIds=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),n(this,void 0,void 0,function(){return i(this,function(i){return[2,this._queryEngine.executeQueryForIds(e,t.signal)]})})},e.prototype.queryExtent=function(e,t){return void 0===e&&(e={}),void 0===t&&(t={}),n(this,void 0,void 0,function(){return i(this,function(i){return[2,this._queryEngine.executeQueryForExtent(e,t.signal)]})})},e.prototype._fetch=function(e,t){return n(this,void 0,void 0,function(){var n,r;return i(this,function(i){switch(i.label){case 0:if(!e)throw new s("csv-source:invalid-source","url not defined");return n=p.urlToObject(e),[4,u(n.path,{query:n.query,responseType:"text",signal:t.signal})];case 1:return r=i.sent(),[2,r.data]}})})},e.prototype._parse=function(e,t){void 0===t&&(t={});for(var i={columnDelimiter:t.columnDelimiter,layerDefinition:null,locationInfo:{latitudeFieldName:t.latitudeField,longitudeFieldName:t.longitudeField}};e&&"\n"===e[0];)e=e.slice(1);"\n"!==e[e.length-1]&&(e+="\n");var n=this._readFirstLine(e);if(!n)throw new s("csv","CSV is empty",{csv:e});if(!t.columnDelimiter){var r=this._inferDelimiter(n);if(!r)throw new s("csv-source:invalid-delimiter","Unable to detect the delimiter from CSV");i.columnDelimiter=r}var o=n.split(i.columnDelimiter),a=i.layerDefinition={name:"csv",drawingInfo:x,geometryType:"esriGeometryPoint",objectIdField:null,fields:[],timeInfo:t.timeInfo,extent:{xmin:Number.POSITIVE_INFINITY,ymin:Number.POSITIVE_INFINITY,xmax:Number.NEGATIVE_INFINITY,ymax:Number.NEGATIVE_INFINITY,spatialReference:t.spatialReference||{wkid:102100}}};if(!t.latitudeField||!t.longitudeField){var l=this._inferLocationInfo(o);if(!t.longitudeField&&!l.longitudeFieldName||!t.latitudeField&&!l.latitudeFieldName)throw new s("csv","Unable to identify latitudeField and/or longitudeField from CSV");i.locationInfo={longitudeFieldName:t.longitudeField||l.longitudeFieldName,latitudeFieldName:t.latitudeField||l.latitudeFieldName}}var u=this._inferFields(e,i.columnDelimiter,o,i.locationInfo);if(t.fields&&t.fields.length){for(var d=new Map,c=0,p=t.fields;c<p.length;c++){var m=p[c];d.set(m.name.toLowerCase(),m)}for(var y=0,g=u;y<g.length;y++){var m=g[y],h=d.get(m.name.toLowerCase());if(h){var v=m.name;f.mixin(m,h),m.name=v}}}if(a.fields=u,!a.fields.some(function(e){return"esriFieldTypeOID"===e.type&&(a.objectIdField=e.name,!0)})){var m={name:"__OBJECTID",alias:"__OBJECTID",type:"esriFieldTypeOID",editable:!1,nullable:!1};a.objectIdField=m.name,a.fields.unshift(m)}if(this._fieldsIndex=new b(a.fields),a.timeInfo){var F=a.timeInfo;if(F.startTimeField){var I=this._fieldsIndex.get(F.startTimeField.toLowerCase());I?(F.startTimeField=I.name,I.type="esriFieldTypeDate"):F.startTimeField=null}if(F.endTimeField){var N=this._fieldsIndex.get(F.endTimeField.toLowerCase());N?(F.endTimeField=N.name,N.type="esriFieldTypeDate"):F.endTimeField=null}if(F.trackIdField){var _=this._fieldsIndex.get(F.trackIdField.toLowerCase());F.trackIdField=_?_.name:null}F.startTimeField||F.endTimeField||(a.timeInfo=null)}return i},e.prototype._inferLocationInfo=function(e){var i=null,n=null;return e.forEach(function(e){var r,o=e.toLowerCase();r=t.csvLatitudeFieldNames.indexOf(o),-1===r||n||(n=e),-1===(r=t.csvLongitudeFieldNames.indexOf(o))||i||(i=e)}),{longitudeFieldName:i,latitudeFieldName:n}},e.prototype._inferFields=function(e,t,i,n){for(var r=[],o=this._sampleLines(e).map(function(e){return e.split(t).map(function(e){return e.trim()})}),a=this,l=0;l<i.length;l++)!function(e){var t=i[e];if(t===n.longitudeFieldName||t===n.latitudeFieldName)r.push({name:t,type:"esriFieldTypeDouble",alias:t});else{var l=o.map(function(t){return t[e]}),u=a._inferFieldType(l),s={name:t.replace(/[\s\'’‘\.\-\/\(\)]+/g,"_"),type:null,alias:t};switch(u){case"integer":s.type="esriFieldTypeInteger";break;case"double":s.type="esriFieldTypeDouble";break;case"date":s.type="esriFieldTypeDate",s.length=36;break;default:s.type="esriFieldTypeString",s.length=255}r.push(s)}}(l);return r},e.prototype._inferFieldType=function(e){var t=this;if(!e.length)return"string";var i=/[^+-.,0-9]/;return e.map(function(e){var n=!1;if(""===e||i.test(e))n=!0;else{var r=S(e);if(!isNaN(r))return/[.,]/.test(e)?"double":!j(r)||r>214783647||r<-214783648?"double":"integer";if(-1===e.indexOf("E"))n=!0;else{if(r=Number(e),!isNaN(r))return"double";if(-1===e.indexOf(","))n=!0;else{if(e=e.replace(",","."),r=Number(e),!isNaN(r))return"double";n=!0}}}if(n){if(!/^[-]?\d*[.,]?\d*$/.test(e)){var o=new Date(e);return t._isValidDate(o,e)?"date":"string"}return"string"}return"string"}).reduce(function(e,t){return e===t?t:"string"===e||"string"===t?"string":"double"===e||"double"===t?"double":void 0})},e.prototype._isValidDate=function(e,t){if(!e||"[object Date]"!==Object.prototype.toString.call(e)||isNaN(e.getTime()))return!1;var i=!0;if(d("chrome")&&/\d+\W*$/.test(t)){var n=t.match(/[a-zA-Z]{2,}/);if(n){for(var r=!1,o=0;!r&&o<=n.length;)r=!T.test(n[o]),o++;i=!r}}return i},e.prototype._readFirstLine=function(e){return e.substring(0,e.indexOf("\n")).trim()},e.prototype._sampleLines=function(e,t){void 0===t&&(t=10);for(var i=!1,n=[],r=e.indexOf("\n")+1;!i&&n.length<t;){var o=e.indexOf("\n",r);if(-1!==o){var a=void 0;a=-1===o&&r<e.length-1?e.substring(r).trim():e.substring(r,o).trim(),a&&n.push(a),r=o+1}else i=!0}return n},e.prototype._inferDelimiter=function(e){var i=0,n="";return t.csvDetectedDelimiters.forEach(function(t){var r=e.split(t).length;r>i&&(i=r,n=t)}),""===n?null:n},e.prototype._createQueryEngine=function(e,t){for(var i,n=t.locationInfo,o=n.latitudeFieldName,u=n.longitudeFieldName,s=t.layerDefinition,d=s.objectIdField,f=s.fields,c=s.extent,p=s.timeInfo,I=[],_=[],b=new r.Set,x=new r.Set,T=[],j=0,q=f;j<q.length;j++){var O=q[j],L=O.name,C=O.type;"esriFieldTypeDate"===C?b.add(L):w.indexOf(C)>-1&&x.add(L),L!==d&&T.push(L)}var V=new a;V.delimiter=t.columnDelimiter,V.fieldNames=T,V.newline="\n";var k=V.parse(e),R=0;k.shift();for(var P=0,M=k;P<M.length;P++){var G=M[P],Q=this._parseCoordinateValue(G[o]),U=this._parseCoordinateValue(G[u]);if(null!=U&&null!=Q&&!isNaN(Q)&&!isNaN(U)){G[o]=Q,G[u]=U;for(var Y in G)if(Y!==o&&Y!==u)if(b.has(Y)){var W=new Date(G[Y]);G[Y]=this._isValidDate(W,G[Y])?W.getTime():null}else if(x.has(Y)){var $=S(G[Y]);isNaN($)?G[Y]=null:G[Y]=$}G[d]=R,R++,I.push(new E(U,Q)),_.push(G)}}if(!y.equals({wkid:4326},c.spatialReference))if(y.isWebMercator(c.spatialReference))for(var z=0,A=I;z<A.length;z++){var Z=A[z];i=g.lngLatToXY(Z.x,Z.y,D),Z.x=i[0],Z.y=i[1]}else I=m.projectMany(I,l.SpatialReference.WGS84,c.spatialReference,null,!0);for(var B=new F.default({geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1}),H=new N.default({fields:t.layerDefinition.fields,geometryType:"esriGeometryPoint",hasM:!1,hasZ:!1,timeInfo:p,objectIdField:d,spatialReference:c.spatialReference||{wkid:4326},cacheSpatialQueries:!0,featureStore:B}),J=[],X=0;X<I.length;X++){var K=I[X],ee=K.x,te=K.y,ie=_[X];ie[d]=X+1,J.push(new h.default(new v.default([],[ee,te]),ie,null,ie[d]))}return B.addMany(J),H},e.prototype._parseCoordinateValue=function(e){if(null==e||""===e)return null;var t=S(e);return(isNaN(t)||Math.abs(t)>181)&&(t=parseFloat(e)),t},e.prototype._checkProjection=function(e){return n(this,void 0,void 0,function(){var t;return i(this,function(i){switch(i.label){case 0:return i.trys.push([0,2,,3]),[4,I.checkProjectionSupport(y.WGS84,e)];case 1:return i.sent(),[3,3];case 2:throw t=i.sent(),new s("csv-layer","Projection not supported");case 3:return[2]}})})},e}();t.default=q});