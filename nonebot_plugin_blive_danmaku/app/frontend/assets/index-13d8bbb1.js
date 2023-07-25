var Z=Object.defineProperty;var ee=(e,a,c)=>a in e?Z(e,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):e[a]=c;var H=(e,a,c)=>(ee(e,typeof a!="symbol"?a+"":a,c),c);import{aD as ae,aE as $,aF as E,E as C,s as O,h as j,j as L,k as p,G as P,H as w,u as v,aG as ce,aH as te,aI as de,r as x,T as S,S as i,P as n,V as m,aJ as U,aK as A,y as se,Q as B,b as oe,K as ne,at as ie,ad as fe,W as le,aL as be,aM as pe,aN as re,aA as me,aO as ue}from"./vendor-9f742c23.js";import{E as he,a as k,b as ge,c as ve,d as _e,h as ye,s as je,e as we,f as G,g as xe,i as M,j as Ee,z as ke,k as Ce,l as Ne,m as Ie,n as Te,o as Se}from"./elementPlus-6d4b871f.js";import"./lodash-742d3967.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const d of t)if(d.type==="childList")for(const o of d.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&s(o)}).observe(document,{childList:!0,subtree:!0});function c(t){const d={};return t.integrity&&(d.integrity=t.integrity),t.referrerPolicy&&(d.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?d.credentials="include":t.crossOrigin==="anonymous"?d.credentials="omit":d.credentials="same-origin",d}function s(t){if(t.ep)return;t.ep=!0;const d=c(t);fetch(t.href,d)}})();const V=ae("storeId",{state:()=>({type_id:0,type:"",uid:0}),getters:{getTypeId:e=>e.type_id,getType:e=>e.type,getUid:e=>e.uid},actions:{setState(e,a){if(!e||!a)throw new Error("参数错误，需要从bot提供的地址进入");if(isNaN(Number(e)))throw new TypeError("type_id类型错误");{const c=Number(e);this.type=a,this.type_id=c}},setUid(e){if(e){if(isNaN(Number(e)))throw new TypeError("uid类型错误");{const a=Number(e);this.uid=a}}else throw new Error("参数错误")}}}),Le=`${location.protocol}//${location.host}/danmaku`;class Ve{constructor(a){H(this,"baseUrl");this.baseUrl=a}getInsideConfig(){return{baseUrl:this.baseUrl,params:{}}}async get(a,c={},s=null){const t=this.getInsideConfig();return t.params=c,(await $.get(t.baseUrl+a,t)).data}async post(a,c={},s=null){const t=this.getInsideConfig();return s!=null&&Object.assign(t,s),(await $.post(t.baseUrl+a,c,t)).data}}const _=new Ve(Le),ba=async(e={})=>await _.get("/api/get_sub_list",e),pa=async(e={})=>await _.get("/api/get_room",e),ra=async(e={})=>await _.get("/api/get_room_danmaku",e),Re=async(e={})=>await _.get("/api/get_liver_list",e),ma=async(e={})=>await _.get("/api/get_liver_name",e),He=async(e={})=>await _.get("/api/clear_cache",e),ua=async(e={})=>await _.get("/api/get_statistics",e),$e=[{emoji:"[dog]",url:"http://i0.hdslb.com/bfs/live/4428c84e694fbf4e0ef6c06e958d9352c3582740.png",map:"4428c84e694fbf4e0ef6c06e958d9352c3582740.png"},{emoji:"[花]",url:"http://i0.hdslb.com/bfs/live/7dd2ef03e13998575e4d8a803c6e12909f94e72b.png",map:"7dd2ef03e13998575e4d8a803c6e12909f94e72b.png"},{emoji:"[妙]",url:"http://i0.hdslb.com/bfs/live/08f735d950a0fba267dda140673c9ab2edf6410d.png",map:"08f735d950a0fba267dda140673c9ab2edf6410d.png"},{emoji:"[哇]",url:"http://i0.hdslb.com/bfs/live/650c3e22c06edcbca9756365754d38952fc019c3.png",map:"650c3e22c06edcbca9756365754d38952fc019c3.png"},{emoji:"[爱]",url:"http://i0.hdslb.com/bfs/live/1daaa5d284dafaa16c51409447da851ff1ec557f.png",map:"1daaa5d284dafaa16c51409447da851ff1ec557f.png"},{emoji:"[手机]",url:"http://i0.hdslb.com/bfs/live/b159f90431148a973824f596288e7ad6a8db014b.png",map:"b159f90431148a973824f596288e7ad6a8db014b.png"},{emoji:"[撇嘴]",url:"http://i0.hdslb.com/bfs/live/4255ce6ed5d15b60311728a803d03dd9a24366b2.png",map:"4255ce6ed5d15b60311728a803d03dd9a24366b2.png"},{emoji:"[委屈]",url:"http://i0.hdslb.com/bfs/live/69312e99a00d1db2de34ef2db9220c5686643a3f.png",map:"69312e99a00d1db2de34ef2db9220c5686643a3f.png"},{emoji:"[抓狂]",url:"http://i0.hdslb.com/bfs/live/a7feb260bb5b15f97d7119b444fc698e82516b9f.png",map:"a7feb260bb5b15f97d7119b444fc698e82516b9f.png"},{emoji:"[比心]",url:"http://i0.hdslb.com/bfs/live/4e029593562283f00d39b99e0557878c4199c71d.png",map:"4e029593562283f00d39b99e0557878c4199c71d.png"},{emoji:"[赞]",url:"http://i0.hdslb.com/bfs/live/2dd666d3651bafe8683acf770b7f4163a5f49809.png",map:"2dd666d3651bafe8683acf770b7f4163a5f49809.png"},{emoji:"[滑稽]",url:"http://i0.hdslb.com/bfs/live/8624fd172037573c8600b2597e3731ef0e5ea983.png",map:"8624fd172037573c8600b2597e3731ef0e5ea983.png"},{emoji:"[吃瓜]",url:"http://i0.hdslb.com/bfs/live/ffb53c252b085d042173379ac724694ce3196194.png",map:"ffb53c252b085d042173379ac724694ce3196194.png"},{emoji:"[笑哭]",url:"http://i0.hdslb.com/bfs/live/c5436c6806c32b28d471bb23d42f0f8f164a187a.png",map:"c5436c6806c32b28d471bb23d42f0f8f164a187a.png"},{emoji:"[捂脸]",url:"http://i0.hdslb.com/bfs/live/e6073c6849f735ae6cb7af3a20ff7dcec962b4c5.png",map:"e6073c6849f735ae6cb7af3a20ff7dcec962b4c5.png"},{emoji:"[喝彩]",url:"http://i0.hdslb.com/bfs/live/b51824125d09923a4ca064f0c0b49fc97d3fab79.png",map:"b51824125d09923a4ca064f0c0b49fc97d3fab79.png"},{emoji:"[偷笑]",url:"http://i0.hdslb.com/bfs/live/e2ba16f947a23179cdc00420b71cc1d627d8ae25.png",map:"e2ba16f947a23179cdc00420b71cc1d627d8ae25.png"},{emoji:"[大笑]",url:"http://i0.hdslb.com/bfs/live/e2589d086df0db8a7b5ca2b1273c02d31d4433d4.png",map:"e2589d086df0db8a7b5ca2b1273c02d31d4433d4.png"},{emoji:"[惊喜]",url:"http://i0.hdslb.com/bfs/live/9c75761c5b6e1ff59b29577deb8e6ad996b86bd7.png",map:"9c75761c5b6e1ff59b29577deb8e6ad996b86bd7.png"},{emoji:"[傲娇]",url:"http://i0.hdslb.com/bfs/live/b5b44f099059a1bafb2c2722cfe9a6f62c1dc531.png",map:"b5b44f099059a1bafb2c2722cfe9a6f62c1dc531.png"},{emoji:"[疼]",url:"http://i0.hdslb.com/bfs/live/492b10d03545b7863919033db7d1ae3ef342df2f.png",map:"492b10d03545b7863919033db7d1ae3ef342df2f.png"},{emoji:"[吓]",url:"http://i0.hdslb.com/bfs/live/c6bed64ffb78c97c93a83fbd22f6fdf951400f31.png",map:"c6bed64ffb78c97c93a83fbd22f6fdf951400f31.png"},{emoji:"[阴险]",url:"http://i0.hdslb.com/bfs/live/a4df45c035b0ca0c58f162b5fb5058cf273d0d09.png",map:"a4df45c035b0ca0c58f162b5fb5058cf273d0d09.png"},{emoji:"[惊讶]",url:"http://i0.hdslb.com/bfs/live/bc26f29f62340091737c82109b8b91f32e6675ad.png",map:"bc26f29f62340091737c82109b8b91f32e6675ad.png"},{emoji:"[生病]",url:"http://i0.hdslb.com/bfs/live/84c92239591e5ece0f986c75a39050a5c61c803c.png",map:"84c92239591e5ece0f986c75a39050a5c61c803c.png"},{emoji:"[嘘]",url:"http://i0.hdslb.com/bfs/live/b6226219384befa5da1d437cb2ff4ba06c303844.png",map:"b6226219384befa5da1d437cb2ff4ba06c303844.png"},{emoji:"[奸笑]",url:"http://i0.hdslb.com/bfs/live/5935e6a4103d024955f749d428311f39e120a58a.png",map:"5935e6a4103d024955f749d428311f39e120a58a.png"},{emoji:"[囧]",url:"http://i0.hdslb.com/bfs/live/204413d3cf330e122230dcc99d29056f2a60e6f2.png",map:"204413d3cf330e122230dcc99d29056f2a60e6f2.png"},{emoji:"[捂脸2]",url:"http://i0.hdslb.com/bfs/live/a2ad0cc7e390a303f6d243821479452d31902a5f.png",map:"a2ad0cc7e390a303f6d243821479452d31902a5f.png"},{emoji:"[出窍]",url:"http://i0.hdslb.com/bfs/live/bb8e95fa54512ffea07023ea4f2abee4a163e7a0.png",map:"bb8e95fa54512ffea07023ea4f2abee4a163e7a0.png"},{emoji:"[吐了啊]",url:"http://i0.hdslb.com/bfs/live/2b6b4cc33be42c3257dc1f6ef3a39d666b6b4b1a.png",map:"2b6b4cc33be42c3257dc1f6ef3a39d666b6b4b1a.png"},{emoji:"[鼻子]",url:"http://i0.hdslb.com/bfs/live/f4ed20a70d0cb85a22c0c59c628aedfe30566b37.png",map:"f4ed20a70d0cb85a22c0c59c628aedfe30566b37.png"},{emoji:"[调皮]",url:"http://i0.hdslb.com/bfs/live/84fe12ecde5d3875e1090d83ac9027cb7d7fba9f.png",map:"84fe12ecde5d3875e1090d83ac9027cb7d7fba9f.png"},{emoji:"[酸]",url:"http://i0.hdslb.com/bfs/live/98fd92c6115b0d305f544b209c78ec322e4bb4ff.png",map:"98fd92c6115b0d305f544b209c78ec322e4bb4ff.png"},{emoji:"[冷]",url:"http://i0.hdslb.com/bfs/live/b804118a1bdb8f3bec67d9b108d5ade6e3aa93a9.png",map:"b804118a1bdb8f3bec67d9b108d5ade6e3aa93a9.png"},{emoji:"[OK]",url:"http://i0.hdslb.com/bfs/live/86268b09e35fbe4215815a28ef3cf25ec71c124f.png",map:"86268b09e35fbe4215815a28ef3cf25ec71c124f.png"},{emoji:"[微笑]",url:"http://i0.hdslb.com/bfs/live/f605dd8229fa0115e57d2f16cb019da28545452b.png",map:"f605dd8229fa0115e57d2f16cb019da28545452b.png"},{emoji:"[藏狐]",url:"http://i0.hdslb.com/bfs/live/05ef7849e7313e9c32887df922613a7c1ad27f12.png",map:"05ef7849e7313e9c32887df922613a7c1ad27f12.png"},{emoji:"[龇牙]",url:"http://i0.hdslb.com/bfs/live/8b99266ea7b9e86cf9d25c3d1151d80c5ba5c9a1.png",map:"8b99266ea7b9e86cf9d25c3d1151d80c5ba5c9a1.png"},{emoji:"[防护]",url:"http://i0.hdslb.com/bfs/live/17435e60dcc28ce306762103a2a646046ff10b0a.png",map:"17435e60dcc28ce306762103a2a646046ff10b0a.png"},{emoji:"[笑]",url:"http://i0.hdslb.com/bfs/live/a91a27f83c38b5576f4cd08d4e11a2880de78918.png",map:"a91a27f83c38b5576f4cd08d4e11a2880de78918.png"},{emoji:"[一般]",url:"http://i0.hdslb.com/bfs/live/8d436de0c3701d87e4ca9c1be01c01b199ac198e.png",map:"8d436de0c3701d87e4ca9c1be01c01b199ac198e.png"},{emoji:"[嫌弃]",url:"http://i0.hdslb.com/bfs/live/c409425ba1ad2c6534f0df7de350ba83a9c949e5.png",map:"c409425ba1ad2c6534f0df7de350ba83a9c949e5.png"},{emoji:"[无语]",url:"http://i0.hdslb.com/bfs/live/4781a77be9c8f0d4658274eb4e3012c47a159f23.png",map:"4781a77be9c8f0d4658274eb4e3012c47a159f23.png"},{emoji:"[哈欠]",url:"http://i0.hdslb.com/bfs/live/6e496946725cd66e7ff1b53021bf1cc0fc240288.png",map:"6e496946725cd66e7ff1b53021bf1cc0fc240288.png"},{emoji:"[可怜]",url:"http://i0.hdslb.com/bfs/live/8e88e6a137463703e96d4f27629f878efa323456.png",map:"8e88e6a137463703e96d4f27629f878efa323456.png"},{emoji:"[歪嘴笑]",url:"http://i0.hdslb.com/bfs/live/bea1f0497888f3e9056d3ce14ba452885a485c02.png",map:"bea1f0497888f3e9056d3ce14ba452885a485c02.png"},{emoji:"[亲亲]",url:"http://i0.hdslb.com/bfs/live/10662d9c0d6ddb3203ecf50e77788b959d4d1928.png",map:"10662d9c0d6ddb3203ecf50e77788b959d4d1928.png"},{emoji:"[问号]",url:"http://i0.hdslb.com/bfs/live/a0c456b6d9e3187399327828a9783901323bfdb5.png",map:"a0c456b6d9e3187399327828a9783901323bfdb5.png"},{emoji:"[波吉]",url:"http://i0.hdslb.com/bfs/live/57dee478868ed9f1ce3cf25a36bc50bde489c404.png",map:"57dee478868ed9f1ce3cf25a36bc50bde489c404.png"},{emoji:"[OH]",url:"http://i0.hdslb.com/bfs/live/0d5123cddf389302df6f605087189fd10919dc3c.png",map:"0d5123cddf389302df6f605087189fd10919dc3c.png"},{emoji:"[再见]",url:"http://i0.hdslb.com/bfs/live/f408e2af700adcc2baeca15510ef620bed8d4c43.png",map:"f408e2af700adcc2baeca15510ef620bed8d4c43.png"},{emoji:"[白眼]",url:"http://i0.hdslb.com/bfs/live/7fa907ae85fa6327a0466e123aee1ac32d7c85f7.png",map:"7fa907ae85fa6327a0466e123aee1ac32d7c85f7.png"},{emoji:"[鼓掌]",url:"http://i0.hdslb.com/bfs/live/d581d0bc30c8f9712b46ec02303579840c72c42d.png",map:"d581d0bc30c8f9712b46ec02303579840c72c42d.png"},{emoji:"[大哭]",url:"http://i0.hdslb.com/bfs/live/816402551e6ce30d08b37a917f76dea8851fe529.png",map:"816402551e6ce30d08b37a917f76dea8851fe529.png"},{emoji:"[呆]",url:"http://i0.hdslb.com/bfs/live/179c7e2d232cd74f30b672e12fc728f8f62be9ec.png",map:"179c7e2d232cd74f30b672e12fc728f8f62be9ec.png"},{emoji:"[流汗]",url:"http://i0.hdslb.com/bfs/live/b00e2e02904096377061ec5f93bf0dd3321f1964.png",map:"b00e2e02904096377061ec5f93bf0dd3321f1964.png"},{emoji:"[生气]",url:"http://i0.hdslb.com/bfs/live/2c69dad2e5c0f72f01b92746bc9d148aee1993b2.png",map:"2c69dad2e5c0f72f01b92746bc9d148aee1993b2.png"},{emoji:"[加油]",url:"http://i0.hdslb.com/bfs/live/fbc3c8bc4152a65bbf4a9fd5a5d27710fbff2119.png",map:"fbc3c8bc4152a65bbf4a9fd5a5d27710fbff2119.png"},{emoji:"[害羞]",url:"http://i0.hdslb.com/bfs/live/d8ce9b05c0e40cec61a15ba1979c8517edd270bf.png",map:"d8ce9b05c0e40cec61a15ba1979c8517edd270bf.png"},{emoji:"[虎年]",url:"http://i0.hdslb.com/bfs/live/a51af0d7d9e60ce24f139c468a3853f9ba9bb184.png",map:"a51af0d7d9e60ce24f139c468a3853f9ba9bb184.png"},{emoji:"[doge2]",url:"http://i0.hdslb.com/bfs/live/f547cc853cf43e70f1e39095d9b3b5ac1bf70a8d.png",map:"f547cc853cf43e70f1e39095d9b3b5ac1bf70a8d.png"},{emoji:"[金钱豹]",url:"http://i0.hdslb.com/bfs/live/b6e8131897a9a718ee280f2510bfa92f1d84429b.png",map:"b6e8131897a9a718ee280f2510bfa92f1d84429b.png"},{emoji:"[瓜子]",url:"http://i0.hdslb.com/bfs/live/fd35718ac5a278fd05fe5287ebd41de40a59259d.png",map:"fd35718ac5a278fd05fe5287ebd41de40a59259d.png"},{emoji:"[墨镜]",url:"http://i0.hdslb.com/bfs/live/5e01c237642c8b662a69e21b8e0fbe6e7dbc2aa1.png",map:"5e01c237642c8b662a69e21b8e0fbe6e7dbc2aa1.png"},{emoji:"[难过]",url:"http://i0.hdslb.com/bfs/live/5776481e380648c0fb3d4ad6173475f69f1ce149.png",map:"5776481e380648c0fb3d4ad6173475f69f1ce149.png"},{emoji:"[抱抱]",url:"http://i0.hdslb.com/bfs/live/abddb0b621b389fc8c2322b1cfcf122d8936ba91.png",map:"abddb0b621b389fc8c2322b1cfcf122d8936ba91.png"},{emoji:"[跪了]",url:"http://i0.hdslb.com/bfs/live/4f2155b108047d60c1fa9dccdc4d7abba18379a0.png",map:"4f2155b108047d60c1fa9dccdc4d7abba18379a0.png"},{emoji:"[摊手]",url:"http://i0.hdslb.com/bfs/live/1e0a2baf088a34d56e2cc226b2de36a5f8d6c926.png",map:"1e0a2baf088a34d56e2cc226b2de36a5f8d6c926.png"},{emoji:"[热]",url:"http://i0.hdslb.com/bfs/live/6df760280b17a6cbac8c1874d357298f982ba4cf.png",map:"6df760280b17a6cbac8c1874d357298f982ba4cf.png"},{emoji:"[三星堆]",url:"http://i0.hdslb.com/bfs/live/0a1ab3f0f2f2e29de35c702ac1ecfec7f90e325d.png",map:"0a1ab3f0f2f2e29de35c702ac1ecfec7f90e325d.png"},{emoji:"[鼠]",url:"http://i0.hdslb.com/bfs/live/98f842994035505c728e32e32045d649e371ecd6.png",map:"98f842994035505c728e32e32045d649e371ecd6.png"},{emoji:"[汤圆]",url:"http://i0.hdslb.com/bfs/live/23ae12d3a71b9d7a22c8773343969fcbb94b20d0.png",map:"23ae12d3a71b9d7a22c8773343969fcbb94b20d0.png"},{emoji:"[泼水]",url:"http://i0.hdslb.com/bfs/live/29533893115c4609a4af336f49060ea13173ca78.png",map:"29533893115c4609a4af336f49060ea13173ca78.png"},{emoji:"[鬼魂]",url:"http://i0.hdslb.com/bfs/live/5d86d55ba9a2f99856b523d8311cf75cfdcccdbc.png",map:"5d86d55ba9a2f99856b523d8311cf75cfdcccdbc.png"},{emoji:"[不行]",url:"http://i0.hdslb.com/bfs/live/607f74ccf5eec7d2b17d91b9bb36be61a5dd196b.png",map:"607f74ccf5eec7d2b17d91b9bb36be61a5dd196b.png"},{emoji:"[响指]",url:"http://i0.hdslb.com/bfs/live/3b2fedf09b0ac79679b5a47f5eb3e8a38e702387.png",map:"3b2fedf09b0ac79679b5a47f5eb3e8a38e702387.png"},{emoji:"[牛]",url:"http://i0.hdslb.com/bfs/live/5e61223561203c50340b4c9b41ba7e4b05e48ae2.png",map:"5e61223561203c50340b4c9b41ba7e4b05e48ae2.png"},{emoji:"[保佑]",url:"http://i0.hdslb.com/bfs/live/241b13adb4933e38b7ea6f5204e0648725e76fbf.png",map:"241b13adb4933e38b7ea6f5204e0648725e76fbf.png"},{emoji:"[抱拳]",url:"http://i0.hdslb.com/bfs/live/3f170894dd08827ee293afcb5a3d2b60aecdb5b1.png",map:"3f170894dd08827ee293afcb5a3d2b60aecdb5b1.png"},{emoji:"[给力]",url:"http://i0.hdslb.com/bfs/live/d1ba5f4c54332a21ed2ca0dcecaedd2add587839.png",map:"d1ba5f4c54332a21ed2ca0dcecaedd2add587839.png"},{emoji:"[耶]",url:"http://i0.hdslb.com/bfs/live/eb2d84ba623e2335a48f73fb5bef87bcf53c1239.png",map:"eb2d84ba623e2335a48f73fb5bef87bcf53c1239.png"}];E.locale("zh-cn");const ha=e=>e===0?"/":E.unix(e).format("yyyy-MM-D HH:mm:ss"),ga=e=>{if(isNaN(Number(e)))return E(e).format("HH:mm:ss");{const a=Number(e);return E.unix(a).format("HH:mm:ss")}},D=e=>{const a=window.location.hash.split("?",2)[1];if(a){const c=new RegExp("(^|&)"+e+"=([^&]*)(&|$)"),s=a.match(c);return s!=null?decodeURIComponent(s[2]):null}},va=()=>E(),Oe=e=>{const a=V();he.confirm("是否重置图片缓存？","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(()=>{const c={type:a.getType,type_id:a.getTypeId};return He(c)}).then(c=>{c.code===0?(k({title:"提示",message:"操作成功",type:"success"}),e&&location.reload()):k({title:"提示",message:"操作失败",type:"error"})}).catch(c=>{c&&console.error(c)})},_a=e=>{for(let a of $e)e.includes(a.emoji)&&(e=e.replaceAll(a.emoji,`<img src="${a.url}" referrerpolicy="no-referrer" width="2%" />`));return e},R=e=>(te("data-v-bdc87af7"),e=e(),de(),e),De=R(()=>p("div",{class:"moon"},null,-1)),ze=R(()=>p("div",{class:"moon"},null,-1)),Pe=R(()=>p("div",{class:"moon"},null,-1)),Ue=[De,ze,Pe],Ae=ce('<div class="daytime-background" data-v-bdc87af7></div><div class="daytime-background" data-v-bdc87af7></div><div class="daytime-background" data-v-bdc87af7></div><div class="cloud" data-v-bdc87af7><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div></div><div class="cloud-light" data-v-bdc87af7><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div><div class="cloud-son" data-v-bdc87af7></div></div><div class="stars" data-v-bdc87af7><div class="star big" data-v-bdc87af7></div><div class="star big" data-v-bdc87af7></div><div class="star medium" data-v-bdc87af7></div><div class="star medium" data-v-bdc87af7></div><div class="star medium" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div><div class="star small" data-v-bdc87af7></div></div>',6),Be=C({__name:"dayNightSwitch",props:{size:{type:Number,default:180},modelValue:{type:Boolean,default:!1}},emits:["update:modelValue"],setup(e,{emit:a}){const c=e;let s=O(()=>c.size),t=O(()=>c.size*70/180);const d=()=>{a("update:modelValue",!c.modelValue)};return(o,u)=>(j(),L("div",{class:P({components:!0,night:e.modelValue}),style:w({"--width":`${v(s)}px`,"--height":`${v(t)}px`})},[p("div",{class:"main-button",onClick:d},Ue),Ae],6))}});const Ge=(e,a)=>{const c=e.__vccOpts||e;for(const[s,t]of a)c[s]=t;return c},Me=Ge(Be,[["__scopeId","data-v-bdc87af7"]]),We=p("br",null,null,-1),Fe=C({__name:"helpDialog",setup(e,{expose:a}){const c=x(!1);return a({open(){c.value=!0}}),(s,t)=>{const d=ge,o=ve,u=_e;return j(),S(u,{modelValue:c.value,"onUpdate:modelValue":t[1]||(t[1]=h=>c.value=h),title:"帮助",width:"30%",center:""},{footer:i(()=>[n(o,{onClick:t[0]||(t[0]=h=>c.value=!1)},{default:i(()=>[m("确定")]),_:1})]),default:i(()=>[p("span",null,[m(" 感谢使用nonebot-plugin-blive-danmaku直播间路灯插件"),We,m(" 有任何问题或建议请"),n(d,{type:"primary",target:"_blank",href:"https://github.com/zangxx66/nonebot_plugin_blive_danmaku/issues"},{default:i(()=>[m(" 点击此处 ")]),_:1}),m("反馈。 ")])]),_:1},8,["modelValue"])}}}),Ke=p("div",{class:"flex-grow"},null,-1),Qe={class:"day-night-btn-div"},qe=C({__name:"header",props:{style:Object},setup(e){const a=e,c=U({selector:"body"}),s=A(),t=V(),d=()=>{const h=t.getTypeId,l=t.getType;s.push({name:"change",query:{type:l,type_id:h}})},o=x(),u=()=>{o.value.open()};return(h,l)=>{const r=we,f=G,b=xe,g=M;return j(),L(B,null,[n(g,{"background-color":"#545c64","text-color":"#fff",ellipsis:!1,router:!1,style:w(a.style),mode:"horizontal"},{default:i(()=>[n(f,{index:"0"},{default:i(()=>[n(r,null,{default:i(()=>[n(v(ye))]),_:1}),m(" blive_danmaku ")]),_:1}),Ke,p("div",Qe,[n(Me,{size:50,modelValue:v(c),"onUpdate:modelValue":l[0]||(l[0]=y=>se(c)?c.value=y:null)},null,8,["modelValue"])]),n(b,{index:"1"},{title:i(()=>[n(r,null,{default:i(()=>[n(v(je))]),_:1})]),default:i(()=>[n(f,{index:"1-1",onClick:l[1]||(l[1]=y=>v(Oe)(!0))},{default:i(()=>[m(" 修复图片缓存 ")]),_:1}),n(f,{index:"1-2",onClick:d},{default:i(()=>[m(" 更新日志 ")]),_:1}),n(f,{index:"1-3",onClick:u},{default:i(()=>[m(" 帮助 ")]),_:1})]),_:1})]),_:1},8,["style"]),n(Fe,{ref_key:"hd",ref:o},null,512)],64)}}}),Je=p("span",null,"Home",-1),Xe=C({__name:"App",setup(e){const a=U(),c=x([]),s=x(1020),t=x(1920),d=A(),o=V(),u=()=>{const f=o.getTypeId,b=o.getType;d.replace({path:"/",query:{type:b,type_id:f}})},h=(f,b)=>{const g=o.getTypeId,y=o.getType;d.push({name:"history",query:{type:y,type_id:g,uid:f}})},l=()=>{const f=window.innerWidth,b=window.innerHeight;s.value=b-60,t.value=f;const g=document.querySelector(".danmaku-main");g.style.width=t.value-200+"px"},r=()=>{const f={type_id:o.getTypeId,type:o.getType};Re(f).then(b=>{b.code===0?Object.assign(c.value,b.data.data):k({title:"Error",message:b.msg||"请求异常",type:"error"})}).catch(b=>{console.error(b),k({title:"Error",message:b||"系统异常",type:"error"})})};return oe(()=>{l(),window.addEventListener("resize",l);const f=D("type"),b=D("type_id");o.setState(b,f),r()}),ne(()=>{window.removeEventListener("resize",l)}),(f,b)=>{const g=G,y=M,W=Ce,F=Ne,K=Ie,Q=ie("RouterView"),q=Te,J=Se,X=Ee;return j(),S(X,{class:P({"danmaku-menu":!0,dark:v(a)})},{default:i(()=>[n(K,{offset:.1},{default:i(()=>[n(qe,{style:w({width:t.value+"px"})},null,8,["style"]),n(F,{width:"200px",class:"danmaku-aside",style:w({height:s.value+"px"})},{default:i(()=>[n(W,{"max-height":s.value},{default:i(()=>[n(y,null,{default:i(()=>[n(g,{index:"0",onClick:u},{default:i(()=>[Je]),_:1}),(j(!0),L(B,null,fe(c.value,(T,Y)=>(j(),S(g,{index:Y+1,onClick:oa=>h(T.uid,T.name)},{default:i(()=>[p("span",null,le(T.name),1)]),_:2},1032,["index","onClick"]))),256))]),_:1})]),_:1},8,["max-height"])]),_:1},8,["style"]),p("div",{class:"h-6",id:"danmaku-menu-line",style:w({width:t.value+"px"})},null,4)]),_:1}),n(J,{class:"danmaku-main"},{default:i(()=>[n(q,{locale:v(ke)},{default:i(()=>[n(Q)]),_:1},8,["locale"])]),_:1})]),_:1},8,["class"])}}}),Ye="modulepreload",Ze=function(e){return"/danmaku/"+e},z={},N=function(a,c,s){if(!c||c.length===0)return a();const t=document.getElementsByTagName("link");return Promise.all(c.map(d=>{if(d=Ze(d),d in z)return;z[d]=!0;const o=d.endsWith(".css"),u=o?'[rel="stylesheet"]':"";if(!!s)for(let r=t.length-1;r>=0;r--){const f=t[r];if(f.href===d&&(!o||f.rel==="stylesheet"))return}else if(document.querySelector(`link[href="${d}"]${u}`))return;const l=document.createElement("link");if(l.rel=o?"stylesheet":Ye,o||(l.as="script",l.crossOrigin=""),l.href=d,document.head.appendChild(l),o)return new Promise((r,f)=>{l.addEventListener("load",r),l.addEventListener("error",()=>f(new Error(`Unable to preload CSS for ${d}`)))})})).then(()=>a())},ea=()=>N(()=>import("./index-df6cd1a5.js"),["assets/index-df6cd1a5.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css","assets/index-cd2e8127.css"]),aa=()=>N(()=>import("./index-58f6823d.js"),["assets/index-58f6823d.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css","assets/index-01fd1861.css"]),ca=()=>N(()=>import("./index-f73ace80.js"),["assets/index-f73ace80.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css"]),ta=()=>N(()=>import("./index-1502cf4b.js"),["assets/index-1502cf4b.js","assets/elementPlus-6d4b871f.js","assets/vendor-9f742c23.js","assets/vendor-b57f6aba.css","assets/lodash-742d3967.js","assets/elementPlus-64a38c77.css"]),da=be({history:pe(),routes:[{name:"home",path:"/",component:ea},{name:"history",path:"/history",component:ca},{name:"room",path:"/room",component:aa},{name:"change",path:"/change",component:ta}]});const sa=re(),I=me(Xe);I.use(da);I.use(sa);I.use(ue);I.mount("#app");export{Oe as C,ga as F,va as G,_a as R,Ge as _,pa as a,Le as b,ha as c,N as d,ba as e,ma as f,D as g,ra as h,ua as i,V as u};