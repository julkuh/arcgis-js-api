/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../../core/maybe","../../core/Error","../../symbols/support/Symbol3DMaterial","../../renderers/support/AuthoringInfo","../../renderers/visualVariables/support/SizeStop","../../renderers/visualVariables/support/visualVariableUtils","../../renderers/support/ClassBreakInfo","../../symbols/support/cimSymbolUtils","../support/utils","../support/adapters/support/layerUtils","./support/utils","./color","./size","../symbology/support/aboveAndBelowUtils"],(function(e,i,a,l,s,o,n,t,r,u,p,c,m,d,v){"use strict";const b=2**53-1;async function y(e){var l,s;if(!(e&&e.layer&&(e.field||e.valueExpression||e.sqlExpression)))throw new a("univariate-colorsize-visual-variables:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required");if(e.valueExpression&&!e.sqlExpression&&!e.view)throw new a("univariate-colorsize-visual-variables:missing-parameters","View is required when 'valueExpression' is specified");if("above-and-below"===e.theme&&null!=(l=e.sizeOptions)&&l.sizeOptimizationEnabled)throw new a("univariate-colorsize-visual-variables:invalid-parameters","sizeOptimizationEnabled cannot be true for 'above-and-below' theme");const o={...e},n=[0,2,1,3],t=p.createLayerAdapter(o.layer,n);if(o.layer=t,o.theme=o.theme||null!=(s=o.colorOptions)&&s.theme?o.theme:"high-to-low","90-10"===o.theme)throw new a("univariate-colorsize-visual-variables:not-supported","Only 'high-to-low', 'above-and-below', 'above', 'below' themes are supported.");if(!t)throw new a("univariate-colorsize-visual-variables:invalid-parameters","'layer' must be one of these types: "+p.getLayerTypeLabels(n).join(", "));const r=i.isSome(o.signal)?{signal:o.signal}:null;await t.load(r);const m=await u.getFieldsList({field:o.field,normalizationField:o.normalizationField,valueExpression:o.valueExpression}),d=c.verifyBasicFieldValidity(t,m,"univariate-colorsize-visual-variables:invalid-parameters");if(d)throw d;return o}function f(e,i){var a;const l={...e},{sizeOptions:s,theme:o}=l,n=l.legendOptions||(null==(a=l.sizeOptions)?void 0:a.legendOptions);return delete l.sizeOptions,delete l.colorOptions,{...l,...s,statistics:i||l.statistics,theme:"above-and-below"===o?null:o,legendOptions:n}}function w(e,i){var a;const l={...e},s=l.colorOptions,o=l.theme||(null==s?void 0:s.theme),n=l.legendOptions||(null==(a=l.colorOptions)?void 0:a.legendOptions);return delete l.sizeOptions,delete l.colorOptions,{...l,...s,statistics:i||l.statistics,theme:o,legendOptions:n}}async function h(e){var l;if(!(e&&e.layer&&(e.field||e.valueExpression||e.sqlExpression)))throw new a("univariate-colorsize-continuous-renderer:missing-parameters","'layer' and 'field', 'valueExpression' or 'sqlExpression' parameters are required");if(e.valueExpression&&!e.sqlExpression&&!e.view)throw new a("univariate-colorsize-continuous-renderer:missing-parameters","View is required when 'valueExpression' is specified");const s={...e};s.symbolType=s.symbolType||"2d",s.colorOptions||(s.colorOptions={}),s.colorOptions.isContinuous=null!=(l=s.colorOptions.isContinuous)&&l;const o=[0,2,1,3],n=p.createLayerAdapter(s.layer,o);if(s.layer=n,!n)throw new a("univariate-colorsize-continuous-renderer:invalid-parameters","'layer' must be one of these types: "+p.getLayerTypeLabels(o).join(", "));const t=i.isSome(s.signal)?{signal:s.signal}:null;if(await n.load(t),"above-and-below"===s.theme&&s.symbolOptions){if(s.symbolType.indexOf("3d-volumetric")>-1)throw new a("univariate-colorsize-continuous-renderer:invalid-parameters","'symbolOptions' is applicable for '2d' and '3d-flat' 'symbolType' only");if("point"!==n.geometryType&&"polygon"!==n.geometryType)throw new a("univariate-colorsize-continuous-renderer:invalid-parameters","'symbolOptions' only apply to layers with 'point' or 'polygon' geometryType")}const r=await u.getFieldsList({field:s.field,normalizationField:s.normalizationField,valueExpression:s.valueExpression}),m=c.verifyBasicFieldValidity(n,r,"univariate-colorsize-continuous-renderer:invalid-parameters");if(m)throw m;return s}function z(e){const i={...e},a={...i.sizeOptions};return delete i.sizeOptions,delete i.colorOptions,delete a.sizeOptimizationEnabled,{...i,...a}}function V(e,i){if("type"in e&&"cim"===e.type)r.applyCIMSymbolColor(e,i);else if("type"in e&&e.type.indexOf("3d")>-1){e.symbolLayers.forEach((e=>{"material"in e&&"color"in e.material&&(e.material?e.material.color=i:e.material=new l.default({color:i}))}))}else"color"in e&&(e.color=i)}function g(e,i,a){if((null!=i&&i.symbolStyle||null!=i&&i.symbols)&&("point"===a||"polygon"===a))return i.symbols||v.getAboveAndBelowSymbols(i.symbolStyle);const l=e.classBreakInfos[0].symbol;return{above:l.clone(),below:l.clone()}}function O(e,i,a){var l;const s=a.symbolOptions,o=a.layer,n=null!=s&&s.symbols?"custom":null==s?void 0:s.symbolStyle,r=null==(l=a.colorOptions)?void 0:l.isContinuous;if(S(e,i,r),n||!r){const{stops:a}=i.size.visualVariables[0],{above:l,below:u}=g(e,s,o.geometryType);if(!r){const e=i.color.colorScheme.colors,a=e[0];V(l,e[e.length-1]),V(u,a)}e.classBreakInfos=[new t({minValue:-b,maxValue:a[2].value,symbol:u}),new t({minValue:a[2].value,maxValue:b,symbol:l})],n&&(e.authoringInfo.univariateSymbolStyle=n)}}function S(e,i,a=!0){var l;const s=null==i||null==(l=i.authoringInfo)?void 0:l.clone(),o=i.size.visualVariables.map((e=>e.clone()));a?o.push(i.color.visualVariable.clone()):s.visualVariables=s.visualVariables.filter((e=>"size"===e.type)),o.push(...e.visualVariables.filter((e=>"target"in e&&"outline"===e.target)).map((e=>e.clone()))),e.authoringInfo=s,e.visualVariables=o}function x(e){const i={...e},a=i.symbolType,l=a.indexOf("3d-volumetric")>-1;delete i.symbolType,delete i.defaultSymbolEnabled;const s=i;return s.worldScale=l,l&&(s.sizeOptions={...s.sizeOptions},s.sizeOptions.axis="3d-volumetric-uniform"===a?"all":"height"),s}async function E(e,i,a,l){const s=i[0],t=i[1],r=Math.round((t-s)/2)+s,u=e.clone();u.stops=[new o({value:a[0],size:t}),new o({value:a[1],size:r}),new o({value:a[2],size:s}),new o({value:a[3],size:r}),new o({value:a[4],size:t})],e.stops=[new o({value:l[0],size:n.getSize(u,l[0])}),new o({value:l[1],size:n.getSize(u,l[1])}),new o({value:l[2],size:n.getSize(u,l[2])}),new o({value:l[3],size:n.getSize(u,l[3])}),new o({value:l[4],size:n.getSize(u,l[4])})]}async function T(e,i,a,l){const s=e.filter((e=>"width-and-depth"!==e.axis&&!e.target))[0],o="number"==typeof(null==s?void 0:s.minSize)?null==s?void 0:s.minSize:null,n="number"==typeof(null==s?void 0:s.maxSize)?null==s?void 0:s.maxSize:null;if(null!=(null==s?void 0:s.minDataValue)&&null!=o&&null!=n)if(l)if("above-and-below"===l){s.minDataValue=null,s.maxDataValue=null,s.minSize=null,s.maxSize=null;const e=c.createStopValuesForAboveBelow(a),l=c.clampAboveAndBelowStopValues(e,a);await E(s,[o,n],e,l),i.stops.forEach(((e,i)=>e.value=l[i]))}else{const{minDataValue:e,maxDataValue:a}=s,l=c.createDefaultStopValues(e,a,5);i.stops.forEach(((e,i)=>e.value=l[i])),s.minDataValue=l[0],s.maxDataValue=l[l.length-1]}else s.minDataValue=i.stops[0].value,s.maxDataValue=i.stops[i.stops.length-1].value}function I(e,i,a){const{theme:l,minValue:o,maxValue:n}=e,t=i.authoringInfo.visualVariables[0].clone(),r=a.authoringInfo.visualVariables[0].clone();if("above-and-below"===l){const e=i.visualVariable.stops;t.minSliderValue=r.minSliderValue=null!=o?o:e[0].value,t.maxSliderValue=r.maxSliderValue=null!=n?n:e[e.length-1].value,r.theme="above-and-below"}return new s({type:"univariate-color-size",univariateTheme:l,visualVariables:[t,r]})}async function D(e){const i=await y(e),a=await m.createVisualVariable(w(i)),{visualVariable:l,statistics:s}=a,o=await d.createVisualVariables(f(i,s)),n=o.visualVariables;return await T(n,l,s,i.theme),{basemapId:o.basemapId,basemapTheme:o.basemapTheme,statistics:s,defaultValuesUsed:a.defaultValuesUsed,color:{visualVariable:l,colorScheme:a.colorScheme},size:{visualVariables:n,sizeScheme:o.sizeScheme},authoringInfo:I(i,a,o)}}async function q(e){return A(e)}async function A(e){var i;const a=await h(e),{renderer:l,statistics:s,defaultValuesUsed:o}=await d.createContinuousRenderer(z(a)),n=x(a);n.statistics=s;const t=await D(n);return"above-and-below"===a.theme?O(l,t,a):S(l,t),{renderer:l,statistics:s,defaultValuesUsed:o,color:null!=(i=a.colorOptions)&&i.isContinuous||"above-and-below"!==a.theme?t.color:null,size:t.size,basemapId:t.basemapId,basemapTheme:t.basemapTheme}}e.createContinuousRenderer=q,e.createRenderer=A,e.createVisualVariables=D,Object.defineProperty(e,"__esModule",{value:!0})}));
