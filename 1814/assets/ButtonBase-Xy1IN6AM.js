import{Z as je,et as We,t as Xe}from"./jsx-runtime-CvPTumEY.js";import{C as He,S as he,m as Qe,n as qe,p as Ze,r as ne,t as me,w as k}from"./DefaultPropsProvider-6XumKMvl.js";import{n as ae,r as se}from"./emotion-react.browser.esm-ClMZgtk2.js";import{n as Je,r as Ge,t as ue}from"./useForkRef-bRDGXxHy.js";import{t as et}from"./useTheme-Cy2fK2pQ.js";import{t as le}from"./isFocusVisible-w_xKdOwj.js";var a=We(je(),1),S=Je;function tt(t){const{focusableWhenDisabled:e,disabled:n,composite:o=!1,tabIndex:r=0,isNativeButton:s}=t,i=o&&e!==!1,u=o&&e===!1;return a.useMemo(()=>{const p={onKeyDown(b){n&&e&&b.key!=="Tab"&&b.preventDefault()}};return o||(p.tabIndex=r,!s&&n&&(p.tabIndex=e?r:-1)),(s&&(e||i)||!s&&n)&&(p["aria-disabled"]=n),s&&(!e||u)&&(p.disabled=n),p},[o,n,e,i,u,s,r])}var nt={};function st(t){const{nativeButton:e,nativeButtonProp:n,internalNativeButton:o=e,allowInferredHostMismatch:r=!1,disabled:s,type:i,hasFormAction:u=!1,tabIndex:p=0,focusableWhenDisabled:b,stopEventPropagation:T=!1,onBeforeKeyDown:h,onBeforeKeyUp:M}=t,B=a.useRef(null),m=b===!0,R=tt({focusableWhenDisabled:m,disabled:s,isNativeButton:e,tabIndex:p}),P=a.useCallback(()=>{const l=B.current;return l==null?e:l.tagName==="BUTTON"?!0:!!(l.tagName==="A"&&l.href)},[e]),E=a.useMemo(()=>{const l=m?{}:{tabIndex:s?-1:p};return e?(l.type=i===void 0&&!u?"button":i,m||(l.disabled=s)):(l.role="button",!m&&s&&(l["aria-disabled"]=s)),m?{...l,...R}:l},[s,m,R,u,e,p,i]);return{getButtonProps:a.useCallback((l=nt)=>{const{onClick:L,onKeyDown:O,onKeyUp:A,...N}=l;return{...E,...N,onClick:f=>{if(T&&f.stopPropagation(),s){f.preventDefault();return}L?.(f)},onKeyDown:f=>{if(m&&R.onKeyDown(f),!s&&(h?.(f),O?.(f),!(f.target!==f.currentTarget||P()))){if(f.key===" "){f.preventDefault();return}f.key==="Enter"&&(f.preventDefault(),f.currentTarget.click())}},onKeyUp:f=>{s||(M?.(f),A?.(f),f.target===f.currentTarget&&!P()&&f.key===" "&&!f.defaultPrevented&&f.currentTarget.click())}}},[E,s,m,R,P,h,M,T]),rootRef:B}}var ce={};function ye(t,e){const n=a.useRef(ce);return n.current===ce&&(n.current=t(e)),n}var ot=class ee{static create(){return new ee}static use(){const e=ye(ee.create).current,[n,o]=a.useState(!1);return e.shouldMount=n,e.setShouldMount=o,a.useEffect(e.mountEffect,[n]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=it(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function rt(){return ot.use()}function it(){let t,e;const n=new Promise((o,r)=>{t=o,e=r});return n.resolve=t,n.reject=e,n}var at=[];function be(t){a.useEffect(t,at)}var ut=class ge{static create(){return new ge}currentId=null;start(e,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function Me(){const t=ye(ut.create).current;return be(t.disposeEffect),t}var z=Xe();function lt(t){const{className:e,classes:n,pulsate:o=!1,rippleX:r,rippleY:s,rippleSize:i,in:u,onExited:p,timeout:b}=t,[T,h]=a.useState(!1),M=Me(),B=a.useRef(!1),m=a.useRef(p);m.current=p;const R=p!=null,P=k(e,n.ripple,n.rippleVisible,o&&n.ripplePulsate),E={width:i,height:i,top:-(i/2)+s,left:-(i/2)+r},l=k(n.child,T&&n.childLeaving,o&&n.childPulsate);return!u&&!T&&h(!0),a.useEffect(()=>{!u&&R?B.current||(B.current=!0,M.start(b,()=>{B.current=!1,m.current?.()})):(B.current=!1,M.clear())},[M,R,u,b]),(0,z.jsx)("span",{className:P,style:E,children:(0,z.jsx)("span",{className:l})})}var w=he("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Re="(prefers-reduced-motion: reduce)",ct=0,pt="0ms",ft=()=>{},pe=()=>!1,dt=()=>!0,ht=()=>ft;function mt(t){const[e,n]=a.useState(()=>({enabled:t,matches:t?null:!1}));let o=e.matches;return e.enabled!==t&&(o=null,t||(o=!1)),Ge(()=>{const r=u=>{n(p=>p.enabled===t&&p.matches===u?p:{enabled:t,matches:u})};if(!t){e.enabled&&r(!1);return}if(typeof window>"u"||typeof window.matchMedia!="function"){r(!1);return}const s=window.matchMedia(Re),i=()=>{r(s.matches)};return i(),s.addEventListener("change",i),()=>{s.removeEventListener("change",i)}},[t,e.enabled]),o}var xe={...a}.useSyncExternalStore;function yt(t){const e=t?dt:pe,[n,o]=a.useMemo(()=>{if(!t||typeof window>"u"||typeof window.matchMedia!="function")return[pe,ht];const r=window.matchMedia(Re);return[()=>r.matches,s=>(r.addEventListener("change",s),()=>{r.removeEventListener("change",s)})]},[t]);return xe(o,n,e)}var bt=xe!==void 0?yt:mt;function gt(t,e){const n=bt(!e&&t==="system"),o=!e&&(t==="always"||t==="system"&&n!==!1);return a.useMemo(()=>({shouldReduceMotion:o,getTransitionTiming(r){return o?{duration:ct,delay:pt}:r}}),[o])}var te=550;var J={},fe=[],Mt=()=>{};function G(t,e){const n=new Set(e),o=new Map;let r=[];for(const i of t)n.has(i)?r.length>0&&(o.set(i,r),r=[]):r.push(i);const s=[];for(const i of e){const u=o.get(i);u&&s.push(...u),s.push(i)}return s.push(...r),s}function Rt({event:t,element:e,center:n}){const o=e?e.getBoundingClientRect():{width:0,height:0,left:0,top:0};let r,s;if(n||t===void 0||t.clientX===0&&t.clientY===0||!t.clientX&&!t.touches)r=Math.round(o.width/2),s=Math.round(o.height/2);else{const{clientX:u,clientY:p}=t.touches&&t.touches.length>0?t.touches[0]:t;r=Math.round(u-o.left),s=Math.round(p-o.top)}let i;if(n)i=Math.sqrt((2*o.width**2+o.height**2)/3),i%2===0&&(i+=1);else{const u=Math.max(Math.abs((e?e.clientWidth:0)-r),r)*2+2,p=Math.max(Math.abs((e?e.clientHeight:0)-s),s)*2+2;i=Math.sqrt(u**2+p**2)}return{rippleX:r,rippleY:s,rippleSize:i}}var xt=se`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,wt=se`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Tt=se`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;function vt(t){if(t.motion.reducedMotion==="always")return null;const e=ae`
    &.${w.rippleVisible} {
      animation-name: ${xt};
      animation-duration: ${te}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    &.${w.ripplePulsate} {
      animation-duration: ${t.transitions.duration.shorter}ms;
    }

    & .${w.childLeaving} {
      animation-name: ${wt};
      animation-duration: ${te}ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
    }

    & .${w.childPulsate} {
      animation-name: ${Tt};
      animation-duration: 2500ms;
      animation-timing-function: ${t.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;return t.motion.reducedMotion==="system"?ae`
      @media (prefers-reduced-motion: no-preference) {
        ${e}
      }
    `:e}var Bt=ne("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),Pt=ne(lt,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${w.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
  }

  /*
   * Order matters: 'child', 'childLeaving' and 'childPulsate' apply to the same
   * element with equal specificity, so the later rule wins. 'child' must come
   * before 'childLeaving' so the leaving 'opacity: 0' takes precedence. A focus
   * (pulsate) ripple keeps 'pulsateKeyframe' (no opacity animation) on exit, so
   * it relies on this static 'opacity: 0' to disappear on blur instead of
   * lingering until removal.
   */
  & .${w.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${w.childLeaving} {
    opacity: 0;
  }

  & .${w.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({theme:t})=>vt(t)}
`,Dt=a.forwardRef(function(e,n){const o=me({props:e,name:"MuiTouchRipple"}),r=et(),s=gt(r.motion.reducedMotion,!1),{center:i=!1,classes:u=J,className:p,...b}=o,[T,h]=a.useState({items:fe,order:fe}),M=T.items,B=a.useRef(0),m=a.useRef(null),R=a.useRef(!1);be(()=>(R.current=!0,()=>{R.current=!1})),a.useEffect(()=>{m.current&&(m.current(),m.current=null)},[M]);const P=a.useRef(!1),E=Me(),l=a.useRef(null),L=a.useRef(null),O=S(c=>{R.current&&h(v=>{const x=v.items.filter(y=>y.key!==c);return{items:x,order:G(v.order.filter(y=>y!==c),x.filter(y=>!y.exiting).map(y=>y.key))}})}),A=S(c=>{const{pulsate:v,rippleX:x,rippleY:y,rippleSize:C,cb:D}=c,F=B.current;B.current+=1,h(I=>{const V=[...I.items,{key:F,pulsate:v,rippleX:x,rippleY:y,rippleSize:C,exiting:!1}];return{items:V,order:G(I.order,V.filter(W=>!W.exiting).map(W=>W.key))}}),m.current=D}),N=S((c=J,v=J,x=Mt)=>{const{pulsate:y=!1,center:C=i||v.pulsate,fakeElement:D=!1}=v;if(c?.type==="mousedown"&&P.current){P.current=!1;return}c?.type==="touchstart"&&(P.current=!0);const{rippleX:F,rippleY:I,rippleSize:V}=Rt({event:c,element:D?null:L.current,center:C});c?.touches?l.current===null&&(l.current=()=>{A({pulsate:y,rippleX:F,rippleY:I,rippleSize:V,cb:x})},E.start(80,()=>{l.current&&(l.current(),l.current=null)})):A({pulsate:y,rippleX:F,rippleY:I,rippleSize:V,cb:x})}),_=S(()=>{N(J,{pulsate:!0})}),U=S((c,v)=>{if(E.clear(),c?.type==="touchend"&&l.current){l.current(),l.current=null,E.start(0,()=>{U(c,v)});return}l.current=null,h(x=>{const y=x.items.findIndex(D=>!D.exiting);if(y===-1)return x;const C=x.items.slice();return C[y]={...C[y],exiting:!0},{items:C,order:G(x.order,C.filter(D=>!D.exiting).map(D=>D.key))}}),m.current=v});a.useImperativeHandle(n,()=>({pulsate:_,start:N,stop:U}),[_,N,U]);const j=new Map(M.map(c=>[c.key,c])),f=T.order.map(c=>j.get(c)).filter(Boolean);return(0,z.jsx)(Bt,{className:k(w.root,u.root,p),ref:L,...b,children:f.map(c=>(0,z.jsx)(Pt,{classes:{ripple:k(u.ripple,w.ripple),rippleVisible:k(u.rippleVisible,w.rippleVisible),ripplePulsate:k(u.ripplePulsate,w.ripplePulsate),child:k(u.child,w.child),childLeaving:k(u.childLeaving,w.childLeaving),childPulsate:k(u.childPulsate,w.childPulsate)},timeout:s.shouldReduceMotion?0:te,pulsate:c.pulsate,rippleX:c.rippleX,rippleY:c.rippleY,rippleSize:c.rippleSize,in:!c.exiting,onExited:()=>O(c.key)},c.key))})});function Et(t){return He("MuiButtonBase",t)}var de=he("MuiButtonBase",["root","disabled","focusVisible"]),Ct=t=>{const{disabled:e,focusVisible:n,focusVisibleClassName:o,suppressFocusVisible:r,classes:s}=t,i=Qe({root:["root",e&&"disabled",n&&!r&&"focusVisible"]},Et,s);return n&&!r&&o&&(i.root+=` ${o}`),i},kt=ne("button",{name:"MuiButtonBase",slot:"Root"})(qe(({theme:t})=>({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${de.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"},variants:[{props:{internalDisabledThemeFocusVisible:!1},style:t.focusVisible&&{...Ze,[`&.${de.focusVisible}`]:t.focusVisible}}]}))),Vt=a.forwardRef(function(e,n){const o=me({props:e,name:"MuiButtonBase"}),{action:r,centerRipple:s=!1,children:i,className:u,component:p="button",disabled:b=!1,disableRipple:T=!1,disableTouchRipple:h=!1,focusRipple:M=!1,focusVisibleClassName:B,focusableWhenDisabled:m,suppressFocusVisible:R=!1,internalNativeButton:P,internalDisabledThemeFocusVisible:E=!1,LinkComponent:l="a",nativeButton:L,onBlur:O,onClick:A,onContextMenu:N,onDragLeave:_,onFocus:U,onFocusVisible:j,onKeyDown:f,onKeyUp:c,onMouseDown:v,onMouseLeave:x,onMouseUp:y,onTouchEnd:C,onTouchMove:D,onTouchStart:F,tabIndex:I=0,TouchRippleProps:V,touchRippleRef:W,type:oe,...H}=o,Q=!!(H.href||H.to),we=!!H.formAction;let Y=p;Y==="button"&&Q&&(Y=l);const re=typeof Y=="string"?Y==="button":P??!1,Te=L??re,g=rt(),ve=ue(g.ref,W),[$,q]=a.useState(!1);(b||R)&&$&&q(!1);const Be=S(d=>{M&&!d.repeat&&$&&d.key===" "&&g.stop(d,()=>{g.start(d)})}),Pe=S(d=>{M&&d.key===" "&&$&&!d.defaultPrevented&&g.stop(d,()=>{g.pulsate(d)})}),{getButtonProps:De,rootRef:X}=st({nativeButton:Te,nativeButtonProp:L,internalNativeButton:re,allowInferredHostMismatch:Q||typeof Y=="string",disabled:b,type:oe,hasFormAction:we,tabIndex:I,onBeforeKeyDown:Be,onBeforeKeyUp:Pe}),{onClick:Ee,onKeyDown:Ce,onKeyUp:ke,...Ie}=De({onClick:A,onKeyDown:f,onKeyUp:c});a.useImperativeHandle(r,()=>({focusVisible:()=>{q(!0),X.current.focus()}}),[X]);const Ke=g.shouldMount&&!T&&!b;a.useEffect(()=>{$&&M&&!T&&g.pulsate()},[T,M,$,g]);const Se=K(g,"start",v,h),Le=K(g,"stop",N,h),Ne=K(g,"stop",_,h),Ue=K(g,"stop",y,h),Ve=K(g,"stop",d=>{$&&d.preventDefault(),x&&x(d)},h),$e=K(g,"start",F,h),Oe=K(g,"stop",C,h),Ae=K(g,"stop",D,h),Fe=K(g,"stop",d=>{le(d.target)||q(!1),O&&O(d)},!1),Ye=S(d=>{X.current||(X.current=d.currentTarget),!R&&le(d.target)&&(q(!0),j&&j(d)),U&&U(d)}),Z={};Q&&(Z.tabIndex=b?-1:I,b&&(Z["aria-disabled"]=b),Z.type=oe);const ze=ue(n,X),ie={...o,centerRipple:s,component:p,disabled:b,disableRipple:T,disableTouchRipple:h,focusRipple:M,suppressFocusVisible:R,tabIndex:I,focusVisible:$,internalDisabledThemeFocusVisible:E},_e=Ct(ie);return(0,z.jsxs)(kt,{as:Y,className:k(_e.root,u),ownerState:ie,onBlur:Fe,onClick:Ee,onContextMenu:Le,onFocus:Ye,onKeyDown:Ce,onKeyUp:ke,onMouseDown:Se,onMouseLeave:Ve,onMouseUp:Ue,onDragLeave:Ne,onTouchEnd:Oe,onTouchMove:Ae,onTouchStart:$e,ref:ze,...Q?Z:Ie,...H,children:[i,Ke?(0,z.jsx)(Dt,{ref:ve,center:s,...V}):null]})});function K(t,e,n,o=!1){return S(r=>(n&&n(r),o||t[e](r),!0))}export{Me as a,ut as i,de as n,ye as o,gt as r,S as s,Vt as t};
