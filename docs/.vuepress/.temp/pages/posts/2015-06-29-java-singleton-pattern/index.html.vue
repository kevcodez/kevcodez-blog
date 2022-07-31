<template><div><p>Wikipedia definiert einen Singleton folgendermaßen</p>
<blockquote>
<p>Das <strong>Singleton</strong> (selten auch <strong>Einzelstück</strong> genannt) ist ein in der Softwareentwicklung eingesetztes Entwurfsmuster und [...] stellt sicher, dass von einer Klasse genau ein Objekt existiert. Dieses Singleton ist darüber hinaus üblicherweise global verfügbar.</p>
<p>Das Singleton findet Verwendung, wenn</p>
<ul>
<li>nur ein Objekt zu einer Klasse existieren darf und ein einfacher Zugriff auf dieses Objekt benötigt wird oder</li>
<li>das einzige Objekt durch Unterklassenbildung spezialisiert werden soll.</li>
</ul>
</blockquote>
<p>Bei einer Singleton-Klasse sollte defintiv sichergestellt werden, dass der Client das Objekt nicht neu instanziieren kann. Für die Umsetzung des Java Singleton Pattern gibt gibt es generell zwei Möglichkeiten, die ich euch mit den folgenden Code-Beispielen aufzeigen möchte.</p>
<h2 id="moglichkeit-1" tabindex="-1"><a class="header-anchor" href="#moglichkeit-1" aria-hidden="true">#</a> Möglichkeit #1</h2>
<p>Eine <strong>Static-Factory-Methode</strong> zum wiedergeben der bereits vorhandenen Instanz...Ganz wichtig, wie bereits erwähnt, der private Konstruktor...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">SingletonClass</span> <span class="token punctuation">{</span>

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">SingletonClass</span> INSTANCE <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">SingletonInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">// Privater Konstruktor, ganz wichtig, damit diese Klasse nicht manuell instanziiert werden kann!</span>
<span class="token keyword">private</span> <span class="token class-name">SingletonClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">// Gibt die einmalige Instanz der Singleton-Klasse wieder</span>
<span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">SingletonClass</span> <span class="token function">getInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> INSTANCE<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="moglichkeit-2-empfohlen" tabindex="-1"><a class="header-anchor" href="#moglichkeit-2-empfohlen" aria-hidden="true">#</a> Möglichkeit #2 (Empfohlen)</h2>
<p>Die zweite Möglichkeit, die ich allerdings noch nie in einem Produktivsystem gesehen habe, wobei nichts für mich dagegen spricht, ist die Erstellung eines <strong>Enums</strong> mit einem einzigen Typen. Enums können sowieso nur statisch aufgerufen werden. Der Enum hat einen einzigen Typen, über den dann sämtliche Methoden ausgeführt werden.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">enum</span> <span class="token class-name">SingletonClass</span> <span class="token punctuation">{</span>

INSTANCE<span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token punctuation">.</span><span class="token punctuation">.</span><span class="token punctuation">.</span> <span class="token punctuation">}</span>

<span class="token comment">// Weitere Methoden</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Diese Methode bietet mehrere Vorteile</p>
<ul>
<li>Bietet eine einfachere Möglichkeit der <strong>Serialisierung</strong></li>
<li>Garantiert absolut, dass nur eine Instanz existiert, selbst bei Reflection, somit die <strong>sicherste</strong> <strong>Methode</strong></li>
<li>Einfache und schnelle Implementierung</li>
</ul>
<p>Genutzt wird dieser Enum dann wie jeder andere...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">SingletonClass</span><span class="token punctuation">.</span>INSTANCE<span class="token punctuation">.</span><span class="token function">otherMethod</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><hr>
<p>Dieser Artikel nimmt sich Effective Java - Second Edition von Joshua Bloch als Vorbild in dem diese Vorschläge zum Java Singleton Pattern vorgeschlagen werden. Weitere Details zum Buch findet ihr unter <RouterLink to="/books/effective-java/">Effective Java - Second Edition von Joshua Bloch</RouterLink>.</p>
<p><a href="https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&amp;camp=1638&amp;creative=6742&amp;creativeASIN=0321356683&amp;linkCode=as2&amp;tag=kevc01-21&amp;linkId=SEPB46CIBCWK6MWL" target="_blank" rel="noopener noreferrer"><img src="/effective-java.jpg" alt="Effective Java - Second Edition" title="Effective Java - Second Edition"><ExternalLinkIcon/></a></p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
