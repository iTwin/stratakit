import{Z as e,et as t,t as n}from"./jsx-runtime-PSkadNh_.js";import{C as r,S as i,m as a,n as o,p as s,r as c,t as l,w as u}from"./DefaultPropsProvider-BnggTyLw.js";import{n as d,r as f}from"./emotion-react.browser.esm-BDBKD8Am.js";import{n as p,r as m,t as h}from"./useForkRef-pzy9hHL0.js";import{t as g}from"./useTheme-C85Ak6tj.js";import{t as _}from"./isFocusVisible-CmHL3Ev5.js";var v=t(e(),1),y=p;function b(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return v.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var x={};function S(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=v.useRef(null),m=l===!0,h=b({focusableWhenDisabled:m,disabled:a,isNativeButton:t,tabIndex:c}),g=v.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),_=v.useMemo(()=>{let e=m?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,m||(e.disabled=a)):(e.role=`button`,!m&&a&&(e[`aria-disabled`]=a)),m?{...e,...h}:e},[a,m,h,s,t,c,o]);return{getButtonProps:v.useCallback((e=x)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(m&&h.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||g()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!g()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{..._,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[_,a,m,h,g,d,f,u]),rootRef:p}}var C={};function w(e,t){let n=v.useRef(C);return n.current===C&&(n.current=e(t)),n}var T=class e{static create(){return new e}static use(){let t=w(e.create).current,[n,r]=v.useState(!1);return t.shouldMount=n,t.setShouldMount=r,v.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=D(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function E(){return T.use()}function D(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}var O=[];function k(e){v.useEffect(e,O)}var A=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function j(){let e=w(A.create).current;return k(e.disposeEffect),e}var M=n();function N(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:c,timeout:l}=e,[d,f]=v.useState(!1),p=j(),m=v.useRef(!1),h=v.useRef(c);h.current=c;let g=c!=null,_=u(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),y={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},b=u(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),v.useEffect(()=>{!s&&g?m.current||(m.current=!0,p.start(l,()=>{m.current=!1,h.current?.()})):(m.current=!1,p.clear())},[p,g,s,l]),(0,M.jsx)(`span`,{className:_,style:y,children:(0,M.jsx)(`span`,{className:b})})}var P=i(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),F=`(prefers-reduced-motion: reduce)`,ee=0,I=`0ms`,te=()=>{},L=()=>!1,ne=()=>!0,re=()=>te;function R(e){let[t,n]=v.useState(()=>({enabled:e,matches:e?null:!1})),r=t.matches;return t.enabled!==e&&(r=null,e||(r=!1)),m(()=>{let r=t=>{n(n=>n.enabled===e&&n.matches===t?n:{enabled:e,matches:t})};if(!e){t.enabled&&r(!1);return}if(typeof window>`u`||typeof window.matchMedia!=`function`){r(!1);return}let i=window.matchMedia(F),a=()=>{r(i.matches)};return a(),i.addEventListener(`change`,a),()=>{i.removeEventListener(`change`,a)}},[e,t.enabled]),r}var z={...v}.useSyncExternalStore;function ie(e){let t=e?ne:L,[n,r]=v.useMemo(()=>{if(!e||typeof window>`u`||typeof window.matchMedia!=`function`)return[L,re];let t=window.matchMedia(F);return[()=>t.matches,e=>(t.addEventListener(`change`,e),()=>{t.removeEventListener(`change`,e)})]},[e]);return z(r,n,t)}var B=z===void 0?R:ie;function V(e,t){let n=B(!t&&e===`system`),r=!t&&(e===`always`||e===`system`&&n!==!1);return v.useMemo(()=>({shouldReduceMotion:r,getTransitionTiming(e){return r?{duration:ee,delay:I}:e}}),[r])}var H=550,U={},W=[],G=()=>{};function K(e,t){let n=new Set(t),r=new Map,i=[];for(let t of e)n.has(t)?i.length>0&&(r.set(t,i),i=[]):i.push(t);let a=[];for(let e of t){let t=r.get(e);t&&a.push(...t),a.push(e)}return a.push(...i),a}function q({event:e,element:t,center:n}){let r=t?t.getBoundingClientRect():{width:0,height:0,left:0,top:0},i,a;if(n||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)i=Math.round(r.width/2),a=Math.round(r.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;i=Math.round(t-r.left),a=Math.round(n-r.top)}let o;if(n)o=Math.sqrt((2*r.width**2+r.height**2)/3),o%2==0&&(o+=1);else{let e=Math.max(Math.abs((t?t.clientWidth:0)-i),i)*2+2,n=Math.max(Math.abs((t?t.clientHeight:0)-a),a)*2+2;o=Math.sqrt(e**2+n**2)}return{rippleX:i,rippleY:a,rippleSize:o}}var ae=f`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,J=f`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,Y=f`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`;function oe(e){if(e.motion.reducedMotion===`always`)return null;let t=d`
    &.${P.rippleVisible} {
      animation-name: ${ae};
      animation-duration: ${H}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    &.${P.ripplePulsate} {
      animation-duration: ${e.transitions.duration.shorter}ms;
    }

    & .${P.childLeaving} {
      animation-name: ${J};
      animation-duration: ${H}ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
    }

    & .${P.childPulsate} {
      animation-name: ${Y};
      animation-duration: 2500ms;
      animation-timing-function: ${e.transitions.easing.easeInOut};
      animation-iteration-count: infinite;
      animation-delay: 200ms;
    }
  `;return e.motion.reducedMotion===`system`?d`
      @media (prefers-reduced-motion: no-preference) {
        ${t}
      }
    `:t}var se=c(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),ce=c(N,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${P.rippleVisible} {
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
  & .${P.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${P.childLeaving} {
    opacity: 0;
  }

  & .${P.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
  }

  ${({theme:e})=>oe(e)}
`,le=v.forwardRef(function(e,t){let n=l({props:e,name:`MuiTouchRipple`}),r=V(g().motion.reducedMotion,!1),{center:i=!1,classes:a=U,className:o,...s}=n,[c,d]=v.useState({items:W,order:W}),f=c.items,p=v.useRef(0),m=v.useRef(null),h=v.useRef(!1);k(()=>(h.current=!0,()=>{h.current=!1})),v.useEffect(()=>{m.current&&=(m.current(),null)},[f]);let _=v.useRef(!1),b=j(),x=v.useRef(null),S=v.useRef(null),C=y(e=>{h.current&&d(t=>{let n=t.items.filter(t=>t.key!==e);return{items:n,order:K(t.order.filter(t=>t!==e),n.filter(e=>!e.exiting).map(e=>e.key))}})}),w=y(e=>{let{pulsate:t,rippleX:n,rippleY:r,rippleSize:i,cb:a}=e,o=p.current;p.current+=1,d(e=>{let a=[...e.items,{key:o,pulsate:t,rippleX:n,rippleY:r,rippleSize:i,exiting:!1}];return{items:a,order:K(e.order,a.filter(e=>!e.exiting).map(e=>e.key))}}),m.current=a}),T=y((e=U,t=U,n=G)=>{let{pulsate:r=!1,center:a=i||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&_.current){_.current=!1;return}e?.type===`touchstart`&&(_.current=!0);let{rippleX:s,rippleY:c,rippleSize:l}=q({event:e,element:o?null:S.current,center:a});e?.touches?x.current===null&&(x.current=()=>{w({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})},b.start(80,()=>{x.current&&=(x.current(),null)})):w({pulsate:r,rippleX:s,rippleY:c,rippleSize:l,cb:n})}),E=y(()=>{T(U,{pulsate:!0})}),D=y((e,t)=>{if(b.clear(),e?.type===`touchend`&&x.current){x.current(),x.current=null,b.start(0,()=>{D(e,t)});return}x.current=null,d(e=>{let t=e.items.findIndex(e=>!e.exiting);if(t===-1)return e;let n=e.items.slice();return n[t]={...n[t],exiting:!0},{items:n,order:K(e.order,n.filter(e=>!e.exiting).map(e=>e.key))}}),m.current=t});v.useImperativeHandle(t,()=>({pulsate:E,start:T,stop:D}),[E,T,D]);let O=new Map(f.map(e=>[e.key,e])),A=c.order.map(e=>O.get(e)).filter(Boolean);return(0,M.jsx)(se,{className:u(P.root,a.root,o),ref:S,...s,children:A.map(e=>(0,M.jsx)(ce,{classes:{ripple:u(a.ripple,P.ripple),rippleVisible:u(a.rippleVisible,P.rippleVisible),ripplePulsate:u(a.ripplePulsate,P.ripplePulsate),child:u(a.child,P.child),childLeaving:u(a.childLeaving,P.childLeaving),childPulsate:u(a.childPulsate,P.childPulsate)},timeout:r.shouldReduceMotion?0:H,pulsate:e.pulsate,rippleX:e.rippleX,rippleY:e.rippleY,rippleSize:e.rippleSize,in:!e.exiting,onExited:()=>C(e.key)},e.key))})});function X(e){return r(`MuiButtonBase`,e)}var Z=i(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),ue=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:o}=e,s=a({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},X,o);return n&&!i&&r&&(s.root+=` ${r}`),s},de=c(`button`,{name:`MuiButtonBase`,slot:`Root`})(o(({theme:e})=>({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${Z.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`},variants:[{props:{internalDisabledThemeFocusVisible:!1},style:e.focusVisible&&{...s,[`&.${Z.focusVisible}`]:e.focusVisible}}]}))),fe=v.forwardRef(function(e,t){let n=l({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:s=`button`,disabled:c=!1,disableRipple:d=!1,disableTouchRipple:f=!1,focusRipple:p=!1,focusVisibleClassName:m,focusableWhenDisabled:g,suppressFocusVisible:b=!1,internalNativeButton:x,internalDisabledThemeFocusVisible:C=!1,LinkComponent:w=`a`,nativeButton:T,onBlur:D,onClick:O,onContextMenu:k,onDragLeave:A,onFocus:j,onFocusVisible:N,onKeyDown:P,onKeyUp:F,onMouseDown:ee,onMouseLeave:I,onMouseUp:te,onTouchEnd:L,onTouchMove:ne,onTouchStart:re,tabIndex:R=0,TouchRippleProps:z,touchRippleRef:ie,type:B,...V}=n,H=!!(V.href||V.to),U=!!V.formAction,W=s;W===`button`&&H&&(W=w);let G=typeof W==`string`?W===`button`:x??!1,K=T??G,q=E(),ae=h(q.ref,ie),[J,Y]=v.useState(!1);(c||b)&&J&&Y(!1);let oe=y(e=>{p&&!e.repeat&&J&&e.key===` `&&q.stop(e,()=>{q.start(e)})}),se=y(e=>{p&&e.key===` `&&J&&!e.defaultPrevented&&q.stop(e,()=>{q.pulsate(e)})}),{getButtonProps:ce,rootRef:X}=S({nativeButton:K,nativeButtonProp:T,internalNativeButton:G,allowInferredHostMismatch:H||typeof W==`string`,disabled:c,type:B,hasFormAction:U,tabIndex:R,onBeforeKeyDown:oe,onBeforeKeyUp:se}),{onClick:Z,onKeyDown:fe,onKeyUp:pe,...me}=ce({onClick:O,onKeyDown:P,onKeyUp:F});v.useImperativeHandle(r,()=>({focusVisible:()=>{Y(!0),X.current.focus()}}),[X]);let he=q.shouldMount&&!d&&!c;v.useEffect(()=>{J&&p&&!d&&q.pulsate()},[d,p,J,q]);let ge=Q(q,`start`,ee,f),_e=Q(q,`stop`,k,f),ve=Q(q,`stop`,A,f),ye=Q(q,`stop`,te,f),be=Q(q,`stop`,e=>{J&&e.preventDefault(),I&&I(e)},f),xe=Q(q,`start`,re,f),Se=Q(q,`stop`,L,f),Ce=Q(q,`stop`,ne,f),we=Q(q,`stop`,e=>{_(e.target)||Y(!1),D&&D(e)},!1),Te=y(e=>{X.current||=e.currentTarget,!b&&_(e.target)&&(Y(!0),N&&N(e)),j&&j(e)}),$={};H&&($.tabIndex=c?-1:R,c&&($[`aria-disabled`]=c),$.type=B);let Ee=h(t,X),De={...n,centerRipple:i,component:s,disabled:c,disableRipple:d,disableTouchRipple:f,focusRipple:p,suppressFocusVisible:b,tabIndex:R,focusVisible:J,internalDisabledThemeFocusVisible:C},Oe=ue(De);return(0,M.jsxs)(de,{as:W,className:u(Oe.root,o),ownerState:De,onBlur:we,onClick:Z,onContextMenu:_e,onFocus:Te,onKeyDown:fe,onKeyUp:pe,onMouseDown:ge,onMouseLeave:be,onMouseUp:ye,onDragLeave:ve,onTouchEnd:Se,onTouchMove:Ce,onTouchStart:xe,ref:Ee,...H?$:me,...V,children:[a,he?(0,M.jsx)(le,{ref:ae,center:i,...z}):null]})});function Q(e,t,n,r=!1){return y(i=>(n&&n(i),r||e[t](i),!0))}export{j as a,A as i,Z as n,w as o,V as r,y as s,fe as t};