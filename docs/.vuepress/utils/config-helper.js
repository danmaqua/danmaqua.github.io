function navBar({ 
    introTitle, downloadTitle, githubTitle, changelogsTitle, features, otherVers
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
                { text: features.tips, link: '/features/tips.html' }
            ]
        },
        { text: downloadTitle, link: '/download.html' },
        { text: changelogsTitle, link: '/changelogs.html' },
        {
            text: otherVers.title,
            items: [
                { text: otherVers.telegram, link: '/telegram/' }
            ]
        },
        { text: githubTitle, link: 'https://github.com/fython/danmaqua-android' },
    ]
}

module.exports = {
    navBar
};
