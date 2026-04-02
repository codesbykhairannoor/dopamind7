import{S as b,r as p,y as w,c as x,o as k,b as m,j as y,g as V,u as C,n as f,h as $,v as E,a as A,G as O}from"./app-Be9gqO7Q.js";import"./dayjs.min-DYL0wsg9.js";import"./id-CXSa2p2z.js";import"./localeData-BYsxkPHO.js";import"./en-BykbEDgu.js";import{_ as S}from"./_plugin-vue_export-helper-DlAUqK2U.js";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),z=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(s,t,o)=>o?o.toUpperCase():t.toLowerCase()),L=e=>{const s=z(e);return s.charAt(0).toUpperCase()+s.slice(1)},N=(...e)=>e.filter((s,t,o)=>!!s&&s.trim()!==""&&o.indexOf(s)===t).join(" ").trim(),T=e=>e==="";/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const U=({name:e,iconNode:s,absoluteStrokeWidth:t,"absolute-stroke-width":o,strokeWidth:n,"stroke-width":d,size:a=h.width,color:c=h.stroke,...i},{slots:g})=>b("svg",{...h,...i,width:a,height:a,stroke:c,"stroke-width":T(t)||T(o)||t===!0||o===!0?Number(n||d||h["stroke-width"])*24/Number(a):n||d||h["stroke-width"],class:N("lucide",i.class,...e?[`lucide-${M(L(e))}-icon`,`lucide-${M(e)}`]:["lucide-icon"])},[...s.map(v=>b(...v)),...g.default?[g.default()]:[]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=(e,s)=>(t,{slots:o,attrs:n})=>b(U,{...n,...t,iconNode:s,name:e},o);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=_("check",[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]]);/**
 * @license lucide-vue-next v0.562.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const P=_("trash-2",[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]]),Z={class:"flex-grow flex flex-col min-w-0"},G=["placeholder"],H={key:0,class:"absolute right-3 bottom-1"},K={__name:"MilestoneItem",props:{milestone:Object},emits:["toggle","delete","save"],setup(e,{emit:s}){const t=e,o=s,n=(r,l)=>{const u=O(r);return u!==r?u:l},d=p(t.milestone.is_new||!1),a=p(t.milestone.title||""),c=p(t.milestone.target_date||null);let i=null;const g=()=>{clearTimeout(i),i=setTimeout(()=>{a.value.trim()!==""&&o("save",{...t.milestone,title:a.value.trim(),target_date:c.value})},500)},v=()=>{g()},j=()=>{clearTimeout(i),a.value.trim()!==""&&(o("save",{...t.milestone,title:a.value.trim(),target_date:c.value}),d.value=!1)},I=r=>{r.key==="Enter"&&r.target.blur(),r.key==="Escape"&&(d.value=!1)};w(()=>t.milestone.title,r=>{a.value=r}),w(()=>t.milestone.target_date,r=>{c.value=r});const B=()=>{o("toggle")};return(r,l)=>(k(),x("div",{class:f(["flex items-center group/ms gap-3 py-1.5 px-3 bg-transparent hover:bg-slate-50/50 dark:hover:bg-white/5 rounded-2xl transition-all duration-300 relative border border-transparent hover:border-slate-100 dark:hover:border-slate-800",e.milestone.is_saving?"opacity-70":""])},[m("button",{onClick:B,class:f(["flex-shrink-0 w-[18px] h-[18px] rounded-lg border-2 flex items-center justify-center transition-all duration-300 focus:outline-none",e.milestone.is_completed||e.milestone.completed?"bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/40":"border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-indigo-400 dark:hover:border-indigo-500"])},[e.milestone.is_completed||e.milestone.completed?(k(),V(C(D),{key:0,size:12,"stroke-width":"4"})):y("",!0)],2),m("div",Z,[$(m("input",{"onUpdate:modelValue":l[0]||(l[0]=u=>a.value=u),onInput:v,onKeydown:I,onBlur:j,placeholder:n("milestone_placeholder","Identify next step..."),class:f(["w-full bg-transparent border-none focus:ring-0 p-0 text-sm placeholder:text-slate-300 dark:placeholder:text-slate-600 transition-all",e.milestone.is_completed||e.milestone.completed?"text-slate-400 dark:text-slate-500 line-through font-medium":"text-slate-700 dark:text-slate-200 font-black"])},null,42,G),[[E,a.value]])]),m("button",{onClick:l[1]||(l[1]=u=>o("delete")),class:"opacity-0 group-hover/ms:opacity-100 p-1.5 text-slate-300 dark:text-slate-600 hover:text-rose-500 dark:hover:text-rose-400 transition-all rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 focus:outline-none shrink-0"},[A(C(P),{size:14})]),e.milestone.is_saving?(k(),x("div",H,[...l[2]||(l[2]=[m("div",{class:"w-2 h-2 border-2 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"},null,-1)])])):y("",!0)],2))}},q=S(K,[["__scopeId","data-v-055c6bfa"]]),W=Object.freeze(Object.defineProperty({__proto__:null,default:q},Symbol.toStringTag,{value:"Module"}));export{q as M,P as T,W as a,_ as c};
