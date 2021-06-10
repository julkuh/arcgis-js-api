/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../../chunks/_rollupPluginBabelHelpers","../../../../../../chunks/vec2","../../../../../../chunks/mat2d","../../../../../../chunks/mat2df32","../../../../../../chunks/vec2f32","../../alignmentUtils","../../number","../../Rect","../../collisions/BoundingBox"],(function(t,e,n,i,s,o,h,r,a,c){"use strict";const f=26,u=4,l=f+u,d=f-6,_=3,g=8,m=Math.PI/180;let y=function(){function t(t,e,n,i){this._rotationT=s.create(),this._xBounds=0,this._yBounds=0,this.minZoom=0,this.maxZoom=255,this._bounds=null;const o=n.rect,h=new Float32Array(8);t*=i,e*=i;const r=n.code?o.width*i:n.metrics.width,a=n.code?o.height*i:n.metrics.height;h[0]=t,h[1]=e,h[2]=t+r,h[3]=e,h[4]=t,h[5]=e+a,h[6]=t+r,h[7]=e+a,this._data=h,this._setTextureCoords(o),this._scale=i,this._mosaic=n,this.x=t,this.y=e,this.maxOffset=Math.max(t+r,e+a)}var n=t.prototype;return n.setTransform=function(t){this._T=t,this._offsets=null},n._setOffsets=function(t){this._offsets||(this._offsets={upperLeft:0,upperRight:0,lowerLeft:0,lowerRight:0});const e=this._offsets,n=new Float32Array(8),o=i.multiply(s.create(),this._rotationT,this._T);s.transformMany(n,t,o),e.upperLeft=r.i1616to32(n[0]*g,n[1]*g),e.upperRight=r.i1616to32(n[2]*g,n[3]*g),e.lowerLeft=r.i1616to32(n[4]*g,n[5]*g),e.lowerRight=r.i1616to32(n[6]*g,n[7]*g)},n._setTextureCoords=function({x:t,y:e,width:n,height:i}){this._texcoords={upperLeft:r.i1616to32(t,e),upperRight:r.i1616to32(t+n,e),lowerLeft:r.i1616to32(t,e+i),lowerRight:r.i1616to32(t+n,e+i)}},e._createClass(t,[{key:"width",get:function(){return this._mosaic.metrics.width*this._scale}},{key:"mosaic",get:function(){return this._mosaic}},{key:"angle",get:function(){return this._angle},set:function(t){this._angle=t,i.identity(this._rotationT),i.rotate(this._rotationT,this._rotationT,-t),this._setOffsets(this._data)}},{key:"xTopLeft",get:function(){return this._data[0]}},{key:"yTopLeft",get:function(){return this._data[1]}},{key:"xBottomRight",get:function(){return this._data[6]}},{key:"yBottomRight",get:function(){return this._data[7]}},{key:"texcoords",get:function(){return this._texcoords}},{key:"textureBinding",get:function(){return this._mosaic.textureBinding}},{key:"offsets",get:function(){return this._offsets||this._setOffsets(this._data),this._offsets}},{key:"char",get:function(){return String.fromCharCode(this._mosaic.code)}},{key:"code",get:function(){return this._mosaic.code}},{key:"bounds",get:function(){if(!this._bounds){const{height:t,width:e}=this._mosaic.metrics,n=e*this._scale,o=Math.abs(t)*this._scale,h=new Float32Array(8);h[0]=this.x,h[1]=this.y,h[2]=this.x+n,h[3]=this.y,h[4]=this.x,h[5]=this.y+o,h[6]=this.x+n,h[7]=this.y+o;const r=i.multiply(s.create(),this._rotationT,this._T);s.transformMany(h,h,r);let a=1/0,f=1/0,u=0,l=0;for(let i=0;i<4;i++){const t=h[2*i],e=h[2*i+1];a=Math.min(a,t),f=Math.min(f,e),u=Math.max(u,t),l=Math.max(l,e)}const d=u-a,_=l-f,g=a+d/2,m=f+_/2;this._bounds=new c(g,m,d,_)}return this._bounds}}]),t}();const p=(t,e)=>({code:0,page:0,sdf:!0,rect:new a(0,0,11,8),textureBinding:e,metrics:{advance:0,height:4,width:t,left:0,top:0}});let x=function(){function t(t,e,n){this._rotation=0,this._decorate(t,e,n),this.glyphs=t,this.bounds=this._createBounds(t),this.isMultiline=e.length>1,this._hasRotation=0!==n.angle,this._T=this._createGlyphTransform(this.bounds,n);for(const i of t)i.setTransform(this._T)}var h=t.prototype;return h.setRotation=function(t){if(0===t&&0===this._rotation)return;this._rotation=t;const e=this._T,n=i.fromRotation(s.create(),t);i.multiply(e,n,e);for(const i of this.glyphs)i.setTransform(this._T)},h._decorate=function(t,e,n){if(!n.decoration||"none"===n.decoration||!t.length)return;const i=n.scale,s="underline"===n.decoration?l:d,o=t[0].textureBinding;for(const h of e){const e=h.startX*i,n=h.startY*i,r=(h.width+h.glyphWidthEnd)*i;t.push(new y(e,n+s*i,p(r,o),1))}},h._createBounds=function(t){let e=1/0,n=1/0,i=0,s=0;for(const r of t)e=Math.min(e,r.xTopLeft),n=Math.min(n,r.yTopLeft),i=Math.max(i,r.xTopLeft+r.width),s=Math.max(s,r.yBottomRight);const o=i-e,h=s-n;return new c(e+o/2,n+h/2,o,h)},h._createGlyphTransform=function(t,e){const h=m*e.angle,r=s.create(),a=o.create();return i.translate(r,r,n.set(a,e.xOffset,-e.yOffset)),e.isCIM?i.rotate(r,r,h):(i.translate(r,r,n.set(a,t.x,t.y)),i.rotate(r,r,h),i.translate(r,r,n.set(a,-t.x,-t.y))),r},e._createClass(t,[{key:"boundsT",get:function(){const t=this.bounds,e=n.set(o.create(),t.x,t.y);if(n.transformMat2d(e,e,this._T),this._hasRotation){const n=Math.max(t.width,t.height);return new c(e[0],e[1],n,n)}return new c(e[0],e[1],t.width,t.height)}}]),t}(),w=function(t,e,n,i,s,o){this.glyphWidthEnd=0,this.startX=0,this.startY=0,this.start=Math.max(0,Math.min(e,n)),this.end=Math.max(0,Math.max(e,n)),this.end<t.length&&(this.glyphWidthEnd=t[this.end].metrics.width),this.width=i,this.yMin=s,this.yMax=o};const M=t=>10===t,T=t=>32===t;function k(t,e,n){const i=new Array,s=1/n.scale,o=n.maxLineWidth*s,h=e?t.length-1:0,r=e?-1:t.length,a=e?-1:1;let c=h,f=0,u=0,l=c,d=l,_=0,g=1/0,m=0;for(;c!==r;){const{code:e,metrics:n}=t[c],s=Math.abs(n.top);if(M(e)||T(e)||(g=Math.min(g,s),m=Math.max(m,s+n.height)),M(e))c!==h&&(i.push(new w(t,l,c-a,f,g,m)),g=1/0,m=0),f=0,l=c+a,d=c+a,u=0;else if(T(e))d=c+a,u=0,_=n.advance,f+=n.advance;else if(f>o){if(d!==l){const e=d-2*a;f-=_,i.push(new w(t,l,e,f-u,g,m)),g=1/0,m=0,l=d,f=u}else i.push(new w(t,l,c-a,f,g,m)),g=1/0,m=0,l=c,d=c,f=0;f+=n.advance,u+=n.advance}else f+=n.advance,u+=n.advance;c+=a}const y=new w(t,l,c-a,f,g,m);return y.start>=0&&y.end<t.length&&i.push(y),i}function B(t,e){let n=0;for(let o=0;o<t.length;o++){const{width:e}=t[o];n=Math.max(e,n)}const i="underline"===e.decoration?u:0,s=t[0].yMin;return{x:0,y:s,height:t[t.length-1].yMax+e.lineHeight*(t.length-1)+i-s,width:n}}function b(t,e,n){const i=n.scale,s=new Array,o=k(t,e,n),r=B(o,n),{vAlign:a,hAlign:c}=n,u=a===h.VAlign.Baseline?1:0,l=u?0:a-1,d=(1-u)*-r.y+l*(r.height/2)+(u?1:0)*-f;for(let h=0;h<o.length;h++){const{start:e,end:r,width:a}=o[h];let f=-1*(c+1)*(a/2)-_;const u=h*n.lineHeight+d-_;o[h].startX=f,o[h].startY=u;for(let n=e;n<=r;n++){const e=t[n];if(M(e.code))continue;const o=new y(f+e.metrics.left,u-e.metrics.top,e,i);f+=e.metrics.advance,s.push(o)}}return new x(s,o,n)}t.ShapedGlyph=y,t.ShapingInfo=x,t.shapeGlyphs=b,Object.defineProperty(t,"__esModule",{value:!0})}));
