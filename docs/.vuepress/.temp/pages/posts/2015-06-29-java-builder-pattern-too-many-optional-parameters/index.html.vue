<template><div><h2 id="java-builder-pattern-introduction" tabindex="-1"><a class="header-anchor" href="#java-builder-pattern-introduction" aria-hidden="true">#</a> Java Builder-Pattern - Introduction</h2>
<p>I recently blogged about <RouterLink to="/posts/2015-06-29-alternative-zum-java-konstruktor-static-factory-methods/">Static Factory Methods</RouterLink>.
Constructors and static factory methods have on thing in common: There are both not optimal, when having too many (optional) parameters.</p>
<h2 id="telescoping-constructor-pattern" tabindex="-1"><a class="header-anchor" href="#telescoping-constructor-pattern" aria-hidden="true">#</a> Telescoping-Constructor-Pattern</h2>
<p>Let's take a simple Person-class with a <strong>Telescoping-Constructor-Pattern</strong>, which has multiple constructors to offer different ways to initiate the class.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> streetAddress<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">String</span> country<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> country<span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">String</span> streetAdress<span class="token punctuation">,</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">,</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">(</span>firstName<span class="token punctuation">,</span> lastName<span class="token punctuation">,</span> streetAdress<span class="token punctuation">,</span> streetNumber<span class="token punctuation">,</span> zipCode<span class="token punctuation">,</span> <span class="token keyword">null</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">,</span> <span class="token class-name">String</span> streetAddress<span class="token punctuation">,</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">,</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">,</span> <span class="token class-name">String</span> country<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>streetAddress <span class="token operator">=</span> streetAddress<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>streetNumber <span class="token operator">=</span> streetNumber<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>zipCode <span class="token operator">=</span> zipCode<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>country <span class="token operator">=</span> country<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
  <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This pattern has a couple of disadvantages:</p>
<ol>
<li>Bad readability due to the amount constructors</li>
<li>Decreased maintainability</li>
</ol>
<h2 id="javabeans-pattern" tabindex="-1"><a class="header-anchor" href="#javabeans-pattern" aria-hidden="true">#</a> JavaBeans-Pattern</h2>
<p>An alternative is the <strong>JavaBeans-Pattern</strong>, where each member has a Getter and the class has an empty constructor.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> streetAddress<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
  <span class="token punctuation">}</span>

  <span class="token operator">/</span>\<span class="token operator">*</span> <span class="token class-name">Getter</span> <span class="token operator">&amp;</span> <span class="token class-name">Setter</span> \<span class="token operator">*</span><span class="token operator">/</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We may construct and use the class like this:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">setFirstName</span><span class="token punctuation">(</span><span class="token string">"First Name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">setLastName</span><span class="token punctuation">(</span><span class="token string">"Last Name"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
person<span class="token punctuation">.</span><span class="token function">setCountry</span><span class="token punctuation">(</span><span class="token string">"Country"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This solves the problems of the <strong>Telescoping-Constructor-Pattern</strong> with improved readability. However, this pattern allows inconsistency by splitting up the construction and value assignment. A easy-to-implement and good way to solve this, is using the <strong>Builder-Pattern</strong>.</p>
<h2 id="java-builder-pattern" tabindex="-1"><a class="header-anchor" href="#java-builder-pattern" aria-hidden="true">#</a> Java Builder-Pattern</h2>
<p>Rather than instantiating the class directly, the client calls a constructor or static factory method and in return gets a Builder object. The client can now use setter-like methods to fill the optional parameters. To get the actual initiated object, the client calls the build() method.</p>
<p>Let's implement a simple builder pattern with out person class.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Person</span>
<span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span> <span class="token comment">// required</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> streetAddress<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">Builder</span>
  <span class="token punctuation">{</span>

    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> firstName<span class="token punctuation">;</span> <span class="token comment">// required</span>
    <span class="token keyword">private</span> <span class="token keyword">final</span> <span class="token class-name">String</span> lastName<span class="token punctuation">;</span> <span class="token comment">// required</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> streetAddress<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> streetNumber<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> zipCode<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token class-name">String</span> country<span class="token punctuation">;</span>

    <span class="token comment">// Constructor of the builder contains the required members</span>
    <span class="token keyword">public</span> <span class="token class-name">Builder</span><span class="token punctuation">(</span><span class="token class-name">String</span> firstName<span class="token punctuation">,</span> <span class="token class-name">String</span> lastName<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> firstName<span class="token punctuation">;</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> lastName<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">streetAddress</span><span class="token punctuation">(</span><span class="token class-name">String</span> streetAddress<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>streetAddress <span class="token operator">=</span> streetAddress<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">streetNumber</span><span class="token punctuation">(</span><span class="token class-name">String</span> streetNumber<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>streetNumber <span class="token operator">=</span> streetNumber<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">zipCode</span><span class="token punctuation">(</span><span class="token class-name">String</span> zipCode<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>zipCode <span class="token operator">=</span> zipCode<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">public</span> <span class="token class-name">Builder</span> <span class="token function">country</span><span class="token punctuation">(</span><span class="token class-name">String</span> country<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">this</span><span class="token punctuation">.</span>country <span class="token operator">=</span> country<span class="token punctuation">;</span>
      <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token annotation punctuation">@Override</span>
    <span class="token keyword">public</span> <span class="token class-name">Person</span> <span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
      <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token keyword">this</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

  <span class="token punctuation">}</span>

  <span class="token keyword">private</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token class-name">Builder</span> builder<span class="token punctuation">)</span>
  <span class="token punctuation">{</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>firstName <span class="token operator">=</span> builder<span class="token punctuation">.</span>firstName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>lastName <span class="token operator">=</span> builder<span class="token punctuation">.</span>lastName<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>streetAddress <span class="token operator">=</span> builder<span class="token punctuation">.</span>streetAddress<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>streetNumber <span class="token operator">=</span> builder<span class="token punctuation">.</span>streetNumber<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>zipCode <span class="token operator">=</span> builder<span class="token punctuation">.</span>zipCode<span class="token punctuation">;</span>
    <span class="token keyword">this</span><span class="token punctuation">.</span>country <span class="token operator">=</span> builder<span class="token punctuation">.</span>country<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The constructor is private by intention to allow the user to only use the builder.</p>
<p>To create a person, we can now use the builder like this:</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Person</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token string">"Kevin"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">country</span><span class="token punctuation">(</span><span class="token string">"Deutschland"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> person2 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token string">"Kevin"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token class-name">Person</span> person3 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token string">"Kevin"</span><span class="token punctuation">,</span> <span class="token string">"G"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">streetAddress</span><span class="token punctuation">(</span><span class="token string">"Adresse"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">streetNumber</span><span class="token punctuation">(</span><span class="token string">"4"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">zipCode</span><span class="token punctuation">(</span><span class="token string">"21220"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">country</span><span class="token punctuation">(</span><span class="token string">"Deutschland"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>As you can see, the <strong>Java</strong> <strong>Builder-Pattern</strong> has advantages over the <strong>Constructors</strong> and <strong>Static Factory Methods</strong>, if we have a lot of parameters.</p>
<p>This post was inspired by <a href="https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&amp;camp=1638&amp;creative=6742&amp;creativeASIN=0321356683&amp;linkCode=as2&amp;tag=kevc01-21&amp;linkId=SEPB46CIBCWK6MWL" target="_blank" rel="noopener noreferrer">Effective Java - Second Edition von Joshua Bloch<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
