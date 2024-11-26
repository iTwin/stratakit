import{r as i,j as e}from"./jsx-runtime-BMrMXMSG.js";import{R as d}from"./Root-DVZnXxIM.js";import{u as f,d as y,e as x,O as S}from"./index-CZ-7Jx4q.js";import{f as g,_ as j,M as w,L as k,S as M}from"./components-PfTAZp72.js";import"./index-BlA7Mg33.js";/**
 * @remix-run/react v2.14.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */let a="positions";function v({getKey:t,...l}){let{isSpaMode:c}=g(),o=f(),u=y();x({getKey:t,storageKey:a});let m=i.useMemo(()=>{if(!t)return null;let s=t(o,u);return s!==o.key?s:null},[]);if(c)return null;let p=((s,h)=>{if(!window.history.state||!window.history.state.key){let r=Math.random().toString(32).slice(2);window.history.replaceState({key:r},"")}try{let n=JSON.parse(sessionStorage.getItem(s)||"{}")[h||window.history.state.key];typeof n=="number"&&window.scrollTo(0,n)}catch(r){console.error(r),sessionStorage.removeItem(s)}}).toString();return i.createElement("script",j({},l,{suppressHydrationWarning:!0,dangerouslySetInnerHTML:{__html:`(${p})(${JSON.stringify(a)}, ${JSON.stringify(m)})`}}))}const L="/139/assets/root-fEDipKBc.css",H=()=>[{rel:"icon",href:"/favicon.svg",sizes:"any",type:"image/svg+xml"},{rel:"preconnect",href:"https://rsms.me/"},{rel:"stylesheet",href:"https://rsms.me/inter/inter.css"},{rel:"stylesheet",href:L}];function I({children:t}){return e.jsxs("html",{lang:"en",children:[e.jsxs("head",{children:[e.jsx("meta",{charSet:"utf-8"}),e.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),e.jsx(w,{}),e.jsx(k,{})]}),e.jsxs("body",{children:[t,e.jsx(v,{}),e.jsx(M,{})]})]})}function J(){return e.jsx(d,{children:e.jsx(S,{})})}function N(){return e.jsx("p",{children:"Loading…"})}export{N as HydrateFallback,I as Layout,J as default,H as links};
