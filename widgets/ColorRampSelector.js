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

define(["../core/lang","../core/Accessor","../renderers/support/colorRampUtils","dojo/i18n!./ColorRampSelector/nls/ColorRampSelector","dojo/store/Memory","dijit/form/FilteringSelect","dojo/dom-style","dojo/on"],function(t,e,i,o,n,a,r,s){return e.createSubclass([a],{declaredClass:"esri.widget.ColorRampSelector",_colorRampNameMap:null,_colorRamps:null,_namesShown:!1,colorRamp:null,reverseRamp:!1,constructor:function(e){this._i18n=o,this._colorRamps=t.clone(i.PREDEFINED_JSON_COLOR_RAMPS),this._colorRampNameMap=t.clone(i.PREDEFINED_COLOR_RAMP_NAME_MAP)},startup:function(){this.inherited(arguments),this._styleDijitInput(),this._setupColorRampList(),this._setupDropdownEvents(),this._handleColorRampChange(),this._setColorRamp()},_setupDropdownEvents:function(){s(this.inputContainer,"click",this.toggleDropDown.bind(this)),this.dropDownEventsSetup=!0},_setColorRamp:function(){var t=this.colorRamp;if(!t)return void this.reset();this.setSelected(t)||(this.addColorRamp(t),this.setSelected(t))},_setupColorRampList:function(){this._generateColorRamps(),this._populateColorRampList()},_styleDijitInput:function(){var t=this.domNode.getElementsByClassName("dijitReset dijitInputInner")[0];this.inputContainer=this.domNode.getElementsByClassName("dijitReset dijitInputField dijitInputContainer")[0],r.set(this.inputContainer,"height","25px!important"),r.set(t,"display","none")},_generateColorRamps:function(){var t,e=this._i18n.colorRamps;this._colorRamps.forEach(function(i){i.name=e[i.id]||i.name,t=this._generateColorRampDivs(i),i.labelGradient="<div title='"+i.name+"' style='height:20px; padding: 2px; direction: ltr!important;'>"+t+"</div>",this._namesShown?i.label="<label style='display: block; padding-left: 2px;'>"+i.name+"</label><div style='height:20px; padding: 2px; direction: ltr!important;'>"+t+"</div>":i.label=i.labelGradient},this)},_populateColorRampList:function(){this.set("labelAttr","label"),this.set("labelType","html"),this.set("searchAttr","id"),this.set("store",new n({data:this._colorRamps})),this._handleColorRampChange()},_generateColorRampDivs:function(t){if(t){var e,i="";return"multipart"===t.type?(e=100/t.colorRamps.length,t.colorRamps.forEach(function(t){i+=this._generateSingleGradientDiv(t.fromColor,t.toColor,e)},this)):i=this._generateSingleGradientDiv(t.fromColor,t.toColor,100),i}},_generateSingleGradientDiv:function(t,e,i){if(t&&e){var o,n=["-webkit-linear-gradient","-o-linear-gradient","-moz-linear-gradient","linear-gradient"],a="";return t=t.toRgb?t.toRgb():t,e=e.toRgb?e.toRgb():e,o="(90deg, rgb("+t.slice(0,3).join()+"), rgb("+e.slice(0,3).join()+"));",n.forEach(function(t){a+="background: "+t+o}),"<div style=' display: inline-block; width:"+i+"%; padding: 0; height: 100%;"+a+"'></div>"}},onChange:function(){this.inherited(arguments),this._handleColorRampChange()},_handleColorRampChange:function(){if(this.inputContainer){var t={};this._colorRamps.some(function(e){if(e.id===this.value)return t=e,!0},this)&&(this.inputContainer.innerHTML=t.labelGradient,this.colorRampName=i.getColorRampName(t.id),this.colorRamp=t)}},showNames:function(t){this._namesShown=t,this._setupColorRampList()},reset:function(){this.set("value","aspect_predefined",!1),this._handleColorRampChange()},removeColorRamp:function(t){t&&this.store&&this.store.data&&this.store.data.length&&this.store.remove(t.id)},addColorRamp:function(t){if(t){var e=this._generateColorRampDivs(t),i=this.reverseRamp?"rtl":"ltr";t.labelGradient="<div title='"+t.name+"' style='height:18px; padding: 1px; direction: "+i+"!important;'>"+e+"</div>",this._namesShown?t.label="<label style='display: block; padding-left: 2px;'>"+t.name+"</label><div style='height:18px; padding: 1px; direction: ltr!important;'>"+e+"</div>":t.label=t.labelGradient,this.store&&this.store.data&&this.store.data.length?this.store.put(t,{overwrite:!0}):this._colorRamps.push(t),this._colorRampNameMap[t.id]=t.name}},setSelected:function(t){if(!t)return this.reset(),!1;var e=i.getColorRampId(t,this._colorRamps,this._colorRampNameMap);return e?(this.set("value",e,!1),this._handleColorRampChange(e),!0):(this.reset(),!1)}})});