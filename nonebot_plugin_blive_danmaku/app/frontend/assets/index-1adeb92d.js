import{a as e,q as a,w as t,v as l,x as s,y as o,A as r,B as u,o as d,C as n,D as i,F as p,t as c,c as m,u as v,G as f}from"./elementPlus-e542d903.js";import{F as g,t as y,aQ as _,p as h,f as b,U as k,Z as w,a6 as V,_ as x,o as U,a0 as C,V as z,an as Y,g as j,u as D,a1 as T,aW as M,aX as E}from"./vendor-4de459fa.js";import{u as I,g as P,e as X,b as q,c as F,f as S,d as W}from"./index-7eb311aa.js";import{_ as A}from"./_plugin-vue_export-helper-1b428a4d.js";import"./lodash-520df23f.js";const B=e=>(M("data-v-7c7bc06e"),e=e(),E(),e),G={class:"danmaku-room-list"},L=["onClick"],N={style:{padding:"14px"}},O={class:"bottom"},Q={class:"time"},R=B((()=>j("br",null,null,-1))),Z=B((()=>j("br",null,null,-1))),H=A(g({__name:"index",setup(g){const M=y([]),E=y(0),A=y(1),B=y([10,20,30,50]),H=y(20),J=y(!0),K=y({}),$=I(),ee=e=>{H.value=e,se()},ae=e=>{A.value=e,se()},te=_(),le=e=>{te.push({path:"/room",query:{roomid:e,type:$.getType,type_id:$.getTypeId,uid:$.getUid}})},se=()=>{J.value=!0;const a=$.getType,t=$.getTypeId,l=$.getUid;if(!a||!t)return e({title:"Error",message:"当前地址有误，请从bot重新获取面板地址",type:"error"}),J.value=!1,!1;const s={type:a,type_id:t,uid:l,page:A.value,size:H.value,title:K.value.title,danmaku:K.value.danmaku,start:K.value.start,end:K.value.end};X(s).then((async a=>{if(0!=a.code)return e({title:"Error",message:a.msg||"系统异常",type:"error"}),!1;const t=a.data,l=t.rows;for(let e of l)if(e.cover.includes("i0.hdslb.com")){const a=await q({url:e.cover,rid:e.id});0===a.code&&(e.cover=F+a.data.data)}else if(e.cover.startsWith("http")){const a=new URL(e.cover).pathname.split("/").pop();e.cover=F+"/static/"+a}else e.cover=F+e.cover;M.value=[],Object.assign(M.value,l),E.value=t.total,J.value=!1})).catch((a=>{J.value=!1,e({title:"Error",message:"请求异常",type:"error"})}))},oe=()=>{A.value=1,se()};return h((()=>{window.scrollTo({top:0,behavior:"smooth"});const e=P("type"),a=P("type_id");$.setState(a,e);const t=P("uid");$.setUid(t),(()=>{const e={uid:$.getUid};S(e).then((e=>{document.title=e.data.data}))})(),se()})),(e,g)=>{const y=s,_=o,h=r,I=u,P=d,X=n,q=a,F=m,S=v,$=f,te=i,se=t,re=p,ue=l;return U(),b("div",G,[k(q,{style:{width:"60rem"}},{default:w((()=>[k(X,{ref:"form",model:K.value,"label-position":"left",size:"default"},{default:w((()=>[k(_,{label:"标题"},{default:w((()=>[k(y,{"input-style":"width:40%",modelValue:K.value.title,"onUpdate:modelValue":g[0]||(g[0]=e=>K.value.title=e),placeholder:"输入一个直播标题"},null,8,["modelValue"])])),_:1}),k(_,{label:"路灯"},{default:w((()=>[k(y,{"input-style":"width:40%",modelValue:K.value.danmaku,"onUpdate:modelValue":g[1]||(g[1]=e=>K.value.danmaku=e),placeholder:"这里可以搜索路灯"},null,8,["modelValue"])])),_:1}),k(_,{label:"时间"},{default:w((()=>[k(I,{span:6},{default:w((()=>[k(h,{modelValue:K.value.start,"onUpdate:modelValue":g[2]||(g[2]=e=>K.value.start=e),type:"date",label:"Pick a date","value-format":"X",placeholder:"选择一个开始日期",format:"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])])),_:1}),k(I,{class:"text-center",span:1,style:{margin:"0 0.5rem"}},{default:w((()=>[C("-")])),_:1}),k(I,{span:6},{default:w((()=>[k(h,{modelValue:K.value.end,"onUpdate:modelValue":g[3]||(g[3]=e=>K.value.end=e),type:"date",label:"Pick a date","value-format":"X",placeholder:"选择一个结束日期",format:"YYYY-MM-DD",style:{width:"100%"}},null,8,["modelValue"])])),_:1})])),_:1}),k(_,null,{default:w((()=>[k(P,{type:"primary",onClick:oe},{default:w((()=>[C("搜索")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),V((U(),x(se,{gutter:10,style:{width:"100rem"}},{default:w((()=>[M.value.length>0?(U(!0),b(z,{key:0},Y(M.value,(e=>(U(),x(I,{key:e.id,span:6,style:{"padding-top":"1%"}},{default:w((()=>[k(q,{class:"danmaku-room-card"},{default:w((()=>[k($,{placement:"top",width:400,title:e.name,trigger:"hover",content:e.title},{reference:w((()=>[k(S,{alt:e.title,src:e.cover,"referrer-policy":"no-referrer",style:{cursor:"pointer"},onClick:a=>le(e.id)},{error:w((()=>[j("div",{class:"image-slot",onClick:a=>le(e.id)},[k(F,null,{default:w((()=>[k(D(c))])),_:1})],8,L)])),_:2},1032,["alt","src","onClick"])])),_:2},1032,["title","content"]),j("div",N,[j("span",null,T(e.title),1),j("div",O,[j("time",Q,[C("开始："+T(D(W)(e.start_time))+" ",1),R,C("~"),Z,C(" 结束："+T(D(W)(e.end_time)),1)]),k(P,{text:"",class:"button"},{default:w((()=>[C(T(e.name),1)])),_:2},1024)])])])),_:2},1024)])),_:2},1024)))),128)):(U(),x(I,{key:1,span:24},{default:w((()=>[k(te,{description:"No data"})])),_:1}))])),_:1})),[[ue,J.value]]),k(se,{gutter:20,style:{"margin-top":"20px","margin-bottom":"20px"}},{default:w((()=>[k(I,{span:12,offset:10},{default:w((()=>[k(re,{background:"",layout:"total,sizes,prev,pager,next","page-size":H.value,"page-sizes":B.value,total:E.value,"current-page":A.value,onSizeChange:ee,onCurrentChange:ae},null,8,["page-size","page-sizes","total","current-page"])])),_:1})])),_:1})])}}}),[["__scopeId","data-v-7c7bc06e"]]);export{H as default};