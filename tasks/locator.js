// COPYRIGHT © 2021 Esri
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
// See http://js.arcgis.com/3.36/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","dojo/_base/array","dojo/_base/Deferred","dojo/_base/json","dojo/has","../kernel","../request","../deferredUtils","./Task","./AddressCandidate"],(function(e,o,t,n,s,a,r,i,c,l,d){var u=e(l,{declaredClass:"esri.tasks.Locator",_eventMap:{"address-to-locations-complete":["addresses"],"addresses-to-locations-complete":["addresses"],"location-to-address-complete":["address"],"suggest-locations-complete":["suggestions"]},constructor:function(e){this._geocodeHandler=o.hitch(this,this._geocodeHandler),this._geocodeAddressesHandler=o.hitch(this,this._geocodeAddressesHandler),this._reverseGeocodeHandler=o.hitch(this,this._reverseGeocodeHandler),this.registerConnectEvents()},outSpatialReference:null,setOutSpatialReference:function(e){this.outSpatialReference=e},_geocodeHandler:function(e,o,t,n,s){try{var a,r,i,c=e.candidates,l=[],u=c.length,h=e.spatialReference;for(r=0;r<u;r++)(i=(a=c[r]).location)&&(i.spatialReference=h),l[r]=new d(a);this._successHandler([l],"onAddressToLocationsComplete",t,s)}catch(e){this._errorHandler(e,n,s)}},_geocodeAddressesHandler:function(e,o,t,n,s){try{var a,r,i=e.locations,c=[],l=i.length,u=e.spatialReference;for(a=0;a<l;a++)(r=i[a].location)&&(r.spatialReference=u),c[a]=new d(i[a]);this._successHandler([c],"onAddressesToLocationsComplete",t,s)}catch(e){this._errorHandler(e,n,s)}},addressToLocations:function(e,t,a,r,l){var d,u,h,f,_,g,p,m;e.address&&(r=a,a=t,t=e.outFields,l=e.searchExtent,m=e.countryCode,d=e.magicKey,u=e.distance,p=e.categories,e.location&&this.normalization&&(h=e.location.normalize()),f=e.locationType,_=e.maxLocations,g=e.forStorage,e=e.address),l&&(l=l.shiftCentralMeridian());var y=this.outSpatialReference,C=this._encode(o.mixin({},this._url.query,e,{f:"json",outSR:y&&s.toJson(y.toJson()),outFields:t&&t.join(",")||null,searchExtent:l&&s.toJson(l.toJson()),category:p&&p.join(",")||null,countryCode:m||null,magicKey:d||null,distance:u||null,location:h||null,locationType:f||null,maxLocations:_||null,forStorage:g||null})),H=this._geocodeHandler,v=this._errorHandler,x=new n(c._dfdCanceller);return x._pendingDfd=i({url:this._url.path+"/findAddressCandidates",content:C,callbackParamName:"callback",load:function(e,o){H(e,o,a,r,x)},error:function(e){v(e,r,x)}}),x},suggestLocations:function(e){var t,a;a=new n(c._dfdCanceller),e.hasOwnProperty("location")&&this.normalization&&(e.location=e.location.normalize()),e.searchExtent&&(e.searchExtent=e.searchExtent.shiftCentralMeridian()),t=this._encode(o.mixin({},this._url.query,{f:"json",text:e.text,maxSuggestions:e.maxSuggestions,searchExtent:e.searchExtent&&s.toJson(e.searchExtent.toJson()),category:e.categories&&e.categories.join(",")||null,countryCode:e.countryCode||null,location:e.location||null,distance:e.distance||null},{f:"json"}));var r=i({url:this._url.path+"/suggest",content:t,callbackParamName:"callback"});return a._pendingDfd=r,r.then(o.hitch(this,(function(e){var o=e.suggestions||[];this.onSuggestLocationsComplete(o),a.resolve(o)})),o.hitch(this,(function(e){this._errorHandler(e),a.reject(e)}))),a},addressesToLocations:function(e,a,r){var l=this.outSpatialReference,d=[],u=e.categories,h=e.locationType,f=e.countryCode,_=e.addresses;t.forEach(_,(function(e,o){d.push({attributes:e})}));var g=this._encode(o.mixin({},this._url.query,{category:u&&u.join(",")||null,locationType:h||null,sourceCountry:f||null},{addresses:s.toJson({records:d})},{f:"json",outSR:l&&s.toJson(l.toJson())})),p=this._geocodeAddressesHandler,m=this._errorHandler,y=new n(c._dfdCanceller);return y._pendingDfd=i({url:this._url.path+"/geocodeAddresses",content:g,callbackParamName:"callback",load:function(e,o){p(e,o,a,r,y)},error:function(e){m(e,r,y)}}),y},_reverseGeocodeHandler:function(e,o,t,n,s){try{var a=new d({address:e.address,location:e.location,score:100});this._successHandler([a],"onLocationToAddressComplete",t,s)}catch(e){this._errorHandler(e,n,s)}},locationToAddress:function(e,t,a,r){e&&this.normalization&&(e=e.normalize());var l=this.outSpatialReference,d=this._encode(o.mixin({},this._url.query,{outSR:l&&s.toJson(l.toJson()),location:e&&s.toJson(e.toJson()),distance:t,f:"json"})),u=this._reverseGeocodeHandler,h=this._errorHandler,f=new n(c._dfdCanceller);return f._pendingDfd=i({url:this._url.path+"/reverseGeocode",content:d,callbackParamName:"callback",load:function(e,o){u(e,o,a,r,f)},error:function(e){h(e,r,f)}}),f},onSuggestLocationsComplete:function(){},onAddressToLocationsComplete:function(){},onAddressesToLocationsComplete:function(){},onLocationToAddressComplete:function(){}});return a("extend-esri")&&o.setObject("tasks.Locator",u,r),u}));