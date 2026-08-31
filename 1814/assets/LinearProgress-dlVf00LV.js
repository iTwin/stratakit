import{Z as M,et as N,t as I}from"./jsx-runtime-CvPTumEY.js";import{b as A,d as T,n as b,r as d,t as U,x as D,y as X}from"./DefaultPropsProvider-DZ2m2oiU.js";import{n as L,r as $}from"./emotion-react.browser.esm-DAePtcFO.js";import{P as w}from"./Backdrop-CIhleWlv.js";import{t as p}from"./createSimplePaletteValueFilter-CEYn_V7b.js";import{t as P}from"./capitalize-D8_wyKZu.js";var K=N(M(),1);function S(a){return A("MuiLinearProgress",a)}var ir=X("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]),m=I(),C=4,x=$`
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
`,E=typeof x!="string"?L`
        animation: ${x} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,h=$`
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
`,F=typeof h!="string"?L`
        animation: ${h} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,k=$`
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
`,V=typeof k!="string"?L`
        animation: ${k} 3s infinite linear;
      `:null,Z=a=>{const{classes:r,variant:e,color:o}=a,g={root:["root",`color${P(o)}`,e],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",e==="buffer"&&`color${P(o)}`]};return T(g,S,r)},j=(a,r)=>a.vars?a.vars.palette.LinearProgress[`${r}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[r].main,.62):a.darken(a.palette[r].main,.5),G=d("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,r)=>{const{ownerState:e}=a;return[r.root,r[`color${P(e.color)}`],r[e.variant]]}})(b(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:j(a,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),H=d("span",{name:"MuiLinearProgress",slot:"Dashed"})(b(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(p()).map(([r])=>{const e=j(a,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${e} 0%, ${e} 16%, transparent 42%)`}}})]})),V||{animation:`${k} 3s infinite linear`}),J=d("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,r)=>[r.bar,r.bar1]})(b(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${C}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${C}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:E||{animation:`${x} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),Q=d("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,r)=>[r.bar,r.bar2]})(b(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:j(a,r),transition:`transform .${C}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:F||{animation:`${h} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),or=K.forwardRef(function(r,e){const o=U({props:r,name:"MuiLinearProgress"}),{className:g,color:O="primary",max:q,min:z,value:v,valueBuffer:R,variant:i="indeterminate",...B}=o,n={...o,color:O,variant:i},s=z??0,y=q??100,u=Z(n),_=w(),f={},c={bar1:{},bar2:{}};if((i==="determinate"||i==="buffer")&&v!==void 0){const l=y-s;let t=(v-s)/l*100-100;_&&(t=-t),c.bar1.transform=l>0?`translateX(${t}%)`:"translateX(-100%)",f["aria-valuenow"]=v,f["aria-valuemin"]=s,f["aria-valuemax"]=y}if(i==="buffer"&&R!==void 0){const l=y-s;let t=(R-s)/l*100-100;_&&(t=-t),c.bar2.transform=l>0?`translateX(${t}%)`:"translateX(-100%)"}return(0,m.jsxs)(G,{className:D(u.root,g),ownerState:n,role:"progressbar",...f,ref:e,...B,children:[i==="buffer"?(0,m.jsx)(H,{className:u.dashed,ownerState:n}):null,(0,m.jsx)(J,{className:u.bar1,ownerState:n,style:c.bar1}),i==="determinate"?null:(0,m.jsx)(Q,{className:u.bar2,ownerState:n,style:c.bar2})]})});export{or as t};
