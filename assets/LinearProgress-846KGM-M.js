import{r as M,j as b}from"./index-CwcbyBX9.js";import{g as q,i as A,l as T,c as U,j as P,b as D,s as m,o as d,p,d2 as L,d3 as $}from"./~utils-K1TKChDj.js";import{y as X}from"./Icon-CrpyIRUv.js";function w(a){return q("MuiLinearProgress",a)}A("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]);const x=4,C=$`
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
`,K=typeof C!="string"?L`
        animation: ${C} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
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
`,E=typeof h!="string"?L`
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
`,F=typeof k!="string"?L`
        animation: ${k} 3s infinite linear;
      `:null,S=a=>{const{classes:r,variant:t,color:i}=a,g={root:["root",`color${P(i)}`,t],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",t==="buffer"&&`color${P(i)}`]};return D(g,w,r)},j=(a,r)=>a.vars?a.vars.palette.LinearProgress[`${r}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[r].main,.62):a.darken(a.palette[r].main,.5),V=m("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,r)=>{const{ownerState:t}=a;return[r.root,r[`color${P(t.color)}`],r[t.variant]]}})(d(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:j(a,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),_=m("span",{name:"MuiLinearProgress",slot:"Dashed"})(d(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(p()).map(([r])=>{const t=j(a,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`}}})]})),F||{animation:`${k} 3s infinite linear`}),G=m("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,r)=>[r.bar,r.bar1]})(d(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${x}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${x}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:K||{animation:`${C} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),H=m("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,r)=>[r.bar,r.bar2]})(d(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:j(a,r),transition:`transform .${x}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:E||{animation:`${h} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),Y=M.forwardRef(function(r,t){const i=T({props:r,name:"MuiLinearProgress"}),{className:g,color:z="primary",max:B,min:N,value:y,valueBuffer:R,variant:o="indeterminate",...I}=i,n={...i,color:z,variant:o},s=N??0,v=B??100,c=S(n),O=X(),u={},f={bar1:{},bar2:{}};if((o==="determinate"||o==="buffer")&&y!==void 0){const l=v-s;let e=(y-s)/l*100-100;O&&(e=-e),f.bar1.transform=l>0?`translateX(${e}%)`:"translateX(-100%)",u["aria-valuenow"]=y,u["aria-valuemin"]=s,u["aria-valuemax"]=v}if(o==="buffer"&&R!==void 0){const l=v-s;let e=(R-s)/l*100-100;O&&(e=-e),f.bar2.transform=l>0?`translateX(${e}%)`:"translateX(-100%)"}return b.jsxs(V,{className:U(c.root,g),ownerState:n,role:"progressbar",...u,ref:t,...I,children:[o==="buffer"?b.jsx(_,{className:c.dashed,ownerState:n}):null,b.jsx(G,{className:c.bar1,ownerState:n,style:f.bar1}),o==="determinate"?null:b.jsx(H,{className:c.bar2,ownerState:n,style:f.bar2})]})});export{Y as L};
