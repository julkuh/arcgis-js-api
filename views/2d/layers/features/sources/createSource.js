/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["exports","../../../../../layers/support/arcgisLayerUrl","./DrillDownFeatureSource","./GeoEventSource","./PagedFeatureSource"],(function(e,t,r,n,o){"use strict";e.createSource=function(e,c,u,s,a){const i=function(e,r,n,o,c){switch(e.type){case"stream":return{type:"geoevent",serviceInfo:e,onRequest:o,outSR:r,canAcceptRequest:c};case"memory":case"on-demand":return{type:"feature",serviceInfo:e,onRequest:o,outSR:r,origin:u(e.source),tileInfoView:n,canAcceptRequest:c}}function u(e){return Array.isArray(e)?"local":"path"in e&&t.isHostedAgolService(e.path)?"hosted":"unknown"}}(e,c,u,s,a);switch(i.type){case"feature":switch(i.origin){case"hosted":case"local":return new o.PagedFeatureSource(i);case"unknown":return new r.DrillDownFeatureSource(i)}case"geoevent":return new n.GeoEventSource(i)}},Object.defineProperty(e,"__esModule",{value:!0})}));