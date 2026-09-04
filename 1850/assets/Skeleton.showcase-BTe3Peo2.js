import{r as b,j as n}from"./index-DWXEng7z.js";import{g as w,j,n as R,a as $,e as M,s as U,p as A,de as h,df as f,dg as g,c as E}from"./~utils-CiE5Hpep.js";import{v as y,S as v}from"./mui-A2B-h3wd.js";import"./Icon-BRK7iZIh.js";import"./warning-7Va4arge.js";import"./dismiss-8YCe8hGJ.js";import"./NavigationList-D9tp5LXe.js";import"./disclosure-provider-Dhnv_VbP.js";import"./disclosure-BA2ACMDt.js";import"./react-resizable-panels.browser-BriQCNtN.js";import"./script-CUjLPxMj.js";import"./~navigation-Dp-giyAo.js";import"./Divider-C0h3lbg0.js";import"./settings-DPLL56bl.js";import"./NavigationRail-DCzGByGo.js";import"./Container-DuMkRIVe.js";import"./getThemeProps-D3RacFLO.js";function X(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function W(t){return parseFloat(t)}function B(t){return w("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const D=t=>{const{classes:e,variant:a,animation:s,hasChildren:o,width:i,height:l}=t;return M({root:["root",a,s,o&&"withChildren",o&&!i&&"fitContent",o&&!l&&"heightAuto"]},B,e)},p=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,d=g`
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
`,F=typeof p!="string"?f`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,K=typeof d!="string"?f`
        &::after {
          animation: ${d} 2s linear 0.5s infinite;
        }
      `:null,L=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(A(({theme:t})=>{const e=X(t.shape.borderRadius)||"px",a=W(t.shape.borderRadius),s=h(t,{animation:"none"}),o=h(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:K||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}},...o?[{props:{animation:"wave"},style:o}]:[]]}})),r=b.forwardRef(function(e,a){const s=R({props:e,name:"MuiSkeleton"}),{animation:o="pulse",className:i,component:l="span",height:c,style:x,variant:k="text",width:C,...u}=s,m={...s,animation:o,component:l,variant:k,hasChildren:!!u.children},S=D(m);return n.jsx(L,{as:l,ref:a,className:$(S.root,i),ownerState:m,...u,style:{width:C,height:c,...x}})}),N=()=>n.jsxs(n.Fragment,{children:[n.jsx(r,{}),n.jsx("div",{style:y,children:"Loading..."})]}),P=()=>n.jsxs(v,{spacing:2,direction:"column",children:[n.jsx(r,{variant:"circular",width:40,height:40}),n.jsx(r,{variant:"rectangular"}),n.jsx(r,{variant:"rounded"}),n.jsx(r,{variant:"text"}),n.jsx("div",{style:y,children:"Loading…"})]});function it(){const t=E.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=n.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[n.jsx(N,{}),n.jsx(P,{})]}),t[0]=e):e=t[0],e}export{it as default};
