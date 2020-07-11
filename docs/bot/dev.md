# v2 开发文档

> 本文档介绍的是 [danmaqua-telegrambot](https://github.com/danmaqua/danmaqua-telegrambot) 的 v2 版本，如果你仍在使用 v1 版本且不想迁移，请移步到 [v1 开发文档](./dev_v1.html)。

你可以选择搭建自己的实例来提供其他 VTubers 的同传频道，或者为我们的 Bot 开发贡献你的力量。同时我们欢迎提交第三方的同传频道到 Telegram 频道 `@danmaqua` ，方便观众们寻找。

项目源码： <https://github.com/danmaqua/danmaqua-telegrambot>

## 运行自己的 Bot 实例

保证运行环境安装有 Node.js 12+ 和 NPM 包管理，并在 Telegram `@BotFather` 申请你自己的 Bot 账号。

**2020/7/11 更新：现在我们封装了一个 Docker 镜像大幅简化了搭建 Bot 实例的流程，想要了解如何使用 Docker 运行 Bot 实例可以[点击这里](./run_with_docker.html)**

### 0、了解 Bot v2 架构

Bot v2 版本将程序分为 **Bot 本体+弹幕源服务器** 两部分：

- **Bot 本体**：负责 Telegram API 通讯、转发配置管理和用户交互部分，从各个弹幕源服务器中获取不同平台的弹幕数据，根据配置将符合同传规则的弹幕转发到 Telegram 频道/对话中。
- **弹幕源服务器**：负责直播平台弹幕协议通讯，并通过 WebSocket 协议向其他客户端提供统一数据格式的弹幕信息。

弹幕协议从 Bot 本体解耦出来后，我们在添加其他直播平台弹幕协议时无需再去修改 Bot 本体的代码，同时也能够将与直播平台的弹幕连接共享给其他程序。

关于弹幕源服务器的 API 定义，可以阅读 [弹幕源 API](./dmsrc_api.html) 文档，如果你不打算自己实现弹幕源，请忽略这一段。

在架设 Bot 实例时，你可以选择 Bot 本体和弹幕源不在同一台机器上，也可以直接在同一台机器上运行。这取决于**你有多少服务会共用弹幕源**，以及你运行机器人本体的机器**能否与直播平台间保持良好的弹幕连接**。（在设计出弹幕源服务器后，我们把 Bot v1 中的弹幕连接代理设置给去掉了，如果你仍然需要这个功能的话，请告诉我。）

### 1、下载项目源码并安装依赖

首先，你需要获取 [danmaqua-telegrambot](https://github.com/danmaqua/danmaqua-telegrambot) 的项目源码。

可以通过 [GitHub Releases](https://github.com/danmaqua/danmaqua-telegrambot/releases) 下载打包好的发布版本，或者使用 Git 克隆最新的源码：

```sh
git clone https://github.com/danmaqua/danmaqua-telegrambot
```

获取源码后，进入项目根目录，执行 `npm install` 进行安装项目必须的依赖。

### 2、配置 Bot

在启动之前，你需要根据自己的实际环境进行配置。

#### 2.1、弹幕源配置

打开根目录中的 `dmsrc.config.js` 修改弹幕源服务器配置。

**如果你的机器环境端口 8001 和 8002 都是空闲的，可以直接跳过这一步节省时间。**

我们为你实现了哔哩哔哩和斗鱼直播平台的弹幕源，通常你只需要配置好弹幕源端口，让 Bot 能够正常连上即可。如：

```javascript
module.exports = {
    bilibili: {
        port: 8001,
        basicAuth: 'testPassword',
        bilibiliProtocol: 'ws',
        reconnectCron: '0 0 3 * * *'
    },
    douyu: {
        port: 8002,
        basicAuth: null,
        reconnectCron: '0 0 3 * * *'
    }
};
```

`port` 是弹幕源连接端口，Bot 本体需要通过这个端口连接。如果你在 `dmsrc.config.js` 文件中修改了，请记得在 `bot.config.js` 文件中的 `danmakuSources` 字段中对应端口参数也作出调整。

`basicAuth` 是 WebSocket 协议使用的简单认证手段（[HTTP 头 Authorization 字段](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization)），修改后的配置方式同上，需要在 `bot.config.js` 文件同步修改。

`reconnectCron` 是弹幕源定期对所有房间重新连接的时间参数，格式请参照 [crontab](https://wiki.archlinux.org/index.php/Cron#Crontab_format)。

其余参数在文件中有注释说明。要了解更多关于配置的说明，请移步到[这里](./config.html)。

#### 2.2、Bot 本体配置

打开根目录中的 `bot.config.js` 修改 Bot 本体配置。

（必填）在 `botToken` 字段中填入你在 `@BotFather` 创建的 Bot Token。如：

```javascript
botToken: '123456789:AAAAAAAAAAAAAAAAAAAAAA',
```

（必填）在 `botAdmins` 字段中填入可以通过 Telegram 对话管理 Bot 的用户 ID。如：

```javascript
botAdmins: [107484754],
```

（选填）如果你的机器无法直连 Telegram 服务器，可以通过 `botProxy` 设置 HTTP 代理。如：

```javascript
botProxy: 'http://127.0.0.1:8080',
```

（选填）如果你在 `dmsrc.config.js` 修改了默认的弹幕源端口，或者自行搭建了弹幕源服务，需要在 `danmakuSources` 字段中进行修改。

要了解更多关于配置的说明，请移步到[这里](./config.html)。

#### 2.3、从 Bot v1 中迁移数据（选做）

我们制作了数据库迁移工具，帮助你快速地从 v1 迁移到 v2，可以保留旧版本的弹幕转发配置。

Bot Token、Telegram 代理、Bot 管理员数据等保存在 v1 版本 `config.js` 的数据并不支持直接迁移过来，你仍需要手动完成 `2.2` 步骤。

> 迁移工具只支持默认的 `<项目目录>/data` 位置

在项目根目录下执行 `npm run transfer:from_v1` 命令即可以将 Bot v1 数据库转换为 Bot v2 数据库。

注意这个命令会直接覆盖现有的 v2 数据库，请注意备份！！

### 3、启动 Bot

现在 Bot v2 需要启动本体程序和弹幕源服务端多个进程才可正常运作，你可以在不同的 Shell 终端进程中分别执行：

- `npm run bot`：启动 Bot 核心进程
- `npm run dmsrc:bilibili`：启动哔哩哔哩弹幕源服务端
- `npm run dmsrc:douyu`：启动斗鱼弹幕源服务端

你可以使用 `nohup` 或 `screen` 等命令简单粗暴地让 Bot 的多个进程在后台运行，也可以[自行编写 systemd 单元文件](https://wiki.archlinux.org/index.php/systemd#Writing_unit_files)来构建 Bot 服务的启动管理。

如果你不想自己编写 systemd 单元文件，也希望更优雅地管理后台进程，不妨尝试一下我们也在使用的 [PM2](https://pm2.keymetrics.io/) 工具。

使用 PM2 之前你可以通过 NPM 包管理进行安装到全局环境中（可能需要 root 用户权限）：

```sh
npm install -g pm2
```

安装好后，可以直接执行以下命令，按照我们写好的配置启动 Bot 进程：

```sh
# 进入到项目根目录
cd ./danmaqua-telegrambot
# 根据 ecosystem.config.js 配置在后台启动多个进程
pm2 start ecosystem.config.js
```

如果你希望机器重启后 PM2 能够为你自动启动 Bot 进程，可以执行一下命令进行配置：

```sh
# 保存当前 PM2 管理的进程列表
pm2 save
# 设定 PM2 自动启动（默认不支持 Windows 环境，解决方法请自行 Google）
pm2 startup
```

如果你要查看 Bot 进程后台输出日志，可以执行这些命令：

```sh
# 查看 Bot 核心进程日志
pm2 logs danmaqua-bot
# 查看哔哩哔哩弹幕源日志
pm2 logs dmsrc-bilibili
# 查看斗鱼弹幕源日志
pm2 logs dmsrc-douyu
```

具体 PM2 使用方法请阅读文档或 Google 搜索关键词。

## 配置弹幕转发到对话或频道

运行起来自己的实例之后，打开与机器人的 Telegram 聊天，首次使用需要点击 Start 开始对话。

下面提到的对话 ID 可以通过某些 ID 查询机器人获取，或者安装 Plus Messenger 或其它可信任的第三方 Telegram 客户端，打开对话/频道资料页查看 ID。通常群组和频道 ID 需要带有 `-100` 前缀才能被 Bot 识别。某些命令支持使用对话 username 代替对话 ID，无需手动查询。

### 为对话/频道注册弹幕转发

命令格式：`/register_chat chatId roomId [source]`

作用：注册指定直播房间弹幕转发到指定对话

参数：
- chatId：对话/频道 ID
- roomId：直播平台房间 ID
- source：可选项，直播平台弹幕源，默认支持 `bilibili` 和 `douyu`

### 取消对话注册

命令格式：`/unregister_chat chatId`

作用：取消指定对话的注册信息，会清除指定对话的其他设置

参数：
- chatId：对话/频道 ID

### 打开管理页面

命令格式：`/manage_chats`

作用：列出你可以设置的频道，选择频道进行设置管理

### 设置对话默认过滤规则

命令格式：`/set_default_pattern pattern`

作用：所有对话默认的同传弹幕过滤规则，如果对话没有单独的规则设置，则跟随这个设置。所有弹幕会与这个正则表达式进行匹配，如果符合同传弹幕格式，则转发到指定对话中。

### 屏蔽用户的弹幕

你可以转发对话/频道中想要屏蔽的用户所发送的弹幕给 Bot，Bot 将询问是否要屏蔽指定用户。

或者使用 `/manage_chats` 进入指定对话的管理页面，批量添加要屏蔽的用户。

### 其他命令

还有其他不常用的命令没有在这里列出，你可以在使用时输入 `/help` 进行查询。

## 贡献代码

本项目源码以 GPL v3 许可发布，欢迎对本项目提出 Issues 或 Pull Request。
