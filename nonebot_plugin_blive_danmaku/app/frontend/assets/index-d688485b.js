import{d as F,g as R,h as B,F as H,R as P}from"./index-13d8bbb1.js";import{L as A,M as j,a as f,A as G,x as I,c as Q,N as q,G as z,D as O}from"./elementPlus-6d4b871f.js";import{E as U,aP as W,r as y,s as $,b as J,ax as K,h as n,j as u,k as m,P as l,S as r,u as g,Q as x,ad as X,V as i,W as c,a0 as L,T as k}from"./vendor-9f742c23.js";import"./lodash-742d3967.js";const Y={class:"demo-input-suffix"},Z=m("span",{class:"ml-3 inline-flex items-center"},"路灯：",-1),ee={key:0,class:"ml-2"},te=["innerHTML"],ae={key:1,class:"ml-2"},se=["innerHTML"],ue=U({__name:"index",setup(ne){const w=W({loader:()=>F(()=>import("./sc-4b040bb9.js"),["assets/sc-4b040bb9.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css","assets/html2canvas-18c4afc9.js","assets/index-13d8bbb1.js","assets/index-4f53a516.css","assets/sc-8f8a299b.css"])}),h=y(),C=t=>{const s={width:269,battery:Number(t.price*10),userName:t.uname,userRole:t.guard.toString(),scContent:t.message,showTrans:!1,transContent:"",showFansMedal:!1,medalName:"",medalLevel:1,guardMileStone:"0"};h.value.open(s)},d=y([]),_=y({danmaku:""}),T=()=>{const t=R("roomid");B({rid:t}).then(s=>{if(s.code!=0)f({title:"Error",message:s.msg||"获取弹幕异常",type:"error"});else{const o=s.data.rows;for(let a of o)a.hour_minute=H(a.create_time),a.message=P(a.message),(!a.type||a.type=="street_lamp")&&(a.message=a.message.replace("#路灯","").trim());d.value=o}})},D=$(()=>{const t=_.value.danmaku;return t?d.value.filter(o=>o.message.includes(t)||o.uname.includes(t)):d.value}),M=()=>{f({title:"提示",message:"已复制时间点到剪切板",type:"success"})},N=()=>{f({title:"Error",message:"复制失败",type:"error"})},v=t=>({msg:t,success:M,error:N});return J(()=>{T()}),(t,s)=>{const o=G,a=I,p=Q,V=q,b=z,S=O,E=K("clipboard");return n(),u(x,null,[m("div",Y,[l(a,{gutter:20},{default:r(()=>[Z,l(o,{class:"w-50",style:{width:"12.5rem"},modelValue:_.value.danmaku,"onUpdate:modelValue":s[0]||(s[0]=e=>_.value.danmaku=e),placeholder:"请在此输入搜索内容","prefix-icon":g(A),clearable:""},null,8,["modelValue","prefix-icon"])]),_:1})]),l(a,{gutter:20},{default:r(()=>[l(S,{span:24},{default:r(()=>[d.value.length>0?(n(!0),u(x,{key:0},X(D.value,e=>(n(),u("ul",{key:e.id,style:{"text-align":"left"}},[e.type=="street_lamp"||!e.type?(n(),u("span",ee,[i(c(e.uname)+"  "+c(e.hour_minute)+" (",1),L((n(),k(p,{type:"info",link:""},{default:r(()=>[i(c(e.live_duration),1)]),_:2},1024)),[[E,v(e.live_duration)]]),i(") : "),m("span",{innerHTML:e.message},null,8,te)])):(n(),u("span",ae,[i(c(e.uname)+"  "+c(e.hour_minute)+"(",1),L((n(),k(p,{type:"info",link:""},{default:r(()=>[i(c(e.live_duration),1)]),_:2},1024)),[[E,v(e.live_duration)]]),i(") : "),m("span",{class:"danmaku-message",innerHTML:e.message},null,8,se),l(V,{effect:"dark",placement:"top",content:"点击生成SC图片"},{default:r(()=>[l(p,{onClick:oe=>C(e),icon:g(j),size:"small",type:"primary",circle:""},null,8,["onClick","icon"])]),_:2},1024)]))]))),128)):(n(),k(b,{key:1,description:"No data"}))]),_:1})]),_:1}),l(g(w),{ref_key:"hd",ref:h},null,512)],64)}}});export{ue as default};