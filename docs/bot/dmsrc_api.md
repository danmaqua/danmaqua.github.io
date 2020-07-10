# 弹幕源 API

danmaqua-telegrambot 2.x 已经开始将弹幕 API 的连接部分分离。

要为 Bot 提供直播弹幕数据，你需要建立一个 WebSocket 服务器，在你的服务器中实现对直播平台的弹幕连接，将直播平台返回的弹幕数据以统一的数据格式向客户端（Bot）提供。

要让 Bot 支持新的弹幕源，你需要修改项目目录的 `bot.config.js` 中的 `danmakuSources` 字段，提供新的弹幕源描述和连接地址。

目前我们已经实现了哔哩哔哩和斗鱼直播平台的弹幕源，并提供了默认配置，你可以开箱即用。

客户端参考实现：[bot/api.js](https://github.com/danmaqua/danmaqua-telegrambot/blob/master/bot/api.js)

服务端参考实现：[dmsrc/common/index.js](https://github.com/danmaqua/danmaqua-telegrambot/blob/master/dmsrc/common/index.js)

## WebSocket 消息类型

### `join_room`

客户端需要加入房间时可以发送 `join_room` 消息，加入房间后，就可以开始接收这个房间内的弹幕消息。

参数：`string`/`number` 类型 - 房间号

### `leave_room`

客户端需要离开房间时可以发送 `leave_room` 消息。

参数：`string`/`number` 类型 - 房间号

### `reconnect_room`

客户端需要手动请求重新连接房间时可以发送 `reconnect_room` 消息。

参数：`string`/`number` 类型 - 房间号

### `danmaku`

服务端获取到的弹幕会以 `danmaku` 消息通知客户端。

参数：[`Danmaku`](#标准弹幕数据格式) 类型 - 标准弹幕数据

## 标准弹幕数据格式

弹幕源 WebSocket 服务端返回的弹幕数据使用 JSON 序列化为文本。

数据格式样例：

```json
{
    "sender": {
        "uid": 4432261,
        "username": "Siubeng",
        "url": "https://space.bilibili.com/4432261"
    },
    "text": "233",
    "time": 1594349332324,
    "roomId": 14917277
}
```
