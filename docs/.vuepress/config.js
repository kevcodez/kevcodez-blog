module.exports = {
  title: 'kevcodez - Developer Blog',
  description: 'Developer Blog - Java, Kotlin, Spring, Postgres, DevOps, Dev stuff',
  themeConfig: {
    nav: [{
        text: 'Twitter',
        link: 'https://twitter.com/kevcodez',
        target: '_blank'
      },
      {
        text: 'Github',
        link: 'https://github.com/kevcodez',
        target: '_blank'
      }
    ],
    repo: 'kevcodez/kevcodez-blog',
    repoLabel: 'Contribute!',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page!',
    sidebar: [{
      title: 'Latest posts'
    }]
  },
  plugins: [
    [
      'feed', {
        canonical_base: 'https://kevcodez.de',
        posts_directories: ['/posts/', '/books/']
      }
    ],
    ['@vuepress/medium-zoom', {
      selector: 'img',
    }],
    ['@vuepress/pwa',
      {
        serviceWorker: true,
        updatePopup: true
      }
    ],
    [
      'sitemap',
      {
        hostname: 'https://kevcodez.de'
      }
    ],
    [
      '@vuepress/google-analytics',
      {
        'ga': 'UA-64629196-1'
      }
    ]
  ]
}