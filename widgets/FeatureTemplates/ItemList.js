/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../support/widgetUtils","../../chunks/index"],(function(e,t,s){"use strict";const i={base:"esri-item-list",list:"esri-item-list__list",group:"esri-item-list__group",scroller:"esri-item-list__scroller",groupHeader:"esri-item-list__group-header",item:"esri-item-list__list-item",itemSelected:"esri-item-list__list-item--selected",itemContainer:"esri-item-list__list-item-container",itemLabel:"esri-item-list__list-item-label",noMatchesMessage:"esri-item-list__no-matches-message",noItemsMessage:"esri-item-list__no-items-message",filterContainer:"esri-item-list__filter-container",filterPlaceholder:"esri-item-list__filter-placeholder",filterInput:"esri-item-list__filter-input",filterPlaceholderText:"esri-item-list__filter-placeholder-text",searchIcon:"esri-icon-search",widget:"esri-widget",heading:"esri-widget__heading",input:"esri-input"};function n(e){const{id:n,identify:r,filterEnabled:a=!0,items:c,messages:m,filterText:u="",onFilterChange:d,renderIcon:f,onItemMouseLeave:g,onItemMouseEnter:I,onItemSelect:x}=e;return s.jsx("div",{class:t.classes(i.base,i.widget)},a?o({filterText:u,messages:m,onFilterChange:d,id:n}):null,l({identify:r,items:c,messages:m,filterText:u,renderIcon:f,onItemMouseLeave:g,onItemMouseEnter:I,onItemSelect:x}))}function r(e){return!!e.items}function l(e){const{identify:n,items:l,renderIcon:o,filterText:m,onItemMouseLeave:u,onItemMouseEnter:d,onItemSelect:f}=e;return 0===l.length?s.jsx("div",{class:i.noMatchesMessage,key:"no-matches"},e.messages.noMatches):r(l[0])?s.jsx("div",{class:i.scroller,key:"item-container"},l.map((e=>c({group:e,filterText:m,identify:n,renderIcon:o,onItemMouseLeave:u,onItemMouseEnter:d,onItemSelect:f})))):s.jsx("ul",{class:t.classes(i.list,i.scroller),key:"item-container"},l.map((e=>a({item:e,identify:n,grouped:!0,onItemMouseLeave:u,onItemMouseEnter:d,onItemSelect:f,renderIcon:o,filterText:m}))))}function o(e){const n=`${e.id}-placeholder`;return s.jsx("div",{class:i.filterContainer,key:"filter"},s.jsx("input",{"aria-labelledby":n,class:t.classes(i.input,i.filterInput),oninput:t=>{const s=t.currentTarget;e.onFilterChange&&e.onFilterChange(s.value)},value:e.filterText,type:"search"}),e.filterText?null:s.jsx("div",{class:i.filterPlaceholder,id:n,key:"placeholder"},s.jsx("span",{class:i.searchIcon,"aria-hidden":"true"}),s.jsx("div",{class:i.filterPlaceholderText},e.messages.filterPlaceholder)))}function a(e){const{identify:t,item:n,grouped:r,filterText:l,onItemSelect:o,onItemMouseEnter:a,onItemMouseLeave:c,renderIcon:u}=e,d=`${t&&t(n)||n.id}__${n.label}`;return s.jsx("li",{"aria-level":r?"2":"",class:i.item,"data-item":n,key:d,onclick:e=>{const t=e.currentTarget["data-item"];o&&o(t)},onmouseenter:e=>{const t=e.currentTarget["data-item"];a&&a(t)},onkeydown:e=>{if("Enter"!==e.key&&"Space"!==e.key)return;const t=e.currentTarget["data-item"];o&&o(t)},onmouseleave:e=>{const t=e.currentTarget["data-item"];c&&c(t)},tabIndex:0},s.jsx("div",{class:i.itemContainer},u&&u({item:n}),m({text:n.label,match:l})))}function c(e){const{group:n,identify:r,onItemMouseLeave:l,onItemMouseEnter:o,onItemSelect:c,filterText:u,renderIcon:d}=e,f=`${r&&r(n)||n.id}-heading`;return s.jsx("section",{"aria-labelledby":f,class:i.group,key:n.label},s.jsx("h4",{"aria-level":"1",id:f,class:t.classes(i.groupHeader)},m({text:n.label,match:u})),s.jsx("ul",{class:i.list},n.items.map((e=>a({item:e,identify:r,grouped:!0,onItemMouseLeave:l,onItemMouseEnter:o,onItemSelect:c,renderIcon:d,filterText:u})))))}function m(e){const{match:t,text:n}=e;let r=null;if(t){const e=n.toLowerCase(),i=t.toLowerCase(),l=e.indexOf(i);if(-1===l)r=n;else{const e=n.substring(0,l),i=n.substr(l,t.length),o=n.substring(l+t.length);r=s.jsx("span",null,e,s.jsx("strong",null,i),o)}}else r=n;return s.jsx("span",{class:i.itemLabel},r)}e.ItemList=n,e.renderGroup=c,e.renderItem=a,e.renderLabel=m,Object.defineProperty(e,"__esModule",{value:!0})}));
