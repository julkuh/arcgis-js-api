/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../geometry/Point","../../../../geometry","../../../../Viewpoint","../../ViewState"],(function(e,t,i,n,r){"use strict";const l=.125;let a=function(){function e(){this._renderParams={context:null,drawPhase:1,state:new r({viewpoint:new n({targetGeometry:new t(0,0),scale:1,rotation:0}),size:[256,256]}),stationary:!0,pixelRatio:1,displayLevel:-1,requiredLevel:-1,globalOpacity:1,renderPass:"background",styleLayer:null,styleLayerUID:-1,painter:null,glyphMosaic:null,spriteMosaic:null,driverTestResult:null,profiler:null,renderingOptions:null,deltaTime:-1,timeline:null,time:0,hasClipping:!1,blendMode:null,dataUploadCounter:0,effects:null,inFadeTransition:!1,requireFBO:!1}}var i=e.prototype;return i.dispose=function(){this._renderParams=null},i.render=function(e,t,i,n,r,a,s,o,u,d){const p=a.adjustLevel(t[0]),c=this._renderParams;c.context=e,c.painter=n,c.glyphMosaic=n.glyphMosaic,c.spriteMosaic=n.spriteMosaic,c.pixelRatio=d,c.displayLevel=p,c.requiredLevel=p;const y=a.getScale(t[0]),[g,f]=a.getShift(t,s*y),h=l*s*y/u,m=i.transforms.dvs;m[0]=h,m[4]=-h,m[6]=-1-g-o[0]*s*2,m[7]=1+f+(1-o[1])*s*2-2,c.state.size[0]=u,c.state.size[1]=u,i.stage||i.attachWithContext(e),i.triangleCount=0,n.drawTile(c,i,r)},e}();e.VectorTileRendererHelper3D=a,Object.defineProperty(e,"__esModule",{value:!0})}));
