import{g as a,E as e,j as t,v as s,s as l,n as r,q as o,r as u,t as n,u as i,e as d,w as m,m as c}from"./elementPlus-f16563b7.js";import{g as f,b as p,C as v,F as _}from"./config-758143a0.js";import{D as g,r as y,k as h,s as k,U as x,d as b,_ as j,Y as w,e as $,aD as E,o as F,a0 as V,ae as D,u as O,F as U,ah as q,aE as C,aF as I}from"./vendor-b101ffcd.js";import{u as P}from"./index-89088ace.js";import"./lodash-a70ac895.js";const S={style:{"padding-top":"10%"}},Y={class:"el-descriptions",style:{color:"var(--el-color-primary)"}},z={class:"demo-input-suffix"},A=(a=>(C("data-v-79a87744"),a=a(),I(),a))((()=>$("span",{class:"ml-3 w-30 text-gray-600 inline-flex items-center"},"路灯：",-1))),B={class:"ml-2"},G=((a,e)=>{const t=a.__vccOpts||a;for(const[s,l]of e)t[s]=l;return t})(g({__name:"index",setup(g){const C=y([]),I=y({}),G=y({danmaku:""}),H=y(!0),J=h((()=>{const a=G.value.danmaku;return a?C.value.filter((e=>e.message.includes(a)||e.uname.includes(a))):C.value}));return k((()=>{const e=f("type"),t=f("type_id");if(null!=e&&null!=t){P().setState(t,e)}(()=>{const e=f("roomid");if(null==e)return a({title:"Error",message:"房间号不存在，请返回上一页重新进入",type:"error"}),!1;H.value=!0,E.get(`${p}/api/get_room`,{params:{id:e}}).then((async e=>{if(0!=e.data.code)a({title:"Error",message:"系统异常",type:"error"});else{const a=e.data.data,t=(await E.get(`${p}/api/get_cover?url=${a.room_info.cover}`)).data;document.title=`${a.room_info.name}-blive-danmaku`,0===t.code&&(a.room_info.cover=`${p}${t.data.data}`),I.value=a.room_info,Object.assign(C.value,a.danmaku)}H.value=!1})).catch((e=>{H.value=!1,a({title:"Error",message:"请求异常",type:"error"})}))})()})),(a,f)=>{const p=r,g=o,y=u,h=n,k=i,E=d,C=e,P=m,K=t,L=c,M=s;return x((F(),b("div",S,[j(C,null,{default:w((()=>[j(g,null,{default:w((()=>[j(p,{style:{width:"60%"},src:I.value.cover,fit:"fill"},null,8,["src"])])),_:1}),j(E,null,{default:w((()=>[j(k,{column:2},{title:w((()=>[j(y,{type:"primary",target:"_blank",href:"https://space.bilibili.com/"+I.value.uid},{default:w((()=>[$("div",Y,V(I.value.title),1)])),_:1},8,["href"])])),default:w((()=>[j(h,{label:"开始时间"},{default:w((()=>[D(V(O(v)(I.value.start_time)),1)])),_:1}),j(h,{label:"结束时间"},{default:w((()=>[D(V(O(v)(I.value.end_time)),1)])),_:1})])),_:1})])),_:1})])),_:1}),$("div",z,[j(K,{gutter:20},{default:w((()=>[A,j(P,{class:"w-50",style:{width:"12.5rem"},modelValue:G.value.danmaku,"onUpdate:modelValue":f[0]||(f[0]=a=>G.value.danmaku=a),placeholder:"请在此输入搜索内容","prefix-icon":O(l)},null,8,["modelValue","prefix-icon"])])),_:1})]),j(K,{gutter:20},{default:w((()=>[j(L,{span:24},{default:w((()=>[(F(!0),b(U,null,q(O(J),(a=>(F(),b("ul",{style:{"text-align":"left"},key:a.id},[$("span",B,V(O(_)(a.create_time))+" ("+V(a.live_duration)+") : "+V(a.uname)+" "+V(a.message),1)])))),128))])),_:1})])),_:1})])),[[M,H.value]])}}}),[["__scopeId","data-v-79a87744"]]);export{G as default};
