# -*- coding: utf-8 -*-
import logging
from typing import *

from . import client as client_
from . import models

__all__ = (
    'HandlerInterface',
    'BaseHandler',
)

logger = logging.getLogger('blivedm')

# 常见可忽略的cmd
IGNORED_CMDS = (
    'AREA_RANK_CHANGED',
    'ANCHOR_LOT_CHECKSTATUS',  # 天选时刻检查状态
    'ANCHOR_LOT_START',  # 天选时刻抽奖开始
    'ANCHOR_LOT_END',  # 天选时刻抽奖结束
    'ANCHOR_LOT_AWARD',  # 天选时刻中奖名单
    'ANCHOR_HELPER_DANMU',
    'COMBO_SEND',  # 礼物连击
    'COMMON_NOTICE_DANMAKU',  # 通用通知，含红包礼物涨粉、直播活动信息等
    'DANMU_AGGREGATION',  # 抽奖弹幕，包含天选抽奖弹幕、红包抽奖弹幕等
    'ENTRY_EFFECT',  # 入场特效
    'FULL_SCREEN_SPECIAL_EFFECT',
    'GIFT_PANEL_PLAN',
    'GIFT_STAR_PROCESS',
    'GUARD_ACHIEVEMENT_ROOM',
    'GUARD_HONOR_THOUSAND',
    'HOT_RANK_CHANGED',
    'HOT_RANK_CHANGED_V2',
    'LIVE',  # 直播开始
    'LIVE_INTERACTIVE_GAME',
    'LIVE_OPEN_PLATFORM_GAME',
    'LIVE_PANEL_CHANGE_CONTENT',
    'LIKE_INFO_V3_CLICK',  # 用户点赞
    'LIKE_INFO_V3_UPDATE',  # 点赞总数量更新
    'LIKE_INFO_V3_NOTICE',  # 双击点赞提示
    'MESSAGEBOX_USER_GAIN_MEDAL',  # 加入粉丝团？
    'NOTICE_MSG',  # 通知横幅
    'ONLINE_RANK_COUNT',  # 高能用户总数量
    'ONLINE_RANK_TOP3',  # 高能榜前三变化
    'ONLINE_RANK_V2',  # 高能榜前七名单
    'PK_BATTLE_START',
    'PK_BATTLE_START_NEW',
    'PK_BATTLE_PRE_NEW',
    'PK_BATTLE_PRE',
    'PK_BATTLE_END',
    'PK_BATTLE_FINAL_PROCESS',
    'PK_BATTLE_PROCESS',
    'PK_BATTLE_PROCESS_NEW',
    'PK_BATTLE_RANK_CHANGE',
    'PK_BATTLE_SETTLE',
    'PK_BATTLE_SETTLE_USER',
    'PK_BATTLE_SETTLE_V2',
    'POPULAR_RANK_CHANGED',
    'POPULARITY_RED_POCKET_NEW',  # 红包礼物
    'POPULARITY_RED_POCKET_START',  # 红包开抢
    'POPULARITY_RED_POCKET_WINNER_LIST',  # 红包中奖
    'ROOM_REAL_TIME_MESSAGE_UPDATE',  # 粉丝数等更新
    'ROOM_BLOCK_MSG',
    'ROOM_CHANGE',
    'ROOM_SKIN_MSG',
    'SPREAD_SHOW_FEET',  # 流量包推广
    'SPRED_SHOW_FEET_V2',  # 流量包推广
    'STOP_LIVE_ROOM_LIST',  # 停播房间列表
    'SUPER_CHAT_MESSAGE_JPN',  # 醒目留言(日)
    'SUPER_CHAT_ENTRANCE',
    'TRADING_SCORE',
    'USER_TOAST_MSG',
    'WIDGET_BANNER',  # 小部件横幅
    'WIDGET_GIFT_STAR_PROCESS',
)

# 已打日志的未知cmd
logged_unknown_cmds = set()


class HandlerInterface:
    """
    直播消息处理器接口
    """

    async def handle(self, client: client_.BLiveClient, command: dict):
        raise NotImplementedError


