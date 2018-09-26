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
// See http://js.arcgis.com/4.9/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/assignHelper","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","dojo/date/locale","../moment","../core/accessorSupport/decorators","../layers/support/domains","../layers/support/fieldUtils","./Widget","./FeatureForm/FeatureFormViewModel","./support/widget"],function(e,t,a,r,i,n,l,u,o,d,s,p,f){var c={base:"esri-feature-form",form:"esri-feature-form__form",label:"esri-feature-form__label",inputField:"esri-feature-form__input",inputDate:"esri-feature-form__input--date",inputTime:"esri-feature-form__input--time",inputDisabled:"esri-feature-form__input--disabled",inputInvalid:"esri-feature-form__input--invalid",inputIconInvalid:"esri-feature-form__input-icon--invalid",errorMessage:"esri-feature-form__field-error-message",dateInputPart:"esri-feature-form__date-input-part",dateInputContainer:"esri-feature-form__date-input-container",dateFormatHint:"esri-feature-form__date-format-hint",errorIcon:"esri-icon-notice-triangle",widget:"esri-widget",input:"esri-input",select:"esri-select"},m={datePattern:"M/d/y",timePattern:"h:mm:ss a"};return function(e){function t(t){var a=e.call(this)||this;return a._featureChanged=!1,a._activeDateEdit=null,a.feature=null,a.fieldConfig=null,a.layer=null,a.strict=null,a.viewModel=new p,a._handleFormKeyDown=a._handleFormKeyDown.bind(a),a._handleInputBlur=a._handleInputBlur.bind(a),a._handleNumberInputMouseDown=a._handleNumberInputMouseDown.bind(a),a._handleInputKeyDown=a._handleInputKeyDown.bind(a),a._handleOptionChange=a._handleOptionChange.bind(a),a._handleSubmit=a._handleSubmit.bind(a),a._afterScrollerCreateOrUpdate=a._afterScrollerCreateOrUpdate.bind(a),a}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own(this.watch("feature",function(){return e._featureChanged=!0}))},t.prototype.getValues=function(){return null},t.prototype.submit=function(){return null},t.prototype.render=function(){var e=this.viewModel.state;return f.tsx("div",{class:this.classes(c.base,c.widget)},"ready"===e?this.renderForm():null)},t.prototype.renderForm=function(){return f.tsx("form",{class:c.form,novalidate:!0,onsubmit:this._handleSubmit,onkeydown:this._handleFormKeyDown},this.renderFields())},t.prototype.renderFields=function(){var e=this,t=this.viewModel,a=t.inputFields,r=t.layer;return a.map(function(t){var a=t.label,i=t.type;return f.tsx("label",{key:r.id+"-"+t.name,class:c.label},[a,"unsupported"!==i?e.renderInputField(t):e.renderUnsupportedField(t),e.renderAuxiliaryText(t)])})},t.prototype.renderInputField=function(e){var t=this.viewModel,r=e.domain,i=e.editable,n=e.name,l=e.type,u=t.getValue(n),o=!i,d=this.getCommonInputProps(e);return r&&"coded-value"===r.type&&!o?this.renderSelectInputField(u,r.codedValues.map(function(e){return{value:e.code,name:e.name}}),d):"text"===l&&"text-area"===e.editorType||"rich-text"===e.editorType?f.tsx("textarea",a({},d)):"date"===l?this.renderDateInputField(u,d):f.tsx("input",a({type:"text"===l?"text":"number"},d))},t.prototype.renderDateInputField=function(e,t){var r=this._formatDate(0),i=r.date,n=r.time,l=this.id+"-"+t.key,u=l+"-date",o=l+"-time",d=t["data-field"];return f.tsx("div",{key:t.key+"-date",class:c.dateInputContainer},f.tsx("div",{class:c.dateInputPart},f.tsx("input",a({"aria-label":d.label,"aria-describedby":u,type:"text"},t,{"data-date-part":"date",class:this.classes(t.class,c.inputDate),value:this._formatDate(e).date})),f.tsx("div",{class:c.dateFormatHint,id:u},i)),f.tsx("div",{class:c.dateInputPart},f.tsx("input",a({"aria-describedby":o,"aria-label":d.label,type:"text"},t,{"data-date-part":"time",class:this.classes(t.class,c.inputTime),value:this._formatDate(e).time})),f.tsx("div",{class:c.dateFormatHint,id:o},n)))},t.prototype.renderUnsupportedField=function(e){var t=this.viewModel.getValue(e.name);return f.tsx("input",{class:this.classes(c.input,c.inputField,c.inputDisabled),disabled:!0,type:"text",value:""+t})},t.prototype.renderSelectInputField=function(e,t,r){var i=!1,n=t.map(function(t){return t.value===e&&(i=!0),f.tsx("option",{value:""+t.value,key:t.name},t.name)});null==e||""===e||i||n.unshift(f.tsx("option",{value:""+e,key:"outlier-option"},e));var l=r["data-field"];return l.required||null!=l.value||n.unshift(f.tsx("option",{value:"",key:"empty-option"})),f.tsx("select",a({},r,{class:this.classes(r.class,c.select),onchange:this._handleOptionChange}),n)},t.prototype.renderAuxiliaryText=function(e){return e.valid?e.valid&&e.description?f.tsx("div",{key:"description"},e.description):void 0:f.tsx("div",{key:"error-message"},f.tsx("span",{class:this.classes(c.inputIconInvalid,c.errorIcon)}),f.tsx("div",{class:c.errorMessage},e.errorMessage))},t.prototype.getCommonInputProps=function(e){var t=this.viewModel,r=e.editable,i=e.name,n=e.required,l=e.maxLength,u=e.hint,o=e.type,d=e.valid,s=t.getValue(i),p=!r;return a({afterCreate:this._afterScrollerCreateOrUpdate,afterUpdate:this._afterScrollerCreateOrUpdate,"aria-invalid":d?"false":"true",class:this.classes(c.input,c.inputField,p?c.inputDisabled:null,d?null:c.inputInvalid),key:i,maxlength:l>-1?""+l:""},this._getNumberFieldConstraints(e),{disabled:p,value:null==s?"":""+s,"data-field":e,onblur:this._handleInputBlur,onkeydown:this._handleInputKeyDown,onmousedown:"number"===o?this._handleNumberInputMouseDown:null,required:n,title:u})},t.prototype._handleNumberInputMouseDown=function(e){var t=e.target,a=t;a.disabled||a.focus(),this.scheduleRender()},t.prototype._getNumberFieldConstraints=function(e){var t=o.getDomainRange(e.domain)||d.getFieldRange(e.field);return t&&t.max!==Number.MAX_VALUE&&t.min!==Number.MIN_VALUE?t:{min:null,max:null}},t.prototype._afterScrollerCreateOrUpdate=function(e){var t=e["data-field"];this._featureChanged&&t.editable&&(e.focus(),this._featureChanged=!1)},t.prototype._handleInputBlur=function(e){var t,r=e.target,i=r["data-field"],n=e.relatedTarget,l=n&&n["data-field"];if("date"===i.type){var u=r.getAttribute("data-date-part");this._activeDateEdit=a({},this._activeDateEdit,(t={},t[u]={value:r.value,input:r},t))}if(l&&"date"===i.type&&"date"===l.type&&i.field===l.field){if(""!==r.value&&""===n.value){var u=n.getAttribute("data-date-part");n.value=this._formatDate(Date.now())[u]}}else{if(this._activeDateEdit){var o=this._activeDateEdit,d=o.date,s=o.time,p=this._getDateEditValue(i,"date"),f=this._getDateEditValue(i,"time"),c=""===p||""===f;if(d){var m=d.input;m.value=c?"":p,this._updateFieldValue(m)}if(s){var h=s.input;h.value=c?"":f,this._updateFieldValue(h)}this._activeDateEdit=null}else this._updateFieldValue(r);this.scheduleRender()}},t.prototype._getDateEditValue=function(e,t){var a=this._activeDateEdit[t];if(a){if(""===a.value)return"";var r=this._parseDate(a.value,t);return r?this._formatDate(r.getTime())[t]:this._formatDate(e.value)[t]}},t.prototype._handleInputKeyDown=function(e){var t=e.key,a=e.altKey,r=e.ctrlKey,i=e.metaKey;if("Enter"===t)this._updateFieldValue(e.target),this.scheduleRender();else{var n=e.target,l=n["data-field"],u=l.field.type,o="integer"===u||"small-integer"===u,d="single"===u||"double"===u,s=!a&&!r&&!i;if((o||d)&&s&&1===t.length){var p=Number(t),f=["-","+"],c=["e","."],m=d?f.concat(c):f;isNaN(p)&&-1===m.indexOf(t)&&e.preventDefault()}}},t.prototype._updateFieldValue=function(e){var t=e["data-field"];this.viewModel.setValue(t.name,this._parseValue(e))},t.prototype._parseValue=function(e){var t=e["data-field"],a=e.value,r=t.required,i=t.type;if(!r&&""===a)return null;if("number"===i)return parseFloat(a);if("date"===i){if(!a)return null;var n=e.getAttribute("data-date-part"),u=Number(a);if(!isNaN(u))return u;var o=this._parseDate(a,n);if(!o)return null;var d=l(o),s=t.domain,p=l(),f=p;if(s&&"range"===s.type){var c=l(s.maxValue);p.isAfter(c)||(f=c)}var m=this.viewModel.getValue(t.name),h=l(null!=m?m:f);return"date"===n?(d.hour(h.hour()),d.minutes(h.minutes()),d.seconds(h.seconds())):(d.date(h.date()),d.month(h.month()),d.year(h.year())),d.valueOf()}return a},t.prototype._handleOptionChange=function(e){this._updateFieldValue(e.target),this.scheduleRender()},t.prototype._handleSubmit=function(e){e.preventDefault()},t.prototype._handleFormKeyDown=function(e){"Enter"===e.key&&this.viewModel.submit()},t.prototype._formatDate=function(e){if(null==e)return{date:"",time:""};var t=new Date(e);return{date:n.format(t,a({selector:"date"},m)),time:n.format(t,a({selector:"time"},m))}},t.prototype._parseDate=function(e,t){return null==e||""===e?null:n.parse(e,a({selector:t},m))},i([u.aliasOf("viewModel.feature")],t.prototype,"feature",void 0),i([u.aliasOf("viewModel.fieldConfig")],t.prototype,"fieldConfig",void 0),i([u.aliasOf("viewModel.layer")],t.prototype,"layer",void 0),i([u.aliasOf("viewModel.strict")],t.prototype,"strict",void 0),i([u.property(),f.renderable(["viewModel.inputFields","viewModel.state"]),f.vmEvent(["value-change","submit"])],t.prototype,"viewModel",void 0),i([u.aliasOf("viewModel.getValues")],t.prototype,"getValues",null),i([u.aliasOf("viewModel.submit")],t.prototype,"submit",null),t=i([u.subclass("esri.widgets.Form")],t)}(u.declared(s))});