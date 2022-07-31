export const data = JSON.parse("{\"key\":\"v-8daa1a0e\",\"path\":\"/\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{\"editLink\":false,\"features\":[{\"title\":\"Gradle Upgrade Interactive\",\"details\":\"Interactive CLI to upgrade Gradle dependencies and wrapper, inspired by yarn.\",\"url\":\"/posts/2019-08-20-gradle-upgrade-interactive/\"},{\"title\":\"Docker Logging with Fluentbit\",\"details\":\"Logging from Docker Containers to Elasticsearch with Fluent Bit.\",\"url\":\"/posts/2019-08-10-fluent-bit-docker-logging-driver-elasticsearch/\"}],\"pageClass\":\"index\"},\"excerpt\":\"\",\"headers\":[],\"git\":{\"updatedTime\":1602017194000,\"contributors\":[{\"name\":\"Kevin Grüneberg\",\"email\":\"k.grueneberg1994@gmail.com\",\"commits\":7}]},\"filePathRelative\":\"README.md\"}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
