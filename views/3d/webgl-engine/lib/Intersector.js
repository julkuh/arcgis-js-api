/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../chunks/_rollupPluginBabelHelpers","../../../../core/has","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/vec3","../../../../chunks/mat4f64","../../support/geometryUtils","../materials/renderers/utils","./intersectorUtils"],(function(t,r,e,s,i,n,a,o,h,d){"use strict";const c=1e-5;let l=function(){function t(t){this.options=new d.IntersectorOptions,this.results=new d.IntersectorResults,this.transform=new d.IntersectorTransform,this.performanceInfo={queryDuration:0,numObjectsTested:0},this.tolerance=c,this.verticalOffset=null,this._ray={origin:i.create(),direction:i.create()},this._rayEndPoint=i.create(),this._rayStartPointTransformed=i.create(),this._rayEndPointTransformed=i.create(),this.viewingMode=null==t?1:t}var e=t.prototype;return e.reset=function(t,r){this.resetWithRay(o.ray.fromPoints(t,r,this._ray))},e.resetWithRay=function(t){t!==this._ray&&o.ray.copy(t,this._ray),0!==this.options.verticalOffset?2===this.viewingMode?this._ray.origin[2]-=this.options.verticalOffset:this.verticalOffset=this.options.verticalOffset:this.verticalOffset=null,n.add(this._rayEndPoint,this._ray.origin,this._ray.direction),this._numObjectsTested=0,this.results.init(this._ray)},e.intersect=function(t,r,e,i,n,a){this.point=r,this.camera=e,this.filterPredicate=n,this.tolerance=null==i?c:i;const o=d.getVerticalOffsetObject3D(this.verticalOffset),h=a?t=>{a(t)&&this.intersectObject(t)}:t=>{this.intersectObject(t)};if(t&&t.length>0)for(const d of t){const t=d.getSpatialQueryAccelerator&&d.getSpatialQueryAccelerator();s.isSome(t)?(s.isSome(o)?t.forEachAlongRayWithVerticalOffset(this._ray.origin,this._ray.direction,h,o):t.forEachAlongRay(this._ray.origin,this._ray.direction,h),this.options.selectionMode&&this.options.hud&&t.forEachDegenerateObject(h)):d.getObjects().forAll((t=>h(t)))}this.sortResults()},e.intersectObject=function(t){this._numObjectsTested++;const r=t.geometryRecords;if(!r)return;const e=t.id,i=t.transformation;let o;const c=d.getVerticalOffsetObject3D(this.verticalOffset);for(const l of r){const{geometry:r,material:f,instanceParameters:u}=l;if(h.isInstanceHidden(u))continue;o=r.id,this.transform.setAndInvalidateLazyTransforms(i,l.getShaderTransformation()),n.transformMat4(this._rayStartPointTransformed,this._ray.origin,this.transform.inverse),n.transformMat4(this._rayEndPointTransformed,this._rayEndPoint,this.transform.inverse);const y=this.transform.transform;s.isSome(c)&&(c.objectTransform=this.transform),f.intersect(r,u,this.transform.transform,this,this._rayStartPointTransformed,this._rayEndPointTransformed,((r,i,n,h,c,l)=>{if(r>=0){if(s.isSome(this.filterPredicate)&&!this.filterPredicate(this._ray.origin,this._rayEndPoint,r))return;const f=`Object3D ${e}`;if(c)return void((null==this.results.hud.dist||r<this.results.hud.dist)&&this.results.hud.set(t,f,r,i,a.IDENTITY,h,l,o,n));const u=e=>e.set(t,f,r,i,y,h,null,o,n);if((null==this.results.min.drapedLayerOrder||h>=this.results.min.drapedLayerOrder)&&(null==this.results.min.dist||r<this.results.min.dist)&&u(this.results.min),0!==this.options.store&&(null==this.results.max.drapedLayerOrder||h<this.results.max.drapedLayerOrder)&&(null==this.results.max.dist||r>this.results.max.dist)&&u(this.results.max),2===this.options.store){const t=new d.IntersectorResult(this._ray);u(t),this.results.all.push(t)}}}),l.shaderTransformation)}},e.sortResults=function(){this.results.all.sort(((t,r)=>t.dist!==r.dist?t.dist-r.dist:t.drapedLayerOrder!==r.drapedLayerOrder?(void 0!==t.drapedLayerOrder?t.drapedLayerOrder:Number.MAX_VALUE)-(void 0!==r.drapedLayerOrder?r.drapedLayerOrder:Number.MAX_VALUE):(void 0!==r.drapedLayerGraphicOrder?r.drapedLayerGraphicOrder:Number.MIN_VALUE)-(void 0!==t.drapedLayerGraphicOrder?t.drapedLayerGraphicOrder:Number.MIN_VALUE)))},r._createClass(t,[{key:"ray",get:function(){return this._ray}},{key:"rayBeginPoint",get:function(){return this._ray.origin}},{key:"rayEndPoint",get:function(){return this._rayEndPoint}}]),t}();l.DEFAULT_TOLERANCE=c,t.Intersector=l,Object.defineProperty(t,"__esModule",{value:!0})}));
