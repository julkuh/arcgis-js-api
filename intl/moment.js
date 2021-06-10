/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","exports","./locale"],(function(n,e,t){"use strict";const u=new Map([["ar",()=>new Promise((function(e,t){n(["../chunks/ar"],e,t)})).then((function(n){return n.ar}))],["ar-dz",()=>new Promise((function(e,t){n(["../chunks/ar-dz"],e,t)})).then((function(n){return n.arDz}))],["ar-kw",()=>new Promise((function(e,t){n(["../chunks/ar-kw"],e,t)})).then((function(n){return n.arKw}))],["ar-ly",()=>new Promise((function(e,t){n(["../chunks/ar-ly"],e,t)})).then((function(n){return n.arLy}))],["ar-ma",()=>new Promise((function(e,t){n(["../chunks/ar-ma"],e,t)})).then((function(n){return n.arMa}))],["ar-sa",()=>new Promise((function(e,t){n(["../chunks/ar-sa"],e,t)})).then((function(n){return n.arSa}))],["ar-tn",()=>new Promise((function(e,t){n(["../chunks/ar-tn"],e,t)})).then((function(n){return n.arTn}))],["bs",()=>new Promise((function(e,t){n(["../chunks/bs"],e,t)})).then((function(n){return n.bs}))],["ca",()=>new Promise((function(e,t){n(["../chunks/ca"],e,t)})).then((function(n){return n.ca}))],["cs",()=>new Promise((function(e,t){n(["../chunks/cs"],e,t)})).then((function(n){return n.cs}))],["da",()=>new Promise((function(e,t){n(["../chunks/da"],e,t)})).then((function(n){return n.da}))],["de",()=>new Promise((function(e,t){n(["../chunks/de"],e,t)})).then((function(n){return n.de}))],["de-at",()=>new Promise((function(e,t){n(["../chunks/de-at"],e,t)})).then((function(n){return n.deAt}))],["de-ch",()=>new Promise((function(e,t){n(["../chunks/de-ch"],e,t)})).then((function(n){return n.deCh}))],["el",()=>new Promise((function(e,t){n(["../chunks/el"],e,t)})).then((function(n){return n.el}))],["en-au",()=>new Promise((function(e,t){n(["../chunks/en-au"],e,t)})).then((function(n){return n.enAu}))],["en-ca",()=>new Promise((function(e,t){n(["../chunks/en-ca"],e,t)})).then((function(n){return n.enCa}))],["en-gb",()=>new Promise((function(e,t){n(["../chunks/en-gb"],e,t)})).then((function(n){return n.enGb}))],["en-ie",()=>new Promise((function(e,t){n(["../chunks/en-ie"],e,t)})).then((function(n){return n.enIe}))],["en-il",()=>new Promise((function(e,t){n(["../chunks/en-il"],e,t)})).then((function(n){return n.enIl}))],["en-in",()=>new Promise((function(e,t){n(["../chunks/en-in"],e,t)})).then((function(n){return n.enIn}))],["en-nz",()=>new Promise((function(e,t){n(["../chunks/en-nz"],e,t)})).then((function(n){return n.enNz}))],["en-sg",()=>new Promise((function(e,t){n(["../chunks/en-sg"],e,t)})).then((function(n){return n.enSg}))],["es",()=>new Promise((function(e,t){n(["../chunks/es"],e,t)})).then((function(n){return n.es}))],["es-do",()=>new Promise((function(e,t){n(["../chunks/es-do"],e,t)})).then((function(n){return n.esDo}))],["es-mx",()=>new Promise((function(e,t){n(["../chunks/es-mx"],e,t)})).then((function(n){return n.esMx}))],["es-us",()=>new Promise((function(e,t){n(["../chunks/es-us"],e,t)})).then((function(n){return n.esUs}))],["et",()=>new Promise((function(e,t){n(["../chunks/et"],e,t)})).then((function(n){return n.et}))],["fi",()=>new Promise((function(e,t){n(["../chunks/fi"],e,t)})).then((function(n){return n.fi}))],["fr",()=>new Promise((function(e,t){n(["../chunks/fr"],e,t)})).then((function(n){return n.fr}))],["fr-ca",()=>new Promise((function(e,t){n(["../chunks/fr-ca"],e,t)})).then((function(n){return n.frCa}))],["fr-ch",()=>new Promise((function(e,t){n(["../chunks/fr-ch"],e,t)})).then((function(n){return n.frCh}))],["he",()=>new Promise((function(e,t){n(["../chunks/he"],e,t)})).then((function(n){return n.he}))],["hr",()=>new Promise((function(e,t){n(["../chunks/hr"],e,t)})).then((function(n){return n.hr}))],["hu",()=>new Promise((function(e,t){n(["../chunks/hu"],e,t)})).then((function(n){return n.hu}))],["id",()=>new Promise((function(e,t){n(["../chunks/id"],e,t)})).then((function(n){return n.id}))],["it",()=>new Promise((function(e,t){n(["../chunks/it"],e,t)})).then((function(n){return n.it}))],["it-ch",()=>new Promise((function(e,t){n(["../chunks/it-ch"],e,t)})).then((function(n){return n.itCh}))],["ja",()=>new Promise((function(e,t){n(["../chunks/ja"],e,t)})).then((function(n){return n.ja}))],["ko",()=>new Promise((function(e,t){n(["../chunks/ko"],e,t)})).then((function(n){return n.ko}))],["lt",()=>new Promise((function(e,t){n(["../chunks/lt"],e,t)})).then((function(n){return n.lt}))],["lv",()=>new Promise((function(e,t){n(["../chunks/lv"],e,t)})).then((function(n){return n.lv}))],["nb",()=>new Promise((function(e,t){n(["../chunks/nb"],e,t)})).then((function(n){return n.nb}))],["nl",()=>new Promise((function(e,t){n(["../chunks/nl"],e,t)})).then((function(n){return n.nl}))],["nl-be",()=>new Promise((function(e,t){n(["../chunks/nl-be"],e,t)})).then((function(n){return n.nlBe}))],["pl",()=>new Promise((function(e,t){n(["../chunks/pl"],e,t)})).then((function(n){return n.pl}))],["pt",()=>new Promise((function(e,t){n(["../chunks/pt"],e,t)})).then((function(n){return n.pt}))],["pt-br",()=>new Promise((function(e,t){n(["../chunks/pt-br"],e,t)})).then((function(n){return n.ptBr}))],["ro",()=>new Promise((function(e,t){n(["../chunks/ro"],e,t)})).then((function(n){return n.ro}))],["ru",()=>new Promise((function(e,t){n(["../chunks/ru"],e,t)})).then((function(n){return n.ru}))],["sk",()=>new Promise((function(e,t){n(["../chunks/sk"],e,t)})).then((function(n){return n.sk}))],["sl",()=>new Promise((function(e,t){n(["../chunks/sl"],e,t)})).then((function(n){return n.sl}))],["sr",()=>new Promise((function(e,t){n(["../chunks/sr"],e,t)})).then((function(n){return n.sr}))],["sr-cyrl",()=>new Promise((function(e,t){n(["../chunks/sr-cyrl"],e,t)})).then((function(n){return n.srCyrl}))],["sv",()=>new Promise((function(e,t){n(["../chunks/sv"],e,t)})).then((function(n){return n.sv}))],["th",()=>new Promise((function(e,t){n(["../chunks/th"],e,t)})).then((function(n){return n.th}))],["tr",()=>new Promise((function(e,t){n(["../chunks/tr"],e,t)})).then((function(n){return n.tr}))],["uk",()=>new Promise((function(e,t){n(["../chunks/uk"],e,t)})).then((function(n){return n.uk}))],["vi",()=>new Promise((function(e,t){n(["../chunks/vi"],e,t)})).then((function(n){return n.vi}))],["zh-cn",()=>new Promise((function(e,t){n(["../chunks/zh-cn"],e,t)})).then((function(n){return n.zhCn}))],["zh-hk",()=>new Promise((function(e,t){n(["../chunks/zh-hk"],e,t)})).then((function(n){return n.zhHk}))],["zh-mo",()=>new Promise((function(e,t){n(["../chunks/zh-mo"],e,t)})).then((function(n){return n.zhMo}))],["zh-tw",()=>new Promise((function(e,t){n(["../chunks/zh-tw"],e,t)})).then((function(n){return n.zhTw}))]]);async function r(e=t.getLocale()){const r=(await new Promise((function(e,t){n(["../chunks/moment"],e,t)})).then((function(n){return n.moment}))).default;let c=u.has(e);if(!c){const n=e.split("-");n.length>1&&u.has(n[0])&&(e=n[0],c=!0)}return c?await u.get(e)():e="en",e!==r.locale()&&r.locale(e),r}e.loadMoment=r,Object.defineProperty(e,"__esModule",{value:!0})}));
