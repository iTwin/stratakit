import{r as S,j as a}from"./index-DWXEng7z.js";import{g as w,b as j,d as R,h as $,j as M,s as U,m as A,dn as h,dp as f,dq as g,c as E}from"./~settings-B0PoBFCB.js";import{v as y}from"./mui-BLaUUZqc.js";import{S as v}from"./Stack-BqtioSQA.js";import"./Icon-SM8EPSsV.js";import"./warning-mt_2XQmB.js";import"./dismiss-BLlnMXQw.js";import"./NavigationList-BPlAuGVb.js";import"./disclosure-provider-DKhjnfsA.js";import"./disclosure-shpQTc7r.js";import"./react-resizable-panels.browser-BriQCNtN.js";import"./script-CHrUQCuf.js";import"./Popover-xjnVSauc.js";import"./~navigation-CVK3Ze-f.js";import"./Divider-CrXwJtXc.js";import"./tokens-BaTaJfBm.js";import"./settings-ChXmDMyO.js";import"./NavigationRail-B-w5NGpC.js";import"./Container-DZ8iOaNe.js";import"./useThemeProps-C8UdfTn9.js";import"./getThemeProps-JN-SrFkl.js";function X(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function W(t){return parseFloat(t)}function B(t){return w("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const D=t=>{const{classes:e,variant:n,animation:s,hasChildren:o,width:i,height:l}=t;return M({root:["root",n,s,o&&"withChildren",o&&!i&&"fitContent",o&&!l&&"heightAuto"]},B,e)},p=g`
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
      `:null,L=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:n}=t;return[e.root,e[n.variant],n.animation!==!1&&e[n.animation],n.hasChildren&&e.withChildren,n.hasChildren&&!n.width&&e.fitContent,n.hasChildren&&!n.height&&e.heightAuto]}})(A(({theme:t})=>{const e=X(t.shape.borderRadius)||"px",n=W(t.shape.borderRadius),s=h(t,{animation:"none"}),o=h(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${n}${e}/${Math.round(n/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:K||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}},...o?[{props:{animation:"wave"},style:o}]:[]]}})),r=S.forwardRef(function(e,n){const s=R({props:e,name:"MuiSkeleton"}),{animation:o="pulse",className:i,component:l="span",height:c,style:x,variant:k="text",width:b,...m}=s,u={...s,animation:o,component:l,variant:k,hasChildren:!!m.children},C=D(u);return a.jsx(L,{as:l,ref:n,className:$(C.root,i),ownerState:u,...m,style:{width:b,height:c,...x}})}),N=()=>a.jsxs(a.Fragment,{children:[a.jsx(r,{}),a.jsx("div",{style:y,children:"Loading..."})]}),P=()=>a.jsxs(v,{spacing:2,direction:"column",children:[a.jsx(r,{variant:"circular",width:40,height:40}),a.jsx(r,{variant:"rectangular"}),a.jsx(r,{variant:"rounded"}),a.jsx(r,{variant:"text"}),a.jsx("div",{style:y,children:"Loading…"})]});function lt(){const t=E.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=a.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[a.jsx(N,{}),a.jsx(P,{})]}),t[0]=e):e=t[0],e}export{lt as default};
