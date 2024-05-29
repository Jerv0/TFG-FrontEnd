import{f as y,N as _,aB as x,P as B,aC as w,h as n,ad as D,l as P,j as i,ag as r,aD as R,an as z,U as A,G as I}from"./index.8ed94220.js";const $={xs:8,sm:10,md:14,lg:20,xl:24};var Q=y({name:"QChip",props:{..._,...x,dense:Boolean,icon:String,iconRight:String,iconRemove:String,iconSelected:String,label:[String,Number],color:String,textColor:String,modelValue:{type:Boolean,default:!0},selected:{type:Boolean,default:null},square:Boolean,outline:Boolean,clickable:Boolean,removable:Boolean,removeAriaLabel:String,tabindex:[String,Number],disable:Boolean,ripple:{type:[Boolean,Object],default:!0}},emits:["update:modelValue","update:selected","remove","click"],setup(e,{slots:u,emit:c}){const{proxy:{$q:l}}=P(),v=B(e,l),b=w(e,$),f=n(()=>e.selected===!0||e.icon!==void 0),g=n(()=>e.selected===!0?e.iconSelected||l.iconSet.chip.selected:e.icon),q=n(()=>e.iconRemove||l.iconSet.chip.remove),o=n(()=>e.disable===!1&&(e.clickable===!0||e.selected!==null)),S=n(()=>{const t=e.outline===!0&&e.color||e.textColor;return"q-chip row inline no-wrap items-center"+(e.outline===!1&&e.color!==void 0?` bg-${e.color}`:"")+(t?` text-${t} q-chip--colored`:"")+(e.disable===!0?" disabled":"")+(e.dense===!0?" q-chip--dense":"")+(e.outline===!0?" q-chip--outline":"")+(e.selected===!0?" q-chip--selected":"")+(o.value===!0?" q-chip--clickable cursor-pointer non-selectable q-hoverable":"")+(e.square===!0?" q-chip--square":"")+(v.value===!0?" q-chip--dark q-dark":"")}),d=n(()=>{const t=e.disable===!0?{tabindex:-1,"aria-disabled":"true"}:{tabindex:e.tabindex||0},s={...t,role:"button","aria-hidden":"false","aria-label":e.removeAriaLabel||l.lang.label.remove};return{chip:t,remove:s}});function k(t){t.keyCode===13&&h(t)}function h(t){e.disable||(c("update:selected",!e.selected),c("click",t))}function m(t){(t.keyCode===void 0||t.keyCode===13)&&(A(t),e.disable===!1&&(c("update:modelValue",!1),c("remove")))}function C(){const t=[];o.value===!0&&t.push(i("div",{class:"q-focus-helper"})),f.value===!0&&t.push(i(r,{class:"q-chip__icon q-chip__icon--left",name:g.value}));const s=e.label!==void 0?[i("div",{class:"ellipsis"},[e.label])]:void 0;return t.push(i("div",{class:"q-chip__content col row no-wrap items-center q-anchor--skip"},R(u.default,s))),e.iconRight&&t.push(i(r,{class:"q-chip__icon q-chip__icon--right",name:e.iconRight})),e.removable===!0&&t.push(i(r,{class:"q-chip__icon q-chip__icon--remove cursor-pointer",name:q.value,...d.value.remove,onClick:m,onKeyup:m})),t}return()=>{if(e.modelValue===!1)return;const t={class:S.value,style:b.value};return o.value===!0&&Object.assign(t,d.value.chip,{onClick:h,onKeyup:k}),D("div",t,C(),"ripple",e.ripple!==!1&&e.disable!==!0,()=>[[z,e.ripple]])}}});const V=e=>new Date(e)<=new Date,L=e=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e),N=e=>e.trim().length>0,K=e=>e.trim().split(/\s+/).map(l=>l.charAt(0).toUpperCase()+l.slice(1).trim().normalize()).join(" "),a=I({length:!1,capital:!1,number:!1,symbol:!1}),O=e=>(a.length=e.length>=9,a.capital=/^(?=.*[A-Z])/.test(e),a.number=/^(?=.*[0-9])/.test(e),a.symbol=/^(?=.*[!.@#\$%\^&\*_\-=+])/.test(e),a.length&&a.capital&&a.number&&a.symbol);export{Q,V as a,L as b,a as c,O as d,K as f,N as v};
