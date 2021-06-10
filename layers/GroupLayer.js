/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/maybe","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/utils","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/accessorSupport/decorators/writer","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/loadAll","../webdoc/support/writeUtils","./Layer","../support/LayersMixin","../support/TablesMixin","../core/MultiOriginJSONSupport","./mixins/OperationalLayer","./mixins/BlendLayer","./mixins/PortalLayer","./mixins/ScaleRangeLayer"],(function(e,i,t,r,s,o,l,a,n,c,y,p,u,d,h,b,v,_,f,L,m,g,w){"use strict";let O=function(i){function t(t){var r;return(r=i.call(this,t)||this)._visibilityHandles={},r.fullExtent=void 0,r.operationalLayerType="GroupLayer",r.spatialReference=void 0,r.type="group",r._visibilityWatcher=r._visibilityWatcher.bind(e._assertThisInitialized(r)),r}e._inheritsLoose(t,i);var s=t.prototype;return s.initialize=function(){this._enforceVisibility(this.visibilityMode,this.visible),this.watch("visible",this._visibleWatcher.bind(this),!0)},s._writeLayers=function(e,i,t,s){const o=[];if(!e)return o;e.forEach((e=>{const i=h.getLayerJSON(e,s.webmap?s.webmap.getLayerJSONFromResourceInfo(e):null,s);r.isSome(i)&&i.layerType&&o.push(i)})),i.layers=o},s.load=function(e){return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Feature Service","Feature Collection","Scene Service"]},e)),Promise.resolve(this)},s.loadAll=function(){return d.loadAll(this,(e=>{e(this.layers)}))},s.layerAdded=function(e){e.visible&&"exclusive"===this.visibilityMode?this._turnOffOtherLayers(e):"inherited"===this.visibilityMode&&(e.visible=this.visible),this._visibilityHandles[e.uid]=e.watch("visible",this._visibilityWatcher,!0)},s.layerRemoved=function(e){const i=this._visibilityHandles[e.uid];i&&(i.remove(),delete this._visibilityHandles[e.uid]),this._enforceVisibility(this.visibilityMode,this.visible)},s._turnOffOtherLayers=function(e){this.layers.forEach((i=>{i!==e&&(i.visible=!1)}))},s._enforceVisibility=function(e,i){if(!l.getProperties(this).initialized)return;const t=this.layers;let r=t.find((e=>e.visible));switch(e){case"exclusive":t.length&&!r&&(r=t.getItemAt(0),r.visible=!0),this._turnOffOtherLayers(r);break;case"inherited":t.forEach((e=>{e.visible=i}))}},s._visibleWatcher=function(e){"inherited"===this.visibilityMode&&this.layers.forEach((i=>{i.visible=e}))},s._visibilityWatcher=function(e,i,t,r){const s=r;switch(this.visibilityMode){case"exclusive":e?this._turnOffOtherLayers(s):this._isAnyLayerVisible()||(s.visible=!0);break;case"inherited":s.visible=this.visible}},s._isAnyLayerVisible=function(){return this.layers.some((e=>e.visible))},e._createClass(t,[{key:"portalItem",set:function(e){this._set("portalItem",e)}},{key:"visibilityMode",set:function(e){const i=this._get("visibilityMode")!==e;this._set("visibilityMode",e),i&&this._enforceVisibility(e,this.visible)}}]),t}(m.BlendLayer(w.ScaleRangeLayer(L.OperationalLayer(g.PortalLayer(_.TablesMixin(v.LayersMixin(f.MultiOriginJSONMixin(b))))))));return i.__decorate([a.property()],O.prototype,"fullExtent",void 0),i.__decorate([a.property({json:{read:!1,write:{ignoreOrigin:!0}}})],O.prototype,"layers",void 0),i.__decorate([c.writer("layers")],O.prototype,"_writeLayers",null),i.__decorate([a.property({type:["GroupLayer"]})],O.prototype,"operationalLayerType",void 0),i.__decorate([a.property({json:{origins:{"web-document":{read:!1,write:!1}}}})],O.prototype,"portalItem",null),i.__decorate([a.property()],O.prototype,"spatialReference",void 0),i.__decorate([a.property({json:{read:!1},readOnly:!0,value:"group"})],O.prototype,"type",void 0),i.__decorate([a.property({type:["independent","inherited","exclusive"],value:"independent",json:{write:!0,origins:{"web-map":{read:!1,write:!1}}}})],O.prototype,"visibilityMode",null),O=i.__decorate([n.subclass("esri.layers.GroupLayer")],O),O}));
