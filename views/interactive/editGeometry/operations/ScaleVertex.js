/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/arrayUtils","../../../../chunks/vec2f64","../../../../chunks/vec2","./UpdateVertices"],(function(t,c,a,i,e,s){"use strict";let r=function(t){function s(c,a,s,r,o,n=0){var u;return(u=t.call(this,c)||this).origin=a,u.axis1=s,u.factor1=r,u.factor2=o,u.accumulationType=n,u.axis2=e.set(i.create(),s[1],-s[0]),u}c._inheritsLoose(s,t);var r=s.prototype;return r.scale=function(t,c,a){this.helper.scale(t.pos,this.origin,this.axis1,c),this.helper.scale(t.pos,this.origin,this.axis2,a)},r.apply=function(t){this.scale(t,this.factor1,this.factor2)},r.undo=function(t){this.scale(t,1/this.factor1,1/this.factor2)},r.canAccumulate=function(t){return t instanceof s&&a.equals(this.origin,t.origin)&&a.equals(this.axis1,t.axis1)},r.accumulate=function(t,c){1===c.accumulationType?this.scale(t,c.factor1/this.factor1,c.factor2/this.factor2):this.scale(t,c.factor1,c.factor2)},r.accumulateParams=function(t){const c=1===t.accumulationType;this.factor1=c?t.factor1:this.factor1*t.factor1,this.factor2=c?t.factor2:this.factor2*t.factor2},s}(s.PerVertexOperation);t.ScaleVertex=r,Object.defineProperty(t,"__esModule",{value:!0})}));