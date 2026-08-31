import{Z as T,et as U,t as q}from"./jsx-runtime-CvPTumEY.js";import{b as z,d as A,n as h,r as m,t as E,x as I,y as K}from"./DefaultPropsProvider-DZ2m2oiU.js";import{n as D,r as M}from"./emotion-react.browser.esm-DAePtcFO.js";import{t as O}from"./createSimplePaletteValueFilter-CEYn_V7b.js";import{t as _}from"./capitalize-D8_wyKZu.js";var V=U(T(),1);function W(r){return z("MuiCircularProgress",r)}var sr=K("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","track","circle","circleDisableShrink"]),c=q(),a=44,g=M`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,x=M`
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
`,Z=typeof g!="string"?D`
        animation: ${g} 1.4s linear infinite;
      `:null,B=typeof x!="string"?D`
        animation: ${x} 1.4s ease-in-out infinite;
      `:null,G=r=>{const{classes:e,variant:s,color:i,disableShrink:p}=r,u={root:["root",s,`color${_(i)}`],svg:["svg"],track:["track"],circle:["circle",p&&"circleDisableShrink"]};return A(u,W,e)},H=m("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.root,e[s.variant],e[`color${_(s.color)}`]]}})(h(({theme:r})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("transform")}},{props:{variant:"indeterminate"},style:Z||{animation:`${g} 1.4s linear infinite`}},...Object.entries(r.palette).filter(O()).map(([e])=>({props:{color:e},style:{color:(r.vars||r).palette[e].main}}))]}))),J=m("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),L=m("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:s}=r;return[e.circle,s.disableShrink&&e.circleDisableShrink]}})(h(({theme:r})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink,style:B||{animation:`${x} 1.4s ease-in-out infinite`}}]}))),Q=m("circle",{name:"MuiCircularProgress",slot:"Track"})(h(({theme:r})=>({stroke:"currentColor",opacity:(r.vars||r).palette.action.activatedOpacity}))),tr=V.forwardRef(function(e,s){const i=E({props:e,name:"MuiCircularProgress"}),{className:p,color:u="primary",disableShrink:j=!1,enableTrackSlot:C=!1,min:w,max:R,size:d=40,style:N,thickness:t=3.6,value:f=i.min??0,variant:P="indeterminate",...F}=i,S=w??0,v=R??100,o={...i,color:u,disableShrink:j,size:d,thickness:t,value:f,variant:P,enableTrackSlot:C},n=G(o),k={},b={},l={};if(P==="determinate"){const y=2*Math.PI*((a-t)/2),$=v-S;k.strokeDasharray=y.toFixed(3),k.strokeDashoffset=$>0?`${((v-f)/$*y).toFixed(3)}px`:`${y.toFixed(3)}px`,b.transform="rotate(-90deg)",l["aria-valuenow"]=f,l["aria-valuemin"]=S,l["aria-valuemax"]=v}return(0,c.jsx)(H,{className:I(n.root,p),style:{width:d,height:d,...b,...N},ownerState:o,ref:s,role:"progressbar",...l,...F,children:(0,c.jsxs)(J,{className:n.svg,ownerState:o,viewBox:`${a/2} ${a/2} ${a} ${a}`,children:[C?(0,c.jsx)(Q,{className:n.track,ownerState:o,cx:a,cy:a,r:(a-t)/2,fill:"none",strokeWidth:t,"aria-hidden":"true"}):null,(0,c.jsx)(L,{className:n.circle,style:k,ownerState:o,cx:a,cy:a,r:(a-t)/2,fill:"none",strokeWidth:t})]})})});export{tr as t};
