<template><div><h1 id="implementing-oauth-2-0-pkce-flow-for-authenticating-command-line-applications" tabindex="-1"><a class="header-anchor" href="#implementing-oauth-2-0-pkce-flow-for-authenticating-command-line-applications" aria-hidden="true">#</a> Implementing OAuth 2.0 PKCE Flow for authenticating command line applications</h1>
<p>You've probably seen command line applications opening a browser window for you to login and after successful login, without any further interaction, you are authenticated in the CLI.</p>
<p>One way to solve this, is using OAuth PKCE flow.</p>
<p>Since there are very great and detailed tutorials about OAuth 2.0 and the PKCE flow itself, I won't be going into detail about that.
Have a look at those resources, if you want to learn more about that.</p>
<p><a href="https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce/?utm_campaign=text_website_all_multiple_dev_dev_oauth-pkce_null&amp;utm_source=oauthio&amp;utm_medium=cpc" target="_blank" rel="noopener noreferrer">Implement the OAuth 2.0 Authorization Code with PKCE Flow (okta.com)<ExternalLinkIcon/></a></p>
<p><a href="https://auth0.com/docs/flows/concepts/auth-code-pkce" target="_blank" rel="noopener noreferrer">Authorization Code Flow with Proof Key for Code Exchange (PKCE) (auth0.com)<ExternalLinkIcon/></a></p>
<p><em>TLDR:</em> The PKCE flow is a secure way to authenticate public clients.
The calling application generates a secret that is verified by the server.</p>
<p>For our sample CLI, we are using a simple NodeJs script, it could be a CLI in any other framework.</p>
<p>As an authenticated server for the sample code <a href="https://aws.amazon.com/cognito/" target="_blank" rel="noopener noreferrer">AWS Cognito<ExternalLinkIcon/></a> is used.
It could also be any other authentication server, since OAuth is a standard, the code won't really differ besides configuration.</p>
<p>Other managed services for authentication:</p>
<ul>
<li><a href="https://auth0.com/" target="_blank" rel="noopener noreferrer">auth0<ExternalLinkIcon/></a></li>
<li><a href="https://okta.com/" target="_blank" rel="noopener noreferrer">Okta<ExternalLinkIcon/></a></li>
</ul>
<p>The flow to authenticate a user via CLI:</p>
<ol>
<li>Initialize OAuth client</li>
<li>Generate a code challenge and authorization url</li>
<li>Launch a simple webserver listening on a local port</li>
<li>Open the authorization url in a browser with the launched local webserver as redirect url</li>
<li>Upon successful login, the user is redirected and our local webserver receives the oauth callback parameters</li>
<li>Generate token set with the callback parameters</li>
<li>Shutdown local webserver</li>
</ol>
<p>Let's get into it.</p>
<h2 id="client-initialization-and-code-generation" tabindex="-1"><a class="header-anchor" href="#client-initialization-and-code-generation" aria-hidden="true">#</a> Client initialization and code generation</h2>
<p>For simplicity, the <a href="https://www.npmjs.com/package/openid-client" target="_blank" rel="noopener noreferrer">openid-client<ExternalLinkIcon/></a> package is used.
It could be any other OAuth client library, though.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// Initiliaze issuer configuration, discover or configure manually</span>
<span class="token keyword">const</span> issuer <span class="token operator">=</span> <span class="token keyword">await</span> Issuer<span class="token punctuation">.</span><span class="token function">discover</span><span class="token punctuation">(</span><span class="token string">'https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_xyz/.well-known/openid-configuration'</span><span class="token punctuation">)</span>


<span class="token keyword">const</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">issuer</span><span class="token punctuation">.</span><span class="token function">Client</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    client_id<span class="token operator">:</span> <span class="token string">'&lt;clientId>'</span><span class="token punctuation">,</span>
    <span class="token comment">// fixed port 6363, could be dynamic, our webserver will be launched on this port</span>
    redirect_uris<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'http://localhost:6363'</span><span class="token punctuation">]</span><span class="token punctuation">,</span> 
    response_types<span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">'code'</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    token_endpoint_auth_method<span class="token operator">:</span> <span class="token string">'none'</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Generate code challenge</span>
