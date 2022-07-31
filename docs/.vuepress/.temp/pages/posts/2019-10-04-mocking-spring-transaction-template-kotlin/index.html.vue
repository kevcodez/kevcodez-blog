<template><div><h1 id="mocking-spring-transactiontemplate-with-kotlin-and-mockito" tabindex="-1"><a class="header-anchor" href="#mocking-spring-transactiontemplate-with-kotlin-and-mockito" aria-hidden="true">#</a> Mocking Spring TransactionTemplate with Kotlin and Mockito</h1>
<p>Besides the <code v-pre>@Transactional</code> anontation, you can also use Springs <a href="https://docs.spring.io/spring/docs/current/javadoc-api/org/springframework/transaction/support/TransactionTemplate.html" target="_blank" rel="noopener noreferrer">TransactionTemplate<ExternalLinkIcon/></a> programmatically.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>transaction<span class="token punctuation">.</span>support<span class="token punctuation">.</span>TransactionTemplate

<span class="token keyword">class</span> FooService <span class="token keyword">constructor</span><span class="token punctuation">(</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> transactionTemplate<span class="token operator">:</span> TransactionTemplate
<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token keyword">fun</span> <span class="token function">save</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        transactionTemplate<span class="token punctuation">.</span><span class="token function">execute</span> <span class="token punctuation">{</span>
            <span class="token comment">// important transactional code</span>
        <span class="token punctuation">}</span>

        <span class="token comment">// other code</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When writing a Unit-Test for this class, you probably still want to test the code that is being executed within the transaction template.
To do this, you can simply mock the transaction templates method to execute whatever is inside the block.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token function">whenever</span><span class="token punctuation">(</span>transactionTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>any<span class="token operator">&lt;</span>TransactionCallback<span class="token operator">&lt;</span>Unit<span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAnswer</span> <span class="token punctuation">{</span>
    <span class="token punctuation">(</span>it<span class="token punctuation">.</span>arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">as</span> TransactionCallback<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doInTransaction</span><span class="token punctuation">(</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The code above uses <a href="https://github.com/nhaarman/mockito-kotlin" target="_blank" rel="noopener noreferrer">Mockito Kotlin<ExternalLinkIcon/></a>.</p>
<p>An easy way to execute any call inside the <code v-pre>execute</code> block is setup a <code v-pre>@BeforeEach</code> function from JUnit that will get called before each test execution.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> com<span class="token punctuation">.</span>nhaarman<span class="token punctuation">.</span>mockitokotlin2<span class="token punctuation">.</span><span class="token operator">*</span>
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>BeforeEach
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Test

<span class="token keyword">class</span> FooServiceTest <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> transactionTemplate<span class="token operator">:</span> TransactionTemplate <span class="token operator">=</span> <span class="token function">mock</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token keyword">private</span> <span class="token keyword">val</span> fooService <span class="token operator">=</span> <span class="token function">FooService</span><span class="token punctuation">(</span>
        transactionTemplate <span class="token operator">=</span> transactionTemplate<span class="token punctuation">,</span>
    <span class="token punctuation">)</span>

    <span class="token annotation builtin">@BeforeEach</span>
    <span class="token keyword">fun</span> <span class="token function">setUp</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">whenever</span><span class="token punctuation">(</span>transactionTemplate<span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span>any<span class="token operator">&lt;</span>TransactionCallback<span class="token operator">&lt;</span>Unit<span class="token operator">></span><span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">thenAnswer</span> <span class="token punctuation">{</span>
            <span class="token punctuation">(</span>it<span class="token punctuation">.</span>arguments<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span> <span class="token keyword">as</span> TransactionCallback<span class="token operator">&lt;</span><span class="token operator">*</span><span class="token operator">></span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">doInTransaction</span><span class="token punctuation">(</span><span class="token function">mock</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">`should do something`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// your test code</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
