import{S as b,r as g,y as w,c as x,o as f,b as m,j as y,g as $,u as C,n as k,h as E,v as A,a as O,G as z}from"./app-Ks5t5ISH.js";import"./dayjs.min-bNdczKjd.js";import"./id-BlSn3Ns1.js";import"./localeData-DV3-uoPk.js";import"./en-BDraWi_Y.js";import{_ as F}from"./_plugin-vue_export-helper-DlAUqK2U.js";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),L=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(o,t,s)=>s?s.toUpperCase():t.toLowerCase()),N=e=>{const o=L(e);return o.charAt(0).toUpperCase()+o.slice(1)},S=(...e)=>e.filter((o,t,s)=>!!o&&o.trim()!==""&&s.indexOf(o)===t).join(" ").trim(),j=e=>e==="";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=({name:e,iconNode:o,absoluteStrokeWidth:t,"absolute-stroke-width":s,strokeWidth:i,"stroke-width":d,size:r=h.width,color:n=h.stroke,...c},{slots:v})=>b("svg",{...h,...c,width:r,height:r,stroke:n,"stroke-width":j(t)||j(s)||t===!0||s===!0?Number(i||d||h["stroke-width"])*24/Number(r):i||d||h["stroke-width"],class:S("lucide",c.class,...e?[`lucide-${M(N(e))}-icon`,`lucide-${M(e)}`]:["lucide-icon"])},[...o.map(p=>b(...p)),...v.default?[v.default()]:[]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const I=(e,o)=>(t,{slots:s,attrs:i})=>b(U,{...i,...t,iconNode:o,name:e},s);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=I("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=I("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]),Z={class:"flex-grow flex flex-col min-w-0"},G=["placeholder"],H={key:0,class:"absolute right-3 bottom-1"},K={__name:"MilestoneItem",props:{milestone:Object},emits:["toggle","delete","save"],setup(e,{emit:o}){const t=e,s=o,i=(a,l)=>{const u=z(a);return u!==a?u:l},d=g(!1),r=g(!1),n=g(t.milestone.title||""),c=g(t.milestone.target_date||null);let v=null;const p=()=>{},T=()=>{clearTimeout(v),n.value.trim()!==""&&(s("save",{...t.milestone,title:n.value.trim(),target_date:c.value}),d.value=!1)},B=a=>{a.key==="Enter"&&a.target.blur(),a.key==="Escape"&&(d.value=!1,r.value=!1,n.value=t.milestone.title)},_=()=>{r.value=!0};w(()=>t.milestone.title,a=>{r.value||(n.value=a)}),w(()=>t.milestone.target_date,a=>{c.value=a});const V=()=>{s("toggle")};return(a,l)=>(f(),x("div",{class:k(["flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800",e.milestone.is_saving?"opacity-70":""])},[m("button",{onClick:V,class:k(["flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none",e.milestone.is_completed||e.milestone.completed?"bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/40":"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500"])},[e.milestone.is_completed||e.milestone.completed?(f(),$(C(D),{key:0,size:12,"stroke-width":"4"})):y("",!0)],2),m("div",Z,[E(m("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>n.value=u),onInput:p,onKeydown:B,onBlur:l[1]||(l[1]=()=>{r.value.value=!1,T()}),onFocus:_,placeholder:i("milestone_placeholder","Identify next step..."),class:k(["w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all font-bold",e.milestone.is_completed||e.milestone.completed?"text-slate-400 dark:text-slate-500 line-through font-medium":"text-slate-700 dark:text-slate-200 font-black"])},null,42,G),[[A,n.value]])]),m("button",{onClick:l[2]||(l[2]=u=>s("delete")),class:"opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 focus:outline-none shrink-0"},[O(C(P),{size:14})]),e.milestone.is_saving?(f(),x("div",H,[...l[3]||(l[3]=[m("div",{class:"w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"},null,-1)])])):y("",!0)],2))}},q=F(K,[["__scopeId","data-v-a0f4a8b2"]]),ee=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));export{q as M,P as T,ee as a,I as c};
