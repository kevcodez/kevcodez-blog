<template><div><h1 id="postgres-jsonb-updating-data-inside-an-array-of-objects" tabindex="-1"><a class="header-anchor" href="#postgres-jsonb-updating-data-inside-an-array-of-objects" aria-hidden="true">#</a> Postgres JSONB: Updating data inside an array of objects</h1>
<p>Recently I had the challenge to update data inside of an array of objects within a JSONB column.</p>
<p>Given the following two tables</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> contract <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    json_data JSONB <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">CREATE</span> <span class="token keyword">TABLE</span> invoice <span class="token punctuation">(</span>
    id <span class="token keyword">BIGINT</span> <span class="token keyword">PRIMARY</span> <span class="token keyword">KEY</span><span class="token punctuation">,</span>
    json_data JSONB <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In this example an invoice has different items and each item can belong to a different contract.
Let's have a look at some example data.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code>-- contract
<span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"customerId"</span><span class="token operator">:</span> <span class="token number">123</span>
<span class="token punctuation">}</span>

-- invoice

<span class="token punctuation">{</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token number">15</span><span class="token punctuation">,</span>
    <span class="token property">"items"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"contractId"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
            <span class="token property">"prize"</span><span class="token operator">:</span> <span class="token number">123</span>
        <span class="token punctuation">}</span><span class="token punctuation">,</span>
        <span class="token punctuation">{</span>
            <span class="token property">"contractId"</span><span class="token operator">:</span> <span class="token number">2</span><span class="token punctuation">,</span>
            <span class="token property">"prize"</span><span class="token operator">:</span> <span class="token number">456</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>What we wanted to do is add the customer id, based on the contract id, to the items.</p>
<p>Postgres offers a <code v-pre>jsonb_set</code> function for updating JSON fields.</p>
<p><code v-pre>jsonb_set(target jsonb, path text[], new_value jsonb [, create_missing boolean])</code></p>
<p>The second parameter <code v-pre>path</code> defines, which property you want to update.
To update items in an array, you can use an index-based approach.</p>
<p>To update the first entry in the items array in the example above, a path woud look like this: <code v-pre>{items, 0, customerId}</code>.
This sets the field &quot;customerId&quot; at index 0 (first entry) in the array named items.</p>
<p>Let's have a look at the update query before breaking it down.</p>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token keyword">WITH</span> item <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    <span class="token keyword">SELECT</span> <span class="token punctuation">(</span><span class="token string">'{items,'</span> <span class="token operator">||</span> <span class="token keyword">index</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">||</span> <span class="token string">',"customerId"}'</span><span class="token punctuation">)</span>::<span class="token keyword">TEXT</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">AS</span> path<span class="token punctuation">,</span>
           id<span class="token punctuation">,</span>
           <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token punctuation">(</span>json_data <span class="token operator">-</span><span class="token operator">>></span> <span class="token string">'customerId'</span><span class="token punctuation">)</span>::<span class="token keyword">BIGINT</span> <span class="token keyword">FROM</span> contract <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token punctuation">(</span>item <span class="token operator">-</span><span class="token operator">>></span> <span class="token string">'contractId'</span><span class="token punctuation">)</span>::<span class="token keyword">BIGINT</span> <span class="token punctuation">)</span> <span class="token keyword">AS</span> customerId
    <span class="token keyword">FROM</span> invoice<span class="token punctuation">,</span>
         jsonb_array_elements<span class="token punctuation">(</span>json_data <span class="token operator">-</span><span class="token operator">></span> <span class="token string">'items'</span><span class="token punctuation">)</span> <span class="token keyword">WITH</span> ORDINALITY arr<span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token keyword">index</span><span class="token punctuation">)</span>
    <span class="token keyword">WHERE</span> item <span class="token operator">-</span><span class="token operator">>></span> <span class="token string">'contractId'</span> <span class="token operator">IS</span> <span class="token operator">NOT</span> <span class="token boolean">NULL</span>
