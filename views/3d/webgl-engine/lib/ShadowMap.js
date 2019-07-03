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

define(["require","exports","../../../../core/mathUtils","../../../../core/libs/gl-matrix-2/mat3f64","../../../../core/libs/gl-matrix-2/mat4","../../../../core/libs/gl-matrix-2/mat4f64","../../../../core/libs/gl-matrix-2/vec2","../../../../core/libs/gl-matrix-2/vec2f64","../../../../core/libs/gl-matrix-2/vec3","../../../../core/libs/gl-matrix-2/vec3f64","../../../../core/libs/gl-matrix-2/vec4","../../../../core/libs/gl-matrix-2/vec4f64","../../support/mathUtils","./Camera","./glUtil3D","./Util","../../../webgl/FramebufferObject","../../../webgl/Texture","../../../webgl/Util"],function(e,t,a,r,c,i,s,o,n,v,f,h,d,u,l,p,m,x,b){function y(e,t,a,r,c,i,o,n){s.vec2.set(V,0,0);for(var v=0;v<4;++v)s.vec2.add(V,V,e[v]);s.vec2.scale(V,V,.25),s.vec2.set(I,0,0);for(var v=4;v<8;++v)s.vec2.add(I,I,e[v]);s.vec2.scale(I,I,.25),s.vec2.lerp(J[0],e[4],e[5],.5),s.vec2.lerp(J[1],e[5],e[6],.5),s.vec2.lerp(J[2],e[6],e[7],.5),s.vec2.lerp(J[3],e[7],e[4],.5);for(var f=0,h=s.vec2.squaredDistance(J[0],V),v=1;v<4;++v){var d=s.vec2.squaredDistance(J[v],V);d<h&&(h=d,f=v)}s.vec2.subtract(K,J[f],e[f+4]);var u=K[0];K[0]=-K[1],K[1]=u,s.vec2.subtract(L,I,V),s.vec2.lerp(K,K,L,a),s.vec2.normalize(K,K);var l,m;l=m=s.vec2.dot(s.vec2.subtract(Q,e[0],V),K);for(var v=1;v<8;++v){var x=s.vec2.dot(s.vec2.subtract(Q,e[v],V),K);x<l?l=x:x>m&&(m=x)}s.vec2.copy(r,V),s.vec2.scale(Q,K,l-t),s.vec2.add(r,r,Q);for(var b=-1,y=1,g=0,M=0,v=0;v<8;++v){s.vec2.subtract(X,e[v],r),s.vec2.normalize(X,X);var w=K[0]*X[1]-K[1]*X[0];w>0?w>b&&(b=w,g=v):w<y&&(y=w,M=v)}p.verify(b>0,"leftArea"),p.verify(y<0,"rightArea"),s.vec2.scale(Y,K,l),s.vec2.add(Y,Y,V),s.vec2.scale(Z,K,m),s.vec2.add(Z,Z,V),$[0]=-K[1],$[1]=K[0];var T=p.rayRay2D(r,e[M],Z,s.vec2.add(Q,Z,$),1,c),C=p.rayRay2D(r,e[g],Z,Q,1,i),D=p.rayRay2D(r,e[g],Y,s.vec2.add(Q,Y,$),1,o),R=p.rayRay2D(r,e[M],Y,Q,1,n);p.verify(T,"rayRay"),p.verify(C,"rayRay"),p.verify(D,"rayRay"),p.verify(R,"rayRay")}function g(e,t){return 3*t+e}function M(e,t){return s.vec2.set(_,e[t],e[t+3]),_}function w(e,t,a,r,c){s.vec2.subtract(ee,a,r),s.vec2.scale(ee,ee,.5),te[0]=ee[0],te[1]=ee[1],te[2]=0,te[3]=ee[1],te[4]=-ee[0],te[5]=0,te[6]=ee[0]*ee[0]+ee[1]*ee[1],te[7]=ee[0]*ee[1]-ee[1]*ee[0],te[8]=1,te[g(0,2)]=-s.vec2.dot(M(te,0),e),te[g(1,2)]=-s.vec2.dot(M(te,1),e);var i=s.vec2.dot(M(te,0),a)+te[g(0,2)],o=s.vec2.dot(M(te,1),a)+te[g(1,2)],n=s.vec2.dot(M(te,0),r)+te[g(0,2)],v=s.vec2.dot(M(te,1),r)+te[g(1,2)];i=-(i+n)/(o+v),te[g(0,0)]+=te[g(1,0)]*i,te[g(0,1)]+=te[g(1,1)]*i,te[g(0,2)]+=te[g(1,2)]*i,i=1/(s.vec2.dot(M(te,0),a)+te[g(0,2)]),o=1/(s.vec2.dot(M(te,1),a)+te[g(1,2)]),te[g(0,0)]*=i,te[g(0,1)]*=i,te[g(0,2)]*=i,te[g(1,0)]*=o,te[g(1,1)]*=o,te[g(1,2)]*=o,te[g(2,0)]=te[g(1,0)],te[g(2,1)]=te[g(1,1)],te[g(2,2)]=te[g(1,2)],te[g(1,2)]+=1,i=s.vec2.dot(M(te,1),t)+te[g(1,2)],o=s.vec2.dot(M(te,2),t)+te[g(2,2)],n=s.vec2.dot(M(te,1),a)+te[g(1,2)],v=s.vec2.dot(M(te,2),a)+te[g(2,2)],i=-.5*(i/o+n/v),te[g(1,0)]+=te[g(2,0)]*i,te[g(1,1)]+=te[g(2,1)]*i,te[g(1,2)]+=te[g(2,2)]*i,i=s.vec2.dot(M(te,1),t)+te[g(1,2)],o=s.vec2.dot(M(te,2),t)+te[g(2,2)],n=-o/i,te[g(1,0)]*=n,te[g(1,1)]*=n,te[g(1,2)]*=n,c[0]=te[0],c[1]=te[1],c[2]=0,c[3]=te[2],c[4]=te[3],c[5]=te[4],c[6]=0,c[7]=te[5],c[8]=0,c[9]=0,c[10]=1,c[11]=0,c[12]=te[6],c[13]=te[7],c[14]=0,c[15]=te[8]}for(var T=function(){function e(){this.camera=new u,this.lightMat=i.mat4f64.create()}return e}(),C=function(){function e(e){this.doShadowMapMipmapsWork=!1,this.textureRes=4096,this.numCascades=1,this.maxNumCascades=2,this.cascadeDistances=[0,0,0,0,0],this.cascades=[],this.rctx=e,this.emptyTexture=l.createEmptyTexture(e);for(var t=0;t<4;++t)this.cascades.push(new T)}return e.prototype.dispose=function(){this.emptyTexture.dispose(),this.emptyTexture=null},Object.defineProperty(e.prototype,"textureResolution",{get:function(){return this.textureRes},set:function(e){this.textureRes=e},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"maxCascades",{get:function(){return this.maxNumCascades},set:function(e){this.maxNumCascades=a.clamp(Math.floor(e),1,4)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"enabled",{get:function(){return!!this.depthTexture},set:function(e){e?this.enable():this.disable()},enumerable:!0,configurable:!0}),e.prototype.getDepthTexture=function(){return this.depthTexture},e.prototype.getCascades=function(){for(var e=0;e<this.numCascades;++e)B[e]=this.cascades[e];return B.length=this.numCascades,B},e.prototype.prepare=function(e,t,a){p.assert(this.enabled),c.mat4.multiply(R,e.projectionMatrix,e.viewMatrix);var r=a.near,i=a.far;r<2&&(r=2),i<2&&(i=2),r>=i&&(r=2,i=4),this.numCascades=Math.min(1+Math.floor(p.logWithBase(i/r,4)),this.maxNumCascades);for(var s=Math.pow(i/r,1/this.numCascades),o=0;o<this.numCascades+1;++o)this.cascadeDistances[o]=r*Math.pow(s,o);c.mat4.invert(U,R),c.mat4.lookAt(z,[0,0,0],[-t[0],-t[1],-t[2]],[0,1,0]);for(var v=e.viewMatrix,h=e.projectionMatrix,o=0;o<this.numCascades;++o){var u=this.cascades[o],l=-this.cascadeDistances[o],m=-this.cascadeDistances[o+1],x=(h[10]*l+h[14])/Math.abs(h[11]*l+h[15]),b=(h[10]*m+h[14])/Math.abs(h[11]*m+h[15]);p.assert(x<b);for(var g=0;g<8;++g){var M=g%4==0||g%4==3?-1:1,T=g%4==0||g%4==1?-1:1,C=g<4?x:b;f.vec4.set(j,M,T,C,1),f.vec4.transformMat4(O[g],j,U);for(var A=0;A<3;++A)O[g][A]/=O[g][3]}n.vec3.negate(G,O[0]),c.mat4.translate(D,z,G),u.camera.viewMatrix=D;for(var g=0;g<8;++g)n.vec3.transformMat4(O[g],O[g],u.camera.viewMatrix);n.vec3.copy(P,O[0]),n.vec3.copy(F,O[0]);for(var g=1;g<8;++g)for(var A=0;A<3;++A)P[A]=Math.min(P[A],O[g][A]),F[A]=Math.max(F[A],O[g][A]);P[2]-=200,F[2]+=200,u.camera.near=-F[2],u.camera.far=-P[2];r=1/O[0][3],i=1/O[4][3],p.assert(r<i);var B=r+Math.sqrt(r*i),E=Math.sin(d.acos(v[2]*t[0]+v[6]*t[1]+v[10]*t[2]));B/=E,y(O,B,E,N,S,q,W,k),w(N,S,W,k,u.camera.projectionMatrix),u.camera.projectionMatrix[10]=2/(P[2]-F[2]),u.camera.projectionMatrix[14]=-(P[2]+F[2])/(P[2]-F[2]),c.mat4.multiply(u.lightMat,u.camera.projectionMatrix,u.camera.viewMatrix);var H=this.textureRes/2;u.camera.viewport[0]=o%2==0?0:H,u.camera.viewport[1]=0===Math.floor(o/2)?0:H,u.camera.viewport[2]=H,u.camera.viewport[3]=H}this.lastOrigin=null,this.cascadeDistances[this.numCascades]=100*i;var V=this.rctx;V.bindFramebuffer(this.fbo),V.bindTexture(null,7),V.setClearColor(1,1,1,1),V.clearSafe(16640)},e.prototype.finish=function(e){p.assert(this.enabled),this.rctx.bindFramebuffer(e),this.doShadowMapMipmapsWork&&this.depthTexture.generateMipmap()},e.prototype.bind=function(e){var t=this.rctx,a=this.enabled;t.bindTexture(a?this.depthTexture:this.emptyTexture,7),t.bindProgram(e),e.setUniform1i("depthTex",7),e.setUniform1f("depthHalfPixelSz",a?.5/this.textureRes:-1),e.setUniform1i("shadowMapNum",this.numCascades),e.setUniform4f("shadowMapDistance",this.cascadeDistances[0],this.cascadeDistances[1],this.cascadeDistances[2],this.cascadeDistances[3])},e.prototype.bindAll=function(e){for(var t=e.getProgramsUsingUniform("shadowMapDistance"),a=0;a<t.length;a++)this.bind(t[a])},e.prototype.bindView=function(e,t){if(this.enabled){var a=this.lastOrigin;if(!(a&&a[0]===t[0]&&a[1]===t[1]&&a[2]===t[2])){this.lastOrigin=this.lastOrigin||v.vec3f64.create(),n.vec3.copy(this.lastOrigin,t);for(var r=0;r<this.numCascades;++r){c.mat4.translate(E,this.cascades[r].lightMat,t);for(var i=0;i<16;++i)H[16*r+i]=E[i]}}e.setUniformMatrix4fv("shadowMapMatrix",H)}},e.prototype.enable=function(){if(!this.enabled){var e={target:3553,pixelFormat:6408,dataType:5121,wrapMode:33071,samplingMode:9728,flipped:!0,width:this.textureRes,height:this.textureRes};this.depthTexture=new x(this.rctx,e),this.fbo=m.createWithAttachments(this.rctx,this.depthTexture,{colorTarget:0,depthStencilTarget:1,width:this.textureRes,height:this.textureRes})}},e.prototype.disable=function(){this.enabled&&this.fbo&&(this.fbo.dispose(),this.fbo=null,this.depthTexture=null)},e.prototype.getGpuMemoryUsage=function(){return b.getGpuMemoryUsage(this.fbo)},e}(),D=i.mat4f64.create(),R=i.mat4f64.create(),U=i.mat4f64.create(),j=h.vec4f64.create(),O=[],A=0;A<8;++A)O.push(h.vec4f64.create());var P=v.vec3f64.create(),F=v.vec3f64.create(),N=o.vec2f64.create(),S=o.vec2f64.create(),q=o.vec2f64.create(),W=o.vec2f64.create(),k=o.vec2f64.create(),z=i.mat4f64.create(),G=v.vec3f64.create(),B=[],E=i.mat4f64.create(),H=new Float32Array(64),V=o.vec2f64.create(),I=o.vec2f64.create(),J=[o.vec2f64.create(),o.vec2f64.create(),o.vec2f64.create(),o.vec2f64.create()],K=o.vec2f64.create(),L=o.vec2f64.create(),Q=o.vec2f64.create(),X=o.vec2f64.create(),Y=o.vec2f64.create(),Z=o.vec2f64.create(),$=o.vec2f64.create(),_=o.vec2f64.create(),ee=o.vec2f64.create(),te=r.mat3f64.create();return C});