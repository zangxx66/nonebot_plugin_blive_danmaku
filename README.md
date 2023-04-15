<div align="center">
  <a href="https://v2.nonebot.dev/store"><img src="doc/nbp_logo.png" width="180" height="180" alt="NoneBotPluginLogo"></a>
  <br>
  <p><img src="doc/NoneBotPlugin.svg" width="240" alt="NoneBotPluginText"></p>
</div>

<div align="center">  

# nonebot_plugin_blive_danmaku  

_💫 B站直播间路灯插件 💫_ 

[![pypi](https://img.shields.io/pypi/v/nonebot-plugin-blive-danmaku.svg)](https://pypi.org/project/nonebot-plugin-blive-danmaku/)  ![python](https://img.shields.io/pypi/pyversions/nonebot-plugin-blive-danmaku)  [![license](https://img.shields.io/github/license/zangxx66/nonebot_plugin_blive_danmaku.svg)](https://raw.githubusercontent.com/zangxx66/nonebot_plugin_blive_danmaku/main/LICENSE)  

</div>  

## 简介  
- 基于[nonebot2](https://v2.nonebot.dev/)开发的B站直播间弹幕监听插件，参考了Haruka和blivechat的部分代码。  
- 起源于[哈鹿hallu](https://space.bilibili.com/3493118494116797)的一条动态，苦于做视频时没有人做路灯，翻录播的时候头都大了，说要花钱请个全职路灯，我寻思与其把钱送给别人，不如交给Bot去做路灯。  
![](/doc/screenshot1.png)
- 路灯：指把直播过程中有趣的点记录下来，给剪辑根据记录的时间点和内容做出对应的视频。

## 功能

- 用弹幕的形式记录直播高能点
- 弹幕指令为`#路灯`加上记录的内容
- 仅在开播时弹幕指令才会生效

## 依赖  

- Python >= 3.10
- OneBot V11

## 安装
- 方式一：使用`nb-cli`安装插件  
```
nb plugin install nonebot-plugin-blive-danmaku
```
- 方式二：使用`pip`安装
```
python -m pip install nonebot-plugin-blive-danmaku
```  
## 配置  

|名称|类型|默认值|描述|
|-----|-----|-----|-----|
|danmaku_group_notice|bool|False|全局群开播提醒|  
|danmaku_host|str||外部访问地址，若配置了公网访问地址请填写此项，以便bot能够发送正确的面板地址，例如：`“http://www.your_domain.com”`，`“http://192.168.0.2"`|

## 指令

|指令|说明|
|------|------|
|/添加订阅 UID|UID为B站用户的uid，不是直播间id，以下同理|
|/取消订阅 UID|删除订阅|
|/开启路灯 UID|开启直播间弹幕监听|
|/关闭路灯 UID|关闭直播间弹幕监听|
|/订阅列表|| 
|/查看面板|打开网页版查询|

## 效果预览 

![](/doc/screenshot.png)

## 更新日志 

- v0.2.0
    - 修复历史bug  
    - 添加网页面板，外部访问请自行配置反向代理服务器
- v0.1.4
    - 添加开播提醒，`.env`新增全局配置项`danmaku_group_notice`开关 [#3](https://github.com/zangxx66/nonebot_plugin_blive_danmaku/issues/3)  
    - 调整日志级别 [#5](https://github.com/zangxx66/nonebot_plugin_blive_danmaku/issues/5)
- v0.1.3
    - bot提醒在时间后面加上直播时长显示，避免直播画面没有当前时间的场景
- v0.1.2
    - fix局部变量无法正常更新的bug
- v0.1.0
    - 基于nonebot2，实现同步路灯弹幕到qq群  

## 感谢
- [HarukaBot](https://github.com/SK-415/HarukaBot)
- [blivechat](https://github.com/xfgryujk/blivechat)
- [nonebot2](https://v2.nonebot.dev/)

