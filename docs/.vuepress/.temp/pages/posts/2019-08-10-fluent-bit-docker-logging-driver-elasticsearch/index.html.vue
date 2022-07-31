<template><div><h1 id="logging-from-docker-containers-to-elasticsearch-with-fluent-bit" tabindex="-1"><a class="header-anchor" href="#logging-from-docker-containers-to-elasticsearch-with-fluent-bit" aria-hidden="true">#</a> Logging from Docker Containers to Elasticsearch with Fluent Bit</h1>
<p>This guide explains how to setup the lightweight log processor and forwarder <a href="https://fluentbit.io/" target="_blank" rel="noopener noreferrer">Fluent Bit<ExternalLinkIcon/></a> as docker logging driver to catch all <code v-pre>stdout</code> produced by your containers, process the logs, and forward them to Elasticsearch.</p>
<p><a href="https://12factor.net/" target="_blank" rel="noopener noreferrer">Twelve-Factor<ExternalLinkIcon/></a> says the following about logs</p>
<blockquote>
<p>A twelve-factor app never concerns itself with routing or storage of its output stream. It should not attempt to write to or manage logfiles.
Instead, each running process writes its event stream, unbuffered, to stdout.
During local development, the developer will view this stream in the foreground of their terminal to observe the app’s behavior.</p>
</blockquote>
<p>Rather than configuring your applications to send logs to your log storage (Elasticsearch/Graylog/...) or even write log files itself, your applications should simply log to <code v-pre>stdout</code>.</p>
<p>In a dockerized environment with multiple services, where each container is isolated and logs on it's own, we need an interface to collect those logs.
<strong>Docker Logging Driver</strong> to the rescue.
Each docker daemon has a logging driver, which each container uses.
That way, each log entry will flow through the logging driver, enabling us to process and forward it in a central place.</p>
<h2 id="fluent-bit-vs-fluentd" tabindex="-1"><a class="header-anchor" href="#fluent-bit-vs-fluentd" aria-hidden="true">#</a> Fluent Bit vs Fluentd</h2>
<p>A popular library to solve this is <a href="https://www.fluentd.org/" target="_blank" rel="noopener noreferrer">Fluentd<ExternalLinkIcon/></a>. An open source log collector, processor and aggregator written in Ruby, first published in 2011.</p>
<p>Fluent Bit is an open source log collector created by the same folks, written in C, first published in 2015.</p>
<table>
<thead>
<tr>
<th></th>
<th>Fluentd</th>
<th>Fluent Bit</th>
</tr>
</thead>
<tbody>
<tr>
<td>Scope</td>
<td>Containers / Servers</td>
<td>Containers / Servers</td>
</tr>
<tr>
<td>Language</td>
<td>C &amp; Ruby</td>
<td>C</td>
</tr>
<tr>
<td>Memory</td>
<td>~40MB</td>
<td>~450KB</td>
</tr>
<tr>
<td>Performance</td>
<td>High Performance</td>
<td>High Performance</td>
</tr>
<tr>
<td>Dependencies</td>
<td>Built as a Ruby Gem, it requires a certain number of gems.</td>
<td>Zero dependencies, unless some special plugin requires them.</td>
</tr>
<tr>
<td>Plugins</td>
<td>More than 650 plugins available</td>
<td>Around 35 plugins available</td>
</tr>
<tr>
<td>License</td>
<td><a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License v2.0<ExternalLinkIcon/></a></td>
<td><a href="http://www.apache.org/licenses/LICENSE-2.0" target="_blank" rel="noopener noreferrer">Apache License v2.0<ExternalLinkIcon/></a></td>
</tr>
</tbody>
</table>
<p>Taken from the <a href="https://docs.fluentbit.io/manual/v/1.2/about/fluentd_and_fluentbit" target="_blank" rel="noopener noreferrer">official documentation<ExternalLinkIcon/></a>.</p>
<p>Regarding ecosystem, Fluentd is a lot more mature and adpoted.
However, Fluent Bit takes about 1/10 of the resources and does offer plugins for standard tooling.</p>
<p>For simple cases that involve standard tooling (like Elasticsearch) and not focus on aggregation and rather processing and forwarding, I'd recommend using Fluent Bit.</p>
<h2 id="getting-started-with-fluent-bit" tabindex="-1"><a class="header-anchor" href="#getting-started-with-fluent-bit" aria-hidden="true">#</a> Getting started with Fluent Bit</h2>
<p>Fluent Bit offers official production-ready docker images.
For a detailed list check <a href="https://docs.fluentbit.io/manual/installation/docker" target="_blank" rel="noopener noreferrer">the official docs<ExternalLinkIcon/></a>.</p>
<p>Fluent Bit can be configured by file or command line.
We will go for configuration by file.</p>
<p>There are different sections of configuration:</p>
<ul>
<li><a href="https://docs.fluentbit.io/manual/service" target="_blank" rel="noopener noreferrer">Service<ExternalLinkIcon/></a> - defines the global behavior of the Fluent Bit engine</li>
<li><a href="https://docs.fluentbit.io/manual/input" target="_blank" rel="noopener noreferrer">Input<ExternalLinkIcon/></a> - defines the source from where Fluent Bit can collect data</li>
<li><a href="https://docs.fluentbit.io/manual/parser" target="_blank" rel="noopener noreferrer">Parser<ExternalLinkIcon/></a> - take unstructured log entries and give them structure</li>
<li><a href="https://docs.fluentbit.io/manual/filter" target="_blank" rel="noopener noreferrer">Filter<ExternalLinkIcon/></a> - allows to alter the incoming data generated by the input plugins</li>
<li><a href="https://docs.fluentbit.io/manual/output" target="_blank" rel="noopener noreferrer">Output<ExternalLinkIcon/></a> - defines where Fluent Bit should flush the information it gathers from the input</li>
</ul>
<p>Let's take a look at an example configuration.</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code><span class="token directive-flags keyword">[SERVICE]</span>
	log_level debug

