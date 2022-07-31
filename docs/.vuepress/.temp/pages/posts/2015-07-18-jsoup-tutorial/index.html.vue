<template><div><p><a href="http://jsoup.org/" target="_blank" rel="noopener noreferrer">Jsoup<ExternalLinkIcon/></a> is a library allowing us to</p>
<ul>
<li>parse HTML from an URL, file or string</li>
<li>Extract data from the DOM, i.e. by using CSS selectors</li>
<li>Manipulate HTML elements, attributes and texts</li>
<li>Generate clean HTML</li>
</ul>
<p>In this Jsoup tutorial, I am going to show you how to parse a website and extract data.</p>
<p>First off, you need to include the jsoup dependency. For news, changelog and bug reports, check out the <a href="http://jsoup.org/news/" target="_blank" rel="noopener noreferrer">official Jsoup page<ExternalLinkIcon/></a>.</p>
<div class="language-xml ext-xml line-numbers-mode"><pre v-pre class="language-xml"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>dependency</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>groupId</span><span class="token punctuation">></span></span>org.jsoup<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>groupId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>artifactId</span><span class="token punctuation">></span></span>jsoup<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>artifactId</span><span class="token punctuation">></span></span>
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>version</span><span class="token punctuation">></span></span>1.10.2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>version</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>dependency</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="parsing-a-document" tabindex="-1"><a class="header-anchor" href="#parsing-a-document" aria-hidden="true">#</a> Parsing a document</h2>
<p>Start by parsing HTML into a <strong>Document</strong>. Henceforth, we are working with that <strong>Document</strong>. Jsoup is called statically. Jsoup offers the following variants of parsing HTML.</p>
<p><a href="./jsoup-static-factory-methods.png">Jsoup - Methoden zum Parsen eines Dokumentes</a></p>
<p>To parse a website to a document, you can simply call the following method</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">IOException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">MalformedURLException</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>net<span class="token punctuation">.</span></span><span class="token class-name">URL</span></span><span class="token punctuation">;</span>

