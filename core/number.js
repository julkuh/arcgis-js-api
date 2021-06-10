/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./string","../intl/locale"],(function(e,n,t){"use strict";const r={ar:[".",","],bs:[",","."],ca:[",","."],cs:[","," "],da:[",","."],de:[",","."],"de-ch":[".","’"],el:[",","."],en:[".",","],"en-au":[".",","],es:[",","."],"es-mx":[".",","],et:[","," "],fi:[","," "],fr:[","," "],"fr-ch":[","," "],he:[".",","],hi:[".",",","#,##,##0.###"],hr:[",","."],hu:[","," "],id:[",","."],it:[",","."],"it-ch":[".","’"],ja:[".",","],ko:[".",","],lt:[","," "],lv:[","," "],mk:[",","."],nb:[","," "],nl:[",","."],pl:[","," "],pt:[",","."],"pt-pt":[","," "],ro:[",","."],ru:[","," "],sk:[","," "],sl:[",","."],sr:[",","."],sv:[","," "],th:[".",","],tr:[",","."],uk:[","," "],vi:[",","."],zh:[".",","]};function s(e){e||(e=t.getLocale());let n=e in r;if(!n){const t=e.split("-");t.length>1&&t[0]in r&&(e=t[0],n=!0),n||(e="en")}const[s,i,o="#,##0.###"]=r[e];return{decimal:s,group:i,pattern:o}}function i(e,n){const t=s((n={...n}).locale);n.customs=t;const r=n.pattern||t.pattern;return isNaN(e)||Math.abs(e)===1/0?null:c(e,r,n)}const o=/[#0,]*[#0](?:\.0*#*)?/;function c(e,n,t){const r=(t=t||{}).customs.group,s=t.customs.decimal,i=n.split(";"),c=i[0];if(-1!==(n=i[e<0?1:0]||"-"+c).indexOf("%"))e*=100;else if(-1!==n.indexOf("‰"))e*=1e3;else{if(-1!==n.indexOf("¤"))throw new Error("currency notation not supported");if(-1!==n.indexOf("E"))throw new Error("exponential notation not supported")}const a=o,p=c.match(a);if(!p)throw new Error("unable to find a number expression in pattern: "+n);return!1===t.fractional&&(t.places=0),n.replace(a,l(e,p[0],{decimal:s,group:r,places:t.places,round:t.round}))}function l(e,n,t){!0===(t=t||{}).places&&(t.places=0),t.places===1/0&&(t.places=6);const r=n.split("."),s="string"==typeof t.places&&t.places.indexOf(",");let i=t.places;s?i=t.places.substring(s+1):i>=0||(i=(r[1]||[]).length),t.round<0||(e=Number(e.toFixed(Number(i))));const o=String(Math.abs(e)).split("."),c=o[1]||"";if(r[1]||t.places){s&&(t.places=t.places.substring(0,s));const e=void 0!==t.places?t.places:r[1]&&r[1].lastIndexOf("0")+1;e>c.length&&(o[1]=c.padEnd(Number(e),"0")),i<c.length&&(o[1]=c.substr(0,Number(i)))}else o[1]&&o.pop();const l=r[0].replace(",","");let a=l.indexOf("0");-1!==a&&(a=l.length-a,a>o[0].length&&(o[0]=o[0].padStart(a,"0")),-1===l.indexOf("#")&&(o[0]=o[0].substr(o[0].length-a)));let p,u,f=r[0].lastIndexOf(",");if(-1!==f){p=r[0].length-f-1;const e=r[0].substr(0,f);f=e.lastIndexOf(","),-1!==f&&(u=e.length-f-1)}const d=[];for(let g=o[0];g;){const e=g.length-p;d.push(e>0?g.substr(e):g),g=e>0?g.slice(0,e):"",u&&(p=u,u=void 0)}return o[0]=d.reverse().join(t.group||","),o.join(t.decimal||".")}function a(e){return p(e).regexp}function p(e){const t=s((e=e||{}).locale),r=e.pattern||t.pattern,i=t.group,c=t.decimal;let l=1;if(-1!==r.indexOf("%"))l/=100;else if(-1!==r.indexOf("‰"))l/=1e3;else if(-1!==r.indexOf("¤"))throw new Error("currency notation not supported");const a=r.split(";");1===a.length&&a.push("-"+a[0]);return{regexp:g(a,(function(t){return(t="(?:"+n.escapeRegExpString(t,".")+")").replace(o,(function(n){const t={signed:!1,separator:e.strict?i:[i,""],fractional:e.fractional,decimal:c,exponent:!1},r=n.split(".");let s=e.places;1===r.length&&1!==l&&(r[1]="###"),1===r.length||0===s?t.fractional=!1:(void 0===s&&(s=e.pattern?r[1].lastIndexOf("0")+1:1/0),s&&null==e.fractional&&(t.fractional=!0),!e.places&&s<r[1].length&&(s+=","+r[1].length),t.places=s);const o=r[0].split(",");return o.length>1&&(t.groupSize=o.pop().length,o.length>1&&(t.groupSize2=o.pop().length)),"("+f(t)+")"}))}),!0).replace(/[\xa0 ]/g,"[\\s\\xa0]"),group:i,decimal:c,factor:l}}function u(e,n){const t=p(n),r=new RegExp("^"+t.regexp+"$").exec(e);if(!r)return NaN;let s=r[1];if(!r[1]){if(!r[2])return NaN;s=r[2],t.factor*=-1}return s=s.replace(new RegExp("["+t.group+"\\s\\xa0]","g"),"").replace(t.decimal,"."),Number(s)*t.factor}function f(e){"places"in(e=e||{})||(e.places=1/0),"string"!=typeof e.decimal&&(e.decimal="."),"fractional"in e&&!/^0/.test(String(e.places))||(e.fractional=[!0,!1]),"exponent"in e||(e.exponent=[!0,!1]),"eSigned"in e||(e.eSigned=[!0,!1]);const n=d(e),t=g(e.fractional,(function(n){let t="";return n&&0!==e.places&&(t="\\"+e.decimal,e.places===1/0?t="(?:"+t+"\\d+)?":t+="\\d{"+e.places+"}"),t}),!0);let r=n+t;return t&&(r="(?:(?:"+r+")|(?:"+t+"))"),r+g(e.exponent,(function(n){return n?"([eE]"+d({signed:e.eSigned})+")":""}))}function d(e){"signed"in(e=e||{})||(e.signed=[!0,!1]),"separator"in e?"groupSize"in e||(e.groupSize=3):e.separator="";return g(e.signed,(function(e){return e?"[-+]":""}),!0)+g(e.separator,(function(t){if(!t)return"(?:\\d+)";" "===(t=n.escapeRegExpString(t))?t="\\s":" "===t&&(t="\\s\\xa0");const r=e.groupSize,s=e.groupSize2;if(s){const e="(?:0|[1-9]\\d{0,"+(s-1)+"}(?:["+t+"]\\d{"+s+"})*["+t+"]\\d{"+r+"})";return r-s>0?"(?:"+e+"|(?:0|[1-9]\\d{0,"+(r-1)+"}))":e}return"(?:0|[1-9]\\d{0,"+(r-1)+"}(?:["+t+"]\\d{"+r+"})*)"}),!0)}const g=function(e,n,t){if(!(e instanceof Array))return n(e);const r=[];for(let s=0;s<e.length;s++)r.push(n(e[s]));return h(r.join("|"),t)},h=function(e,n){return"("+(n?"?:":"")+e+")"};e._parseInfo=p,e.format=i,e.getCustoms=s,e.parse=u,e.regexp=a,Object.defineProperty(e,"__esModule",{value:!0})}));
