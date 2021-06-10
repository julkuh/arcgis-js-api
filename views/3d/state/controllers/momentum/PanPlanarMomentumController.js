/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../chunks/vec3f64","../../../../../chunks/vec3","./MomentumController"],(function(e,t,r,o,n,s,c,a,u,l,i,m,p,P){"use strict";e.PanPlanarMomentumController=function(e){function r(t){var r;return(r=e.call(this,t)||this).interactionType=4,r.tmpPan=m.create(),r}return t._inheritsLoose(r,e),r.prototype.momentumStep=function(e,t){const r=this.momentum.value(e);p.scale(this.tmpPan,this.momentum.direction,r),p.subtract(t.eye,t.eye,this.tmpPan),p.subtract(t.center,t.center,this.tmpPan),t.markViewDirty(),this.constraintOptions.interactionDirection=this.tmpPan},r}(P.MomentumController),r.__decorate([c.property({constructOnly:!0})],e.PanPlanarMomentumController.prototype,"momentum",void 0),e.PanPlanarMomentumController=r.__decorate([a.subclass("esri.views.3d.state.controllers.momentum.PanPlanarMomentumController")],e.PanPlanarMomentumController),Object.defineProperty(e,"__esModule",{value:!0})}));
