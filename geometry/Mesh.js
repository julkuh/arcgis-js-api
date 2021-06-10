/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["require","../chunks/_rollupPluginBabelHelpers","../chunks/tslib.es6","../core/has","../core/lang","../core/Logger","../core/accessorSupport/ensureType","../core/accessorSupport/decorators/property","../core/accessorSupport/decorators/subclass","../core/Error","../core/urlUtils","../core/uuid","../portal/support/resourceExtension","../core/promiseUtils","./Geometry","./Point","./Extent","./Polygon","../chunks/vec3f64","../chunks/vec4f64","./support/MeshVertexAttributes","./support/MeshComponent","./support/triangulationUtils","./support/meshUtils/centerAt","./support/meshUtils/merge","./support/meshUtils/offset","./support/meshUtils/primitives","./support/meshUtils/rotate","./support/meshUtils/scale"],(function(e,t,n,o,r,i,s,a,c,l,p,u,m,h,f,x,y,d,g,v,w,b,A,P,M,F,U,_,z){"use strict";var S;const C=i.getLogger("esri.geometry.Mesh");let G=S=function(n){function o(e){var t;return(t=n.call(this,e)||this).components=null,t.hasZ=!0,t.hasM=!1,t.vertexAttributes=new w.MeshVertexAttributes,t.type="mesh",t}t._inheritsLoose(o,n);var i=o.prototype;return i.addComponent=function(e){this.components||(this.components=[]),this.components.push(b.from(e)),this.notifyChange("components")},i.removeComponent=function(e){if(this.components){const t=this.components.indexOf(e);if(-1!==t)return this.components.splice(t,1),void this.notifyChange("components")}C.error("removeComponent()","Provided component is not part of the list of components")},i.rotate=function(e,t,n,o){return _.axisAngleFrom(T.x,L(e),V),_.axisAngleFrom(T.y,L(t),k),_.axisAngleFrom(T.z,L(n),R),_.axisAngleMultiply(V,k,V),_.axisAngleMultiply(V,R,V),_.rotate(this,V,o),this},i.offset=function(e,t,n,o){return O[0]=e,O[1]=t,O[2]=n,F.offset(this,O,o),this},i.scale=function(e,t){return z.scale(this,e,t),this},i.centerAt=function(e,t){return P.centerAt(this,e,t),this},i.clone=function(){const e=this.components?new Map:null,t=this.components?new Map:null,n=this.components?this.components.map((n=>n.cloneWithDeduplication(e,t))):null;return new S({components:n,spatialReference:this.spatialReference,vertexAttributes:r.clone(this.vertexAttributes)})},i.vertexAttributesChanged=function(){this.notifyChange("vertexAttributes")},i.toJSON=function(e){return this.write(null,e)},i.forEachVertex=function(e,t,n){if(t)for(let o=0;o<t.length;o++){const r=3*t[o];n(e[r+0],e[r+1],e[r+2])}else for(let o=0;o<e.length;o+=3)n(e[o+0],e[o+1],e[o+2])},i.extendExtent=function(e,t,n){return this.forEachVertex(t,n,((t,n,o)=>{e.xmin=Math.min(e.xmin,t),e.xmax=Math.max(e.xmax,t),e.ymin=Math.min(e.ymin,n),e.ymax=Math.max(e.ymax,n),e.zmin=Math.min(e.zmin,o),e.zmax=Math.max(e.zmax,o)})),e},i.toBinaryGLTF=async function(t){const{toBinaryGLTF:n}=await new Promise((function(t,n){e(["./support/meshUtils/exporters/gltf/gltfexport"],t,n)}));return n(this,t)},o.createBox=function(e,t){if(!(e instanceof x))return C.error(".createBox()","expected location to be a Point instance"),null;const n=new S(U.convertUnitGeometry(U.createUnitSizeBox(),e,t));return t&&t.imageFace&&"all"!==t.imageFace?E(n,t.imageFace):n},o.createSphere=function(e,t){return e instanceof x?new S(U.convertUnitGeometry(U.createUnitSizeSphere(t&&t.densificationFactor||0),e,t)):(C.error(".createSphere()","expected location to be a Point instance"),null)},o.createCylinder=function(e,t){return e instanceof x?new S(U.convertUnitGeometry(U.createUnitSizeCylinder(t&&t.densificationFactor||0),e,t)):(C.error(".createCylinder()","expected location to be a Point instance"),null)},o.createPlane=function(e,t){return e instanceof x?new S(U.convertUnitGeometry(U.createUnitSizePlane(t&&t.facing||"up"),e,t)):(C.error(".createPlane()","expected location to be a Point instance"),null)},o.createFromPolygon=function(e,t){if(!(e instanceof d))return C.error(".createFromPolygon()","expected polygon to be a Polygon instance"),null;const n=A.triangulate(e);return new S({vertexAttributes:{position:n.position},components:[{faces:n.faces,shading:"flat",material:t&&t.material||null}],spatialReference:e.spatialReference})},o.createFromGLTF=async function(t,n,o){if(!(t instanceof x))throw C.error(".createfromGLTF()","expected location to be a Point instance"),new l("invalid-input","Expected location to be a Point instance");return new Promise(((r,i)=>{new Promise((function(t,n){e(["./support/loadGLTFMesh"],t,n)})).then((async e=>{try{h.throwIfAborted(o);const i=await e.loadGLTFMesh(t,n,o);r(new S(M.merge(i.map((e=>new S(e))),{reuseMaterials:!0})))}catch(s){i(new l("gltf-loader-error","Failed to load glTF.",`[${s.name}] ${s.message}`))}}))}))},t._createClass(o,[{key:"cache",get:function(){return this.commitProperty("components"),this.commitProperty("vertexAttributes"),this.commitProperty("hasM"),this.commitProperty("hasZ"),{}}},{key:"extent",get:function(){const e=this.spatialReference,t=this.vertexAttributes&&this.vertexAttributes.position;if(!t||0===t.length||this.components&&0===this.components.length)return new y({xmin:0,ymin:0,zmin:0,xmax:0,ymax:0,zmax:0,spatialReference:e});const n={xmin:1/0,xmax:-1/0,ymin:1/0,ymax:-1/0,zmin:1/0,zmax:-1/0,spatialReference:e};if(!this.components)return new y(this.extendExtent(n,t,null));for(const o of this.components){if(!o.faces){this.extendExtent(n,t,null);break}this.extendExtent(n,t,o.faces)}return new y(n)}}]),o}(f);function E(e,t){const n=e.components[0],o=n.faces,r=U.boxFaceOrder[t],i=6*r,s=new Uint32Array(6),a=new Uint32Array(o.length-6);let c=0,l=0;for(let h=0;h<o.length;h++)h>=i&&h<i+6?s[c++]=o[h]:a[l++]=o[h];const p=new Float32Array(e.vertexAttributes.uv),u=4*r*2,m=[0,1,1,1,1,0,0,0];for(let h=0;h<m.length;h++)p[u+h]=m[h];return e.vertexAttributes.uv=p,e.components=[new b({faces:s,material:n.material}),new b({faces:a})],e}function L(e){return e/180*Math.PI}n.__decorate([a.property({json:{read:!1}})],G.prototype,"cache",null),n.__decorate([a.property({type:[b]})],G.prototype,"components",void 0),n.__decorate([a.property({readOnly:!0,json:{read:!1}})],G.prototype,"extent",null),n.__decorate([a.property({readOnly:!0,json:{read:!1,write:!1}})],G.prototype,"hasZ",void 0),n.__decorate([a.property({readOnly:!0,json:{read:!1,write:!1}})],G.prototype,"hasM",void 0),n.__decorate([a.property({type:w.MeshVertexAttributes,nonNullable:!0,json:{write:!0}})],G.prototype,"vertexAttributes",void 0),G=S=n.__decorate([c.subclass("esri.geometry.Mesh")],G),G.prototype.toJSON.isDefaultToJSON=!0;const T={x:g.fromValues(1,0,0),y:g.fromValues(0,1,0),z:g.fromValues(0,0,1)},O=g.create(),V=v.create(),k=v.create(),R=v.create();return G}));
