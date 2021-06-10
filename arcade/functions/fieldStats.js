/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../chunks/languageUtils"],(function(e,t){"use strict";function r(e){let t=0;for(let r=0;r<e.length;r++)t+=e[r];return t/e.length}function n(e){const t=r(e);let n=0;for(let r=0;r<e.length;r++)n+=(t-e[r])**2;return n/e.length}function a(e){let t=0;for(let r=0;r<e.length;r++)t+=e[r];return t}function s(e,r){const n=[],a={},s=[];for(let u=0;u<e.length;u++){if(void 0!==e[u]&&null!==e[u]&&e[u]!==t.voidOperation){const r=e[u];if(t.isNumber(r)||t.isString(r))void 0===a[r]&&(n.push(r),a[r]=1);else{let e=!1;for(let n=0;n<s.length;n++)!0===t.equalityTest(s[n],r)&&(e=!0);!1===e&&(s.push(r),n.push(r))}}if(n.length>=r&&-1!==r)return n}return n}function u(e){switch(e.toLowerCase()){case"distinct":return"distinct";case"avg":case"mean":return"avg";case"min":return"min";case"sum":return"sum";case"max":return"max";case"stdev":case"stddev":return"stddev";case"var":case"variance":return"var";case"count":return"count"}return""}function c(e,u,c=1e3){switch(e.toLowerCase()){case"distinct":return s(u,c);case"avg":case"mean":return r(t.toNumberArray(u));case"min":return Math.min.apply(Math,t.toNumberArray(u));case"sum":return a(t.toNumberArray(u));case"max":return Math.max.apply(Math,t.toNumberArray(u));case"stdev":case"stddev":return Math.sqrt(n(t.toNumberArray(u)));case"var":case"variance":return n(t.toNumberArray(u));case"count":return u.length}return 0}e.calculateStat=c,e.decodeStatType=u,Object.defineProperty(e,"__esModule",{value:!0})}));
