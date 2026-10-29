import{E as e,J as t,T as n,Y as r,_ as i,bt as a,dr as o,nt as s,rt as c,w as l,xt as u}from"./chevron-down.BMpmVMsp.js";import{t as d}from"./react.9v1nbBmV.js";import{n as f}from"./example-embed.astro_astro_type_script_index_0_lang.CISr0o1R.js";function p(e){return String(e).match(/[\d.\-+]*\s*(.*)/)[1]||``}function m(e){return parseFloat(e)}var h=f(d(),1);function g(e){return r(`MuiSkeleton`,e)}t(`MuiSkeleton`,[`root`,`text`,`rectangular`,`rounded`,`circular`,`pulse`,`wave`,`withChildren`,`fitContent`,`heightAuto`]);var _=o(),v=e=>{let{classes:t,variant:n,animation:r,hasChildren:i,width:o,height:s}=e;return a({root:[`root`,n,r,i&&`withChildren`,i&&!o&&`fitContent`,i&&!s&&`heightAuto`]},g,t)},y=c`
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0.4;
  }

  100% {
    opacity: 1;
  }
`,b=c`
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
`,x=typeof y==`string`?null:s`
        animation: ${y} 2s ease-in-out 0.5s infinite;
      `,S=typeof b==`string`?null:s`
        &::after {
          animation: ${b} 2s linear 0.5s infinite;
        }
      `,C=e(`span`,{name:`MuiSkeleton`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],n.animation!==!1&&t[n.animation],n.hasChildren&&t.withChildren,n.hasChildren&&!n.width&&t.fitContent,n.hasChildren&&!n.height&&t.heightAuto]}})(n(({theme:e})=>{let t=p(e.shape.borderRadius)||`px`,n=m(e.shape.borderRadius),r=i(e,{animation:`none`}),a=i(e,{"&::after":{animation:`none`,display:`none`}});return{display:`block`,backgroundColor:e.vars?e.vars.palette.Skeleton.bg:e.alpha(e.palette.text.primary,e.palette.mode===`light`?.11:.13),height:`1.2em`,variants:[{props:{variant:`text`},style:{marginTop:0,marginBottom:0,height:`auto`,transformOrigin:`0 55%`,transform:`scale(1, 0.60)`,borderRadius:`${n}${t}/${Math.round(n/.6*10)/10}${t}`,"&:empty:before":{content:`"\\00a0"`}}},{props:{variant:`circular`},style:{borderRadius:`50%`}},{props:{variant:`rounded`},style:{borderRadius:(e.vars||e).shape.borderRadius}},{props:({ownerState:e})=>e.hasChildren,style:{"& > *":{visibility:`hidden`}}},{props:({ownerState:e})=>e.hasChildren&&!e.width,style:{maxWidth:`fit-content`}},{props:({ownerState:e})=>e.hasChildren&&!e.height,style:{height:`auto`}},{props:{animation:`pulse`},style:x||{animation:`${y} 2s ease-in-out 0.5s infinite`}},...r?[{props:{animation:`pulse`},style:r}]:[],{props:{animation:`wave`},style:{position:`relative`,overflow:`hidden`,WebkitMaskImage:`-webkit-radial-gradient(white, black)`,"&::after":{background:`linear-gradient(
                90deg,
                transparent,
                ${(e.vars||e).palette.action.hover},
                transparent
              )`,content:`""`,position:`absolute`,transform:`translateX(-100%)`,bottom:0,left:0,right:0,top:0}}},{props:{animation:`wave`},style:S||{"&::after":{animation:`${b} 2s linear 0.5s infinite`}}},...a?[{props:{animation:`wave`},style:a}]:[]]}})),w=h.forwardRef(function(e,t){let n=l({props:e,name:`MuiSkeleton`}),{animation:r=`pulse`,className:i,component:a=`span`,height:o,style:s,variant:c=`text`,width:d,...f}=n,p={...n,animation:r,component:a,variant:c,hasChildren:!!f.children},m=v(p);return(0,_.jsx)(C,{as:a,ref:t,className:u(m.root,i),ownerState:p,...f,style:{width:d,height:o,...s}})});export{w as t};