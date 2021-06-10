/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../core/has","../../../../core/Logger","../../../support/widgetUtils","../../../../chunks/index","../../../../symbols/support/svgUtils"],(function(e,a,r,l,s,t){"use strict";const i="http://www.w3.org/2000/svg",o={diamondContainer:"esri-relationship-ramp--diamond__container",diamondLeftCol:"esri-relationship-ramp--diamond__left-column",diamondRightCol:"esri-relationship-ramp--diamond__right-column",diamondMidCol:"esri-relationship-ramp--diamond__middle-column",diamondMidColLabel:"esri-relationship-ramp--diamond__middle-column--label",diamondMidColRamp:"esri-relationship-ramp--diamond__middle-column--ramp",squareTable:"esri-relationship-ramp--square__table",squareTableRow:"esri-relationship-ramp--square__table-row",squareTableCell:"esri-relationship-ramp--square__table-cell",squareTableLabel:"esri-relationship-ramp--square__table-label",squareTableLabelLeftBottom:"esri-relationship-ramp--square__table-label--left-bottom",squareTableLabelRightBottom:"esri-relationship-ramp--square__table-label--right-bottom",squareTableLabelLeftTop:"esri-relationship-ramp--square__table-label--left-top",squareTableLabelRightTop:"esri-relationship-ramp--square__table-label--right-top"};function n(e,a,r){const{focus:t,labels:i}=e,n=!!t,d=m(e,a,r);return n?s.jsx("div",{class:o.diamondContainer},s.jsx("div",{class:o.diamondLeftCol},i.left),s.jsx("div",{class:o.diamondMidCol},s.jsx("div",{class:o.diamondMidColLabel},i.top),d,s.jsx("div",{class:o.diamondMidColLabel},i.bottom)),s.jsx("div",{class:o.diamondRightCol},i.right)):s.jsx("div",{class:o.squareTable},s.jsx("div",{class:o.squareTableRow},s.jsx("div",{class:l.classes(o.squareTableCell,o.squareTableLabel,o.squareTableLabelRightBottom)},i.left),s.jsx("div",{class:o.squareTableCell}),s.jsx("div",{class:l.classes(o.squareTableCell,o.squareTableLabel,o.squareTableLabelLeftBottom)},i.top)),s.jsx("div",{class:o.squareTableRow},s.jsx("div",{class:o.squareTableCell}),d,s.jsx("div",{class:o.squareTableCell})),s.jsx("div",{class:o.squareTableRow},s.jsx("div",{class:l.classes(o.squareTableCell,o.squareTableLabel,o.squareTableLabelRightTop)},i.bottom),s.jsx("div",{class:o.squareTableCell}),s.jsx("div",{class:l.classes(o.squareTableCell,o.squareTableLabel,o.squareTableLabelLeftTop)},i.right)))}function d(e,a,r){const l=`${r}_arrowStart`,s=`${r}_arrowEnd`,t="left"===e,i={markerStart:null,markerEnd:null};switch(a){case"HL":t?i.markerStart=`url(#${s})`:i.markerEnd=`url(#${l})`;break;case"LL":i.markerStart=`url(#${s})`;break;case"LH":t?i.markerEnd=`url(#${l})`:i.markerStart=`url(#${s})`;break;default:i.markerEnd=`url(#${l})`}return i}function m(e,a,r,l=60){const{focus:n,numClasses:m,colors:u,rotation:b}=e,p=!!n,c=Math.sqrt(l**2+l**2)+(p?0:5);let h=null;null!=r&&(h=`opacity: ${r}`);const x=[],f=[],k=[],q=(l||75)/m;for(let s=0;s<m;s++){const e=s*q;for(let a=0;a<m;a++){const r=a*q,l=t.generateFillAttributes(u[s][a]),i=t.generateStrokeAttributes(null),o={type:"rect",x:r,y:e,width:q,height:q};x.push(t.renderDef(l)),f.push(t.renderShape(o,l.fill,i,null)),k.push(t.getBoundingBox(o))}}const T=10,_=15,g=15,j=10;let L=null;p||(L="margin: -15px -15px -18px -15px");const C=d("left",n,a),v=d("right",n,a),w=t.computeBBox(k),R=t.getTransformMatrix(w,c,c,0,!1,b,!1),y=t.getTransformMatrix(w,c,c,0,!1,p?-45:null,!1);return s.jsx("div",{style:h,class:p?o.diamondMidColRamp:o.squareTableCell},s.jsx("svg",{xmlns:i,width:c,height:c,style:L},s.jsx("defs",null,s.jsx("marker",{id:`${a}_arrowStart`,markerWidth:"10",markerHeight:"10",refX:"5",refY:"5",markerUnits:"strokeWidth",orient:"auto"},s.jsx("polyline",{points:"0,0 5,5 0,10",fill:"none",stroke:"#555555","stroke-width":"1"})),s.jsx("marker",{id:`${a}_arrowEnd`,markerWidth:"10",markerHeight:"10",refX:"0",refY:"5",markerUnits:"strokeWidth",orient:"auto"},s.jsx("polyline",{points:"5,0 0,5 5,10",fill:"none",stroke:"#555555","stroke-width":"1"})),x),s.jsx("g",{transform:R},f),s.jsx("g",{transform:y},s.jsx("line",{fill:"none",stroke:"#555555","stroke-width":"1","marker-start":C.markerStart,"marker-end":C.markerEnd,x1:-T,y1:l-_,x2:-T,y2:_}),s.jsx("line",{fill:"none",stroke:"#555555","stroke-width":"1","marker-start":v.markerStart,"marker-end":v.markerEnd,x1:g,y1:l+j,x2:l-g,y2:l+j}))))}e.renderRelationshipRamp=n,Object.defineProperty(e,"__esModule",{value:!0})}));
