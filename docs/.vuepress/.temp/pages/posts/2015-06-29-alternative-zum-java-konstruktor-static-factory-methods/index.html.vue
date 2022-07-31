<template><div><h2 id="einleitung" tabindex="-1"><a class="header-anchor" href="#einleitung" aria-hidden="true">#</a> Einleitung</h2>
<p>Als Vorbild dieses Artikels dient <a href="https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&amp;camp=1638&amp;creative=6742&amp;creativeASIN=0321356683&amp;linkCode=as2&amp;tag=kevc01-21&amp;linkId=SEPB46CIBCWK6MWL" target="_blank" rel="noopener noreferrer">Effective Java - Secondary Edition by Joshua Bloch<ExternalLinkIcon/></a>. Der normale Weg ein Objekt zu instanziieren ist es, einen Konstruktor aufzurufen. Neben dem herkömmlichen Java Konstruktor solltest du dich jedoch auch mal mit <strong>Static Factory Methods</strong> beschäftigen.</p>
<h2 id="beispiel" tabindex="-1"><a class="header-anchor" href="#beispiel" aria-hidden="true">#</a> Beispiel</h2>
<p>Ein Beispiel für eine solche Methode bietet die Boolean-Klasse.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">Boolean</span> <span class="token function">valueOf</span><span class="token punctuation">(</span><span class="token keyword">boolean</span> b<span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token keyword">return</span> b <span class="token operator">?</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span>TRUE <span class="token operator">:</span> <span class="token class-name">Boolean</span><span class="token punctuation">.</span>FALSE<span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>Static Factory Methods</strong> können natürlich parallel zum Konstruktor bestehen. Vielleicht fragst du dich jetzt, wozu das Ganze?</p>
<h2 id="vorteile" tabindex="-1"><a class="header-anchor" href="#vorteile" aria-hidden="true">#</a> Vorteile</h2>
<p>Folgende Vorteile bieten <strong>Static Factory Methods</strong>...</p>
<ol>
<li>Im Gegensatz zu Konstruktoren, kann ein Name frei gewählt werden. Wenn du jetzt 5 verschieden parametrisierte Konstruktoren hast, wird es für einen externen Entwickler etwas schwierig, den richtigen Konstruktor zu wählen. Wenn die Methoden zur Instanziierung jedoch eindeutig benamt sind, wird es hier keine Probleme geben.</li>
<li>Static Factory Methods müssen nicht zwingend immer eine neue Instanz eines Objekt erstellen</li>
<li>Der Rückgabetyp ist frei definierbar und kann demnach auch eine Subklasse sein</li>
<li>Reduziert den geschriebenen Code bei parametrisierten Typ-Instanzen</li>
</ol>
<p>Ein Beispiel für Punkt 4 ist das java.util.Map-Interface...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Mit einer Static Factory Method wäre folgendes möglich...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span> <span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

<span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">K</span><span class="token punctuation">,</span> <span class="token class-name">V</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Dadurch können wir die HashMap nun folgendermaßen instanziieren...</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">Integer</span><span class="token punctuation">,</span> <span class="token class-name">List</span><span class="token punctuation">></span></span> map <span class="token operator">=</span> <span class="token class-name">HashMap</span><span class="token punctuation">.</span><span class="token function">createInstance</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="nachteile" tabindex="-1"><a class="header-anchor" href="#nachteile" aria-hidden="true">#</a> Nachteile</h2>
<p>Das klingt natürlich alles schön und gut...aber <strong>Static Factory Methods</strong> bringen natürlich auch Nachteile mit sich 😉</p>
<ol>
<li>Wenn eine Klasse nur Static Factory Methods zur Instanziierung bietet und keine Konstruktoren mit <em>public</em> oder <em>protected</em> als Sichtbarkeit, kann diese Klasse nicht als Subklasse fungieren</li>
<li>Wenn jetzt noch weitere <em>public static</em> Funktionen im Code enthalten sind, sind die **Static Factory Methods **nicht auf den ersten Blick sichtbar und fallen entsprechend weniger auf als Konstruktoren</li>
</ol>
<h2 id="benamung-der-static-factory-methods" tabindex="-1"><a class="header-anchor" href="#benamung-der-static-factory-methods" aria-hidden="true">#</a> Benamung der Static Factory Methods</h2>
<p>Mir ist keine klare Konvention bekannt, aber Joshua Bloch schlägt folgende, sinnige Benamung vor...</p>
<ul>
<li><em>valueOf</em> - Gibt eine Instanz zurück, welche den selben Wert hat, wie der übergebene Parameter</li>
<li><em>of</em> - Alternative zu <em>valueOf</em>, wird bei einem <strong>EnumSet</strong> präferiert</li>
<li><em>getInstance</em> - Beliebt beim Singleton-Pattern, gibt immer die selbe Instanz wieder (Instanz wird nur einmal erstellt)</li>
<li><em>newInstance</em> - Ähnlich wie <em>getInstance</em>, versichert jedoch, dass immer eine NEUE Instanz wiedergegeben wird</li>
</ul>
<p>Wenn ihr also bei eurer nächsten Klasse Konstruktoren erstellen wollt, überlegt euch doch einmal, ob nicht eine <strong>Static Factory Method</strong> vielleicht sinnvoller wäre!</p>
<p>Wie bereits im ersten Satz erwähnt, dient als Vorbild das Buch <a href="https://www.amazon.de/gp/product/0321356683/ref=as_li_tl?ie=UTF8&amp;camp=1638&amp;creative=6742&amp;creativeASIN=0321356683&amp;linkCode=as2&amp;tag=kevc01-21&amp;linkId=SEPB46CIBCWK6MWL" target="_blank" rel="noopener noreferrer">Effective Java: A Programming Language Guide (Java Series)<ExternalLinkIcon/></a>. Das Buch bietet 78 einzelne Beispiele samt Code.</p>
</div></template>
