import{b as C,t as i}from"./index-qbWDqXP-.js";import{y as w,D as S,E as j,p as R,x as $,H as U,J as M,cP as u,cQ as f,c as A}from"./~utils-Tfvmmh0L.js";import{v as g,S as v}from"./mui-Nt7dm3PU.js";import"./AYY52AFU-CcezsYGZ.js";import"./ZJG6VNPS-DiokDcn0.js";import"./ZCYMVQGT-BoPyWjxm.js";import"./IKWLDXMV-DBNV7cqU.js";import"./6S37ITHJ-1_d4trvZ.js";import"./Portal-DJRu2Xva.js";import"./warning-yjwTBHJf.js";import"./dismiss-Cqp9Qen-.js";import"./NavigationList-BpDr9sqI.js";import"./disclosure-provider-CZnSU7A5.js";import"./Y432LOQZ-RxnPp5iG.js";import"./~navigation-eb4H61D6.js";import"./Divider-1dOc9RTZ.js";import"./settings-Bi0qpjr7.js";import"./NavigationRail-CBhwWNbf.js";import"./script-StcfgsDz.js";import"./Container-Db8NXY9R.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function D(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:e,variant:a,animation:n,hasChildren:r,width:l,height:s}=t;return $({root:["root",a,n,r&&"withChildren",r&&!l&&"fitContent",r&&!s&&"heightAuto"]},D,e)},p=f`
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
`,F=typeof p!="string"?u`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,H=typeof c!="string"?u`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(M(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:F||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:H||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),o=C.forwardRef(function(e,a){const n=j({props:e,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:s="span",height:d,style:x,variant:y="text",width:k,...m}=n,h={...n,animation:r,component:s,variant:y,hasChildren:!!m.children},b=B(h);return i.jsx(K,{as:s,ref:a,className:R(b.root,l),ownerState:h,...m,style:{width:k,height:d,...x}})}),L=()=>i.jsxs(i.Fragment,{children:[i.jsx(o,{}),i.jsx("div",{style:g,children:"Loading..."})]}),N=()=>i.jsxs(v,{spacing:1,direction:"column",children:[i.jsx(o,{variant:"circular",width:40,height:40}),i.jsx(o,{variant:"rectangular"}),i.jsx(o,{variant:"rounded"}),i.jsx(o,{variant:"text"}),i.jsx("div",{style:g,children:"Loading…"})]});function ot(){const t=A.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=i.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[i.jsx(L,{}),i.jsx(N,{})]}),t[0]=e):e=t[0],e}export{ot as default};
