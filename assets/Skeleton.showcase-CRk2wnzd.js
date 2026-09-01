import{r as w,j as a}from"./index-DQGqNuQi.js";import{g as S,i as j,l as R,c as M,b as $,s as U,o as A,de as m,df as f,dg as g}from"./~utils-BlvEJy8I.js";import{v as y,S as v}from"./mui-BdRMYvgP.js";import"./Icon-BGlkR6JU.js";import"./warning-BL6KYh3H.js";import"./dismiss-DPl2yXjX.js";import"./NavigationList-D0u4NTHC.js";import"./disclosure-provider-C47Co3wX.js";import"./disclosure-C07Acobg.js";import"./react-resizable-panels.browser-v3xDxt7w.js";import"./script-7sOQJas5.js";import"./~navigation-D3A4NHar.js";import"./Divider-BwcPKArx.js";import"./settings-gC6OtFsu.js";import"./NavigationRail-locigmMC.js";import"./Container-JaB5f-xc.js";import"./getThemeProps-LWYaUZM-.js";function X(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function E(t){return parseFloat(t)}function W(t){return S("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:n,variant:e,animation:s,hasChildren:o,width:i,height:l}=t;return $({root:["root",e,s,o&&"withChildren",o&&!i&&"fitContent",o&&!l&&"heightAuto"]},W,n)},p=g`
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
`,D=typeof p!="string"?f`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,F=typeof d!="string"?f`
        &::after {
          animation: ${d} 2s linear 0.5s infinite;
        }
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:e}=t;return[n.root,n[e.variant],e.animation!==!1&&n[e.animation],e.hasChildren&&n.withChildren,e.hasChildren&&!e.width&&n.fitContent,e.hasChildren&&!e.height&&n.heightAuto]}})(A(({theme:t})=>{const n=X(t.shape.borderRadius)||"px",e=E(t.shape.borderRadius),s=m(t,{animation:"none"}),o=m(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${e}${n}/${Math.round(e/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:D||{animation:`${p} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:F||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}},...o?[{props:{animation:"wave"},style:o}]:[]]}})),r=w.forwardRef(function(n,e){const s=R({props:n,name:"MuiSkeleton"}),{animation:o="pulse",className:i,component:l="span",height:c,style:x,variant:k="text",width:C,...u}=s,h={...s,animation:o,component:l,variant:k,hasChildren:!!u.children},b=B(h);return a.jsx(K,{as:l,ref:e,className:M(b.root,i),ownerState:h,...u,style:{width:C,height:c,...x}})}),L=()=>a.jsxs(a.Fragment,{children:[a.jsx(r,{}),a.jsx("div",{style:y,children:"Loading..."})]}),N=()=>a.jsxs(v,{spacing:2,direction:"column",children:[a.jsx(r,{variant:"circular",width:40,height:40}),a.jsx(r,{variant:"rectangular"}),a.jsx(r,{variant:"rounded"}),a.jsx(r,{variant:"text"}),a.jsx("div",{style:y,children:"Loading…"})]});function nt(){return a.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[a.jsx(L,{}),a.jsx(N,{})]})}export{nt as default};
