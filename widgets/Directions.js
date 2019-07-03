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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","dojo/i18n!../nls/common","dojo/i18n!./Directions/nls/Directions","../intl","../moment","../core/Collection","../core/events","../core/Handles","../core/watchUtils","../core/accessorSupport/decorators","./Search","./Widget","./Directions/DirectionsViewModel","./Directions/support/CostSummary","./Directions/support/DatePicker","./Directions/support/directionsUtils","./Directions/support/maneuverUtils","./Directions/support/RouteSections","./Directions/support/TimePicker","./support/widget"],function(e,t,r,o,i,s,n,a,l,c,d,u,p,h,v,_,m,g,S,y,f,w,T,x){function b(e){return e.results[0].results[0]}function M(){return[{},{}]}function C(e){var t=e.getTimezoneOffset(),r=t>0?"-":"+",o=Math.abs(Math.floor(t/60)),i=Math.abs(Math.floor(t)%60);return"GMT"+r+a.formatNumber(o,H)+a.formatNumber(i,H)}var I="now",k={base:"esri-directions esri-widget esri-widget--panel",directionsButton:"esri-directions__button",clearRouteButton:"esri-directions__clear-route-button",scroller:"esri-directions__scroller",panelContent:"esri-directions__panel-content",panelContentLoading:"esri-directions__panel-content--loading",panelContentError:"esri-directions__panel-content--error",panelContentSignIn:"esri-directions__panel-content--sign-in",loader:"esri-directions__loader",message:"esri-directions__message",travelModeSelect:"esri-directions__travel-modes-select",departureTime:"esri-directions__departure-time",departureTimeSelect:"esri-directions__departure-time-select",directionsSection:"esri-directions__directions-section",departureTimeControls:"esri-directions__departure-time-controls",section:"esri-directions__section",summary:"esri-directions__summary",stopIcon:"esri-directions__stop-icon",interactiveStopIcon:"esri-directions__stop-icon--interactive",removeStopButton:"esri-directions__remove-stop",removeStop:"esri-directions__remove-stop-icon",reverseStops:"esri-directions__reverse-stops",stopIconContainer:"esri-directions__stop-icon-container",lastStopIconContainer:"esri-directions__stop-icon-container--last",stopHandle:"esri-directions__stop-handle",stopInput:"esri-directions__stop-input",stopOptions:"esri-directions__stop-options",stopUnderline:"esri-directions__stop-underline",underlineDragInProcess:"esri-directions__stop-underline--drag-in-process",stopHandleIcon:"esri-directions__stop-handle-icon",verticalSplitter:"esri-directions__vertical-splitter",stopRow:"esri-directions__stop-row",stopRowGhost:"esri-directions__stop-row-ghost",stopRowDragged:"esri-directions__stop-row--dragged",stopRowDropTarget:"esri-directions__stop-row--target",validStopRow:"esri-directions__stop-row--valid",stops:"esri-directions__stops",addStop:"esri-directions__add-stop",addStopText:"esri-directions__add-stop-text",directionCosts:"esri-directions__costs",costsDetails:"esri-directions__costs-details",primaryCosts:"esri-directions__costs-value",secondaryCosts:"esri-directions__other-costs-total",routeActions:"esri-directions__route-actions",maneuvers:"esri-directions__maneuvers",maneuverList:"esri-directions__maneuver-list",maneuverSection:"esri-directions__maneuver-section",maneuverSectionHeader:"esri-directions__maneuver-section-header",maneuverSectionHeaderButton:"esri-directions__maneuver-section-header-toggle-button",maneuverSectionTitle:"esri-directions__maneuver-section-title",collapsibleSection:"esri-directions__maneuver-section--collapsible",maneuverSectionToggle:"esri-directions__maneuver-section-toggle",maneuver:"esri-directions__maneuver",maneuverActive:"esri-directions__maneuver--active",maneuverCosts:"esri-directions__maneuver-costs",maneuverCostsContainer:"esri-directions__maneuver-costs-container",maneuverIcon:"esri-directions__maneuver-icon",cumulativeCost:"esri-directions__cost--cumulative",intermediateCost:"esri-directions__cost--intermediate",horizontalSplitter:"esri-directions__horizontal-splitter",sectionSplitter:"esri-directions__section-splitter",disclaimer:"esri-directions__disclaimer",signInContent:"esri-directions__sign-in-content",signInButton:"esri-directions__sign-in-button",contentTitle:"esri-directions__content-title",warningCard:"esri-directions__warning-card",warningHeader:"esri-directions__warning-header",warningHeading:"esri-directions__warning-heading",warningMessage:"esri-directions__warning-message",stopsIcon:"esri-icon-radio-unchecked",lastStopIcon:"esri-icon-radio-checked",handleIcon:"esri-icon-handle-vertical",addStopIcon:"esri-icon-plus",removeStopIcon:"esri-icon-close",reverseStopIcon:"esri-icon-up-down-arrows",openIcon:"esri-icon-right-triangle-arrow",closeIcon:"esri-icon-down-arrow",warningIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-directions",anchor:"esri-widget__anchor",button:"esri-button",buttonSecondary:"esri-button--secondary",buttonTertiary:"esri-button--tertiary",emptyContent:"esri-widget__content--empty",emptyIllustration:"esri-widget__content-illustration--empty",heading:"esri-widget__heading",offscreen:"esri-offscreen",select:"esri-select",screenReaderText:"esri-icon-font-fallback-text"},R={awaitingViewClickStop:"awaiting-view-click-stop"},D=e.toUrl("../themes/base/images/maneuvers/"),P={hour:"numeric",minute:"numeric"},H={minimumIntegerDigits:2},z=100;return function(e){function t(t){var r=e.call(this)||this;return r._autoStopRemovalDelay=z,r._costSummary=new g,r._departureTime=I,r._datePicker=new S,r._handles=new u,r._newPlaceholderStop=null,r._routeSections=new w,r._stops=new c(M()),r._stopsToSearches=new Map,r._timePicker=new T,r.goToOverride=null,r.iconClass=k.widgetIcon,r.label=n.widgetLabel,r.lastRoute=null,r.maxStops=null,r.routeServiceUrl=null,r.routeSymbol=null,r.searchProperties=null,r.stopSymbols=null,r.view=null,r.viewModel=new m,r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([p.init(this,"viewModel.lastRoute",function(){e._routeSections.routePath=e.get("viewModel.directionLines"),e._activeManeuver=null,e._focusedManeuver=null,e.scheduleRender()}),p.init(this,"viewModel.selectedTravelMode, viewModel.departureTime",function(){e.get("viewModel.stops.length")>1&&e.getDirections()}),p.when(this,"view",function(t,r){if(r&&(e._viewClickHandle=null,e._handles.remove(r)),t){var o=e._prepViewClick();e._handles.add([d.on(t.surface,"mousedown",function(){return e._autoStopRemovalDelay=500}),d.on(t.surface,"mouseup",function(){return e._autoStopRemovalDelay=z}),o],e.view.surface),e._viewClickHandle=o}}),p.whenOnce(this,"routeServiceUrl",function(){return e.viewModel.load()}),p.watch(this,"viewModel.stops.length",function(t){0===t&&(e._stops.toArray().forEach(function(t){return e._removeStop(t,!0)}),e._stops.addMany(M()),e.scheduleRender())})])},t.prototype.destroy=function(){this._datePicker.destroy(),this._timePicker.destroy(),this._stopsToSearches.forEach(function(e){return e.destroy()})},t.prototype.getDirections=function(){return null},t.prototype.zoomToRoute=function(){},t.prototype.render=function(){return x.tsx("div",{class:this.classes(k.base,k.scroller)},this._renderPanelContent())},t.prototype._renderPanelContent=function(){var e,t=this.viewModel.state,r="initializing"===t,o="error"===t&&!this.viewModel.serviceDescription,i="unauthenticated"===t,s=(e={},e[k.panelContentLoading]=r,e[k.panelContentError]=o,e[k.panelContentSignIn]=i,e),n=r?"presentation":"group",a=i?this._renderSignIn():o?this._renderMessage(this._getErrorMessage()):r?this._renderLoader():this._renderReadyContent();return x.tsx("div",{class:this.classes(k.panelContent,s),role:n},a)},t.prototype._renderReadyContent=function(){return[this._renderStopsContainer(),this._renderTravelModeOptions(),this._renderDepartureTimeControls(),this._renderSectionSplitter(),this._renderDirectionsContainer(),this._renderDisclaimer()]},t.prototype._renderSignIn=function(){return x.tsx("div",{key:"sign-in",class:k.signInContent},x.tsx("h2",{class:this.classes(k.heading,k.contentTitle)},n.widgetLabel),this._renderPlaceholder(),x.tsx("h3",{class:k.heading},n.signInRequired),x.tsx("button",{class:this.classes(k.button,k.buttonSecondary,k.signInButton),tabIndex:0,onclick:this._handleSignInClick,bind:this},s.auth.signIn))},t.prototype._handleSignInClick=function(){this.viewModel.load()},t.prototype._renderTravelModeOptions=function(){var e=this.viewModel.travelModes;if(0===e.length)return null;var t=this.viewModel.selectedTravelMode,r=t.name||n.travelMode;return x.tsx("select",{"aria-label":r,bind:this,class:this.classes(k.travelModeSelect,k.select),key:"esri-directions__travel-mode-options",onchange:this._handleTravelModeChange,title:r},e.map(function(e){var r=e.id===t.id;return x.tsx("option",{key:e,"data-mode":e,selected:r,value:e.id},e.name)}))},t.prototype._handleTravelModeChange=function(e){var t=e.currentTarget,r=t.item(t.selectedIndex);this.viewModel.selectedTravelMode=r["data-mode"]},t.prototype._renderStopsContainer=function(){return x.tsx("div",{class:k.section,key:"esri-directions__stops-container",role:"group"},this._renderStops())},t.prototype._renderDepartureTimeControls=function(){var e=this._departureTime===I,t=n.departureTime;return x.tsx("div",{class:k.departureTime,key:"esri-directions__departure-time-controls",role:"group"},x.tsx("select",{"aria-label":t,bind:this,class:this.classes(k.departureTimeSelect,k.select),onchange:this._handleDepartureOptionChange,title:t},x.tsx("option",{value:I,selected:e},n.leaveNow),x.tsx("option",{value:"depart-by",selected:!e},n.departBy)),e?null:this._renderTimeControls())},t.prototype._renderStops=function(){var e=this,t=this._stops,r=t.toArray().map(function(r,o){var i,s,l,c,d=t.length,u=o>1&&!r.result,p=(i={},i[k.stopsIcon]=o>=0&&o<d-1,i[k.lastStopIcon]=o===d-1,i),h=(s={},s[k.lastStopIconContainer]=o===d-1,s),v=(l={},l[k.stopRowDragged]=e._draggedStopIndex===o,l[k.stopRowDropTarget]=e._dropTargetStopIndex===o,l[k.validStopRow]=!u,l),_=(c={},c[k.underlineDragInProcess]=!isNaN(e._draggedStopIndex),c),m=t.getItemAt(d-1),g=m&&m.result,S=t.getItemAt(o+1),y=S&&S.result,f=o===d-1,w=o===d-2,T=2===d&&0===o||d>2&&!f&&!w||d>2&&w&&y||d>2&&f&&!r.result,b=2===d||3===d&&!g||u,M=!u,C=e._acquireSearch(r),I=n.removeStop,R=n.reverseStops,D=n.unlocated,P=a.substitute(n.stopLabelTemplate,{number:o+1,label:r.result?r.result.name:D}),H=e.id+"__stop--"+o,z=!!C.searchTerm&&!!C.selectedResult&&!!r.result&&C.selectedResult===r.result;return x.tsx("li",{"aria-label":P,afterCreate:e._handleStopFieldCreation,bind:e,class:e.classes(k.stopRow,v),id:H,key:o,"data-stop-index":o,ondragend:e._handleStopFieldDragEnd,ondragover:e._handleStopFieldDragOver,ondragstart:e._handleStopFieldDragStart,ondrop:e._handleStopFieldDrop},x.tsx("div",{class:k.stopHandle,draggable:M},x.tsx("span",{"aria-hidden":"true",class:e.classes(k.stopIcon,k.handleIcon,k.stopHandleIcon,k.interactiveStopIcon)}),x.tsx("div",{bind:e,"aria-labelledby":H,class:e.classes(k.stopIconContainer,h),"data-stop-index":o,onclick:e._handleStopIconClick,onkeydown:e._handleStopIconClick,role:"button"},x.tsx("span",{class:e.classes(k.stopIcon,p),tabindex:z?"0":null}))),x.tsx("div",{class:k.stopInput},C.render(),x.tsx("div",{class:e.classes(k.stopUnderline,_)})),x.tsx("div",{class:k.stopOptions,role:"group"},x.tsx("div",{"aria-label":I,class:k.removeStopButton,bind:e,"data-stop-index":o,hidden:b,onkeydown:e._handleRemoveStop,onclick:e._handleRemoveStop,role:"button",tabIndex:0,title:I},x.tsx("span",{"aria-hidden":"true",class:e.classes(k.stopIcon,k.removeStop,k.removeStopIcon,k.interactiveStopIcon)}),x.tsx("span",{class:k.screenReaderText},"removeStopTitle")),x.tsx("div",{"aria-label":R,class:k.reverseStops,bind:e,hidden:T,onkeydown:e._handleReverseStops,onclick:e._handleReverseStops,role:"button",tabIndex:0,title:R},x.tsx("span",{"aria-hidden":"true",class:e.classes(k.stopIcon,k.reverseStopIcon,k.interactiveStopIcon)}),x.tsx("span",{class:k.screenReaderText},"removeStopTitle"))))}),o=t.every(function(t){var r=e._stopsToSearches.get(t);return t.result&&r.selectedResult===t.result}),i=this._stops.length>=this.maxStops,s=n.addStop,l=t.length>=2&&o&&!i?x.tsx("div",{"aria-label":s,bind:this,class:k.addStop,key:"esri-directions__add-stop",onfocus:this._handleAddStopFocus,tabIndex:0},x.tsx("span",{"aria-hidden":"true",class:this.classes(k.addStopIcon,k.stopIcon,k.interactiveStopIcon)}),x.tsx("div",{"aria-hidden":"true",class:k.addStopText},s)):null;return x.tsx("div",null,x.tsx("ol",{class:k.stops,role:"group"},r),l)},t.prototype._handleStopIconClick=function(e){var t=e.currentTarget,r=t["data-stop-index"],o=this._stops.getItemAt(r);o&&o.result&&this._centerAtStop(o)},t.prototype._handleClearRouteClick=function(){this.viewModel.reset()},t.prototype._centerAtStop=function(e){this.viewModel.centerAt(e.result.feature)},t.prototype._handleStopFieldCreation=function(e){var t=this._newPlaceholderStop;if(t){var r=e["data-stop-index"],o=this._stops.getItemAt(r);t===o&&this._acquireSearch(o).focus(),this._newPlaceholderStop=null}},t.prototype._handleStopInputBlur=function(e,t){var r=this;if(this._handles.remove(R.awaitingViewClickStop),this.view.cursor=this._previousCursor,!(!!e.selectedResult&&!!t.result&&e.selectedResult===t.result))return"none"!==e.activeMenu||!e.searchTerm||e.selectedResult===t.result&&(e.selectedResult||t.result)?void(e.searchTerm||(this._viewClickHandle.resume(),clearTimeout(this._autoStopRemovalTimeoutId),this._autoStopRemovalTimeoutId=setTimeout(function(){r.destroyed||(r._viewClickHandle.pause(),"searching"===e.viewModel.state)||(r._removeStop(t),!!t.result&&(t.result=null,r._processStops()),r.scheduleRender())},this._autoStopRemovalDelay))):void e.search()},t.prototype._handleStopInputFocus=function(e,t){if(!this._handles.has(R.awaitingViewClickStop)){var r=this,o=r.view,i=r.view.cursor;this._previousCursor=i,this._handles.add(p.init(e,"searchTerm",function(e){o.cursor=0===e.length?"copy":i}),R.awaitingViewClickStop),this._activeStop=t}},t.prototype._prepViewClick=function(){var e=this,t=this.get("viewModel.view"),r=d.pausable(t,"click",this._handleViewClick.bind(this)),o=d.pausable(t.surface,"click",function(){clearTimeout(e._autoStopRemovalTimeoutId),o.pause()});return{remove:function(){o.remove(),r.remove()},pause:function(){o.pause(),r.pause()},resume:function(){o.resume(),r.resume()}}},t.prototype._handleViewClick=function(e){var t=this,r=this._stopsToSearches.get(this._activeStop);r&&!r.searchTerm&&(r.search(e.mapPoint).then(function(e){var o=b(e),i=t._activeStop;i.result=o,i.result.feature.attributes.Name=o.name,r.searchTerm=o.name}),this.scheduleRender()),this._viewClickHandle.pause(),clearTimeout(this._autoStopRemovalTimeoutId)},t.prototype._handleAddStopFocus=function(e){this._addNewPlaceholder()},t.prototype._addNewPlaceholder=function(){if(!this._newPlaceholderStop){var e={};this._stops.add(e),this._newPlaceholderStop=e}},t.prototype._handleReverseStops=function(){this._reverseStops()},t.prototype._reverseStops=function(){this._stops.reverse(),this._processStops()},t.prototype._handleRemoveStop=function(e){var t=e.currentTarget,r=t["data-stop-index"];this._removeStop(this._stops.getItemAt(r)),this._processStops()},t.prototype._removeStop=function(e,t){void 0===t&&(t=!1),this._stops.length<=2&&!t||(this._disposeSearch(e),this._stops.remove(e))},t.prototype._getStopFieldGhost=function(){var e=this._ghost;return e||(e=document.createElement("div"),e.classList.add(k.stopRowGhost,k.offscreen),this._ghost=e),e},t.prototype._handleStopFieldDragStart=function(e){var t=e.currentTarget,r=e.dataTransfer,o=t,i=Number(o["data-stop-index"]);this._draggedStopIndex=i;var s=this._getStopFieldGhost(),n=this._acquireSearch(this._stops.getItemAt(i));s.innerHTML=n.searchTerm||n.activeSource.placeholder,document.body.appendChild(s);var a=s.getBoundingClientRect().height;r.effectAllowed="move",r.setDragImage(s,20,a/2),r.setData("text/plain",o["data-stop-index"])},t.prototype._handleStopFieldDragEnd=function(){this._draggedStopIndex=null,this._dropTargetStopIndex=null,document.body.removeChild(this._getStopFieldGhost())},t.prototype._handleStopFieldDragOver=function(e){var t=e.currentTarget,r=Number(t["data-stop-index"]);if(e.preventDefault(),this._draggedStopIndex===r)return void(this._dropTargetStopIndex=null);this._dropTargetStopIndex=r},t.prototype._handleStopFieldDrop=function(e){e.stopPropagation(),e.preventDefault();var t=e.currentTarget,r=Number(t["data-stop-index"]),o=Number(e.dataTransfer.getData("text/plain"));if(o!==r){var i=this._stops;i.reorder(i.getItemAt(o),r),this._processStops()}},t.prototype._handleDepartureOptionChange=function(){var e=this,t=event.currentTarget,r=t.item(t.selectedIndex);r.value===I?(this._departureTime=I,this.viewModel.departureTime=I,this._handles.remove("departure-time-controls")):"depart-by"===r.value&&(this._departureTime="depart-by",this._handles.add([p.init(this._datePicker,"value",function(){return e._updateDepartureTime()}),p.init(this._timePicker,"value",function(){return e._updateDepartureTime()})],"departure-time-controls"))},t.prototype._updateDepartureTime=function(){var e=this._datePicker.value,t=this._timePicker.value,r=l({date:e.date(),month:e.month(),year:e.year(),hour:t.hour(),minute:t.minute()});this.viewModel.departureTime=r.toDate()},t.prototype._renderTimeControls=function(){return x.tsx("div",{class:k.departureTimeControls,key:"esri-directions__time-controls",role:"group"},this._datePicker.render(),this._timePicker.render())},t.prototype._renderSectionSplitter=function(){return x.tsx("div",{class:k.sectionSplitter})},t.prototype._renderDisclaimer=function(){var e='<a class="'+k.anchor+'" href="http://www.esri.com/legal/software-license" target="_blank">'+n.esriTerms+"</a>",t=a.substitute(n.disclaimer,{esriTerms:e});return x.tsx("div",{class:k.disclaimer,innerHTML:t,key:"esri-directions__disclaimer"})},t.prototype._renderDirectionsContainer=function(){return x.tsx("div",{class:this.classes(k.directionsSection,k.section),key:"esri-directions__container"},this._renderDirectionsContainerContent())},t.prototype._renderLoader=function(){return x.tsx("div",{class:k.loader,key:"loader"})},t.prototype._renderWarningCard=function(){return x.tsx("div",{class:k.warningCard,role:"alert"},x.tsx("div",{class:k.warningHeader},x.tsx("span",{class:k.warningIcon,"aria-hidden":"true"}),x.tsx("div",{class:this.classes(k.heading,k.warningHeading)},s.warning)),x.tsx("div",{class:k.warningMessage},this._getErrorMessage()))},t.prototype._renderDirectionsContainerContent=function(){var e=this.viewModel,t=e.lastRoute,r=e.state,o="error"===r,i="routing"===r;return o?this._renderWarningCard():i?this._renderLoader():t?x.tsx("div",{class:k.summary,key:"esri-directions__summary",role:"group"},this._renderCosts(),this._renderRouteActions(),this._renderManeuverSections()):x.tsx("div",{key:"esri-directions__placeholder",class:k.emptyContent},this._renderPlaceholder(),x.tsx("h3",{class:this.classes(k.message,k.heading)},n.directionsPlaceholder))},t.prototype._renderPlaceholder=function(){return x.tsx("svg",{class:k.emptyIllustration,xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 256 256"},x.tsx("path",{fill:"currentcolor",d:"M192 36c-15.477 0-24 6.034-24 16.99v45.822l24 24 24-24v-45.82C216 42.033 207.477 36 192 36zm20 61.155l-20 20-20-20V52.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM192 52a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zM92 140.99C92 130.035 83.477 124 68 124s-24 6.034-24 16.99v45.822l24 24 24-24zm-4 44.165l-20 20-20-20V140.99c0-8.62 6.73-12.99 20-12.99s20 4.37 20 12.99zM68 140a12 12 0 1 0 12 12 12.013 12.013 0 0 0-12-12zm0 20a8 8 0 1 1 8-8 8.008 8.008 0 0 1-8 8zm84-44h16v4h-16zm-24 80h4v12h-12v-4h8zm0-28h4v16h-4zm0-52h12v4h-8v8h-4zm0 24h4v16h-4zm-36 64h16v4H92z"}))},t.prototype._renderMessage=function(e){return x.tsx("h3",null,e)},t.prototype._renderRouteActions=function(){return x.tsx("div",{class:k.routeActions},x.tsx("button",{"aria-label":n.clearRoute,class:this.classes(k.clearRouteButton,k.button,k.buttonTertiary),tabIndex:0,onclick:this._handleClearRouteClick,bind:this},n.clearRoute))},t.prototype._renderManeuverSections=function(){var e=this,t=this._routeSections.sections;return x.tsx("div",{class:k.maneuvers,role:"group"},t.map(function(r,o){var i,n,a,l=r.open;r.maneuvers.length>0&&l&&(a=x.tsx("ol",{class:k.maneuverList},r.maneuvers.map(function(t){return e._renderManeuver(t)})));var c,d=t.length>2,u=o===t.length-1,p=(i={},i[k.collapsibleSection]=d,i),h=(n={},n[k.openIcon]=!l,n[k.closeIcon]=l,n);if(d)if(u)c=x.tsx("header",{class:k.maneuverSectionHeader,key:"esri-directions__maneuver-section-header"},x.tsx("span",{"aria-hidden":"true",class:k.lastStopIcon}),x.tsx("h2",{class:e.classes(k.heading,k.maneuverSectionTitle)},r.name));else{var v=l?s.open:s.close;c=x.tsx("header",{class:e.classes(k.maneuverSectionHeader,k.maneuverSectionToggle),key:"esri-directions__maneuver-section-header"},x.tsx("div",{"aria-expanded":l,"aria-label":v,bind:e,class:k.maneuverSectionHeaderButton,"data-maneuver-section":r,onkeydown:e._handleSectionToggle,onclick:e._handleSectionToggle,role:"button",tabIndex:0,title:v},x.tsx("span",{"aria-hidden":"true",class:e.classes(h)}),x.tsx("h2",{class:e.classes(k.heading,k.maneuverSectionTitle)},r.name)))}else c=null;return x.tsx("section",{class:e.classes(k.maneuverSection,p)},c,a)}))},t.prototype._handleSectionToggle=function(e){var t=e.currentTarget,r=t["data-maneuver-section"];r.open=!r.open},t.prototype._renderCosts=function(){var e=this.get("viewModel.directionLines"),t=e[e.length-1],r=new Date(t.attributes.arriveTimeUTC),o=this._costSummary.set({directionsViewModel:this.viewModel}),i=n.zoomToRoute,s=a.formatDate(r,P),l=a.substitute(n.etaTemplate,{time:"<strong>"+s+"</strong>",gmt:""+C(r)}),c=n.primaryCosts,d=n.secondaryCosts,u=n.eta;return x.tsx("div",{"aria-label":i,bind:this,class:k.directionCosts,onkeydown:this._handleSummaryInteraction,onclick:this._handleSummaryInteraction,role:"button",tabIndex:0,title:i},x.tsx("div",{class:k.costsDetails,role:"group"},x.tsx("div",{"aria-label":c,class:k.primaryCosts,title:c},o.primary),x.tsx("div",{class:k.verticalSplitter}),x.tsx("div",{"aria-label":d,class:k.secondaryCosts,title:d},o.secondary)),x.tsx("div",{"aria-label":u,innerHTML:l,title:u}))},t.prototype._handleSummaryInteraction=function(){this._activeManeuver=null,this._focusedManeuver=null,this.viewModel.clearHighlights(),this.zoomToRoute()},t.prototype._getErrorMessage=function(){var e=this.viewModel.error;return"directions-view-model:unable-to-route"===e.name?n.errors.unableToRoute:"directions-view-model:service-metadata-unavailable"===e.name?n.errors.unableToLoadServiceMetadata:n.errors.unknownError},t.prototype._normalizeSearchSources=function(e){this._overrideDefaultSources(e),this._ensureLocationTypeOnLocatorSources(e)},t.prototype._overrideDefaultSources=function(e){var t=e.view?n.searchFieldPlaceholder:n.viewlessSearchFieldPlaceholder;e.viewModel.defaultSources.forEach(function(e){e.placeholder=t,e.autoNavigate=!1})},t.prototype._ensureLocationTypeOnLocatorSources=function(e){var t=e.allSources;0!==t.length&&t.forEach(function(e){"locator"in e&&e.locator&&null===e.locationType&&(e.locationType="street")})},t.prototype._acquireSearch=function(e){var t=this,r=this.get("viewModel.view");if(this._stopsToSearches.has(e)){var o=this._stopsToSearches.get(e);return o.view=r,this._overrideDefaultSources(o),o}var s=new v(i({view:r,resultGraphicEnabled:!1,popupEnabled:!1},this.searchProperties));return this._normalizeSearchSources(s),this._handles.add([p.on(s,"allSources","change",function(){return t._normalizeSearchSources(s)}),s.on("select-result",function(){e.result=s.selectedResult,e.result.feature.attributes.Name=s.selectedResult.name,t._processStops(),t.scheduleRender()}),s.on("search-focus",function(){return t._handleStopInputFocus(s,e)}),s.on("search-blur",function(){return t._handleStopInputBlur(s,e)})],s),this._stopsToSearches.set(e,s),s},t.prototype._disposeSearch=function(e){this._stopsToSearches.get(e).destroy(),this._stopsToSearches.delete(e)},t.prototype._processStops=function(){var e=this.viewModel;e.stops.removeAll(),e.stops.addMany(this._stops.filter(function(e){return!!e.result}).map(function(e){return e.result.feature})),e.stops.length>1&&e.getDirections()},t.prototype._renderManeuver=function(e){var t,r,o=e.attributes,i=this.get("viewModel.routeParameters.directionsLengthUnits"),s=y.formatDistance(o.length,{toUnits:i}),a=y.formatTime(o.time),l=y.getAssociatedStop(e);y.useSpatiallyLocalTime(e,this.get("viewModel.routeParameters.startTime"))?r=y.toSpatiallyLocalTimeString(o.arriveTimeUTC,o.ETA,this._departureTime===I):s&&(r=a?s+"&nbsp;&middot;<wbr>&nbsp;"+a:s);var c=l,d=this._getFormattedManeuverText(e),u=this._getIconPath(o.maneuverType);if(c)return x.tsx("li",{class:k.maneuver,key:e},x.tsx("header",null,l.attributes.Name));var p="esri-directions__maneuver-"+e.uid,h="esri-directions__cumulative-costs-"+e.uid,v="esri-directions__intermediate-costs-"+e.uid,_=(t={},t[k.maneuverActive]=this._activeManeuver===e,t);return x.tsx("li",{"aria-labelledby":p+" "+h+" "+v,bind:this,class:this.classes(k.maneuver,_),"data-maneuver":e,key:e,onclick:this._handleManeuverClick,onkeydown:this._handleManeuverClick,onfocus:this._handleManeuverFocus,onmouseover:this._handleManeuverMouseOver,onmouseout:this._handleManeuverMouseOut,onblur:this._handleManeuverBlur,tabIndex:0},x.tsx("img",{alt:"",class:k.maneuverIcon,src:u}),x.tsx("div",{class:k.maneuverCostsContainer},x.tsx("span",{id:p,innerHTML:d}),x.tsx("div",{class:k.maneuverCosts},x.tsx("div",{class:k.horizontalSplitter}),x.tsx("div",{id:h,"aria-label":n.cumulativeCosts,class:k.cumulativeCost,innerHTML:"",title:n.cumulativeCosts}),x.tsx("div",{id:v,"aria-label":n.intermediateCosts,class:k.intermediateCost,innerHTML:r,title:n.intermediateCosts}))))},t.prototype._getIconPath=function(e){var t=f.toIconName(e),r=2===window.devicePixelRatio?"@2x":"";return""+D+t+r+".png"},t.prototype._handleManeuverClick=function(e){var t=e.currentTarget,r=t["data-maneuver"];if(this._activeManeuver===r)return this._activeManeuver=null,void this.zoomToRoute();this._activeManeuver=r,this.viewModel.centerAt(r),this.viewModel.highlightSegment(r)},t.prototype._handleManeuverMouseOver=function(e){if(!this._activeManeuver&&!this._focusedManeuver){var t=e.currentTarget,r=t["data-maneuver"];this.viewModel.highlightSegment(r)}},t.prototype._handleManeuverMouseOut=function(){this._activeManeuver||this._focusedManeuver||this.viewModel.clearHighlights()},t.prototype._handleManeuverBlur=function(){this._activeManeuver||(this._focusedManeuver=null,this.viewModel.clearHighlights())},t.prototype._handleManeuverFocus=function(e){if(!this._activeManeuver){var t=e.currentTarget,r=t["data-maneuver"];this._focusedManeuver=r,this.viewModel.highlightSegment(r)}},t.prototype._getFormattedManeuverText=function(e){var t=e.attributes.text,r=e.strings;if(!r)return t;var o=t;return r.forEach(function(e){o=o.replace(e.string,"<strong>"+e.string+"</strong>")}),o},o([h.aliasOf("viewModel.goToOverride")],t.prototype,"goToOverride",void 0),o([h.property()],t.prototype,"iconClass",void 0),o([h.property()],t.prototype,"label",void 0),o([h.aliasOf("viewModel.lastRoute")],t.prototype,"lastRoute",void 0),o([h.aliasOf("viewModel.maxStops")],t.prototype,"maxStops",void 0),o([h.aliasOf("viewModel.routeServiceUrl")],t.prototype,"routeServiceUrl",void 0),o([h.aliasOf("viewModel.routeSymbol")],t.prototype,"routeSymbol",void 0),o([h.property()],t.prototype,"searchProperties",void 0),o([h.aliasOf("viewModel.stopSymbols")],t.prototype,"stopSymbols",void 0),o([h.aliasOf("viewModel.view")],t.prototype,"view",void 0),o([x.renderable(["lastRoute","state","travelModes"]),h.property({type:m})],t.prototype,"viewModel",void 0),o([h.aliasOf("viewModel.getDirections")],t.prototype,"getDirections",null),o([h.aliasOf("viewModel.zoomToRoute")],t.prototype,"zoomToRoute",null),o([x.accessibleHandler()],t.prototype,"_handleStopIconClick",null),o([x.accessibleHandler()],t.prototype,"_handleClearRouteClick",null),o([x.accessibleHandler()],t.prototype,"_handleReverseStops",null),o([x.accessibleHandler()],t.prototype,"_handleRemoveStop",null),o([x.accessibleHandler()],t.prototype,"_handleSectionToggle",null),o([x.accessibleHandler()],t.prototype,"_handleSummaryInteraction",null),o([x.accessibleHandler()],t.prototype,"_handleManeuverClick",null),t=o([h.subclass("esri.widgets.Directions")],t)}(h.declared(_))});