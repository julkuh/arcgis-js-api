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

define(["require","exports","../../core/tsSupport/declareExtendsHelper","../../core/tsSupport/decorateHelper","../../core/tsSupport/generatorHelper","../../core/tsSupport/awaiterHelper","../../core/Accessor","../../core/arrayUtils","../../core/Evented","../../core/HandleOwner","../../core/lang","../../core/ReentrantObjectPool","../../core/watchUtils","../../core/accessorSupport/decorators","../../core/accessorSupport/decorators/cast","../../support/arcadeOnDemand","./FieldConfig","./FieldGroupConfig","./InputField","./InputFieldGroup"],function(e,t,r,n,i,o,a,l,u,p,s,f,d,c,y,h,g,v,_,b){function m(e){return!!e.inputFields}function F(e){return!!e.fieldConfig}return function(e){function t(t){var r=e.call(this)||this;return r._arcade=null,r._fieldPool=new f.ReentrantObjectPool(_),r._fieldGroupPool=new f.ReentrantObjectPool(b),r._featureClone=null,r._needsArcade=!1,r.fieldConfig=null,r.strict=!1,r}return r(t,e),t.prototype.initialize=function(){var e=this,t=d.init(this,"fieldConfig",function(r){return o(e,void 0,void 0,function(){var e,n,o,a,l;return i(this,function(i){switch(i.label){case 0:return e=[],r&&r.forEach(function(t){t.visibilityExpression&&e.push(t.visibilityExpression),F(t)&&t.fieldConfig.forEach(function(t){var r=t.visibilityExpression;r&&e.push(r)})}),n=e.length>0,n?[4,h.loadArcade()]:[3,4];case 1:return o=i.sent(),a=o.arcadeUtils,l=e.some(function(e){return a.hasGeometryOperations(e)}),l?[4,a.enableGeometryOperations()]:[3,3];case 2:i.sent(),t.remove(),i.label=3;case 3:this._arcade=o,this.notifyChange("inputFields"),i.label=4;case 4:return this._needsArcade=n,[2]}})})});this.handles.add(t)},t.prototype.destroy=function(){this.fieldConfig=null,this.feature=null,this.layer=null,this._fieldPool.destroy(),this._fieldGroupPool.destroy()},Object.defineProperty(t.prototype,"_allInputFields",{get:function(){return this.inputFields.reduce(function(e,t){return m(t)?e.concat(t.inputFields):e.concat([t])},[])},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_inputFieldCache",{get:function(){var e=this,t=this._get("_inputFieldCache")||new Map;return t.forEach(function(t){return e._disposeInputOrGroup(t)}),t.clear(),(this.get("layer.fields")||[]).forEach(function(r){return t.set(r,e._fieldPool.acquire())}),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"_inputFieldGroupCache",{get:function(){var e=this,t=this._get("_inputFieldGroupCache")||new Map;return t.forEach(function(t){return e._disposeInputOrGroup(t)}),t.clear(),(this.fieldConfig||[]).filter(F).forEach(function(r){return t.set(r,e._fieldGroupPool.acquire())}),t},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"feature",{get:function(){return this._get("feature")},set:function(e){this._featureClone=e?e.clone():null,this._set("feature",e)},enumerable:!0,configurable:!0}),t.prototype.castFieldConfig=function(e){return e?e.map(function(e){return e instanceof g||e instanceof v?e:F(e)?new v(e):new g(e)}):null},Object.defineProperty(t.prototype,"inputFields",{get:function(){var e=this,t=this,r=t._arcade,n=t._inputFieldCache,i=t._inputFieldGroupCache,o=t._featureClone,a=t._needsArcade,u=t.layer,p=t.state,s=o&&o.clone();if("ready"!==p||a&&!r)return[];var f,d=this.get("layer.fields")||[],c=this.fieldConfig||[];return f=0!==c.length?c.map(function(t){if(F(t)){var o=i.get(t),a=t.fieldConfig.map(function(t){var i=l.find(d,function(e){return e.name===t.name}),a=n.get(i);return a.set({arcade:r,field:i,config:t,feature:s,group:o,layer:u,value:e.getValue(i.name)}),a}).filter(function(e){return e.visible});return o.set({arcade:r,config:t,feature:s,inputFields:a}),o}var p=l.find(d,function(e){return e.name===t.name}),f=n.get(p);return f.set({arcade:r,field:p,config:t,feature:s,group:null,layer:u,value:e.getValue(p.name)}),f}):d.map(function(t){var i=n.get(t);return i.set({arcade:r,config:null,field:t,feature:s,group:null,layer:u,value:e.getValue(t.name)}),i}),f.filter(function(e){return e.visible})},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"layer",{get:function(){return this.get("feature.layer")},set:function(e){if(!e)return void this._clearOverride("layer");this._override("layer",e)},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"state",{get:function(){return this.get("layer.loaded")&&this.feature?"ready":"disabled"},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"valid",{get:function(){var e=this._allInputFields;return e.length>0&&e.every(function(e){return e.valid})},enumerable:!0,configurable:!0}),t.prototype.findField=function(e){return l.find(this._allInputFields,function(t){return t.name===e})},t.prototype.getValue=function(e){var t=this._featureClone;return t&&t.get("attributes."+e)},t.prototype.setValue=function(e,t){var r=this,n=this,i=n._featureClone,o=n.strict;if(i&&i.attributes){var a=this.findField(e);if(a&&i.attributes[e]!==t){a.value=t;if(this.get("layer.typeIdField")===a.name){var l=new Set;this.layer.types.forEach(function(e){return Object.keys(e.domains).forEach(function(e){return l.add(e)})}),l.forEach(function(e){var t=r.findField(e);t&&t.notifyChange("domain")})}o&&!a.valid||(i.attributes[e]=t,this.notifyChange("inputFields"),this._emitChangeEvent(a))}}},t.prototype.getValues=function(){var e=this._featureClone;return e&&s.clone(e.attributes)||null},t.prototype.submit=function(){var e=this._allInputFields,t=e.filter(function(e){return e.valid}).map(function(e){return e.name}),r=e.filter(function(e){return!e.valid}).map(function(e){return e.name}),n=this.getValues();this.emit("submit",{valid:t,invalid:r,values:n})},t.prototype._disposeInputOrGroup=function(e){m(e)?this._disposeGroup(e):this._disposeInput(e)},t.prototype._disposeGroup=function(e){var t=this;e.inputFields.forEach(function(e){return t._disposeInput(e)}),this._fieldGroupPool.release(e)},t.prototype._disposeInput=function(e){this._fieldPool.release(e)},t.prototype._emitChangeEvent=function(e){var t=e.name,r=e.valid,n=e.value;this.emit("value-change",{layer:this.layer,feature:this.feature,fieldName:t,value:n,valid:r})},n([c.property({readOnly:!0,dependsOn:["inputFields"]})],t.prototype,"_allInputFields",null),n([c.property({dependsOn:["layer.fields"],readOnly:!0})],t.prototype,"_inputFieldCache",null),n([c.property({dependsOn:["fieldConfig"],readOnly:!0})],t.prototype,"_inputFieldGroupCache",null),n([c.property()],t.prototype,"feature",null),n([c.property()],t.prototype,"fieldConfig",void 0),n([y.cast("fieldConfig")],t.prototype,"castFieldConfig",null),n([c.property({readOnly:!0,dependsOn:["feature","fieldConfig","layer.fields","layer.loaded"]})],t.prototype,"inputFields",null),n([c.property({dependsOn:["feature.layer"]})],t.prototype,"layer",null),n([c.property({dependsOn:["layer.loaded","feature"]})],t.prototype,"state",null),n([c.property()],t.prototype,"strict",void 0),n([c.property({dependsOn:["_allInputFields"]})],t.prototype,"valid",null),n([c.property()],t.prototype,"getValues",null),n([c.property()],t.prototype,"submit",null),t=n([c.subclass("esri.widgets.FeatureForm.FeatureFormViewModel")],t)}(c.declared(a,u,p))});