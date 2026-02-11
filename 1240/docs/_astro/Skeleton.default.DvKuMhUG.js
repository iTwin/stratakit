import{j as s}from"./jsx-runtime.D_zvdyIk.js";import{r as C}from"./index.DIfZGIpv.js";import{N as b,O as k,P as w,M as x,Q as S,S as R,V as $,a2 as c,a3 as m}from"./ExamplePreview.CTvTvUIj.js";import{v as M}from"./visuallyHidden.Dan1xhjv.js";import"./preload-helper.CWPvEUvb.js";import"./index.XeJbqeyU.js";import"./styles.internal.BwFdDu8v.js";function U(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function j(t){return parseFloat(t)}function A(t){return b("MuiSkeleton",t)}k("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:e,variant:a,animation:n,hasChildren:i,width:r,height:o}=t;return S({root:["root",a,n,i&&"withChildren",i&&!r&&"fitContent",i&&!o&&"heightAuto"]},A,e)},l=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,p=c`
  0% {
    transform: translateX(-100%);
  }

  50% {
    /* +0.5s of delay between each loop */
    transform: translateX(100%);
  }

  100% {
    transform: translateX(100%);
  }
`,N=typeof l!="string"?m`
        animation: ${l} 2s ease-in-out 0.5s infinite;
      `:null,B=typeof p!="string"?m`
        &::after {
          animation: ${p} 2s linear 0.5s infinite;
        }
      `:null,E=R("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=U(t.shape.borderRadius)||"px",a=j(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:N||{animation:`${l} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:B||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}}]}})),F=C.forwardRef(function(e,a){const n=w({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:r,component:o="span",height:d,style:f,variant:g="text",width:y,...h}=n,u={...n,animation:i,component:o,variant:g,hasChildren:!!h.children},v=X(u);return s.jsx(E,{as:o,ref:a,className:x(v.root,r),ownerState:u,...h,style:{width:y,height:d,...f}})}),H=()=>s.jsxs(s.Fragment,{children:[s.jsx(F,{}),s.jsx("div",{style:M,children:"Loading..."})]});export{H as default};
