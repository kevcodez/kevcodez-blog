<template>
  <div>
    <h2>Recent posts</h2>
    <div class="posts" v-if="posts.length">
      <div class="post" v-for="post in posts">
        <router-link :to="post.path">
          <div>
            <img v-if="post.frontmatter.image" :src="$withBase(post.frontmatter.image)" alt />
          </div>
          <h3>{{post.title}}</h3>
          <p>{{post.description}}</p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    posts() {
      let files = this.$site.pages
        .filter(it => it.path !== "/")
        .sort((a, b) => {
          let aDate = new Date(a.frontmatter.date).getTime();
          let bDate = new Date(b.frontmatter.date).getTime();
          let diff = aDate - bDate;
          if (diff > 0) return -1;
          if (diff < 0) return 1;
          return a.frontmatter.title.localeCompare(b.frontmatter.title);
        })
        .slice(0, 15);

      return files;
    }
  }
};
</script>