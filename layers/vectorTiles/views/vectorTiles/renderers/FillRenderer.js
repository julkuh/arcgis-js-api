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

define(["require","exports","../../../core/libs/gl-matrix/mat3","../../../core/libs/gl-matrix/mat4","../../../core/libs/gl-matrix/vec3","../../../core/libs/gl-matrix/vec4","../GeometryUtils","./rendererUtils","./vtShaderSnippets","../../webgl/ShaderVariations","../../webgl/VertexArrayObject"],(function(t,e,i,r,o,l,a,n,s,f,u){return function(){function t(){this._fillAttributeLocations={a_pos:0},this._fillAttributeLocationsDD={a_pos:0,a_color:1},this._outlineAttributeLocations={a_pos:0,a_offset:1,a_xnormal:2},this._outlineAttributeLocationsDD={a_pos:0,a_offset:1,a_xnormal:2,a_color:3},this._initialized=!1,this._viewProjMat=r.create(),this._offsetVector=o.create(),this._patternMatrix=i.create(),this._color=l.create(),this._outlineColor=l.create()}return t.prototype.dispose=function(){},t.prototype.render=function(t,e,i,o,l,s,f,u,_,c,h){if(0!==e.triangleElementCount){this._initialized||this._initialize(t);var d=void 0!==f.getPaintValue("fill-pattern",i),D=f.hasDataDrivenColor?[1,1,1,1]:f.getPaintValue("fill-color",i),m=f.hasDataDrivenOpacity?1:f.getPaintValue("fill-opacity",i),v=m*D[3]*h;this._color[0]=v*D[0],this._color[1]=v*D[1],this._color[2]=v*D[2],this._color[3]=v;var V,x=3===l;x&&(V=n.int32To4Bytes(e.layerID));var p=s.tileTransform.transform,y=s.coordRange/512,b=f.getPaintValue("fill-translate",i);if(0!==b[0]||0!==b[1]){r.copy(this._viewProjMat,s.tileTransform.transform);var A=b[0],g=b[1],O=0,M=0,P=(1<<s.key.level)/Math.pow(2,i)*y;if(1===f.getPaintValue("fill-translate-anchor",i)){var j=-a.C_DEG_TO_RAD*o,z=Math.sin(j),C=Math.cos(j);O=P*(A*C-g*z),M=P*(A*z+g*C)}else O=P*A,M=P*g;this._offsetVector[0]=O,this._offsetVector[1]=M,this._offsetVector[2]=0,r.translate(this._viewProjMat,this._viewProjMat,this._offsetVector),p=this._viewProjMat}if(this._drawFill(t,e,i,l,s,f,u,p,c,h,x,V),f.getPaintValue("fill-antialias",i)&&!d&&e.outlineElementCount>0&&(1===l||3===l)){var w=f.hasDataDrivenOutline;if(f.outlineUsesFillColor){if(1!==this._color[3])return;this._outlineColor[0]=this._color[0],this._outlineColor[1]=this._color[1],this._outlineColor[2]=this._color[2],this._outlineColor[3]=this._color[3]}else{var U=f.hasDataDrivenOutlineColor?[1,1,1,1]:f.getPaintValue("fill-outline-color",i),S=m*U[3]*h;this._outlineColor[0]=S*U[0],this._outlineColor[1]=S*U[1],this._outlineColor[2]=S*U[2],this._outlineColor[3]=S}var E=.75/c,I=this._getOutlineVAO(t,s,w);if(I){t.bindVAO(I);var L=this._outlineShaderVariations.getProgram([w,x],void 0,void 0,w?this._outlineAttributeLocationsDD:this._outlineAttributeLocations);t.bindProgram(L),L.setUniformMatrix4fv("u_transformMatrix",p),L.setUniformMatrix4fv("u_extrudeMatrix",_),L.setUniform2fv("u_normalized_origin",s.tileTransform.displayCoord),L.setUniform1f("u_depth",f.z+1/65536),L.setUniform1f("u_outline_width",E),L.setUniform4fv("u_color",this._outlineColor),x&&L.setUniform4f("u_id",V[0],V[1],V[2],V[3]),t.drawElements(4,e.outlineElementCount,5125,12*e.outlineElementStart),t.bindVAO()}}}},t.prototype._initialize=function(t){if(this._initialized)return!0;var e=new f("fill",["fillVS","fillFS"],[],s,t);e.addDefine("PATTERN","PATTERN",[!0,!0],"PATTERN"),e.addDefine("DD","DD",[!0,!1],"DD"),e.addDefine("ID","ID",[!0,!0],"ID"),this._fillShaderVariations=e,this._fillVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:4,normalized:!1,divisor:0}]},this._fillVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:4,stride:8,normalized:!0,divisor:0}]};var i=new f("outline",["outlineVS","outlineFS"],[],s,t);return i.addDefine("DD","DD",[!0,!1],"DD"),i.addDefine("ID","ID",[!0,!0],"ID"),this._outlineShaderVariations=i,this._outlineVertexAttributes={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:8,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:8,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:8,normalized:!1,divisor:0}]},this._outlineVertexAttributesDD={geometry:[{name:"a_pos",count:2,type:5122,offset:0,stride:12,normalized:!1,divisor:0},{name:"a_offset",count:2,type:5120,offset:4,stride:12,normalized:!1,divisor:0},{name:"a_xnormal",count:2,type:5120,offset:6,stride:12,normalized:!1,divisor:0},{name:"a_color",count:4,type:5121,offset:8,stride:12,normalized:!0,divisor:0}]},this._initialized=!0,!0},t.prototype._drawFill=function(t,e,r,o,l,a,n,s,f,u,_,c){var h=a.getPaintValue("fill-pattern",r),d=void 0!==h,D=a.hasDataDrivenOpacity?1:u*a.getPaintValue("fill-opacity",r),m=a.hasDataDrivenColor?[1,1,1,1]:a.getPaintValue("fill-color",r),v=D*m[3]*u;this._color[0]=v*m[0],this._color[1]=v*m[1],this._color[2]=v*m[2],this._color[3]=v;var V=a.hasDataDrivenFill,x=!1;if(!d&&(!V&&1===v)&&(x=!0),(!d||0!==o)&&(!x||1!==o)&&(d||x||0!==o)){var p=this._getFillVAO(t,l,V);if(p){t.bindVAO(p);var y=this._fillShaderVariations.getProgram([d,V,_],void 0,void 0,V?this._fillAttributeLocationsDD:this._fillAttributeLocations);if(t.bindProgram(y),d){var b=n.getMosaicItemPosition(h,!0);if(b){var A=l.coordRange/512/Math.pow(2,Math.round(r)-l.key.level)/f;i.identity(this._patternMatrix);var g=1/(b.size[0]*A),O=1/(b.size[1]*A);this._patternMatrix[0]=g,this._patternMatrix[4]=O,n.bind(t,9729,b.page,1),y.setUniformMatrix3fv("u_pattern_matrix",this._patternMatrix),y.setUniform2f("u_pattern_tl",b.tl[0],b.tl[1]),y.setUniform2f("u_pattern_br",b.br[0],b.br[1]),y.setUniform1i("u_texture",1)}}y.setUniformMatrix4fv("u_transformMatrix",s),y.setUniform2fv("u_normalized_origin",l.tileTransform.displayCoord),y.setUniform1f("u_depth",a.z+1/65536),y.setUniform4fv("u_color",this._color),_&&y.setUniform4f("u_id",c[0],c[1],c[2],c[3]),t.drawElements(4,e.triangleElementCount,5125,12*e.triangleElementStart),t.bindVAO()}}},t.prototype._getFillVAO=function(t,e,i){if(i){if(e.fillDDVertexArrayObject)return e.fillDDVertexArrayObject;var r=e.fillDDVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillDDVertexArrayObject=new u(t,this._fillAttributeLocationsDD,this._fillVertexAttributesDD,{geometry:r},o),e.fillDDVertexArrayObject):null}if(e.fillVertexArrayObject)return e.fillVertexArrayObject;r=e.fillVertexBuffer,o=e.fillIndexBuffer;return r&&o?(e.fillVertexArrayObject=new u(t,this._fillAttributeLocations,this._fillVertexAttributes,{geometry:r},o),e.fillVertexArrayObject):null},t.prototype._getOutlineVAO=function(t,e,i){if(i){if(e.outlineDDVertexArrayObject)return e.outlineDDVertexArrayObject;var r=e.outlineDDVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineDDVertexArrayObject=new u(t,this._outlineAttributeLocationsDD,this._outlineVertexAttributesDD,{geometry:r},o),e.outlineDDVertexArrayObject):null}if(e.outlineVertexArrayObject)return e.outlineVertexArrayObject;r=e.outlineVertexBuffer,o=e.outlineIndexBuffer;return r&&o?(e.outlineVertexArrayObject=new u(t,this._outlineAttributeLocations,this._outlineVertexAttributes,{geometry:r},o),e.outlineVertexArrayObject):null},t}()}));