import{S as b,r as g,y,c as C,o as f,b as m,j as M,g as E,u as I,n as k,h as O,v as z,a as F,G as L}from"./app-BQMAWEL5.js";import"./dayjs.min-BoB8m_El.js";import"./id-NTn_FIds.js";import"./localeData-z2OsnBVD.js";import"./en-DG_G7OEg.js";import{_ as N}from"./_plugin-vue_export-helper-DlAUqK2U.js";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const j=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),S=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,o,a)=>a?a.toUpperCase():o.toLowerCase()),U=e=>{const s=S(e);return s.charAt(0).toUpperCase()+s.slice(1)},D=(...e)=>e.filter((s,o,a)=>!!s&&s.trim()!==""&&a.indexOf(s)===o).join(" ").trim(),T=e=>e==="";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=({name:e,iconNode:s,absoluteStrokeWidth:o,"absolute-stroke-width":a,strokeWidth:i,"stroke-width":d,size:r=h.width,color:n=h.stroke,...c},{slots:v})=>b("svg",{...h,...c,width:r,height:r,stroke:n,"stroke-width":T(o)||T(a)||o===!0||a===!0?Number(i||d||h["stroke-width"])*24/Number(r):i||d||h["stroke-width"],class:D("lucide",c.class,...e?[`lucide-${j(U(e))}-icon`,`lucide-${j(e)}`]:["lucide-icon"])},[...s.map(p=>b(...p)),...v.default?[v.default()]:[]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=(e,s)=>(o,{slots:a,attrs:i})=>b(P,{...i,...o,iconNode:s,name:e},a);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=B("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=B("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]),H={class:"flex-grow flex flex-col min-w-0"},K=["placeholder"],q={key:0,class:"absolute right-3 bottom-1"},J={__name:"MilestoneItem",props:{milestone:Object},emits:["toggle","delete","save"],setup(e,{emit:s}){var w,x;const o=e,a=s,i=(t,l)=>{const u=L(t);return u!==t?u:l},d=g(!1),r=g(!1),n=g(((w=o.milestone)==null?void 0:w.title)||""),c=g(((x=o.milestone)==null?void 0:x.target_date)||null);let v=null;const p=()=>{},_=()=>{clearTimeout(v),n.value.trim()!==""&&(a("save",{...o.milestone,title:n.value.trim(),target_date:c.value}),d.value=!1)},V=t=>{var l;t.key==="Enter"&&t.target.blur(),t.key==="Escape"&&(d.value=!1,r.value=!1,n.value=((l=o.milestone)==null?void 0:l.title)||"")},$=()=>{r.value=!0};y(()=>{var t;return(t=o.milestone)==null?void 0:t.title},t=>{r.value||(n.value=t||"")}),y(()=>{var t;return(t=o.milestone)==null?void 0:t.target_date},t=>{c.value=t||null});const A=()=>{a("toggle")};return(t,l)=>(f(),C("div",{class:k(["flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800",e.milestone.is_saving?"opacity-70":""])},[m("button",{onClick:A,class:k(["flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none",e.milestone.is_completed||e.milestone.completed?"bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/40":"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500"])},[e.milestone.is_completed||e.milestone.completed?(f(),E(I(Z),{key:0,size:12,"stroke-width":"4"})):M("",!0)],2),m("div",H,[O(m("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>n.value=u),onInput:p,onKeydown:V,onBlur:l[1]||(l[1]=()=>{r.value.value=!1,_()}),onFocus:$,placeholder:i("milestone_placeholder","Identify next step..."),class:k(["w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all font-bold",e.milestone.is_completed||e.milestone.completed?"text-slate-400 dark:text-slate-500 line-through font-medium":"text-slate-700 dark:text-slate-200 font-black"])},null,42,K),[[z,n.value]])]),m("button",{onClick:l[2]||(l[2]=u=>a("delete")),class:"opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 focus:outline-none shrink-0"},[F(I(G),{size:14})]),e.milestone.is_saving?(f(),C("div",q,[...l[3]||(l[3]=[m("div",{class:"w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"},null,-1)])])):M("",!0)],2))}},Q=N(J,[["__scopeId","data-v-8562b91b"]]),oe=Object.freeze(Object.defineProperty({__proto__:null,default:Q},Symbol.toStringTag,{value:"Module"}));export{Q as M,G as T,oe as a,B as c};
