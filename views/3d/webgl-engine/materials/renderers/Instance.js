/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/mat4","../../../../../chunks/mat4f64"],(function(t,o,r){"use strict";let n=function(t,n,s,i,f,e){this.from=t,this.to=n,this.isVisible=s,this.hasHighlights=i,this.hasOccludees=f,this.transformation=e,null!=e&&(this.transformationNormal=r.clone(e),o.invert(this.transformationNormal,this.transformationNormal),o.transpose(this.transformationNormal,this.transformationNormal))};function s(t){return t.sort(((t,o)=>t.from===o.from?t.to>o.to?1:t.to<o.to?-1:0:t.from>o.from?1:t.from<o.from?-1:0))}function i(t,o){return t.first+t.count>=o.from}function f(t,o){const r=t=>({first:t.from,count:t.to-t.from});if(0===t.length)return void t.push(r(o));const n=t[t.length-1];if(i(n,o)){const t=o.from-n.first+o.to-o.from;n.count=t}else t.push(r(o))}t.Instance=n,t.addOrMerge=f,t.sortInstancesAccordingToRange=s,Object.defineProperty(t,"__esModule",{value:!0})}));
