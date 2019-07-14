module.exports = {
  title: 'kevcodez - Developer Blog',
  description: 'Developer Blog - Java, Kotlin, Spring, Postgres, DevOps, Dev stuff',
  themeConfig: {
    repo: 'kevcodez/kevcodez-blog',
    repoLabel: 'Contribute!',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page!',
    sidebar: [
      {
        title: 'Latest posts'
      }]
  },
  plugins: [
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
