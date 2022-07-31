<template><div><p><a href="https://www.jacoco.org/" target="_blank" rel="noopener noreferrer">Jacoco<ExternalLinkIcon/></a> is the most common tool for retreiving test coverage. It supports different outputs like HTML, XML or CSV. I'd like to show you how to configure Jacoco in your Kotlin project with Gradle.</p>
<p>Let's start with a basic Gradle build file for a Kotlin project.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">mkdir</span> kotlin-gradle-jacoco
<span class="token builtin class-name">cd</span> kotlin-gradle-jacoco
gradle init
<span class="token function">mkdir</span> -p src/main/kotlin/de/kevcodez
<span class="token function">mkdir</span> -p src/test/kotlin/de/kevcodez
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>

    ext<span class="token punctuation">.</span>kotlin_version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"1.2.61"</span></span>

    repositories <span class="token punctuation">{</span>
        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

    dependencies <span class="token punctuation">{</span>
        classpath <span class="token interpolation-string"><span class="token string">"org.jetbrains.kotlin:kotlin-gradle-plugin:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">"</span></span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>

apply plugin<span class="token punctuation">:</span> <span class="token string">'kotlin'</span>
apply plugin<span class="token punctuation">:</span> <span class="token string">'idea'</span>

version <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"0.1.0"</span></span>
archivesBaseName <span class="token operator">=</span> <span class="token string">'kotlin-gradle-jacoco'</span>
group <span class="token operator">=</span> <span class="token string">'de.kevcodez'</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>

dependencies <span class="token punctuation">{</span>
    compile <span class="token interpolation-string"><span class="token string">"org.jetbrains.kotlin:kotlin-stdlib-jdk8:</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">$</span><span class="token expression">kotlin_version</span></span><span class="token string">"</span></span>
<span class="token punctuation">}</span>

compileKotlin <span class="token punctuation">{</span>
    kotlinOptions <span class="token punctuation">{</span>
        jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"1.8"</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

compileTestKotlin <span class="token punctuation">{</span>
    kotlinOptions <span class="token punctuation">{</span>
        jvmTarget <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"1.8"</span></span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Now that we've setup our basic project, we can start adding a new class.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">package</span> de<span class="token punctuation">.</span>kevcodez

<span class="token keyword">class</span> SimpleService <span class="token punctuation">{</span>

    <span class="token keyword">fun</span> <span class="token function">simpleMethod</span><span class="token punctuation">(</span>boolean<span class="token operator">:</span> Boolean<span class="token operator">?</span><span class="token punctuation">)</span><span class="token operator">:</span> Int <span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">when</span> <span class="token punctuation">{</span>
            boolean <span class="token operator">==</span> <span class="token keyword">null</span> <span class="token operator">-></span> <span class="token operator">-</span><span class="token number">1</span>
            boolean <span class="token operator">-></span> <span class="token number">1</span>
            <span class="token keyword">else</span> <span class="token operator">-></span> <span class="token number">0</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">fun</span> <span class="token function">uncoveredMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token function">println</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"foo"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">fun</span> <span class="token function">main</span><span class="token punctuation">(</span>args<span class="token operator">:</span> Array<span class="token operator">&lt;</span>String<span class="token operator">></span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">val</span> simpleService <span class="token operator">=</span> <span class="token function">SimpleService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token function">println</span><span class="token punctuation">(</span>simpleService<span class="token punctuation">.</span><span class="token function">simpleMethod</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
    simpleService<span class="token punctuation">.</span><span class="token function">uncoveredMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Obviously, we want to test the service. JUnit 5 has been released a while ago and Gradle has native support for it. We have to make a few changes to the build script.<br>
Add the following dependencies:</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>dependencies <span class="token punctuation">{</span>
    
    <span class="token punctuation">...</span>

    testImplementation <span class="token interpolation-string"><span class="token string">"org.junit.jupiter:junit-jupiter-api:5.3.0-RC1"</span></span>
    testRuntimeOnly <span class="token interpolation-string"><span class="token string">"org.junit.jupiter:junit-jupiter-engine:5.3.0-RC1"</span></span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Next, we have to tell Gradle to use the JUnit platform. Edit the test task at the end of your build file.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Great, now we can actually start writing our test.</p>
<div class="language-kotlin ext-kt line-numbers-mode"><pre v-pre class="language-kotlin"><code><span class="token keyword">package</span> de<span class="token punctuation">.</span>kevcodez

<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Assertions<span class="token punctuation">.</span>assertEquals
<span class="token keyword">import</span> org<span class="token punctuation">.</span>junit<span class="token punctuation">.</span>jupiter<span class="token punctuation">.</span>api<span class="token punctuation">.</span>Test

<span class="token keyword">class</span> SimpleServiceTest <span class="token punctuation">{</span>

    <span class="token keyword">val</span> simpleService <span class="token operator">=</span> <span class="token function">SimpleService</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

    <span class="token annotation builtin">@Test</span>
    <span class="token keyword">fun</span> <span class="token function">`simple method test`</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token keyword">val</span> result <span class="token operator">=</span> simpleService<span class="token punctuation">.</span><span class="token function">simpleMethod</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span>
        <span class="token function">assertEquals</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">,</span> result<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We got everything set up. We have a working Kotlin Project with JUnit 5. But we don't have coverage reports yet. Gradle has an official plugin for Jacoco. For the last time, we have to edit the build script.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>apply plugin<span class="token punctuation">:</span> <span class="token string">'jacoco'</span>

<span class="token punctuation">....</span>

test <span class="token punctuation">{</span>
    <span class="token function">useJUnitPlatform</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    jacoco <span class="token punctuation">{</span>
        destinationFile <span class="token operator">=</span> <span class="token function">file</span><span class="token punctuation">(</span><span class="token interpolation-string"><span class="token string">"</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span><span class="token expression">buildDir</span><span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">/jacoco/test.exec"</span></span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

jacoco <span class="token punctuation">{</span>
    <span class="token comment">// You may modify the Jacoco version here</span>
    toolVersion <span class="token operator">=</span> <span class="token interpolation-string"><span class="token string">"0.8.2"</span></span>
<span class="token punctuation">}</span>

jacocoTestReport <span class="token punctuation">{</span>
    <span class="token comment">// Adjust the output of the test report</span>
    reports <span class="token punctuation">{</span>
        xml<span class="token punctuation">.</span>enabled <span class="token boolean">true</span>
        csv<span class="token punctuation">.</span>enabled <span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>There are more options for configuring the coverage report. Take a look at the <a href="https://docs.gradle.org/current/userguide/jacoco_plugin.html" target="_blank" rel="noopener noreferrer">official plugin page<ExternalLinkIcon/></a>. After executing the <strong>test</strong> task (also included during <em>build</em> task, by default), execute the <strong>jacocoTestReport</strong> task. If it succeeds, reports are available under <em>build/reports/jacoco/test</em>. Our configuration generates a HTML report and a XML report.</p>
<p><img src="@source/posts/2018-08-19-test-coverage-in-kotlin-with-jacoco/jacoco-report.png" alt="Code Coverage with Jacoco"></p>
<p>We're done. If you want to generate the report automatically, when executing the test task, you can add the following snippet to your build script:</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>test<span class="token punctuation">.</span><span class="token function">finalizedBy</span><span class="token punctuation">(</span>jacocoTestReport<span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Check out the full source code on <a href="https://github.com/kevcodez/kotlin-jacoco-gradle" target="_blank" rel="noopener noreferrer">Github<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
