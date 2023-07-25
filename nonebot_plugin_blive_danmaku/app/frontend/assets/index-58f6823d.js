import{u as A,g as _,a as N,b as R,c as E,d as k,_ as q}from"./index-13d8bbb1.js";import{a as p,q as z,j as H,k as j,v as K,r as M,t as O,e as W,u as X,l as G,b as Q,o as F}from"./elementPlus-6d4b871f.js";import{E as J,r as f,aK as Y,b as Z,K as $,j as ee,k as o,P as s,S as n,u as r,a0 as x,T as b,h as v,W as d,X as te,aP as w}from"./vendor-9f742c23.js";import"./lodash-742d3967.js";const oe={class:"danmaku-room-list",style:{"padding-top":"0%",width:"60%",margin:"0 auto"}},ae={class:"danmaku-page-header"},se={class:"text-large font-600 mr-3"},ne={class:"image-slot"},le={class:"image-slot"},ie={style:{"text-align":"left"}},re={class:"danmaku-room-title"},ce={style:{"text-align":"left"}},_e={style:{"text-align":"left"}},de=J({__name:"index",setup(ue){const l=f({}),c=f(!0),g=f("120px"),C=w({loader:()=>k(()=>import("./index-d688485b.js"),["assets/index-d688485b.js","assets/index-13d8bbb1.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/elementPlus-6d4b871f.js","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css","assets/index-4f53a516.css"])}),S=w({loader:()=>k(()=>import("./index-9b9f275c.js"),["assets/index-9b9f275c.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css","assets/index-13d8bbb1.js","assets/index-4f53a516.css","assets/echarts-0647520d.js"])}),i=A(),I=Y(),L=()=>{const e=i.getType,t=i.getTypeId,a=i.getUid;I.replace({name:"history",query:{type:e,type_id:t,uid:a}})},T=()=>{const e=_("roomid");if(e==null)return p({title:"Error",message:"房间号不存在，请返回上一页重新进入",type:"error"}),c.value=!1,!1;c.value=!0,N({id:e}).then(async t=>{if(t.code!=0)p({title:"Error",message:"系统异常",type:"error"});else{const a=t.data.room_info;if(document.title=a.title,a.cover.startsWith("/")&&(a.cover=R+a.cover),l.value=a,i.getUid===0){const m=_("uid");i.setUid(m)}}c.value=!1}).catch(t=>{console.error(t),c.value=!1,p({title:"Error",message:"请求异常",type:"error"})})},u=()=>{const e=document.querySelector(".danmaku-main");g.value=e.clientHeight*.5+"px"};return Z(()=>{u(),window.addEventListener("resize",u);const e=_("type"),t=_("type_id");e!=null&&t!=null&&i.setState(t,e),T()}),$(()=>{window.removeEventListener("resize",u)}),(e,t)=>{const a=z,h=W,m=X,D=G,P=Q,B=F,U=H,V=j,y=K;return v(),ee("div",oe,[o("div",ae,[s(a,{icon:r(M),onBack:L},{content:n(()=>[o("span",se,d(l.value.name),1)]),_:1},8,["icon"])]),x((v(),b(U,null,{default:n(()=>[s(D,{class:"danmaku-room-card"},{default:n(()=>[s(m,{src:l.value.cover,referrerpolicy:"no-referrer",fit:"fill"},{placeholder:n(()=>[x(o("div",ne,null,512),[[y,!0]])]),error:n(()=>[o("div",le,[s(h,null,{default:n(()=>[s(r(O))]),_:1})])]),_:1},8,["src"])]),_:1}),s(B,null,{default:n(()=>[o("ul",ie,[s(P,{type:"primary",target:"_blank",href:"https://space.bilibili.com/"+l.value.uid},{default:n(()=>[o("div",re,d(l.value.title),1)]),_:1},8,["href"])]),o("ul",ce,[o("span",null," 开始时间："+d(r(E)(l.value.start_time)),1)]),o("ul",_e,[o("span",null," 结束时间："+d(r(E)(l.value.end_time)),1)])]),_:1})]),_:1})),[[y,c.value]]),s(V,{"max-height":g.value,"view-style":{overflowX:"hidden"}},{default:n(()=>[l.value.statistics?(v(),b(r(S),{key:0})):te("",!0),s(r(C))]),_:1},8,["max-height"])])}}});const ge=q(de,[["__scopeId","data-v-f577db64"]]);export{ge as default};
