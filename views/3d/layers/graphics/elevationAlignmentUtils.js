/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../core/compilerUtils","../../../../core/maybe","../../../../chunks/vec3f64","../../../../chunks/mat4","../../../../geometry/projection","../../../../chunks/mat4f64","../../../../layers/graphics/dehydratedFeatures","../../support/ElevationProvider","./graphicUtils"],(function(e,t,n,o,r,a,i,l,s,u){"use strict";function c(e,t,n,o,r,i,l,s,u,c,f){const p=T[f.mode];let d,g,v=0;if(a.projectBuffer(e,t,n,o,u.spatialReference,r,s))return p.requiresAlignment(f)?(v=p.applyElevationAlignmentBuffer(o,r,i,l,s,u,c,f),d=i,g=l):(d=o,g=r),a.projectBuffer(d,u.spatialReference,g,i,c.spatialReference,l,s)?v:void 0}function f(e,o,r,a,i){const u=(l.isDehydratedPoint(e)?e.z:s.isSamplePosition(e)?e.array[e.offset+2]:e[2])||0;switch(r.mode){case"on-the-ground":{const t=n.unwrapOr(s.getElevationAtPoint(o,e,"ground"),0);return i&&(i.verticalDistanceToGround=0,i.sampledElevation=t),t}case"relative-to-ground":{const t=n.unwrapOr(s.getElevationAtPoint(o,e,"ground"),0),l=r.geometryZWithOffset(u,a);return i&&(i.verticalDistanceToGround=l,i.sampledElevation=t),l+t}case"relative-to-scene":{const t=n.unwrapOr(s.getElevationAtPoint(o,e,"scene"),0),l=r.geometryZWithOffset(u,a);return i&&(i.verticalDistanceToGround=l,i.sampledElevation=t),l+t}case"absolute-height":{const t=r.geometryZWithOffset(u,a);if(i){const r=n.unwrapOr(s.getElevationAtPoint(o,e,"ground"),0);i.verticalDistanceToGround=t-r,i.sampledElevation=r}return t}default:return t.neverReached(r.mode),0}}function p(t,n,o){return null==n||null==o?t.definedChanged:"on-the-ground"===n&&"on-the-ground"===o?t.staysOnTheGround:n===o||"on-the-ground"!==n&&"on-the-ground"!==o?e.SymbolUpdateType.UPDATE:t.onTheGroundChanged}function d(e){return"relative-to-ground"===e||"relative-to-scene"===e}function g(e){return"absolute-height"!==e}function v(e,t,n,o,i){const l=f(t,n,i,o,U);u.updateVertexAttributeAuxpos1w(e,U.verticalDistanceToGround);const s=U.sampledElevation,c=r.copy(R,e.transformation);x[0]=t.x,x[1]=t.y,x[2]=l;return a.computeLinearTransformation(t.spatialReference,x,c,o.spatialReference)?e.transformation=c:console.warn("Could not locate symbol object properly, it might be misplaced"),s}function m(e,t,o,r,a,i){let l=0;const s=i.spatialReference;t*=3,r*=3;for(let u=0;u<a;++u){const a=e[t+0],u=e[t+1],c=e[t+2],f=n.unwrapOr(i.getElevation(a,u,c,s,"ground"),0);l+=f,o[r+0]=a,o[r+1]=u,o[r+2]=f,t+=3,r+=3}return l/a}function E(e,t,o,r,a,i,l,s){let u=0;const c=s.calculateOffsetRenderUnits(l),f=s.featureExpressionInfoContext,p=i.spatialReference;t*=3,r*=3;for(let d=0;d<a;++d){const a=e[t+0],l=e[t+1],s=e[t+2],d=n.unwrapOr(i.getElevation(a,l,s,p,"ground"),0);u+=d,o[r+0]=a,o[r+1]=l,o[r+2]=null==f?s+d+c:d+c,t+=3,r+=3}return u/a}function h(e,t,o,r,a,i,l,s){let u=0;const c=s.calculateOffsetRenderUnits(l),f=s.featureExpressionInfoContext,p=i.spatialReference;t*=3,r*=3;for(let d=0;d<a;++d){const a=e[t+0],l=e[t+1],s=e[t+2],d=n.unwrapOr(i.getElevation(a,l,s,p,"scene"),0);u+=d,o[r+0]=a,o[r+1]=l,o[r+2]=null==f?s+d+c:d+c,t+=3,r+=3}return u/a}function y(e){const t=e.meterUnitOffset,n=e.featureExpressionInfoContext;return 0!==t||null!=n}function A(e,t,n,o,r,a,i,l){const s=l.calculateOffsetRenderUnits(i),u=l.featureExpressionInfoContext;t*=3,o*=3;for(let c=0;c<r;++c){const r=e[t+0],a=e[t+1],i=e[t+2];n[o+0]=r,n[o+1]=a,n[o+2]=null==u?i+s:s,t+=3,o+=3}return 0}var O;(O=e.SymbolUpdateType||(e.SymbolUpdateType={}))[O.NONE=0]="NONE",O[O.UPDATE=1]="UPDATE",O[O.RECREATE=2]="RECREATE";const T={"absolute-height":{applyElevationAlignmentBuffer:A,requiresAlignment:y},"on-the-ground":{applyElevationAlignmentBuffer:m,requiresAlignment:()=>!0},"relative-to-ground":{applyElevationAlignmentBuffer:E,requiresAlignment:()=>!0},"relative-to-scene":{applyElevationAlignmentBuffer:h,requiresAlignment:()=>!0}},R=i.create(),U={verticalDistanceToGround:0,sampledElevation:0},x=o.create();e.applyElevationAlignmentForHUD=v,e.applyPerVertexElevationAlignment=c,e.elevationModeChangeUpdateType=p,e.evaluateElevationAlignmentAtPoint=f,e.needsElevationUpdates2D=d,e.needsElevationUpdates3D=g,Object.defineProperty(e,"__esModule",{value:!0})}));
