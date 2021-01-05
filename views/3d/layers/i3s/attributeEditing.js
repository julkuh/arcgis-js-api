/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../core/lang","../../../../core/maybe","../support/attributeUtils"],(function(t,e,n,r){"use strict";const o={setAttribute(){},rollback(){},commit(){}};function i(t,e,n){const r=function(t,e){const n=t.get(e);if(n)return n;const r=new a;return t.set(e,r),r}(t,e),o=r.get(n);if(o)return o;const i=new Array;return r.set(n,i),i}const a=Map,s=Map;t.createInteractiveEditSession=function(t,r){const i=e.clone(r.attributes),a=new Set,s=i[t.objectIdField];if(null==s)return o;const u=t.attributeOverrides.createInteractiveEditSession(s),c=new Map;let f=0;return{setAttribute(e,o){if(0!==f)return;const i=t.fieldsIndex.get(e);if(n.isNone(i))return;const d=t.attributeStorageInfo.findIndex((t=>t.name===i.name));if(d<0)return;u.set(d,o);const l=t.attributeStorageInfo[d];let b=!1;a.add(e),t.forEachNode(((e,n)=>{const i=((t,e)=>{const n=c.get(t);if(null==n){const n=e.indexOf(s);return c.set(t,n),n}return n})(e,n);if(-1===i)return;const a=t.getAttributeData(e.index);if(a){const n=a[l.name];n&&(n[i]=o,t.setAttributeData(e.index,a,r),b=!0)}})),b&&t.clearMemCache()},rollback(){if(0===f){for(const t of a)this.setAttribute(t,i[t]);u.rollback(),f=1}},commit(){u.commit(),f=2}}},t.processAttributeEdits=function(t,e){const o=function(t,e){const n=e.edits.updateFeatures;if(!n||0===n.length)return new s;const o=function(t){const e=new Set;if(!t.updatedFeatures)return e;for(const n of t.updatedFeatures)null!=n.objectId&&null==n.error&&e.add(n.objectId);return e}(e),a=new s,u=new Map;for(let e=0;e<t.attributeStorageInfo.length;e++)u.set(t.attributeStorageInfo[e].name,e);const c=t.fieldsIndex,f=t.objectIdField,d=n.filter((t=>{const e=r.attributeLookup(c,t.attributes,f);return o.has(e)}));return t.forEachNode(((e,n)=>{const o=new Set(n);for(const s of d){const u=r.attributeLookup(c,s.attributes,f);if(!o.has(u))continue;const d=n.indexOf(u);for(const n in s.attributes){const r=t.fieldsIndex.normalizeFieldName(n),o=i(a,e.index,r),c=s.attributes[n];o.push({featureIndex:d,featureId:u,value:c})}}})),a}(t,e);if(0===o.size)return;const a=new Map;for(let e=0;e<t.attributeStorageInfo.length;e++)a.set(t.attributeStorageInfo[e].name,e);let u=!1;o.forEach(((e,r)=>{const o=t.getAttributeData(r);let i=!1;e.forEach(((e,r)=>{const s=n.isSome(o)?o[r]:null,c=a.get(r);for(const{featureIndex:n,value:r,featureId:o}of e)s&&(s[n]=r,i=!0,u=!0),t.attributeOverrides.updateValue(o,c,r)})),i&&t.setAttributeData(r,o,null)})),u&&t.clearMemCache()},Object.defineProperty(t,"__esModule",{value:!0})}));