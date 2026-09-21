import{K as e,Y as t,t as n}from"./jsx-runtime-C7ynoptP.js";import{D as r,I as i,L as a,Mt as o,Nr as s,R as c,ft as l,jt as u,mt as d,nt as f,pt as p}from"./SwitchBase-DDxFvBW9.js";import{t as m}from"./Stack-vSKp9pXl.js";import{t as h}from"./visuallyHidden-BgYNxp1M.js";function g(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||``}function _(e){return parseFloat(e)}function v(e){return p(`MuiSkeleton`,e)}l(`MuiSkeleton`,[`root`,`text`,`rectangular`,`rounded`,`circular`,`pulse`,`wave`,`withChildren`,`fitContent`,`heightAuto`]);var y=t(e(),1),b=n(),x=e=>{let{classes:t,variant:n,animation:r,hasChildren:i,width:a,height:o}=e;return f({root:[`root`,n,r,i&&`withChildren`,i&&!a&&`fitContent`,i&&!o&&`heightAuto`]},v,t)},S=o`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,C=o`
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
`,w=typeof S==`string`?null:u`
        animation: ${S} 2s ease-in-out 0.5s infinite;
      `,T=typeof C==`string`?null:u`
        &::after {
          animation: ${C} 2s linear 0.5s infinite;
        }
      `,E=c(`span`,{name:`MuiSkeleton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(a(({theme:e})=>{let t=g(e.shape.borderRadius)||`px`,n=_(e.shape.borderRadius),i=r(e,{animation:`none`}),a=r(e,{"&::after":{animation:`none`,display:`none`}});return{display:`block`,backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode===`light`?.11:.13),height:`1.2em`,variants:[{props:{variant:`text`},style:{marginTop:0,marginBottom:0,height:`auto`,transformOrigin:`0 55%`,transform:`scale(1, 0.60)`,borderRadius:`${n}${t}/${Math.round(n/.6*10)/10}${t}`,"&:empty:before":{content:`"\\00a0"`}}},{props:{variant:`circular`},style:{borderRadius:`50%`}},{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:`hidden`}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:`fit-content`}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:`auto`}},{props:{animation:`pulse`},style:w||{animation:`${S} 2s ease-in-out 0.5s infinite`}},...i?[{props:{animation:`pulse`},style:i}]:[],{props:{animation:`wave`},style:{position:`relative`,overflow:`hidden`,WebkitMaskImage:`-webkit-radial-gradient(white, black)`,"&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:`""`,position:`absolute`,transform:`translateX(-100%)`,bottom:0,left:0,right:0,top:0}}},{props:{animation:`wave`},style:T||{"&::after":{animation:`${C} 2s linear 0.5s infinite`}}},...a?[{props:{animation:`wave`},style:a}]:[]]}})),D=y.forwardRef(function(e,t){let n=i({props:e,name:`MuiSkeleton`}),{animation:r=`pulse`,className:a,component:o=`span`,height:s,style:c,variant:l=`text`,width:u,...f}=n,p={...n,animation:r,component:o,variant:l,hasChildren:!!f.children},m=x(p);return(0,b.jsx)(E,{as:o,ref:t,className:d(m.root,a),ownerState:p,...f,style:{width:u,height:s,...c}})}),O=s(),k=()=>(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)(D,{}),(0,b.jsx)(`div`,{style:h,children:`Loading...`})]}),A=()=>(0,b.jsxs)(m,{spacing:2,direction:`column`,children:[(0,b.jsx)(D,{variant:`circular`,width:40,height:40}),(0,b.jsx)(D,{variant:`rectangular`}),(0,b.jsx)(D,{variant:`rounded`}),(0,b.jsx)(D,{variant:`text`}),(0,b.jsx)(`div`,{style:h,children:`Loading…`})]});function j(){let e=(0,O.c)(1),t;return e[0]===Symbol.for(`react.memo_cache_sentinel`)?(t=(0,b.jsxs)(m,{spacing:4,sx:{alignSelf:`stretch`},children:[(0,b.jsx)(k,{}),(0,b.jsx)(A,{})]}),e[0]=t):t=e[0],t}export{j as default};