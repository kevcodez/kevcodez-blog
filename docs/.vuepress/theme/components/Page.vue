<template>
  <main class="page">
    <slot name="top" />

    <Content class="theme-default-content custom" />

    <footer class="page-edit">
      <div class="last-updated" v-if="lastUpdated">
        <span class="prefix">{{ lastUpdatedText }}: </span>
        <span class="time">{{ lastUpdated }}</span>
      </div>
    </footer>

    <div class="page-nav" v-if="prev || next">
      <p class="inner">
        <span v-if="prev" class="prev">
          ←
          <router-link v-if="prev" class="prev" :to="prev.path">
            {{ prev.title || prev.path }}
          </router-link>
        </span>

        <span v-if="next" class="next">
          <router-link v-if="next" :to="next.path">
            {{ next.title || next.path }}
          </router-link>
          →
        </span>
      </p>
    </div>

    <slot name="bottom" />
  </main>
</template>

<script>
import { outboundRE, endingSlashRE } from "@vuepress/theme-default/util";
export default {
  props: ["sidebarItems"],
  computed: {
    lastUpdated() {
      return this.$page.frontmatter.type !== "guide" && this.$page.lastUpdated;
    },
    lastUpdatedText() {
      if (typeof this.$themeLocaleConfig.lastUpdated === "string") {
        return this.$themeLocaleConfig.lastUpdated;
      }
      if (typeof this.$site.themeConfig.lastUpdated === "string") {
        return this.$site.themeConfig.lastUpdated;
      }
      return "Last Updated";
    },
    sortedFiles() {
      let files = this.$site.pages
        .filter((it) => it.path !== "/")
        .sort((a, b) => {
          return (
            new Date(b.frontmatter.date).getTime() -
            new Date(a.frontmatter.date).getTime()
          );
        });

      return files;
    },
    indexOfCurrentPage() {
      for (var i = 0; i < this.sortedFiles.length; i++) {
        if (this.sortedFiles[i].regularPath === this.$route.path) return i;
      }

      return -1;
    },
    prev() {
      if (this.$page.frontmatter.prev === false) {
        return null;
      } else if (this.$page.frontmatter.prev === true) {
        const prevIndex = this.indexOfCurrentPage - 1;
        if (prevIndex > -1) {
          return this.sortedFiles[prevIndex];
        } else {
          return null;
        }
      } else {
        return this.sortedFiles.find(
          (it) => it.path === this.$page.frontmatter.prev
        );
      }
    },
    next() {
      const sortedFiles = this.sortedFiles;

      if (this.$page.frontmatter.next === false) {
        return null;
      } else if (this.$page.frontmatter.next === true) {
        const nextIndex = this.indexOfCurrentPage + 1;
        if (nextIndex < sortedFiles.length) {
          return this.sortedFiles[nextIndex];
        } else {
          return null;
        }
      } else {
        return this.sortedFiles.find(
          (it) => it.path === this.$page.frontmatter.next
        );
      }
    },
  },
};
</script>

<style lang="stylus">
@require './wrapper.styl';

div.custom {
  max-width: 900px;
  margin: 3rem auto !important;
  padding: 2rem 2.5rem !important;
}

.page {
  padding-bottom: 2rem;
  display: block;
  font-size: 20px;
}

.page-edit {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 1rem;
  overflow: auto;

  .edit-link {
    display: inline-block;

    a {
      color: lighten($textColor, 25%);
      margin-right: 0.25rem;
    }
  }

  .last-updated {
    float: right;
    font-size: 0.9em;

    .prefix {
      font-weight: 500;
      color: lighten($textColor, 25%);
    }

    .time {
      font-weight: 400;
      color: #aaa;
    }
  }
}

.page-nav {
  @extend $wrapper;
  padding-top: 1rem;
  padding-bottom: 0;

  .inner {
    min-height: 2rem;
    margin-top: 0;
    border-top: 1px solid $borderColor;
    padding-top: 1rem;
    overflow: auto; // clear float
  }

  .next {
    float: right;
  }
}

@media (max-width: $MQMobile) {
  .page-edit {
    .edit-link {
      margin-bottom: 0.5rem;
    }

    .last-updated {
      font-size: 0.8em;
      float: none;
      text-align: left;
    }
  }
}
</style>
