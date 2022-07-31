<template><div><h1 id="resilient-http-client-with-apache-httpclient-using-httprequestretryhandler-and-servicenotavailablestrategy" tabindex="-1"><a class="header-anchor" href="#resilient-http-client-with-apache-httpclient-using-httprequestretryhandler-and-servicenotavailablestrategy" aria-hidden="true">#</a> Resilient HTTP client with Apache HttpClient using HttpRequestRetryHandler and ServiceNotAvailableStrategy</h1>
<p>When using HTTP calls you eventually run into issues such as:</p>
<ul>
<li>Connect Timeouts</li>
<li>Socket Timeouts</li>
<li>SSL handshake errors</li>
<li>Connection interruptions</li>
<li>Service unavailability</li>
<li>Gateway Timeouts</li>
<li>Bad Gateways</li>
<li>...</li>
</ul>
<p>In most of these cases, a simple retry will help.
To retry HTTP calls on errors, we can make use of the built-in <code v-pre>HttpRequestRetryHandler</code> and the
<code v-pre>ServiceUnavailableRetryStrategy</code>.</p>
<p>Let's set up a simple closeable HTTP client first:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">val</span> requestConfig <span class="token operator">=</span> RequestConfig<span class="token punctuation">.</span><span class="token function">custom</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setCookieSpec</span><span class="token punctuation">(</span>CookieSpecs<span class="token punctuation">.</span>STANDARD<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setConnectTimeout</span><span class="token punctuation">(</span><span class="token number">5</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setSocketTimeout</span><span class="token punctuation">(</span><span class="token number">60</span> <span class="token operator">*</span> <span class="token number">1000</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token keyword">val</span> httpClient <span class="token operator">=</span> HttpClientBuilder
    <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setDefaultRequestConfig</span><span class="token punctuation">(</span>requestConfig<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="http-request-retry-handler" tabindex="-1"><a class="header-anchor" href="#http-request-retry-handler" aria-hidden="true">#</a> HTTP Request Retry Handler</h2>
<p>Most of the issues listed above will cause an IOException.</p>
<p>Any timeout or SSL negotiation issues will cause an exception that is inherited by the IOException class.</p>
<p>To retry your calls when an IOException occurs, we can set a <code v-pre>HttpRequestRetryHandler</code>.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code> <span class="token keyword">val</span> retryHandler <span class="token operator">=</span> HttpRequestRetryHandler <span class="token punctuation">{</span> exception<span class="token punctuation">,</span> executionCount<span class="token punctuation">,</span> context <span class="token operator">-></span>
    <span class="token comment">// 3 retries at max</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>executionCount <span class="token operator">></span> <span class="token number">3</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">return</span><span class="token label symbol">@HttpRequestRetryHandler</span> <span class="token boolean">false</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        <span class="token comment">// wait a second before retrying again</span>
        Thread<span class="token punctuation">.</span><span class="token function">sleep</span><span class="token punctuation">(</span><span class="token number">1000</span><span class="token punctuation">)</span>
        <span class="token keyword">return</span><span class="token label symbol">@HttpRequestRetryHandler</span> <span class="token boolean">true</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can customize that behavior.</p>
<p>To use your custom retry handler, simply specify it when building your HTTP client.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>HttpClientBuilder
    <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setRetryHandler</span><span class="token punctuation">(</span>retryHandler<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="service-unavailable-retry-strategy" tabindex="-1"><a class="header-anchor" href="#service-unavailable-retry-strategy" aria-hidden="true">#</a> Service Unavailable Retry Strategy</h2>
<p>The <code v-pre>HttpRequestRetryHandler</code> will only be used when an IOException occurs.
When the SSL handshake succeeds and no socket/connect timeout occurs we might still get a HTTP response with status codes such as 502 (Bad Gateway) or 503 (Gateway Timeout).</p>
<p>To retry in those cases aswell, we can make use of the ServiceUnavailableRetryStrategy</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">val</span> serviceUnavailableRetryStrategy<span class="token operator">:</span> ServiceUnavailableRetryStrategy <span class="token operator">=</span> <span class="token keyword">object</span> <span class="token operator">:</span> ServiceUnavailableRetryStrategy <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">getRetryInterval</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> Long <span class="token punctuation">{</span>
        <span class="token comment">// milliseconds</span>
        <span class="token keyword">return</span> <span class="token number">1000</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">retryRequest</span><span class="token punctuation">(</span>response<span class="token operator">:</span> HttpResponse<span class="token operator">?</span><span class="token punctuation">,</span> executionCount<span class="token operator">:</span> Int<span class="token punctuation">,</span> context<span class="token operator">:</span> HttpContext<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">:</span> Boolean <span class="token punctuation">{</span>
        <span class="token keyword">val</span> statusCode <span class="token operator">=</span> response<span class="token operator">!!</span><span class="token punctuation">.</span>statusLine<span class="token punctuation">.</span>statusCode

        <span class="token comment">// retry if status code is 502 or 503 and no more than three retries were done yet</span>
        <span class="token keyword">return</span> statusCode <span class="token keyword">in</span> <span class="token function">listOf</span><span class="token punctuation">(</span><span class="token number">502</span><span class="token punctuation">,</span> <span class="token number">503</span><span class="token punctuation">)</span> <span class="token operator">&amp;&amp;</span> executionCount <span class="token operator">&lt;</span> <span class="token number">3</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can customize the retry behavior to your demand.</p>
<p>As with the HTTP request retry handler, simply specify the strategy when building your HTTP client.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>HttpClientBuilder
    <span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">setServiceUnavailableRetryStrategy</span><span class="token punctuation">(</span>serviceUnavailableRetryStrategy<span class="token punctuation">)</span>
    <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>When using both, the HTTP request retry handler and the service unavailable retry strategy, your HTTP client will be a lot more robust.
Small network/service hickups will not lead to failure.</p>
</div></template>
