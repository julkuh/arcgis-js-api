/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../core/lang","../../../geometry/support/boundsUtils","../../../geometry/support/jsonUtils","../../../geometry/support/aaBoundingRect"],(function(t,n,e,i,o){"use strict";let r=function(){function t(){}return t.local=function(){return null===t.instance&&(t.instance=new t),t.instance},t.prototype.execute=function(t,n,e){return new s(t,n,e)},t}();r.instance=null;let s=function(){function t(t,n,e){this._inputGeometries=t,this._rotateAngle=void 0!==n.angle?-n.angle*Math.PI/180:0}var r=t.prototype;return r.next=function(){let t=this._inputGeometries.next();for(;t;){if(0===this._rotateAngle)return t;const r=o.create();e.getBoundsXY(r,t);const s=(r[2]+r[0])/2,u=(r[3]+r[1])/2;if(i.isExtent(t)){const n={rings:[[[t.xmin,t.ymin],[t.xmin,t.ymax],[t.xmax,t.ymax],[t.xmax,t.ymin],[t.xmin,t.ymin]]]};return this._rotateMultipath(n.rings,s,u),n}if(i.isPolygon(t)){const e=n.clone(t);return this._rotateMultipath(e.rings,s,u),e}if(i.isPolyline(t)){const e=n.clone(t);return this._rotateMultipath(e.paths,s,u),e}if(i.isMultipoint(t)){const e=n.clone(t);return this._rotatePath(e.points,s,u),e}if(i.isPoint(t))return t;t=this._inputGeometries.next()}return null},r._rotateMultipath=function(t,n,e){if(t)for(const i of t)this._rotatePath(i,n,e)},r._rotatePath=function(t,n,e){if(t){const i=Math.cos(this._rotateAngle),o=Math.sin(this._rotateAngle);for(const r of t){const t=r[0]-n,s=r[1]-e;r[0]=n+t*i-s*o,r[1]=e+t*o+s*i}}},t}();t.EffectRotate=r,Object.defineProperty(t,"__esModule",{value:!0})}));
