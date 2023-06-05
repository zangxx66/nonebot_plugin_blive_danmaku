import{u as e,g as a,a as t,b as s,c as l,d as o,_ as r}from"./index-7eb311aa.js";import{a as i,r as n,b as u,v as d,s as c,t as p,c as m,u as v,i as f,n as _,l as g}from"./elementPlus-e542d903.js";import{F as y,t as h,aQ as b,p as x,f as w,g as j,U as k,Z as E,u as U,a6 as T,_ as R,o as I,a1 as L,aR as P}from"./vendor-4de459fa.js";import"./lodash-520df23f.js";const q={class:"danmaku-room-list",style:{"padding-top":"0%",width:"60%",margin:"0 auto"}},z={class:"danmaku-page-header"},A={class:"text-large font-600 mr-3"},B={class:"image-slot"},D={style:{"text-align":"left"}},F={style:{color:"#000","font-weight":"bold","font-size":"20px"}},O={style:{"text-align":"left"}},Q={style:{"text-align":"left"}},S=y({__name:"index",setup(y){const S=h({}),V=h(!0),W=P({loader:()=>r((()=>import("./danmaku-9273b570.js")),["assets/danmaku-9273b570.js","assets/elementPlus-e542d903.js","assets/vendor-4de459fa.js","assets/lodash-520df23f.js","assets/elementPlus-7297eb15.css","assets/index-7eb311aa.js","assets/index-6464e386.css","assets/_plugin-vue_export-helper-1b428a4d.js","assets/danmaku-7bafb864.css"])}),Z=e(),C=b(),G=()=>{const e=Z.getType,a=Z.getTypeId,t=Z.getUid;C.replace({name:"history",query:{type:e,type_id:a,uid:t}})};return x((()=>{window.scrollTo({top:0,behavior:"smooth"});const e=a("type"),o=a("type_id");null!=e&&null!=o&&Z.setState(o,e),(()=>{const e=a("roomid");if(null==e)return i({title:"Error",message:"房间号不存在，请返回上一页重新进入",type:"error"}),V.value=!1,!1;V.value=!0,t({id:e}).then((async e=>{if(0!=e.code)i({title:"Error",message:"系统异常",type:"error"});else{const t=e.data.room_info;if(document.title=t.title,t.cover.includes("i0.hdslb.com")){const e=await s({url:t.cover,rid:t.id});t.cover=l+e.data.data}else if(t.cover.startsWith("http")){const e=new URL(t.cover).pathname.split("/").pop();t.cover=l+"/static/"+e}else t.cover=l+t.cover;if(S.value=t,0===Z.getUid){const e=a("uid");Z.setUid(e)}}V.value=!1})).catch((e=>{V.value=!1,i({title:"Error",message:"请求异常",type:"error"})}))})()})),(e,a)=>{const t=n,s=m,l=v,r=f,i=_,y=g,h=u,b=d;return I(),w("div",q,[j("div",z,[k(t,{icon:U(c),onBack:G},{content:E((()=>[j("span",A,L(S.value.name),1)])),_:1},8,["icon"])]),T((I(),R(h,null,{default:E((()=>[k(r,null,{default:E((()=>[k(l,{src:S.value.cover,fit:"fill"},{error:E((()=>[j("div",B,[k(s,null,{default:E((()=>[k(U(p))])),_:1})])])),_:1},8,["src"])])),_:1}),k(y,null,{default:E((()=>[j("ul",D,[k(i,{type:"primary",target:"_blank",href:"https://space.bilibili.com/"+S.value.uid},{default:E((()=>[j("div",F,L(S.value.title),1)])),_:1},8,["href"])]),j("ul",O,[j("span",null," 开始时间："+L(U(o)(S.value.start_time)),1)]),j("ul",Q,[j("span",null," 结束时间："+L(U(o)(S.value.end_time)),1)])])),_:1})])),_:1})),[[b,V.value]]),k(U(W))])}}});export{S as default};