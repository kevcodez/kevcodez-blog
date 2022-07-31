<template><div><h1 id="alerting-downtimes-in-slack-using-heartbeat-and-elasticsearch-watchers" tabindex="-1"><a class="header-anchor" href="#alerting-downtimes-in-slack-using-heartbeat-and-elasticsearch-watchers" aria-hidden="true">#</a> Alerting downtimes in Slack using Heartbeat and Elasticsearch Watchers</h1>
<p>This is a two parts series, check out the first part, <RouterLink to="/posts/2020-02-02-elastic-heartbeat-uptime-latency-monitoring/">Elastic Heartbeat uptime and latency monitoring</RouterLink>.</p>
<p>To setup an alerting, we can use an <a href="https://www.elastic.co/guide/en/kibana/current/watcher-ui.html" target="_blank" rel="noopener noreferrer">Elasticsearch Watcher<ExternalLinkIcon/></a>.</p>
<p>In Kibana, go to Management &gt; Elasticsearch &gt; Watcher.
You have to create an advanced watch (JSON) to do this.</p>
<p><img src="@source/posts/2020-02-02-alerting-kibana-uptime/kibana_watcher.png" alt="Kibana create Watcher"></p>
<p>Our alert will do the following:</p>
<p>Check every minute, if atleast two failed pings occured for each service we are monitoring.
If two pings failed for one service, we want to get an alert via Slack.</p>
<p>First, the complete example, which we'll break down afterwards</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">"trigger"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"schedule"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"interval"</span><span class="token operator">:</span> <span class="token string">"1m"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"input"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"search"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"request"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"search_type"</span><span class="token operator">:</span> <span class="token string">"query_then_fetch"</span><span class="token punctuation">,</span>
        <span class="token property">"indices"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"heartbeat-*"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"rest_total_hits_as_int"</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
        <span class="token property">"body"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"size"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
          <span class="token property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"bool"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"must"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                  <span class="token property">"term"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">"monitor.status"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                      <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"down"</span>
                    <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">]</span><span class="token punctuation">,</span>
              <span class="token property">"filter"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token punctuation">{</span>
                  <span class="token property">"range"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">"@timestamp"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                      <span class="token property">"from"</span><span class="token operator">:</span> <span class="token string">"now-2m"</span>
                    <span class="token punctuation">}</span>
                  <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
              <span class="token punctuation">]</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span><span class="token punctuation">,</span>
          <span class="token property">"aggregations"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"by_monitors"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"terms"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"field"</span><span class="token operator">:</span> <span class="token string">"monitor.name"</span><span class="token punctuation">,</span>
                <span class="token property">"size"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
                <span class="token property">"min_doc_count"</span><span class="token operator">:</span> <span class="token number">1</span>
              <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"condition"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"compare"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"ctx.payload.hits.total"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"gt"</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token property">"actions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"notify-slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"throttle_period_in_millis"</span><span class="token operator">:</span> <span class="token number">300000</span><span class="token punctuation">,</span>
      <span class="token property">"slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"message"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
          <span class="token property">"from"</span><span class="token operator">:</span> <span class="token string">"Heartbeat"</span><span class="token punctuation">,</span>
          <span class="token property">"to"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"#ops"</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
          <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"Some systems are not replying."</span><span class="token punctuation">,</span>
          <span class="token property">"dynamic_attachments"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"list_path"</span><span class="token operator">:</span> <span class="token string">"ctx.payload.aggregations.by_monitors.buckets"</span><span class="token punctuation">,</span>
            <span class="token property">"attachment_template"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
              <span class="token property">"color"</span><span class="token operator">:</span> <span class="token string">"warning"</span><span class="token punctuation">,</span>
              <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"{{key}}"</span><span class="token punctuation">,</span>
              <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"Amount of events: {{doc_count}}"</span>
            <span class="token punctuation">}</span>
          <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Let's break this down.</p>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"trigger"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"schedule"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"interval"</span><span class="token operator">:</span> <span class="token string">"1m"</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The trigger defines, when the watcher should be triggered.
In this case, the watcher is triggered every minute.</p>
<hr>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"indices"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
    <span class="token string">"heartbeat-*"</span>
