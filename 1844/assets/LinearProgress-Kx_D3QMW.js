import{r as T,j as m}from"./index-DWXEng7z.js";import{g as A,j as U,n as D,a as E,k as x,e as S,s as g,p as c,w as u,de as h,q as p,df as j,dg as R}from"./~utils-B111J5jY.js";import{x as X}from"./Icon-dt_-NPL1.js";function w(a){return A("MuiLinearProgress",a)}U("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]);const C=4,K={},k=R`
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
`,Y=typeof k!="string"?j`
        animation: ${k} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,L=R`
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
`,_=typeof L!="string"?j`
        animation: ${L} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,$=R`
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
`,F=typeof $!="string"?j`
        animation: ${$} 3s infinite linear;
      `:null,V=a=>{const{classes:t,variant:r,color:i}=a,y={root:["root",`color${x(i)}`,r],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",r==="buffer"&&`color${x(i)}`]};return S(y,w,t)},M=(a,t)=>a.vars?a.vars.palette.LinearProgress[`${t}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[t].main,.62):a.darken(a.palette[t].main,.5),G=g("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:r}=a;return[t.root,t[`color${x(r.color)}`],t[r.variant]]}})(c(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(u()).map(([t])=>({props:{color:t},style:{backgroundColor:M(a,t)}})),{props:({ownerState:t})=>t.color==="inherit"&&t.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),H=g("span",{name:"MuiLinearProgress",slot:"Dashed"})(c(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(u()).map(([t])=>{const r=M(a,t);return{props:{color:t},style:{backgroundImage:`radial-gradient(${r} 0%, ${r} 16%, transparent 42%)`}}})]})),F||{animation:`${$} 3s infinite linear`},c(({theme:a})=>h(a,{animation:"none"})||K)),J=g("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,t)=>[t.bar,t.bar1]})(c(({theme:a})=>{const t=h(a,{animation:"none",left:"30%",right:"auto",width:"40%"});return{width:"100%",position:"absolute",left:0,bottom:0,top:0,...p(a,"transform",{duration:"0.2s",easing:"linear"}),transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(u()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{...p(a,"transform",{duration:`.${C}s`,easing:"linear"})}},{props:{variant:"buffer"},style:{zIndex:1,...p(a,"transform",{duration:`.${C}s`,easing:"linear"})}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:Y||{animation:`${k} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}},...t?[{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:t}]:[]]}})),Q=g("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,t)=>[t.bar,t.bar2]})(c(({theme:a})=>{const t=h(a,{animation:"none",display:"none"});return{width:"100%",position:"absolute",left:0,bottom:0,top:0,...p(a,"transform",{duration:"0.2s",easing:"linear"}),transformOrigin:"left",variants:[...Object.entries(a.palette).filter(u()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(u()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:M(a,r),...p(a,"transform",{duration:`.${C}s`,easing:"linear"})}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:_||{animation:`${L} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}},...t?[{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:t}]:[]]}})),ar=T.forwardRef(function(t,r){const i=D({props:t,name:"MuiLinearProgress"}),{className:y,color:O="primary",max:z,min:B,value:v,valueBuffer:q,variant:n="indeterminate",...N}=i,o={...i,color:O,variant:n},s=B??0,P=z??100,d=V(o),I=X(),f={},b={bar1:{},bar2:{}};if((n==="determinate"||n==="buffer")&&v!==void 0){const l=P-s;let e=(v-s)/l*100-100;I&&(e=-e),b.bar1.transform=l>0?`translateX(${e}%)`:"translateX(-100%)",f["aria-valuenow"]=v,f["aria-valuemin"]=s,f["aria-valuemax"]=P}if(n==="buffer"&&q!==void 0){const l=P-s;let e=(q-s)/l*100-100;I&&(e=-e),b.bar2.transform=l>0?`translateX(${e}%)`:"translateX(-100%)"}return m.jsxs(G,{className:E(d.root,y),ownerState:o,role:"progressbar",...f,ref:r,...N,children:[n==="buffer"?m.jsx(H,{className:d.dashed,ownerState:o}):null,m.jsx(J,{className:d.bar1,ownerState:o,style:b.bar1}),n==="determinate"?null:m.jsx(Q,{className:d.bar2,ownerState:o,style:b.bar2})]})});export{ar as L};
