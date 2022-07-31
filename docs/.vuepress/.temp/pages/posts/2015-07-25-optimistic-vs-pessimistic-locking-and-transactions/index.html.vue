<template><div><p>What are transactions and why do we need them? The classic, relational database systems, such as MySQL, Postgres come with <strong>ACID</strong> (Atomicity, Consistency, Isolation, Durability). We start a transaction, execute our database changes and commit. If a single action fails, the transaction will be rolled back and no change is applied. Only if every change succeeds, the transaction is committed and persisted. This protects us from inconsistency. This relates to a single transaction. When multiple users access the same object, we need to define a locking strategy: optimistic or pessmistic locking. When developing an application with a database (almost any application nowadays) with a high number of users, it is very likely, that some time, more than just one user tries to read or write an object. I am going to explain optimistic vs pessimistic locking in this article and explain the differences.</p>
<h2 id="optimistic-locking" tabindex="-1"><a class="header-anchor" href="#optimistic-locking" aria-hidden="true">#</a> Optimistic Locking</h2>
<p>With optimistic locking, every row in a database has its own version number. When reading the object, the version number is retrieved. When changing the object and trying to persist the change, the detached version is checked against the current version in the database. If there is no change in version, the object can be persisted without any further problems. If the version did change (dirty), the transaction is cancelled (usually, an exception is thrown). Optimistic locking is used far more often and is recommended, if you have a high load on your database without many collisions expected.  JPA supports multiple strategies for optimistic locking: version number, timestamp or a rowstate. <strong>Reading from the database is NOT influenced at all.</strong></p>
<p>When using JPA, you can simply add the <strong>@Version</strong> annotation to your property. There is no need to define a getter or setter.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@Entity</span>
<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyEntity</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span>    

    <span class="token annotation punctuation">@Id</span>
    <span class="token annotation punctuation">@GeneratedValue</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span>

    <span class="token keyword">private</span> <span class="token class-name">String</span> otherProperty<span class="token punctuation">;</span>

    <span class="token annotation punctuation">@Version</span>
    <span class="token keyword">private</span> <span class="token class-name">Long</span> version<span class="token punctuation">;</span>

    <span class="token comment">// Getter/Setter for ID and other properties</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The table will need a new column called &quot;<strong>version</strong>&quot;. You do not have to handle the version number yourself, the JPA provider will do it for you. If you want to use optimistic locking for all your entities, you may create an abstract class annotated with <strong>@MappedSuperclass</strong>.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>io<span class="token punctuation">.</span></span><span class="token class-name">Serializable</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">GeneratedValue</span></span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">GenerationType</span></span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">Id</span></span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">MappedSuperclass</span></span><span class="token punctuation">;</span> 
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">javax<span class="token punctuation">.</span>persistence<span class="token punctuation">.</span></span><span class="token class-name">Version</span></span><span class="token punctuation">;</span> 
<span class="token annotation punctuation">@MappedSuperclass</span> 
<span class="token keyword">public</span> <span class="token keyword">abstract</span> <span class="token keyword">class</span> <span class="token class-name">AbstractEntity</span> <span class="token keyword">implements</span> <span class="token class-name">Serializable</span> <span class="token punctuation">{</span> 

<span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token keyword">final</span> <span class="token keyword">long</span> serialVersionUID <span class="token operator">=</span> <span class="token number">1L</span><span class="token punctuation">;</span> 

<span class="token annotation punctuation">@Id</span> 
<span class="token annotation punctuation">@GeneratedValue</span><span class="token punctuation">(</span>strategy <span class="token operator">=</span> <span class="token class-name">GenerationType</span><span class="token punctuation">.</span>AUTO<span class="token punctuation">)</span> 
<span class="token keyword">private</span> <span class="token class-name">Long</span> id<span class="token punctuation">;</span> 

<span class="token annotation punctuation">@Version</span> 
<span class="token keyword">private</span> <span class="token class-name">Long</span> version<span class="token punctuation">;</span> 

<span class="token keyword">public</span> <span class="token class-name">Long</span> <span class="token function">getId</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">return</span> id<span class="token punctuation">;</span> <span class="token punctuation">}</span> 

<span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">setId</span><span class="token punctuation">(</span><span class="token class-name">Long</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">this</span><span class="token punctuation">.</span>id <span class="token operator">=</span> id<span class="token punctuation">;</span> <span class="token punctuation">}</span>

