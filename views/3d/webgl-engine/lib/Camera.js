/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../core/mathUtils","../../../../core/screenUtils","../../../../chunks/vec3f64","../../../../chunks/vec3","../../support/mathUtils","../../../../chunks/mat4","../../../../chunks/mat4f64","../../../../chunks/vec2f64","../../../../chunks/vec4f64","../../../../chunks/vec2","../../../../chunks/vec4","../../../../chunks/vector","../../support/geometryUtils","./Util"],(function(t,i,e,r,s,n,o,h,a,c,u,_,p,v,f,y){"use strict";let w=function(){function w(t=null,e=null,r=null){this._viewUp=s.create(),this._viewForward=s.create(),this._viewRight=s.create(),this._ray=f.ray.createWrapper(),this._viewport=u.fromValues(0,0,1,1),this._padding=u.fromValues(0,0,0,0),this._fov=55/180*Math.PI,this._nearFar=c.fromValues(1,1e3),this._viewDirty=!0,this._viewMatrix=a.create(),this._projectionDirty=!0,this._projectionMatrix=a.create(),this._viewProjectionDirty=!0,this._viewProjectionMatrix=a.create(),this._viewInverseTransposeMatrixDirty=!0,this._viewInverseTransposeMatrix=a.create(),this._frustumDirty=!0,this._frustum=f.frustum.create(),this._fullViewport=u.create(),this.pixelRatio=1,this.relativeElevation=0,this._eye=i.isSome(t)?s.clone(t):s.create(),this._center=i.isSome(e)?s.clone(e):s.create(),this._up=i.isSome(r)?s.clone(r):s.fromValues(0,0,1)}var D=w.prototype;return D.depthNDCToWorld=function(t){const i=2*t-1;return 2*this.near*this.far/(this.far+this.near-i*(this.far-this.near))},D.copyFrom=function(t){const i=t;return n.copy(this._eye,i._eye),n.copy(this._center,i._center),n.copy(this._up,i._up),p.copy(this._viewport,i._viewport),p.copy(this._padding,i._padding),_.copy(this._nearFar,i._nearFar),this._fov=i._fov,this.relativeElevation=t.relativeElevation,this._viewDirty=i._viewDirty,this._viewDirty||(h.copy(this._viewMatrix,i._viewMatrix),n.copy(this._viewRight,i._viewRight),n.copy(this._viewUp,i._viewUp),n.copy(this._viewForward,i._viewForward)),i._projectionDirty?this._projectionDirty=!0:(h.copy(this._projectionMatrix,i._projectionMatrix),this._projectionDirty=!1),this._viewProjectionDirty=!0,this._frustumDirty=i._frustumDirty,this._frustumDirty||(f.frustum.copy(i._frustum,this._frustum),this._frustumDirty=!1),i._viewInverseTransposeMatrixDirty?this._viewInverseTransposeMatrixDirty=!0:(h.copy(this._viewInverseTransposeMatrix,i._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=!1),p.copy(this._fullViewport,i._fullViewport),this.pixelRatio=t.pixelRatio,this},D.copyViewFrom=function(t){this.eye=t.eye,this.center=t.center,this.up=t.up},D.clone=function(){return(new w).copyFrom(this)},D.equals=function(t){return n.exactEquals(this._eye,t._eye)&&n.exactEquals(this._center,t._center)&&n.exactEquals(this._up,t._up)&&p.exactEquals(this._viewport,t._viewport)&&p.exactEquals(this._padding,t._padding)&&_.exactEquals(this._nearFar,t._nearFar)&&this._fov===t._fov&&this.pixelRatio===t.pixelRatio&&this.relativeElevation===t.relativeElevation},D.almostEquals=function(t){if(this.pixelRatio!==t.pixelRatio||Math.abs(t.fov-this._fov)>=.001)return!1;const i=5e-4,e=1-1e-10;n.sub(g,t.eye,t.center),n.sub(x,this._eye,this._center);const r=n.dot(g,x),s=n.sqrLen(g),o=n.sqrLen(x);return r*r>=e*s*o&&n.sqrDist(t.eye,this._eye)<Math.max(s,o)*i*i&&p.squaredDistance(t.padding,this._padding)<.5&&p.squaredDistance(t.viewport,this._viewport)<.5},D.markViewDirty=function(){this._viewDirty=!0,this._frustumDirty=!0,this._viewProjectionDirty=!0},D.computeRenderPixelSizeAt=function(t){return this.computeRenderPixelSizeAtDist(this.viewDirectionDistance(t))},D.computeRenderPixelSizeAtDist=function(t){return t*this.perRenderPixelRatio},D.computeScreenPixelSizeAt=function(t){return this.computeScreenPixelSizeAtDist(this.viewDirectionDistance(t))},D.viewDirectionDistance=function(t){return Math.abs(v.projectPointSignedLength(this.viewForward,n.subtract(g,t,this._eye)))},D.computeScreenPixelSizeAtDist=function(t){return t*this.perScreenPixelRatio},D.computeDistanceFromRadius=function(t,i){return t/Math.tan(Math.min(this.fovX,this.fovY)/(2*(i||1)))},D.getScreenCenter=function(t=r.createScreenPointArray()){return t[0]=(this.padding[3]+this.width/2)/this.pixelRatio,t[1]=(this.padding[0]+this.height/2)/this.pixelRatio,t},D.getRenderCenter=function(t,i=.5,e=.5){return t||(t=r.createRenderScreenPointArray3()),t[0]=this.padding[3]+this.width*i,t[1]=this.padding[2]+this.height*e,t.length>2&&(t[2]=.5),t},D.setGLViewport=function(t){const i=this.viewport,e=this.padding;t.setViewport(i[0]-e[3],i[1]-e[2],i[2]+e[1]+e[3],i[3]+e[0]+e[2])},D.applyProjection=function(t,i,r=!1){t!==l&&n.copy(l,t),l[3]=1,r&&(i[2]=-l[2]),p.transformMat4(l,l,this.projectionMatrix),n.scale(l,l,1/Math.abs(l[3]));const s=this.fullViewport;return i[0]=e.lerp(0,s[0]+s[2],.5+.5*l[0]),i[1]=e.lerp(0,s[1]+s[3],.5+.5*l[1]),r||(i[2]=.5*(l[2]+1)),i},D.projectToScreen=function(t,i){return this.projectToRenderScreen(t,m),this.renderToScreen(m,i)},D.projectToRenderScreen=function(t,i){if(l[0]=t[0],l[1]=t[1],l[2]=t[2],l[3]=1,p.transformMat4(l,l,this.viewProjectionMatrix),0===l[3])return null;n.scale(l,l,1/Math.abs(l[3]));const r=this.fullViewport;return"x"in i?(i.x=e.lerp(0,r[0]+r[2],.5+.5*l[0]),i.y=e.lerp(0,r[1]+r[3],.5+.5*l[1])):(i[0]=e.lerp(0,r[0]+r[2],.5+.5*l[0]),i[1]=e.lerp(0,r[1]+r[3],.5+.5*l[1]),i.length>2&&(i[2]=.5*(l[2]+1))),i},D.unprojectFromScreen=function(t,i){return this.unprojectFromRenderScreen(this.screenToRender(t,m),i)},D.unprojectFromRenderScreen=function(t,i){if(h.multiply(d,this.projectionMatrix,this.viewMatrix),!h.invert(d,d))return null;const e=this.fullViewport;return l[0]=2*(t[0]-e[0])/e[2]-1,l[1]=2*(t[1]-e[1])/e[3]-1,l[2]=2*t[2]-1,l[3]=1,p.transformMat4(l,l,d),0===l[3]?null:(i[0]=l[0]/l[3],i[1]=l[1]/l[3],i[2]=l[2]/l[3],i)},D.constrainWindowSize=function(t,i,e,r=1){const s=t*this.pixelRatio,n=i*this.pixelRatio,o=Math.max(s-e*r/2,0),h=Math.max(this.fullHeight-n-e/2,0),a=-Math.min(s-e*r/2,0),c=-Math.min(this.fullHeight-n-e/2,0);return[o,h,e*r-a- -Math.min(this.fullWidth-s-e*r/2,0),e-c- -Math.min(n-e/2,0)]},D.computeUp=function(t){1===t?this.computeUpGlobal():this.computeUpLocal()},D.screenToRender=function(t,i){const e=t[0]*this.pixelRatio,r=this.fullHeight-t[1]*this.pixelRatio;return i[0]=e,i[1]=r,i},D.renderToScreen=function(t,i){const e=t[0]/this.pixelRatio,r=(this.fullHeight-t[1])/this.pixelRatio;return i[0]=e,i[1]=r,i},D.computeUpGlobal=function(){n.subtract(g,this.center,this.eye);const t=n.length(this.center);t<1?(n.set(this.up,0,0,1),this.markViewDirty()):Math.abs(n.dot(g,this.center))>.9999*n.length(g)*t||(n.cross(this.up,g,this.center),n.cross(this.up,this.up,g),n.normalize(this.up,this.up),this.markViewDirty())},D.computeUpLocal=function(){o.directionFromTo(g,this.eye,this.center),Math.abs(g[2])<=.9999&&(n.scale(g,g,g[2]),n.set(this.up,-g[0],-g[1],1-g[2]),n.normalize(this.up,this.up),this.markViewDirty())},D._compareAndSetView=function(t,i){n.exactEquals(t,i)||(n.copy(i,t),this._viewDirty=!0,this._frustumDirty=!0,this._viewProjectionDirty=!0)},D._recomputeFrustum=function(){this._frustumDirty&&(f.frustum.fromMatrix(this.viewMatrix,this.projectionMatrix,this._frustum),this._frustumDirty=!1)},D._ensureViewClean=function(){this._viewDirty&&(h.lookAt(this._viewMatrix,this._eye,this._center,this._up),n.set(this._viewForward,-this._viewMatrix[2],-this._viewMatrix[6],-this._viewMatrix[10]),n.set(this._viewUp,this._viewMatrix[1],this._viewMatrix[5],this._viewMatrix[9]),n.set(this._viewRight,this._viewMatrix[0],this._viewMatrix[4],this._viewMatrix[8]),this._viewDirty=!1,this._viewInverseTransposeMatrixDirty=!0)},t._createClass(w,[{key:"eye",get:function(){return this._eye},set:function(t){this._compareAndSetView(t,this._eye)}},{key:"center",get:function(){return this._center},set:function(t){this._compareAndSetView(t,this._center)}},{key:"ray",get:function(){return this._ray.origin=this.eye,this._ray.direction||(this._ray.direction=s.create()),n.subtract(this._ray.direction,this.center,this.eye),this._ray}},{key:"up",get:function(){return this._up},set:function(t){this._compareAndSetView(t,this._up)}},{key:"viewMatrix",get:function(){return this._ensureViewClean(),this._viewMatrix},set:function(t){h.copy(this._viewMatrix,t),this._viewDirty=!1,this._viewInverseTransposeMatrixDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0}},{key:"viewForward",get:function(){return this._ensureViewClean(),this._viewForward}},{key:"viewUp",get:function(){return this._ensureViewClean(),this._viewUp}},{key:"viewRight",get:function(){return this._ensureViewClean(),this._viewRight}},{key:"nearFar",get:function(){return this._nearFar}},{key:"near",get:function(){return this._nearFar[0]},set:function(t){this._nearFar[0]!==t&&(this._nearFar[0]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"far",get:function(){return this._nearFar[1]},set:function(t){this._nearFar[1]!==t&&(this._nearFar[1]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"viewport",get:function(){return this._viewport},set:function(t){this.x=t[0],this.y=t[1],this.width=t[2],this.height=t[3]}},{key:"x",get:function(){return this._viewport[0]},set:function(t){t+=this._padding[3],this._viewport[0]!==t&&(this._viewport[0]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"y",get:function(){return this._viewport[1]},set:function(t){t+=this._padding[2],this._viewport[1]!==t&&(this._viewport[1]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"width",get:function(){return this._viewport[2]},set:function(t){this._viewport[2]!==t&&(this._viewport[2]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"height",get:function(){return this._viewport[3]},set:function(t){this._viewport[3]!==t&&(this._viewport[3]=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"fullWidth",get:function(){return this._viewport[2]+this._padding[1]+this._padding[3]},set:function(t){this.width=t-(this._padding[1]+this._padding[3])}},{key:"fullHeight",get:function(){return this._viewport[3]+this._padding[0]+this._padding[2]},set:function(t){this.height=t-(this._padding[0]+this._padding[2])}},{key:"fullViewport",get:function(){return this._fullViewport[0]=this._viewport[0]-this._padding[3],this._fullViewport[1]=this._viewport[1]-this._padding[2],this._fullViewport[2]=this.fullWidth,this._fullViewport[3]=this.fullHeight,this._fullViewport}},{key:"aspect",get:function(){return this.width/this.height}},{key:"padding",get:function(){return this._padding},set:function(t){this._padding[0]===t[0]&&this._padding[1]===t[1]&&this._padding[2]===t[2]&&this._padding[3]===t[3]||(this._viewport[0]+=t[3]-this._padding[3],this._viewport[1]+=t[2]-this._padding[2],this._viewport[2]-=t[1]+t[3]-(this._padding[1]+this._padding[3]),this._viewport[3]-=t[0]+t[2]-(this._padding[0]+this._padding[2]),p.copy(this._padding,t),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0)}},{key:"viewProjectionMatrix",get:function(){return this._viewProjectionDirty&&(h.multiply(this._viewProjectionMatrix,this.projectionMatrix,this.viewMatrix),this._viewProjectionDirty=!1),this._viewProjectionMatrix}},{key:"projectionMatrix",get:function(){if(this._projectionDirty){const t=this.width,i=this.height,e=this.near*Math.tan(this.fovY/2),r=e*this.aspect;h.frustum(this._projectionMatrix,-r*(1+2*this._padding[3]/t),r*(1+2*this._padding[1]/t),-e*(1+2*this._padding[2]/i),e*(1+2*this._padding[0]/i),this.near,this.far),this._projectionDirty=!1}return this._projectionMatrix},set:function(t){h.copy(this._projectionMatrix,t),this._projectionDirty=!1,this._viewProjectionDirty=!0,this._frustumDirty=!0}},{key:"fov",get:function(){return this._fov},set:function(t){this._fov=t,this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0}},{key:"fovX",get:function(){return y.fovd2fovx(this._fov,this.width,this.height)},set:function(t){this._fov=y.fovx2fovd(t,this.width,this.height),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0}},{key:"fovY",get:function(){return y.fovd2fovy(this._fov,this.width,this.height)},set:function(t){this._fov=y.fovy2fovd(t,this.width,this.height),this._projectionDirty=!0,this._viewProjectionDirty=!0,this._frustumDirty=!0}},{key:"distance",get:function(){return n.distance(this._center,this._eye)}},{key:"frustum",get:function(){return this._recomputeFrustum(),this._frustum}},{key:"viewInverseTransposeMatrix",get:function(){return(this._viewInverseTransposeMatrixDirty||this._viewDirty)&&(h.invert(this._viewInverseTransposeMatrix,this.viewMatrix),h.transpose(this._viewInverseTransposeMatrix,this._viewInverseTransposeMatrix),this._viewInverseTransposeMatrixDirty=!1),this._viewInverseTransposeMatrix}},{key:"perRenderPixelRatio",get:function(){return Math.tan(this.fovX/2)/(this.width/2)}},{key:"perScreenPixelRatio",get:function(){return this.perRenderPixelRatio*this.pixelRatio}},{key:"aboveGround",get:function(){return this.relativeElevation&&this.relativeElevation>=0}}]),w}();const l=u.create(),d=a.create(),g=s.create(),x=s.create(),m=r.createRenderScreenPointArray3();return w}));
