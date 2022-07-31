<template><div><h1 id="responsive-e-mails-with-vue-js-and-mjml-rendered-on-the-server" tabindex="-1"><a class="header-anchor" href="#responsive-e-mails-with-vue-js-and-mjml-rendered-on-the-server" aria-hidden="true">#</a> Responsive E-Mails with Vue.js and mjml rendered on the server</h1>
<p>A colleague recently introduced me to <a href="https://mjml.io/" target="_blank" rel="noopener noreferrer">mjml<ExternalLinkIcon/></a>, a framework that makes responsive emails easy.
If you ever had to create emails in plain HTML/CSS that look good on <em>all</em> clients, you know the hustle.</p>
<p><img src="@source/posts/2019-10-12-responsive-emails-vuejs-mjml/mjml.png" alt="mjml"></p>
<p>Obviously, we still need some additional templating to replace some dynamic parts.
Vue.js's templating syntax has always been very enjoyable.</p>
<p>I also found a <a href="https://medium.com/@terencebezman/progressive-emails-using-vue-mjml-947c7764abd3" target="_blank" rel="noopener noreferrer">blog post<ExternalLinkIcon/></a> saying that Vue.js + mjml is a great combination, it does lack some code samples, though.</p>
<p>I wanted to leverage the <a href="https://ssr.vuejs.org/" target="_blank" rel="noopener noreferrer">Vue-Server-Renderer<ExternalLinkIcon/></a> for this.</p>
<p>The idea is simple:</p>
<ul>
<li>Render the Vue templates using the Vue-Server-Renderer</li>
<li>Render the previous output using mjml2html</li>
</ul>
<p>This way, we can combine the power of Vue.js and mjml.
Enough talking, let's get into the code.</p>
<hr>
<h2 id="dependencies" tabindex="-1"><a class="header-anchor" href="#dependencies" aria-hidden="true">#</a> Dependencies</h2>
<p>Install the dependencies</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> vue vue-server-renderer mjml
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="render-a-simple-template-on-the-server" tabindex="-1"><a class="header-anchor" href="#render-a-simple-template-on-the-server" aria-hidden="true">#</a> Render a simple template on the server</h2>
<p>Let's start by rendering a simple vue component.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span>hello&lt;/span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

renderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">html</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Executing the code above (<code v-pre>node &lt;filename&gt;.js</code>) will output</p>
<blockquote>
<p><code v-pre>&lt;span data-server-rendered=&quot;true&quot;&gt;hello&lt;/span&gt;</code></p>
</blockquote>
<h1 id="render-a-template-with-data" tabindex="-1"><a class="header-anchor" href="#render-a-template-with-data" aria-hidden="true">#</a> Render a template with data</h1>
<p>Now, let's pass in some data to that component and interpolate it to the template.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'kevcodez'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;span>hello {{ name }}&lt;/span></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

renderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">html</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote>
<p><code v-pre>&lt;span data-server-rendered=&quot;true&quot;&gt;hello kevcodez&lt;/span&gt;</code></p>
</blockquote>
<h1 id="render-templates-with-mjml" tabindex="-1"><a class="header-anchor" href="#render-templates-with-mjml" aria-hidden="true">#</a> Render templates with mjml</h1>
<p>Rather than using plain html tags, we can use the mjml tags.
<code v-pre>mjml2html</code> is used to convert the markup to actual HTML.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> Vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> mjml2html <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mjml'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'kevcodez'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;mjml>
  &lt;mjml-body>
    &lt;mj-section>
      &lt;mj-column>
          &lt;mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello {{ name }}&lt;/mj-text>
      &lt;/mj-column>
    &lt;/mj-section>
  &lt;/mjml-body>
&lt;/mjml></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

renderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">html</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  <span class="token comment">// Two properties (html/errors), errors being an array of error messages that occured during template rendering</span>
  <span class="token keyword">const</span> htmlAndErrors <span class="token operator">=</span> <span class="token function">mjml2html</span><span class="token punctuation">(</span>html<span class="token punctuation">)</span>
  console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>htmlAndErrors<span class="token punctuation">.</span>html<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">catch</span><span class="token punctuation">(</span><span class="token parameter">err</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
  console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This will now output something like</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token doctype"><span class="token punctuation">&lt;!</span><span class="token doctype-tag">doctype</span> <span class="token name">html</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>html</span> <span class="token attr-name">xmlns</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>http://www.w3.org/1999/xhtml<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>v</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>urn:schemas-microsoft-com:vml<span class="token punctuation">"</span></span> <span class="token attr-name"><span class="token namespace">xmlns:</span>o</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>urn:schemas-microsoft-com:office:office<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
    ...
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>html</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="wrapping-template-for-the-server-renderer" tabindex="-1"><a class="header-anchor" href="#wrapping-template-for-the-server-renderer" aria-hidden="true">#</a> Wrapping template for the server renderer</h2>
<p>The Vue-Server-Renderer allows us to pass in a template, that wraps around the rendered Vue component.</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">&lt;mjml>
    &lt;mj-body>
    &lt;!--vue-ssr-outlet-->
    &lt;/mj-body>
    &lt;/mjml></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code v-pre>&lt;!--vue-ssr-outlet--&gt;</code> is the placeholder that will get replaced with the rendered component.
By doing that, we don't have to define the base mjml-tags in every component.</p>
<p>If you have a look at the data object returned by <code v-pre>mjml2html</code>, you will see that we have an error</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token punctuation">[</span>
  <span class="token punctuation">{</span>
    <span class="token literal-property property">line</span><span class="token operator">:</span> <span class="token number">3</span><span class="token punctuation">,</span>
    <span class="token literal-property property">message</span><span class="token operator">:</span> <span class="token string">'Attribute data-server-rendered is illegal'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">tagName</span><span class="token operator">:</span> <span class="token string">'mj-section'</span><span class="token punctuation">,</span>
    <span class="token literal-property property">formattedMessage</span><span class="token operator">:</span> <span class="token string">'Line 3 of C:\\Private\\test-mjml (mj-section) — Attribute data-server-rendered is illegal'</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The vue-server-renderer automatically attached the attribute <code v-pre>data-server-rendered</code> to the markup.
Easiest way to get rid of it is replace that attribute before rendering.</p>
<h2 id="complete-example" tabindex="-1"><a class="header-anchor" href="#complete-example" aria-hidden="true">#</a> Complete example</h2>
<p>Full example to render Vue.js templates with mjml on the server:</p>
<div class="language-javascript ext-js line-numbers-mode"><pre v-pre class="language-javascript"><code><span class="token keyword">const</span> mjml2html <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'mjml'</span><span class="token punctuation">)</span>
<span class="token keyword">const</span> Vue <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue'</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Vue</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">data</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">name</span><span class="token operator">:</span> <span class="token string">'kevcodez'</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;mj-section>
  &lt;mj-column>
    &lt;mj-text font-size="20px" color="#F45E43" font-family="helvetica">Hello {{ name }}&lt;/mj-text>
  &lt;/mj-column>
&lt;/mj-section></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token keyword">const</span> renderer <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">'vue-server-renderer'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">createRenderer</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    <span class="token literal-property property">template</span><span class="token operator">:</span> <span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">
&lt;mjml>
  &lt;mj-body>
    &lt;!--vue-ssr-outlet-->
  &lt;/mj-body>
&lt;/mjml></span><span class="token template-punctuation string">`</span></span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>

renderer<span class="token punctuation">.</span><span class="token function">renderToString</span><span class="token punctuation">(</span>app<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">then</span><span class="token punctuation">(</span><span class="token parameter">html</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token keyword">const</span> htmlWithoutDataServerRenderedAttribute <span class="token operator">=</span> html<span class="token punctuation">.</span><span class="token function">replace</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">data-server-rendered="true"</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">,</span> <span class="token string">''</span><span class="token punctuation">)</span>
    <span class="token keyword">const</span> plainHtml <span class="token operator">=</span> <span class="token function">mjml2html</span><span class="token punctuation">(</span>htmlWithoutDataServerRenderedAttribute<span class="token punctuation">)</span>
    console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>plainHtml<span class="token punctuation">.</span>html<span class="token punctuation">)</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>mjml supports a few options to modify the output (i.e. minify/beautify/fonts).
Check out the <a href="https://github.com/mjmlio/mjml" target="_blank" rel="noopener noreferrer">Github Readme<ExternalLinkIcon/></a> for the options.</p>
<p>We could now build a simple API that receives some data to dynamically render response email templates and send them to our users.</p>
<p>Source code on <a href="https://github.com/kevcodez/vuejs-server-renderer-mjml" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
