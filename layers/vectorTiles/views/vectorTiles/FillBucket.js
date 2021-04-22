// COPYRIGHT © 2021 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define(["require","exports","../../core/tsSupport/extendsHelper","../../core/tsSupport/decorateHelper","../../core/ArrayPool","../../core/libs/earcut/earcut","../2d/engine/webgl/Geometry","./Bucket"],(function(e,t,i,r,n,o,a,l){return function(e){function t(t,i,r,n,o,a){var l=e.call(this,t,i)||this;if(t.hasDataDrivenFill!==r.isDataDriven())throw new Error("incompatible fill buffer");if(t.hasDataDrivenOutline!==o.isDataDriven())throw new Error("incompatible outline buffer");return l._fillVertexBuffer=r,l._fillIndexBuffer=n,l._outlineVertexBuffer=o,l._outlineIndexBuffer=a,l}return i(t,e),Object.defineProperty(t.prototype,"fillIndexStart",{get:function(){return this._fillIndexStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"fillIndexCount",{get:function(){return this._fillIndexCount},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"outlineIndexStart",{get:function(){return this._outlineIndexStart},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"outlineIndexCount",{get:function(){return this._outlineIndexCount},enumerable:!0,configurable:!0}),t.prototype.assignBufferInfo=function(e){var t=e;t._fillIndexStart=this._fillIndexStart,t._fillIndexCount=this._fillIndexCount,e.layer.getPaintProperty("fill-outline-color")?(t._outlineIndexStart=this._outlineIndexStart,t._outlineIndexCount=this._outlineIndexCount):(t._outlineIndexStart=0,t._outlineIndexCount=0)},t.prototype.processFeatures=function(e,t){this._fillIndexStart=this._fillIndexBuffer.index,this._fillIndexCount=0,this._outlineIndexStart=this._outlineIndexBuffer.index,this._outlineIndexCount=0;var i=this.layer,r=this.zoom,n=i.hasDataDrivenFill,o=i.hasDataDrivenOutline;e&&e.setExtent(this.layerExtent);var a=i.getPaintValue("fill-pattern",r),l=i.getPaintValue("fill-antialias",r)&&void 0===a,u=[1,1,1,1],f=[1,1,1,1],d=1;if(i.outlineUsesFillColor){if(l&&!i.hasDataDrivenOpacity){var s=i.getPaintValue("fill-opacity",r),x=i.getPaintValue("fill-opacity",r+1);s<1&&x<1&&(l=!1)}if(l&&!i.hasDataDrivenColor){var c=i.getPaintValue("fill-color",r),h=i.getPaintValue("fill-color",r+1);c[3]<1&&h[3]<1&&(l=!1)}}for(var p=0,y=this._features;p<y.length;p++){var v=y[p];!a&&i.hasDataDrivenColor&&(u=i.getPaintValue("fill-color",r,v)),i.hasDataDrivenOpacity&&(d=i.getPaintValue("fill-opacity",r,v)),!a&&i.hasDataDrivenOutlineColor&&(f=i.getPaintValue("fill-outline-color",r,v));var _=void 0;n&&(_={color:u,opacity:d});var g=void 0;o&&(g={color:i.outlineUsesFillColor?u:f,opacity:d});var I=v.getGeometry(e);this._processFeature(I,l,i.outlineUsesFillColor,_,g)}},t.prototype._processFeature=function(e,i,r,n,o){if(e){var a=e.length;if(i&&(!r||!o||o.color[3]*o.opacity==1))for(var l=0;l<a;l++)this._processOutline(e[l],o);var u;for(l=0;l<a;l++){var f=t._area(e[l]);f>128?(void 0!==u&&this._processFill(e,u,n),u=[l]):f<-128&&void 0!==u&&u.push(l)}void 0!==u&&this._processFill(e,u,n)}},t.prototype._processOutline=function(e,t){var i,r,n,o=this._outlineVertexBuffer,l=this._outlineIndexBuffer,u=l.index,f=new a.Point(0,0),d=new a.Point(0,0),s=new a.Point(0,0),x=-1,c=-1,h=-1,p=-1,y=-1,v=!1,_=e.length;if(!(_<2)){for(var g=e[0],I=e[_-1];_&&I.isEqual(g);)I=e[--_-1];if(!(_-0<2)){for(var D=0;D<_;++D){0===D?(i=e[_-1],r=e[0],n=e[1],f.assignSub(r,i),f.normalize(),f.rightPerpendicular()):(i=r,r=n,n=D!==_-1?e[D+1]:e[0],f.assign(d));var b=this._isClipEdge(i,r);-1===p&&(v=b),d.assignSub(n,r),d.normalize(),d.rightPerpendicular();var C=f.x*d.y-f.y*d.x;s.assignAdd(f,d),s.normalize();var P=-s.x*-f.x+-s.y*-f.y,S=Math.abs(0!==P?1/P:1);S>8&&(S=8),C>=0?(h=o.add(r.x,r.y,f.x,f.y,0,1,t),-1===p&&(p=h),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),c=o.add(r.x,r.y,S*-s.x,S*-s.y,0,-1,t),-1===y&&(y=c),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),x=c,c=h,h=o.add(r.x,r.y,s.x,s.y,0,1,t),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),c=o.add(r.x,r.y,d.x,d.y,0,1,t),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h)):(h=o.add(r.x,r.y,S*s.x,S*s.y,0,1,t),-1===p&&(p=h),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),c=o.add(r.x,r.y,-f.x,-f.y,0,-1,t),-1===y&&(y=c),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),x=c,c=h,h=o.add(r.x,r.y,-s.x,-s.y,0,-1,t),x>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h),(x=o.add(r.x,r.y,-d.x,-d.y,0,-1,t))>=0&&c>=0&&h>=0&&!b&&l.add(x,c,h))}x>=0&&c>=0&&p>=0&&!v&&l.add(x,c,p),x>=0&&p>=0&&y>=0&&!v&&l.add(x,y,p),this._outlineIndexCount+=3*(l.index-u)}}},t.prototype._processFill=function(e,t,i){var r;t.length>1&&(r=[]);for(var a=0,l=0,u=t;l<u.length;l++){var f=u[l];0!==a&&r.push(a),a+=e[f].length}for(var d=2*a,s=n.acquire(),x=0,c=t;x<c.length;x++)for(var h=e[f=c[x]],p=h.length,y=0;y<p;++y)s.push(h[y].x),s.push(h[y].y);var v=o(s,r,2),_=v.length;if(_>0){for(var g=this._fillVertexBuffer.index,I=0;I<d;)this._fillVertexBuffer.add(s[I++],s[I++],i);for(var D=0;D<_;)this._fillIndexBuffer.add(g+v[D++],g+v[D++],g+v[D++]);this._fillIndexCount+=_}n.release(s)},t.prototype._isClipEdge=function(e,t){return e.x===t.x?e.x<=-64||e.x>=4160:e.y===t.y&&(e.y<=-64||e.y>=4160)},t._area=function(e){for(var t=0,i=e.length-1,r=0;r<i;r++)t+=(e[r].x-e[r+1].x)*(e[r].y+e[r+1].y);return.5*(t+=(e[i].x-e[0].x)*(e[i].y+e[0].y))},t}(l)}));