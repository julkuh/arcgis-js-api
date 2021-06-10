/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/Logger","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/aliasOf","../../core/accessorSupport/decorators/cast","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/Accessor","../../core/Collection","../../core/Identifiable","../../support/actions/ActionBase","../../support/actions/ActionButton","../../support/actions/ActionToggle","../../core/watchUtils","../../core/HandleOwner","../../layers/support/Sublayer","../../support/actions/ActionSlider","./ListItemPanel","./support/layerListUtils"],(function(e,t,i,r,o,n,a,s,l,c,p,d,h,y,u,_,v,f,w,g,b,L,O){"use strict";var S;const C=h.ofType({key:"type",defaultKeyValue:"button",base:u,typeMap:{button:_,toggle:v,slider:b}}),m=h.ofType(C),P="layer",M="child-list-mode",A="hide",V="esri.widgets.LayerList.ListItem";let k=S=function(t){function i(e){var i;return(i=t.call(this,e)||this).actionsSections=new m,i.actionsOpen=!1,i.children=new(h.ofType(S)),i.childrenSortable=!0,i.error=null,i.layer=null,i.layerView=null,i.open=!1,i.panel=null,i.parent=null,i.sortable=!0,i.view=null,i.visible=null,i}e._inheritsLoose(i,t);var r=i.prototype;return r.initialize=function(){this.handles.add([f.init(this,"layer",(e=>this._watchLayerProperties(e))),f.init(this,"view",(e=>this._updateChildren(e))),f.init(this,"panel",(e=>this._setListItemOnPanel(e))),f.init(this,["layer","view"],(()=>this._getLayerView()))])},r.destroy=function(){this.view=null},r.castPanel=function(e){return this.get("panel.open")&&!e.hasOwnProperty("open")&&(e.open=!0),e?new L(e):null},r.clone=function(){return new S({actionsSections:this.actionsSections.clone(),actionsOpen:this.actionsOpen,children:this.children.clone(),layer:this.layer,open:this.open,panel:this.panel,title:this.title,view:this.view,visible:this.visible})},r._setListItemOnPanel=function(e){e&&(e.listItem=this)},r._updateChildren=function(e){const t=this.children;t&&t.forEach((t=>t.view=e))},r._addChildren=function(e){if(this.handles.remove(M),this.children.removeAll(),!e)return;e.forEach((t=>{this.handles.add(f.watch(t,"listMode",(()=>this._addChildren(e))),M)}));const t=[];e.filter((e=>O.findLayerListMode(e)!==A)).forEach((e=>{if(O.canDisplayLayer(e)){const i=new S({layer:e,parent:this,view:this.view});t.unshift(i)}})),this.children.addMany(t)},r._watchSublayerChanges=function(e){e&&this.handles.add(e.on("change",(()=>{this._addChildren(e)})),P)},r._initializeChildLayers=function(e){this._addChildren(e),this._watchSublayerChanges(e)},r._watchLayerProperties=function(e){if(!this.handles)return;if(this.handles.remove(P),this.handles.remove(M),!e)return;this.handles.add(f.watch(e,"listMode",(()=>this._watchLayerProperties(e))),P);if("hide-children"===O.findLayerListMode(e))return void this.children.removeAll();const t=O.getNormalizedChildLayerProperty(e);t&&this.handles.add(f.init(e,t,(()=>{e.hasOwnProperty(t)&&this._initializeChildLayers(e[t])})),P)},r._getLayerView=async function(){const{layer:e,view:t}=this;if(e&&t)try{const i=await t.whenLayerView(e);if(i.layer!==this.layer)return;this._set("layerView",i)}catch{}},r._isLayerUpdating=function(e){return!(e instanceof g)&&(e&&"loading"===e.loadStatus)},e._createClass(i,[{key:"title",get:function(){const e=this.get("layer.layer");return(!e||e&&this.get("layer.layer.loaded"))&&this.get("layer.title")||this.get("layer.attributes.title")||""},set:function(e){void 0!==e?this._override("title",e):this._clearOverride("title")}},{key:"updating",get:function(){const e=this.layerView;return e?e.updating:this._isLayerUpdating(this.layer)}},{key:"visibleAtCurrentScale",get:function(){return!O.isLayerOutsideScaleRange(this.layer,this.get("view.scale"))}},{key:"visibilityMode",get:function(){return O.findLayerVisibilityMode(this.layer)}}]),i}(y.IdentifiableMixin(w.HandleOwnerMixin(d)));return t.__decorate([o.property({type:m})],k.prototype,"actionsSections",void 0),t.__decorate([o.property()],k.prototype,"actionsOpen",void 0),t.__decorate([o.property({type:h})],k.prototype,"children",void 0),t.__decorate([o.property()],k.prototype,"childrenSortable",void 0),t.__decorate([n.aliasOf("layer.loadError?")],k.prototype,"error",void 0),t.__decorate([o.property()],k.prototype,"layer",void 0),t.__decorate([o.property({readOnly:!0})],k.prototype,"layerView",void 0),t.__decorate([o.property()],k.prototype,"open",void 0),t.__decorate([o.property({type:L})],k.prototype,"panel",void 0),t.__decorate([a.cast("panel")],k.prototype,"castPanel",null),t.__decorate([o.property()],k.prototype,"parent",void 0),t.__decorate([o.property()],k.prototype,"sortable",void 0),t.__decorate([o.property()],k.prototype,"title",null),t.__decorate([o.property({readOnly:!0})],k.prototype,"updating",null),t.__decorate([o.property({value:null})],k.prototype,"view",void 0),t.__decorate([n.aliasOf("layer.visible")],k.prototype,"visible",void 0),t.__decorate([o.property({readOnly:!0})],k.prototype,"visibleAtCurrentScale",null),t.__decorate([o.property({readOnly:!0})],k.prototype,"visibilityMode",null),k=S=t.__decorate([s.subclass(V)],k),k}));
