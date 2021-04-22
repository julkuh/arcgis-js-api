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

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/connect","dojo/_base/Color","dojo/has","dojo/dom-style","dojox/gfx/Moveable","dojox/gfx/matrix","../kernel","../lang","../geometry/Point","../geometry/Polyline","../symbols/SimpleMarkerSymbol","../geometry/webMercatorUtils","../geometry/jsonUtils","../graphic"],(function(t,e,o,i,s,r,a,h,n,_,c,l,x,f,d,g,p){var m=t(null,{declaredClass:"esri.toolbars._Box",constructor:function(t,o,i,s,r,a,h){this._graphic=t,this._map=o,this._toolbar=i,this._scale=s,this._rotate=r,this._defaultEventArgs={},this._scaleEvent="Scale",this._rotateEvent="Rotate",this._uniformScaling=a;var n=i._options;this._markerSymbol=n.boxHandleSymbol,this._lineSymbol=n.boxLineSymbol,this._moveStartHandler=e.hitch(this,this._moveStartHandler),this._firstMoveHandler=e.hitch(this,this._firstMoveHandler),this._moveStopHandler=e.hitch(this,this._moveStopHandler),this._moveHandler=e.hitch(this,this._moveHandler),this._isTextPoint=h,this._init()},destroy:function(){this._cleanUp(),this._graphic=this._map=this._toolbar=this._markerSymbol=this._lineSymbol=null},refresh:function(){this._draw()},suspend:function(){o.forEach(this._getAllGraphics(),(function(t){t.hide()}))},resume:function(){o.forEach(this._getAllGraphics(),(function(t){t.show()})),this._draw()},_init:function(){this._draw()},_cleanUp:function(){this._connects&&o.forEach(this._connects,i.disconnect);var t=this._toolbar._scratchGL;this._anchors&&o.forEach(this._anchors,(function(e){t.remove(e.graphic);var o=e.moveable;o&&o.destroy()})),this._box&&t.remove(this._box),this._box=this._anchors=this._connects=null},_draw:function(){if(this._graphic.getDojoShape()){var t=this._map,i=this._toolbar._scratchGL,s=this._getBoxCoords(),r=new x(t.spatialReference),a=e.clone(o.filter(s,(function(t,e){return 8!==e&&e%2==0})));a[0]&&a.push([a[0][0],a[0][1]]),r.addPath(a),this._rotate&&r.addPath([s[1],s[8]]),this._box?this._box.setGeometry(r):(this._box=new p(r,this._lineSymbol),i.add(this._box)),this._anchors?o.forEach(this._anchors,(function(e,o){this._scale||(o=8);var i=new l(s[o],t.spatialReference);e.graphic.setGeometry(i);var r=e.moveable,a=e.graphic.getDojoShape();a&&(r?a!==r.shape&&(r.destroy(),e.moveable=this._getMoveable(e.graphic,o)):e.moveable=this._getMoveable(e.graphic,o))}),this):(this._anchors=[],this._connects=[],o.forEach(s,(function(e,o){if(this._scale||!(o<8)){e=new l(e,t.spatialReference);var s=new p(e,this._markerSymbol);this._isTextPoint&&o%2==1&&s.hide(),i.add(s),this._anchors.push({graphic:s,moveable:this._getMoveable(s,o)})}}),this))}else this._cleanUp()},_getBoxCoords:function(t){var i,s,r,a,h=this._map,n=[];if(this._isTextPoint){var _=this._graphic.getNode().getBoundingClientRect(),c=h.__container.getBoundingClientRect();i=[{x:_.left-c.left,y:_.top-c.top},{x:_.right-c.left,y:_.top-c.top},{x:_.right-c.left,y:_.bottom-c.top},{x:_.left-c.left,y:_.bottom-c.top}]}else{var l=this._graphic;i=this._getTransformedBoundingBox(l)}if(o.forEach(i,(function(e,o,i){s=e,(r=i[o+1])||(r=i[0]),a={x:(s.x+r.x)/2,y:(s.y+r.y)/2},t||(s=h.toMap(s),a=h.toMap(a)),n.push([s.x,s.y]),n.push([a.x,a.y])})),this._rotate){var x=e.clone(n[1]);(x=t?{x:x[0],y:x[1]}:h.toScreen({x:x[0],y:x[1],spatialReference:h.spatialReference})).y-=this._toolbar._options.rotateHandleOffset,t||(x=h.toMap(x)),n.push([x.x,x.y])}return n},_getTransformedBoundingBox:function(t){var e=this._map,o=t.geometry.getExtent(),i=t.geometry.spatialReference,s=new l(o.xmin,o.ymax,i),r=new l(o.xmax,o.ymin,i);return s=e.toScreen(s),r=e.toScreen(r),[{x:s.x,y:s.y},{x:r.x,y:s.y},{x:r.x,y:r.y},{x:s.x,y:r.y}]},_getAllGraphics:function(){var t=[this._box];return this._anchors&&o.forEach(this._anchors,(function(e){t.push(e.graphic)})),t=o.filter(t,c.isDefined)},_getMoveable:function(t,e){var o=t.getDojoShape();if(o){var s=new h(o);s._index=e,this._connects.push(i.connect(s,"onMoveStart",this._moveStartHandler)),this._connects.push(i.connect(s,"onFirstMove",this._firstMoveHandler)),this._connects.push(i.connect(s,"onMoveStop",this._moveStopHandler)),s.onMove=this._moveHandler;var r=o.getEventSource();return r&&a.set(r,"cursor",this._toolbar._cursors["box"+e]),s}},_moveStartHandler:function(t){this._toolbar["on"+(8===t.host._index?this._rotateEvent:this._scaleEvent)+"Start"](this._graphic)},_firstMoveHandler:function(t){this._toolbar._deactivateScrollWheel();var i,s,r,a=t.host._index,h=this._wrapOffset=t.host.shape._wrapOffsets[0]||0,_=this._graphic.getLayer().getNavigationTransform(),c=n,l=o.map(this._getBoxCoords(!0),(function(t){return{x:t[0]+h,y:t[1]}}));r=this._isTextPoint?this._map.toScreen(this._graphic.geometry):{x:l[1].x,y:l[3].y},this._centerCoord=c.multiplyPoint(c.invert(_),r),8===a?(i=c.multiplyPoint(c.invert(_),l[1]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,i)),this._startLine=[this._centerCoord,i],this._moveLine=e.clone(this._startLine)):(i=c.multiplyPoint(c.invert(_),l[a]),s=c.multiplyPoint(c.invert(_),l[(a+4)%8]),this._isTextPoint&&(this._centerCoord=this._deNormalizePoint(this._centerCoord,i)),this._firstMoverToAnchor=Math.sqrt((i.x-this._centerCoord.x)*(i.x-this._centerCoord.x)+(i.y-this._centerCoord.y)*(i.y-this._centerCoord.y)),this._startBox=s,this._startBox.width=l[4].x-l[0].x,this._startBox.height=l[4].y-l[0].y,this._moveBox=e.clone(this._startBox),this._xfactor=i.x>s.x?1:-1,this._yfactor=i.y>s.y?1:-1,1===a||5===a?this._xfactor=0:3!==a&&7!==a||(this._yfactor=0)),this._toolbar._beginOperation("BOX"),this._toolbar["on"+(8===a?this._rotateEvent:this._scaleEvent)+"FirstMove"](this._graphic)},_moveHandler:function(t,e){var o,i,s,r,a,h,_,c,l,x,f,d=t.host._index,g=this._defaultEventArgs;if(g.angle=0,g.scaleX=1,g.scaleY=1,8===d)o=this._startLine,(r=(i=this._moveLine)[1]).x+=e.dx,r.y+=e.dy,a=this._getAngle(o,i),this._isTextPoint&&(a+=this._graphic.symbol.angle),s=n.rotategAt(a,o[0]),this._graphic.getDojoShape().setTransform(s),g.transform=s,g.angle=a,g.around=o[0];else{if(o=this._startBox,(i=this._moveBox).width+=e.dx*this._xfactor,i.height+=e.dy*this._yfactor,this._uniformScaling||this._isTextPoint?(l=i.x+this._xfactor*i.width,x=i.y+this._yfactor*i.height,f=Math.sqrt((l-this._centerCoord.x)*(l-this._centerCoord.x)+(x-this._centerCoord.y)*(x-this._centerCoord.y)),this._scaleRatio=h=_=f/this._firstMoverToAnchor,c=this._centerCoord):(h=i.width/o.width,_=i.height/o.height,c={x:o.x,y:o.y}),(isNaN(h)||h===1/0||h===-1/0)&&(h=1),(isNaN(_)||_===1/0||_===-1/0)&&(_=1),s=n.scaleAt(h,_,c),this._isTextPoint){var p=n.rotategAt(this._graphic.symbol.angle,c);this._graphic.getDojoShape().setTransform([p,s])}else this._graphic.getDojoShape().setTransform(s);g.transform=s,g.scaleX=h,g.scaleY=_,g.around=c}this._toolbar["on"+(8===d?this._rotateEvent:this._scaleEvent)](this._graphic,g)},_moveStopHandler:function(t){this._toolbar._activateScrollWheel();var e,o=this._graphic,i=this._toolbar,s=i._geo?d.geographicToWebMercator(o.geometry):o.geometry,r=s.spatialReference,a=o.getDojoShape(),h=a.getTransform(),n=o.getLayer().getNavigationTransform();this._isTextPoint?(e=this._graphic.symbol,8===t.host._index?e.angle+=this._getAngle(this._startLine,this._moveLine):e.font.setSize(Math.round(e.font.size*this._scaleRatio*100)/100),this._graphic.setSymbol(e)):(s=s.toJson(),this._updateSegments(s.paths||s.rings,h,n,r),a.setTransform(null),s=g.fromJson(s),o.setGeometry(i._geo?d.webMercatorToGeographic(s,!0):s)),this._draw(),this._startBox=this._moveBox=this._xfactor=this._yfactor=null,this._startLine=this._moveLine=null,i._endOperation("BOX"),this._defaultEventArgs.transform=h,i["on"+(8===t.host._index?this._rotateEvent:this._scaleEvent)+"Stop"](this._graphic,this._defaultEventArgs)},_updateSegments:function(t,e,i,s){var r=n,a=this._map,h=this._wrapOffset||0;o.forEach(t,(function(t){o.forEach(t,(function(t){this._updatePoint(t,s,h,r,a,i,e)}),this)}),this)},_updatePoint:function(t,e,o,i,s,r,a){var h=s.toScreen({x:t[0],y:t[1],spatialReference:e},!0);h.x+=o,(h=i.multiplyPoint([r,a,i.invert(r)],h)).x-=o;var n=s.toMap(h);t[0]=n.x,t[1]=n.y},_getAngle:function(t,e){var o=180*Math.atan2(t[0].y-t[1].y,t[0].x-t[1].x)/Math.PI;return 180*Math.atan2(e[0].y-e[1].y,e[0].x-e[1].x)/Math.PI-o},_deNormalizePoint:function(t,e){var o=this._map._getFrameWidth();if(-1===o)return t;for(var i={x:t.x,y:t.y};Math.abs(i.x-e.x)>=o;)i.x<e.x?i.x+=o:i.x-=o;var s=Math.abs(i.x-e.x);return Math.abs(i.x-e.x+o)<s?i.x+=o:Math.abs(i.x-e.x-o)<s&&(i.x-=o),i}});return r("extend-esri")&&e.setObject("toolbars._Box",m,_),m}));