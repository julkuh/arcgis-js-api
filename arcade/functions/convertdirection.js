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

define(["require","exports","../Dictionary","../languageUtils"],(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.convertDirection=r.preciseDivide=r.preciseMultiply=r.preciseMinus=r.preciseAdd=void 0;var i=function(e){return function(r,t,n){return n=n||14,+e(r,t).toFixed(n)}},s=function(e,r){return e+r},a=function(e,r){return e-r},o=function(e,r){return e*r},c=function(e,r){return e/r};r.preciseAdd=function(e,r,t){return i(s)(e,r,t)},r.preciseMinus=function(e,r,t){return i(a)(e,r,t)},r.preciseMultiply=function(e,r,t){return i(o)(e,r,t)},r.preciseDivide=function(e,r,t){return i(c)(e,r,t)};var u,d,l,f,m=2*Math.PI,h=648e3/Math.PI,_=String.fromCharCode(7501);function g(e){if(!1===n.isString(e))throw new Error("Invalid Parameter");return e}function p(e,r){var t=Math.pow(10,r);return Math.round(e*t)/t}function w(e){var r,t=parseFloat(e.toString().replace(function(e){return e=+e,isFinite(e)?e-e%1||(e<0?-0:0===e?e:0):e}(e).toString(),"0"))*(((r=e)>0)-(r<0)||+r);return e<0?{fraction:t,integer:Math.ceil(e)}:{fraction:t,integer:Math.floor(e)}}function v(e,r){switch(e){case 0:return"SHORT"===r?"N":"North";case 1:return"SHORT"===r?"E":"East";case 2:return"SHORT"===r?"S":"South";case 3:return"SHORT"===r?"W":"West"}}function D(e,r,t){for(;e.length<t;)e=r+e;return e}function E(e,r){return e-Math.floor(e/r)*r}function A(e){switch(e){case 6:case 1:return 360;case 4:return m;case 5:return 400;case 2:return 1296e3;case 7:case 8:return 60;default:throw new Error("Unnexpected evaluations")}}function S(e){switch(e.toUpperCase().trim()){case"NORTH":case"NORTHAZIMUTH":case"NORTH AZIMUTH":return 1;case"POLAR":return 2;case"QUADRANT":return 3;case"SOUTH":case"SOUTHAZIMUTH":case"SOUTH AZIMUTH":return 4}throw new Error("Unsupported direction type")}function M(e){switch(e.toUpperCase().trim()){case"D":case"DD":case"DECIMALDEGREE":case"DECIMAL DEGREE":case"DEGREE":case"DECIMALDEGREES":case"DECIMAL DEGREES":case"DEGREES":return 1;case"DMS":case"DEGREESMINUTESSECONDS":case"DEGREES MINUTES SECONDS":return 3;case"R":case"RAD":case"RADS":case"RADIAN":case"RADIANS":return 4;case"G":case"GON":case"GONS":case"GRAD":case"GRADS":case"GRADIAN":case"GRADIANS":return 5}throw new Error("Unsupported units")}!function(e){e[e.north=0]="north",e[e.east=1]="east",e[e.south=2]="south",e[e.west=3]="west"}(u||(u={})),function(e){e[e.decimal_degrees=1]="decimal_degrees",e[e.seconds=2]="seconds",e[e.degrees_minutes_seconds=3]="degrees_minutes_seconds",e[e.radians=4]="radians",e[e.gradians=5]="gradians",e[e.truncated_degrees=6]="truncated_degrees",e[e.fractional_degree_minutes=7]="fractional_degree_minutes",e[e.fractional_minute_seconds=8]="fractional_minute_seconds"}(d||(d={})),function(e){e[e.north_azimuth=1]="north_azimuth",e[e.polar=2]="polar",e[e.quadrant=3]="quadrant",e[e.south_azimuth=4]="south_azimuth"}(l||(l={})),function(e){e[e.meridian=0]="meridian",e[e.direction=1]="direction"}(f||(f={}));var R=function(){function e(e,r,t){this.m_degrees=e,this.m_minutes=r,this.m_seconds=t}return e.prototype.get_field=function(e){switch(e){case 1:case 6:return this.m_degrees;case 7:return this.m_minutes;case 2:case 8:return this.m_seconds;default:throw new Error("Unnexpected evaluation")}},e.seconds_to_DMS=function(r){var t=w(r).fraction,n=w(r).integer,i=Math.floor(n/3600);n-=3600*i;var s=Math.floor(n/60);return new e(i,s,(n-=60*s)+t)},e.number_to_dms=function(t){var n=w(t).fraction,i=w(t).integer,s=r.preciseMultiply(w(100*n).fraction,100);return new e(i,w(100*n).integer,s)},e.prototype.format=function(t,n){var i=p(this.m_seconds,n),s=this.m_minutes,a=this.m_degrees;if(2===t||8===t)60<=i&&(i-=60,++s),60<=s&&(s=0,++a),360<=a&&(a=0);else if(7===t)i=0,s=30<=this.m_seconds?this.m_minutes+1:this.m_minutes,a=this.m_degrees,60<=s&&(s=0,++a),360<=a&&(a=0);else if(1===t||6===t){var o=r.preciseDivide(this.m_seconds,3600),c=r.preciseDivide(this.m_minutes,60);a=Math.round(this.m_degrees+c+o),s=0,i=0}return new e(a,s,i)},e.DMS_to_seconds=function(e,r,t){return 3600*e+60*r+t},e}(),T=function(){function e(e,r,t){this.meridian=e,this.angle=r,this.direction=t}return e.prototype.fetch_azimuth=function(e){return 0===e?this.meridian:this.direction},e}(),y=function(){function e(e){this.m_angle=e}return e.createFromAngleAndDirection=function(r,t){return new e(new I(e.convertDirectionFormat(r.extract_angular_units(2),t,1)))},e.prototype.getAngle=function(r){var t=this.m_angle.extract_angular_units(2);switch(r){case 1:case 4:case 2:return new I(e.convertDirectionFormat(t,1,r));case 3:var n=e.seconds_north_azimuth_to_quadrant(t);return new I(n.angle)}},e.prototype.getMeridian=function(r){var t=this.m_angle.extract_angular_units(2);switch(r){case 1:return 0;case 4:return 2;case 2:return 1;case 3:return e.seconds_north_azimuth_to_quadrant(t).meridian}},e.prototype.getDirection=function(r){var t=this.m_angle.extract_angular_units(2);switch(r){case 1:return 1;case 4:return 3;case 2:return 0;case 3:return e.seconds_north_azimuth_to_quadrant(t).direction}},e.seconds_north_azimuth_to_quadrant=function(e){var r=e<=324e3||e>=972e3?0:2,t=0===r?Math.min(1296e3-e,e):Math.abs(e-648e3);return new T(r,t,e>648e3?3:1)},e.createFromAngleMeridianAndDirection=function(r,t,n){return new e(new I(e.secondsQuadrantToNorthAzimuth(r.extract_angular_units(2),t,n)))},e.secondsQuadrantToNorthAzimuth=function(e,r,t){return 0===r?1===t?e:1296e3-e:1===t?648e3-e:648e3+e},e.convertDirectionFormat=function(e,r,t){var n=0;switch(r){case 1:n=e;break;case 2:n=324e3-e;break;case 3:throw new Error("Unnexpected evaluation");case 4:n=e+648e3}var i=0;switch(t){case 1:i=n;break;case 2:i=324e3-n;break;case 3:throw new Error("Unnexpected evaluation");case 4:i=n-648e3}return(i=i%1296e3)<0?1296e3+i:i},e}();function F(e,t,n){var i=null;switch(t){case 1:i=r.preciseMultiply(e,3600);break;case 2:i=e;break;case 5:i=r.preciseMultiply(e,3240);break;case 4:i=r.preciseMultiply(e,h);break;default:throw new Error("Unnexpected evaluation")}switch(n){case 1:return r.preciseDivide(i,3600);case 2:return i;case 5:return r.preciseDivide(i,3240);case 4:return i/h;default:throw new Error("Unnexpected evaluation")}}var I=function(){function e(e){this.m_seconds=e}return e.createFromAngleAndUnits=function(r,t){return new e(F(r,t,2))},e.prototype.extract_angular_units=function(e){return F(this.m_seconds,2,U(e))},e.createFromDegreesMinutesSeconds=function(t,n,i){return new e(r.preciseAdd(r.preciseAdd(r.preciseMultiply(t,3600),r.preciseMultiply(n,60)),i))},e}();function U(e){switch(e){case 1:case 6:case 3:return 1;case 5:return 5;case 7:return 7;case 4:return 4;case 2:case 8:return 2}}var N=function(){function e(e,r,t,n){this.m_view=e,this.m_angle=r,this.m_merdian=t,this.m_direction=n,this.m_dms=null,this.m_formatted_dms=null}return e.createFromStringAndBearing=function(r,t,n){return new e(r,t.getAngle(n),t.getMeridian(n),t.getDirection(n))},e.prototype.fetch_angle=function(){return this.m_angle},e.prototype.fetch_meridian=function(){return this.m_merdian},e.prototype.fetch_direction=function(){return this.m_direction},e.prototype.fetch_m_view=function(){return this.m_view},e.prototype.fetch_dms=function(){return null===this.m_dms&&this.calculate_dms(),this.m_dms},e.prototype.fetch_formatted_dms=function(){return null===this.m_formatted_dms&&this.calculate_dms(),this.m_formatted_dms},e.prototype.calculate_dms=function(){for(var e=null,r=6,t=0,n=0;n<this.m_view.length;n++){var i=this.m_view[n];switch(i){case"m":r=6===r?7:r,n=(e=C(this.m_view,n,i)).newpos;continue;case"s":r=8,t=t<(e=C(this.m_view,n,i)).rounding?e.rounding:t,n=e.newpos;continue;default:continue}}this.m_dms=R.seconds_to_DMS(this.m_angle.extract_angular_units(2)),this.m_formatted_dms=R.seconds_to_DMS(this.m_angle.extract_angular_units(2)).format(r,t)},e}();function b(e,r,t,n,i){switch(r){case 1:case 4:case 5:return D(E(p(e.extract_angular_units(r),n),A(r)).toFixed(n),"0",t+n+(n>0?1:0));case 6:case 7:return D(E(i.fetch_formatted_dms().get_field(r),A(r)).toFixed(n),"0",t+n+(n>0?1:0));case 8:return D(E(p(i.fetch_dms().get_field(r),n),A(r)).toFixed(n),"0",t+n+(n>0?1:0));default:throw new Error("Unnexepected evaluation")}}function x(e){switch(e.toUpperCase().trim()){case"N":case"NORTH":return 0;case"E":case"EAST":return 1;case"S":case"SOUTH":return 2;case"W":case"WEST":return 3}return null}function O(e){var r=parseFloat(e);if(n.isNumber(r)){if(isNaN(r))throw new Error("Invalid conversion");return r}throw new Error("Invalid conversion")}function G(e,r,t){var i=3===t,s=null,a=null,o=0,c=0,u=0;if(i){if(e.length<2)throw new Error("Conversion Error");u=1;var d=function(e){switch(n.toNumber(e)){case 1:return{first:0,second:1};case 2:return{first:2,second:1};case 3:return{first:2,second:3};case 4:return{first:0,second:3}}return null}(n.toString(e[e.length-1]));if(d?(s=d.first,a=d.second):(o=1,s=x(n.toString(e[0])),a=x(n.toString(e[e.length-1]))),null===s||null===a)throw new Error("Invalid Conversion")}switch(r){case 1:case 4:case 5:if(0===e.length)throw new Error("Invalid Conversion");return i?y.createFromAngleMeridianAndDirection(I.createFromAngleAndUnits(O(e[o]),U(r)),s,a):y.createFromAngleAndDirection(I.createFromAngleAndUnits(O(e[o]),U(r)),t);case 3:if(3===(c=e.length-u-o)){var l=I.createFromDegreesMinutesSeconds(O(e[o]),O(e[o+1]),O(e[o+2]));return i?y.createFromAngleMeridianAndDirection(l,s,a):y.createFromAngleAndDirection(l,t)}if(1===c){var f=O(e[o]),m=R.number_to_dms(f),h=I.createFromDegreesMinutesSeconds(m.m_degrees,m.m_minutes,m.m_seconds);return i?y.createFromAngleMeridianAndDirection(h,s,a):y.createFromAngleAndDirection(h,t)}}throw new Error("Conversion Error")}function H(e,r,t){if(n.isNumber(e))return function(e,r,t){if(3===t)throw new Error("Conversion error");if(3===r){var n=R.number_to_dms(e);return y.createFromAngleAndDirection(I.createFromDegreesMinutesSeconds(n.m_degrees,n.m_minutes,n.m_seconds),t)}return y.createFromAngleAndDirection(I.createFromAngleAndUnits(e,U(r)),t)}(n.toNumber(e),r,t);if(n.isString(e))return G(function(e){for(var r=[" ","-","/","'",'"',"\\","^","°",_,"\t","\r","\n","*"],t="",n=0;n<e.length;n++){var i=e.charAt(n);-1!==r.indexOf(i)?t+="RRSPLITRRSPLITRR":t+=i}return t.split("RRSPLITRRSPLITRR").filter((function(e){return""!==e}))}(e),r,t);if(n.isArray(e))return G(e,r,t);if(n.isImmutableArray(e))return G(e.toArray(),r,t);throw new Error("Conversion Error")}function C(e,r,t){for(var n={padding:0,rounding:0,newpos:r},i=!1;r<e.length;){var s=e[r];if(s===t)i?n.rounding++:n.padding++,r++;else{if("."!==s)break;i=!0,r++}}return n.newpos=r-1,n}function P(e,r,t){var n={escaped:"",newpos:r};for(r++;r<e.length;){var i=e[r];if(r++,"]"===i)break;n.escaped+=i}return n.newpos=r-1,n}r.convertDirection=function(e,r,i){if(!(r instanceof t))throw new Error("Invalid Parameter");if(!1===r.hasField("directionType"))throw new Error("Invalid Parameter - Missing directionType");if(!1===r.hasField("angleType"))throw new Error("Invalid Parameter - Missing directionType");var s=S(g(r.field("directiontype"))),a=H(e,M(g(r.field("angletype"))),s);if(!(i instanceof t))throw new Error("Invalid Parameter");if(!1===i.hasField("directionType"))throw new Error("Invalid Parameter - Missing directionType");if(!1===i.hasField("outputType"))throw new Error("Invalid Parameter - Missing directionType");var o=S(g(i.field("directiontype"))),c=i.hasField("angleType")?M(g(i.field("angletype"))):null,u=g(i.field("outputType")).toUpperCase().trim();if(!o||!u)throw new Error("Conversion error");if(!(c||"TEXT"===u&&i.hasField("format")))throw new Error("Invalid unit");switch(u){case"VALUE":return 3===o||3===c?function(e,r,t){var n=e.getAngle(r);if(3===r&&3===t){var i=R.seconds_to_DMS(n.extract_angular_units(2));return[v(e.getMeridian(r),"SHORT"),i.m_degrees,i.m_minutes,i.m_seconds,v(e.getDirection(r),"SHORT")]}return 3===t?[(i=R.seconds_to_DMS(n.extract_angular_units(2))).m_degrees,i.m_minutes,i.m_seconds]:3===r?[v(e.getMeridian(r),"SHORT"),n.extract_angular_units(t),v(e.getDirection(r),"SHORT")]:[n.extract_angular_units(t)]}(a,o,c):function(e,r,t){var n=U(t);if(n&&3!==t)return e.getAngle(r).extract_angular_units(n);throw new Error("Conversion Error")}(a,o,c);case"TEXT":var d="";return i.hasField("format")&&(d=n.toString(i.field("format"))),null!==d&&""!==d||(d=function(e,r){var t="";switch(e){case 1:t=3===r?"DD.DD°":"DDD.DD°";break;case 3:t=3===r?"dd° mm' ss\"":"ddd° mm' ss.ss\"";break;case 4:t="R.RR";break;case 5:t="GGG.GG"+_;break;default:throw new Error("Conversion error")}return 3===r&&(t="p "+t+" b"),t}(c,o)),function(e,r,t){for(var n="",i=null,s=N.createFromStringAndBearing(r,e,t),a={D:1,d:6,m:7,s:8,R:4,G:5},o=0;o<r.length;o++){var c=r[o];switch(c){case"[":n+=(i=P(r,o)).escaped,o=i.newpos;continue;case"D":case"d":case"m":case"s":case"R":case"G":i=C(r,o,c),n+=b(e.getAngle(t),a[c],i.padding,i.rounding,s),o=i.newpos;continue;case"P":case"p":n+=v(s.fetch_meridian(),"p"===c?"SHORT":"LONG");continue;case"B":case"b":n+=v(s.fetch_direction(),"b"===c?"SHORT":"LONG");continue;default:n+=c}}return n}(a,d,o);default:throw new Error("Invalid Parameter")}}}));