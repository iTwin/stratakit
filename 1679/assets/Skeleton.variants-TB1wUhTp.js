import{r as k,j as i}from"./index-n5qmRx9m.js";import{v as f,b as C}from"./Switch-BbilvhX9.js";import{$ as _,a2 as w,a8 as S,V as j,_ as R,a5 as $,aa as M,bX as m,bY as g}from"./NativeSelect-Bepdfc9a.js";function U(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function A(t){return parseFloat(t)}function O(t){return _("MuiSkeleton",t)}w("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const X=t=>{const{classes:a,variant:e,animation:n,hasChildren:s,width:l,height:r}=t;return R({root:["root",e,n,s&&"withChildren",s&&!l&&"fitContent",s&&!r&&"heightAuto"]},O,a)},d=g`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,c=g`
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
`,T=typeof d!="string"?m`
        animation: ${d} 2s ease-in-out 0.5s infinite;
      `:null,P=typeof c!="string"?m`
        &::after {
          animation: ${c} 2s linear 0.5s infinite;
        }
      `:null,V=$("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,a)=>{const{ownerState:e}=t;return[a.root,a[e.variant],e.animation!==!1&&a[e.animation],e.hasChildren&&a.withChildren,e.hasChildren&&!e.width&&a.fitContent,e.hasChildren&&!e.height&&a.heightAuto]}})(M(({theme:t})=>{const a=U(t.shape.borderRadius)||"px",e=A(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${e}${a}/${Math.round(e/.6*10)/10}${a}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:T||{animation:`${d} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:P||{"&::after":{animation:`${c} 2s linear 0.5s infinite`}}}]}})),o=k.forwardRef(function(a,e){const n=S({props:a,name:"MuiSkeleton"}),{animation:s="pulse",className:l,component:r="span",height:p,style:v,variant:y="text",width:b,...u}=n,h={...n,animation:s,component:r,variant:y,hasChildren:!!u.children},x=X(h);return i.jsx(V,{as:r,ref:e,className:j(x.root,l),ownerState:h,...u,style:{width:b,height:p,...v}})}),z=()=>i.jsxs(i.Fragment,{children:[i.jsx(o,{}),i.jsx("div",{style:f,children:"Loading..."})]}),K=Object.freeze(Object.defineProperty({__proto__:null,default:z},Symbol.toStringTag,{value:"Module"})),B=()=>i.jsxs(C,{spacing:1,direction:"column",children:[i.jsx(o,{variant:"circular",width:40,height:40}),i.jsx(o,{variant:"rectangular"}),i.jsx(o,{variant:"rounded"}),i.jsx(o,{variant:"text"}),i.jsx("div",{style:f,children:"Loading…"})]}),L=Object.freeze(Object.defineProperty({__proto__:null,default:B},Symbol.toStringTag,{value:"Module"}));export{z as S,L as _,K as a,B as b};
