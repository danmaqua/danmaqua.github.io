# v1 开发文档

你可以选择搭建自己的实例来提供其他 VTubers 的同传频道，或者为我们的 Bot 开发贡献你的力量。同时我们欢迎提交第三方的同传频道到 Telegram 频道 `@danmaqua` ，方便观众们寻找。

项目源码： <https://github.com/danmaqua/danmaqua-telegrambot>

## 运行自己的机器人实例

保证运行环境安装有 Node.js 12+，并在 Telegram `@BotFather` 申请你自己的机器人帐号。

1. 使用 Git Clone 项目到本地
2. 复制一份 `config.sample.js` 并改名为 `config.js` ，按照文件内的注释进行设置。
3. 首次运行前需要在项目根目录执行 `npm i` 安装必要的依赖
4. 执行 `npm run bot` 即可启动机器人

## 配置弹幕转发到群组或频道

同传翻译弹幕的辨别以 `config.js` 内的正则表达式为准，请根据自己的需求进行设定。

运行起来自己的实例之后，打开与机器人的 Telegram 聊天，首次使用需要点击 Start 开始对话。

输入 `/subscribe [B 站房间号] [指定的群组/频道 ID]` ，B 站房间号即直播地址最后的一串 ID 而非用户 ID，指定的群组/频道 ID 为 Telegram 内部保存的一串纯数字 ID，你可能需要使用其它 ID 查询机器人来获取，如果你拥有 Android 手机，可以尝试安装 Plus Messenger 或其它可信任的第三方 Telegram 客户端，打开群组/频道资料页查看 ID。

如果要取消订阅，输入 `/unsubscribe [指定的群组/频道 ID]` 即可，每个群组/频道只能订阅一个 B 站房间。

使用 `/set_hide_username [指定的群组/频道 ID]` 可以开关隐藏弹幕发送用户名，但不推荐使用，将无法得知弹幕发送者，如果遇到无关翻译的弹幕将无法得知用户 ID 进行屏蔽，最重要的是同传大佬付出大量时间和精力为我们提供直播翻译，至少我们要能记住他们的名字。

使用 `/block_user [要屏蔽的用户 ID] [指定的群组/频道 ID]` 可以屏蔽/取消屏蔽来自于指定用户的弹幕，用户 ID 指 B 站空间中看到的 UID，要快速获取 ID，你可以在机器人转发出来的弹幕中，点击蓝色的用户链接，复制 URL 中的 ID 出来。

使用 `/list_blocked_users [指定的群组/频道 ID]` 可以显示该聊天中已屏蔽的用户。

为了方便操作，转发群组/频道中机器人的弹幕消息（不支持机器人与用户的私人消息）到与机器人的私人聊天，可以打开操作菜单，目前只提供了屏蔽用户选项。

## 贡献代码

本项目源码以 GPL v3 许可发布，欢迎对本项目提出 Issues 或 Pull Request。
