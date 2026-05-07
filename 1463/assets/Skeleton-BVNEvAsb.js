import{b as C,t as i}from"./index-DA-OOE2Q.js";import{J as S,M as w,N as j,x as R,H as $,Q as M,S as U,cS as u,cT as f,h as A}from"./~utils-B9rZZeOS.js";import{v as g,S as v}from"./mui-OyjHhWTa.js";import"./AYY52AFU-Dp3Wsq1g.js";import"./ZJG6VNPS-HeUuqe4y.js";import"./ZCYMVQGT-CZbYWLRw.js";import"./IKWLDXMV-DpjwUS-I.js";import"./6S37ITHJ-CNUxtv2m.js";import"./IconButton-CBnfeskQ.js";import"./warning-Bm0R_6Tm.js";import"./dismiss-BYs_mczJ.js";import"./NavigationList-B2-xokp_.js";import"./disclosure-provider-cDZn2WOh.js";import"./Y432LOQZ-B9mx-dGQ.js";import"./~navigation-DsVTEyC6.js";import"./Divider-BEx4vURw.js";import"./settings-7N0oKFo-.js";import"./NavigationRail-CFv78U4l.js";import"./script-C0VAmPB8.js";import"./Container-COrqwq7q.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function N(t){return S("MuiSkeleton",t)}w("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const T=t=>{const{classes:e,variant:a,animation:n,hasChildren:r,width:l,height:s}=t;return $({root:["root",a,n,r&&"withChildren",r&&!l&&"fitContent",r&&!s&&"heightAuto"]},N,e)},p=f`
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
`,B=typeof p!="string"?u`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,D=typeof c!="string"?u`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,F=M("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(U(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:B||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:D||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),o=C.forwardRef(function(e,a){const n=j({props:e,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:s="span",height:d,style:x,variant:y="text",width:k,...h}=n,m={...n,animation:r,component:s,variant:y,hasChildren:!!h.children},b=T(m);return i.jsx(F,{as:s,ref:a,className:R(b.root,l),ownerState:m,...h,style:{width:k,height:d,...x}})}),H=()=>i.jsxs(i.Fragment,{children:[i.jsx(o,{}),i.jsx("div",{style:g,children:"Loading..."})]}),K=()=>i.jsxs(v,{spacing:1,direction:"column",children:[i.jsx(o,{variant:"circular",width:40,height:40}),i.jsx(o,{variant:"rectangular"}),i.jsx(o,{variant:"rounded"}),i.jsx(o,{variant:"text"}),i.jsx("div",{style:g,children:"Loading…"})]});function ot(){const t=A.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=i.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[i.jsx(H,{}),i.jsx(K,{})]}),t[0]=e):e=t[0],e}export{ot as default};
