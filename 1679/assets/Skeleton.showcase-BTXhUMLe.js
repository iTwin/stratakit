import{r as w,j as n}from"./jsx-runtime-Dy-FSfdM.js";import{g as S,a as j,u as R,d as $,f as M,s as U,m as A,bX as h,bY as f,bZ as g,c as X}from"./Button-Ci637QRY.js";import{v as y}from"./mui-j3kSlbHG.js";import{a as v}from"./Stack-i0CjOa6O.js";import"./Icon-CYsEUTG9.js";import"./warning-NmQ4dpxK.js";import"./dismiss-CrrRS9Oo.js";import"./NavigationList-XHbpM8Ke.js";import"./~utils-C3Cs4cQt.js";import"./index-BMrhphxB.js";import"./disclosure-provider-RTTwrHzI.js";import"./disclosure-DmTjQRu8.js";import"./react-resizable-panels.browser-WreZbi7P.js";import"./script-CtCWXfEZ.js";import"./Popover-DpRSRM9f.js";import"./~navigation-Cxwitscg.js";import"./Divider-JV12JDcd.js";import"./settings-DXPTJBK8.js";import"./NavigationRail-CnakoqPu.js";import"./Container-CcF8FFLc.js";import"./useThemeProps-DqDrAUD9.js";import"./getThemeProps-D18ag-_b.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function W(t){return parseFloat(t)}function B(t){return S("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const D=t=>{const{classes:e,variant:a,animation:s,hasChildren:o,width:i,height:l}=t;return M({root:["root",a,s,o&&"withChildren",o&&!i&&"fitContent",o&&!l&&"heightAuto"]},B,e)},p=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,c=g`
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
      `:null,K=typeof c!="string"?f`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,L=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(A(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=W(t.shape.borderRadius),s=h(t,{animation:"none"}),o=h(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:K||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}},...o?[{props:{animation:"wave"},style:o}]:[]]}})),r=w.forwardRef(function(e,a){const s=R({props:e,name:"MuiSkeleton"}),{animation:o="pulse",className:i,component:l="span",height:d,style:x,variant:b="text",width:k,...m}=s,u={...s,animation:o,component:l,variant:b,hasChildren:!!m.children},C=D(u);return n.jsx(L,{as:l,ref:a,className:$(C.root,i),ownerState:u,...m,style:{width:k,height:d,...x}})}),N=()=>n.jsxs(n.Fragment,{children:[n.jsx(r,{}),n.jsx("div",{style:y,children:"Loading..."})]}),P=()=>n.jsxs(v,{spacing:2,direction:"column",children:[n.jsx(r,{variant:"circular",width:40,height:40}),n.jsx(r,{variant:"rectangular"}),n.jsx(r,{variant:"rounded"}),n.jsx(r,{variant:"text"}),n.jsx("div",{style:y,children:"Loading…"})]});function pt(){const t=X.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=n.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[n.jsx(N,{}),n.jsx(P,{})]}),t[0]=e):e=t[0],e}export{pt as default};
