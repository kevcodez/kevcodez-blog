<template>
  <div>
    <h2>Featured posts</h2>

    <div class="features" v-if="data.features && data.features.length">
      <div
        class="feature"
        v-for="(feature, index) in data.features"
        :key="index"
      >
        <router-link :to="feature.url">
          <h2 class="feature-title">{{ feature.title }}</h2>
        </router-link>
        <p>{{ feature.details }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$page.frontmatter;
    },
  },
};
</script>

<style lang="scss">
.features {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: stretch;
  justify-content: space-between;
}

.feature {
  flex-grow: 1;
  flex-basis: 45%;
  max-width: 45%;

  .feature-title {
    font-size: 1.4rem;
    font-weight: 500;
    border-bottom: none;
    padding-bottom: 0;
    color: #5a67d8;
  }

  p {
    color: #2c3e50;
  }
}

@media (max-width: 719px) {
  .features {
    flex-direction: column;
  }
  .feature {
    max-width: 100%;
    padding: 0 2.5rem;
  }
}

@media (max-width: 419px) {
  .feature {
    a {
      h2 {
        font-size: 1.25rem;
      }
    }
  }
}
</style>
