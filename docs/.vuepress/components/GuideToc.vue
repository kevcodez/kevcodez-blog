<template>
  <div class="toc">
    <Content :page-key="tocFile" />
  </div>
</template>

<script>
export default {
  props: ["tocFile"],
  name: "GuideToc",
};
</script>

<style lang="stylus">
.toc {
  p {
    font-size: 1.3em;
    line-height: 1.3em;
    padding-left: 10px;
    font-weight: bold;
  }

  padding: 0rem 0.5rem 0rem 0.5rem;

}

.toc > div > ul > li > a {

  &.router-link-exact-active {
    border-left: 4px solid #5a67d8;

  }
}

.toc > div > ul > li {
  margin-bottom: 10px;
}

.toc > div > ul > li > ul {
padding-top: 10px;
-webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

.toc > div > ul > li {
padding-left: 10px;
-webkit-box-decoration-break: clone;
  box-decoration-break: clone;
}

 .toc > div > ul > li > a {
    padding-left: 6px;
    font-size: 1.1em;
    font-weight: bold;
    display: flex;
  }

  .toc > div > ul > li > em {
    font-size: 1.1em;
    font-style: normal;
  }

  .toc > div > ul > li > ul {
    padding-left: 20px;

    li:not(:last-child) {
      padding-bottom: 8px;
    }
  }
</style>
