<template><div><h1 id="monitor-uptime-and-latency-with-elastic-s-heartbeat" tabindex="-1"><a class="header-anchor" href="#monitor-uptime-and-latency-with-elastic-s-heartbeat" aria-hidden="true">#</a> Monitor uptime and latency with Elastic's Heartbeat</h1>
<p>We are going to learn:</p>
<ul>
<li>Introduction to Heartbeat</li>
<li>Basic configuration and concepts of Heartbeat</li>
<li>Running Heartbeat locally or via Docker</li>
<li>Packaging your own Dockerfile</li>
<li>Visualizing your data in Kibana</li>
<li>Alerting downtimes using Kibana Watchers and Slack</li>
</ul>
<p>This is a two-parts series, check out the second part, <RouterLink to="/posts/2020-02-02-alerting-kibana-uptime/">alerting uptime with Kibana watchers</RouterLink>.</p>
<h2 id="introduction" tabindex="-1"><a class="header-anchor" href="#introduction" aria-hidden="true">#</a> Introduction</h2>
<p><a href="https://www.elastic.co/beats/heartbeat" target="_blank" rel="noopener noreferrer">Heartbeat<ExternalLinkIcon/></a> is a lightweight shipper for uptime monitoring.
Elastic explains it well</p>
<blockquote>
<p>Monitor services for their availability with active probing.
Given a list of URLs, Heartbeat asks the simple question:
Are you alive?
Heartbeat ships this information and response time to the rest of the Elastic Stack for further analysis.</p>
</blockquote>
<p>Heartbeat can easily be configured using YAML, pings your targets and sends the information to Logstash or straight to Elasticsearch.</p>
<p>Supported transfer protocols are ICMP, TCP, and HTTP. TLS, authentication and proxies are supported aswell.</p>
<p>On top of that, Kibana offers great visualization and alerting.</p>
<h2 id="configuration" tabindex="-1"><a class="header-anchor" href="#configuration" aria-hidden="true">#</a> Configuration</h2>
<p>As for configuration, a simple YAML file is used.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">heartbeat.monitors</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
    <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 5s"</span>
    <span class="token key atrule">urls</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span>
      <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//kibana<span class="token punctuation">:</span><span class="token number">5601</span>

  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> icmp
    <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 5s"</span>
    <span class="token key atrule">hosts</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> elasticsearch
      <span class="token punctuation">-</span> kibana

<span class="token key atrule">fields</span><span class="token punctuation">:</span>
  <span class="token key atrule">environment</span><span class="token punctuation">:</span> prod

<span class="token key atrule">output.elasticsearch</span><span class="token punctuation">:</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> <span class="token string">"${ELASTICSEARCH_HOSTS:elasticsearch:9200}"</span>
  <span class="token key atrule">username</span><span class="token punctuation">:</span> <span class="token string">"${ELASTICSEARCH_USERNAME:}"</span>
  <span class="token key atrule">password</span><span class="token punctuation">:</span> <span class="token string">"${ELASTICSEARCH_PASSWORD:}"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>I will explain the most common/important parts of the configuration, there is <a href="https://www.elastic.co/guide/en/beats/heartbeat/7.5/heartbeat-reference-yml.html" target="_blank" rel="noopener noreferrer">a lot more to configure<ExternalLinkIcon/></a>.</p>
<h3 id="monitors" tabindex="-1"><a class="header-anchor" href="#monitors" aria-hidden="true">#</a> Monitors</h3>
<p>The <strong>heart</strong> of heartbeat are monitors (pun intended).
Each monitor has a type (transport protocol: <em>http</em>/<em>icmp</em>/<em>tcp</em>), a schedule (when to check) and a list of urls.</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 5s"</span>
  <span class="token key atrule">urls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//elasticsearch<span class="token punctuation">:</span><span class="token number">9200</span>
    <span class="token punctuation">-</span> http<span class="token punctuation">:</span>//kibana<span class="token punctuation">:</span><span class="token number">5601</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This monitor will do a HTTP call on <code v-pre>http://elasticsearch:9200</code> and <code v-pre>http://kibana:5601</code> every 5 seconds and by default check for a 200 status code.</p>
