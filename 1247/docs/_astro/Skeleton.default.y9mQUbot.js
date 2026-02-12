import{O as C,P as b,Q as k,j as i,N as w,S as x,U as S,W as R,a3 as c,a4 as m}from"./ExamplePreview.BHYY8Jf2.js";import{r as $}from"./index.DIfZGIpv.js";import{v as U}from"./visuallyHidden.Dan1xhjv.js";import"./preload-helper.DP95yGCk.js";import"./index.XeJbqeyU.js";import"./styles.internal.BwFdDu8v.js";function j(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function M(t){return parseFloat(t)}function A(t){return C("MuiSkeleton",t)}b("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:r,height:o}=t;return x({root:["root",a,n,s&&"withChildren",s&&!r&&"fitContent",s&&!o&&"heightAuto"]},A,e)},l=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,p=c`
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
`,N=typeof l!="string"?m`
        animation: ${l} 2s ease-in-out 0.5s infinite;
      `:null,W=typeof p!="string"?m`
        &::after {
          animation: ${p} 2s linear 0.5s infinite;
        }
      `:null,B=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(R(({theme:t})=>{const e=j(t.shape.borderRadius)||"px",a=M(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:N||{animation:`${l} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:W||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}}]}})),E=$.forwardRef(function(e,a){const n=k({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:r,component:o="span",height:d,style:f,variant:g="text",width:y,...h}=n,u={...n,animation:s,component:o,variant:g,hasChildren:!!h.children},v=X(u);return i.jsx(B,{as:o,ref:a,className:w(v.root,r),ownerState:u,...h,style:{width:y,height:d,...f}})}),H=()=>i.jsxs(i.Fragment,{children:[i.jsx(E,{}),i.jsx("div",{style:U,children:"Loading..."})]});export{H as default};
