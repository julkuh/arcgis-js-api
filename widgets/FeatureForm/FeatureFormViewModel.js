/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/cast","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/ReentrantObjectPool","../../core/Evented","../../support/arcadeOnDemand","../../intl/locale","../../intl/messages","../../intl","../../Graphic","../../core/watchUtils","../../form/FormTemplate","../../core/HandleOwner","./FieldConfig","./FieldGroupConfig","./InputField","./InputFieldGroup","./support/formTemplateUtils"],(function(e,t,i,r,n,o,l,s,a,u,d,p,c,f,h,_,y,g,m,v,F,C,b,O,w){"use strict";function E(e){return!!e.inputFields}function G(e){return!!e.fieldConfig}const k=new y({attributes:{}}),I="esri.widgets.FeatureForm.FeatureFormViewModel",P=r.getLogger(I);let T=function(t){function i(e){var i;return(i=t.call(this,e)||this)._arcade=null,i._fieldPool=new d.ReentrantObjectPool(b),i._fieldGroupPool=new d.ReentrantObjectPool(O),i._featureClone=k.clone(),i._initialFeature=k.clone(),i._needsArcade=!1,i.messages=null,i.strict=!1,i}e._inheritsLoose(i,t);var r=i.prototype;return r.initialize=function(){const e=async()=>this.messages=await h.fetchMessageBundle("esri/widgets/FeatureForm/t9n/FeatureForm");e(),this.handles.add(f.onLocaleChange(e));const t=g.init(this,"fieldConfig",(async e=>{const i=[];e&&e.forEach((e=>{i.push(e.visibilityExpression),G(e)?e.fieldConfig.forEach((({requiredExpression:e,visibilityExpression:t})=>{i.push(e,t)})):i.push(e.requiredExpression)}));const r=i.filter((e=>!!e)),n=r.length>0;if(n){const e=await c.loadArcade(),{arcadeUtils:i}=e;r.some((e=>i.hasGeometryOperations(e)))&&(await i.enableGeometryOperations(),t.remove()),this._arcade=e,this.notifyChange("inputFields")}this._needsArcade=n}));this.handles.add(t)},r.destroy=function(){this.fieldConfig=null,this.feature=null,this.layer=null,this._fieldPool.destroy(),this._fieldGroupPool.destroy()},r.castFieldConfig=function(e){return e?e.map((e=>e instanceof F||e instanceof C?e:G(e)?new C(e):new F(e))):null},r.findField=function(e){return this._allInputFields.find((t=>t.name===e))},r.getValue=function(e){var t;const{_featureClone:i,layer:r}=this,n=!(null==r||!r.getField(e));return null!=(t=i.getAttribute(e))?t:n?null:void 0},r.setValue=function(e,t){const{_featureClone:i,strict:r}=this,n=this.findField(e);if(t=""===t?null:t,!n||i.getAttribute(e)===t)return;n.value=t;if(this.get("layer.typeIdField")===n.name){const e=new Set;this.layer.types.forEach((t=>Object.keys(t.domains).forEach((t=>e.add(t))))),e.forEach((e=>{const t=this.findField(e);t&&t.notifyChange("domain")}))}r&&!n.valid||(i.setAttribute(e,t),this.notifyChange("inputFields"),this._emitChangeEvent(n))},r.getValues=function(){return{...this._featureClone.attributes}},r.submit=function(){const e=this._allInputFields,t=e.filter((e=>e.valid)).map((({name:e})=>e)),i=e.filter((e=>!e.valid)).map((({name:e})=>e)),r=this.getValues();this.emit("submit",{valid:t,invalid:i,values:r})},r._disposeInputOrGroup=function(e){E(e)?this._disposeGroup(e):this._disposeInput(e)},r._disposeGroup=function(e){e.inputFields.forEach((e=>this._disposeInput(e))),this._fieldGroupPool.release(e)},r._disposeInput=function(e){this._fieldPool.release(e)},r._emitChangeEvent=function({name:e,valid:t,value:i}){this.emit("value-change",{layer:this.layer,feature:this.feature,fieldName:e,value:i,valid:t})},e._createClass(i,[{key:"_allInputFields",get:function(){return this.inputFields.reduce(((e,t)=>E(t)?[...e,...t.inputFields]:[...e,t]),[])}},{key:"_inputFieldCache",get:function(){const e=this._get("_inputFieldCache")||new Map;e.forEach((e=>this._disposeInputOrGroup(e))),e.clear();return(this.get("layer.fields")||[]).forEach((t=>e.set(t,this._fieldPool.acquire()))),e}},{key:"_inputFieldGroupCache",get:function(){const e=this._get("_inputFieldGroupCache")||new Map;e.forEach((e=>this._disposeInputOrGroup(e))),e.clear();return(this.fieldConfig||[]).filter(G).forEach((t=>e.set(t,this._fieldGroupPool.acquire()))),e}},{key:"description",get:function(){var e;return null==(e=this.formTemplate)?void 0:e.description},set:function(e){void 0===e?this._clearOverride("description"):this._override("description",e)}},{key:"feature",get:function(){return this._get("feature")},set:function(e){this._featureClone=e?e.clone():k.clone(),this._initialFeature=this._featureClone.clone(),this._set("feature",e)}},{key:"fieldConfig",get:function(){const{formTemplate:e}=this;if(!e)return null;const{config:t,encounteredUnsupportedTypes:i}=w.fieldConfigsFromFormTemplate(e);return i.length>0&&P.warn("form-info::unsupported-type","encountered unsupported elements/types when parsing form info",i),t},set:function(e){e?this._override("fieldConfig",e):this._clearOverride("fieldConfig")}},{key:"formTemplate",get:function(){var e;return null==(e=this.layer)?void 0:e.formTemplate},set:function(e){void 0===e?this._clearOverride("formTemplate"):this._override("formTemplate",e)}},{key:"inputFields",get:function(){const{_arcade:e,_inputFieldCache:t,_inputFieldGroupCache:i,_featureClone:r,messages:n,_needsArcade:o,layer:l,state:s}=this,a=r.clone();if("ready"!==s||o&&!e)return[];const u=this.get("layer.fields")||[],d=this.fieldConfig||[];let p;return p=0!==d.length?d.map((r=>{if(G(r)){const o=i.get(r),s=r.fieldConfig.map((i=>{const r=u.find((e=>e.name===i.name)),s=t.get(r);return s.set({arcade:e,field:r,config:i,feature:a,group:o,initialFeature:this._initialFeature,layer:l,messages:n,value:this.getValue(r.name)}),s})).filter((e=>e.visible));return o.set({arcade:e,config:r,feature:a,inputFields:s}),o}const o=u.find((e=>e.name===r.name)),s=t.get(o);return s.set({arcade:e,field:o,config:r,feature:a,group:null,initialFeature:this._initialFeature,layer:l,messages:n,value:this.getValue(o.name)}),s})):u.map((i=>{const r=t.get(i);return r.set({arcade:e,config:null,field:i,feature:a,group:null,initialFeature:this._initialFeature,layer:l,messages:n,value:this.getValue(i.name)}),r})),p.filter((e=>e.visible))}},{key:"layer",get:function(){return this.get("feature.layer")},set:function(e){e?this._override("layer",e):this._clearOverride("layer")}},{key:"state",get:function(){return this.messages&&this.get("layer.loaded")?"ready":"disabled"}},{key:"title",get:function(){var e;return null==(e=this.formTemplate)?void 0:e.title},set:function(e){void 0===e?this._clearOverride("title"):this._override("title",e)}},{key:"valid",get:function(){const e=this._allInputFields;return e.length>0&&e.every((({valid:e})=>e))}}]),i}(v.HandleOwnerMixin(p.EventedAccessor));return t.__decorate([n.property({readOnly:!0})],T.prototype,"_allInputFields",null),t.__decorate([n.property({readOnly:!0})],T.prototype,"_inputFieldCache",null),t.__decorate([n.property({readOnly:!0})],T.prototype,"_inputFieldGroupCache",null),t.__decorate([n.property()],T.prototype,"description",null),t.__decorate([n.property()],T.prototype,"feature",null),t.__decorate([n.property()],T.prototype,"fieldConfig",null),t.__decorate([o.cast("fieldConfig")],T.prototype,"castFieldConfig",null),t.__decorate([n.property({type:m})],T.prototype,"formTemplate",null),t.__decorate([n.property({readOnly:!0,dependsOn:["messages","feature","fieldConfig","layer.fields","layer.loaded","state"]})],T.prototype,"inputFields",null),t.__decorate([n.property()],T.prototype,"layer",null),t.__decorate([n.property()],T.prototype,"messages",void 0),t.__decorate([n.property()],T.prototype,"state",null),t.__decorate([n.property()],T.prototype,"strict",void 0),t.__decorate([n.property()],T.prototype,"title",null),t.__decorate([n.property()],T.prototype,"valid",null),t.__decorate([n.property()],T.prototype,"getValues",null),t.__decorate([n.property()],T.prototype,"submit",null),T=t.__decorate([l.subclass(I)],T),T}));
