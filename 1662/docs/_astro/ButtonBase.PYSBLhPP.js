import{i as e,n as t,t as n}from"./jsx-runtime.Cltr0gcK.js";import{G as r,b as i,d as a,r as o,t as s,x as c,y as l}from"./DefaultPropsProvider.BFMl2K7d.js";import{r as u}from"./emotion-react.browser.esm.BjTv-w6J.js";import{t as d}from"./useForkRef.DZs4GmLT.js";import{a as f,i as p,n as m,o as h,r as g,s as _}from"./useTimeout.DYxXW7z7.js";import{t as v}from"./isFocusVisible.CmHL3Ev5.js";var y=e(t(),1);function b(e){let{focusableWhenDisabled:t,disabled:n,composite:r=!1,tabIndex:i=0,isNativeButton:a}=e,o=r&&t!==!1,s=r&&t===!1;return y.useMemo(()=>{let e={onKeyDown(e){n&&t&&e.key!==`Tab`&&e.preventDefault()}};return r||(e.tabIndex=i,!a&&n&&(e.tabIndex=t?i:-1)),(a&&(t||o)||!a&&n)&&(e[`aria-disabled`]=n),a&&(!t||s)&&(e.disabled=n),e},[r,n,t,o,s,a,i])}var x={};function ee(e){let{nativeButton:t,nativeButtonProp:n,internalNativeButton:r=t,allowInferredHostMismatch:i=!1,disabled:a,type:o,hasFormAction:s=!1,tabIndex:c=0,focusableWhenDisabled:l,stopEventPropagation:u=!1,onBeforeKeyDown:d,onBeforeKeyUp:f}=e,p=y.useRef(null),m=l===!0,h=b({focusableWhenDisabled:m,disabled:a,isNativeButton:t,tabIndex:c}),g=y.useCallback(()=>{let e=p.current;return e==null?t:e.tagName===`BUTTON`||!!(e.tagName===`A`&&e.href)},[t]),_=y.useMemo(()=>{let e=m?{}:{tabIndex:a?-1:c};return t?(e.type=o===void 0&&!s?`button`:o,m||(e.disabled=a)):(e.role=`button`,!m&&a&&(e[`aria-disabled`]=a)),m?{...e,...h}:e},[a,m,h,s,t,c,o]);return{getButtonProps:y.useCallback((e=x)=>{let{onClick:t,onKeyDown:n,onKeyUp:r,...i}=e,o=e=>{if(u&&e.stopPropagation(),a){e.preventDefault();return}t?.(e)},s=e=>{if(m&&h.onKeyDown(e),!a&&(d?.(e),n?.(e),!(e.target!==e.currentTarget||g()))){if(e.key===` `){e.preventDefault();return}e.key===`Enter`&&(e.preventDefault(),e.currentTarget.click())}},c=e=>{a||(f?.(e),r?.(e),e.target===e.currentTarget&&!g()&&e.key===` `&&!e.defaultPrevented&&e.currentTarget.click())};return{..._,...i,onClick:o,onKeyDown:s,onKeyUp:c}},[_,a,m,h,g,d,f,u]),rootRef:p}}var S=class e{static create(){return new e}static use(){let t=h(e.create).current,[n,r]=y.useState(!1);return t.shouldMount=n,t.setShouldMount=r,y.useEffect(t.mountEffect,[n]),t}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=C(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function te(){return S.use()}function C(){let e,t,n=new Promise((n,r)=>{e=n,t=r});return n.resolve=e,n.reject=t,n}function w(e){if(e===void 0)throw ReferenceError(`this hasn't been initialised - super() hasn't been called`);return e}function T(e,t){var n=function(e){return t&&(0,y.isValidElement)(e)?t(e):e},r=Object.create(null);return e&&y.Children.map(e,function(e){return e}).forEach(function(e){r[e.key]=n(e)}),r}function E(e,t){e||={},t||={};function n(n){return n in t?t[n]:e[n]}var r=Object.create(null),i=[];for(var a in e)a in t?i.length&&(r[a]=i,i=[]):i.push(a);var o,s={};for(var c in t){if(r[c])for(o=0;o<r[c].length;o++){var l=r[c][o];s[r[c][o]]=n(l)}s[c]=n(c)}for(o=0;o<i.length;o++)s[i[o]]=n(i[o]);return s}function D(e,t,n){return n[t]==null?e.props[t]:n[t]}function O(e,t){return T(e.children,function(n){return(0,y.cloneElement)(n,{onExited:t.bind(null,n),in:!0,appear:D(n,`appear`,e),enter:D(n,`enter`,e),exit:D(n,`exit`,e)})})}function k(e,t,n){var r=T(e.children),i=E(t,r);return Object.keys(i).forEach(function(a){var o=i[a];if((0,y.isValidElement)(o)){var s=a in t,c=a in r,l=t[a],u=(0,y.isValidElement)(l)&&!l.props.in;c&&(!s||u)?i[a]=(0,y.cloneElement)(o,{onExited:n.bind(null,o),in:!0,exit:D(o,`exit`,e),enter:D(o,`enter`,e)}):!c&&s&&!u?i[a]=(0,y.cloneElement)(o,{in:!1}):c&&s&&(0,y.isValidElement)(l)&&(i[a]=(0,y.cloneElement)(o,{onExited:n.bind(null,o),in:l.props.in,exit:D(o,`exit`,e),enter:D(o,`enter`,e)}))}}),i}var A=Object.values||function(e){return Object.keys(e).map(function(t){return e[t]})},j={component:`div`,childFactory:function(e){return e}},M=function(e){p(t,e);function t(t,n){var r=e.call(this,t,n)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(w(r)),firstRender:!0},r}var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n=t.children,r=t.handleExited;return{children:t.firstRender?O(e,r):k(e,n,r),firstRender:!1}},n.handleExited=function(e,t){var n=T(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState(function(t){var n=r({},t.children);return delete n[e.key],{children:n}}))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,r=f(e,[`component`,`childFactory`]),i=this.state.contextValue,a=A(this.state.children).map(n);return delete r.appear,delete r.enter,delete r.exit,t===null?y.createElement(g.Provider,{value:i},a):y.createElement(g.Provider,{value:i},y.createElement(t,r,a))},t}(y.Component);M.propTypes={},M.defaultProps=j;var N=n();function P(e){let{className:t,classes:n,pulsate:r=!1,rippleX:i,rippleY:a,rippleSize:o,in:s,onExited:l,timeout:u}=e,[d,f]=y.useState(!1),p=c(t,n.ripple,n.rippleVisible,r&&n.ripplePulsate),m={width:o,height:o,top:-(o/2)+a,left:-(o/2)+i},h=c(n.child,d&&n.childLeaving,r&&n.childPulsate);return!s&&!d&&f(!0),y.useEffect(()=>{if(!s&&l!=null){let e=setTimeout(l,u);return()=>{clearTimeout(e)}}},[l,s,u]),(0,N.jsx)(`span`,{className:p,style:m,children:(0,N.jsx)(`span`,{className:h})})}var F=l(`MuiTouchRipple`,[`root`,`ripple`,`rippleVisible`,`ripplePulsate`,`child`,`childLeaving`,`childPulsate`]),I=550,L=u`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,R=u`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,z=u`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,B=o(`span`,{name:`MuiTouchRipple`,slot:`Root`})({overflow:`hidden`,pointerEvents:`none`,position:`absolute`,zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:`inherit`}),V=o(P,{name:`MuiTouchRipple`,slot:`Ripple`})`
  opacity: 0;
  position: absolute;

  &.${F.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${L};
    animation-duration: ${I}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  &.${F.ripplePulsate} {
    animation-duration: ${({theme:e})=>e.transitions.duration.shorter}ms;
  }

  & .${F.child} {
    opacity: 1;
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: currentColor;
  }

  & .${F.childLeaving} {
    opacity: 0;
    animation-name: ${R};
    animation-duration: ${I}ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
  }

  & .${F.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${z};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:e})=>e.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,ne=y.forwardRef(function(e,t){let{center:n=!1,classes:r={},className:i,...a}=s({props:e,name:`MuiTouchRipple`}),[o,l]=y.useState([]),u=y.useRef(0),d=y.useRef(null);y.useEffect(()=>{d.current&&=(d.current(),null)},[o]);let f=y.useRef(!1),p=m(),h=y.useRef(null),g=y.useRef(null),_=y.useCallback(e=>{let{pulsate:t,rippleX:n,rippleY:i,rippleSize:a,cb:o}=e;l(e=>[...e,(0,N.jsx)(V,{classes:{ripple:c(r.ripple,F.ripple),rippleVisible:c(r.rippleVisible,F.rippleVisible),ripplePulsate:c(r.ripplePulsate,F.ripplePulsate),child:c(r.child,F.child),childLeaving:c(r.childLeaving,F.childLeaving),childPulsate:c(r.childPulsate,F.childPulsate)},timeout:I,pulsate:t,rippleX:n,rippleY:i,rippleSize:a},u.current)]),u.current+=1,d.current=o},[r]),v=y.useCallback((e={},t={},r=()=>{})=>{let{pulsate:i=!1,center:a=n||t.pulsate,fakeElement:o=!1}=t;if(e?.type===`mousedown`&&f.current){f.current=!1;return}e?.type===`touchstart`&&(f.current=!0);let s=o?null:g.current,c=s?s.getBoundingClientRect():{width:0,height:0,left:0,top:0},l,u,d;if(a||e===void 0||e.clientX===0&&e.clientY===0||!e.clientX&&!e.touches)l=Math.round(c.width/2),u=Math.round(c.height/2);else{let{clientX:t,clientY:n}=e.touches&&e.touches.length>0?e.touches[0]:e;l=Math.round(t-c.left),u=Math.round(n-c.top)}if(a)d=Math.sqrt((2*c.width**2+c.height**2)/3),d%2==0&&(d+=1);else{let e=Math.max(Math.abs((s?s.clientWidth:0)-l),l)*2+2,t=Math.max(Math.abs((s?s.clientHeight:0)-u),u)*2+2;d=Math.sqrt(e**2+t**2)}e?.touches?h.current===null&&(h.current=()=>{_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},p.start(80,()=>{h.current&&=(h.current(),null)})):_({pulsate:i,rippleX:l,rippleY:u,rippleSize:d,cb:r})},[n,_,p]),b=y.useCallback(()=>{v({},{pulsate:!0})},[v]),x=y.useCallback((e,t)=>{if(p.clear(),e?.type===`touchend`&&h.current){h.current(),h.current=null,p.start(0,()=>{x(e,t)});return}h.current=null,l(e=>e.length>0?e.slice(1):e),d.current=t},[p]);return y.useImperativeHandle(t,()=>({pulsate:b,start:v,stop:x}),[b,v,x]),(0,N.jsx)(B,{className:c(F.root,r.root,i),ref:g,...a,children:(0,N.jsx)(M,{component:null,exit:!0,children:o})})});function H(e){return i(`MuiButtonBase`,e)}var U=l(`MuiButtonBase`,[`root`,`disabled`,`focusVisible`]),re=e=>{let{disabled:t,focusVisible:n,focusVisibleClassName:r,suppressFocusVisible:i,classes:o}=e,s=a({root:[`root`,t&&`disabled`,n&&!i&&`focusVisible`]},H,o);return n&&!i&&r&&(s.root+=` ${r}`),s},ie=o(`button`,{name:`MuiButtonBase`,slot:`Root`})({display:`inline-flex`,alignItems:`center`,justifyContent:`center`,position:`relative`,boxSizing:`border-box`,WebkitTapHighlightColor:`transparent`,backgroundColor:`transparent`,outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:`pointer`,userSelect:`none`,verticalAlign:`middle`,MozAppearance:`none`,WebkitAppearance:`none`,textDecoration:`none`,color:`inherit`,"&::-moz-focus-inner":{borderStyle:`none`},[`&.${U.disabled}`]:{pointerEvents:`none`,cursor:`default`},"@media print":{colorAdjust:`exact`}}),W=y.forwardRef(function(e,t){let n=s({props:e,name:`MuiButtonBase`}),{action:r,centerRipple:i=!1,children:a,className:o,component:l=`button`,disabled:u=!1,disableRipple:f=!1,disableTouchRipple:p=!1,focusRipple:m=!1,focusVisibleClassName:h,focusableWhenDisabled:g,suppressFocusVisible:b=!1,internalNativeButton:x,LinkComponent:S=`a`,nativeButton:C,onBlur:w,onClick:T,onContextMenu:E,onDragLeave:D,onFocus:O,onFocusVisible:k,onKeyDown:A,onKeyUp:j,onMouseDown:M,onMouseLeave:P,onMouseUp:F,onTouchEnd:I,onTouchMove:L,onTouchStart:R,tabIndex:z=0,TouchRippleProps:B,touchRippleRef:V,type:H,...U}=n,W=!!(U.href||U.to),ae=!!U.formAction,K=l;K===`button`&&W&&(K=S);let q=typeof K==`string`?K===`button`:x??!1,oe=C??q,J=te(),se=d(J.ref,V),[Y,X]=y.useState(!1);(u||b)&&Y&&X(!1);let ce=_(e=>{m&&!e.repeat&&Y&&e.key===` `&&J.stop(e,()=>{J.start(e)})}),le=_(e=>{m&&e.key===` `&&Y&&!e.defaultPrevented&&J.stop(e,()=>{J.pulsate(e)})}),{getButtonProps:ue,rootRef:Z}=ee({nativeButton:oe,nativeButtonProp:C,internalNativeButton:q,allowInferredHostMismatch:W||typeof K==`string`,disabled:u,type:H,hasFormAction:ae,tabIndex:z,onBeforeKeyDown:ce,onBeforeKeyUp:le}),{onClick:de,onKeyDown:fe,onKeyUp:pe,...me}=ue({onClick:T,onKeyDown:A,onKeyUp:j});y.useImperativeHandle(r,()=>({focusVisible:()=>{X(!0),Z.current.focus()}}),[Z]);let he=J.shouldMount&&!f&&!u;y.useEffect(()=>{Y&&m&&!f&&J.pulsate()},[f,m,Y,J]);let ge=G(J,`start`,M,p),_e=G(J,`stop`,E,p),ve=G(J,`stop`,D,p),ye=G(J,`stop`,F,p),be=G(J,`stop`,e=>{Y&&e.preventDefault(),P&&P(e)},p),xe=G(J,`start`,R,p),Se=G(J,`stop`,I,p),Ce=G(J,`stop`,L,p),we=G(J,`stop`,e=>{v(e.target)||X(!1),w&&w(e)},!1),Te=_(e=>{Z.current||=e.currentTarget,!b&&v(e.target)&&(X(!0),k&&k(e)),O&&O(e)}),Q={};W&&(Q.tabIndex=u?-1:z,u&&(Q[`aria-disabled`]=u),Q.type=H);let Ee=d(t,Z),$={...n,centerRipple:i,component:l,disabled:u,disableRipple:f,disableTouchRipple:p,focusRipple:m,suppressFocusVisible:b,tabIndex:z,focusVisible:Y},De=re($);return(0,N.jsxs)(ie,{as:K,className:c(De.root,o),ownerState:$,onBlur:we,onClick:de,onContextMenu:_e,onFocus:Te,onKeyDown:fe,onKeyUp:pe,onMouseDown:ge,onMouseLeave:be,onMouseUp:ye,onDragLeave:ve,onTouchEnd:Se,onTouchMove:Ce,onTouchStart:xe,ref:Ee,...W?Q:me,...U,children:[a,he?(0,N.jsx)(ne,{ref:se,center:i,...B}):null]})});function G(e,t,n,r=!1){return _(i=>(n&&n(i),r||e[t](i),!0))}export{M as n,W as t};