<span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We'll define which indices should be searched, with the wildcard, any heartbeat index is picked up.</p>
<hr>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"query"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"bool"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"must"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"term"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"monitor.status"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"value"</span><span class="token operator">:</span> <span class="token string">"down"</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token property">"filter"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
        <span class="token punctuation">{</span>
            <span class="token property">"range"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"@timestamp"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"from"</span><span class="token operator">:</span> <span class="token string">"now-2m"</span>
            <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The query is an Elasticsearch query.</p>
<p>We search for entries where the field <code v-pre>monitor.status</code> equals <code v-pre>down</code> and the timestamp of the event is within the last two minutes.</p>
<p>Why two minutes? Because we only want to alert when there are two down events occuring, so that a single flaky network call won't alert us instantly.</p>
<hr>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"aggregations"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"by_monitors"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"terms"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"field"</span><span class="token operator">:</span> <span class="token string">"monitor.name"</span><span class="token punctuation">,</span>
        <span class="token property">"size"</span><span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">,</span>
        <span class="token property">"min_doc_count"</span><span class="token operator">:</span> <span class="token number">1</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Heartbeat monitors should have an understandable name.
This way we can also output that name in the alert.</p>
<p>We aggregate by the name.
If we have multiple down events for different systems, we want to aggregate by the system name.</p>
<p>So if we have one failed ping from our system Service-A and another failed ping from our system Service-B, that will not trigger an alert, because we aggregated by name and each only has a single ping failure.</p>
<hr>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"condition"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"compare"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token property">"ctx.payload.hits.total"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"gt"</span><span class="token operator">:</span> <span class="token number">1</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>The condition makes sure that we have atleast two failed pings (amount of hits is greater than 1).</p>
<hr>
<div class="language-json ext-json line-numbers-mode"><pre v-pre class="language-json"><code><span class="token property">"actions"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">"notify-slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token property">"throttle_period_in_millis"</span><span class="token operator">:</span> <span class="token number">300000</span><span class="token punctuation">,</span>
        <span class="token property">"slack"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"message"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
            <span class="token property">"from"</span><span class="token operator">:</span> <span class="token string">"Heartbeat"</span><span class="token punctuation">,</span>
            <span class="token property">"to"</span><span class="token operator">:</span> <span class="token punctuation">[</span>
                <span class="token string">"#ops"</span>
            <span class="token punctuation">]</span><span class="token punctuation">,</span>
            <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"Some systems are not replying."</span><span class="token punctuation">,</span>
            <span class="token property">"dynamic_attachments"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                <span class="token property">"list_path"</span><span class="token operator">:</span> <span class="token string">"ctx.payload.aggregations.by_monitors.buckets"</span><span class="token punctuation">,</span>
                <span class="token property">"attachment_template"</span><span class="token operator">:</span> <span class="token punctuation">{</span>
                    <span class="token property">"color"</span><span class="token operator">:</span> <span class="token string">"warning"</span><span class="token punctuation">,</span>
                    <span class="token property">"title"</span><span class="token operator">:</span> <span class="token string">"{{key}}"</span><span class="token punctuation">,</span>
                    <span class="token property">"text"</span><span class="token operator">:</span> <span class="token string">"Amount of events: {{doc_count}}"</span>
                    <span class="token punctuation">}</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>We use a <a href="https://www.elastic.co/guide/en/elasticsearch/reference/current/actions-slack.html" target="_blank" rel="noopener noreferrer">Slack action<ExternalLinkIcon/></a> and send a message to the <code v-pre>#ops</code> channel.
By defining a list_path on our aggregation, the slack message will contain a list of systems that are down by their names.</p>
<p>The <code v-pre>throttle_period_in_millis</code> defines a notification throttle in milliseconds.
In this case we will only get a notification once every five minutes.</p>
<p><img src="@source/posts/2020-02-02-alerting-kibana-uptime/heartbeat_alert.png" alt="Heartbeat Slack Alert"></p>
<p>If you like this post, feel free to follow me or hit me up on <a href="https://twitter.com/kevcodez" target="_blank" rel="noopener noreferrer">Twitter<ExternalLinkIcon/></a>.</p>
</div></template>
