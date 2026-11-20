import{r as e}from"./rolldown-runtime-XKyaHtl9.js";import{q as t,t as n}from"./jsx-runtime-znEIPLWF.js";import{C as r,S as i,m as a,n as o,r as s,t as c,w as l}from"./DefaultPropsProvider-BA5pAiEK.js";import{n as u}from"./RtlProvider-BfYxwQSp.js";import{n as d,r as f}from"./emotion-react.browser.esm-X9G-mCEC.js";import{t as p}from"./createSimplePaletteValueFilter-Bt9IjErz.js";import{t as m}from"./capitalize-uZuxXLiF.js";import{i as h,t as g}from"./utils-s_LoXvoN.js";var _=e(t(),1);function v(e){return r(`MuiLinearProgress`,e)}i(`MuiLinearProgress`,[`root`,`colorPrimary`,`colorSecondary`,`determinate`,`indeterminate`,`buffer`,`query`,`dashed`,`bar`,`bar1`,`bar2`]);var y=n(),b=4,x={},S=f`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`,C=typeof S==`string`?null:d`
        animation: ${S} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `,w=f`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`,T=typeof w==`string`?null:d`
        animation: ${w} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `,E=f`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`,D=typeof E==`string`?null:d`
        animation: ${E} 3s infinite linear;
      `,O=e=>{let{classes:t,variant:n,color:r}=e,i={root:[`root`,`color${m(r)}`,n],dashed:[`dashed`],bar1:[`bar`,`bar1`],bar2:[`bar`,`bar2`,n===`buffer`&&`color${m(r)}`]};return a(i,v,t)},k=(e,t)=>e.vars?e.vars.palette.LinearProgress[`${t}Bg`]:e.palette.mode===`light`?e.lighten(e.palette[t].main,.62):e.darken(e.palette[t].main,.5),A=s(`span`,{name:`MuiLinearProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[`color${m(n.color)}`],t[n.variant]]}})(o(({theme:e})=>({position:`relative`,overflow:`hidden`,display:`block`,height:4,zIndex:0,"@media print":{colorAdjust:`exact`},variants:[...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t},style:{backgroundColor:k(e,t)}})),{props:({ownerState:e})=>e.color===`inherit`&&e.variant!==`buffer`,style:{"&::before":{content:`""`,position:`absolute`,left:0,top:0,right:0,bottom:0,backgroundColor:`currentColor`,opacity:.3}}},{props:{variant:`buffer`},style:{backgroundColor:`transparent`}},{props:{variant:`query`},style:{transform:`rotate(180deg)`}}]}))),j=s(`span`,{name:`MuiLinearProgress`,slot:`Dashed`})(o(({theme:e})=>({position:`absolute`,marginTop:0,height:`100%`,width:`100%`,backgroundSize:`10px 10px`,backgroundPosition:`0 -23px`,variants:[{props:{color:`inherit`},style:{opacity:.3,backgroundImage:`radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`}},...Object.entries(e.palette).filter(p()).map(([t])=>{let n=k(e,t);return{props:{color:t},style:{backgroundImage:`radial-gradient(${n} 0%, ${n} 16%, transparent 42%)`}}})]})),D||{animation:`${E} 3s infinite linear`},o(({theme:e})=>g(e,{animation:`none`})||x)),M=s(`span`,{name:`MuiLinearProgress`,slot:`Bar1`,overridesResolver:(e,t)=>[t.bar,t.bar1]})(o(({theme:e})=>{let t=g(e,{animation:`none`,left:`30%`,right:`auto`,width:`40%`});return{width:`100%`,position:`absolute`,left:0,bottom:0,top:0,...h(e,`transform`,{duration:`0.2s`,easing:`linear`}),transformOrigin:`left`,variants:[{props:{color:`inherit`},style:{backgroundColor:`currentColor`}},...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t},style:{backgroundColor:(e.vars||e).palette[t].main}})),{props:{variant:`determinate`},style:{...h(e,`transform`,{duration:`.${b}s`,easing:`linear`})}},{props:{variant:`buffer`},style:{zIndex:1,...h(e,`transform`,{duration:`.${b}s`,easing:`linear`})}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:{width:`auto`}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:C||{animation:`${S} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:t}]:[]]}})),N=s(`span`,{name:`MuiLinearProgress`,slot:`Bar2`,overridesResolver:(e,t)=>[t.bar,t.bar2]})(o(({theme:e})=>{let t=g(e,{animation:`none`,display:`none`});return{width:`100%`,position:`absolute`,left:0,bottom:0,top:0,...h(e,`transform`,{duration:`0.2s`,easing:`linear`}),transformOrigin:`left`,variants:[...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t},style:{"--LinearProgressBar2-barColor":(e.vars||e).palette[t].main}})),{props:({ownerState:e})=>e.variant!==`buffer`&&e.color!==`inherit`,style:{backgroundColor:`var(--LinearProgressBar2-barColor, currentColor)`}},{props:({ownerState:e})=>e.variant!==`buffer`&&e.color===`inherit`,style:{backgroundColor:`currentColor`}},{props:{color:`inherit`},style:{opacity:.3}},...Object.entries(e.palette).filter(p()).map(([t])=>({props:{color:t,variant:`buffer`},style:{backgroundColor:k(e,t),...h(e,`transform`,{duration:`.${b}s`,easing:`linear`})}})),{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:{width:`auto`}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:T||{animation:`${w} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:t}]:[]]}})),P=_.forwardRef(function(e,t){let n=c({props:e,name:`MuiLinearProgress`}),{className:r,color:i=`primary`,max:a,min:o,value:s,valueBuffer:d,variant:f=`indeterminate`,...p}=n,m={...n,color:i,variant:f},h=o??0,g=a??100,_=O(m),v=u(),b={},x={bar1:{},bar2:{}};if((f===`determinate`||f===`buffer`)&&s!==void 0){let e=g-h,t=(s-h)/e*100-100;v&&(t=-t),x.bar1.transform=e>0?`translateX(${t}%)`:`translateX(-100%)`,b[`aria-valuenow`]=s,b[`aria-valuemin`]=h,b[`aria-valuemax`]=g}if(f===`buffer`&&d!==void 0){let e=g-h,t=(d-h)/e*100-100;v&&(t=-t),x.bar2.transform=e>0?`translateX(${t}%)`:`translateX(-100%)`}return(0,y.jsxs)(A,{className:l(_.root,r),ownerState:m,role:`progressbar`,...b,ref:t,...p,children:[f===`buffer`?(0,y.jsx)(j,{className:_.dashed,ownerState:m}):null,(0,y.jsx)(M,{className:_.bar1,ownerState:m,style:x.bar1}),f===`determinate`?null:(0,y.jsx)(N,{className:_.bar2,ownerState:m,style:x.bar2})]})});export{P as t};