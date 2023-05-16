function t(t,e,i,s){var n,r=arguments.length,o=r<3?e:null===s?s=Object.getOwnPropertyDescriptor(e,i):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,i,s);else for(var l=t.length-1;l>=0;l--)(n=t[l])&&(o=(r<3?n(o):r>3?n(e,i,o):n(e,i))||o);return r>3&&o&&Object.defineProperty(e,i,o),o}function e(t){return Array.isArray?Array.isArray(t):"[object Array]"===a(t)}const i=1/0;function s(t){return null==t?"":function(t){if("string"==typeof t)return t;let e=t+"";return"0"==e&&1/t==-i?"-0":e}(t)}function n(t){return"string"==typeof t}function r(t){return"number"==typeof t}function o(t){return!0===t||!1===t||function(t){return l(t)&&null!==t}(t)&&"[object Boolean]"==a(t)}function l(t){return"object"==typeof t}function h(t){return null!=t}function c(t){return!t.trim().length}function a(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const d=t=>`Missing ${t} property in key`,u=t=>`Property 'weight' in key '${t}' must be a positive integer`,p=Object.prototype.hasOwnProperty;class g{constructor(t){this._keys=[],this._keyMap={};let e=0;t.forEach((t=>{let i=f(t);e+=i.weight,this._keys.push(i),this._keyMap[i.id]=i,e+=i.weight})),this._keys.forEach((t=>{t.weight/=e}))}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function f(t){let i=null,s=null,r=null,o=1,l=null;if(n(t)||e(t))r=t,i=v(t),s=m(t);else{if(!p.call(t,"name"))throw new Error(d("name"));const e=t.name;if(r=e,p.call(t,"weight")&&(o=t.weight,o<=0))throw new Error(u(e));i=v(e),s=m(e),l=t.getFn}return{path:i,id:s,weight:o,src:r,getFn:l}}function v(t){return e(t)?t:t.split(".")}function m(t){return e(t)?t.join("."):t}const y={useExtendedSearch:!1,getFn:function(t,i){let l=[],c=!1;const a=(t,i,d)=>{if(h(t))if(i[d]){const u=t[i[d]];if(!h(u))return;if(d===i.length-1&&(n(u)||r(u)||o(u)))l.push(s(u));else if(e(u)){c=!0;for(let t=0,e=u.length;t<e;t+=1)a(u[t],i,d+1)}else i.length&&a(u,i,d+1)}else l.push(t)};return a(t,n(i)?i.split("."):i,0),c?l:l[0]},ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var $={isCaseSensitive:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(t,e)=>t.score===e.score?t.idx<e.idx?-1:1:t.score<e.score?-1:1,includeMatches:!1,findAllMatches:!1,minMatchCharLength:1,location:0,threshold:.6,distance:100,...y};const _=/[^ ]+/g;class A{constructor({getFn:t=$.getFn,fieldNormWeight:e=$.fieldNormWeight}={}){this.norm=function(t=1,e=3){const i=new Map,s=Math.pow(10,e);return{get(e){const n=e.match(_).length;if(i.has(n))return i.get(n);const r=1/Math.pow(n,.5*t),o=parseFloat(Math.round(r*s)/s);return i.set(n,o),o},clear(){i.clear()}}}(e,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach(((t,e)=>{this._keysMap[t.id]=e}))}create(){!this.isCreated&&this.docs.length&&(this.isCreated=!0,n(this.docs[0])?this.docs.forEach(((t,e)=>{this._addString(t,e)})):this.docs.forEach(((t,e)=>{this._addObject(t,e)})),this.norm.clear())}add(t){const e=this.size();n(t)?this._addString(t,e):this._addObject(t,e)}removeAt(t){this.records.splice(t,1);for(let e=t,i=this.size();e<i;e+=1)this.records[e].i-=1}getValueForItemAtKeyId(t,e){return t[this._keysMap[e]]}size(){return this.records.length}_addString(t,e){if(!h(t)||c(t))return;let i={v:t,i:e,n:this.norm.get(t)};this.records.push(i)}_addObject(t,i){let s={i:i,$:{}};this.keys.forEach(((i,r)=>{let o=i.getFn?i.getFn(t):this.getFn(t,i.path);if(h(o))if(e(o)){let t=[];const i=[{nestedArrIndex:-1,value:o}];for(;i.length;){const{nestedArrIndex:s,value:r}=i.pop();if(h(r))if(n(r)&&!c(r)){let e={v:r,i:s,n:this.norm.get(r)};t.push(e)}else e(r)&&r.forEach(((t,e)=>{i.push({nestedArrIndex:e,value:t})}))}s.$[r]=t}else if(n(o)&&!c(o)){let t={v:o,n:this.norm.get(o)};s.$[r]=t}})),this.records.push(s)}toJSON(){return{keys:this.keys,records:this.records}}}function x(t,e,{getFn:i=$.getFn,fieldNormWeight:s=$.fieldNormWeight}={}){const n=new A({getFn:i,fieldNormWeight:s});return n.setKeys(t.map(f)),n.setSources(e),n.create(),n}function S(t,{errors:e=0,currentLocation:i=0,expectedLocation:s=0,distance:n=$.distance,ignoreLocation:r=$.ignoreLocation}={}){const o=e/t.length;if(r)return o;const l=Math.abs(s-i);return n?o+l/n:l?1:o}const b=32;function M(t,e,i,{location:s=$.location,distance:n=$.distance,threshold:r=$.threshold,findAllMatches:o=$.findAllMatches,minMatchCharLength:l=$.minMatchCharLength,includeMatches:h=$.includeMatches,ignoreLocation:c=$.ignoreLocation}={}){if(e.length>b)throw new Error(`Pattern length exceeds max of ${b}.`);const a=e.length,d=t.length,u=Math.max(0,Math.min(s,d));let p=r,g=u;const f=l>1||h,v=f?Array(d):[];let m;for(;(m=t.indexOf(e,g))>-1;){let t=S(e,{currentLocation:m,expectedLocation:u,distance:n,ignoreLocation:c});if(p=Math.min(t,p),g=m+a,f){let t=0;for(;t<a;)v[m+t]=1,t+=1}}g=-1;let y=[],_=1,A=a+d;const x=1<<a-1;for(let s=0;s<a;s+=1){let r=0,l=A;for(;r<l;){S(e,{errors:s,currentLocation:u+l,expectedLocation:u,distance:n,ignoreLocation:c})<=p?r=l:A=l,l=Math.floor((A-r)/2+r)}A=l;let h=Math.max(1,u-l+1),m=o?d:Math.min(u+l,d)+a,$=Array(m+2);$[m+1]=(1<<s)-1;for(let r=m;r>=h;r-=1){let o=r-1,l=i[t.charAt(o)];if(f&&(v[o]=+!!l),$[r]=($[r+1]<<1|1)&l,s&&($[r]|=(y[r+1]|y[r])<<1|1|y[r+1]),$[r]&x&&(_=S(e,{errors:s,currentLocation:o,expectedLocation:u,distance:n,ignoreLocation:c}),_<=p)){if(p=_,g=o,g<=u)break;h=Math.max(1,2*u-g)}}if(S(e,{errors:s+1,currentLocation:u,expectedLocation:u,distance:n,ignoreLocation:c})>p)break;y=$}const M={isMatch:g>=0,score:Math.max(.001,_)};if(f){const t=function(t=[],e=$.minMatchCharLength){let i=[],s=-1,n=-1,r=0;for(let o=t.length;r<o;r+=1){let o=t[r];o&&-1===s?s=r:o||-1===s||(n=r-1,n-s+1>=e&&i.push([s,n]),s=-1)}return t[r-1]&&r-s>=e&&i.push([s,r-1]),i}(v,l);t.length?h&&(M.indices=t):M.isMatch=!1}return M}function E(t){let e={};for(let i=0,s=t.length;i<s;i+=1){const n=t.charAt(i);e[n]=(e[n]||0)|1<<s-i-1}return e}class C{constructor(t,{location:e=$.location,threshold:i=$.threshold,distance:s=$.distance,includeMatches:n=$.includeMatches,findAllMatches:r=$.findAllMatches,minMatchCharLength:o=$.minMatchCharLength,isCaseSensitive:l=$.isCaseSensitive,ignoreLocation:h=$.ignoreLocation}={}){if(this.options={location:e,threshold:i,distance:s,includeMatches:n,findAllMatches:r,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:h},this.pattern=l?t:t.toLowerCase(),this.chunks=[],!this.pattern.length)return;const c=(t,e)=>{this.chunks.push({pattern:t,alphabet:E(t),startIndex:e})},a=this.pattern.length;if(a>b){let t=0;const e=a%b,i=a-e;for(;t<i;)c(this.pattern.substr(t,b),t),t+=b;if(e){const t=a-b;c(this.pattern.substr(t),t)}}else c(this.pattern,0)}searchIn(t){const{isCaseSensitive:e,includeMatches:i}=this.options;if(e||(t=t.toLowerCase()),this.pattern===t){let e={isMatch:!0,score:0};return i&&(e.indices=[[0,t.length-1]]),e}const{location:s,distance:n,threshold:r,findAllMatches:o,minMatchCharLength:l,ignoreLocation:h}=this.options;let c=[],a=0,d=!1;this.chunks.forEach((({pattern:e,alphabet:u,startIndex:p})=>{const{isMatch:g,score:f,indices:v}=M(t,e,u,{location:s+p,distance:n,threshold:r,findAllMatches:o,minMatchCharLength:l,includeMatches:i,ignoreLocation:h});g&&(d=!0),a+=f,g&&v&&(c=[...c,...v])}));let u={isMatch:d,score:d?a/this.chunks.length:1};return d&&i&&(u.indices=c),u}}class w{constructor(t){this.pattern=t}static isMultiMatch(t){return k(t,this.multiRegex)}static isSingleMatch(t){return k(t,this.singleRegex)}search(){}}function k(t,e){const i=t.match(e);return i?i[1]:null}class L extends w{constructor(t,{location:e=$.location,threshold:i=$.threshold,distance:s=$.distance,includeMatches:n=$.includeMatches,findAllMatches:r=$.findAllMatches,minMatchCharLength:o=$.minMatchCharLength,isCaseSensitive:l=$.isCaseSensitive,ignoreLocation:h=$.ignoreLocation}={}){super(t),this._bitapSearch=new C(t,{location:e,threshold:i,distance:s,includeMatches:n,findAllMatches:r,minMatchCharLength:o,isCaseSensitive:l,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class I extends w{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let e,i=0;const s=[],n=this.pattern.length;for(;(e=t.indexOf(this.pattern,i))>-1;)i=e+n,s.push([e,i-1]);const r=!!s.length;return{isMatch:r,score:r?0:1,indices:s}}}const P=[class extends w{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const e=t===this.pattern;return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},I,class extends w{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const e=t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,this.pattern.length-1]}}},class extends w{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const e=!t.startsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends w{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const e=!t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},class extends w{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const e=t.endsWith(this.pattern);return{isMatch:e,score:e?0:1,indices:[t.length-this.pattern.length,t.length-1]}}},class extends w{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const e=-1===t.indexOf(this.pattern);return{isMatch:e,score:e?0:1,indices:[0,t.length-1]}}},L],N=P.length,R=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/;const O=new Set([L.type,I.type]);class U{constructor(t,{isCaseSensitive:e=$.isCaseSensitive,includeMatches:i=$.includeMatches,minMatchCharLength:s=$.minMatchCharLength,ignoreLocation:n=$.ignoreLocation,findAllMatches:r=$.findAllMatches,location:o=$.location,threshold:l=$.threshold,distance:h=$.distance}={}){this.query=null,this.options={isCaseSensitive:e,includeMatches:i,minMatchCharLength:s,findAllMatches:r,ignoreLocation:n,location:o,threshold:l,distance:h},this.pattern=e?t:t.toLowerCase(),this.query=function(t,e={}){return t.split("|").map((t=>{let i=t.trim().split(R).filter((t=>t&&!!t.trim())),s=[];for(let t=0,n=i.length;t<n;t+=1){const n=i[t];let r=!1,o=-1;for(;!r&&++o<N;){const t=P[o];let i=t.isMultiMatch(n);i&&(s.push(new t(i,e)),r=!0)}if(!r)for(o=-1;++o<N;){const t=P[o];let i=t.isSingleMatch(n);if(i){s.push(new t(i,e));break}}}return s}))}(this.pattern,this.options)}static condition(t,e){return e.useExtendedSearch}searchIn(t){const e=this.query;if(!e)return{isMatch:!1,score:1};const{includeMatches:i,isCaseSensitive:s}=this.options;t=s?t:t.toLowerCase();let n=0,r=[],o=0;for(let s=0,l=e.length;s<l;s+=1){const l=e[s];r.length=0,n=0;for(let e=0,s=l.length;e<s;e+=1){const s=l[e],{isMatch:h,indices:c,score:a}=s.search(t);if(!h){o=0,n=0,r.length=0;break}if(n+=1,o+=a,i){const t=s.constructor.type;O.has(t)?r=[...r,...c]:r.push(c)}}if(n){let t={isMatch:!0,score:o/n};return i&&(t.indices=r),t}}return{isMatch:!1,score:1}}}const H=[];function T(t,e){for(let i=0,s=H.length;i<s;i+=1){let s=H[i];if(s.condition(t,e))return new s(t,e)}return new C(t,e)}const j="$and",z="$or",F="$path",W="$val",B=t=>!(!t[j]&&!t[z]),D=t=>({[j]:Object.keys(t).map((e=>({[e]:t[e]})))});function V(t,i,{auto:s=!0}={}){const r=t=>{let o=Object.keys(t);const h=(t=>!!t[F])(t);if(!h&&o.length>1&&!B(t))return r(D(t));if((t=>!e(t)&&l(t)&&!B(t))(t)){const e=h?t[F]:o[0],r=h?t[W]:t[e];if(!n(r))throw new Error((t=>`Invalid value for key ${t}`)(e));const l={keyId:m(e),pattern:r};return s&&(l.searcher=T(r,i)),l}let c={children:[],operator:o[0]};return o.forEach((i=>{const s=t[i];e(s)&&s.forEach((t=>{c.children.push(r(t))}))})),c};return B(t)||(t=D(t)),r(t)}function q(t,e){const i=t.matches;e.matches=[],h(i)&&i.forEach((t=>{if(!h(t.indices)||!t.indices.length)return;const{indices:i,value:s}=t;let n={indices:i,value:s};t.key&&(n.key=t.key.src),t.idx>-1&&(n.refIndex=t.idx),e.matches.push(n)}))}function K(t,e){e.score=t.score}class J{constructor(t,e={},i){this.options={...$,...e},this.options.useExtendedSearch,this._keyStore=new g(this.options.keys),this.setCollection(t,i)}setCollection(t,e){if(this._docs=t,e&&!(e instanceof A))throw new Error("Incorrect 'index' type");this._myIndex=e||x(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){h(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=(()=>!1)){const e=[];for(let i=0,s=this._docs.length;i<s;i+=1){const n=this._docs[i];t(n,i)&&(this.removeAt(i),i-=1,s-=1,e.push(n))}return e}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:e=-1}={}){const{includeMatches:i,includeScore:s,shouldSort:o,sortFn:l,ignoreFieldNorm:h}=this.options;let c=n(t)?n(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return function(t,{ignoreFieldNorm:e=$.ignoreFieldNorm}){t.forEach((t=>{let i=1;t.matches.forEach((({key:t,norm:s,score:n})=>{const r=t?t.weight:null;i*=Math.pow(0===n&&r?Number.EPSILON:n,(r||1)*(e?1:s))})),t.score=i}))}(c,{ignoreFieldNorm:h}),o&&c.sort(l),r(e)&&e>-1&&(c=c.slice(0,e)),function(t,e,{includeMatches:i=$.includeMatches,includeScore:s=$.includeScore}={}){const n=[];return i&&n.push(q),s&&n.push(K),t.map((t=>{const{idx:i}=t,s={item:e[i],refIndex:i};return n.length&&n.forEach((e=>{e(t,s)})),s}))}(c,this._docs,{includeMatches:i,includeScore:s})}_searchStringList(t){const e=T(t,this.options),{records:i}=this._myIndex,s=[];return i.forEach((({v:t,i:i,n:n})=>{if(!h(t))return;const{isMatch:r,score:o,indices:l}=e.searchIn(t);r&&s.push({item:t,idx:i,matches:[{score:o,value:t,norm:n,indices:l}]})})),s}_searchLogical(t){const e=V(t,this.options),i=(t,e,s)=>{if(!t.children){const{keyId:i,searcher:n}=t,r=this._findMatches({key:this._keyStore.get(i),value:this._myIndex.getValueForItemAtKeyId(e,i),searcher:n});return r&&r.length?[{idx:s,item:e,matches:r}]:[]}const n=[];for(let r=0,o=t.children.length;r<o;r+=1){const o=t.children[r],l=i(o,e,s);if(l.length)n.push(...l);else if(t.operator===j)return[]}return n},s=this._myIndex.records,n={},r=[];return s.forEach((({$:t,i:s})=>{if(h(t)){let o=i(e,t,s);o.length&&(n[s]||(n[s]={idx:s,item:t,matches:[]},r.push(n[s])),o.forEach((({matches:t})=>{n[s].matches.push(...t)})))}})),r}_searchObjectList(t){const e=T(t,this.options),{keys:i,records:s}=this._myIndex,n=[];return s.forEach((({$:t,i:s})=>{if(!h(t))return;let r=[];i.forEach(((i,s)=>{r.push(...this._findMatches({key:i,value:t[s],searcher:e}))})),r.length&&n.push({idx:s,item:t,matches:r})})),n}_findMatches({key:t,value:i,searcher:s}){if(!h(i))return[];let n=[];if(e(i))i.forEach((({v:e,i:i,n:r})=>{if(!h(e))return;const{isMatch:o,score:l,indices:c}=s.searchIn(e);o&&n.push({score:l,key:t,value:e,idx:i,norm:r,indices:c})}));else{const{v:e,n:r}=i,{isMatch:o,score:l,indices:h}=s.searchIn(e);o&&n.push({score:l,key:t,value:e,norm:r,indices:h})}return n}}J.version="6.6.2",J.createIndex=x,J.parseIndex=function(t,{getFn:e=$.getFn,fieldNormWeight:i=$.fieldNormWeight}={}){const{keys:s,records:n}=t,r=new A({getFn:e,fieldNormWeight:i});return r.setKeys(s),r.setIndexRecords(n),r},J.config=$,J.parseQuery=V,function(...t){H.push(...t)}(U);
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z=window,Q=Z.ShadowRoot&&(void 0===Z.ShadyCSS||Z.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,G=Symbol(),X=new WeakMap;let Y=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==G)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(Q&&void 0===t){const i=void 0!==e&&1===e.length;i&&(t=X.get(e)),void 0===t&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&X.set(e,t))}return t}toString(){return this.cssText}};const tt=Q?t=>t:t=>t instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return(t=>new Y("string"==typeof t?t:t+"",void 0,G))(e)})(t):t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */;var et;const it=window,st=it.trustedTypes,nt=st?st.emptyScript:"",rt=it.reactiveElementPolyfillSupport,ot={toAttribute(t,e){switch(e){case Boolean:t=t?nt:null;break;case Object:case Array:t=null==t?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=null!==t;break;case Number:i=null===t?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch(t){i=null}}return i}},lt=(t,e)=>e!==t&&(e==e||t==t),ht={attribute:!0,type:String,converter:ot,reflect:!1,hasChanged:lt};let ct=class extends HTMLElement{constructor(){super(),this._$Ei=new Map,this.isUpdatePending=!1,this.hasUpdated=!1,this._$El=null,this.u()}static addInitializer(t){var e;this.finalize(),(null!==(e=this.h)&&void 0!==e?e:this.h=[]).push(t)}static get observedAttributes(){this.finalize();const t=[];return this.elementProperties.forEach(((e,i)=>{const s=this._$Ep(i,e);void 0!==s&&(this._$Ev.set(s,i),t.push(s))})),t}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this.finalize(),this.elementProperties.set(t,e),!e.noAccessor&&!this.prototype.hasOwnProperty(t)){const i="symbol"==typeof t?Symbol():"__"+t,s=this.getPropertyDescriptor(t,i,e);void 0!==s&&Object.defineProperty(this.prototype,t,s)}}static getPropertyDescriptor(t,e,i){return{get(){return this[e]},set(s){const n=this[t];this[e]=s,this.requestUpdate(t,n,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)||ht}static finalize(){if(this.hasOwnProperty("finalized"))return!1;this.finalized=!0;const t=Object.getPrototypeOf(this);if(t.finalize(),void 0!==t.h&&(this.h=[...t.h]),this.elementProperties=new Map(t.elementProperties),this._$Ev=new Map,this.hasOwnProperty("properties")){const t=this.properties,e=[...Object.getOwnPropertyNames(t),...Object.getOwnPropertySymbols(t)];for(const i of e)this.createProperty(i,t[i])}return this.elementStyles=this.finalizeStyles(this.styles),!0}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const t of i)e.unshift(tt(t))}else void 0!==t&&e.push(tt(t));return e}static _$Ep(t,e){const i=e.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof t?t.toLowerCase():void 0}u(){var t;this._$E_=new Promise((t=>this.enableUpdating=t)),this._$AL=new Map,this._$Eg(),this.requestUpdate(),null===(t=this.constructor.h)||void 0===t||t.forEach((t=>t(this)))}addController(t){var e,i;(null!==(e=this._$ES)&&void 0!==e?e:this._$ES=[]).push(t),void 0!==this.renderRoot&&this.isConnected&&(null===(i=t.hostConnected)||void 0===i||i.call(t))}removeController(t){var e;null===(e=this._$ES)||void 0===e||e.splice(this._$ES.indexOf(t)>>>0,1)}_$Eg(){this.constructor.elementProperties.forEach(((t,e)=>{this.hasOwnProperty(e)&&(this._$Ei.set(e,this[e]),delete this[e])}))}createRenderRoot(){var t;const e=null!==(t=this.shadowRoot)&&void 0!==t?t:this.attachShadow(this.constructor.shadowRootOptions);return((t,e)=>{Q?t.adoptedStyleSheets=e.map((t=>t instanceof CSSStyleSheet?t:t.styleSheet)):e.forEach((e=>{const i=document.createElement("style"),s=Z.litNonce;void 0!==s&&i.setAttribute("nonce",s),i.textContent=e.cssText,t.appendChild(i)}))})(e,this.constructor.elementStyles),e}connectedCallback(){var t;void 0===this.renderRoot&&(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostConnected)||void 0===e?void 0:e.call(t)}))}enableUpdating(t){}disconnectedCallback(){var t;null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostDisconnected)||void 0===e?void 0:e.call(t)}))}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e,i=ht){var s;const n=this.constructor._$Ep(t,i);if(void 0!==n&&!0===i.reflect){const r=(void 0!==(null===(s=i.converter)||void 0===s?void 0:s.toAttribute)?i.converter:ot).toAttribute(e,i.type);this._$El=t,null==r?this.removeAttribute(n):this.setAttribute(n,r),this._$El=null}}_$AK(t,e){var i;const s=this.constructor,n=s._$Ev.get(t);if(void 0!==n&&this._$El!==n){const t=s.getPropertyOptions(n),r="function"==typeof t.converter?{fromAttribute:t.converter}:void 0!==(null===(i=t.converter)||void 0===i?void 0:i.fromAttribute)?t.converter:ot;this._$El=n,this[n]=r.fromAttribute(e,t.type),this._$El=null}}requestUpdate(t,e,i){let s=!0;void 0!==t&&(((i=i||this.constructor.getPropertyOptions(t)).hasChanged||lt)(this[t],e)?(this._$AL.has(t)||this._$AL.set(t,e),!0===i.reflect&&this._$El!==t&&(void 0===this._$EC&&(this._$EC=new Map),this._$EC.set(t,i))):s=!1),!this.isUpdatePending&&s&&(this._$E_=this._$Ej())}async _$Ej(){this.isUpdatePending=!0;try{await this._$E_}catch(t){Promise.reject(t)}const t=this.scheduleUpdate();return null!=t&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var t;if(!this.isUpdatePending)return;this.hasUpdated,this._$Ei&&(this._$Ei.forEach(((t,e)=>this[e]=t)),this._$Ei=void 0);let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),null===(t=this._$ES)||void 0===t||t.forEach((t=>{var e;return null===(e=t.hostUpdate)||void 0===e?void 0:e.call(t)})),this.update(i)):this._$Ek()}catch(t){throw e=!1,this._$Ek(),t}e&&this._$AE(i)}willUpdate(t){}_$AE(t){var e;null===(e=this._$ES)||void 0===e||e.forEach((t=>{var e;return null===(e=t.hostUpdated)||void 0===e?void 0:e.call(t)})),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$Ek(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$E_}shouldUpdate(t){return!0}update(t){void 0!==this._$EC&&(this._$EC.forEach(((t,e)=>this._$EO(e,this[e],t))),this._$EC=void 0),this._$Ek()}updated(t){}firstUpdated(t){}};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var at;ct.finalized=!0,ct.elementProperties=new Map,ct.elementStyles=[],ct.shadowRootOptions={mode:"open"},null==rt||rt({ReactiveElement:ct}),(null!==(et=it.reactiveElementVersions)&&void 0!==et?et:it.reactiveElementVersions=[]).push("1.6.1");const dt=window,ut=dt.trustedTypes,pt=ut?ut.createPolicy("lit-html",{createHTML:t=>t}):void 0,gt="$lit$",ft=`lit$${(Math.random()+"").slice(9)}$`,vt="?"+ft,mt=`<${vt}>`,yt=document,$t=()=>yt.createComment(""),_t=t=>null===t||"object"!=typeof t&&"function"!=typeof t,At=Array.isArray,xt="[ \t\n\f\r]",St=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,bt=/-->/g,Mt=/>/g,Et=RegExp(`>|${xt}(?:([^\\s"'>=/]+)(${xt}*=${xt}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),Ct=/'/g,wt=/"/g,kt=/^(?:script|style|textarea|title)$/i,Lt=(t=>(e,...i)=>({_$litType$:t,strings:e,values:i}))(1),It=Symbol.for("lit-noChange"),Pt=Symbol.for("lit-nothing"),Nt=new WeakMap,Rt=yt.createTreeWalker(yt,129,null,!1),Ot=(t,e)=>{const i=t.length-1,s=[];let n,r=2===e?"<svg>":"",o=St;for(let e=0;e<i;e++){const i=t[e];let l,h,c=-1,a=0;for(;a<i.length&&(o.lastIndex=a,h=o.exec(i),null!==h);)a=o.lastIndex,o===St?"!--"===h[1]?o=bt:void 0!==h[1]?o=Mt:void 0!==h[2]?(kt.test(h[2])&&(n=RegExp("</"+h[2],"g")),o=Et):void 0!==h[3]&&(o=Et):o===Et?">"===h[0]?(o=null!=n?n:St,c=-1):void 0===h[1]?c=-2:(c=o.lastIndex-h[2].length,l=h[1],o=void 0===h[3]?Et:'"'===h[3]?wt:Ct):o===wt||o===Ct?o=Et:o===bt||o===Mt?o=St:(o=Et,n=void 0);const d=o===Et&&t[e+1].startsWith("/>")?" ":"";r+=o===St?i+mt:c>=0?(s.push(l),i.slice(0,c)+gt+i.slice(c)+ft+d):i+ft+(-2===c?(s.push(void 0),e):d)}const l=r+(t[i]||"<?>")+(2===e?"</svg>":"");if(!Array.isArray(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return[void 0!==pt?pt.createHTML(l):l,s]};class Ut{constructor({strings:t,_$litType$:e},i){let s;this.parts=[];let n=0,r=0;const o=t.length-1,l=this.parts,[h,c]=Ot(t,e);if(this.el=Ut.createElement(h,i),Rt.currentNode=this.el.content,2===e){const t=this.el.content,e=t.firstChild;e.remove(),t.append(...e.childNodes)}for(;null!==(s=Rt.nextNode())&&l.length<o;){if(1===s.nodeType){if(s.hasAttributes()){const t=[];for(const e of s.getAttributeNames())if(e.endsWith(gt)||e.startsWith(ft)){const i=c[r++];if(t.push(e),void 0!==i){const t=s.getAttribute(i.toLowerCase()+gt).split(ft),e=/([.?@])?(.*)/.exec(i);l.push({type:1,index:n,name:e[2],strings:t,ctor:"."===e[1]?Ft:"?"===e[1]?Bt:"@"===e[1]?Dt:zt})}else l.push({type:6,index:n})}for(const e of t)s.removeAttribute(e)}if(kt.test(s.tagName)){const t=s.textContent.split(ft),e=t.length-1;if(e>0){s.textContent=ut?ut.emptyScript:"";for(let i=0;i<e;i++)s.append(t[i],$t()),Rt.nextNode(),l.push({type:2,index:++n});s.append(t[e],$t())}}}else if(8===s.nodeType)if(s.data===vt)l.push({type:2,index:n});else{let t=-1;for(;-1!==(t=s.data.indexOf(ft,t+1));)l.push({type:7,index:n}),t+=ft.length-1}n++}}static createElement(t,e){const i=yt.createElement("template");return i.innerHTML=t,i}}function Ht(t,e,i=t,s){var n,r,o,l;if(e===It)return e;let h=void 0!==s?null===(n=i._$Co)||void 0===n?void 0:n[s]:i._$Cl;const c=_t(e)?void 0:e._$litDirective$;return(null==h?void 0:h.constructor)!==c&&(null===(r=null==h?void 0:h._$AO)||void 0===r||r.call(h,!1),void 0===c?h=void 0:(h=new c(t),h._$AT(t,i,s)),void 0!==s?(null!==(o=(l=i)._$Co)&&void 0!==o?o:l._$Co=[])[s]=h:i._$Cl=h),void 0!==h&&(e=Ht(t,h._$AS(t,e.values),h,s)),e}class Tt{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){var e;const{el:{content:i},parts:s}=this._$AD,n=(null!==(e=null==t?void 0:t.creationScope)&&void 0!==e?e:yt).importNode(i,!0);Rt.currentNode=n;let r=Rt.nextNode(),o=0,l=0,h=s[0];for(;void 0!==h;){if(o===h.index){let e;2===h.type?e=new jt(r,r.nextSibling,this,t):1===h.type?e=new h.ctor(r,h.name,h.strings,this,t):6===h.type&&(e=new Vt(r,this,t)),this._$AV.push(e),h=s[++l]}o!==(null==h?void 0:h.index)&&(r=Rt.nextNode(),o++)}return Rt.currentNode=yt,n}v(t){let e=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class jt{constructor(t,e,i,s){var n;this.type=2,this._$AH=Pt,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=s,this._$Cp=null===(n=null==s?void 0:s.isConnected)||void 0===n||n}get _$AU(){var t,e;return null!==(e=null===(t=this._$AM)||void 0===t?void 0:t._$AU)&&void 0!==e?e:this._$Cp}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return void 0!==e&&11===(null==t?void 0:t.nodeType)&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=Ht(this,t,e),_t(t)?t===Pt||null==t||""===t?(this._$AH!==Pt&&this._$AR(),this._$AH=Pt):t!==this._$AH&&t!==It&&this._(t):void 0!==t._$litType$?this.g(t):void 0!==t.nodeType?this.$(t):(t=>At(t)||"function"==typeof(null==t?void 0:t[Symbol.iterator]))(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==Pt&&_t(this._$AH)?this._$AA.nextSibling.data=t:this.$(yt.createTextNode(t)),this._$AH=t}g(t){var e;const{values:i,_$litType$:s}=t,n="number"==typeof s?this._$AC(t):(void 0===s.el&&(s.el=Ut.createElement(s.h,this.options)),s);if((null===(e=this._$AH)||void 0===e?void 0:e._$AD)===n)this._$AH.v(i);else{const t=new Tt(n,this),e=t.u(this.options);t.v(i),this.$(e),this._$AH=t}}_$AC(t){let e=Nt.get(t.strings);return void 0===e&&Nt.set(t.strings,e=new Ut(t)),e}T(t){At(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,s=0;for(const n of t)s===e.length?e.push(i=new jt(this.k($t()),this.k($t()),this,this.options)):i=e[s],i._$AI(n),s++;s<e.length&&(this._$AR(i&&i._$AB.nextSibling,s),e.length=s)}_$AR(t=this._$AA.nextSibling,e){var i;for(null===(i=this._$AP)||void 0===i||i.call(this,!1,!0,e);t&&t!==this._$AB;){const e=t.nextSibling;t.remove(),t=e}}setConnected(t){var e;void 0===this._$AM&&(this._$Cp=t,null===(e=this._$AP)||void 0===e||e.call(this,t))}}class zt{constructor(t,e,i,s,n){this.type=1,this._$AH=Pt,this._$AN=void 0,this.element=t,this.name=e,this._$AM=s,this.options=n,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=Pt}get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}_$AI(t,e=this,i,s){const n=this.strings;let r=!1;if(void 0===n)t=Ht(this,t,e,0),r=!_t(t)||t!==this._$AH&&t!==It,r&&(this._$AH=t);else{const s=t;let o,l;for(t=n[0],o=0;o<n.length-1;o++)l=Ht(this,s[i+o],e,o),l===It&&(l=this._$AH[o]),r||(r=!_t(l)||l!==this._$AH[o]),l===Pt?t=Pt:t!==Pt&&(t+=(null!=l?l:"")+n[o+1]),this._$AH[o]=l}r&&!s&&this.j(t)}j(t){t===Pt?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,null!=t?t:"")}}class Ft extends zt{constructor(){super(...arguments),this.type=3}j(t){this.element[this.name]=t===Pt?void 0:t}}const Wt=ut?ut.emptyScript:"";class Bt extends zt{constructor(){super(...arguments),this.type=4}j(t){t&&t!==Pt?this.element.setAttribute(this.name,Wt):this.element.removeAttribute(this.name)}}class Dt extends zt{constructor(t,e,i,s,n){super(t,e,i,s,n),this.type=5}_$AI(t,e=this){var i;if((t=null!==(i=Ht(this,t,e,0))&&void 0!==i?i:Pt)===It)return;const s=this._$AH,n=t===Pt&&s!==Pt||t.capture!==s.capture||t.once!==s.once||t.passive!==s.passive,r=t!==Pt&&(s===Pt||n);n&&this.element.removeEventListener(this.name,this,s),r&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e,i;"function"==typeof this._$AH?this._$AH.call(null!==(i=null===(e=this.options)||void 0===e?void 0:e.host)&&void 0!==i?i:this.element,t):this._$AH.handleEvent(t)}}class Vt{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){Ht(this,t)}}const qt=dt.litHtmlPolyfillSupport;null==qt||qt(Ut,jt),(null!==(at=dt.litHtmlVersions)&&void 0!==at?at:dt.litHtmlVersions=[]).push("2.7.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var Kt,Jt;class Zt extends ct{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var t,e;const i=super.createRenderRoot();return null!==(t=(e=this.renderOptions).renderBefore)&&void 0!==t||(e.renderBefore=i.firstChild),i}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=((t,e,i)=>{var s,n;const r=null!==(s=null==i?void 0:i.renderBefore)&&void 0!==s?s:e;let o=r._$litPart$;if(void 0===o){const t=null!==(n=null==i?void 0:i.renderBefore)&&void 0!==n?n:null;r._$litPart$=o=new jt(e.insertBefore($t(),t),t,void 0,null!=i?i:{})}return o._$AI(t),o})(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),null===(t=this._$Do)||void 0===t||t.setConnected(!1)}render(){return It}}Zt.finalized=!0,Zt._$litElement$=!0,null===(Kt=globalThis.litElementHydrateSupport)||void 0===Kt||Kt.call(globalThis,{LitElement:Zt});const Qt=globalThis.litElementPolyfillSupport;null==Qt||Qt({LitElement:Zt}),(null!==(Jt=globalThis.litElementVersions)&&void 0!==Jt?Jt:globalThis.litElementVersions=[]).push("3.3.2");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Gt=(t,e)=>"method"===e.kind&&e.descriptor&&!("value"in e.descriptor)?{...e,finisher(i){i.createProperty(e.key,t)}}:{kind:"field",key:Symbol(),placement:"own",descriptor:{},originalKey:e.key,initializer(){"function"==typeof e.initializer&&(this[e.key]=e.initializer.call(this))},finisher(i){i.createProperty(e.key,t)}};function Xt(t){return(e,i)=>void 0!==i?((t,e,i)=>{e.constructor.createProperty(i,t)})(t,e,i):Gt(t,e)
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */}var Yt;null===(Yt=window.HTMLSlotElement)||void 0===Yt||Yt.prototype.assignedElements;var te=((t,...e)=>{const i=1===t.length?t[0]:e.reduce(((e,i,s)=>e+(t=>{if(!0===t._$cssResult$)return t.cssText;if("number"==typeof t)return t;throw Error("Value passed to 'css' function must be a 'css' function result: "+t+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+t[s+1]),t[0]);return new Y(i,t,G)})`
  #root {
    display: inline-block;
  }

  #list-root {
    position: absolute;
    z-index: 1;
    border: 1px solid var(--theme-lightest, #c0e94f);
    box-shadow: 0 0 10px var(--theme-lightest50, #c0e94f80);
    border-radius: 3px;
    list-style: none;
    padding: 0px;
    margin: 0px;
    max-height: 220px;
    overflow-y: auto;
  }

  #list-root div {
    display: none;
    position: fixed;
    z-index: 1;
  }

  #list-root ul {
    padding: 0px;
    margin: 0px;
    border: 1px solid var(--theme-lightest, #c0e94f);
    box-shadow: 0 0 10px var(--theme-lightest50, #c0e94f80);
    border-radius: 3px;
    list-style: none;
    width: inherit;
    margin: 2px;
    max-height: 220px;
    overflow-y: auto;
  }

  #list-root li {
    padding: 0 10px;
    height: 32px;
    display: flex;
    align-items: center;
    color: #222;
  }

  #list-root ul li {
    padding: 0 10px;
    height: 32px;
    display: flex;
    align-items: center;
    color: #222;
    width: inherit;
  }

  #list-root li svg {
    margin-left: auto;
    fill: #222;
  }

  #list-root li:hover {
    background-color: var(--theme-base, #527a00);
    color: #fff;
    cursor: pointer;
  }

  #list-root li:hover div {
    display: inline-block;
  }

  #list-root li:hover svg {
    fill: #fff;
  }

  #list-root #label {
    font-size: 12px;
    height: 25px;
  }

  #list-root li#label:hover {
    font-size: 12px;
    height: 25px;
    background-color: #fff;
    color: #222;
    cursor: default;
  }

  li#search {
    background-color: #fff;
    color: #222;
    cursor: default;
    padding: 0px;
    border-bottom: 1px solid var(--theme-lightest, #c0e94f);
  }

  li#search input {
    border: none;
    outline: none;
    width: 100%;
    height: 100%;
    padding: 0 10px;
  }
