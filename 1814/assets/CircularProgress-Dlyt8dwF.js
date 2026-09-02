import{Z as U,et as q,t as z}from"./jsx-runtime-CvPTumEY.js";import{C as E,S as I,m as K,n as h,r as m,t as O,w as V}from"./DefaultPropsProvider-6XumKMvl.js";import{n as $,r as D}from"./emotion-react.browser.esm-ClMZgtk2.js";import{t as _}from"./capitalize-B3JBBr2r.js";import{i as j,t as R}from"./utils-BHnlY1Bb.js";import{t as W}from"./createSimplePaletteValueFilter-CEYn_V7b.js";var Z=q(U(),1);function B(r){return E("MuiCircularProgress",r)}var or=I("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","track","circle","circleDisableShrink"]),c=z(),s=44,k=D`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,x=D`
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
`,G=typeof k!="string"?$`
        animation: ${k} 1.4s linear infinite;
      `:null,H=typeof x!="string"?$`
        animation: ${x} 1.4s ease-in-out infinite;
      `:null,J=r=>{const{classes:a,variant:e,color:i,disableShrink:p}=r,u={root:["root",e,`color${_(i)}`],svg:["svg"],track:["track"],circle:["circle",p&&"circleDisableShrink"]};return K(u,B,a)},L=m("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,a)=>{const{ownerState:e}=r;return[a.root,a[e.variant],a[`color${_(e.color)}`]]}})(h(({theme:r})=>{const a=R(r,{animation:"none"});return{display:"inline-block",variants:[{props:{variant:"determinate"},style:{...j(r,"transform")}},{props:{variant:"indeterminate"},style:G||{animation:`${k} 1.4s linear infinite`}},...a?[{props:{variant:"indeterminate"},style:a}]:[],...Object.entries(r.palette).filter(W()).map(([e])=>({props:{color:e},style:{color:(r.vars||r).palette[e].main}}))]}})),Q=m("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),X=m("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,a)=>{const{ownerState:e}=r;return[a.circle,e.disableShrink&&a.circleDisableShrink]}})(h(({theme:r})=>{const a=R(r,{animation:"none"});return{stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{...j(r,"stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink,style:H||{animation:`${x} 1.4s ease-in-out infinite`}},...a?[{props:({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink,style:a}]:[]]}})),Y=m("circle",{name:"MuiCircularProgress",slot:"Track"})(h(({theme:r})=>({stroke:"currentColor",opacity:(r.vars||r).palette.action.activatedOpacity}))),nr=Z.forwardRef(function(a,e){const i=O({props:a,name:"MuiCircularProgress"}),{className:p,color:u="primary",disableShrink:w=!1,enableTrackSlot:C=!1,min:N,max:T,size:d=40,style:A,thickness:t=3.6,value:f=i.min??0,variant:S="indeterminate",...F}=i,P=N??0,v=T??100,o={...i,color:u,disableShrink:w,size:d,thickness:t,value:f,variant:S,enableTrackSlot:C},n=J(o),y={},b={},l={};if(S==="determinate"){const g=2*Math.PI*((s-t)/2),M=v-P;y.strokeDasharray=g.toFixed(3),y.strokeDashoffset=M>0?`${((v-f)/M*g).toFixed(3)}px`:`${g.toFixed(3)}px`,b.transform="rotate(-90deg)",l["aria-valuenow"]=f,l["aria-valuemin"]=P,l["aria-valuemax"]=v}return(0,c.jsx)(L,{className:V(n.root,p),style:{width:d,height:d,...b,...A},ownerState:o,ref:e,role:"progressbar",...l,...F,children:(0,c.jsxs)(Q,{className:n.svg,ownerState:o,viewBox:`${s/2} ${s/2} ${s} ${s}`,children:[C?(0,c.jsx)(Y,{className:n.track,ownerState:o,cx:s,cy:s,r:(s-t)/2,fill:"none",strokeWidth:t,"aria-hidden":"true"}):null,(0,c.jsx)(X,{className:n.circle,style:y,ownerState:o,cx:s,cy:s,r:(s-t)/2,fill:"none",strokeWidth:t})]})})});export{nr as t};
