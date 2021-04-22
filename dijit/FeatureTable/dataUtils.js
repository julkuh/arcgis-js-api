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

define(["dojo/_base/array","dojo/_base/lang","dojo/Deferred","dojo/number","dojo/string","dojo/date/locale","dojo/promise/all","../../config","../../graphic","../../numberUtils","../../request","../../ArcadeExpression","../../arcadeProfiles/popupProfile","../../layers/FeatureLayer","../../geometry/Extent","../../tasks/query","../../tasks/StatisticDefinition","../../tasks/QueryTask","../../tasks/RelationshipQuery","dojo/i18n","dojo/i18n!../../nls/jsapi"],(function(e,t,r,n,i,a,u,s,o,l,d,c,y,f,p,h,m,g,F,b,v){return{i18nStrings:v.widgets.FeatureTable,numericFieldTypes:["esriFieldTypeInteger","esriFieldTypeSingle","esriFieldTypeDouble","esriFieldTypeSmallInteger"],statisticDefinitions:[{type:"count",name:"countField"},{type:"sum",name:"sumField"},{type:"min",name:"minField"},{type:"max",name:"maxField"},{type:"avg",name:"avgField"},{type:"stddev",name:"stddevField"}],_reExprField:/^\s*expression\//i,getOrderByString:function(e,t){return e+(t?" DESC":" ASC")},getWhereString:function(e,t){return e+"='"+t+"'"},getRelationshipWhereClause:function(r){var n=r.layer,i=r.originRelationship,a=r.destinationRelationship,u=r.keyValue,s=i.relationshipTableId||i.relatedTableId,o=i.keyFieldInRelationshipTable||i.keyField,l=a.keyFieldInRelationshipTable||a.keyField,c=n.layerId==s?l:o,y=this.getWhereString(c,u),f=n._url.path,p=f.substring(0,f.lastIndexOf("/")+1);return d({url:p+s+"/query",content:{f:"json",outFields:["*"],returnGeometry:!1,where:y},handleAs:"json",callbackParamName:"callback"}).then(t.hitch(this,(function(t){if(t&&t.features&&t.features.length){var r,i=t.features,u=[],s="";return e.forEach(i,(function(t,o){if(t.attributes&&t.attributes[l])r=t.attributes[l];else{var d=n.getField(c)?n.getField(c).name:null;if(this.isValueEmpty(d)){var y=l.toUpperCase(),f=l.toLowerCase();r=t.attributes[y]||t.attributes[f]||null}else r=t.attributes[d]}-1===e.indexOf(u,r)&&(u.length>0&&o<i.length&&(s=s.concat(" OR ")),u.push(r),s=s.concat(this.getWhereString(a.keyField,r)))}),this),s}return null})))},isValueEmpty:function(e){return null===e||" "===e||""===e||void 0===e},findFirst:function(t,r,n){return e.filter(t,(function(e){return e.hasOwnProperty(r)&&e[r]===n}))[0]||null},compareIntArrays:function(t,r){t.sort(),r.sort();var n=e.every(r,(function(r){return-1!==e.indexOf(t,r)}),this),i=e.every(t,(function(t){return-1!==e.indexOf(r,t)}),this);return n&&i},findFirstNumberColumn:function(t,r){var n;return e.some(t,(function(t,i){if(-1!==e.indexOf(this.numericFieldTypes,t.type)&&t.field!==r&&!t.hidden)return n=t,!0}),this),n},getRoundingPrecision:function(e){return e>=1e3?0:e>=10?2:e>=0?4:6},generateLinkFromString:function(e){var t;if("string"==typeof e&&(/^\s*(http?:\/\/([^\s]+))\s*$/i.test(e)?t=e.indexOf("http:"):/^\s*(https?:\/\/([^\s]+))\s*$/i.test(e)&&(t=e.indexOf("https:")),t>-1&&-1===e.indexOf("href="))){var r=e.indexOf(" ",t);-1===r&&(r=e.length);var n=e.substring(t,r);e=e.substring(0,t)+"<a href='"+n+"' target='_blank'>"+n+"</a>"+e.substring(r,e.length)}return this.isValueEmpty(e)?"":e},isNumericFieldType:function(t){return-1!==e.indexOf(this.numericFieldTypes,t)},isIntegerFieldType:function(e){return"esriFieldTypeInteger"===e||"esriFieldTypeSmallInteger"===e},isFloatFieldType:function(e){return"esriFieldTypeDouble"===e||"esriFieldTypeSingle"===e},getDomainValueFromRow:function(t){var r,n=t.fieldInfo.name,i=t.fieldInfo.domain,a=t.row;return"range"===i.type?a[n]:(r=e.filter(i.codedValues,(function(e){return e.hasOwnProperty("code")&&e.code==a[n]})))[0]&&!this.isValueEmpty(r[0].name)?r[0].name:a[n]},getTypeValueFromRow:function(e){var t,r,n,i,a=e.layerInfo[e.typesProperty],u=e.typeIdProperty,s=e.fieldInfo,o=e.row,l=a&&a[0];return l&&(r=o[s.name],n=this.isNumericFieldType(s.type),i="string"==typeof l[u]&&n?r.toString():r,t=(t=this.findFirst(a,u,i))?t.name:null),t},getSubtypeDomainValue:function(t){var r,n,i,a=t.layerInfo,u=t.fieldInfo.name,s=a.types,o=t.row;return r=(i=this.findFirst(s,"id",o[a.typeIdField]))?i.domains:null,i&&r?(r[u]&&r[u].codedValues&&(n=e.filter(r[u].codedValues,(function(e){return e.hasOwnProperty("code")&&e.code==o[u]}))),n&&n[0]&&!this.isValueEmpty(n[0].name)?n[0].name:o[u]):o[u]},mergeDictionaries:function(e,t){if(null===e||null===t)return e;for(var r in t)for(var n in e[r]||(e[r]={}),t[r])e[r][n]=t[r][n];return e},isCyclicalRelationship:function(e){return"esriRelCardinalityOneToOne"===e.cardinality||"esriRelCardinalityOneToMany"===e.cardinality&&"esriRelRoleDestination"===e.role},getColumnFromFieldName:function(e){var t=e.grid,r=e.fieldName,n=t.columns;return this.findFirst(n,"field",r)},formatNumberForLocale:function(e,t){if(t){var r=b.getLocalization("dojo.cldr","number");return t.digitSeparator||!r||this.isValueEmpty(e)?isNaN(e)||null===e?null:n.format(e,t):(e=isNaN(e)||null===e?null:n.format(e,t)).replace(new RegExp("\\"+r.group,"g"),"")}return isNaN(e)||null===e?null:l.format(e,t)},getCombinedDateTime:function(e,t){return new Date(e.getFullYear(),e.getMonth(),e.getDate(),t.getHours(),t.getMinutes(),t.getSeconds())},formatDateForLocale:function(e){var t,r,n,i,u=e.dateOptions||{},s=e.timestamp,o=e.fieldInfo,l=!1,d={};return n=(r=!(!o||!o.dateOptions)&&o.dateOptions)||u,l=!(!r||!this.isValueEmpty(n.dateEnabled))||!!n.dateEnabled,t=!!n.timeEnabled,this.isValueEmpty(n.datePattern)||(d.datePattern=n.datePattern),this.isValueEmpty(n.timeEnabled)||this.isValueEmpty(n.timePattern)||(d.timePattern=n.timePattern),i=l&&t?"date and time":l&&!t?"date":!l&&t?"time":"date",d.selector=i,a.format(new Date(s),d)},calculateExtentFromFeatures:function(e){var t,r,n,i,a,u=e[0].geometry;if(null===u&&1===e.length)return null;for(i=e.length-1;i>=0;i--)null===e[i].geometry&&e.splice(i,1);for(t=(u=e[0].geometry).getExtent(),n=e.length,null===t&&(t=new p(u.x,u.y,u.x,u.y,u.spatialReference)),a=1;a<n;a++)null===(r=(u=e[a].geometry).getExtent())&&(r=new p(u.x,u.y,u.x,u.y,u.spatialReference)),t=t.union(r);return t},initFeatureLayer:function(e,t){var r=e._url.path;return r=r.substring(0,r.lastIndexOf("/")+1),new f(r+=t,{mode:f.MODE_ONDEMAND,outFields:["*"],visible:!0})},applyEdits:function(t){var n=[],i=new r;return!t||t.length<=0?(i.reject(),i):(e.forEach(t,(function(e){e.layer&&n.push(e.layer.applyEdits(e.adds,e.updates,e.deletes,(function(e,t,r){i.resolve({adds:e,updates:t,deletes:r})}),(function(e){i.reject(e)})))})),n.length>0?u(n):i.reject(),i)},applyEditsFromRow:function(e){var t=e.layer,r=new o,n=e.row;return r.setAttributes(n),this.applyEdits([{layer:t,updates:[r]}],null)},queryLayer:function(e){var t=e.layer,r=e.ids||null,n=new h;return n.where="1=1",n.returnGeometry=!1,n.objectIds=r,t.queryFeatures(n)},queryLayerForFeature:function(e){return this.queryLayerForFeatures({layer:e.layer,ids:[e.id]})},queryLayerForFeatures:function(e){var t=e.layer,r=t.advancedQueryCapabilities,n=r&&r.supportsQueryWithCacheHint,i=e.ids,a=new h;return a.objectIds=i,a.outFields=["*"],n&&(a.cacheHint=!0),t.queryFeatures(a,(function(e){return e.features}))},queryLayerForCount:function(e){var t=e.layer,r=t.advancedQueryCapabilities,n=r&&r.supportsQueryWithCacheHint;if(t.queryCount){var i=new h,a=e.layerInfo,u=e.where||"1=1";return i.returnGeometry=!1,i.returnCountOnly=!0,i.where=u,n&&(i.cacheHint=!0),t.queryCount(i).then((function(e){return e})).otherwise((function(){return a.isFeatureCollection?t.graphics.length:2e3})).always((function(e){return e}))}return this.queryLayerCustom({layer:t,returnCountOnly:!0,cacheHint:n}).then((function(e){return e&&e.features?e.features.length:0})).otherwise((function(){return t.maxRecordCount||2e3})).always((function(e){return e}))},queryLayerCustom:function(e){var t,r=new h,n=e.layer,i=e.returnCountOnly||!1,a=e.where||"1=1",u=e.returnGeometry||!1,s=e.outFields||["*"],o=e.cacheHint||!1;return t=new g(n.url),r.returnGeometry=u,r.outFields=s,r.where=a,r.returnCountOnly=i,o&&(r.cacheHint=!0),t.execute(r)},queryLayerForIds:function(e){var t=e.layer,r=t.advancedQueryCapabilities,n=r&&r.supportsQueryWithCacheHint,i=e.idProperty,a=e.where||"1=1",u=new h;return u.returnGeometry=!1,u.outFields=[i],u.where=a,u.returnIdsOnly=!0,n&&(u.cacheHint=!0),t.queryIds(u)},queryLayerForAttachments:function(e){var t=e.layer,r=e.ids,n=t._url.path+"/queryAttachments";return d({url:n,content:{f:"json",objectIds:r},handleAs:"json",callbackParamName:"callback"})},queryLayerForAttachmentById:function(e){var t=e.layer,r=e.id||0;return t.queryAttachmentInfos(r)},addAttachmentToLayer:function(e){var t=e.layer,r=e.featureId,n=e.formData;return t.addAttachment(r,n)},deleteAttachmentFromLayer:function(e){var t=e.layer,r=e.attachmentId,n=e.featureId;return t.deleteAttachments(n,[r])},queryLayerForRelatedRecords:function(e){var t=e.layer,r=e.ids,n=e.outFields||["*"],i=e.relationship,a=e.returnCountOnly||!1,u=new F;return u.outFields=n,u.returnGeometry=!1,u.relationshipId=i.id,u.returnCountOnly=a,u.objectIds=r,t.queryRelatedFeatures(u)},queryLayerForRelatedRecordCount:function(e){var t=e.layer,r=e.objectIds,n=e.relationship,i=e.outFields,a=t._url.path+"/queryRelatedRecords";return d({url:a,content:{f:"json",objectIds:r.toString(),outFields:i,returnGeometry:!1,relationshipId:n.id,returnCountOnly:!0},handleAs:"json",callbackParamName:"callback"})},getFieldStatistics:function(t){var n,i,a=new r,u=t.grid,s=t.layer,o=s.advancedQueryCapabilities,l=o&&o.supportsQueryWithCacheHint,d=t.idProperty,c=t.where||"1=1",y=t.filterIds,f=t.columnId,p=u.columns[f].field,F=s.url,b=[];return i=e.map(this.statisticDefinitions,(function(e){var t=new m;return t.onStatisticField=p,t.displayFieldName=p,t.outStatisticFieldName=e.name,t.statisticType=e.type,t})),(n=new h).outFields=[p],n.outStatistics=[],n.where=c,n.outStatistics=i,l&&(n.cacheHint=!0),y&&y.length>0&&(b=y),n.where&&b.length>0&&(n.where="("+n.where+") AND ("+d+" IN ("+b.toString()+"))"),s.source&&!this.isValueEmpty(s.source.mapLayerId)&&F.endsWith("/dynamicLayer")&&(F=(F=F.slice(0,-13))+"/"+s.source.mapLayerId),new g(F).execute(n).then((function(e){a.resolve(e)})).otherwise((function(){a.reject()})),a},selectFeaturesById:function(e){var t=e.grid,r=t.layer,n=t.layerInfo,i=e.map,a=e.ids,u=e.id,s=new h;return s.returnGeometry=!!i,s.objectIds=a||[u],n.isFeatureCollection||(s.where="1=1"),r.selectFeatures(s,f.SELECTION_NEW)},isFeatureEditable:function(e){var t=e.layer,r=e.layerInfo,n=e.attributes,i=r.layerId,a=r.userIds[i]||null;return!!t.getEditCapabilities({userId:a,feature:{attributes:n}}).canUpdate},isExpressionField:function(e){return this._reExprField.test(e)},getExpressionInfo:function(t,r){var n;if(this.isExpressionField(r))return r=(r=r.replace(this._reExprField,"")).toLowerCase(),e.some(t,(function(e){return e.name.toLowerCase()===r&&(n=e),!!n})),n},compileExpressions:function(t){var r={};return e.forEach(t,(function(e){var t=e.returnType&&e.returnType.toLowerCase();r[e.name]=new c({expression:e.expression,returnType:"number"===t?"number":"string",profile:y})})),r},getExpressionValue:function(e,t){var r=e.getLayer(),n=r&&r.getMap();return t?e.evaluateExpression(t,y.getEvalOptions({expression:t,feature:e,layer:r,map:n,spatialReference:n&&n.spatialReference})):null}}}));