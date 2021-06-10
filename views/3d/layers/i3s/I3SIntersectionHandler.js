/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/maybe","../../../../chunks/vec3","../../webgl-engine/lib/intersectorUtils","../../support/orientedBoundingBox"],(function(e,t,i,n,r,s){"use strict";let o=function(){function e(e){this.type="I3S",this.layerUid=e.layerUid,this.sublayerUid=e.sublayerUid,this.collection=e.collection,this.forEach=e.forEach,this.slicePlane=e.slicePlaneEnabled,this.isGround=e.isGround}return e.prototype.intersect=function(e,t,o,c){const d=e.results,u=2===e.options.store,a=e.ray.direction,f=e.tolerance;let y=e=>e,b=e=>e;const h=r.getVerticalOffsetI3S(e.verticalOffset);i.isSome(h)&&(y=e=>h.applyToMbs(e),b=e=>h.applyToObb(e)),this.forEach(((p,m)=>{if(i.isSome(p.geometryObb)){if(!s.intersectLine(b(p.geometryObb),o,a,f))return}else if(i.isSome(p.serviceObbInRenderSR)){if(!s.intersectLine(b(p.serviceObbInRenderSR),o,a,f))return}else if(!l(y(p.renderMbs),o,a,f))return;this.collection.intersect(m,o,c,f,h,((i,s,l,a)=>{if(s>=0){if(null!=t&&!t(o,c,s))return;const f=e=>{e.intersector=this.type,e.target={type:"external",metadata:{layerUid:this.layerUid,sublayerUid:this.sublayerUid,nodeIndex:p.index,componentIndex:i}},e.dist=s,n.copy(e.normal,l),e.triangleNr=a};if(this.isGround&&(null==d.ground.dist||s<d.ground.dist)&&f(d.ground),e.options.isFiltered)return;if((null==d.min.dist||s<d.min.dist)&&f(d.min),(null==d.max.dist||s>d.max.dist)&&f(d.max),u){const t=new r.IntersectorResult(e.ray);f(t),e.results.all.push(t)}}}))}))},t._createClass(e,[{key:"intersectionHandlerId",get:function(){return this.layerUid}}]),e}();function l(e,t,i,n=0){const r=e[3]+n,s=t[0]-e[0],o=t[1]-e[1],l=t[2]-e[2],c=i[0],d=i[1],u=i[2],a=c*s+d*o+u*l;return a*a-(c*c+d*d+u*u)*(s*s+o*o+l*l-r*r)>=0}e.I3SIntersectionHandler=o,Object.defineProperty(e,"__esModule",{value:!0})}));
