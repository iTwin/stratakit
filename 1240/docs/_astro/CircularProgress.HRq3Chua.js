import{r as R}from"./index.DIfZGIpv.js";import{Z as w,_ as N,$ as T,j as c,Y as U,ae as l,a0 as E,a1 as p,a3 as h,ai as $,aj as b,af as F}from"./ExamplePreview._fRr7SXG.js";function I(r){return w("MuiCircularProgress",r)}N("MuiCircularProgress",["root","determinate","indeterminate","colorPrimary","colorSecondary","svg","track","circle","circleDeterminate","circleIndeterminate","circleDisableShrink"]);const s=44,y=$`
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
`,g=$`
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
`,z=typeof y!="string"?b`
        animation: ${y} 1.4s linear infinite;
      `:null,A=typeof g!="string"?b`
        animation: ${g} 1.4s ease-in-out infinite;
      `:null,K=r=>{const{classes:e,variant:a,color:o,disableShrink:u}=r,m={root:["root",a,`color${l(o)}`],svg:["svg"],track:["track"],circle:["circle",`circle${l(a)}`,u&&"circleDisableShrink"]};return E(m,I,e)},O=p("span",{name:"MuiCircularProgress",slot:"Root",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.root,e[a.variant],e[`color${l(a.color)}`]]}})(h(({theme:r})=>({display:"inline-block",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("transform")}},{props:{variant:"indeterminate"},style:z||{animation:`${y} 1.4s linear infinite`}},...Object.entries(r.palette).filter(F()).map(([e])=>({props:{color:e},style:{color:(r.vars||r).palette[e].main}}))]}))),V=p("svg",{name:"MuiCircularProgress",slot:"Svg"})({display:"block"}),W=p("circle",{name:"MuiCircularProgress",slot:"Circle",overridesResolver:(r,e)=>{const{ownerState:a}=r;return[e.circle,e[`circle${l(a.variant)}`],a.disableShrink&&e.circleDisableShrink]}})(h(({theme:r})=>({stroke:"currentColor",variants:[{props:{variant:"determinate"},style:{transition:r.transitions.create("stroke-dashoffset")}},{props:{variant:"indeterminate"},style:{strokeDasharray:"80px, 200px",strokeDashoffset:0}},{props:({ownerState:e})=>e.variant==="indeterminate"&&!e.disableShrink,style:A||{animation:`${g} 1.4s ease-in-out infinite`}}]}))),Z=p("circle",{name:"MuiCircularProgress",slot:"Track"})(h(({theme:r})=>({stroke:"currentColor",opacity:(r.vars||r).palette.action.activatedOpacity}))),Y=R.forwardRef(function(e,a){const o=T({props:e,name:"MuiCircularProgress"}),{className:u,color:m="primary",disableShrink:D=!1,enableTrackSlot:v=!1,size:d=40,style:M,thickness:t=3.6,value:f=0,variant:x="indeterminate",...j}=o,i={...o,color:m,disableShrink:D,size:d,thickness:t,value:f,variant:x,enableTrackSlot:v},n=K(i),k={},C={},P={};if(x==="determinate"){const S=2*Math.PI*((s-t)/2);k.strokeDasharray=S.toFixed(3),P["aria-valuenow"]=Math.round(f),k.strokeDashoffset=`${((100-f)/100*S).toFixed(3)}px`,C.transform="rotate(-90deg)"}return c.jsx(O,{className:U(n.root,u),style:{width:d,height:d,...C,...M},ownerState:i,ref:a,role:"progressbar",...P,...j,children:c.jsxs(V,{className:n.svg,ownerState:i,viewBox:`${s/2} ${s/2} ${s} ${s}`,children:[v?c.jsx(Z,{className:n.track,ownerState:i,cx:s,cy:s,r:(s-t)/2,fill:"none",strokeWidth:t,"aria-hidden":"true"}):null,c.jsx(W,{className:n.circle,style:k,ownerState:i,cx:s,cy:s,r:(s-t)/2,fill:"none",strokeWidth:t})]})})});export{Y as C};