<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>jsoup<span class="token punctuation">.</span></span><span class="token class-name">Jsoup</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>jsoup<span class="token punctuation">.</span>nodes<span class="token punctuation">.</span></span><span class="token class-name">Document</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">WebsiteParser</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">int</span> TIMEOUT\_IN\_MS <span class="token operator">=</span> <span class="token number">5000</span><span class="token punctuation">;</span>
  
  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span>\<span class="token punctuation">[</span>\<span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span>
  <span class="token punctuation">{</span>
    <span class="token class-name">Document</span> doc <span class="token operator">=</span> <span class="token class-name">Jsoup</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">"url"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> TIMEOUT\_IN\_MS<span class="token punctuation">)</span><span class="token punctuation">;</span>
    
    <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>doc<span class="token punctuation">.</span><span class="token function">html</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
  
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="extract-data" tabindex="-1"><a class="header-anchor" href="#extract-data" aria-hidden="true">#</a> Extract Data</h2>
<p>Once we parsed the HTML to a document, we can start extracting data. Jsoup offers quite a few ways to do so, for example...</p>
<ul>
<li><strong>getElementById</strong> - Returns a HTML element (org.jsoup.nodes.Element) by the given ID</li>
<li><strong>getElementsByTag</strong> - Returns a list of HTML elements (org.jsoup.select.Elements) with the given tag</li>
<li><strong>getElementsByClass</strong> - Returns a list of HTML elements (org.jsoup.select.Elements) with the given CSS class</li>
<li><strong>getElementsByAttribute</strong> - Returns a list of HTML elements (org.jsoup.select.Elements) containing the given attribute</li>
<li><strong>select</strong> - Returns a list of HTML elements (org.jsoup.select.Elements) matching the given CSS selector</li>
</ul>
<p>You can also apply further selectors on <strong>org.jsoup.select.Elements</strong>, making the following example valid</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code>Elements tables = doc.getElementsByAttribute("table");
    
for(Element table : tables)
{
   Elements tableRows = table.getElementsByAttribute("tr");
   
  for(Element tableRow : tableRows)
  {
    Elements tableData = tableRow.getElementsByTag("td");
        
     // ...
   }
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="css-selector" tabindex="-1"><a class="header-anchor" href="#css-selector" aria-hidden="true">#</a> CSS Selector</h2>
<p>As mentioned previously, the select method makes it possible to select HTML elements by providing a CSS selector.</p>
<p>Elements links = doc.select(&quot;a[href]&quot;); // Get all links with a href attribute present</p>
<p>Elements gifs = doc.select(&quot;img[src$=.gif]&quot;); // Get all images that are gifs</p>
<p>Element tableRows = doc.select(&quot;table.versions &gt; tbody &gt; tr&quot;).first(); // Get all table rows &quot;tr&quot; within a tbody element, in a table element with the class versions</p>
<p>Elements resultLinks = doc.select(&quot;span &gt; a&quot;); // Get all links within a span element</p>
<p>Elements lastTableChild = doc.select(&quot;table &gt; tbody &gt; tr:last-child&quot;); // Get the last child of a table row within a table body within a tables</p>
<h3 id="overview-of-selectors" tabindex="-1"><a class="header-anchor" href="#overview-of-selectors" aria-hidden="true">#</a> Overview of selectors</h3>
<ul>
<li><strong><code v-pre>tagname</code></strong>: Finds the element with the given tag, i.e. a or div</li>
<li><strong><code v-pre>ns|tag</code></strong>: Finds the elements from a given tag in a specific namespace, fb|name matches <a href="fb:name">fb:name</a> elements</li>
<li><strong><code v-pre>#id</code></strong>: Finds elements by the given ID, i.e. #eow-title</li>
<li><strong><code v-pre>.class</code>:</strong> Finds elements with the given class, i.e. .versionsfinds all elements with the versions class</li>
<li><strong><code v-pre>[attribute]</code>:</strong> Finds all elements with the given attribute, i.e. [href] or [name]</li>
<li><strong><code v-pre>[^attr]</code>:</strong> Finds all ements with the given prefix as attribute name, i.e. [^data-] <code v-pre>findet alle elements with HTML5 data-attributes</code></li>
<li><strong><code v-pre>[attr=value]</code>:</strong> Finds all elements with the given attribute and value, i.e. [width=500]</li>
<li><strong><code v-pre>[attr^=value]</code>, <code v-pre>[attr$=value]</code>, <code v-pre>[attr*=value]</code>:</strong> Finds all elements, that start/end/contain the attributes value, i.e. [href*=/path/] <code v-pre>finds all elements, whose href attributes contain /path/ in it's value</code></li>
<li><strong><code v-pre>[attr~=regex]</code>:</strong> Finds all elements, matchign the given regex, i.e. <code v-pre>img[src~=(?i)\.(png|jpe?g)]</code></li>
<li><strong><code v-pre>*</code>:</strong> Finds all elements</li>
</ul>
<h3 id="combining-selectors" tabindex="-1"><a class="header-anchor" href="#combining-selectors" aria-hidden="true">#</a> Combining selectors</h3>
<ul>
<li><strong><code v-pre>el#id</code>:</strong> Elements with the ID, i.e. div#logo</li>
<li><strong><code v-pre>el.class</code>:</strong> Elements with the class, i.e. <code v-pre>div.masthead</code></li>
<li><strong><code v-pre>el[attr]</code>:</strong> Elements with the given attribute, i.e. <code v-pre>a[href]</code></li>
<li>Concatted, i.e. <code v-pre>a[href].highlight</code></li>
<li><strong><code v-pre>ancestor child</code>:</strong> Child elements, that have a specific parent, i.e. <code v-pre>.body p</code> finds all <code v-pre>p</code> elements, that are children (not just directly), of an element with a body class</li>
<li><strong><code v-pre>parent &gt; child</code>:</strong> Finds the direct child element, i.e.div.content &gt; p <code v-pre>finds all p elements, that are direct children of a div with the class content</code></li>
<li><strong><code v-pre>el, el, el</code>:</strong> Group multiple selectors, i.e. <code v-pre>div.masthead, div.logo</code></li>
</ul>
<p><a href="http://jsoup.org/cookbook/extracting-data/selector-syntax" target="_blank" rel="noopener noreferrer">List of all selectors on Jsoup.org<ExternalLinkIcon/></a></p>
<h2 id="real-world-example-parsing-dependency-versions-from-mvnrepository-com" tabindex="-1"><a class="header-anchor" href="#real-world-example-parsing-dependency-versions-from-mvnrepository-com" aria-hidden="true">#</a> Real-World example - Parsing dependency versions from mvnrepository.com</h2>
<p>Theory is one thing, but let us see Jsoup in action with a real-world example.</p>
<p>Let's try parsing the dependency versions from a library, let's take <a href="http://mvnrepository.com/artifact/com.ning/async-http-client" target="_blank" rel="noopener noreferrer">Async-Http-Client from com.ning<ExternalLinkIcon/></a>.</p>
<p>This is how the source code of the page looks like:</p>
<div class="language-html ext-html line-numbers-mode"><pre v-pre class="language-html"><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>table</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>grid versions<span class="token punctuation">"</span></span> <span class="token attr-name">width</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>100%<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>thead</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
         ....
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>thead</span><span class="token punctuation">></span></span>
   <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tbody</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>tr</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span> <span class="token attr-name">rowspan</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>56<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>b</span><span class="token punctuation">></span></span>1.9<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>b</span><span class="token punctuation">></span></span>.x<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/artifact/com.ning/async-http-client/1.9.30<span class="token punctuation">"</span></span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>vbtn release<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>1.9.30<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>
            <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>a</span> <span class="token attr-name">href</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>/artifact/com.ning/async-http-client/1.9.30/usages<span class="token punctuation">"</span></span><span class="token punctuation">></span></span>2<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>a</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>span</span> <span class="token attr-name">class</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>rankingbar<span class="token punctuation">"</span></span> <span class="token special-attr"><span class="token attr-name">style</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span><span class="token value css language-css"><span class="token property">width</span><span class="token punctuation">:</span> 7px<span class="token punctuation">;</span> </span><span class="token punctuation">"</span></span></span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>span</span><span class="token punctuation">></span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span>release<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
         <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>td</span><span class="token punctuation">></span></span> (Jul, 2015) <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>td</span><span class="token punctuation">></span></span>
      <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tr</span><span class="token punctuation">></span></span>
      ...
  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>tbody</span><span class="token punctuation">></span></span>
<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>table</span><span class="token punctuation">></span></span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We want to parse the exact version (1.9.30), the type (release) - could be release, beta, general availability or something else and the usages (2).</p>
<p>Let's create a POJO representing a dependency.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MavenDependency</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token class-name">String</span> group<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> artifact<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> version<span class="token punctuation">;</span>

  <span class="token keyword">private</span> <span class="token keyword">int</span> usages<span class="token punctuation">;</span>
  <span class="token keyword">private</span> <span class="token class-name">String</span> type<span class="token punctuation">;</span>

 <span class="token comment">// Konstruktor</span>

 <span class="token comment">// Getter &amp; Setter</span>

 <span class="token comment">// ToString</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Start by parsing the website</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token comment">// Parse website with a 5 secodn timeout</span>
<span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token class-name">Jsoup</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span><span class="token string">"http://mvnrepository.com/artifact/com.ning/async-http-client"</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Using the css selector <strong>table.versions &gt; tbody &gt; tr</strong>, we get all rows containing the versions. It is important to select the tbody, else we wil also get unnecessary information from the tables's head.</p>
<p>Elements versionRows = document.select(&quot;table.versions &gt; tbody &gt; tr&quot;);</p>
<p>Now that we have the rows, we continue extracting the exact information for a single dependency entry by applying CSS selectors.</p>
<ul>
<li><strong>Version:</strong> td &gt; a.vbtn - Link with the class vbtn in a td element</li>
<li><strong>Usages:</strong> td:nth-last-child(3) - The third last child from the td element</li>
<li><strong>Type:</strong> td:nth-last-child(2) - The second last child from the td element</li>
</ul>
<p>There are probably a bunch of other ways to access this data. This is how the entire code looks like</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MavenParser</span> <span class="token punctuation">{</span>

  <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token class-name">String</span> MVN\_REPO\_BASE\_SEARCH\_URL <span class="token operator">=</span> <span class="token string">"http://mvnrepository.com/artifact/"</span><span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span>\<span class="token punctuation">[</span>\<span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MavenDependency</span><span class="token punctuation">></span></span> availableDependencies <span class="token operator">=</span> <span class="token function">getMavenResults</span><span class="token punctuation">(</span><span class="token string">"com.ning"</span><span class="token punctuation">,</span> <span class="token string">"async-http-client"</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// -> http://mvnrepository.com/artifact/com.ning/async-http-client</span>
    
    availableDependencies<span class="token punctuation">.</span><span class="token function">forEach</span><span class="token punctuation">(</span><span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token operator">::</span><span class="token function">println</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

  <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MavenDependency</span><span class="token punctuation">></span></span> <span class="token function">getMavenResults</span><span class="token punctuation">(</span><span class="token class-name">String</span> group<span class="token punctuation">,</span> <span class="token class-name">String</span> artifact<span class="token punctuation">)</span> 
      <span class="token keyword">throws</span> <span class="token class-name">MalformedURLException</span><span class="token punctuation">,</span> <span class="token class-name">IOException</span> <span class="token punctuation">{</span>
    <span class="token class-name">String</span> url <span class="token operator">=</span> MVN\_REPO\_BASE\_SEARCH\_URL <span class="token operator">+</span> group <span class="token operator">+</span> <span class="token string">"/"</span> <span class="token operator">+</span> artifact<span class="token punctuation">;</span>

    <span class="token comment">// Parse website with 5 seconds timeout</span>
    <span class="token class-name">Document</span> document <span class="token operator">=</span> <span class="token class-name">Jsoup</span><span class="token punctuation">.</span><span class="token function">parse</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">URL</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">5000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// All versions as table rows</span>
    <span class="token class-name">Elements</span> versionRows <span class="token operator">=</span> document<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">"table.versions > tbody > tr"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token class-name">List</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">MavenDependency</span><span class="token punctuation">></span></span> mvnResults <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">ArrayList</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token comment">// Parse a single table row</span>
    <span class="token keyword">for</span> <span class="token punctuation">(</span><span class="token class-name">Element</span> tr <span class="token operator">:</span> versionRows<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">String</span> version <span class="token operator">=</span> tr<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">"td > a.vbtn"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
      <span class="token keyword">int</span> usages <span class="token operator">=</span> <span class="token class-name">Integer</span><span class="token punctuation">.</span><span class="token function">parseInt</span><span class="token punctuation">(</span>tr<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">"td:nth-last-child(3)"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
      
       <span class="token class-name">String</span> type <span class="token operator">=</span> tr<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token string">"td:nth-last-child(2)"</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">text</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

      mvnResults<span class="token punctuation">.</span><span class="token function">add</span><span class="token punctuation">(</span><span class="token keyword">new</span> <span class="token class-name">MavenDependency</span><span class="token punctuation">(</span>group<span class="token punctuation">,</span> artifact<span class="token punctuation">,</span> version<span class="token punctuation">,</span> usages<span class="token punctuation">,</span> type<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">return</span> mvnResults<span class="token punctuation">;</span>
  <span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
