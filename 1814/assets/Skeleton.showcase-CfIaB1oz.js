import{Z as w,et as b,t as _}from"./jsx-runtime-CvPTumEY.js";import{C as j,S as R,Z as M,m as $,n as U,r as A,t as X,w as q}from"./DefaultPropsProvider-6XumKMvl.js";import{n as h,r as f}from"./emotion-react.browser.esm-ClMZgtk2.js";import{t as v}from"./Stack-CEJKvp3m.js";import{t as m}from"./utils-BHnlY1Bb.js";import{t as g}from"./visuallyHidden-Cg_7OqQ8.js";function W(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function B(t){return parseFloat(t)}function E(t){return j("MuiSkeleton",t)}var J=R("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]),F=b(w(),1),r=_(),K=t=>{const{classes:e,variant:a,animation:s,hasChildren:i,width:n,height:l}=t;return $({root:["root",a,s,i&&"withChildren",i&&!n&&"fitContent",i&&!l&&"heightAuto"]},E,e)},d=f`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,p=f`
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
      `:null,P=A("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,e)=>{const{ownerState:a}=t;return[e.root,e[a.variant],a.animation!==!1&&e[a.animation],a.hasChildren&&e.withChildren,a.hasChildren&&!a.width&&e.fitContent,a.hasChildren&&!a.height&&e.heightAuto]}})(U(({theme:t})=>{const e=W(t.shape.borderRadius)||"px",a=B(t.shape.borderRadius),s=m(t,{animation:"none"}),i=m(t,{"&::after":{animation:"none",display:"none"}});return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${e}/${Math.round(a/.6*10)/10}${e}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:L||{animation:`${d} 2s ease-in-out 0.5s infinite`}},...s?[{props:{animation:"pulse"},style:s}]:[],{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:N||{"&::after":{animation:`${p} 2s linear 0.5s infinite`}}},...i?[{props:{animation:"wave"},style:i}]:[]]}})),o=F.forwardRef(function(e,a){const s=X({props:e,name:"MuiSkeleton"}),{animation:i="pulse",className:n,component:l="span",height:y,style:x,variant:k="text",width:C,...u}=s,c={...s,animation:i,component:l,variant:k,hasChildren:!!u.children},S=K(c);return(0,r.jsx)(P,{as:l,ref:a,className:q(S.root,n),ownerState:c,...u,style:{width:C,height:y,...x}})}),T=M(),Z=()=>(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(o,{}),(0,r.jsx)("div",{style:g,children:"Loading..."})]}),D=()=>(0,r.jsxs)(v,{spacing:2,direction:"column",children:[(0,r.jsx)(o,{variant:"circular",width:40,height:40}),(0,r.jsx)(o,{variant:"rectangular"}),(0,r.jsx)(o,{variant:"rounded"}),(0,r.jsx)(o,{variant:"text"}),(0,r.jsx)("div",{style:g,children:"Loading…"})]});function Q(){const t=(0,T.c)(1);let e;return t[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,r.jsxs)(v,{spacing:4,sx:{alignSelf:"stretch"},children:[(0,r.jsx)(Z,{}),(0,r.jsx)(D,{})]}),t[0]=e):e=t[0],e}export{Q as default};
