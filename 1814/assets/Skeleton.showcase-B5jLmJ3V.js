import{F as e,R as t,t as n}from"./jsx-runtime-BkI_Ul-C.js";import{b as r,d as i,n as a,r as o,t as s,x as c,y as l}from"./DefaultPropsProvider-Xm3r8pJu.js";import{n as u,r as d}from"./emotion-react.browser.esm-DYtlJFTy.js";import{t as f}from"./Stack-CQr7oTIi.js";import{t as p}from"./visuallyHidden-CBLLL9bM.js";function m(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||``}function h(e){return parseFloat(e)}function g(e){return r(`MuiSkeleton`,e)}l(`MuiSkeleton`,[`root`,`text`,`rectangular`,`rounded`,`circular`,`pulse`,`wave`,`withChildren`,`fitContent`,`heightAuto`]);var _=t(e(),1),v=n(),y=e=>{let{classes:t,variant:n,animation:r,hasChildren:a,width:o,height:s}=e;return i({root:[`root`,n,r,a&&`withChildren`,a&&!o&&`fitContent`,a&&!s&&`heightAuto`]},g,t)},b=d`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,x=d`
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
`,S=typeof b==`string`?null:u`
        animation: ${b} 2s ease-in-out 0.5s infinite;
      `,C=typeof x==`string`?null:u`
        &::after {
          animation: ${x} 2s linear 0.5s infinite;
        }
      `,w=o(`span`,{name:`MuiSkeleton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(a(({theme:e})=>{let t=m(e.shape.borderRadius)||`px`,n=h(e.shape.borderRadius);return{display:`block`,backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode===`light`?.11:.13),height:`1.2em`,variants:[{props:{variant:`text`},style:{marginTop:0,marginBottom:0,height:`auto`,transformOrigin:`0 55%`,transform:`scale(1, 0.60)`,borderRadius:`${n}${t}/${Math.round(n/.6*10)/10}${t}`,"&:empty:before":{content:`"\\00a0"`}}},{props:{variant:`circular`},style:{borderRadius:`50%`}},{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:`hidden`}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:`fit-content`}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:`auto`}},{props:{animation:`pulse`},style:S||{animation:`${b} 2s ease-in-out 0.5s infinite`}},{props:{animation:`wave`},style:{position:`relative`,overflow:`hidden`,WebkitMaskImage:`-webkit-radial-gradient(white, black)`,"&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:`""`,position:`absolute`,transform:`translateX(-100%)`,bottom:0,left:0,right:0,top:0}}},{props:{animation:`wave`},style:C||{"&::after":{animation:`${x} 2s linear 0.5s infinite`}}}]}})),T=_.forwardRef(function(e,t){let n=s({props:e,name:`MuiSkeleton`}),{animation:r=`pulse`,className:i,component:a=`span`,height:o,style:l,variant:u=`text`,width:d,...f}=n,p={...n,animation:r,component:a,variant:u,hasChildren:!!f.children},m=y(p);return(0,v.jsx)(w,{as:a,ref:t,className:c(m.root,i),ownerState:p,...f,style:{width:d,height:o,...l}})}),E=()=>(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(T,{}),(0,v.jsx)(`div`,{style:p,children:`Loading...`})]}),D=()=>(0,v.jsxs)(f,{spacing:2,direction:`column`,children:[(0,v.jsx)(T,{variant:`circular`,width:40,height:40}),(0,v.jsx)(T,{variant:`rectangular`}),(0,v.jsx)(T,{variant:`rounded`}),(0,v.jsx)(T,{variant:`text`}),(0,v.jsx)(`div`,{style:p,children:`Loading…`})]});function O(){return(0,v.jsxs)(f,{spacing:4,sx:{alignSelf:`stretch`},children:[(0,v.jsx)(E,{}),(0,v.jsx)(D,{})]})}export{O as default};