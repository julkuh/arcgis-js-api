/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","./chunks/_rollupPluginBabelHelpers","./chunks/tslib.es6","./core/has","./core/lang","./core/maybe","./core/Logger","./core/accessorSupport/ensureType","./core/accessorSupport/decorators/property","./core/accessorSupport/decorators/reader","./core/accessorSupport/decorators/subclass","./core/accessorSupport/decorators/writer","./core/Error","./core/urlUtils","./core/uuid","./portal/support/resourceExtension","./core/promiseUtils","./core/accessorSupport/read","./geometry/support/spatialReferenceUtils","./geometry/SpatialReference","./geometry/Extent","./geometry/support/jsonUtils","./core/Collection","./kernel","./core/Promise","./core/Loadable","./portal/Portal","./core/loadAll","./portal/PortalItem","./core/Handles","./Map","./Viewpoint","./core/MultiOriginJSONSupport","./core/accessorSupport/originUtils","./support/MapFloorInfo","./webdoc/support/thumbnailUtils","./geometry/HeightModelInfo","./geometry/projection","./geometry/support/heightModelInfoUtils","./support/webSceneUtils","./views/support/spatialReferenceSupport","./webdoc/support/saveUtils","./webscene/ApplicationProperties","./webscene/Environment","./webscene/InitialViewProperties","./webscene/Presentation","./webscene/TransportationNetwork","./webscene/Version"],(function(e,t,r,i,o,n,a,s,l,p,c,u,d,h,y,m,w,f,g,v,b,_,S,I,A,R,P,O,L,M,V,U,j,E,C,T,N,G,k,W,F,J,x,$,B,q,K,D){"use strict";const H=a.getLogger("esri.WebScene"),z=new D.Version(1,23),Q=()=>{const e=8,t=[],r=z.major;for(let i=e;i<=z.minor;i++)t.push(`${r}.${i}`);return t},X="Web Scene",Y="ViewingMode-Local";let Z=function(r){function i(e){var t;return(t=r.call(this,e)||this)._handles=new M,t.applicationProperties=null,t.clippingArea=null,t.clippingEnabled=!1,t.floorInfo=null,t.heightModelInfo=null,t.sourceVersion=null,t.supportsHeightModelInfo=!0,t.transportationNetworks=null,t.presentation=new q,t.initialViewProperties=new B,t.portalItem=null,t.resourceInfo=null,t.debouncedSaveOperations=w.debounce((async(e,r,i)=>{switch(e){case 0:return t._saveImpl(r);case 1:return t._saveAsImpl(i,r)}})),t.resourceReferences={portalItem:null,paths:[]},t.authoringApp=null,t.authoringAppVersion=null,t._isAuthoringAppSetByUser=!1,t._isAuthoringAppVersionSetByUser=!1,t}t._inheritsLoose(i,r);var a=i.prototype;return a.initialize=function(){if(this.when().catch((e=>{H.error("#load()","Failed to load web scene",e)})),this.resourceInfo){let t;try{t=this._validateJSON(this.resourceInfo)}catch(e){return void this.addResolvingPromise(Promise.reject(e))}this.read(t),this.addResolvingPromise(this._validateSpatialReference()),this.addResolvingPromise(this._validateHeightModelInfo())}this._handles.add(this.allLayers.on("change",(()=>this._scheduleLayersIdGC())))},a.destroy=function(){this._unscheduleLayersIdGC(),this._handles.destroy(),this.presentation&&this.presentation.destroy();const e=this.portalItem;this.portalItem=null,null==e||e.destroy()},a.writeClippingArea=function(e,t){t.clippingArea||(t.clippingArea={}),t.clippingArea.geometry=e.toJSON()},a.readClippingEnabled=function(e,t){return!!t.clippingArea&&!!t.clippingArea.clip},a.writeClippingEnabled=function(e,t){this.clippingArea&&(t.clippingArea||(t.clippingArea={}),t.clippingArea.clip=e)},a.writeLayers=function(e,t,r,i){const o={...i,layerContainerType:"operational-layers"},n=e.map((e=>this.verifyWriteLayer(e,i)?e.write(null,o):null)).filter((e=>!!e));t[r]=n.toArray()},a.verifyWriteLayer=function(e,t){return"write"in e||(t&&t.messages&&t.messages.push(new d("layer:unsupported",`Layers (${e.title}, ${e.id}) of type '${e.declaredClass}' cannot be persisted in web scenes`,{layer:e})),!1)},a.readSourceVersion=function(e,t){const[r,i]=t.version.split(".");return new D.Version(parseInt(r,10),parseInt(i,10))},a.writeSourceVersion=function(e,t,r){t[r]=`${z.major}.${z.minor}`},a.writeAuthoringApp=function(e,t){e&&this._isAuthoringAppSetByUser?t.authoringApp=e:t.authoringApp="ArcGIS API for JavaScript"},a.writeAuthoringAppVersion=function(e,t){e&&this._isAuthoringAppVersionSetByUser?t.authoringAppVersion=e:t.authoringAppVersion=I.version},a.writeGround=function(e,t,r,i){t[r]=e?e.write(null,i):{transparency:0,layers:[]}},a.readInitialViewProperties=function(e,t){const r={};return t.initialState&&t.initialState.environment&&(r.environment=$.fromJSON(t.initialState.environment)),t.spatialReference?r.spatialReference=v.fromJSON(t.spatialReference):r.spatialReference=v.WebMercator,r.viewingMode=t.viewingMode||"global",t.initialState&&t.initialState.viewpoint&&(r.viewpoint=U.fromJSON(t.initialState.viewpoint)),new B(r)},a.load=function(e){return this.addResolvingPromise(this._loadFromSource()),Promise.resolve(this)},a.loadAll=function(){return O.loadAll(this,(e=>{const t=this.presentation&&this.presentation.slides;e(this.ground,this.basemap,this.layers,t&&t.map((e=>e.basemap)))}))},a.read=function(e,t){t={...t,origin:"web-scene"};const i=this._isAuthoringAppVersionSetByUser,o=this._isAuthoringAppSetByUser;if(f.readLoadable(this,e,(t=>r.prototype.read.call(this,e,t)),t),o||(this._isAuthoringAppSetByUser=!1),i||(this._isAuthoringAppVersionSetByUser=!1),e.baseMap&&Array.isArray(e.baseMap.elevationLayers)&&this.sourceVersion.supportsVisibleElevationLayersInSlides){const t=e.baseMap.elevationLayers.map((e=>({id:e.id}))),r=this.presentation.slides,i=(e,t)=>e.visibleLayers.some((e=>e.id===t)),o=t.filter((e=>!r.some((t=>i(t,e.id)))));r.forEach((e=>{e.visibleLayers.addMany(o)}))}},a._writeBasemapElevationLayers=function(e){const t=e.ground&&e.ground.layers;!e.baseMap&&t&&t.length&&(e.baseMap={title:"Basemap",baseMapLayers:[]}),e.baseMap&&(e.baseMap.elevationLayers=o.clone(t))},a.write=function(e,t){var i;if("loaded"!==this.loadStatus){const e=new d("webscene:not-loaded","Web scene must be loaded before it can be serialized");throw H.error("#toJSON()","Web scene must be loaded before it can be serialized",this.loadError||this.loadStatus),e}this._runLayersIdGC();const o=!(null!=(i=t)&&i.messages);t={messages:[],...t,origin:"web-scene"};const n=r.prototype.write.call(this,e,t);if(o){const e=t.messages.filter((e=>"web-document-write:property-required"===e.name));if(e.length){const t=new d("web-document:property-required","One or more properties that are required in the webscene JSON are missing, see details for the specific errors",{errors:e});throw H.error("#toJSON()","One or more properties that are required in the webscene JSON are missing",e),t}}return this._writeBasemapElevationLayers(n),n},a.save=async function(e){return this.debouncedSaveOperations(0,e)},a._saveImpl=async function(e){this.portalItem||(H.error("save(): requires the .portalItem property to be set"),await Promise.reject(new d("webscene:portal-item-not-set","Portal item to save to has not been set on the WebScene"))),this.portalItem.type!==X&&await Promise.reject(new d("webscene:portal-item-wrong-type",`Portal item needs to have type "${X}"`));const t=this._updateFromPromise;await this._ensureLoadBeforeSave();const r=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:this.portalItem.itemUrl&&h.urlToObject(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||P.getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}}),i=this.write(null,r);return await Promise.all(r.resources.pendingOperations),await this._verifySave(i,r,e),this._updateTypeKeywords(this.portalItem),await this.portalItem.update({data:i}),await J.saveResources(this.resourceReferences,r,null),E.updateOrigins(r),t&&await t,await this._saveThumbnail(),this.portalItem},a.saveAs=async function(e,t){return this.debouncedSaveOperations(1,t,e)},a._saveAsImpl=async function(e,t){let r=L.from(e);r||(H.error("saveAs(portalItem): requires a portal item parameter"),await Promise.reject(new d("webscene:portal-item-required","saveAs requires a portal item to save to"))),r.id&&(r=r.clone(),r.id=null);const i=r.portal||P.getDefault();await this._ensureLoadBeforeSave(),r.type=X,r.portal=i;const o=this._enableVerifyItemRelativeUrls({origin:"web-scene",url:null,messages:[],portal:i,portalItem:r,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}}),n=this.write(null,o);await Promise.all(o.resources.pendingOperations),await this._verifySaveAs(n,o,t);const a=this.thumbnailUrl,s=!this._isOverridden("thumbnailUrl");return this._updateTypeKeywords(r),await i._signIn(),await i.user.addItem({item:r,folder:t&&t.folder,data:n}),await J.saveResources(this.resourceReferences,o,null),this.portalItem=r,j.MultiOriginJSONSupport.prototype.read.call(this,{version:n.version,authoringApp:n.authoringApp,authoringAppVersion:n.authoringAppVersion},{name:"web-scene",ignoreDefaults:!0,url:r.itemUrl&&h.urlToObject(r.itemUrl)}),E.updateOrigins(o),a&&(this.thumbnailUrl=s?h.addQueryParameter(a,"w","8192"):a),o.portalItem=r,await this._saveThumbnail(),r},a._saveThumbnail=async function(){this._isOverridden("thumbnailUrl")&&(await this.portalItem.updateThumbnail({thumbnail:this.thumbnailUrl}),this._clearOverride("thumbnailUrl"),this.clear("thumbnailUrl","user"))},a._verifySave=function(t,r,i,o=!1){if(!g.isEarth(this.spatialReference))return Promise.reject(new d("webscene:unsupported-spatial-reference","Webscenes using spatial reference systems from Mars or Moon can not be saved currently."));let n,a=r.messages.filter((e=>"error"===e.type)).map((e=>new d(e.name,e.message,e.details)));r.blockedRelativeUrls&&(a=a.concat(r.blockedRelativeUrls.map((e=>new d("url:unsupported",`Relative url '${e}' is not supported in Web Scene`))))),i&&i.ignoreUnsupported&&(a=a.filter((e=>"layer:unsupported"!==e.name&&"symbol:unsupported"!==e.name&&"symbol-layer:unsupported"!==e.name&&"property:unsupported"!==e.name&&"url:unsupported"!==e.name&&"scenemodification:unsupported"!==e.name))),null!=i&&i.requiredPropertyChecksDisabled&&(a=a.filter((e=>"web-document-write:property-required"!==e.name)));const s=i&&i.strictSchemaValidationEnabled;return n=s?new Promise((function(t,r){e(["./webscene/support/schemaValidator"],t,r)})).then((e=>{const r=e.validate(t);if(r.length>0){const e=`webscene did not validate:\n${r.join("\n")}`;H.error(`${o?"saveAs":"save"}(): ${e}`)}return r.map((e=>new d("webscene:schema-validation",e)))})).then((e=>{if(s&&e.length>0){throw W.createSchemaValidationError(e.concat(a))}return a})):Promise.resolve(a),n.then((e=>{if(e.length>0)return Promise.reject(new d("webscene:save","Failed to save webscene due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:e}))}))},a._verifySaveAs=function(e,t,r){return this.canSaveAs(t)?Promise.reject(W.createCopyError()):this._verifySave(e,t,r,!0)},a.verifySaveAs=function(e){const t=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),r=this.write(null,t);return this._verifySaveAs(r,t,e)},a.canSaveAs=function(e){return e||(e=this._enableVerifyItemRelativeUrls({origin:"web-scene",messages:[]}),this.write(null,e)),e.verifyItemRelativeUrls&&e.verifyItemRelativeUrls.writtenUrls.length>0},a.updateFrom=async function(e,t={}){const r=this._updateFromInternal(e,t);this._updateFromPromise=r,await r;this._updateFromPromise===r&&(this._updateFromPromise=null)},a._updateFromInternal=async function(e,t={}){await e.whenReady(),!t.environmentExcluded&&e.environment&&(this.initialViewProperties.environment=$.prototype.clone.apply(e.environment)),!t.viewpointExcluded&&e.viewpoint&&(this.initialViewProperties.viewpoint=e.viewpoint.clone()),this.initialViewProperties.spatialReference=e.spatialReference.clone(),this.initialViewProperties.viewingMode=e.viewingMode,e.clippingArea?e.clippingArea!==this.clippingArea&&(this.clippingArea=e.clippingArea.clone(),this.clippingEnabled=!0):this.clippingEnabled=!1,e.heightModelInfo&&(this.heightModelInfo=e.heightModelInfo.clone()),e.map===this&&e.allLayerViews.forEach((e=>{e.layer.visible=e.visible})),(!1===t.thumbnailExcluded||null==t.thumbnailExcluded&&!t.viewpointExcluded)&&await this._updateFromThumbnail(e,t.thumbnailSize||void 0)},a._updateFromThumbnail=async function(e,t){const r=T.getOptimalThumbnailSize(e,t),i=await e.takeScreenshot({format:"jpg",width:r.width,height:r.height,disableDecorations:!0});this.thumbnailUrl=i.dataUrl},a._loadFromSource=function(){return this.resourceInfo?this._loadFromJSON(this.resourceInfo,{origin:"web-scene"}):this.portalItem&&this.portalItem.id?this._loadFromItem(this.portalItem):this._loadObjectsWithLayers()},a._readAndLoadFromJSON=function(e,t){const r=this._validateJSON(e);return this.read(r,t),this._loadFromJSON(r,t)},a._extractOperationalLayers=function(e){const t=[];if(!this.sourceVersion.supportsGround&&e.baseMap&&Array.isArray(e.baseMap.elevationLayers))for(const o of e.baseMap.elevationLayers)t.push(o);const r=[],i=e=>(e.layers&&(e.layers=e.layers.filter(i)),"ArcGISTiledElevationServiceLayer"!==e.layerType||(this.sourceVersion.supportsGround||r.push(e),!1));return{operationalLayers:e.operationalLayers?e.operationalLayers.filter(i):[],operationalElevationLayers:r,basemapElevationLayers:t}},a._loadFromJSON=function(t,r){const i=new S;return this._validateSpatialReference().then((()=>this._validateHeightModelInfo())).then((()=>new Promise((function(t,r){e(["./layers/support/layersCreator"],t,r)})))).then((({populateOperationalLayers:e})=>{const{operationalLayers:o,operationalElevationLayers:n,basemapElevationLayers:a}=this._extractOperationalLayers(t),s=[],l={context:{...r,layerContainerType:"operational-layers"}};if(this.portalItem&&(l.context.portal=this.portalItem.portal||P.getDefault()),a.length>0){const t={...l,context:{...l.context,layerContainerType:"ground"}};t.defaultLayerType="ArcGISTiledElevationServiceLayer",s.push(e(this.ground.layers,a,t))}if(n.length>0){const t={...l,context:{...l.context,layerContainerType:"ground"}};t.defaultLayerType="ArcGISTiledElevationServiceLayer",s.push(e(i,n,t))}return o&&o.length>0&&s.push(e(this.layers,o,l)),w.eachAlways(s).then((()=>{}))})).then((()=>this._loadObjectsWithLayers())).then((()=>{this.ground.layers.addMany(i)}))},a._ensureLoadBeforeSave=async function(){await this.load(),await this._loadObjectsWithLayers();const e=[];for(const t of this.allLayers.items)if("beforeSave"in t&&"function"==typeof t.beforeSave){const r=t.beforeSave();r&&e.push(r)}await w.eachAlways(e)},a._loadObjectsWithLayers=async function(){const e=[];this.ground&&e.push(this.ground.load()),this.basemap&&e.push(this.basemap.load()),this.presentation.slides.forEach((t=>{t.basemap&&e.push(t.basemap.load())})),await w.eachAlways(e)},a._loadFromItem=async function(e){if(await e.load().catch((e=>{throw new d("webscene:load-portal-item","Failed to load portal item",{error:e})})),"Web Scene"!==e.type)throw new d("webscene:invalid-portal-item","Invalid portal item type '${type}', expected 'Web Scene'",{type:e.type});const t=await e.fetchData();this.resourceInfo=t;const r={origin:"web-scene",url:h.urlToObject(e.itemUrl),portal:e.portal||P.getDefault(),portalItem:e,readResourcePaths:[]};await this._readAndLoadFromJSON(t,r),this.resourceReferences={portalItem:e,paths:r.readResourcePaths}},a._validateSpatialReference=function(){const e=this.initialViewProperties,t=this._sceneSpatialReference;let r;if("local"!==e.viewingMode){if(!F.isSpatialReferenceSupported(t,"global"))return Promise.reject(new d("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in global mode, only Web Mercator, WGS84 GCS or CGCS2000 are supported",{spatialReference:t,viewingMode:e.viewingMode}));r=e=>!e||G.canProjectWithoutEngine(e,t)}else{if(!F.isSpatialReferenceSupported(t,"local"))return Promise.reject(new d("webscene:unsupported-spatial-reference","Unsupported spatial reference (${spatialReference.wkid}) in local mode, only projected coordinate systems are supported",{spatialReference:t,viewingMode:e.viewingMode}));r=e=>!e||e.equals(t)}const i=e=>e&&(n.isSome(e.camera)&&e.camera.position&&e.camera.position.spatialReference||n.isSome(e.targetGeometry)&&e.targetGeometry.spatialReference),o=e.viewpoint,a=i(o);if(a&&!r(a))return Promise.reject(new d("webscene:incompatible-camera-spatial-reference","Camera spatial reference (${cameraSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{cameraSpatialReference:a,sceneSpatialReference:t,viewingMode:e.viewingMode}));const s=this.presentation.slides.find((e=>!r(i(e.viewpoint))));if(s){const r=i(s.viewpoint);return Promise.reject(new d("webscene:incompatible-slide-spatial-reference","Slide spatial reference (${slideSpatialReference.wkid}) is incompatible with the scene spatial reference (${sceneSpatialReference.wkid})",{slideSpatialReference:r,sceneSpatialReference:t,viewingMode:e.viewingMode}))}return Promise.resolve()},a._validateHeightModelInfo=function(){const e=this._sceneSpatialReference,t=k.validateWebSceneError(this.heightModelInfo,e);return t?Promise.reject(t):Promise.resolve()},a._validateJSON=function(e){const t=D.Version.parse(e.version||"","webscene");return z.validate(t),e.version=`${t.major}.${t.minor}`,1===t.major&&t.minor<=2&&(e.spatialReference=v.WebMercator.toJSON()),e},a._updateTypeKeywords=function(e){"local"===this.initialViewProperties.viewingMode?e.typeKeywords?-1===e.typeKeywords.indexOf(Y)&&e.typeKeywords.push(Y):e.typeKeywords=[Y]:"global"===this.initialViewProperties.viewingMode&&e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter((e=>e!==Y))),e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter(((e,t,r)=>r.indexOf(e)===t)))},a._enableVerifyItemRelativeUrls=function(e){const t=this._verifyItemRelativeRootPath;return t&&(e.verifyItemRelativeUrls={rootPath:t,writtenUrls:[]}),e},a._unscheduleLayersIdGC=function(){this._layersIdGCTimeoutId&&(clearTimeout(this._layersIdGCTimeoutId),this._layersIdGCTimeoutId=0)},a._scheduleLayersIdGC=function(){this._unscheduleLayersIdGC(),this._layersIdGCTimeoutId=setTimeout((()=>{this._layersIdGCTimeoutId=0,this._runLayersIdGC()}),3e3)},a._runLayersIdGC=function(){this._unscheduleLayersIdGC();const e=this.applicationProperties&&this.applicationProperties.viewing&&this.applicationProperties.viewing.search,t=e=>!!this.allLayers.find((t=>t.id===e));e&&e.layers&&(e.layers=e.layers.filter((e=>t(e.id))));const r=this.presentation&&this.presentation.slides;r&&r.forEach((e=>{e.visibleLayers&&(e.visibleLayers=e.visibleLayers.filter((e=>t(e.id))))}))},i.fromJSON=function(e){if(!e)throw new d("webscene:empty-resource","Expected a JSON resource but got nothing");return new this({resourceInfo:e})},t._createClass(i,[{key:"thumbnailUrl",get:function(){return this.portalItem&&this.portalItem.thumbnailUrl||null},set:function(e){e?this._override("thumbnailUrl",e):(this._clearOverride("thumbnailUrl"),this.clear("thumbnailUrl","user"))}},{key:"authoringApp",set:function(e){this._isAuthoringAppSetByUser=!0,this._set("authoringApp",e)}},{key:"authoringAppVersion",set:function(e){this._isAuthoringAppVersionSetByUser=!0,this._set("authoringAppVersion",e)}},{key:"spatialReference",get:function(){var e,t;return null!=(e=null==(t=this.initialViewProperties)?void 0:t.spatialReference)?e:v.WebMercator}},{key:"viewingMode",get:function(){var e,t;return null!=(e=null==(t=this.initialViewProperties)?void 0:t.viewingMode)?e:"global"}},{key:"_sceneSpatialReference",get:function(){return this.initialViewProperties.spatialReference||v.WebMercator}},{key:"_verifyItemRelativeRootPath",get:function(){return this.portalItem&&this.portalItem.itemUrl?h.urlToObject(this.portalItem.itemUrl).path:null}}]),i}(R.LoadableMixin(A.EsriPromiseMixin(j.MultiOriginJSONMixin(V))));return Z.VERSION=z,r.__decorate([l.property({type:x,json:{write:!0}})],Z.prototype,"applicationProperties",void 0),r.__decorate([l.property({json:{read:{source:"baseMap"},write:{target:"baseMap"}}})],Z.prototype,"basemap",void 0),r.__decorate([l.property({type:b,json:{read:{source:"clippingArea.geometry",reader:_.fromJSON},write:{target:"clippingArea.geometry"}}})],Z.prototype,"clippingArea",void 0),r.__decorate([u.writer("clippingArea")],Z.prototype,"writeClippingArea",null),r.__decorate([l.property({type:Boolean,json:{write:{target:"clippingArea.clip"}}})],Z.prototype,"clippingEnabled",void 0),r.__decorate([p.reader("clippingEnabled",["clippingArea"])],Z.prototype,"readClippingEnabled",null),r.__decorate([u.writer("clippingEnabled")],Z.prototype,"writeClippingEnabled",null),r.__decorate([l.property({type:C,json:{read:{source:"mapFloorInfo"},write:{target:"mapFloorInfo"}}})],Z.prototype,"floorInfo",void 0),r.__decorate([l.property({type:N,json:{write:!0}})],Z.prototype,"heightModelInfo",void 0),r.__decorate([l.property({json:{write:{target:"operationalLayers",ignoreOrigin:!0}}})],Z.prototype,"layers",void 0),r.__decorate([u.writer("layers")],Z.prototype,"writeLayers",null),r.__decorate([l.property({readOnly:!0,type:D.Version,json:{type:Q(),write:{ignoreOrigin:!0,target:"version",isRequired:!0,overridePolicy:()=>({enabled:!0,allowNull:!0,ignoreOrigin:!0})}}})],Z.prototype,"sourceVersion",void 0),r.__decorate([p.reader("sourceVersion",["version"])],Z.prototype,"readSourceVersion",null),r.__decorate([u.writer("sourceVersion")],Z.prototype,"writeSourceVersion",null),r.__decorate([l.property({json:{read:!1,write:!1}})],Z.prototype,"tables",void 0),r.__decorate([l.property()],Z.prototype,"thumbnailUrl",null),r.__decorate([l.property({type:String,json:{write:{allowNull:!0,ignoreOrigin:!0}}})],Z.prototype,"authoringApp",null),r.__decorate([u.writer("authoringApp")],Z.prototype,"writeAuthoringApp",null),r.__decorate([l.property({type:String,json:{write:{allowNull:!0,ignoreOrigin:!0}}})],Z.prototype,"authoringAppVersion",null),r.__decorate([u.writer("authoringAppVersion")],Z.prototype,"writeAuthoringAppVersion",null),r.__decorate([l.property({json:{write:{isRequired:!0,allowNull:!0,ignoreOrigin:!0,enabled:!0}}})],Z.prototype,"ground",void 0),r.__decorate([u.writer("ground")],Z.prototype,"writeGround",null),r.__decorate([l.property({type:S.ofType(K),json:{write:!0}})],Z.prototype,"transportationNetworks",void 0),r.__decorate([l.property({type:q,nonNullable:!0,json:{write:{ignoreOrigin:!0,writer:(e,t,r,i)=>{if(e.slides&&e.slides.length>0){const r={...i,isPresentation:!0};t.presentation=e.write(null,r)}}}}})],Z.prototype,"presentation",void 0),r.__decorate([l.property({type:B,nonNullable:!0,json:{write:{target:"initialState",isRequired:!0,ignoreOrigin:!0},default:()=>new B({viewingMode:"global",spatialReference:v.WebMercator})}})],Z.prototype,"initialViewProperties",void 0),r.__decorate([p.reader("initialViewProperties",["initialState.environment","spatialReference","viewingMode","initialState.viewpoint"])],Z.prototype,"readInitialViewProperties",null),r.__decorate([l.property({type:v,json:{read:!1,write:{isRequired:!0,ignoreOrigin:!0}}})],Z.prototype,"spatialReference",null),r.__decorate([l.property({type:["local","global"],json:{read:!1,write:{isRequired:!0,ignoreOrigin:!0}}})],Z.prototype,"viewingMode",null),r.__decorate([l.property({type:L})],Z.prototype,"portalItem",void 0),r.__decorate([l.property()],Z.prototype,"resourceInfo",void 0),Z=r.__decorate([c.subclass("esri.WebScene")],Z),Z}));
