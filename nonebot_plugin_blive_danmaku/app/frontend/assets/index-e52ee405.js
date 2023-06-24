import{a as e,p as a,w as l,x as t,y as s,g as u,A as o,B as d,C as r,D as n,n as i,F as p,c as m,G as c,H as v,v as f,t as g,u as _,I as y}from"./elementPlus-2bbb65c2.js";import{E as b,r as h,aG as k,b as x,j as V,P as C,S as z,u as U,k as Y,h as j,V as w,a0 as T,T as D,Q as M,ad as E,W as I,aM as P,aN as S}from"./vendor-fa374c7f.js";import{u as X,g as G,d as N,b as W,e as q,c as A}from"./index-3c05b20d.js";import{_ as B}from"./_plugin-vue_export-helper-1b428a4d.js";import"./lodash-520df23f.js";const F=e=>(P("data-v-72e0a09b"),e=e(),S(),e),H={class:"danmaku-room-list"},O={class:"image-slot"},Q=["onClick"],J={style:{padding:"14px"}},K={class:"danmaku-badge"},L={class:"bottom"},R={class:"time"},Z=F((()=>Y("br",null,null,-1))),$=F((()=>Y("br",null,null,-1))),ee={style:{"margin-top":"20px","margin-bottom":"20px"}},ae=B(b({__name:"index",setup(b){const P=h([]),S=h(0),B=h(1),F=h([10,20,30,50]),ae=h(20),le=h(!0),te=h(),se=h({}),ue=X(),oe=e=>{ae.value=e,pe()},de=e=>{B.value=e,pe()},re=k(),ne=e=>{re.push({path:"/room",query:{roomid:e,type:ue.getType,type_id:ue.getTypeId,uid:ue.getUid}})},ie=()=>{te.value.setScrollTop(0)},pe=()=>{le.value=!0;const a=ue.getType,l=ue.getTypeId,t=ue.getUid;if(!a||!l)return e({title:"Error",message:"当前地址有误，请从bot重新获取面板地址",type:"error"}),le.value=!1,!1;const s={type:a,type_id:l,uid:t,page:B.value,size:ae.value,title:se.value.title,danmaku:se.value.danmaku,start:se.value.start,end:se.value.end};N(s).then((a=>{if(0!=a.code)return e({title:"Error",message:a.msg||"系统异常",type:"error"}),!1;const l=a.data,t=l.rows;for(let e of t)e.cover.startsWith("/")&&(e.cover=W+e.cover);P.value=[],Object.assign(P.value,t),S.value=l.total,le.value=!1,ie()})).catch((a=>{le.value=!1,e({title:"Error",message:"请求异常",type:"error"})}))},me=()=>{B.value=1,pe()};return x((()=>{ie();const e=G("type"),a=G("type_id");ue.setState(a,e);const l=G("uid");ue.setUid(l),(()=>{const e={uid:ue.getUid};q(e).then((e=>{document.title=e.data.data}))})(),pe()})),(e,b)=>{const h=o,k=d,x=r,X=n,G=i,N=p,W=a,q=m,ue=l,re=_,ie=y,pe=c,ce=t,ve=v,fe=f;return j(),V("div",H,[C(W,{style:{width:"100%"}},{default:z((()=>[C(N,{ref:"form",model:se.value,inline:"","label-position":"left","label-width":"50px"},{default:z((()=>[C(k,{label:"标题"},{default:z((()=>[C(h,{modelValue:se.value.title,"onUpdate:modelValue":b[0]||(b[0]=e=>se.value.title=e),placeholder:"输入一个直播标题"},null,8,["modelValue"])])),_:1}),C(k,{label:"路灯"},{default:z((()=>[C(h,{modelValue:se.value.danmaku,"onUpdate:modelValue":b[1]||(b[1]=e=>se.value.danmaku=e),placeholder:"这里可以搜索路灯"},null,8,["modelValue"])])),_:1}),C(k,{label:"时间"},{default:z((()=>[C(X,{span:6},{default:z((()=>[C(x,{modelValue:se.value.start,"onUpdate:modelValue":b[2]||(b[2]=e=>se.value.start=e),type:"date",label:"Pick a date","value-format":"X",placeholder:"选择一个开始日期",format:"YYYY-MM-DD"},null,8,["modelValue"])])),_:1}),C(X,{class:"text-center",span:6},{default:z((()=>[w("-")])),_:1}),C(X,{span:6},{default:z((()=>[C(x,{modelValue:se.value.end,"onUpdate:modelValue":b[3]||(b[3]=e=>se.value.end=e),type:"date",label:"Pick a date","value-format":"X",placeholder:"选择一个结束日期",format:"YYYY-MM-DD"},null,8,["modelValue"])])),_:1})])),_:1}),C(k,null,{default:z((()=>[C(G,{type:"primary",onClick:me},{default:z((()=>[w("搜索")])),_:1})])),_:1})])),_:1},8,["model"])])),_:1}),C(ue,null,{default:z((()=>[C(q,null,{default:z((()=>[C(U(s))])),_:1})])),_:1}),C(U(u),{class:"danmaku-scroll-area","max-height":"40rem",ref_key:"scrollbar",ref:te,"view-style":{overflowX:"hidden"}},{default:z((()=>[T((j(),D(ce,{gutter:10,style:{width:"100em"}},{default:z((()=>[P.value.length>0?(j(!0),V(M,{key:0},E(P.value,(e=>(j(),D(X,{key:e.id,span:6,style:{"padding-top":"1%","padding-bottom":"1%"}},{default:z((()=>[C(W,{class:"danmaku-room-card"},{default:z((()=>[C(re,{alt:e.title,src:e.cover,referrerpolicy:"no-referrer",loading:"lazy","scroll-container":".danmaku-scroll-area",style:{cursor:"pointer"},onClick:a=>ne(e.id)},{placeholder:z((()=>[T(Y("div",O,null,512),[[fe,!0]])])),error:z((()=>[Y("div",{class:"image-slot",onClick:a=>ne(e.id)},[C(q,null,{default:z((()=>[C(U(g))])),_:1})],8,Q)])),_:2},1032,["alt","src","onClick"]),Y("div",J,[C(ie,{value:e.count,max:99},{default:z((()=>[Y("span",K,I(e.title),1)])),_:2},1032,["value"]),Y("div",L,[Y("time",R,[w("开始："+I(U(A)(e.start_time))+" ",1),Z,w("~"),$,w(" 结束："+I(U(A)(e.end_time)),1)]),C(G,{text:"",class:"button"},{default:z((()=>[w(I(e.name),1)])),_:2},1024)])])])),_:2},1024)])),_:2},1024)))),128)):(j(),D(X,{key:1,span:24},{default:z((()=>[C(pe,{description:"No data"})])),_:1}))])),_:1})),[[fe,le.value]])])),_:1},512),Y("div",ee,[C(ce,{gutter:20},{default:z((()=>[C(X,{span:12,offset:0},{default:z((()=>[C(ve,{background:"",layout:"total,sizes,prev,pager,next","page-size":ae.value,"page-sizes":F.value,total:S.value,"current-page":B.value,onSizeChange:oe,onCurrentChange:de},null,8,["page-size","page-sizes","total","current-page"])])),_:1})])),_:1})])])}}}),[["__scopeId","data-v-72e0a09b"]]);export{ae as default};
