<template>
  <div class="agile-product-development">
     <img
                  src="/inside-agile.png"
                  alt="Inside Agile Product Development Series"
                />

    <p>
      The <strong>Inside Agile Product Development Series</strong> gives you an
      overview of how we work as an agile software development team to
      continuously develop &amp; ship a product. It covers a variety of
      different, also non-technical, topics. The good, the bad and the ugly.
    </p>

    <div class="cta">
      <a href="/inside-agile-product-development-series"
        >→ Read the introduction</a
      >
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.agile-product-development {
  text-align: center;

  h2 {
    border-bottom: none;
    font-weight: bold;
    font-size: 2rem;
  }

  .cta {
    display: flex;
    align-items: center;
    justify-content: center;
    a {
      padding-left: 1.25rem;
      padding-right: 1.25rem;
      padding-top: 0.75rem;
      padding-bottom: 0.75rem;
      line-height: 1.5rem;
      background-color: #5a67d8;
      color: white;
      border-radius: 0.375rem;
    }
  }
}
</style>
