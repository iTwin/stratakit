import{Z as e,et as t,t as n}from"./jsx-runtime-PSkadNh_.js";import{C as r,S as i,m as a,n as o,r as s,t as c,w as l}from"./DefaultPropsProvider-BnggTyLw.js";import{n as u,r as d}from"./emotion-react.browser.esm-BDBKD8Am.js";import{O as f}from"./Backdrop-IuFmMwYu.js";import{t as p}from"./capitalize-D9fwEiKA.js";import{i as m,t as h}from"./utils-s_LoXvoN.js";import{t as g}from"./createSimplePaletteValueFilter-Bt9IjErz.js";var _=t(e(),1);function v(e){return r(`MuiLinearProgress`,e)}i(`MuiLinearProgress`,[`root`,`colorPrimary`,`colorSecondary`,`determinate`,`indeterminate`,`buffer`,`query`,`dashed`,`bar`,`bar1`,`bar2`]);var y=n(),b=4,x={},S=d`
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
`,C=typeof S==`string`?null:u`
        animation: ${S} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `,w=d`
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
`,T=typeof w==`string`?null:u`
        animation: ${w} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `,E=d`
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
`,D=typeof E==`string`?null:u`
        animation: ${E} 3s infinite linear;
      `,O=e=>{let{classes:t,variant:n,color:r}=e,i={root:[`root`,`color${p(r)}`,n],dashed:[`dashed`],bar1:[`bar`,`bar1`],bar2:[`bar`,`bar2`,n===`buffer`&&`color${p(r)}`]};return a(i,v,t)},k=(e,t)=>e.vars?e.vars.palette.LinearProgress[`${t}Bg`]:e.palette.mode===`light`?e.lighten(e.palette[t].main,.62):e.darken(e.palette[t].main,.5),A=s(`span`,{name:`MuiLinearProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[`color${p(n.color)}`],t[n.variant]]}})(o(({theme:e})=>({position:`relative`,overflow:`hidden`,display:`block`,height:4,zIndex:0,"@media print":{colorAdjust:`exact`},variants:[...Object.entries(e.palette).filter(g()).map(([t])=>({props:{color:t},style:{backgroundColor:k(e,t)}})),{props:({ownerState:e})=>e.color===`inherit`&&e.variant!==`buffer`,style:{"&::before":{content:`""`,position:`absolute`,left:0,top:0,right:0,bottom:0,backgroundColor:`currentColor`,opacity:.3}}},{props:{variant:`buffer`},style:{backgroundColor:`transparent`}},{props:{variant:`query`},style:{transform:`rotate(180deg)`}}]}))),j=s(`span`,{name:`MuiLinearProgress`,slot:`Dashed`})(o(({theme:e})=>({position:`absolute`,marginTop:0,height:`100%`,width:`100%`,backgroundSize:`10px 10px`,backgroundPosition:`0 -23px`,variants:[{props:{color:`inherit`},style:{opacity:.3,backgroundImage:`radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)`}},...Object.entries(e.palette).filter(g()).map(([t])=>{let n=k(e,t);return{props:{color:t},style:{backgroundImage:`radial-gradient(${n} 0%, ${n} 16%, transparent 42%)`}}})]})),D||{animation:`${E} 3s infinite linear`},o(({theme:e})=>h(e,{animation:`none`})||x)),M=s(`span`,{name:`MuiLinearProgress`,slot:`Bar1`,overridesResolver:(e,t)=>[t.bar,t.bar1]})(o(({theme:e})=>{let t=h(e,{animation:`none`,left:`30%`,right:`auto`,width:`40%`});return{width:`100%`,position:`absolute`,left:0,bottom:0,top:0,...m(e,`transform`,{duration:`0.2s`,easing:`linear`}),transformOrigin:`left`,variants:[{props:{color:`inherit`},style:{backgroundColor:`currentColor`}},...Object.entries(e.palette).filter(g()).map(([t])=>({props:{color:t},style:{backgroundColor:(e.vars||e).palette[t].main}})),{props:{variant:`determinate`},style:{...m(e,`transform`,{duration:`.${b}s`,easing:`linear`})}},{props:{variant:`buffer`},style:{zIndex:1,...m(e,`transform`,{duration:`.${b}s`,easing:`linear`})}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:{width:`auto`}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:C||{animation:`${S} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:t}]:[]]}})),N=s(`span`,{name:`MuiLinearProgress`,slot:`Bar2`,overridesResolver:(e,t)=>[t.bar,t.bar2]})(o(({theme:e})=>{let t=h(e,{animation:`none`,display:`none`});return{width:`100%`,position:`absolute`,left:0,bottom:0,top:0,...m(e,`transform`,{duration:`0.2s`,easing:`linear`}),transformOrigin:`left`,variants:[...Object.entries(e.palette).filter(g()).map(([t])=>({props:{color:t},style:{"--LinearProgressBar2-barColor":(e.vars||e).palette[t].main}})),{props:({ownerState:e})=>e.variant!==`buffer`&&e.color!==`inherit`,style:{backgroundColor:`var(--LinearProgressBar2-barColor, currentColor)`}},{props:({ownerState:e})=>e.variant!==`buffer`&&e.color===`inherit`,style:{backgroundColor:`currentColor`}},{props:{color:`inherit`},style:{opacity:.3}},...Object.entries(e.palette).filter(g()).map(([t])=>({props:{color:t,variant:`buffer`},style:{backgroundColor:k(e,t),...m(e,`transform`,{duration:`.${b}s`,easing:`linear`})}})),{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:{width:`auto`}},{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:T||{animation:`${w} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`||e.variant===`query`,style:t}]:[]]}})),P=_.forwardRef(function(e,t){let n=c({props:e,name:`MuiLinearProgress`}),{className:r,color:i=`primary`,max:a,min:o,value:s,valueBuffer:u,variant:d=`indeterminate`,...p}=n,m={...n,color:i,variant:d},h=o??0,g=a??100,_=O(m),v=f(),b={},x={bar1:{},bar2:{}};if((d===`determinate`||d===`buffer`)&&s!==void 0){let e=g-h,t=(s-h)/e*100-100;v&&(t=-t),x.bar1.transform=e>0?`translateX(${t}%)`:`translateX(-100%)`,b[`aria-valuenow`]=s,b[`aria-valuemin`]=h,b[`aria-valuemax`]=g}if(d===`buffer`&&u!==void 0){let e=g-h,t=(u-h)/e*100-100;v&&(t=-t),x.bar2.transform=e>0?`translateX(${t}%)`:`translateX(-100%)`}return(0,y.jsxs)(A,{className:l(_.root,r),ownerState:m,role:`progressbar`,...b,ref:t,...p,children:[d===`buffer`?(0,y.jsx)(j,{className:_.dashed,ownerState:m}):null,(0,y.jsx)(M,{className:_.bar1,ownerState:m,style:x.bar1}),d===`determinate`?null:(0,y.jsx)(N,{className:_.bar2,ownerState:m,style:x.bar2})]})});export{P as t};