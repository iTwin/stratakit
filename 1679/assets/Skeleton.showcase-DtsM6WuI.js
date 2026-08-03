import{r as C,j as e}from"./jsx-runtime-BL3mWa0-.js";import{g as w,a as S,u as j,d as R,b as $,s as U,m as M,bG as h,bH as f}from"./Button-pi0S6U6Z.js";import{v as g}from"./mui-DBPd7Wgs.js";import{S as v}from"./Stack-BCqef4cx.js";import"./Icon-C-gzewRC.js";import"./warning-NmQ4dpxK.js";import"./dismiss-CrrRS9Oo.js";import"./NavigationList-f1g1DTQc.js";import"./~utils-DQLtUerr.js";import"./index-BnlbBdgW.js";import"./disclosure-provider-BisKQZMG.js";import"./disclosure-DAlxR-ot.js";import"./react-resizable-panels.browser-BC3CA2aD.js";import"./script-CtCWXfEZ.js";import"./Popover-vIpt4aes.js";import"./~navigation-Dq2pCJWY.js";import"./Divider-zuASam57.js";import"./settings-DXPTJBK8.js";import"./NavigationRail-O26HZ1X6.js";import"./Container-BvVuJGaG.js";import"./useThemeProps-C2oY38WS.js";import"./getThemeProps-DnzKm0qV.js";function A(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function E(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:i,variant:a,animation:n,hasChildren:r,width:l,height:s}=t;return $({root:["root",a,n,r&&"withChildren",r&&!l&&"fitContent",r&&!s&&"heightAuto"]},E,i)},p=f`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,d=f`
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
`,D=typeof p!="string"?h`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,F=typeof d!="string"?h`
        &::after {
          animation: ${d} 2s linear 0.5s infinite;
        }
      `:null,H=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:a}=t;return[i.root,i[a.variant],a.animation!==!1&&i[a.animation],a.hasChildren&&i.withChildren,a.hasChildren&&!a.width&&i.fitContent,a.hasChildren&&!a.height&&i.heightAuto]}})(M(({theme:t})=>{const i=A(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${i}/${Math.round(a/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:D||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:F||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}}]}})),o=C.forwardRef(function(i,a){const n=j({props:i,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:s="span",height:c,style:x,variant:y="text",width:b,...m}=n,u={...n,animation:r,component:s,variant:y,hasChildren:!!m.children},k=B(u);return e.jsx(H,{as:s,ref:a,className:R(k.root,l),ownerState:u,...m,style:{width:b,height:c,...x}})}),K=()=>e.jsxs(e.Fragment,{children:[e.jsx(o,{}),e.jsx("div",{style:g,children:"Loading..."})]}),L=()=>e.jsxs(v,{spacing:1,direction:"column",children:[e.jsx(o,{variant:"circular",width:40,height:40}),e.jsx(o,{variant:"rectangular"}),e.jsx(o,{variant:"rounded"}),e.jsx(o,{variant:"text"}),e.jsx("div",{style:g,children:"Loading…"})]});function st(){return e.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[e.jsx(K,{}),e.jsx(L,{})]})}export{st as default};