<span class="token keyword">const</span> code_verifier <span class="token operator">=</span> generators<span class="token punctuation">.</span><span class="token function">codeVerifier</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> code_challenge <span class="token operator">=</span> generators<span class="token punctuation">.</span><span class="token function">codeChallenge</span><span class="token punctuation">(</span>code_verifier<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Generate authorization url, that we will open for the user</span>
<span class="token keyword">const</span> authorizationUrl <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">authorizationUrl</span><span class="token punctuation">(</span><span class="token punctuation">{</span>
    scope<span class="token operator">:</span> <span class="token string">'openid'</span><span class="token punctuation">,</span>
    code_challenge<span class="token punctuation">,</span>
    code_challenge_method<span class="token operator">:</span> <span class="token string">'S256'</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You could manually configure the issuer.
That means you have to configure several endpoints, algorithms and so on.</p>
<p>Alternatively, most managed services offer an URL that provides that configuration under a <code v-pre>.well-known</code> path.
This allows for auto-configuration and any changes on the provider side won't need to be reconfigured manually.</p>
<h2 id="launch-a-simple-webserver-and-open-browser" tabindex="-1"><a class="header-anchor" href="#launch-a-simple-webserver-and-open-browser" aria-hidden="true">#</a> Launch a simple webserver and open browser</h2>
<p>The <a href="npmjs.com/package/opn">opn</a> package is used for cross-platform website opening.</p>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token keyword">let</span> params

<span class="token comment">// Very simple webserver, using Nodes standard http module</span>
<span class="token keyword">const</span> server <span class="token operator">=</span> http<span class="token punctuation">.</span><span class="token function">createServer</span><span class="token punctuation">(</span><span class="token punctuation">(</span>req<span class="token punctuation">,</span> res<span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span>
    <span class="token comment">// In here when the server gets a request</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>req<span class="token punctuation">.</span>url<span class="token punctuation">.</span><span class="token function">startsWith</span><span class="token punctuation">(</span><span class="token string">'/?'</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token comment">// The parameters could be parsed manually, but the openid-client offers a function for it</span>
        params <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">callbackParams</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span><span class="token punctuation">;</span>
        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'You can close this browser now.'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        res<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token string">'Unsupported'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">6363</span><span class="token punctuation">)</span> <span class="token comment">// static local port</span>

<span class="token comment">// Open authorization url in preferred browser, works cross-platform</span>
<span class="token function">opn</span><span class="token punctuation">(</span>authorizationUrl<span class="token punctuation">)</span>

<span class="token comment">// Recheck every 500ms if we received any parameters</span>
<span class="token comment">// This is a simple example without a timeout</span>
<span class="token keyword">while</span> <span class="token punctuation">(</span>params <span class="token operator">===</span> <span class="token keyword">undefined</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">await</span> <span class="token keyword">new</span> <span class="token class-name"><span class="token builtin">Promise</span></span><span class="token punctuation">(</span>resolve <span class="token operator">=></span> <span class="token function">setTimeout</span><span class="token punctuation">(</span>resolve<span class="token punctuation">,</span> <span class="token number">500</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We are now waiting for the user to login.
On a successful login, the user will be redirected to <code v-pre>http://localhost:6363/?code=&lt;dynamic-code&gt;</code>.</p>
<h2 id="get-token-set" tabindex="-1"><a class="header-anchor" href="#get-token-set" aria-hidden="true">#</a> Get token set</h2>
<div class="language-typescript ext-ts line-numbers-mode"><pre v-pre class="language-typescript"><code><span class="token comment">// Receive token set given the redirect parameters and the code verifier we created earlier</span>
<span class="token keyword">const</span> tokenSet <span class="token operator">=</span> <span class="token keyword">await</span> client<span class="token punctuation">.</span><span class="token function">oauthCallback</span><span class="token punctuation">(</span><span class="token string">'http://localhost:6363'</span><span class="token punctuation">,</span> params<span class="token punctuation">,</span> <span class="token punctuation">{</span> code_verifier <span class="token punctuation">}</span><span class="token punctuation">)</span>

<span class="token comment">// we don't need the server anymore, stop listening</span>
server<span class="token punctuation">.</span><span class="token function">close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>tokenSet<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="full-code-example" tabindex="-1"><a class="header-anchor" href="#full-code-example" aria-hidden="true">#</a> Full code example</h2>
<p>Checkout the full code example on <a href="https://gist.github.com/kevcodez/0fa6f561315e73c26748dc847e32f113" target="_blank" rel="noopener noreferrer">Github Gist<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
