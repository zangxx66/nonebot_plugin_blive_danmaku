import{c as Q,w as Y,P,B as D,Q as W,R as O,A as H,S as T,T as q,U as j,F as Z,d as z}from"./elementPlus-6d4b871f.js";import{h as X}from"./html2canvas-18c4afc9.js";import{aF as y,E as w,r as b,t as C,h as V,j as R,k as s,H as m,a0 as M,a1 as U,u as g,W as A,aR as _,P as o,T as $,S as i,V as v}from"./vendor-9f742c23.js";import{_ as J}from"./index-13d8bbb1.js";import"./lodash-742d3967.js";const ee=[[e=>e>=1&&e<5,()=>({start:"#5c968e",end:"#5c968e"})],[e=>e>=5&&e<9,()=>({start:"#5d7b9e",end:"#5d7b9e"})],[e=>e>=9&&e<13,()=>({start:"#8d7ca6",end:"#8d7ca6"})],[e=>e>=13&&e<17,()=>({start:"#be6686",end:"#be6686"})],[e=>e>=17&&e<21,()=>({start:"#c79d24",end:"#c79d24"})],[e=>e>=21&&e<25,()=>({start:"#1a544b",end:"#529d92"})],[e=>e>=25&&e<29,()=>({start:"#06154c",end:"#6888f1"})],[e=>e>=29&&e<33,()=>({start:"#2d0855",end:"#9d9bff"})],[e=>e>=33&&e<37,()=>({start:"#7a0423",end:"#e986bb"})],[e=>e>=37,()=>({start:"#ff610b",end:"#ffd084"})]],ae=e=>ee.find(t=>t[0](e))[1](),te=["","#ffe854","#ffe854","#67e8ff"];y.locale("zh-cn");const le=async(e,a,t="sc")=>{const r=await X(document.getElementById(e),{scale:a,backgroundColor:null,useCORS:!0}),d=document.createElement("a");d.download=`${t}-image-${y().unix()}.png`,d.href=r.toDataURL("image/png"),d.click(),d.remove()},oe=[[e=>e<500,()=>({info:"#EDF5FF",content:"#2A60B2"})],[e=>e>=500&&e<1e3,()=>({info:"#dbfffd",content:"#427d9e"})],[e=>e>=1e3&&e<5e3,()=>({info:"#fff1c5",content:"#e2b52b"})],[e=>e>=5e3&&e<1e4,()=>({info:"#ffead2",content:"#e09443"})],[e=>e>=1e4&&e<2e4,()=>({info:"#ffe7e4",content:"#e54d4d"})],[e=>e>=2e4,()=>({info:"#ffd8d8",content:"#ab1a32"})]],B=e=>oe.find(t=>t[0](e))[1](),se=["#666","#FF7C28","#E17AFF","#00D1F1"],ne=e=>e>=5e3&&e<2e4?new URL("/danmaku/assets/sc-badge-1-f98dcdbf.png",self.location).href:e>=2e4&&e<3e4?new URL("/danmaku/assets/sc-badge-2-abaf3760.png",self.location).href:e>=3e4?new URL("data:image/png;base64,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",self.location).href:new URL("",import.meta.url).href,de="data:image/png;base64,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",re="/danmaku/assets/guard-1-k-823c4f26.png",ue="data:image/png;base64,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",ie="/danmaku/assets/guard-2-k-a0b7be7c.png",pe="data:image/png;base64,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",me="/danmaku/assets/guard-3-k-3c7bacae.png",ce={class:"mr-5px ml-6px relative v-middle inline-block lh-18px text-12px"},Ae={class:"block -ml-12px mr-2px w22px h22px",bg:"no-repeat contain center-center"},fe=["src"],ve={class:"block"},be=w({__name:"FansMedal",props:{userRole:{},medalName:{},medalLevel:{},guardMileStone:{}},setup(e){const a=e;let t="";const r=b({start:"",end:""});return C(()=>{const d=a.medalLevel||1;r.value=ae(d)}),C(()=>{t=new URL(Object.assign({"../images/guard-1-0.png":de,"../images/guard-1-k.png":re,"../images/guard-2-0.png":ue,"../images/guard-2-k.png":ie,"../images/guard-3-0.png":pe,"../images/guard-3-k.png":me})[`../images/guard-${a.userRole}-${a.guardMileStone==="w"?"k":a.guardMileStone}.png`],self.location).href}),(d,l)=>(V(),R("div",ce,[s("div",{class:"relative block box-content h-14px lh-14px ws-nowrap font-yahei",border:"1px solid transparent rd-2px",text:"white 12px",style:m({borderColor:d.userRole==="0"?r.value.start:g(te)[d.userRole]})},[s("div",{class:"flex flex-center float-left box-content min-w-12px h-full lh-14px p-x-4px b-rd-l-1px",text:"white 12px center ws-nowrap",style:m({backgroundImage:`linear-gradient(45deg,${r.value.start},${r.value.end})`})},[M(s("i",Ae,[s("img",{class:"w-full h-full",src:a.userRole==="0"?"":`${g(t)}`,alt:""},null,8,fe)],512),[[U,a.userRole!=="0"]]),s("span",ve,A(a.medalName),1)],4),s("div",{class:"block box-content h-full w16px bg-#fff float-left fans-medal-level",text:"center transparent",style:m({color:r.value.start})},A(a.medalLevel),5)],4)]))}});const ge=J(be,[["__scopeId","data-v-32eb01b2"]]),he={class:"h-20px lh-20px",text:"14px #333",pos:"absolute top-10px right-8px"},xe={class:"h-34px flex justify-start items-center p-x-5px box-border sc_card_head",bg:"no-repeat right-top contain",border:"1px solid rd-t-6px rd-b-0"},Fe={class:"w-90% inline-block ml-0 text-#333",style:{"text-align":"left"}},Me={class:"inline-block w-auto v-text-bottom h-27px lh-27px"},Ue={class:"relative min-h-12px break-words",style:{"text-align":"left"}},ke={text:"12px #fff left",class:"lh-20px"},Ce={class:"relative min-h-12px break-words mt-6px p-t-6px input-trans-contain"},we={text:"12px #fff left",class:"lh-20px"},Ve=w({__name:"SuperChat",props:{width:{},battery:{},userName:{},userRole:{},scContent:{},showTrans:{type:Boolean},transContent:{},showFansMedal:{type:Boolean},medalName:{},medalLevel:{},guardMileStone:{}},setup(e){const a=e;_(r=>({31650159:t.value.content,ae7c7864:t.value.info}));const t=b(B(a.battery));return C(()=>{t.value=B(a.battery)}),(r,d)=>(V(),R("div",{id:"SuperChat",class:"relative p-5px break-words ws-normal -m-x-5px min-w-130px min-h-38px",text:"12px #61666D",style:m({width:`${a.width}px`})},[s("div",he,A(`${a.battery} 电池`),1),s("div",xe,[s("div",Fe,[M(s("div",Me,[o(ge,{userRole:a.userRole,medalName:a.medalName,medalLevel:a.medalLevel,guardMileStone:a.guardMileStone},null,8,["userRole","medalName","medalLevel","guardMileStone"])],512),[[U,r.showFansMedal]]),s("div",{class:"inline-block w-105px op-78 text-14px truncate v-text-bottom h-27px lh-27px ml-4px fw-700",style:m({color:g(se)[~~a.userRole]})},A(a.userName),5)])]),s("div",{class:"relative p-y-8px p-x-10px box-border",border:"rd-t-0 rd-b-6px min-h-38px",style:m({backgroundColor:t.value.content})},[s("div",Ue,[s("span",ke,A(a.scContent),1)]),M(s("div",Ce,[s("span",we,A(a.transContent),1)],512),[[U,a.showTrans]]),M(s("div",{pos:"absolute right-0 bottom-0",class:"w-16px h-16px",bg:"center cover no-repeat",style:m({backgroundImage:`url(${g(ne)(a.battery)})`})},null,4),[[U,a.battery>=5e3]])],4)],4))}});const Be=J(Ve,[["__scopeId","data-v-152096d4"]]),ye={style:{"text-align":"left","padding-top":"1rem"}},Se=w({__name:"sc",setup(e,{expose:a}){const t=b({width:269,battery:300,userName:"",userRole:"0",scContent:"",showTrans:!1,transContent:"",showFansMedal:!1,medalName:"",medalLevel:1,guardMileStone:"0"}),r=(p,n)=>{if(!p||p==null)return"";let h=0,x="";for(let c=0;c<p.length&&(h+=p.charCodeAt(c)>255?2:1,!(h>n));c++)x=p.substring(0,c+1);return x},d=b(!1),l=b({isFansName:t.value.showFansMedal,fansName:r(t.value.medalName,6),fansLevel:t.value.medalLevel,guardMil:t.value.guardMileStone,userRole:t.value.userRole}),L=()=>{d.value=!1,l.value.isFansName=!1,l.value.fansName="",l.value.guardMil="0",l.value.fansLevel=1};return a({open(p){t.value=p,t.value.medalName=r(t.value.medalName,6),l.value.isFansName=t.value.showFansMedal,l.value.userRole=t.value.userRole,d.value=!0}}),(p,n)=>{const h=Q,x=Y,c=P,f=D,F=W,I=O,K=H,S=T,k=q,N=j,E=Z,G=z;return V(),$(G,{modelValue:d.value,"onUpdate:modelValue":n[6]||(n[6]=u=>d.value=u),"append-to-body":!0,"before-close":L,draggable:"",title:"生成SC图片",width:"40%"},{default:i(()=>[o(Be,{width:t.value.width,battery:t.value.battery,userName:t.value.userName,userRole:l.value.userRole,scContent:t.value.scContent,showTrans:t.value.showTrans,transContent:t.value.transContent,showFansMedal:l.value.isFansName,medalName:l.value.fansName,medalLevel:l.value.fansLevel,guardMileStone:l.value.guardMil},null,8,["width","battery","userName","userRole","scContent","showTrans","transContent","showFansMedal","medalName","medalLevel","guardMileStone"]),s("div",ye,[o(h,{type:"primary",onClick:n[0]||(n[0]=u=>g(le)("SuperChat",1))},{default:i(()=>[v("导出图片")]),_:1})]),o(x,{"content-position":"left"},{default:i(()=>[v("设置")]),_:1}),o(E,{model:l.value,inline:!0},{default:i(()=>[o(f,{label:"显示粉丝牌"},{default:i(()=>[o(c,{modelValue:l.value.isFansName,"onUpdate:modelValue":n[1]||(n[1]=u=>l.value.isFansName=u)},null,8,["modelValue"])]),_:1}),o(f,{label:"用户身份"},{default:i(()=>[o(I,{style:{width:"10rem"},modelValue:l.value.userRole,"onUpdate:modelValue":n[2]||(n[2]=u=>l.value.userRole=u)},{default:i(()=>[o(F,{label:"普通",value:"0"}),o(F,{label:"舰长",value:"3"}),o(F,{label:"提督",value:"2"}),o(F,{label:"总督",value:"1"})]),_:1},8,["modelValue"])]),_:1}),o(f,{label:"粉丝牌名称"},{default:i(()=>[o(K,{clearable:"",formatter:u=>r(u,6),style:{width:"10rem"},modelValue:l.value.fansName,"onUpdate:modelValue":n[3]||(n[3]=u=>l.value.fansName=u)},null,8,["formatter","modelValue"])]),_:1}),o(f,{label:"粉丝牌等级"},{default:i(()=>[o(S,{modelValue:l.value.fansLevel,"onUpdate:modelValue":n[4]||(n[4]=u=>l.value.fansLevel=u),min:"1"},null,8,["modelValue"])]),_:1}),o(f,{label:"舰队里程碑"},{default:i(()=>[o(N,{modelValue:l.value.guardMil,"onUpdate:modelValue":n[5]||(n[5]=u=>l.value.guardMil=u)},{default:i(()=>[o(k,{label:"0"},{default:i(()=>[v("其他")]),_:1}),o(k,{label:"k"},{default:i(()=>[v("千舰")]),_:1}),o(k,{label:"w"},{default:i(()=>[v("万舰")]),_:1})]),_:1},8,["modelValue"])]),_:1})]),_:1},8,["model"])]),_:1},8,["modelValue"])}}});export{Se as default};
