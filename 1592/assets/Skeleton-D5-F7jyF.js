import{r as C,j as b}from"./index-DWXEng7z.js";import{g as w,j as k,n as S,a as x,e as R,s as M,p as $,d4 as c,d5 as h,d6 as m}from"./~utils-BTq95dzW.js";function U(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function A(t){return parseFloat(t)}function j(t){return w("MuiSkeleton",t)}k("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:e,variant:a,animation:s,hasChildren:o,width:n,height:i}=t;return R({root:["root",a,s,o&&"withChildren",o&&!n&&"fitContent",o&&!i&&"heightAuto"]},j,e)},r=m`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,l=m`
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
`,W=typeof r!="string"?h`
        animation: ${r} 2s ease-in-out 0.5s infinite;
      `:null,B=typeof l!="string"?h`
        &::after {
          animation: ${l} 2s linear 0.5s infinite;
        }
      `:null,E=M("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=U(t.shape.borderRadius)||"px",a=A(t.shape.borderRadius),s=c(t,{animation:"none"}),o=c(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:W||{animation:`${r} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:B||{"&::after":{animation:`${l} 2s linear 0.5s infinite`}}},...o?[{props:{animation:"wave"},style:o}]:[]]}})),P=C.forwardRef(function(e,a){const s=S({props:e,name:"MuiSkeleton"}),{animation:o="pulse",className:n,component:i="span",height:p,style:f,variant:g="text",width:y,...d}=s,u={...s,animation:o,component:i,variant:g,hasChildren:!!d.children},v=X(u);return b.jsx(E,{as:i,ref:a,className:x(v.root,n),ownerState:u,...d,style:{width:y,height:p,...f}})});export{P as S};
