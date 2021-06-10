/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../webgl/Geometry"],(function(e){"use strict";return function(){function t(e,t){this.values={};const s=t.keys,r=t.values;for(;e.next();)switch(e.tag()){case 1:this.id=e.getUInt64();break;case 2:{const t=e.getMessage(),n=this.values;for(;!t.empty();){const e=t.getUInt32(),o=t.getUInt32();n[s[e]]=r[o]}t.release();break}case 3:this.type=e.getUInt32();break;case 4:this._pbfGeometry=e.getMessage();break;default:e.skip()}}return t.prototype.getGeometry=function(t){if(void 0!==this._geometry)return this._geometry;if(!this._pbfGeometry)return null;const s=this._pbfGeometry;let r,n;this._pbfGeometry=null,t?t.reset(this.type):r=[];let o,i=1,a=0,u=0,c=0;for(;!s.empty();){if(0===a){const e=s.getUInt32();i=7&e,a=e>>3}switch(a--,i){case 1:u+=s.getSInt32(),c+=s.getSInt32(),t?t.moveTo(u,c):(n&&r.push(n),n=[],n.push(new e.Point(u,c)));break;case 2:u+=s.getSInt32(),c+=s.getSInt32(),t?t.lineTo(u,c):n.push(new e.Point(u,c));break;case 7:t?t.close():n&&!n[0].equals(u,c)&&n.push(n[0].clone());break;default:throw s.release(),new Error("Invalid path operation")}}return t?o=t.result():(n&&r.push(n),o=r),s.release(),this._geometry=o,o},t}()}));
