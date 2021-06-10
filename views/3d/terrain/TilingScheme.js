/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../core/maybe","../../../core/Error","../../../geometry/support/spatialReferenceUtils","../../../geometry/SpatialReference","../../../geometry/support/webMercatorUtils","../../../geometry/Extent","../../../geometry","../../../core/mathUtils","../../../core/unitUtils","../../../geometry/support/aaBoundingRect","../../../geometry/projection","../../../layers/support/TileInfo"],(function(e,t,i,n,l,s,o,r,a,c,u,h,f){"use strict";const p=12;let g=function(){function l(e){const t=l.checkUnsupported(e);if(t)throw t;this.spatialReference=e.spatialReference,this._isWebMercator=this.spatialReference.isWebMercator,this._isGCS=h.canProjectToWGS84ComparableLonLat(this.spatialReference)||n.isMars(this.spatialReference)||n.isMoon(this.spatialReference),this.origin=[e.origin.x,e.origin.y],this.pixelSize=e.size[0],this.dpi=e.dpi;const i=e.lods.reduce((function(e,t,i){return t.level<e.min&&(e.min=t.level,e.minIndex=i),e.max=Math.max(e.max,t.level),e}),{min:1/0,minIndex:0,max:-1/0}),s=e.lods[i.minIndex],o=2**s.level;let r=s.resolution*o,a=s.scale*o;this.levels=new Array(i.max+1);for(let n=0;n<this.levels.length;n++)this.levels[n]={resolution:r,scale:a,tileSize:[r*e.size[0],r*e.size[1]]},r/=2,a/=2}var r=l.prototype;return r.clone=function(){return new l(this.toTileInfo())},r.toTileInfo=function(){return new f({dpi:this.dpi,origin:{x:this.origin[0],y:this.origin[1],spatialReference:this.spatialReference},size:[this.pixelSize,this.pixelSize],spatialReference:this.spatialReference,lods:this.levels.map(((e,t)=>({level:t,scale:e.scale,resolution:e.resolution})))})},r.getExtent=function(e,t,i,n){const l=this.levels[e],s=l.tileSize[0],o=l.tileSize[1];n[0]=this.origin[0]+i*s,n[2]=n[0]+s,n[3]=this.origin[1]-t*o,n[1]=n[3]-o},r.convertExtentToRadians=function(e,t){this._isWebMercator?(t[0]=s.x2lon(e[0]),t[1]=s.y2lat(e[1]),t[2]=s.x2lon(e[2]),t[3]=s.y2lat(e[3])):this._isGCS&&(t[0]=a.deg2rad(e[0]),t[1]=a.deg2rad(e[1]),t[2]=a.deg2rad(e[2]),t[3]=a.deg2rad(e[3]))},r.getExtentGeometry=function(e,t,i,n=new o){return this.getExtent(e,t,i,m),n.spatialReference=this.spatialReference,n.xmin=m[0],n.ymin=m[1],n.xmax=m[2],n.ymax=m[3],n.zmin=void 0,n.zmax=void 0,n},r.ensureMaxLod=function(e){if(null==e)return!1;let t=!1;for(;this.levels.length<=e;){const e=this.levels[this.levels.length-1],i=e.resolution/2;this.levels.push({resolution:i,scale:e.scale/2,tileSize:[i*this.pixelSize,i*this.pixelSize]}),t=!0}return t},r.capMaxLod=function(e){this.levels.length>e+1&&(this.levels.length=e+1)},r.getMaxLod=function(){return this.levels.length-1},r.scaleAtLevel=function(e){return this.levels[0].scale/2**e},r.levelAtScale=function(e){const t=this.levels[0].scale;return e>=t?0:Math.log(t/e)*Math.LOG2E},r.resolutionAtLevel=function(e){return this.levels[0].resolution/2**e},r.compatibleWith=function(e){if(!(e instanceof l)){if(l.checkUnsupported(e))return!1;e=new l(e)}if(!e.spatialReference.equals(this.spatialReference))return!1;if(e.pixelSize!==this.pixelSize)return!1;const t=Math.min(this.levels.length,e.levels.length)-1,i=this.levels[t].resolution;let n=.5*i;if(!a.floatEqualAbsolute(e.origin[0],this.origin[0],n)||!a.floatEqualAbsolute(e.origin[1],this.origin[1],n))return!1;return n=.5*i/2**t/this.pixelSize*p,a.floatEqualAbsolute(i,e.levels[t].resolution,n)},r.rootTilesInExtent=function(e,i=null,n=1/0){const s=this.levels[0].tileSize;if(0===s[0]||0===s[1])return[];l.computeRowColExtent(e,s,this.origin,m);let o=m[1],r=m[3],a=m[0],c=m[2];const u=c-a,h=r-o;if(u*h>n){const e=Math.floor(Math.sqrt(n));h>e&&(o=o+Math.floor(.5*h)-Math.floor(.5*e),r=o+e),u>e&&(a=a+Math.floor(.5*u)-Math.floor(.5*e),c=a+e)}const f=[];for(let t=o;t<r;t++)for(let e=a;e<c;e++)f.push([0,t,e]);return t.isSome(i)&&(i[0]=this.origin[0]+a*s[0],i[1]=this.origin[1]-r*s[1],i[2]=this.origin[0]+c*s[0],i[3]=this.origin[1]-o*s[1]),f},l.computeRowColExtent=function(e,t,i,n){const l=.001*(e[2]-e[0]+(e[3]-e[1]));n[0]=Math.max(0,Math.floor((e[0]+l-i[0])/t[0])),n[2]=Math.max(0,Math.ceil((e[2]-l-i[0])/t[0])),n[1]=Math.max(0,Math.floor((i[1]-e[3]+l)/t[1])),n[3]=Math.max(0,Math.ceil((i[1]-e[1]-l)/t[1]))},l.isPowerOfTwo=function(e){const t=e.lods,i=t[0].resolution*2**t[0].level;return!t.some((function(e){return!a.floatEqualRelative(e.resolution,i/2**e.level)}))},l.hasGapInLevels=function(e){const t=e.lods.map((function(e){return e.level}));t.sort((function(e,t){return e-t}));for(let i=1;i<t.length;i++)if(t[i]!==t[0]+i)return!0;return!1},l.tileSizeSupported=function(e){const t=e.size[1];return t===e.size[0]&&0==(t&t-1)&&t>=128&&t<=512},l.checkUnsupported=function(e){return e?e.lods.length<1?new i("tilingscheme:generic","Tiling scheme must have at least one level"):l.isPowerOfTwo(e)?l.hasGapInLevels(e)?new i("tilingscheme:gaps","Tiling scheme levels must not have gaps between min and max level"):l.tileSizeSupported(e)?null:new i("tilingscheme:tile-size","Tiles must be square and size must be one of [128, 256, 512]"):new i("tilingscheme:power-of-two","Tiling scheme must be power of two"):new i("tilingscheme:tile-info-missing","Tiling scheme must have tiling information")},l.fromExtent=function(e,t){const i=e[2]-e[0],n=e[3]-e[1],s=c.getMetersPerUnitForSR(t),o=1.2*Math.max(i,n),r=256,a=96,u=.0254,h=new l(new f({size:[r,r],origin:{x:e[0]-.5*(o-i),y:e[3]+.5*(o-n)},lods:[{level:0,resolution:o/r,scale:1/(r/a*u/(o*s))}],spatialReference:t}));return h.ensureMaxLod(20),h},l.makeWebMercatorAuxiliarySphere=function(e){const t=new l(l.WebMercatorAuxiliarySphereTileInfo);return t.ensureMaxLod(e),t},l.makeGCSWithTileSize=function(e,t=256,i=16){const n=256/t,s=new l(new f({size:[t,t],origin:{x:-180,y:90,spatialReference:e},spatialReference:e,lods:[{level:0,resolution:.703125*n,scale:295497598.570834*n}]}));return s.ensureMaxLod(i),s},e._createClass(l,[{key:"test",get:function(){return{isWebMercator:this._isWebMercator,isGCS:this._isGCS}}}]),l}();g.WebMercatorAuxiliarySphereTileInfo=new f({size:[256,256],origin:{x:-20037508.342787,y:20037508.342787,spatialReference:l.WebMercator},spatialReference:l.WebMercator,lods:[{level:0,resolution:156543.03392800014,scale:591657527.591555}]}),g.WebMercatorAuxiliarySphere=g.makeWebMercatorAuxiliarySphere(19);const m=u.create();return g}));
