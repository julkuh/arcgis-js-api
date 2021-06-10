/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../core/has","../../../../chunks/builtins","../../../webgl/checkWebGLError","../../../webgl/Texture","../../../webgl/FramebufferObject","../webgl/Rect","./RectangleBinPack"],(function(t,i,e,s,h,a,r){"use strict";return function(){function t(t,i,e=0){this._size=[],this._mosaicsData=[],this._textures=[],this._dirties=[],this._maxItemSize=0,this._currentPage=0,this._pageWidth=0,this._pageHeight=0,this._mosaicRects={},this.pixelRatio=1,(t<=0||i<=0)&&console.error("Sprites mosaic defaultWidth and defaultHeight must be greater than zero!"),this._pageWidth=t,this._pageHeight=i,e>0&&(this._maxItemSize=e),this._binPack=new r(t-4,i-4)}var i=t.prototype;return i.getWidth=function(t){return t>=this._size.length?-1:this._size[t][0]},i.getHeight=function(t){return t>=this._size.length?-1:this._size[t][1]},i.setSpriteSource=function(t){if(this.dispose(),this.pixelRatio=t.devicePixelRatio,0===this._mosaicsData.length){this._binPack=new r(this._pageWidth-4,this._pageHeight-4);const t=Math.floor(this._pageWidth),i=Math.floor(this._pageHeight),e=new Uint32Array(t*i);this._mosaicsData[0]=e,this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0)}this._sprites=t},i.getSpriteItem=function(t,i=!1){let e=this._mosaicRects[t];if(e)return e;if(!this._sprites||"loaded"!==this._sprites.loadStatus)return null;const s=this._sprites.getSpriteInfo(t);if(!s||!s.width||!s.height||s.width<0||s.height<0)return null;const h=s.width,a=s.height,[r,n,o]=this._allocateImage(h,a);return r.width<=0?null:(this._copy(r,s,n,o,i),e={rect:r,width:h,height:a,sdf:s.sdf,simplePattern:!1,pixelRatio:s.pixelRatio,page:n},this._mosaicRects[t]=e,e)},i.getSpriteItems=function(t){const i={};for(const e of t)i[e]=this.getSpriteItem(e);return i},i.getMosaicItemPosition=function(t,i){const e=this.getSpriteItem(t,i),s=e&&e.rect;if(!s)return null;s.width=e.width,s.height=e.height;const h=e.width,a=e.height,r=2,n=this._size[e.page];return{size:[e.width,e.height],tl:[(s.x+r)/n[0],(s.y+r)/n[1]],br:[(s.x+r+h)/n[0],(s.y+r+a)/n[1]],page:e.page}},i.bind=function(t,i,e=0,h=0){this._textures[e]||(this._textures[e]=new s(t,{pixelFormat:6408,dataType:5121,wrapMode:33071,width:this._size[e][0],height:this._size[e][1]},new Uint8Array(this._mosaicsData[e].buffer)));const a=this._textures[e];a.setSamplingMode(i),this._dirties[e]&&a.setData(new Uint8Array(this._mosaicsData[e].buffer)),t.bindTexture(a,h),this._dirties[e]=!1},t._copyBits=function(t,i,e,s,h,a,r,n,o,_,c){let u=s*i+e,g=n*a+r;if(c){g-=a;for(let r=-1;r<=_;r++,u=((r+_)%_+s)*i+e,g+=a)for(let i=-1;i<=o;i++)h[g+i]=t[u+(i+o)%o]}else for(let p=0;p<_;p++){for(let i=0;i<o;i++)h[g+i]=t[u+i];u+=i,g+=a}},i._copy=function(i,e,s,h,a,r){if(!this._sprites||"loaded"!==this._sprites.loadStatus||s>=this._mosaicsData.length)return;const n=new Uint32Array(r?r.buffer:this._sprites.image.buffer),o=this._mosaicsData[s];o&&n||console.error("Source or target images are uninitialized!");const _=2,c=r?e.width:this._sprites.width;t._copyBits(n,c,e.x,e.y,o,h[0],i.x+_,i.y+_,e.width,e.height,a),this._dirties[s]=!0},i._allocateImage=function(t,i){t+=2,i+=2;const e=Math.max(t,i);if(this._maxItemSize&&this._maxItemSize<e){const e=new a(0,0,t,i);return this._mosaicsData.push(new Uint32Array(t*i)),this._dirties.push(!0),this._size.push([t,i]),this._textures.push(void 0),[e,this._mosaicsData.length-1,[t,i]]}let s=t%4?4-t%4:4,h=i%4?4-i%4:4;1===s&&(s=5),1===h&&(h=5);const n=this._binPack.allocate(t+s,i+h);return n.width<=0?(this._dirties[this._currentPage]||(this._mosaicsData[this._currentPage]=null),this._currentPage=this._mosaicsData.length,this._mosaicsData.push(new Uint32Array(this._pageWidth*this._pageHeight)),this._dirties.push(!0),this._size.push([this._pageWidth,this._pageHeight]),this._textures.push(void 0),this._binPack=new r(this._pageWidth-4,this._pageHeight-4),this._allocateImage(t,i)):[n,this._currentPage,[this._pageWidth,this._pageHeight]]},i.dispose=function(){this._binPack=null,this._mosaicRects={};for(const t of this._textures)t&&t.dispose();this._textures.length=0},t}()}));