<span class="token annotation punctuation">@Override</span> 
<span class="token keyword">public</span> <span class="token keyword">int</span> <span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
<span class="token keyword">final</span> <span class="token keyword">int</span> prime <span class="token operator">=</span> <span class="token number">31</span><span class="token punctuation">;</span> 
<span class="token keyword">int</span> result <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span> result <span class="token operator">=</span> prime \<span class="token operator">*</span> result <span class="token operator">+</span> <span class="token punctuation">(</span><span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token operator">?</span> <span class="token number">0</span> <span class="token operator">:</span> id<span class="token punctuation">.</span><span class="token function">hashCode</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
<span class="token keyword">return</span> result<span class="token punctuation">;</span> 
<span class="token punctuation">}</span> 

<span class="token annotation punctuation">@Override</span> 
<span class="token keyword">public</span> <span class="token keyword">boolean</span> <span class="token function">equals</span><span class="token punctuation">(</span><span class="token class-name">Object</span> obj<span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token keyword">this</span> <span class="token operator">==</span> obj<span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> 

<span class="token keyword">if</span> <span class="token punctuation">(</span>obj <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> obj<span class="token punctuation">.</span><span class="token function">getClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

<span class="token class-name">AbstractEntity</span> other <span class="token operator">=</span> <span class="token punctuation">(</span><span class="token class-name">AbstractEntity</span><span class="token punctuation">)</span> obj<span class="token punctuation">;</span> 

<span class="token keyword">if</span> <span class="token punctuation">(</span>id <span class="token operator">==</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> 
<span class="token keyword">if</span> <span class="token punctuation">(</span>other<span class="token punctuation">.</span>id <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>id<span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>other<span class="token punctuation">.</span>id<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span> 

<span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span> 

<span class="token punctuation">}</span> 

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Your entities should extend AbstractEntity.</p>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">MyEntity</span> <span class="token keyword">extends</span> <span class="token class-name">AbstractEntity</span>
<span class="token punctuation">{</span>

<span class="token comment">// properties</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="pessimistic-locking" tabindex="-1"><a class="header-anchor" href="#pessimistic-locking" aria-hidden="true">#</a> Pessimistic Locking</h2>
<p>Pessimistic Locking blocks database records for a single user, until the lock is released. This offers a higher integrity than optimistic locking, but may cause a deadlock in a bad application design/architecture (lock is never released). To use pessimistic locking, either a direct database connection or a unique transaction ID for identification is needed. Just like optimistic locking, the transaction is rolled back, when an error occurs.</p>
<p>If you expect many collisions, which would interfere with your data consistency and integrity, you should use pessimistic locking. Keep in mind that pessimistic locking is predictable, but also reduces the concurrency.</p>
<p>There are three different kinds of Locking</p>
<ul>
<li>PESSIMISTIC_READ - If a transaction reads an entity, the entity is blocked but allows other transactions to <strong>READ</strong></li>
<li>PESSIMISTIC_WRITE - If a transaction writes an entity, it is blocked and forbids reading, writing and deleting</li>
<li>PESSIMISTIC_FORCE_INCREMENT - If a transaction reads an entity, the version-attribute (if existent) is increased</li>
</ul>
<div class="language-java ext-java line-numbers-mode"><pre v-pre class="language-java"><code><span class="token annotation punctuation">@PersistenceContext</span>
  <span class="token keyword">private</span> <span class="token class-name">EntityManager</span> entityManager<span class="token punctuation">;</span>

  <span class="token keyword">public</span> <span class="token keyword">void</span> <span class="token function">decreaseStock</span><span class="token punctuation">(</span><span class="token class-name">String</span> id<span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token class-name">Product</span> product <span class="token operator">=</span> 
          entityManager<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span><span class="token class-name">Product</span><span class="token punctuation">.</span><span class="token keyword">class</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span><span class="token punctuation">;</span>
      entityManager<span class="token punctuation">.</span><span class="token function">lock</span><span class="token punctuation">(</span>product<span class="token punctuation">,</span>
          <span class="token class-name">LockModeType</span><span class="token punctuation">.</span>OPTIMISTIC\_WRITE<span class="token punctuation">)</span><span class="token punctuation">;</span>
      product<span class="token punctuation">.</span><span class="token function">setStock</span><span class="token punctuation">(</span>product<span class="token punctuation">.</span><span class="token function">getStock</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
