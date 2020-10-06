<template>
  <li>
    <section class="sidebar-group">
      <p class="sidebar-heading">
        <span>Recent posts</span>
      </p>
    </section>
    <ul class="sidebar-sub-headers">
      <li class="sidebar-sub-header" v-for="post in posts">
        <a class="sidebar-link" :href="post.path">{{ post.title }}</a>
      </li>
    </ul>
  </li>
</template>

<script>
export default {
  name: "RecentPosts",
  props: ["posts"],
};
</script>
