/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/aliasOf","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/watchUtils","../support/widgetUtils","../../chunks/index","../Widget","../Attachments","./FeatureAttachments/FeatureAttachmentsViewModel","./support/FeatureElementInfo"],(function(e,t,r,o,i,s,n,a,c,l,p,d,u,h,f,_,y,v){"use strict";const m={base:"esri-feature-attachments"};let g=function(t){function r(e,r){var o;return(o=t.call(this,e,r)||this)._featureElementInfo=null,o.attachmentsWidget=new _,o.description=null,o.displayType=null,o.graphic=null,o.title=null,o.viewModel=new y,o}e._inheritsLoose(r,t);var o=r.prototype;return o.initialize=function(){this._featureElementInfo=new v,d.init(this,["viewModel.description","viewModel.title"],(()=>this._setupFeatureElementInfo())),d.init(this,"viewModel.graphic",(e=>this.attachmentsWidget.graphic=e))},o.destroy=function(){this.attachmentsWidget.destroy(),this._featureElementInfo.destroy()},o.render=function(){var e;const{attachmentsWidget:t}=this;return h.jsx("div",{class:m.base},null==(e=this._featureElementInfo)?void 0:e.render(),null==t?void 0:t.render())},o._setupFeatureElementInfo=function(){const{description:e,title:t}=this;this._featureElementInfo.set({description:e,title:t})},r}(f);return t.__decorate([s.property({readOnly:!0})],g.prototype,"attachmentsWidget",void 0),t.__decorate([n.aliasOf("viewModel.description")],g.prototype,"description",void 0),t.__decorate([n.aliasOf("attachmentsWidget.displayType")],g.prototype,"displayType",void 0),t.__decorate([n.aliasOf("viewModel.graphic")],g.prototype,"graphic",void 0),t.__decorate([n.aliasOf("viewModel.title")],g.prototype,"title",void 0),t.__decorate([s.property({type:y})],g.prototype,"viewModel",void 0),g=t.__decorate([a.subclass("esri.widgets.Feature.FeatureAttachments")],g),g}));