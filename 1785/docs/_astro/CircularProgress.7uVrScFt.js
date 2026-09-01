import{i as e,n as t,t as n}from"./jsx-runtime.Cltr0gcK.js";import{b as r,d as i,n as a,r as o,t as s,x as c,y as l}from"./DefaultPropsProvider.BFMl2K7d.js";import{n as u,r as d}from"./emotion-react.browser.esm.BjTv-w6J.js";import{t as f}from"./createSimplePaletteValueFilter.Bt9IjErz.js";import{t as p}from"./capitalize.YMCGjbUQ.js";var m=e(t(),1);function h(e){return r(`MuiCircularProgress`,e)}l(`MuiCircularProgress`,[`root`,`determinate`,`indeterminate`,`colorPrimary`,`colorSecondary`,`svg`,`track`,`circle`,`circleDisableShrink`]);var g=n(),_=44,v=d`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,y=d`
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
`,b=typeof v==`string`?null:u`
        animation: ${v} 1.4s linear infinite;
      `,x=typeof y==`string`?null:u`
        animation: ${y} 1.4s ease-in-out infinite;
      `,S=e=>{let{classes:t,variant:n,color:r,disableShrink:a}=e,o={root:[`root`,n,`color${p(r)}`],svg:[`svg`],track:[`track`],circle:[`circle`,a&&`circleDisableShrink`]};return i(o,h,t)},C=o(`span`,{name:`MuiCircularProgress`,slot:`Root`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.root,t[n.variant],t[`color${p(n.color)}`]]}})(a(({theme:e})=>({display:`inline-block`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`transform`)}},{props:{variant:`indeterminate`},style:b||{animation:`${v} 1.4s linear infinite`}},...Object.entries(e.palette).filter(f()).map(([t])=>({props:{color:t},style:{color:(e.vars||e).palette[t].main}}))]}))),w=o(`svg`,{name:`MuiCircularProgress`,slot:`Svg`})({display:`block`}),T=o(`circle`,{name:`MuiCircularProgress`,slot:`Circle`,overridesResolver:(e,t)=>{let{ownerState:n}=e;return[t.circle,n.disableShrink&&t.circleDisableShrink]}})(a(({theme:e})=>({stroke:`currentColor`,variants:[{props:{variant:`determinate`},style:{transition:e.transitions.create(`stroke-dashoffset`)}},{props:{variant:`indeterminate`},style:{strokeDasharray:`80px, 200px`,strokeDashoffset:0}},{props:({ownerState:e})=>e.variant===`indeterminate`&&!e.disableShrink,style:x||{animation:`${y} 1.4s ease-in-out infinite`}}]}))),E=o(`circle`,{name:`MuiCircularProgress`,slot:`Track`})(a(({theme:e})=>({stroke:`currentColor`,opacity:(e.vars||e).palette.action.activatedOpacity}))),D=m.forwardRef(function(e,t){let n=s({props:e,name:`MuiCircularProgress`}),{className:r,color:i=`primary`,disableShrink:a=!1,enableTrackSlot:o=!1,min:l,max:u,size:d=40,style:f,thickness:p=3.6,value:m=n.min??0,variant:h=`indeterminate`,...v}=n,y=l??0,b=u??100,x={...n,color:i,disableShrink:a,size:d,thickness:p,value:m,variant:h,enableTrackSlot:o},D=S(x),O={},k={},A={};if(h===`determinate`){let e=2*Math.PI*((_-p)/2),t=b-y;O.strokeDasharray=e.toFixed(3),O.strokeDashoffset=t>0?`${((b-m)/t*e).toFixed(3)}px`:`${e.toFixed(3)}px`,k.transform=`rotate(-90deg)`,A[`aria-valuenow`]=m,A[`aria-valuemin`]=y,A[`aria-valuemax`]=b}return(0,g.jsx)(C,{className:c(D.root,r),style:{width:d,height:d,...k,...f},ownerState:x,ref:t,role:`progressbar`,...A,...v,children:(0,g.jsxs)(w,{className:D.svg,ownerState:x,viewBox:`${_/2} ${_/2} ${_} ${_}`,children:[o?(0,g.jsx)(E,{className:D.track,ownerState:x,cx:_,cy:_,r:(_-p)/2,fill:`none`,strokeWidth:p,"aria-hidden":`true`}):null,(0,g.jsx)(T,{className:D.circle,style:O,ownerState:x,cx:_,cy:_,r:(_-p)/2,fill:`none`,strokeWidth:p})]})})});export{D as t};