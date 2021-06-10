/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../../../../chunks/_rollupPluginBabelHelpers","../../../../../chunks/tslib.es6","../../../../../core/has","../../../../../core/maybe","../../../../../core/Logger","../../../../../core/accessorSupport/ensureType","../../../../../core/accessorSupport/decorators/property","../../../../../core/accessorSupport/decorators/subclass","../../../../../core/urlUtils","../../../../../core/uuid","../../../../../portal/support/resourceExtension","../../../../../core/Accessor","../../../../../geometry/Polyline","../../../../../core/mathUtils","../../../../../chunks/vec3f64","../../../../../chunks/vec3","../../../../../core/Handles","../../../../../core/watchUtils","../../../../../geometry/projectionEllipsoid","../../../../../geometry/projection","../../../../../core/Quantity","../../../../../geometry/support/geodesicUtils","../../../../../geometry/geometryEngine","../../measurementTools/support/UnitNormalizer"],(function(e,t,i,n,r,s,o,a,c,l,d,u,p,h,m,g,_,f,P,D,b,v,M,j,w){"use strict";e.DirectLineMeasurement3DController=function(e){function i(t){var i;return(i=e.call(this,t)||this)._tempStartPosition=g.create(),i._tempEndPosition=g.create(),i._tempCornerPosition=g.create(),i._unitNormalizer=new w,i._handles=new f,i}t._inheritsLoose(i,e);var n=i.prototype;return n.initialize=function(){this._handles.add(P.whenOnce(this.view,"ready",(()=>this._initialize()),!0))},n._initialize=function(){const e=this.view.spatialReference,t=D.getSphericalPCPF(e),i=t===D.SphericalECEFSpatialReference?D.WGS84ECEFSpatialReference:t;this._sphericalPCPF=i;const n=b.canProjectWithoutEngine(e,i);this._unitNormalizer.spatialReference=n?i:e,this._handles.add([this.dataObject.watch("startPoint",(()=>this._updateMeasurement()),!0),this.dataObject.watch("endPoint",(()=>this._updateMeasurement()),!0),this.dataObject.watch("settings",(()=>this._updateMeasurement()),!0)],"model"),this._updateMeasurement()},n._updateMeasurement=function(){const e=this.dataObject.startPoint,t=this.dataObject.endPoint;if(r.isNone(e)||r.isNone(t))return void(this.dataObject.measurement=null);const i=this._euclideanDistances(e,t),n=this._exactGeodesicDistanceAndAngle(e,t,i.horizontal.value);this.dataObject.measurement={directDistance:i.direct,horizontalDistance:i.horizontal,verticalDistance:i.vertical,geodesicDistance:n.distance,geodesicAngle:n.angle}},n._euclideanDistances=function(e,t){e.z>t.z&&(e=[e,e=t][0]);const i=e.clone();i.z=t.z;const n=this._tempStartPosition,r=this._tempEndPosition,s=this._tempCornerPosition,o=this.view.spatialReference,a=this._sphericalPCPF,c=b.canProjectWithoutEngine(o,a)?a:o;b.projectPointToVector(e,n,c),b.projectPointToVector(t,r,c),b.projectPointToVector(i,s,c);const l=_.distance(n,r),d=_.distance(s,r),u=Math.abs(t.z-e.z),p=e=>this._unitNormalizer.normalizeDistance(e),h=p(l),m=p(d),g=p(u);return{direct:new v(h,"meters"),horizontal:new v(m,"meters"),vertical:new v(g,"meters")}},n._exactGeodesicDistanceAndAngle=function(e,t,i){const n=e.spatialReference,r=new h({paths:[e,t],spatialReference:n}),s=n.isGeographic&&M.isSupported(n)?M.geodesicLengths([r],"meters")[0]:n.isWebMercator?j.geodesicLength(r,"meters"):void 0,{distance:o,angle:a}=s?{distance:s,angle:this._fallbackGeodesicAngle(s,n)}:this._fallbackGeodesicDistance(e,t,i);return{distance:new v(o,"meters"),angle:new v(a,"degrees")}},n._fallbackGeodesicAngle=function(e,t){return e/D.getReferenceEllipsoid(t).metersPerDegree},n._fallbackGeodesicDistance=function(e,t,i){if(b.projectPointToWGS84ComparableLonLat(e,y)){b.projectPointToWGS84ComparableLonLat(t,z);const e=m.deg2rad(y[0]),i=m.deg2rad(y[1]),n=m.deg2rad(z[0]),r=m.deg2rad(z[1]),s=Math.abs(n-e),o=m.acosClamped(Math.sin(i)*Math.sin(r)+Math.cos(i)*Math.cos(r)*Math.cos(s)),a=m.rad2deg(o),c={distance:0};return M.inverseGeodeticSolver(c,[y[0],y[1]],[z[0],z[1]]),{distance:c.distance,angle:a}}{const t=e.spatialReference,n=i;return{distance:n,angle:this._fallbackGeodesicAngle(n,t)}}},i}(p),i.__decorate([a.property()],e.DirectLineMeasurement3DController.prototype,"view",void 0),i.__decorate([a.property()],e.DirectLineMeasurement3DController.prototype,"dataObject",void 0),e.DirectLineMeasurement3DController=i.__decorate([c.subclass("esri.views.3d.interactive.graphics.DirectLineMeasurement3D.DirectLineMeasurement3DController")],e.DirectLineMeasurement3DController);const y=g.create(),z=g.create();Object.defineProperty(e,"__esModule",{value:!0})}));