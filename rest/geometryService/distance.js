/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../request","../utils"],(function(e,t,n){"use strict";async function s(e,s,a){const i=n.parseUrl(e),r={...i.query,f:"json",...s.toJSON()},c=n.asValidOptions(r,a);return t(i.path+"/distance",c).then((({data:e})=>e&&e.distance))}e.distance=s,Object.defineProperty(e,"__esModule",{value:!0})}));
