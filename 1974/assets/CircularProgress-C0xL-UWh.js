import{X as e,q as t,t as n}from"./jsx-runtime-GiK9V3Xy.js";import{A as r,F as i,N as a,P as o,n as s,r as c,t as l}from"./DefaultPropsProvider-DXkyNpHp.js";import{n as u,r as d}from"./emotion-react.browser.esm-4x7zaYQm.js";import{t as f}from"./capitalize-DVsaTOSb.js";import{i as p,t as m}from"./utils-s_LoXvoN.js";import{t as h}from"./createSimplePaletteValueFilter-Bt9IjErz.js";var g=e(t(),1);function _(e){return o(`MuiCircularProgress`,e)}a(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`]);var v=n(),y=44,b=d`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,x=d`
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }

  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }

  100% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: -126px;
  }
`,S=typeof b==`string`?null:u`
        animation: ${b} 1.4s linear infinite;
      `,C=typeof x==`string`?null:u`
        animation: ${x} 1.4s ease-in-out infinite;
      `,w=e=>{let{classes:t,variant:n,color:i,disableShrink:a}=e,o={root:[`root`,n,`color${f(i)}`],svg:[`svg`],track:[`track`],circle:[`circle`,a&&`circleDisableShrink`]};return r(o,_,t)},T=c(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${f(n.color)}`]]}})(s(({theme:e})=>{let t=m(e,{animation:`none`});return{display:`inline-block`,variants:[{props:{variant:`determinate`},style:{...p(e,`transform`)}},{props:{variant:`indeterminate`},style:S||{animation:`${b} 1.4s linear infinite`}},...t?[{props:{variant:`indeterminate`},style:t}]:[],...Object.entries(e.palette).filter(h()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}})),E=c(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),D=c(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(s(({theme:e})=>{let t=m(e,{animation:`none`});return{stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{...p(e,`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:C||{animation:`${x} 1.4s ease-in-out infinite`}},...t?[{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:t}]:[]]}})),O=c(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(s(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),k=g.forwardRef(function(e,t){let n=l({props:e,name:`MuiCircularProgress`}),{className:r,color:a=`primary`,disableShrink:o=!1,enableTrackSlot:s=!1,min:c,max:u,size:d=40,style:f,thickness:p=3.6,value:m=n.min??0,variant:h=`indeterminate`,...g}=n,_=c??0,b=u??100,x={...n,color:a,disableShrink:o,size:d,thickness:p,value:m,variant:h,enableTrackSlot:s},S=w(x),C={},k={},A={};if(h===`determinate`){let e=2*Math.PI*((y-p)/2),t=b-_;C.strokeDasharray=e.toFixed(3),C.strokeDashoffset=t>0?`${((b-m)/t*e).toFixed(3)}px`:`${e.toFixed(3)}px`,k.transform=`rotate(-90deg)`,A[`aria-valuenow`]=m,A[`aria-valuemin`]=_,A[`aria-valuemax`]=b}return(0,v.jsx)(T,{className:i(S.root,r),style:{width:d,height:d,...k,...f},ownerState:x,ref:t,role:`progressbar`,...A,...g,children:(0,v.jsxs)(E,{className:S.svg,ownerState:x,viewBox:`${y/2} ${y/2} ${y} ${y}`,children:[s?(0,v.jsx)(O,{className:S.track,ownerState:x,cx:y,cy:y,r:(y-p)/2,fill:`none`,strokeWidth:p,"aria-hidden":`true`}):null,(0,v.jsx)(D,{className:S.circle,style:C,ownerState:x,cx:y,cy:y,r:(y-p)/2,fill:`none`,strokeWidth:p})]})})});export{k as t};