import{r as y,h as p,l as ee,a0 as ie,U as le,X as oe,j,f as ue,ao as se,ap as re,aq as ce,ar as de,as as me,at as fe,au as H,av as ve,aw as pe,$ as ge,d as be,o as G,c as he,w as X,a as r,b as z,ax as P,u as d,ag as R,aj as O,s as Fe,ah as ye,al as Ve,Q as K,ay as J}from"./index.5cacb10f.js";import{Q as xe}from"./QChip.70763f59.js";import{h as Ce,Q as _e,_ as Se,a as Ne}from"./DrawerAppBar.9c80f38c.js";import{Q as ke}from"./QForm.da4fc38a.js";import{v as Z,a as ze,b as we,c as k,d as De,f as B}from"./funcionesValidar.66d5eda5.js";function A(l,m,w,h){const i=[];return l.forEach(s=>{h(s)===!0?i.push(s):m.push({failedPropValidation:w,file:s})}),i}function $(l){l&&l.dataTransfer&&(l.dataTransfer.dropEffect="copy"),le(l)}const Pe={multiple:Boolean,accept:String,capture:String,maxFileSize:[Number,String],maxTotalSize:[Number,String],maxFiles:[Number,String],filter:Function},je=["rejected"];function qe({editable:l,dnd:m,getFileInput:w,addFilesToQueue:h}){const{props:i,emit:s,proxy:g}=ee(),f=y(null),_=p(()=>i.accept!==void 0?i.accept.split(",").map(e=>(e=e.trim(),e==="*"?"*/":(e.endsWith("/*")&&(e=e.slice(0,e.length-1)),e.toUpperCase()))):null),S=p(()=>parseInt(i.maxFiles,10)),x=p(()=>parseInt(i.maxTotalSize,10));function q(e){if(l.value)if(e!==Object(e)&&(e={target:null}),e.target!==null&&e.target.matches('input[type="file"]')===!0)e.clientX===0&&e.clientY===0&&ie(e);else{const F=w();F&&F!==e.target&&F.click(e)}}function D(e){l.value&&e&&h(null,e)}function T(e,F,E,I){let a=Array.from(F||e.target.files);const b=[],N=()=>{b.length!==0&&s("rejected",b)};if(i.accept!==void 0&&_.value.indexOf("*/")===-1&&(a=A(a,b,"accept",n=>_.value.some(c=>n.type.toUpperCase().startsWith(c)||n.name.toUpperCase().endsWith(c))),a.length===0))return N();if(i.maxFileSize!==void 0){const n=parseInt(i.maxFileSize,10);if(a=A(a,b,"max-file-size",c=>c.size<=n),a.length===0)return N()}if(i.multiple!==!0&&a.length!==0&&(a=[a[0]]),a.forEach(n=>{n.__key=n.webkitRelativePath+n.lastModified+n.name+n.size}),I===!0){const n=E.map(c=>c.__key);a=A(a,b,"duplicate",c=>n.includes(c.__key)===!1)}if(a.length===0)return N();if(i.maxTotalSize!==void 0){let n=I===!0?E.reduce((c,L)=>c+L.size,0):0;if(a=A(a,b,"max-total-size",c=>(n+=c.size,n<=x.value)),a.length===0)return N()}if(typeof i.filter=="function"){const n=i.filter(a);a=A(a,b,"filter",c=>n.includes(c))}if(i.maxFiles!==void 0){let n=I===!0?E.length:0;if(a=A(a,b,"max-files",()=>(n++,n<=S.value)),a.length===0)return N()}if(N(),a.length!==0)return a}function U(e){$(e),m.value!==!0&&(m.value=!0)}function o(e){le(e),(e.relatedTarget!==null||oe.is.safari!==!0?e.relatedTarget!==f.value:document.elementsFromPoint(e.clientX,e.clientY).includes(f.value)===!1)===!0&&(m.value=!1)}function C(e){$(e);const F=e.dataTransfer.files;F.length!==0&&h(null,F),m.value=!1}function u(e){if(m.value===!0)return j("div",{ref:f,class:`q-${e}__dnd absolute-full`,onDragenter:$,onDragover:$,onDragleave:o,onDrop:C})}return Object.assign(g,{pickFiles:q,addFiles:D}),{pickFiles:q,addFiles:D,onDragover:U,onDragleave:o,processFiles:T,getDndNode:u,maxFilesNumber:S,maxTotalSizeNumber:x}}var Ae=ue({name:"QFile",inheritAttrs:!1,props:{...se,...re,...Pe,modelValue:[File,FileList,Array],append:Boolean,useChips:Boolean,displayValue:[String,Number],tabindex:{type:[String,Number],default:0},counterLabel:Function,inputClass:[Array,String,Object],inputStyle:[Array,String,Object]},emits:[...ce,...je],setup(l,{slots:m,emit:w,attrs:h}){const{proxy:i}=ee(),s=de(),g=y(null),f=y(!1),_=me(l),{pickFiles:S,onDragover:x,onDragleave:q,processFiles:D,getDndNode:T}=qe({editable:s.editable,dnd:f,getFileInput:M,addFilesToQueue:Y}),U=fe(l),o=p(()=>Object(l.modelValue)===l.modelValue?"length"in l.modelValue?Array.from(l.modelValue):[l.modelValue]:[]),C=p(()=>H(o.value)),u=p(()=>o.value.map(t=>t.name).join(", ")),e=p(()=>Ce(o.value.reduce((t,v)=>t+v.size,0))),F=p(()=>({totalSize:e.value,filesNumber:o.value.length,maxFiles:l.maxFiles})),E=p(()=>({tabindex:-1,type:"file",title:"",accept:l.accept,capture:l.capture,name:_.value,...h,id:s.targetUid.value,disabled:s.editable.value!==!0})),I=p(()=>"q-file q-field--auto-height"+(f.value===!0?" q-file--dnd":"")),a=p(()=>l.multiple===!0&&l.append===!0);function b(t){const v=o.value.slice();v.splice(t,1),n(v)}function N(t){const v=o.value.indexOf(t);v!==-1&&b(v)}function n(t){w("update:modelValue",l.multiple===!0?t:t[0])}function c(t){t.keyCode===13&&ge(t)}function L(t){(t.keyCode===13||t.keyCode===32)&&S(t)}function M(){return g.value}function Y(t,v){const V=D(t,v,o.value,a.value),W=M();W!=null&&(W.value=""),V!==void 0&&((l.multiple===!0?l.modelValue&&V.every(ne=>o.value.includes(ne)):l.modelValue===V[0])||n(a.value===!0?o.value.concat(V):V))}function Q(){return[j("input",{class:[l.inputClass,"q-file__filler"],style:l.inputStyle})]}function te(){if(m.file!==void 0)return o.value.length===0?Q():o.value.map((v,V)=>m.file({index:V,file:v,ref:this}));if(m.selected!==void 0)return o.value.length===0?Q():m.selected({files:o.value,ref:this});if(l.useChips===!0)return o.value.length===0?Q():o.value.map((v,V)=>j(xe,{key:"file-"+V,removable:s.editable.value,dense:!0,textColor:l.color,tabindex:l.tabindex,onRemove:()=>{b(V)}},()=>j("span",{class:"ellipsis",textContent:v.name})));const t=l.displayValue!==void 0?l.displayValue:u.value;return t.length!==0?[j("div",{class:l.inputClass,style:l.inputStyle,textContent:t})]:Q()}function ae(){const t={ref:g,...E.value,...U.value,class:"q-field__input fit absolute-full cursor-pointer",onChange:Y};return l.multiple===!0&&(t.multiple=!0),j("input",t)}return Object.assign(s,{fieldClass:I,emitValue:n,hasValue:C,inputRef:g,innerValue:o,floatingLabel:p(()=>C.value===!0||H(l.displayValue)),computedCounter:p(()=>{if(l.counterLabel!==void 0)return l.counterLabel(F.value);const t=l.maxFiles;return`${o.value.length}${t!==void 0?" / "+t:""} (${e.value})`}),getControlChild:()=>T("file"),getControl:()=>{const t={ref:s.targetRef,class:"q-field__native row items-center cursor-pointer",tabindex:l.tabindex};return s.editable.value===!0&&Object.assign(t,{onDragover:x,onDragleave:q,onKeydown:c,onKeyup:L}),j("div",t,[ae()].concat(te()))}}),Object.assign(i,{removeAtIndex:b,removeFile:N,getNativeElement:()=>g.value}),ve(i,"nativeEl",()=>g.value),pe(s)}});const Te={class:"q-pa-md",style:{"max-width":"40%"}},Ue={class:"password-criteria q-pa-sm"},Ee=z("div",{class:"text-subtitle2 q-mb-sm"},"Criterios de Contrase\xF1a:",-1),Ie={key:0},Le=be({__name:"FormComponent",emits:["closeForm"],setup(l,{emit:m}){const w="cuidador",h=y(""),i=y(""),s=y(""),g=y(""),f=y(""),_=y(""),S=y(),x=y(""),q=m,D=()=>{q("closeForm")},T=()=>[h,i,s,g,f,_,x].forEach(C=>C.value=""),U=()=>{const C={name:B(h.value),surname:B(i.value),date:B(s.value),email:B(g.value),password:f.value,phoneNumber:x.value};console.log(S.value),console.log(C),J("positive","Formulario Enviado"),D()},o=()=>J("negative","archivo no valido");return(C,u)=>(G(),he(_e,{view:"hHh lpR fFf"},{default:X(()=>[r(Ne,null,{default:X(()=>[z("div",Te,[r(Se),r(ke,{onSubmit:U,onReset:T,class:"q-gutter-md"},{default:X(()=>[r(P,{filled:"",modelValue:h.value,"onUpdate:modelValue":u[0]||(u[0]=e=>h.value=e),label:"Tu nombre *",hint:"Nombre",rules:[e=>d(Z)(e)||"Rellena correctamente"]},null,8,["modelValue","rules"]),r(P,{filled:"",modelValue:i.value,"onUpdate:modelValue":u[1]||(u[1]=e=>i.value=e),label:"Apellidos *",hint:"Apellidos",rules:[e=>d(Z)(e)||"Rellena correctamente"]},null,8,["modelValue","rules"]),r(P,{filled:"",type:"date",modelValue:s.value,"onUpdate:modelValue":u[2]||(u[2]=e=>s.value=e),label:"Fecha de Nacimiento *",rules:[e=>d(ze)(e)||"La fecha de nacimiento no puede ser mayor que la fecha actual"]},null,8,["modelValue","rules"]),r(P,{filled:"",type:"email",modelValue:g.value,"onUpdate:modelValue":u[3]||(u[3]=e=>g.value=e),label:"Email *",rules:[e=>d(we)(e)||"Tiene que ser un correo permitido"]},null,8,["modelValue","rules"]),r(P,{filled:"",modelValue:x.value,"onUpdate:modelValue":u[4]||(u[4]=e=>x.value=e),label:"Numero de Telefono",mask:"###-###-###","unmasked-value":""},null,8,["modelValue"]),r(P,{type:"password",modelValue:f.value,"onUpdate:modelValue":u[5]||(u[5]=e=>f.value=e),label:"Contrase\xF1a *"},null,8,["modelValue"]),z("div",Ue,[Ee,z("div",null,[r(R,{name:d(k).length?"check_circle":"cancel",color:d(k).length?"positive":"negative"},null,8,["name","color"]),O("Debe tener una longitud de 9 caracteres")]),z("div",null,[r(R,{name:d(k).capital?"check_circle":"cancel",color:d(k).capital?"positive":"negative"},null,8,["name","color"]),O("Debe contener al menos una mayuscula")]),z("div",null,[r(R,{name:d(k).number?"check_circle":"cancel",color:d(k).number?"positive":"negative"},null,8,["name","color"]),O("Tiene que contener al menos un numero")]),z("div",null,[r(R,{name:d(k).symbol?"check_circle":"cancel",color:d(k).symbol?"positive":"negative"},null,8,["name","color"]),O("Debe contener algun caracter especial: !@.#$%^&*()-_+=")])]),r(P,{label:"Confirm Password *",modelValue:_.value,"onUpdate:modelValue":u[6]||(u[6]=e=>_.value=e),disable:!d(De)(f.value),type:"password",rules:[e=>e&&e===f.value||"No coinciden."]},null,8,["modelValue","disable","rules"]),d(Fe).type===d(w)?(G(),ye("div",Ie,[r(Ae,{modelValue:S.value,"onUpdate:modelValue":u[7]||(u[7]=e=>S.value=e),filled:"",label:"Seleccionar archivo PDF","max-files":"1",accept:".pdf",onRejected:o,"max-file-size":"4096"},null,8,["modelValue"])])):Ve("",!0),z("div",null,[r(K,{label:"Enviar",type:"submit",color:"primary"}),r(K,{label:"Reset",type:"reset",color:"primary",flat:"",class:"q-ml-sm"})])]),_:1}),r(K,{align:"between",class:"btn-fixed-width",color:"accent",label:"Cerrar",icon:"",onClick:D,to:"/"})])]),_:1})]),_:1}))}});export{Le as default};