class BaseHandler(HandlerInterface):
    """
    一个简单的消息处理器实现，带消息分发和消息类型转换。继承并重写_on_xxx方法即可实现自己的处理器
    """

    def __heartbeat_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_heartbeat(client, models.HeartbeatMessage.from_command(command['data']))

    def __danmu_msg_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_danmaku(client, models.DanmakuMessage.from_command(command['info']))

    def __send_gift_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_gift(client, models.GiftMessage.from_command(command['data']))

    def __guard_buy_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_buy_guard(client, models.GuardBuyMessage.from_command(command['data']))

    def __super_chat_message_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_super_chat(client, models.SuperChatMessage.from_command(command['data']))

    def __super_chat_message_delete_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_super_chat_delete(client, models.SuperChatDeleteMessage.from_command(command['data']))

    def __interact_word_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_interact_word(client, models.InteractMessage.from_command(command['data']))

    def __preparing_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_preparing(client, models.PreparingMessage.from_command(command))

    def __watched_callback(self, client: client_.BLiveClient, command: dict):
        return self._on_watched(client, models.WatchedMessage.from_command(command["data"]))

    # cmd -> 处理回调
    _CMD_CALLBACK_DICT: Dict[
        str,
        Optional[Callable[
            ['BaseHandler', client_.BLiveClient, dict],
            Awaitable
        ]]
    ] = {
        # 收到心跳包，这是blivedm自造的消息，原本的心跳包格式不一样
        '_HEARTBEAT': __heartbeat_callback,
        # 收到弹幕
        # go-common\app\service\live\live-dm\service\v1\send.go
        'DANMU_MSG': __danmu_msg_callback,
        # 有人送礼
        'SEND_GIFT': __send_gift_callback,
        # 有人上舰
        'GUARD_BUY': __guard_buy_callback,
        # 醒目留言
        'SUPER_CHAT_MESSAGE': __super_chat_message_callback,
        # 删除醒目留言
        'SUPER_CHAT_MESSAGE_DELETE': __super_chat_message_delete_callback,
        # 有人进入直播间
        'INTERACT_WORD': __interact_word_callback,
        # 直播结束
        'PREPARING': __preparing_callback,
        # 观看人数变化
        'WATCHED_CHANGE': __watched_callback,
    }
    # 忽略其他常见cmd
    for cmd in IGNORED_CMDS:
        _CMD_CALLBACK_DICT[cmd] = None
    del cmd

    async def handle(self, client: client_.BLiveClient, command: dict):
        cmd = command.get('cmd', '')
        pos = cmd.find(':')  # 2019-5-29 B站弹幕升级新增了参数
        if pos != -1:
            cmd = cmd[:pos]

        if cmd not in self._CMD_CALLBACK_DICT:
            # 只有第一次遇到未知cmd时打日志
            if cmd not in logged_unknown_cmds:
                logger.warning('room=%d unknown cmd=%s, command=%s', client.room_id, cmd, command)
                logged_unknown_cmds.add(cmd)
            return

        callback = self._CMD_CALLBACK_DICT[cmd]
        if callback is not None:
            await callback(self, client, command)

    async def _on_heartbeat(self, client: client_.BLiveClient, message: models.HeartbeatMessage):
        """
        收到心跳包（人气值）
        """

    async def _on_danmaku(self, client: client_.BLiveClient, message: models.DanmakuMessage):
        """
        收到弹幕
        """

    async def _on_gift(self, client: client_.BLiveClient, message: models.GiftMessage):
        """
        收到礼物
        """

    async def _on_buy_guard(self, client: client_.BLiveClient, message: models.GuardBuyMessage):
        """
        有人上舰
        """

    async def _on_super_chat(self, client: client_.BLiveClient, message: models.SuperChatMessage):
        """
        醒目留言
        """

    async def _on_super_chat_delete(self, client: client_.BLiveClient, message: models.SuperChatDeleteMessage):
        """
        删除醒目留言
        """

    async def _on_interact_word(self, client: client_.BLiveClient, message: models.InteractMessage):
        """
        有人进入房间
        """

    async def _on_preparing(self, client: client_.BLiveClient, message: models.PreparingMessage):
        """
        直播结束
        """

    async def _on_watched(self, client: client_.BLiveClient, message: models.WatchedMessage):
        """
        观看人数变化
        """
