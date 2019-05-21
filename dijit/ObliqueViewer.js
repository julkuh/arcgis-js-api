// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/has","../kernel","../tasks/QueryTask","../tasks/query","./_EventedWidget","dijit/_Widget","./_ObliqueRotationWidget","dojo/_base/array","../ImageSpatialReference","../tasks/ImageServiceProjectTask","../tasks/ProjectParameters","../layers/MosaicRule","../geometry/Extent","../geometry/Polygon","../lang","../config","./RasterList","dojo/store/Observable","dojo/store/Memory","esri/geometry/geometryEngine","dojo/Deferred"],function(e,t,i,r,s,n,a,o,h,c,d,l,u,f,m,x,g,p,R,_,y,v,E){var I=e([a,o],{declaredClass:"esri.dijit.ObliqueViewer",azimuthField:"SensorAzimuth",elevationThreshold:70,elevationField:"SensorElevation",snap:!0,_refreshOK:!0,isNadir:!1,showThumbnail:!0,noQueryOnExtentChange:!1,azimuthTolerance:10,rasterListRefresh:!0,extents:[],center:null,searchRadius:0,searchUnit:"meters",maxExtentIdx:5,currentExtentIdx:null,setNextExtent:function(){if(!(this.currentExtentIdx>=this.maxExtentIdx||this.currentExtentIdx>=this.extents.length-1)){var e=this;this.currentExtentIdx++;var t,i=new f;i.method=f.METHOD_LOCKRASTER,i.lockRasterIds=[this.extents[this.currentExtentIdx].spatialReference.icsid],e.imageServiceLayer.setMosaicRule(i,!0),e._refreshOK=!1,e.map.spatialReference=this.extents[this.currentExtentIdx].spatialReference,t=p.defaults.map.zoomDuration,p.defaults.map.zoomDuration=0,e.map.setExtent(this.extents[this.currentExtentIdx]).then(function(){e._refreshOK=!0,p.defaults.map.zoomDuration=t})}},setPreviousExtent:function(){if(!(this.currentExtentIdx<=0)){var e=this;this.currentExtentIdx--;var t,i=new f;i.method=f.METHOD_LOCKRASTER,i.lockRasterIds=[this.extents[this.currentExtentIdx].spatialReference.icsid],e.imageServiceLayer.setMosaicRule(i,!0),e._refreshOK=!1,e.map.spatialReference=this.extents[this.currentExtentIdx].spatialReference,t=p.defaults.map.zoomDuration,p.defaults.map.zoomDuration=0,e.map.setExtent(this.extents[this.currentExtentIdx]).then(function(){e._refreshOK=!0,p.defaults.map.zoomDuration=t})}},isPreviousAvailable:function(){},isNextAvailable:function(){},_isICS:function(e){return!(!e.ics&&!e.icsid)},resizeRotationGauge:function(e){this._rotationWidget&&this._rotationWidget.resize(e)},_initializeTasks:function(){this.obliqueRecordsQueryTask=new s(this.imageServiceUrl),this.projectTask=new l},_verifyRasterInfoFields:function(){return this.rasterInfoFields&&this.rasterInfoFields.length},_setupRasterList:function(){var e=this,t=[{name:this.imageServiceLayer.objectIdField,alias:"Object ID",display:!0},{name:this.azimuthField,alias:"Azimuth",display:!0},{name:this.elevationField,alias:this.elevationField,display:!0}];this.rasterInfoFields=this._verifyRasterInfoFields()?this.rasterInfoFields:t,this.rasterList=new R({data:new _(new y),showThumbnail:this.showThumbnail,imageServiceUrl:this.imageServiceLayer.url,fields:this.rasterInfoFields},this.rasterListDiv),this.rasterList.on("raster-select",function(t){e.selectedRasterId=t[e.imageServiceLayer.objectIdField],e.emit("raster-select",{selectedRasterId:e.selectedRasterId}),e.setImage(e.selectedRasterId,e.map.extent),c.forEach(e.filteredRecords,function(t){delete t.attributes.selected,t.attributes[e.imageServiceLayer.objectIdField]===e.selectedRasterId&&(t.attributes.selected=!0)}),e._rotationWidget&&e._rotationWidget.setAzimuth(t[e.azimuthField])}),this.rasterList.startup()},_setupRotationWidget:function(){var e=this;this._rotationWidget=new h({snap:this.snap,azimuthAngle:this.azimuthAngle},this.rotationDiv),this._rotationWidget.startup(),this.own(this._rotationWidget.on("azimuth-change",function(t){var i=t.azimuth;e.currentExtentIdx=0,e.extents=[],e.emit("azimuth-change",t),i?(e.azimuthAngle=i,e._checkExtentOrientation(),e._filterByAzimuth(),e._refreshRotationWidget({features:e.records}),e._refreshListDijit(e.filteredRecords),e._refreshImage(e.map.extent),e._oldAzimuth=i,e.isNadir=!1):e._switchToNadir()}))},_refreshRotationWidget:function(e){this._rotationWidget&&this._rotationWidget.refresh(e)},_checkExtentOrientation:function(){var e=(this._oldAzimuth,this._oldAzimuth-this.azimuthAngle),t=Math.abs(e/90%2);this._azimuthExtentChanged=!(t<.25||t>1.75)},_refreshListDijit:function(e){var t=this._prepareListData(e);this.rasterList&&this.rasterListRefresh&&this.rasterList.setData(t),this.emit("records-refresh",{records:this.records,filteredRecords:this.filteredRecords})},_prepareListData:function(e){var t,i=[],r=this.imageServiceLayer.objectIdField,s=this.imageServiceLayer.credential;return c.forEach(e,function(e){t=e.attributes,t.thumbnailUrl=this.imageServiceUrl+"/"+t[r]+"/thumbnail",s&&s.token&&(t.thumbnailUrl+="?token="+s.token),i.push(t)},this),new _(new y({data:i,idProperty:this.imageServiceLayer.objectIdField}))},clearSelection:function(){this.rasterList&&this.rasterList.clearSelection(),c.forEach(this.records,function(e){delete e.attributes.selected}),this._refreshListDijit(this.records)},_switchToNadir:function(){var e=!!this.map.extent.spatialReference.icsid,t=this.defaultNadirMosaicRule||this.imageServiceLayer.mosaicRule||new f;if(this.azimuthAngle=null,this._oldAzimuth=null,this._azimuthExtentChanged=!1,t.method=t.method||f.METHOD_NONE,t.where=this.elevationField+">"+this.elevationThreshold,this.defaultNadirMosaicRule=t,this.imageServiceLayer.setMosaicRule(t,e),this.clearSelection(),e){var i,r=this;this.projectGeometry(this.map.extent,this.nadirSpatialReference).then(function(e){r._verifyExtent(e[0])&&(r._refreshOK=!1,r.map.spatialReference=e[0].spatialReference,r.spatialReferenceChanged(),i=p.defaults.map.zoomDuration,p.defaults.map.zoomDuration=0,r.map.setExtent(new m(e[0]).setSpatialReference(e[0].spatialReference)).then(function(){r._refreshOK=!0,r.isNadir=!0,p.defaults.map.zoomDuration=i,r.selectedRasterId=null,r.selectedRaster=null,r.filteredRecords=null}))})}},projectGeometry:function(e,t){var i=new u;return t=t||this.map.spatialReference,i.geometries=[e],i.outSR=t,this.projectTask.execute(i)},_verifyExtent:function(e){return!(isNaN(e.xmin)||isNaN(e.xmax)||isNaN(e.ymin)||isNaN(e.ymax))},_verifyPoint:function(e){return!isNaN(e.x)&&!isNaN(e.y)},_refreshRecords:function(e){function t(t){i._verifyExtent(t[0].getExtent())?(i.nadirExtent=t[0].getExtent(),i.search(i._trimExtent(i.nadirExtent,s)).then(function(r){if(!r||!r.features)return i.emit("no-records",{message:"records not provided.",extent:i.nadirExtent}),i._refreshRotationWidget({features:[]}),i._refreshListDijit(i.filteredRecords),console.log("Oblique viewer: no records returned");i.records=r.features,i._refreshRotationWidget({features:i.records}),i.isNadir?(i._refreshListDijit(i.records),i.emit("extent-change",{geometry:i.filteredRecords?i._getIntersectGeometry(t[0]):t[0]})):(i._filterByAzimuth(),i._refreshListDijit(i.filteredRecords),e&&i.filteredRecords&&i.filteredRecords.length&&i._refreshImage(i.map.extent),i.emit("extent-change",{geometry:i.filteredRecords?i._getIntersectGeometry(t[0]):t[0]}))})):(console.error("Oblique viewer: Project Operation returned invalid extent"),i.search(i._trimExtent(i.map.extent,s)).then(function(t){if(!t||!t.features)return i.emit("no-records",{message:"records not provided.",extent:i.map.extent}),i._refreshRotationWidget({features:[]}),i._refreshListDijit(i.filteredRecords),console.log("Oblique viewer: no records returned");i.records=t.features,i._refreshRotationWidget({features:i.records}),i.isNadir?i._refreshListDijit(i.records):(i._filterByAzimuth(),i._refreshListDijit(i.filteredRecords),e&&i.filteredRecords&&i.filteredRecords.length&&i._refreshImage(new x(i.filteredRecords[0].geometry).getExtent()))}))}var i=this,r=this.map.extent,s=.15;r&&(r.spatialReference.icsid||r.spatialReference.ics);this.nadirSpatialReference.equals(this.map.extent.spatialReference)?t([this.map.extent]):this.projectGeometry(this._convertExtentToPolygon(this.map.extent),this.nadirSpatialReference).then(t)},_convertExtentToPolygon:function(e){var t=new x(e.spatialReference);return t.addRing([[e.xmax,e.ymin],[e.xmax,e.ymax],[e.xmin,e.ymax],[e.xmin,e.ymin],[e.xmax,e.ymin]]),t},postCreate:function(){this.inherited(arguments),this.map&&this.imageServiceLayer||console.error("ObliqueViewer: Map or Image service layer not provided."),this.imageServiceUrl=this.imageServiceLayer.url,this.nadirSpatialReference=this.map.extent.spatialReference,this._initializeTasks(),this.isNadir=!g.isDefined(this.azimuthAngle),this.isNadir&&this._switchToNadir(),this.rotationDiv&&this._setupRotationWidget(),this.rasterListDiv&&(this.imageServiceLayer.loaded?this._setupRasterList():this.imageServiceLayer.on("load",t.hitch(this,this._setupRasterList))),this.sorter||(this.sorter=this._sortSpatially),this.own(this.map.on("extent-change",t.hitch(this,function(e){this._refreshOK&&!this.noQueryOnExtentChange&&(this._isICS(this.map.extent.spatialReference)||(this.nadirExtent=this.map.extent,this._switchToNadir(),this.emit("extent-change",{geometry:this.filteredRecords?this._getIntersectGeometry(this._convertExtentToPolygon(this.nadirExtent)):this._convertExtentToPolygon(this.nadirExtent)})),this._refreshRecords(!0),this._azimuthExtentChanged=!1)}))),g.isDefined(this.azimuthAngle)&&!this.noQueryOnExtentChange&&this._refreshRecords()},_refreshImage:function(e){if(!this.filteredRecords||!this.filteredRecords.length||this.selectedRasterId===this.filteredRecords[0].attributes[this.imageServiceLayer.objectIdField])return void this._refreshSavedExtents();this._setSelectedRaster(e)},_refreshSavedExtents:function(){if(this._isICS(this.map.extent.spatialReference)){var e=this;e.extents&&e.extents.length?(e.extents.length>e.maxExtentIdx&&(this.extents.shift(),this.currentExtentIdx--),this.currentExtentIdx<e.extents.length-1?this.currentExtentIdx=e.extents.length-1:this.currentExtentIdx++):(this.currentExtentIdx=0,this.extents=[]),this.extents.push(e.map.extent)}},_createExtent:function(e,t,i){var r=i.getWidth()/2*1.00001,s=i.getHeight()/2;return new m(e.x-r,e.y-s,e.x+r,e.y+s,t)},spatialReferenceChanged:function(){this.imageServiceLayer.handleSpatialReferenceChange()},setImage:function(e,t){function i(t){if(h){if(!o._verifyPoint(t[0]))return console.log("Project operation returned invalid result.");a=o._createExtent(t[0],o.imageSpatialReference,h)}else{if(!h&&!o._verifyExtent(t[0]))return console.log("Project operation returned invalid extent.");a=t[0]}r=new f,r.method=f.METHOD_LOCKRASTER,r.lockRasterIds=[e],o.imageServiceLayer.setMosaicRule(r,!0),o._refreshOK=!1,o.map.spatialReference=a.spatialReference,o.spatialReferenceChanged(),s=p.defaults.map.zoomDuration,n=p.defaults.map.panDuration=0,p.defaults.map.zoomDuration=0,p.defaults.map.panDuration=0,o.map.setExtent(new m(a).setSpatialReference(a.spatialReference)).then(function(){o._refreshOK=!0,p.defaults.map.zoomDuration=s,p.defaults.map.panDuration=n,o._refreshSavedExtents(),o.projectGeometry(o._convertExtentToPolygon(a),o.nadirSpatialReference).then(function(e){o.emit("extent-change",{geometry:o.filteredRecords?o._getIntersectGeometry(e[0]):e[0]})})}),o.center&&o.projectGeometry(o.center,o.imageSpatialReference).then(function(e){o.emit("add-point",{point:e[0]})})}if(!e)return console.error("Object ID of raster to be displayed not provided");var r,s,n,a,o=this,h=t&&(t.spatialReference.icsid||t.spatialReference.ics)?t:null;this.imageSpatialReference=new d({icsid:e,url:this.imageServiceUrl}),t&&t.spatialReference&&!t.spatialReference.ics&&!t.spatialReference.icsid?(o.nadirExtent=t.getExtent(),o.projectGeometry(o.nadirExtent,o.imageSpatialReference).then(i)):this.projectGeometry(this._convertExtentToPolygon(t),this.nadirSpatialReference).then(function(e){o.nadirExtent=e[0].getExtent().setSpatialReference(o.nadirSpatialReference),o.projectGeometry(t.getCenter(),o.imageSpatialReference).then(i)})},locate:function(e){if(!e)return console.error("Geometry not specified.");var t,i,r=this,s=e.type;s&&"extent"===s?t=e:s&&"point"===s?(i=v.buffer(e,100,"meters"),t=i.getExtent()):(i=v.buffer(e.getExtent().getCenter(),100,"meters"),t=i.getExtent()),this.center=t.getCenter(),this.search(e).then(function(e){r.setData(e.features,t)})},search:function(e){if(!e)return console.error("Oblique viewer: no geometry provided for search.");var t,i=new E,r=this;return t=new n,t.geometry=e,t.outFields=this._getQueryFields()||[this.imageServiceLayer.objectIdField,this.azimuthField],t.returnGeometry=!0,t.where=this.elevationField+"<"+this.elevationThreshold,t.outSpatialReference=e.spatialReference,this.obliqueRecordsQueryTask.execute(t).then(function(t){i.resolve({features:r.sorter(r._processRecords(t.features),e)})}),i.promise},_sortSpatially:function(e,t){if(e&&e.length&&this.map.loaded){var i,r,s,n,a,o=0,h=0,d=e[0],l=0,u=this.nadirExtent||this.map.extent;for(t&&"extent"===t.type&&t.spatialReference.equals(e[0].geometry.spatialReference)&&(u=t),a=u.getCenter(),this.selectedRaster&&this._extentContained(this.selectedRaster,u)&&(c.some(e,function(t,i){if(t.attributes[this.imageServiceLayer.objectIdField]===this.selectedRasterId)return s=e[i],e[i]=d,e[0]=s,!0},this),l=1),o=l;o<e.length;o++){for(i=Math.sqrt((e[o].center.x-a.x)*(e[o].center.x-a.x)+(e[o].center.y-a.y)*(e[o].center.y-a.y)),n=o,h=o+1;h<e.length;h++)r=Math.sqrt((e[h].center.x-a.x)*(e[h].center.x-a.x)+(e[h].center.y-a.y)*(e[h].center.y-a.y)),i>r&&(d=e[h],i=r,n=h);o!==n&&(s=e[o],e[o]=d,e[n]=s)}}return e},_filterByAzimuth:function(){this.filteredRecords=[],c.forEach(this.records,function(e){Math.min(Math.abs(e.attributes[this.azimuthField]-this.azimuthAngle),Math.abs(e.attributes[this.azimuthField]-this.azimuthAngle-360))<=this.azimuthTolerance&&this.filteredRecords.push(e)},this),this.filteredRecords&&this.filteredRecords.length&&!this.isNadir&&(this.filteredRecords[0].attributes.selected=!0)},_processRecords:function(e){var t;return c.forEach(e,function(e){t=new x(e.geometry).setSpatialReference(this.nadirSpatialReference).getCentroid(),e.center=t},this),0===e.length?(this.filteredRecords=null,this.selectedRasterId=null,e=null):this.emit("records-found",{message:"records are found."}),e},_computeAzimuthFilter:function(){var e=(this.azimuthAngle+350)%360,t=(this.azimuthAngle+10)%360;return e<t?this.azimuthField+" BETWEEN "+e+" AND "+t:"("+this.azimuthField+" BETWEEN 0 AND "+t+" OR "+this.azimuthField+" BETWEEN "+e+" AND 360)"},_getIds:function(e){var t=[],i=this;return c.forEach(e,function(e){t.push(e.attributes[i.imageServiceLayer.objectIdField])}),t},_setRasterListRefreshAttr:function(e){if(this._set("rasterListRefresh",e),e){var t=this.isNadir?this.records:this.filteredRecords;this._refreshListDijit(t)}},_extentContained:function(e,t){if(!e||!t)return!1;var i=new x(e.geometry).getExtent();return this._trimExtent(i,.2).contains(t)},setData:function(e,i){if(!e)return this.emit("no-records",{message:"records not provided.",extent:i}),this._refreshRotationWidget({features:[]}),this._refreshListDijit(this.filteredRecords),console.error("Oblique viewer: records not provided.");i=i||this.map.extent,this._set("records",e),this._refreshRotationWidget({features:e}),this._filterByAzimuth(),this.filteredRecords&&this.filteredRecords.length?(this._refreshListDijit(this.filteredRecords),this.imageServiceLayer.loaded?this._setSelectedRaster(i):this.imageServiceLayer.on("load",t.hitch(this,function(){this._setSelectedRaster(i)}))):(this.selectedRaster=null,this.selectedRasterId=null,this.emit("raster-select",{selectedRasterId:null}))},_setSelectedRaster:function(e){this.selectedRaster=this.filteredRecords[0],this.selectedRasterId=this.selectedRaster.attributes[this.imageServiceLayer.objectIdField],this.setImage(this.selectedRaster.attributes[this.imageServiceLayer.objectIdField],e),this.emit("raster-select",{selectedRasterId:this.selectedRasterId})},setExtent:function(e){var t=new E,i=this;return this.projectGeometry(e,this.map.spatialReference).then(function(e){i._verifyExtent(e[0])&&i.map.setExtent(e[0]).then(function(){t.resolve()})}),t.promise},zoomToSelectedImage:function(){return g.isDefined(this.selectedRasterId)?this.isNadir?console.log("Viewer in nadir mode, no selected raster."):void this._getImageGeometry(this.selectedRasterId).then(t.hitch(this,function(e){this.map.setExtent(e.getExtent())})):console.error("Oblique viewer: no selected raster.")},_getImageGeometry:function(e){var i,r,s=new n,a=new E;return s.objectIds=[e],s.returnGeometry=!0,this.obliqueRecordsQueryTask.execute(s).then(t.hitch(this,function(e){e.features&&e.features.length&&(r=e.features[0])&&r.geometry&&(i=new x(r.geometry),this.projectGeometry(i,this.map.spatialReference).then(t.hitch(this,function(e){e&&e.length&&(i=new x(e[0]).setSpatialReference(this.map.spatialReference),a.resolve(i))})))})),a.promise},_getQueryFields:function(){var e=[];return c.forEach(this.rasterInfoFields,function(t){t.name&&e.push(t.name)}),c.indexOf(e,this.azimuthField)<0&&e.push(this.azimuthField),c.indexOf(e,this.imageServiceLayer.objectIdField)<0&&e.push(this.imageServiceLayer.objectIdField),e},_trimExtent:function(e,t){var i,r,s,n;return t=t||.15,i=e.ymax-e.ymin,e.xmax-e.xmin,s=i*(1-t),r=i*(1-t),n=e.getCenter(),new m({xmin:n.x-r/2,ymin:n.y-s/2,xmax:n.x+r/2,ymax:n.y+s/2,spatialReference:e.spatialReference})},_getIntersectGeometry:function(e){var t,i=this;return g.isDefined(this.selectedRasterId)?c.some(this.filteredRecords,function(e){if(e.attributes[i.imageServiceLayer.objectIdField]==i.selectedRasterId)return t=e.geometry,!0})?v.intersect(e,t):void 0:e}});return i("extend-esri")&&t.setObject("dijit.ObliqueViewer",I,r),I});