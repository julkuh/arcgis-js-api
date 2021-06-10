/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/maybe","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/subclass","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../../../geometry/Point","../../../geometry/support/coordsUtils","../../../geometry/support/boundsUtils","../../../geometry/Polygon","../../../geometry/Polyline","../../../geometry","../../../core/Evented","../../../symbols/SimpleLineSymbol","../../../symbols/SimpleFillSymbol","../../../symbols/SimpleMarkerSymbol","../../../Graphic","../../../core/Handles","../../../core/watchUtils","../../../geometry/support/aaBoundingRect","./settings","./drawUtils","./layerUtils","../../../geometry/support/rotate","./GraphicMover"],(function(t,e,i,r,o,a,s,c,h,n,l,p,u,d,_,g,y,v,f,G,m,b,S,w,k,x,R,M,I,C){"use strict";let E=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move-start"},O=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move"},L=function(t,e,i,r){this.graphics=t,this.mover=e,this.dx=i,this.dy=r,this.type="move-stop"},B=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate-start"},z=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate"},Y=function(t,e,i){this.graphics=t,this.mover=e,this.angle=i,this.type="rotate-stop"},P=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale-start"},A=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale"},N=function(t,e,i,r){this.graphics=t,this.mover=e,this.xScale=i,this.yScale=r,this.type="scale-stop"};const T=x.settings.transformGraphics,U={centerIndicator:new m({style:"cross",size:T.center.size,color:T.center.color}),fill:{default:new G({color:T.fill.color,outline:{color:T.fill.outlineColor,join:"round",width:1}}),active:new G({color:T.fill.stagedColor,outline:{color:T.fill.outlineColor,join:"round",style:"dash",width:1}})},handles:{default:new m({style:"square",size:T.vertex.size,color:T.vertex.color,outline:{color:T.vertex.outlineColor,width:1}}),hover:new m({style:"square",size:T.vertex.hoverSize,color:T.vertex.hoverColor,outline:{color:T.vertex.hoverOutlineColor,width:1}})},rotator:{default:new m({style:"circle",size:T.vertex.size,color:T.vertex.color,outline:{color:T.vertex.outlineColor,width:1}}),hover:new m({style:"circle",size:T.vertex.hoverSize,color:T.vertex.hoverColor,outline:{color:T.vertex.hoverOutlineColor,width:1}})},rotatorLine:new f({color:T.line.color,width:1})};let X=function(e){function i(t){var i;return(i=e.call(this,t)||this)._activeHandleGraphic=null,i._graphicAttributes={esriSketchTool:"box"},i._handles=new S,i._mover=null,i._rotateGraphicOffset=20,i._angleOfRotation=0,i._rotateLineGraphic=null,i._startInfo=null,i._totalDx=0,i._totalDy=0,i._xScale=1,i._yScale=1,i.type="box",i.callbacks={onMoveStart(){},onMove(){},onMoveStop(){},onScaleStart(){},onScale(){},onScaleStop(){},onRotateStart(){},onRotate(){},onRotateStop(){},onGraphicClick(){}},i.centerGraphic=null,i.backgroundGraphic=null,i.enableMovement=!0,i.enableRotation=!0,i.enableScaling=!0,i.graphics=[],i.handleGraphics=[],i.layer=null,i.preserveAspectRatio=!1,i.rotateGraphic=null,i.showCenterGraphic=!0,i.view=null,i._getBounds=(()=>{const t=k.create();return(e,i)=>{e[0]=Number.POSITIVE_INFINITY,e[1]=Number.POSITIVE_INFINITY,e[2]=Number.NEGATIVE_INFINITY,e[3]=Number.NEGATIVE_INFINITY;for(const r of i){if(!r)continue;let i,o,a,s;if("point"===r.type)i=a=r.x,o=s=r.y;else if("multipoint"===r.type){const e=u.geometryToCoordinates(r);[i,o,a,s]=d.getRingsOrPathsBounds(t,[e])}else if("extent"===r.type)[i,o,a,s]=[r.xmin,r.ymin,r.xmax,r.ymax];else{const e=u.geometryToCoordinates(r);[i,o,a,s]=d.getRingsOrPathsBounds(t,e)}e[0]=Math.min(i,e[0]),e[1]=Math.min(o,e[1]),e[2]=Math.max(a,e[2]),e[3]=Math.max(s,e[3])}return e}})(),i}t._inheritsLoose(i,e);var o=i.prototype;return o.initialize=function(){this._setup(),this._handles.add([w.whenOnce(this,"view.ready",(()=>{const{layer:t,view:e}=this;M.addUniqueLayer(e,t)})),w.pausable(this,"preserveAspectRatio",(()=>{this._activeHandleGraphic&&(this._scaleGraphic(this._activeHandleGraphic),this._updateGraphics())})),w.pausable(this,"view.scale",(()=>{this._updateRotateGraphic(),this._updateRotateLineGraphic()})),w.pausable(this,"graphics",(()=>this.refresh())),w.pausable(this,"layer",((t,e)=>{e&&this._resetGraphics(e),this.refresh()}))])},o.destroy=function(){this._reset(),this._handles&&(this._handles.removeAll(),this._handles=null)},o.isUIGraphic=function(t){let e=[];return this.handleGraphics.length&&(e=e.concat(this.handleGraphics)),this.backgroundGraphic&&e.push(this.backgroundGraphic),this.centerGraphic&&e.push(this.centerGraphic),this.rotateGraphic&&e.push(this.rotateGraphic),this._rotateLineGraphic&&e.push(this._rotateLineGraphic),e.length&&e.includes(t)},o.move=function(t,e){if(this._mover&&this.graphics.length){for(const i of this.graphics){const r=i.geometry,o=R.cloneMove(r,t,e,this.view);i.geometry=o}this.refresh(),this._emitMoveStopEvent(t,e,null)}},o.scale=function(t,e){if(this._mover&&this.graphics.length){for(const i of this.graphics){const r=i.geometry,o=R.scale(r,t,e);i.geometry=o}this.refresh(),this._emitScaleStopEvent(t,e,null)}},o.rotate=function(t,e){if(this._mover&&this.graphics.length){if(!e){const t=this.handleGraphics[1].geometry.x,i=this.handleGraphics[3].geometry.y;e=new p(t,i,this.view.spatialReference)}for(const i of this.graphics){const r=i.geometry,o=I(r,t,e);i.geometry=o}this.refresh(),this._emitRotateStopEvent(t,null)}},o.refresh=function(){this._reset(),this._setup()},o.reset=function(){this.graphics=[]},o._setup=function(){"active"===this.state&&(this._setupGraphics(),this._setupMover(),this._updateGraphics())},o._reset=function(){this._resetGraphicStateVars(),this._resetGraphics(),this._mover&&this._mover.destroy(),this._mover=null,this.view.cursor="default"},o._resetGraphicStateVars=function(){this._startInfo=null,this._activeHandleGraphic=null,this._totalDx=0,this._totalDy=0,this._xScale=1,this._yScale=1,this._angleOfRotation=0},o._resetGraphics=function(t){const e=t||this.layer;e&&(e.removeMany(this.handleGraphics),e.remove(this.backgroundGraphic),e.remove(this.centerGraphic),e.remove(this.rotateGraphic),e.remove(this._rotateLineGraphic));for(const i of this.handleGraphics)i.destroy();this._set("handleGraphics",[]),this.backgroundGraphic&&(this.backgroundGraphic.destroy(),this._set("backgroundGraphic",null)),this.centerGraphic&&(this.centerGraphic.destroy(),this._set("centerGraphic",null)),this.rotateGraphic&&(this.rotateGraphic.destroy(),this._set("rotateGraphic",null)),this._rotateLineGraphic&&(this._rotateLineGraphic.destroy(),this._rotateLineGraphic=null)},o._setupMover=function(){let t=[].concat(this.handleGraphics);this.enableMovement&&(t=t.concat(this.graphics,this.backgroundGraphic)),this.enableRotation&&t.push(this.rotateGraphic),this.showCenterGraphic&&t.push(this.centerGraphic),this._mover=new C({enableMoveAllGraphics:!1,view:this.view,graphics:t,callbacks:{onGraphicClick:t=>this._onGraphicClickCallback(t),onGraphicMoveStart:t=>this._onGraphicMoveStartCallback(t),onGraphicMove:t=>this._onGraphicMoveCallback(t),onGraphicMoveStop:t=>this._onGraphicMoveStopCallback(t),onGraphicPointerOver:t=>this._onGraphicPointerOverCallback(t),onGraphicPointerOut:t=>this._onGraphicPointerOutCallback(t)}})},o._getStartInfo=function(t){const[e,i,r,o]=this._getBoxBounds(k.create()),a=Math.abs(r-e),s=Math.abs(o-i),c=(r+e)/2,h=(o+i)/2,{x:n,y:l}=t.geometry;return{width:a,height:s,centerX:c,centerY:h,startX:n,startY:l,graphicInfos:this._getGraphicInfos(),box:this.backgroundGraphic.geometry,rotate:this.rotateGraphic.geometry}},o._getGraphicInfos=function(){return this.graphics.map((t=>this._getGraphicInfo(t)))},o._getGraphicInfo=function(t){const e=t.geometry,[i,r,o,a]=this._getBounds(k.create(),[e]);return{width:Math.abs(o-i),height:Math.abs(a-r),centerX:(o+i)/2,centerY:(a+r)/2,geometry:e}},o._onGraphicClickCallback=function(t){t.viewEvent.stopPropagation(),this.emit("graphic-click",t),this.callbacks.onGraphicClick&&this.callbacks.onGraphicClick(t)},o._onGraphicMoveStartCallback=function(t){const{_angleOfRotation:e,_xScale:i,_yScale:r,backgroundGraphic:o,handleGraphics:a,rotateGraphic:s,symbols:c}=this,h=t.graphic;this._resetGraphicStateVars(),this._hideGraphicsBeforeUpdate(),o.symbol=c.fill.active,this._startInfo=this._getStartInfo(h),h===s?(this.view.cursor="grabbing",this._emitRotateStartEvent(e,h)):a.includes(h)?(this._activeHandleGraphic=h,this._emitScaleStartEvent(i,r,h)):this._emitMoveStartEvent(t.dx,t.dy,h)},o._onGraphicMoveCallback=function(t){const e=t.graphic;if(this._startInfo)if(this.handleGraphics.includes(e))this._scaleGraphic(e),this._emitScaleEvent(this._xScale,this._yScale,e);else if(e===this.rotateGraphic)this._rotateGraphic(e),this._emitRotateEvent(this._angleOfRotation,e);else{const i=t.dx,r=t.dy;this._totalDx+=i,this._totalDy+=r,this._moveGraphic(e,i,r),this._emitMoveEvent(i,r,e)}},o._onGraphicMoveStopCallback=function(t){const e=t.graphic;if(!this._startInfo)return void this.refresh();const{_angleOfRotation:i,_totalDx:r,_totalDy:o,_xScale:a,_yScale:s,backgroundGraphic:c,handleGraphics:h,rotateGraphic:n,symbols:l}=this;this._updateGraphics(),this._showGraphicsAfterUpdate(),c.symbol=l.fill.default,e===n?(this.view.cursor="pointer",this._emitRotateStopEvent(i,e)):h.includes(e)?this._emitScaleStopEvent(a,s,e):this._emitMoveStopEvent(r,o,e),this._resetGraphicStateVars()},o._onGraphicPointerOverCallback=function(t){const{backgroundGraphic:e,handleGraphics:i,graphics:r,rotateGraphic:o,symbols:a,view:s}=this,c=t.graphic;if(c===o)return o.symbol=a.rotator.hover,void(s.cursor="pointer");if(r.includes(c)||c===e)return void(s.cursor="move");if(!i.includes(c))return void(s.cursor="pointer");t.graphic.symbol=a.handles.hover;const h=s.rotation;let n,l=t.index;switch(l<8&&(h>=0&&h<45?l%=8:l=h>=45&&h<90?(l+1)%8:h>=90&&h<135?(l+2)%8:h>=135&&h<180?(l+3)%8:h>=180&&h<225?(l+4)%8:h>=225&&h<270?(l+5)%8:h>=270&&h<315?(l+6)%8:(l+7)%8),l){case 0:n="nwse-resize";break;case 1:n="ns-resize";break;case 2:n="nesw-resize";break;case 3:n="ew-resize";break;case 4:n="nwse-resize";break;case 5:n="ns-resize";break;case 6:n="nesw-resize";break;case 7:n="ew-resize";break;default:n="pointer"}s.cursor=n},o._onGraphicPointerOutCallback=function(t){const{handleGraphics:e,rotateGraphic:i,symbols:r,view:o}=this;t.graphic===i?i.symbol=r.rotator.default:e.includes(t.graphic)&&(t.graphic.symbol=r.handles.default),o.cursor="default"},o._scaleGraphic=function(t){const{_startInfo:e,handleGraphics:i,preserveAspectRatio:r,view:o}=this,{centerX:a,centerY:s,startX:c,startY:h}=e,{resolution:n,transform:l}=o.state,u=i.indexOf(t);1!==u&&5!==u||this._updateX(t,a),3!==u&&7!==u||this._updateY(t,s);const{x:d,y:_}=t.geometry,g=l[0]*d+l[2]*_+l[4],y=l[1]*d+l[3]*_+l[5],v=e.graphicInfos.map((t=>t.geometry));if(r){const t=l[0]*a+l[2]*s+l[4],e=l[1]*a+l[3]*s+l[5],i=l[0]*c+l[2]*h+l[4],r=l[1]*c+l[3]*h+l[5];this._xScale=this._yScale=R.getScaleRatio(t,e,i,r,g,y);for(const o of v){const t=v.indexOf(o);this.graphics[t].geometry=R.scale(o,this._xScale,this._yScale,[a,s])}this._updateBackgroundGraphic()}else{const{width:t,height:i}=e;let r=d-c,l=h-_;if(1===u||5===u?r=0:3!==u&&7!==u||(l=0),0===r&&0===l)return;const g=t+(c>a?r:-1*r),y=i+(h<s?l:-1*l),f=a+r/2,G=s+l/2;this._xScale=g/t||1,this._yScale=y/i||1,1===u||5===u?this._xScale=1:3!==u&&7!==u||(this._yScale=1);const m=(f-a)/n,b=(G-s)/n,S=R.scale(e.box,this._xScale,this._yScale);this.backgroundGraphic.geometry=R.cloneMove(S,m,b,o,!0);const{centerX:w,centerY:k}=this._getGraphicInfo(this.backgroundGraphic),x=(w-a)/n,M=-1*(k-s)/n;for(const e of v){const t=v.indexOf(e),i=R.scale(e,this._xScale,this._yScale,[a,s]);this.graphics[t].geometry=R.cloneMove(i,x,M,o,!0)}this.centerGraphic.geometry=new p(w,k,o.spatialReference)}},o._rotateGraphic=function(t){const{centerX:e,centerY:i,startX:r,startY:o,box:a,rotate:s}=this._startInfo,{x:c,y:h}=t.geometry,n=new p(e,i,this.view.spatialReference);this._angleOfRotation=R.getRotationAngle(e,i,r,o,c,h);const l=this._startInfo.graphicInfos.map((t=>t.geometry));for(const p of l){const t=l.indexOf(p),e=I(p,this._angleOfRotation,n);this.graphics[t].geometry=e}this.backgroundGraphic.geometry=I(a,this._angleOfRotation,n),this.rotateGraphic.geometry=I(s,this._angleOfRotation,n)},o._moveGraphic=function(t,e,i){if(this.graphics.includes(t)){const r=this.backgroundGraphic.geometry;this.backgroundGraphic.geometry=R.cloneMove(r,e,i,this.view);for(const o of this.graphics)o!==t&&(o.geometry=R.cloneMove(o.geometry,e,i,this.view))}else if(t===this.centerGraphic){const t=this.backgroundGraphic.geometry;this.backgroundGraphic.geometry=R.cloneMove(t,e,i,this.view)}if(t===this.backgroundGraphic||t===this.centerGraphic)for(const r of this.graphics)r.geometry=R.cloneMove(r.geometry,e,i,this.view)},o._setupGraphics=function(){const{_graphicAttributes:t,symbols:e}=this;this._set("centerGraphic",new b(null,e.centerIndicator,t)),this.showCenterGraphic&&this.layer.add(this.centerGraphic),this._set("backgroundGraphic",new b(null,e.fill.default,t)),this.layer.add(this.backgroundGraphic),this._rotateLineGraphic=new b(null,e.rotatorLine,t),this._set("rotateGraphic",new b(null,e.rotator.default,t)),this.enableRotation&&!this._hasExtentGraphic()&&(this.layer.add(this._rotateLineGraphic),this.layer.add(this.rotateGraphic));for(let i=0;i<8;i++)this.handleGraphics.push(new b(null,e.handles.default,t));this.enableScaling&&this.layer.addMany(this.handleGraphics)},o._updateGraphics=function(){this._updateBackgroundGraphic(),this._updateHandleGraphics(),this._updateCenterGraphic(),this._updateRotateGraphic(),this._updateRotateLineGraphic()},o._hideGraphicsBeforeUpdate=function(){this.centerGraphic.visible=!1,this.rotateGraphic.visible=!1,this._rotateLineGraphic.visible=!1,this.handleGraphics.forEach((t=>t.visible=!1))},o._showGraphicsAfterUpdate=function(){this.enableRotation&&(this._rotateLineGraphic.visible=!0,this.rotateGraphic.visible=!0),this.showCenterGraphic&&(this.centerGraphic.visible=!0),this.enableScaling&&this.handleGraphics.forEach((t=>t.visible=!0))},o._updateHandleGraphics=function(){const t=this._getCoordinates(!0);this.handleGraphics.forEach(((e,i)=>{const[r,o]=t[i];this._updateXY(e,r,o)}))},o._updateBackgroundGraphic=function(){const t=this._getCoordinates();this.backgroundGraphic.geometry=new _({rings:t,spatialReference:this.view.spatialReference})},o._updateCenterGraphic=function(){const[t,e,i,r]=this._getBoxBounds(k.create()),o=(i+t)/2,a=(r+e)/2;this.centerGraphic.geometry=new p(o,a,this.view.spatialReference)},o._updateRotateGraphic=function(){if(!this.handleGraphics.length)return;const{x:t,y:e}=this.handleGraphics[1].geometry,i=e+this.view.state.resolution*this._rotateGraphicOffset;this.rotateGraphic.geometry=new p(t,i,this.view.spatialReference)},o._updateRotateLineGraphic=function(){if(!this.handleGraphics.length||!this.rotateGraphic||!this.rotateGraphic.geometry)return;const t=this.handleGraphics[1].geometry,e=this.rotateGraphic.geometry;this._rotateLineGraphic.geometry=new g({paths:[[t.x,t.y],[e.x,e.y]],spatialReference:this.view.spatialReference})},o._updateXY=function(t,e,i){t.geometry=new p(e,i,this.view.spatialReference)},o._updateX=function(t,e){const i=t.geometry.y;t.geometry=new p(e,i,this.view.spatialReference)},o._updateY=function(t,e){const i=t.geometry.x;t.geometry=new p(i,e,this.view.spatialReference)},o._hasExtentGraphic=function(){return this.graphics.some((t=>t&&r.isSome(t.geometry)&&"extent"===t.geometry.type))},o._getBoxBounds=function(t){const e=this.graphics.map((t=>t.geometry));return this._getBounds(t,e)},o._getCoordinates=function(t){const[e,i,r,o]=this._getBoxBounds(k.create());if(t){const t=(e+r)/2,a=(o+i)/2;return[[e,o],[t,o],[r,o],[r,a],[r,i],[t,i],[e,i],[e,a]]}return[[e,o],[r,o],[r,i],[e,i]]},o._emitMoveStartEvent=function(t,e,i){const r=new E(this.graphics,i,t,e);this.emit("move-start",r),this.callbacks.onMoveStart&&this.callbacks.onMoveStart(r)},o._emitMoveEvent=function(t,e,i){const r=new O(this.graphics,i,t,e);this.emit("move",r),this.callbacks.onMove&&this.callbacks.onMove(r)},o._emitMoveStopEvent=function(t,e,i){const r=new L(this.graphics,i,t,e);this.emit("move-stop",r),this.callbacks.onMoveStop&&this.callbacks.onMoveStop(r)},o._emitRotateStartEvent=function(t,e){const i=new B(this.graphics,e,t);this.emit("rotate-start",i),this.callbacks.onRotateStart&&this.callbacks.onRotateStart(i)},o._emitRotateEvent=function(t,e){const i=new z(this.graphics,e,t);this.emit("rotate",i),this.callbacks.onRotate&&this.callbacks.onRotate(i)},o._emitRotateStopEvent=function(t,e){const i=new Y(this.graphics,e,t);this.emit("rotate-stop",i),this.callbacks.onRotateStop&&this.callbacks.onRotateStop(i)},o._emitScaleStartEvent=function(t,e,i){const r=new P(this.graphics,i,t,e);this.emit("scale-start",r),this.callbacks.onScaleStart&&this.callbacks.onScaleStart(r)},o._emitScaleEvent=function(t,e,i){const r=new A(this.graphics,i,t,e);this.emit("scale",r),this.callbacks.onScale&&this.callbacks.onScale(r)},o._emitScaleStopEvent=function(t,e,i){const r=new N(this.graphics,i,t,e);this.emit("scale-stop",r),this.callbacks.onScaleStop&&this.callbacks.onScaleStop(r)},t._createClass(i,[{key:"state",get:function(){const t=!!this.get("view.ready"),e=!(!this.get("graphics.length")||!this.get("layer"));return t&&e?"active":t?"ready":"disabled"}},{key:"symbols",set:function(t){const{centerIndicator:e=U.centerIndicator,fill:i=U.fill,handles:r=U.handles,rotator:o=U.rotator,rotatorLine:a=U.rotatorLine}=t||{};this._set("symbols",{centerIndicator:e,fill:i,handles:r,rotator:o,rotatorLine:a})}}]),i}(v.EventedAccessor);return e.__decorate([s.property()],X.prototype,"_rotateLineGraphic",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"type",void 0),e.__decorate([s.property()],X.prototype,"callbacks",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"centerGraphic",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"backgroundGraphic",void 0),e.__decorate([s.property()],X.prototype,"enableMovement",void 0),e.__decorate([s.property()],X.prototype,"enableRotation",void 0),e.__decorate([s.property()],X.prototype,"enableScaling",void 0),e.__decorate([s.property()],X.prototype,"graphics",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"handleGraphics",void 0),e.__decorate([s.property()],X.prototype,"layer",void 0),e.__decorate([s.property()],X.prototype,"preserveAspectRatio",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"rotateGraphic",void 0),e.__decorate([s.property()],X.prototype,"showCenterGraphic",void 0),e.__decorate([s.property({readOnly:!0})],X.prototype,"state",null),e.__decorate([s.property({value:U})],X.prototype,"symbols",null),e.__decorate([s.property()],X.prototype,"view",void 0),X=e.__decorate([c.subclass("esri.views.draw.support.Box")],X),X}));
