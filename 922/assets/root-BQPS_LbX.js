import{w as X,q as Y,p as i,M as W,L as H,S as Z,t as _,v as V,a as x,O as z}from"./chunk-PVWAREVJ-BjpS8kwV.js";import{R as N}from"./Root-CmfKPQqg.js";import{S as J,h as D,Q as U,n,m as S,R as G,c as $,a as O,b as d,e as tt,d as et,f as at,g as st,o as P,r as M,i as rt,j as Q,p as j,s as ot,k as it}from"./QueryClientProvider-CCfI8i-8.js";import{C as nt,u as E}from"./~utils-CFdAZAdr.js";import"./index-Ddw6zGfx.js";import"./sun-OU4G6P_A.js";import"./VOQWLFSQ-CO0e006c.js";import"./DXGKYUAD-DIg8gwdK.js";var ct=class extends J{constructor(t={}){super(),this.config=t,this.#t=new Map}#t;build(t,e,a){const s=e.queryKey,r=e.queryHash??D(s,e);let o=this.get(r);return o||(o=new U({client:t,queryKey:s,queryHash:r,options:t.defaultQueryOptions(e),state:a,defaultOptions:t.getQueryDefaults(s)}),this.add(o)),o}add(t){this.#t.has(t.queryHash)||(this.#t.set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const e=this.#t.get(t.queryHash);e&&(t.destroy(),e===t&&this.#t.delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){n.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return this.#t.get(t)}getAll(){return[...this.#t.values()]}find(t){const e={exact:!0,...t};return this.getAll().find(a=>S(e,a))}findAll(t={}){const e=this.getAll();return Object.keys(t).length>0?e.filter(a=>S(t,a)):e}notify(t){n.batch(()=>{this.listeners.forEach(e=>{e(t)})})}onFocus(){n.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){n.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},lt=class extends G{#t;#e;#a;constructor(t){super(),this.mutationId=t.mutationId,this.#e=t.mutationCache,this.#t=[],this.state=t.state||ut(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){this.#t.includes(t)||(this.#t.push(t),this.clearGcTimeout(),this.#e.notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){this.#t=this.#t.filter(e=>e!==t),this.scheduleGc(),this.#e.notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){this.#t.length||(this.state.status==="pending"?this.scheduleGc():this.#e.remove(this))}continue(){return this.#a?.continue()??this.execute(this.state.variables)}async execute(t){const e=()=>{this.#s({type:"continue"})};this.#a=$({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(r,o)=>{this.#s({type:"failed",failureCount:r,error:o})},onPause:()=>{this.#s({type:"pause"})},onContinue:e,retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>this.#e.canRun(this)});const a=this.state.status==="pending",s=!this.#a.canStart();try{if(a)e();else{this.#s({type:"pending",variables:t,isPaused:s}),await this.#e.config.onMutate?.(t,this);const o=await this.options.onMutate?.(t);o!==this.state.context&&this.#s({type:"pending",context:o,variables:t,isPaused:s})}const r=await this.#a.start();return await this.#e.config.onSuccess?.(r,t,this.state.context,this),await this.options.onSuccess?.(r,t,this.state.context),await this.#e.config.onSettled?.(r,null,this.state.variables,this.state.context,this),await this.options.onSettled?.(r,null,t,this.state.context),this.#s({type:"success",data:r}),r}catch(r){try{throw await this.#e.config.onError?.(r,t,this.state.context,this),await this.options.onError?.(r,t,this.state.context),await this.#e.config.onSettled?.(void 0,r,this.state.variables,this.state.context,this),await this.options.onSettled?.(void 0,r,t,this.state.context),r}finally{this.#s({type:"error",error:r})}}finally{this.#e.runNext(this)}}#s(t){const e=a=>{switch(t.type){case"failed":return{...a,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...a,isPaused:!0};case"continue":return{...a,isPaused:!1};case"pending":return{...a,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...a,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...a,data:void 0,error:t.error,failureCount:a.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=e(this.state),n.batch(()=>{this.#t.forEach(a=>{a.onMutationUpdate(t)}),this.#e.notify({mutation:this,type:"updated",action:t})})}};function ut(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var ht=class extends J{constructor(t={}){super(),this.config=t,this.#t=new Set,this.#e=new Map,this.#a=0}#t;#e;#a;build(t,e,a){const s=new lt({mutationCache:this,mutationId:++this.#a,options:t.defaultMutationOptions(e),state:a});return this.add(s),s}add(t){this.#t.add(t);const e=g(t);if(typeof e=="string"){const a=this.#e.get(e);a?a.push(t):this.#e.set(e,[t])}this.notify({type:"added",mutation:t})}remove(t){if(this.#t.delete(t)){const e=g(t);if(typeof e=="string"){const a=this.#e.get(e);if(a)if(a.length>1){const s=a.indexOf(t);s!==-1&&a.splice(s,1)}else a[0]===t&&this.#e.delete(e)}}this.notify({type:"removed",mutation:t})}canRun(t){const e=g(t);if(typeof e=="string"){const s=this.#e.get(e)?.find(r=>r.state.status==="pending");return!s||s===t}else return!0}runNext(t){const e=g(t);return typeof e=="string"?this.#e.get(e)?.find(s=>s!==t&&s.state.isPaused)?.continue()??Promise.resolve():Promise.resolve()}clear(){n.batch(()=>{this.#t.forEach(t=>{this.notify({type:"removed",mutation:t})}),this.#t.clear(),this.#e.clear()})}getAll(){return Array.from(this.#t)}find(t){const e={exact:!0,...t};return this.getAll().find(a=>O(e,a))}findAll(t={}){return this.getAll().filter(e=>O(t,e))}notify(t){n.batch(()=>{this.listeners.forEach(e=>{e(t)})})}resumePausedMutations(){const t=this.getAll().filter(e=>e.state.isPaused);return n.batch(()=>Promise.all(t.map(e=>e.continue().catch(d))))}};function g(t){return t.options.scope?.id}function A(t){return{onFetch:(e,a)=>{const s=e.options,r=e.fetchOptions?.meta?.fetchMore?.direction,o=e.state.data?.pages||[],c=e.state.data?.pageParams||[];let l={pages:[],pageParams:[]},u=0;const k=async()=>{let y=!1;const L=h=>{Object.defineProperty(h,"signal",{enumerable:!0,get:()=>(e.signal.aborted?y=!0:e.signal.addEventListener("abort",()=>{y=!0}),e.signal)})},T=tt(e.options,e.fetchOptions),b=async(h,f,p)=>{if(y)return Promise.reject();if(f==null&&h.pages.length)return Promise.resolve(h);const B=(()=>{const C={client:e.client,queryKey:e.queryKey,pageParam:f,direction:p?"backward":"forward",meta:e.options.meta};return L(C),C})(),K=await T(B),{maxPages:I}=e.options,v=p?et:at;return{pages:v(h.pages,K,I),pageParams:v(h.pageParams,f,I)}};if(r&&o.length){const h=r==="backward",f=h?dt:F,p={pages:o,pageParams:c},w=f(s,p);l=await b(p,w,h)}else{const h=t??o.length;do{const f=u===0?c[0]??s.initialPageParam:F(s,l);if(u>0&&f==null)break;l=await b(l,f),u++}while(u<h)}return l};e.options.persister?e.fetchFn=()=>e.options.persister?.(k,{client:e.client,queryKey:e.queryKey,meta:e.options.meta,signal:e.signal},a):e.fetchFn=k}}}function F(t,{pages:e,pageParams:a}){const s=e.length-1;return e.length>0?t.getNextPageParam(e[s],e,a[s],a):void 0}function dt(t,{pages:e,pageParams:a}){return e.length>0?t.getPreviousPageParam?.(e[0],e,a[0],a):void 0}var ft=class{#t;#e;#a;#s;#o;#r;#i;#n;constructor(t={}){this.#t=t.queryCache||new ct,this.#e=t.mutationCache||new ht,this.#a=t.defaultOptions||{},this.#s=new Map,this.#o=new Map,this.#r=0}mount(){this.#r++,this.#r===1&&(this.#i=st.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#t.onFocus())}),this.#n=P.subscribe(async t=>{t&&(await this.resumePausedMutations(),this.#t.onOnline())}))}unmount(){this.#r--,this.#r===0&&(this.#i?.(),this.#i=void 0,this.#n?.(),this.#n=void 0)}isFetching(t){return this.#t.findAll({...t,fetchStatus:"fetching"}).length}isMutating(t){return this.#e.findAll({...t,status:"pending"}).length}getQueryData(t){const e=this.defaultQueryOptions({queryKey:t});return this.#t.get(e.queryHash)?.state.data}ensureQueryData(t){const e=this.defaultQueryOptions(t),a=this.#t.build(this,e),s=a.state.data;return s===void 0?this.fetchQuery(t):(t.revalidateIfStale&&a.isStaleByTime(M(e.staleTime,a))&&this.prefetchQuery(e),Promise.resolve(s))}getQueriesData(t){return this.#t.findAll(t).map(({queryKey:e,state:a})=>{const s=a.data;return[e,s]})}setQueryData(t,e,a){const s=this.defaultQueryOptions({queryKey:t}),o=this.#t.get(s.queryHash)?.state.data,c=rt(e,o);if(c!==void 0)return this.#t.build(this,s).setData(c,{...a,manual:!0})}setQueriesData(t,e,a){return n.batch(()=>this.#t.findAll(t).map(({queryKey:s})=>[s,this.setQueryData(s,e,a)]))}getQueryState(t){const e=this.defaultQueryOptions({queryKey:t});return this.#t.get(e.queryHash)?.state}removeQueries(t){const e=this.#t;n.batch(()=>{e.findAll(t).forEach(a=>{e.remove(a)})})}resetQueries(t,e){const a=this.#t;return n.batch(()=>(a.findAll(t).forEach(s=>{s.reset()}),this.refetchQueries({type:"active",...t},e)))}cancelQueries(t,e={}){const a={revert:!0,...e},s=n.batch(()=>this.#t.findAll(t).map(r=>r.cancel(a)));return Promise.all(s).then(d).catch(d)}invalidateQueries(t,e={}){return n.batch(()=>(this.#t.findAll(t).forEach(a=>{a.invalidate()}),t?.refetchType==="none"?Promise.resolve():this.refetchQueries({...t,type:t?.refetchType??t?.type??"active"},e)))}refetchQueries(t,e={}){const a={...e,cancelRefetch:e.cancelRefetch??!0},s=n.batch(()=>this.#t.findAll(t).filter(r=>!r.isDisabled()&&!r.isStatic()).map(r=>{let o=r.fetch(void 0,a);return a.throwOnError||(o=o.catch(d)),r.state.fetchStatus==="paused"?Promise.resolve():o}));return Promise.all(s).then(d)}fetchQuery(t){const e=this.defaultQueryOptions(t);e.retry===void 0&&(e.retry=!1);const a=this.#t.build(this,e);return a.isStaleByTime(M(e.staleTime,a))?a.fetch(e):Promise.resolve(a.state.data)}prefetchQuery(t){return this.fetchQuery(t).then(d).catch(d)}fetchInfiniteQuery(t){return t.behavior=A(t.pages),this.fetchQuery(t)}prefetchInfiniteQuery(t){return this.fetchInfiniteQuery(t).then(d).catch(d)}ensureInfiniteQueryData(t){return t.behavior=A(t.pages),this.ensureQueryData(t)}resumePausedMutations(){return P.isOnline()?this.#e.resumePausedMutations():Promise.resolve()}getQueryCache(){return this.#t}getMutationCache(){return this.#e}getDefaultOptions(){return this.#a}setDefaultOptions(t){this.#a=t}setQueryDefaults(t,e){this.#s.set(Q(t),{queryKey:t,defaultOptions:e})}getQueryDefaults(t){const e=[...this.#s.values()],a={};return e.forEach(s=>{j(t,s.queryKey)&&Object.assign(a,s.defaultOptions)}),a}setMutationDefaults(t,e){this.#o.set(Q(t),{mutationKey:t,defaultOptions:e})}getMutationDefaults(t){const e=[...this.#o.values()],a={};return e.forEach(s=>{j(t,s.mutationKey)&&Object.assign(a,s.defaultOptions)}),a}defaultQueryOptions(t){if(t._defaulted)return t;const e={...this.#a.queries,...this.getQueryDefaults(t.queryKey),...t,_defaulted:!0};return e.queryHash||(e.queryHash=D(e.queryKey,e)),e.refetchOnReconnect===void 0&&(e.refetchOnReconnect=e.networkMode!=="always"),e.throwOnError===void 0&&(e.throwOnError=!!e.suspense),!e.networkMode&&e.persister&&(e.networkMode="offlineFirst"),e.queryFn===ot&&(e.enabled=!1),e}defaultMutationOptions(t){return t?._defaulted?t:{...this.#a.mutations,...t?.mutationKey&&this.getMutationDefaults(t.mutationKey),...t,_defaulted:!0}}clear(){this.#t.clear(),this.#e.clear()}};const pt=`:is(
		html:where([data-color-scheme="light"]),
		:host([data-color-scheme="light"]),
		.🥝Root:where([data-_sk-theme="light"])
	) {
	--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-bg-accent-muted: oklch(90.88% 0.04 234.23);
	--stratakit-color-bg-accent-faded: oklch(38.03% 0.093 244.58);
	--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);
	--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);
	--stratakit-color-icon-accent-base: oklch(48.43% 0.124 245.93);
	--stratakit-color-icon-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-icon-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-border-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-muted: oklch(84.62% 0.067 236.36);
	--stratakit-color-border-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-text-accent-base: oklch(48.43% 0.124 245.93);
	--stratakit-color-text-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-text-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);
	--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(53.32% 0.139 246.77);
}
@supports not (color: oklch(0% 0 0)) {
	:is(
			html:where([data-color-scheme="light"]),
			:host([data-color-scheme="light"]),
			.🥝Root:where([data-_sk-theme="light"])
		) {
		--stratakit-color-bg-accent-base: #0171b8;
		--stratakit-color-bg-accent-muted: #c8e6f8;
		--stratakit-color-bg-accent-faded: #034670;
		--stratakit-color-bg-accent-transparent: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-hover: #0171b81f;
		--stratakit-color-bg-glow-on-surface-accent-pressed: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-active-hover: #0171b83d;
		--stratakit-color-icon-accent-base: #0163a0;
		--stratakit-color-icon-accent-strong: #0163a0;
		--stratakit-color-icon-accent-faded: #0e5788;
		--stratakit-color-border-accent-base: #0171b8;
		--stratakit-color-border-accent-faded: #0e5788;
		--stratakit-color-border-accent-muted: #a3d4f3;
		--stratakit-color-border-accent-strong: #0163a0;
		--stratakit-color-text-accent-base: #0163a0;
		--stratakit-color-text-accent-faded: #0e5788;
		--stratakit-color-text-accent-strong: #0163a0;
		--stratakit-color-static-accent: #0171b8;
		--stratakit-shadow-table-strong: 0px -1px 0px 0px #0171b8;
	}
}
:is(
		html:where([data-color-scheme="dark"]),
		:host([data-color-scheme="dark"]),
		.🥝Root:where([data-_sk-theme="dark"])
	) {
	--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-bg-accent-muted: oklch(38.03% 0.093 244.58);
	--stratakit-color-bg-accent-faded: oklch(69.98% 0.118 238.51);
	--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);
	--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);
	--stratakit-color-icon-accent-base: oklch(69.98% 0.118 238.51);
	--stratakit-color-icon-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-icon-accent-faded: oklch(78.73% 0.093 236.98);
	--stratakit-color-border-accent-base: oklch(62.53% 0.14 241.42);
	--stratakit-color-border-accent-faded: oklch(84.62% 0.067 236.36);
	--stratakit-color-border-accent-muted: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-text-accent-base: oklch(69.98% 0.118 238.51);
	--stratakit-color-text-accent-faded: oklch(78.73% 0.093 236.98);
	--stratakit-color-text-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);
	--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(69.98% 0.118 238.51);
}
@supports not (color: oklch(0% 0 0)) {
	:is(
			html:where([data-color-scheme="dark"]),
			:host([data-color-scheme="dark"]),
			.🥝Root:where([data-_sk-theme="dark"])
		) {
		--stratakit-color-bg-accent-base: #0171b8;
		--stratakit-color-bg-accent-muted: #034670;
		--stratakit-color-bg-accent-faded: #4ea8df;
		--stratakit-color-bg-accent-transparent: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-hover: #0171b81f;
		--stratakit-color-bg-glow-on-surface-accent-pressed: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-active-hover: #0171b83d;
		--stratakit-color-icon-accent-base: #4ea8df;
		--stratakit-color-icon-accent-strong: #4ea8df;
		--stratakit-color-icon-accent-faded: #7ec3ee;
		--stratakit-color-border-accent-base: #1990d4;
		--stratakit-color-border-accent-faded: #a3d4f3;
		--stratakit-color-border-accent-muted: #0e5788;
		--stratakit-color-border-accent-strong: #4ea8df;
		--stratakit-color-text-accent-base: #4ea8df;
		--stratakit-color-text-accent-faded: #7ec3ee;
		--stratakit-color-text-accent-strong: #4ea8df;
		--stratakit-color-static-accent: #0171b8;
		--stratakit-shadow-table-strong: 0px -1px 0px 0px #4ea8df;
	}
}`;function gt(t){return t?.nodeType===Node.DOCUMENT_NODE}function R(t){return t&&(gt(t)?t:t.ownerDocument)||null}const q=typeof document<"u";function yt(t){return R(t)?.defaultView||null}const mt=q&&"adoptedStyleSheets"in Document.prototype,m=new Map(Object.entries({default:new WeakMap}));function kt(t,{css:e,key:a="default"}){let s=()=>{};return{loaded:(()=>{if(!q)return!1;const o=R(t),c=yt(t);if(!o||!c)return!1;if(!mt&&!t.querySelector(`style[data-_app="${a}"]`)){const u=o.createElement("style");return u.dataset._app=a,u.textContent=e,(t.head||t).appendChild(u),s=()=>u.remove(),!0}const l=m.get(a)?.get(c)||new c.CSSStyleSheet;return m.get(a)?.has(c)||m.get(a)?.set(c,l),l.replaceSync(e),t.adoptedStyleSheets.includes(l)||(t.adoptedStyleSheets.push(l),s=()=>{t.adoptedStyleSheets=t.adoptedStyleSheets.filter(u=>u!==l)}),!0})(),cleanup:s}}function bt(t){t||=document;const{cleanup:e}=kt(t,{css:pt,key:"sk-blue"});return e}const wt="/922/assets/InterVariable-DiVDrmQJ.woff2",It="/922/assets/InterVariable-Italic-FCBEiFp6.woff2",vt="data:application/json;base64,ewoJIm5hbWUiOiAiU3RyYXRhS2l0IiwKCSJzdGFydF91cmwiOiAiLi8iLAoJImRpc3BsYXkiOiAibWluaW1hbC11aSIsCgkiYmFja2dyb3VuZF9jb2xvciI6ICIjMjMxZjIwIiwKCSJ0aGVtZV9jb2xvciI6ICIjMjMxZjIwIiwKCSJpY29ucyI6IFsKCQl7CgkJCSJzcmMiOiAiLi9mYXZpY29uLmljbyIsCgkJCSJ0eXBlIjogImltYWdlL3gtaWNvbiIsCgkJCSJzaXplcyI6ICIxNngxNiAzMngzMiIKCQl9LAoJCXsgInNyYyI6ICIuL2ljb24tMTkyLnBuZyIsICJ0eXBlIjogImltYWdlL3BuZyIsICJzaXplcyI6ICIxOTJ4MTkyIiB9LAoJCXsgInNyYyI6ICIuL2ljb24tNTEyLnBuZyIsICJ0eXBlIjogImltYWdlL3BuZyIsICJzaXplcyI6ICI1MTJ4NTEyIiB9LAoJCXsKCQkJInNyYyI6ICIuL2ljb24tMTkyLW1hc2thYmxlLnBuZyIsCgkJCSJ0eXBlIjogImltYWdlL3BuZyIsCgkJCSJzaXplcyI6ICIxOTJ4MTkyIiwKCQkJInB1cnBvc2UiOiAibWFza2FibGUiCgkJfSwKCQl7CgkJCSJzcmMiOiAiLi9pY29uLTUxMi1tYXNrYWJsZS5wbmciLAoJCQkidHlwZSI6ICJpbWFnZS9wbmciLAoJCQkic2l6ZXMiOiAiNTEyeDUxMiIsCgkJCSJwdXJwb3NlIjogIm1hc2thYmxlIgoJCX0KCV0KfQo=",Ct=new ft({defaultOptions:{queries:{experimental_prefetchInRender:!0}}}),Et=()=>[{rel:"icon",href:"data:image/svg+xml,<svg viewBox='0 -16 20 20' xmlns='http://www.w3.org/2000/svg'><text>🥝</text></svg>",type:"image/svg+xml"},{rel:"manifest",href:vt}];function Rt({children:t}){return i.jsx(nt,{children:i.jsx(xt,{children:t})})}function xt({children:t}){const e=E(),a=St()?"dark light":e;return i.jsxs("html",{lang:"en","data-color-scheme":a,children:[i.jsxs("head",{children:[i.jsx("meta",{charSet:"utf-8"}),i.jsx("meta",{name:"viewport",content:"width=device-width, initial-scale=1"}),i.jsx("meta",{name:"color-scheme",content:a}),i.jsx(W,{}),i.jsx(H,{}),i.jsx(Ot,{})]}),i.jsxs("body",{children:[t,i.jsx(Z,{}),i.jsx(_,{})]})]})}const qt=X(function(){const e=E();return x.useEffect(function(){document.body.dataset.loaded="true"},[]),x.useEffect(()=>bt(),[]),i.jsx(it,{client:Ct,children:i.jsx(N,{colorScheme:e,density:"dense",children:i.jsx(z,{})})})});async function Lt(){return!0}const Tt=Y(function(){return i.jsxs(i.Fragment,{children:[i.jsx("style",{children:"html { background-color: var(--stratakit-color-bg-page-base, #1F2023); }"}),i.jsx("noscript",{children:"Please enable JavaScript."})]})});function St(){return!!V()?.at(-1)?.handle?.rootTest}function Ot(){return i.jsx("style",{children:`
@font-face {
  font-family: InterVariable;
  font-style: normal;
  font-weight 100 900;
  font-display: swap;
  src: url(${wt}) format("woff2");
}
@font-face {
  font-family: InterVariable;
  font-style: italic;
  font-weight 100 900;
  font-display: swap;
  src: url(${It}) format("woff2");
}
`})}export{Tt as HydrateFallback,Rt as Layout,Lt as clientLoader,qt as default,Et as links};
