/*
All material copyright ESRI, All Rights Reserved, unless otherwise specified.
See https://js.arcgis.com/4.19/esri/copyright.txt for details.
*/
define(["exports","../PixelBlock"],(function(t,e){"use strict";const n=function(t){return t&&"esri.layers.support.PixelBlock"===t.declaredClass&&t.pixels&&t.pixels.length>0};function i(t,i){if(null==i||!i.length||!n(t))return t;const r=t.pixels.length;return i&&i.some((t=>t>=r))||1===r&&1===i.length&&0===i[0]?t:r!==i.length||i.some(((t,e)=>t!==e))?new e({pixelType:t.pixelType,width:t.width,height:t.height,mask:t.mask,validPixelCount:t.validPixelCount,maskIsAlpha:t.maskIsAlpha,pixels:i.map((e=>t.pixels[e])),statistics:t.statistics&&i.map((e=>t.statistics[e]))}):t}function r(t){if(!t)return;const e=t.colormap;if(!e||0===e.length)return;const n=e.sort(((t,e)=>t[0]-e[0]));let i=0;n[0][0]<0&&(i=n[0][0]);const r=Math.max(256,n[n.length-1][0]-i+1),l=new Uint8Array(4*r),o=[];let s,a=0,f=0;const h=5===n[0].length;if(r>65536)return n.forEach((t=>{o[t[0]-i]=h?t.slice(1):t.slice(1).concat([255])})),{indexed2DColormap:o,offset:i,alphaSpecified:h};if(t.fillUnspecified)for(s=n[f],a=s[0]-i;a<r;a++)l[4*a]=s[1],l[4*a+1]=s[2],l[4*a+2]=s[3],l[4*a+3]=h?s[4]:255,a===s[0]-i&&(s=f===n.length-1?s:n[++f]);else for(a=0;a<n.length;a++)s=n[a],f=4*(s[0]-i),l[f]=s[1],l[f+1]=s[2],l[f+2]=s[3],l[f+3]=h?s[4]:255;return{indexedColormap:l,offset:i,alphaSpecified:h}}function l(t,e){if(!n(t))return t;if(!e&&(e.indexedColormap||e.indexed2DColormap))return t;const i=t.clone(),r=i.pixels;let l=i.mask;const o=i.width*i.height;if(1!==r.length)return t;const{indexedColormap:s,indexed2DColormap:a,offset:f,alphaSpecified:h}=e,u=s.length-1;let c=0;const x=r[0],m=new Uint8Array(x.length),p=new Uint8Array(x.length),d=new Uint8Array(x.length);let y,g=0;if(s)if(l)for(c=0;c<o;c++)l[c]&&(g=4*(x[c]-f),g<f||g>u?l[c]=0:(m[c]=s[g],p[c]=s[g+1],d[c]=s[g+2],l[c]=s[g+3]));else{for(l=new Uint8Array(o),c=0;c<o;c++)g=4*(x[c]-f),g<f||g>u?l[c]=0:(m[c]=s[g],p[c]=s[g+1],d[c]=s[g+2],l[c]=s[g+3]);i.mask=l}else if(l)for(c=0;c<o;c++)l[c]&&(y=a[x[c]],m[c]=y[0],p[c]=y[1],d[c]=y[2],l[c]=y[3]);else{for(l=new Uint8Array(o),c=0;c<o;c++)y=a[x[c]],m[c]=y[0],p[c]=y[1],d[c]=y[2],l[c]=y[3];i.mask=l}return i.pixels=[m,p,d],i.statistics=null,i.pixelType="u8",i.maskIsAlpha=h,i}function o(t){if(!n(t))return null;t.statistics||t.updateStatistics();const{pixels:e,mask:i,pixelType:r,statistics:l}=t,o=t.width*t.height,s=e.length;let a,f,h,u,c;const x=[],m=[];let p,d,y,g,w,M,k,A,U,C;const T=256;for(u=0;u<s;u++){if(p=new Uint32Array(T),y=e[u],"u8"===r)if(a=-.5,f=255.5,i)for(c=0;c<o;c++)i[c]&&p[y[c]]++;else for(c=0;c<o;c++)p[y[c]]++;else{if(a=l[u].minValue,f=l[u].maxValue,h=(f-a)/T,d=new Uint32Array(T+1),i)for(c=0;c<o;c++)i[c]&&d[Math.floor((y[c]-a)/h)]++;else for(c=0;c<o;c++)d[Math.floor((y[c]-a)/h)]++;for(c=0;c<255;c++)p[c]=d[c];p[255]=d[255]+d[256]}for(x.push({min:a,max:f,size:T,counts:p}),g=0,w=0,A=0,c=0;c<T;c++)g+=p[c],w+=c*p[c];for(U=w/g,c=0;c<T;c++)A+=p[c]*(c-U)**2;C=Math.sqrt(A/(g-1)),h=(f-a)/T,M=(U+.5)*h+a,k=C*h,m.push({min:a,max:f,avg:M,stddev:k})}return{statistics:m,histograms:x}}function s(t){const e=[];for(let n=0;n<t.length;n++){const{min:i,max:r,size:l,counts:o}=t[n];let s=0,a=0;for(let t=0;t<l;t++)s+=o[t],a+=t*o[t];const f=a/s;let h=0;for(let t=0;t<l;t++)h+=o[t]*(t-f)**2;const u=(r-i)/l,c=(f+.5)*u+i,x=Math.sqrt(h/(s-1))*u;e.push({min:i,max:r,avg:c,stddev:x})}return e}function a(t){const{minCutOff:e,maxCutOff:n,gamma:i,pixelType:r}=t,l=t.outMin||0,o=t.outMax||255;if(-1===["u8","u16","s8","s16"].indexOf(r))return null;const s=e.length;let a,h,u=0;"s8"===r?u=-127:"s16"===r&&(u=-32767);let c=256;["u16","s16"].indexOf(r)>-1&&(c=65536);const x=[],m=[],p=o-l;for(a=0;a<s;a++)m[a]=n[a]-e[a],x[a]=p/(n[a]-e[a]);const d=i&&i.length>=s,y=[];if(d)for(a=0;a<s;a++)i[a]>1?i[a]>2?y[a]=6.5+(i[a]-2)**2.5:y[a]=6.5+100*(2-i[a])**4:y[a]=1;let g;const w=[];let M,k,A;if(d)for(a=0;a<s;a++){for(A=[],h=0;h<c;h++)M=h+u,g=(M-e[a])/m[a],k=1,i[a]>1&&(k-=(1/p)**(g*y[a])),M<n[a]&&M>e[a]?A[h]=Math.floor(k*p*g**(1/i[a]))+l:M>=n[a]?A[h]=o:A[h]=l;w[a]=A}else for(a=0;a<s;a++){for(A=[],h=0;h<c;h++)M=h+u,M<=e[a]?A[h]=l:M>=n[a]?A[h]=o:A[h]=Math.floor((M-e[a])/m[a]*p)+l;w[a]=A}if(null!=t.contrastOffset){const e=f(t.contrastOffset,t.brightnessOffset);for(a=0;a<s;a++)for(A=w[a],h=0;h<c;h++)A[h]=e[A[h]]}return{lut:w,offset:u}}function f(t,e){const n=Math.min(Math.max(t,-100),100),i=Math.min(Math.max(e,-100),100),r=255,l=128;let o,s;const a=new Uint8Array(256);for(o=0;o<256;o++)n>0&&n<100?s=(200*o-100*r+2*r*i)/(2*(100-n))+l:n<=0&&n>-100?s=(200*o-100*r+2*r*i)*(100+n)/2e4+l:100===n?(s=200*o-100*r+(r+1)*(100-n)+2*r*i,s=s>0?r:0):-100===n&&(s=l),a[o]=s>r?r:s<0?0:s;return a}function h(t,e=256){e=Math.min(e,256);const{size:n,counts:i}=t,r=new Uint8Array(n),l=i.reduce(((t,n)=>t+n/e),0);let o=0,s=0,a=0,f=l;for(let h=0;h<n;h++)if(a+=i[h],!(h<n-1&&a+i[h+1]<f)){for(;o<e-1&&f<a;)o++,f+=l;for(let t=s;t<=h;t++)r[t]=o;s=h+1}for(let h=s;h<n;h++)r[h]=e-1;return r}function u(t,e){if(!n(t))return null;const i=t.clone(),{pixels:r,mask:l}=i,{minCutOff:o,maxCutOff:s,gamma:a}=e,f=e.outMin||0,h=e.outMax||255,u=i.width*i.height,c=r.length;let x,m,p,d,y;const g=h-f,w=[],M=[];for(x=0;x<c;x++)M[x]=s[x]-o[x],w[x]=g/(s[x]-o[x]);const k=a&&a.length>=c,A=[];if(k)for(x=0;x<c;x++)a[x]>1?a[x]>2?A[x]=6.5+(a[x]-2)**2.5:A[x]=6.5+100*(2-a[x])**4:A[x]=1;if(k)if(null!=l){for(m=0;m<u;m++)if(l[m])for(x=0;x<c;x++)p=r[x][m],y=(p-o[x])/M[x],d=1,a[x]>1&&(d-=(1/g)**(y*A[x])),p<s[x]&&p>o[x]?r[x][m]=Math.floor(d*g*y**(1/a[x]))+f:p>=s[x]?r[x][m]=h:r[x][m]=f}else for(m=0;m<u;m++)for(x=0;x<c;x++)p=r[x][m],y=(p-o[x])/M[x],d=1,a[x]>1&&(d-=(1/g)**(y*A[x])),p<s[x]&&p>o[x]?r[x][m]=Math.floor(d*g*y**(1/a[x]))+f:p>=s[x]?r[x][m]=h:r[x][m]=f;else if(null!=l){for(m=0;m<u;m++)if(l[m])for(x=0;x<c;x++)p=r[x][m],p<s[x]&&p>o[x]?r[x][m]=Math.floor((p-o[x])/M[x]*g)+f:p>=s[x]?r[x][m]=h:r[x][m]=f}else for(m=0;m<u;m++)for(x=0;x<c;x++)p=r[x][m],p<s[x]&&p>o[x]?r[x][m]=Math.floor((p-o[x])/M[x]*g)+f:p>=s[x]?r[x][m]=h:r[x][m]=f;return i.pixelType="u8",i.updateStatistics(),i}function c(t,i){if(!n(t))return null;const{pixels:r,mask:l}=t,o=t.width*t.height,s=r.length;let a=i.lut;const{offset:f}=i;let h,u;a&&1===a[0].length&&(a=r.map((()=>a)));const c=[];let x,m,p;if(f)if(null==l)for(h=0;h<s;h++){for(x=r[h],m=a[h],p=new Uint8Array(o),u=0;u<o;u++)p[u]=m[x[u]-f];c.push(p)}else for(h=0;h<s;h++){for(x=r[h],m=a[h],p=new Uint8Array(o),u=0;u<o;u++)l[u]&&(p[u]=m[x[u]-f]);c.push(p)}else if(null==l)for(h=0;h<s;h++){for(x=r[h],m=a[h],p=new Uint8Array(o),u=0;u<o;u++)p[u]=m[x[u]];c.push(p)}else for(h=0;h<s;h++){for(x=r[h],m=a[h],p=new Uint8Array(o),u=0;u<o;u++)l[u]&&(p[u]=m[x[u]]);c.push(p)}const d=new e({width:t.width,height:t.height,pixels:c,mask:l,pixelType:"u8"});return d.updateStatistics(),d}function x(t,e){if(!n(t))return null;const i=t.clone(),{pixels:r}=i,l=i.width*i.height,o=e.length,s=Math.floor(o/2),a=e[Math.floor(s)],f=r[0];let h,u,c,x,m,p,d=!1;const y=new Uint8Array(l),g=new Uint8Array(l),w=new Uint8Array(l);let M=i.mask;const k=4===e[0].mappedColor.length;for(M||(M=new Uint8Array(l),M.fill(k?255:1),i.mask=M),m=0;m<l;m++)if(M[m]){for(h=f[m],d=!1,p=s,u=a,c=0,x=o-1;x-c>1;){if(h===u.value){d=!0;break}h>u.value?c=p:x=p,p=Math.floor((c+x)/2),u=e[Math.floor(p)]}d||(h===e[c].value?(u=e[c],d=!0):h===e[x].value?(u=e[x],d=!0):h<e[c].value?(d=!1,u=null):h>e[c].value&&(h<e[x].value?(u=e[c],d=!0):x===o-1?(d=!1,u=null):(u=e[x],d=!0))),d?(y[m]=u.mappedColor[0],g[m]=u.mappedColor[1],w[m]=u.mappedColor[2],M[m]=u.mappedColor[3]):y[m]=g[m]=w[m]=M[m]=0}return i.pixels=[y,g,w],i.mask=M,i.pixelType="u8",i.maskIsAlpha=k,i}function m(t,e,n,i,r,l,o,s){return{xmin:r<=n*t?0:r<n*t+t?r-n*t:t,ymin:l<=i*e?0:l<i*e+e?l-i*e:e,xmax:r+o<=n*t?0:r+o<n*t+t?r+o-n*t:t,ymax:l+s<=i*e?0:l+s<i*e+e?l+s-i*e:e}}function p(t,e){if(!t||0===t.length)return null;const n=t.filter((t=>t.pixelBlock))[0];if(!n)return null;const i=(n.extent.xmax-n.extent.xmin)/n.pixelBlock.width,r=(n.extent.ymax-n.extent.ymin)/n.pixelBlock.height,l=.01*Math.min(i,r),o=t.sort(((t,e)=>Math.abs(t.extent.ymax-e.extent.ymax)>l?e.extent.ymax-t.extent.ymax:Math.abs(t.extent.xmin-e.extent.xmin)>l?t.extent.xmin-e.extent.xmin:0)),s=Math.min.apply(null,o.map((t=>t.extent.xmin))),a=Math.min.apply(null,o.map((t=>t.extent.ymin))),f=Math.max.apply(null,o.map((t=>t.extent.xmax))),h=Math.max.apply(null,o.map((t=>t.extent.ymax))),u={x:Math.round((e.xmin-s)/i),y:Math.round((h-e.ymax)/r)},c={width:Math.round((f-s)/i),height:Math.round((h-a)/r)},x={width:Math.round((e.xmax-e.xmin)/i),height:Math.round((e.ymax-e.ymin)/r)};if(Math.round(c.width/n.pixelBlock.width)*Math.round(c.height/n.pixelBlock.height)!==o.length||u.x<0||u.y<0||c.width<x.width||c.height<x.height)return null;return{extent:e,pixelBlock:d(o.map((t=>t.pixelBlock)),c,u,x)}}function d(t,i,r,l){const o=t.filter((t=>n(t)))[0];if(null==o)return null;const s=l?l.width:i.width,a=l?l.height:i.height,f=o.width,h=o.height,u=i.width/f,c=i.height/h,x=r?r.x:0,p=r?r.y:0,d=o.pixelType,y=e.getPixelArrayConstructor(d),g=o.pixels.length,w=[];let M,k,A,U,C,T,v,B,S,O,P;for(T=0;T<g;T++){for(k=new y(s*a),v=0;v<c;v++)for(B=0;B<u;B++)if(A=t[v*u+B],n(A))for(M=A.pixels[T],P=m(f,h,B,v,x,p,s,a),S=P.ymin;S<P.ymax;S++)for(U=(v*h+S-p)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)k[U+O]=M[C+O];w.push(k)}let z,b;if(t.some((t=>null==t||t.mask&&t.mask.length>0)))for(z=new Uint8Array(s*a),v=0;v<c;v++)for(B=0;B<u;B++)if(A=t[v*u+B],b=A?A.mask:null,P=m(f,h,B,v,x,p,s,a),b)for(S=P.ymin;S<P.ymax;S++)for(U=(v*h+S-p)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)z[U+O]=b[C+O];else if(A)for(S=P.ymin;S<P.ymax;S++)for(U=(v*h+S-p)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)z[U+O]=1;else for(S=P.ymin;S<P.ymax;S++)for(U=(v*h+S-p)*s+(B*f-x),C=S*f,O=P.xmin;O<P.xmax;O++)z[U+O]=0;const j=new e({width:s,height:a,pixels:w,pixelType:d,mask:z});return j.updateStatistics(),j}function y(t,e,i){if(!n(t))return null;const{width:r,height:l}=t,o=e.x,s=e.y,a=i.width+o,f=i.height+s;if(o<0||s<0||a>r||f>l)return t;if(0===o&&0===s&&a===r&&f===l)return t;t.mask||(t.mask=new Uint8Array(r*l));const h=t.mask;for(let n=0;n<l;n++){const t=n*r;for(let e=0;e<r;e++)h[t+e]=n<s||n>=f||e<o||e>=a?0:1}return t.updateStatistics(),t}function g(t){if(!n(t))return null;const e=t.clone(),{width:i,height:r,pixels:l,mask:o}=t,s=l[0],a=e.pixels[0];for(let n=2;n<r-1;n++){const t=new Map;for(let r=n-2;r<n+2;r++)for(let e=0;e<4;e++){const n=r*i+e;k(t,s[n],o?o[n]:1)}a[n*i]=w(t),a[n*i+1]=a[n*i+2]=a[n*i];let e=3;for(;e<i-1;e++){let r=(n-2)*i+e+1;k(t,s[r],o?o[r]:1),r=(n-1)*i+e+1,k(t,s[r],o?o[r]:1),r=n*i+e+1,k(t,s[r],o?o[r]:1),r=(n+1)*i+e+1,k(t,s[r],o?o[r]:1),r=(n-2)*i+e-3,M(t,s[r],o?o[r]:1),r=(n-1)*i+e-3,M(t,s[r],o?o[r]:1),r=n*i+e-3,M(t,s[r],o?o[r]:1),r=(n+1)*i+e-3,M(t,s[r],o?o[r]:1),a[n*i+e]=w(t)}a[n*i+e+1]=a[n*i+e]}for(let n=0;n<i;n++)a[n]=a[i+n]=a[2*i+n],a[(r-1)*i+n]=a[(r-2)*i+n];return e.updateStatistics(),e}function w(t){if(0===t.size)return 0;let e=0,n=-1,i=0;const r=t.keys();let l=r.next();for(;!l.done;)i=t.get(l.value),i>e&&(n=l.value,e=i),l=r.next();return n}function M(t,e,n){if(0===n)return;const i=t.get(e);1===i?t.delete(e):t.set(e,i-1)}function k(t,e,n){0!==n&&t.set(e,t.has(e)?t.get(e)+1:1)}function A(t,i,r){let{x:l,y:o}=i;const{width:s,height:a}=r;if(0===l&&0===o&&a===t.height&&s===t.width)return t;const{width:f,height:h}=t,u=Math.max(0,o),c=Math.max(0,l),x=Math.min(l+s,f),m=Math.min(o+a,h);if(x<0||m<0||!n(t))return null;l=Math.max(0,-l),o=Math.max(0,-o);const{pixels:p,mask:d}=t,y=s*a,g=p.length,w=[];for(let n=0;n<g;n++){const i=p[n],r=e.createEmptyBand(t.pixelType,y);for(let t=u;t<m;t++){const e=t*f;let n=(t+o-u)*s+l;for(let t=c;t<x;t++)r[n++]=i[e+t]}w.push(r)}const M=new Uint8Array(y);for(let e=u;e<m;e++){const t=e*f;let n=(e+o-u)*s+l;for(let e=c;e<x;e++)M[n++]=d?d[t+e]:1}const k=new e({width:r.width,height:r.height,pixelType:t.pixelType,pixels:w,mask:M});return k.updateStatistics(),k}function U(t,i=!0){if(!n(t))return null;const{pixels:r,width:l,height:o,mask:s,pixelType:a}=t,f=[],h=Math.round(l/2),u=Math.round(o/2),c=o-1,x=l-1;for(let n=0;n<r.length;n++){const t=r[n],s=e.createEmptyBand(a,h*u);let m=0;for(let e=0;e<o;e+=2)for(let n=0;n<l;n+=2){const r=t[e*l+n];if(i){const i=n===x?r:t[e*l+n+1],o=e===c?r:t[e*l+n+l],a=n===x?o:e===c?i:t[e*l+n+l+1];s[m++]=(r+i+o+a)/4}else s[m++]=r}f.push(s)}let m=null;if(s){m=new Uint8Array(h*u);let t=0;for(let e=0;e<o;e+=2)for(let n=0;n<l;n+=2){const r=s[e*l+n];if(i){const i=n===x?r:s[e*l+n+1],o=e===c?r:s[e*l+n+l],a=n===x?o:e===c?i:s[e*l+n+l+1];m[t++]=r*i*o*a?1:0}else m[t++]=r}}return new e({width:h,height:u,pixelType:a,pixels:f,mask:m})}function C(t,e,i){if(!n(t))return null;const{width:r,height:l}=e;let{width:o,height:s}=t;const a=new Map,f={x:0,y:0},h=null==i?1:1+i;let u=t;for(let n=0;n<h;n++){const t=Math.ceil(o/r),i=Math.ceil(s/l);for(let o=0;o<i;o++){f.y=o*l;for(let i=0;i<t;i++){f.x=i*r;const t=A(u,f,e);a.set(`${n}/${o}/${i}`,t)}}n<h-1&&(u=U(u)),o=Math.round(o/2),s=Math.round(s/2)}return a}function T(t,i,r,l,o="nearest"){if(!n(t))return null;"majority"===o&&(t=g(t));const{pixels:s,mask:a,pixelType:f}=t,h=t.width,u=t.height,c=e.getPixelArrayConstructor(f),x=s.length,{width:m,height:p}=i,d=l.cols,y=l.rows,w=Math.ceil(m/d),M=Math.ceil(p/y);let k,A,U,C,T,v,B,S=!1;for(let e=0;e<r.length;e+=3)-1===r[e]&&-1===r[e+1]&&-1===r[e+2]&&(S=!0);const O=new Float32Array(m*p),P=new Float32Array(m*p);let z,b,j=0;const D="majority"===o?0:.5;for(let e=0;e<M;e++)for(let t=0;t<w;t++){k=12*(e*w+t),A=r[k],U=r[k+1],C=r[k+2],T=r[k+3],v=r[k+4],B=r[k+5];for(let n=0;n<y;n++){j=(e*y+n)*m+t*d,b=(n+.5)/y;for(let t=0;t<n;t++)z=(t+.5)/d,O[j+t]=Math.round((A*z+U*b+C)*h-D),P[j+t]=Math.round((T*z+v*b+B)*u-D)}k+=6,A=r[k],U=r[k+1],C=r[k+2],T=r[k+3],v=r[k+4],B=r[k+5];for(let n=0;n<y;n++){j=(e*y+n)*m+t*d,b=(n+.5)/y;for(let t=n;t<d;t++)z=(t+.5)/d,O[j+t]=Math.round((A*z+U*b+C)*h-D),P[j+t]=Math.round((T*z+v*b+B)*u-D)}}const E=(t,e)=>{for(let n=0;n<p;n++){k=n*m;for(let n=0;n<m;n++)O[k]<0||P[k]<0?t[k]=0:t[k]=e[O[k]+P[k]*h],k++}},I=[];let L;for(let e=0;e<x;e++)L=new c(m*p),E(L,s[e]),I.push(L);const q=new e({width:m,height:p,pixelType:f,pixels:I});if(a)q.mask=new Uint8Array(m*p),E(q.mask,a);else if(S){q.mask=new Uint8Array(m*p);for(let t=0;t<m*p;t++)q.mask[t]=O[t]<0||P[t]<0?0:1}return q.updateStatistics(),q}t.approximateTransform=T,t.clip=A,t.colorize=l,t.createColormapLUT=r,t.createContrastBrightnessLUT=f,t.createHistogramEqualizationLUT=h,t.createStretchLUT=a,t.estimateStatisticsFromHistograms=s,t.estimateStatisticsHistograms=o,t.extractBands=i,t.getClipBounds=m,t.lookupPixels=c,t.mosaic=d,t.mosaicPixelData=p,t.remapColor=x,t.resampleByMajority=g,t.setValidBoundary=y,t.split=C,t.stretch=u,Object.defineProperty(t,"__esModule",{value:!0})}));
