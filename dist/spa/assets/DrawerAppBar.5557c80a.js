import{f as H,i as Ne,g as U,q as ot,h as c,j as y,k as te,l as j,m as we,n as _t,t as B,v as ie,x as oe,y as Ve,z as qt,A as Qe,B as kt,C as Ct,r as w,D as Fe,E as pe,F as $e,G as be,H as Tt,I as rt,J as ut,K as Re,T as Bt,L as xt,M as Me,N as _e,O as Lt,P as qe,R as $t,S as Mt,U as st,V as Pt,W as Ot,X as re,Y as Dt,Z as ye,_ as Pe,$ as Ke,a0 as Oe,a1 as Ie,a2 as De,a3 as Et,a4 as At,a5 as Ht,a6 as Z,a7 as Ee,a8 as Xe,a9 as Qt,aa as Rt,ab as It,ac as Nt,ad as Ue,ae as Vt,d as ct,af as Se,o as J,c as le,ag as Ft,s as ue,ah as jt,a as D,w as P,ai as Wt,aj as X,ak as ze,u as ae,Q as Kt,al as Ye,am as Xt,b as Ut,an as se}from"./index.8ed94220.js";var ba=H({name:"QPageContainer",setup(e,{slots:a}){const{proxy:{$q:i}}=j(),o=Ne(we,U);if(o===U)return console.error("QPageContainer needs to be child of QLayout"),U;ot(_t,!0);const t=c(()=>{const n={};return o.header.space===!0&&(n.paddingTop=`${o.header.size}px`),o.right.space===!0&&(n[`padding${i.lang.rtl===!0?"Left":"Right"}`]=`${o.right.size}px`),o.footer.space===!0&&(n.paddingBottom=`${o.footer.size}px`),o.left.space===!0&&(n[`padding${i.lang.rtl===!0?"Right":"Left"}`]=`${o.left.size}px`),n});return()=>y("div",{class:"q-page-container",style:t.value},te(a.default))}});const{passive:Ge}=Qe,Yt=["both","horizontal","vertical"];var dt=H({name:"QScrollObserver",props:{axis:{type:String,validator:e=>Yt.includes(e),default:"vertical"},debounce:[String,Number],scrollTarget:{default:void 0}},emits:["scroll"],setup(e,{emit:a}){const i={position:{top:0,left:0},direction:"down",directionChanged:!1,delta:{top:0,left:0},inflectionPoint:{top:0,left:0}};let o=null,t,n;B(()=>e.scrollTarget,()=>{f(),l()});function r(){o!==null&&o();const k=Math.max(0,kt(t)),g=Ct(t),h={top:k-i.position.top,left:g-i.position.left};if(e.axis==="vertical"&&h.top===0||e.axis==="horizontal"&&h.left===0)return;const b=Math.abs(h.top)>=Math.abs(h.left)?h.top<0?"up":"down":h.left<0?"left":"right";i.position={top:k,left:g},i.directionChanged=i.direction!==b,i.delta=h,i.directionChanged===!0&&(i.direction=b,i.inflectionPoint=i.position),a("scroll",{...i})}function l(){t=qt(n,e.scrollTarget),t.addEventListener("scroll",d,Ge),d(!0)}function f(){t!==void 0&&(t.removeEventListener("scroll",d,Ge),t=void 0)}function d(k){if(k===!0||e.debounce===0||e.debounce==="0")r();else if(o===null){const[g,h]=e.debounce?[setTimeout(r,e.debounce),clearTimeout]:[requestAnimationFrame(r),cancelAnimationFrame];o=()=>{h(g),o=null}}}const{proxy:u}=j();return B(()=>u.$q.lang.rtl,r),ie(()=>{n=u.$el.parentNode,l()}),oe(()=>{o!==null&&o(),f()}),Object.assign(u,{trigger:d,getPosition:()=>i}),Ve}});function Gt(){const e=w(!Fe.value);return e.value===!1&&ie(()=>{e.value=!0}),{isHydrated:e}}const vt=typeof ResizeObserver!="undefined",Je=vt===!0?{}:{style:"display:block;position:absolute;top:0;left:0;right:0;bottom:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;",url:"about:blank"};var fe=H({name:"QResizeObserver",props:{debounce:{type:[String,Number],default:100}},emits:["resize"],setup(e,{emit:a}){let i=null,o,t={width:-1,height:-1};function n(f){f===!0||e.debounce===0||e.debounce==="0"?r():i===null&&(i=setTimeout(r,e.debounce))}function r(){if(i!==null&&(clearTimeout(i),i=null),o){const{offsetWidth:f,offsetHeight:d}=o;(f!==t.width||d!==t.height)&&(t={width:f,height:d},a("resize",t))}}const{proxy:l}=j();if(l.trigger=n,vt===!0){let f;const d=u=>{o=l.$el.parentNode,o?(f=new ResizeObserver(n),f.observe(o),r()):u!==!0&&pe(()=>{d(!0)})};return ie(()=>{d()}),oe(()=>{i!==null&&clearTimeout(i),f!==void 0&&(f.disconnect!==void 0?f.disconnect():o&&f.unobserve(o))}),Ve}else{let u=function(){i!==null&&(clearTimeout(i),i=null),d!==void 0&&(d.removeEventListener!==void 0&&d.removeEventListener("resize",n,Qe.passive),d=void 0)},k=function(){u(),o&&o.contentDocument&&(d=o.contentDocument.defaultView,d.addEventListener("resize",n,Qe.passive),r())};const{isHydrated:f}=Gt();let d;return ie(()=>{pe(()=>{o=l.$el,o&&k()})}),oe(u),()=>{if(f.value===!0)return y("object",{class:"q--avoid-card-border",style:Je.style,tabindex:-1,type:"text/html",data:Je.url,"aria-hidden":"true",onLoad:k})}}}}),ya=H({name:"QLayout",props:{container:Boolean,view:{type:String,default:"hhh lpr fff",validator:e=>/^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(e.toLowerCase())},onScroll:Function,onScrollHeight:Function,onResize:Function},setup(e,{slots:a,emit:i}){const{proxy:{$q:o}}=j(),t=w(null),n=w(o.screen.height),r=w(e.container===!0?0:o.screen.width),l=w({position:0,direction:"down",inflectionPoint:0}),f=w(0),d=w(Fe.value===!0?0:$e()),u=c(()=>"q-layout q-layout--"+(e.container===!0?"containerized":"standard")),k=c(()=>e.container===!1?{minHeight:o.screen.height+"px"}:null),g=c(()=>d.value!==0?{[o.lang.rtl===!0?"left":"right"]:`${d.value}px`}:null),h=c(()=>d.value!==0?{[o.lang.rtl===!0?"right":"left"]:0,[o.lang.rtl===!0?"left":"right"]:`-${d.value}px`,width:`calc(100% + ${d.value}px)`}:null);function b(z){if(e.container===!0||document.qScrollPrevented!==!0){const x={position:z.position.top,direction:z.direction,directionChanged:z.directionChanged,inflectionPoint:z.inflectionPoint.top,delta:z.delta.top};l.value=x,e.onScroll!==void 0&&i("scroll",x)}}function M(z){const{height:x,width:O}=z;let Q=!1;n.value!==x&&(Q=!0,n.value=x,e.onScrollHeight!==void 0&&i("scrollHeight",x),_()),r.value!==O&&(Q=!0,r.value=O),Q===!0&&e.onResize!==void 0&&i("resize",z)}function L({height:z}){f.value!==z&&(f.value=z,_())}function _(){if(e.container===!0){const z=n.value>f.value?$e():0;d.value!==z&&(d.value=z)}}let m=null;const p={instances:{},view:c(()=>e.view),isContainer:c(()=>e.container),rootRef:t,height:n,containerHeight:f,scrollbarWidth:d,totalWidth:c(()=>r.value+d.value),rows:c(()=>{const z=e.view.toLowerCase().split(" ");return{top:z[0].split(""),middle:z[1].split(""),bottom:z[2].split("")}}),header:be({size:0,offset:0,space:!1}),right:be({size:300,offset:0,space:!1}),footer:be({size:0,offset:0,space:!1}),left:be({size:300,offset:0,space:!1}),scroll:l,animate(){m!==null?clearTimeout(m):document.body.classList.add("q-body--layout-animate"),m=setTimeout(()=>{m=null,document.body.classList.remove("q-body--layout-animate")},155)},update(z,x,O){p[z][x]=O}};if(ot(we,p),$e()>0){let O=function(){z=null,x.classList.remove("hide-scrollbar")},Q=function(){if(z===null){if(x.scrollHeight>o.screen.height)return;x.classList.add("hide-scrollbar")}else clearTimeout(z);z=setTimeout(O,300)},V=function(N){z!==null&&N==="remove"&&(clearTimeout(z),O()),window[`${N}EventListener`]("resize",Q)},z=null;const x=document.body;B(()=>e.container!==!0?"add":"remove",V),e.container!==!0&&V("add"),Tt(()=>{V("remove")})}return()=>{const z=rt(a.default,[y(dt,{onScroll:b}),y(fe,{onResize:M})]),x=y("div",{class:u.value,style:k.value,ref:e.container===!0?void 0:t,tabindex:-1},z);return e.container===!0?y("div",{class:"q-layout-container overflow-hidden",ref:t},[y(fe,{onResize:L}),y("div",{class:"absolute-full",style:g.value},[y("div",{class:"scroll",style:h.value},[x])])]):x}}}),Jt=H({name:"QToolbarTitle",props:{shrink:Boolean},setup(e,{slots:a}){const i=c(()=>"q-toolbar__title ellipsis"+(e.shrink===!0?" col-shrink":""));return()=>y("div",{class:i.value},te(a.default))}}),Zt=H({name:"QToolbar",props:{inset:Boolean},setup(e,{slots:a}){const i=c(()=>"q-toolbar row no-wrap items-center"+(e.inset===!0?" q-toolbar--inset":""));return()=>y("div",{class:i.value,role:"toolbar"},te(a.default))}}),ea=H({name:"QHeader",props:{modelValue:{type:Boolean,default:!0},reveal:Boolean,revealOffset:{type:Number,default:250},bordered:Boolean,elevated:Boolean,heightHint:{type:[String,Number],default:50}},emits:["reveal","focusin"],setup(e,{slots:a,emit:i}){const{proxy:{$q:o}}=j(),t=Ne(we,U);if(t===U)return console.error("QHeader needs to be child of QLayout"),U;const n=w(parseInt(e.heightHint,10)),r=w(!0),l=c(()=>e.reveal===!0||t.view.value.indexOf("H")!==-1||o.platform.is.ios&&t.isContainer.value===!0),f=c(()=>{if(e.modelValue!==!0)return 0;if(l.value===!0)return r.value===!0?n.value:0;const m=n.value-t.scroll.value.position;return m>0?m:0}),d=c(()=>e.modelValue!==!0||l.value===!0&&r.value!==!0),u=c(()=>e.modelValue===!0&&d.value===!0&&e.reveal===!0),k=c(()=>"q-header q-layout__section--marginal "+(l.value===!0?"fixed":"absolute")+"-top"+(e.bordered===!0?" q-header--bordered":"")+(d.value===!0?" q-header--hidden":"")+(e.modelValue!==!0?" q-layout--prevent-focus":"")),g=c(()=>{const m=t.rows.value.top,p={};return m[0]==="l"&&t.left.space===!0&&(p[o.lang.rtl===!0?"right":"left"]=`${t.left.size}px`),m[2]==="r"&&t.right.space===!0&&(p[o.lang.rtl===!0?"left":"right"]=`${t.right.size}px`),p});function h(m,p){t.update("header",m,p)}function b(m,p){m.value!==p&&(m.value=p)}function M({height:m}){b(n,m),h("size",m)}function L(m){u.value===!0&&b(r,!0),i("focusin",m)}B(()=>e.modelValue,m=>{h("space",m),b(r,!0),t.animate()}),B(f,m=>{h("offset",m)}),B(()=>e.reveal,m=>{m===!1&&b(r,e.modelValue)}),B(r,m=>{t.animate(),i("reveal",m)}),B(t.scroll,m=>{e.reveal===!0&&b(r,m.direction==="up"||m.position<=e.revealOffset||m.position-m.inflectionPoint<100)});const _={};return t.instances.header=_,e.modelValue===!0&&h("size",n.value),h("space",e.modelValue),h("offset",f.value),oe(()=>{t.instances.header===_&&(t.instances.header=void 0,h("size",0),h("offset",0),h("space",!1))}),()=>{const m=ut(a.default,[]);return e.elevated===!0&&m.push(y("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),m.push(y(fe,{debounce:0,onResize:M})),y("header",{class:k.value,style:g.value,onFocusin:L},m)}}});const ta={ratio:[String,Number]};function aa(e,a){return c(()=>{const i=Number(e.ratio||(a!==void 0?a.value:void 0));return isNaN(i)!==!0&&i>0?{paddingBottom:`${100/i}%`}:null})}const la=1.7778;var ia=H({name:"QImg",props:{...ta,src:String,srcset:String,sizes:String,alt:String,crossorigin:String,decoding:String,referrerpolicy:String,draggable:Boolean,loading:{type:String,default:"lazy"},loadingShowDelay:{type:[Number,String],default:0},fetchpriority:{type:String,default:"auto"},width:String,height:String,initialRatio:{type:[Number,String],default:la},placeholderSrc:String,errorSrc:String,fit:{type:String,default:"cover"},position:{type:String,default:"50% 50%"},imgClass:String,imgStyle:Object,noSpinner:Boolean,noNativeMenu:Boolean,noTransition:Boolean,spinnerColor:String,spinnerSize:String},emits:["load","error"],setup(e,{slots:a,emit:i}){const o=w(e.initialRatio),t=aa(e,o),n=j(),{registerTimeout:r,removeTimeout:l}=Re(),{registerTimeout:f,removeTimeout:d}=Re(),u=c(()=>e.placeholderSrc!==void 0?{src:e.placeholderSrc}:null),k=c(()=>e.errorSrc!==void 0?{src:e.errorSrc,__qerror:!0}:null),g=[w(null),w(u.value)],h=w(0),b=w(!1),M=w(!1),L=c(()=>`q-img q-img--${e.noNativeMenu===!0?"no-":""}menu`),_=c(()=>({width:e.width,height:e.height})),m=c(()=>`q-img__image ${e.imgClass!==void 0?e.imgClass+" ":""}q-img__image--with${e.noTransition===!0?"out":""}-transition q-img__image--`),p=c(()=>({...e.imgStyle,objectFit:e.fit,objectPosition:e.position}));function z(){if(d(),e.loadingShowDelay===0){b.value=!0;return}f(()=>{b.value=!0},e.loadingShowDelay)}function x(){d(),b.value=!1}function O({target:q}){Me(n)===!1&&(l(),o.value=q.naturalHeight===0?.5:q.naturalWidth/q.naturalHeight,Q(q,1))}function Q(q,$){$===1e3||Me(n)===!0||(q.complete===!0?V(q):r(()=>{Q(q,$+1)},50))}function V(q){Me(n)!==!0&&(h.value=h.value^1,g[h.value].value=null,x(),q.getAttribute("__qerror")!=="true"&&(M.value=!1),i("load",q.currentSrc||q.src))}function N(q){l(),x(),M.value=!0,g[h.value].value=k.value,g[h.value^1].value=u.value,i("error",q)}function E(q){const $=g[q].value,F={key:"img_"+q,class:m.value,style:p.value,alt:e.alt,crossorigin:e.crossorigin,decoding:e.decoding,referrerpolicy:e.referrerpolicy,height:e.height,width:e.width,loading:e.loading,fetchpriority:e.fetchpriority,"aria-hidden":"true",draggable:e.draggable,...$};return h.value===q?Object.assign(F,{class:F.class+"current",onLoad:O,onError:N}):F.class+="loaded",y("div",{class:"q-img__container absolute-full",key:"img"+q},y("img",F))}function R(){return b.value===!1?y("div",{key:"content",class:"q-img__content absolute-full q-anchor--skip"},te(a[M.value===!0?"error":"default"])):y("div",{key:"loading",class:"q-img__loading absolute-full flex flex-center"},a.loading!==void 0?a.loading():e.noSpinner===!0?void 0:[y(xt,{color:e.spinnerColor,size:e.spinnerSize})])}{let q=function(){B(()=>e.src||e.srcset||e.sizes?{src:e.src,srcset:e.srcset,sizes:e.sizes}:null,$=>{l(),M.value=!1,$===null?(x(),g[h.value^1].value=u.value):z(),g[h.value].value=$},{immediate:!0})};Fe.value===!0?ie(q):q()}return()=>{const q=[];return t.value!==null&&q.push(y("div",{key:"filler",style:t.value})),g[0].value!==null&&q.push(E(0)),g[1].value!==null&&q.push(E(1)),q.push(y(Bt,{name:"q-transition--fade"},R)),y("div",{key:"main",class:L.value,style:_.value,role:"img","aria-label":e.alt},q)}}}),na=H({name:"QItemLabel",props:{overline:Boolean,caption:Boolean,header:Boolean,lines:[Number,String]},setup(e,{slots:a}){const i=c(()=>parseInt(e.lines,10)),o=c(()=>"q-item__label"+(e.overline===!0?" q-item__label--overline text-overline":"")+(e.caption===!0?" q-item__label--caption text-caption":"")+(e.header===!0?" q-item__label--header":"")+(i.value===1?" ellipsis":"")),t=c(()=>e.lines!==void 0&&i.value>1?{overflow:"hidden",display:"-webkit-box","-webkit-box-orient":"vertical","-webkit-line-clamp":i.value}:null);return()=>y("div",{style:t.value,class:o.value},te(a.default))}}),ce=H({name:"QItemSection",props:{avatar:Boolean,thumbnail:Boolean,side:Boolean,top:Boolean,noWrap:Boolean},setup(e,{slots:a}){const i=c(()=>`q-item__section column q-item__section--${e.avatar===!0||e.side===!0||e.thumbnail===!0?"side":"main"}`+(e.top===!0?" q-item__section--top justify-start":" justify-center")+(e.avatar===!0?" q-item__section--avatar":"")+(e.thumbnail===!0?" q-item__section--thumbnail":"")+(e.noWrap===!0?" q-item__section--nowrap":""));return()=>y("div",{class:i.value},te(a.default))}}),de=H({name:"QItem",props:{..._e,...Lt,tag:{type:String,default:"div"},active:{type:Boolean,default:null},clickable:Boolean,dense:Boolean,insetLevel:Number,tabindex:[String,Number],focused:Boolean,manualFocus:Boolean},emits:["click","keyup"],setup(e,{slots:a,emit:i}){const{proxy:{$q:o}}=j(),t=qe(e,o),{hasLink:n,linkAttrs:r,linkClass:l,linkTag:f,navigateOnClick:d}=$t(),u=w(null),k=w(null),g=c(()=>e.clickable===!0||n.value===!0||e.tag==="label"),h=c(()=>e.disable!==!0&&g.value===!0),b=c(()=>"q-item q-item-type row no-wrap"+(e.dense===!0?" q-item--dense":"")+(t.value===!0?" q-item--dark":"")+(n.value===!0&&e.active===null?l.value:e.active===!0?` q-item--active${e.activeClass!==void 0?` ${e.activeClass}`:""}`:"")+(e.disable===!0?" disabled":"")+(h.value===!0?" q-item--clickable q-link cursor-pointer "+(e.manualFocus===!0?"q-manual-focusable":"q-focusable q-hoverable")+(e.focused===!0?" q-manual-focusable--focused":""):"")),M=c(()=>{if(e.insetLevel===void 0)return null;const p=o.lang.rtl===!0?"Right":"Left";return{["padding"+p]:16+e.insetLevel*56+"px"}});function L(p){h.value===!0&&(k.value!==null&&(p.qKeyEvent!==!0&&document.activeElement===u.value?k.value.focus():document.activeElement===k.value&&u.value.focus()),d(p))}function _(p){if(h.value===!0&&Mt(p,[13,32])===!0){st(p),p.qKeyEvent=!0;const z=new MouseEvent("click",p);z.qKeyEvent=!0,u.value.dispatchEvent(z)}i("keyup",p)}function m(){const p=ut(a.default,[]);return h.value===!0&&p.unshift(y("div",{class:"q-focus-helper",tabindex:-1,ref:k})),p}return()=>{const p={ref:u,class:b.value,style:M.value,role:"listitem",onClick:L,onKeyup:_};return h.value===!0?(p.tabindex=e.tabindex||"0",Object.assign(p,r.value)):g.value===!0&&(p["aria-disabled"]="true"),y(f.value,p,m())}}}),oa=H({name:"QList",props:{..._e,bordered:Boolean,dense:Boolean,separator:Boolean,padding:Boolean,tag:{type:String,default:"div"}},setup(e,{slots:a}){const i=j(),o=qe(e,i.proxy.$q),t=c(()=>"q-list"+(e.bordered===!0?" q-list--bordered":"")+(e.dense===!0?" q-list--dense":"")+(e.separator===!0?" q-list--separator":"")+(o.value===!0?" q-list--dark":"")+(e.padding===!0?" q-list--padding":""));return()=>y(e.tag,{class:t.value},te(a.default))}});const je={left:!0,right:!0,up:!0,down:!0,horizontal:!0,vertical:!0},ra=Object.keys(je);je.all=!0;function Ze(e){const a={};for(const i of ra)e[i]===!0&&(a[i]=!0);return Object.keys(a).length===0?je:(a.horizontal===!0?a.left=a.right=!0:a.left===!0&&a.right===!0&&(a.horizontal=!0),a.vertical===!0?a.up=a.down=!0:a.up===!0&&a.down===!0&&(a.vertical=!0),a.horizontal===!0&&a.vertical===!0&&(a.all=!0),a)}const ua=["INPUT","TEXTAREA"];function et(e,a){return a.event===void 0&&e.target!==void 0&&e.target.draggable!==!0&&typeof a.handler=="function"&&ua.includes(e.target.nodeName.toUpperCase())===!1&&(e.qClonedBy===void 0||e.qClonedBy.indexOf(a.uid)===-1)}function sa(){if(window.getSelection!==void 0){const e=window.getSelection();e.empty!==void 0?e.empty():e.removeAllRanges!==void 0&&(e.removeAllRanges(),Pt.is.mobile!==!0&&e.addRange(document.createRange()))}else document.selection!==void 0&&document.selection.empty()}function Ae(e,a,i){const o=Ie(e);let t,n=o.left-a.event.x,r=o.top-a.event.y,l=Math.abs(n),f=Math.abs(r);const d=a.direction;d.horizontal===!0&&d.vertical!==!0?t=n<0?"left":"right":d.horizontal!==!0&&d.vertical===!0?t=r<0?"up":"down":d.up===!0&&r<0?(t="up",l>f&&(d.left===!0&&n<0?t="left":d.right===!0&&n>0&&(t="right"))):d.down===!0&&r>0?(t="down",l>f&&(d.left===!0&&n<0?t="left":d.right===!0&&n>0&&(t="right"))):d.left===!0&&n<0?(t="left",l<f&&(d.up===!0&&r<0?t="up":d.down===!0&&r>0&&(t="down"))):d.right===!0&&n>0&&(t="right",l<f&&(d.up===!0&&r<0?t="up":d.down===!0&&r>0&&(t="down")));let u=!1;if(t===void 0&&i===!1){if(a.event.isFirst===!0||a.event.lastDir===void 0)return{};t=a.event.lastDir,u=!0,t==="left"||t==="right"?(o.left-=n,l=0,n=0):(o.top-=r,f=0,r=0)}return{synthetic:u,payload:{evt:e,touch:a.event.mouse!==!0,mouse:a.event.mouse===!0,position:o,direction:t,isFirst:a.event.isFirst,isFinal:i===!0,duration:Date.now()-a.event.time,distance:{x:l,y:f},offset:{x:n,y:r},delta:{x:o.left-a.event.lastX,y:o.top-a.event.lastY}}}}let ca=0;var ve=Ot({name:"touch-pan",beforeMount(e,{value:a,modifiers:i}){if(i.mouse!==!0&&re.has.touch!==!0)return;function o(n,r){i.mouse===!0&&r===!0?st(n):(i.stop===!0&&Oe(n),i.prevent===!0&&Ke(n))}const t={uid:"qvtp_"+ca++,handler:a,modifiers:i,direction:Ze(i),noop:Ve,mouseStart(n){et(n,t)&&Dt(n)&&(ye(t,"temp",[[document,"mousemove","move","notPassiveCapture"],[document,"mouseup","end","passiveCapture"]]),t.start(n,!0))},touchStart(n){if(et(n,t)){const r=n.target;ye(t,"temp",[[r,"touchmove","move","notPassiveCapture"],[r,"touchcancel","end","passiveCapture"],[r,"touchend","end","passiveCapture"]]),t.start(n)}},start(n,r){if(re.is.firefox===!0&&Pe(e,!0),t.lastEvt=n,r===!0||i.stop===!0){if(t.direction.all!==!0&&(r!==!0||t.modifiers.mouseAllDir!==!0&&t.modifiers.mousealldir!==!0)){const d=n.type.indexOf("mouse")!==-1?new MouseEvent(n.type,n):new TouchEvent(n.type,n);n.defaultPrevented===!0&&Ke(d),n.cancelBubble===!0&&Oe(d),Object.assign(d,{qKeyEvent:n.qKeyEvent,qClickOutside:n.qClickOutside,qAnchorHandled:n.qAnchorHandled,qClonedBy:n.qClonedBy===void 0?[t.uid]:n.qClonedBy.concat(t.uid)}),t.initialEvent={target:n.target,event:d}}Oe(n)}const{left:l,top:f}=Ie(n);t.event={x:l,y:f,time:Date.now(),mouse:r===!0,detected:!1,isFirst:!0,isFinal:!1,lastX:l,lastY:f}},move(n){if(t.event===void 0)return;const r=Ie(n),l=r.left-t.event.x,f=r.top-t.event.y;if(l===0&&f===0)return;t.lastEvt=n;const d=t.event.mouse===!0,u=()=>{o(n,d);let h;i.preserveCursor!==!0&&i.preservecursor!==!0&&(h=document.documentElement.style.cursor||"",document.documentElement.style.cursor="grabbing"),d===!0&&document.body.classList.add("no-pointer-events--children"),document.body.classList.add("non-selectable"),sa(),t.styleCleanup=b=>{if(t.styleCleanup=void 0,h!==void 0&&(document.documentElement.style.cursor=h),document.body.classList.remove("non-selectable"),d===!0){const M=()=>{document.body.classList.remove("no-pointer-events--children")};b!==void 0?setTimeout(()=>{M(),b()},50):M()}else b!==void 0&&b()}};if(t.event.detected===!0){t.event.isFirst!==!0&&o(n,t.event.mouse);const{payload:h,synthetic:b}=Ae(n,t,!1);h!==void 0&&(t.handler(h)===!1?t.end(n):(t.styleCleanup===void 0&&t.event.isFirst===!0&&u(),t.event.lastX=h.position.left,t.event.lastY=h.position.top,t.event.lastDir=b===!0?void 0:h.direction,t.event.isFirst=!1));return}if(t.direction.all===!0||d===!0&&(t.modifiers.mouseAllDir===!0||t.modifiers.mousealldir===!0)){u(),t.event.detected=!0,t.move(n);return}const k=Math.abs(l),g=Math.abs(f);k!==g&&(t.direction.horizontal===!0&&k>g||t.direction.vertical===!0&&k<g||t.direction.up===!0&&k<g&&f<0||t.direction.down===!0&&k<g&&f>0||t.direction.left===!0&&k>g&&l<0||t.direction.right===!0&&k>g&&l>0?(t.event.detected=!0,t.move(n)):t.end(n,!0))},end(n,r){if(t.event!==void 0){if(De(t,"temp"),re.is.firefox===!0&&Pe(e,!1),r===!0)t.styleCleanup!==void 0&&t.styleCleanup(),t.event.detected!==!0&&t.initialEvent!==void 0&&t.initialEvent.target.dispatchEvent(t.initialEvent.event);else if(t.event.detected===!0){t.event.isFirst===!0&&t.handler(Ae(n===void 0?t.lastEvt:n,t).payload);const{payload:l}=Ae(n===void 0?t.lastEvt:n,t,!0),f=()=>{t.handler(l)};t.styleCleanup!==void 0?t.styleCleanup(f):f()}t.event=void 0,t.initialEvent=void 0,t.lastEvt=void 0}}};if(e.__qtouchpan=t,i.mouse===!0){const n=i.mouseCapture===!0||i.mousecapture===!0?"Capture":"";ye(t,"main",[[e,"mousedown","mouseStart",`passive${n}`]])}re.has.touch===!0&&ye(t,"main",[[e,"touchstart","touchStart",`passive${i.capture===!0?"Capture":""}`],[e,"touchmove","noop","notPassiveCapture"]])},updated(e,a){const i=e.__qtouchpan;i!==void 0&&(a.oldValue!==a.value&&(typeof value!="function"&&i.end(),i.handler=a.value),i.direction=Ze(a.modifiers))},beforeUnmount(e){const a=e.__qtouchpan;a!==void 0&&(a.event!==void 0&&a.end(),De(a,"main"),De(a,"temp"),re.is.firefox===!0&&Pe(e,!1),a.styleCleanup!==void 0&&a.styleCleanup(),delete e.__qtouchpan)}});const tt=["B","KB","MB","GB","TB","PB"];function Sa(e,a=1){let i=0;for(;parseInt(e,10)>=1024&&i<tt.length-1;)e/=1024,++i;return`${e.toFixed(a)}${tt[i]}`}function ee(e,a,i){return i<=a?a:Math.min(i,Math.max(a,e))}function za(e,a,i){if(i<=a)return a;const o=i-a+1;let t=a+(e-a)%o;return t<a&&(t=o+t),t===0?0:t}function pa(e,a=2,i="0"){if(e==null)return e;const o=""+e;return o.length>=a?o:new Array(a-o.length+1).join(i)+o}const at=["vertical","horizontal"],He={vertical:{offset:"offsetY",scroll:"scrollTop",dir:"down",dist:"y"},horizontal:{offset:"offsetX",scroll:"scrollLeft",dir:"right",dist:"x"}},lt={prevent:!0,mouse:!0,mouseAllDir:!0},it=e=>e>=250?50:Math.ceil(e/5);var da=H({name:"QScrollArea",props:{..._e,thumbStyle:Object,verticalThumbStyle:Object,horizontalThumbStyle:Object,barStyle:[Array,String,Object],verticalBarStyle:[Array,String,Object],horizontalBarStyle:[Array,String,Object],contentStyle:[Array,String,Object],contentActiveStyle:[Array,String,Object],delay:{type:[String,Number],default:1e3},visible:{type:Boolean,default:null},tabindex:[String,Number],onScroll:Function},setup(e,{slots:a,emit:i}){const o=w(!1),t=w(!1),n=w(!1),r={vertical:w(0),horizontal:w(0)},l={vertical:{ref:w(null),position:w(0),size:w(0)},horizontal:{ref:w(null),position:w(0),size:w(0)}},{proxy:f}=j(),d=qe(e,f.$q);let u=null,k;const g=w(null),h=c(()=>"q-scrollarea"+(d.value===!0?" q-scrollarea--dark":""));l.vertical.percentage=c(()=>{const v=l.vertical.size.value-r.vertical.value;if(v<=0)return 0;const S=ee(l.vertical.position.value/v,0,1);return Math.round(S*1e4)/1e4}),l.vertical.thumbHidden=c(()=>(e.visible===null?n.value:e.visible)!==!0&&o.value===!1&&t.value===!1||l.vertical.size.value<=r.vertical.value+1),l.vertical.thumbStart=c(()=>l.vertical.percentage.value*(r.vertical.value-l.vertical.thumbSize.value)),l.vertical.thumbSize=c(()=>Math.round(ee(r.vertical.value*r.vertical.value/l.vertical.size.value,it(r.vertical.value),r.vertical.value))),l.vertical.style=c(()=>({...e.thumbStyle,...e.verticalThumbStyle,top:`${l.vertical.thumbStart.value}px`,height:`${l.vertical.thumbSize.value}px`})),l.vertical.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--v absolute-right"+(l.vertical.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),l.vertical.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--v absolute-right"+(l.vertical.thumbHidden.value===!0?" q-scrollarea__bar--invisible":"")),l.horizontal.percentage=c(()=>{const v=l.horizontal.size.value-r.horizontal.value;if(v<=0)return 0;const S=ee(Math.abs(l.horizontal.position.value)/v,0,1);return Math.round(S*1e4)/1e4}),l.horizontal.thumbHidden=c(()=>(e.visible===null?n.value:e.visible)!==!0&&o.value===!1&&t.value===!1||l.horizontal.size.value<=r.horizontal.value+1),l.horizontal.thumbStart=c(()=>l.horizontal.percentage.value*(r.horizontal.value-l.horizontal.thumbSize.value)),l.horizontal.thumbSize=c(()=>Math.round(ee(r.horizontal.value*r.horizontal.value/l.horizontal.size.value,it(r.horizontal.value),r.horizontal.value))),l.horizontal.style=c(()=>({...e.thumbStyle,...e.horizontalThumbStyle,[f.$q.lang.rtl===!0?"right":"left"]:`${l.horizontal.thumbStart.value}px`,width:`${l.horizontal.thumbSize.value}px`})),l.horizontal.thumbClass=c(()=>"q-scrollarea__thumb q-scrollarea__thumb--h absolute-bottom"+(l.horizontal.thumbHidden.value===!0?" q-scrollarea__thumb--invisible":"")),l.horizontal.barClass=c(()=>"q-scrollarea__bar q-scrollarea__bar--h absolute-bottom"+(l.horizontal.thumbHidden.value===!0?" q-scrollarea__bar--invisible":""));const b=c(()=>l.vertical.thumbHidden.value===!0&&l.horizontal.thumbHidden.value===!0?e.contentStyle:e.contentActiveStyle),M=[[ve,v=>{Q(v,"vertical")},void 0,{vertical:!0,...lt}]],L=[[ve,v=>{Q(v,"horizontal")},void 0,{horizontal:!0,...lt}]];function _(){const v={};return at.forEach(S=>{const T=l[S];v[S+"Position"]=T.position.value,v[S+"Percentage"]=T.percentage.value,v[S+"Size"]=T.size.value,v[S+"ContainerSize"]=r[S].value}),v}const m=Et(()=>{const v=_();v.ref=f,i("scroll",v)},0);function p(v,S,T){if(at.includes(v)===!1){console.error("[QScrollArea]: wrong first param of setScrollPosition (vertical/horizontal)");return}(v==="vertical"?Xe:Ee)(g.value,S,T)}function z({height:v,width:S}){let T=!1;r.vertical.value!==v&&(r.vertical.value=v,T=!0),r.horizontal.value!==S&&(r.horizontal.value=S,T=!0),T===!0&&R()}function x({position:v}){let S=!1;l.vertical.position.value!==v.top&&(l.vertical.position.value=v.top,S=!0),l.horizontal.position.value!==v.left&&(l.horizontal.position.value=v.left,S=!0),S===!0&&R()}function O({height:v,width:S}){l.horizontal.size.value!==S&&(l.horizontal.size.value=S,R()),l.vertical.size.value!==v&&(l.vertical.size.value=v,R())}function Q(v,S){const T=l[S];if(v.isFirst===!0){if(T.thumbHidden.value===!0)return;k=T.position.value,t.value=!0}else if(t.value!==!0)return;v.isFinal===!0&&(t.value=!1);const K=He[S],ne=r[S].value,ke=(T.size.value-ne)/(ne-T.thumbSize.value),me=v.distance[K.dist],Ce=k+(v.direction===K.dir?1:-1)*me*ke;q(Ce,S)}function V(v,S){const T=l[S];if(T.thumbHidden.value!==!0){const K=v[He[S].offset];if(K<T.thumbStart.value||K>T.thumbStart.value+T.thumbSize.value){const ne=K-T.thumbSize.value/2;q(ne/r[S].value*T.size.value,S)}T.ref.value!==null&&T.ref.value.dispatchEvent(new MouseEvent(v.type,v))}}function N(v){V(v,"vertical")}function E(v){V(v,"horizontal")}function R(){o.value=!0,u!==null&&clearTimeout(u),u=setTimeout(()=>{u=null,o.value=!1},e.delay),e.onScroll!==void 0&&m()}function q(v,S){g.value[He[S].scroll]=v}let $=null;function F(){$!==null&&clearTimeout($),$=setTimeout(()=>{$=null,n.value=!0},f.$q.platform.is.ios?50:0)}function he(){$!==null&&(clearTimeout($),$=null),n.value=!1}let W=null;return B(()=>f.$q.lang.rtl,v=>{g.value!==null&&Ee(g.value,Math.abs(l.horizontal.position.value)*(v===!0?-1:1))}),At(()=>{W={top:l.vertical.position.value,left:l.horizontal.position.value}}),Ht(()=>{if(W===null)return;const v=g.value;v!==null&&(Ee(v,W.left),Xe(v,W.top))}),oe(m.cancel),Object.assign(f,{getScrollTarget:()=>g.value,getScroll:_,getScrollPosition:()=>({top:l.vertical.position.value,left:l.horizontal.position.value}),getScrollPercentage:()=>({top:l.vertical.percentage.value,left:l.horizontal.percentage.value}),setScrollPosition:p,setScrollPercentage(v,S,T){p(v,S*(l[v].size.value-r[v].value)*(v==="horizontal"&&f.$q.lang.rtl===!0?-1:1),T)}}),()=>y("div",{class:h.value,onMouseenter:F,onMouseleave:he},[y("div",{ref:g,class:"q-scrollarea__container scroll relative-position fit hide-scrollbar",tabindex:e.tabindex!==void 0?e.tabindex:void 0},[y("div",{class:"q-scrollarea__content absolute",style:b.value},rt(a.default,[y(fe,{debounce:0,onResize:O})])),y(dt,{axis:"both",onScroll:x})]),y(fe,{debounce:0,onResize:z}),y("div",{class:l.vertical.barClass.value,style:[e.barStyle,e.verticalBarStyle],"aria-hidden":"true",onMousedown:N}),y("div",{class:l.horizontal.barClass.value,style:[e.barStyle,e.horizontalBarStyle],"aria-hidden":"true",onMousedown:E}),Z(y("div",{ref:l.vertical.ref,class:l.vertical.thumbClass.value,style:l.vertical.style.value,"aria-hidden":"true"}),M),Z(y("div",{ref:l.horizontal.ref,class:l.horizontal.thumbClass.value,style:l.horizontal.style.value,"aria-hidden":"true"}),L)])}});const nt=150;var va=H({name:"QDrawer",inheritAttrs:!1,props:{...Qt,..._e,side:{type:String,default:"left",validator:e=>["left","right"].includes(e)},width:{type:Number,default:300},mini:Boolean,miniToOverlay:Boolean,miniWidth:{type:Number,default:57},noMiniAnimation:Boolean,breakpoint:{type:Number,default:1023},showIfAbove:Boolean,behavior:{type:String,validator:e=>["default","desktop","mobile"].includes(e),default:"default"},bordered:Boolean,elevated:Boolean,overlay:Boolean,persistent:Boolean,noSwipeOpen:Boolean,noSwipeClose:Boolean,noSwipeBackdrop:Boolean},emits:[...Rt,"onLayout","miniState"],setup(e,{slots:a,emit:i,attrs:o}){const t=j(),{proxy:{$q:n}}=t,r=qe(e,n),{preventBodyScroll:l}=Vt(),{registerTimeout:f,removeTimeout:d}=Re(),u=Ne(we,U);if(u===U)return console.error("QDrawer needs to be child of QLayout"),U;let k,g=null,h;const b=w(e.behavior==="mobile"||e.behavior!=="desktop"&&u.totalWidth.value<=e.breakpoint),M=c(()=>e.mini===!0&&b.value!==!0),L=c(()=>M.value===!0?e.miniWidth:e.width),_=w(e.showIfAbove===!0&&b.value===!1?!0:e.modelValue===!0),m=c(()=>e.persistent!==!0&&(b.value===!0||K.value===!0));function p(s,C){if(Q(),s!==!1&&u.animate(),I(0),b.value===!0){const A=u.instances[W.value];A!==void 0&&A.belowBreakpoint===!0&&A.hide(!1),Y(1),u.isContainer.value!==!0&&l(!0)}else Y(0),s!==!1&&Be(!1);f(()=>{s!==!1&&Be(!0),C!==!0&&i("show",s)},nt)}function z(s,C){V(),s!==!1&&u.animate(),Y(0),I(R.value*L.value),xe(),C!==!0?f(()=>{i("hide",s)},nt):d()}const{show:x,hide:O}=It({showing:_,hideOnRouteChange:m,handleShow:p,handleHide:z}),{addToHistory:Q,removeFromHistory:V}=Nt(_,O,m),N={belowBreakpoint:b,hide:O},E=c(()=>e.side==="right"),R=c(()=>(n.lang.rtl===!0?-1:1)*(E.value===!0?1:-1)),q=w(0),$=w(!1),F=w(!1),he=w(L.value*R.value),W=c(()=>E.value===!0?"left":"right"),v=c(()=>_.value===!0&&b.value===!1&&e.overlay===!1?e.miniToOverlay===!0?e.miniWidth:L.value:0),S=c(()=>e.overlay===!0||e.miniToOverlay===!0||u.view.value.indexOf(E.value?"R":"L")!==-1||n.platform.is.ios===!0&&u.isContainer.value===!0),T=c(()=>e.overlay===!1&&_.value===!0&&b.value===!1),K=c(()=>e.overlay===!0&&_.value===!0&&b.value===!1),ne=c(()=>"fullscreen q-drawer__backdrop"+(_.value===!1&&$.value===!1?" hidden":"")),ke=c(()=>({backgroundColor:`rgba(0,0,0,${q.value*.4})`})),me=c(()=>E.value===!0?u.rows.value.top[2]==="r":u.rows.value.top[0]==="l"),Ce=c(()=>E.value===!0?u.rows.value.bottom[2]==="r":u.rows.value.bottom[0]==="l"),ft=c(()=>{const s={};return u.header.space===!0&&me.value===!1&&(S.value===!0?s.top=`${u.header.offset}px`:u.header.space===!0&&(s.top=`${u.header.size}px`)),u.footer.space===!0&&Ce.value===!1&&(S.value===!0?s.bottom=`${u.footer.offset}px`:u.footer.space===!0&&(s.bottom=`${u.footer.size}px`)),s}),ht=c(()=>{const s={width:`${L.value}px`,transform:`translateX(${he.value}px)`};return b.value===!0?s:Object.assign(s,ft.value)}),mt=c(()=>"q-drawer__content fit "+(u.isContainer.value!==!0?"scroll":"overflow-auto")),gt=c(()=>`q-drawer q-drawer--${e.side}`+(F.value===!0?" q-drawer--mini-animate":"")+(e.bordered===!0?" q-drawer--bordered":"")+(r.value===!0?" q-drawer--dark q-dark":"")+($.value===!0?" no-transition":_.value===!0?"":" q-layout--prevent-focus")+(b.value===!0?" fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding":` q-drawer--${M.value===!0?"mini":"standard"}`+(S.value===!0||T.value!==!0?" fixed":"")+(e.overlay===!0||e.miniToOverlay===!0?" q-drawer--on-top":"")+(me.value===!0?" q-drawer--top-padding":""))),bt=c(()=>{const s=n.lang.rtl===!0?e.side:W.value;return[[ve,pt,void 0,{[s]:!0,mouse:!0}]]}),yt=c(()=>{const s=n.lang.rtl===!0?W.value:e.side;return[[ve,We,void 0,{[s]:!0,mouse:!0}]]}),St=c(()=>{const s=n.lang.rtl===!0?W.value:e.side;return[[ve,We,void 0,{[s]:!0,mouse:!0,mouseAllDir:!0}]]});function Te(){wt(b,e.behavior==="mobile"||e.behavior!=="desktop"&&u.totalWidth.value<=e.breakpoint)}B(b,s=>{s===!0?(k=_.value,_.value===!0&&O(!1)):e.overlay===!1&&e.behavior!=="mobile"&&k!==!1&&(_.value===!0?(I(0),Y(0),xe()):x(!1))}),B(()=>e.side,(s,C)=>{u.instances[C]===N&&(u.instances[C]=void 0,u[C].space=!1,u[C].offset=0),u.instances[s]=N,u[s].size=L.value,u[s].space=T.value,u[s].offset=v.value}),B(u.totalWidth,()=>{(u.isContainer.value===!0||document.qScrollPrevented!==!0)&&Te()}),B(()=>e.behavior+e.breakpoint,Te),B(u.isContainer,s=>{_.value===!0&&l(s!==!0),s===!0&&Te()}),B(u.scrollbarWidth,()=>{I(_.value===!0?0:void 0)}),B(v,s=>{G("offset",s)}),B(T,s=>{i("onLayout",s),G("space",s)}),B(E,()=>{I()}),B(L,s=>{I(),Le(e.miniToOverlay,s)}),B(()=>e.miniToOverlay,s=>{Le(s,L.value)}),B(()=>n.lang.rtl,()=>{I()}),B(()=>e.mini,()=>{e.noMiniAnimation||e.modelValue===!0&&(zt(),u.animate())}),B(M,s=>{i("miniState",s)});function I(s){s===void 0?pe(()=>{s=_.value===!0?0:L.value,I(R.value*s)}):(u.isContainer.value===!0&&E.value===!0&&(b.value===!0||Math.abs(s)===L.value)&&(s+=R.value*u.scrollbarWidth.value),he.value=s)}function Y(s){q.value=s}function Be(s){const C=s===!0?"remove":u.isContainer.value!==!0?"add":"";C!==""&&document.body.classList[C]("q-body--drawer-toggle")}function zt(){g!==null&&clearTimeout(g),t.proxy&&t.proxy.$el&&t.proxy.$el.classList.add("q-drawer--mini-animate"),F.value=!0,g=setTimeout(()=>{g=null,F.value=!1,t&&t.proxy&&t.proxy.$el&&t.proxy.$el.classList.remove("q-drawer--mini-animate")},150)}function pt(s){if(_.value!==!1)return;const C=L.value,A=ee(s.distance.x,0,C);if(s.isFinal===!0){A>=Math.min(75,C)===!0?x():(u.animate(),Y(0),I(R.value*C)),$.value=!1;return}I((n.lang.rtl===!0?E.value!==!0:E.value)?Math.max(C-A,0):Math.min(0,A-C)),Y(ee(A/C,0,1)),s.isFirst===!0&&($.value=!0)}function We(s){if(_.value!==!0)return;const C=L.value,A=s.direction===e.side,ge=(n.lang.rtl===!0?A!==!0:A)?ee(s.distance.x,0,C):0;if(s.isFinal===!0){Math.abs(ge)<Math.min(75,C)===!0?(u.animate(),Y(1),I(0)):O(),$.value=!1;return}I(R.value*ge),Y(ee(1-ge/C,0,1)),s.isFirst===!0&&($.value=!0)}function xe(){l(!1),Be(!0)}function G(s,C){u.update(e.side,s,C)}function wt(s,C){s.value!==C&&(s.value=C)}function Le(s,C){G("size",s===!0?e.miniWidth:C)}return u.instances[e.side]=N,Le(e.miniToOverlay,L.value),G("space",T.value),G("offset",v.value),e.showIfAbove===!0&&e.modelValue!==!0&&_.value===!0&&e["onUpdate:modelValue"]!==void 0&&i("update:modelValue",!0),ie(()=>{i("onLayout",T.value),i("miniState",M.value),k=e.showIfAbove===!0;const s=()=>{(_.value===!0?p:z)(!1,!0)};if(u.totalWidth.value!==0){pe(s);return}h=B(u.totalWidth,()=>{h(),h=void 0,_.value===!1&&e.showIfAbove===!0&&b.value===!1?x(!1):s()})}),oe(()=>{h!==void 0&&h(),g!==null&&(clearTimeout(g),g=null),_.value===!0&&xe(),u.instances[e.side]===N&&(u.instances[e.side]=void 0,G("size",0),G("offset",0),G("space",!1))}),()=>{const s=[];b.value===!0&&(e.noSwipeOpen===!1&&s.push(Z(y("div",{key:"open",class:`q-drawer__opener fixed-${e.side}`,"aria-hidden":"true"}),bt.value)),s.push(Ue("div",{ref:"backdrop",class:ne.value,style:ke.value,"aria-hidden":"true",onClick:O},void 0,"backdrop",e.noSwipeBackdrop!==!0&&_.value===!0,()=>St.value)));const C=M.value===!0&&a.mini!==void 0,A=[y("div",{...o,key:""+C,class:[mt.value,o.class]},C===!0?a.mini():te(a.default))];return e.elevated===!0&&_.value===!0&&A.push(y("div",{class:"q-layout__shadow absolute-full overflow-hidden no-pointer-events"})),s.push(Ue("aside",{ref:"content",class:gt.value,style:ht.value},A,"contentclose",e.noSwipeClose!==!0&&b.value===!0,()=>yt.value)),y("div",{class:"q-drawer-container"},s)}}});const fa=ct({__name:"DarkModeComponent",setup(e){const a=w(Se.isActive),i=()=>{a.value=!a.value};return B(a,o=>{Se.set(o),localStorage.setItem("darkMode",o?"true":"false")}),ie(()=>{const o=localStorage.getItem("darkMode")==="true";Se.set(o),a.value=Se.isActive}),(o,t)=>(J(),le(Ft,{name:a.value?"brightness_3":"wb_sunny",onClick:i,class:"cursor-pointer",color:a.value?"white":"yellow",style:{"font-size":"24px"}},null,8,["name","color"]))}});const ha=Ut("div",{class:"absolute-bottom bg-transparent"},null,-1),wa=ct({name:"MainLayout",__name:"DrawerAppBar",setup(e){const a="App",i=w(!1),o=()=>i.value=!i.value,t=ue.getCookie("userData")||null;return(n,r)=>(J(),jt(Wt,null,[D(ea,{elevated:""},{default:P(()=>[D(Zt,null,{default:P(()=>[D(Jt,null,{default:P(()=>[X(ze(ae(a)),1)]),_:1}),D(fa),X(" "+ze(ae(ue))+" "+ze(ae(ue).getCookie("userData"))+" ",1),D(Kt,{flat:"",dense:"",round:"",icon:"menu","aria-label":"Menu",onClick:o})]),_:1})]),_:1}),D(va,{modelValue:i.value,"onUpdate:modelValue":r[1]||(r[1]=l=>i.value=l),"show-if-above":"",bordered:""},{default:P(()=>[D(ia,{class:"absolute-top",src:"https://cdn.quasar.dev/img/material.png",style:{height:"150px"}},{default:P(()=>[ha]),_:1}),D(da,{style:{height:"calc(100% - 150px)","margin-top":"150px","border-right":"1px solid #ddd"}},{default:P(()=>{var l;return[X(ze(ae(t))+" ",1),((l=ae(t))==null?void 0:l.usertype)==="admin"?(J(),le(oa,{key:0,padding:""},{default:P(()=>[D(na,{header:""},{default:P(()=>[X(" Informacion ")]),_:1}),Z((J(),le(de,{clickable:"",to:"/admin","active-class":"my-menu-link"},{default:P(()=>[D(ce,null,{default:P(()=>[X(" Inicio ")]),_:1})]),_:1})),[[se]]),Z((J(),le(de,{clickable:"",to:"/ver/candidato","active-class":"my-menu-link"},{default:P(()=>[D(ce,null,{default:P(()=>[X(" Candidatos ")]),_:1})]),_:1})),[[se]]),Z((J(),le(de,{clickable:"",to:"/ver/paciente","active-class":"my-menu-link"},{default:P(()=>[D(ce,null,{default:P(()=>[X(" Pacientes ")]),_:1})]),_:1})),[[se]]),Z((J(),le(de,{clickable:"",to:"/ver/supervisor","active-class":"my-menu-link"},{default:P(()=>[D(ce,null,{default:P(()=>[X(" Supervisor ")]),_:1})]),_:1})),[[se]])]),_:1})):Ye("",!0),D(Xt,{spaced:""}),ae(ue).getCookie("userData")?Z((J(),le(de,{key:1,clickable:"",to:"/","active-class":"my-menu-link",onClick:r[0]||(r[0]=f=>ae(ue).removeCookie("userData"))},{default:P(()=>[D(ce,null,{default:P(()=>[X(" Cerrar Sesion ")]),_:1})]),_:1})),[[se]]):Ye("",!0)]}),_:1})]),_:1},8,["modelValue"])],64))}});export{ya as Q,wa as _,ba as a,oa as b,ce as c,de as d,sa as e,na as f,Sa as h,za as n,pa as p};
