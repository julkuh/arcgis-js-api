/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../chunks/_rollupPluginBabelHelpers","../../../core/handleUtils","../../../Color","./Settings","../../3d/interactive/visualElements/PointVisualElement","./SnappingCandidate","./SnappingConstraint"],(function(e,n,i,t,r,o,a,l){"use strict";let s=function(e){function a(n,i,t,r){var o;return(o=e.call(this,n,i,new l.LineLikeIntersectionConstraint(t.constraint,r.constraint))||this).left=t,o.right=r,o}n._inheritsLoose(a,e);var s=a.prototype;return s.visualizeTargetHints=function(e,n,t){return i.handlesGroup([this.left.visualize(e,n,t),this.right.visualize(e,n,t)])},s.visualizeReferenceHints=function(e,n,a){return i.destroyHandle(new o.PointVisualElement({view:e,primitive:"circle",geometry:this.coordinateHelper.createPoint(a),elevationInfo:n,size:20,outlineSize:2,color:[0,0,0,0],outlineColor:t.toUnitRGBA(r.defaults.orange),pixelSnappingEnabled:!1}))},a}(a.SnappingCandidate);e.IntersectionSnappingCandidate=s,Object.defineProperty(e,"__esModule",{value:!0})}));