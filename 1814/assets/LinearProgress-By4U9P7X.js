import{Z as N,et as T,t as A}from"./jsx-runtime-CvPTumEY.js";import{C as S,S as U,m as D,n as u,r as g,t as X,w}from"./DefaultPropsProvider-6XumKMvl.js";import{n as h,r as j}from"./emotion-react.browser.esm-ClMZgtk2.js";import{O as E}from"./Backdrop-Bm4Q1zdX.js";import{t as C}from"./capitalize-B3JBBr2r.js";import{i as p,t as M}from"./utils-BHnlY1Bb.js";import{t as f}from"./createSimplePaletteValueFilter-CEYn_V7b.js";var K=T(N(),1);function Y(a){return S("MuiLinearProgress",a)}var lr=U("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]),b=A(),x=4,F={},k=j`
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
`,V=typeof k!="string"?h`
        animation: ${k} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,L=j`
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
`,Z=typeof L!="string"?h`
        animation: ${L} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,$=j`
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
`,G=typeof $!="string"?h`
        animation: ${$} 3s infinite linear;
      `:null,H=a=>{const{classes:e,variant:r,color:n}=a,v={root:["root",`color${C(n)}`,r],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",r==="buffer"&&`color${C(n)}`]};return D(v,Y,e)},R=(a,e)=>a.vars?a.vars.palette.LinearProgress[`${e}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[e].main,.62):a.darken(a.palette[e].main,.5),J=g("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,e)=>{const{ownerState:r}=a;return[e.root,e[`color${C(r.color)}`],e[r.variant]]}})(u(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(f()).map(([e])=>({props:{color:e},style:{backgroundColor:R(a,e)}})),{props:({ownerState:e})=>e.color==="inherit"&&e.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),Q=g("span",{name:"MuiLinearProgress",slot:"Dashed"})(u(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(f()).map(([e])=>{const r=R(a,e);return{props:{color:e},style:{backgroundImage:`radial-gradient(${r} 0%, ${r} 16%, transparent 42%)`}}})]})),G||{animation:`${$} 3s infinite linear`},u(({theme:a})=>M(a,{animation:"none"})||F)),W=g("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,e)=>[e.bar,e.bar1]})(u(({theme:a})=>{const e=M(a,{animation:"none",left:"30%",right:"auto",width:"40%"});return{width:"100%",position:"absolute",left:0,bottom:0,top:0,...p(a,"transform",{duration:"0.2s",easing:"linear"}),transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(f()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{...p(a,"transform",{duration:`.${x}s`,easing:"linear"})}},{props:{variant:"buffer"},style:{zIndex:1,...p(a,"transform",{duration:`.${x}s`,easing:"linear"})}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:V||{animation:`${k} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}},...e?[{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:e}]:[]]}})),rr=g("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,e)=>[e.bar,e.bar2]})(u(({theme:a})=>{const e=M(a,{animation:"none",display:"none"});return{width:"100%",position:"absolute",left:0,bottom:0,top:0,...p(a,"transform",{duration:"0.2s",easing:"linear"}),transformOrigin:"left",variants:[...Object.entries(a.palette).filter(f()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(f()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:R(a,r),...p(a,"transform",{duration:`.${x}s`,easing:"linear"})}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:Z||{animation:`${L} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}},...e?[{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:e}]:[]]}})),pr=K.forwardRef(function(e,r){const n=X({props:e,name:"MuiLinearProgress"}),{className:v,color:O="primary",max:I,min:z,value:y,valueBuffer:_,variant:i="indeterminate",...B}=n,o={...n,color:O,variant:i},s=z??0,P=I??100,c=H(o),q=E(),d={},m={bar1:{},bar2:{}};if((i==="determinate"||i==="buffer")&&y!==void 0){const l=P-s;let t=(y-s)/l*100-100;q&&(t=-t),m.bar1.transform=l>0?`translateX(${t}%)`:"translateX(-100%)",d["aria-valuenow"]=y,d["aria-valuemin"]=s,d["aria-valuemax"]=P}if(i==="buffer"&&_!==void 0){const l=P-s;let t=(_-s)/l*100-100;q&&(t=-t),m.bar2.transform=l>0?`translateX(${t}%)`:"translateX(-100%)"}return(0,b.jsxs)(J,{className:w(c.root,v),ownerState:o,role:"progressbar",...d,ref:r,...B,children:[i==="buffer"?(0,b.jsx)(Q,{className:c.dashed,ownerState:o}):null,(0,b.jsx)(W,{className:c.bar1,ownerState:o,style:m.bar1}),i==="determinate"?null:(0,b.jsx)(rr,{className:c.bar2,ownerState:o,style:m.bar2})]})});export{pr as t};
