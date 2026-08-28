import{r as C,j as e}from"./jsx-runtime-CPgBh_Y9.js";import{g as w,a as j,u as S,c as R,e as $,s as U,m as M,bN as h,bO as f}from"./Button-Dywmmpb8.js";import{v as g}from"./mui-DEFLa5f_.js";import{a as v}from"./Stack-SJZU2RW2.js";import"./Icon-BoJWNzO1.js";import"./warning-NmQ4dpxK.js";import"./dismiss-CrrRS9Oo.js";import"./NavigationList-DpH9FDdN.js";import"./~utils-BZuRH3Dx.js";import"./index-DMzxI5gQ.js";import"./disclosure-provider-CGKfP_uW.js";import"./disclosure-EuUCmyD3.js";import"./react-resizable-panels.browser-DGdN46GW.js";import"./script-CtCWXfEZ.js";import"./Popover-Ce38ylvc.js";import"./~navigation-Dsu_P2lF.js";import"./Divider-CCPu4Fi0.js";import"./settings-DXPTJBK8.js";import"./NavigationRail-DzKhEoVK.js";import"./Container-C5TT3nUn.js";import"./useThemeProps-moXH5mhy.js";import"./getThemeProps-7SJqS0ug.js";function A(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function E(t){return w("MuiSkeleton",t)}j("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const N=t=>{const{classes:i,variant:a,animation:n,hasChildren:r,width:l,height:s}=t;return $({root:["root",a,n,r&&"withChildren",r&&!l&&"fitContent",r&&!s&&"heightAuto"]},E,i)},p=f`
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
`,B=typeof p!="string"?h`
        animation: ${p} 2s ease-in-out 0.5s infinite;
      `:null,D=typeof d!="string"?h`
        &::after {
          animation: ${d} 2s linear 0.5s infinite;
        }
      `:null,F=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:a}=t;return[i.root,i[a.variant],a.animation!==!1&&i[a.animation],a.hasChildren&&i.withChildren,a.hasChildren&&!a.width&&i.fitContent,a.hasChildren&&!a.height&&i.heightAuto]}})(M(({theme:t})=>{const i=A(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${i}/${Math.round(a/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:B||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:D||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}}]}})),o=C.forwardRef(function(i,a){const n=S({props:i,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:s="span",height:c,style:x,variant:y="text",width:k,...m}=n,u={...n,animation:r,component:s,variant:y,hasChildren:!!m.children},b=N(u);return e.jsx(F,{as:s,ref:a,className:R(b.root,l),ownerState:u,...m,style:{width:k,height:c,...x}})}),K=()=>e.jsxs(e.Fragment,{children:[e.jsx(o,{}),e.jsx("div",{style:g,children:"Loading..."})]}),L=()=>e.jsxs(v,{spacing:2,direction:"column",children:[e.jsx(o,{variant:"circular",width:40,height:40}),e.jsx(o,{variant:"rectangular"}),e.jsx(o,{variant:"rounded"}),e.jsx(o,{variant:"text"}),e.jsx("div",{style:g,children:"Loading…"})]});function st(){return e.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[e.jsx(K,{}),e.jsx(L,{})]})}export{st as default};
