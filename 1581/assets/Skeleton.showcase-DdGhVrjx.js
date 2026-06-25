import{r as b,j as e}from"./index-CwPHd6Sh.js";import{g as w,i as S,u as j,c as R,b as $,s as U,k as M,c$ as m,d0 as f}from"./~utils-BDHTxBVu.js";import{v as g,S as v}from"./mui-A4mm6Eyr.js";import"./Icon-Dxekg3F5.js";import"./warning-CtP9IQDP.js";import"./dismiss-BAdRqED_.js";import"./NavigationList-Dgj5Jg_i.js";import"./disclosure-provider-DwFmBSui.js";import"./disclosure-CUh7P1V6.js";import"./script-BQo-bGLE.js";import"./~navigation-MU_KzClm.js";import"./Divider-B_q-Q3NV.js";import"./settings-BRpKrmsT.js";import"./NavigationRail-CtK5k5_O.js";import"./Container-Dsrn3lRi.js";import"./getThemeProps-CzU_NFDg.js";function A(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function E(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:n,variant:a,animation:i,hasChildren:r,width:l,height:o}=t;return $({root:["root",a,i,r&&"withChildren",r&&!l&&"fitContent",r&&!o&&"heightAuto"]},E,n)},p=f`
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
`,D=typeof p!="string"?m`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,F=typeof d!="string"?m`
        &::after {
          animation: ${d} 2s linear 0.5s infinite;
        }
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:a}=t;return[n.root,n[a.variant],a.animation!==!1&&n[a.animation],a.hasChildren&&n.withChildren,a.hasChildren&&!a.width&&n.fitContent,a.hasChildren&&!a.height&&n.heightAuto]}})(M(({theme:t})=>{const n=A(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${n}/${Math.round(a/.6*10)/10}${n}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:D||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:F||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}}]}})),s=b.forwardRef(function(n,a){const i=j({props:n,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:o="span",height:c,style:x,variant:y="text",width:k,...u}=i,h={...i,animation:r,component:o,variant:y,hasChildren:!!u.children},C=B(h);return e.jsx(K,{as:o,ref:a,className:R(C.root,l),ownerState:h,...u,style:{width:k,height:c,...x}})}),L=()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx("div",{style:g,children:"Loading..."})]}),N=()=>e.jsxs(v,{spacing:1,direction:"column",children:[e.jsx(s,{variant:"circular",width:40,height:40}),e.jsx(s,{variant:"rectangular"}),e.jsx(s,{variant:"rounded"}),e.jsx(s,{variant:"text"}),e.jsx("div",{style:g,children:"Loading…"})]});function at(){return e.jsxs(v,{spacing:2,sx:{alignSelf:"stretch"},children:[e.jsx(L,{}),e.jsx(N,{})]})}export{at as default};
