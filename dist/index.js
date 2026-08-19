"use strict";var d=function(e,r){return function(){try{return r||e((r={exports:{}}).exports,r),r.exports}catch(a){throw r=0,a}}};var b=d(function(sr,O){"use strict";var T=require("@stdlib/ndarray-base-vind2bind"),V="throw";function J(e,r,a,i){var t,n,v,o,s,y,c,m,f,w,k,j,h,p,E,F,u;if(s=e.length,f=e.shape,w=r.shape,t=e.data,n=r.data,k=e.strides,j=r.strides,h=e.offset,p=r.offset,v=e.order,o=r.order,y=e.accessors[0],c=r.accessors[1],m=e.ref,f.length===0){c(n,p,a.call(i,y(t,h),0,m));return}for(u=0;u<s;u++)E=T(f,k,h,v,u,V),F=T(w,j,p,o,u,V),c(n,F,a.call(i,y(t,E),u,m))}O.exports=J});var q=d(function(ur,x){"use strict";function K(e,r,a,i){var t,n,v,o,s;for(t=e.data,n=r.data,v=e.accessors[0],o=r.accessors[1],s=0;s<t.length;s++)o(n,s,a.call(i,v(t,s),s,t))}x.exports=K});var C=d(function(vr,z){"use strict";var N=require("@stdlib/assert-is-array-like-object"),P=require("@stdlib/assert-is-ndarray-like"),Q=require("@stdlib/assert-is-function"),U=require("@stdlib/array-base-zeros"),L=require("@stdlib/ndarray-base-ndarraylike2object"),I=require("@stdlib/array-base-arraylike2object"),W=require("@stdlib/ndarray-zeros"),R=require("@stdlib/string-format"),X=b(),Y=q();function Z(e,r,a){var i;if(!Q(r))throw new TypeError(R("invalid argument. Second argument must be a function. Value: `%s`.",r));if(P(e))return e=L(e),i=W(e.shape,{dtype:"generic",order:e.order}),X(e,L(i),r,a),i;if(N(e))return i=U(e.length),Y(I(e),I(i),r,a),i;throw new TypeError(R("invalid argument. First argument must be an array-like object or an ndarray. Value: `%s`.",e))}z.exports=Z});var G=d(function(or,B){"use strict";var D=require("@stdlib/assert-is-array-like-object"),g=require("@stdlib/assert-is-ndarray-like"),_=require("@stdlib/assert-is-function"),M=require("@stdlib/ndarray-base-ndarraylike2object"),S=require("@stdlib/array-base-arraylike2object"),$=require("@stdlib/ndarray-base-maybe-broadcast-array"),A=require("@stdlib/ndarray-base-assert-is-read-only"),l=require("@stdlib/string-format"),rr=b(),er=q();function ar(e,r,a,i){var t,n;if(!_(a))throw new TypeError(l("invalid argument. Third argument must be a function. Value: `%s`.",a));if(g(e)){if(!g(r))throw new TypeError(l("invalid argument. If the input array is an ndarray, the output array must also be an ndarray. Value: `%s`.",r));if(A(r))throw new Error("invalid argument. The output ndarray must be writable. Cannot write to a read-only ndarray.");return r=M(r),n=r.shape,t=M($(e,n)),t.ref=e,e=t,rr(e,r,a,i),r.ref}if(D(e)){if(!D(r)||g(r))throw new TypeError(l("invalid argument. If the input array is an array-like object, the output array must also be an array-like object. Value: `%s`.",r));if(e.length!==r.length)throw new RangeError("invalid arguments. Input and output arrays must have the same length.");return er(S(e),S(r),a,i),r}throw new TypeError(l("invalid argument. First argument must be an array-like object or an ndarray. Value: `%s`.",e))}B.exports=ar});var ir=require("@stdlib/utils-define-nonenumerable-read-only-property"),H=C(),tr=G();ir(H,"assign",tr);module.exports=H;
/**
* @license Apache-2.0
*
* Copyright (c) 2021 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
//# sourceMappingURL=index.js.map