<span class="token comment"># The stdin plugin allows to retrieve valid JSON text messages over the standard input interface (stdin)</span>
<span class="token directive-flags keyword">[INPUT]</span>
	Name stdin

<span class="token comment"># The Record Modifier Filter plugin allows to append fields or to exclude specific fields.</span>
<span class="token directive-flags keyword">[FILTER]</span>
	Name record_modifier
	Match *
	Record hostname <span class="token variable">${HOSTNAME}</span>

<span class="token comment"># The stdout output plugin allows to print to the standard output the data received through the input plugin.</span>
<span class="token directive-flags keyword">[OUTPUT]</span>
	Name stdout
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Building a custom Fluent Bit Docker Image is fairly simple</p>
<div class="language-Dockerfile ext-Dockerfile line-numbers-mode"><pre v-pre class="language-Dockerfile"><code>FROM fluent/fluent-bit:1.2
ADD fluent-bit.conf /fluent-bit/etc/
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's test our simple configuration.</p>
<p><img src="@source/posts/2019-08-10-fluent-bit-docker-logging-driver-elasticsearch/simple.gif" alt="Simple Config"></p>
<h2 id="fluent-bit-as-docker-driver" tabindex="-1"><a class="header-anchor" href="#fluent-bit-as-docker-driver" aria-hidden="true">#</a> Fluent Bit as Docker Driver</h2>
<p>For Fluent Bit to receive every log produced by a container to process and forward, we need to setup Fluent Bit as Docker Logging Driver.</p>
<p>We need to use the <strong>forward</strong> input plugin for Fluent Bit.
Forward is the protocol used by Fluent Bit and Fluentd to route messages between peers.
This plugin implements the input service to listen for Forward messages.
To check if everything is running just fine, we will keep the <code v-pre>stdout</code> plugin for now.</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code><span class="token directive-flags keyword">[SERVICE]</span>
    log_level debug

<span class="token directive-flags keyword">[INPUT]</span>
    Name forward
    <span class="token directive-inline property">Listen</span> 0.0.0.0
    port 24224

<span class="token directive-flags keyword">[OUTPUT]</span>
    Name stdout
    Match **
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's spin everything up with docker-compose:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.5"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">fluentbit</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"24224:24224"</span>
      <span class="token punctuation">-</span> <span class="token string">"24224:24224/udp"</span>
  <span class="token key atrule">ubuntu</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>/bin/echo<span class="token punctuation">,</span> <span class="token string">"Kevcodez"</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> fluentbit
    <span class="token key atrule">logging</span><span class="token punctuation">:</span>
      <span class="token key atrule">driver</span><span class="token punctuation">:</span> fluentd
      <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">tag</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>In case you are wondering if <code v-pre>fluentd</code> as logging driver was a typo - it's not.
