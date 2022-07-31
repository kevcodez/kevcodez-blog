<template><div><p>The XRebel Java Profiler ist a lightweight Java Profiler frmo zeroturnaround, the makers of JRebel and also the <RouterLink to="/posts/2015-07-05-speed-up-eclipse/">Optimizer for Eclipse Plugin (Speeding up Eclipse)</RouterLink>.
To include the profiler in your web application, a single VM argument needs to be passed and a little icon will be displayed at the bottom left of every page.
When clicking on the icon, the XRebel interface is shown, displaying the amount and time taken of individual SQL queries and java methods.
Here is a short, sympathetic video introducing XRebel.</p>
<iframe src="https://player.vimeo.com/video/123985263" width="500" height="281" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
<h2 id="profiling-an-application" tabindex="-1"><a class="header-anchor" href="#profiling-an-application" aria-hidden="true">#</a> Profiling an application</h2>
<ul>
<li>Understanding application performance</li>
<li>Instant feedback, how long a single request or even a single method took</li>
<li>Split up in application layers</li>
<li>Finding the slowest methods</li>
</ul>
<p><a href="./Profiling_noscroll_540_o.gif">XRebel - Application Profiling</a></p>
<h2 id="profiling-jdbc-and-nosql-databases" tabindex="-1"><a class="header-anchor" href="#profiling-jdbc-and-nosql-databases" aria-hidden="true">#</a> Profiling JDBC and NoSQL Databases</h2>
<ul>
<li>Identify excessive amounts of database queries</li>
<li>Finding methods, that result in too many queries being executed, in a hierachic view</li>
<li>Supports NoSQL</li>
<li>Vuew MongoDB, Cassandra, HBase und Neo4j Queries</li>
<li>Understand the usage of JPA</li>
</ul>
<p><a href="./Database_540_o.gif">XRebel - Database Profiling</a></p>
<h2 id="finding-bottlenecks-in-webservices" tabindex="-1"><a class="header-anchor" href="#finding-bottlenecks-in-webservices" aria-hidden="true">#</a> Finding Bottlenecks in Webservices</h2>
<ul>
<li>Exact overview of every HTTP request</li>
<li>View all webservice requests, such as REST,SOAP,XML-RPC</li>
<li>Identify slow HTTP requests</li>
</ul>
<p><a href="./WebServices_noscroll_540_o.gif">XRebel - Webservices</a></p>
<h2 id="understanding-session-footprint" tabindex="-1"><a class="header-anchor" href="#understanding-session-footprint" aria-hidden="true">#</a> Understanding Session Footprint</h2>
<ul>
<li>View sessuib objects and their size</li>
<li>Watch changes in objects stored in session</li>
<li>Identify biggest objects</li>
</ul>
<p><a href="./Session_540_o.gif">XRebel - Session</a></p>
<h2 id="find-hidden-exceptions" tabindex="-1"><a class="header-anchor" href="#find-hidden-exceptions" aria-hidden="true">#</a> Find hidden Exceptions</h2>
<p><a href="./Exception_540_o_static1.png">XRebel - Exceptions</a></p>
<h2 id="installation-pricing-and-demo-download" tabindex="-1"><a class="header-anchor" href="#installation-pricing-and-demo-download" aria-hidden="true">#</a> Installation/Pricing and Demo/Download</h2>
<p>The XRebel Jarfile needs to be included as VM argument to your application server using <strong>-javaagent:pfad</strong>.
In Eclipse, open up your servers view, doubleclick your server and select &quot;<em>Open launch configuration</em>&quot;.</p>
<p><a href="./vm-arguments.png">Eclipse - VM Argumente</a></p>
<p>XRebel offers a two weeks long trial version. Using <a href="https://zeroturnaround.com/software/xrebel/trial/" target="_blank" rel="noopener noreferrer">this Link<ExternalLinkIcon/></a>, you can request a trial version.
License is <strong>1 $ per day (365 $ per year)</strong>. The current download is available <a href="https://zeroturnaround.com/software/xrebel/download/" target="_blank" rel="noopener noreferrer">here - XRebel Download<ExternalLinkIcon/></a>.</p>
<p>Pictures and videos are taken from the official XRebel website - <a href="https://zeroturnaround.com/software/xrebel/" target="_blank" rel="noopener noreferrer">https://zeroturnaround.com/software/xrebel/<ExternalLinkIcon/></a>.</p>
</div></template>