<hr>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 1m"</span>
  <span class="token key atrule">urls</span><span class="token punctuation">:</span>
    <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//my<span class="token punctuation">-</span>basic<span class="token punctuation">-</span>auth<span class="token punctuation">-</span>protected<span class="token punctuation">-</span>rurl.com
  <span class="token key atrule">username</span><span class="token punctuation">:</span> foo
  <span class="token key atrule">password</span><span class="token punctuation">:</span> bar
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>This monitor will do a HTTP call on <code v-pre>https://my-basic-auth-protected-rurl.com</code> with the basic auth credentials <code v-pre>foo:bar</code>.</p>
<hr>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 5s"</span>
  <span class="token key atrule">urls</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"http://localhost:8080/demo/add"</span><span class="token punctuation">]</span>
  <span class="token key atrule">check.request</span><span class="token punctuation">:</span>
    <span class="token key atrule">method</span><span class="token punctuation">:</span> POST
    <span class="token key atrule">headers</span><span class="token punctuation">:</span>
      <span class="token key atrule">"Content-Type"</span><span class="token punctuation">:</span> <span class="token string">"application/x-www-form-urlencoded"</span>
    <span class="token comment"># urlencode the body:</span>
    <span class="token key atrule">body</span><span class="token punctuation">:</span> <span class="token string">"name=first&amp;email=someemail%40someemailprovider.com"</span>
  <span class="token key atrule">check.response</span><span class="token punctuation">:</span>
    <span class="token key atrule">status</span><span class="token punctuation">:</span> <span class="token number">200</span>
    <span class="token key atrule">body</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> Saved
      <span class="token punctuation">-</span> saved
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Issue a POST request every 5 seconds to http://localhost:8080/demo/add, with the specified header and body, expecting a 200 HTTP response code and a response body containg one of the given regular expressions.</p>
<hr>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
  <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 5s"</span>
  <span class="token key atrule">hosts</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"https://myhost:80"</span><span class="token punctuation">]</span>
  <span class="token key atrule">check.request</span><span class="token punctuation">:</span>
    <span class="token key atrule">method</span><span class="token punctuation">:</span> GET
    <span class="token key atrule">headers</span><span class="token punctuation">:</span>
      <span class="token key atrule">"X-API-Key"</span><span class="token punctuation">:</span> <span class="token string">"12345-mykey-67890"</span>
  <span class="token key atrule">check.response</span><span class="token punctuation">:</span>
    <span class="token key atrule">status</span><span class="token punctuation">:</span> <span class="token number">200</span>
    <span class="token key atrule">json</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">description</span><span class="token punctuation">:</span> check status
        <span class="token key atrule">condition</span><span class="token punctuation">:</span>
          <span class="token key atrule">equals</span><span class="token punctuation">:</span>
            <span class="token key atrule">status</span><span class="token punctuation">:</span> ok
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>To check that a specific field in the JSON response body matches something, you can use the <code v-pre>check.response.json</code> matcher.</p>
<p>Check further configuration options in the <a href="https://www.elastic.co/guide/en/beats/heartbeat/7.5/configuration-heartbeat-options.html" target="_blank" rel="noopener noreferrer">official docs<ExternalLinkIcon/></a>.</p>
<h3 id="fields" tabindex="-1"><a class="header-anchor" href="#fields" aria-hidden="true">#</a> Fields</h3>
<p>Optional fields that you can specify to add additional information to the monitor output.
Fields can be scalar values, arrays, dictionaries, or any nested combination of these.</p>
<h3 id="processors" tabindex="-1"><a class="header-anchor" href="#processors" aria-hidden="true">#</a> Processors</h3>
<p>Processors are used to reduce the number of fields in the exported event or to enhance the event with external metadata.</p>
<p>Check out the <a href="https://www.elastic.co/guide/en/beats/heartbeat/7.5/defining-processors.html" target="_blank" rel="noopener noreferrer">full documentation on processors<ExternalLinkIcon/></a>.</p>
<h3 id="output" tabindex="-1"><a class="header-anchor" href="#output" aria-hidden="true">#</a> Output</h3>
<p>Heartbeat will send the collected data every X seconds to the configured output.</p>
<p>Supported outputs are:</p>
<ul>
<li>Elasticsearch</li>
<li>Logstash</li>
<li>Kafka</li>
<li>Redis</li>
<li>File</li>
<li>Console</li>
<li>Elastic Cloud</li>
</ul>
<h3 id="using-environment-variables" tabindex="-1"><a class="header-anchor" href="#using-environment-variables" aria-hidden="true">#</a> Using environment variables</h3>
<p>You can use environment variable references in the config file to set values that need to be configurable during deployment. To do so, simply use: <code v-pre>${VAR}</code></p>
<p>Some examples</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">cloud.auth</span><span class="token punctuation">:</span> <span class="token string">"${ELASTIC_CLOUD_USERNAME}:${ELASTIC_CLOUD_PASSWORD}"</span>

