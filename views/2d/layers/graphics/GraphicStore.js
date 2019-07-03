// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../../../../core/tsSupport/assignHelper","@dojo/framework/shim/iterator","@dojo/framework/shim/Map","../../../../core/has","../../../../core/screenUtils","../../../../core/libs/rbush/rbush","../../../../geometry/support/aaBoundingRect","../../../../geometry/support/contains","../../../../geometry/support/jsonUtils","../../../../geometry/support/normalizeUtils","./GraphicStoreItem","./graphicsUtils"],function(e,t,i,r,o,n,s,a,u,l,h,c,d,p){function m(e,t,i,r,o){return f.minX=t,f.minY=i,f.maxX=r,f.maxY=o,e.search(f)}Object.defineProperty(t,"__esModule",{value:!0});var f={minX:0,minY:0,maxX:0,maxY:0},y=u.create(),g=[],_=function(){function e(e,t,i,r,s,u){this._graphics=r,this._onAdd=s,this._onRemove=u,this._index=a(9,n("csp-restrictions")?function(e){return{minX:e[0],minY:e[1],maxX:e[2],maxY:e[3]}}:[".bounds[0]",".bounds[1]",".bounds[2]",".bounds[3]"]),this._itemByGraphic=new o.default,this._currentLevel=-1/0,this._tileInfoView=e,this._uidFieldName=i;var l=e.getClosestInfoForScale(t);l&&(this._currentLevel=l.level,this._resolution=this._tileInfoView.getTileResolution(l.level))}return e.prototype.hitTest=function(e,t,i,r,o){e=c.normalizeMapX(e,this._tileInfoView.spatialReference);var n=.5*r*i;y[0]=e-n,y[1]=t-n,y[2]=e+n,y[3]=t+n;var a=.5*r*(i+50),d=m(this._index,e-a,t-a,e+a,t+a);if(!d||0===d.length)return[];for(var f,g={x:e,y:t},_=[],b=0,v=d;b<v.length;b++){var x=v[b];if(x.graphic.visible)switch(h.getJsonType(x.geometry)){case"esriGeometryPoint":var G=x.symbol;if(!G)continue;var B=x.geometry,z=void 0;switch(G.type){case"text":z=p.getTextSymbolBounds(B.x,B.y,G,x.size,this._resolution,o);break;case"cim":z=p.getCIMMarkerBounds(B.x,B.y,G,this._resolution,o);break;default:z=p.getMarkerSymbolBounds(B.x,B.y,G,this._resolution,o)}l.polygonContainsPoint(z,g)&&_.push(x);break;case"esriGeometryPolyline":var w=x.symbol;if(!w)continue;f=1.5*r*window.devicePixelRatio*s.pt2px(w.width),p.isPointOnPolyline(x.geometry,e,t,f)&&_.push(x);break;case"esriGeometryEnvelope":var k=x.geometry,P=u.fromValues(k.xmin,k.ymin,k.xmax,k.ymax);u.intersects(P,y)&&_.push(x);break;case"esriGeometryPolygon":l.polygonContainsPoint(x.geometry,g)&&_.push(x);break;case"esriGeometryMultipoint":var T=x.symbol;if(!T)continue;for(var I=x.geometry.points,R=void 0,V=0;V<I.length;V++){if("text"===T.type){var A=T;R=p.getTextSymbolBounds(I[V][0],I[V][1],A,x.size,this._resolution,o)}else R=p.getMarkerSymbolBounds(I[V][0],I[V][1],T,this._resolution,o);if(l.polygonContainsPoint(R,g)){_.push(x);break}}}}return _.sort(function(e,t){var i=p.graphicGeometryToNumber(e.graphic),r=p.graphicGeometryToNumber(t.graphic);return i===r?t.zorder-e.zorder:i-r}),_.map(function(e){return e.graphic})},e.prototype.getGraphicsData=function(e,t){var r=m(this._index,e.bounds[0],e.bounds[1],e.bounds[2],e.bounds[3]);if(0===r.length||0===t.length)return[];r.sort(function(e,t){return e.zorder-t.zorder}),r[0].insertAfter=-1;for(var o=1;o<r.length;o++)r[o].insertAfter=r[o-1].graphic.uid;r.sort(function(e,t){return e.graphic.uid-t.graphic.uid}),t.sort(function(e,t){return e.uid-t.uid});for(var n,s=0,a=0,u=[],l={originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]},h=0,c=t;h<c.length;h++){var p=c[h];for(a=-2;s<r.length;)if(n=r[s],s++,p.uid===n.graphic.uid){a=n.insertAfter;break}if(n.geometry&&-2!==a){var f=n.getGeometryQuantized(l),y=i({},n.graphic.attributes);y[this._uidFieldName]=p.uid,u.push({centroid:d.default.getCentroidQuantized(n,l,this._scale),geometry:f,attributes:y,symbol:n.symbol,insertAfter:a})}}return u},e.prototype.getGraphicData=function(e,t){var r=this._itemByGraphic.get(t);if(!r)return null;var o=m(this._index,e.bounds[0],e.bounds[1],e.bounds[2],e.bounds[3]);o.sort(function(e,t){return e.zorder-t.zorder});var n=o.indexOf(r),s=0===n||-1===n?-1:o[n-1].graphic.uid,a={originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]},u=r.getGeometryQuantized(a),l=i({},r.graphic.attributes);return l[this._uidFieldName]=t.uid,{centroid:d.default.getCentroidQuantized(r,a,this._scale),geometry:u,attributes:l,symbol:r.symbol,insertAfter:s}},e.prototype.queryTileData=function(e){var t=50*e.resolution,i=u.pad(e.bounds,t,u.create()),r=m(this._index,i[0],i[1],i[2],i[3]),o=[];return this._createTileGraphics(o,r,{originPosition:"upperLeft",scale:[e.resolution,e.resolution],translate:[e.bounds[0],e.bounds[3]]}),o},e.prototype.has=function(e){return this._itemByGraphic.has(e)},e.prototype.getBounds=function(e){return this._itemByGraphic.has(e)?this._itemByGraphic.get(e).bounds:null},e.prototype.add=function(e,t,i){if(e){this._onAdd(e);var r=d.default.acquire(e,t,i,this._resolution,this._scale,this._tileInfoView.spatialReference);return this._itemByGraphic.set(e,r),i&&this._index.insert(r),r.bounds}},e.prototype.remove=function(e){if(this._itemByGraphic.has(e)){this._onRemove(e);var t=this._itemByGraphic.get(e);this._index.remove(t),this._itemByGraphic.delete(e)}},e.prototype.updateZ=function(){for(var e,t,i=this._graphics.items,r=0;r<i.length;r++)t=i[r],(e=this._itemByGraphic.get(t))&&(e.zorder=r)},e.prototype.update=function(e,t,i){var r=this._itemByGraphic.get(e),o=u.clone(r.bounds);return r.size[0]=r.size[1]=0,this._index.remove(r),r.set(e,t,i,this._resolution,this._scale,this._tileInfoView.spatialReference),i&&this._index.insert(r),{oldBounds:o,newBounds:r.bounds}},e.prototype.updateLevel=function(e){var t=this;if(this._currentLevel!==e){this._currentLevel=e;var i=this._tileInfoView.getTileResolution(e);this._resolution=i,this._scale=this._tileInfoView.getTileScale({level:e,row:0,col:0,world:0}),this._index.clear();var o=this._itemByGraphic.values();g.length=0,r.forOf(o,function(e){e.updateBounds(e.symbol,t._resolution,t._scale,t._tileInfoView.spatialReference),e.geometry&&g.push(e)}),this._index.load(g)}},e.prototype.clear=function(){this._itemByGraphic.clear(),this._index.clear()},e.prototype._createTileGraphics=function(e,t,r){var o=this._uidFieldName;t.sort(function(e,t){return e.zorder-t.zorder});for(var n,s,a,u,l=0;l<t.length;l++){a=t[l],n=a.graphic,s=a.getGeometryQuantized(r),u=0===l?-1:t[l-1].graphic.uid;var h=i({},a.graphic.attributes);h[o]=n.uid,e.push({centroid:d.default.getCentroidQuantized(a,r,this._scale),geometry:s,attributes:h,symbol:a.symbol,insertAfter:u})}},e}();t.default=_});