<span class="token punctuation">)</span>
<span class="token keyword">UPDATE</span> invoice i
<span class="token keyword">SET</span> json_data <span class="token operator">=</span> jsonb_set<span class="token punctuation">(</span>json_data<span class="token punctuation">,</span> item<span class="token punctuation">.</span>path<span class="token punctuation">,</span> to_json<span class="token punctuation">(</span>item<span class="token punctuation">.</span>customerId<span class="token punctuation">)</span>::JSONB<span class="token punctuation">)</span>
<span class="token keyword">FROM</span> item
<span class="token keyword">WHERE</span> i<span class="token punctuation">.</span>id <span class="token operator">=</span> item<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="breaking-it-down" tabindex="-1"><a class="header-anchor" href="#breaking-it-down" aria-hidden="true">#</a> Breaking it down</h2>
<div class="language-sql ext-sql line-numbers-mode"><pre v-pre class="language-sql"><code><span class="token comment">-- The basic value of SELECT in WITH is to break down complicated queries into simpler parts. </span>
<span class="token keyword">WITH</span> item <span class="token keyword">AS</span> <span class="token punctuation">(</span>
    
    <span class="token keyword">SELECT</span> 
    <span class="token comment">-- dynamically concat the JSONB path. {items,&lt;index>,customerId} (sets the field custmerId in the array named items at the index number), aliased as path for easier reference</span>
    <span class="token punctuation">(</span><span class="token string">'{items,'</span> <span class="token operator">||</span> <span class="token keyword">index</span> <span class="token operator">-</span> <span class="token number">1</span> <span class="token operator">||</span> <span class="token string">',"customerId"}'</span><span class="token punctuation">)</span>::<span class="token keyword">TEXT</span><span class="token punctuation">[</span><span class="token punctuation">]</span> <span class="token keyword">AS</span> path<span class="token punctuation">,</span>
    <span class="token comment">-- We need the id for updating the correct entry later</span>
    id<span class="token punctuation">,</span>
    <span class="token comment">-- Subquery to select the customerId based on the contract id, aliased as customerId for easier reference</span>
    <span class="token punctuation">(</span><span class="token keyword">SELECT</span> <span class="token punctuation">(</span>json_data <span class="token operator">-</span><span class="token operator">>></span> <span class="token string">'customerId'</span><span class="token punctuation">)</span>::<span class="token keyword">BIGINT</span> <span class="token keyword">FROM</span> contract <span class="token keyword">where</span> id <span class="token operator">=</span> <span class="token punctuation">(</span>item <span class="token operator">-</span><span class="token operator">>></span> <span class="token string">'contractId'</span><span class="token punctuation">)</span>::<span class="token keyword">BIGINT</span> <span class="token punctuation">)</span> <span class="token keyword">AS</span> customerId
    <span class="token comment">-- source table</span>
    <span class="token keyword">FROM</span> invoice<span class="token punctuation">,</span>
    <span class="token comment">-- flatten the array using jsonb_array_elements and allow access for both, the item itself (so you can access the properties of the item object) and the index using WITH ORDINALITY </span>
    jsonb_array_elements<span class="token punctuation">(</span>json_data <span class="token operator">-</span><span class="token operator">></span> <span class="token string">'items'</span><span class="token punctuation">)</span> <span class="token keyword">WITH</span> ORDINALITY arr<span class="token punctuation">(</span>item<span class="token punctuation">,</span> <span class="token keyword">index</span><span class="token punctuation">)</span>
<span class="token punctuation">)</span>
<span class="token comment">-- Now we actually start updating the invoices</span>
<span class="token keyword">UPDATE</span> invoice i
<span class="token comment">-- item is the name of the with-subquery above, we can now access the dynamically built path and selected customer id</span>
<span class="token keyword">SET</span> json_data <span class="token operator">=</span> jsonb_set<span class="token punctuation">(</span>json_data<span class="token punctuation">,</span> item<span class="token punctuation">.</span>path<span class="token punctuation">,</span> to_json<span class="token punctuation">(</span>item<span class="token punctuation">.</span>customerId<span class="token punctuation">)</span>::JSONB<span class="token punctuation">)</span>
<span class="token comment">-- reference the with-query above</span>
<span class="token keyword">FROM</span> item
<span class="token keyword">WHERE</span> i<span class="token punctuation">.</span>id <span class="token operator">=</span> item<span class="token punctuation">.</span>id<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>
