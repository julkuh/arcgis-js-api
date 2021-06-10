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

define(["require","exports","../ArcadePortal","../Dictionary","../Dictionary","../Feature","../featureSetCollection","../featureSetUtils","../languageUtils","../featureset/actions/Adapted","../featureset/actions/AttributeFilter","../featureset/actions/OrderBy","../featureset/actions/Top","../featureset/sources/Empty","../featureset/sources/FeatureLayerMemory","../featureset/support/OrderbyClause","../featureset/support/shared","../featureset/support/sqlUtils","./fieldStats","../polyfill/promiseUtils","../polyfill/sql/WhereClause","../../layers/FeatureLayer","../../layers/Field"],(function(e,r,t,n,a,i,l,s,o,u,f,d,c,p,m,g,y,h,F,v,S,I,E){"use strict";function A(e,r,t){var n=e.getVariables();if(n.length>0){for(var a=[],i=0;i<n.length;i++){var l={name:n[i]};a.push(r.evaluateIdentifier(t,l))}return v.all(a).then((function(r){for(var t={},a=0;a<n.length;a++)t[n[a]]=r[a];return e.parameters=t,e}))}return v.resolve(e)}function b(e,r,t){for(var n in void 0===t&&(t=null),e)if(n.toLowerCase()===r.toLowerCase())return e[n];return t}function D(e){if(null===e)return null;var r={type:b(e,"type",""),name:b(e,"name","")};if("range"===r.type)r.range=b(e,"range",[]);else{r.codedValues=[];for(var t=0,n=b(e,"codedValues",[]);t<n.length;t++){var a=n[t];r.codedValues.push({name:b(a,"name",""),code:b(a,"code",null)})}}return r}function w(e){if(null===e)return null;var r={},t=b(e,"wkt",null);null!==t&&(r.wkt=t);var n=b(e,"wkid",null);return null!==n&&(r.wkid=n),r}function N(e){if(null===e)return null;var r={hasZ:b(e,"hasz",!1),hasM:b(e,"hasm",!1)},t=b(e,"spatialreference",null);t&&(r.spatialReference=w(t));var n=b(e,"x",null);if(null!==n)return r.x=n,r.y=b(e,"y",null),r;var a=b(e,"rings",null);if(null!==a)return r.rings=a,r;var i=b(e,"paths",null);if(null!==i)return r.paths=i,r;var l=b(e,"points",null);if(null!==l)return r.points=l,r;for(var s=0,o=["xmin","xmax","ymin","ymax","zmin","zmax","mmin","mmax"];s<o.length;s++){var u=o[s],f=b(e,u,null);null!==f&&(r[u]=f)}return r}Object.defineProperty(r,"__esModule",{value:!0}),r.registerFunctions=void 0,r.registerFunctions=function(e){"async"===e.mode&&(e.functions.getuser=function(r,a){return e.standardFunctionAsync(r,a,(function(e,a,i){o.pcCheck(i,1,2);var l=o.defaultUndefined(i[1],""),u=!0===l;if(l=!0===l||!1===l?"":o.toString(l),i[0]instanceof t){var f=null;return r.services&&r.services.portal&&(f=r.services.portal),f=s.getPortal(i[0],f),s.lookupUser(f,l,u).then((function(e){if(e){for(var r=JSON.parse(JSON.stringify(e)),t=0,a=["lastLogin","created","modified"];t<a.length;t++){var i=a[t];void 0!==r[i]&&null!==r[i]&&(r[i]=new Date(r[i]))}return n.convertObjectToArcadeDictionary(r)}return null}))}var d=null;if(o.isFeatureSet(i[0])&&(d=i[0]),d)return u=!1,l?null:d.load().then((function(){return d.getOwningSystemUrl()})).then((function(e){if(!e)return l?null:d.getIdentityUser().then((function(e){return e?n.convertObjectToArcadeDictionary({username:e}):null}));var a=null;return r.services&&r.services.portal&&(a=r.services.portal),a=s.getPortal(new t(e),a),s.lookupUser(a,l,u).then((function(e){if(e){for(var r=JSON.parse(JSON.stringify(e)),t=0,a=["lastLogin","created","modified"];t<a.length;t++){var i=a[t];void 0!==r[i]&&null!==r[i]&&(r[i]=new Date(r[i]))}return n.convertObjectToArcadeDictionary(r)}return null}))}));throw new Error("Invalid Parameter")}))},e.signatures.push({name:"getuser",min:"1",max:"2"}),e.functions.featuresetbyid=function(r,t){return e.standardFunctionAsync(r,t,(function(e,r,t){if(o.pcCheck(t,2,4),t[0]instanceof l){var n=o.toString(t[1]),a=o.defaultUndefined(t[2],null),i=o.toBoolean(o.defaultUndefined(t[3],!0));if(null===a&&(a=["*"]),!1===o.isArray(a))throw new Error("Invalid Parameter");return t[0].featureSetById(n,i,a)}throw new Error("Invalid Parameter")}))},e.signatures.push({name:"featuresetbyid",min:"2",max:"4"}),e.functions.featuresetbyportalitem=function(r,n){return e.standardFunctionAsync(r,n,(function(e,n,a){if(o.pcCheck(a,2,5),null===a[0])throw new Error("Portal is required");if(a[0]instanceof t){var i=o.toString(a[1]),l=o.toString(a[2]),u=o.defaultUndefined(a[3],null),f=o.toBoolean(o.defaultUndefined(a[4],!0));if(null===u&&(u=["*"]),!1===o.isArray(u))throw new Error("Invalid Parameter");var d=null;return r.services&&r.services.portal&&(d=r.services.portal),d=s.getPortal(a[0],d),s.constructFeatureSetFromPortalItem(i,l,r.spatialReference,u,f,d,r.lrucache,r.interceptor)}if(!1===o.isString(a[0]))throw new Error("Portal is required");var c=o.toString(a[0]),p=o.toString(a[1]),m=o.defaultUndefined(a[2],null),g=o.toBoolean(o.defaultUndefined(a[3],!0));if(null===m&&(m=["*"]),!1===o.isArray(m))throw new Error("Invalid Parameter");if(r.services&&r.services.portal)return s.constructFeatureSetFromPortalItem(c,p,r.spatialReference,m,g,r.services.portal,r.lrucache,r.interceptor);throw new Error("Portal is required")}))},e.signatures.push({name:"featuresetbyportalitem",min:"2",max:"5"}),e.functions.featuresetbyname=function(r,t){return e.standardFunctionAsync(r,t,(function(e,r,t){if(o.pcCheck(t,2,4),t[0]instanceof l){var n=o.toString(t[1]),a=o.defaultUndefined(t[2],null),i=o.toBoolean(o.defaultUndefined(t[3],!0));if(null===a&&(a=["*"]),!1===o.isArray(a))throw new Error("Invalid Parameter");return t[0].featureSetByName(n,i,a)}throw new Error("Invalid Parameter")}))},e.signatures.push({name:"featuresetbyname",min:"2",max:"4"}),e.functions.featureset=function(r,t){return e.standardFunction(r,t,(function(e,t,a){o.pcCheck(a,1,1);var i,l=a[0],s={layerDefinition:{geometryType:"",objectIdField:"",globalIdField:"",typeIdField:"",fields:[]},featureSet:{geometryType:"",features:[]}};if(o.isString(l))void 0!==(l=JSON.parse(l)).layerDefinition?(s.layerDefinition=l.layerDefinition,s.featureSet=l.featureSet,l.layerDefinition.spatialReference&&(s.layerDefinition.spatialReference=l.layerDefinition.spatialReference)):(s.featureSet.features=l.features,s.featureSet.geometryType=l.geometryType,s.layerDefinition.geometryType=s.featureSet.geometryType,s.layerDefinition.objectIdField=l.objectIdFieldName,s.layerDefinition.typeIdField=l.typeIdFieldName,s.layerDefinition.globalIdField=l.globalIdFieldName,s.layerDefinition.fields=l.fields,l.spatialReference&&(s.layerDefinition.spatialReference=l.spatialReference));else{if(!(a[0]instanceof n))throw new Error("Invalid Parameter");var u=b(l=JSON.parse(a[0].castToText()),"layerdefinition");if(null!==u){s.layerDefinition.geometryType=b(u,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.globalIdField=b(u,"globalidfield",""),s.layerDefinition.objectIdField=b(u,"objectidfield",""),s.layerDefinition.typeIdField=b(u,"typeidfield",""),(A=b(u,"spatialreference",null))&&(s.layerDefinition.spatialReference=w(A));for(var f=0,d=b(u,"fields",[]);f<d.length;f++){var c={name:b(T=d[f],"name",""),alias:b(T,"alias",""),type:b(T,"type",""),nullable:b(T,"nullable",!0),editable:b(T,"editable",!0),length:b(T,"length",null),domain:D(b(T,"domain"))};s.layerDefinition.fields.push(c)}var p=b(l,"featureset",null);if(p){for(var g={},y=0,h=s.layerDefinition.fields;y<h.length;y++){g[(E=h[y]).name.toLowerCase()]=E.name}for(var F=0,v=b(p,"features",[]);F<v.length;F++){var S={},I=b(P=v[F],"attributes",{});for(var E in I)S[g[E.toLowerCase()]]=I[E];s.featureSet.features.push({attributes:S,geometry:N(b(P,"geometry",null))})}}}else{var A;s.layerDefinition.geometryType=b(l,"geometrytype",""),s.featureSet.geometryType=s.layerDefinition.geometryType,s.layerDefinition.objectIdField=b(l,"objectidfieldname",""),s.layerDefinition.typeIdField=b(l,"typeidfieldname",""),(A=b(l,"spatialreference",null))&&(s.layerDefinition.spatialReference=w(A));for(var x=0,C=b(l,"fields",[]);x<C.length;x++){var T;c={name:b(T=C[x],"name",""),alias:b(T,"alias",""),type:b(T,"type",""),nullable:b(T,"nullable",!0),editable:b(T,"editable",!0),length:b(T,"length",null),domain:D(b(T,"domain"))};s.layerDefinition.fields.push(c)}g={};for(var L=0,R=s.layerDefinition.fields;L<R.length;L++){g[(E=R[L]).name.toLowerCase()]=E.name}for(var O=0,k=b(l,"features",[]);O<k.length;O++){var P;S={},I=b(P=k[O],"attributes",{});for(var E in I)S[g[E.toLowerCase()]]=I[E];s.featureSet.features.push({attributes:S,geometry:N(b(P,"geometry",null))})}}}if(!1==(!!(i=s).layerDefinition&&!!i.featureSet&&!1!==function(e,r){for(var t=0,n=r;t<n.length;t++)if(n[t]===e)return!0;return!1}(i.layerDefinition.geometryType,["","esriGeometryPoint","esriGeometryPolyline","esriGeometryPolygon","esriGeometryMultipoint","esriGeometryEnvelope"])&&null!==i.layerDefinition.objectIdField&&""!==i.layerDefinition.objectIdField&&!1!==o.isArray(i.layerDefinition.fields)&&!1!==o.isArray(i.featureSet.features)))throw new Error("Invalid Parameter");return m.create(s,r.spatialReference)}))},e.signatures.push({name:"featureset",min:"1",max:"1"}),e.functions.filter=function(r,t){return e.standardFunctionAsync(r,t,(function(t,n,a){return o.pcCheck(a,2,2),o.isFeatureSet(a[0])?a[0].load().then((function(t){var n=S.WhereClause.create(a[1],t.getFieldsIndex()),i=n.getVariables();if(i.length>0){for(var l=[],s=0;s<i.length;s++){var o={name:i[s]};l.push(e.evaluateIdentifier(r,o))}return v.all(l).then((function(e){for(var r={},t=0;t<i.length;t++)r[i[t]]=e[t];return n.parameters=r,new f({parentfeatureset:a[0],whereclause:n})}))}return v.resolve(new f({parentfeatureset:a[0],whereclause:n}))})):e.failDefferred("Filter cannot accept this parameter type")}))},e.signatures.push({name:"filter",min:"2",max:"2"}),e.functions.orderby=function(r,t){return e.standardFunctionAsync(r,t,(function(r,t,n){if(o.pcCheck(n,2,2),o.isFeatureSet(n[0])){var a=new g(n[1]);return v.resolve(new d({parentfeatureset:n[0],orderbyclause:a}))}return e.failDefferred("Order cannot accept this parameter type")}))},e.signatures.push({name:"orderby",min:"2",max:"2"}),e.functions.top=function(r,t){return e.standardFunctionAsync(r,t,(function(r,t,n){return o.pcCheck(n,2,2),o.isFeatureSet(n[0])?v.resolve(new c({parentfeatureset:n[0],topnum:n[1]})):o.isArray(n[0])?o.toNumber(n[1])>=n[0].length?n[0].slice(0):n[0].slice(0,o.toNumber(n[1])):o.isImmutableArray(n[0])?o.toNumber(n[1])>=n[0].length()?n[0].slice(0):n[0].slice(0,o.toNumber(n[1])):e.failDefferred("Top cannot accept this parameter type")}))},e.signatures.push({name:"top",min:"2",max:"2"}),e.functions.first=function(r,t){return e.standardFunctionAsync(r,t,(function(e,r,t){return o.pcCheck(t,1,1),o.isFeatureSet(t[0])?t[0].first(e.abortSignal).then((function(e){if(null!==e){var r=i.createFromGraphicLikeObject(e.geometry,e.attributes,t[0]);r._underlyingGraphic=e,e=r}return e})):o.isArray(t[0])?0===t[0].length?v.resolve(null):v.resolve(t[0][0]):o.isImmutableArray(t[0])?0===t[0].length()?v.resolve(null):v.resolve(t[0].get(0)):null}))},e.signatures.push({name:"first",min:"1",max:"1"}),e.functions.attachments=function(r,t){return e.standardFunctionAsync(r,t,(function(e,t,a){o.pcCheck(a,1,2);var l={minsize:-1,maxsize:-1,types:null};if(a.length>1)if(a[1]instanceof n){if(a[1].hasField("minsize")&&(l.minsize=o.toNumber(a[1].field("minsize"))),a[1].hasField("maxsize")&&(l.maxsize=o.toNumber(a[1].field("maxsize"))),a[1].hasField("types")){var u=o.toStringArray(a[1].field("types"),!1);u.length>0&&(l.types=u)}}else if(null!==a[1])throw new Error("Invalid Parameter");if(a[0]instanceof i){var f=a[0]._layer;return f instanceof I&&(f=s.constructFeatureSet(f,r.spatialReference,["*"],!0,r.lrucache,r.interceptor)),null===f?[]:!1===o.isFeatureSet(f)?[]:f.load().then((function(){return f.queryAttachments(a[0].field(f.objectIdField),l.minsize,l.maxsize,l.types)}))}if(null===a[0])return[];throw new Error("Invalid Parameter")}))},e.signatures.push({name:"attachments",min:"1",max:"2"}),e.functions.featuresetbyrelationshipname=function(r,t){return e.standardFunctionAsync(r,t,(function(e,t,n){o.pcCheck(n,2,4);var a=n[0],l=o.toString(n[1]),u=o.defaultUndefined(n[2],null),f=o.toBoolean(o.defaultUndefined(n[3],!0));if(null===u&&(u=["*"]),!1===o.isArray(u))throw new Error("Invalid Parameter");if(null===n[0])return null;if(!(n[0]instanceof i))throw new Error("Invalid Parameter");var d=a._layer;return d instanceof I&&(d=s.constructFeatureSet(d,r.spatialReference,["*"],!0,r.lrucache,r.interceptor)),null===d?null:!1===o.isFeatureSet(d)?null:d.load().then((function(e){var t=e.relationshipMetaData().filter((function(e){return e.name===l}));if(0===t.length)return null;if(void 0!==t[0].relationshipTableId&&null!==t[0].relationshipTableId&&t[0].relationshipTableId>-1)return s.constructFeatureSetFromRelationship(e,t[0],a.field(e.objectIdField),e.spatialReference,u,f,r.lrucache,r.interceptor);var n=e.serviceUrl();return n?(n="/"===n.charAt(n.length-1)?n+t[0].relatedTableId.toString():n+"/"+t[0].relatedTableId.toString(),s.constructFeatureSetFromUrl(n,e.spatialReference,u,f,r.lrucache,r.interceptor).then((function(r){return r.load().then((function(){return r.relationshipMetaData()})).then((function(n){if(n=n.filter((function(e){return e.id===t[0].id})),!1===a.hasField(t[0].keyField)||null===a.field(t[0].keyField))return e.getFeatureByObjectId(a.field(e.objectIdField),[t[0].keyField]).then((function(e){if(e){var a=S.WhereClause.create(n[0].keyField+"= @id",r.getFieldsIndex());return a.parameters={id:e.attributes[t[0].keyField]},r.filter(a)}return new p({parentfeatureset:r})}));var i=S.WhereClause.create(n[0].keyField+"= @id",r.getFieldsIndex());return i.parameters={id:a.field(t[0].keyField)},r.filter(i)}))}))):null}))}))},e.signatures.push({name:"featuresetbyrelationshipname",min:"2",max:"4"}),e.functions.featuresetbyassociation=function(r,t){return e.standardFunctionAsync(r,t,(function(e,t,n){o.pcCheck(n,2,3);var a=n[0],l=o.toString(o.defaultUndefined(n[1],"")).toLowerCase(),f=o.isString(n[2])?o.toString(n[2]):null;if(null===n[0])return null;if(!(n[0]instanceof i))throw new Error("Invalid Parameter");var d=a._layer;return d instanceof I&&(d=s.constructFeatureSet(d,r.spatialReference,["*"],!0,r.lrucache,r.interceptor)),null===d?null:!1===o.isFeatureSet(d)?null:d.load().then((function(){var e=d.serviceUrl();return s.constructAssociationMetaDataFeatureSetFromUrl(e,r.spatialReference)})).then((function(e){var r=null,t=null,n=!1;if(null!==f&&""!==f&&void 0!==f){for(var i=0,s=e.terminals;i<s.length;i++){var c=s[i];c.terminalName===f&&(t=c.terminalId)}null===t&&(n=!0)}for(var p=e.associations.getFieldsIndex(),m=p.get("TOGLOBALID").name,g=p.get("FROMGLOBALID").name,h=p.get("TOTERMINALID").name,F=p.get("FROMTERMINALID").name,v=p.get("FROMNETWORKSOURCEID").name,I=p.get("TONETWORKSOURCEID").name,A=p.get("ASSOCIATIONTYPE").name,b=p.get("ISCONTENTVISIBLE").name,D=p.get("OBJECTID").name,w=0,N=d.fields;w<N.length;w++){var x=N[w];if("esriFieldTypeGlobalID"===x.type){r=a.field(x.name);break}}var C=null,T=new u.SqlExpressionAdapted(new E({name:"percentalong",alias:"percentalong",type:"esrFieldTypeDouble"}),S.WhereClause.create("0",e.associations.getFieldsIndex())),L=new u.SqlExpressionAdapted(new E({name:"side",alias:"side",type:"esrFieldTypeString"}),S.WhereClause.create("''",e.associations.getFieldsIndex())),R={};for(var O in e.lkp)R[O]=e.lkp[O].sourceId;var k=new u.StringToCodeAdapted(new E({name:"classname",alias:"classname",type:"esriFieldTypeString"}),null,R),P="";switch(l){case"midspan":P="(("+m+"='"+r+"') OR ( "+g+"='"+r+"')) AND ("+A+" IN (5))",k.codefield=S.WhereClause.create("CASE WHEN ("+m+"='"+r+"') THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var W=y.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,g));W.name="globalid",W.alias="globalid",C=new u.SqlExpressionAdapted(W,S.WhereClause.create("CASE WHEN ("+g+"='"+r+"') THEN "+m+" ELSE "+g+" END",e.associations.getFieldsIndex())),T=e.unVersion>=4?new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,p.get("PERCENTALONG").name)):new u.SqlExpressionAdapted(new E({name:"percentalong",alias:"percentalong",type:"esrFieldTypeDouble"}),S.WhereClause.create("0",e.associations.getFieldsIndex()));break;case"junctionedge":P="(("+m+"='"+r+"') OR ( "+g+"='"+r+"')) AND ("+A+" IN (4,6))",k.codefield=S.WhereClause.create("CASE WHEN ("+m+"='"+r+"') THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var U=y.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,g));U.name="globalid",U.alias="globalid",C=new u.SqlExpressionAdapted(U,S.WhereClause.create("CASE WHEN ("+g+"='"+r+"') THEN "+m+" ELSE "+g+" END",e.associations.getFieldsIndex())),L=new u.SqlExpressionAdapted(new E({name:"side",alias:"side",type:"esrFieldTypeString"}),S.WhereClause.create("CASE WHEN ("+A+"=4) THEN 'from' ELSE 'to' END",e.associations.getFieldsIndex()));break;case"connected":var M=m+"='@T'",B=g+"='@T'";null!==t&&(M+=" AND "+h+"=@A",B+=" AND "+F+"=@A"),P="(("+M+") OR ("+B+"))",P=o.multiReplace(P,"@T",r),M=o.multiReplace(M,"@T",r),null!==t&&(M=o.multiReplace(M,"@A",t.toString()),P=o.multiReplace(P,"@A",t.toString())),k.codefield=S.WhereClause.create("CASE WHEN "+M+" THEN "+v+" ELSE "+I+" END",e.associations.getFieldsIndex());var G=y.cloneField(u.AdaptedFeatureSet.findField(e.associations.fields,g));G.name="globalid",G.alias="globalid",C=new u.SqlExpressionAdapted(G,S.WhereClause.create("CASE WHEN "+M+" THEN "+g+" ELSE "+m+" END",e.associations.getFieldsIndex()));break;case"container":P=m+"='"+r+"' AND "+A+" = 2",null!==t&&(P+=" AND "+h+" = "+t.toString()),k.codefield=v,P="( "+P+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,g),"globalid","globalid");case"content":P="("+g+"='"+r+"' AND "+A+" = 2)",null!==t&&(P+=" AND "+F+" = "+t.toString()),k.codefield=I,P="( "+P+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,m),"globalid","globalid");break;case"structure":P="("+m+"='"+r+"' AND "+A+" = 3)",null!==t&&(P+=" AND "+h+" = "+t.toString()),k.codefield=v,P="( "+P+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,g),"globalid","globalId");break;case"attached":P="("+g+"='"+r+"' AND "+A+" = 3)",null!==t&&(P+=" AND "+F+" = "+t.toString()),k.codefield=I,P="( "+P+" )",C=new u.FieldRename(u.AdaptedFeatureSet.findField(e.associations.fields,m),"globalid","globalId");break;default:throw new Error("Invalid Parameter")}return n&&(P="1 <> 1"),new u.AdaptedFeatureSet({parentfeatureset:e.associations,adaptedFields:[new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,D)),new u.OriginalField(u.AdaptedFeatureSet.findField(e.associations.fields,b)),C,L,k,T],extraFilter:P?S.WhereClause.create(P,e.associations.getFieldsIndex()):null})}))}))},e.signatures.push({name:"featuresetbyassociation",min:"2",max:"6"}),e.functions.groupby=function(r,t){return e.standardFunctionAsync(r,t,(function(t,n,i){return o.pcCheck(i,3,3),o.isFeatureSet(i[0])?i[0].load().then((function(t){var n=[],l=[],s=!1,u=[];if(o.isString(i[1]))u.push(i[1]);else if(i[1]instanceof a)u.push(i[1]);else if(o.isArray(i[1]))u=i[1];else{if(!o.isImmutableArray(i[1]))return e.failDefferred("Illegal Value: GroupBy");u=i[1].toArray()}for(var f=0,d=u;f<d.length;f++){var c=d[f];if(o.isString(c)){var p=S.WhereClause.create(o.toString(c),t.getFieldsIndex()),m=!0===h.isSingleField(p)?o.toString(c):"%%%%FIELDNAME";n.push({name:m,expression:p}),"%%%%FIELDNAME"===m&&(s=!0)}else{if(!(c instanceof a))return e.failDefferred("Illegal Value: GroupBy");var g=c.hasField("name")?c.field("name"):"%%%%FIELDNAME";p=c.hasField("expression")?c.field("expression"):"";if("%%%%FIELDNAME"===g&&(s=!0),!g)return e.failDefferred("Illegal Value: GroupBy");n.push({name:g,expression:S.WhereClause.create(p||g,t.getFieldsIndex())})}}if(u=[],o.isString(i[2]))u.push(i[2]);else if(o.isArray(i[2]))u=i[2];else if(o.isImmutableArray(i[2]))u=i[2].toArray();else{if(!(i[2]instanceof a))return e.failDefferred("Illegal Value: GroupBy");u.push(i[2])}for(var y=0,F=u;y<F.length;y++){if(!((c=F[y])instanceof a))return e.failDefferred("Illegal Value: GroupBy");var I=c.hasField("name")?c.field("name"):"",E=c.hasField("statistic")?c.field("statistic"):"";p=c.hasField("expression")?c.field("expression"):"";if(!I||!E||!p)return e.failDefferred("Illegal Value: GroupBy");l.push({name:I,statistic:E.toLowerCase(),expression:S.WhereClause.create(p,t.getFieldsIndex())})}if(s){for(var b={},D=0,w=t.fields;D<w.length;D++){b[(k=w[D]).name.toLowerCase()]=1}for(var N=0,x=n;N<x.length;N++){"%%%%FIELDNAME"!==(k=x[N]).name&&(b[k.name.toLowerCase()]=1)}for(var C=0,T=l;C<T.length;C++){"%%%%FIELDNAME"!==(k=T[C]).name&&(b[k.name.toLowerCase()]=1)}for(var L=0,R=0,O=n;R<O.length;R++){var k;if("%%%%FIELDNAME"===(k=O[R]).name){for(;1===b["field_"+L.toString()];)L++;b["field_"+L.toString()]=1,k.name="FIELD_"+L.toString()}}}for(var P=[],W=0,U=n;W<U.length;W++){var M=U[W];P.push(A(M.expression,e,r))}for(var B=0,G=l;B<G.length;B++){M=G[B];P.push(A(M.expression,e,r))}return P.length>0?v.all(P).then((function(){return v.resolve(i[0].groupby(n,l))})):v.resolve(i[0].groupby(n,l))})):e.failDefferred("Illegal Value: GroupBy")}))},e.signatures.push({name:"groupby",min:"3",max:"3"}),e.functions.distinct=function(r,t){return e.standardFunctionAsync(r,t,(function(t,n,i){return o.isFeatureSet(i[0])?(o.pcCheck(i,2,2),i[0].load().then((function(t){var n=[],l=[];if(o.isString(i[1]))l.push(i[1]);else if(i[1]instanceof a)l.push(i[1]);else if(o.isArray(i[1]))l=i[1];else{if(!o.isImmutableArray(i[1]))return e.failDefferred("Illegal Value: GroupBy");l=i[1].toArray()}for(var s=!1,u=0,f=l;u<f.length;u++){var d=f[u];if(o.isString(d)){var c=S.WhereClause.create(o.toString(d),t.getFieldsIndex()),p=!0===h.isSingleField(c)?o.toString(d):"%%%%FIELDNAME";n.push({name:p,expression:c}),"%%%%FIELDNAME"===p&&(s=!0)}else{if(!(d instanceof a))return e.failDefferred("Illegal Value: GroupBy");var m=d.hasField("name")?d.field("name"):"%%%%FIELDNAME";c=d.hasField("expression")?d.field("expression"):"";if("%%%%FIELDNAME"===m&&(s=!0),!m)return e.failDefferred("Illegal Value: GroupBy");n.push({name:m,expression:S.WhereClause.create(c||m,t.getFieldsIndex())})}}if(s){for(var g={},y=0,F=t.fields;y<F.length;y++){g[(N=F[y]).name.toLowerCase()]=1}for(var I=0,E=n;I<E.length;I++){"%%%%FIELDNAME"!==(N=E[I]).name&&(g[N.name.toLowerCase()]=1)}for(var b=0,D=0,w=n;D<w.length;D++){var N;if("%%%%FIELDNAME"===(N=w[D]).name){for(;1===g["field_"+b.toString()];)b++;g["field_"+b.toString()]=1,N.name="FIELD_"+b.toString()}}}for(var x=[],C=0,T=n;C<T.length;C++){var L=T[C];x.push(A(L.expression,e,r))}return x.length>0?v.all(x).then((function(){return v.resolve(i[0].groupby(n,[]))})):v.resolve(i[0].groupby(n,[]))}))):function(e,r,t,n){if(1===n.length){if(o.isArray(n[0]))return F.calculateStat(e,n[0],-1);if(o.isImmutableArray(n[0]))return F.calculateStat(e,n[0].toArray(),-1)}return F.calculateStat(e,n,-1)}("distinct",0,0,i)}))})}}));