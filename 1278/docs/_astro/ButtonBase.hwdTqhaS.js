import{r as o}from"./index.DIfZGIpv.js";import{aw as Rt,H as T,j as N,K as et,G as yt,ax as Tt,P as Q,J as xt,A as v,W,Y as tt,L as Ct}from"./~utils.DuFmrtZY.js";import{u as st,s as Z}from"./DefaultPropsProvider.BDBmQhs1.js";class q{static create(){return new q}static use(){const e=Rt(q.create).current,[s,l]=o.useState(!1);return e.shouldMount=s,e.setShouldMount=l,o.useEffect(e.mountEffect,[s]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=Bt(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}}function Pt(){return q.use()}function Bt(){let n,e;const s=new Promise((l,p)=>{n=l,e=p});return s.resolve=n,s.reject=e,s}function kt(n){const{className:e,classes:s,pulsate:l=!1,rippleX:p,rippleY:u,rippleSize:d,in:S,onExited:m,timeout:c}=n,[M,r]=o.useState(!1),b=T(e,s.ripple,s.rippleVisible,l&&s.ripplePulsate),B={width:d,height:d,top:-(d/2)+u,left:-(d/2)+p},f=T(s.child,M&&s.childLeaving,l&&s.childPulsate);return!S&&!M&&r(!0),o.useEffect(()=>{if(!S&&m!=null){const L=setTimeout(m,c);return()=>{clearTimeout(L)}}},[m,S,c]),N.jsx("span",{className:b,style:B,children:N.jsx("span",{className:f})})}const h=et("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),J=550,wt=80,Et=Q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,St=Q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Lt=Q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Dt=Z("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Vt=Z(kt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${h.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${Et};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  &.${h.ripplePulsate} {
    animation-duration: ${({theme:n})=>n.transitions.duration.shorter}ms;
  }

  & .${h.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${h.childLeaving} {
    opacity: 0;
    animation-name: ${St};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
  }

  & .${h.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Lt};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:n})=>n.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,$t=o.forwardRef(function(e,s){const l=st({props:e,name:"MuiTouchRipple"}),{center:p=!1,classes:u={},className:d,...S}=l,[m,c]=o.useState([]),M=o.useRef(0),r=o.useRef(null);o.useEffect(()=>{r.current&&(r.current(),r.current=null)},[m]);const b=o.useRef(!1),B=yt(),f=o.useRef(null),L=o.useRef(null),x=o.useCallback(i=>{const{pulsate:R,rippleX:g,rippleY:K,rippleSize:D,cb:z}=i;c(y=>[...y,N.jsx(Vt,{classes:{ripple:T(u.ripple,h.ripple),rippleVisible:T(u.rippleVisible,h.rippleVisible),ripplePulsate:T(u.ripplePulsate,h.ripplePulsate),child:T(u.child,h.child),childLeaving:T(u.childLeaving,h.childLeaving),childPulsate:T(u.childPulsate,h.childPulsate)},timeout:J,pulsate:R,rippleX:g,rippleY:K,rippleSize:D},M.current)]),M.current+=1,r.current=z},[u]),j=o.useCallback((i={},R={},g=()=>{})=>{const{pulsate:K=!1,center:D=p||R.pulsate,fakeElement:z=!1}=R;if(i?.type==="mousedown"&&b.current){b.current=!1;return}i?.type==="touchstart"&&(b.current=!0);const y=z?null:L.current,k=y?y.getBoundingClientRect():{width:0,height:0,left:0,top:0};let w,C,E;if(D||i===void 0||i.clientX===0&&i.clientY===0||!i.clientX&&!i.touches)w=Math.round(k.width/2),C=Math.round(k.height/2);else{const{clientX:A,clientY:V}=i.touches&&i.touches.length>0?i.touches[0]:i;w=Math.round(A-k.left),C=Math.round(V-k.top)}if(D)E=Math.sqrt((2*k.width**2+k.height**2)/3),E%2===0&&(E+=1);else{const A=Math.max(Math.abs((y?y.clientWidth:0)-w),w)*2+2,V=Math.max(Math.abs((y?y.clientHeight:0)-C),C)*2+2;E=Math.sqrt(A**2+V**2)}i?.touches?f.current===null&&(f.current=()=>{x({pulsate:K,rippleX:w,rippleY:C,rippleSize:E,cb:g})},B.start(wt,()=>{f.current&&(f.current(),f.current=null)})):x({pulsate:K,rippleX:w,rippleY:C,rippleSize:E,cb:g})},[p,x,B]),X=o.useCallback(()=>{j({},{pulsate:!0})},[j]),I=o.useCallback((i,R)=>{if(B.clear(),i?.type==="touchend"&&f.current){f.current(),f.current=null,B.start(0,()=>{I(i,R)});return}f.current=null,c(g=>g.length>0?g.slice(1):g),r.current=R},[B]);return o.useImperativeHandle(s,()=>({pulsate:X,start:j,stop:I}),[X,j,I]),N.jsx(Dt,{className:T(h.root,u.root,d),ref:L,...S,children:N.jsx(Tt,{component:null,exit:!0,children:m})})});function Nt(n){return xt("MuiButtonBase",n)}const jt=et("MuiButtonBase",["root","disabled","focusVisible"]),It=n=>{const{disabled:e,focusVisible:s,focusVisibleClassName:l,classes:p}=n,d=Ct({root:["root",e&&"disabled",s&&"focusVisible"]},Nt,p);return s&&l&&(d.root+=` ${l}`),d},Kt=Z("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${jt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Ft=o.forwardRef(function(e,s){const l=st({props:e,name:"MuiButtonBase"}),{action:p,centerRipple:u=!1,children:d,className:S,component:m="button",disabled:c=!1,disableRipple:M=!1,disableTouchRipple:r=!1,focusRipple:b=!1,focusVisibleClassName:B,LinkComponent:f="a",onBlur:L,onClick:x,onContextMenu:j,onDragLeave:X,onFocus:I,onFocusVisible:i,onKeyDown:R,onKeyUp:g,onMouseDown:K,onMouseLeave:D,onMouseUp:z,onTouchEnd:y,onTouchMove:k,onTouchStart:w,tabIndex:C=0,TouchRippleProps:E,touchRippleRef:A,type:V,...U}=l,F=o.useRef(null),a=Pt(),ot=v(a.ref,A),[$,H]=o.useState(!1);c&&$&&H(!1),o.useImperativeHandle(p,()=>({focusVisible:()=>{H(!0),F.current.focus()}}),[]);const nt=a.shouldMount&&!M&&!c;o.useEffect(()=>{$&&b&&!M&&a.pulsate()},[M,b,$,a]);const it=P(a,"start",K,r),rt=P(a,"stop",j,r),at=P(a,"stop",X,r),lt=P(a,"stop",z,r),ut=P(a,"stop",t=>{$&&t.preventDefault(),D&&D(t)},r),ct=P(a,"start",w,r),pt=P(a,"stop",y,r),ft=P(a,"stop",k,r),ht=P(a,"stop",t=>{tt(t.target)||H(!1),L&&L(t)},!1),dt=W(t=>{F.current||(F.current=t.currentTarget),tt(t.target)&&(H(!0),i&&i(t)),I&&I(t)}),G=()=>{const t=F.current;return m&&m!=="button"&&!(t.tagName==="A"&&t.href)},mt=W(t=>{b&&!t.repeat&&$&&t.key===" "&&a.stop(t,()=>{a.start(t)}),t.target===t.currentTarget&&G()&&t.key===" "&&t.preventDefault(),R&&R(t),t.target===t.currentTarget&&G()&&t.key==="Enter"&&!c&&(t.preventDefault(),x&&x(t))}),bt=W(t=>{b&&t.key===" "&&$&&!t.defaultPrevented&&a.stop(t,()=>{a.pulsate(t)}),g&&g(t),x&&t.target===t.currentTarget&&G()&&t.key===" "&&!t.defaultPrevented&&x(t)});let O=m;O==="button"&&(U.href||U.to)&&(O=f);const Y={};if(O==="button"){const t=!!U.formAction;Y.type=V===void 0&&!t?"button":V,Y.disabled=c}else!U.href&&!U.to&&(Y.role="button"),c&&(Y["aria-disabled"]=c);const gt=v(s,F),_={...l,centerRipple:u,component:m,disabled:c,disableRipple:M,disableTouchRipple:r,focusRipple:b,tabIndex:C,focusVisible:$},Mt=It(_);return N.jsxs(Kt,{as:O,className:T(Mt.root,S),ownerState:_,onBlur:ht,onClick:x,onContextMenu:rt,onFocus:dt,onKeyDown:mt,onKeyUp:bt,onMouseDown:it,onMouseLeave:ut,onMouseUp:lt,onDragLeave:at,onTouchEnd:pt,onTouchMove:ft,onTouchStart:ct,ref:gt,tabIndex:c?-1:C,type:V,...Y,...U,children:[d,nt?N.jsx($t,{ref:ot,center:u,...E}):null]})});function P(n,e,s,l=!1){return W(p=>(s&&s(p),l||n[e](p),!0))}export{Ft as B};
