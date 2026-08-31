import{r as b,j as e}from"./index-_BmP7_ig.js";import{g as w,i as S,l as j,c as R,b as $,s as U,o as M,d2 as m,d3 as f}from"./~utils-DLqXO0Gu.js";import{v as g,S as v}from"./mui-Bj7X-H2-.js";import"./Icon-zCJT_fE4.js";import"./warning-BwwJa5hK.js";import"./dismiss-CGBU0t4J.js";import"./NavigationList-B94RT0hC.js";import"./disclosure-provider-B_F6sUMQ.js";import"./disclosure-BjcjougT.js";import"./react-resizable-panels.browser-BUViVF9I.js";import"./script-CM-EZkIx.js";import"./~navigation-DZkl2bHY.js";import"./Divider-DreC88M-.js";import"./settings-Aw83X4tQ.js";import"./NavigationRail-BtJqWw-L.js";import"./Container-dWP4X9uk.js";import"./getThemeProps-BmdhT175.js";function A(t){return String(t).match(/[\d.\-+]*\s*(.*)/)[1]||""}function X(t){return parseFloat(t)}function E(t){return w("MuiSkeleton",t)}S("MuiSkeleton",["root","text","rectangular","rounded","circular","pulse","wave","withChildren","fitContent","heightAuto"]);const B=t=>{const{classes:i,variant:a,animation:n,hasChildren:r,width:l,height:o}=t;return $({root:["root",a,n,r&&"withChildren",r&&!l&&"fitContent",r&&!o&&"heightAuto"]},E,i)},p=f`
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
      `:null,K=U("span",{name:"MuiSkeleton",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:a}=t;return[i.root,i[a.variant],a.animation!==!1&&i[a.animation],a.hasChildren&&i.withChildren,a.hasChildren&&!a.width&&i.fitContent,a.hasChildren&&!a.height&&i.heightAuto]}})(M(({theme:t})=>{const i=A(t.shape.borderRadius)||"px",a=X(t.shape.borderRadius);return{display:"block",backgroundColor:t.vars?t.vars.palette.Skeleton.bg:t.alpha(t.palette.text.primary,t.palette.mode==="light"?.11:.13),height:"1.2em",variants:[{props:{variant:"text"},style:{marginTop:0,marginBottom:0,height:"auto",transformOrigin:"0 55%",transform:"scale(1, 0.60)",borderRadius:`${a}${i}/${Math.round(a/.6*10)/10}${i}`,"&:empty:before":{content:'"\\00a0"'}}},{props:{variant:"circular"},style:{borderRadius:"50%"}},{props:{variant:"rounded"},style:{borderRadius:(t.vars||t).shape.borderRadius}},{props:({ownerState:n})=>n.hasChildren,style:{"& > *":{visibility:"hidden"}}},{props:({ownerState:n})=>n.hasChildren&&!n.width,style:{maxWidth:"fit-content"}},{props:({ownerState:n})=>n.hasChildren&&!n.height,style:{height:"auto"}},{props:{animation:"pulse"},style:D||{animation:`${p} 2s ease-in-out 0.5s infinite`}},{props:{animation:"wave"},style:{position:"relative",overflow:"hidden",WebkitMaskImage:"-webkit-radial-gradient(white, black)","&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(t.vars||t).palette.action.hover},
                transparent
              )`,content:'""',position:"absolute",transform:"translateX(-100%)",bottom:0,left:0,right:0,top:0}}},{props:{animation:"wave"},style:F||{"&::after":{animation:`${d} 2s linear 0.5s infinite`}}}]}})),s=b.forwardRef(function(i,a){const n=j({props:i,name:"MuiSkeleton"}),{animation:r="pulse",className:l,component:o="span",height:c,style:x,variant:y="text",width:k,...h}=n,u={...n,animation:r,component:o,variant:y,hasChildren:!!h.children},C=B(u);return e.jsx(K,{as:o,ref:a,className:R(C.root,l),ownerState:u,...h,style:{width:k,height:c,...x}})}),L=()=>e.jsxs(e.Fragment,{children:[e.jsx(s,{}),e.jsx("div",{style:g,children:"Loading..."})]}),N=()=>e.jsxs(v,{spacing:2,direction:"column",children:[e.jsx(s,{variant:"circular",width:40,height:40}),e.jsx(s,{variant:"rectangular"}),e.jsx(s,{variant:"rounded"}),e.jsx(s,{variant:"text"}),e.jsx("div",{style:g,children:"Loading…"})]});function et(){return e.jsxs(v,{spacing:4,sx:{alignSelf:"stretch"},children:[e.jsx(L,{}),e.jsx(N,{})]})}export{et as default};
