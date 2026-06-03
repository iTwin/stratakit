import{r as s}from"./styles.internal.CaJWceVp.js";import{aO as Ne,z as D,j as V,C as ne,J as Ee,aP as Ue,_ as Q,B as Se,F as te,a2 as X,a4 as oe,A as Ie}from"./_utils.C5jgFUCE.js";import{u as se,s as Z}from"./DefaultPropsProvider.VwCbtsv0.js";function Le(r){const{focusableWhenDisabled:t,disabled:e,composite:i=!1,tabIndex:u=0,isNativeButton:a}=r,g=i&&t!==!1,h=i&&t===!1;return s.useMemo(()=>{const l={onKeyDown(m){e&&t&&m.key!=="Tab"&&m.preventDefault()}};return i||(l.tabIndex=u,!a&&e&&(l.tabIndex=t?u:-1)),(a&&(t||g)||!a&&e)&&(l["aria-disabled"]=e),a&&(!t||h)&&(l.disabled=e),l},[i,e,t,g,h,a,u])}const Ve={};function $e(r){const{nativeButton:t,disabled:e,type:i,hasFormAction:u=!1,tabIndex:a=0,focusableWhenDisabled:g,stopEventPropagation:h=!1,onBeforeKeyDown:M,onBeforeKeyUp:l}=r,m=s.useRef(null),n=g===!0,b=Le({focusableWhenDisabled:n,disabled:e,isNativeButton:t,tabIndex:a}),B=s.useCallback(()=>{const f=m.current;return f==null?t:f.tagName==="BUTTON"?!0:!!(f.tagName==="A"&&f.href)},[t]),y=s.useMemo(()=>{const f=n?{}:{tabIndex:e?-1:a};return t?(f.type=i===void 0&&!u?"button":i,n||(f.disabled=e)):(f.role="button",!n&&e&&(f["aria-disabled"]=e)),n?{...f,...b}:f},[e,n,b,u,t,a,i]);return{getButtonProps:s.useCallback((f=Ve)=>{const{onClick:w,onKeyDown:$,onKeyUp:N,...c}=f;return{...y,...c,onClick:o=>{if(h&&o.stopPropagation(),e){o.preventDefault();return}w?.(o)},onKeyDown:o=>{if(n&&b.onKeyDown(o),!e&&(M?.(o),$?.(o),!(o.target!==o.currentTarget||B()))){if(o.key===" "){o.preventDefault();return}o.key==="Enter"&&(o.preventDefault(),o.currentTarget.click())}},onKeyUp:o=>{e||(l?.(o),N?.(o),o.target===o.currentTarget&&!B()&&o.key===" "&&!o.defaultPrevented&&o.currentTarget.click())}}},[y,e,n,b,B,M,l,h]),rootRef:m}}class H{static create(){return new H}static use(){const t=Ne(H.create).current,[e,i]=s.useState(!1);return t.shouldMount=e,t.setShouldMount=i,s.useEffect(t.mountEffect,[e]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=je(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...t){this.mount().then(()=>this.ref.current?.start(...t))}stop(...t){this.mount().then(()=>this.ref.current?.stop(...t))}pulsate(...t){this.mount().then(()=>this.ref.current?.pulsate(...t))}}function Fe(){return H.use()}function je(){let r,t;const e=new Promise((i,u)=>{r=i,t=u});return e.resolve=r,e.reject=t,e}function Ae(r){const{className:t,classes:e,pulsate:i=!1,rippleX:u,rippleY:a,rippleSize:g,in:h,onExited:M,timeout:l}=r,[m,n]=s.useState(!1),b=D(t,e.ripple,e.rippleVisible,i&&e.ripplePulsate),B={width:g,height:g,top:-(g/2)+a,left:-(g/2)+u},y=D(e.child,m&&e.childLeaving,i&&e.childPulsate);return!h&&!m&&n(!0),s.useEffect(()=>{if(!h&&M!=null){const T=setTimeout(M,l);return()=>{clearTimeout(T)}}},[M,h,l]),V.jsx("span",{className:b,style:B,children:V.jsx("span",{className:y})})}const R=ne("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),J=550,ze=80,We=Q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,ve=Q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Oe=Q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,Ye=Z("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Xe=Z(Ae,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${R.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${We};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:r})=>r.transitions.easing.easeInOut};
  }

  &.${R.ripplePulsate} {
    animation-duration: ${({theme:r})=>r.transitions.duration.shorter}ms;
  }

  & .${R.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${R.childLeaving} {
    opacity: 0;
    animation-name: ${ve};
    animation-duration: ${J}ms;
    animation-timing-function: ${({theme:r})=>r.transitions.easing.easeInOut};
  }

  & .${R.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${Oe};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:r})=>r.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,He=s.forwardRef(function(t,e){const i=se({props:t,name:"MuiTouchRipple"}),{center:u=!1,classes:a={},className:g,...h}=i,[M,l]=s.useState([]),m=s.useRef(0),n=s.useRef(null);s.useEffect(()=>{n.current&&(n.current(),n.current=null)},[M]);const b=s.useRef(!1),B=Ee(),y=s.useRef(null),T=s.useRef(null),f=s.useCallback(c=>{const{pulsate:P,rippleX:C,rippleY:E,rippleSize:o,cb:F}=c;l(x=>[...x,V.jsx(Xe,{classes:{ripple:D(a.ripple,R.ripple),rippleVisible:D(a.rippleVisible,R.rippleVisible),ripplePulsate:D(a.ripplePulsate,R.ripplePulsate),child:D(a.child,R.child),childLeaving:D(a.childLeaving,R.childLeaving),childPulsate:D(a.childPulsate,R.childPulsate)},timeout:J,pulsate:P,rippleX:C,rippleY:E,rippleSize:o},m.current)]),m.current+=1,n.current=F},[a]),w=s.useCallback((c={},P={},C=()=>{})=>{const{pulsate:E=!1,center:o=u||P.pulsate,fakeElement:F=!1}=P;if(c?.type==="mousedown"&&b.current){b.current=!1;return}c?.type==="touchstart"&&(b.current=!0);const x=F?null:T.current,U=x?x.getBoundingClientRect():{width:0,height:0,left:0,top:0};let k,S,I;if(o||c===void 0||c.clientX===0&&c.clientY===0||!c.clientX&&!c.touches)k=Math.round(U.width/2),S=Math.round(U.height/2);else{const{clientX:j,clientY:A}=c.touches&&c.touches.length>0?c.touches[0]:c;k=Math.round(j-U.left),S=Math.round(A-U.top)}if(o)I=Math.sqrt((2*U.width**2+U.height**2)/3),I%2===0&&(I+=1);else{const j=Math.max(Math.abs((x?x.clientWidth:0)-k),k)*2+2,A=Math.max(Math.abs((x?x.clientHeight:0)-S),S)*2+2;I=Math.sqrt(j**2+A**2)}c?.touches?y.current===null&&(y.current=()=>{f({pulsate:E,rippleX:k,rippleY:S,rippleSize:I,cb:C})},B.start(ze,()=>{y.current&&(y.current(),y.current=null)})):f({pulsate:E,rippleX:k,rippleY:S,rippleSize:I,cb:C})},[u,f,B]),$=s.useCallback(()=>{w({},{pulsate:!0})},[w]),N=s.useCallback((c,P)=>{if(B.clear(),c?.type==="touchend"&&y.current){y.current(),y.current=null,B.start(0,()=>{N(c,P)});return}y.current=null,l(C=>C.length>0?C.slice(1):C),n.current=P},[B]);return s.useImperativeHandle(e,()=>({pulsate:$,start:w,stop:N}),[$,w,N]),V.jsx(Ye,{className:D(R.root,a.root,g),ref:T,...h,children:V.jsx(Ue,{component:null,exit:!0,children:M})})});function qe(r){return Se("MuiButtonBase",r)}const Ge=ne("MuiButtonBase",["root","disabled","focusVisible"]),Je=r=>{const{disabled:t,focusVisible:e,focusVisibleClassName:i,suppressFocusVisible:u,classes:a}=r,h=Ie({root:["root",t&&"disabled",e&&!u&&"focusVisible"]},qe,a);return e&&!u&&i&&(h.root+=` ${i}`),h},Qe=Z("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${Ge.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),ot=s.forwardRef(function(t,e){const i=se({props:t,name:"MuiButtonBase"}),{action:u,centerRipple:a=!1,children:g,className:h,component:M="button",disabled:l=!1,disableRipple:m=!1,disableTouchRipple:n=!1,focusRipple:b=!1,focusVisibleClassName:B,focusableWhenDisabled:y,suppressFocusVisible:T=!1,internalNativeButton:f,LinkComponent:w="a",nativeButton:$,onBlur:N,onClick:c,onContextMenu:P,onDragLeave:C,onFocus:E,onFocusVisible:o,onKeyDown:F,onKeyUp:x,onMouseDown:U,onMouseLeave:k,onMouseUp:S,onTouchEnd:I,onTouchMove:j,onTouchStart:A,tabIndex:q=0,TouchRippleProps:ie,touchRippleRef:ae,type:_,...v}=i,G=!!(v.href||v.to),re=!!v.formAction;let z=M;z==="button"&&G&&(z=w);const le=$??(typeof z=="string"?z==="button":f??!1),d=Fe(),ue=te(d.ref,ae),[L,O]=s.useState(!1);(l||T)&&L&&O(!1);const ce=X(p=>{b&&!p.repeat&&L&&p.key===" "&&d.stop(p,()=>{d.start(p)})}),pe=X(p=>{b&&p.key===" "&&L&&!p.defaultPrevented&&d.stop(p,()=>{d.pulsate(p)})}),{getButtonProps:fe,rootRef:W}=$e({nativeButton:le,disabled:l,type:_,hasFormAction:re,tabIndex:q,onBeforeKeyDown:ce,onBeforeKeyUp:pe}),{onClick:de,onKeyDown:he,onKeyUp:me,...be}=fe({onClick:c,onKeyDown:F,onKeyUp:x});s.useImperativeHandle(u,()=>({focusVisible:()=>{O(!0),W.current.focus()}}),[W]);const ye=d.shouldMount&&!m&&!l;s.useEffect(()=>{L&&b&&!m&&d.pulsate()},[m,b,L,d]);const ge=K(d,"start",U,n),Me=K(d,"stop",P,n),Be=K(d,"stop",C,n),Re=K(d,"stop",S,n),Ce=K(d,"stop",p=>{L&&p.preventDefault(),k&&k(p)},n),Pe=K(d,"start",A,n),xe=K(d,"stop",I,n),De=K(d,"stop",j,n),Te=K(d,"stop",p=>{oe(p.target)||O(!1),N&&N(p)},!1),ke=X(p=>{W.current||(W.current=p.currentTarget),!T&&oe(p.target)&&(O(!0),o&&o(p)),E&&E(p)}),Y={};G&&(Y.tabIndex=l?-1:q,l&&(Y["aria-disabled"]=l),Y.type=_);const Ke=te(e,W),ee={...i,centerRipple:a,component:M,disabled:l,disableRipple:m,disableTouchRipple:n,focusRipple:b,suppressFocusVisible:T,tabIndex:q,focusVisible:L},we=Je(ee);return V.jsxs(Qe,{as:z,className:D(we.root,h),ownerState:ee,onBlur:Te,onClick:de,onContextMenu:Me,onFocus:ke,onKeyDown:he,onKeyUp:me,onMouseDown:ge,onMouseLeave:Ce,onMouseUp:Re,onDragLeave:Be,onTouchEnd:xe,onTouchMove:De,onTouchStart:Pe,ref:Ke,...G?Y:be,...v,children:[g,ye?V.jsx(He,{ref:ue,center:a,...ie}):null]})});function K(r,t,e,i=!1){return X(u=>(e&&e(u),i||r[t](u),!0))}export{ot as B};
