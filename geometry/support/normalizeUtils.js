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

define(["require","exports","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../config","../../core/Error","../../core/Logger","../../core/maybe","../../core/promiseUtils","../Polygon","../Polyline","../SpatialReference","./spatialReferenceUtils","./webMercatorUtils","../../tasks/geometry/cut","../../tasks/geometry/simplify"],function(e,r,t,n,i,a,o,s,u,f,l,p,c,h,g,m){function v(e){return"polygon"===e.type}function x(e){return"polygon"===e[0].type}function y(e){return"polyline"===e[0].type}function d(e){return v(e)?e.rings:e.paths}function M(e,r){return Math.ceil((e-r)/(2*r))}function w(e,r){for(var t=d(e),n=0,i=t;n<i.length;n++)for(var a=i[n],o=0,s=a;o<s.length;o++){var u=s[o];u[0]+=r}return e}function b(e){for(var r=[],t=0,n=0,i=0;i<e.length;i++){for(var a=e[i],o=null,s=0;s<a.length;s++)o=a[s],r.push(o),0===s?(t=o[0],n=t):(t=Math.min(t,o[0]),n=Math.max(n,o[0]));o&&r.push([(t+n)/2,0])}return r}function R(e,r){if(!(e instanceof l||e instanceof f)){var t="straightLineDensify: the input geometry is neither polyline nor polygon";throw S.error(t),new a(t)}for(var n=d(e),i=[],o=0,s=n;o<s.length;o++){var u=s[o],p=[];i.push(p),p.push([u[0][0],u[0][1]]);for(var c=0;c<u.length-1;c++){var h=u[c][0],g=u[c][1],m=u[c+1][0],x=u[c+1][1],y=Math.sqrt((m-h)*(m-h)+(x-g)*(x-g)),M=(x-g)/y,w=(m-h)/y,b=y/r;if(b>1){for(var R=1;R<=b-1;R++){var L=R*r,W=w*L+h,P=M*L+g;p.push([W,P])}var X=(y+Math.floor(b-1)*r)/2,z=w*X+h,I=M*X+g;p.push([z,I])}p.push([m,x])}}return v(e)?new f({rings:i,spatialReference:e.spatialReference}):new l({paths:i,spatialReference:e.spatialReference})}function L(e,r,t){if(r){var n=R(e,1e6);e=h.webMercatorToGeographic(n,!0)}return t&&(e=w(e,t)),e}function W(e,r,t){if(Array.isArray(e)){var n=e[0];if(n>r){var i=M(n,r);e[0]=n+i*(-2*r)}else if(n<t){var i=M(n,t);e[0]=n+i*(-2*t)}}else{var n=e.x;if(n>r){var i=M(n,r);e=e.clone().offset(i*(-2*r),0)}else if(n<t){var i=M(n,t);e=e.clone().offset(i*(-2*t),0)}}return e}function P(e,r){for(var t=-1,n=0;n<r.cutIndexes.length;n++)!function(n){for(var i=r.cutIndexes[n],a=r.geometries[n],o=d(a),s=0;s<o.length;s++)!function(e){var r=o[e];r.some(function(t){if(t[0]<180)return!0;for(var n=0,i=0;i<r.length;i++){var o=r[i][0];n=o>n?o:n}n=Number(n.toFixed(9));for(var s=M(n,180),u=-360*s,f=0;f<r.length;f++){var l=a.getPoint(e,f);a.setPoint(e,f,l.clone().offset(u,0))}return!0})}(s);if(i===t){if(x(e))for(var u=0,f=d(a);u<f.length;u++){var l=f[u];e[i]=e[i].addRing(l)}else if(y(e))for(var p=0,c=d(a);p<c.length;p++){var h=c[p];e[i]=e[i].addPath(h)}}else t=i,e[i]=a}(n);return e}function X(e,r,a){return n(this,void 0,void 0,function(){var n,o,p,v,x,y,d,b,R,z,I,S,k,A,T,D,_,q,_,E,H,N,j,C,F,G,O,B,J,K,Q,V,Y,Z,$,ee,re,V,Y,te,V,Y,Z;return t(this,function(t){switch(t.label){case 0:if(!Array.isArray(e))return[2,X([e],r)];for(n=r?r.url:i.geometryServiceUrl,z=0,I=[],S=[],k=0,A=e;k<A.length;k++)T=A[k],s.isNone(T)?S.push(T):(o||(o=T.spatialReference,p=c.getInfo(o),v=o.isWebMercator,d=v?102100:4326,x=U[d].maxX,y=U[d].minX,b=U[d].plus180Line,R=U[d].minus180Line),p?"mesh"===T.type?S.push(T):"point"===T.type?S.push(W(T.clone(),x,y)):"multipoint"===T.type?(D=T.clone(),D.points=D.points.map(function(e){return W(e,x,y)}),S.push(D)):"extent"===T.type?(_=T.clone(),q=_._normalize(!1,!1,p),S.push(q.rings?new f(q):q)):T.extent?(_=T.extent,E=M(_.xmin,y),H=E*(2*x),N=0===H?T.clone():w(T.clone(),H),_.offset(H,0),_.intersects(b)&&_.xmax!==x?(z=_.xmax>z?_.xmax:z,N=L(N,v),I.push(N),S.push("cut")):_.intersects(R)&&_.xmin!==y?(z=_.xmax*(2*x)>z?_.xmax*(2*x):z,N=L(N,v,360),I.push(N),S.push("cut")):S.push(N)):S.push(T.clone()):S.push(T));for(j=M(z,x),C=-90,F=j,G=new l;j>0;)O=360*j-180,G.addPath([[O,C],[O,-1*C]]),C*=-1,j--;return I.length>0&&F>0?[4,g.cut(n,I,G,a)]:[3,3];case 1:for(B=t.sent(),J=P(I,B),K=[],Q=[],V=0;V<S.length;V++)Y=S[V],"cut"!==Y?Q.push(Y):(Z=J.shift(),$=e[V],s.isSome($)&&"polygon"===$.type&&$.rings&&$.rings.length>1&&Z.rings.length>=$.rings.length?(K.push(Z),Q.push("simplify")):Q.push(v?h.geographicToWebMercator(Z):Z));return K.length?[4,m.simplify(n,K,a)]:[2,Q];case 2:for(ee=t.sent(),re=[],V=0;V<Q.length;V++)Y=Q[V],"simplify"!==Y?re.push(Y):re.push(v?h.geographicToWebMercator(ee.shift()):ee.shift());return[2,re];case 3:for(te=[],V=0;V<S.length;V++)Y=S[V],"cut"!==Y?te.push(Y):(Z=I.shift(),te.push(!0===v?h.geographicToWebMercator(Z):Z));return[2,u.resolve(te)]}})})}function z(e){var r;if(!e)return null;var t=e.extent;if(!t)return null;var n=e.spatialReference&&c.getInfo(e.spatialReference);if(!n)return t;var i=n.valid,a=i[0],o=i[1],s=2*o,u=t.width,f=t.xmin,l=t.xmax;if(r=[l,f],f=r[0],l=r[1],"extent"===e.type||0===u||u<=o||u>s||f<a||l>o)return t;var p;switch(e.type){case"polygon":if(!(e.rings.length>1))return t;p=b(e.rings);break;case"polyline":if(!(e.paths.length>1))return t;p=b(e.paths);break;case"multipoint":p=e.points}for(var h=t.clone(),g=0;g<p.length;g++){var m=p[g][0];m<0?(m+=o,l=Math.max(m,l)):(m-=o,f=Math.min(m,f))}return h.xmin=f,h.xmax=l,h.width<u?(h.xmin-=o,h.xmax-=o,h):t}function I(e,r){var t=c.getInfo(r);if(t){var n=t.valid,i=n[0],a=n[1],o=a-i;if(e<i)for(;e<i;)e+=o;if(e>a)for(;e>a;)e-=o}return e}Object.defineProperty(r,"__esModule",{value:!0});var S=o.getLogger("esri.geometry.support.normalizeUtils"),U={102100:{maxX:20037508.342788905,minX:-20037508.342788905,plus180Line:new l({paths:[[[20037508.342788905,-20037508.342788905],[20037508.342788905,20037508.342788905]]],spatialReference:p.WebMercator}),minus180Line:new l({paths:[[[-20037508.342788905,-20037508.342788905],[-20037508.342788905,20037508.342788905]]],spatialReference:p.WebMercator})},4326:{maxX:180,minX:-180,plus180Line:new l({paths:[[[180,-180],[180,180]]],spatialReference:p.WebMercator}),minus180Line:new l({paths:[[[-180,-180],[-180,180]]],spatialReference:p.WebMercator})}};r.straightLineDensify=R,r.normalizeCentralMeridian=X,r.getDenormalizedExtent=z,r.normalizeMapX=I});