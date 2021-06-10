/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","./core/accessorSupport/ensureType","./core/accessorSupport/extensions/serializableProperty/reader","./symbols/Symbol","./symbols/CIMSymbol","./symbols/Symbol3DLayer","./symbols/ExtrudeSymbol3DLayer","./symbols/SimpleLineSymbol","./symbols/FillSymbol","./symbols/FillSymbol3DLayer","./symbols/Font","./symbols/IconSymbol3DLayer","./symbols/LineSymbol3DLayer","./symbols/ObjectSymbol3DLayer","./symbols/PathSymbol3DLayer","./symbols/TextSymbol3DLayer","./symbols/WaterSymbol3DLayer","./symbols/Symbol3D","./chunks/LineCallout3DBorder","./symbols/callouts/LineCallout3D","./symbols/support/Symbol3DVerticalOffset","./symbols/LabelSymbol3D","./symbols/LineSymbol3D","./symbols/MarkerSymbol","./symbols/MeshSymbol3D","./symbols/PictureFillSymbol","./symbols/PictureMarkerSymbol","./symbols/PointSymbol3D","./symbols/PolygonSymbol3D","./symbols/SimpleFillSymbol","./symbols/SimpleMarkerSymbol","./symbols/TextSymbol","./symbols/WebStyleSymbol"],(function(e,l,y,o,s,r,m,b,t,a,i,n,p,S,c,u,D,d,L,f,k,x,M,C,T,P,h,F,O,g,B,w,j){"use strict";function I(e){return e instanceof o}function W(e){if(!e)return!1;switch(e.type){case"picture-fill":case"picture-marker":case"simple-fill":case"simple-line":case"simple-marker":case"text":case"cim":return!0;default:return!1}}function R(e){if(!e)return!1;switch(e.type){case"label-3d":case"line-3d":case"mesh-3d":case"point-3d":case"polygon-3d":return!0;default:return!1}}const V={base:o,key:"type",typeMap:{"simple-fill":g,"picture-fill":P,"picture-marker":h,"simple-line":b,"simple-marker":B,text:w,"label-3d":x,"line-3d":M,"mesh-3d":T,"point-3d":F,"polygon-3d":O,"web-style":j,cim:s},errorContext:"symbol"},E={base:o,key:"type",typeMap:{"picture-marker":h,"simple-marker":B,text:w,"web-style":j,cim:s},errorContext:"symbol"},_=y.createTypeReader({types:V}),v={base:o,key:"type",typeMap:{"simple-fill":g,"picture-fill":P,"picture-marker":h,"simple-line":b,"simple-marker":B,text:w,"line-3d":M,"mesh-3d":T,"point-3d":F,"polygon-3d":O,"web-style":j,cim:s},errorContext:"symbol"},z={base:o,key:"type",typeMap:{text:w,"label-3d":x},errorContext:"symbol"},q={base:o,key:"type",typeMap:{"label-3d":x,"line-3d":M,"mesh-3d":T,"point-3d":F,"polygon-3d":O,"web-style":j},errorContext:"symbol"},A={base:o,key:"type",typeMap:{"line-3d":M,"mesh-3d":T,"point-3d":F,"polygon-3d":O,"web-style":j},errorContext:"symbol"},G={base:o,key:"type",typeMap:{"label-3d":x},errorContext:"symbol"},H=l.ensureOneOfType(V);e.BaseSymbol=o,e.CIMSymbol=s,e.BaseSymbol3DLayer=r,e.ExtrudeSymbol3DLayer=m,e.SimpleLineSymbol=b,e.BaseFillSymbol=t,e.FillSymbol3DLayer=a,e.Font=i,e.IconSymbol3DLayer=n,e.LineSymbol3DLayer=p,e.ObjectSymbol3DLayer=S,e.PathSymbol3DLayer=c,e.TextSymbol3DLayer=u,e.WaterSymbol3DLayer=D,e.BaseSymbol3D=d,e.LineCallout3DBorder=L.LineCallout3DBorder,e.LineCallout3D=f,Object.defineProperty(e,"Symbol3DVerticalOffset",{enumerable:!0,get:function(){return k.Symbol3DVerticalOffset}}),e.LabelSymbol3D=x,e.LineSymbol3D=M,e.BaseMarkerSymbol=C,e.MeshSymbol3D=T,e.PictureFillSymbol=P,e.PictureMarkerSymbol=h,e.PointSymbol3D=F,e.PolygonSymbol3D=O,e.SimpleFillSymbol=g,e.SimpleMarkerSymbol=B,e.TextSymbol=w,e.WebStyleSymbol=j,e.ensureType=H,e.isSymbol=I,e.isSymbol2D=W,e.isSymbol3D=R,e.readSymbol=_,e.symbolTypes=V,e.symbolTypes3D=q,e.symbolTypesCluster=E,e.symbolTypesLabel=z,e.symbolTypesLabel3D=G,e.symbolTypesRenderer=v,e.symbolTypesRenderer3D=A,Object.defineProperty(e,"__esModule",{value:!0})}));
