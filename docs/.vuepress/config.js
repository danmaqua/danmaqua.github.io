const { navBar } = require('./utils/config-helper');

module.exports = {
    locales: {
        '/': {
            lang: 'zh-CN',
            title: '悬浮字幕',
            description: '在 Android 上高亮显示直播翻译弹幕为悬浮字幕'
        }
    },
    themeConfig: {
        docsRepo: 'danmaqua/danmaqua.github.io',
        docsDir: 'docs',
        docsBranch: 'raw',
        editLinks: true,
        logo: '/images/danmaqua-logo.png',
        locales: {
            '/': {
                editLinkText: '帮助我们改善文档',
                nav: navBar({
                    introTitle: '介绍',
                    downloadTitle: '下载',
                    changelogsTitle: '更新日志',
                    githubTitle: 'GitHub 仓库',
                    features: {
                        title: '功能',
                        subscription: '订阅主播',
                        danmaku: '弹幕服务',
                        filter: '弹幕过滤',
                        floating: '悬浮窗',
                        history: '弹幕历史',
                        tips: '小技巧'
                    }
                })
            }
        }
    }
}
