import{g as a,i as e,j as t,v as s,k as r,l as o,m as l,n,o as i,p as u}from"./elementPlus-f16563b7.js";import{D as d,a2 as p,r as c,s as m,d as v,U as f,X as g,Y as y,_,F as b,aD as x,o as h,ah as j,az as k,e as $,a0 as w,u as C,ae as z}from"./vendor-b101ffcd.js";import{g as D,b as E,C as P}from"./config-758143a0.js";import{u as U}from"./index-123dda7d.js";import"./lodash-a70ac895.js";const q={style:{padding:"14px"}},A={class:"bottom"},F={class:"time"},O=d({__name:"index",setup(d){const O=p(Array({})),S=c(0),X=c(1),Y=c(!0);document.title="主页-blive_danmaku";const B=()=>{},G=()=>{Y.value=!0;const e=D("type"),t=D("type_id");if(null==e||null==t)return a({title:"Error",message:"当前地址有误，请从bot重新获取订阅地址",type:"error"}),Y.value=!1,!1;x.get(`${E}/api/get_sub_list`,{params:{type:e,type_id:t,page:X.value,size:30}}).then((async e=>{if(0!=e.data.code)a({title:"Error",message:"系统异常",type:"error"});else{const a=e.data.data;S.value=a.total;const t=a.rows;for(let e of t){const a=(await x.get(`${E}/api/get_cover?url=${e.cover}`)).data;0===a.code&&(e.cover=`${E}${a.data.data}`)}Object.assign(O,t)}Y.value=!1})).catch((a=>{Y.value=!1}))},H=k();return m((()=>{const a=U(),e=D("type"),t=D("type_id");a.setState(t,e),G()})),(a,d)=>{const p=n,c=i,m=u,x=e,k=o,D=l,E=t,U=s,I=r;return h(),v(b,null,[f((h(),g(x,{wrap:"","infinite-scroll-disabled":true},{default:y((()=>[(h(!0),v(b,null,j(O,((a,e)=>(h(),g(m,{key:a,"body-style":{padding:"1px"},style:{width:"26em"}},{default:y((()=>[_(p,{src:a.cover,"referrer-policy":"no-referrer",style:{cursor:"pointer"},onClick:e=>{return t=a.id,void H.push({path:"/room",query:{roomid:t}});var t}},null,8,["src","onClick"]),$("div",q,[$("span",null,w(a.title),1),$("div",A,[$("time",F,w(C(P)(a.start_time))+" ~ "+w(C(P)(a.end_time)),1),_(c,{text:"",class:"button"},{default:y((()=>[z(w(a.name),1)])),_:2},1024)])])])),_:2},1024)))),128))])),_:1})),[[U,Y.value],[I,B]]),_(E,{gutter:20,style:{"margin-top":"20px"}},{default:y((()=>[_(D,{span:12,offset:10},{default:y((()=>[_(k,{background:"",layout:"prev,pager,next",total:S.value,"current-page":X.value,"onUpdate:currentPage":G},null,8,["total","current-page"])])),_:1})])),_:1})],64)}}});export{O as default};
