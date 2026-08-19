import{H as M,G as q,r as A,B as D,a1 as T,j as b,C as U,Q as C,D as X,E as d,F as m,ad as p,aj as L,ak as $}from"./_utils.Dmz5yhCI.js";function w(a){return M("MuiLinearProgress",a)}q("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","bar","bar1","bar2"]);const P=4,x=$`
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
`,K=typeof h!="string"?L`
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
      `:null,G=a=>{const{classes:r,variant:t,color:i}=a,g={root:["root",`color${C(i)}`,t],dashed:["dashed"],bar1:["bar","bar1"],bar2:["bar","bar2",t==="buffer"&&`color${C(i)}`]};return X(g,w,r)},j=(a,r)=>a.vars?a.vars.palette.LinearProgress[`${r}Bg`]:a.palette.mode==="light"?a.lighten(a.palette[r].main,.62):a.darken(a.palette[r].main,.5),H=d("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(a,r)=>{const{ownerState:t}=a;return[r.root,r[`color${C(t.color)}`],r[t.variant]]}})(m(({theme:a})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:j(a,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),Q=d("span",{name:"MuiLinearProgress",slot:"Dashed"})(m(({theme:a})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(a.palette).filter(p()).map(([r])=>{const t=j(a,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${t} 0%, ${t} 16%, transparent 42%)`}}})]})),F||{animation:`${k} 3s infinite linear`}),S=d("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(a,r)=>[r.bar,r.bar1]})(m(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{backgroundColor:(a.vars||a).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${P}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${P}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:E||{animation:`${x} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),V=d("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(a,r)=>[r.bar,r.bar2]})(m(({theme:a})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(a.vars||a).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(a.palette).filter(p()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:j(a,r),transition:`transform .${P}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:K||{animation:`${h} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),J=A.forwardRef(function(r,t){const i=D({props:r,name:"MuiLinearProgress"}),{className:g,color:O="primary",max:z,min:N,value:y,valueBuffer:R,variant:n="indeterminate",...I}=i,o={...i,color:O,variant:n},s=N??0,v=z??100,c=G(o),B=T(),u={},f={bar1:{},bar2:{}};if((n==="determinate"||n==="buffer")&&y!==void 0){const l=v-s;let e=(y-s)/l*100-100;B&&(e=-e),f.bar1.transform=l>0?`translateX(${e}%)`:"translateX(-100%)",u["aria-valuenow"]=y,u["aria-valuemin"]=s,u["aria-valuemax"]=v}if(n==="buffer"&&R!==void 0){const l=v-s;let e=(R-s)/l*100-100;B&&(e=-e),f.bar2.transform=l>0?`translateX(${e}%)`:"translateX(-100%)"}return b.jsxs(H,{className:U(c.root,g),ownerState:o,role:"progressbar",...u,ref:t,...I,children:[n==="buffer"?b.jsx(Q,{className:c.dashed,ownerState:o}):null,b.jsx(S,{className:c.bar1,ownerState:o,style:f.bar1}),n==="determinate"?null:b.jsx(V,{className:c.bar2,ownerState:o,style:f.bar2})]})});export{J as L};
