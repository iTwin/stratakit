import{Z as je,et as Fe,t as _e}from"./jsx-runtime-CvPTumEY.js";import{G as $e,b as ze,d as We,r as J,t as ue,x as T,y as ce}from"./DefaultPropsProvider-DZ2m2oiU.js";import{r as Q}from"./emotion-react.browser.esm-DAePtcFO.js";import{n as Ae,t as ie}from"./useForkRef-bRDGXxHy.js";import{t as se}from"./isFocusVisible-w_xKdOwj.js";var a=Fe(je(),1),H=Ae;function Ye(t){const{focusableWhenDisabled:e,disabled:n,composite:i=!1,tabIndex:o=0,isNativeButton:r}=t,s=i&&e!==!1,u=i&&e===!1;return a.useMemo(()=>{const l={onKeyDown(p){n&&e&&p.key!=="Tab"&&p.preventDefault()}};return i||(l.tabIndex=o,!r&&n&&(l.tabIndex=e?o:-1)),(r&&(e||s)||!r&&n)&&(l["aria-disabled"]=n),r&&(!e||u)&&(l.disabled=n),l},[i,n,e,s,u,r,o])}var He={};function Xe(t){const{nativeButton:e,nativeButtonProp:n,internalNativeButton:i=e,allowInferredHostMismatch:o=!1,disabled:r,type:s,hasFormAction:u=!1,tabIndex:l=0,focusableWhenDisabled:p,stopEventPropagation:f=!1,onBeforeKeyDown:b,onBeforeKeyUp:y}=t,v=a.useRef(null),M=p===!0,x=Ye({focusableWhenDisabled:M,disabled:r,isNativeButton:e,tabIndex:l}),B=a.useCallback(()=>{const h=v.current;return h==null?e:h.tagName==="BUTTON"?!0:!!(h.tagName==="A"&&h.href)},[e]),V=a.useMemo(()=>{const h=M?{}:{tabIndex:r?-1:l};return e?(h.type=s===void 0&&!u?"button":s,M||(h.disabled=r)):(h.role="button",!M&&r&&(h["aria-disabled"]=r)),M?{...h,...x}:h},[r,M,x,u,e,l,s]);return{getButtonProps:a.useCallback((h=He)=>{const{onClick:d,onKeyDown:R,onKeyUp:C,...k}=h;return{...V,...k,onClick:c=>{if(f&&c.stopPropagation(),r){c.preventDefault();return}d?.(c)},onKeyDown:c=>{if(M&&x.onKeyDown(c),!r&&(b?.(c),R?.(c),!(c.target!==c.currentTarget||B()))){if(c.key===" "){c.preventDefault();return}c.key==="Enter"&&(c.preventDefault(),c.currentTarget.click())}},onKeyUp:c=>{r||(y?.(c),C?.(c),c.target===c.currentTarget&&!B()&&c.key===" "&&!c.defaultPrevented&&c.currentTarget.click())}}},[V,r,M,x,B,b,y,f]),rootRef:v}}var ae={};function pe(t,e){const n=a.useRef(ae);return n.current===ae&&(n.current=t(e)),n}var qe=class q{static create(){return new q}static use(){const e=pe(q.create).current,[n,i]=a.useState(!1);return e.shouldMount=n,e.setShouldMount=i,a.useEffect(e.mountEffect,[n]),e}constructor(){this.ref={current:null},this.mounted=null,this.didMount=!1,this.shouldMount=!1,this.setShouldMount=null}mount(){return this.mounted||(this.mounted=Ze(),this.shouldMount=!0,this.setShouldMount(this.shouldMount)),this.mounted}mountEffect=()=>{this.shouldMount&&!this.didMount&&this.ref.current!==null&&(this.didMount=!0,this.mounted.resolve())};start(...e){this.mount().then(()=>this.ref.current?.start(...e))}stop(...e){this.mount().then(()=>this.ref.current?.stop(...e))}pulsate(...e){this.mount().then(()=>this.ref.current?.pulsate(...e))}};function Ge(){return qe.use()}function Ze(){let t,e;const n=new Promise((i,o)=>{t=i,e=o});return n.resolve=t,n.reject=e,n}function Je(t,e){if(t==null)return{};var n={};for(var i in t)if({}.hasOwnProperty.call(t,i)){if(e.indexOf(i)!==-1)continue;n[i]=t[i]}return n}function G(t,e){return G=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(n,i){return n.__proto__=i,n},G(t,e)}function Qe(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,G(t,e)}var le=a.createContext(null);function et(t){if(t===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function ee(t,e){var n=function(r){return e&&(0,a.isValidElement)(r)?e(r):r},i=Object.create(null);return t&&a.Children.map(t,function(o){return o}).forEach(function(o){i[o.key]=n(o)}),i}function tt(t,e){t=t||{},e=e||{};function n(f){return f in e?e[f]:t[f]}var i=Object.create(null),o=[];for(var r in t)r in e?o.length&&(i[r]=o,o=[]):o.push(r);var s,u={};for(var l in e){if(i[l])for(s=0;s<i[l].length;s++){var p=i[l][s];u[i[l][s]]=n(p)}u[l]=n(l)}for(s=0;s<o.length;s++)u[o[s]]=n(o[s]);return u}function U(t,e,n){return n[e]!=null?n[e]:t.props[e]}function nt(t,e){return ee(t.children,function(n){return(0,a.cloneElement)(n,{onExited:e.bind(null,n),in:!0,appear:U(n,"appear",t),enter:U(n,"enter",t),exit:U(n,"exit",t)})})}function ot(t,e,n){var i=ee(t.children),o=tt(e,i);return Object.keys(o).forEach(function(r){var s=o[r];if((0,a.isValidElement)(s)){var u=r in e,l=r in i,p=e[r],f=(0,a.isValidElement)(p)&&!p.props.in;l&&(!u||f)?o[r]=(0,a.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:U(s,"exit",t),enter:U(s,"enter",t)}):!l&&u&&!f?o[r]=(0,a.cloneElement)(s,{in:!1}):l&&u&&(0,a.isValidElement)(p)&&(o[r]=(0,a.cloneElement)(s,{onExited:n.bind(null,s),in:p.props.in,exit:U(s,"exit",t),enter:U(s,"enter",t)}))}}),o}var rt=Object.values||function(t){return Object.keys(t).map(function(e){return t[e]})},it={component:"div",childFactory:function(e){return e}},te=(function(t){Qe(e,t);function e(i,o){var r=t.call(this,i,o)||this;return r.state={contextValue:{isMounting:!0},handleExited:r.handleExited.bind(et(r)),firstRender:!0},r}var n=e.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},e.getDerivedStateFromProps=function(o,r){var s=r.children,u=r.handleExited;return{children:r.firstRender?nt(o,u):ot(o,s,u),firstRender:!1}},n.handleExited=function(o,r){var s=ee(this.props.children);o.key in s||(o.props.onExited&&o.props.onExited(r),this.mounted&&this.setState(function(u){var l=$e({},u.children);return delete l[o.key],{children:l}}))},n.render=function(){var o=this.props,r=o.component,s=o.childFactory,u=Je(o,["component","childFactory"]),l=this.state.contextValue,p=rt(this.state.children).map(s);return delete u.appear,delete u.enter,delete u.exit,r===null?a.createElement(le.Provider,{value:l},p):a.createElement(le.Provider,{value:l},a.createElement(r,u,p))},e})(a.Component);te.propTypes={};te.defaultProps=it;var st=[];function at(t){a.useEffect(t,st)}var lt=class fe{static create(){return new fe}currentId=null;start(e,n){this.clear(),this.currentId=setTimeout(()=>{this.currentId=null,n()},e)}clear=()=>{this.currentId!==null&&(clearTimeout(this.currentId),this.currentId=null)};disposeEffect=()=>this.clear};function ut(){const t=pe(lt.create).current;return at(t.disposeEffect),t}var O=_e();function ct(t){const{className:e,classes:n,pulsate:i=!1,rippleX:o,rippleY:r,rippleSize:s,in:u,onExited:l,timeout:p}=t,[f,b]=a.useState(!1),y=T(e,n.ripple,n.rippleVisible,i&&n.ripplePulsate),v={width:s,height:s,top:-(s/2)+r,left:-(s/2)+o},M=T(n.child,f&&n.childLeaving,i&&n.childPulsate);return!u&&!f&&b(!0),a.useEffect(()=>{if(!u&&l!=null){const x=setTimeout(l,p);return()=>{clearTimeout(x)}}},[l,u,p]),(0,O.jsx)("span",{className:y,style:v,children:(0,O.jsx)("span",{className:M})})}var P=ce("MuiTouchRipple",["root","ripple","rippleVisible","ripplePulsate","child","childLeaving","childPulsate"]),Z=550;var pt=Q`
  0% {
    transform: scale(0);
    opacity: 0.1;
  }

  100% {
    transform: scale(1);
    opacity: 0.3;
  }
`,ft=Q`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`,dt=Q`
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(0.92);
  }

  100% {
    transform: scale(1);
  }
`,ht=J("span",{name:"MuiTouchRipple",slot:"Root"})({overflow:"hidden",pointerEvents:"none",position:"absolute",zIndex:0,top:0,right:0,bottom:0,left:0,borderRadius:"inherit"}),mt=J(ct,{name:"MuiTouchRipple",slot:"Ripple"})`
  opacity: 0;
  position: absolute;

  &.${P.rippleVisible} {
    opacity: 0.3;
    transform: scale(1);
    animation-name: ${pt};
    animation-duration: ${Z}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  &.${P.ripplePulsate} {
    animation-duration: ${({theme:t})=>t.transitions.duration.shorter}ms;
  }

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
    animation-name: ${ft};
    animation-duration: ${Z}ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
  }

  & .${P.childPulsate} {
    position: absolute;
    /* @noflip */
    left: 0px;
    top: 0;
    animation-name: ${dt};
    animation-duration: 2500ms;
    animation-timing-function: ${({theme:t})=>t.transitions.easing.easeInOut};
    animation-iteration-count: infinite;
    animation-delay: 200ms;
  }
`,bt=a.forwardRef(function(e,n){const{center:i=!1,classes:o={},className:r,...s}=ue({props:e,name:"MuiTouchRipple"}),[u,l]=a.useState([]),p=a.useRef(0),f=a.useRef(null);a.useEffect(()=>{f.current&&(f.current(),f.current=null)},[u]);const b=a.useRef(!1),y=ut(),v=a.useRef(null),M=a.useRef(null),x=a.useCallback(d=>{const{pulsate:R,rippleX:C,rippleY:k,rippleSize:I,cb:L}=d;l(E=>[...E,(0,O.jsx)(mt,{classes:{ripple:T(o.ripple,P.ripple),rippleVisible:T(o.rippleVisible,P.rippleVisible),ripplePulsate:T(o.ripplePulsate,P.ripplePulsate),child:T(o.child,P.child),childLeaving:T(o.childLeaving,P.childLeaving),childPulsate:T(o.childPulsate,P.childPulsate)},timeout:Z,pulsate:R,rippleX:C,rippleY:k,rippleSize:I},p.current)]),p.current+=1,f.current=L},[o]),B=a.useCallback((d={},R={},C=()=>{})=>{const{pulsate:k=!1,center:I=i||R.pulsate,fakeElement:L=!1}=R;if(d?.type==="mousedown"&&b.current){b.current=!1;return}d?.type==="touchstart"&&(b.current=!0);const E=L?null:M.current,c=E?E.getBoundingClientRect():{width:0,height:0,left:0,top:0};let K,D,N;if(I||d===void 0||d.clientX===0&&d.clientY===0||!d.clientX&&!d.touches)K=Math.round(c.width/2),D=Math.round(c.height/2);else{const{clientX:F,clientY:_}=d.touches&&d.touches.length>0?d.touches[0]:d;K=Math.round(F-c.left),D=Math.round(_-c.top)}if(I)N=Math.sqrt((2*c.width**2+c.height**2)/3),N%2===0&&(N+=1);else{const F=Math.max(Math.abs((E?E.clientWidth:0)-K),K)*2+2,_=Math.max(Math.abs((E?E.clientHeight:0)-D),D)*2+2;N=Math.sqrt(F**2+_**2)}d?.touches?v.current===null&&(v.current=()=>{x({pulsate:k,rippleX:K,rippleY:D,rippleSize:N,cb:C})},y.start(80,()=>{v.current&&(v.current(),v.current=null)})):x({pulsate:k,rippleX:K,rippleY:D,rippleSize:N,cb:C})},[i,x,y]),V=a.useCallback(()=>{B({},{pulsate:!0})},[B]),h=a.useCallback((d,R)=>{if(y.clear(),d?.type==="touchend"&&v.current){v.current(),v.current=null,y.start(0,()=>{h(d,R)});return}v.current=null,l(C=>C.length>0?C.slice(1):C),f.current=R},[y]);return a.useImperativeHandle(n,()=>({pulsate:V,start:B,stop:h}),[V,B,h]),(0,O.jsx)(ht,{className:T(P.root,o.root,r),ref:M,...s,children:(0,O.jsx)(te,{component:null,exit:!0,children:u})})});function gt(t){return ze("MuiButtonBase",t)}var yt=ce("MuiButtonBase",["root","disabled","focusVisible"]),vt=t=>{const{disabled:e,focusVisible:n,focusVisibleClassName:i,suppressFocusVisible:o,classes:r}=t,s=We({root:["root",e&&"disabled",n&&!o&&"focusVisible"]},gt,r);return n&&!o&&i&&(s.root+=` ${i}`),s},Mt=J("button",{name:"MuiButtonBase",slot:"Root"})({display:"inline-flex",alignItems:"center",justifyContent:"center",position:"relative",boxSizing:"border-box",WebkitTapHighlightColor:"transparent",backgroundColor:"transparent",outline:0,border:0,margin:0,borderRadius:0,padding:0,cursor:"pointer",userSelect:"none",verticalAlign:"middle",MozAppearance:"none",WebkitAppearance:"none",textDecoration:"none",color:"inherit","&::-moz-focus-inner":{borderStyle:"none"},[`&.${yt.disabled}`]:{pointerEvents:"none",cursor:"default"},"@media print":{colorAdjust:"exact"}}),Bt=a.forwardRef(function(e,n){const i=ue({props:e,name:"MuiButtonBase"}),{action:o,centerRipple:r=!1,children:s,className:u,component:l="button",disabled:p=!1,disableRipple:f=!1,disableTouchRipple:b=!1,focusRipple:y=!1,focusVisibleClassName:v,focusableWhenDisabled:M,suppressFocusVisible:x=!1,internalNativeButton:B,LinkComponent:V="a",nativeButton:h,onBlur:d,onClick:R,onContextMenu:C,onDragLeave:k,onFocus:I,onFocusVisible:L,onKeyDown:E,onKeyUp:c,onMouseDown:K,onMouseLeave:D,onMouseUp:N,onTouchEnd:F,onTouchMove:_,onTouchStart:de,tabIndex:X=0,TouchRippleProps:he,touchRippleRef:me,type:ne,...z}=i,W=!!(z.href||z.to),be=!!z.formAction;let j=l;j==="button"&&W&&(j=V);const oe=typeof j=="string"?j==="button":B??!1,ge=h??oe,g=Ge(),ye=ie(g.ref,me),[S,A]=a.useState(!1);(p||x)&&S&&A(!1);const ve=H(m=>{y&&!m.repeat&&S&&m.key===" "&&g.stop(m,()=>{g.start(m)})}),Me=H(m=>{y&&m.key===" "&&S&&!m.defaultPrevented&&g.stop(m,()=>{g.pulsate(m)})}),{getButtonProps:xe,rootRef:$}=Xe({nativeButton:ge,nativeButtonProp:h,internalNativeButton:oe,allowInferredHostMismatch:W||typeof j=="string",disabled:p,type:ne,hasFormAction:be,tabIndex:X,onBeforeKeyDown:ve,onBeforeKeyUp:Me}),{onClick:Ce,onKeyDown:Pe,onKeyUp:Re,...Ee}=xe({onClick:R,onKeyDown:E,onKeyUp:c});a.useImperativeHandle(o,()=>({focusVisible:()=>{A(!0),$.current.focus()}}),[$]);const Be=g.shouldMount&&!f&&!p;a.useEffect(()=>{S&&y&&!f&&g.pulsate()},[f,y,S,g]);const Te=w(g,"start",K,b),De=w(g,"stop",C,b),we=w(g,"stop",k,b),ke=w(g,"stop",N,b),Ie=w(g,"stop",m=>{S&&m.preventDefault(),D&&D(m)},b),Ke=w(g,"start",de,b),Ne=w(g,"stop",F,b),Ve=w(g,"stop",_,b),Le=w(g,"stop",m=>{se(m.target)||A(!1),d&&d(m)},!1),Se=H(m=>{$.current||($.current=m.currentTarget),!x&&se(m.target)&&(A(!0),L&&L(m)),I&&I(m)}),Y={};W&&(Y.tabIndex=p?-1:X,p&&(Y["aria-disabled"]=p),Y.type=ne);const Ue=ie(n,$),re={...i,centerRipple:r,component:l,disabled:p,disableRipple:f,disableTouchRipple:b,focusRipple:y,suppressFocusVisible:x,tabIndex:X,focusVisible:S},Oe=vt(re);return(0,O.jsxs)(Mt,{as:j,className:T(Oe.root,u),ownerState:re,onBlur:Le,onClick:Ce,onContextMenu:De,onFocus:Se,onKeyDown:Pe,onKeyUp:Re,onMouseDown:Te,onMouseLeave:Ie,onMouseUp:ke,onDragLeave:we,onTouchEnd:Ne,onTouchMove:Ve,onTouchStart:Ke,ref:Ue,...W?Y:Ee,...z,children:[s,Be?(0,O.jsx)(bt,{ref:ye,center:r,...he}):null]})});function w(t,e,n,i=!1){return H(o=>(n&&n(o),i||t[e](o),!0))}export{le as a,H as c,te as i,lt as n,Qe as o,ut as r,Je as s,Bt as t};
