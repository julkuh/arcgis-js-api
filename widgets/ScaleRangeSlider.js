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

define(["../core/promiseUtils","../core/watchUtils","./support/_Tooltip","./ScaleRangeSlider/_RecommendedScaleRangeBounds","./ScaleRangeSlider/_SlideEvent","./ScaleRangeSlider/ScaleMenu","./ScaleRangeSlider/ScalePreview","./ScaleRangeSlider/ScaleRanges","dijit/_WidgetBase","dijit/form/DropDownButton","dijit/popup","dojo/aspect","dojo/debounce","dojo/dom-class","dojo/dom-construct","dojo/dom-geometry","dojo/dom-style","dojo/on","dojo/string","dojox/form/HorizontalRangeSlider","dojo/i18n!./ScaleRangeSlider/nls/ScaleRangeSlider"],function(e,i,t,a,n,s,l,r,c,o,d,h,u,S,_,m,g,p,v,b,f){return c.createSubclass([t],{declaredClass:"esri.dijit.ScaleRangeSlider",baseClass:"esri-scale-range-slider",css:{scaleIndicator:"esri-scale-range-slider__scale-indicator",scaleIndicatorContainer:"esri-scale-range-slider__scale-indicator-container"},disabled:!1,view:null,layer:null,region:"en-US",minScale:0,maxScale:0,intermediateChanges:!1,labels:f,_slider:null,_currentScaleIndicator:null,_scalePreview:null,_maxScaleButton:null,_minScaleButton:null,_viewUpdateHandler:null,_scaleRanges:null,_scheduleScaleRangeChangeEmit:null,_getSliderIndexRange:function(e){var i=Math.floor(e);return{min:i,max:i+.99999}},_setDisabledAttr:function(e){this._slider.set("disabled",e),this._maxScaleButton.set("disabled",e),this._minScaleButton.set("disabled",e),this._set("disabled",e)},_setViewAttr:function(e){this._set("view",e),this._viewUpdateHandler&&this._viewUpdateHandler.remove(),this._slider.set("disabled",!0),this._ensureView().then(this._updateFromView)},_setConstraintsAttr:function(e){this._set("constraints",e),this._setUpSlider({minScale:e.minScale,maxScale:e.maxScale})},_updateFromView:function(e){var t,a=e.constraints.effectiveMinScale,n=e.constraints.effectiveMaxScale;this._setUpSlider({minScale:a,maxScale:n}),this._updateCurrentScaleIndicator(),t=i.whenTrue(e,"stationary",this._updateCurrentScaleIndicator.bind(this)),this.own(t),this._viewUpdateHandler=t},_setUpSlider:function(e){var i,t=e.maxScale,a=e.minScale;this._slider.set("disabled",this.get("disabled")),this._scaleRanges.set("scaleRangeBounds",{minScale:a,maxScale:t}),i=this._getSliderIndexRange(this._scaleRanges.length-1),this._slider.set("maximum",i.max),this._silentSliderUpdate({maxScale:t,minScale:a})},_ensureView:function(){return this._untilLoaded(this.view)},_untilLoaded:function(e){return e.when()},_updateCurrentScaleIndicator:function(){var e=this._scaleRanges.clampScale(this.view.scale),i=this._mapScaleToSlider(e),t=i/this._slider.maximum;this.isLeftToRight()||(t=1-t),g.set(this._currentScaleIndicator,{left:100*t+"%"})},_setLayerAttr:function(e){this._set("layer",e),this._ensureScaleRangeProvider().then(this._ensureLayer).then(this._updateMinMaxScaleFromLayer)},_ensureLayer:function(){return this._untilLoaded(this.layer)},_updateMinMaxScaleFromLayer:function(e){this.set({minScale:e.minScale,maxScale:e.maxScale})},_mapSliderToScale:function(e){var i=this._getSliderIndexRange(e),t=this._scaleRanges.findScaleRangeByIndex(e),a=t.minScale,n=t.maxScale;return this._mapToRange(e,i.min,i.max,a,n)},_mapToRange:function(e,i,t,a,n){return a+(e-i)*(n-a)/(t-i)},_setRegionAttr:function(e){this._set("region",e),this._scalePreview.set("source",r.getScalePreviewSource(e))},_getMinimumAttr:function(){return this._mapSliderToScale(this._slider.minimum)},_getMaximumAttr:function(){return this._mapSliderToScale(this._slider.maximum)},_getActualMaxScaleAttr:function(){return this._scaleRanges.clampMaxScale(this.maxScale)},_setMaxScaleAttr:function(e){this._set("maxScale",e),this._ensureScaleRangeProvider().then(function(){e=this._scaleRanges.clampMaxScale(e),this._set("maxScale",this._layerConstrainedMaxScale(e)),this._silentSliderUpdate({maxScale:e}),this._scheduleScaleRangeChangeEmit()}.bind(this))},_silentSliderUpdate:function(e){var i,t,a=e.minScale,n=e.maxScale,s=this._scaleRanges,l=this._slider;void 0!==a&&(i=this._mapScaleToSlider(s.clampMinScale(a)),l.set("value",i,!1,!1)),void 0!==n&&(t=this._mapScaleToSlider(s.clampMaxScale(n)),l.set("value",t,!1,!0))},_mapScaleToSlider:function(e){var i=this._scaleRanges.scaleToRangeIndex(e),t=this._getSliderIndexRange(i),a=this._scaleRanges.findScaleRangeByIndex(i),n=a.minScale,s=a.maxScale;return this._mapToRange(e,n,s,t.min,t.max)},_getActualMinScaleAttr:function(){return this._scaleRanges.clampMinScale(this.minScale)},_setMinScaleAttr:function(e){this._set("minScale",e),this._ensureScaleRangeProvider().then(function(){e=this._scaleRanges.clampMinScale(e),this._set("minScale",this._layerConstrainedMinScale(e)),this._silentSliderUpdate({minScale:e}),this._scheduleScaleRangeChangeEmit()}.bind(this))},_ensureScaleRangeProvider:function(){return this.view?this._ensureView():e.create(function(e){this.constraints&&e()}.bind(this))},_emitScaleRangeChange:function(){this.emit("change",{minScale:this.minScale,maxScale:this.maxScale})},_layerConstrainedMinScale:function(e){var i,t,a,n,s=this._getLayerLODS(),l=s.length>0;return l?(i=s[0].scale,t=this._scaleRanges.get("firstRange"),a=.85,n=this._mapToRange(e,t.maxScale,t.minScale,0,1)>a,n?i:e>i?i:e):this._scaleRanges.beyondMinScale(e)?0:e},_layerConstrainedMaxScale:function(e){var i,t=this._getLayerLODS(),a=t.length>0;return a?(i=t[t.length-1].scale,e<i?i:e):this._scaleRanges.beyondMaxScale(e)?0:e},_getLayerLODS:function(){var e=this.layer;return e&&e.tileInfo&&e.tileInfo.lods||[]},constructor:function(){this._scaleRanges=new(r.createSubclass([a])),this._scheduleScaleRangeChangeEmit=u(this._emitScaleRangeChange.bind(this),0),this._ensureView=this._ensureView.bind(this),this._ensureScaleRangeProvider=this._ensureScaleRangeProvider.bind(this),this._ensureLayer=this._ensureLayer.bind(this),this._updateMinMaxScaleFromLayer=this._updateMinMaxScaleFromLayer.bind(this),this._updateFromView=this._updateFromView.bind(this)},buildRendering:function(){this.inherited(arguments),this._initSlider(),this._initScalePreview(),this._initCurrentScaleIndicator(),this._initScaleMenus()},_initSlider:function(){var e=new(b.createSubclass([n]))({baseClass:"esri-horizontal-slider",showButtons:!1,intermediateChanges:this.intermediateChanges,disabled:!0});this._slider=e,e.placeAt(this.domNode),e.startup(),this.own(e.on("slide-onmousemove, slidemax-onmousemove",function(e){this._updateScalePreview(e.movable.handle)}.bind(this)),e.on("slide-onmovestop, slidemax-onmovestop",function(e){S.contains(e.movable.handle,"dijitSliderThumbHover")||this._closeScalePreview()}.bind(this)),e.on("change",function(){var e=Math.round(this._mapSliderToScale(this._getSliderMin())),i=Math.round(this._mapSliderToScale(this._getSliderMax()));this.set({minScale:e,maxScale:i})}.bind(this)),h.after(e,"_setValueAttr",this._updateLabelMenus.bind(this)))},_getSliderMin:function(){return this._slider.get("value")[0]},_getSliderMax:function(){return this._slider.get("value")[1]},_updateLabelMenus:function(){var e=this._minScaleButton,i=this._maxScaleButton;e.set("label",this._scaleRanges.getScaleRangeLabel(this._getSliderMin())),i.set("label",this._scaleRanges.getScaleRangeLabel(this._getSliderMax()))},_initScalePreview:function(){var e=new l;e.startup(),d.moveOffScreen(e),[this._slider._movable.handle,this._slider._movableMax.handle].forEach(function(e){e.onmouseenter=this._updateScalePreview.bind(this,e),e.onmouseleave=this._closeScalePreview.bind(this)},this),this.own(e),this._scalePreview=e},_closeScalePreview:function(){d.close(this._scalePreview)},_updateScalePreview:function(e){if(!this.disabled){var i=this._scalePreview;d.moveOffScreen(i);var t,a,n,s=this._slider,l=e===s.sliderHandle,r=l?this._getSliderMin():this._getSliderMax(),c=m.position(e),o=m.position(i.domNode),h=m.position(s.sliderBarContainer),u=this.isLeftToRight(),S=this._scaleRanges.getScalePreviewSpriteBackgroundPosition(r);i.set("backgroundPosition",S),a=c.x-h.x,n=.5*o.w,t=a<n?u?["above","below"]:["above-alt","below-alt"]:a<h.w-n?["above-centered","below-centered"]:u?["above-alt","below-alt"]:["above","below"],d.open({parent:this,popup:i,around:e,orient:t})}},_initCurrentScaleIndicator:function(){if(this.view){var e=_.create("div",{className:this.css.scaleIndicatorContainer},this._slider.sliderBarContainer),i=_.create("div",{className:this.css.scaleIndicator},e);this._currentScaleIndicator=i,this.createTooltip(i);var t=p(i,"mouseover",function(){var e=v.substitute(this.labels.currentScaleTooltip,{scaleLabel:this._scaleRanges.getScaleRangeLabel(this._mapScaleToSlider(this.view.scale))});this.findTooltip(i).set("label",e)}.bind(this));this.own(t)}},_initScaleMenus:function(){var e,i,t=new s,a=new s;this.own(t.on("scale-selected",function(i){e.closeDropDown(),this.set("minScale",i.scale)}.bind(this))),this.own(a.on("scale-selected",function(e){i.closeDropDown(),this.set("maxScale",e.scale)}.bind(this))),e=new o({baseClass:"esri-scale-menu__button esri-scale-menu__button--min",dropDown:t,dropDownPosition:["below","above"]}),e.toggleDropDown(),e.toggleDropDown(),i=new o({baseClass:"esri-scale-menu__button esri-scale-menu__button--max",dropDown:a,dropDownPosition:["below","above"]}),i.toggleDropDown(),i.toggleDropDown(),this.own(h.before(e,"openDropDown",function(){var i=this._scaleRanges.findScaleRange(this.get("actualMaxScale")).minScale;t.set("options",{label:e.label,scale:{current:this.get("actualMinScale"),map:this._getViewScale(),min:this.get("minimum"),max:i}})}.bind(this))),this.own(h.before(i,"openDropDown",function(){var e=this._scaleRanges.findScaleRange(this.get("actualMinScale")).maxScale;a.set("options",{label:i.label,scale:{current:this.get("actualMaxScale"),map:this._getViewScale(),min:e,max:this.get("maximum")}})}.bind(this))),e.placeAt(this.domNode),i.placeAt(this.domNode),t.startup(),a.startup(),e.startup(),i.startup(),this._minScaleButton=e,this._maxScaleButton=i},_getViewScale:function(){return this.view?this.view.scale:-1},startup:function(){this.inherited(arguments),this.watch("intermediateChanges",function(e,i,t){this._slider.set(e,t)})}})});