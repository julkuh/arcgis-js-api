/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../geometry/support/jsonUtils","../../request","../utils"],(function(e,t,s,n){"use strict";async function r(e,r,i){const o=r.geometries[0].spatialReference,a=n.parseUrl(e),f={...a.query,f:"json",...r.toJSON()},p=n.asValidOptions(f,i);return s(a.path+"/densify",p).then((({data:e})=>(e.geometries||[]).map((e=>t.fromJSON(e).set({spatialReference:o})))))}e.densify=r,Object.defineProperty(e,"__esModule",{value:!0})}));
