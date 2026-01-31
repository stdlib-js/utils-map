"use strict";var d=function(r,e){return function(){return e||r((e={exports:{}}).exports,e),e.exports}};var b=d(function(sr,O){"use strict";var T=require("@stdlib/ndarray-base-vind2bind"),V="throw";function J(r,e,i,a){var t,n,v,o,s,y,c,m,f,w,k,j,h,p,E,F,u;if(s=r.length,f=r.shape,w=e.shape,t=r.data,n=e.data,k=r.strides,j=e.strides,h=r.offset,p=e.offset,v=r.order,o=e.order,y=r.accessors[0],c=e.accessors[1],m=r.ref,f.length===0){c(n,p,i.call(a,y(t,h),0,m));return}for(u=0;u<s;u++)E=T(f,k,h,v,u,V),F=T(w,j,p,o,u,V),c(n,F,i.call(a,y(t,E),u,m))}O.exports=J});var q=d(function(ur,x){"use strict";function K(r,e,i,a){var t,n,v,o,s;for(t=r.data,n=e.data,v=r.accessors[0],o=e.accessors[1],s=0;s<t.length;s++)o(n,s,i.call(a,v(t,s),s,t))}x.exports=K});var C=d(function(vr,z){"use strict";var N=require("@stdlib/assert-is-array-like-object"),P=require("@stdlib/assert-is-ndarray-like"),Q=require("@stdlib/assert-is-function"),U=require("@stdlib/array-base-zeros"),L=require("@stdlib/ndarray-base-ndarraylike2object"),I=require("@stdlib/array-base-arraylike2object"),W=require("@stdlib/ndarray-zeros"),R=require("@stdlib/string-format"),X=b(),Y=q();function Z(r,e,i){var a;if(!Q(e))throw new TypeError(R("invalid argument. Second argument must be a function. Value: `%s`.",e));if(P(r))return r=L(r),a=W(r.shape,{dtype:"generic",order:r.order}),X(r,L(a),e,i),a;if(N(r))return a=U(r.length),Y(I(r),I(a),e,i),a;throw new TypeError(R("invalid argument. First argument must be an array-like object or an ndarray. Value: `%s`.",r))}z.exports=Z});var G=d(function(or,B){"use strict";var D=require("@stdlib/assert-is-array-like-object"),g=require("@stdlib/assert-is-ndarray-like"),_=require("@stdlib/assert-is-function"),M=require("@stdlib/ndarray-base-ndarraylike2object"),S=require("@stdlib/array-base-arraylike2object"),$=require("@stdlib/ndarray-base-maybe-broadcast-array"),A=require("@stdlib/ndarray-base-assert-is-read-only"),l=require("@stdlib/string-format"),rr=b(),er=q();function ar(r,e,i,a){var t,n;if(!_(i))throw new TypeError(l("invalid argument. Third argument must be a function. Value: `%s`.",i));if(g(r)){if(!g(e))throw new TypeError(l("invalid argument. If the input array is an ndarray, the output array must also be an ndarray. Value: `%s`.",e));if(A(e))throw new Error("invalid argument. The output ndarray must be writable. Cannot write to a read-only ndarray.");return e=M(e),n=e.shape,t=M($(r,n)),t.ref=r,r=t,rr(r,e,i,a),e.ref}if(D(r)){if(!D(e)||g(e))throw new TypeError(l("invalid argument. If the input array is an array-like object, the output array must also be an array-like object. Value: `%s`.",e));if(r.length!==e.length)throw new RangeError("invalid arguments. Input and output arrays must have the same length.");return er(S(r),S(e),i,a),e}throw new TypeError(l("invalid argument. First argument must be an array-like object or an ndarray. Value: `%s`.",r))}B.exports=ar});var ir=require("@stdlib/utils-define-nonenumerable-read-only-property"),H=C(),tr=G();ir(H,"assign",tr);module.exports=H;
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
