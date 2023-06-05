var e=Object.defineProperty,t=(t,a,s)=>(((t,a,s)=>{a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[a]=s})(t,"symbol"!=typeof a?a+"":a,s),s);import{aN as a,aO as s,aP as n,F as r,t as o,aQ as i,p as l,P as d,aD as u,_ as c,Z as p,o as m,U as y,L as f,u as h,a0 as g,a6 as _,f as w,an as b,V as v,g as E,aR as x,a7 as k,a1 as T,aS as I,aT as L,aU as N,aK as P,aV as C}from"./vendor-4de459fa.js";import{E as O,a as U,b as j,h as R,z as S,c as D,d as V,e as A,f as H,g as $,i as q,j as z,k as B,l as M,m as F}from"./elementPlus-e542d903.js";import"./lodash-520df23f.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const K={},W=function(e,t,a){if(!t||0===t.length)return e();const s=document.getElementsByTagName("link");return Promise.all(t.map((e=>{if((e=function(e){return"/danmaku/"+e}(e))in K)return;K[e]=!0;const t=e.endsWith(".css"),n=t?'[rel="stylesheet"]':"";if(!!a)for(let a=s.length-1;a>=0;a--){const n=s[a];if(n.href===e&&(!t||"stylesheet"===n.rel))return}else if(document.querySelector(`link[href="${e}"]${n}`))return;const r=document.createElement("link");return r.rel=t?"stylesheet":"modulepreload",t||(r.as="script",r.crossOrigin=""),r.href=e,document.head.appendChild(r),t?new Promise(((t,a)=>{r.addEventListener("load",t),r.addEventListener("error",(()=>a(new Error(`Unable to preload CSS for ${e}`))))})):void 0}))).then((()=>e()))},G=a("storeId",{state:()=>({type_id:0,type:"",uid:0}),getters:{getTypeId:e=>e.type_id,getType:e=>e.type,getUid:e=>e.uid},actions:{setState(e,t){if(!e||!t)throw new Error("参数错误，需要从bot提供的地址进入");if(isNaN(Number(e)))throw new TypeError("type_id类型错误");{const a=Number(e);this.type=t,this.type_id=a}},setUid(e){if(!e)throw new Error("参数错误");if(isNaN(Number(e)))throw new TypeError("uid类型错误");{const t=Number(e);this.uid=t}}}}),Q=`${location.protocol}//${location.host}/danmaku`;const Z=new class{constructor(e){t(this,"baseUrl"),this.baseUrl=e}getInsideConfig(){return{baseUrl:this.baseUrl,params:{}}}async get(e,t={},a=null){const n=this.getInsideConfig();n.params=t;return(await s.get(n.baseUrl+e,n)).data}async post(e,t={},a=null){const n=this.getInsideConfig();null!=a&&Object.assign(n,a);return(await s.post(n.baseUrl+e,t,n)).data}}(Q),J=async(e={})=>await Z.get("/api/get_sub_list",e),X=async(e={})=>await Z.get("/api/get_room",e),Y=async(e={})=>await Z.get("/api/get_cover",e),ee=async(e={})=>await Z.get("/api/get_room_danmaku",e),te=async(e={})=>await Z.get("/api/get_liver_name",e);n.locale("zh-cn");const ae=e=>{if(0===e)return"/";return n.unix(e).format("yyyy-MM-D HH:mm:ss")},se=e=>n(e).format("HH:mm:ss"),ne=e=>{const t=window.location.hash.split("?",2)[1];if(t){const a=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),s=t.match(a);return null!=s?decodeURIComponent(s[2]):null}},re=()=>n(),oe=e=>{const t=G();O.confirm("是否重置图片缓存？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((()=>(async(e={})=>await Z.get("/api/clear_cache",e))({type:t.getType,type_id:t.getTypeId}))).then((t=>{0===t.code?(U({title:"提示",message:"操作成功",type:"success"}),e&&location.reload()):U({title:"提示",message:"操作失败",type:"error"})})).catch((e=>{}))},ie=E("div",{class:"flex-grow"},null,-1),le=E("span",null,"Home",-1),de=r({__name:"App",setup(e){const t=o([]),a=o(1020),s=o(1920),n=i(),r=G(),I=()=>{const e=r.getTypeId,t=r.getType;n.replace({path:"/",query:{type:t,type_id:e}})},L=x({loader:()=>W((()=>import("./helpDialog-3ae8a0e4.js")),["assets/helpDialog-3ae8a0e4.js","assets/elementPlus-e542d903.js","assets/vendor-4de459fa.js","assets/lodash-520df23f.js","assets/elementPlus-7297eb15.css"])}),N=o(),P=()=>{N.value.open()},C=()=>{const e=window.innerWidth,t=window.innerHeight;a.value=t-60,s.value=e;document.querySelector(".danmaku-main").style.width=s.value-200+"px"},O=()=>{(async(e={})=>await Z.get("/api/get_liver_list",e))({type_id:r.getTypeId,type:r.getType}).then((async e=>{0===e.code?Object.assign(t.value,e.data.data):U({title:"Error",message:e.msg||"系统异常",type:"error"})})).catch((e=>{U({title:"Error",message:"系统异常",type:"error"})}))};return l((()=>{C(),window.addEventListener("resize",C);const e=ne("type"),t=ne("type_id");r.setState(t,e),O()})),d((()=>{window.removeEventListener("resize",C)})),(e,o)=>{const i=D,l=V,d=A,x=H,C=$,O=q,U=z,K=u("RouterView"),W=B,G=M,Q=F,Z=j;return m(),c(Z,null,{default:p((()=>[y(U,{offset:.1},{default:p((()=>[y(x,{"background-color":"#545c64","text-color":"#fff",ellipsis:!1,router:!1,style:f({width:s.value+"px"}),mode:"horizontal"},{default:p((()=>[y(l,{index:"0"},{default:p((()=>[y(i,null,{default:p((()=>[y(h(R))])),_:1}),g(" blive-danmaku ")])),_:1}),ie,y(d,{index:"1"},{title:p((()=>[g("?")])),default:p((()=>[y(l,{index:"1-1",onClick:o[0]||(o[0]=e=>h(oe)(!0))},{default:p((()=>[g(" 修复图片缓存 ")])),_:1}),_(y(l,{index:"1-2"},{default:p((()=>[g(" 更新日志 ")])),_:1},512),[[k,!1]]),y(l,{index:"1-3",onClick:P},{default:p((()=>[g(" 帮助 ")])),_:1})])),_:1})])),_:1},8,["style"]),y(O,{width:"200px",class:"danmaku-aside",style:f({height:a.value+"px"})},{default:p((()=>[y(C,null,{default:p((()=>[y(x,null,{default:p((()=>[y(l,{index:"0",onClick:I},{default:p((()=>[le])),_:1}),(m(!0),w(v,null,b(t.value,((e,t)=>(m(),c(l,{index:t+1,onClick:t=>((e,t)=>{const a=r.getTypeId,s=r.getType;n.push({name:"history",query:{type:s,type_id:a,uid:e}})})(e.uid,e.name)},{default:p((()=>[E("span",null,T(e.name),1)])),_:2},1032,["index","onClick"])))),256))])),_:1})])),_:1})])),_:1},8,["style"]),E("div",{class:"h-6",id:"danmaku-menu-line",style:f({width:s.value+"px"})},null,4)])),_:1}),y(G,{class:"danmaku-main"},{default:p((()=>[y(W,{locale:h(S)},{default:p((()=>[y(K)])),_:1},8,["locale"])])),_:1}),y(h(L),{ref_key:"hd",ref:N},null,512),y(Q,{right:40,bottom:100})])),_:1})}}}),ue=I({history:L(),routes:[{name:"home",path:"/",component:()=>W((()=>import("./index-1d27e738.js")),["assets/index-1d27e738.js","assets/elementPlus-e542d903.js","assets/vendor-4de459fa.js","assets/lodash-520df23f.js","assets/elementPlus-7297eb15.css","assets/_plugin-vue_export-helper-1b428a4d.js","assets/index-76fba519.css"])},{name:"history",path:"/history",component:()=>W((()=>import("./index-1adeb92d.js")),["assets/index-1adeb92d.js","assets/elementPlus-e542d903.js","assets/vendor-4de459fa.js","assets/lodash-520df23f.js","assets/elementPlus-7297eb15.css","assets/_plugin-vue_export-helper-1b428a4d.js","assets/index-21b707ce.css"])},{name:"room",path:"/room",component:()=>W((()=>import("./index-3100be64.js")),["assets/index-3100be64.js","assets/elementPlus-e542d903.js","assets/vendor-4de459fa.js","assets/lodash-520df23f.js","assets/elementPlus-7297eb15.css"])}]}),ce=N(),pe=P(de);pe.use(ue),pe.use(ce),pe.use(C),pe.mount("#app");export{oe as C,se as F,re as G,W as _,X as a,Y as b,Q as c,ae as d,J as e,te as f,ne as g,ee as h,G as u};