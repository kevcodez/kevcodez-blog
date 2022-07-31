<template><div><h1 id="gradle-upgrade-interactive" tabindex="-1"><a class="header-anchor" href="#gradle-upgrade-interactive" aria-hidden="true">#</a> Gradle Upgrade Interactive</h1>
<p>Every time I am using yarn, I really enjoy <code v-pre>yarn upgrade-interactive</code>,
that lists the outdated dependencies and let's me easily choose what to upgrade.</p>
<p>Inspired by yarn, I built <code v-pre>gradle-upgrade-interactive</code>,
an interactive CLI for <a href="https://gradle.org/" target="_blank" rel="noopener noreferrer">Gradle<ExternalLinkIcon/></a> projects that allows upgrading dependencies and the Gradle wrapper.</p>
<p><img src="@source/posts/2019-08-20-gradle-upgrade-interactive/cli.gif" alt="CLI"></p>
<p>To get the data for the outdated dependencies, the gradle-versions-plugin is required.</p>
<p>build.gradle</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code>plugins <span class="token punctuation">{</span>
  <span class="token function">id</span> <span class="token string">"com.github.ben-manes.versions"</span> version <span class="token string">"0.33.0"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Install the CLI</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">npm</span> i -g gradle-upgrade-interactive
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Now you can simply run <code v-pre>gradle-upgrade-interactive</code> in your Gradle projects.</p>
<p>Package can be found on <a href="https://www.npmjs.com/package/gradle-upgrade-interactive" target="_blank" rel="noopener noreferrer">npmjs<ExternalLinkIcon/></a>.</p>
<p>Source can be found at <a href="https://github.com/kevcodez/gradle-upgrade-interactive" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
