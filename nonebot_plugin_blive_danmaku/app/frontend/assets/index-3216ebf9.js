import{g as e,i as t,v as a,j as s,k as r,l as o,m as l,n,o as u}from"./elementPlus-4e8d8628.js";import{C as i,r as d,s as p,d as c,S as m,W as v,X as f,Z as g,V as y,o as _,ah as b,az as j,e as x,$ as h,u as k,ae as C}from"./vendor-808712ef.js";import{g as z,r as E,b as $,C as w}from"./api-4454a31c.js";import{u as G}from"./index-2a6a4ef0.js";import"./lodash-a70ac895.js";const P={style:{padding:"14px"}},S={class:"bottom"},T={class:"time"},U=i({__name:"index",setup(i){const U=d([]),q=d(0),I=d(1),L=d(!0),O=G();document.title="主页-blive_danmaku";const R=()=>{},V=()=>{L.value=!0;const t=O.getType,a=O.getTypeId;if(!t||!a)return e({title:"Error",message:"当前地址有误，请从bot重新获取面板地址",type:"error"}),L.value=!1,!1;const s={type:t,type_id:a,page:I.value,size:30};E.GetRoomList(s).then((async t=>{if(0!=t.code)return e({title:"Error",message:"系统异常",type:"error"}),!1;const a=t.data,s=a.rows;for(let e of s){const t=await E.GetCoverUrl({url:e.cover});0===t.code&&(e.cover=`${$}${t.data.data}`)}Object.assign(U.value,s),q.value=a.total,L.value=!1})).catch((t=>{L.value=!1,e({title:"Error",message:"请求异常",type:"error"})}))},W=j();return p((()=>{const e=z("type"),t=z("type_id");O.setState(t,e),V()})),(e,i)=>{const d=l,p=n,j=u,z=r,E=t,$=o,G=a,O=s;return _(),c(y,null,[m((_(),v(E,{gutter:10,"infinite-scroll-disabled":true},{default:f((()=>[(_(!0),c(y,null,b(U.value,(e=>(_(),v(z,{key:e.id,span:8,style:{"padding-top":"1%"}},{default:f((()=>[g(j,null,{default:f((()=>[g(d,{src:e.cover,"referrer-policy":"no-referrer",style:{cursor:"pointer"},onClick:t=>{return a=e.id,void W.push({path:"/room",query:{roomid:a}});var a}},null,8,["src","onClick"]),x("div",P,[x("span",null,h(e.title),1),x("div",S,[x("time",T,h(k(w)(e.start_time))+" ~ "+h(k(w)(e.end_time)),1),g(p,{text:"",class:"button"},{default:f((()=>[C(h(e.name),1)])),_:2},1024)])])])),_:2},1024)])),_:2},1024)))),128))])),_:1})),[[G,L.value],[O,R]]),g(E,{gutter:20,style:{"margin-top":"20px"}},{default:f((()=>[g(z,{span:12,offset:10},{default:f((()=>[g($,{background:"",layout:"prev,pager,next","page-size":30,total:q.value,"current-page":I.value,"onUpdate:currentPage":V},null,8,["total","current-page"])])),_:1})])),_:1})],64)}}});export{U as default};
