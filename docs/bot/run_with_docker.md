# 使用 Docker 运行 Bot 实例

通过 Docker 和我们封装好的镜像来部署 Bot 实例有许多好处，你不必自行安装配置程序运行环境，如 Node.js、第三方 NPM 包等，尤其是想要迁移 Bot 实例到不同环境的另一台设备上运行时，这种方式会为你节省了许多时间精力。

## 如何在我的机器上通过 Docker 部署运行

在开始之前，请确保你已经安装好了 Docker。

### 1、拉取镜像

我们在 Docker Hub 上发布了封装好的镜像 [siubeng/danmaqua-telegrambot](https://hub.docker.com/r/siubeng/danmaqua-telegrambot)，你可以通过以下命令拉取镜像的最新版：

```sh
docker pull siubeng/danmaqua-telegrambot
```

### 2、准备数据目录

在运行容器之前，我们在宿主机环境创建一个文件夹，用于存放 Bot 数据（包含弹幕转发规则、管理员列表、运行日志等）。

```sh
# 在 /home/fython/data 创建一个文件夹 dmq-tgbot 准备存放 Bot 数据
mkdir -p /home/fython/data/dmq-tgbot
```

### 3、部署运行

接下来可以执行这一条命令（注：太长了所以分成多行）部署容器并运行，请注意修改命令里的参数：

```sh
docker run -d \
  --name dmq-tgbot \
  -v /home/fython/data/dmq-tgbot:/usr/src/dmq-bot/data \
  -e DMQ_BOT_TOKEN=[你的 Bot Token] \
  -e DMQ_BOT_PROXY=[Bot API HTTP 代理] \
  -e DMQ_BOT_ADMINS=[Bot 管理员列表] \
  siubeng/danmaqua-telegrambot
```

#### 参数说明介绍

1. `-d` 代表执行后让容器在后台运行。

2. `--name dmq-tgbot` 代表容器命名为 `dmq-tgbot`，选一个好记的名字以便后续操作。

3. `-v /home/fython/data/dmq-tgbot:/usr/src/dmq-bot/data` 代表将宿主机的 `/home/fython/data/dmq-tgbot` 挂载在容器中的 Bot 数据目录 `/usr/src/dmq-bot/data` 上。

4. `-e XXXX=YYYY` 代表传入环境变量 `XXXX`，值设定为 `YYYY`，这里有三个需要修改的变量：

    - `DMQ_BOT_TOKEN`：从 `@BotFather` 中获取的 Telegram Bot Token。
    - `DMQ_BOT_PROXY`：连接到 Telegram 服务器使用的 HTTP 代理，如果不需要请留空。例：`DMQ_BOT_PROXY=http://127.0.0.1:8080`。注：如果想使用宿主机上的代理，最简单的方式是添加 `--network host` 参数，但会带来一些副作用，具体请自学 Docker。
    - `DMQ_BOT_ADMINS`：允许控制 Bot 的管理员 Telegram ID 列表，并不是 username，你可以通过第三方客户端或者 ID 查询机器人获得自己的 ID，不可留空！多个 ID 间用逗号隔开。例：`DMQ_BOT_ADMINS=12345,56789`

5. `siubeng/danmaqua-telegrambot` 代表使用我们封装好的镜像。

#### 例子

假设我的 Token 是 `123456:AQUA`，不需要通过代理连接 Telegram API，管理员有两位 ID 分别是 `445` 和 `148`，则部署容器的命令参数应修改为：

```sh
docker run -d \
  --name dmq-tgbot \
  -v /home/fython/data/dmq-tgbot:/usr/src/dmq-bot/data \
  -e DMQ_BOT_TOKEN=123456:AQUA \
  -e DMQ_BOT_ADMINS=445,148 \
  siubeng/danmaqua-telegrambot
```

## 如何在 PaaS 平台上部署运行

请参照具体平台如何部署 Docker 容器的教程。
