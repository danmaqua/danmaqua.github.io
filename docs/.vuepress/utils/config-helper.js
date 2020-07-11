function navBar({ 
    introTitle, downloadTitle, githubTitle, changelogsTitle, features, bot
}) {
    return [
        { text: introTitle, link: '/intro.html' },
        {
            text: features.title,
            items: [
                { text: features.subscription, link: '/features/subscription.html' },
                { text: features.danmaku, link: '/features/danmaku.html' },
                { text: features.filter, link: '/features/filter.html' },
                { text: features.floating, link: '/features/floating.html' },
                { text: features.history, link: '/features/history.html' },
                { text: features.tips, link: '/features/tips.html' },
            ]
        },
        { text: downloadTitle, link: '/download.html' },
        { text: changelogsTitle, link: '/changelogs.html' },
        {
            text: bot.title,
            items: [
                { text: bot.userDoc, link: '/bot/userpage.html' },
                { text: bot.geekDoc, link: '/bot/dev.html' },
                { text: bot.runWithDocker, link: '/bot/run_with_docker.html' },
                { text: bot.config, link: '/bot/config.html' },
                { text: bot.dmSrc, link: '/bot/dmsrc_api.html' },
            ]
        },
        { text: githubTitle, link: 'https://github.com/fython/danmaqua-android' },
    ]
}

module.exports = {
    navBar
};
