<template>
  <aside class="sidebar">
    <ul class="sidebar-links">
      <li>
        <section class="sidebar-group">
          <p class="sidebar-heading">
            <span>Follow along</span>
          </p>
        </section>
        <ul class="sidebar-sub-headers">
          <li class="sidebar-sub-header">
            <a
              class="sidebar-link"
              style="display: flex"
              href="https://twitter.com/kevcodez"
              target="_blank"
              rel="noopener"
            >
              <div
                style="height: 32px; width: 32px; margin-right: 0.5em; display: flex; justify-content: center; align-items: center"
              >
                <img
                  src="/Twitter_Logo_Blue.png"
                  style="height: 32px; width; 32px;"
                  alt="Twitter Kevcodez"
                />
              </div>

              <span style="align-self: center">Twitter</span>
            </a>
          </li>
          <li class="sidebar-sub-header">
            <a
              class="sidebar-link"
              style="display: flex"
              href="https://github.com/kevcodez"
              target="_blank"
              rel="noopener"
            >
              <div
                style="height: 32px; width: 32px;margin-right: 0.5em;  display: flex; justify-content: center; align-items: center"
              >
                <img
                  src="/GitHub-Mark-64px.png"
                  style="height: 25px; width; 25px; "
                  alt="Github Kevcodez"
                />
              </div>

              <span style="align-self: center">Github</span>
            </a>
          </li>
          <li class="sidebar-sub-header">
            <a
              class="sidebar-link"
              style="display: flex"
              href="https://getmakerlog.com/@kevcodez"
              target="_blank"
              rel="noopener"
            >
              <div
                style="height: 32px; width: 32px;margin-right: 0.5em;  display: flex; justify-content: center; align-items: center; color: rgb(0,173,113)"
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  style="height: 25px; width; 25px; "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                  ></path>
                </svg>
              </div>

              <span style="align-self: center">Makerlog</span>
            </a>
          </li>
          <li class="sidebar-sub-header">
            <a
              class="sidebar-link"
              style="display: flex"
              href="https://www.indiehackers.com/kevcodez"
              target="_blank"
              rel="noopener"
            >
              <div
                style="height: 32px; width: 32px;margin-right: 0.5em;  display: flex; justify-content: center; align-items: center; color: rgb(0,173,113)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 120 120"
                  style="height: 25px; width; 25px; "
                >
                  <rect
                    class="background"
                    x="0"
                    y="0"
                    height="120"
                    width="120"
                    fill="hsl(210, 60%, 14%)"
                  />
                  <g class="text" fill="white">
                    <rect
                      class="text__i"
                      x="27"
                      y="34"
                      height="52"
                      width="12"
                    />
                    <rect
                      class="text__h"
                      x="51"
                      y="34"
                      height="52"
                      width="12"
                    />
                    <rect
                      class="text__h"
                      x="61"
                      y="54"
                      height="12"
                      width="22"
                    />
                    <rect
                      class="text__h"
                      x="81"
                      y="34"
                      height="52"
                      width="12"
                    />
                  </g>
                </svg>
              </div>

              <span style="align-self: center">Indiehackers</span>
            </a>
          </li>
        </ul>
      </li>

      <GuideToc v-if="$page.frontmatter.type === 'guide'" :toc-file="tocFile" />

      <RecentPosts
        v-if="$page.frontmatter.type !== 'guide'"
        :posts="recentFiles"
      />
    </ul>
  </aside>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["items"],
  data() {
    return {};
  },
  computed: {
    tocFile() {
      const file = "/" + this.$page.path.split("/")[1] + "/toc.html";
      const matchingPage = this.$site.pages.find((p) => p.path === file);

      if (matchingPage) {
        return matchingPage.key;
      } else {
        return null;
      }
    },
    recentFiles() {
      let files = this.$site.pages
        .filter((it) => it.frontmatter && it.frontmatter.title)
        .sort((a, b) => {
          console.log(a.frontmatter.title);
          let aDate = new Date(a.frontmatter.date).getTime();
          let bDate = new Date(b.frontmatter.date).getTime();
          let diff = aDate - bDate;
          if (diff > 0) return -1;
          if (diff < 0) return 1;
          return a.frontmatter.title.localeCompare(b.frontmatter.title);
        })
        .slice(0, 20);

      return files;
    },
  },
};
</script>

<style lang="stylus">
@media (max-width: 959px) {
.sidebar {
    width: 100%;
}
}

.sidebar::-webkit-scrollbar-track
{
    -webkit-box-shadow: inset 0 0 2px rgba(0,0,0,0.1);
    background-color: #EDF2F7;
}

.sidebar::-webkit-scrollbar
{
    width: 6px;
    background-color: #EDF2F7;
}

.sidebar::-webkit-scrollbar-thumb
{
background-color: #2D3748;
}

.sidebar {

  ul {
    padding: 0rem;
    margin-bottom: 5px;
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

.sidebar .sidebar-sub-headers {
  padding-left: 1rem;
  font-size: 0.95em;
}

a.sidebar-link {
  font-size: 1em;
  font-weight: 400;
  display: inline-block;
  color: $textColor;
  border-left: 0.25rem solid transparent;
  padding: 0.35rem 1rem 0.35rem 1.25rem;
  line-height: 1.4;
  width: 100%;
  box-sizing: border-box;

  &:hover {
    color: $accentColor;
  }

  &.active {
    font-weight: 600;
    color: $accentColor;
    border-left-color: $accentColor;
  }

  .sidebar-group & {
    padding-left: 2rem;
  }

  .sidebar-sub-headers & {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
    border-left: none;

    &.active {
      font-weight: 500;
    }
  }
}
</style>
