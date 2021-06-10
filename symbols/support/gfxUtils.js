/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../Color","../../core/screenUtils","../../request","../../assets","../../core/ItemCache","./cimSymbolUtils"],(function(e,t,n,r,i,o,l){"use strict";const s="picture-fill",a="simple-fill",c="simple-line",u="simple-marker",p="text",f="cim",d={left:"start",center:"middle",right:"end",justify:"start"},g={top:"text-before-edge",middle:"central",baseline:"alphabetic",bottom:"text-after-edge"},m=new o(1e3);function h(e){let t=e.horizontalAlignment;return t=t&&d[t.toLowerCase()]||"middle",t}function y(e){const t=e.verticalAlignment;return t&&g[t.toLowerCase()]||"alphabetic"}function b(e){return"bottom"===e.verticalAlignment?"super":null}function x(e){const t=e.style;let r=null;if(e)switch(e.type){case u:"cross"!==t&&"x"!==t&&(r=e.color);break;case a:"solid"===t?r=e.color:"none"!==t&&(r={type:"pattern",x:0,y:0,src:i.getAssetUrl(`esri/symbols/patterns/${t}.png`),width:5,height:5});break;case s:r={type:"pattern",src:e.url,width:n.pt2px(e.width)*e.xscale,height:n.pt2px(e.height)*e.yscale,x:n.pt2px(e.xoffset),y:n.pt2px(e.yoffset)};break;case p:r=e.color;break;case f:r=l.getCIMSymbolColor(e)}return r}function w(e,t){const n=e+"-"+t;return void 0!==m.get(n)?Promise.resolve(m.get(n)):r(e,{responseType:"image"}).then((e=>{const r=e.data,i=r.naturalWidth,o=r.naturalHeight,l=document.createElement("canvas");l.width=i,l.height=o;const s=l.getContext("2d");s.fillStyle=t,s.fillRect(0,0,i,o),s.globalCompositeOperation="destination-in",s.drawImage(r,0,0);const a=l.toDataURL();return m.put(n,a),a}))}function C(e){if(!e)return null;let t;switch(e.type){case a:case s:case u:t=C(e.outline);break;case c:{const r=n.pt2px(e.width);"none"!==e.style&&0!==r&&(t={color:e.color,style:k(e.style),width:r,cap:e.cap,join:"miter"===e.join?n.pt2px(e.miterLimit):e.join});break}default:t=null}return t}const k=function(){const e={};return function(t){if(e[t])return e[t];const n=t.replace(/-/g,"");return e[t]=n,n}}(),S=new t([128,128,128]);e.defaultThematicColor=S,e.getFill=x,e.getPatternUrlWithColor=w,e.getSVGAlign=h,e.getSVGBaseline=y,e.getSVGBaselineShift=b,e.getStroke=C,Object.defineProperty(e,"__esModule",{value:!0})}));
