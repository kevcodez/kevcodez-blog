<template><div><h1 id="secure-your-spring-boot-app-with-json-web-tokens-and-oauth-2-0-provided-by-aws-cognito" tabindex="-1"><a class="header-anchor" href="#secure-your-spring-boot-app-with-json-web-tokens-and-oauth-2-0-provided-by-aws-cognito" aria-hidden="true">#</a> Secure your Spring Boot App with Json Web Tokens and OAuth 2.0 provided by AWS Cognito</h1>
<p>Personally, I hate this topic.
I do it every few years and by then I have forgotten everything I knew about <a href="https://www.oauth.com/" target="_blank" rel="noopener noreferrer">OAuth<ExternalLinkIcon/></a> flows and the confusion begins again.</p>
<p>This tutorial assumes that you separate your login app from your Spring Boot service and only want to verify the tokens and scopes in the app.
Additionaly, I assume you have already set up <a href="https://aws.amazon.com/cognito/" target="_blank" rel="noopener noreferrer">AWS Cognito<ExternalLinkIcon/></a> and are able to generate access tokens.</p>
<p>There are quite a few articles about Spring and OAuth.
However, Spring Security advances fast and things get outdated quickly.</p>
<p>Since there are many good articles about OAuth/AWS Cognito Setup out there, I am going to get into the code right away.</p>
<h2 id="basic-setup" tabindex="-1"><a class="header-anchor" href="#basic-setup" aria-hidden="true">#</a> Basic setup</h2>
<p>Let's quickly initialize a new project using the great <a href="https://start.spring.io/" target="_blank" rel="noopener noreferrer">Spring Initializr<ExternalLinkIcon/></a>.</p>
<p>Again, we only want to <em>verify</em> the tokens sent to our application and make sure the user is authenticated and has the proper roles to execute function.</p>
<p>We do <em>not</em> want to create custom login pages or anything similar in this tutorial.</p>
<p><img src="@source/posts/2020-03-26-secure-spring-boot-app-with-oauth2-aws-cognito/spring_init.png" alt="alt text"></p>
<p>We need the following modules:</p>
<ul>
<li>Spring-Security</li>
<li>Spring Web</li>
<li>OAuth2 Resource Server</li>
</ul>
<p>To test the authorization, let us create a very simple controller:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>GetMapping
<span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>web<span class="token punctuation">.</span>bind<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>RestController

