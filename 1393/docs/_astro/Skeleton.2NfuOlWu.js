import{r as v}from"./styles.internal.iAh-c3F9.js";import{K as C,L as b,z as k,j as w,C as x,E as R,F as S,H as $,a8 as u,a7 as c}from"./client.B_FYAUVD.js";function U(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function M(t){return parseFloat(t)}function A(t){return C("MuiSkeleton",t)}b("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:e,variant:a,animation:n,hasChildren:s,width:o,height:i}=t;return R({root:["root",a,n,s&&"withChildren",s&&!o&&"fitContent",s&&!i&&"heightAuto"]},A,e)},r=u`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,l=u`
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
`,j=typeof r!="string"?c`
        animation: ${r} 2s ease-in-out 0.5s infinite;
      `:null,E=typeof l!="string"?c`
        &::after {
          animation: ${l} 2s linear 0.5s infinite;
        }
      `:null,K=S("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=U(t.shape.borderRadius)||"px",a=M(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:j||{animation:`${r} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:E||{"&::after":{animation:`${l} 2s linear 0.5s infinite`}}}]}})),N=v.forwardRef(function(e,a){const n=k({props:e,name:"MuiSkeleton"}),{animation:s="pulse",className:o,component:i="span",height:p,style:m,variant:f="text",width:g,...d}=n,h={...n,animation:s,component:i,variant:f,hasChildren:!!d.children},y=X(h);return w.jsx(K,{as:i,ref:a,className:x(y.root,o),ownerState:h,...d,style:{width:g,height:p,...m}})});export{N as S};
