const _ = require("lodash");

module.exports = {
  title: "kevcodez - Developer Blog",
  description:
    "Developer Blog - Java, Kotlin, Spring, Postgres, DevOps, Web development",
  evergreen: true,
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
    ],
    ["meta", { name: "theme-color", content: "#5a67d8" }],
    ["link", { rel: "icon", href: "/code.svg" }],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    ["link", { rel: "apple-touch-icon", href: "/code@2x.png" }],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/code@2x.png",
      },
    ],
  ],
  themeConfig: {
    nav: [
      {
        text: "Twitter",
        link: "https://twitter.com/kevcodez",
      },
      {
        text: "Github",
        link: "https://github.com/kevcodez",
      },
    ],
    lastUpdated: "Last Updated",
    repo: "kevcodez/kevcodez-blog",
    repoLabel: "Contribute!",
    docsDir: "docs",
    editLinks: false,
    editLinkText: "Help improve this page!",
    sidebar: [
      {
        title: "Latest posts",
      },
    ],
    smoothScroll: true,
  },
  plugins: [
    [
      "feed",
      {
        canonical_base: "https://kevcodez.de",
        posts_directories: [
          "/inside-agile-product-development-series/",
          "/posts/",
          "/books/",
        ],
        sort: (entries) => _.reverse(_.sortBy(entries, "date")),
        count: 100,
      },
    ],
    [
      "@vuepress/medium-zoom",
      {
        selector: "img",
      },
    ],
    [
      "@vuepress/pwa",
      {
        serviceWorker: true,
      },
    ],
    [
      "sitemap",
      {
        hostname: "https://kevcodez.de",
      },
    ],
    [
      "@vuepress/google-analytics",
      {
        ga: "UA-64629196-1",
      },
    ],
    [
      "@mr-hope/seo",
      {
        author: "Kevin Grüneberg",
        twitterId: "kevcodez",
      },
    ],
  ],
};
