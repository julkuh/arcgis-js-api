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

define(["require","exports","../../Color","../../core/colorUtils"],function(o,r,e,l){function t(o,r){if(!o||!r||o.length!==r.length)return!1;for(var e=0;e<o.length;e++)if(o[e]>r[e]+2||o[e]<r[e]-2)return!1;return!0}function i(o,r,e){var t=l.toLAB(o),i=l.toLAB(r),d={l:t.l*(1-e)+e*i.l,a:t.a*(1-e)+e*i.a,b:t.b*(1-e)+e*i.b};return l.toRGB(d)}function d(o,l){if(o){var i,d=l||r.PREDEFINED_JSON_COLOR_RAMPS,p=null;return"algorithmic"===o.type?d.some(function(r){if(t(o.fromColor.toRgb(),r.fromColor)&&t(o.toColor.toRgb(),r.toColor))return p=r.id,!0}):"multipart"===o.type&&d.some(function(r){if(o.colorRamps&&r.colorRamps&&o.colorRamps.length===r.colorRamps.length&&(i=o.colorRamps,!r.colorRamps.some(function(o,r){if(!t(i[r].fromColor.toRgb(),new e(o.fromColor).toRgb())||!t(i[r].toColor.toRgb(),new e(o.toColor).toRgb()))return!0}))){if(p)return!0;p=r.id}}),p}}function p(o){var e=d(o);return e?r.PREDEFINED_COLOR_RAMP_NAME_MAP[e]:null}function n(o,r){if(o&&r){for(var l,t,d,p,n,f="multipart"===o.type?o.colorRamps.length:1,C=[],m=[],a=0,g=0;g<f;g++)C[g]={start:null,end:null},C[g].start=a,C[g].end=a+1/f,a=C[g].end;for(var g=0;g<r;g++)!function(f){p=(f+.5)/r,C.forEach(function(r,C){p>=r.start&&p<r.end&&(n=(p-r.start)/(r.end-r.start),"multipart"===o.type?(l=new e(o.colorRamps[C].fromColor),t=new e(o.colorRamps[C].toColor)):(l=new e(o.fromColor),t=new e(o.toColor)),d=i(l,t,n),m.push([f,d.r,d.g,d.b]))})}(g);return m}}Object.defineProperty(r,"__esModule",{value:!0}),r.PREDEFINED_JSON_COLOR_RAMPS=[{id:"aspect_predefined",type:"multipart",colorRamps:[{fromColor:[190,190,190],toColor:[255,45,8]},{fromColor:[255,45,8],toColor:[255,181,61]},{fromColor:[255,181,61],toColor:[255,254,52]},{fromColor:[255,254,52],toColor:[0,251,50]},{fromColor:[0,251,50],toColor:[255,254,52]},{fromColor:[0,253,255],toColor:[0,181,255]},{fromColor:[0,181,255],toColor:[26,35,253]},{fromColor:[26,35,253],toColor:[255,57,251]},{fromColor:[255,57,251],toColor:[255,45,8]}]},{id:"blackToWhite_predefined",fromColor:[0,0,0],toColor:[255,255,255]},{id:"blueBright_predefined",fromColor:[204,204,255],toColor:[0,0,224]},{id:"blueLightToDark_predefined",fromColor:[211,229,232],toColor:[46,100,140]},{id:"blueGreenBright_predefined",fromColor:[203,245,234],toColor:[48,207,146]},{id:"blueGreenLightToDark_predefined",fromColor:[216,242,237],toColor:[21,79,74]},{id:"brownLightToDark_predefined",fromColor:[240,236,170],toColor:[102,72,48]},{id:"brownToBlueGreenDivergingBright_predefined",type:"multipart",colorRamps:[{fromColor:[156,85,31],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[33,130,145]}]},{id:"brownToBlueGreenDivergingDark_predefined",type:"multipart",colorRamps:[{fromColor:[110,70,45],toColor:[204,204,102]},{fromColor:[204,204,102],toColor:[48,100,102]}]},{id:"coefficientBias_predefined",fromColor:[214,214,255],toColor:[0,57,148]},{id:"coldToHotDiverging_predefined",type:"multipart",colorRamps:[{fromColor:[69,117,181],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[214,47,39]}]},{id:"conditionNumber_predefined",type:"multipart",colorRamps:[{fromColor:[0,97,0],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[255,34,0]}]},{id:"cyanToPurple_predefined",type:"multipart",colorRamps:[{fromColor:[0,245,245],toColor:[0,0,245]},{fromColor:[0,0,245],toColor:[245,0,245]}]},{id:"cyanLightToBlueDark_predefined",type:"multipart",colorRamps:[{fromColor:[182,237,240],toColor:[31,131,224]},{fromColor:[31,131,224],toColor:[9,9,145]}]},{id:"distance_predefined",fromColor:[255,200,0],toColor:[0,0,255]},{id:"elevation1_predefined",type:"multipart",colorRamps:[{fromColor:[175,240,233],toColor:[255,255,179]},{fromColor:[255,255,179],toColor:[0,128,64]},{fromColor:[0,128,64],toColor:[252,186,3]},{fromColor:[252,186,3],toColor:[128,0,0]},{fromColor:[120,0,0],toColor:[105,48,13]},{fromColor:[105,48,13],toColor:[171,171,171]},{fromColor:[171,171,171],toColor:[255,252,255]}]},{id:"elevation2_predefined",type:"multipart",colorRamps:[{fromColor:[118,219,211],toColor:[255,255,199]},{fromColor:[255,255,199],toColor:[255,255,128]},{fromColor:[255,255,128],toColor:[217,194,121]},{fromColor:[217,194,121],toColor:[135,96,38]},{fromColor:[135,96,38],toColor:[150,150,181]},{fromColor:[150,150,181],toColor:[181,150,181]},{fromColor:[181,150,181],toColor:[255,252,255]}]},{id:"errors_predefined",fromColor:[255,235,214],toColor:[196,10,10]},{id:"grayLightToDark_predefined",fromColor:[219,219,219],toColor:[69,69,69]},{id:"greenBright_predefined",fromColor:[204,255,204],toColor:[14,204,14]},{id:"greenLightToDark_predefined",fromColor:[220,245,233],toColor:[34,102,51]},{id:"greenToBlue_predefined",type:"multipart",colorRamps:[{fromColor:[32,204,16],toColor:[0,242,242]},{fromColor:[0,242,242],toColor:[2,33,227]}]},{id:"orangeBright_predefined",fromColor:[255,235,204],toColor:[240,118,5]},{id:"orangeLightToDark_predefined",fromColor:[250,233,212],toColor:[171,65,36]},{id:"partialSpectrum_predefined",type:"multipart",colorRamps:[{fromColor:[242,241,162],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[255,0,0]},{fromColor:[252,3,69],toColor:[176,7,237]},{fromColor:[176,7,237],toColor:[2,29,173]}]},{id:"partialSpectrum1Diverging_predefined",type:"multipart",colorRamps:[{fromColor:[135,38,38],toColor:[240,149,12]},{fromColor:[240,149,12],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[74,80,181]},{fromColor:[74,80,181],toColor:[39,32,122]}]},{id:"partialSpectrum2Diverging_predefined",type:"multipart",colorRamps:[{fromColor:[115,77,42],toColor:[201,137,52]},{fromColor:[201,137,52],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[91,63,176]},{fromColor:[91,63,176],toColor:[81,13,97]}]},{id:"pinkToYellowGreenDivergingBright_predefined",type:"multipart",colorRamps:[{fromColor:[158,30,113],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[99,110,45]}]},{id:"pinkToYellowGreenDivergingDark_predefined",type:"multipart",colorRamps:[{fromColor:[97,47,73],toColor:[204,204,102]},{fromColor:[204,204,102],toColor:[22,59,15]}]},{id:"precipitation_predefined",type:"multipart",colorRamps:[{fromColor:[194,82,60],toColor:[237,161,19]},{fromColor:[237,161,19],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[0,219,0]},{fromColor:[0,219,0],toColor:[32,153,143]},{fromColor:[32,153,143],toColor:[11,44,122]}]},{id:"prediction_predefined",type:"multipart",colorRamps:[{fromColor:[40,146,199],toColor:[250,250,100]},{fromColor:[250,250,100],toColor:[232,16,20]}]},{id:"purpleBright_predefined",fromColor:[255,204,255],toColor:[199,0,199]},{id:"purpleToGreenDivergingBright_predefined",type:"multipart",colorRamps:[{fromColor:[77,32,150],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[20,122,11]}]},{id:"purpleToGreenDivergingDark_predefined",type:"multipart",colorRamps:[{fromColor:[67,14,89],toColor:[204,204,102]},{fromColor:[204,204,102],toColor:[24,79,15]}]},{id:"purpleBlueBright_predefined",fromColor:[223,184,230],toColor:[112,12,242]},{id:"purpleBlueLightToDark_predefined",fromColor:[229,213,242],toColor:[93,44,112]},{id:"purpleRedBright_predefined",fromColor:[255,204,225],toColor:[199,0,99]},{id:"purpleRedLightToDark_predefined",fromColor:[250,215,246],toColor:[143,17,57]},{id:"redBright_predefined",fromColor:[255,204,204],toColor:[219,0,0]},{id:"redLightToDark_predefined",fromColor:[255,224,224],toColor:[143,10,10]},{id:"redToBlueDivergingBright_predefined",type:"multipart",colorRamps:[{fromColor:[196,69,57],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[48,95,207]}]},{id:"redToBlueDivergingDark_predefined",type:"multipart",colorRamps:[{fromColor:[107,13,13],toColor:[204,204,102]},{fromColor:[204,204,102],toColor:[13,53,97]}]},{id:"redToGreen_predefined",type:"multipart",colorRamps:[{fromColor:[245,0,0],toColor:[245,245,0]},{fromColor:[245,245,0],toColor:[0,245,0]}]},{id:"redToGreenDivergingBright_predefined",type:"multipart",colorRamps:[{fromColor:[186,20,20],toColor:[255,255,191]},{fromColor:[255,255,191],toColor:[54,145,33]}]},{id:"redToGreenDivergingDark_predefined",type:"multipart",colorRamps:[{fromColor:[97,21,13],toColor:[204,204,102]},{fromColor:[204,204,102],toColor:[16,69,16]}]},{id:"slope_predefined",type:"multipart",colorRamps:[{fromColor:[56,168,0],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[255,0,0]}]},{id:"spectrumFullBright_predefined",type:"multipart",colorRamps:[{fromColor:[255,0,0],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[0,255,255]},{fromColor:[0,255,255],toColor:[0,0,255]}]},{id:"spectrumFullDark_predefined",type:"multipart",colorRamps:[{fromColor:[153,0,0],toColor:[153,153,0]},{fromColor:[153,153,0],toColor:[0,153,153]},{fromColor:[0,153,153],toColor:[0,0,153]}]},{id:"spectrumFullLight_predefined",type:"multipart",colorRamps:[{fromColor:[255,153,153],toColor:[255,255,153]},{fromColor:[255,255,153],toColor:[153,255,255]},{fromColor:[153,255,255],toColor:[153,153,255]}]},{id:"surface_predefined",type:"multipart",colorRamps:[{fromColor:[112,153,89],toColor:[242,238,162]},{fromColor:[242,238,162],toColor:[242,206,133]},{fromColor:[242,206,133],toColor:[194,140,124]},{fromColor:[194,140,124],toColor:[255,242,255]}]},{id:"temperature_predefined",type:"multipart",colorRamps:[{fromColor:[255,252,255],toColor:[255,0,255]},{fromColor:[255,0,255],toColor:[0,0,255]},{fromColor:[0,0,255],toColor:[0,255,255]},{fromColor:[0,255,255],toColor:[0,255,0]},{fromColor:[0,255,0],toColor:[255,255,0]},{fromColor:[255,255,0],toColor:[255,128,0]},{fromColor:[255,128,0],toColor:[128,0,0]}]},{id:"whiteToBlack_predefined",fromColor:[255,255,255],toColor:[0,0,0]},{id:"yellowToDarkRed_predefined",type:"multipart",colorRamps:[{fromColor:[255,255,128],toColor:[242,167,46]},{fromColor:[242,167,46],toColor:[107,0,0]}]},{id:"yellowToGreenToDarkBlue_predefined",type:"multipart",colorRamps:[{fromColor:[255,255,128],toColor:[56,224,9]},{fromColor:[56,224,9],toColor:[26,147,171]},{fromColor:[26,147,171],toColor:[12,16,120]}]},{id:"yellowToRed_predefined",fromColor:[245,245,0],toColor:[255,0,0]},{id:"yellowGreenBright_predefined",fromColor:[236,252,204],toColor:[157,204,16]},{id:"yellowGreenLightToDark_predefined",fromColor:[215,240,175],toColor:[96,107,45]}],r.PREDEFINED_COLOR_RAMP_NAME_MAP={aspect_predefined:"Aspect",blackToWhite_predefined:"Black to White",blueBright_predefined:"Blue Bright",blueLightToDark_predefined:"Blue Light to Dark",blueGreenBright_predefined:"Blue-Green Bright",blueGreenLightToDark_predefined:"Blue-Green Light to Dark",brownLightToDark_predefined:"Brown Light to Dark",brownToBlueGreenDivergingBright_predefined:"Brown to Blue Green Diverging, Bright",brownToBlueGreenDivergingDark_predefined:"Brown to Blue Green Diverging, Dark",coefficientBias_predefined:"Coefficient Bias",coldToHotDiverging_predefined:"Cold to Hot Diverging",conditionNumber_predefined:"Condition Number",cyanToPurple_predefined:"Cyan to Purple",cyanLightToBlueDark_predefined:"Cyan-Light to Blue-Dark",distance_predefined:"Distance",elevation1_predefined:"Elevation #1",elevation2_predefined:"Elevation #2",errors_predefined:"Errors",grayLightToDark_predefined:"Gray Light to Dark",greenBright_predefined:"Green Bright",greenLightToDark_predefined:"Green Light to Dark",greenToBlue_predefined:"Green to Blue",orangeBright_predefined:"Orange Bright",orangeLightToDark_predefined:"Orange Light to Dark",partialSpectrum_predefined:"Partial Spectrum",partialSpectrum1Diverging_predefined:"Partial Spectrum 1 Diverging",partialSpectrum2Diverging_predefined:"Partial Spectrum 2 Diverging",pinkToYellowGreenDivergingBright_predefined:"Pink to YellowGreen Diverging, Bright",pinkToYellowGreenDivergingDark_predefined:"Pink to YellowGreen Diverging, Dark",precipitation_predefined:"Precipitation",prediction_predefined:"Prediction",purpleBright_predefined:"Purple Bright",purpleToGreenDivergingBright_predefined:"Purple to Green Diverging, Bright",purpleToGreenDivergingDark_predefined:"Purple to Green Diverging, Dark",purpleBlueBright_predefined:"Purple-Blue Bright",purpleBlueLightToDark_predefined:"Purple-Blue Light to Dark",purpleRedBright_predefined:"Purple-Red Bright",purpleRedLightToDark_predefined:"Purple-Red Light to Dark",redBright_predefined:"Red Bright",redLightToDark_predefined:"Red Light to Dark",redToBlueDivergingBright_predefined:"Red to Blue Diverging, Bright",redToBlueDivergingDark_predefined:"Red to Blue Diverging, Dark",redToGreen_predefined:"Red to Green",redToGreenDivergingBright_predefined:"Red to Green Diverging, Bright",redToGreenDivergingDark_predefined:"Red to Green Diverging, Dark",slope_predefined:"Slope",spectrumFullBright_predefined:"Spectrum-Full Bright",spectrumFullDark_predefined:"Spectrum-Full Dark",spectrumFullLight_predefined:"Spectrum-Full Light",surface_predefined:"Surface",temperature_predefined:"Temperature",whiteToBlack_predefined:"White to Black",yellowToDarkRed_predefined:"Yellow to Dark Red",yellowToGreenToDarkBlue_predefined:"Yellow to Green to Dark Blue",yellowToRed_predefined:"Yellow to Red",yellowGreenBright_predefined:"Yellow-Green Bright",yellowGreenLightToDark_predefined:"Yellow-Green Light to Dark"},r.getColorRampId=d,r.getColorRampName=p,r.convertColorRampToColormap=n});