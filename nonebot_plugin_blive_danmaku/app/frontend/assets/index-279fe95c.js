import{x as t,g as e,D as o,J as a,p as l,K as n}from"./elementPlus-ce38aef7.js";import{F as s,f as m,U as i,Z as r,o as p,V as u,am as d,g as v,a1 as f}from"./vendor-0eb16a42.js";import"./lodash-520df23f.js";const c={class:"danmaku-room-list"},h=v("div",null," 更新日志 ",-1),y={class:"card-header danmaku-log-item"},w=["innerHTML"],b=s({__name:"index",setup(s){document.title="更新日志";const b=[{version:"v0.2.9",content:"面板查询开播历史列表，标题旁展示该场直播的路灯数量<br/>Bot被踢出群后清除该群的订阅<br/>fix路灯列表搜索bug",hollow:!0,type:"primary",timestamp:"2023/6/11 04:38:00"},{version:"v0.2.8",content:"封面地址不再绑定url，面板地址变更导致封面图片异常的可手动清理<br/>面板添加侧边菜单应对多个订阅的展示",hollow:!1,type:"default",timestamp:"2023/6/4 22:32:00"},{version:"v0.2.7",content:"面板支持表情显示",hollow:!1,type:"default",timestamp:"2023/5/27 08:50:00"},{version:"v0.2.6",content:"节日快乐<br/>面板稍微添加了一点小小的工作",hollow:!1,type:"default",timestamp:"2023/4/29 15:12:00"},{version:"v0.2.5",content:"前端添加条件搜索",hollow:!1,type:"default",timestamp:"2023/4/24 04:54:00"},{version:"v0.2.4",content:"移除直播间ws监听多余的输出<br/>更新前端",hollow:!1,type:"default",timestamp:"2023/4/16 21:23:00"},{version:"v0.2.0",content:"修复历史bug<br/>添加网页面板，外部访问请自行配置反向代理服务器",hollow:!1,type:"default",timestamp:"2023/4/15 16:49:00"},{version:"v0.1.4",content:"添加开播提醒，.env新增全局配置项danmaku_group_notice开关<br/>调整日志级别",hollow:!1,type:"default",timestamp:"2023/4/11 01:50:00"},{version:"v0.1.3",content:"bot提醒在时间后面加上直播时长显示，避免直播画面没有当前时间的场景",hollow:!1,type:"default",timestamp:"2023/4/9 03:14:00"},{version:"v0.1.2",content:"fix局部变量无法正常更新的bug",hollow:!1,type:"default",timestamp:"2023/4/8 03:53:00"},{version:"v0.1.0",content:"基于nonebot2，实现同步路灯弹幕到qq群",hollow:!1,type:"default",timestamp:"2023/4/7 23:10:00"}];return(s,_)=>{const g=o,x=t,k=l,j=n,q=a,H=e;return p(),m("div",c,[i(x,{gutter:20},{default:r((()=>[i(g,{span:6},{default:r((()=>[h])),_:1})])),_:1}),i(H,{noresize:"","max-height":"50rem"},{default:r((()=>[i(x,null,{default:r((()=>[i(g,{span:24,offset:0},{default:r((()=>[i(q,null,{default:r((()=>[(p(),m(u,null,d(b,((t,e)=>i(j,{center:"",placement:"top",key:e,hollow:t.hollow,type:t.type,timestamp:t.timestamp},{default:r((()=>[i(k,null,{header:r((()=>[v("div",y,f(t.version),1)])),default:r((()=>[v("div",{class:"danmaku-log-item",innerHTML:t.content},null,8,w)])),_:2},1024)])),_:2},1032,["hollow","type","timestamp"]))),64))])),_:1})])),_:1})])),_:1})])),_:1})])}}});export{b as default};