/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../../chunks/_rollupPluginBabelHelpers","../../../../chunks/tslib.es6","../../../../core/has","../../../../core/Logger","../../../../core/accessorSupport/ensureType","../../../../core/accessorSupport/decorators/property","../../../../core/accessorSupport/decorators/subclass","../../../../core/urlUtils","../../../../core/uuid","../../../../portal/support/resourceExtension","../../../../core/Accessor","../../../../geometry/Point","../../../../geometry","../../../../Viewpoint","../../../../chunks/vec2f64","../../../../chunks/vec2","../../viewpointUtils"],(function(e,t,o,r,n,i,s,c,p,a,u,v,d,l,h,g,y){"use strict";const w=h.create(),_=h.create();let f=function(t){function o(e){var o;return(o=t.call(this,e)||this)._previousCenter=h.create(),o.viewpoint=new l({targetGeometry:new v,scale:0,rotation:0}),o}e._inheritsLoose(o,t);var r=o.prototype;return r.begin=function(e,t){this.navigation.begin(),g.set(this._previousCenter,t.center.x,t.center.y)},r.update=function(e,t){const{state:{size:o,padding:r}}=e;g.set(w,t.center.x,t.center.y),y.getAnchor(_,o,r),e.viewpoint=y.rotateBy(this.viewpoint,e.state.paddedViewState.viewpoint,y.angleBetween(_,this._previousCenter,w)),g.copy(this._previousCenter,w)},r.end=function(){this.navigation.end()},o}(u);return t.__decorate([i.property()],f.prototype,"viewpoint",void 0),t.__decorate([i.property()],f.prototype,"navigation",void 0),f=t.__decorate([s.subclass("esri.views.2d.actions.Rotate")],f),f}));
