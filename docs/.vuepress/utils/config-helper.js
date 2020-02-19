function navBar({ introTitle, downloadTitle, githubTitle, changelogsTitle }) {
    return [
        { text: introTitle, link: '/intro.html' },
        { text: downloadTitle, link: '/download.html' },
        { text: changelogsTitle, link: '/changelogs.html' },
        { text: githubTitle, link: 'https://github.com/fython/danmaqua-android' }
    ]
}

module.exports = {
    navBar
};
