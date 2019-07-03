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

/* Copyright 2014 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

define([],function(){"use strict";var e=function(){function e(e){this.message="JPEG error: "+e}return e.prototype=new Error,e.prototype.name="JpegError",e.constructor=e,e}();return function(){function n(){this.decodeTransform=null,this.colorTransform=-1}function r(e,n){for(var r,o,a=0,t=[],i=16;i>0&&!e[i-1];)i--;t.push({children:[],index:0});var s,c=t[0];for(r=0;r<i;r++){for(o=0;o<e[r];o++){for(c=t.pop(),c.children[c.index]=n[a];c.index>0;)c=t.pop();for(c.index++,t.push(c);t.length<=r;)t.push(s={children:[],index:0}),c.children[c.index]=s.children,c=s;a++}r+1<i&&(t.push(s={children:[],index:0}),c.children[c.index]=s.children,c=s)}return t[0].children}function o(e,n,r){return 64*((e.blocksPerLine+1)*n+r)}function a(n,r,a,t,i,f,l,u,h){function v(){if(M>0)return M--,I>>M&1;if(255===(I=n[r++])){var o=n[r++];if(o)throw new e("unexpected marker "+(I<<8|o).toString(16))}return M=7,I>>>7}function m(n){for(var r=n;;){if("number"==typeof(r=r[v()]))return r;if("object"!=typeof r)throw new e("invalid huffman sequence")}}function d(e){for(var n=0;e>0;)n=n<<1|v(),e--;return n}function b(e){if(1===e)return 1===v()?1:-1;var n=d(e);return n>=1<<e-1?n:n+(-1<<e)+1}function p(e,n){var r=m(e.huffmanTableDC),o=0===r?0:b(r);e.blockData[n]=e.pred+=o;for(var a=1;a<64;){var t=m(e.huffmanTableAC),i=15&t,s=t>>4;if(0!==i){a+=s;var f=c[a];e.blockData[n+f]=b(i),a++}else{if(s<15)break;a+=16}}}function k(e,n){var r=m(e.huffmanTableDC),o=0===r?0:b(r)<<h;e.blockData[n]=e.pred+=o}function g(e,n){e.blockData[n]|=v()<<h}function C(e,n){if(Y>0)return void Y--;for(var r=f,o=l;r<=o;){var a=m(e.huffmanTableAC),t=15&a,i=a>>4;if(0!==t){r+=i;var s=c[r];e.blockData[n+s]=b(t)*(1<<h),r++}else{if(i<15){Y=d(i)+(1<<i)-1;break}r+=16}}}function w(n,r){for(var o,a,t=f,i=l,s=0;t<=i;){var u=c[t];switch(q){case 0:if(a=m(n.huffmanTableAC),o=15&a,s=a>>4,0===o)s<15?(Y=d(s)+(1<<s),q=4):(s=16,q=1);else{if(1!==o)throw new e("invalid ACn encoding");y=b(o),q=s?2:3}continue;case 1:case 2:n.blockData[r+u]?n.blockData[r+u]+=v()<<h:0===--s&&(q=2===q?3:0);break;case 3:n.blockData[r+u]?n.blockData[r+u]+=v()<<h:(n.blockData[r+u]=y<<h,q=0);break;case 4:n.blockData[r+u]&&(n.blockData[r+u]+=v()<<h)}t++}4===q&&0===--Y&&(q=0)}var y,D,T,x,P,L,A,_=a.mcusPerLine,U=a.progressive,z=r,I=0,M=0,Y=0,q=0,S=t.length;A=U?0===f?0===u?k:g:0===u?C:w:p;var R,H,E=0;H=1===S?t[0].blocksPerLine*t[0].blocksPerColumn:_*a.mcusPerColumn;for(var V,j;E<H;){var B=i?Math.min(H-E,i):H;for(T=0;T<S;T++)t[T].pred=0;if(Y=0,1===S)for(D=t[0],L=0;L<B;L++)!function(e,n,r){n(e,o(e,r/e.blocksPerLine|0,r%e.blocksPerLine))}(D,A,E),E++;else for(L=0;L<B;L++){for(T=0;T<S;T++)for(D=t[T],V=D.h,j=D.v,x=0;x<j;x++)for(P=0;P<V;P++)!function(e,n,r,a,t){var i=r/_|0,s=r%_;n(e,o(e,i*e.v+a,s*e.h+t))}(D,A,E,x,P);E++}M=0,R=s(n,r),R&&R.invalid&&(console.log("decodeScan - unexpected MCU data, next marker is: "+R.invalid),r=R.offset);var J=R&&R.marker;if(!J||J<=65280)throw new e("marker was not found");if(!(J>=65488&&J<=65495))break;r+=2}return R=s(n,r),R&&R.invalid&&(console.log("decodeScan - unexpected Scan data, next marker is: "+R.invalid),r=R.offset),r-z}function t(n,r,o){var a,t,i,s,c,p,k,g,C,w,y,D,T,x,P,L,A,_=n.quantizationTable,U=n.blockData;if(!_)throw new e("missing required Quantization Table.");for(var z=0;z<64;z+=8)C=U[r+z],w=U[r+z+1],y=U[r+z+2],D=U[r+z+3],T=U[r+z+4],x=U[r+z+5],P=U[r+z+6],L=U[r+z+7],C*=_[z],0!=(w|y|D|T|x|P|L)?(w*=_[z+1],y*=_[z+2],D*=_[z+3],T*=_[z+4],x*=_[z+5],P*=_[z+6],L*=_[z+7],a=d*C+128>>8,t=d*T+128>>8,i=y,s=P,c=b*(w-L)+128>>8,g=b*(w+L)+128>>8,p=D<<4,k=x<<4,a=a+t+1>>1,t=a-t,A=i*m+s*v+128>>8,i=i*v-s*m+128>>8,s=A,c=c+k+1>>1,k=c-k,g=g+p+1>>1,p=g-p,a=a+s+1>>1,s=a-s,t=t+i+1>>1,i=t-i,A=c*h+g*u+2048>>12,c=c*u-g*h+2048>>12,g=A,A=p*l+k*f+2048>>12,p=p*f-k*l+2048>>12,k=A,o[z]=a+g,o[z+7]=a-g,o[z+1]=t+k,o[z+6]=t-k,o[z+2]=i+p,o[z+5]=i-p,o[z+3]=s+c,o[z+4]=s-c):(A=d*C+512>>10,o[z]=A,o[z+1]=A,o[z+2]=A,o[z+3]=A,o[z+4]=A,o[z+5]=A,o[z+6]=A,o[z+7]=A);for(var I=0;I<8;++I)C=o[I],w=o[I+8],y=o[I+16],D=o[I+24],T=o[I+32],x=o[I+40],P=o[I+48],L=o[I+56],0!=(w|y|D|T|x|P|L)?(a=d*C+2048>>12,t=d*T+2048>>12,i=y,s=P,c=b*(w-L)+2048>>12,g=b*(w+L)+2048>>12,p=D,k=x,a=4112+(a+t+1>>1),t=a-t,A=i*m+s*v+2048>>12,i=i*v-s*m+2048>>12,s=A,c=c+k+1>>1,k=c-k,g=g+p+1>>1,p=g-p,a=a+s+1>>1,s=a-s,t=t+i+1>>1,i=t-i,A=c*h+g*u+2048>>12,c=c*u-g*h+2048>>12,g=A,A=p*l+k*f+2048>>12,p=p*f-k*l+2048>>12,k=A,C=a+g,L=a-g,w=t+k,P=t-k,y=i+p,x=i-p,D=s+c,T=s-c,C=C<16?0:C>=4080?255:C>>4,w=w<16?0:w>=4080?255:w>>4,y=y<16?0:y>=4080?255:y>>4,D=D<16?0:D>=4080?255:D>>4,T=T<16?0:T>=4080?255:T>>4,x=x<16?0:x>=4080?255:x>>4,P=P<16?0:P>=4080?255:P>>4,L=L<16?0:L>=4080?255:L>>4,U[r+I]=C,U[r+I+8]=w,U[r+I+16]=y,U[r+I+24]=D,U[r+I+32]=T,U[r+I+40]=x,U[r+I+48]=P,U[r+I+56]=L):(A=d*C+8192>>14,A=A<-2040?0:A>=2024?255:A+2056>>4,U[r+I]=A,U[r+I+8]=A,U[r+I+16]=A,U[r+I+24]=A,U[r+I+32]=A,U[r+I+40]=A,U[r+I+48]=A,U[r+I+56]=A)}function i(e,n){for(var r=n.blocksPerLine,a=n.blocksPerColumn,i=new Int16Array(64),s=0;s<a;s++)for(var c=0;c<r;c++){var f=o(n,s,c);t(n,f,i)}return n.blockData}function s(e,n,r){function o(n){return e[n]<<8|e[n+1]}var a=e.length-1,t=r<n?r:n;if(n>=a)return null;var i=o(n);if(i>=65472&&i<=65534)return{invalid:null,marker:i,offset:n};for(var s=o(t);!(s>=65472&&s<=65534);){if(++t>=a)return null;s=o(t)}return{invalid:i.toString(16),marker:s,offset:t}}if(!self||!self.Uint8ClampedArray)return null;var c=new Uint8Array([0,1,8,16,9,2,3,10,17,24,32,25,18,11,4,5,12,19,26,33,40,48,41,34,27,20,13,6,7,14,21,28,35,42,49,56,57,50,43,36,29,22,15,23,30,37,44,51,58,59,52,45,38,31,39,46,53,60,61,54,47,55,62,63]),f=4017,l=799,u=3406,h=2276,v=1567,m=3784,d=5793,b=2896;return n.prototype={parse:function(n){function o(){var e=n[l]<<8|n[l+1];return l+=2,e}var t,f,l=0,u=null,h=null,v=[],m=[],d=[],b=o();if(65496!==b)throw new e("SOI not found");for(b=o();65497!==b;){var p,k,g;switch(b){case 65504:case 65505:case 65506:case 65507:case 65508:case 65509:case 65510:case 65511:case 65512:case 65513:case 65514:case 65515:case 65516:case 65517:case 65518:case 65519:case 65534:var C=function(){var e=o(),r=l+e-2,a=s(n,r,l);a&&a.invalid&&(console.log("readDataBlock - incorrect length, next marker is: "+a.invalid),r=a.offset);var t=n.subarray(l,r);return l+=t.length,t}();65504===b&&74===C[0]&&70===C[1]&&73===C[2]&&70===C[3]&&0===C[4]&&(u={version:{major:C[5],minor:C[6]},densityUnits:C[7],xDensity:C[8]<<8|C[9],yDensity:C[10]<<8|C[11],thumbWidth:C[12],thumbHeight:C[13],thumbData:C.subarray(14,14+3*C[12]*C[13])}),65518===b&&65===C[0]&&100===C[1]&&111===C[2]&&98===C[3]&&101===C[4]&&(h={version:C[5]<<8|C[6],flags0:C[7]<<8|C[8],flags1:C[9]<<8|C[10],transformCode:C[11]});break;case 65499:for(var w,y=o(),D=y+l-2;l<D;){var T=n[l++],x=new Uint16Array(64);if(T>>4==0)for(k=0;k<64;k++)w=c[k],x[w]=n[l++];else{if(T>>4!=1)throw new e("DQT - invalid table spec");for(k=0;k<64;k++)w=c[k],x[w]=o()}v[15&T]=x}break;case 65472:case 65473:case 65474:if(t)throw new e("Only single frame JPEGs supported");o(),t={},t.extended=65473===b,t.progressive=65474===b,t.precision=n[l++],t.scanLines=o(),t.samplesPerLine=o(),t.components=[],t.componentIds={};var P,L=n[l++],A=0,_=0;for(p=0;p<L;p++){P=n[l];var U=n[l+1]>>4,z=15&n[l+1];A<U&&(A=U),_<z&&(_=z);var I=n[l+2];g=t.components.push({h:U,v:z,quantizationId:I,quantizationTable:null}),t.componentIds[P]=g-1,l+=3}t.maxH=A,t.maxV=_,function(e){for(var n=Math.ceil(e.samplesPerLine/8/e.maxH),r=Math.ceil(e.scanLines/8/e.maxV),o=0;o<e.components.length;o++){H=e.components[o];var a=Math.ceil(Math.ceil(e.samplesPerLine/8)*H.h/e.maxH),t=Math.ceil(Math.ceil(e.scanLines/8)*H.v/e.maxV),i=n*H.h,s=r*H.v,c=64*s*(i+1);H.blockData=new Int16Array(c),H.blocksPerLine=a,H.blocksPerColumn=t}e.mcusPerLine=n,e.mcusPerColumn=r}(t);break;case 65476:var M=o();for(p=2;p<M;){var Y=n[l++],q=new Uint8Array(16),S=0;for(k=0;k<16;k++,l++)S+=q[k]=n[l];var R=new Uint8Array(S);for(k=0;k<S;k++,l++)R[k]=n[l];p+=17+S,(Y>>4==0?d:m)[15&Y]=r(q,R)}break;case 65501:o(),f=o();break;case 65498:o();var H,E=n[l++],V=[];for(p=0;p<E;p++){var j=t.componentIds[n[l++]];H=t.components[j];var B=n[l++];H.huffmanTableDC=d[B>>4],H.huffmanTableAC=m[15&B],V.push(H)}var J=n[l++],N=n[l++],G=n[l++],O=a(n,l,t,V,f,J,N,G>>4,15&G);l+=O;break;case 65535:255!==n[l]&&l--;break;default:if(255===n[l-3]&&n[l-2]>=192&&n[l-2]<=254){l-=3;break}throw new e("unknown marker "+b.toString(16))}b=o()}for(this.width=t.samplesPerLine,this.height=t.scanLines,this.jfif=u,this.eof=l,this.adobe=h,this.components=[],p=0;p<t.components.length;p++){H=t.components[p];var Q=v[H.quantizationId];Q&&(H.quantizationTable=Q),this.components.push({output:i(t,H),scaleX:H.h/t.maxH,scaleY:H.v/t.maxV,blocksPerLine:H.blocksPerLine,blocksPerColumn:H.blocksPerColumn})}this.numComponents=this.components.length},_getLinearizedBlockData:function(e,n){var r,o,a,t,i,s,c,f,l,u,h,v=this.width/e,m=this.height/n,d=0,b=this.components.length,p=e*n*b,k=new Uint8ClampedArray(p),g=new Uint32Array(e);for(c=0;c<b;c++){for(r=this.components[c],o=r.scaleX*v,a=r.scaleY*m,d=c,h=r.output,t=r.blocksPerLine+1<<3,i=0;i<e;i++)f=0|i*o,g[i]=(4294967288&f)<<3|7&f;for(s=0;s<n;s++)for(f=0|s*a,u=t*(4294967288&f)|(7&f)<<3,i=0;i<e;i++)k[d]=h[u+g[i]],d+=b}var C=this.decodeTransform;if(C)for(c=0;c<p;)for(f=0,l=0;f<b;f++,c++,l+=2)k[c]=(k[c]*C[l]>>8)+C[l+1];return k},_isColorConversionNeeded:function(){return this.adobe?!!this.adobe.transformCode:3===this.numComponents?0!==this.colorTransform:1===this.colorTransform},_convertYccToRgb:function(e){for(var n,r,o,a=0,t=e.length;a<t;a+=3)n=e[a],r=e[a+1],o=e[a+2],e[a]=n-179.456+1.402*o,e[a+1]=n+135.459-.344*r-.714*o,e[a+2]=n-226.816+1.772*r;return e},_convertYcckToRgb:function(e){for(var n,r,o,a,t=0,i=0,s=e.length;i<s;i+=4)n=e[i],r=e[i+1],o=e[i+2],a=e[i+3],e[t++]=r*(-660635669420364e-19*r+.000437130475926232*o-54080610064599e-18*n+.00048449797120281*a-.154362151871126)-122.67195406894+o*(-.000957964378445773*o+.000817076911346625*n-.00477271405408747*a+1.53380253221734)+n*(.000961250184130688*n-.00266257332283933*a+.48357088451265)+a*(-.000336197177618394*a+.484791561490776),e[t++]=107.268039397724+r*(219927104525741e-19*r-.000640992018297945*o+.000659397001245577*n+.000426105652938837*a-.176491792462875)+o*(-.000778269941513683*o+.00130872261408275*n+.000770482631801132*a-.151051492775562)+n*(.00126935368114843*n-.00265090189010898*a+.25802910206845)+a*(-.000318913117588328*a-.213742400323665),e[t++]=r*(-.000570115196973677*r-263409051004589e-19*o+.0020741088115012*n-.00288260236853442*a+.814272968359295)-20.810012546947+o*(-153496057440975e-19*o-.000132689043961446*n+.000560833691242812*a-.195152027534049)+n*(.00174418132927582*n-.00255243321439347*a+.116935020465145)+a*(-.000343531996510555*a+.24165260232407);return e},_convertYcckToCmyk:function(e){for(var n,r,o,a=0,t=e.length;a<t;a+=4)n=e[a],r=e[a+1],o=e[a+2],e[a]=434.456-n-1.402*o,e[a+1]=119.541-n+.344*r+.714*o,e[a+2]=481.816-n-1.772*r;return e},_convertCmykToRgb:function(e){for(var n,r,o,a,t=0,i=0,s=e.length;i<s;i+=4)n=e[i]*(1/255),r=e[i+1]*(1/255),o=e[i+2]*(1/255),a=e[i+3]*(1/255),e[t++]=255+n*(-4.387332384609988*n+54.48615194189176*r+18.82290502165302*o+212.25662451639585*a-285.2331026137004)+r*(1.7149763477362134*r-5.6096736904047315*o-17.873870861415444*a-5.497006427196366)+o*(-2.5217340131683033*o-21.248923337353073*a+17.5119270841813)-a*(21.86122147463605*a+189.48180835922747),e[t++]=255+n*(8.841041422036149*n+60.118027045597366*r+6.871425592049007*o+31.159100130055922*a-79.2970844816548)+r*(-15.310361306967817*r+17.575251261109482*o+131.35250912493976*a-190.9453302588951)+o*(4.444339102852739*o+9.8632861493405*a-24.86741582555878)-a*(20.737325471181034*a+187.80453709719578),e[t++]=255+n*(.8842522430003296*n+8.078677503112928*r+30.89978309703729*o-.23883238689178934*a-14.183576799673286)+r*(10.49593273432072*r+63.02378494754052*o+50.606957656360734*a-112.23884253719248)+o*(.03296041114873217*o+115.60384449646641*a-193.58209356861505)-a*(22.33816807309886*a+180.12613974708367);return e},getData:function(n,r,o){if(this.numComponents>4)throw new e("Unsupported color mode");var a=this._getLinearizedBlockData(n,r);if(1===this.numComponents&&o){for(var t=a.length,i=new Uint8ClampedArray(3*t),s=0,c=0;c<t;c++){var f=a[c];i[s++]=f,i[s++]=f,i[s++]=f}return i}if(3===this.numComponents&&this._isColorConversionNeeded())return this._convertYccToRgb(a);if(4===this.numComponents){if(this._isColorConversionNeeded())return o?this._convertYcckToRgb(a):this._convertYcckToCmyk(a);if(o)return this._convertCmykToRgb(a)}return a}},n}()});