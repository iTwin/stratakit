import{b as C,t as n}from"./index-qbWDqXP-.js";import{y as w,D as S,E as j,p as R,x as $,H as U,J as M,cP as m,cQ as f,c as A}from"./~utils-DOIzCqC9.js";import{v as g,S as v}from"./mui-BU-50P18.js";import"./Portal-BD2at8QJ.js";import"./warning-yjwTBHJf.js";import"./dismiss-Cqp9Qen-.js";import"./NavigationList-DygAApVN.js";import"./disclosure-provider-uUhiM4o-.js";import"./Y432LOQZ-BlA1PToY.js";import"./script-B0z9vEIm.js";import"./~navigation-DEp2JFAI.js";import"./Divider-DH9vMVm-.js";import"./settings-Bi0qpjr7.js";import"./NavigationRail-BikyD3u7.js";import"./Container-Bu4n40Ox.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function D(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:e,variant:a,animation:i,hasChildren:s,width:l,height:o}=t;return $({root:["root",a,i,s&&"withChildren",s&&!l&&"fitContent",s&&!o&&"heightAuto"]},D,e)},p=f`
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
      `:null,H=typeof c!="string"?m`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(M(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:H||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),r=C.forwardRef(function(e,a){const i=j({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:l,component:o="span",height:d,style:x,variant:y="text",width:k,...h}=i,u={...i,animation:s,component:o,variant:y,hasChildren:!!h.children},b=B(u);return n.jsx(K,{as:o,ref:a,className:R(b.root,l),ownerState:u,...h,style:{width:k,height:d,...x}})}),L=()=>n.jsxs(n.Fragment,{children:[n.jsx(r,{}),n.jsx("div",{style:g,children:"Loading..."})]}),N=()=>n.jsxs(v,{spacing:1,direction:"column",children:[n.jsx(r,{variant:"circular",width:40,height:40}),n.jsx(r,{variant:"rectangular"}),n.jsx(r,{variant:"rounded"}),n.jsx(r,{variant:"text"}),n.jsx("div",{style:g,children:"Loading…"})]});function et(){const t=A.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=n.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[n.jsx(L,{}),n.jsx(N,{})]}),t[0]=e):e=t[0],e}export{et as default};
