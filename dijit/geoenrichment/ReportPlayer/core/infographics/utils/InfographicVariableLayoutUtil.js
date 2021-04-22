// COPYRIGHT © 2021 Esri
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
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define(["esri/dijit/geoenrichment/utils/DomUtil","esri/dijit/geoenrichment/utils/MathUtil","../../annotations/shape/ShapeJsonUtil"],(function(t,e,i){var h={VARIABLE_LAYOUTS:[{value:"v1",hasIcon:!0,hasDesc:!0},{value:"v1-d",hasIcon:!0,hasDesc:!1},{value:"v2",hasIcon:!0,hasDesc:!0},{value:"v3",hasIcon:!0,hasDesc:!0},{value:"v4",hasIcon:!1,hasDesc:!0},{value:"v5",hasIcon:!1,hasDesc:!1}],getIdObj:function(t){return h.VARIABLE_LAYOUTS.filter((function(e){return e.value===t}))[0]},getClosestId:function(t,e){var i=h.hasIcon(t),n=!!t.description;if(t.shape&&t.shape.shapeJson.isPlaceholder)return"v1";if(!i&&!n)return"v5";var a=h.getBoxes(t);return i?a.variableCenter.y>a.iconBox.y+a.iconBox.h?n?"v1":"v1-d":a.variableCenter.x>a.iconBox.x+a.iconBox.w?"v3":h.isVariableInShape(t)?"v2":void 0!==e?e:n?"v1":"v1-d":"v4"},hasIcon:function(t){return t&&(t.shape&&!i.isEmptyShapeJson(t.shape.shapeJson)||t.image)},isVariableInShape:function(t){if(!h.hasIcon(t))return!1;var i=h.getBoxes(t);return e.isPointInRect(i.iconBox,i.variableCenter)&&e.isPointInRect(i.variableBox,i.iconCenter)},getBoxes:function(t){var e={};if(h.hasIcon(t)){var i=t.image?t.image.style:t.shape.style,n={x:i.left,y:i.top,w:i.width,h:i.height};e.iconBox=n,e.iconCenter={x:n.x+n.w/2,y:n.y+n.h/2}}var a=t.variable.style,l={x:a.left,y:a.top,w:a.width,h:a.height};if(e.variableBox=l,e.variableCenter={x:l.x+l.w/2,y:l.y+l.h/2},t.description){var o=t.description.style,g={x:o.left,y:o.top,w:o.width,h:o.height};e.descriptionBox=g,e.descriptionCenter={x:g.x+g.w/2,y:g.y+g.h/2}}return e},getActualShapeBox:function(e,h){if(i.isEmptyShapeJson(e.shapeJson))return null;var n=h.layoutBuilder.createElement("shape",{node:document.body,json:e.shapeJson,creationParams:{viewModel:h,applyThemeStyle:!1}}),a=n.getSvgNode(),l=t.getNodesBox(a.children);return n.destroy(),l&&{x:l.x+(e.style.width-l.w)/2,y:l.y+(e.style.height-l.h)/2,w:l.w,h:l.h}},calcLayout:function(t,e,i){var h=t.style,n=t.shape?t.shape.style:t.image&&t.image.style,a=t.variable&&t.variable.style,l=t.description&&t.description.style,o=i&&i.noPadding;function g(t,e){var i=(Math.max(50,Math.min(200,h.height))-50)/150;return t*(1-i)+e*i}if("v1"===e){var r=h.width*(o?0:.1),s=h.width-2*r;n.left=r,n.top=0,n.width=s,n.height=g(.35*h.height,.55*h.height),a.left=r,a.top=g(.35*h.height,.55*h.height),a.width=s,a.height=g(.35*h.height,.2*h.height),a.verticalAlign="middle",l.left=r,l.top=g(.7*h.height,.75*h.height),l.width=s,l.height=g(.3*h.height,.25*h.height),l.horizontalAlign="center",l.verticalAlign="top"}if("v1-d"===e){r=h.width*(o?0:.1),s=h.width-2*r;n.left=r,n.top=0,n.width=s,n.height=g(.6*h.height,.8*h.height),a.left=r,a.top=g(.6*h.height,.8*h.height),a.width=s,a.height=g(.4*h.height,.2*h.height),a.verticalAlign="middle"}else if("v2"===e){n.left=.15*h.width,n.top=0,n.width=.7*h.width,n.height=.725*h.height;var d=.3625*h.height,c=d>=30?1:30/d;a.left=.2*h.width,a.top=.18125*h.height/c,a.width=.6*h.width,a.height=d*c,a.verticalAlign="middle",l.left=.1*h.width,l.top=g(.725*h.height,.75*h.height),l.width=h.width-2*l.left,l.height=g(.275*h.height,.25*h.height),l.horizontalAlign="center",l.verticalAlign="top"}else if("v3"===e)t.shape&&t.shape.shapeJson.showAsBar?(n.left=.03*h.width,n.top=.1*h.height,n.width=.65*h.width,n.height=.5*h.height,a.left=.65*h.width,a.top=.1*h.height,a.width=.35*h.width,a.height=.5*h.height,a.verticalAlign="middle",l.left=.03*h.width,l.top=.6*h.height,l.width=.65*h.width,l.height=.33*h.height,l.horizontalAlign="left",l.verticalAlign="top"):(n.left=.025*h.width,n.top=0*h.height,n.width=.5*h.width,n.height=.725*h.height,a.left=.525*h.width,a.top=0*h.height,a.width=.475*h.width,a.height=.725*h.height,a.verticalAlign="middle",l.left=.025*h.width,l.top=g(.725*h.height,.75*h.height),l.width=.5*h.width,l.height=g(.275*h.height,.25*h.height),l.horizontalAlign="center",l.verticalAlign="top");else if("v4"===e){a.left=0,a.top=0,a.width=h.width,a.height=g(.5*h.height,.725*h.height),a.verticalAlign="middle";var v=t.variable;!v.style.fontSize&&v.themeStyle&&v.themeStyle.fontSize&&(v.style.fontSize=Math.round(1.33*v.themeStyle.fontSize)),l.left=h.width*(o?0:.1),l.top=g(.5*h.height,.75*h.height),l.width=h.width-2*l.left,l.height=g(.5*h.height,.25*h.height),l.horizontalAlign="center",l.verticalAlign="top"}else"v5"===e&&(a.left=0,a.top=0,a.width=h.width,a.height=g(.7*h.height,.725*h.height),a.verticalAlign="middle")}};return h}));