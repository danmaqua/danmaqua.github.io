# Bot 配置说明

## 核心配置 `bot.config.js`

本配置文件仅对 Bot 核心进程生效，运行时变更的数据不会保存到这里。

模板参照：<https://github.com/danmaqua/danmaqua-telegrambot/blob/master/bot.config.js>

```javascript
// 这一段仅用于说明，实际使用请基于上面的模板进行修改。
module.exports = {
    dataDir: './data',
    dataSaveInterval: 10000,
    logsDir: './data/logs/bot',
    botToken: '12345678:AAAAAAAAAAAAA',
    botProxy: 'http://127.0.0.1:10801',
    botAdmins: [107484754],
    danmakuSources: []
};
```

- `dataDir`：数据库位置

运行时管理员设定的弹幕转发规则，会保存在这个目录的 `global.json` 和 `chats` 文件夹中。

同时 Bot 与用户交互的状态信息会保存在 `user_states.json`。

默认值：`./data`

- `dataSaveInterval`：数据库保存间隔

数据库定期保存到文件中，单位为毫秒。

默认值：`10000`

- `botToken`：Bot Token 密钥

Telegram Bot API 需要这个 Token 来进行认证登录，你可以在 `@BotFather` 获取。

请不要留空，否则无法连接。

- `botProxy`：Bot 代理服务器

Telegram Bot API 连接时所使用的代理服务器，支持 HTTP 代理。

留空则代表直接连接，如 `http://127.0.0.1:8080` 则代表通过 HTTP 代理 `127.0.0.1:8080` 连接。

默认值：`null`

- `botAdmins`：Bot 管理员列表

可以在 Telegram 中使用 Bot 命令管理弹幕转发等操作的管理员列表。

不支持 `@username` 形式，请使用第三方客户端或 ID 查询机器人进行获取自己的 ID。

请不要留空，否则无法管理控制。

- `danmakuSources`：弹幕源支持列表

弹幕源服务端实现了直播平台弹幕协议的连接，向 Bot 核心部分提供标准化的弹幕数据。

你需要按照格式进行接入弹幕源，请参照[弹幕源客户端配置格式](#弹幕源客户端配置格式)

### 弹幕源客户端配置格式

例子：

```javascript
{
    id: 'bilibili',
    description: '哔哩哔哩直播弹幕',
    type: 'common-danmaku-ws',
    value: {
        url: 'localhost:8001',
        basicAuth: 'testPassword'
    }
}
```

- `id`：唯一标识

在 Bot 中设置弹幕转发规则时，选择弹幕源将通过 id 来辨别。

如默认实现中哔哩哔哩弹幕源 id 为 `bilibili`，注册转发时命令为 `/register_chat 123 123 bilibili`。

- `description`：描述

描述这个弹幕源连接的是哪一个直播平台，用于用户在 Bot 查询弹幕源支持列表时显示，可留空。

- `type`：弹幕源类型

目前仅支持 `common-danmaku-ws` 类型，即目前实现的 [WebSocket 协议](./dmsrc_api.html)。

- `value`：弹幕源配置值

配置值格式取决于你所使用的弹幕源。

如 `common-danmaku-ws`，支持两种格式：

如果 WebSocket 服务端允许直接连接，可以直接填入 WebSocket 服务端地址：

```javascript
value: 'localhost:8001'
```

如果 WebSocket 服务端配置了 Basic Auth，则按以下格式填入：

```javascript
value: {
    url: 'localhost:8001',
    basicAuth: 'testPassword'
}
```

## 自带弹幕源配置 `dmsrc.config.js`

本配置文件仅对项目附带的哔哩哔哩弹幕源和斗鱼弹幕源服务端生效，Bot 核心部分不会读取这个文件获取弹幕源列表。对于你自行创建的弹幕源服务端，读取本配置不是必须的。

模板参照：<https://github.com/danmaqua/danmaqua-telegrambot/blob/master/dmsrc.config.js>
