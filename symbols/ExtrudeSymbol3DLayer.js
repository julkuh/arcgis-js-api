/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/maybe","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/enumeration","../core/accessorSupport/decorators/subclass","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","./Symbol3DLayer","./edges/utils","./support/Symbol3DMaterial"],(function(e,r,o,t,s,a,l,i,c,p,n,u,d,y,h){"use strict";var b;let m=b=function(r){function o(e){var o;return(o=r.call(this,e)||this).type="extrude",o.size=1,o.material=null,o.castShadows=!0,o.edges=null,o}return e._inheritsLoose(o,r),o.prototype.clone=function(){return new b({edges:this.edges&&this.edges.clone(),enabled:this.enabled,material:t.isSome(this.material)?this.material.clone():null,castShadows:this.castShadows,size:this.size})},o}(d);return r.__decorate([i.enumeration({Extrude:"extrude"},{readOnly:!0})],m.prototype,"type",void 0),r.__decorate([l.property({type:Number,json:{write:{enabled:!0,isRequired:!0}},nonNullable:!0})],m.prototype,"size",void 0),r.__decorate([l.property({type:h.default,json:{write:!0}})],m.prototype,"material",void 0),r.__decorate([l.property({type:Boolean,nonNullable:!0,json:{write:!0,default:!0}})],m.prototype,"castShadows",void 0),r.__decorate([l.property(y.symbol3dEdgesProperty)],m.prototype,"edges",void 0),m=b=r.__decorate([c.subclass("esri.symbols.ExtrudeSymbol3DLayer")],m),m}));
