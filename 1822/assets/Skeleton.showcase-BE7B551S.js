import{r as b,j as n}from"./index-Dm6ZCKOC.js";import{g as w,j as S,n as j,a as R,e as $,s as U,p as M,d2 as m,d3 as f,c as A}from"./~utils-Xh2CAOYI.js";import{v as g,S as v}from"./mui-BDfz1W9X.js";import"./Icon-B3ElDUvY.js";import"./warning-DG0gRSCD.js";import"./dismiss-CRFEmSjP.js";import"./NavigationList-DU0jDVFm.js";import"./disclosure-provider-IlBpKdq8.js";import"./disclosure-DyZHN3IY.js";import"./react-resizable-panels.browser-_dvkcYa-.js";import"./script-OKZvNgVB.js";import"./~navigation-Dso67qBs.js";import"./Divider-f-5hZUmR.js";import"./settings-6p8cSFuc.js";import"./NavigationRail--mYvUdwh.js";import"./Container-DZuuLftm.js";import"./getThemeProps-CGvXyVEk.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function B(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const D=t=>{const{classes:e,variant:a,animation:i,hasChildren:r,width:l,height:o}=t;return $({root:["root",a,i,r&&"withChildren",r&&!l&&"fitContent",r&&!o&&"heightAuto"]},B,e)},p=f`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,c=f`
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
`,F=typeof p!="string"?m`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,K=typeof c!="string"?m`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,L=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(M(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:K||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),s=b.forwardRef(function(e,a){const i=j({props:e,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:o="span",height:d,style:x,variant:y="text",width:k,...h}=i,u={...i,animation:r,component:o,variant:y,hasChildren:!!h.children},C=D(u);return n.jsx(L,{as:o,ref:a,className:R(C.root,l),ownerState:u,...h,style:{width:k,height:d,...x}})}),N=()=>n.jsxs(n.Fragment,{children:[n.jsx(s,{}),n.jsx("div",{style:g,children:"Loading..."})]}),T=()=>n.jsxs(v,{spacing:2,direction:"column",children:[n.jsx(s,{variant:"circular",width:40,height:40}),n.jsx(s,{variant:"rectangular"}),n.jsx(s,{variant:"rounded"}),n.jsx(s,{variant:"text"}),n.jsx("div",{style:g,children:"Loading…"})]});function nt(){const t=A.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=n.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[n.jsx(N,{}),n.jsx(T,{})]}),t[0]=e):e=t[0],e}export{nt as default};
