<template><div><h1 id="using-an-aws-s3-bucket-as-your-maven-repository-in-a-gradle-project" tabindex="-1"><a class="header-anchor" href="#using-an-aws-s3-bucket-as-your-maven-repository-in-a-gradle-project" aria-hidden="true">#</a> Using an AWS S3 Bucket as your Maven repository in a Gradle project</h1>
<p>At our company, we are currently redoing our entire application infrastructure.
One of our big goals is to get rid of every self-managed instance.</p>
<p>We already have dockerized applications and use <a href="https://aws.amazon.com/ecs/" target="_blank" rel="noopener noreferrer">ECS<ExternalLinkIcon/></a>.
Application Docker images are stored in <a href="https://aws.amazon.com/ecr" target="_blank" rel="noopener noreferrer">Amazons Elastic Container Registry<ExternalLinkIcon/></a>.</p>
<p>Our services share a few libraries that are published to a Maven repository.
Until recently, we were using a self-hosted <a href="https://de.sonatype.com/product-nexus-repository" target="_blank" rel="noopener noreferrer">Sonatype Nexus<ExternalLinkIcon/></a>.
That means, we had to apply system updates, kernel upgrades and reboots, keep nexus up2date, ...
To simply host a few artifacts, this felt like too much trouble.</p>
<p>All of our Kotlin-based services use Gradle as a build tool.</p>
<p>We were looking into a solution that meets the following requirements:</p>
<ul>
<li>No self-managed instance, that we need to host/maintain</li>
<li>Cost-effective</li>
<li>Ability to privately access the artifacts, since they are not meant for the public</li>
<li>Support for Gradle</li>
</ul>
<p>We decided to use <a href="https://aws.amazon.com/s3" target="_blank" rel="noopener noreferrer">Amazons Cloud Object Storage S3<ExternalLinkIcon/></a> to host our artifacts.</p>
<h2 id="things-to-consider-when-creating-your-s3-bucket" tabindex="-1"><a class="header-anchor" href="#things-to-consider-when-creating-your-s3-bucket" aria-hidden="true">#</a> Things to consider when creating your S3 bucket</h2>
<p>Your S3 bucket should have a private ACL, so by default, your artifacts cannot be read or written without being authenticated.</p>
<p>Create atleast two different access groups:</p>
<ul>
<li>One that is allowed to read (all your developers should have that role) to access the artifacts</li>
<li>One that is allowed to write (your CI, in case it is used for publishing), to publish artifacts</li>
</ul>
<h2 id="publishing-artifacts-to-s3" tabindex="-1"><a class="header-anchor" href="#publishing-artifacts-to-s3" aria-hidden="true">#</a> Publishing artifacts to S3</h2>
<p>AWS access keys are used to publish and retrieve artifacts.
We'll start by defining the access key/secret as variables.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>buildscript <span class="token punctuation">{</span>
    ext <span class="token punctuation">{</span>
        <span class="token punctuation">...</span>

        awsAccessKeyId <span class="token operator">=</span> System<span class="token punctuation">.</span>env<span class="token punctuation">.</span>AWS_ACCESS_KEY_ID <span class="token operator">?:</span> <span class="token function">findProperty</span><span class="token punctuation">(</span><span class="token string">'aws_access_key_id'</span><span class="token punctuation">)</span>
        awsSecretAccessKey <span class="token operator">=</span> System<span class="token punctuation">.</span>env<span class="token punctuation">.</span>AWS_SECRET_ACCESS_KEY <span class="token operator">?:</span> <span class="token function">findProperty</span><span class="token punctuation">(</span><span class="token string">'aws_secret_access_key'</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    <span class="token punctuation">...</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Gradle will first attempt to get the access key/secret from environment variables.
If they cannot be found, it falls back to Gradles built-in <a href="https://docs.gradle.org/current/javadoc/org/gradle/api/Project.html#findProperty-java.lang.String-" target="_blank" rel="noopener noreferrer">findProperty-Function<ExternalLinkIcon/></a>.
That function will check the project's gradle properties, global gradle properties and so on.</p>
<p>The <code v-pre>maven-publish</code> plugin has built-in support for publishing artifacts to a S3 bucket.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>apply plugin <span class="token string">'maven-publish'</span>

repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    repositories <span class="token punctuation">{</span>
        maven <span class="token punctuation">{</span>
            url <span class="token operator">=</span> s3ArtifactsUrl
            <span class="token function">credentials</span><span class="token punctuation">(</span>AwsCredentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                accessKey <span class="token operator">=</span> awsAccessKeyId
                secretKey <span class="token operator">=</span> awsSecretAccessKey
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

publishing <span class="token punctuation">{</span>
    publications <span class="token punctuation">{</span>
        <span class="token punctuation">...</span>
    <span class="token punctuation">}</span>
    repositories <span class="token punctuation">{</span>
        maven <span class="token punctuation">{</span>
            url <span class="token operator">=</span> s3ArtifactsUrl
            <span class="token function">credentials</span><span class="token punctuation">(</span>AwsCredentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
                accessKey <span class="token operator">=</span> awsAccessKeyId
                secretKey <span class="token operator">=</span> awsSecretAccessKey
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That is all you need to configure to publish artifacts to an S3 bucket.</p>
<p>You can now publish artifacts by executing the <code v-pre>publish</code> task.</p>
<div class="language-text ext-text line-numbers-mode"><pre v-pre class="language-text"><code>./gradlew clean build publish -Paws_access_key_id=$ACCESS_KEY -Paws_secret_access_key=$SECRET_ACCESS_KEY
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>This can obviously run in your Continuous Integration.</p>
<h2 id="accessing-the-artifacts-in-gradle" tabindex="-1"><a class="header-anchor" href="#accessing-the-artifacts-in-gradle" aria-hidden="true">#</a> Accessing the artifacts in Gradle</h2>
<p>To use the S3 repository in any Gradle project and access the artifacts, we need to modify the Gradle build file.
Fortunately, Gradle supports S3 buckets as Maven repositories out-of-the-box.</p>
<div class="language-groovy ext-groovy line-numbers-mode"><pre v-pre class="language-groovy"><code>repositories <span class="token punctuation">{</span>
    <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    maven <span class="token punctuation">{</span>
        url <span class="token operator">=</span> <span class="token string">'s3://&lt;your-s3-bucket-name>/releases'</span>
        <span class="token function">credentials</span><span class="token punctuation">(</span>AwsCredentials<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            accessKey <span class="token operator">=</span> System<span class="token punctuation">.</span>env<span class="token punctuation">.</span>AWS_ACCESS_KEY_ID <span class="token operator">?:</span> <span class="token function">findProperty</span><span class="token punctuation">(</span><span class="token string">'aws_access_key_id'</span><span class="token punctuation">)</span>
            secretKey <span class="token operator">=</span> System<span class="token punctuation">.</span>env<span class="token punctuation">.</span>AWS_SECRET_ACCESS_KEY <span class="token operator">?:</span> <span class="token function">findProperty</span><span class="token punctuation">(</span><span class="token string">'aws_secret_access_key'</span><span class="token punctuation">)</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>That's it. There is no need to configure anything else here.</p>
<h2 id="configuring-the-access-key-secret" tabindex="-1"><a class="header-anchor" href="#configuring-the-access-key-secret" aria-hidden="true">#</a> Configuring the access key/secret</h2>
<p>You have a bunch of options to configure the access key/secret.</p>
<p>Environment variables</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token builtin class-name">export</span> <span class="token assign-left variable">AWS_ACCESS_KEY_ID</span><span class="token operator">=</span>foo
<span class="token builtin class-name">export</span> <span class="token assign-left variable">AWS_SECRET_ACCESS_KEY</span><span class="token operator">=</span>bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>Edit your projects gradle.properties file.</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">AWS_ACCESS_KEY_ID</span><span class="token punctuation">=</span><span class="token value attr-value">foo</span>
<span class="token key attr-name">AWS_SECRET_ACCESS_KEY</span><span class="token punctuation">=</span><span class="token value attr-value">bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><hr>
<p>Edit your global gradle.properties file in your users folder (<code v-pre>~/.gradle/gradle.properties</code>).</p>
<div class="language-properties ext-properties line-numbers-mode"><pre v-pre class="language-properties"><code><span class="token key attr-name">AWS_ACCESS_KEY_ID</span><span class="token punctuation">=</span><span class="token value attr-value">foo</span>
<span class="token key attr-name">AWS_SECRET_ACCESS_KEY</span><span class="token punctuation">=</span><span class="token value attr-value">bar</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="conclusion" tabindex="-1"><a class="header-anchor" href="#conclusion" aria-hidden="true">#</a> Conclusion</h2>
<p>We got rid of the self-managed nexus instance, are able to access private artifacts and have some cost-effective way to storage everything.</p>
<p>Special thanks to my <a href="https://github.com/cc-jhr" target="_blank" rel="noopener noreferrer">colleague<ExternalLinkIcon/></a> who set up everything, I am just writing this up.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
