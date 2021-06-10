/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./Theme"],(function(e,t){"use strict";function n(e){const n=e.themeDictionary,s=new Map;for(const r in n){const e=n[r];s.set(r,new t(e))}return s}function s(e,t){const n=[];return e.forEach((e=>{e.isBasemapSupported(t)&&n.push({name:e.name,label:e.label,description:e.description,basemaps:[...e.supportedBasemaps]})})),n}function r(e,t){if(!e)return;if(!t)return;let n=null;const s=[t.primaryScheme,...t.secondarySchemes];for(const r of s)if(r.name.toLowerCase()===e.toLowerCase()){n=r;break}return n}function o(e,t,n){if(!e&&!t)return[];if(!n)return[];const s=!(e&&e.length),r=!(t&&t.length),o=[n.primaryScheme,...n.secondarySchemes],a=[];for(const c of o){const n=!!s||e.some((e=>c.tags.indexOf(e)>-1)),o=!r&&t.some((e=>c.tags.indexOf(e)>-1));n&&!o&&a.push(c)}return a}function a(e){const t=e.theme;if(t)return t.getRawSchemes({basemap:e.basemap,geometryType:e.geometryType,basemapTheme:e.basemapTheme})}e.createThemes=n,e.filterSchemesByName=r,e.filterSchemesByTag=o,e.getRawSchemes=a,e.getThemesforBasemap=s,Object.defineProperty(e,"__esModule",{value:!0})}));
