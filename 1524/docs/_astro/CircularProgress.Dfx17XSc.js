import{r as U}from"./styles.internal.CaJWceVp.js";import{B as z,C as A,j as l,z as E,N as D,A as B,_ as M,$ as j}from"./_utils.C5jgFUCE.js";import{u as I,s as m,m as v}from"./DefaultPropsProvider.VwCbtsv0.js";import{c as K}from"./createSimplePaletteValueFilter.bm0fmN_7.js";function O(r){return z("MuiCircularProgress",r)}A("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","track","circle","circleDisableShrink"]);const e=44,x=M`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,h=M`
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
`,V=typeof x!="string"?j`
        animation: ${x} 1.4s linear infinite;
      `:null,W=typeof h!="string"?j`
        animation: ${h} 1.4s ease-in-out infinite;
      `:null,G=r=>{const{classes:s,variant:t,color:o,disableShrink:p}=r,u={root:["root",t,`color${D(o)}`],svg:["svg"],track:["track"],circle:["circle",p&&"circleDisableShrink"]};return B(u,O,s)},Z=m("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,s)=>{const{ownerState:t}=r;return[s.root,s[t.variant],s[`color${D(t.color)}`]]}})(v(({theme:r})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("transform")}},{props:{variant:"indeterminate"},style:V||{animation:`${x} 1.4s linear infinite`}},...Object.entries(r.palette).filter(K()).map(([s])=>({props:{color:s},style:{color:(r.vars||r).palette[s].main}}))]}))),_=m("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),q=m("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,s)=>{const{ownerState:t}=r;return[s.circle,t.disableShrink&&s.circleDisableShrink]}})(v(({theme:r})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:s})=>s.variant==="indeterminate"&&!s.disableShrink,style:W||{animation:`${h} 1.4s ease-in-out infinite`}}]}))),H=m("circle",{name:"MuiCircularProgress",slot:"Track"})(v(({theme:r})=>({stroke:"currentColor",opacity:(r.vars||r).palette.action.activatedOpacity}))),Y=U.forwardRef(function(s,t){const o=I({props:s,name:"MuiCircularProgress"}),{className:p,color:u="primary",disableShrink:R=!1,enableTrackSlot:C=!1,min:w,max:N,size:d=40,style:F,thickness:a=3.6,value:f=o.min??0,variant:P="indeterminate",...T}=o,S=w??0,k=N??100,i={...o,color:u,disableShrink:R,size:d,thickness:a,value:f,variant:P,enableTrackSlot:C},n=G(i),y={},$={},c={};if(P==="determinate"){const g=2*Math.PI*((e-a)/2),b=k-S;y.strokeDasharray=g.toFixed(3),y.strokeDashoffset=b>0?`${((k-f)/b*g).toFixed(3)}px`:`${g.toFixed(3)}px`,$.transform="rotate(-90deg)",c["aria-valuenow"]=f,c["aria-valuemin"]=S,c["aria-valuemax"]=k}return l.jsx(Z,{className:E(n.root,p),style:{width:d,height:d,...$,...F},ownerState:i,ref:t,role:"progressbar",...c,...T,children:l.jsxs(_,{className:n.svg,ownerState:i,viewBox:`${e/2} ${e/2} ${e} ${e}`,children:[C?l.jsx(H,{className:n.track,ownerState:i,cx:e,cy:e,r:(e-a)/2,fill:"none",strokeWidth:a,"aria-hidden":"true"}):null,l.jsx(q,{className:n.circle,style:y,ownerState:i,cx:e,cy:e,r:(e-a)/2,fill:"none",strokeWidth:a})]})})});export{Y as C};
