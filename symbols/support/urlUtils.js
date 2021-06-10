/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../core/urlUtils","../../chunks/persistableUrlUtils"],(function(e,a,r){"use strict";function t(e,r,t){return r.imageData?a.makeData({mediaType:r.contentType||"image/png",isBase64:!0,data:r.imageData}):i(r.url,t)}function i(e,t){return s(t)&&!a.isAbsolute(e)&&t.layer.parsedUrl?a.join(t.layer.parsedUrl.path,"images",e):r.fromJSON(e,t)}function n(e,t,i,n){if(a.isDataProtocol(e)){const o=a.dataComponents(e);t.contentType=o.mediaType,t.imageData=o.data,i&&i.imageData===t.imageData&&i.url&&r.write(i.url,t,"url",n)}else r.write(e,t,"url",n)}const o={json:{read:{source:["imageData","url"],reader:t},write:{writer(e,a,r,t){n(e,a,this.source,t)}}}},l={readOnly:!0,json:{read:{source:["imageData","url"],reader(e,a,r){const t={};return a.imageData&&(t.imageData=a.imageData),a.contentType&&(t.contentType=a.contentType),a.url&&(t.url=i(a.url,r)),t}}}};function s(e){return e&&("service"===e.origin||"portal-item"===e.origin)&&e.layer&&("feature"===e.layer.type||"stream"===e.layer.type)}e.read=i,e.readImageDataOrUrl=t,e.sourcePropertyDefinition=l,e.urlPropertyDefinition=o,e.writeImageDataAndUrl=n,Object.defineProperty(e,"__esModule",{value:!0})}));
