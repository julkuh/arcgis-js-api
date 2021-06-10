/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/aliasOf","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/Accessor","../../core/HandleOwner"],(function(e,t,i,r,o,s,l,n,a,c,p,u,d){"use strict";let y=function(t){function i(e){var i;return(i=t.call(this,e)||this).arcade=null,i.config=null,i.description=null,i.feature=null,i.label=null,i.state=null,i.visibilityExpression=null,i}return e._inheritsLoose(i,t),i.prototype._dirtyEvaluatedVisibility=function(){this.visibilityExpression&&this.notifyChange("evaluatedVisibility")},e._createClass(i,[{key:"compiledFunc",get:function(){const{arcade:e}=this;return e&&e.arcadeUtils.createFunction(this.visibilityExpression)}},{key:"evaluatedVisibility",get:function(){const e=this.compiledFunc;if(!e)return;const{arcade:t}=this;return t.arcadeUtils.executeFunction(e,t.arcadeUtils.createExecContext(this.feature))}},{key:"inputFields",get:function(){return this._get("inputFields")},set:function(e){this.handles.removeAll(),e&&this.handles.add(e.map((e=>e.watch("visible",this._dirtyEvaluatedVisibility)))),this._set("inputFields",e)}},{key:"visible",get:function(){return!1!==this.evaluatedVisibility&&this.inputFields&&this.inputFields.some((e=>e.visible))}}]),i}(d.HandleOwnerMixin(u));return t.__decorate([s.property()],y.prototype,"arcade",void 0),t.__decorate([s.property()],y.prototype,"compiledFunc",null),t.__decorate([s.property()],y.prototype,"config",void 0),t.__decorate([s.property()],y.prototype,"evaluatedVisibility",null),t.__decorate([l.aliasOf("config.description")],y.prototype,"description",void 0),t.__decorate([s.property()],y.prototype,"feature",void 0),t.__decorate([s.property()],y.prototype,"inputFields",null),t.__decorate([l.aliasOf("config.label")],y.prototype,"label",void 0),t.__decorate([l.aliasOf("config.state")],y.prototype,"state",void 0),t.__decorate([l.aliasOf("config.visibilityExpression")],y.prototype,"visibilityExpression",void 0),t.__decorate([s.property()],y.prototype,"visible",null),y=t.__decorate([n.subclass("esri.widgets.FeatureForm.InputFieldGroup")],y),y}));
