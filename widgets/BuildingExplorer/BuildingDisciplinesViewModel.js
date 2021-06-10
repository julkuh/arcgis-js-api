/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../chunks/_rollupPluginBabelHelpers","../../chunks/tslib.es6","../../core/has","../../core/maybe","../../core/Logger","../../core/accessorSupport/ensureType","../../core/accessorSupport/decorators/property","../../core/accessorSupport/decorators/subclass","../../core/urlUtils","../../core/uuid","../../portal/support/resourceExtension","../../core/promiseUtils","../../core/Accessor","../../core/Collection","../../core/collectionUtils","../../core/Handles","./support/buildingLayerUtils","./support/LayerTreeNode","./support/layerUtils"],(function(e,r,t,s,o,a,i,l,n,d,c,y,u,p,h,_,g,L,f){"use strict";let b=function(r){function t(e){var t;return(t=r.call(this,e)||this).root=new L.LayerTreeNode,t.state="disabled",t._handles=new _,t._loadLayers=f.createLoadLayersFunction(),t.layers=new p,t}e._inheritsLoose(t,r);var o=t.prototype;return o.initialize=function(){this._handles.add(this.layers.on("change",(()=>this._onLayersChange()))),this._onLayersChange()},o.destroy=function(){this._set("state","disabled"),this._handles.destroy(),this.root.destroy()},o._updateLayerTree=function(){this.root.destroy(),this._set("root",new L.LayerTreeNode({collapsed:!1}));const e=new Map,r=this.layers.length>1?"modelName":"id";return this.layers.forEach((t=>{const o=g.findFullModelSublayer(t);s.isSome(o)&&this._addNodesForSublayers(o,this.root,e,r)})),this},o._addNodeForLayer=function(e,r,t,o){const a=String(e.get(o)).toLowerCase();if(!s.isSome(a)||e.isEmpty)return;const i=`${r.id}/${a}`;let l=t.get(i);l||(l=new L.LayerTreeNode({id:a,level:r.level+1}),t.set(i,l)),l.layers.push(e),r.children.push(l),this._addNodesForSublayers(e,l,t,o)},o._addNodesForSublayers=function(e,r,t,s){"building-group"!==e.type||e.isEmpty||e.sublayers.forEach((e=>this._addNodeForLayer(e,r,t,s)))},o._onLayersChange=async function(){if(this._set("state","loading"),0!==this.layers.length)try{await this._loadLayers(this.layers),this._updateLayerTree(),this._set("state","ready")}catch(e){y.isAbortError(e)||this._set("state","failed")}},e._createClass(t,[{key:"layers",set:function(e){const r=this._get("layers");this._set("layers",h.referenceSetter(e,r))}}]),t}(u);return r.__decorate([i.property({readOnly:!0})],b.prototype,"root",void 0),r.__decorate([i.property({type:p,nonNullable:!0})],b.prototype,"layers",null),r.__decorate([i.property({readOnly:!0,nonNullable:!0})],b.prototype,"state",void 0),b=r.__decorate([l.subclass("esri.widgets.BuildingExplorer.BuildingDisciplineViewModel")],b),b}));
