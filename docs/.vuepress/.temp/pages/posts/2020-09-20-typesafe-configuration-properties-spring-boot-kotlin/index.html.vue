<template><div><h1 id="type-safe-spring-boot-configuration-properties-with-autocomplete-using-kotlin-data-classes" tabindex="-1"><a class="header-anchor" href="#type-safe-spring-boot-configuration-properties-with-autocomplete-using-kotlin-data-classes" aria-hidden="true">#</a> Type-safe Spring Boot configuration properties with autocomplete using Kotlin data classes</h1>
<p>Spring Boot allows configuring properties for multiple environments using application properties or yml files.</p>
<p>A sample configuration file could look like this:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">my.ftp</span><span class="token punctuation">:</span>
    <span class="token key atrule">hostname</span><span class="token punctuation">:</span> foo.bar
    <span class="token key atrule">username</span><span class="token punctuation">:</span> bambino
    <span class="token key atrule">password</span><span class="token punctuation">:</span> topsecret
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>You may have multiple files like application-default.yml, application-dev.yml, application-prod.yml.
The only thing you need to do is set your active profile (i.e. &quot;prod&quot;) and Spring will automatically use that profile.
This can be done by setting SPRING_PROFILES_ACTIVE environment variable.
You can also define default properties in your application.yml (no profile suffix).</p>
<h2 id="disadvantages-of-using-value" tabindex="-1"><a class="header-anchor" href="#disadvantages-of-using-value" aria-hidden="true">#</a> Disadvantages of using <code v-pre>@Value</code></h2>
<p>To access the values depending on your environment, you may inject them using <code v-pre>@Value</code>.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">class</span> <span class="token function">MyService</span><span class="token punctuation">(</span>
    <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"\${my.ftp.hostname}"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> hostname<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"\${my.ftp.port}"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> port<span class="token operator">:</span> Int<span class="token punctuation">,</span>
    <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"\${my.ftp.username}"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> username<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token annotation builtin">@Value</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"\${my.ftp.password}"</span></span><span class="token punctuation">)</span>
    <span class="token keyword">private</span> <span class="token keyword">val</span> password<span class="token operator">:</span> String
<span class="token punctuation">)</span> <span class="token punctuation">{</span>

    <span class="token comment">// ...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Using <code v-pre>@Value</code> comes with a few disadvantages:</p>
<ul>
<li>Usage of magic strings</li>
<li>No reusability (needs to be repeated in another service again)</li>
<li>The prefix needs to be repeated (my.ftp), so changing the prefix requires changing every occurence</li>
<li>Escaping with <code v-pre>\$</code> necessary (only in Kotlin)</li>
<li>No auto complete in IntelliJ IDEA by default</li>
</ul>
<h2 id="using-kotlin-data-classes" tabindex="-1"><a class="header-anchor" href="#using-kotlin-data-classes" aria-hidden="true">#</a> Using Kotlin data classes</h2>
<p>A better alternative to using <code v-pre>@Value</code> directly is provided by the <code v-pre>@ConfigurationProperties</code> annotation.
In combination with the <code v-pre>@ConstructorBinding</code> annotation, we can even make use of Kotlin's data classes.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span>ConfigurationProperties
<span class="token keyword">import</span> org<span class="token punctuation">.</span>springframework<span class="token punctuation">.</span>boot<span class="token punctuation">.</span>context<span class="token punctuation">.</span>properties<span class="token punctuation">.</span>ConstructorBinding

<span class="token annotation builtin">@ConfigurationProperties</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"my.ftp"</span></span><span class="token punctuation">)</span>
<span class="token annotation builtin">@ConstructorBinding</span>
<span class="token keyword">data</span> <span class="token keyword">class</span> MyFtpConfig <span class="token punctuation">{</span>
    <span class="token keyword">val</span> hostname<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> port<span class="token operator">:</span> Int<span class="token punctuation">,</span>
    <span class="token keyword">val</span> username<span class="token operator">:</span> String<span class="token punctuation">,</span>
    <span class="token keyword">val</span> password<span class="token operator">:</span> String
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This comes with a few advantages:</p>
<ul>
<li>Immutability out-of-the-box</li>
<li>Prefix (my.ftp) is only defined once</li>
<li>Easy reusability</li>
<li>No need to define the properties configuration name as the data class property name will be mapped automatically (Spring supports CamelCase, SnakeCase, ...)</li>
</ul>
<p>Please note that you have to define all your <code v-pre>@ConfigurationProperties</code> classes in your main application class (entry point of your Spring Boot app).</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@SpringBootApplication</span>
<span class="token annotation builtin">@EnableConfigurationProperties</span><span class="token punctuation">(</span>MyFtpConfig<span class="token operator">::</span><span class="token keyword">class</span><span class="token punctuation">)</span>
<span class="token keyword">class</span> MyApplication <span class="token punctuation">{</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Alternatively, you can use <code v-pre>@ConfigurationPropertiesScan</code>.</p>
<h2 id="auto-complete-in-intellij" tabindex="-1"><a class="header-anchor" href="#auto-complete-in-intellij" aria-hidden="true">#</a> Auto complete in IntelliJ</h2>
<p>To get autocompletion in your application files in IntelliJ IDEA, you have to use <a href="https://kotlinlang.org/docs/reference/kapt.html" target="_blank" rel="noopener noreferrer">KAPT - Kotlin Annotation Processing<ExternalLinkIcon/></a>.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">'kotlin-kapt'</span>

dependencies <span class="token punctuation">{</span>
    <span class="token comment">// ...</span>
    kapt <span class="token interpolation-string"><span class="token string">"org.springframework.boot:spring-boot-configuration-processor:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">springBootVersion</span></span><span class="token string">"</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Make sure to rebuild your project after adding the plugin.
KAPT will process the annotations and generate metadata based on your configuration properties.
IntelliJ uses that metadata to enable autocompletion.</p>
<h2 id="value-validation" tabindex="-1"><a class="header-anchor" href="#value-validation" aria-hidden="true">#</a> Value Validation</h2>
<p>Spring supports validating configuration properties using <a href="https://beanvalidation.org/1.0/spec/" target="_blank" rel="noopener noreferrer">JSR-303 - Bean Validation Spec<ExternalLinkIcon/></a>.
If the validation fails, the application will not start and you'll get an error message.
This way you can avoid common misconfiguration and make sure your app doesn't get runtime errors when executing actual business logic.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token annotation builtin">@Min</span><span class="token punctuation">(</span><span class="token number">1025</span><span class="token punctuation">)</span>
<span class="token annotation builtin">@Max</span><span class="token punctuation">(</span><span class="token number">65536</span><span class="token punctuation">)</span>
<span class="token keyword">private</span> <span class="token keyword">val</span> port<span class="token operator">:</span> Int
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
