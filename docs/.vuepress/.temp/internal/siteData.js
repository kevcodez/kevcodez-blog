export const siteData = JSON.parse("{\"base\":\"/\",\"lang\":\"en-US\",\"title\":\"kevcodez - Developer Blog\",\"description\":\"Developer Blog - Kotlin, Web development, Agile Software Development\",\"head\":[[\"meta\",{\"name\":\"viewport\",\"content\":\"width=device-width, initial-scale=1\"}],[\"meta\",{\"name\":\"theme-color\",\"content\":\"#5a67d8\"}],[\"link\",{\"rel\":\"icon\",\"href\":\"/code.svg\"}],[\"link\",{\"rel\":\"manifest\",\"href\":\"/manifest.json\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-capable\",\"content\":\"yes\"}],[\"meta\",{\"name\":\"apple-mobile-web-app-status-bar-style\",\"content\":\"black\"}],[\"link\",{\"rel\":\"apple-touch-icon\",\"href\":\"/code@2x.png\"}],[\"meta\",{\"name\":\"msapplication-TileImage\",\"content\":\"/code@2x.png\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
