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

define(["./utils","dojo/i18n!esri/nls/jsapi"],(function(e,t){t=t.geoenrichment.dijit.ReportPlayer.ReportPlayer;var a={};function i(e){Object.keys(e).forEach((function(t){var a=e[t];null==a&&delete e[t]}))}a.NUMBER="n/",a.createFieldInfoFromCalculator=function(t,a,r){if(!t)return null;var l="function"==typeof t.getDescriptionWithType?t:null,n=l?l.variable:t,s=r&&r.format,o=r&&r.autoformatCurrency,u=r&&r.additionalText,d=r&&r.calculatorName,f=r&&r.defaultDistanceUnits,m=r&&r.summaryType,p=l&&l.getToggleGroup&&l.getToggleGroup(),c={alias:l?l.getDescriptionWithType()||l.getAliasWithType():n.description||n.alias,hasVariable:!0,variableID:n.id,fullName:n.fullName,fieldCategory:n.fieldCategory,vintage:n.vintage,type:n.type,statefulName:p?p.value:"n/"+n.fullName,summaryType:m},F=l?l.getCalcType().charAt(0):"n";return c.name=e.name.createFieldNameFromSource(n,F),s?e.format.setFieldInfoFormat(c,s):(c.decimals=n.precision,c.showCurrency=!(!o||"n"!==F||!n.units||"CURRENCY"!==n.units.toUpperCase()),c.showPercent=!c.showCurrency&&("p"===F||"n"===F&&n.units&&"PCT"===n.units.toUpperCase()),c.useThousandsSeparator=!0),n.isWebMap&&(c.isWebMap=!0,c.webMapFieldName=n.fieldName,c.webMapField=n.fieldInfo,c.webMapId=n.webMapId,c.layerUrl=n.layerUrl,!s&&n.fieldInfo&&n.fieldInfo.format&&(c.decimals=n.fieldInfo.format.places,c.useThousandsSeparator=!1!==n.fieldInfo.format.digitSeparator)),n.customDataCollection&&(c.isCustomDataCollection=!0,c.customDataCollectionId=n.customDataCollection.id,c.customDataCollectionUrl=n.customDataCollection.url,c.customDataCollectionPortalUrl=n.customDataCollection.portalUrl),n.isSiteAttribute&&(c.isSiteAttribute=!0,c.attribute=n.attribute,c.type=n.attribute.type,!s&&n.attribute.places>0&&(c.decimals=n.attribute.places)),n.isDataLayerAttribute&&(c.isDataLayerAttribute=!0,c.layerID=n.layerID,c.layerUrl=n.layerUrl,c.layerName=n.layerName,c.attribute=n.attribute,c.type=n.attribute.type,!s&&n.attribute.decimals>0&&(c.decimals=n.attribute.decimals),"DISTANCE"===n.attribute.name&&(c.units=n.attribute.units||f||"esriMiles")),"string"==typeof u&&(c.additionalText=u),c.usedFields=n.usedFields,c.expressionText=n.expressionText,e.name.provideQualifiedFieldInfoTemplateName(c,d),i(c),c},a.fieldInfoToVariable=function(e){if(!e.hasVariable)return null;var t={id:e.variableID,fullName:e.fullName,fieldCategory:e.fieldCategory,vintage:e.vintage,type:e.type,precision:e.decimals,usedFields:e.usedFields,expressionText:e.expressionText};return e.isWebMap&&(t.isWebMap=!0,t.fieldName=e.webMapFieldName,t.fieldInfo=e.webMapField,t.webMapId=e.webMapId,t.layerUrl=e.layerUrl),e.isSiteAttribute&&(t.isSiteAttribute=!0,t.attribute=e.attribute),t},a.createFieldInfoFromScript=function(a,r){var l=r&&r.format,n=r&&r.additionalText,s=r&&r.calculatorName;(a=a||{}).name=a.name||e.name.DEFAULT_SCRIPT_NAME,a.alias=a.alias||t.scriptNameDefault,a.decimals=Number(a.decimals)||0;var o={};return o.name=e.name.createFieldNameFromScript(a),e.name.provideQualifiedFieldInfoTemplateName(o,s),o.script=a,l?e.format.setFieldInfoFormat(o,l):(o.decimals=Number(a.decimals),o.showCurrency=!1,o.showPercent=!1,o.useThousandsSeparator=!0),"string"==typeof n&&(o.additionalText=n),i(o),o},a.createFieldInfoFromImage=function(e,t){return{isImage:!0,imageJson:e,triggerJson:t}},a.createFieldInfoFromMap=function(e){return{isMap:!0,mapJson:e}},a.createFieldInfoFromShape=function(e){return{isShape:!0,shapeJson:e}},a.createFieldInfoFromChart=function(e){return{isChart:!0,chartJson:e}},a.createFieldInfoFromInfographic=function(e){return{isInfographic:!0,infographicJson:e}},a.createFieldInfoFromSection=function(e){return{isReportSection:!0,sectionJson:e}},a.createFieldInfoFromMissingVariable=function(e,t){return{name:e&&e.substr(e.indexOf(".")+1),templateName:e,isMissing:!0,alias:t}},a.createFieldInfoForUnsupportedContent=function(){return{isUnsupportedContent:!0}};var r=/^\[\w+\]$/,l=/\[\w+\]/;a.createFieldInfoFromLabel=function(t,i){if("string"!=typeof t)return null;t=t.trim();var n=r.test(t);return!i||n?n?(t=t.replace(/\[|\]/g,"").toUpperCase(),a.createFieldInfoFromSpecialFieldName(e.fields.uiToTemplate(t))):null:l.test(t)?e.richText.createFieldInfoFromRenderedXMLString(t):null},a.createFieldInfoFromSpecialFieldName=function(t,a){if("string"!=typeof t)return null;var i,r=(t=e.fields.trimTemplateHeaderName(t)).toUpperCase();if("GROUPCOUNT"===r)i={name:e.fields.GROUPCOUNT_FIELD_NAME,alias:e.fields.GROUPCOUNT_FIELD_ALIAS,type:"esriFieldTypeInteger"};else if("LOCATORSUMMARY"===r)i={name:e.fields.LOCATORSUMMARY_FIELD_NAME,alias:e.fields.LOCATORSUMMARY_FIELD_ALIAS,type:"esriFieldTypeDouble",templateName:e.fields.LOCATORSUMMARY_FIELD_NAME},a&&Object.assign(i,e.format.processFieldInfoTagAttributes({m:"string"==typeof a?a:e.format.buildFormatStringFromObject(a)}));else if("CURRDATE"===r)i={name:e.fields.DATE_FIELD_NAME,alias:e.fields.DATE_FIELD_ALIAS,format:a||e.fields.DATE_FIELD_DEFAULT_FORMAT};else if("SITENOTES"===r)i={name:e.fields.qualifyTemplateHeaderName(e.fields.SITENOTES_FIELD_NAME),alias:e.fields.SITENOTES_FIELD_ALIAS,type:"esriFieldTypeString"};else if(0===r.indexOf("SITENOTE")){var l=e.fields.getSiteNoteFieldNameAt(r.replace("SITENOTE",""));i={name:e.fields.qualifyTemplateHeaderName(l),alias:l,type:"esriFieldTypeString"}}if(i)return i;var n=e.fields.templateToUIHeader(r);if(n)i={name:e.fields.qualifyTemplateHeaderName(r),alias:n,type:"esriFieldTypeString"},e.fields.isChartAttribute(r)&&(i.isChartAttribute=!0),"CHART_POINT_VALUE"===r&&(i.type="esriFieldTypeDouble",i.decimals=0,i.useThousandsSeparator=!0,a&&e.format.setFieldInfoFormat(i,a));else{var s=e.fields.templateToUIReportVar(r);s&&(i={name:s,alias:s,type:"esriFieldTypeString"})}return i&&(i.templateName=i.name),i};var n=/_P$/i;return a.isFieldInfoInPercentState=function(e){return!!e&&(e.statefulName&&("p"===e.statefulName.charAt(0)||n.test(e.statefulName))||e.alias&&-1!==e.alias.indexOf("(%)"))},a}));