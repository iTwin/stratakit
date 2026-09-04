import{a as e,n as t,t as n}from"./jsx-runtime.B-hcVAMW.js";import{C as r,S as i,m as a,n as o,p as s,r as c,t as l,w as u}from"./DefaultPropsProvider.BGs4p5OW.js";import{n as d,r as f}from"./emotion-react.browser.esm.D6fHnVmA.js";import{t as p}from"./useTheme.BNxDNnI7.js";import{t as m}from"./useForkRef.CfP1COwm.js";import{a as h,i as g,o as _,r as v,t as y}from"./useReducedMotion.CJxBl9Mp.js";import{t as b}from"./isFocusVisible.CmHL3Ev5.js";var x=e(t(),1);function S(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return x.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var C={};function w(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=x.useRef(null),m=l===!0,h=S({focusableWhenDisabled:m,disabled:a,isNativeButton:t,tabIndex:c}),g=x.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),_=x.useMemo(()=>{let e=m?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,m||(e.disabled=a)):(e.role=`button`,!m&&a&&(e[`aria-disabled`]=a)),m?{...e,...h}:e},[a,m,h,s,t,c,o]);return{getButtonProps:x.useCallback((e=C)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(m&&h.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||g()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!g()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{..._,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[_,a,m,h,g,d,f,u]),rootRef:p}}var T=class e{static create(){return new e}static use(){let t=h(e.create).current,[n,r]=x.useState(!1);return t.shouldMount=n,t.setShouldMount=r,x.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=D(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function E(){return T.use()}function D(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var O=n();function k(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[d,f]=x.useState(!1),p=v(),m=x.useRef(!1),h=x.useRef(c);h.current=c;let g=c!=null,_=u(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),y={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},b=u(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),x.useEffect(()=>{!s&&g?m.current||(m.current=!0,p.start(l,()=>{m.current=!1,h.current?.()})):(m.current=!1,p.clear())},[p,g,s,l]),(0,O.jsx)(`span`,{className:_,style:y,children:(0,O.jsx)(`span`,{className:b})})}var A=i(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),j=550,M={},N=[],P=()=>{};function F(e,t){let n=new Set(t),r=new Map,i=[];for(let t of e)n.has(t)?i.length>0&&(r.set(t,i),i=[]):i.push(t);let a=[];for(let e of t){let t=r.get(e);t&&a.push(...t),a.push(e)}return a.push(...i),a}function ee({event:e,element:t,center:n}){let r=t?t.getBoundingClientRect():{width:0,height:0,left:0,top:0},i,a;if(n||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)i=Math.round(r.width/2),a=Math.round(r.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;i=Math.round(t-r.left),a=Math.round(n-r.top)}let o;if(n)o=Math.sqrt((2*r.width**2+r.height**2)/3),o%2==0&&(o+=1);else{let e=Math.max(Math.abs((t?t.clientWidth:0)-i),i)*2+2,n=Math.max(Math.abs((t?t.clientHeight:0)-a),a)*2+2;o=Math.sqrt(e**2+n**2)}return{rippleX:i,rippleY:a,rippleSize:o}}var I=f`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,L=f`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,R=f`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;function z(e){if(e.motion.reducedMotion===`always`)return null;let t=d`
    &.${A.rippleVisible} {
      animation-name: ${I};
      animation-duration: ${j}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    &.${A.ripplePulsate} {
      animation-duration: ${e.transitions.duration.shorter}ms;
    }

    & .${A.childLeaving} {
      animation-name: ${L};
      animation-duration: ${j}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    & .${A.childPulsate} {
      animation-name: ${R};
      animation-duration: 2500ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;return e.motion.reducedMotion===`system`?d`
      @media (prefers-reduced-motion: no-preference) {
        ${t}
      }
    `:t}var te=c(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),B=c(k,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${A.rippleVisible} {
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
  & .${A.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${A.childLeaving} {
    opacity: 0;
  }

  & .${A.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({theme:e})=>z(e)}
`,ne=x.forwardRef(function(e,t){let n=l({props:e,name:`MuiTouchRipple`}),r=p(),i=y(r.motion.reducedMotion,!1),{center:a=!1,classes:o=M,className:s,...c}=n,[d,f]=x.useState({items:N,order:N}),m=d.items,h=x.useRef(0),b=x.useRef(null),S=x.useRef(!1);g(()=>(S.current=!0,()=>{S.current=!1})),x.useEffect(()=>{b.current&&=(b.current(),null)},[m]);let C=x.useRef(!1),w=v(),T=x.useRef(null),E=x.useRef(null),D=_(e=>{S.current&&f(t=>{let n=t.items.filter(t=>t.key!==e);return{items:n,order:F(t.order.filter(t=>t!==e),n.filter(e=>!e.exiting).map(e=>e.key))}})}),k=_(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:a}=e,o=h.current;h.current+=1,f(e=>{let a=[...e.items,{key:o,pulsate:t,rippleX:n,rippleY:r,rippleSize:i,exiting:!1}];return{items:a,order:F(e.order,a.filter(e=>!e.exiting).map(e=>e.key))}}),b.current=a}),I=_((e=M,t=M,n=P)=>{let{pulsate:r=!1,center:i=a||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&C.current){C.current=!1;return}e?.type===`touchstart`&&(C.current=!0);let{rippleX:s,rippleY:c,rippleSize:l}=ee({event:e,element:o?null:E.current,center:i});e?.touches?T.current===null&&(T.current=()=>{k({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})},w.start(80,()=>{T.current&&=(T.current(),null)})):k({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})}),L=_(()=>{I(M,{pulsate:!0})}),R=_((e,t)=>{if(w.clear(),e?.type===`touchend`&&T.current){T.current(),T.current=null,w.start(0,()=>{R(e,t)});return}T.current=null,f(e=>{let t=e.items.findIndex(e=>!e.exiting);if(t===-1)return e;let n=e.items.slice();return n[t]={...n[t],exiting:!0},{items:n,order:F(e.order,n.filter(e=>!e.exiting).map(e=>e.key))}}),b.current=t});x.useImperativeHandle(t,()=>({pulsate:L,start:I,stop:R}),[L,I,R]);let z=new Map(m.map(e=>[e.key,e])),ne=d.order.map(e=>z.get(e)).filter(Boolean);return(0,O.jsx)(te,{className:u(A.root,o.root,s),ref:E,...c,children:ne.map(e=>(0,O.jsx)(B,{classes:{ripple:u(o.ripple,A.ripple),rippleVisible:u(o.rippleVisible,A.rippleVisible),ripplePulsate:u(o.ripplePulsate,A.ripplePulsate),child:u(o.child,A.child),childLeaving:u(o.childLeaving,A.childLeaving),childPulsate:u(o.childPulsate,A.childPulsate)},timeout:i.shouldReduceMotion?0:j,pulsate:e.pulsate,rippleX:e.rippleX,rippleY:e.rippleY,rippleSize:e.rippleSize,in:!e.exiting,onExited:()=>D(e.key)},e.key))})});function V(e){return r(`MuiButtonBase`,e)}var H=i(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),re=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:o}=e,s=a({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},V,o);return n&&!i&&r&&(s.root+=` ${r}`),s},ie=c(`button`,{name:`MuiButtonBase`,slot:`Root`})(o(({theme:e})=>({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${H.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`},variants:[{props:{internalDisabledThemeFocusVisible:!1},style:e.focusVisible&&{...s,[`&.${H.focusVisible}`]:e.focusVisible}}]}))),U=x.forwardRef(function(e,t){let n=l({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:s=`button`,disabled:c=!1,disableRipple:d=!1,disableTouchRipple:f=!1,focusRipple:p=!1,focusVisibleClassName:h,focusableWhenDisabled:g,suppressFocusVisible:v=!1,internalNativeButton:y,internalDisabledThemeFocusVisible:S=!1,LinkComponent:C=`a`,nativeButton:T,onBlur:D,onClick:k,onContextMenu:A,onDragLeave:j,onFocus:M,onFocusVisible:N,onKeyDown:P,onKeyUp:F,onMouseDown:ee,onMouseLeave:I,onMouseUp:L,onTouchEnd:R,onTouchMove:z,onTouchStart:te,tabIndex:B=0,TouchRippleProps:V,touchRippleRef:H,type:U,...G}=n,K=!!(G.href||G.to),ae=!!G.formAction,q=s;q===`button`&&K&&(q=C);let J=typeof q==`string`?q===`button`:y??!1,oe=T??J,Y=E(),se=m(Y.ref,H),[X,Z]=x.useState(!1);(c||v)&&X&&Z(!1);let ce=_(e=>{p&&!e.repeat&&X&&e.key===` `&&Y.stop(e,()=>{Y.start(e)})}),le=_(e=>{p&&e.key===` `&&X&&!e.defaultPrevented&&Y.stop(e,()=>{Y.pulsate(e)})}),{getButtonProps:ue,rootRef:Q}=w({nativeButton:oe,nativeButtonProp:T,internalNativeButton:J,allowInferredHostMismatch:K||typeof q==`string`,disabled:c,type:U,hasFormAction:ae,tabIndex:B,onBeforeKeyDown:ce,onBeforeKeyUp:le}),{onClick:de,onKeyDown:fe,onKeyUp:pe,...me}=ue({onClick:k,onKeyDown:P,onKeyUp:F});x.useImperativeHandle(r,()=>({focusVisible:()=>{Z(!0),Q.current.focus()}}),[Q]);let he=Y.shouldMount&&!d&&!c;x.useEffect(()=>{X&&p&&!d&&Y.pulsate()},[d,p,X,Y]);let ge=W(Y,`start`,ee,f),_e=W(Y,`stop`,A,f),ve=W(Y,`stop`,j,f),ye=W(Y,`stop`,L,f),be=W(Y,`stop`,e=>{X&&e.preventDefault(),I&&I(e)},f),xe=W(Y,`start`,te,f),Se=W(Y,`stop`,R,f),Ce=W(Y,`stop`,z,f),we=W(Y,`stop`,e=>{b(e.target)||Z(!1),D&&D(e)},!1),Te=_(e=>{Q.current||=e.currentTarget,!v&&b(e.target)&&(Z(!0),N&&N(e)),M&&M(e)}),$={};K&&($.tabIndex=c?-1:B,c&&($[`aria-disabled`]=c),$.type=U);let Ee=m(t,Q),De={...n,centerRipple:i,component:s,disabled:c,disableRipple:d,disableTouchRipple:f,focusRipple:p,suppressFocusVisible:v,tabIndex:B,focusVisible:X,internalDisabledThemeFocusVisible:S},Oe=re(De);return(0,O.jsxs)(ie,{as:q,className:u(Oe.root,o),ownerState:De,onBlur:we,onClick:de,onContextMenu:_e,onFocus:Te,onKeyDown:fe,onKeyUp:pe,onMouseDown:ge,onMouseLeave:be,onMouseUp:ye,onDragLeave:ve,onTouchEnd:Se,onTouchMove:Ce,onTouchStart:xe,ref:Ee,...K?$:me,...G,children:[a,he?(0,O.jsx)(ne,{ref:se,center:i,...V}):null]})});function W(e,t,n,r=!1){return _(i=>(n&&n(i),r||e[t](i),!0))}export{H as n,U as t};