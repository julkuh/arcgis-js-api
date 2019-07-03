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

define(["require","exports","../../kernel","../kernel","../languageUtils","./centroid","../../geometry/Extent","../../geometry/Geometry","../../geometry/Multipoint","../../geometry/Point","../../geometry/Polygon","../../geometry/Polyline","../../geometry/support/jsonUtils"],function(e,n,r,t,o,u,i,a,l,f,c,s,m){function g(e){return 0===r.version.indexOf("4.")?c.fromExtent(e):new c({spatialReference:e.spatialReference,rings:[[[e.xmin,e.ymin],[e.xmin,e.ymax],[e.xmax,e.ymax],[e.xmax,e.ymin],[e.xmin,e.ymin]]]})}function d(e){y=e}function h(e,n){function r(e){if(o.pcCheck(e,2,2),e[0]instanceof a&&e[1]instanceof a);else if(e[0]instanceof a&&null===e[1]);else if(e[1]instanceof a&&null===e[0]);else if(null!==e[0]||null!==e[1])throw new Error("Illegal Argument")}e.disjoint=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null===t[0]||null===t[1]||y.disjoint(t[0],t[1])})},e.intersects=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.intersects(t[0],t[1])})},e.touches=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.touches(t[0],t[1])})},e.crosses=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.crosses(t[0],t[1])})},e.within=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.within(t[0],t[1])})},e.contains=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.contains(t[0],t[1])})},e.overlaps=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null!==t[0]&&null!==t[1]&&y.overlaps(t[0],t[1])})},e.equals=function(e,r){return n(e,r,function(e,n,r){return o.pcCheck(r,2,2),r[0]===r[1]||(r[0]instanceof a&&r[1]instanceof a?y.equals(r[0],r[1]):!(!o.isDate(r[0])||!o.isDate(r[1]))&&r[0].getTime()===r[1].getTime())})},e.relate=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,3,3),r[0]instanceof a&&r[1]instanceof a)return y.relate(r[0],r[1],o.toString(r[2]));if(r[0]instanceof a&&null===r[1])return!1;if(r[1]instanceof a&&null===r[0])return!1;if(null===r[0]&&null===r[1])return!1;throw new Error("Illegal Argument")})},e.intersection=function(e,t){return n(e,t,function(e,n,t){return t=o.autoCastFeatureToGeometry(t),r(t),null===t[0]||null===t[1]?null:y.intersect(t[0],t[1])})},e.union=function(e,r){return n(e,r,function(n,r,u){u=o.autoCastFeatureToGeometry(u);var i=[];if(0===u.length)throw new Error("Function called with wrong number of Parameters");if(1===u.length)if(o.isArray(u[0])){for(var l=o.autoCastFeatureToGeometry(u[0]),f=0;f<l.length;f++)if(null!==l[f]){if(!(l[f]instanceof a))throw new Error("Illegal Argument");i.push(l[f])}}else{if(!o.isImmutableArray(u[0])){if(u[0]instanceof a)return o.fixSpatialReference(t.cloneGeometry(u[0]),e.spatialReference);if(null===u[0])return null;throw new Error("Illegal Argument")}for(var c=o.autoCastFeatureToGeometry(u[0].toArray()),f=0;f<c.length;f++)if(null!==c[f]){if(!(c[f]instanceof a))throw new Error("Illegal Argument");i.push(c[f])}}else for(var f=0;f<u.length;f++)if(null!==u[f]){if(!(u[f]instanceof a))throw new Error("Illegal Argument");i.push(u[f])}return 0===i.length?null:y.union(i)})},e.difference=function(e,u){return n(e,u,function(e,n,u){return u=o.autoCastFeatureToGeometry(u),r(u),null!==u[0]&&null===u[1]?t.cloneGeometry(u[0]):null===u[0]?null:y.difference(u[0],u[1])})},e.symmetricdifference=function(e,u){return n(e,u,function(e,n,u){return u=o.autoCastFeatureToGeometry(u),r(u),null===u[0]&&null===u[1]?null:null===u[0]?t.cloneGeometry(u[1]):null===u[1]?t.cloneGeometry(u[0]):y.symmetricDifference(u[0],u[1])})},e.clip=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,2),!(r[1]instanceof i)&&null!==r[1])throw new Error("Illegal Argument");if(null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");return null===r[1]?null:y.clip(r[0],r[1])})},e.cut=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,2),!(r[1]instanceof s)&&null!==r[1])throw new Error("Illegal Argument");if(null===r[0])return[];if(!(r[0]instanceof a))throw new Error("Illegal Argument");return null===r[1]?[t.cloneGeometry(r[0])]:y.cut(r[0],r[1])})},e.area=function(e,r){return n(e,r,function(n,r,u){if(o.pcCheck(u,1,2),u=o.autoCastFeatureToGeometry(u),null===u[0])return 0;if(o.isArray(u[0])||o.isImmutableArray(u[0])){var i=o.autoCastArrayOfPointsToPolygon(u[0],e.spatialReference);return null===i?0:y.planarArea(i,t.convertSquareUnitsToCode(o.defaultUndefined(u[1],-1)))}if(!(u[0]instanceof a))throw new Error("Illegal Argument");return y.planarArea(u[0],t.convertSquareUnitsToCode(o.defaultUndefined(u[1],-1)))})},e.areageodetic=function(e,r){return n(e,r,function(n,r,u){if(o.pcCheck(u,1,2),u=o.autoCastFeatureToGeometry(u),null===u[0])return 0;if(o.isArray(u[0])||o.isImmutableArray(u[0])){var i=o.autoCastArrayOfPointsToPolygon(u[0],e.spatialReference);return null===i?0:y.geodesicArea(i,t.convertSquareUnitsToCode(o.defaultUndefined(u[1],-1)))}if(!(u[0]instanceof a))throw new Error("Illegal Argument");return y.geodesicArea(u[0],t.convertSquareUnitsToCode(o.defaultUndefined(u[1],-1)))})},e.length=function(e,r){return n(e,r,function(n,r,u){if(o.pcCheck(u,1,2),u=o.autoCastFeatureToGeometry(u),null===u[0])return 0;if(o.isArray(u[0])||o.isImmutableArray(u[0])){var i=o.autoCastArrayOfPointsToPolyline(u[0],e.spatialReference);return null===i?0:y.planarLength(i,t.convertLinearUnitsToCode(o.defaultUndefined(u[1],-1)))}if(!(u[0]instanceof a))throw new Error("Illegal Argument");return y.planarLength(u[0],t.convertLinearUnitsToCode(o.defaultUndefined(u[1],-1)))})},e.lengthgeodetic=function(e,r){return n(e,r,function(n,r,u){if(o.pcCheck(u,1,2),u=o.autoCastFeatureToGeometry(u),null===u[0])return 0;if(o.isArray(u[0])||o.isImmutableArray(u[0])){var i=o.autoCastArrayOfPointsToPolyline(u[0],e.spatialReference);return null===i?0:y.geodesicLength(i,t.convertLinearUnitsToCode(o.defaultUndefined(u[1],-1)))}if(!(u[0]instanceof a))throw new Error("Illegal Argument");return y.geodesicLength(u[0],t.convertLinearUnitsToCode(o.defaultUndefined(u[1],-1)))})},e.distance=function(e,r){return n(e,r,function(n,r,u){u=o.autoCastFeatureToGeometry(u),o.pcCheck(u,2,3);var i=u[0];(o.isArray(u[0])||o.isImmutableArray(u[0]))&&(i=o.autoCastArrayOfPointsToMultiPoint(u[0],e.spatialReference));var l=u[1];if((o.isArray(u[1])||o.isImmutableArray(u[1]))&&(l=o.autoCastArrayOfPointsToMultiPoint(u[1],e.spatialReference)),!(i instanceof a))throw new Error("Illegal Argument");if(!(l instanceof a))throw new Error("Illegal Argument");return y.distance(i,l,t.convertLinearUnitsToCode(o.defaultUndefined(u[2],-1)))})},e.densify=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return r[0]instanceof c||r[0]instanceof s?y.densify(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]instanceof i?y.densify(g(r[0]),u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]})},e.densifygeodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");if(u<=0)throw new Error("Illegal Argument");return r[0]instanceof c||r[0]instanceof s?y.geodesicDensify(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]instanceof i?y.geodesicDensify(g(r[0]),u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1))):r[0]})},e.generalize=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,4),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return y.generalize(r[0],u,o.toBoolean(o.defaultUndefined(r[2],!0)),t.convertLinearUnitsToCode(o.defaultUndefined(r[3],-1)))})},e.buffer=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return 0===u?t.cloneGeometry(r[0]):y.buffer(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)))})},e.buffergeodetic=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");return 0===u?t.cloneGeometry(r[0]):y.geodesicBuffer(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)))})},e.offset=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,6),null===r[0])return null;if(!(r[0]instanceof c||r[0]instanceof s))throw new Error("Illegal Argument");var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");var i=o.toNumber(o.defaultUndefined(r[4],10));if(isNaN(i))throw new Error("Illegal Argument");var a=o.toNumber(o.defaultUndefined(r[5],0));if(isNaN(a))throw new Error("Illegal Argument");return y.offset(r[0],u,t.convertLinearUnitsToCode(o.defaultUndefined(r[2],-1)),o.toString(o.defaultUndefined(r[3],"round")).toLowerCase(),i,a)})},e.rotate=function(e,r){return n(e,r,function(e,n,r){r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,2,3);var t=r[0];if(null===t)return null;if(!(t instanceof a))throw new Error("Illegal Argument");t instanceof i&&(t=c.fromExtent(t));var u=o.toNumber(r[1]);if(isNaN(u))throw new Error("Illegal Argument");var l=o.defaultUndefined(r[2],null);if(null===l)return y.rotate(t,u);if(l instanceof f)return y.rotate(t,u,l);throw new Error("Illegal Argument")})},e.centroid=function(e,r){return n(e,r,function(n,r,m){if(m=o.autoCastFeatureToGeometry(m),o.pcCheck(m,1,1),null===m[0])return null;var g=m[0];if((o.isArray(m[0])||o.isImmutableArray(m[0]))&&(g=o.autoCastArrayOfPointsToMultiPoint(m[0],e.spatialReference)),null===g)return null;if(!(g instanceof a))throw new Error("Illegal Argument");return g instanceof f?o.fixSpatialReference(t.cloneGeometry(m[0]),e.spatialReference):g instanceof c?g.centroid:g instanceof s?u.centroidPolyline(g):g instanceof l?u.centroidMultiPoint(g):g instanceof i?g.center:null})},e.multiparttosinglepart=function(e,r){return n(e,r,function(n,r,u){u=o.autoCastFeatureToGeometry(u),o.pcCheck(u,1,1);var g=[];if(null===u[0])return null;if(!(u[0]instanceof a))throw new Error("Illegal Argument");if(u[0]instanceof f)return[o.fixSpatialReference(t.cloneGeometry(u[0]),e.spatialReference)];if(u[0]instanceof i)return[o.fixSpatialReference(t.cloneGeometry(u[0]),e.spatialReference)];var d=y.simplify(u[0]);if(d instanceof c){for(var h=[],w=[],C=0;C<d.rings.length;C++)if(d.isClockwise(d.rings[C])){var p=m.fromJSON({rings:[d.rings[C]],hasZ:!0===d.hasZ,hasM:!0===d.hasM,spatialReference:d.spatialReference.toJSON()});h.push(p)}else w.push({ring:d.rings[C],pt:d.getPoint(C,0)});for(var A=0;A<w.length;A++)for(var T=0;T<h.length;T++)if(h[T].contains(w[A].pt)){h[T].addRing(w[A].ring);break}return h}if(d instanceof s){for(var v=[],C=0;C<d.paths.length;C++){var I=m.fromJSON({paths:[d.paths[C]],hasZ:!0===d.hasZ,hasM:!0===d.hasM,spatialReference:d.spatialReference.toJSON()});v.push(I)}return v}if(u[0]instanceof l){for(var G=o.fixSpatialReference(t.cloneGeometry(u[0]),e.spatialReference),C=0;C<G.points.length;C++)g.push(G.getPoint(C));return g}return null})},e.issimple=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,1),null===r[0])return!0;if(!(r[0]instanceof a))throw new Error("Illegal Argument");return y.isSimple(r[0])})},e.simplify=function(e,r){return n(e,r,function(e,n,r){if(r=o.autoCastFeatureToGeometry(r),o.pcCheck(r,1,1),null===r[0])return null;if(!(r[0]instanceof a))throw new Error("Illegal Argument");return y.simplify(r[0])})}}Object.defineProperty(n,"__esModule",{value:!0});var y=null;n.setGeometryEngine=d,n.registerFunctions=h});