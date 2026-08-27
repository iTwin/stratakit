import{F as e,R as t,t as n}from"./jsx-runtime-BkI_Ul-C.js";import{G as r,b as i,d as a,r as o,t as s,x as c,y as l}from"./DefaultPropsProvider-Xm3r8pJu.js";import{r as u}from"./emotion-react.browser.esm-DYtlJFTy.js";import{n as d,t as f}from"./useForkRef-zBCZ8m4C.js";import{t as p}from"./isFocusVisible-CmHL3Ev5.js";var m=t(e(),1),h=d;function g(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return m.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var _={};function v(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=m.useRef(null),h=l===!0,v=g({focusableWhenDisabled:h,disabled:a,isNativeButton:t,tabIndex:c}),y=m.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),b=m.useMemo(()=>{let e=h?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,h||(e.disabled=a)):(e.role=`button`,!h&&a&&(e[`aria-disabled`]=a)),h?{...e,...v}:e},[a,h,v,s,t,c,o]);return{getButtonProps:m.useCallback((e=_)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(h&&v.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||y()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!y()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{...b,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[b,a,h,v,y,d,f,u]),rootRef:p}}var y={};function b(e,t){let n=m.useRef(y);return n.current===y&&(n.current=e(t)),n}var x=class e{static create(){return new e}static use(){let t=b(e.create).current,[n,r]=m.useState(!1);return t.shouldMount=n,t.setShouldMount=r,m.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=S(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function ee(){return x.use()}function S(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}function C(e,t){if(e==null)return{};var n={};for(var r in e)if({}.hasOwnProperty.call(e,r)){if(t.indexOf(r)!==-1)continue;n[r]=e[r]}return n}function w(e,t){return w=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},w(e,t)}function T(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,w(e,t)}var E=m.createContext(null);function te(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function D(e,t){var n=function(e){return t&&(0,m.isValidElement)(e)?t(e):e},r=Object.create(null);return e&&m.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=n(e)}),r}function O(e,t){e||={},t||={};function n(n){return n in t?t[n]:e[n]}var r=Object.create(null),i=[];for(var a in e)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var o,s={};for(var c in t){if(r[c])for(o=0;o<r[c].length;o++){var l=r[c][o];s[r[c][o]]=n(l)}s[c]=n(c)}for(o=0;o<i.length;o++)s[i[o]]=n(i[o]);return s}function k(e,t,n){return n[t]==null?e.props[t]:n[t]}function A(e,t){return D(e.children,function(n){return(0,m.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:k(n,`appear`,e),enter:k(n,`enter`,e),exit:k(n,`exit`,e)})})}function j(e,t,n){var r=D(e.children),i=O(t,r);return Object.keys(i).forEach(function(a){var o=i[a];if((0,m.isValidElement)(o)){var s=a in t,c=a in r,l=t[a],u=(0,m.isValidElement)(l)&&!l.props.in;c&&(!s||u)?i[a]=(0,m.cloneElement)(o,{onExited:n.bind(null,o),in:!0,exit:k(o,`exit`,e),enter:k(o,`enter`,e)}):!c&&s&&!u?i[a]=(0,m.cloneElement)(o,{in:!1}):c&&s&&(0,m.isValidElement)(l)&&(i[a]=(0,m.cloneElement)(o,{onExited:n.bind(null,o),in:l.props.in,exit:k(o,`exit`,e),enter:k(o,`enter`,e)}))}}),i}var M=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},N={component:`div`,childFactory:function(e){return e}},P=function(e){T(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(te(r)),firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?A(e,r):j(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=D(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=r({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=C(e,[`component`,`childFactory`]),i=this.state.contextValue,a=M(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,t===null?m.createElement(E.Provider,{value:i},a):m.createElement(E.Provider,{value:i},m.createElement(t,r,a))},t}(m.Component);P.propTypes={},P.defaultProps=N;var F=[];function I(e){m.useEffect(e,F)}var L=class e{static create(){return new e}currentId=null;start(e,t){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,t()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function R(){let e=b(L.create).current;return I(e.disposeEffect),e}var z=n();function B(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:l,timeout:u}=e,[d,f]=m.useState(!1),p=c(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),h={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},g=c(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),m.useEffect(()=>{if(!s&&l!=null){let e=setTimeout(l,u);return()=>{clearTimeout(e)}}},[l,s,u]),(0,z.jsx)(`span`,{className:p,style:h,children:(0,z.jsx)(`span`,{className:g})})}var V=l(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),H=550,U=u`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,W=u`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,G=u`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,K=o(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),q=o(B,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${V.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${U};
    animation-duration: ${H}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${V.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${V.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${V.childLeaving} {
    opacity: 0;
    animation-name: ${W};
    animation-duration: ${H}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${V.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${G};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,ne=m.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=s({props:e,name:`MuiTouchRipple`}),[o,l]=m.useState([]),u=m.useRef(0),d=m.useRef(null);m.useEffect(()=>{d.current&&=(d.current(),null)},[o]);let f=m.useRef(!1),p=R(),h=m.useRef(null),g=m.useRef(null),_=m.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;l(e=>[...e,(0,z.jsx)(q,{classes:{ripple:c(r.ripple,V.ripple),rippleVisible:c(r.rippleVisible,V.rippleVisible),ripplePulsate:c(r.ripplePulsate,V.ripplePulsate),child:c(r.child,V.child),childLeaving:c(r.childLeaving,V.childLeaving),childPulsate:c(r.childPulsate,V.childPulsate)},timeout:H,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},u.current)]),u.current+=1,d.current=o},[r]),v=m.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&f.current){f.current=!1;return}e?.type===`touchstart`&&(f.current=!0);let s=o?null:g.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,d;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)d=Math.sqrt((2*c.width**2+c.height**2)/3),d%2==0&&(d+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;d=Math.sqrt(e**2+t**2)}e?.touches?h.current===null&&(h.current=()=>{_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},p.start(80,()=>{h.current&&=(h.current(),null)})):_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},[n,_,p]),y=m.useCallback(()=>{v({},{pulsate:!0})},[v]),b=m.useCallback((e,t)=>{if(p.clear(),e?.type===`touchend`&&h.current){h.current(),h.current=null,p.start(0,()=>{b(e,t)});return}h.current=null,l(e=>e.length>0?e.slice(1):e),d.current=t},[p]);return m.useImperativeHandle(t,()=>({pulsate:y,start:v,stop:b}),[y,v,b]),(0,z.jsx)(K,{className:c(V.root,r.root,i),ref:g,...a,children:(0,z.jsx)(P,{component:null,exit:!0,children:o})})});function re(e){return i(`MuiButtonBase`,e)}var J=l(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),ie=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:o}=e,s=a({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},re,o);return n&&!i&&r&&(s.root+=` ${r}`),s},ae=o(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${J.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),oe=m.forwardRef(function(e,t){let n=s({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:l=`button`,disabled:u=!1,disableRipple:d=!1,disableTouchRipple:g=!1,focusRipple:_=!1,focusVisibleClassName:y,focusableWhenDisabled:b,suppressFocusVisible:x=!1,internalNativeButton:S,LinkComponent:C=`a`,nativeButton:w,onBlur:T,onClick:E,onContextMenu:te,onDragLeave:D,onFocus:O,onFocusVisible:k,onKeyDown:A,onKeyUp:j,onMouseDown:M,onMouseLeave:N,onMouseUp:P,onTouchEnd:F,onTouchMove:I,onTouchStart:L,tabIndex:R=0,TouchRippleProps:B,touchRippleRef:V,type:H,...U}=n,W=!!(U.href||U.to),G=!!U.formAction,K=l;K===`button`&&W&&(K=C);let q=typeof K==`string`?K===`button`:S??!1,re=w??q,J=ee(),oe=f(J.ref,V),[X,Z]=m.useState(!1);(u||x)&&X&&Z(!1);let se=h(e=>{_&&!e.repeat&&X&&e.key===` `&&J.stop(e,()=>{J.start(e)})}),ce=h(e=>{_&&e.key===` `&&X&&!e.defaultPrevented&&J.stop(e,()=>{J.pulsate(e)})}),{getButtonProps:le,rootRef:Q}=v({nativeButton:re,nativeButtonProp:w,internalNativeButton:q,allowInferredHostMismatch:W||typeof K==`string`,disabled:u,type:H,hasFormAction:G,tabIndex:R,onBeforeKeyDown:se,onBeforeKeyUp:ce}),{onClick:ue,onKeyDown:de,onKeyUp:fe,...pe}=le({onClick:E,onKeyDown:A,onKeyUp:j});m.useImperativeHandle(r,()=>({focusVisible:()=>{Z(!0),Q.current.focus()}}),[Q]);let me=J.shouldMount&&!d&&!u;m.useEffect(()=>{X&&_&&!d&&J.pulsate()},[d,_,X,J]);let he=Y(J,`start`,M,g),ge=Y(J,`stop`,te,g),_e=Y(J,`stop`,D,g),ve=Y(J,`stop`,P,g),ye=Y(J,`stop`,e=>{X&&e.preventDefault(),N&&N(e)},g),be=Y(J,`start`,L,g),xe=Y(J,`stop`,F,g),Se=Y(J,`stop`,I,g),Ce=Y(J,`stop`,e=>{p(e.target)||Z(!1),T&&T(e)},!1),we=h(e=>{Q.current||=e.currentTarget,!x&&p(e.target)&&(Z(!0),k&&k(e)),O&&O(e)}),$={};W&&($.tabIndex=u?-1:R,u&&($[`aria-disabled`]=u),$.type=H);let Te=f(t,Q),Ee={...n,centerRipple:i,component:l,disabled:u,disableRipple:d,disableTouchRipple:g,focusRipple:_,suppressFocusVisible:x,tabIndex:R,focusVisible:X},De=ie(Ee);return(0,z.jsxs)(ae,{as:K,className:c(De.root,o),ownerState:Ee,onBlur:Ce,onClick:ue,onContextMenu:ge,onFocus:we,onKeyDown:de,onKeyUp:fe,onMouseDown:he,onMouseLeave:ye,onMouseUp:ve,onDragLeave:_e,onTouchEnd:xe,onTouchMove:Se,onTouchStart:be,ref:Te,...W?$:pe,...U,children:[a,me?(0,z.jsx)(ne,{ref:oe,center:i,...B}):null]})});function Y(e,t,n,r=!1){return h(i=>(n&&n(i),r||e[t](i),!0))}export{E as a,h as c,P as i,L as n,T as o,R as r,C as s,oe as t};