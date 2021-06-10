/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/aliasOf","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/events","../layers/support/fieldUtils","../intl/substitute","../intl","../core/watchUtils","../core/HandleOwner","./support/widgetUtils","./support/decorators/accessibleHandler","./support/decorators/messageBundle","./support/decorators/vmEvent","../chunks/index","./Widget","./Attachments","./Spinner","../views/interactive/snapping/SnappingOptions","./FeatureForm","./FeatureTemplates/ItemList","./FeatureTemplates","./Editor/EditorViewModel"],(function(e,t,i,s,a,r,n,o,l,d,c,u,p,h,m,_,g,w,f,v,y,b,k,M,A,x,T,F,W,I){"use strict";const C={base:"esri-editor esri-widget esri-widget--panel",header:"esri-editor__header",scroller:"esri-editor__scroller",content:"esri-editor__content",contentGroup:"esri-editor__content-group",contentWrapper:"esri-editor__temp-wrapper",message:"esri-editor__message",controls:"esri-editor__controls",title:"esri-editor__title",backButton:"esri-editor__back-button",modeSelection:"esri-editor__mode-selection",progressBar:"esri-editor__progress-bar",warningCard:"esri-editor__warning-card",warningHeader:"esri-editor__warning-header",warningHeading:"esri-editor__warning-heading",warningMessage:"esri-editor__warning-message",warningDivider:"esri-editor__warning-divider",warningOption:"esri-editor__warning-option",warningOptionPrimary:"esri-editor__warning-option--primary",warningOptionNegative:"esri-editor__warning-option--negative",warningOptionPositive:"esri-editor__warning-option--positive",featureList:"esri-editor__feature-list",featureListItem:"esri-editor__feature-list-item",featureListItemDisabled:"esri-editor__feature-list-item--disabled",featureListName:"esri-editor__feature-list-name",featureListIcon:"esri-editor__feature-list-icon",featureListIndex:"esri-editor__feature-list-index",controlButton:"esri-editor__control-button",overlay:"esri-editor__overlay",errorIcon:"esri-icon-error2",basemapIcon:"esri-basemap",rightArrowIcon:"esri-icon-right",leftArrowIcon:"esri-icon-left",warningIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-edit",button:"esri-button",buttonDisabled:"esri-button--disabled",buttonSecondary:"esri-button--secondary",buttonTertiary:"esri-button--tertiary",buttonDrillIn:"esri-button--drill-in",buttonDrillInTitle:"esri-button--drill-in__title",heading:"esri-heading",input:"esri-input",interactive:"esri-interactive",select:"esri-select"};function j(e){e.focus()}let H=function(t){function i(i,s){var a;return(a=t.call(this,i,s)||this)._candidateCommitted=!1,a._featureForm=new T,a._attachments=new M({visibleElements:{addSubmitButton:!1,cancelAddButton:!1,cancelUpdateButton:!1,deleteButton:!1,errorMessage:!1,progressBar:!1,updateButton:!1}}),a._featureTemplates=new W,a._filterText="",a._prompt=null,a._spinner=new A,a.activeWorkflow=null,a.allowedWorkflows=null,a.iconClass=C.widgetIcon,a.label=void 0,a.layerInfos=null,a.messages=null,a.messagesCommon=null,a.messagesTemplates=null,a.snappingOptions=new x,a.supportingWidgetDefaults=null,a.view=null,a.viewModel=new I,a._handleHeaderClickOrKeyDown=t=>{t.currentTarget["data-prevent-back"]||a._handleBack.call(e._assertThisInitialized(a),t)},a._setCandidateFeature=(e,t=!1)=>{if(a._candidateCommitted)return;const i=a.viewModel.activeWorkflow;i.data.edits.feature=e,t&&(i.next(),a._candidateCommitted=!0)},a._handleSave=a._handleSave.bind(e._assertThisInitialized(a)),a._handleBack=a._handleBack.bind(e._assertThisInitialized(a)),a._handleDone=a._handleDone.bind(e._assertThisInitialized(a)),a._handleDelete=a._handleDelete.bind(e._assertThisInitialized(a)),a._handleAdd=a._handleAdd.bind(e._assertThisInitialized(a)),a._handleEdit=a._handleEdit.bind(e._assertThisInitialized(a)),a._handleAttachmentAdd=a._handleAttachmentAdd.bind(e._assertThisInitialized(a)),a._handleAttachmentUpdate=a._handleAttachmentUpdate.bind(e._assertThisInitialized(a)),a._handleAttachmentDelete=a._handleAttachmentDelete.bind(e._assertThisInitialized(a)),a}e._inheritsLoose(i,t);var s=i.prototype;return s.initialize=function(){this.own([_.init(this,"viewModel",(e=>{this._featureForm.viewModel=e?e.featureFormViewModel:null,this._attachments.viewModel=e?e.attachmentsViewModel:null,this._featureTemplates.viewModel=e?e.featureTemplatesViewModel:null,this._spinner.viewModel=e?e.spinnerViewModel:null})),_.init(this,"view",((e,t)=>{const i=`editor-${this.id}-spinner`;t&&t.ui.remove(this._spinner,i),e&&e.ui.add(this._spinner,{key:i,position:"manual"})})),_.on(this,"viewModel.sketchViewModel","create",(()=>{this.scheduleRender()})),_.on(this,"viewModel.activeWorkflow","cancel-request",(({controller:e})=>{const{messages:t,messagesCommon:i}=this;this._prompt={title:t.cancelRequestTitle,message:t.cancelRequestWarningMessage,options:[{label:i.form.no,type:"neutral",action:()=>(e.deny(),this._prompt=null)},{label:i.form.yes,type:"negative",action:()=>{e.allow(),this._prompt=null}}]},this.scheduleRender()})),_.init(this,"supportingWidgetDefaults",(e=>{e&&(this._featureForm.set(e.featureForm),this._attachments.set(e.attachments),this._featureTemplates.set(e.featureTemplates),this.viewModel.sketchViewModel.set(e.sketch))})),_.watch(this,"_attachments.error",(e=>{if(!e)return;const{messages:t,messagesCommon:i}=this;this._prompt={title:t.errorWarningTitle,message:e.message,options:[{label:i.form.ok,type:"neutral",action:()=>{this._prompt=null}}]}})),_.watch(this,"viewModel.failures",(e=>{if(!e)return;const{messages:t}=this,[{error:i,retry:s,cancel:a}]=e;this._prompt={title:t.errorWarningTitle,message:h.substitute(t.errorWarningMessageTemplate,{errorMessage:i.message}),options:[{label:t.retry,type:"positive",action:()=>{s(),this._prompt=null}},{label:t.ignore,type:"neutral",action:()=>(a(),this._prompt=null)}]}})),_.watch(this,"viewModel.state",(e=>{"awaiting-update-feature-candidate"===e&&(this._candidateCommitted=!1)})),_.watch(this,["_attachments.selectedFile","_attachments.submitting"],(()=>this.scheduleRender())),_.whenNot(this,"viewModel.activeWorkflow",(()=>this._featureTemplates.filterText=""))])},s.destroy=function(){this._attachments.destroy(),this._featureForm.destroy(),this._featureTemplates.destroy()},s.startCreateWorkflowAtFeatureTypeSelection=function(){return this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},s.startCreateWorkflowAtFeatureCreation=function(e){return this.viewModel.startCreateWorkflowAtFeatureCreation(e)},s.startCreateWorkflowAtFeatureEdit=function(e){return this.viewModel.startCreateWorkflowAtFeatureEdit(e)},s.startUpdateWorkflowAtFeatureSelection=function(){return this.viewModel.startUpdateWorkflowAtFeatureSelection()},s.startUpdateWorkflowAtMultipleFeatureSelection=function(e){return this.viewModel.startUpdateWorkflowAtMultipleFeatureSelection(e)},s.startUpdateWorkflowAtFeatureEdit=function(e){return this.viewModel.startUpdateWorkflowAtFeatureEdit(e)},s.deleteFeatureFromWorkflow=function(){return this.viewModel.deleteFeatureFromWorkflow()},s.cancelWorkflow=function(e){return this.viewModel.cancelWorkflow(e)},s.render=function(){const{_attachments:e,viewModel:t}=this;if(!t)return b.jsx("div",{class:C.base});const{state:i}=t,s=this._prompt?b.jsx("div",{class:C.overlay,key:"overlay"},this.renderPrompt({message:this._prompt.message,title:this._prompt.title,options:this._prompt.options})):null;return b.jsx("div",{class:C.base},t.syncing||e.submitting?this.renderProgressBar():null,"disabled"===i?null:"ready"===i?this.renderLanding():"awaiting-feature-creation-info"===i?this.renderTemplates():"editing-new-feature"===i||"editing-existing-feature"===i?this.renderAttributeEditing():"awaiting-feature-to-update"===i?this.renderFeatureUpdating():"awaiting-update-feature-candidate"===i?this.renderFeatureList():"awaiting-feature-to-create"===i?this.renderFeatureCreation():"adding-attachment"===i?this.renderAttachmentAdding():"editing-attachment"===i?this.renderAttachmentEditing():null,s)},s.renderTemplates=function(){return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(this.messages.selectTemplate,!0),b.jsx("div",{key:"content",class:C.content},this._featureTemplates.render()))},s.renderAttributeEditing=function(){const{activeWorkflow:e,featureFormViewModel:t}=this.viewModel,i=e.data.edits.feature,s="update"===e.type&&!e.data.edits.modified||t.inputFields.length>0&&!t.valid,{messages:a,messagesCommon:r}=this,n="create"===e.type?r.add:r.update,o=[{label:n,type:"primary",disabled:s,clickHandler:this._handleSave}];let l=!1;"update"===e.type&&(e.data.editableItem.hasAttachments&&(l=!0),e.data.editableItem.supports.indexOf("delete")>-1&&o.push({label:r.delete,type:"tertiary",clickHandler:this._handleDelete}));const d=this._getLabel(i);return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(d,!0),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},b.jsx("div",{class:C.contentGroup},t.inputFields.length>0?this._featureForm.render():this.renderMessage(h.substitute(a.clickToFinishTemplate,{button:n})),l?b.jsx("div",{key:"attachments"},b.jsx("div",null,a.attachments),this._attachments.render()):null)),this.renderControls(o))},s.renderAttachmentAdding=function(){const{_attachments:e,messages:t,messagesCommon:i}=this,s=[{label:e.submitting?i.cancel:i.add,disabled:e.submitting||!e.selectedFile,type:"primary",clickHandler:this._handleAttachmentAdd}];return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(t.addAttachment,!0,e.submitting),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},e.render()),this.renderControls(s))},s.renderAttachmentEditing=function(){const{_attachments:e,messages:t,messagesCommon:i}=this,s=[{label:i.update,disabled:e.submitting||!e.selectedFile,type:"primary",clickHandler:this._handleAttachmentUpdate},{label:i.delete,disabled:e.submitting,type:"tertiary",clickHandler:this._handleAttachmentDelete}];return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(t.editAttachment,!0,e.submitting),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},e.render()),this.renderControls(s))},s.renderFeatureUpdating=function(){const{messages:e}=this;return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(e.selectFeature,!0),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},this.renderMessage(e.selectFeatureToEdit)))},s.renderMessage=function(e){return b.jsx("div",{class:C.message},e)},s.renderFeatureCreation=function(){const{messages:e,viewModel:t}=this,i=t.sketchViewModel,s=t.activeWorkflow.data.creationInfo.layer,a=i.canUndo()&&i.createGraphic?i.createGraphic:null,r=this._getSketchingTip(s.geometryType,a);return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(e.placeFeature,!0),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},this.renderMessage(r)))},s.renderControls=function(e){return b.jsx("div",{class:C.controls,key:"controls"},e.map((({disabled:e=!1,label:t,type:i,clickHandler:s},a)=>this.renderButton({label:t,class:this.classes(C.controlButton,C.button,"secondary"===i?C.buttonSecondary:"tertiary"===i?C.buttonTertiary:null,e?C.buttonDisabled:null),disabled:e,clickHandler:s,key:a}))))},s.renderPrompt=function({title:e,message:t,options:i=[]}){return b.jsx("div",{class:C.warningCard,role:"alert"},b.jsx("div",{class:C.warningHeader},b.jsx("span",{class:C.warningIcon,"aria-hidden":"true"}),b.jsx("h4",{class:this.classes(C.heading,C.warningHeading)},e)),b.jsx("div",{class:C.warningMessage},t),b.jsx("div",{class:C.warningDivider}),i.map((({label:e,action:t,type:i},s)=>{const a=0===s;return b.jsx("div",{afterCreate:a?j:null,class:this.classes(C.warningOption,a?C.warningOptionPrimary:null,"positive"===i?C.warningOptionPositive:"negative"===i?C.warningOptionNegative:null),key:s,onclick:t,onkeydown:e=>{const i=u.eventKey(e);"Enter"!==i&&" "!==i||(e.preventDefault(),t.call(null))},tabIndex:0,role:"button"},e)})))},s.renderProgressBar=function(){return b.jsx("div",{class:this.classes(C.progressBar),key:"progress-bar"})},s.renderButton=function(e){return b.jsx("button",{class:e.class,disabled:e.disabled,key:e.key,onclick:e.clickHandler,type:"button"},e.label)},s.renderHeader=function(e,t=!1,i=!1){const{messagesCommon:s}=this;return b.jsx("header",{class:C.header,key:"header"},t?b.jsx("div",{"aria-label":s.back,class:this.classes(C.backButton,C.interactive,i?C.buttonDisabled:null),key:"back-button","data-prevent-back":i,onclick:this._handleHeaderClickOrKeyDown,onkeydown:this._handleHeaderClickOrKeyDown,role:"button",tabIndex:0,title:s.back},b.jsx("span",{"aria-hidden":"true",class:w.isRTL()?C.rightArrowIcon:C.leftArrowIcon})):null,b.jsx("h4",{class:this.classes(C.title,C.heading)},e))},s.renderLanding=function(){const{messages:e}=this,{allowedWorkflows:t,canCreate:i,canUpdate:s}=this.viewModel,a=w.isRTL()?C.leftArrowIcon:C.rightArrowIcon;return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(e.widgetLabel),b.jsx("div",{key:"content",class:C.content,role:"group"},b.jsx("div",{class:C.modeSelection,key:"mode-selection"},t.indexOf("update")>-1?b.jsx("div",{"aria-disabled":s?"false":"true",class:this.classes(C.featureListItem,s?null:C.featureListItemDisabled),key:"update",onclick:this._handleEdit,onkeydown:this._handleEdit,role:"button",tabIndex:s?0:-1},b.jsx("span",{class:C.featureListName},e.editFeature),b.jsx("span",{"aria-hidden":"true",class:this.classes(C.featureListIcon,a)})):null,t.indexOf("create")>-1?b.jsx("div",{class:this.classes(C.featureListItem,i?null:C.featureListItemDisabled),key:"create",onclick:this._handleAdd,onkeydown:this._handleAdd,role:"button",tabIndex:i?0:-1},b.jsx("span",{class:C.featureListName},e.addFeature),b.jsx("span",{"aria-hidden":"true",class:this.classes(C.featureListIcon,a)})):null)))},s.renderFeatureList=function(){const{messages:e,messagesTemplates:t,viewModel:{editableItems:i,activeWorkflow:s}}=this,a=s.data.candidates,r=h.substitute(e.multipleFeaturesTemplate,{total:a.length}),n=new Map;a.map((e=>({label:this._getLabel(e),id:e.attributes[e.layer.objectIdField],data:e}))).filter((e=>{const{label:t,data:i}=e,s=this._filterText.toLowerCase(),{title:a}=i.layer;return this.viewModel.editableItems.find((e=>e.layer===i.layer)).supports.indexOf("update")>-1&&(!s||t.toLowerCase().indexOf(s)>-1||a.toLowerCase().indexOf(s)>-1)})).forEach((e=>{const t=e.data.layer;n.has(t)?n.get(t).items.push(e):n.set(t,{id:`${t.id}`,label:t.title,items:[e]})}));const o=i.filter((({layer:e})=>n.has(e))).map((({layer:e})=>n.get(e))).toArray();return b.jsx("div",{class:C.contentWrapper,key:"wrapper"},this.renderHeader(r,!0),b.jsx("div",{key:"content",class:this.classes(C.content,C.scroller)},F.ItemList({id:this.id,filterText:this._filterText,items:o,messages:{filterPlaceholder:t.filterPlaceholder,noItems:t.noItems,noMatches:t.noMatches},onItemMouseEnter:({data:e})=>this._setCandidateFeature(e),onItemMouseLeave:()=>this._setCandidateFeature(null),onItemSelect:({data:e})=>this._setCandidateFeature(e,!0),onFilterChange:e=>this._filterText=e})))},s._getSketchingTip=function(e,t){const{messages:i}=this;if("point"===e)return i.tips.clickToAddPoint;if("polygon"===e||"polyline"===e){if(!t)return i.tips.clickToStart;const s=t.geometry,a="polygon"===e?"rings":"paths",[r]=s[a];return"polygon"===e&&r<4?i.tips.clickToContinue:i.tips.clickToContinueThenDoubleClickToEnd}return i.tips.clickToAddFeature},s._getLabel=function(e){const t=e.layer,{objectIdField:i}=t,{attributes:s}=e,a=p.getDisplayFieldName(t);return a&&s[a]&&`${s[a]}`||h.substitute(this.messages.untitledFeatureTemplate,{id:s[i]})},s._handleDelete=function(){const{messages:e,messagesCommon:t}=this;this._prompt={title:e.deleteWarningTitle,message:e.deleteWarningMessage,options:[{label:e.keepFeature,type:"neutral",action:()=>this._prompt=null},{label:t.delete,type:"positive",action:()=>{this.viewModel.deleteFeatureFromWorkflow(),this._prompt=null}}]}},s._handleSave=function(){this.viewModel.activeWorkflow.commit()},s._handleAttachmentAdd=function(){const{_attachments:e}=this,{activeWorkflow:t}=this.viewModel;e.addAttachment().then((()=>t.previous()))},s._handleAttachmentUpdate=function(){const{_attachments:e}=this,{activeWorkflow:t}=this.viewModel;e.updateAttachment().then((()=>t.previous()))},s._handleAttachmentDelete=function(){const{messages:e,messagesCommon:t}=this;this._prompt={title:e.deleteAttachmentWarningTitle,message:e.deleteAttachmentWarningMessage,options:[{label:e.keepAttachment,type:"neutral",action:()=>this._prompt=null},{label:t.delete,type:"positive",action:()=>{const{_attachments:e}=this,{activeWorkflow:t}=this.viewModel;e.deleteAttachment(e.viewModel.activeAttachmentInfo).then((()=>{t.previous(),this._prompt=null}))}}]}},s._handleAdd=function(){this.viewModel.canCreate&&this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},s._handleEdit=function(){this.viewModel.canUpdate&&this.viewModel.startUpdateWorkflowAtFeatureSelection()},s._handleDone=function(){this.viewModel.cancelWorkflow({force:!0})},s._handleBack=function(){const{messages:e}=this,{activeWorkflow:t}=this.viewModel,{stepId:i,data:s,type:a}=t,r=()=>{t.hasPreviousStep?t.previous():this.viewModel.cancelWorkflow({force:!0})};if("editing-new-feature"===i||"editing-existing-feature"===i&&s.edits.modified){const t="create"===a?e.cancelAddWarningMessage:e.cancelEditWarningMessage,i="create"===a?e.cancelAddTitle:e.cancelEditTitle,s="create"===a?e.continueAdding:e.continueEditing,n="create"===a?e.discardFeature:e.discardEdits;this._prompt={title:i,message:t,options:[{label:s,type:"neutral",action:()=>this._prompt=null},{label:n,type:"negative",action:()=>{r(),this._prompt=null}}]}}else r()},i}(g.HandleOwnerMixin(k));return t.__decorate([r.property()],H.prototype,"_attachments",void 0),t.__decorate([n.aliasOf("viewModel.activeWorkflow")],H.prototype,"activeWorkflow",void 0),t.__decorate([n.aliasOf("viewModel.allowedWorkflows")],H.prototype,"allowedWorkflows",void 0),t.__decorate([r.property()],H.prototype,"iconClass",void 0),t.__decorate([r.property({aliasOf:{source:"messages.widgetLabel",overridable:!0}})],H.prototype,"label",void 0),t.__decorate([n.aliasOf("viewModel.layerInfos")],H.prototype,"layerInfos",void 0),t.__decorate([r.property(),v.messageBundle("esri/widgets/Editor/t9n/Editor")],H.prototype,"messages",void 0),t.__decorate([r.property(),v.messageBundle("esri/t9n/common")],H.prototype,"messagesCommon",void 0),t.__decorate([r.property(),v.messageBundle("esri/widgets/FeatureTemplates/t9n/FeatureTemplates")],H.prototype,"messagesTemplates",void 0),t.__decorate([n.aliasOf("viewModel.snappingOptions")],H.prototype,"snappingOptions",void 0),t.__decorate([r.property()],H.prototype,"supportingWidgetDefaults",void 0),t.__decorate([n.aliasOf("viewModel.view")],H.prototype,"view",void 0),t.__decorate([r.property(),y.vmEvent(["workflow-cancel","workflow-commit"])],H.prototype,"viewModel",void 0),t.__decorate([f.accessibleHandler()],H.prototype,"_handleDelete",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleAttachmentAdd",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleAttachmentUpdate",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleAttachmentDelete",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleAdd",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleEdit",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleDone",null),t.__decorate([f.accessibleHandler()],H.prototype,"_handleBack",null),H=t.__decorate([o.subclass("esri.widgets.Editor")],H),H}));
