import{r as z}from"./styles.internal.CyE2up9L.js";import{B,C as O,E as M,a4 as N,j as u,z as I,U as g,G as q,H as f,J as b,ab as P,ac as x,V as s}from"./client.CvRaOlfh.js";function A(a){return B("MuiLinearProgress",a)}O("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]);const y=4,v=x`
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
`,U=typeof v!="string"?P`
        animation: ${v} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,C=x`
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
`,T=typeof C!="string"?P`
        animation: ${C} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,h=x`
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
`,D=typeof h!="string"?P`
        animation: ${h} 3s infinite linear;
      `:null,w=a=>{const{classes:r,variant:t,color:o}=a,d={root:["root",`color${g(o)}`,t],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",t==="buffer"&&`color${g(o)}`]};return q(d,A,r)},k=(a,r)=>a.vars?a.vars.palette.LinearProgress[`${r}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[r].main,.62):a.darken(a.palette[r].main,.5),E=f("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,r)=>{const{ownerState:t}=a;return[r.root,r[`color${g(t.color)}`],r[t.variant]]}})(b(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(s()).map(([r])=>({props:{color:r},style:{backgroundColor:k(a,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),K=f("span",{name:"MuiLinearProgress",slot:"Dashed"})(b(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(s()).map(([r])=>{const t=k(a,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`}}})]})),D||{animation:`${h} 3s infinite linear`}),V=f("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,r)=>[r.bar,r.bar1]})(b(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(s()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${y}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${y}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:U||{animation:`${v} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),X=f("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,r)=>[r.bar,r.bar2]})(b(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(a.palette).filter(s()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(s()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:k(a,r),transition:`transform .${y}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:T||{animation:`${C} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),H=z.forwardRef(function(r,t){const o=M({props:r,name:"MuiLinearProgress"}),{className:d,color:j="primary",value:m,valueBuffer:L,variant:i="indeterminate",...R}=o,n={...o,color:j,variant:i},l=w(n),$=N(),p={},c={bar1:{},bar2:{}};if((i==="determinate"||i==="buffer")&&m!==void 0){p["aria-valuenow"]=Math.round(m),p["aria-valuemin"]=0,p["aria-valuemax"]=100;let e=m-100;$&&(e=-e),c.bar1.transform=`translateX(${e}%)`}if(i==="buffer"&&L!==void 0){let e=(L||0)-100;$&&(e=-e),c.bar2.transform=`translateX(${e}%)`}return u.jsxs(E,{className:I(l.root,d),ownerState:n,role:"progressbar",...p,ref:t,...R,children:[i==="buffer"?u.jsx(K,{className:l.dashed,ownerState:n}):null,u.jsx(V,{className:l.bar1,ownerState:n,style:c.bar1}),i==="determinate"?null:u.jsx(X,{className:l.bar2,ownerState:n,style:c.bar2})]})});export{H as L};
