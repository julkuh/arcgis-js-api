/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../geometry/support/spatialReferenceUtils","../featureConversionUtils","../../../geometry/support/quantizationUtils","./projectionSupport","./attributeSupport","./AttributesBuilder","./utils","./timeSupport"],(function(e,t,s,i,r,n,o,a,u,c){"use strict";function l(e){return e.substr(24,12)+e.substr(19,4)+e.substr(16,2)+e.substr(14,2)+e.substr(11,2)+e.substr(9,2)+e.substr(6,2)+e.substr(4,2)+e.substr(2,2)+e.substr(0,2)}function h(e,t,s){return(s?e>t:e<t)?-1:(s?e<t:e>t)?1:0}function f(e,t,s){return s?t-e:e-t}function d(e,t,s,i){if(s&&"esriFieldTypeDate"===s.type){const s=new Date(e).getTime(),r=new Date(t).getTime();if(!isNaN(s)&&!isNaN(r))return f(s,r,i)}if("number"==typeof e&&"number"==typeof t)return f(e,t,i);if("string"==typeof e&&"string"==typeof t){const r=e.toUpperCase(),n=t.toUpperCase();return!s||"esriFieldTypeGUID"!==s.type&&"esriFieldTypeGlobalID"!==s.type?h(r,n,i):h(l(r),l(n),i)}return i?1:-1}function m(e,t,s,i,r,n){const o=r-s,a=n-i,u=o*o+a*a,c=(e-s)*o+(t-i)*a,l=Math.min(1,Math.max(0,c/u));return{x:s+o*l,y:i+a*l}}function p(e,t){return e?t?4:3:t?3:2}return function(){function l(e,t,s){this.items=e,this.queryGeometry=t,this.definitionExpression=s.definitionExpression,this.geometryType=s.geometryType,this.hasM=s.hasM,this.hasZ=s.hasZ,this.objectIdField=s.objectIdField,this.spatialReference=s.spatialReference,this.fieldsIndex=s.fieldsIndex,this.timeInfo=s.timeInfo,this.featureAdapter=s.featureAdapter,this.aggregateAdapter=s.aggregateAdapter}var h=l.prototype;return h.createQueryResponseForCount=function(e){const t=new a(e,this.featureAdapter,this.fieldsIndex);if(!e.outStatistics)return t.countDistinctValues(this.items);const{groupByFieldsForStatistics:s,having:i}=e;if(!!!(null==s?void 0:s.length))return 1;const r=new Map,n=new Map,o=new Set,u=e.outStatistics;for(const a of u){const{statisticType:e}=a,u="exceedslimit"!==e?a.onStatisticField:void 0;if(!n.has(u)){const e=[];for(const i of s){const s=this._getAttributeValues(t,i,r);e.push(s)}n.set(u,this._calculateUniqueValues(e))}const c=n.get(u);for(const s in c){const{data:e,items:r}=c[s],n=e.join(",");i&&!t.validateItems(r,i)||o.add(n)}}return o.size},h.createQueryResponse=function(e){let t;if(e.outStatistics){t=e.outStatistics.some((e=>"exceedslimit"===e.statisticType))?this._createExceedsLimitQueryResponse(e):this._createStatisticsQueryResponse(e)}else t=this._createFeatureQueryResponse(e);return e.returnQueryGeometry&&(s.isValid(e.outSR)&&!s.equals(this.queryGeometry.spatialReference,e.outSR)?t.queryGeometry=u.cleanFromGeometryEngine({spatialReference:e.outSR,...n.project(this.queryGeometry,this.queryGeometry.spatialReference,e.outSR)}):t.queryGeometry=u.cleanFromGeometryEngine({spatialReference:e.outSR,...this.queryGeometry})),t},h.createSnappingResponse=function(e,t){const s=this.featureAdapter,i=p(this.hasZ,this.hasM),{x:r,y:n}=e.point,o="number"==typeof e.distance?e.distance:e.distance.x,a="number"==typeof e.distance?e.distance:e.distance.y,u={candidates:[]},c="esriGeometryPolygon"===this.geometryType,l=this.getPointCreator(e.point,this.spatialReference,t);for(const h of this.items){const t=s.getGeometry(h);if(!t)continue;const{coords:f,lengths:d}=t;if(1&e.types){let e=0;for(let t=0;t<d.length;t++){const c=d[t];for(let t=0;t<c;t++,e+=i){const d=f[e],p=f[e+1];if(t!==c-1){const t=f[e+i],c=f[e+i+1],{x:y,y:g}=m(r,n,d,p,t,c),I=(r-y)/o,b=(n-g)/a,x=I*I+b*b;x<=1&&u.candidates.push({type:"edge",objectId:s.getObjectId(h),distance:Math.sqrt(x),target:l(y,g),start:l(d,p),end:l(t,c)})}}}}if(2&e.types){const e=c?f.length-i:f.length;for(let t=0;t<e;t+=i){const e=f[t],i=f[t+1],c=(r-e)/o,d=(n-i)/a,m=c*c+d*d;m<=1&&u.candidates.push({type:"vertex",objectId:s.getObjectId(h),distance:Math.sqrt(m),target:l(e,i)})}}}return u.candidates.sort(((e,t)=>e.distance-t.distance)),u},h.getPointCreator=function(e,i,r){const o=t.isSome(r)&&!s.equals(i,r)?e=>n.project(e,i,r):e=>e;return null!=e.z&&null!=e.m?(t,s)=>o({x:t,y:s,z:e.z,m:e.m}):null!=e.z?(t,s)=>o({x:t,y:s,z:e.z}):null!=e.m?(t,s)=>o({x:t,y:s,m:e.m}):(e,t)=>o({x:e,y:t})},h.executeAttributesQuery=function(e){const t=o.getWhereClause(e.where,this.fieldsIndex);if(!t)return Promise.resolve(this);if(t.isStandardized){let s=0;const i=[];for(const e of this.items)t.testFeature(e,this.featureAdapter)&&(i[s++]=e);const r=new l(i,this.queryGeometry,this);return r.definitionExpression=e.where,Promise.resolve(r)}return Promise.reject(new TypeError("Where clause is not standardized"))},h.executeAggregateIdsQuery=function(e){if(!e.aggregateIds||!e.aggregateIds.length||t.isNone(this.aggregateAdapter))return Promise.resolve(this);const s=new Set;for(const t of e.aggregateIds){this.aggregateAdapter.getFeatureObjectIds(t).forEach((e=>s.add(e)))}const i=this.featureAdapter.getObjectId;return Promise.resolve(new l(this.items.filter((e=>s.has(i(e)))),this.queryGeometry,this))},h.executeObjectIdsQuery=function(e){if(!e.objectIds||!e.objectIds.length)return Promise.resolve(this);const t=new Set(e.objectIds),s=this.featureAdapter.getObjectId;return Promise.resolve(new l(this.items.filter((e=>t.has(s(e)))),this.queryGeometry,this))},h.executeTimeQuery=function(e){const s=c.getTimeOperator(this.timeInfo,e.timeExtent,this.featureAdapter);if(!t.isSome(s))return Promise.resolve(this);const i=this.items.filter(s);return Promise.resolve(new l(i,this.queryGeometry,this))},h.filterLatest=function(){const{trackIdField:e,startTimeField:t,endTimeField:s}=this.timeInfo,i=s||t,r=new Map,n=this.featureAdapter.getAttribute;for(const a of this.items){const t=n(a,e),s=n(a,i),o=r.get(t);(!o||s>n(o,i))&&r.set(t,a)}const o=Array.from(r.values());return Promise.resolve(new l(o,this.queryGeometry,this))},h.project=async function(e){if(!e||s.equals(this.spatialReference,e))return this;const t=this.featureAdapter;return new l((await n.projectMany(this.items.map((e=>u.getGeometry(this.geometryType,this.hasZ,this.hasM,t.getGeometry(e)))),this.spatialReference,e)).map(((e,s)=>t.cloneWithGeometry(this.items[s],i.convertFromGeometry(e,this.hasZ,this.hasM)))),this.queryGeometry,{definitionExpression:this.definitionExpression,geometryType:this.geometryType,hasM:this.hasM,hasZ:this.hasZ,objectIdField:this.objectIdField,spatialReference:e,fieldsIndex:this.fieldsIndex,timeInfo:this.timeInfo,featureAdapter:this.featureAdapter})},h._sortFeatures=function(e,t,s){if(e.length>1&&t&&t.length)for(const i of t.reverse()){const t=i.split(" "),r=t[0],n=this.fieldsIndex.get(r),o=t[1]&&"desc"===t[1].toLowerCase();e.sort(((e,t)=>d(s(e,r,n),s(t,r,n),n,o)))}},h._createFeatureQueryResponse=function(e){const t=this.items,{geometryType:s,hasM:i,hasZ:n,objectIdField:o,spatialReference:a}=this,{outFields:c,outSR:l,quantizationParameters:h,resultRecordCount:f,resultOffset:d,returnZ:m,returnM:p}=e,y=null!=f&&t.length>(d||0)+f,g=c&&(c.indexOf("*")>-1?[...this.fieldsIndex.fields]:c.map((e=>this.fieldsIndex.get(e))));return{exceededTransferLimit:y,features:this._createFeatures(e,t),fields:g,geometryType:s,hasM:i&&p,hasZ:n&&m,objectIdFieldName:o,spatialReference:u.cleanFromGeometryEngine(l||a),transform:h&&r.toQuantizationTransform(h)||null}},h._createFeatures=function(e,t){const s=new a(e,this.featureAdapter,this.fieldsIndex),{hasM:i,hasZ:n}=this,{orderByFields:o,quantizationParameters:c,returnGeometry:l,returnCentroid:h,maxAllowableOffset:f,resultOffset:d,resultRecordCount:m,returnZ:p=!1,returnM:y=!1}=e,g=n&&p,I=i&&y;let b=[],x=0;const F=[...t];if(this._sortFeatures(F,o,((e,t,i)=>s.getFieldValue(e,t,i))),l||h){const e=r.toQuantizationTransform(c);if(l&&!h)for(const t of F)b[x++]={attributes:s.getAttributes(t),geometry:u.getGeometry(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(t),f,e,g,I)};else if(!l&&h)for(const t of F)b[x++]={attributes:s.getAttributes(t),centroid:u.transformCentroid(this,this.featureAdapter.getCentroid(t,this),e)};else for(const t of F)b[x++]={attributes:s.getAttributes(t),centroid:u.transformCentroid(this,this.featureAdapter.getCentroid(t,this),e),geometry:u.getGeometry(this.geometryType,this.hasZ,this.hasM,this.featureAdapter.getGeometry(t),f,e,g,I)}}else for(const r of F){const e=s.getAttributes(r);e&&(b[x++]={attributes:e})}const T=d||0;if(null!=m){const e=T+m;b=b.slice(T,Math.min(b.length,e))}return b},h._createExceedsLimitQueryResponse=function(e){let t=!1,s=Number.POSITIVE_INFINITY,i=Number.POSITIVE_INFINITY,r=Number.POSITIVE_INFINITY;for(const n of e.outStatistics)if("exceedslimit"===n.statisticType){s=null!=n.maxPointCount?n.maxPointCount:Number.POSITIVE_INFINITY,i=null!=n.maxRecordCount?n.maxRecordCount:Number.POSITIVE_INFINITY,r=null!=n.maxVertexCount?n.maxVertexCount:Number.POSITIVE_INFINITY;break}if("esriGeometryPoint"===this.geometryType)t=this.items.length>s;else if(this.items.length>i)t=!0;else{const e=this.hasZ?this.hasM?4:3:this.hasM?3:2,s=this.featureAdapter;t=this.items.reduce(((e,t)=>{const i=s.getGeometry(t);return e+(i&&i.coords.length||0)}),0)/e>r}return{fields:[{name:"exceedslimit",type:"esriFieldTypeInteger",alias:"exceedslimit",sqlType:"sqlTypeInteger",domain:null,defaultValue:null}],features:[{attributes:{exceedslimit:Number(t)}}]}},h._createStatisticsQueryResponse=function(e){const t={attributes:{}},s=[],i=new Map,r=new Map,n=new Map,o=new Map,u=new a(e,this.featureAdapter,this.fieldsIndex),c=e.outStatistics,{groupByFieldsForStatistics:l,having:h,orderByFields:f}=e,d=l&&l.length,m=!!d,p=m&&l[0],y=m&&!this.fieldsIndex.get(p);for(const a of c){const{outStatisticFieldName:e,statisticType:c}=a,f=a,g="exceedslimit"!==c?a.onStatisticField:void 0,I="percentile_disc"===c||"percentile_cont"===c,b=m&&1===d&&(g===p||y)&&"count"===c;if(m){if(!n.has(g)){const e=[];for(const t of l){const s=this._getAttributeValues(u,t,i);e.push(s)}n.set(g,this._calculateUniqueValues(e,u.returnDistinctValues))}const t=n.get(g);for(const s in t){const{count:r,data:n,items:a,itemPositions:c}=t[s],d=n.join(",");if(!h||u.validateItems(a,h)){const t=o.get(d)||{attributes:{}};let s=null;if(b)s=r;else{const e=this._getAttributeValues(u,g,i),t=c.map((t=>e[t]));s=I&&"statisticParameters"in f?this._getPercentileValue(f,t):this._getStatisticValue(f,t)}t.attributes[e]=s,l.forEach(((e,s)=>t.attributes[this.fieldsIndex.get(e)?e:`EXPR_${s+1}`]=n[s])),o.set(d,t)}}}else{const s=this._getAttributeValues(u,g,i);t.attributes[e]=I&&"statisticParameters"in f?this._getPercentileValue(f,s):this._getStatisticValue(f,s,r)}s.push({name:e,alias:e,type:"esriFieldTypeDouble"})}const g=m?Array.from(o.values()):[t];return this._sortFeatures(g,f,((e,t)=>e.attributes[t])),{fields:s,features:g}},h._getStatisticValue=function(e,t,s){const{onStatisticField:i,statisticType:r}=e,n=s&&s.has(i)?s.get(i):this._calculateStatistics(t);s&&s.set(i,n);return n["var"===r?"variance":r]},h._getPercentileValue=function(e,t){const{onStatisticField:s,statisticParameters:i,statisticType:r}=e,{value:n,orderBy:o}=i,a="desc"===o,u=this.fieldsIndex.get(s),c=[...t].filter((e=>null!=e)).sort(((e,t)=>d(e,t,u,a)));return this._calculatePercentile(c,n,"percentile_disc"===r)},h._getAttributeValues=function(e,t,s){if(s.has(t))return s.get(t);const i=this.fieldsIndex.get(t),r=this.items.map((s=>e.getFieldValue(s,t,i)));return s.set(t,r),r},h._calculateStatistics=function(e){let t=Number.POSITIVE_INFINITY,s=Number.NEGATIVE_INFINITY,i=null,r=null,n=null,o=null;const a=[];let u=0;for(const c of e)"string"==typeof c?u++:null==c||isNaN(c)||(i+=c,t=Math.min(t,c),s=Math.max(s,c),a.push(c),u++);if(u){r=i/u;let e=0;for(const t of a)e+=(t-r)**2;o=u>1?e/(u-1):0,n=Math.sqrt(o)}else t=null,s=null;return{avg:r,count:u,max:s,min:t,stddev:n,sum:i,variance:o}},h._calculateUniqueValues=function(e,t){const s={},i=this.items,r=i.length;for(let n=0;n<r;n++){const r=i[n],o=[];for(const t of e)o.push(t[n]);const a=o.join(",");t?null==s[a]&&(s[a]={count:1,data:o,items:[r],itemPositions:[n]}):null==s[a]?s[a]={count:1,data:o,items:[r],itemPositions:[n]}:(s[a].count++,s[a].items.push(r),s[a].itemPositions.push(n))}return s},h._calculatePercentile=function(e,t,s){if(0===e.length)return null;if(t<=0)return e[0];if(t>=1)return e[e.length-1];const i=(e.length-1)*t,r=Math.floor(i),n=r+1,o=i%1,a=e[r],u=e[n];return n>=e.length||s||"string"==typeof a||"string"==typeof u?a:a*(1-o)+u*o},e._createClass(l,[{key:"size",get:function(){return this.items.length}}]),l}()}));
