// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["../../request","../../core/lang","./WMBaseTask","./support/Enum","./support/Util"],function(e,t,n,a,i){var s=new a,r=new i;return n.createSubclass({declaredClass:"esri.tasks.workflow.NotificationTask",properties:{url:{}},subscribeToNotification:function(e,t){var n={email:e.email,user:r._formatDomainUsername(e.user)};return this._sendRequest(n,"/notificationTypes/"+e.notificationTypeId+"/subscribe",t)},unsubscribeFromNotification:function(e,t){var n={email:e.email,user:r._formatDomainUsername(e.user)};return this._sendRequest(n,"/notificationTypes/"+e.notificationTypeId+"/unsubscribe",t)},sendNotification:function(e,t){var n={type:e.notificationType,user:r._formatDomainUsername(e.user)};return this._sendRequest(n,"/jobs/"+e.jobId+"/sendNotification",t)},getAllChangeRules:function(n){var a=this.parsedUrl.path+"/spatialNotification/changeRules",i=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),s=this._generateOptions(i,n);return e(a,s).then(function(e){var t=e.data.changeRules;return this._handleChangeRulesResponse(t),t}.bind(this))},getChangeRule:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/changeRules/"+n,s=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),r=this._generateOptions(s,a);return e(i,r).then(function(e){var t=e.data;return t.evaluators=this._handleEvaluatorsResponse(t.evaluators),t}.bind(this))},queryChangeRules:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/changeRules/query",s={f:"json"};n.name&&(s.name=n.name),n.description&&(s.description=n.description),n.searchType&&(s.searchType=n.searchType),n.user&&(s.user=r._formatDomainUsername(n.user));var o=this._encode(t.mixin({},this.parsedUrl.query,s)),u=this._generateOptions(o,a);return e(i,u).then(function(e){var t=e.data.changeRules;return this._handleChangeRulesResponse(t),t}.bind(this))},addChangeRule:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/changeRules/add",s=n.rule,o={name:s.name,notifier:JSON.stringify(s.notifier),user:r._formatDomainUsername(n.user)};s.description&&(o.description=s.description),s.summarize&&(o.summarize=s.summarize),s.evaluators&&(s.evaluators=this._handleEvaluatorsRequest(s.evaluators),o.evaluators=JSON.stringify(s.evaluators));var u=this._encode(t.mixin({},this.parsedUrl.query,o)),h=this._generateOptions(u,a);return e(i,h).then(function(e){return e.data.changeRuleId})},deleteChangeRule:function(e,t){var n={user:r._formatDomainUsername(e.user)};return this._sendRequest(n,"/spatialNotification/changeRules/"+e.ruleId+"/delete",t)},getDatabaseTime:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/time/"+n,s=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(s,a);return e(i,o).then(function(e){return r._convertToDate(e.data.time)})},runSpatialNotificationOnHistory:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/runOnHistory",s={dataWorkspaceId:n.dataWorkspaceId,user:r._formatDomainUsername(n.user),f:"json"};n.from&&(s.from=Date.parse(n.from)),n.to&&(s.to=Date.parse(n.to)),n.logMatches&&(s.logMatches=n.logMatches),n.send&&(s.send=n.send);var o=this._encode(t.mixin({},this.parsedUrl.query,s)),u=this._generateOptions(o,a);return e(i,u).then(function(e){return e.data.sessionId})},getChangeRuleMatch:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/matches/"+n,s=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(s,a);return e(i,o).then(function(e){return e.data.changeTime=r._convertToDate(e.data.changeTime),e.data})},getSessionMatches:function(n,a){var i=this.parsedUrl.path+"/spatialNotification/esssions/"+n,s=this._encode(t.mixin({},this.parsedUrl.query,{f:"json"})),o=this._generateOptions(s,a);return e(i,o).then(function(e){for(var t=e.data.matches,n=0;n<t.length;n++){var a=t[n];a.changeTime=r._convertToDate(a.changeTime)}return t})},notifySession:function(e,t){var n={user:r._formatDomainUsername(e.user)};return e.deleteAfter&&(n.deleteAfter=e.deleteAfter),this._sendRequest(n,"/spatialNotification/sessions/"+e.sessionId+"/notify",t)},_handleChangeRulesResponse:function(e){if(e)return e.forEach(function(e){e.evaluators&&(e.evaluators=this._handleEvaluatorsResponse(e.evaluators))}.bind(this)),e},_handleEvaluatorsResponse:function(e){if(e)return e.forEach(function(e){e.relation&&(e.relation=s.spatialRelJsonDict.fromJSON(e.relation))}),e},_handleEvaluatorsRequest:function(e){if(e)return e.forEach(function(e){e.relation&&(e.relation=s.spatialRelJsonDict.toJSON(e.relation))}),e}})});