Fluentd and Fluent Bit both use <code v-pre>fluentd</code> Docker Logging Driver.
The <a href="https://github.com/fluent/fluentd/wiki/Forward-Protocol-Specification-v1" target="_blank" rel="noopener noreferrer">forward protocol<ExternalLinkIcon/></a> is used.</p>
<p><img src="@source/posts/2019-08-10-fluent-bit-docker-logging-driver-elasticsearch/driver-stdout.gif" alt="Simple Config"></p>
<p>To use an alternative logging driver, we can simply pass a <code v-pre>--log-driver</code> argument when starting the container.
This can be configured globally as well. Refer to the <a href="https://docs.docker.com/config/containers/logging/configure/" target="_blank" rel="noopener noreferrer">Docker Docs<ExternalLinkIcon/></a>.</p>
<p>Our Fluent Bit container should log something like this</p>
<blockquote>
<p>[0] docker.{.ID}}: [1565471735.000000000, {&quot;container_id&quot;=&gt;&quot;50f42a398149729c3c24b621f6da2ac943a19b565c99b665e37ec5b8c8c9a3df&quot;, &quot;container_name&quot;=&gt;&quot;/zealous_proskuriakova&quot;, &quot;source&quot;=&gt;&quot;stdout&quot;, &quot;log&quot;=&gt;&quot;Kevcodez&quot;}][2019/08/10 21:15:39] [debug][task] created task=0x7f2c838430c0 id=0 OK
[2019/08/10 21:15:39][debug] [task] destroy task=0x7f2c838430c0 (task_id=0)</p>
</blockquote>
<h2 id="send-logs-to-elasticsearch" tabindex="-1"><a class="header-anchor" href="#send-logs-to-elasticsearch" aria-hidden="true">#</a> Send logs to Elasticsearch</h2>
<p>To forward the logs to Elasticsearch, we simply have to change the output plugin.
Fluent Bit comes with an <a href="https://docs.fluentbit.io/manual/output/elasticsearch" target="_blank" rel="noopener noreferrer">Elasticsearch Output Plugin<ExternalLinkIcon/></a> built-in.</p>
<div class="language-apacheconf ext-apacheconf line-numbers-mode"><pre v-pre class="language-apacheconf"><code><span class="token directive-flags keyword">[OUTPUT]</span>
    Name es
    Match **
    Host 127.0.0.1
    Port 9243
    <span class="token comment"># When Logstash_Format is enabled, the Index name is composed using a prefix and the date</span>
    Logstash_Format True
    <span class="token comment"># HTTP_User &lt;user></span>
    <span class="token comment"># HTTP_Passwd &lt;pw></span>
    <span class="token comment"># Alternative time key, useful if your log entries contain an @timestamp field that is used by Elasticsearch</span>
    <span class="token comment"># Time_Key es_time</span>
    <span class="token comment"># If your Elasticsearch is using TLS, configure this</span>
    <span class="token comment"># tls On</span>
    <span class="token comment"># tls.verify Off</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's spin up Elasticsearch, Fluent Bit and our sample ubuntu application that produces a log.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.5"</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">elasticsearch</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> elasticsearch<span class="token punctuation">:</span>7.3.0
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"9200:9200"</span>
      <span class="token punctuation">-</span> <span class="token string">"9300:9300"</span>
    <span class="token key atrule">environment</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"ES_JAVA_OPTS=-Xms512m -Xmx512m"</span>
      <span class="token punctuation">-</span> discovery.type=single<span class="token punctuation">-</span>node
  <span class="token key atrule">fluentbit</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"24224:24224"</span>
      <span class="token punctuation">-</span> <span class="token string">"24224:24224/udp"</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch
  <span class="token key atrule">ubuntu</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> ubuntu
    <span class="token key atrule">command</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>/bin/echo<span class="token punctuation">,</span> <span class="token string">"Kevcodez"</span><span class="token punctuation">]</span>
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> fluentbit
    <span class="token key atrule">logging</span><span class="token punctuation">:</span>
      <span class="token key atrule">driver</span><span class="token punctuation">:</span> fluentd
      <span class="token key atrule">options</span><span class="token punctuation">:</span>
        <span class="token key atrule">tag</span><span class="token punctuation">:</span> docker<span class="token punctuation">-</span>ubuntu
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker-compose</span> up
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>Let's check if our logs arrived in Elasticsearch</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9200/_cat/indices
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><blockquote>
<p>yellow open logstash-2019.08.10 RevxDUH3Qpm1JTyObFhbqA 1 1 1 0 6.2kb 6.2kb</p>
</blockquote>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">curl</span> localhost:9200/logstash-2019.08.10/_search?pretty<span class="token operator">=</span>true<span class="token operator">&amp;</span><span class="token assign-left variable">q</span><span class="token operator">=</span><span class="token punctuation">{</span><span class="token string">'matchAll'</span>:<span class="token punctuation">{</span><span class="token string">''</span><span class="token punctuation">}</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"took"</span><span class="token operator">:</span> <span class="token number">43</span><span class="token punctuation">,</span>
  <span class="token property">"timed_out"</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token property">"_shards"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"total"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"successful"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"skipped"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"failed"</span><span class="token operator">:</span> <span class="token number">0</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"hits"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"total"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"value"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
      <span class="token property">"relation"</span><span class="token operator">:</span> <span class="token string">"eq"</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"max_score"</span><span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
    <span class="token property">"hits"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
      <span class="token punctuation">{</span>
        <span class="token property">"_index"</span><span class="token operator">:</span> <span class="token string">"logstash-2019.08.10"</span><span class="token punctuation">,</span>
        <span class="token property">"_type"</span><span class="token operator">:</span> <span class="token string">"flb_type"</span><span class="token punctuation">,</span>
        <span class="token property">"_id"</span><span class="token operator">:</span> <span class="token string">"ID-DfWwBIbjYepeiDcpc"</span><span class="token punctuation">,</span>
        <span class="token property">"_score"</span><span class="token operator">:</span> <span class="token number">1.0</span><span class="token punctuation">,</span>
        <span class="token property">"_source"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"@timestamp"</span><span class="token operator">:</span> <span class="token string">"2019-08-10T21:50:25.000Z"</span><span class="token punctuation">,</span>
          <span class="token property">"container_id"</span><span class="token operator">:</span> <span class="token string">"dd2cc9f525b8a59c239d8728d10e044c8ab3640e08b082e497020b3a1241124a"</span><span class="token punctuation">,</span>
          <span class="token property">"container_name"</span><span class="token operator">:</span> <span class="token string">"/config-driver-elasticsearch_ubuntu_1"</span><span class="token punctuation">,</span>
          <span class="token property">"source"</span><span class="token operator">:</span> <span class="token string">"stdout"</span><span class="token punctuation">,</span>
          <span class="token property">"log"</span><span class="token operator">:</span> <span class="token string">"Kevcodez"</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">]</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Since we configured the logging level in Fluent Bit to <em>debug</em>, we should also see the forwarding in action:</p>
<blockquote>
<p>fluentbit_1 | [2019/08/10 21:50:36][debug] [out_es] HTTP Status=200 URI=/_bulk
fluentbit_1 | [2019/08/10 21:50:36][debug] [out_es Elasticsearch response
fluentbit_1 | {&quot;took&quot;:424,&quot;errors&quot;:false,&quot;items&quot;:[{&quot;index&quot;:{&quot;_index&quot;:&quot;logstash-2019.08.10&quot;,&quot;_type&quot;:&quot;flb_type&quot;,&quot;_id&quot;:&quot;ID-DfWwBIbjYepeiDcpc&quot;,&quot;_version&quot;:1,&quot;result&quot;:&quot;created&quot;,&quot;_shards&quot;:{&quot;total&quot;:2,&quot;successful&quot;:1,&quot;failed&quot;:0},&quot;_seq_no&quot;:0,&quot;_primary_term&quot;:1,&quot;status&quot;:201}}]}
fluentbit_1 | [2019/08/10 21:50:36][debug] [task] destroy task=0x7f9aff4430c0 (task_id=0)</p>
</blockquote>
<p>That's it.
The docker application simply uses <code v-pre>stdout</code>, the docker logging driver forwards the logs to Fluent Bit.
Fluent Bit forwards them to Elasticsearch.</p>
<p>Sources from the docker-compose files and configs can be found <a href="https://github.com/kevcodez/fluent-bit-docker-driver-elasticsearch" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
