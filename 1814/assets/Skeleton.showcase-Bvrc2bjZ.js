import{Z as b,et as w,t as _}from"./jsx-runtime-CvPTumEY.js";import{J as S,b as j,d as R,n as $,r as M,t as U,x as A,y as X}from"./DefaultPropsProvider-DZ2m2oiU.js";import{n as h,r as m}from"./emotion-react.browser.esm-DAePtcFO.js";import{t as f}from"./Stack-CLkVBdoQ.js";import{t as v}from"./visuallyHidden-Dmbr6mSp.js";function q(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function B(t){return parseFloat(t)}function E(t){return j("MuiSkeleton",t)}var Z=X("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]),F=w(b(),1),r=_(),K=t=>{const{classes:e,variant:a,animation:i,hasChildren:n,width:l,height:o}=t;return R({root:["root",a,i,n&&"withChildren",n&&!l&&"fitContent",n&&!o&&"heightAuto"]},E,e)},d=m`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,p=m`
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
`,L=typeof d!="string"?h`
        animation: ${d} 2s ease-in-out 0.5s infinite;
      `:null,N=typeof p!="string"?h`
        &::after {
          animation: ${p} 2s linear 0.5s infinite;
        }
      `:null,T=M("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})($(({theme:t})=>{const e=q(t.shape.borderRadius)||"px",a=B(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:i})=>i.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:i})=>i.hasChildren&&!i.width,style:{maxWidth:"fit-content"}},{props:({ownerState:i})=>i.hasChildren&&!i.height,style:{height:"auto"}},{props:{animation:"pulse"},style:L||{animation:`${d} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:N||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}}]}})),s=F.forwardRef(function(e,a){const i=U({props:e,name:"MuiSkeleton"}),{animation:n="pulse",className:l,component:o="span",height:g,style:y,variant:x="text",width:k,...u}=i,c={...i,animation:n,component:o,variant:x,hasChildren:!!u.children},C=K(c);return(0,r.jsx)(T,{as:o,ref:a,className:A(C.root,l),ownerState:c,...u,style:{width:k,height:g,...y}})}),W=S(),D=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(s,{}),(0,r.jsx)("div",{style:v,children:"Loading..."})]}),H=()=>(0,r.jsxs)(f,{spacing:2,direction:"column",children:[(0,r.jsx)(s,{variant:"circular",width:40,height:40}),(0,r.jsx)(s,{variant:"rectangular"}),(0,r.jsx)(s,{variant:"rounded"}),(0,r.jsx)(s,{variant:"text"}),(0,r.jsx)("div",{style:v,children:"Loading…"})]});function z(){const t=(0,W.c)(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,r.jsxs)(f,{spacing:4,sx:{alignSelf:"stretch"},children:[(0,r.jsx)(D,{}),(0,r.jsx)(H,{})]}),t[0]=e):e=t[0],e}export{z as default};
