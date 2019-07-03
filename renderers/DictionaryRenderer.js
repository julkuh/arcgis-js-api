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

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","../core/tsSupport/generatorHelper","../core/tsSupport/awaiterHelper","@dojo/framework/shim/Set","../Color","../request","../core/Error","../core/lang","../core/Logger","../core/promiseUtils","../core/accessorSupport/decorators","./Renderer","./mixins/VisualVariablesRenderer","../support/arcadeOnDemand","../symbols/CIMSymbol","../symbols/support/cimSymbolUtils"],function(e,t,r,i,o,n,s,a,l,u,c,p,d,h,f,y,m,b,g,v){var S=d.getLogger("esri.renderers.DictionaryRenderer"),_=function(e,t){return e.replace(/\{itemName\}/gi,t)};return function(e){function t(t){var r=e.call(this)||this;return r._arcadeUtils=null,r.config=null,r.description=null,r.label=null,r.type="dictionary",r}r(t,e),d=t,t.prototype.clone=function(){return new d({config:p.clone(this.config),description:p.clone(this.description),fieldMap:p.clone(this.fieldMap),label:p.clone(this.label),url:p.clone(this.url),visualVariables:p.clone(this.visualVariables)})},t.prototype.collectRequiredFields=function(e,t){return s(this,void 0,void 0,function(){var r;return n(this,function(i){switch(i.label){case 0:return[4,this.collectVVRequiredFields(e,t)];case 1:i.sent();for(r in this.fieldMap)e.add(this.fieldMap[r]);return[2]}})})},t.prototype.fetchResources=function(e){return s(this,void 0,void 0,function(){var t,r,i,s,l,p,d,f,y,m,g,m;return n(this,function(n){switch(n.label){case 0:return this.url?(this._dictionaryPromise=u(this.url+"/resources/styles/dictionary-info.json",o({responseType:"json",query:{f:"json"}},e)),[4,h.all([this._dictionaryPromise,b.loadArcade()])]):(S.error("no valid URL!"),[2]);case 1:if(t=n.sent(),r=t[0].data,i=t[1].arcadeUtils,!r)throw new c("esri.renderers.DictionaryRenderer","Bad dictionary data!");for(s=r.expression,l=r.authoringInfo,p=l.configuration,this._refSymbolUrlTemplate=r.cimRefTemplateUrl,this._itemNames=new a.default(r.itemsNames),d=new Map,this._symbolAttributes=l.symbol,this._syntaxTree=i.createSyntaxTree(s),f=0,y=p;f<y.length;f++)m=y[f],d.set("$"+m.name,m.value);if(g=this.config)for(m in g)d.set("$"+m,g[m]);return this._configurationAttributes=d,this._arcadeUtils=i,[2]}})})},t.prototype.fetchSymbol=function(e,t){return s(this,void 0,void 0,function(){var r,i,o,s,a,u,c,p,d,h,f,y,m,b,w,R,j,x,M,N,U,A;return n(this,function(n){switch(n.label){case 0:return this._dictionaryPromise||this.fetchResources(t),[4,this._dictionaryPromise];case 1:for(n.sent(),r={},this._configurationAttributes.forEach(function(e,t){r[t]=e}),i=0,o=this._symbolAttributes;i<o.length;i++)s=o[i],a=this.fieldMap[s],a&&null!==e.attributes[a]&&void 0!==e.attributes[a]?(u=""+e.attributes[a],r["$"+s]=u):r["$"+s]="";if(c=this._arcadeUtils,!(p=c.evalSyntaxTree(this._syntaxTree,{vars:r,spatialReference:null}))||"string"!=typeof p)return[2,null];for(d=p.split(";"),h=[],f=[],y=0,m=d;y<m.length;y++)if((b=m[y])&&0!==b.length)if(-1===b.indexOf("po:"))if(-1!==b.indexOf("|"))for(N=0,U=b.split("|");N<U.length;N++)A=U[N],this._itemNames.has(A)&&h.push(A);else this._itemNames.has(b)&&h.push(b);else w=b.substr(3).split("|"),3===w.length&&(R=w[0],j=w[1],x=w[2],"DashTemplate"===j?x=x.split(" ").map(function(e){return Number(e)}):"Color"===j?(M=new l(x).toRgba(),x={r:M[0],g:M[1],b:M[2],a:M[3]}):x=Number(x),f.push({primitiveName:R,propertyName:j,value:x}));return[2,v.expandSymbol(new g({styleUrl:this.url+"/"+this._refSymbolUrlTemplate,styleName:h}),_).then(function(e){var t=function(e){if(!e)return S.error("CIM Symbol has no data!"),null;e.primitiveOverrides=f},r=e;return r&&r.data&&f.length>0&&(Array.isArray(r.data)?r.data.forEach(function(e){return t(e)}):r.data&&t(r.data)),e})]}})})},t.prototype.getSymbol=function(e,t){return null},t.prototype.getSymbolAsync=function(e,t){return s(this,void 0,void 0,function(){return n(this,function(e){return[2,null]})})},t.prototype.getSymbols=function(){return[]},t.prototype.getAttributeHash=function(){return this.visualVariables&&this.visualVariables.reduce(function(e,t){return e+t.getAttributeHash()},"")},t.prototype.getMeshHash=function(){return this.url+"-"+JSON.stringify(this.fieldMap)};var d;return i([f.property({type:Object,json:{write:!0}})],t.prototype,"config",void 0),i([f.property({type:String,json:{write:!0}})],t.prototype,"description",void 0),i([f.property({type:Object,json:{write:!0}})],t.prototype,"fieldMap",void 0),i([f.property({type:String,json:{write:!0}})],t.prototype,"label",void 0),i([f.property({type:String,json:{write:!0}})],t.prototype,"url",void 0),t=d=i([f.subclass("esri.renderers.DictionaryRenderer")],t)}(f.declared(y,m))});