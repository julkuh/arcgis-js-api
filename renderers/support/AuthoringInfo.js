/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/lang","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/jsonMap","../../core/accessorSupport/decorators/reader","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/JSONSupport","./AuthoringInfoFieldInfo","./AuthoringInfoVisualVariable","../../tasks/support/colorRamps"],(function(e,t,i,s,r,a,o,l,n,u,c,p,d,y,h,f,v){"use strict";var m;const _=new l.JSONMap({esriClassifyDefinedInterval:"defined-interval",esriClassifyEqualInterval:"equal-interval",esriClassifyManual:"manual",esriClassifyNaturalBreaks:"natural-breaks",esriClassifyQuantile:"quantile",esriClassifyStandardDeviation:"standard-deviation"}),b=new l.JSONMap({classedSize:"class-breaks-size",classedColor:"class-breaks-color",univariateColorSize:"univariate-color-size",relationship:"relationship",predominance:"predominance",dotDensity:"dot-density"}),g=["inches","feet","yards","miles","nautical-miles","millimeters","centimeters","decimeters","meters","kilometers","decimal-degrees"],w=["high-to-low","above-and-below","above","below","90-10"],S=["caret","circle-caret","arrow","circle-arrow","plus-minus","circle-plus-minus","square","circle","triangle","happy-sad","thumb","custom"];let k=m=function(t){function i(e){var i;return(i=t.call(this,e)||this).colorRamp=null,i.lengthUnit=null,i.maxSliderValue=null,i.minSliderValue=null,i.visualVariables=null,i}e._inheritsLoose(i,t);var r=i.prototype;return r.readColorRamp=function(e){if(e)return v.fromJSON(e)},r.clone=function(){return new m({classificationMethod:this.classificationMethod,colorRamp:s.clone(this.colorRamp),fields:this.fields&&this.fields.slice(0),field1:s.clone(this.field1),field2:s.clone(this.field2),focus:this.focus,numClasses:this.numClasses,maxSliderValue:this.maxSliderValue,minSliderValue:this.minSliderValue,lengthUnit:this.lengthUnit,statistics:this.statistics,standardDeviationInterval:this.standardDeviationInterval,type:this.type,visualVariables:this.visualVariables&&this.visualVariables.map((e=>e.clone())),univariateSymbolStyle:this.univariateSymbolStyle,univariateTheme:this.univariateTheme})},e._createClass(i,[{key:"classificationMethod",get:function(){const e=this._get("classificationMethod"),t=this.type;return t&&"relationship"!==t?"class-breaks-size"===t||"class-breaks-color"===t?e||"manual":null:e},set:function(e){this._set("classificationMethod",e)}},{key:"fields",get:function(){return this.type&&"predominance"!==this.type?null:this._get("fields")},set:function(e){this._set("fields",e)}},{key:"field1",get:function(){return this.type&&"relationship"!==this.type?null:this._get("field1")},set:function(e){this._set("field1",e)}},{key:"field2",get:function(){return this.type&&"relationship"!==this.type?null:this._get("field2")},set:function(e){this._set("field2",e)}},{key:"focus",get:function(){return this.type&&"relationship"!==this.type?null:this._get("focus")},set:function(e){this._set("focus",e)}},{key:"numClasses",get:function(){return this.type&&"relationship"!==this.type?null:this._get("numClasses")},set:function(e){this._set("numClasses",e)}},{key:"statistics",get:function(){return"univariate-color-size"===this.type&&"above-and-below"===this.univariateTheme?this._get("statistics"):null},set:function(e){this._set("statistics",e)}},{key:"standardDeviationInterval",get:function(){const e=this.type;return e&&"relationship"!==e&&"class-breaks-size"!==e&&"class-breaks-color"!==e||this.classificationMethod&&"standard-deviation"!==this.classificationMethod?null:this._get("standardDeviationInterval")},set:function(e){this._set("standardDeviationInterval",e)}},{key:"type",get:function(){return this._get("type")},set:function(e){let t=e;"classed-size"===e?t="class-breaks-size":"classed-color"===e&&(t="class-breaks-color"),this._set("type",t)}},{key:"univariateSymbolStyle",get:function(){return"univariate-color-size"===this.type&&"above-and-below"===this.univariateTheme?this._get("univariateSymbolStyle"):null},set:function(e){this._set("univariateSymbolStyle",e)}},{key:"univariateTheme",get:function(){return"univariate-color-size"===this.type?this._get("univariateTheme"):null},set:function(e){this._set("univariateTheme",e)}}]),i}(y.JSONSupport);return t.__decorate([o.property({type:_.apiValues,value:null,json:{type:_.jsonValues,read:_.read,write:_.write,origins:{"web-document":{default:"manual",type:_.jsonValues,read:_.read,write:_.write}}}})],k.prototype,"classificationMethod",null),t.__decorate([o.property({types:v.types,json:{write:!0}})],k.prototype,"colorRamp",void 0),t.__decorate([n.reader("colorRamp")],k.prototype,"readColorRamp",null),t.__decorate([o.property({type:[String],value:null,json:{write:!0}})],k.prototype,"fields",null),t.__decorate([o.property({type:h.default,value:null,json:{write:!0}})],k.prototype,"field1",null),t.__decorate([o.property({type:h.default,value:null,json:{write:!0}})],k.prototype,"field2",null),t.__decorate([o.property({type:["HH","HL","LH","LL"],value:null,json:{write:!0}})],k.prototype,"focus",null),t.__decorate([o.property({type:Number,value:null,json:{type:a.Integer,write:!0}})],k.prototype,"numClasses",null),t.__decorate([o.property({type:g,json:{type:g,read:!1,write:!1,origins:{"web-scene":{read:!0,write:!0}}}})],k.prototype,"lengthUnit",void 0),t.__decorate([o.property({type:Number,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],k.prototype,"maxSliderValue",void 0),t.__decorate([o.property({type:Number,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],k.prototype,"minSliderValue",void 0),t.__decorate([o.property({type:Object,value:null,json:{write:!0,origins:{"web-scene":{write:!1,read:!1}}}})],k.prototype,"statistics",null),t.__decorate([o.property({type:[.25,.33,.5,1],value:null,json:{type:[.25,.33,.5,1],write:!0}})],k.prototype,"standardDeviationInterval",null),t.__decorate([o.property({type:b.apiValues,value:null,json:{type:b.jsonValues,read:b.read,write:b.write}})],k.prototype,"type",null),t.__decorate([o.property({type:[f],json:{write:!0}})],k.prototype,"visualVariables",void 0),t.__decorate([o.property({type:S,value:null,json:{write:!0,origins:{"web-scene":{write:!1}}}})],k.prototype,"univariateSymbolStyle",null),t.__decorate([o.property({type:w,value:null,json:{write:!0,origins:{"web-scene":{write:!1}}}})],k.prototype,"univariateTheme",null),k=m=t.__decorate([u.subclass("esri.renderers.support.AuthoringInfo")],k),k}));
