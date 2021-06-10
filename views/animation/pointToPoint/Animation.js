/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../easing","./Settings","./Definition","./apex/Path"],(function(t,i,n,e,a){"use strict";const s={zoom:0,pan:0,rotate:0};let o=function(){function t(t){this.createCamera=t,this.time=0,this.definition=new e.Definition(t),this.path=new a.Path}var o=t.prototype;return o.update=function(t,i,n){this.definition.update(t,i,n),this.path.update(this.definition,n),this.time=this._applyTimeSettings(this.path.time,n),this.settings=n},o.cameraAt=function(t,n){n=n||this.createCamera(),t=Math.min(Math.max(0,t),1),t=this.settings.easing?this.normalizedEasing(this.settings.easing,t):this.time>=1?this.normalizedEasing(i.inOutCoastQuad,t):this.normalizedEasing(i.outExpo,t);const e=this.path.interpolateComponentsAt(t,s);return n.interpolate(this.definition.source,this.definition.target,e),n},o.normalizedEasing=function(t,i){const n=t(0),e=t(1);return(t(i)-n)/(e-n)},o._applyTimeSettings=function(t,i){const e=null!=i.speedFactor?i.speedFactor:1;null!=i.duration?t=i.duration:null!=i.speedFactor&&(t/=e);const a=null!=i.minDuration?i.minDuration:n.defaultSettings.minDuration/e,s=null!=i.maxDuration?i.maxDuration:n.defaultSettings.maxDuration/e;return t=Math.min(Math.max(a,t),s)},t}();t.Animation=o,t.default=o,Object.defineProperty(t,"__esModule",{value:!0})}));
