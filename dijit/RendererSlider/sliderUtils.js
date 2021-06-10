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

define(["../../renderers/utils","../../numberUtils","dojo/i18n!../../nls/jsapi","dojo/_base/array","dojo/_base/lang","dojo/dom-style","dojo/string","dijit/Tooltip","dojox/gfx"],(function(e,t,o,i,a,r,n,s,l){return{histogramXAvgPadding:18,labelTopOffset:3,generateTransparentBackground:function(e,t,o,i){var a=e.createRect({width:t,height:o}).setFill(i?this.getTransparentFill():null);return a.moveToBack(),a},getTransparentFill:function(){return{type:"pattern",x:0,y:0,width:16,height:16,src:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgaGVpZ2h0PSIxNiIgd2lkdGg9IjE2Ij48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNjY2MiIC8+PHBhdGggZD0iTTAgMCBMOCAwIEw4IDggTDAgOCBaIiBmaWxsPSIjZmZmIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLDgpIiAvPjxwYXRoIGQ9Ik0wIDAgTDggMCBMOCA4IEwwIDggWiIgZmlsbD0iI2NjYyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCw4KSIgLz48cGF0aCBkPSJNMCAwIEw4IDAgTDggOCBMMCA4IFoiIGZpbGw9IiNmZmYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgsMCkiIC8+PC9zdmc+"}},generateHistogramSurface:function(e,t,o,i){var a=l.createSurface(e,t,o);return r.set(a.rawNode,{overflow:"visible",display:"inline-block",left:i+"px"}),a.rawNode.setAttribute("class","esri-histogram-surface"),a},generateCountTooltips:function(e,t){var r,l=[];return(r=i.map(e.bins,(function(e){return"object"==typeof e?e.count:e}))).reverse(),i.forEach(r,a.hitch(this,(function(e,i){var a=n.substitute(o.widgets.rendererSlider.count,{count:e});l.push(new s({connectId:[t.children[i].rawNode],label:a}))}))),l},generateHistogram:function(e,t,o,n,s){var c,d,g,p=e.createGroup();return p.rawNode.setAttribute("class","esri-histogram-group"),(c=i.map(t.bins,(function(e){return"object"==typeof e?e.count:e}))).reverse(),d=e.getDimensions().height/c.length,i.forEach(c,a.hitch(this,(function(e,t){g=e>0?(o-this.histogramXAvgPadding)*(e/Math.max.apply(Math,c)):0;var i=p.createRect({width:g,height:d}).setFill("#aaa").setTransform(l.matrix.translate(0,d*t));i.rawNode.setAttribute("class","esri-histogram-bar"),i.rawNode.setAttribute("shape-rendering","crispEdges")}))),r.set(e.rawNode,{display:"inline-block",left:n+"px"}),s||p.setTransform({dx:o,dy:0,xx:-1,xy:0,yx:0,yy:1}),p},generateAvgLine:function(i,a,l,c,d,g,p){if(null!=a){var u,h,b,f,m=i.rawNode.getAttribute("width"),x=i.rawNode.getAttribute("height"),w=Math.round(l);return(u=i.createLine({x1:d?0:12,y1:w,x2:d?m-this.histogramXAvgPadding+4:m,y2:w}).setStroke({color:"#667"}).moveToBack()).rawNode.setAttribute("shape-rendering","crispEdges"),h=i.createImage({x:d?m-this.histogramXAvgPadding+4+2:0,y:w-8,width:12,height:14,src:require.toUrl("esri/dijit/RendererSlider/images/xAvg.png")}),g?a=e.formatDate(a,e.timelineDateFormatOptions):p?a=t.format(parseFloat(a.toFixed(2))).toString()+"%":(c=c<2?2:c,a=t.format(parseFloat(a.toFixed(c))).toString()),f=n.substitute(o.widgets.rendererSlider.statsAvg,{avg:a}),b=new s({connectId:[h.rawNode],label:f}),w>x||w<0?(r.set(u.rawNode,"display","none"),r.set(h.rawNode,"display","none")):(r.set(u.rawNode,"display","block"),r.set(h.rawNode,"display","block")),{avgHandleLine:u,avgHandleImage:h,avgHandleTooltip:b}}},getCombinedPrecision:function(e,t){var o=this.getPrecision(e),i=this.getPrecision(t);return e>-10&&e<10&&t>-10&&t<10&&o<2&&i<2?2:o>i?o:i},getPrecision:function(e){for(var t,o=1;Math.round(e*o)/o!==e;)o*=10;return(t=Math.round(Math.log(o)/Math.LN10))>20?20:t},_resetLabelPositions:function(e){i.forEach(e,(function(e){if(e){var t=e.labelNode;t&&(r.set(t,"top","3px"),e.labelNode._autoPositioned=!1)}}))},_autoPositionHandleLabels:function(e){var t=[];if(0!==e.length&&(this._resetLabelPositions(e),i.forEach(e,(function(e,o){e&&e.labelNode&&t.push({index:o,handle:e,label:e.labelNode,rect:e.labelNode.getBoundingClientRect()})})),0!==t.length))switch(t.length){case 1:break;case 2:this._autoPositionTwoHandles(e,t);break;case 3:this._autoPositionThreeHandles(e,t);break;default:this._autoPositionManyHandles(e,t)}},_autoPositionTwoHandles:function(e,t){var o,i,a,n;this.collisionCheck(t[0].rect,t[1].rect)&&(o=t[0].rect.top-t[1].rect.top,i=(t[0].rect.height-o)/2,a=this.labelTopOffset+i,n=this.labelTopOffset-i,r.set(t[0].label,"top",a+"px"),r.set(t[1].label,"top",n+"px"),t[0].label._autoPositioned=!0,t[1].label._autoPositioned=!0)},_autoPositionThreeHandles:function(e,t){var o,n,s,l,c,d;if(i.forEach(t,a.hitch(this,(function(e,i){var a=t[i-1];a&&a.rect&&this.collisionCheck(e.rect,a.rect)&&(e.label._autoPositioned&&!a.label._autoPositioned?(o=a.rect.top-e.rect.top,s=e.rect.height,l=s-o+this.labelTopOffset,r.set(a.label,"top",l+"px"),a.label._autoPositioned=!0):!e.label._autoPositioned&&a.label._autoPositioned?(o=a.rect.top-e.rect.top,s=e.rect.height,l=-1*(s-o)+Number(a.label.style.top.replace("px","")),r.set(e.label,"top",l+"px"),e.label._autoPositioned=!0):(o=a.rect.top-e.rect.top,n=(e.rect.height-o)/2,c=this.labelTopOffset-n,d=this.labelTopOffset+n,r.set(a.label,"top",d+"px"),r.set(e.label,"top",c+"px"),a.label._autoPositioned=!0,e.label._autoPositioned=!0))}))),t[2].handle&&t[2].handle.style.top.replace("px","")<10){var g,p,u,h,b=t[2].label,f=t[1].label,m=t[0].label,x=b.getBoundingClientRect(),w=f.getBoundingClientRect(),P=m.getBoundingClientRect();b._autoPositioned&&f._autoPositioned&&m._autoPositioned?(g=Number(b.style.top.replace("px",""))+8,p=Number(f.style.top.replace("px",""))+8,u=Number(m.style.top.replace("px",""))+8,r.set(b,"top",g+"px"),r.set(f,"top",p+"px"),r.set(m,"top",u+"px")):(b._autoPositioned&&(h=Number(b.style.top.replace("px",""))+4,r.set(b,"top",h+"px")),f._autoPositioned&&w.top-x.top<w.height&&(h=Number(f.style.top.replace("px",""))+4,r.set(f,"top",h+"px")),P.top-w.top<P.height&&(h=Number(m.style.top.replace("px",""))+4,r.set(m,"top",h+"px")))}},_autoPositionManyHandles:function(){},collisionCheck:function(e,t){return!(e.right<t.left||e.left>t.right||e.bottom<t.top||e.top>t.bottom)}}}));