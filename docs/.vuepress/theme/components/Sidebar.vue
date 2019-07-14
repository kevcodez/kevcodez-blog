<template>
  <aside class="sidebar">
    <ul class="sidebar-links">
      <li>
        <section class="sidebar-group">
          <p class="sidebar-heading">
            <span>Recent posts</span>
          </p>
        </section>
        <ul class="sidebar-sub-headers">
          <li class="sidebar-sub-header" v-for="post in recentFiles">
            <a
              class="sidebar-link"
              :href="post.path"
            >{{post.title}}</a>
          </li>
        </ul>
      </li>
    </ul>

  </aside>
</template>

<script>
export default {
  name: 'Sidebar',
  props: ['items'],
  data () {
    return {};
  },
  computed: {
    recentFiles () {
      let files = this.$site.pages.filter(p => {
        return p.path.indexOf('/posts/') >= 0;
      }).sort((a, b) => {
        let aDate = new Date(a.frontmatter.date).getTime();
        let bDate = new Date(b.frontmatter.date).getTime();
        let diff = aDate - bDate;
        if (diff > 0) return -1;
        if (diff < 0) return 1;
        return 0;
      }).slice(0, 8);

      return files;
    }
  }
}
</script>

<style lang="stylus">
.sidebar {
  ul {
    padding: 0.5rem;
    margin-bottom: 10px;
    list-style-type: none;
  }

  .nav-links {
    display: none;
    border-bottom: 1px solid $borderColor;
    padding: 0.5rem 0 0.75rem 0;

    a {
      font-weight: 600;
    }

    .nav-item, .repo-link {
      display: block;
      line-height: 1.25rem;
      font-size: 1.1em;
      padding: 0.5rem 0 0.5rem 1.5rem;
    }
  }

  & > .sidebar-links {
    padding: 1.5rem 0;

    & > li > a.sidebar-link {
      font-size: 1.1em;
      line-height: 1.7;
      font-weight: bold;
    }

    & > li:not(:first-child) {
      margin-top: 0.75rem;
    }
  }
}

@media (max-width: $MQMobile) {
  .sidebar {
    .nav-links {
      display: block;

      .dropdown-wrapper .nav-dropdown .dropdown-item a.router-link-active::after {
        top: calc(1rem - 2px);
      }
    }

    & > .sidebar-links {
      padding: 1rem 0;
    }
  }
}

.sidebar-group {
  .sidebar-group {
    padding-left: 0.5em;
  }

  &:not(.collapsable) {
    .sidebar-heading:not(.clickable) {
      cursor: auto;
      color: inherit;
    }
  }

  // refine styles of nested sidebar groups
  &.is-sub-group {
    padding-left: 0;

    & > .sidebar-heading {
      font-size: 0.95em;
      line-height: 1.4;
      font-weight: normal;
      padding-left: 2rem;

      &:not(.clickable) {
        opacity: 0.5;
      }
    }

    & > .sidebar-group-items {
      padding-left: 1rem;

      & > li > .sidebar-link {
        font-size: 0.95em;
        border-left: none;
      }
    }
  }

  &.depth-2 {
    & > .sidebar-heading {
      border-left: none;
    }
  }
}

.sidebar-heading {
  color: $textColor;
  transition: color 0.15s ease;
  cursor: pointer;
  font-size: 1.1em;
  font-weight: bold;
  // text-transform uppercase
  padding: 0.35rem 1.5rem 0.35rem 1.25rem;
  width: 100%;
  box-sizing: border-box;
  margin: 0;
  border-left: 0.25rem solid transparent;

  &.open, &:hover {
    color: inherit;
  }

  .arrow {
    position: relative;
    top: -0.12em;
    left: 0.5em;
  }

  &.clickable {
    &.active {
      font-weight: 600;
      color: $accentColor;
      border-left-color: $accentColor;
    }

    &:hover {
      color: $accentColor;
    }
  }
}

.sidebar-group-items {
  transition: height 0.1s ease-out;
  font-size: 0.95em;
  overflow: hidden;
}

.sidebar .sidebar-sub-headers
  padding-left 1rem
  font-size 0.95em
a.sidebar-link
  font-size 1em
  font-weight 400
  display inline-block
  color $textColor
  border-left 0.25rem solid transparent
  padding 0.35rem 1rem 0.35rem 1.25rem
  line-height 1.4
  width: 100%
  box-sizing: border-box
  &:hover
    color $accentColor
  &.active
    font-weight 600
    color $accentColor
    border-left-color $accentColor
  .sidebar-group &
    padding-left 2rem
  .sidebar-sub-headers &
    padding-top 0.25rem
    padding-bottom 0.25rem
    border-left none
    &.active
      font-weight 500
</style>