<span class="token annotation builtin">@RestController</span>
<span class="token keyword">class</span> TestController <span class="token punctuation">{</span>
    
    <span class="token annotation builtin">@GetMapping</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"/hello"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">fun</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">"I am authenticated"</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's configure spring, so we can actually verify tokens and make sure the user is authenticated.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">spring</span><span class="token punctuation">:</span>
  <span class="token key atrule">security</span><span class="token punctuation">:</span>
    <span class="token key atrule">oauth2</span><span class="token punctuation">:</span>
      <span class="token key atrule">resourceserver</span><span class="token punctuation">:</span>
        <span class="token key atrule">jwt</span><span class="token punctuation">:</span>
          <span class="token key atrule">issuer-uri</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//cognito<span class="token punctuation">-</span>idp.&lt;aws<span class="token punctuation">-</span>region<span class="token punctuation">></span>.amazonaws.com/&lt;cognito<span class="token punctuation">-</span>pool<span class="token punctuation">-</span>id<span class="token punctuation">></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can find your cognito pool id under <strong>General Settings &gt; Pool Id</strong>.</p>
<p>That's it.
Crazy right?</p>
<p>AWS Cognito provides informations about endpoints and public certificates under the URL <code v-pre>https://cognito-idp.*aws-region*.amazonaws.com/*pool-id*/.well-known/openid-configuration#</code>.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
   <span class="token property">"authorization_endpoint"</span><span class="token operator">:</span><span class="token string">"https://xx.auth.eu-central-1.amazoncognito.com/oauth2/authorize"</span><span class="token punctuation">,</span>
   <span class="token property">"id_token_signing_alg_values_supported"</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token string">"RS256"</span>
   <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token property">"issuer"</span><span class="token operator">:</span><span class="token string">"https://cognito-idp.eu-central-1.amazonaws.com/eu-central-xx"</span><span class="token punctuation">,</span>
   <span class="token property">"jwks_uri"</span><span class="token operator">:</span><span class="token string">"https://cognito-idp.eu-central-1.amazonaws.com/eu-central-xx/.well-known/jwks.json"</span><span class="token punctuation">,</span>
   <span class="token property">"response_types_supported"</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token string">"code"</span><span class="token punctuation">,</span>
      <span class="token string">"token"</span>
   <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token property">"scopes_supported"</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token string">"openid"</span><span class="token punctuation">,</span>
      <span class="token string">"email"</span><span class="token punctuation">,</span>
      <span class="token string">"phone"</span><span class="token punctuation">,</span>
      <span class="token string">"profile"</span>
   <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token property">"subject_types_supported"</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token string">"public"</span>
   <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token property">"token_endpoint"</span><span class="token operator">:</span><span class="token string">"https://xx.auth.eu-central-1.amazoncognito.com/oauth2/token"</span><span class="token punctuation">,</span>
   <span class="token property">"token_endpoint_auth_methods_supported"</span><span class="token operator">:</span><span class="token punctuation">[</span>
      <span class="token string">"client_secret_basic"</span><span class="token punctuation">,</span>
      <span class="token string">"client_secret_post"</span>
   <span class="token punctuation">]</span><span class="token punctuation">,</span>
   <span class="token property">"userinfo_endpoint"</span><span class="token operator">:</span><span class="token string">"https://xx.auth.eu-central-1.amazoncognito.com/oauth2/userInfo"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Spring will fetch all the necessary information needed to verify tokens on startup.
The tokens are encrypted with an RSA signature with SHA-256.
The public key is enough to verify the tokens are legit.</p>
<p>Let's verify it is actually working.</p>
<p>When requesting the endpoint without any authorization, we should run into 401 unauthorized.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -o /dev/null -s -w <span class="token string">"%{http_code}<span class="token entity" title="\n">\n</span>"</span> http://localhost:8080/hello

<span class="token number">401</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As mentioned earlier, I expect you to have a setup where you can actually get access tokens.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> -o /dev/null -s -w <span class="token string">"%{http_code}<span class="token entity" title="\n">\n</span>"</span> -H <span class="token string">"Authorization: Bearer ey..."</span> http://localhost:8080/hello

<span class="token number">200</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Tokens get verified and we can access the endpoint.</p>
<h3 id="check-user-groups" tabindex="-1"><a class="header-anchor" href="#check-user-groups" aria-hidden="true">#</a> Check user groups</h3>
<p>If you want to verify that a user is in a specific group, you need to configure a little bit to let Spring know how to extract the roles out of the Cognito json web tokens.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@EnableWebSecurity</span>
<span class="token keyword">class</span> MyCustomSecurityConfiguration <span class="token operator">:</span> <span class="token function">WebSecurityConfigurerAdapter</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">override</span> <span class="token keyword">fun</span> <span class="token function">configure</span><span class="token punctuation">(</span>http<span class="token operator">:</span> HttpSecurity<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        http
            <span class="token punctuation">.</span><span class="token function">authorizeRequests</span> <span class="token punctuation">{</span> authorize <span class="token operator">-></span>
                authorize
                    <span class="token punctuation">.</span><span class="token function">anyRequest</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">authenticated</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">.</span><span class="token function">oauth2ResourceServer</span> <span class="token punctuation">{</span> oauth2 <span class="token operator">-></span>
                oauth2
                    <span class="token punctuation">.</span><span class="token function">jwt</span> <span class="token punctuation">{</span> jwt <span class="token operator">-></span>
                        jwt<span class="token punctuation">.</span><span class="token function">jwtAuthenticationConverter</span><span class="token punctuation">(</span><span class="token function">grantedAuthoritiesExtractor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
                    <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">private</span> <span class="token keyword">fun</span> <span class="token function">grantedAuthoritiesExtractor</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> JwtAuthenticationConverter <span class="token punctuation">{</span>
        <span class="token keyword">val</span> jwtAuthenticationConverter <span class="token operator">=</span> <span class="token function">JwtAuthenticationConverter</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

        jwtAuthenticationConverter<span class="token punctuation">.</span><span class="token function">setJwtGrantedAuthoritiesConverter</span> <span class="token punctuation">{</span> jwt <span class="token operator">-></span>
            <span class="token keyword">val</span> list<span class="token operator">:</span> List<span class="token operator">&lt;</span>String<span class="token operator">></span> <span class="token operator">=</span> jwt<span class="token punctuation">.</span>claims<span class="token punctuation">.</span><span class="token function">getOrDefault</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"cognito:groups"</span></span><span class="token punctuation">,</span> emptyList<span class="token operator">&lt;</span>String<span class="token operator">></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">as</span> List<span class="token operator">&lt;</span>String<span class="token operator">></span>

            <span class="token keyword">return</span><span class="token label symbol">@setJwtGrantedAuthoritiesConverter</span> list
                <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> obj<span class="token operator">:</span> Any <span class="token operator">-></span> obj<span class="token punctuation">.</span><span class="token function">toString</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">}</span>
                <span class="token punctuation">.</span><span class="token function">map</span> <span class="token punctuation">{</span> role <span class="token operator">-></span> <span class="token function">SimpleGrantedAuthority</span><span class="token punctuation">(</span>role<span class="token punctuation">)</span> <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>

        <span class="token keyword">return</span> jwtAuthenticationConverter
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You can now get the assigned roles by accessing the security context holder:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code>SecurityContextHolder<span class="token punctuation">.</span><span class="token function">getContext</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>authentication<span class="token punctuation">.</span>authorities
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>If you want to be a able to annotate your methods to secure them like this:</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@GetMapping</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"/hello"</span></span><span class="token punctuation">)</span>
<span class="token annotation builtin">@PreAuthorize</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"hasAuthority('user')"</span></span><span class="token punctuation">)</span>
<span class="token keyword">fun</span> <span class="token function">hello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> String <span class="token punctuation">{</span>
    <span class="token keyword">return</span> <span class="token string-literal singleline"><span class="token string">"I am authenticated"</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You need to enable global method security.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>context<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>Configuration
<span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>method<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span>EnableGlobalMethodSecurity
<span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>security<span class="token punctuation">.</span>config<span class="token punctuation">.</span>annotation<span class="token punctuation">.</span>method<span class="token punctuation">.</span>configuration<span class="token punctuation">.</span>GlobalMethodSecurityConfiguration

<span class="token annotation builtin">@Configuration</span>
<span class="token annotation builtin">@EnableGlobalMethodSecurity</span><span class="token punctuation">(</span>prePostEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> securedEnabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">,</span> jsr250Enabled <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> MethodSecurityConfig <span class="token operator">:</span> <span class="token function">GlobalMethodSecurityConfiguration</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That was pretty quick to setup right?</p>
<p>You can find the source on <a href="https://github.com/kevcodez/spring-boot-2.3-oauth2-aws-cognito" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>.</p>
<p>Another guide that might help you with Spring Boot/JWT/Authentication:</p>
<p><a href="https://www.toptal.com/spring/spring-security-tutorial" target="_blank" rel="noopener noreferrer">Spring Security with JWT for REST API on toptal.com<ExternalLinkIcon/></a></p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