`;let ee;let ie={includeScore:!1,shouldSort:!1,threshold:.6,location:0,distance:100,maxPatternLength:32,minMatchCharLength:1,keys:["label","items.label"]};class se extends Zt{constructor(){super(...arguments),this.onSelect=t=>{},this.label="",this.searchable=!1,this.searchPlaceholder="Search...",this.open=!1,this.event="click",this.items=[],this.searchedItems=null,this.onSearchkeyup=t=>{const e=t.target;var i,s;i=()=>{var t,i;if(!(null==e?void 0:e.value))return void(this.searchedItems=[...null!==(t=this.items)&&void 0!==t?t:[]]);const s=new J(this.items,ie);this.searchedItems=null===(i=s.search(null==e?void 0:e.value))||void 0===i?void 0:i.map((t=>t.item))},s=300,ee&&clearTimeout(ee),ee=setTimeout((()=>{i()}),s)},this.handleOutsideClick=t=>{"LIST-POPPER"!==t.target.nodeName&&(this.open=!1,this.searchedItems=null)}}firstUpdated(){this.addEventListener(this.event,this.handleSlotClick)}handleSlotClick(t){this.shadowRoot.querySelector("slot").assignedNodes().includes(t.target)&&(this.shadowRoot.querySelector("#list-root"),this.open=!0)}connectedCallback(){super.connectedCallback(),document.addEventListener("click",this.handleOutsideClick)}disconnectedCallback(){document.removeEventListener("click",this.handleOutsideClick),super.disconnectedCallback()}onLiHover(t){var e,i,s;const n=t.target,r=t.target.getBoundingClientRect();null===(e=n.querySelector("div"))||void 0===e||e.style.setProperty("top",`${r.top}px`),null===(i=n.querySelector("div"))||void 0===i||i.style.setProperty("left",`${r.right}px`),null===(s=n.querySelector("div"))||void 0===s||s.style.setProperty("width",`${r.width}px`)}renderSubItems(t){var e;return Lt`
      <div id="list-inner">
        <ul>
          ${null===(e=null==t?void 0:t.items)||void 0===e?void 0:e.map((e=>Lt`<li
                @click="${i=>{this.onSelect({parent:t.id,child:e.id}),i.stopPropagation(),this.open=!1,this.searchedItems=null}}"
              >
                ${e.label}
              </li>`))}
        </ul>
      </div>
    `}render(){return Lt`
      <div id="root">
        <slot></slot>
        ${this.open?Lt`
              <ul id="list-root">
                ${this.label?Lt`<li id="label">${this.label}</li>`:null}
                <li id="search">
                  <input
                    type="search"
                    id="search-input"
                    placeholder="${this.searchPlaceholder}"
                    @input="${this.onSearchkeyup}"
                  />
                </li>
                ${(null!==this.searchedItems?this.searchedItems:this.items).map((t=>{var e,i;return Lt`<li
                    @mouseover="${this.onLiHover}"
                    @click="${()=>{this.onSelect({parent:t.id}),this.open=!1,this.searchedItems=null}}"
                  >
                    ${null==t?void 0:t.label}
                    ${(null===(e=null==t?void 0:t.items)||void 0===e?void 0:e.length)?Lt`
                          <svg viewBox="0 0 5 9" width="5" height="9">
                            <g
                              fill-rule="evenodd"
                              stroke="none"
                              stroke-width="1"
                            >
                              <path
                                fill-rule="nonzero"
                                d="M0.244077682,1.5363961 C-0.0813592274,1.18492424 -0.0813592274,0.61507576 0.244077682,0.263603897 C0.569514592,-0.0878679656 1.09715207,-0.0878679656 1.42258898,0.263603897 L4.75592232,3.8636039 C5.08135923,4.21507576 5.08135923,4.78492424 4.75592232,5.1363961 L1.42258898,8.7363961 C1.09715207,9.08786797 0.569514592,9.08786797 0.244077682,8.7363961 C-0.0813592274,8.38492424 -0.0813592274,7.81507576 0.244077682,7.4636039 L2.98815536,4.5 L0.244077682,1.5363961 Z"
                              ></path>
                            </g>
                          </svg>
                        `:null}
                    ${(null===(i=null==t?void 0:t.items)||void 0===i?void 0:i.length)?this.renderSubItems(t):null}
                  </li>`}))}
              </ul>
            `:null}
      </div>
    `}}se.styles=te,t([Xt({type:Object})],se.prototype,"onSelect",void 0),t([Xt({type:String})],se.prototype,"label",void 0),t([Xt({type:Boolean})],se.prototype,"searchable",void 0),t([Xt({type:String})],se.prototype,"searchPlaceholder",void 0),t([Xt({type:Boolean})],se.prototype,"open",void 0),t([Xt({type:String})],se.prototype,"event",void 0),t([Xt({type:Array})],se.prototype,"items",void 0),t([Xt({type:Array})],se.prototype,"searchedItems",void 0),customElements.define("list-popper",se);export{se as ListPopper};