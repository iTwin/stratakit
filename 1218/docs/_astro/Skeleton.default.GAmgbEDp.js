import{j as i,H as C,P as c,Q as m}from"./ExamplePreview.GXd83Vpc.js";import{r as b}from"./index.DIfZGIpv.js";import{g as k,a as w,u as x,c as R,s as S,m as $}from"./DefaultPropsProvider.BHc7jDbM.js";import{v as U}from"./visuallyHidden.Dan1xhjv.js";import"./preload-helper.wl7_FWAb.js";import"./index.XeJbqeyU.js";import"./styles.internal.BwFdDu8v.js";function j(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function M(t){return parseFloat(t)}function A(t){return k("MuiSkeleton",t)}w("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:r,height:o}=t;return R({root:["root",a,n,s&&"withChildren",s&&!r&&"fitContent",s&&!o&&"heightAuto"]},A,e)},l=c`
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
`,B=typeof l!="string"?m`
        animation: ${l} 2s ease-in-out 0.5s infinite;
      `:null,E=typeof p!="string"?m`
        &::after {
          animation: ${p} 2s linear 0.5s infinite;
        }
      `:null,F=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=j(t.shape.borderRadius)||"px",a=M(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:B||{animation:`${l} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:E||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}}]}})),H=b.forwardRef(function(e,a){const n=x({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:r,component:o="span",height:d,style:f,variant:g="text",width:y,...u}=n,h={...n,animation:s,component:o,variant:g,hasChildren:!!u.children},v=X(h);return i.jsx(F,{as:o,ref:a,className:C(v.root,r),ownerState:h,...u,style:{width:y,height:d,...f}})}),L=()=>i.jsxs(i.Fragment,{children:[i.jsx(H,{}),i.jsx("div",{style:U,children:"Loading..."})]});export{L as default};
