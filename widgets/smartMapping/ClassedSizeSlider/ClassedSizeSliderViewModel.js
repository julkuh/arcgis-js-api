/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["../../../chunks/_rollupPluginBabelHelpers","../../../chunks/tslib.es6","../../../core/has","../../../core/maybe","../../../core/Logger","../../../core/accessorSupport/ensureType","../../../core/accessorSupport/decorators/property","../../../core/accessorSupport/decorators/subclass","../../../core/urlUtils","../../../core/uuid","../../../portal/support/resourceExtension","../SmartMappingSliderViewModel"],(function(e,t,r,s,n,o,a,i,u,l,c,p){"use strict";let h=function(t){function r(e){var r;return(r=t.call(this,e)||this).breaks=null,r.zoomingEnabled=!1,r}e._inheritsLoose(r,t);var n=r.prototype;return n.setValue=function(e,t){const{max:r,min:s}=this;t>r||t<s||(this._updateBreakInfos(t,e),this.notifyChange("values"),this.notifyChange("labels"))},n._updateBreakMax=function(e){const{breaks:t,max:r,min:n}=this;!isNaN(e)&&r!==e&&s.isSome(n)&&e>n&&t&&t.length&&(t[t.length-1].max=e)},n._updateBreakMin=function(e){const{breaks:t,max:r,min:n}=this;!isNaN(e)&&n!==e&&s.isSome(r)&&e<r&&t&&t.length&&(t[0].min=e)},n._updateBreakInfos=function(e,t){const{breaks:r}=this;r[t].max=e,r[t].min>r[t].max&&(r[t].min=e),s.isSome(r[t+1])&&(r[t+1].min=e)},e._createClass(r,[{key:"max",get:function(){const{breaks:e}=this;return e&&e.length?e[e.length-1].max:null},set:function(e){this._updateBreakMax(e),this.setMax(e)}},{key:"min",get:function(){const{breaks:e}=this;return e&&e.length?e[0].min:null},set:function(e){this._updateBreakMin(e),this.setMin(e)}},{key:"values",get:function(){const{breaks:e}=this;if(!e||!e.length)return[];const t=[];for(let r=0;r<e.length-1;r++)t.push(e[r].max);return t}}]),r}(p);return t.__decorate([a.property()],h.prototype,"breaks",void 0),t.__decorate([a.property()],h.prototype,"max",null),t.__decorate([a.property()],h.prototype,"min",null),t.__decorate([a.property({readOnly:!0})],h.prototype,"values",null),h=t.__decorate([i.subclass("esri.widgets.smartMapping.ClassedSizeSlider.ClassedSizeSliderViewModel")],h),h}));
