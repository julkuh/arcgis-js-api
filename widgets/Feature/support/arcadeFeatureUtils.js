/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.18/esri/copyright.txt for details.
*/
define(["require","exports","../../../core/Logger","../../../core/promiseUtils","./featureUtils"],(function(e,t,r,a,s){"use strict";const i=["$datastore","$map","$layer"],n=r.getLogger("esri.widgets.Feature.support.arcadeFeatureUtils");async function o({expressionAttributes:e,info:t,arcadeUtils:r,spatialReference:a,map:o,graphic:c}){const p=`expression/${t.name}`,l=r.createSyntaxTree(t.expression),u=i.filter((e=>r.hasVariable(l,e)));await r.loadScriptDependencies(l,!0,u);const f=r.getViewInfo({spatialReference:a}),d=r.createExecContext(c,f);d.useAsync=!0,function({arcadeUtils:e,featureSetVars:t,context:r,viewInfo:a,map:s,graphic:i}){t.forEach((t=>{const n=t.toLowerCase(),o={map:s,spatialReference:a.sr};"$map"===n&&(r.vars[n]=e.convertMapToFeatureSetCollection(o)),"$layer"===n&&(r.vars[n]=e.convertFeatureLayerToFeatureSet(i.sourceLayer,a.sr)),"$datastore"===n&&(r.vars[n]=e.convertServiceUrlToWorkspace(i.sourceLayer.url,a.sr))}))}({arcadeUtils:r,featureSetVars:u,context:d,viewInfo:f,map:o,graphic:c});const g=r.createFunction(l,d),y=await r.executeAsyncFunction(g,d).catch((e=>n.error("arcade-execution-error",{error:e,graphic:c,expressionInfo:t})));var m;e[p]="string"==typeof y?s.applyTextFormattingHTML(s.htmlEntities(y)):Array.isArray(y)?function(e){return`<ul class="esri-widget__list">${e.map((e=>`<li>${"string"==typeof e?s.applyTextFormattingHTML(s.htmlEntities(e)):e}</li>`)).join("")}</ul>`}(y):y&&"esri.arcade.Dictionary"===y.declaredClass?`<table class="esri-widget__table">${(m=y).keys().map((e=>{const t=m.field(e);return`<tr><th>${e}</th><td>${"string"==typeof t?s.applyTextFormattingHTML(s.htmlEntities(t)):t}</td></tr>`})).join("")}</table>`:y}t.createFormattedExpressions=async function({popupTemplate:t,spatialReference:r,graphic:s,map:i}){const n=t.expressionInfos,c=[],p={};if(!n||!n.length)return p;const l=await new Promise((function(t,r){e(["../../../support/arcadeUtils"],t,r)}));for(const e of n)c.push(o({expressionAttributes:p,info:e,arcadeUtils:l,spatialReference:r,map:i,graphic:s}));return await a.eachAlways(c),p},Object.defineProperty(t,"__esModule",{value:!0})}));