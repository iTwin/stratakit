import{b as C,t as n}from"./index-qbWDqXP-.js";import{w,z as S,A as j,n as R,v as $,E as U,F as A,cT as m,cU as f,c as M}from"./~utils-CqzhAsqs.js";import{v as g,S as v}from"./mui-dzjr6Pe9.js";import"./Popover-P2T2t250.js";import"./warning-CjLcoXvV.js";import"./dismiss-DPl2yXjX.js";import"./NavigationList-CxwHPPmB.js";import"./disclosure-provider-BlSOnAer.js";import"./Y432LOQZ-Dr12Q--e.js";import"./script-CH-ZelnX.js";import"./~navigation-tNM2x0Q4.js";import"./Divider-CKnPB9yJ.js";import"./settings-gC6OtFsu.js";import"./NavigationRail-DsHmK12o.js";import"./Container-C4L8s3gp.js";function E(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function F(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const T=t=>{const{classes:e,variant:a,animation:i,hasChildren:s,width:l,height:o}=t;return $({root:["root",a,i,s&&"withChildren",s&&!l&&"fitContent",s&&!o&&"heightAuto"]},F,e)},p=f`
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
`,B=typeof p!="string"?m`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,D=typeof c!="string"?m`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(A(({theme:t})=>{const e=E(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:B||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:D||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),r=C.forwardRef(function(e,a){const i=j({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:l,component:o="span",height:d,style:x,variant:y="text",width:k,...h}=i,u={...i,animation:s,component:o,variant:y,hasChildren:!!h.children},b=T(u);return n.jsx(K,{as:o,ref:a,className:R(b.root,l),ownerState:u,...h,style:{width:k,height:d,...x}})}),L=()=>n.jsxs(n.Fragment,{children:[n.jsx(r,{}),n.jsx("div",{style:g,children:"Loading..."})]}),N=()=>n.jsxs(v,{spacing:1,direction:"column",children:[n.jsx(r,{variant:"circular",width:40,height:40}),n.jsx(r,{variant:"rectangular"}),n.jsx(r,{variant:"rounded"}),n.jsx(r,{variant:"text"}),n.jsx("div",{style:g,children:"Loading…"})]});function et(){const t=M.c(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=n.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[n.jsx(L,{}),n.jsx(N,{})]}),t[0]=e):e=t[0],e}export{et as default};