<span class="token key atrule">username</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>WIRECARD_USERNAME<span class="token punctuation">}</span>
<span class="token key atrule">password</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span>WIRECARD_PASSWORD<span class="token punctuation">}</span>

<span class="token key atrule">urls</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> https<span class="token punctuation">:</span>//api.foo.com/products<span class="token punctuation">?</span>query=test<span class="token important">&amp;apiKey=$</span><span class="token punctuation">{</span>API_KEY<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="running-heartbeat" tabindex="-1"><a class="header-anchor" href="#running-heartbeat" aria-hidden="true">#</a> Running heartbeat</h2>
<p>We'll start with the most simple example.
Check kevcodez.de every 10 seconds and print the results to the console.</p>
<p>heartbeat.yml</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">heartbeat.monitors</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">type</span><span class="token punctuation">:</span> http
    <span class="token key atrule">urls</span><span class="token punctuation">:</span> <span class="token punctuation">[</span><span class="token string">"https://kevcodez.de"</span><span class="token punctuation">]</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> Kevcodez
    <span class="token key atrule">schedule</span><span class="token punctuation">:</span> <span class="token string">"@every 10s"</span>

<span class="token key atrule">output.console</span><span class="token punctuation">:</span>
  <span class="token key atrule">pretty</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We are setting a <strong>name</strong> here, otherwise it will get a cryptic name in the Kibana Uptime dashboard.</p>
<h3 id="locally" tabindex="-1"><a class="header-anchor" href="#locally" aria-hidden="true">#</a> Locally</h3>
<p>Download the appropriate package <a href="https://www.elastic.co/downloads/beats/heartbeat" target="_blank" rel="noopener noreferrer">here<ExternalLinkIcon/></a>.
Heartbeat also has packages for yum, apt-get and homebrew.</p>
<p>After unpacking, we'll place the configuration above in the same folder.</p>
<p>To execute heartbeat, simply run <code v-pre>heartbeat -e</code>.</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token punctuation">..</span><span class="token punctuation">..</span>
<span class="token number">2020</span>-02-02T18:54:18.253+0100    INFO    instance/beat.go:297    Setup Beat: heartbeat<span class="token punctuation">;</span> Version: <span class="token number">7.5</span>.2
<span class="token number">2020</span>-02-02T18:54:18.254+0100    INFO    <span class="token punctuation">[</span>publisher<span class="token punctuation">]</span>     pipeline/module.go:97   Beat name: DESKTOP-xyz
<span class="token number">2020</span>-02-02T18:54:18.254+0100    INFO    instance/beat.go:429    heartbeat start running.
<span class="token number">2020</span>-02-02T18:54:18.254+0100    INFO    <span class="token punctuation">[</span>monitoring<span class="token punctuation">]</span>    log/log.go:118  Starting metrics logging every 30s
<span class="token number">2020</span>-02-02T18:54:18.255+0100    INFO    beater/heartbeat.go:80  heartbeat is running<span class="token operator">!</span> Hit CTRL-C to stop it.
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>After a few seconds, the first ping should be sent to the console.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"@timestamp"</span><span class="token operator">:</span> <span class="token string">"2020-02-02T17:54:28.259Z"</span><span class="token punctuation">,</span>
  <span class="token property">"@metadata"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"beat"</span><span class="token operator">:</span> <span class="token string">"heartbeat"</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"_doc"</span><span class="token punctuation">,</span>
    <span class="token property">"version"</span><span class="token operator">:</span> <span class="token string">"7.5.2"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"tls"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"certificate_not_valid_after"</span><span class="token operator">:</span> <span class="token string">"2020-03-20T14:20:38.000Z"</span><span class="token punctuation">,</span>
    ...
    <span class="token property">"certificate_not_valid_before"</span><span class="token operator">:</span> <span class="token string">"2019-12-21T14:20:38.000Z"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"http"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"response"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"bytes"</span><span class="token operator">:</span> <span class="token number">13029</span><span class="token punctuation">,</span>
        <span class="token property">"hash"</span><span class="token operator">:</span> <span class="token string">"8f51d9f9c36306bcf381c4c832bbc5add93ff30b9a428ef1a2a87a8ef68a977f"</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token property">"status_code"</span><span class="token operator">:</span> <span class="token number">200</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    ...
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  ...
  <span class="token property">"url"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"scheme"</span><span class="token operator">:</span> <span class="token string">"https"</span><span class="token punctuation">,</span>
    <span class="token property">"domain"</span><span class="token operator">:</span> <span class="token string">"kevcodez.de"</span><span class="token punctuation">,</span>
    <span class="token property">"port"</span><span class="token operator">:</span> <span class="token number">443</span><span class="token punctuation">,</span>
    <span class="token property">"full"</span><span class="token operator">:</span> <span class="token string">"https://kevcodez.de"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"tcp"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    ...
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"monitor"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"check_group"</span><span class="token operator">:</span> <span class="token string">"089d22a3-45e5-11ea-ad0d-00155d6ef166"</span><span class="token punctuation">,</span>
    <span class="token property">"ip"</span><span class="token operator">:</span> <span class="token string">"157.230.120.63"</span><span class="token punctuation">,</span>
    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token string">"up"</span><span class="token punctuation">,</span>
    <span class="token property">"duration"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"us"</span><span class="token operator">:</span> <span class="token number">704078</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token property">"type"</span><span class="token operator">:</span> <span class="token string">"http"</span><span class="token punctuation">,</span>
    <span class="token property">"id"</span><span class="token operator">:</span> <span class="token string">"auto-http-0X858C739E5BD0C5CC"</span><span class="token punctuation">,</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"Kevcodez"</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"summary"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"down"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"up"</span><span class="token operator">:</span> <span class="token number">1</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Heartbeat is up and running.
We may now change the monitors and output.</p>
<h3 id="docker" tabindex="-1"><a class="header-anchor" href="#docker" aria-hidden="true">#</a> Docker</h3>
<p>Elastic offers an official docker image in their own <a href="https://www.docker.elastic.co/" target="_blank" rel="noopener noreferrer">docker repository<ExternalLinkIcon/></a>.</p>
<p>To run the docker image with your heartbeat.yml file, run:</p>
<div class="language-bash ext-sh line-numbers-mode"><pre v-pre class="language-bash"><code><span class="token function">docker</span> run -d <span class="token punctuation">\</span>
  --name<span class="token operator">=</span>heartbeat <span class="token punctuation">\</span>
  --user<span class="token operator">=</span>heartbeat <span class="token punctuation">\</span>
  --volume<span class="token operator">=</span><span class="token string">"<span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">pwd</span><span class="token variable">)</span></span>/heartbeat.yml:/usr/share/heartbeat/heartbeat.yml:ro"</span> <span class="token punctuation">\</span>
  docker.elastic.co/beats/heartbeat:7.5.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="packaging-your-own-docker-image" tabindex="-1"><a class="header-anchor" href="#packaging-your-own-docker-image" aria-hidden="true">#</a> Packaging your own docker image</h2>
<p>To dockerize heartbeat with your custom heartbeat configuration, check out the following Dockerfile, it's pretty self-explanatory:</p>
<div class="language-Dockerfile ext-Dockerfile line-numbers-mode"><pre v-pre class="language-Dockerfile"><code>FROM docker.elastic.co/beats/heartbeat:7.5.2
COPY heartbeat.yml /usr/share/heartbeat/heartbeat.yml
USER root
RUN chown root:heartbeat /usr/share/heartbeat/heartbeat.yml
USER heartbeat
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://www.elastic.co/guide/en/beats/heartbeat/7.5/running-on-docker.html" target="_blank" rel="noopener noreferrer">Official Docs for running Heartbeat on Docker<ExternalLinkIcon/></a></p>
<h2 id="kibana" tabindex="-1"><a class="header-anchor" href="#kibana" aria-hidden="true">#</a> Kibana</h2>
<p>Kibana has an <strong>Uptime</strong> tab to visualize Heartbeat pings.
On top of that, alerting can be configured to alert you in case of a downtime.</p>
<h3 id="visualization" tabindex="-1"><a class="header-anchor" href="#visualization" aria-hidden="true">#</a> Visualization</h3>
<p>The main dashboard for the uptime view shows you a quick overview of your services and their status.</p>
<p><img src="@source/posts/2020-02-02-elastic-heartbeat-uptime-latency-monitoring/heartbeat_1.png" alt="Uptime Dashboard"></p>
<p>If you select a service, you can see all the pings and the latencies for each.</p>
<p><img src="@source/posts/2020-02-02-elastic-heartbeat-uptime-latency-monitoring/heartbeat_2.png" alt="Uptime Service Dashboard"></p>
<h3 id="alerting" tabindex="-1"><a class="header-anchor" href="#alerting" aria-hidden="true">#</a> Alerting</h3>
<p>Check out the second part, <RouterLink to="/posts/2020-02-02-alerting-kibana-uptime/">alerting uptime with Kibana watchers</RouterLink>.</p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
